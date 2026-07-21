# Homepage density: what actually makes it feel heavy

Branch: `homepage-lighter` (off `main` @ 81a3dbd)
Date: 21 Jul 2026
Benchmark: anastasiashtompel.com
Status: **built and parked at `/home-v2`.** The live `/` is untouched, so the
two can be compared before deciding. Nothing is pushed.

Measured outcome of the build, at 1280px:

| | Live `/` | New `/home-v2` | Benchmark |
|---|---|---|---|
| Hero h1 | 102px @ 800 | **76px @ 700** | 75px @ 400 |
| Section h2 | 54–67px @ 800 | **41px @ 700** | 30–42px @ 400 |
| Hero → section drop | 1.5x | **1.85x** | 2.5x |
| Words | 1,083 | **606** | 752 |
| Words per screen | ~100 | **75** | 74 |
| Page height | 9,761px | **~5,800px** | 9,136px |

---

## The headline finding: it is not font size

Measured both homepages live at 1280px viewport.

| | Laura (current) | Anastasia | |
|---|---|---|---|
| h1 (hero) | **102px** | 75px | Laura 36% bigger |
| Section h2s | **54–67px** | 30–42px | Laura ~60% bigger |
| Body copy | 16px base | 15.8px | same |
| Heading weight | **800** | **400** | the real gap |
| Total words | **1,083** | 752 | Laura +44% |
| Words per screen | **~100** | ~74 | Laura +35% |
| Page height | 9,761px | 9,136px | comparable |

The instinct that "her font is not as big as mine" is measurably backwards.
Laura's type is considerably larger at every level. What reads as "lighter" on
the benchmark comes from four other things.

---

## The four actual causes

### 1. Weight, not size (biggest single lever)
Every heading on the site is Manrope 800. The benchmark runs a serif at 400.
An 800-weight geometric sans at 102px puts an enormous amount of ink on screen.
The same words at 700, or at 600 for section heads, lose most of the heaviness
without losing any size or authority.

### 2. No hierarchy release
The benchmark drops from a 75px hero to 30–42px for every subsequent heading —
a 2.5x fall. The current homepage drops from 102px to 54–67px — only a 1.5x fall.

Seven section headings all sit within shouting distance of hero volume. Nothing
recedes, so the eye never gets a rest. This is the structural reason the page
feels relentless rather than merely long.

### 3. Word count and the education load
1,083 words versus 752. The extra ~330 words sit almost entirely in two sections
that exist to *explain why fan-led growth works*:

- "You don't buy fans. You earn them." — 211 words, six benefit cards
- "However you got here, fans are the next step." — 174 words, four situation cards

The benchmark homepage does essentially no education. It routes.

### 4. Card-grid monotony
Sections 3, 4, 6 and 7 are all the same shape: kicker → h2 → lede → grid of
bordered cards. Six cards, then four cards, then four cards, then two big cards,
back to back. Only the column count and background colour change. The repetition
reads as density even where the individual sections are not especially dense.

---

## Current structure (8 sections, ~9–11 screens)

1. Hero + trust logo band — `#0E0B09`
2. What it is — `#15110F` — 127 words
3. Why fans — bone — **211 words, 6 cards** ← densest
4. Why you're here — `#15110F` — **174 words, 4 cards**
5. Why me / About + Brusson testimonial — `#0E0B09` — 137 words
6. Proof — `#2D2723` — 4 stat cards
7. Ways to work — bone — **184 words, 2 large cards** ← densest
8. Close — red — 56 words

---

## What the Cowork proposal changes

**Cuts:** "What it is", "Why fans" (6 cards), "Why you're here" (4 cards).
That is the ~500-word density win, and it is the right instinct.

**Adds:** dedicated Speaking section, a Tools section (Fan Score + Fan Value
side by side), an inline contact form.

**Keeps:** hero, trust logos, about, three-ways, case studies, testimonial, close.

### Where the proposal needs adapting rather than adopting

Cowork did not have the design history, so several of its choices duplicate or
regress work that already exists:

- **Flip cards (hover to reveal).** Hides content behind an interaction, adds a
  3D transform to a page whose brief is *calmer*, and the proposal's own mobile
  fallback shows both faces stacked — which demonstrates the flip adds friction
  rather than information. Recommend: static cards, content visible.
- **Inline contact form.** `/contact` already has a branching form (intent →
  need/timeline or speaking fields) wired to Netlify Forms, with hidden field
  registration in `index.html`. A second simpler form either needs new Netlify
  registration or loses the qualification data. Recommend: keep the red close
  as a routing CTA.
- **Placeholder assets.** Real ones exist: `portraits/laura-e3.jpg`, case-study
  imagery, speaking posters in `src/data/speaking.js`.
- **Typography.** The proposal's own scale is *not* meaningfully lighter than
  the current site (69px hero, 40px h2s, all at weight 800). It does not fix the
  weight or hierarchy-release problems diagnosed above.

---

## Recommended type changes

| | Current | Proposed |
|---|---|---|
| Hero h1 | `clamp(2.9rem, 8vw, 7.4rem)` @ 800 | `clamp(2.6rem, 6vw, 4.75rem)` @ 700 |
| Section h2 | `clamp(2.1–2.3rem, 4.4–5.2vw, 3.4–4.4rem)` @ 800 | `clamp(1.8rem, 3.2vw, 2.75rem)` @ 700 |
| Card h3 | `clamp(1.3rem, 2vw, 1.8rem)` @ 800 | `clamp(1.15rem, 1.6vw, 1.4rem)` @ 700 |
| Close h2 | `clamp(2.8rem, 9vw, 7rem)` @ 800 | keep large — this one earns it |

Net effect: hero falls 102px → ~76px, section heads fall ~66px → ~44px. The
hero-to-section ratio moves from 1.5x to 2.4x, matching the benchmark's release.
One deliberate exception at the close, so the page ends loud.

---

## Decisions taken

1. **Job of the page: qualify and route**, not educate. `/methodology` carries
   the fan-led argument and the hero's second CTA points there.
2. **Type: hero ~76px, sections ~44px, weight 700.** Close section stays large
   (60px) so the page still ends loud.
3. **Fan Engine™ becomes one of three equal cards**, as flip card 01.

## Still open

- Section 4 of the live page ("However you got here") was the only place that
  spoke to *where the reader is now*. It is cut entirely in v2. If that voice
  is missed, it could come back as a compressed one-liner rather than four
  cards.
- Azarus (+80% MAU) dropped off the homepage to get the work band to three
  cards. Still on `/work`.
- The close h2 fell from 112px to 60px. Deliberate, but it is a single number
  if the ending now reads too quiet.

---

## Note on checkouts

Three working copies exist. As of this session:
- `~/AI Projects/laura-cordrey-site` — in sync with `origin/main` @ 81a3dbd ✅
- `~/laura-cordrey-site/laura-cordrey-site` — on `website-rework` @ 884c6f6,
  now **fully merged into main**; its local `main` ref is stale

`website-rework` is behind `main` and no longer the active line. The earlier
"commit only from the canonical checkout" note is out of date on this point.
