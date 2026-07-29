/**
 * Generate content/copy-inventory-tools.md: every string in the Fan Score, in
 * the order a visitor meets it, with the condition that triggers each one.
 *
 * Why this is generated and not written by hand: the result screen is assembled
 * at runtime from interchangeable fragments, so there are well over a hundred
 * combinations and each visitor sees exactly one. Reading the copy by clicking
 * through the tool is not possible — you would have to complete it a hundred
 * times, answering in a specific pattern each time, to see every line.
 *
 * It reads the constants straight out of FanAuditPage.jsx, so the document
 * cannot drift from what the tool actually says. Re-run it after any copy
 * change:
 *
 *   npm run copy:inventory
 *
 * Inline strings that live in JSX rather than in a constant (headlines, button
 * labels, section labels) are listed in SCREEN_COPY below and every one is
 * verified to still exist in the source — the script fails loudly if a line has
 * been edited in the page but not here.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = join(ROOT, 'src/pages/FanAuditPage.jsx')
// The reveal and the result form are shared components, so their strings live
// outside FanAuditPage. Verification reads all three.
const ALSO = [
  join(ROOT, 'src/components/QuizReveal.jsx'),
  join(ROOT, 'src/components/ResultContactForm.jsx'),
]
const OUT = join(ROOT, 'content/copy-inventory-tools.md')

/** Pull a top-level `const NAME = [...]` or `{...}` literal and evaluate it. */
function literal(src, name) {
  const m = new RegExp('^const ' + name + ' = ([\\[{])', 'm').exec(src)
  if (!m) throw new Error(`copy-inventory: ${name} not found in FanAuditPage.jsx`)
  const start = m.index + m[0].length - 1
  let depth = 0, i = start
  for (; i < src.length; i++) {
    const c = src[i]
    if (c === '[' || c === '{') depth++
    else if (c === ']' || c === '}') { depth--; if (depth === 0) break }
  }
  const block = src.slice(start, i + 1)
  if (/className=/.test(block)) {
    throw new Error(`copy-inventory: ${name} now contains JSX — the extractor only handles plain literals.`)
  }
  return new Function(`return (${block})`)()
}

/**
 * Copy that lives inline in JSX. Each entry is checked against the source, so
 * this list cannot silently rot: change a headline in the page without changing
 * it here and the script stops.
 */
const SCREEN_COPY = {
  'Live intro (first screen)': [
    ['Eyebrow', 'The Fan Score'],
    ['Headline', 'Are your customers fans, or just customers?'],
    ['Lede', 'Fans stay, spend more, and bring you new customers. This looks at what turns one into the other: your brand, your product, your community, and where your growth actually comes from.'],
    ['Bold line', '10 honest questions. Two minutes to your score, what&rsquo;s driving it, and where to start.'],
    ['Button', 'Get my Fan Score'],
    ['Skip link', 'Prefer to skip to the numbers?'],
  ],
  'The gate (both editions)': [
    ['Kicker', 'First things first'],
    ['Question', 'Is your product live, with real users yet?'],
    ['Choice 1', "Yes, we're live"],
    ['Choice 1 sub', 'People are using it. You can answer questions about how they behave.'],
    ['Choice 2', "Not yet, we're pre-launch"],
    ['Choice 2 sub', "Still building, or about to launch. We'll check if you're ready to build for fans instead."],
  ],
  'Pre-launch intro': [
    ['Eyebrow', 'The Fan Score'],
    ['Headline', "You're pre-launch, so let's not fake a growth score."],
    ['Lede', 'With no users yet, a "% fan-led" number would just be guessing. Instead, 5 quick questions on whether you&rsquo;re ready to build a growth engine fans will power, and to fuel it.'],
    ['Bold line', 'A minute or two.'],
    ['Button', 'Check my readiness'],
  ],
  'The reveal (between last answer and result)': [
    ['Eyebrow', 'The Fan Score'],
    ['Line', 'Reading what you told me'],
    ['Skip button', 'Show my result'],
  ],
  'Live result — section labels': [
    ['Section 1', "What's driving it"],
    ['Section 1 note', 'Each discipline on the same scale. The tinted track is the room still to build; the fill is fan-led growth you already have.'],
    ['Section 2', 'Your move'],
    ['Section 2 prefix', 'Start here:'],
    ['Section 3', 'Where to next'],
    ['CTA', 'See what your fans are worth'],
    ['CTA tail', 'Your percentage is the diagnosis. The number is what it’s costing you.'],
    ['Stamp (when gate = 1)', 'Unverified · self-assessed'],
    ['Card caption', 'Share your result'],
    ['Card line', 'of my growth is fan-led'],
    ['Card footer', 'Check yours ·'],
  ],
  'Pre-launch result — section labels': [
    ['Verdict label', 'Your verdict'],
    ['Stamp', 'Directional read · self-assessed'],
    ['Section 1', 'Where you stand'],
    ['Gate row label', 'The gate · fuel'],
    ['Gate row sub', 'Your route to first fans'],
    ['Section 2', 'Your move'],
    ['Section 2 prefix', 'Start here:'],
    ['Closing line', 'This is the pre-launch reality check. The full engagement begins the day you go live.'],
  ],
  'Result contact form (both tools)': [
    ['Heading', 'Want to talk about this result?'],
    ['Field', 'Your name'],
    ['Field', 'Email'],
    ['Field', 'Anything surprise you?'],
    ['Button', 'Send'],
    ['Download note', 'Your card downloads when you send this.'],
    ['Trust line', 'I read every message myself and I&rsquo;ll come back to you within one working day.'],
    ['Alt line', 'Something specific in mind? Use the'],
    ['Done state', 'Your enquiry is in.'],
  ],
}

const esc = (s) => String(s).replace(/\|/g, '\\|')

function table(rows, headers) {
  return [
    '| ' + headers.join(' | ') + ' |',
    '|' + headers.map(() => '---').join('|') + '|',
    ...rows.map((r) => '| ' + r.map(esc).join(' | ') + ' |'),
  ].join('\n')
}

const src = await readFile(SRC, 'utf8')
const raw = src + (await Promise.all(ALSO.map((f) => readFile(f, 'utf8')))).join('\n')

// Verify every hand-listed inline string still exists in the page.
const missing = []
for (const [screen, rows] of Object.entries(SCREEN_COPY)) {
  for (const [label, text] of rows) {
    if (!raw.includes(text)) missing.push(`${screen} → ${label}: "${text}"`)
  }
}
if (missing.length) {
  console.error('copy-inventory: these lines are listed in the script but no longer in the page:\n  ' +
    missing.join('\n  ') + '\n\nUpdate SCREEN_COPY in scripts/copy-inventory.mjs, then re-run.')
  process.exit(1)
}

const LQ = literal(src, 'LQ')
const C = literal(src, 'C')
const LEVEL_WORD = literal(src, 'LEVEL_WORD')
const TIER_COPY = literal(src, 'TIER_COPY')
const R_HEAD = literal(src, 'R_HEAD')
const LEAK_COPY = literal(src, 'LEAK_COPY')
const MOVE_COPY = literal(src, 'MOVE_COPY')
const REFRAME = literal(src, 'REFRAME')
const GATE_WHY = literal(src, 'GATE_WHY')
const MOVE_PRE = literal(src, 'MOVE_PRE')

const out = []
const p = (...l) => out.push(...l, '')

p('# Every word in the Fan Score, and when it appears')
p('**Generated from `src/pages/FanAuditPage.jsx` — do not edit by hand.** ' +
  'Re-run `npm run copy:inventory` after any copy change and this file updates.')
p('The result screen is assembled at runtime from interchangeable fragments, so ' +
  'there are well over a hundred combinations and each visitor sees exactly one. ' +
  'You cannot read this copy by using the tool: you would have to complete it a ' +
  'hundred times, answering in a specific pattern each time. This is all of it, ' +
  'in the order a visitor meets it, with the condition that triggers each line.')

p('---', '## Part 1 — the fixed screens')
p('These appear the same for everyone.')
for (const [screen, rows] of Object.entries(SCREEN_COPY)) {
  p(`### ${screen}`)
  p(table(rows.map(([l, t]) => [l, t.replace(/&rsquo;/g, '’')]), ['Where', 'Text']))
}

p('---', '## Part 2 — the live edition questions')
p(`${LQ.length} questions. Answers are always in the same order, worth 1, 2 and 3 points.`)
LQ.forEach((q, i) => {
  p(`**Q${i + 1} · ${q.d}${q.gate ? ' (the gate question — scores separately)' : ''}**  `,
    `${q.q}`)
  p(q.a.map((a, j) => `${j + 1}. ${a}`).join('  \n'))
})

p('---', '## Part 3 — the pre-launch edition questions')
p(`${C.length} questions.`)
C.forEach((q, i) => {
  p(`**Q${i + 1} · ${q.key} — ${q.label}${q.gate ? ' (the gate)' : ''}**  `, `${q.q}`)
  if (q.help) p(`_Helper text:_ ${q.help}`)
  p(q.a.map((a, j) => `${j + 1}. ${a}`).join('  \n'))
})

p('---', '## Part 4 — the live result, and what triggers each line')

p('### The headline and subtitle — by tier')
p('Tier comes from the total score across the 9 scored questions: ' +
  '**Untapped** ≤14, **Earned** 15–20, **Compounding** 21+.')
p(table(Object.keys(R_HEAD).map((k) => [k, R_HEAD[k], TIER_COPY[k]]),
  ['Tier', 'Headline', 'Card subtitle']))

p('### The paid-growth line — by the answer to Q7')
p('Q7 is *"If you paused paid acquisition for a quarter, what would happen?"*. ' +
  'This line sits directly under the headline.')
p(table([
  ['1 — "New growth would mostly stop"', "You told me: pause paid, and your growth would mostly stop. That's the gap your fans can close."],
  ['2 — "It would drop a lot"', 'You told me: without paid, your growth would drop a lot. Your fans can carry more of it.'],
  ['3 — "It would continue"', 'You told me: your growth would mostly hold without paid. Rare. Now widen the lead.'],
], ['Their answer', 'Line shown']))

p('### The biggest opportunity — by weakest discipline')
p('Whichever of the four scores lowest. On a tie, the earliest in the order ' +
  'Brand → Community → Product → Growth wins, and the line changes shape to name ' +
  'both (*"X and Y are level-pegging at N% fan-led…"*).')
p(table(Object.keys(LEAK_COPY).map((k) => [k, LEAK_COPY[k]]), ['Weakest', 'Text shown']))

p('### "Your move" — same trigger')
p('Always prefixed **"Start here:"**.')
p(table(Object.keys(MOVE_COPY).map((k) => [k, MOVE_COPY[k]]), ['Weakest', 'Text shown']))

p('---', '## Part 5 — the pre-launch result, and what triggers each line')

p('### The verdict')
p('Driven by the **lowest** of the five answers, so one weak area sets it — ' +
  'the fuel question can cap the whole verdict on its own.')
p(table([
  ['Any answer is 1', 'Not ready yet'],
  ['Lowest answer is 2', 'Nearly there'],
  ['All answers are 3', 'Ready to build'],
], ['Condition', 'Verdict']))

p('### The line under the verdict — by what is holding them back')
p('Shows the reason for whichever area is lowest. On a tie, the order is ' +
  'Fuel → Brand → Community → Product → Growth.')
p(table(Object.keys(REFRAME).map((k) => [k, REFRAME[k]]), ['Binding area', 'Text shown']))
p('**When everything is a 3 instead:** "' +
  "You've got something to feed the growth engine, and one worth feeding. Now build, in the order these checks point to." + '"')

p('### "Fix this first" — by the same binding area')
p(table(Object.keys(GATE_WHY).map((k) => [k, GATE_WHY[k]]), ['Binding area', 'Text shown']))
p('**When everything is a 3:** "Nothing’s holding you back. The growth engine’s ' +
  'built and the fuel is lined up. Your job now is the build order, hardest-earned part first."')

p('### "Your move" — by the same binding area')
p('Always prefixed **"Start here:"**.')
p(table(Object.keys(MOVE_PRE).map((k) => [k, MOVE_PRE[k]]), ['Binding area', 'Text shown']))
p('**When everything is a 3:** "move into the build with a measurement baseline ' +
  'from day one, so the full Fan Score has real numbers the moment you launch."')

p('### The level words')
p('Used on every pill in the pre-launch result.')
p(table(LEVEL_WORD.map((w, i) => [String(i + 1), w]), ['Answer', 'Shown as']))

await writeFile(OUT, out.join('\n'), 'utf8')
console.log(`copy-inventory: wrote ${OUT.replace(ROOT + '/', '')}`)
console.log(`  ${LQ.length} live questions, ${C.length} pre-launch questions, ` +
  `${Object.values(SCREEN_COPY).flat().length} fixed lines, all verified against the page.`)
