# /services: flatten the colours, cut the duplicated Payoff lines

> **SUPERSEDED, 22 Jul 2026.** The colour flattening described here was
> reverted the same day: Laura's read was that it removed the wrong thing.
> The Payoff lines cut here were also restored. Kept for the measurements,
> which are sound. What shipped is in `services-final-rows-22jul.md`.


**Written:** 22 Jul 2026
**Status:** applied to `src/pages/ServicesPage.jsx` / `.css`, **uncommitted**
**Implements** items 1 and 2 of the three queued in
`handover-services-weight-23jul.md`. Item 3 (summary visible, detail
collapsible at `/services-v2`) is untouched and still open.

Everything below was measured in the browser at 1280×800 and 375×812, with the
before figures taken by stashing these two files and reloading, not from the
earlier docs.

---

## What changed

### 1. Flatten the colours

The page cycled **four distinct grounds ten times**: dark hero → cream index →
oxblood flagship → charcoal SOS → dark Fan Programs → cream Fan Moments →
charcoal Advisory → cream How I work → oxblood close.

It is now **three grounds, in three moves**: dark hero, cream body, oxblood
close. Every band from the index to How I work sits on the same cream
(`var(--surface)`, `#EFE9DC`). Two offers are separated by a hairline and the
air around it, not by a colour change.

| | Before | After |
|---|---|---|
| Distinct band grounds | 4 | **3** |
| Ground changes down the page | 10 | **2** |
| Oxblood moments | 2 (flagship + close) | **1 (close)** |

The oxblood now means one thing: the page is over, here is the ask. That is
the site-wide rule settled in `design-rules-arrows-and-close-bands.md`, and
`/services` was breaking it by spending oxblood twice.

**The flagship needed a new marker.** The Fan Engine used to read as the
flagship because it was the only oxblood offer. It now takes a **3px oxblood
top edge** — the only rule on the page thicker than a hairline — and keeps the
two things that already set it apart: it leads the stack, and it is the only
offer carrying the four phase cards.

**The flagship's phase cards inverted.** They were a darkened wash with a cream
hairline and gold labels, tuned for oxblood. On cream they are the same near-
white card the proof cards use, with a dark hairline and `#8E2520` labels.

**Bands in the cream run got tighter.** `clamp(64px,7.5vw,108px)` →
`clamp(48px,5.5vw,76px)` top and bottom, for every cream band that follows
another cream band. A band no longer has to absorb a colour change, so it does
not need as much air to do it.

### 2. Cut the duplicated Payoff lines

Three of the five Payoff lines were their index row said again, nearly
word for word:

| Offer | Index row | Payoff line | Verdict |
|---|---|---|---|
| Sentiment SOS | "Protect. Keep the customers a blow-up would cost you." | "you keep the customers a blow-up would have cost you." | **cut** |
| Fan Programs | "Grow. Growth you don't pay for every time." | "growth you don't pay for every time." | **cut** |
| Fan Moments | "Deepen. Your top customers spend more and stay longer." | "your top customers spend more and stay longer." | **cut** |
| The Fan Engine | "The flagship. The whole engine, powered by your fans." | "more revenue from the customers you already have, from an engine that keeps working after I've gone." | kept |
| Advisory | "One decision, or an embedded role." | "you get the call right the first time, without carrying a full-time hire to do it." | kept |

**The index stays, untouched.** It is the only place all six offers are visible
at once, so it is the comparison layer, and it is now the single home of the
payoff for the three lever offers.

**Why three and not five.** The split is not arbitrary: the three cut are the
three *levers* (Protect / Grow / Deepen), whose index rows lead with the lever
word and then state the payoff. The two kept are the two offers that are not
levers, whose index rows do different work — one marks the flagship, one names
the two shapes Advisory comes in. Rewriting those two index rows to carry the
payoff would have cost that information to buy symmetry.

### 3. One contrast fix, found on the way

The inline-styled **"How I work ↓"** link in the index used `var(--accent)`
(`#C8362B`), which measures **4.32 on cream at 14.4px bold**, under the 4.5
minimum. The three other cream text links on the page already use
`var(--accent-deep)` (`#8E2520`, 7.13) — this one only escaped because it is
styled inline rather than by the class. Now fixed.

This was **pre-existing**, not caused by the flattening. It is the same failure
the file's own comments had already legislated against twice.

---

## Measured result

| | Before | After | Change |
|---|---|---|---|
| Desktop height (1280) | 7,899px | **7,431px** | −468px, **−6%** |
| Mobile height (375) | 10,406px | **9,957px** | −449px, **−4.3%** |
| Words | 982 | **954** | −28 |
| Band grounds | 4 | **3** | |

Benchmarks remain **3,473px and 3,722px** desktop
(`benchmark-services-page-22jul.md`).

**Be clear about what this did and did not do.** It changed how the page
*feels* — the eye is no longer asked to reset nine times on the way down — and
it removed a real redundancy. **It did not meaningfully shorten the page.** At
7,431px it is still roughly **twice** both benchmarks, and the reason is
unchanged: five offers each stacking seven or eight objects. Only a disclosure
pattern (item 3) or one-page-per-offer moves that number materially.

The 6% is in line with the last structural pass, which also predicted ~20% and
delivered 6%. Height on this page comes from the count of objects in the right
column, and neither of these two changes removed an object from it.

## Verification run

- `npm run build` → **19/19 routes snapshotted**
- `/fan-led-growth` inbound links in built HTML: **2 each** in `index.html`,
  `services/`, `fan-engine/`, `faq/` — unchanged
- All six anchors (`#fan-engine`, `#sentiment-sos`, `#fan-programs`,
  `#fan-moments`, `#advisory`, `#how-i-work`) present in the built HTML, so
  the `/ai` deep links still land
- `Payoff:` appears **2×** in the built HTML, as intended
- Contrast re-measured on every recoloured element against the cream ground:
  kicker 7.13, title 15.51, body 5.95, credit meta 5.95, CTA note 5.95, text
  links 7.13, phase label 8.26, phase body 6.89, proof card 17.97. The
  `Need it when:` / `What you get:` labels are 4.32, which passes as large text
  (20px bold, threshold 3.0) and is the pre-existing treatment Fan Moments
  already used on this ground.
- No horizontal overflow at 375px

## Not done

- **Item 3**, the collapsible detail at `/services-v2`. Still the only queued
  change that reaches benchmark parity. Its four non-negotiables are recorded
  in the handover and have not changed.
