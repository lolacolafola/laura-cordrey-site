/**
 * Renders scripts/og-image.html to a 1200×630 JPEG — the link preview card.
 *
 * Why: the OG image was a flat JPG with no source file, so editing one word
 * meant rebuilding the whole card by hand. The template beside this script is
 * now the source of truth and this turns it into the shipped asset.
 *
 * Usage:
 *   npm run og                     → writes public/og-image.jpg
 *   npm run og -- --out foo.jpg    → writes public/foo.jpg instead
 *
 * This is NOT wired into `npm run build`. The card changes about once a year,
 * and a build step that silently rewrites a committed binary on every deploy
 * is a worse trade than running this by hand when the copy actually changes.
 *
 * It needs the network, once, for Manrope from Google Fonts — the same source
 * the site itself uses. If the font has not painted, the script fails loudly
 * rather than shipping a card set in a fallback face.
 */
import { chromium } from 'playwright'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { existsSync } from 'node:fs'

const here = dirname(fileURLToPath(import.meta.url))
const template = resolve(here, 'og-image.html')

const outArg = process.argv.indexOf('--out')
const outName = outArg > -1 ? process.argv[outArg + 1] : 'og-image.jpg'
const outPath = resolve(here, '..', 'public', outName)

if (!existsSync(template)) {
  console.error(`✗ template missing: ${template}`)
  process.exit(1)
}

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2, // render at 2x, then downsample — cleaner glyph edges
})

await page.goto(`file://${template}`, { waitUntil: 'networkidle' })

// Confirm Manrope actually painted. document.fonts.check needs a size + family
// and reports false for a family that never loaded, which is the failure we
// care about: a card silently set in system-ui looks subtly wrong forever.
const gotFont = await page.evaluate(async () => {
  await document.fonts.ready
  return document.fonts.check('800 82px Manrope')
})
if (!gotFont) {
  console.error('✗ Manrope did not load — refusing to render in a fallback face.')
  console.error('  Check the network, then re-run.')
  await browser.close()
  process.exit(1)
}

await page.screenshot({ path: outPath, type: 'jpeg', quality: 92 })
await browser.close()

console.log(`✓ wrote public/${outName} (1200×630)`)
