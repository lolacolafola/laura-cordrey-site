// The Fan Score's tier boundaries, expressed as the percentage Fan Value sees.
//
// Why this file exists: the two tools were banding the same person differently.
//
// scoreLive() in FanAuditPage.jsx tiers off the RAW total (`core`, range 9–27):
// Untapped ≤14, Earned 15–20, Compounding 21+. It then converts to a percentage
// with ((core - 9) / 18) * 100 and hands only that number to
// /fan-value?score=. Fan Value never sees `core`, so the same boundaries have to
// be restated in percentage terms — and until 28 Jul 2026 they were restated
// wrongly, as 70 and 40. Three of the nineteen reachable scores contradicted
// themselves in a single session:
//
//   core 15 → 33%  Fan Score "Earned"       → Fan Value "Not yet. You're not
//                                              set up to capture it."
//   core 16 → 39%  Fan Score "Earned"       → Fan Value "Not yet."
//   core 21 → 67%  Fan Score "Compounding"  → Fan Value "In part."
//
// Someone was told they were earning fan-led growth, clicked the button on that
// same screen, and was told they were not set up for it.
//
// The numbers below are DERIVED from scoreLive's own thresholds, not chosen:
//   lowest Earned      = core 15 → round(((15 - 9) / 18) * 100) = 33
//   lowest Compounding = core 21 → round(((21 - 9) / 18) * 100) = 67
//
// If scoreLive's thresholds ever move, these move with them. Nothing else
// should band that percentage independently.
export const OWNED_EARNED = 33
export const OWNED_COMPOUNDING = 67

/** The Fan Score tier a given owned-percentage falls in. */
export function tierFromOwned(owned) {
  if (owned >= OWNED_COMPOUNDING) return 'Compounding'
  if (owned >= OWNED_EARNED) return 'Earned'
  return 'Untapped'
}
