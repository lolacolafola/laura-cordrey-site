# Services v2 — apply the new copy without redesigning

Proposal, 19 Jul 2026. Supersedes nothing (first version).

**Goal:** get the better copy + framing from `services-layout-mock.html` /
handover onto the live Services page **reusing the components already there.**
No new design system. This is re-copy + re-order, plus three small additions the
mock genuinely needs.

Source of truth for wording: the handover deck + mock in the 18 Jul brief.
Live page: `src/pages/ServicesPage.jsx` (+ `.css`).

---

## The headline change

The mock isn't a new design. It's the **same offers, re-ordered and re-framed**:

- **Order flips.** Live page leads with the Fan Engine, then the pieces. The new
  framing leads with the **three pieces** (money-first, "start with one lever"),
  then reveals the Engine as the heavyweight that runs all three. Same
  components, different sequence.
- **Lever tags.** The three pieces get PROTECT / ACQUIRE / DEEPEN.
- **Offer set shifts by one.** Consulting stops being a full offer band and
  becomes a thin Advisory band; a new piece, **Fan Programs (ACQUIRE)**, takes
  the third slot. Net component count is unchanged.

Everything else is copy swaps into blocks that already exist.

---

## What we already have (reuse as-is)

| Mock section | Existing component | Change needed |
|---|---|---|
| Hero | `svc-hero` | Copy + CTA labels only |
| Three pieces (SOS / Programs / Moments) | `svc-eng` band ×3 | Copy + add lever tag |
| The Fan Engine (flagship) | `svc-band--ox` + `svc-eng` | Copy + move below the pieces |
| Client quote (Brusson) | **already built** as `.quotecard` on HomePage | Lift markup across |
| Advisory band | the AI-band pattern (inline-styled thin band) | Copy + $750 |
| How I work (3 steps) | `svc-how__steps` | Light copy edits + honesty line |
| For AI companies | existing thin band | No change |
| Close | `svc-finale` | Copy only |

The handover is explicit that the mock's **three-card grid is a hierarchy
sketch, not a restyle** — the live numbered `svc-eng` bands stay. So we do NOT
build a card component. That removes the only large piece of work.

## What's genuinely new (all small)

1. **Credibility strip** — one thin hairline row under the hero:
   `Thirteen years · Ubisoft · Amazon Games · BlaBlaCar · Acquired by Animoca`.
   ~15 lines of JSX + a few CSS rules. The one net-new element, and the handover
   sanctions it.
2. **Fan Programs section** — a new `svc-eng` band (ACQUIRE). New *copy*, not a
   new component.
3. **"Who you're working with"** — a short text block on the bone ground
   (thirteen years across Ubisoft / Amazon Games / BlaBlaCar / Animoca). Reuses
   the eyebrow + rule + paragraph pattern already on the page.

Plus **lever tags** (PROTECT/ACQUIRE/DEEPEN): reuse `svc-eng__kick`, or ~4 lines
of CSS for a small tag.

## New section order

1. Hero
2. Credibility strip *(new)*
3. "Start with one piece" intro + three `svc-eng` bands: Sentiment SOS (PROTECT),
   Fan Programs (ACQUIRE, *new copy*), Fan Moments (DEEPEN)
4. The Fan Engine — flagship, moved to here, heaviest block
5. Brusson quote *(lift `.quotecard`)*
6. Advisory thin band *(was the Consulting full band)*
7. How I work
8. Who you're working with *(new, small)*
9. For AI companies band
10. Close

---

## CTAs

`/contact` **already reads `?intent=`** and is deep-linkable
(`ContactPage.jsx:59`), so per-offer routing works today. Current intent lanes
are `consulting` / `speaking`; the new intents (`sos`, `programs`, `moments`,
`engine`, `advisory`) will pass through and pre-fill, but won't have a tailored
lane until we add them. Two options — see decisions below.

Hero + Close primary CTA = **Take the 2-min Fan Score** (`/fan-led-growth-audit`).

---

## Effort

Roughly one focused pass. ~80% is text substitution in existing JSX; the only new
markup is the credibility strip, the "Who" block, and lifting the quote card.
No new colours, no new button, no card component, no CSS architecture changes.

## Decisions for Laura (I have a default for each)

1. **Consulting → thin Advisory band?** Mock demotes it. *Default: yes,* it
   matches the money-first ladder. (Alt: keep it a full offer band — less true to
   the new framing.)
2. **Fan Engine edge — gold or keep oxblood?** Mock uses a gold top edge to mark
   the IP. *Default: keep the existing oxblood flagship treatment* (it's already
   the heaviest block once it sits after the pieces); add a gold top edge only if
   you want the extra signal. This is the one spot that risks creeping into
   "redesign."
3. **New contact intents — build lanes or fall back?** *Default: ship with the
   query params now* (they pass through and pre-fill), add tailored lanes later.
   No blocker.

Once you pick, I apply it in one edit pass to `ServicesPage.jsx` / `.css`.
