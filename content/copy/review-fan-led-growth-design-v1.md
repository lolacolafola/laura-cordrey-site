# Design critique: /fan-led-growth ("Why fans")

**Written:** 22 Jul 2026
**Follows:** `review-fan-led-growth-copy-v1.md` (copy pass, same page)
**Method:** measured live at 1280x900 and 390x844, computed styles rather than
eyeballed. Homepage measured the same way in the same session for comparison.

---

## Overall impression

The page holds the homepage's type system exactly, which is the thing that
usually drifts, and it does not. What is off is smaller and more specific:
**the card grids do not line up with the text above them**, two bands sit
off the shared spacing scale, and until this pass the qualification band had
no way out of it.

The editorial mode (light ground, left-aligned) is working. It reads as a
different kind of page from the homepage without reading as a different site.

---

## The three questions asked

### 1. Is the font the same size as the homepage? Yes, exactly.

Measured at 1280px. Both pages import `src/lib/scale.js`, and it shows:

| | Homepage | /fan-led-growth |
|---|---|---|
| h1 | 84px / 700 | **84px / 700** |
| Section h2 | 41px / 700 | **41px / 700** |
| Card h3 | 20.5px / 700 | **20.5px / 700** |
| Lede | 16.8px / 500 | **16.8px / 500** |
| Hero → section ratio | 2.05x | **2.05x** |

At 390px both fall to h1 44.8 / h2 28.8 together. No drift anywhere.

**One difference, and it is the closing headline.** The homepage close
("Tell me about your brand.") is **38.4px**. This page's close ("Stop renting
your growth.") is **60px**, because it uses `T.h2close` from the shared scale
and the homepage does not. So the shared scale has a "close" size that only
one of the two pages uses.

That is worth a decision rather than a fix. This page ends on the loudest
moment on it, and the density notes from yesterday flagged the homepage close
as possibly *too* quiet. Either this page is right and the homepage should come
up, or the homepage is right and this should come down. They should not be 22px
apart by accident.

### 2. Is the spacing the same? Four bands out of six.

`SECTION_PAD` is 96px vertical. This page:

| Band | Padding | |
|---|---|---|
| Hero | 115 top / 96 bottom | custom, fine for a hero |
| The evidence | **70 / 70** | off-scale |
| Why fans | 96 / 96 | ✅ |
| What to do about it | **83 / 83** | off-scale |
| Who it's for | 96 / 96 | ✅ |
| Where to start | 110 / 110 | matches the homepage close ✅ |

The homepage is 96 on every band and 110 on the close, with no exceptions.

The 70 on the evidence band is defensible: it is a slim proof strip between two
big sections, and the tighter padding is what makes it read as a strip. **The 83
is not.** "What to do about it" is a full band with a heading, two paragraphs
and a CTA, the same weight as its neighbours at 96. It is 13px tighter for no
reason a reader could name.

### 3. Are the CTAs the same? Primary yes, secondary no.

| | Homepage | /fan-led-growth |
|---|---|---|
| Primary | `.btnp` #C8362B, 15/28 pad, 57px tall, 3px radius | **`.flg-btnp`, identical** |
| Secondary | `.btnink` solid #15110F, cream 28% border | `.flg-btnsoft` cream **9% wash**, cream 22% border |

The primary is pixel-identical, which is right. The secondary is a second
treatment of the same idea. There is a reason: `.btnink` is a solid ink button,
and on this page's near-black close it would sit almost invisibly on its own
ground, so a translucent wash is the sensible call.

But the system now has two secondary buttons, and neither is named for where it
belongs. Worth naming: `.btn--ghost-on-dark` and `.btn--ink-on-light`, then
both pages pull from one place. Not urgent, but it is how this drifts.

---

## Visual hierarchy

**What draws the eye first:** the h1, then the red `mark` on "into fans", then
the dark pull card. That is the correct order, and the pull card earns its place
by being the only dark object in the first screen.

**Reading flow:** clean top to bottom. The one wobble is the hero, which runs
lede → dark pull card → a further 65-word paragraph. On mobile that is three
stacked prose blocks before any structure appears. The pull card interrupts the
argument rather than punctuating it, because the paragraph after it is longer
than the one before it.

**Emphasis:** the `$560K a year` figure is the most important number on the
page and is currently its lowest-contrast text (see accessibility).

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| **Card grids vs text** | Section headings and prose sit at **x=114**. Both card grids sit at **x=160**, because `GRID_CAP` centres them at 960 max. A 46px mismatch on a strictly left-aligned page. | Drop `GRID_CAP` from this page's two grids so they align at 114 |
| **Grids vs each other** | The evidence stats grid aligns at 114 (no cap). The two card grids are capped. Same page, two rules. | Same fix makes all three agree |
| Close h2 | 60px here, 38.4px on the homepage, both from the shared scale | Pick one (see Q1) |
| Band padding | 83px on "What to do about it" | Move to `SECTION_PAD` (96) |
| Secondary button | Two treatments across two pages | Name them and share them |

The grid one is the most visible, and the new `/services` link makes it more so:
that line starts at 114, under a card that starts at 160, so the eye now has a
staircase where the page is otherwise a straight edge.

`GRID_CAP` came from the homepage, where the surrounding headings are
**centred**, so a centred capped grid is consistent there. Inherited onto a
left-aligned page, it stops being consistent.

## Accessibility

- **Contrast:** everything passes AA except one. `$560K a year` in #C8362B on
  the dark gradient card measures **3.26 to 3.59** depending on where it falls
  on the gradient. At 19.2px/700 it counts as large text, so AA needs 3.0 and
  it passes, but narrowly, and it is the number the whole band exists to show.
  The gold #D4C896 beside it runs 10.1 to 11.2. **Recommendation:** use the
  lighter red (#E4695E, already used in the hero pull card) for this figure. It
  is the same fix already made once on this page.
- Everything else on the estimate card: 6.8 to 15.5. The sources line: 6.9.
  The close's quiet links: 6.2. All comfortable.
- Two site-wide items, not this page's doing: the nav "Get in touch" is 4.32
  (cream on red at 13.1px, just under AA) and the footer meta line is 2.72.
- **Touch targets:** every button is 57px tall at 390px. Fine.
- **Reduced motion:** scroll reveals are gated on `prefers-reduced-motion`.
- **Hover honesty:** no `:hover` transform, scale or shadow on any non-link on
  this page. The benefit and situation cards are static, correctly.
- **Mobile:** no horizontal overflow at 390px, all three grids collapse to one
  column, h1 wraps cleanly.

## What works well

- The type scale is genuinely shared, not copied. This was the failure mode
  called out in `scale.js` and it has held.
- The dark close on a light page does what the homepage needs a red band for,
  with one less colour.
- Six bands, six grounds, no two adjacent the same: cream, off-white, cream,
  near-black, cream, black. The alternation is doing real work.
- The pull card and the estimate card are the same object in two sizes, which
  gives the page a recognisable device without inventing a new one per section.

---

## OUTCOME (applied 22 Jul 2026)

Recommendations 1, 3 and 4 are applied and verified live. Recommendation 2 was
**tested and reversed**: see below. Recommendation 5 is still a decision.

| # | Recommendation | Outcome |
|---|---|---|
| 1 | Align card grids to the text | **Applied.** All left edges now 114 |
| 2 | Raise the homepage close | **Applied.** 38.4 → 60 (`T.h2close`) |
| 3 | "What to do about it" onto `SECTION_PAD` | **Applied.** 83 → 96 |
| 4 | Lighten the `$560K` red | **Applied.** 3.26 → 5.25 |
| 5 | Revisit the six benefit cards | Open |

### 1. Grid alignment · applied

Added `GRID_CAP_LEFT` to `src/lib/scale.js`: the same 960 cap, held to the left
edge instead of centred. Applied to this page's three capped elements (the
benefit grid, the situation grid, and the Fan Value estimate card).

Measured left edges at 1280px, before and after:

| Element | Before | After |
|---|---|---|
| Headings and prose | 114 | 114 |
| Evidence stats grid | 114 | 114 |
| Benefit card grid | **160** | **114** |
| Fan Value estimate card | **160** | **114** |
| Situation card grid | **160** | **114** |

One straight edge down the page. `GRID_CAP` is untouched, so the homepage,
where centring is correct because the headings are centred too, is unaffected.

At 390px nothing changed: the cap never binds, everything sits at 20.

### 2. The homepage close · raised to 60px

**`HomePage.jsx` is the only file outside /fan-led-growth touched in this pass.**

The finding that settles it is not the comparison with this page. It is that
the homepage's closing headline was **the smallest h2 on the homepage**:

| Homepage h2 | Size |
|---|---|
| "Hi, I'm Laura." | 41px |
| "My biggest wins, so far." | 41px |
| "A key speaker at the industry's biggest events." | 41px |
| **"Tell me about your brand." (the close)** | **38.4px** |

The page ended quieter than its own middle. The shared scale has carried an
`h2close` from the day it was extracted, commented "the close still gets to
shout", and the homepage was the one page not using it, because it had a
bespoke clamp instead.

**I argued against this an hour before doing it, and the argument was wrong.**
The objection was that 60px in a 496px column beside a form would be cramped.
Measured, that column has room to spare:

| At 1280 | Copy column | Form column | Slack |
|---|---|---|---|
| 38.4px (was) | 218px | 349px | 131px |
| 60px (now) | **306px** | 349px | **43px** |

The copy column never reaches the height of the form beside it at any size
tested between 38 and 60. The headline was not competing for space, it was
sitting in a column that was 131px short of its neighbour. It also breaks
cleanly at 60: "Tell me about / your brand.", no widow, no `text-wrap: balance`
needed.

On mobile it goes 24px → 38.4px, two lines, no overflow, against a 44.8px h1
and 28.8px section h2s. Louder than the sections, quieter than the hero, which
is what an ending should be.

Net effect: the close is now the loudest thing on the page after the hero, it
uses the shared token instead of a bespoke clamp so it cannot drift again, and
it matches this page's close for the right reason (same token) rather than by
coincidence.

**If it reads as too much,** the dial is one value: `T.h2close` at
`clamp(2.4rem, 5vw, 3.75rem)`. Dropping the cap to `3.2rem` gives 51.2px, still
two lines, still louder than the sections. Nothing else needs to change, and it
would change /fan-led-growth's close by the same amount, which is now the point
of having one token.

### 3. Band padding · applied

"What to do about it" moved from a bespoke `clamp(56px,6.5vw,92px)` to the
shared `SECTION_PAD`. At 1280 that is 83 → 96, in line with the bands either
side. The evidence strip stays at 70 deliberately.

Rhythm now: 115 / 70 / 96 / 96 / 96 / 110.

### 4. The `$560K` figure · applied

Changed from #C8362B to #E4695E, the lighter red already on the hero pull card.
Measured against both ends of the card's gradient:

| | Against #15110F | Against #241A16 |
|---|---|---|
| #C8362B (was) | 3.59 | **3.26** |
| #E4695E (now) | 5.79 | **5.25** |

Comfortably AA at any size now, rather than scraping the large-text threshold.

---

## Priority recommendations (as written before the work above)

1. **Align the card grids to the text (x=114).** Drop `GRID_CAP` from the two
   grids on this page. One-line change, removes the most visible inconsistency,
   and it is the one the new `/services` link just made worse.
2. **Settle the closing headline.** 60px here vs 38.4px on the homepage. My
   view: this page is right, and the homepage close is the one that is too
   quiet, which the density notes already suspected.
3. **Put "What to do about it" back on the 96px scale.** Leave the evidence
   band at 70, it is earning it.
4. **Lighten the `$560K` red to #E4695E.** Passes comfortably instead of
   narrowly, and matches the hero pull card.
5. **Then revisit the six benefit cards** (held from the copy pass). With the
   grid uncapped and aligned, the "cut to four leaves an orphan" problem is
   unchanged, so the real options are still: shrink the evidence band so the
   cards stop repeating it, or leave six.

## Applied in this pass

**The `/services` hand-off in "Who it's for".** This was the only band on the
page with no link out. The reader recognises themselves in one of four
situations, and the page then goes straight to the close. Every other band
hands off: hero → `/fan-engine`, evidence → `/work`, why fans → `/fan-value`,
what to do → `/fan-engine`, close → three places. The page's own header comment
describes a six-beat design where each beat hands to a different page, so this
was a gap against its own intent rather than a new idea.

Added as a text link, not a button, so it does not pull against the close's
primary CTA two screens later:

> If that sounds like you, **see how we'd work together →**

The label matches the `/services` link in the close on purpose: same
destination, same words. It also means `/services` is now reached from the
qualification band, which is where a reader who has just self-identified is
most likely to want it.
