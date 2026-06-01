/* Editorial line-art icons for the 5 Flywheel stages.
 * Single-stroke, abstract, no fills. Stroke colour inherits from CSS
 * (currentColor) so we can tint via .meth-stage__icon { color: ... }.
 * All sized in a 48-viewBox; render at 64–160px on the page. */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

// 01 — Activation: a rocket (launch, lift-off, the moment that takes off)
export function IconActivation(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      {/* body */}
      <path
        d="M24 4 Q 30 12 30 22 L 30 32 L 18 32 L 18 22 Q 18 12 24 4 Z"
        {...stroke}
      />
      {/* window */}
      <circle cx="24" cy="19" r="2.5" {...stroke} fill="currentColor" />
      {/* left fin */}
      <path d="M18 24 L 12 34 L 18 31 Z" {...stroke} />
      {/* right fin */}
      <path d="M30 24 L 36 34 L 30 31 Z" {...stroke} />
      {/* exhaust flames */}
      <line x1="21" y1="33" x2="22" y2="40" {...stroke} />
      <line x1="24" y1="33" x2="24" y2="43" {...stroke} />
      <line x1="27" y1="33" x2="26" y2="40" {...stroke} />
    </svg>
  )
}

// 02 — Habit: a stopwatch (rhythm, return, daily ritual)
export function IconHabit(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      {/* crown */}
      <rect x="21" y="5"  width="6" height="3"  {...stroke} />
      <line x1="22" y1="8" x2="22" y2="11" {...stroke} />
      <line x1="26" y1="8" x2="26" y2="11" {...stroke} />
      {/* side button */}
      <line x1="37" y1="11" x2="40" y2="14" {...stroke} />
      {/* clock body */}
      <circle cx="24" cy="28" r="14" {...stroke} />
      {/* 12 o'clock tick */}
      <line x1="24" y1="16" x2="24" y2="18.5" {...stroke} />
      {/* hand pointing to ~2 o'clock */}
      <line x1="24" y1="28" x2="32" y2="22" {...stroke} />
      {/* centre dot */}
      <circle cx="24" cy="28" r="1.75" {...stroke} fill="currentColor" />
    </svg>
  )
}

// 03 — Belonging: a heart (love, connection, belonging)
export function IconBelonging(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path
        d="M24 40 C 4 25, 8 10, 17 10 C 21 10, 24 14, 24 17 C 24 14, 27 10, 31 10 C 40 10, 44 25, 24 40 Z"
        {...stroke}
        fill="currentColor"
        fillOpacity="0.92"
      />
    </svg>
  )
}

// 04 — Identity: a gem-cut diamond (status, self, the thing made of you)
export function IconIdentity(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      {/* outer silhouette: table top, crown shoulders, pavilion point */}
      <polygon points="18,8 30,8 38,18 24,42 10,18" {...stroke} />
      {/* girdle — the line where crown meets pavilion */}
      <line x1="10" y1="18" x2="38" y2="18" {...stroke} />
      {/* crown facets (table corners → girdle) */}
      <line x1="18" y1="8" x2="14" y2="18" {...stroke} opacity="0.55" />
      <line x1="30" y1="8" x2="34" y2="18" {...stroke} opacity="0.55" />
      {/* pavilion facets (girdle corners → point) */}
      <line x1="14" y1="18" x2="24" y2="42" {...stroke} opacity="0.55" />
      <line x1="34" y1="18" x2="24" y2="42" {...stroke} opacity="0.55" />
      {/* centre axis (subtle, holds it together) */}
      <line x1="24" y1="8" x2="24" y2="42" {...stroke} opacity="0.35" />
    </svg>
  )
}

// 05 — Advocacy: radiating lines from a centre (broadcast, spread)
export function IconAdvocacy(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <circle cx="24" cy="24" r="5" {...stroke} fill="currentColor" />
      <line x1="24" y1="6"  x2="24" y2="12" {...stroke} />
      <line x1="24" y1="36" x2="24" y2="42" {...stroke} />
      <line x1="6"  y1="24" x2="12" y2="24" {...stroke} />
      <line x1="36" y1="24" x2="42" y2="24" {...stroke} />
      <line x1="11" y1="11" x2="15" y2="15" {...stroke} />
      <line x1="33" y1="33" x2="37" y2="37" {...stroke} />
      <line x1="37" y1="11" x2="33" y2="15" {...stroke} />
      <line x1="15" y1="33" x2="11" y2="37" {...stroke} />
    </svg>
  )
}

export const stageIcons = {
  Activation: IconActivation,
  Habit: IconHabit,
  Belonging: IconBelonging,
  Identity: IconIdentity,
  Advocacy: IconAdvocacy,
}
