# /fan-led-growth — design critique + copy to complete the page

Date: 22 Jul 2026
Status: proposal, nothing applied
Supersedes nothing. Companion to `fan-led-growth-page-plan.md` (the build plan),
which this does not replace — that file records what the page *is*, this one
records what it still needs.

Scope: (1) critique the page against the rest of the site's design system and
the "breathing room" work done on the homepage on 22 Jul, (2) propose the copy
that would finish it.

**Every measurement below was taken in the browser at 1440×900 against the
running dev server, not estimated.**

---

## Overall impression

The page is a well-built container holding the right argument, but it is
**three dense slabs where the homepage is eight light beats**. It carries 510
words in 3 sections; the homepage carries 467 words in 8. That is roughly 2.7×
the density per band, and it is why the page reads heavier than the site it
now leads.

The single biggest problem is that **the page has no hero.** Its `h1` is set at
`clamp(2.4rem, 5vw, 3.75rem)` — which is the homepage's `T.h2close` value, not
its `T.h1`. So the top of the page opens at section volume and never releases.

The good news: almost every fix is a value change to a page that is otherwise
structurally sound and already on-palette.

---

## The homepage "breathing" changes, and whether each applies here

Yesterday's homepage work was six commits. Auditing FLG against each:

| Homepage change | Commit | Applies to FLG? |
|---|---|---|
| Hero top padding raised to clear the fixed 69px nav | `a30e9b6` | **No.** Verified: non-home routes get `.page--offset { padding-top: 64px }` from `Layout.jsx:160`, so FLG's eyebrow sits 140px down with a 71px gap under the nav. Not a bug here. |
| Work-card grid capped to 960px and centred, so it isn't the widest thing on the page | `a19ddbc` | **Yes — not applied.** Both FLG grids run the full 1052px inner width. |
| Stat number trimmed to sit on the smaller card | `04d006c` | **Partly.** No stat numbers, but the `$560K` figure has the same "sized off the viewport, not the card" issue. |
| Forced `<br>` removed from a fluid paragraph | `9680aac` | **N/A** — FLG has no forced breaks. Good. |
| `&nbsp;` used for widow control instead | `1701ff5`, `5eda525` | **Not applied.** No widow control anywhere on FLG. |
| Paragraph gap opened from ~16px to 24px so a shift of thought reads as a beat | `3d5fd43` | **Yes — not applied.** FLG's stacked paragraphs use the tighter rhythm. |

---

## Usability

| Finding | Severity | Recommendation |
|---|---|---|
| **The page ends without a close.** After the four situation cards it runs an inline sentence, two buttons, then the footer. Every other page on the site closes with a dedicated band; the homepage close gets its own `T.h2close` heading at `clamp(2.4rem,5vw,3.75rem)`. | 🔴 Critical | Add a real closing band. Draft copy below. |
| **No proof anywhere on the page.** It asserts that fans spend more, spread the word, and compound — six benefit cards, zero evidence. The homepage earns the same claims with a logo strip and three hard numbers directly underneath. | 🔴 Critical | Add a credentials strip and/or one proof row. Copy below, drawn from existing verified claims only. |
| **The page defines the idea but never names the answer.** "The Fan Engine" appears nowhere in the visible copy. The one route onward is the phrase "an engine you own" linking to `/methodology`. A reader who agrees with the argument has nowhere obvious to go. | 🟡 Moderate | Name the Fan Engine™ once, in the handoff. Copy below. |
| The three onward links (`/methodology`, `/fan-value`, `/services`, `/contact`) are scattered and unequal. `/fan-score` — the low-commitment entry point — is not linked at all. | 🟡 Moderate | Route the close deliberately: one primary, one secondary, Fan Score as tertiary (matching the homepage close pattern established on 19 Jul). |
| The "Growth you own, not rent." pull-quote is a bordered, gradient-filled, glowing box that looks exactly like an interactive card but is static. | 🟢 Minor | Correct per **hover honesty** — it has no hover motion, so the rule is satisfied. Flagging only because it is the strongest card-like affordance on the page. No change needed. |

---

## Visual hierarchy

- **What draws the eye first**: the `h1`, but weakly. At 1440 it renders **60px**
  against an `h2` of **44px** — a ratio of **1.36**. The homepage measures
  **84px / 44px = 1.91**. The homepage rebuild comment (`HomePage.jsx:30-35`)
  names this exact fault as the reason the old page felt dense: *"seven h2s
  within shouting distance of the hero"*. FLG reproduces it.
- **Reading flow**: the hero copy is locked to a `62ch` measure and left-hugs a
  1440 viewport, leaving the entire right half empty. The homepage hero in its
  no-portrait state is **centred** (`.hero-centred`). FLG is the only top-level
  page opening left-aligned into dead space.
- **Emphasis**: the two card grids are the widest elements on the page (1052px
  vs a text measure ending around 980px), so the cards out-weigh the argument
  they are supporting — the exact inversion `a19ddbc` fixed.
- **Rhythm**: section heights run 858 / 1241 / 1066px. Two consecutive card
  grids with no relief between them. The homepage explicitly broke this up:
  *"Card-grid monotony — four consecutive 'kicker > h2 > lede > grid of bordered
  cards' sections. Broken up by the full-bleed speaking band and the centred
  testimonial."*

---

## Consistency

| Element | Issue | Recommendation |
|---|---|---|
| Type scale | `FanLedGrowthPage.jsx` re-declares its own `HEAD_W`, `T`, `SECTION_PAD` and `INNER` — byte-identical copies of HomePage's, **except `T.h1`**, which silently holds the `h2close` value. | Extract the shared scale to `src/styles/scale.js` and import in both. This is why yesterday's homepage breathing work did not reach this page, and why the next round won't either. |
| `Eyebrow` | FLG hand-rolls the eyebrow span three times inline; HomePage has an `Eyebrow` component with a `tone` prop. | Export `Eyebrow` and reuse. |
| Eyebrow colour | FLG uses red for the hero eyebrow. Every homepage hero eyebrow is gold (`tone` defaults to `'gold'`); red is reserved for mid-page sections. | Switch the hero eyebrow to gold. Also fixes the contrast failure below. |
| Colour values | All colours are raw hex inline. They do match the palette (`#15110F` = `--bg`, `#C8362B` = `--accent`, etc.), so nothing is off-brand — but `tokens.css` opens with *"If you find yourself writing a raw value in a component, add a token."* | Pre-existing site-wide pattern, not FLG's fault. Out of scope; noted only. |
| Dead component | `src/components/LogoBanner.jsx` — a typographic credentials strip — exists and is imported by **no page**. The homepage rolled its own logo row instead. | This is exactly the component the proof gap needs. Reuse it here rather than building a third variant. |

---

## Accessibility

Contrast computed against actual composited backgrounds (the gradient cards
required compositing against `#241a16`, the lighter gradient stop — the worse case).

- **Fails**: the red eyebrow `#C8362B` at 12px/700.
  - On the dark hero `#0E0B09`: **3.75** (needs 4.5) — **fail**
  - On the cream band `#EFE9DC`: **4.32** (needs 4.5) — **marginal fail**
  - The gold alternative `#D4C896` on `#15110F` measures **11.17**. Switching the
    hero eyebrow to gold both fixes this and restores homepage consistency.
- **Marginal**: `$560K a year` in red on the estimate card — **3.26** against a
  3.0 requirement for large text. Passes, with almost no headroom.
- **Passes comfortably**: body copy at `.72` opacity on `#1F1A17` (**7.91**),
  lede at `.82` on `#15110F` (**10.60**), benefit-card body (**9.42**), the
  estimate caveat at `.66` (**6.79**), and all headings.
- **Touch targets**: CTAs are 15px/28px padded — comfortably over 44px tall.
  The mobile estimate CTA correctly goes full width.
- **Motion**: scroll reveals are properly disabled under `prefers-reduced-motion`.
- **Note**: the red-on-cream 4.32 also affects the homepage, `/services` and
  others. Site-wide, not FLG-specific — worth its own pass, not this one.

---

## What works well

- **The argument is genuinely good.** "You've been renting your growth" →
  "Growth you own, not rent" → the six things fans do → who it's for is a clean,
  persuasive spine. Nothing about the structure needs rethinking.
- **Zero invented copy.** Every line traces to the live homepage, so the page
  carries no unverified claims.
- **Hover honesty is correctly observed** — the ten cards are plain `<div>`s and
  stay static; only the real links move.
- **Mobile is clean.** No horizontal overflow at 375px, both grids collapse
  properly, the estimate CTA goes full width.
- **The estimate card is the best thing on the page** — a concrete number,
  honestly caveated ("An example, not your numbers"), with a real next step.
  It is the model the rest of the page should follow.

---

## Priority recommendations (design)

1. **Give the page a hero.** Raise `T.h1` to the homepage's
   `clamp(2.8rem, 6.6vw, 5.25rem)` and centre the hero copy the way the
   homepage's no-portrait hero is centred. This is one value change plus one
   layout class, and it is the difference between "a page" and "a section that
   starts at the top."
2. **Cap and centre both grids at 960px**, matching `a19ddbc`. Stops the cards
   being the widest element and pulls the whole page in.
3. **Break the two consecutive card grids apart** with a non-card band between
   them — the proof strip proposed below does exactly this job, which is why it
   solves a design problem and a copy problem at once.
4. **Add a closing band** with a `h2close`-scale heading.
5. **Extract the shared type scale and `Eyebrow`** so the next round of homepage
   polish reaches this page automatically.
6. **Hero eyebrow red → gold**, fixing the one real contrast failure.

---

# Copy to complete the page

The page currently runs: **What it is → Why fans → Who it's for → (footer)**.

It is missing three beats the site's other pages all have: **proof**, **the
handoff to the method**, and **a close**. Proposed structure:

> What it is → **Proof** → Why fans → **So what do you do about it** → Who it's for → **Close**

Rules I have followed: nothing invented; existing verbatim copy reused wherever
it exists, marked **SOURCE**; anything genuinely new marked **NEW** and needing
Laura's sign-off. No em dashes. No compare-down framing.

---

## 1. Proof strip — new band, between "What it is" and "Why fans"

Placed here it does three jobs: earns the claim before the benefit cards make
it, breaks the two card grids apart, and gives the eye somewhere to rest.

**Option A — credentials only (recommended, lowest risk).**
Reuse the existing unused `<LogoBanner />` component as-is. Its copy is already
written and already live-tested elsewhere:

> **SOURCE** (`LogoBanner.jsx:13`)
> Thirteen years building this across consumer, tech, gaming
> Ubisoft · Amazon Games · BlaBlaCar · Azarus / Animoca

Nothing to write, nothing to fact-check, one import.

**Option B — credentials plus three numbers.**
Adds the homepage's three proof points underneath. All three are already live
on the homepage, so all three are already approved copy:

> **SOURCE** (`HomePage.jsx` `CASES`)
> **Sold out** — a $129 fan drop, in under 3 hours · US Mobile
> **60M+** — UGC reach, at $0 media spend · Ubisoft
> **85%** — positive sentiment, 15M players · Ghost Recon

With a lead-in line:

> **NEW** — needs sign-off
> Not theory. This is what it looks like when it works.

I would take **Option B**. The six benefit cards are the least evidenced part of
the page, and these three numbers are the evidence, already written and already
public. Option A alone leaves "they spread the word, at no media cost" sitting
next to nothing, when "60M+ UGC reach, at $0 media spend" is the literal proof
of that exact card, two clicks away on your own site.

---

## 2. The handoff — new short band, after "Why fans"

The page's real gap: it wins the argument and then goes quiet about what to do.
This is also the beat that **resolves the `/methodology` overlap** by giving each
page a job: this page owns *the idea*, `/methodology` owns *the method*.

> **Eyebrow:** What to do about it
>
> **H2 — NEW, needs sign-off**
> Knowing fans matter is the easy part.
>
> **Body — NEW, needs sign-off**
> Most companies already believe this. What stops them is that no single team
> owns it: brand, product and community each hold a piece, and nobody holds the
> whole. So it stays a feeling nobody can put a number on.
>
> That is the part I build. The Fan Engine™ runs all four as one system, and
> ties each part to a number you can put in front of a board.
>
> **CTA:** See how the Fan Engine works →  (`/methodology`)

Three notes on this draft:

- "brand, product and community each hold a piece, and nobody holds the whole"
  is a rephrasing of the homepage's *"no single team makes a fan: it takes your
  brand, your product, and your community pulling the same way"* — same claim,
  turned from a positive into the problem statement. Defensible, but it is my
  wording, not yours.
- I have deliberately **not** used "the leaks do not respect the org chart" or
  "measurement spine" from the Methodology page — your own rewrite doc
  (`copy-methodology-lede-rewrite.md`) flags both as jargon to lose.
- "felt, not counted" is **not** used. Your rewrite doc records that you don't
  like it.

---

## 3. The close — new band, replacing the current inline CTA row

Current ending:

> Sound like you? That's exactly what I build. [Get in touch] [See how we'd work together]

That is a sentence, not a close. Every other page gets a band. Proposed, using
the homepage's `h2close` scale and its established three-tier CTA pattern
(primary / secondary / low-emphasis tertiary, settled 19 Jul):

> **H2 — NEW, needs sign-off. Three options:**
>
> **A.** Your fans are already worth something. Let's find out what.
> **B.** The growth is already in your userbase. Let's go and get it.
> **C.** Stop renting your growth.
>
> **Body — NEW, needs sign-off**
> If any of that sounded like your company, the next step is a number, not a
> meeting.
>
> **Primary CTA:** See what your fans are worth → (`/fan-value`)
> **Secondary CTA:** Let's talk (`/contact?intent=consulting`)
> **Tertiary, low emphasis:** Or take the 2-minute Fan Score → (`/fan-score`)

I'd take **C** for the headline. It is four words at 60px, it closes the loop the
page opened with ("You've been renting your growth"), and it is the only one of
the three that could not appear on any other page on the site.

**Note on CTA ordering:** this puts Fan Value first and "Let's talk" second,
matching the homepage close. Your Services v2 proposal
(`services-v2-apply-proposal.md`) argues the opposite for *that* page — "Let's
talk" before Fan Score. Both can be right (Services is further down the funnel
than an explainer page), but **it's worth deciding deliberately rather than by
accident.**

---

## 4. Small copy fixes to what's already there

| Where | Now | Change | Why |
|---|---|---|---|
| Hero eyebrow | WHAT IT IS | **FAN-LED GROWTH** | "What it is" is meaningless as the first words on the page. It was a *section* label on the homepage, where the surrounding page gave it context. As a page-opener it has none. |
| "Who it's for" lede | "...The two are a perfect marriage, and fan-led is the half still on the table." | Consider cutting "The two are a perfect marriage" | The metaphor does no work the next clause doesn't do better, and it is the one soft line in an otherwise plain-spoken page. |
| Estimate card | "about $560K a year for a $5M brand" | Add `&nbsp;` between "$5M" and "brand" | Same widow-control treatment as `1701ff5` / `5eda525` on the homepage. |
| Close of section 1 | "...then show you what it's worth." | No change | This is the best sentence on the page. |

---

## Open questions for Laura

1. **Proof strip: Option A or B?** (I recommend B.)
2. **Close headline: A, B or C?** (I recommend C.)
3. **Is "Knowing fans matter is the easy part." the right frame for the handoff
   band,** or do you want that beat to be warmer?
4. **CTA order on this page** — Fan Value first (homepage pattern) or Let's talk
   first (Services v2 pattern)?
5. **The `/methodology` overlap.** The handoff band in §2 is written on the
   assumption that this page = the idea, `/methodology` = the method. If you'd
   rather merge the two pages, §2 is wasted work — worth deciding before I build it.
