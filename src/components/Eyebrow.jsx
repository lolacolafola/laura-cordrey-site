import { T, HEAD_W } from '../lib/scale.js'

// Small uppercase section marker. Extracted from HomePage.jsx on 22 Jul 2026,
// where it was defined inline and then hand-rolled a second time inside
// FanLedGrowthPage.jsx.
//
// Gold is the default and red is the accent, not the other way round. Red on
// the dark ground measures 3.75:1 at this size and weight, under the 4.5:1
// WCAG AA minimum for small text; gold measures 11.17:1. So red belongs on the
// cream bands, where it reaches 4.32:1 — still a shade under AA, and worth its
// own site-wide pass, but not a failure this component should spread further.
export default function Eyebrow({ children, tone = 'gold' }) {
  return (
    <span
      style={{
        display: 'block',
        fontSize: T.marker,
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        color: tone === 'gold' ? '#D4C896' : '#C8362B',
        fontWeight: HEAD_W,
      }}
    >
      {children}
    </span>
  )
}
