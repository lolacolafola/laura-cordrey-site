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
//
// So: `gold` on dark grounds, `deep` on light grounds. `red` is kept only
// because it is already in use on the homepage's cream bands; prefer `deep`
// for anything new, and treat the remaining `red` instances as a site-wide
// pass still to do.
const TONES = { gold: '#D4C896', red: '#C8362B', deep: '#8E2520' }

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
