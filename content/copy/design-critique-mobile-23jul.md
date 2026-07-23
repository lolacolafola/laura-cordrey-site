# Mobile design critique — 375×812, 23 Jul 2026

Measured, not eyeballed: every number below came from `getComputedStyle` and
`getBoundingClientRect` in the browser at 375px, across all 12 real routes.
Contrast follows the `CLAUDE.md` method — composite `rgba()`/`color()` over the
resolved ground, WCAG thresholds by measured size and weight.

Companion to `copy-review-preship-23jul.md`, same session.

---

## Overall

Mobile is in much better shape than a pre-ship audit usually finds. **Zero
contrast failures and zero horizontal overflow across all 12 pages.** The a11y
commit (`1f415ff`) did its job and it held. The two real problems found were both
on `/services`, both fixed this session, and both had the same root cause: that
page missed a migration the rest of the site got.

---

## Fixed this session

### 1. Open service rows had a zero-pixel gap on mobile 🔴

Laura spotted this: "Sentiment SOS." ran straight into "Need it when:" with no
separation at all.

**Cause.** On desktop the open row is two columns — title in column 1, case in
column 2 — so they are never vertically adjacent, and
`.svc-row[data-open='true'] .svc-row__face { padding-bottom: 0 }` costs nothing.
Below 860px both collapse to one column and `.svc-row__body` moves to column 1,
which stacks the case **directly under** the title. Face `padding-bottom: 0`
meeting pad `padding-top: 0` gives a literal 0px gap.

**Fix.** `padding-bottom: var(--space-6)` (32px) on the open face, inside the
860px block only. 32px is one step above the `--space-5` gap between the body's
own paragraphs, so the title-to-case break reads as larger than the breaks inside
the case. Verified: all five rows now measure exactly 32px, none overlap the plus
control.

### 2. `/services` was the last page on the pre-lighter 20px body size 🔴

Also Laura's eye: "the services cards... the body text is a little over."

She was right, and the measurement is worse than "a little":

| Element, same page | Before | After |
|---|---|---|
| `.svc-hero__lede` (the page's own lede) | 16.8px | 16.8px |
| `.svc-youget` (card body copy) | **20px** | 16.8px |
| `.svc-eng__body` | **20px** | 16.8px |
| `.svc-finale__line` | **20px** | 16.8px |

The detail copy inside the cards was running **larger than the lede above it**,
which inverts the page's hierarchy: a lede should be the largest body text on a
page, and card detail should sit at or below body size.

**Root cause — and it is a systemic one.** `--fs-body-l` is a **fixed
`1.25rem`/20px with no clamp**, so it is 20px on a 375px phone exactly as on a
1440px desktop. The "lighter rebuild" replaced it with the shared lede clamp
(`clamp(1.05rem, 1.3vw, 1.22rem)` → 16.8px on mobile, 19.5px only on very wide
screens). That migration was done on **`/about`, in ten rules**, each carrying the
comment `/* T.lede 16.8, was --fs-body-l 20 */` — and **missed `/services`
entirely**.

**Effect on mobile.** The card copy was wrapping at ~20 characters per line
against the hero lede's 34. It now sits at ~27, and the Sentiment SOS case
dropped from 4 rendered lines to 3.

**The contrast trap this could have sprung, and did not.** `CLAUDE.md` warns that
a 20px→16.8px change once pushed a mark under the 18.66px "large text" line, so
its threshold jumped 3.0→4.5 and a passing 4.32 silently became a failure. The
gold `.svc-youget strong` labels are weight 700, so they crossed exactly that
boundary here. Re-measured all 14 affected elements against the stricter 4.5:
**all pass**, the gold labels at 6.79 on the gold row and higher elsewhere. No
colour change needed.

### 3. The rule is now written at the token

`--fs-body-l` in `tokens.css` carries a SUPERSEDED block explaining what it is,
why it drifted, and what to use instead:

> Body and lede copy uses the shared scale in `src/lib/scale.js`. In JSX import
> `T` and use `T.lede` / `T.body`. In CSS, where the import is not available,
> write the clamp literally with a comment naming the T value it mirrors.

Every remaining `--fs-body-l` reference is in `shared.css` on a **dead class**
from the old design (`.hero__lede-copy`, `.about-strip__copy`,
`.opportunity__copy`, `.vision__copy`, `.section-head__lede`, `.work-row__line`,
`.method__copy`, `.final-cta__line` — none appear in any JSX). No live rule uses
it. See "Worth doing separately" below.

---

## Measured results, all 12 routes at 375px

| Page | Contrast fails | Horizontal overflow | Targets under 24px |
|---|---|---|---|
| `/` | 0 | none | 1 (inline) |
| `/services` | 0 | none | 2 (inline) |
| `/fan-led-growth` | 0 | none | 1 (inline) |
| `/work` | 0 | none | 0 |
| `/about` | 0 | none | 2 (inline) |
| `/speaking` | 0 | none | 1 (inline) |
| `/fan-engine` | 0 | none | 1 (inline) |
| `/fan-score` | 0 | none | 0 |
| `/fan-value` | 0 | none | 1 (inline) |
| `/ai` | 0 | none | 1 (inline) |
| `/faq` | 0 | none | 1 (inline) |
| `/contact` | 0 | none | 1 (inline) + 2 honeypots |

**A caution for whoever repeats this.** My first pass reported seven contrast
failures on `/fan-led-growth`, several at a ratio of exactly **1.00**. All seven
were false. A ratio of exactly 1.00 means the measured foreground equals the
measured background, which in practice means *the ground was resolved wrongly*,
not that the text is invisible. The cause: `.flg-pull` sets its dark ground with
a `linear-gradient` and no `background-color`, so a walk-up that only reads
`backgroundColor` skips straight past it and lands on the bone `.on-light`
section behind — cream text compared against cream. **A ground resolver must read
gradient stops, not just `background-color`.** Re-run with that fixed: zero
failures. `CLAUDE.md` already warns that a naive parser invents failures; this is
a second way it happens, worth adding to the same note.

---

## Not failures, but judgement calls

**Every sub-24px target is an inline link inside a sentence** — "Email me",
"on LinkedIn", "case studies", "How I work ↓", "2-minute Fan Score™". WCAG 2.2 SC
2.5.8 explicitly exempts these ("the target is in a sentence, or its size is
otherwise constrained by the line-height of non-target text"). **These pass. No
action needed.** The two unlabelled 147×22 inputs on `/contact` are the
honeypots, both inside `aria-hidden="true"` — invisible to humans and to assistive
tech alike.

**The hamburger is 42×42.** Clears WCAG's 24px comfortably; 2px under Apple's
44×44 guidance. Bumping it to 44 is free and would remove the only standalone
(non-inline) control on the site that is under the platform guideline.

**Footer links: 29px tall, 8px vertical gap between wrapped rows.** At 375px the
11 links wrap to 4 rows. This passes WCAG 2.2 on the spacing clause — 29px tall
with 8px between rows puts centres 37px apart, so 24px target circles do not
overlap. But 8px is tight for thumbs, and the footer is where someone goes when
they have already decided to act. Going to 12–14px vertical would cost one row of
height at most.

**Kicker labels run 11.2–11.5px** ("THE WHOLE SYSTEM", "What you get, end to
end", the timing lines). All pass contrast comfortably (8.26 measured on the
phases label). They are uppercase letterspaced labels, which is a deliberate
convention and reads as such — but 11.2px is at the small end on a phone. Worth a
look if anything else on the page ever gets revisited; not worth a change on its
own.

---

## What works well

- **The ground system holds up under measurement.** Twelve pages, many nested
  ground changes (bone band → espresso row → cream proof card, three deep on
  `/services`), and not one contrast failure. The discipline in `CLAUDE.md` about
  setting the accent variables on the innermost element that owns a ground is
  doing real work.
- **Nothing overflows horizontally anywhere.** Long strings that could have
  broken it — "How the Fan Engine™ works →", the 54-character timing line, the
  `hello@lauracordrey.com` address — all wrap cleanly.
- **The accordion deep-link still works on mobile.** `/services#sentiment-sos`
  opens the right row and scrolls to it, with the fixed nav cleared.
- **The `.tm` mark scales properly.** 9px against 12.48px footer links and 17.28px
  buttons, inheriting its parent's colour, so the ™ never changes a measured
  contrast ratio.

---

## Everything above is now applied — 23 Jul 2026

Laura asked for all of it, so the polish items were done too, plus one more the
sweep turned up afterwards.

**Hamburger 42 → 44px.** The only standalone (non-inline) control on the site
under the 44×44 platform guideline, and on mobile it is the *only* way into the
nav. It always cleared WCAG's 24×24, so this is thumb comfort, not compliance.

**Footer row gap 8 → 12px** (`gap: 18px 24px` → `22px 24px`). The 8px was not
what the CSS said: the links carry `padding: 5px; margin: -5px`, so **10px of
every declared gap is eaten by the negative margin**. An 18px row-gap therefore
rendered as 8px between tap targets once the 11 links wrapped to 4 rows, which at
375px they do. 22 gives a real 12px. Anyone tuning this again should remember to
subtract the 10px before believing the number.

**Currency select on `/fan-value`: 23.5px → 31.5px.** Found on the final sweep,
not the first pass. `.fvm-cur__select` had `padding: 2px 18px 2px 4px`, which
rendered **23.5px tall — half a pixel under** WCAG 2.2 SC 2.5.8's 24×24, making
it the one standalone control on the site that genuinely failed. 6px block
padding takes it to ~31px, comfortably clear rather than clinging to the line,
which is right for a real calculator control rather than a text link.

While there: `.fvm-cur__select:focus { outline: 0 }` removed the keyboard focus
ring **with nothing put back**, so the control was unreachable-looking under
keyboard navigation. Now `:focus-visible` thickens the existing red underline to
3px and adds a soft glow — visible without a box that would fight the borderless
design. Verified with a real Tab keypress, since `:focus-visible` does not match
programmatic `.focus()`.

**The eight dead `--fs-body-l` rules are gone from `shared.css`.** Verified first
that each class was absent from every `.jsx`, from `src/data`, from `index.html`
and from every rendered `class=` attribute across all 19 prerendered routes — the
only hit anywhere was the compiled stylesheet shipping the dead rules themselves.
Live sibling classes were deliberately left alone: `.section-head__lede` is dead
but `.section-head__title` is not, and the same split applies to `.hero__title`,
`.about-strip__clients` and `.work-row`. **`--fs-body-l` is now referenced by
nothing**; the declaration is kept only so its explanatory note has somewhere to
live.

### Final state, measured

12 pages at 375px: **zero contrast failures, zero horizontal overflow, zero
standalone tap targets under 24×24.** Every remaining sub-24px target is an
inline link inside a sentence, which WCAG 2.2 explicitly exempts. Build passes,
19/19 routes prerender.
