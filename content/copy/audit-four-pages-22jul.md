# Audit: /speaking, /ai, /about, /fan-engine — before the lighter rebuild

**Measured:** 22 Jul 2026, live at 1280×800 on the dev server. Every number
below came out of the browser, not out of a reading of the CSS. The services
handover is explicit that the claims that failed last session were the ones
asserted without measuring, so this file is the baseline the next one is
checked against.

**Supersedes nothing.** Companion to `handover-services-weight-23jul.md`.

---

## The four pages, as they stand

| Page | Height | Words | h1 | h2 | ratio |
|---|---|---|---|---|---|
| `/speaking` | 4,574px | 395 | 58.9 @800 | 35.8 @800 | 1.64 |
| `/ai` | 5,523px | 808 | 56.3 @800 | 38.4 @800 | **1.47** |
| `/about` | 7,480px | 690 | 76.8 @800 | 76.8 @800 | **1.00** |
| `/fan-engine` | 4,856px | 602 | 81.9 @800 | 60.8 @800 | 1.35 |

Reference points, all measured the same way:

| | Height | h1 | h2 | ratio |
|---|---|---|---|---|
| `src/lib/scale.js` target | | 84 @700 | 41 @700 | **2.05** |
| `/services`, after 51bfe9e | 4,005px | 84 @700 | 41 @700 | 2.05 |
| Benchmarks, 22 Jul | 3,473 / 3,722px | | | |

**None of the four has been through the 21 Jul lighter rebuild.** Every heading
on all four pages is weight 800. None of them imports `scale.js`; all four are
styled in their own CSS file with their own literal values.

### /about is the services bug again, and worse

Five separate headings compute to **76.8px at weight 800**: the hero title, the
manifesto title, three `about-eng__title`s, the `section-head__title`s and the
close. The ratio is **1.00** — exactly the failure `4381bab` describes on
`/services`, where nothing recedes because everything is the size of the h1.

It is also the least dense page on the site: **7,480px for 690 words.**
`/services` carries 984 words in 4,005px. `/about` spends nearly twice the
height on two thirds of the words.

### /fan-engine shouts second-loudest

The h2 is **60.8px** — larger than the h1 on `/speaking` (58.9) and `/ai`
(56.3). A section heading on one page outweighing the page title on another is
the clearest sign these four were never tuned against each other.

---

## Contrast, WCAG AA

Footer, nav and `.btn--primary` are excluded throughout: the services handover
records those as site-wide and their own decision (buttons 4.32, footer meta
2.72). Everything below is specific to these four pages.

### /about — 5 failures

| What | Colour on ground | Ratio | Needs |
|---|---|---|---|
| red `<mark>`, "before it turns", 76.8px | `#C8362B` on `#2D2723` | **2.82** | 3 |
| body copy, 20px, ×4 | `#8A8078` on `#2D2723` | 3.81 | 4.5 |
| `.marker` kickers on cream, ×2 | `#C8362B` on `#EFE9DC` | 4.32 | 4.5 |
| close kicker on oxblood | `#D4C896` on `#A12A1E` | 4.36 | 4.5 |

The mark is the one that matters: **this is the same failure Laura caught last
session** on the `/services` oxblood close, where a red `<mark>` on a red ground
measured 1.4. Here it is red on dark at 2.82. The pattern is that the mark
colour never gets re-checked when the band under it changes.

### /ai — 6 failures

| What | Colour on ground | Ratio | Needs |
|---|---|---|---|
| `ai-cred__where` | `#8A8078` on `#2D2723` | 3.81 | 4.5 |
| `ai-finale__mail` | cream @ .7 on `#A12A1E` | 4.01 | 4.5 |
| discipline labels, ×4 | `#8A8078` on `#241D19` | 4.30 | 4.5 |
| `ai-eyebrow--red` | `#C8362B` on `#EFE9DC` | 4.32 | 4.5 |
| `ai-card__num` / `--num-i`, ×7 | `#E0574B` on `#241D19` | 4.45 | 4.5 |

### /speaking — 3 failures

| What | Colour on ground | Ratio | Needs |
|---|---|---|---|
| `sp-eyebrow--red` | `#C8362B` on `#150F0F` | 3.59 | 4.5 |
| `sp-kicker--bright`, ×4 | `#E0574B` on `#2D2723` | 3.95 | 4.5 |
| `sp-finale__mail` | cream @ .7 on `#A12A1E` | 4.01 | 4.5 |

### /fan-engine — 4 failures, all near-misses

| What | Colour on ground | Ratio | Needs |
|---|---|---|---|
| `meth-proofstrip__sep` | gold @ .45 | 3.15 | 4.5 |
| `meth-close__back` | cream @ .7 on `#A12A1E` | 4.01 | 4.5 |
| `meth-schematic__note`, ×4 | `#8A8078` | 4.30 | 4.5 |
| `meth-stages__num`, ×5 | `#C8362B` | 4.32 | 4.5 |

### The repeat offenders

Three failures recur across pages and should be fixed as one rule, not four
times over:

1. **Red on a dark ground.** `#C8362B` and `#E0574B` measure 2.8–4.4 on every
   dark band on the site. `Eyebrow.jsx` already carries the finding and the
   rule: gold on dark grounds, never red. These four pages predate it.
2. **`cream @ 0.7` on oxblood**, in the "Or email" line, on three of the four
   pages. 4.01 every time. It is one shared pattern with one fix.
3. **`#8A8078` on the mid-dark bands** (`#2D2723`, `#241D19`). 3.81–4.30. The
   token is `--ink-muted`, specified for body on dark, and it does not clear AA
   on the *lighter* dark grounds.

---

## Two things worth knowing before touching these

- **`/fan-engine` and `/speaking` are already near the benchmark on height.**
  4,856 and 4,574 against 3,473/3,722. Neither is a length problem, so a copy
  cut is not the lever. Both are weight and hierarchy problems.
- **The type fix is not a height lever.** Recorded in the services handover: a
  20% saving was predicted for it and 6% arrived. On `/about` the h1 comes
  *down* and the h2s come down hard, so some height will follow, but the number
  to expect is single digits unless structure changes too.

## How these were measured

Dev server on port **5176** (5173–5175 held by other sessions), viewport
1280×800. Contrast walks every element with a text child, resolves the ground
by climbing to the first opaque ancestor background, composites `rgba`/`color()`
foregrounds over it, and applies the AA thresholds (3.0 for ≥24px or ≥18.66px
bold, else 4.5).

One trap, hit and fixed while writing this: Chrome returns some colours as
`color(srgb 0.93 0.91 0.86 / 0.84)` with channels in **0–1**, not 0–255. A
parser that assumes 0–255 reports cream-on-black at **1.09** and invents
failures that are not there. Three phantom failures came out of it before the
parser was corrected.
