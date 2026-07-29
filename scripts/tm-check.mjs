#!/usr/bin/env node
/* npm run tm:check — enforces the 29 Jul 2026 naming rule in CLAUDE.md.
 *
 * Two checks, both of which have been proven to fail, not just to pass:
 *
 *   1. Fan Score and Fan Value carry NO ™, anywhere, in any form. Mechanical,
 *      and the most likely thing to creep back in, because the old rule said
 *      the opposite and three years of copy was written under it.
 *
 *   2. The Fan Engine mark count per file never rises above the baseline
 *      below. The baseline is the state deliberately shipped on 29 Jul: one
 *      mark on the first prominent use per page, plus the recorded carve-outs
 *      (meta/JSON-LD, and the surfaces that travel off-site).
 *
 * Deliberately dumb about JSX. A parser that tried to tell a rendered mark
 * from a meta string would be wrong on the data-driven pages, where the FAQ
 * answers and the offer cards are strings that get rendered. Counting is
 * something it cannot be wrong about.
 *
 * It counts marks ATTACHED TO THE NAME, over the whole file rather than line
 * by line, because /about wraps "the Fan / Engine™" across two lines and a
 * line-based count silently missed that page's only mark.
 *
 * When a count legitimately changes — a new page, or Laura moves which
 * mention carries the mark — update the baseline here in the same commit and
 * say why. That edit is the record.
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')

// file → number of marks attached to "Fan Engine", code comments included.
// Anything not listed is allowed zero.
const BASELINE = {
  'src/components/QuizReveal.jsx': 1,      // comment only
  'src/lib/seo.js': 4,                     // meta + JSON-LD
  'src/data/caseStudiesCinematic.js': 1,   // case-study lede, first use on that page
  'src/pages/AboutPage.jsx': 3,            // hero lede (wraps a line) + meta + 1 comment
  'src/pages/ContactPage.jsx': 2,          // the <option>, and the map that feeds it — must match
  'src/pages/FanAuditPage.jsx': 4,         // bio + 2 download-card footers (they travel) + 1 comment
  'src/pages/FanLedGrowthPage.jsx': 1,     // hero close
  'src/pages/FanLedGrowthPage.css': 1,     // comment only
  'src/pages/FanValueModelPage.jsx': 1,    // CTA eyebrow
  'src/pages/FaqPage.jsx': 3,              // first answer + 2 meta
  'src/pages/HomePage.jsx': 1,             // about-band lede
  'src/pages/MethodologyPage.jsx': 3,      // H1 + 2 meta
  'src/pages/NotFoundPage.jsx': 2,         // heading + meta
  'src/pages/ServicesPage.jsx': 2,         // meta, plus `tm: true` on the flagship card title
  'index.html': 1,                         // keywords meta
  'public/llms.txt': 2,                    // intro, and the naming rule itself
  'scripts/og-image.html': 1,              // the OG image travels off-site, so it carries one
  // Layout.jsx is deliberately absent: no mark in the nav or footer, ever.
}

const ANY_MARK = String.raw`(?:<span className="tm">\s*(?:™|&trade;)\s*<\/span>|<sup>\s*(?:™|&trade;)\s*<\/sup>|<tspan[^>]*>\s*(?:™|&trade;)\s*<\/tspan>|™|&trade;|\\u2122)`

// A mark attached to the Fan Engine name. \s+ spans newlines, so a name broken
// across two source lines still counts. `tm: true` is the ServicesPage flagship
// card, which assembles its title from parts and flags the mark separately.
const ENGINE_MARK = new RegExp(String.raw`Fan\s+Engine\s*${ANY_MARK}|tm:\s*true`, 'gi')

// The two tool names must never carry one.
const BANNED = new RegExp(String.raw`(Fan Score|Fan Value(?: Model)?)\s*${ANY_MARK}`, 'g')

const FILES = [
  ...walk('src'),
  'index.html',
  'public/llms.txt',
  'scripts/og-image.html',
]

function walk(dir) {
  const out = []
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = `${dir}/${e.name}`
    if (e.isDirectory()) out.push(...walk(rel))
    else if (/\.(jsx?|mjs|css|html|txt)$/.test(e.name)) out.push(rel)
  }
  return out
}

const failures = []

for (const rel of FILES) {
  const lines = fs.readFileSync(path.join(ROOT, rel), 'utf8').split('\n')

  // 1. Fan Score / Fan Value must never carry a mark.
  lines.forEach((line, i) => {
    for (const m of line.matchAll(BANNED)) {
      failures.push(
        `${rel}:${i + 1}  "${m[1]}" carries a ™.\n` +
        `      Fan Score and Fan Value are tool names and take no mark (CLAUDE.md, 29 Jul).`
      )
    }
  })

  // 2. Fan Engine marks must not exceed the recorded baseline.
  const src = lines.join('\n')
  const hits = []
  for (const m of src.matchAll(ENGINE_MARK)) {
    const line = src.slice(0, m.index).split('\n').length
    hits.push({ line, text: lines[line - 1].trim().slice(0, 96) })
  }
  const count = hits.length
  const allowed = BASELINE[rel] ?? 0

  if (count > allowed) {
    failures.push(
      `${rel}  carries ${count} marks, baseline is ${allowed}.\n` +
      hits.map((h) => `      :${h.line}  ${h.text}`).join('\n') + '\n' +
      `      One mark on the first prominent use per page. If this rise is\n` +
      `      intended, raise the baseline in scripts/tm-check.mjs and say why.`
    )
  } else if (count < allowed) {
    failures.push(
      `${rel}  carries ${count} marks, baseline expects ${allowed}.\n` +
      `      A mark went missing. The Fan Engine keeps exactly one — losing it\n` +
      `      entirely is drift too. Fix it, or lower the baseline and say why.`
    )
  }
}

if (failures.length) {
  console.error(`\n✖ tm:check — ${failures.length} problem${failures.length > 1 ? 's' : ''}\n`)
  for (const f of failures) console.error('  ' + f + '\n')
  process.exit(1)
}

console.log('✓ tm:check — one hero mark, on the Fan Engine, once per page.')
