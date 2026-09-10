#!/usr/bin/env node
/* privacy:check — added 10 Sep 2026.
 *
 * /privacy is the one page on this site that is a legal statement rather than
 * marketing, and three of its facts cannot be derived from the codebase: the
 * SIREN, the retention period, and whether submissions are exported to a CRM
 * or email tool. The August draft carried them as literal "[TO CONFIRM: …]"
 * strings sitting in the rendered copy, which is a placeholder one careless
 * deploy away from being read by a stranger as Laura's actual privacy notice.
 *
 * They are now named constants at the top of PrivacyPage.jsx. This script
 * fails the build while any of them is still null AND the page is reachable,
 * because "reachable" is the thing that makes an unfinished notice dangerous.
 *
 * Why a script and not just the dev banner: the banner is gated on
 * import.meta.env.DEV, so it is invisible in exactly the build that would ship.
 * This runs against the source, so it cannot be skipped by not looking.
 */
import { readFileSync } from 'node:fs'

const page = readFileSync(new URL('../src/pages/PrivacyPage.jsx', import.meta.url), 'utf8')
const layout = readFileSync(new URL('../src/components/Layout.jsx', import.meta.url), 'utf8')
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')

const missing = ['SIREN', 'RETENTION', 'EXPORT_TOOL'].filter((k) =>
  new RegExp(`^const ${k} = null`, 'm').test(page),
)

const routed = /path="\/privacy"/.test(app)
const linked = /to: '\/privacy'/.test(layout) || /to="\/privacy"/.test(layout)
const reachable = routed && linked

if (missing.length === 0) {
  console.log('privacy:check — all three facts filled in. OK')
  process.exit(0)
}

if (!reachable) {
  console.log(
    `privacy:check — ${missing.join(', ')} still unset, but /privacy is not yet ` +
    `${routed ? 'linked from the footer' : 'routed'}, so nothing unfinished is reachable. OK`,
  )
  process.exit(0)
}

console.error(
  '\nprivacy:check FAILED\n\n' +
  `  /privacy is routed and linked from the footer, so a visitor can read it,\n` +
  `  but ${missing.length} of its three required facts ${missing.length === 1 ? 'is' : 'are'} still null:\n\n` +
  missing.map((m) => `    - ${m}`).join('\n') +
  '\n\n  Fill them in at the top of src/pages/PrivacyPage.jsx, or unlink the page.\n' +
  '  Do not ship a privacy notice with blanks in it.\n',
)
process.exit(1)
