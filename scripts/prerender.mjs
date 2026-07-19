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
 * ADDS files to dist/ (dist/<route>/index.html) and overwrites dist/index.html
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
      '[prerender] could not launch a browser — SKIPPING prerender. The site ' +
        'falls back to the client-rendered SPA (no deploy impact).\n  ' +
        (err?.message || err),
    )
    server.close()
    return // exit 0 on purpose: never break the build
  }

  // Tall viewport so scroll-reveal (IntersectionObserver) content is in view and
  // its text is present in the snapshot.
  const page = await browser.newPage({ viewport: { width: 1280, height: 4000 } })
  let ok = 0
  for (const route of routes) {
    const url = `http://localhost:${PORT}${BASE}${route === '/' ? '/' : route}`
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30000 })
      await page.waitForFunction(
        () => document.getElementById('root')?.children.length > 0,
        { timeout: 15000 },
      )
      await page.waitForTimeout(600) // let useDocumentMeta inject title/meta/JSON-LD
      const html = '<!doctype html>\n' + (await page.evaluate(() => document.documentElement.outerHTML))
      const outDir = route === '/' ? DIST : join(DIST, route)
      await mkdir(outDir, { recursive: true })
      await writeFile(join(outDir, 'index.html'), html, 'utf8')
      ok++
      console.log(`[prerender] ${route}`)
    } catch (err) {
      console.warn(`[prerender] ${route} FAILED (kept as SPA shell): ${err?.message || err}`)
    }
  }
  await browser.close()
  server.close()
  console.log(`[prerender] done — ${ok}/${routes.length} routes snapshotted.`)
}

main().catch((err) => {
  // Non-fatal by design: a prerender problem must not fail the deploy.
  console.warn('[prerender] non-fatal error: ' + (err?.message || err))
})
