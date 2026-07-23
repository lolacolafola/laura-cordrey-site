# Site-wide design consistency audit — 23 Jul 2026

> **STATUS: most of this is fixed.** See "Fix log" at the foot of the file for
> what was applied, what was verified, and what is deliberately left open.
> The findings below are kept as written so the reasoning and the measurements
> survive alongside the fixes.

Scope: does every page follow the same rules as every other page — header, footer,
spacing, type, colour, CTAs, hover behaviour.

**Method.** Every number below was measured in the browser against the running dev
server, not estimated. Contrast is computed on the *composited* ground (alpha
resolved up the ancestor chain), with WCAG thresholds applied per element: 3.0 for
display type (≥24px, or ≥18.66px bold), 4.5 for everything else.

**Two rounds of false positives were found and discarded before this list.** The
first ground-walker read only `background-color`, so cream text inside the gradient
card `.flg-pull` on /fan-led-growth appeared to fail at 1.00 when it comfortably
passes. The second averaged *all* gradient stops, so the decorative dot-texture on
`.fvm-card` (`radial-gradient(rgba(21,17,15,.03) 1px, transparent 1px)`) dragged the
apparent ground dark and invented ~8 failures on /fan-value. The final pass treats a
gradient as a ground only when every stop is ≥0.9 alpha. This is the same class of
error CLAUDE.md already warns about. **Anything below is post-correction.**

---

## 1. Sitewide — these are on every page

### 1.1 Footer fails AA on all 12 pages 🔴

Footer ground is `#0E0B09`.

| Element | Colour | Ratio | Needs |
|---|---|---|---|
| `.cinfoot__meta` "Paris. Working globally" | `#5E564E` | **2.72** | 4.5 |
| `.cinfoot__copy` "© 2026 Laura Cordrey" | `#5E564E` | **2.72** | 4.5 |
| `.cinfoot__sep` "·" | `#4A4239` | **1.99** | 4.5 |

Declared at [Layout.css:244](src/components/Layout.css:244), :267, :278.

Fix: `#80786E` is the minimum that passes (4.51) and stays quiet. `#B8AEA2` — already
a known-good value in CLAUDE.md — measures 8.98 here if you want the footer legible
rather than merely compliant.

### 1.2 Every red button fails AA, by a hair 🔴

`.btn--primary` is `color: var(--surface)` = bone `#EFE9DC` on `--accent` `#C8362B`
= **4.32**, at 17.28px/700. That is under the 18.66px bold line, so it needs 4.5, not 3.0.

Same failure, same cause, in six separately-authored button classes:

| Class | Page(s) | Size | Ratio |
|---|---|---|---|
| `.btn--primary` | /services, /faq, /speaking, /ai | 17.3px | 4.32 |
| `.cinnav__cta` "Get in touch" | **all 12 pages** | 13.1px | 4.32 |
| `.btnp` | / (×3) | 15.4–16px | 4.32 |
| `.flg-btnp` | /fan-led-growth | 16px | 4.32 |
| `.fvm-btn` | /fan-value | 14px | 4.32 |
| `.fa-btn` | /fan-score | 14px | 4.32 |
| `.btn--pill.btn--primary` "All" | /work | 14px | 4.32 |

Fix is one value, not seven: bone `#EFE9DC` → cream `#FCFAF3` on red measures **5.00**.
Set it on `.btn--primary` ([shared.css:619](src/styles/shared.css:619)) and
`.cinnav__cta` ([Layout.css:99](src/components/Layout.css:99)); the four bespoke
button classes should then be collapsed into `.btn--primary` rather than re-fixed
individually — see §2.3.

---

## 2. Page-to-page inconsistency

### 2.1 The type scale is forked 🔴

`src/lib/scale.js` exists precisely to stop this, and its own header comment says
"If you are about to paste this block into a new page, import it instead."

**Three pages import it:** HomePage, FanLedGrowthPage, ServicesPage (partial —
`HEAD_W, T` only).

**Five pages hand-copy it into CSS** and say so in a comment — "Mirrors
src/lib/scale.js": ServicesPage.css, AboutPage.css, MethodologyPage.css,
SpeakingPage.css, AIPage.css. A mirror is a copy; it drifts the same way the
original FLG copy drifted.

**Measured `<h1>` across the site:**

| Page | h1 | Weight | Verdict |
|---|---|---|---|
| /, /fan-led-growth, /services, /about, /fan-engine, /speaking, /ai | 84px | 700 | canonical |
| /faq | 51.2px | **800** | off-scale |
| /contact | 46.4px | **800** | off-scale |
| /fan-value | 46.4px | **800** | off-scale |
| /fan-score | 44px | **800** | off-scale |
| /work | 40.96px | 700 | h1 rendered at the h2 size |

`HEAD_W` is 700. Four pages set 800, and each picks a different h1 size. /work opens
at 40.96px, identical to every other page's `h2` — the page has no hierarchy release
at the top.

Near-duplicate values that differ only in the `vw` term, which is drift caught
mid-flight: `clamp(2.4rem, 4.5vw, 3.4rem)` on /about vs `clamp(2.4rem, 3.8vw, 3.4rem)`
on /speaking.

/fan-engine carries **six** different body sizes, none matching `T.body`
(`clamp(.95rem,1.05vw,1.04rem)`): `.95/1.25/1.12`, `.95/1.2/1.1`, `1.02/1.4/1.24`,
`1.05/1.4/1.24`, `1.05/1.4/1.28`, `1.08/1.5/1.34`.

### 2.2 The Eyebrow component is used on 2 of 12 pages 🟡

`components/Eyebrow.jsx` is imported by HomePage and FanLedGrowthPage only. Every
other page rolls its own kicker: `.marker` (/services), `.contact-eyebrow`,
`.fvm-cta__eyebrow`, `.fa-sectlbl`, `.about-*`. They are visually close but
independently maintained, and `.contact-eyebrow` is one of the contrast failures below.

### 2.3 CTA labels say five different things 🟡

| Label | Pages |
|---|---|
| "Let's talk" | /services, /ai, /work, / |
| "Get in touch" | / , /fan-led-growth, nav (all pages) |
| "Book a call" | /fan-value |
| "Book me" | /speaking, /contact — the speaking lane, legitimately distinct |
| "Ask me directly" | /faq |

The homepage uses **both** "Get in touch" and "Let's talk" for the same destination.
Per the project note, "Let's talk" is the decided primary. Worth picking one and
letting the speaking lane keep "Book me".

Typography bug inside this: /work writes `Let's talk` with a **straight** apostrophe
where every other page uses `&rsquo;`. Same on /fan-score and /fan-value, which use
straight `'` and `"` throughout visible copy
([FanAuditPage.jsx:633](src/pages/FanAuditPage.jsx:633), :634, :712 and
[FanValueModelPage.jsx:657](src/pages/FanValueModelPage.jsx:657)).

### 2.4 Hover honesty is broken in three places 🔴

CLAUDE.md: ":hover motion lives only on `<a>` and `<button>`. Informational cards,
logos and quotes stay static under the cursor."

| Element | What it is | What it does on hover |
|---|---|---|
| `.casec` — homepage work cards | plain `<div>` ([HomePage.jsx:494](src/pages/HomePage.jsx:494)) | lifts 3px, gains a shadow, scales the image ([HomePage.css:332](src/pages/HomePage.css:332)) — navigates nowhere |
| `.svcard` — "Three ways I help" | plain `<div>` ([HomePage.jsx:441](src/pages/HomePage.jsx:441)) | reveals the copy ([HomePage.css:230](src/pages/HomePage.css:230)) — navigates nowhere. The comment above it claims "Each card is a real `<Link>`", which is no longer true |
| `.logo-banner__cell` | `<li>` ([LogoBanner.jsx:18](src/components/LogoBanner.jsx:18)) | client name turns red ([LogoBanner.css:39](src/components/LogoBanner.css:39)) — a logo, explicitly named in the rule |

The `.svcard` copy-reveal is arguably the worst of the three: it hides content behind
a cursor state, so it is invisible on touch and to keyboard users.

### 2.5 /contact ignores the light-ground rule 🟡

/contact is a light page but carries no `on-light` anywhere in the tree, and
ContactPage.css hardcodes `#C8362B` in ~10 places including small text. Per CLAUDE.md,
red text on a light ground must be `--accent-deep` `#8E2520` (7.13 on bone, 8.26 on cream).

Measured failures:

| Element | Ratio | Needs |
|---|---|---|
| `.contact-eyebrow` "Work with me" (12px) | 4.32 | 4.5 |
| `.contact-reassure` (15px) | 4.03 | 4.5 |
| "Email me" (14px) | 4.32 | 4.5 |
| "reach me on LinkedIn" (14px) | 4.32 | 4.5 |

Switching the page to `--accent-text: var(--accent-deep)` fixes all four at once.

### 2.6 `.flg mark` hardcodes red, the exact pattern CLAUDE.md bans 🟡

[FanLedGrowthPage.css:6](src/pages/FanLedGrowthPage.css:6):
`.flg mark { color: #C8362B }`. CLAUDE.md records this same bug from `HomePage.css`
("silently beat the ground system on two bone bands"). It is currently costing two
failures on /fan-led-growth:

| Element | Ratio | Needs |
|---|---|---|
| `mark` "fan-led growth" (16.8px) | 4.32 | 4.5 |
| `mark` "Fan Engine™" (16.8px) | 3.59 | 4.5 |

Deleting the hardcoded colour lets `--accent-text` resolve per ground, which is what
the system is for.

### 2.7 /fan-value has the densest small-text problem 🟡

Eleven distinct failures at 11–13px, ratios 2.18–4.32: `.fvm-row__sub` (×3, 3.08),
`.fvm-foot` (3.08), `.fvm-foot__cites` (3.08), `.fvm-cur` (3.08),
`.fvm-comp__splitdot` (2.86), `.fvm-biztoggle__btn` (4.32 on, 3.11 off),
`.fvm-coldbar__link` (4.32). The page is also the only one using an h1 of 46.4px/800
*and* a 6.4rem display numeral, so it reads as a different site.

### 2.8 The `™` mark fails wherever it appears 🟡

`.tm` renders at 8.4–9px. Measured 3.59 (/fan-led-growth), 3.08 (/fan-value), 4.32
(/services). It is small text, so it needs 4.5, and at 9px it is the smallest type on
the site. Since the trademark must be shown, it needs to inherit a passing colour
rather than the mark colour.

---

## What is already consistent

- **Header and footer are genuinely global** — one `Layout` wraps every route in
  `App.jsx`. No page rolls its own nav. (The failures above are in that shared
  component, so fixing them fixes all 12 pages at once.)
- **Naming discipline holds.** `grep "the Engine"` excluding "Fan Engine" returns
  nothing. The Fan Engine™ / Fan Score / Fan Value Model names are not abbreviated
  anywhere.
- **The 84px/700 hero and 40.96px h2 are stable** across the seven rebuilt pages —
  where the scale is imported or mirrored faithfully, it holds.
- **Ground-nesting is being done correctly** on the rebuilt pages: `on-light` is set
  on the innermost element that owns a ground, per the rule.
- **Reduced-motion is respected** — `.casec` and the reveal animations all have
  `prefers-reduced-motion` blocks.

---

## Priority

1. **Footer colour** (§1.1) — one file, three values, fixes a AA failure on all 12
   pages. Lowest effort, widest reach.
2. **Button text bone → cream** (§1.2) — two values fix every red CTA on the site.
3. **Hover honesty** (§2.4) — three deletions. It is a stated project rule currently
   broken on the homepage, and `.svcard` hides real content behind hover.
4. **h1 weight 800 → 700 and the four off-scale h1 sizes** (§2.1) — the most visible
   page-to-page inconsistency to a reader moving through the site.
5. **/contact `on-light` + delete `.flg mark` hardcoded red** (§2.5, §2.6) — both are
   the ground system being overridden by hand, which is what CLAUDE.md exists to prevent.
6. **Consolidate the five bespoke button classes into `.btn`** (§1.2/§2.3), then the
   CTA label choice.

---

# Fix log — 23 Jul 2026

Verified by re-running the same measurement harness at **1280px and 375px**,
over all 12 pages plus both /contact form branches (`?intent=consulting` and
`?intent=speaking`, whose fields only render after an intent is picked — the
first pass missed them entirely because of that).

**Result: 0 contrast failures at either width. No horizontal scroll on any page
at 375px. Undersized tap targets went from ~160 to 0.**

## Applied

| # | Fix | Files |
|---|---|---|
| 1.1 | Footer `#5E564E`/`#4A4239` → `#80786E` (2.72 / 1.99 → 4.51) | Layout.css |
| 1.2 | All red CTAs bone → cream `#FCFAF3` (4.32 → 5.00). Covers `.btn--primary`, `.cinnav__cta`, `.btnp`, `.flg-btnp`, `--fvm-cream`, `--fa-paper` | shared.css, Layout.css, HomePage.jsx, FanLedGrowthPage.jsx, FanValueModelPage.css, FanAuditPage.css |
| 2.1 | h1 weight 800 → 700 (`HEAD_W`) on /faq, /contact, /fan-value, /fan-score | 4 page CSS files |
| 2.3 | Arrow removed from the /contact submit button and 4 `.fa-btn`s — arrows are for text links, not filled buttons | ContactPage.jsx, FanAuditPage.jsx |
| 2.4 | `.logo-banner__cell` hover removed. (`.svcard` was also removed, then **restored at Laura's request** — see below) | LogoBanner.css |
| 2.5 | /contact declares `--accent-display` / `--accent-text` = `--accent-deep`; hardcoded reds swapped for the variables; `#8A6D2E` → `#6E5520`, `#8A8078` → `#6B6157` | ContactPage.css |
| 2.6 | `.flg mark` hardcoded `#C8362B` → `var(--accent-text)` | FanLedGrowthPage.css |
| 2.7 | `--fvm-faint` `#9A8E7C` → `#786E60` (3.08 → 4.79); `.fvm-comp__splitdot` alpha .35 → .62 | FanValueModelPage.css |
| **mobile** | Footer links/contacts given padding+negative margin: 19px tall → 29px, "AI" 15px wide → 25px, on every page. Also `.contact-picker__other`, `.about-txtlink`, `.sp-caselink`, `.faq-a__more` | Layout.css + 4 page CSS files |

## Corrected during the work

**`.svcard` hover-reveal: removed, then restored on Laura's instruction.** §2.4
called it the worst of the three hover-honesty breaches, because the thing hidden
behind the cursor is the description of the offer. Laura asked for the animation
back, so it is back, with `margin-top: auto` and the collapse/expand transition
exactly as before.

What makes that defensible rather than merely instructed is the
`(hover: none), (prefers-reduced-motion: reduce)` block, which opens the copy
from the start on touch devices and for reduced-motion users. The copy is
therefore never unreachable — it is progressive disclosure on pointer devices,
not hidden content. **That media block is load-bearing. Do not remove it while
the hover exists.** The cursor also stays the default arrow, so the card never
promises a click, which is the same basis on which `.casec` is allowed.

Verified at rest: copy height 0, all three titles aligned at the same y, all
three cards 384px — the card does not resize on hover.

The residual gap is a desktop keyboard user, who gets neither the hover nor the
touch fallback. Making the card focusable would fix that but would also make it
look interactive, which it is not. Noted, not fixed.

**`.casec` is NOT a bug.** §2.4 listed the homepage work-card hover as a
violation. The CSS above it records it as a deliberate, minimal relaxation of the
hover-honesty rule, made at Laura's request, with the cursor deliberately left as
the default arrow so it never promises a click. **Left exactly as it was.** A
stale comment three lines above it did claim the cards navigate; only that
sentence was corrected.

The mailto links on /speaking and /ai (`Or email hello@…`) measure 21px tall but
are inline in a sentence, which WCAG 2.2 SC 2.5.8 explicitly exempts. Left alone.

## Deliberately left open

- **h1 *sizes* still vary**: 84px on the seven editorial pages, then /faq 51.2,
  /contact 46.4, /fan-value 46.4, /fan-score 44, /work 40.96. The weights are now
  consistent, but collapsing five sizes into one is a design decision with real
  visual consequences on a form and a calculator, not a mechanical fix. **Laura's call.**
- **/work opens at 40.96px, identical to the site's h2** — the one that most
  looks like an accident rather than a choice.
- **The type scale is still forked** (§2.1): three pages import `scale.js`, five
  hand-copy it into CSS. Migrating those five to a shared source is the real fix
  and is a refactor, not a patch.
- **Five bespoke button classes still exist** alongside `.btn--primary`. Now all
  the same colour, but still five things to maintain.
- **CTA labels still say four different things** (§2.3). Needs a decision, not a
  fix.
- **/fan-engine's six body sizes** (§2.1).

## Still not checked

Focus-visible states, and the seven `/work/*` case study pages.
