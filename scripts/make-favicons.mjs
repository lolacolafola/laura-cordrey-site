/**
 * Rasterise public/favicon.svg into the bitmap icons crawlers and mobile
 * home screens actually ask for.
 *
 * Google's favicon fetcher requests /favicon.ico first. Without a real file
 * there, Netlify's SPA fallback answers with index.html — a 200 that is not an
 * image — so the crawler keeps whatever icon it cached last (in our case the
 * OVH parking-page mark from before the domain moved).
 *
 * Chromium does the rendering so the mark uses the real Manrope webfont rather
 * than a local fallback. Pillow packs the multi-resolution .ico.
 *
 *   node scripts/make-favicons.mjs
 */
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const svg = readFileSync(join(publicDir, 'favicon.svg'), 'utf8')

// Sizes packed into favicon.ico, plus the standalone PNGs.
const ICO_SIZES = [16, 32, 48, 64, 128, 256]
const PNG_FILES = [
  ['apple-touch-icon.png', 180],
  ['favicon-96x96.png', 96],
]

const page = await (await chromium.launch()).newPage()

async function render(size) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<!doctype html>
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@800&display=block">
     <style>html,body{margin:0;padding:0}svg{display:block;width:${size}px;height:${size}px}</style>
     ${svg}`,
    { waitUntil: 'networkidle' }
  )
  await page.evaluate(() => document.fonts.ready)
  return page.screenshot({ omitBackground: true })
}

const work = mkdtempSync(join(tmpdir(), 'favicons-'))
try {
  const icoParts = []
  for (const size of ICO_SIZES) {
    const file = join(work, `${size}.png`)
    writeFileSync(file, await render(size))
    icoParts.push(file)
    console.log(`rendered ${size}px`)
  }

  for (const [name, size] of PNG_FILES) {
    writeFileSync(join(publicDir, name), await render(size))
    console.log(`wrote public/${name}`)
  }

  execFileSync(
    'python3',
    [
      '-c',
      `import sys
from PIL import Image
srcs = sys.argv[1:-1]
imgs = [Image.open(p).convert("RGBA") for p in srcs]
imgs[-1].save(sys.argv[-1], format="ICO",
              sizes=[(i.width, i.height) for i in imgs])`,
      ...icoParts,
      join(publicDir, 'favicon.ico'),
    ],
    { stdio: 'inherit' }
  )
  console.log('wrote public/favicon.ico')
} finally {
  rmSync(work, { recursive: true, force: true })
  await page.context().browser().close()
}
