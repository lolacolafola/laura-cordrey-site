#!/usr/bin/env node
/* embeds:check — added 10 Sep 2026.
 *
 * WHAT IT PROTECTS. src/components/YouTubeEmbed.jsx is the reason this site
 * needs no cookie consent banner. It renders a thumbnail until someone clicks,
 * so YouTube is never contacted and sets no cookies on a passive page view.
 * Swap it back to a plain <iframe src="youtube.com/embed/…"> and the site is
 * silently setting third-party cookies without consent again.
 *
 * WHY A SCRIPT AND NOT A COMMENT. Laura's question, 10 Sep: "this is hardcoded
 * so nothing happens that goes against that?" It was not. The rule lived in
 * comments, and a comment stops nobody. Everything else fragile in this repo has
 * a guard — csp:check, privacy:check, tm:check — and this had none. The failure
 * mode is invisible: the videos still work perfectly, so nothing looks broken.
 *
 * HOW IT CHECKS. It reads the PRERENDERED output, not the source, so it tests
 * what a browser is actually handed on first paint rather than what the JSX
 * looks like. Any auto-loading YouTube iframe lands in dist/*.html; one created
 * by a click never does. That makes the check indifferent to how the component
 * is written and sensitive only to the thing that matters.
 *
 * Run it after `npm run build`, alongside csp:check.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIST = fileURLToPath(new URL('../dist', import.meta.url))

function htmlFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) out.push(...htmlFiles(full))
    else if (entry.endsWith('.html')) out.push(full)
  }
  return out
}

let files
try {
  files = htmlFiles(DIST)
} catch {
  console.error('embeds:check — no dist/. Run `npm run build` first.')
  process.exit(1)
}

// Any <iframe> pointing at a video host in the prerendered HTML means it loads
// without the reader asking for it.
const HOSTS = /(?:youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)/i
const offenders = []

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  for (const tag of html.match(/<iframe\b[^>]*>/gi) || []) {
    if (HOSTS.test(tag)) offenders.push({ file: relative(DIST, file), tag: tag.slice(0, 120) })
  }
}

if (offenders.length === 0) {
  console.log(
    `✓ embeds:check — ${files.length} pages, no video iframe loads before a click. ` +
    'No consent banner needed.',
  )
  process.exit(0)
}

console.error(
  '\nembeds:check FAILED\n\n' +
  `  ${offenders.length} video iframe(s) load on page view rather than on a click.\n` +
  '  That contacts the video host and lets it set cookies with no consent,\n' +
  '  which is exactly what src/components/YouTubeEmbed.jsx exists to prevent.\n\n' +
  offenders.map((o) => `    ${o.file}\n      ${o.tag}`).join('\n') +
  '\n\n  Render it through <YouTubeEmbed embed={…} /> instead of a bare <iframe>.\n' +
  '  If this is deliberate, the site now needs a cookie consent banner.\n',
)
process.exit(1)
