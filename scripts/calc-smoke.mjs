/**
 * Fail loudly when a Fan Value calculator control stops doing anything.
 *
 * Three real bugs lived in that page for months, and all three had the same
 * shape: an input silently stopped affecting the result once an internal cap
 * was hit. Nothing errored, nothing looked wrong, the number just froze. They
 * were only found because Laura happened to try values that exposed them.
 *
 * The invariant this asserts is the one that was broken:
 *
 *   EVERY control either changes the headline, or explains on screen why it
 *   cannot.
 *
 * "Explains why" is a first-class pass, not a workaround — a business already
 * at the retention ceiling genuinely has no lift left to model, and saying so
 * is the correct behaviour. What is NOT allowed is silence.
 *
 *   npm run calc:check
 */
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, dirname, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const PORT = 4323

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
  '.json': 'application/json', '.xml': 'application/xml', '.mp4': 'video/mp4',
}

function startServer() {
  const server = createServer(async (req, res) => {
    const p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname))
    const candidates = p === '/'
      ? [join(DIST, 'index.html')]
      : [join(DIST, p), join(DIST, `${p}.html`), join(DIST, p, 'index.html')]
    let file = candidates.find((c) => c.startsWith(DIST) && existsSync(c) && extname(c))
    let status = 200
    if (!file) { file = join(DIST, '404.html'); status = 404 }
    try {
      const body = await readFile(file)
      res.writeHead(status, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' })
      res.end(body)
    } catch { res.writeHead(500); res.end('err') }
  })
  return new Promise((r) => server.listen(PORT, () => r(server)))
}

/**
 * Starting states to test each control from. The high-retention rows are the
 * ones that were silently dead: a transactional business over 65%, or a
 * subscription business over 95%, had an inert "Fans stay" slider.
 */
const STATES = [
  { name: 'defaults', retention: 30 },
  { name: 'mid retention', retention: 50 },
  { name: 'at the transactional ceiling', retention: 65 },
  { name: 'above the transactional ceiling', retention: 70 },
  { name: 'well above the ceiling', retention: 90 },
  { name: 'existing advocacy 25%', retention: 30, advocacy: '25' },
  { name: 'existing advocacy 75%', retention: 30, advocacy: '75' },
]

const failures = []

async function checkState(page, state) {
  await page.goto(`http://localhost:${PORT}/fan-value`, { waitUntil: 'load' })
  await page.waitForTimeout(700)

  const result = await page.evaluate(async (st) => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
    const setNative = (el, val) => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, String(val))
      el.dispatchEvent(new Event('input', { bubbles: true }))
    }
    const head = () => (document.querySelector('.fvm-bignum__val') || {}).textContent
    const nums = () => [...document.querySelectorAll('input[type=number]')]
    const out = { controls: [] }

    // Open the assumptions panel if it is closed.
    const accord = [...document.querySelectorAll('button')].find((b) => /assumptions/i.test(b.textContent))
    if (accord && accord.getAttribute('aria-expanded') === 'false') { accord.click(); await sleep(350) }

    if (st.retention != null) { setNative(nums()[0], st.retention); await sleep(320) }
    if (st.advocacy != null) { setNative(nums()[1], st.advocacy); await sleep(320) }

    // Every slider: does it move the number, or is there an on-screen reason?
    for (const r of [...document.querySelectorAll('input[type=range]')]) {
      const label = (r.closest('.fvm-slider')?.querySelector('label')?.textContent || '?').trim()
      const keep = r.value
      setNative(r, r.min); await sleep(260); const lo = head()
      setNative(r, r.max); await sleep(260); const hi = head()
      setNative(r, keep); await sleep(160)
      const explained = !!document.querySelector('.fvm-slider__capped')
      out.controls.push({ kind: 'slider', label, lo, hi, moves: lo !== hi, explained })
    }

    // The advocacy field must change the number from blank.
    const adv = nums()[1]
    setNative(adv, ''); await sleep(300); const blank = head()
    setNative(adv, '40'); await sleep(300); const filled = head()
    setNative(adv, st.advocacy ?? ''); await sleep(200)
    out.controls.push({ kind: 'field', label: 'existing advocacy', lo: blank, hi: filled, moves: blank !== filled, explained: false })

    // Nonsense values must be clamped, not modelled.
    const ret = nums()[0]
    setNative(ret, 150); ret.dispatchEvent(new FocusEvent('focusout', { bubbles: true })); await sleep(280)
    out.clampHigh = ret.value
    setNative(ret, -20); ret.dispatchEvent(new FocusEvent('focusout', { bubbles: true })); await sleep(280)
    out.clampLow = ret.value
    return out
  }, state)

  for (const c of result.controls) {
    if (!c.moves && !c.explained) {
      failures.push(`${state.name} → "${c.label}" (${c.kind}) does nothing and says nothing (${c.lo} → ${c.hi})`)
    }
  }
  if (result.clampHigh !== '95') failures.push(`${state.name} → retention 150 clamped to "${result.clampHigh}", expected 95`)
  if (result.clampLow !== '0') failures.push(`${state.name} → retention -20 clamped to "${result.clampLow}", expected 0`)

  const dead = result.controls.filter((c) => !c.moves)
  console.log(`  ${state.name.padEnd(34)} ${result.controls.length} controls, ` +
    `${dead.length ? dead.length + ' capped (explained)' : 'all live'}`)
}

async function main() {
  if (!existsSync(join(DIST, 'fan-value.html'))) {
    console.error('calc-smoke: dist/fan-value.html not found — run `npm run build` first.')
    process.exit(1)
  }
  const server = await startServer()
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 2000 } })
  console.log('calc-smoke: every control must move the number, or say why not\n')
  for (const st of STATES) await checkState(page, st)
  await browser.close()
  server.close()

  if (failures.length) {
    console.error(`\n✗ calc-smoke: ${failures.length} problem(s)\n`)
    failures.forEach((f) => console.error('  ' + f))
    console.error('\nA control that neither changes the result nor explains itself reads as ' +
      'a broken tool. Either wire it up, or show the reason on screen.\n')
    process.exit(1)
  }
  console.log('\n✓ calc-smoke: every control accounted for.\n')
}

main().catch((err) => {
  console.error('calc-smoke: ' + (err?.stack || err))
  process.exit(1)
})
