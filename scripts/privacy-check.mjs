#!/usr/bin/env node
/* privacy:check — added 10 Sep 2026, extended the same day to cover /legal.
 *
 * /privacy and /legal are the two pages on this site that are legal statements
 * rather than marketing, and several of their facts cannot be derived from the
 * codebase: the SIREN, the establishment address, a phone number, VAT status,
 * the retention period, and whether submissions are exported to a CRM.
 *
 * The August privacy draft carried those as literal "[TO CONFIRM: …]" strings
 * sitting in the rendered copy — a placeholder one careless deploy away from
 * being read by a stranger as Laura's actual privacy notice. They now live as
 * named constants in src/data/legalIdentity.js, shared by both pages so the
 * SIREN cannot differ between them.
 *
 * This fails the build while any fact a REACHABLE page asserts is still null.
 * "Reachable" is what makes an unfinished legal page dangerous, so a page that
 * is routed but not linked, or not routed at all, does not trip it.
 *
 * Why a script and not just the dev banners: those are gated on
 * import.meta.env.DEV, so they are invisible in exactly the build that would
 * ship. This reads the source, so it cannot be skipped by not looking.
 */
import { readFileSync } from 'node:fs'

const read = (p) => readFileSync(new URL(p, import.meta.url), 'utf8')
const identity = read('../src/data/legalIdentity.js')
const layout = read('../src/components/Layout.jsx')
const app = read('../src/App.jsx')

const isNull = (k) => new RegExp(`^export const ${k} = null`, 'm').test(identity)

/* Which constants each page actually puts in front of a reader. A value that no
   reachable page asserts is not this script's problem. */
const PAGES = [
  { route: '/privacy', needs: ['SIREN', 'RETENTION', 'EXPORT_TOOL'] },
  { route: '/legal', needs: ['SIREN', 'ADDRESS', 'PHONE', 'VAT'] },
]

const reachable = (route) =>
  new RegExp(`path="${route}"`).test(app) && new RegExp(`to: '${route}'`).test(layout)

const problems = []
const skipped = []

for (const page of PAGES) {
  const missing = page.needs.filter(isNull)
  if (missing.length === 0) continue
  if (reachable(page.route)) problems.push({ ...page, missing })
  else skipped.push({ ...page, missing })
}

for (const s of skipped) {
  console.log(
    `privacy:check — ${s.route} is missing ${s.missing.join(', ')}, but is not ` +
    `reachable (not routed, or not linked from the footer), so nothing ` +
    `unfinished can be read. OK`,
  )
}

if (problems.length === 0) {
  console.log('privacy:check — every reachable legal page has the facts it asserts. OK')
  process.exit(0)
}

console.error('\nprivacy:check FAILED\n')
for (const p of problems) {
  console.error(
    `  ${p.route} is routed and linked from the footer, so a visitor can read\n` +
    `  it, but these are still null in src/data/legalIdentity.js:\n\n` +
    p.missing.map((m) => `    - ${m}`).join('\n') + '\n',
  )
}
console.error(
  '  Fill them in, or unlink the page.\n' +
  '  Do not ship a legal page with blanks in it.\n',
)
process.exit(1)
