# Design critique: /services ("Work with me")

**Written:** 22 Jul 2026
**Follows:** `review-services-copy-v1.md` (copy pass, same page)
**Method:** measured live at 1280x900 and 390x844, computed styles. Homepage and
`/fan-led-growth` measured the same way for comparison.

---

## Overall impression

**This page never got the lighter rebuild.** Everything the homepage work
diagnosed on 21 July is still here, and in one respect worse: headings at
weight 800, and a hero-to-section ratio of **1.0** where the homepage now runs
2.05. Five of the eight h2s are the exact same size as the h1.

The structure underneath is the strongest on the site. It does not need
redesigning. It needs the type system the other two pages already have.

---

## The headline finding: it is the un-lightened page

Measured at 1280px.

| | Homepage | /fan-led-growth | **/services** |
|---|---|---|---|
| h1 | 84px **@700** | 84px **@700** | **76.8px @800** |
| Section h2 | 41px @700 | 41px @700 | **76.8px @800** |
| **Hero → section ratio** | **2.05x** | **2.05x** | **1.0x** |
| Card / step h3 | 20.5px @700 | 20.5px @700 | 20.5px **@800** |
| Lede | 16.8px | 16.8px | **20px** |
| Section padding | 96px | 96px | **115.2px** |
| Close padding | 110px | 110px | **140.8px** |
| Page height | 5,800px | 4,967px | **8,819px** |

The five offer titles ("The Fan Engine™.", "Sentiment SOS.", "Fan Programs.",
"Fan Moments.", "Advisory.") and the closing headline are all **76.8px at
weight 800**, identical to the h1. So the page shouts eight times at the same
volume and nothing recedes. This is precisely the "no hierarchy release"
diagnosis in `homepage-density-analysis.md`, which said:

> "Seven section headings all sit within shouting distance of hero volume.
> Nothing recedes, so the eye never gets a rest. This is the structural reason
> the page feels relentless rather than merely long."

On the homepage that was a 1.5x ratio and it was fixed to 2.05. Here it is 1.0.

**Two h2s already behave**: the index heading and "I go deep..." are 38.4px.
So the page already contains the right answer, applied to two of eight.

### Recommended

Adopt the shared scale. The values are the same ones the other two pages pull
from `src/lib/scale.js`, applied here through `ServicesPage.css` rather than
inline:

| Element | Now | Proposed |
|---|---|---|
| `.svc-hero__title` | 76.8 @800 | **84 @700** (`T.h1`) |
| `.svc-eng__title` (×5) | 76.8 @800 | **41 @700** (`T.h2`) |
| `.svc-finale__title` | 76.8 @800 | **60 @700** (`T.h2close`) |
| `.svc-index__title`, How-I-work h2 | 38.4 @800 | **41 @700** (`T.h2`) |
| `.svc-how__step h3`, `.svc-phase__label` | @800 | **@700** |
| `.svc-hero__lede` | 20px | **16.8px** (`T.lede`) |
| Band padding | 115.2 | **96** (`SECTION_PAD`) |
| Finale padding | 140.8 | **110** |

Nothing moves, nothing is cut. The hero gets *bigger* (76.8 → 84) and the page
still loses roughly a fifth of its height, because the five 76.8px offer titles
come down to 41.

## The index nav: an asset, and the one thing I would resize

You asked whether the six-row index is a problem. **No. It is the best idea on
the page** and the reason this page is easier to buy from than anything else on
the site: six offers, each with a one-line promise, all skimmable before any
commitment.

The issue is purely its size. Measured:

- Each row is **135px tall**, and there are six
- The nav is **813px** total, taller than a laptop viewport
- Row names are **35.2px at weight 800**, in red

So the skim layer occupies a full screen and its rows are typographically
louder than most sites' page titles. A skim layer should be *fast*, and 813px
is not fast: you cannot see the six options at once, which is the entire point
of an index.

**Recommended:** bring the row name to around 24px at 700 and let each row sit
near 76px. Six rows then come in under 460px, so the whole index fits one
screen and can be taken in at a glance. Nothing is removed.

## Visual hierarchy

- **What draws the eye first:** the h1, correctly. But two screens later "The
  Fan Engine™." is the same size, so the page has no memory of where you are.
- **Reading flow:** the offer blocks are a split layout, title left at x=48 and
  content right at x=586. That is deliberate and works. It also means the five
  offer titles are the only thing in the left column, which is exactly why they
  do not need to be 76.8px to be found.
- **Emphasis:** the four-beat structure (Need it when / What you get / Payoff /
  Proof) is carried by bold labels that are currently failing contrast, below.

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| **Heading weight** | 800 across the page; 700 everywhere else on the site | Move to 700 |
| **Hero→section ratio** | 1.0 vs 2.05 on both rebuilt pages | Offer titles to `T.h2` |
| **Content width** | `.container` runs full-bleed to x=0 at 1280 and 1280px wide. The rebuilt pages use `INNER` (1180 cap, content starting x=114) | Worth reconciling, but it is a bigger call than this pass |
| **Band padding** | 115.2 / 140.8 vs the site's 96 / 110 | Adopt `SECTION_PAD` |
| Lede | 20px vs 16.8px | Adopt `T.lede` |

## Accessibility

Four genuine failures, all of them from red or low-opacity text on dark grounds.
None exist on the two rebuilt pages.

| Element | Colour on ground | Ratio | Needs | |
|---|---|---|---|---|
| **"Protect" / "Grow" kickers** | `#C8362B` on `#2D2723` | **2.82** | 4.5 | 🔴 |
| **"Need it when:" / "What you get:" / "Payoff:"** | `#E7D9AD` on `#A12A1E` | **2.82** | 3.0 | 🔴 |
| **Duration lines** ("6 to 8 weeks...") | cream at 55% on `#A12A1E` | **3.04** | 4.5 | 🔴 |
| Primary buttons ("Let's talk") | `#EFE9DC` on `#C8362B` | **4.32** | 4.5 | 🟡 |

The middle one matters most: those three labels are the page's structural
spine, repeated fifteen times, and on the oxblood band they are the hardest
text on the page to read.

**Recommended:** the labels take `#FBF3E4` on oxblood (the cream this site
already uses on that ground, 5.9). The kickers take the same treatment the
Eyebrow component uses, which exists precisely for this: gold on dark, never
red. The duration lines go from 55% to about 75% opacity.

The button one is site-wide, not this page's doing, and is the same 4.32 the
nav "Get in touch" carries. Worth a separate pass.

**Passing:** touch targets are 64px on mobile, no horizontal overflow at 390px,
all grids collapse cleanly, and there is no hover motion on non-links.

## What works well

- **The four-beat offer structure.** Need it when / What you get / Payoff /
  Proof, five times, with a price and duration line. It is the clearest
  commercial page on the site and it should not change.
- **The index.** See above. The idea is right, only the scale is wrong.
- **Band rhythm.** bone, oxblood, grey, dark, bone, grey, bone, deep, oxblood.
  No two adjacent bands share a ground.
- **Proof placement.** Every offer carries its own proof card with a real
  number, in the block where the reader is deciding.

## OUTCOME (applied 22 Jul 2026)

### What was done

**The type scale.** `/services` now matches the homepage and
`/fan-led-growth` exactly:

| | Before | After | Site |
|---|---|---|---|
| h1 | 76.8 @800 | **84 @700** | 84 @700 ✅ |
| Offer titles (×5) | 76.8 @800 | **41 @700** | 41 @700 ✅ |
| Close | 76.8 @800 | **60 @700** | `T.h2close` ✅ |
| **Hero → section ratio** | **1.0** | **2.05** | 2.05 ✅ |
| Lede | 20 | **16.8** | 16.8 ✅ |
| Band padding | 115.2 | **96** | 96 ✅ |
| Close padding | 140.8 | **110** | 110 ✅ |

**The index.** Row name 35.2 @800 → ~24 @700, row padding 1.6rem → 1.15rem.
Rows are 135px → **104px**, the nav 813px → **622px**. It now fits one screen
with its heading. Not the ~460 I estimated: each row stacks a name over a
one-liner, so the floor is higher than the type alone.

**Three contrast failures fixed.**

| Element | Was | Now |
|---|---|---|
| "Protect" / "Grow" kickers | 2.82 | gold, **8.7** |
| "Need it when / What you get / Payoff" (dark + grey bands) | 2.82 | gold, **8.7** |
| Same labels on oxblood | 2.82 | cream, **6.58** |
| Duration lines | 3.04 | **5.4** |
| Kicker on the bone band | 4.32 | `#8E2520`, **7.13** |

Nothing page-specific fails now. What remains is site-wide and untouched: every
primary button is cream on red at **4.32** against a 4.5 minimum (this is the
nav "Get in touch" too), and the footer meta line is 2.72. Both are one-line
fixes but they land on every page, so they are their own decision.

Mobile re-checked at 390: no overflow, h1 44.8, h2 28.8, 64px touch targets.

### Honest correction: I predicted this would cut a fifth of the height

It cut **6%**. 8,819px → **8,255px**.

I was wrong about why the page is tall, and the measurement shows it. The offer
blocks are a 5fr/7fr grid with a sticky left column: the title sits alone on the
left, and the block's height is set entirely by the **right** column. Shrinking
the titles from 77px to 41px fixed the shouting and changed the length hardly at
all, because those titles were never what was making the block tall.

### So what is actually making it long

| Band | Height | Share |
|---|---|---|
| **The Fan Engine** | **1,406** | 17% |
| Advisory | 806 | |
| Fan Moments | 798 | |
| Sentiment SOS | 774 | |
| Fan Programs | 743 | |
| **Five offer bands together** | **4,527** | **55%** |
| The index | 957 | 12% |
| How I work | 654 | |
| Proof band | 537 | |
| Finale | 560 | |
| Hero | 603 | |

Inside the Fan Engine block, the four phase cards ("What you get, end to end")
are **495px on their own**, which is more than half of what a whole other offer
occupies.

**The page is long because it carries five offers at full depth, not because it
is badly typeset.** Typography was worth fixing on its own terms, and the
hierarchy is genuinely repaired, but no amount of further styling gets this
under ~8,000px.

### The one lever left, and it is not a design change

Move the Fan Engine's four phase cards to `/fan-engine`.

- Takes **~500px** off this page, the single biggest object on it
- Gives `/fan-engine` the thing it currently lacks: that page explains the
  method but never says what you actually get
- Costs `/services` nothing a buyer needs at that moment: the block still has
  its framework paragraph, its Need-it-when, its Payoff, its proof, its price
  and two CTAs, plus a "How the Engine works" link already sitting in the left
  column

This is the same recommendation as `copy-reduction-inner-pages-v1.md`, now with
a measurement behind it. The alternative (folding five offers into three) is
bigger and is a business decision about the offer set.

---

## Priority recommendations (as written before the work above)

1. **Adopt the shared type scale.** Offer titles 76.8 → 41, weight 800 → 700,
   hero 76.8 → 84. This is the whole brief in one change: it restores the
   hierarchy release, cuts roughly a fifth of the page height, and takes nothing
   away.
2. **Fix the three contrast failures.** The "Need it when" labels especially,
   since they are the page's spine and repeat fifteen times.
3. **Halve the index rows.** 135px → ~76px, so all six options fit one screen
   and the skim layer can actually be skimmed.
4. **Then re-measure.** With 1 and 3 done the page should land near 6,500px from
   8,819px, without a word being cut.

Band padding (115 → 96) is worth doing with 1, since both live in the same file.
