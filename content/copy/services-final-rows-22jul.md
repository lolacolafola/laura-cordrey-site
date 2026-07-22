# /services as it shipped: six colour rows that open in place

**Written:** 22 Jul 2026
**Status:** built, verified, committed.
**Supersedes** `services-flatten-and-payoff-v1.md`,
`copy-services-v3-cards-and-ticks.md`, `services-rebuild-accordion-22jul.md`
and the eight options in `services-weight-options.md`. Those are kept for their
measurements and their reasoning, all of which still holds.

---

## The page

```
hero              dark #15110F  (inherits the site body, like every inner page)
offers band       cream #EFE9DC
  01 Fan Engine™  gold      #D4C896
  02 Sentiment SOS  espresso #15110F
  03 Fan Programs   espresso #15110F
  04 Fan Moments    espresso #15110F
  05 Advisory       near-white #FBF3E4
For AI companies  brown #2D2723, with the E3 photograph
How I work        cream #EFE9DC   (OG, unchanged)
Close             oxblood #A12A1E
```

Each offer is a full-width row. The face carries a letterspaced kicker, the
title over two lines with the last word in red and a full stop, a teaser in the
right column, and a plus at the top right. Clicking anywhere on the face opens
the row in place.

**Open, a row reads exactly like the old offer band**: the same 4fr/8fr split,
title on the left, and on the right the original Need it when / What you get /
Payoff / Proof card / duration / CTA, in the original order, using the original
classes. The Fan Engine™'s four phases are there too.

**The offer copy is the OG copy**, restored verbatim from `81af613`. An
intermediate version cut it to tick lists and lost the diagnosis; that was
reverted. The only new copy is the five teaser lines.

## Height

| | |
|---|---|
| Before (OG bands) | 7,899px |
| Now, all rows closed | **4,005px** |
| Now, flagship open | ~5,130px |
| Benchmarks | 3,473 and 3,722 |

## Decisions that are settled, and should not be relitigated without a reason

1. **Rows start closed.** This supersedes the "flagship opens by default" rule
   in `handover-services-weight-23jul.md`, which was written when the rows were
   plain text and the page needed something to show.
2. **Plus opens, arrow navigates.** The five offers get a plus that rotates to
   an x. The AI band is a link and keeps an arrow.
3. **No sheen, no sweep.** A hover sheen was tried, thinned, and removed. It is
   the homepage's *entrance* effect, sized for a ~340px card; on a 1,184px row
   it reads as a wipe. Hover is now a ground shift plus the plus filling in.
4. **Do not remove the dark hero.** It has no background of its own — measured
   `rgba(0,0,0,0)` — it sits on the site-wide body ground, exactly as the heroes
   on `/about`, `/fan-engine`, `/fan-led-growth`, `/speaking` and `/ai` do.
   Removing it would make `/services` the only page that opens light. It is also
   what the gold flagship row lands against.
5. **No sparkles on the close.** Removed; the halo stays.
6. **The Brusson quote is gone.** ⚠️ It is NOT duplicated on `/about` — it
   survives on the homepage only, so this page now carries no third-party
   voice. Deliberate, but worth revisiting.

## The four SEO rules, still verified

1. **Panels are CSS-hidden, never unmounted.** Confirmed in the built HTML with
   every row closed: "loops designed like a game", "the real cause found in
   days", "you get the call right the first time" are all present.
2. **Hash deep links open their row.** `/services#fan-moments` on a cold load.
   `/ai` carries both links, verified 2 in `dist/ai/index.html`.
3. Flagship default — **superseded**, see above.
4. **More than one open at once.** Verified.

Plus: build **19/19 routes**, `/fan-led-growth` inbound links **2 each** in
`index.html`, `services/`, `fan-engine/` and `faq/`.

## Contrast, measured on every ground

| Ground | Range |
|---|---|
| Gold `#D4C896` | 5.13 – 11.17 (face), 5.13 – 6.79 (panel) |
| Espresso `#15110F` | 5.04 – 15.51 (face), 8.26 – 13.34 (panel) |
| Near-white `#FBF3E4` | 4.53 – 8.67 |
| Brown `#2D2723` (AI) | 7.04 – 12.17 |

**Three traps found the hard way, all worth knowing:**

- **The section wrapper is `svc-band--bone`**, so every light-ground override in
  the file also matches the dark rows nested inside it. Dark-row panel text was
  being painted in the cream palette at 2.18–2.61 until
  `.svc-row--espresso` overrides were added. Any new element in a dark row
  needs the same treatment.
- **The proof card** is a cream inset on every row. The original file guards
  this, but its rules are scoped to `.svc-eng__right`, which this markup does
  not use — so proof text was cream-on-cream at **1.16** until
  `.svc-row__body .svc-proofcard p` was added.
- **Gold is lighter than the cream rows**, so muted browns that hold on
  `#FBF3E4` fail on `#D4C896`. The gold panel needed everything one shade
  darker. Applying a ground to a row is not finished until the panel inside it
  is re-measured.

## Naming

**It is never "the Engine". It is always the Fan Engine™, always with the
mark.** Now a rule in `CLAUDE.md`. Fixed in this pass on `/services`,
`/fan-value`, `/fan-score`, `/contact` and `/faq`.

One left: the **`/faq` meta title is 68 characters against a 60 limit**, before
any change. Not touched, so as not to worsen it. Needs a separate fix.

## Open

- **The teaser line for the Fan Engine™.** Recommended change is
  "The one method I built. Your fans do the selling." Reasoning in
  `services-teaser-hero-close-review-22jul.md`. Not applied.
- **The close carries three CTAs.** Recommended cutting "Size your Fan Value".
  Not applied.
- **The AI band photograph** is the E3 portrait as a placeholder. Laura wants a
  sentiment-graph image that Claude generated in an earlier chat; it is not in
  this repo, its git history, the other checkout, the published artifacts, or
  Downloads/Desktop. It needs to be re-exported from that conversation.
- **Dead CSS.** The OG offer-band rules that this rebuild stopped using are
  still in `ServicesPage.css`. A follow-up pass, not part of this change.
