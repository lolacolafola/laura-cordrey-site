import { T, HEAD_W } from '../lib/scale.js'

// Small uppercase section marker. Extracted from HomePage.jsx on 22 Jul 2026,
// where it was defined inline and then hand-rolled a second time inside
// FanLedGrowthPage.jsx.
//
// Three tones, each tied to a ground — this is a contrast constraint, not a
// style choice. Measured at this size and weight, against the 4.5:1 WCAG AA
// minimum for small text:
//
//   gold #D4C896  on dark  → 11.17  ✓   on cream →  1.39  ✗ unusable
//   red  #C8362B  on dark  →  3.75  ✗   on cream →  4.32  ✗ marginal
//   deep #8E2520  on cream →  7.13  ✓   (bone → 8.26 ✓)
//   ox   #F2D79A  on oxblood #A12A1E → 5.21  ✓
//
// So: `gold` on dark grounds, `deep` on light grounds, `ox` on the oxblood
// close band.
//
// The `red` tone was RETIRED on 22 Jul 2026. It existed only because three
// homepage eyebrows used it on cream, each measuring 4.32 against the 4.5 this
// size needs; that was recorded here as "a site-wide pass still to do" and
// this is that pass. All three moved to `deep` (7.13). The key is kept as an
// alias so an old call site degrades to a passing colour rather than crashing,
// but nothing should use it: the ground picks the tone.
//
// `ox` exists because gold #D4C896 goes muddy on oxblood: it is the
// on-espresso gold. #F2D79A is the pair the homepage close already uses on
// the same ground, so this tone is that value given a name.
const TONES = { gold: '#D4C896', deep: '#8E2520', ox: '#F2D79A', red: '#8E2520' }

export default function Eyebrow({ children, tone = 'gold' }) {
  return (
    <span
      style={{
        display: 'block',
        fontSize: T.marker,
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        color: TONES[tone] || TONES.gold,
        fontWeight: HEAD_W,
      }}
    >
      {children}
    </span>
  )
}
