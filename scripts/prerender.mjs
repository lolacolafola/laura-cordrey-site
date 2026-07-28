/**
 * Build-time prerender (static HTML snapshots for crawlers / AI answer engines).
 *
 * Why: the app is a client-rendered React SPA, so the raw HTML a non-JS crawler
 * downloads has an empty <div id="root">. Search engines that run JS (Googlebot)
 * cope, but most AI answer-engine crawlers (GPTBot, ClaudeBot, PerplexityBot,
 * CCBot, …) fetch raw HTML and would see nothing. This step runs the *real* built
 * app in headless Chromium, waits for it to render, and writes a static HTML
 * snapshot per route — including the per-page <title>/meta/JSON-LD that
 * useDocumentMeta injects at runtime.
 *
 * How it fits in: runs after `vite build` (see package.json "build"). It only
 * ADDS files to dist/ (dist/<route>.html) and overwrites dist/index.html
 * with the rendered home. The client entry (src/main.jsx) is unchanged — on load
 * React re-renders over the snapshot, so behaviour for humans is identical.
 *
 * Safety: fully resilient. If a browser can't be launched (e.g. Chromium missing
 * in a build environment) it logs a warning and exits 0, so a deploy NEVER breaks
 * — the worst case is the previous client-rendered-SPA behaviour.
 *
 * Routes: parsed from dist/sitemap.xml so the sitemap stays the single source of
 * truth for what exists.
 *
 * Base path: honours VITE_BASE (same env vite build used). Production/Netlify is
 * '/'; the GitHub Pages preview builds with '/laura-cordrey-site/'.
 */
import { createServer } from 'node:http'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const BASE = (process.env.VITE_BASE ?? '/').replace(/\/+$/, '') // '' or '/laura-cordrey-site'
const PORT = 4321

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
  '.xml': 'application/xml', '.txt': 'text/plain',
}

/** Routes to snapshot, parsed from the built sitemap (single source of truth). */
async function routesFromSitemap() {
  const xml = await readFile(join(DIST, 'sitemap.xml'), 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname)
}

/** Minimal static server over dist/, honouring BASE, with SPA fallback. */
function startServer() {
  const server = createServer(async (req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || '/'
    // Resolve to a real file, else <path>/index.html, else the SPA shell.
    let file = join(DIST, p)
    if (!extname(file)) {
      const nested = join(DIST, p, 'index.html')
      file = existsSync(nested) ? nested : join(DIST, 'index.html')
    }
    try {
      const body = await readFile(file)
      res.setHeader('content-type', MIME[extname(file)] || 'application/octet-stream')
      res.end(body)
    } catch {
      res.statusCode = 404
      res.end('not found')
    }
  })
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)))
}

/** Launch Chromium; if the browser binary is missing, install it once and retry. */
async function launchBrowser() {
  const { chromium } = await import('playwright')
  try {
    return await chromium.launch()
  } catch {
    console.warn('[prerender] Chromium not installed — running `playwright install chromium`…')
    execSync('npx --yes playwright install chromium', { stdio: 'inherit' })
    return await chromium.launch()
  }
}

/** Where a route's snapshot goes: '/about' -> dist/about.html, '/' -> dist/index.html. */
function outFileFor(route) {
  return route === '/' ? join(DIST, 'index.html') : join(DIST, `${route}.html`)
}

/**
 * Copy the built (unrendered) SPA shell to every route file, plus 404.html.
 * The escape hatch for when no browser is available — see the catch in main().
 */
async function writeShells(routes) {
  const shell = await readFile(join(DIST, 'index.html'), 'utf8')
  for (const route of routes) {
    if (route === '/') continue // already the shell
    const outFile = outFileFor(route)
    await mkdir(dirname(outFile), { recursive: true })
    await writeFile(outFile, shell, 'utf8')
  }
  await writeFile(join(DIST, '404.html'), shell, 'utf8')
  console.warn(`[prerender] wrote ${routes.length} SPA shells + 404.html (unrendered).`)
}

async function main() {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.warn('[prerender] dist/index.html not found — did `vite build` run? Skipping.')
    return
  }
  const routes = await routesFromSitemap()
  const server = await startServer()

  let browser
  try {
    browser = await launchBrowser()
  } catch (err) {
    console.warn(
      '[prerender] could not launch a browser — falling back to SPA shells.\n  ' +
        (err?.message || err),
    )
    // Write the unrendered SPA shell to every route's file anyway.
    //
    // This used to just return, because public/_redirects ended with
    // `/*  /index.html  200` — the shell was served for anything missing, so a
    // failed prerender degraded invisibly to a client-rendered SPA. Since
    // 28 Jul 2026 that fallback returns a real 404 instead (so the site stops
    // soft-404ing), and "no file" now means "gone" rather than "let the SPA
    // handle it". Writing the shells keeps this script fail-soft: content is
    // client-rendered as before, and no real page 404s.
    await writeShells(routes)
    server.close()
    return // exit 0 on purpose: never break the build
  }

  // Tall viewport so scroll-reveal (IntersectionObserver) content is in view and
  // its text is present in the snapshot.
  const page = await browser.newPage({ viewport: { width: 1280, height: 4000 } })
  let ok = 0
  // The sitemap routes, plus the 404. The last job visits a path that matches
  // no route on purpose, so the app's catch-all renders NotFoundPage and we
  // snapshot it to dist/404.html — the file public/_redirects serves, with a
  // real 404 status, for anything unmatched.
  const jobs = [
    ...routes.map((route) => ({ route, out: outFileFor(route) })),
    { route: '/__not-found__', out: join(DIST, '404.html'), label: '404' },
  ]
  for (const { route, out, label } of jobs) {
    const url = `http://localhost:${PORT}${BASE}${route === '/' ? '/' : route}`
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30000 })
      await page.waitForFunction(
        () => document.getElementById('root')?.children.length > 0,
        { timeout: 15000 },
      )
      await page.waitForTimeout(600) // let useDocumentMeta inject title/meta/JSON-LD
      const html = '<!doctype html>\n' + (await page.evaluate(() => {
        // Scroll-reveal state must not be serialised. Every page marks
        // below-the-fold blocks with a *-hide class that sets opacity:0, and
        // the class gets baked into the snapshot because we run the real app
        // in a real browser. The observer un-hides them once the SPA hydrates,
        // so this is invisible in practice — but until then the static HTML
        // renders content the crawler can read and a human cannot see. Strip
        // the hidden state so the snapshot is visible on its own.
        document
          .querySelectorAll('[class*="-hide"]')
          .forEach((el) => {
            el.classList.forEach((c) => {
              if (/-hide$/.test(c)) el.classList.remove(c)
            })
          })
        return document.documentElement.outerHTML
      }))
      // Flat '<route>.html', NOT '<route>/index.html'. A directory index is
      // served at '/about/', so Netlify 301s '/about' to it — which put all
      // 18 non-home sitemap URLs behind a redirect while the canonical tag,
      // og:url and every internal link still claimed the no-slash form.
      // Google reported that as "Page with redirect". A flat file serves
      // '/about' with a 200 and no hop, so the server finally agrees with
      // what the site says about itself. See
      // content/search-console-audit-28jul.md.
      await mkdir(dirname(out), { recursive: true })
      await writeFile(out, html, 'utf8')
      ok++
      console.log(`[prerender] ${label || route}`)
    } catch (err) {
      console.warn(`[prerender] ${label || route} FAILED: ${err?.message || err}`)
      // A route with no file would now 404 rather than fall back to the SPA,
      // so leave the unrendered shell in its place.
      try {
        await mkdir(dirname(out), { recursive: true })
        await writeFile(out, await readFile(join(DIST, 'index.html'), 'utf8'), 'utf8')
        console.warn(`[prerender]   ↳ wrote an SPA shell there instead`)
      } catch { /* nothing more we can do; the build must not fail */ }
    }
  }
  await browser.close()
  server.close()
  console.log(`[prerender] done — ${ok}/${jobs.length} snapshotted (routes + 404).`)
}

main().catch((err) => {
  // Non-fatal by design: a prerender problem must not fail the deploy.
  console.warn('[prerender] non-fatal error: ' + (err?.message || err))
})
