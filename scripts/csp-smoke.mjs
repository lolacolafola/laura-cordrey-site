/**
 * Fail loudly when the Content-Security-Policy blocks something.
 *
 * Why this exists: the CSP once blocked the Fan Score card download for three
 * weeks and nobody noticed. Two things made it invisible. The script was only
 * fetched when someone CLICKED download, so any check that merely opens pages
 * would never see it. And a blocked script fails silently — no error reaches
 * the visitor, the button just does nothing.
 *
 * So this does the two things a page-load check cannot:
 *   1. Serves dist/ with the REAL policy from public/_headers. `vite dev` and
 *      `vite preview` do not apply _headers, so a violation cannot even fire
 *      there — this is the only place it can be caught before production.
 *   2. Drives the interactive paths to the end and clicks the buttons, so
 *      click-time loads actually happen.
 *
 * Exit code 1 with a list on any violation. Run it before a deploy that adds
 * or changes anything third-party (an embed, a font, a widget, analytics):
 *
 *   npm run csp:check
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, dirname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const PORT = 4322

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.mp4': 'video/mp4', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon', '.xml': 'application/xml', '.txt': 'text/plain',
}

/** The policy that production actually sends, read from the file that sends it. */
async function cspFromHeaders() {
  const txt = await readFile(join(ROOT, 'public/_headers'), 'utf8')
  const line = txt.split('\n').find((l) => /^\s*Content-Security-Policy:/i.test(l))
  if (!line) throw new Error('No Content-Security-Policy found in public/_headers')
  return line.replace(/^\s*Content-Security-Policy:\s*/i, '').trim()
}

/** Static server over dist/, sending the real CSP and mirroring Netlify's lookup. */
function startServer(csp) {
  const server = createServer(async (req, res) => {
    const p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))
    // Netlify's order: exact file, then <path>.html, then <path>/index.html.
    const candidates = p === '/'
      ? [join(DIST, 'index.html')]
      : [join(DIST, p), join(DIST, `${p}.html`), join(DIST, p, 'index.html')]
    let file = candidates.find((c) => c.startsWith(DIST) && existsSync(c) && extname(c))
    let status = 200
    if (!file) { file = join(DIST, '404.html'); status = 404 } // same as production
    try {
      const body = await readFile(file)
      res.writeHead(status, {
        'Content-Type': MIME[extname(file)] || 'application/octet-stream',
        'Content-Security-Policy': csp,
      })
      res.end(body)
    } catch {
      res.writeHead(500); res.end('error')
    }
  })
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)))
}

const violations = []

/** Attach violation capture to a page, before any of its scripts run. */
async function watch(page, where) {
  await page.addInitScript(() => {
    window.__csp = []
    document.addEventListener('securitypolicyviolation', (e) => {
      window.__csp.push({
        directive: e.effectiveDirective || e.violatedDirective,
        blocked: e.blockedURI,
      })
    })
  })
  page.on('pageerror', (err) => {
    // A blocked module import surfaces here rather than as a violation event.
    if (/Content Security Policy|CSP/i.test(String(err))) {
      violations.push({ where, directive: '(page error)', blocked: String(err).slice(0, 160) })
    }
  })
}

async function drain(page, where) {
  const found = await page.evaluate(() => {
    const v = window.__csp || []
    window.__csp = []
    return v
  })
  for (const v of found) violations.push({ where, ...v })
}

/**
 * Click forward through a quiz until the download button appears, then click it.
 * Deliberately generic — it takes whatever option/continue button is on screen —
 * so it keeps working if the number of questions or the flow changes.
 */
async function runToolJourney(page, path, label, gatePick = 0) {
  await page.goto(`http://localhost:${PORT}${path}`, { waitUntil: 'load' })
  await page.waitForTimeout(400)

  const DOWNLOAD = 'button:has-text("Download card as image")'
  for (let step = 0; step < 60; step++) {
    if (await page.locator(DOWNLOAD).count()) break
    // Prefer a quiz option; otherwise take the first primary button (start,
    // gate choice, continue).
    const opt = page.locator('.fa-opt').first()
    // The gate ("Is your product live?") is the only screen with .fa-choice,
    // and which one we press decides which edition — and so which of the two
    // card downloads gets exercised. Both need testing.
    const choice = page.locator('.fa-choice')
    const gate = (await choice.count()) > gatePick ? choice.nth(gatePick) : null
    const btn = page.locator('.fa-btn:not(.fa-btn--ghost)').first()
    const target = (await opt.count()) ? opt
      : gate ? gate
      : (await btn.count()) ? btn : null
    if (!target) {
      // Nothing clickable does NOT mean stuck. Selecting an answer advances on
      // a 180ms timer, and the reveal animation between the last question and
      // the result has no buttons at all and runs up to FAILSAFE_MS (3s) in
      // QuizReveal.jsx. Wait it out rather than giving up on the screen that
      // sits directly in front of the thing we came to test.
      await page.waitForTimeout(500)
      continue
    }
    await target.click({ timeout: 5000 }).catch(() => {})
    await page.waitForTimeout(350)
  }

  const dl = page.locator(DOWNLOAD)
  if (await dl.count()) {
    // This is the click that was silently broken for three weeks.
    page.on('download', (d) => d.cancel().catch(() => {}))
    await dl.first().click({ timeout: 10000 }).catch(() => {})
    await page.waitForTimeout(2500) // let the dynamic import resolve and render
    console.log(`  ${label}: reached the result and clicked download`)
  } else {
    console.warn(`  ${label}: WARNING — never reached a download button; ` +
      'the click-time path was NOT exercised. Check the flow still works.')
  }
  await drain(page, `${label} (${path})`)
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('csp-smoke: dist/ not found — run `npm run build` first.')
    process.exit(1)
  }
  const csp = await cspFromHeaders()
  const server = await startServer(csp)
  const browser = await chromium.launch()
  const context = await browser.newContext({ acceptDownloads: true })
  const page = await context.newPage()
  await watch(page, 'page load')

  console.log('csp-smoke: serving dist/ with the production policy\n')

  // 1. Every route, page-load coverage.
  const sitemap = await readFile(join(DIST, 'sitemap.xml'), 'utf8')
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
  for (const r of routes) {
    await page.goto(`http://localhost:${PORT}${r}`, { waitUntil: 'load' })
    await page.waitForTimeout(250)
    await drain(page, `load ${r}`)
  }
  console.log(`  loaded ${routes.length} routes`)

  // 2. The click-time paths a page-load check cannot reach.
  //
  // Only the Fan Score has card downloads, and it has TWO — useCardActions is
  // mounted once in the live result and once in the pre-launch result, writing
  // fan-score.png and fan-engine-readiness.png. Both pull html2canvas on click,
  // so both need exercising. /fan-value has no download at all and is fully
  // covered by the route sweep above.
  await runToolJourney(page, '/fan-score', 'Fan Score · live', 0)
  await runToolJourney(page, '/fan-score', 'Fan Score · pre-launch', 1)

  await browser.close()
  server.close()

  if (violations.length) {
    console.error(`\n✗ csp-smoke: ${violations.length} CSP violation(s)\n`)
    for (const v of violations) {
      console.error(`  ${v.where}\n    ${v.directive} blocked ${v.blocked}`)
    }
    console.error('\nFix: add the origin to the Content-Security-Policy in ' +
      'public/_headers, or serve the resource from this domain instead.\n')
    process.exit(1)
  }
  console.log('\n✓ csp-smoke: no CSP violations.\n')
}

main().catch((err) => {
  // Unlike prerender, this one SHOULD fail loudly — that is the entire point.
  console.error('csp-smoke: ' + (err?.stack || err))
  process.exit(1)
})
