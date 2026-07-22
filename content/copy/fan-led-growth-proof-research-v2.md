# /fan-led-growth — the fan research, found

Date: 22 Jul 2026
Supersedes the "Proof strip" section (§1) of `fan-led-growth-critique-and-copy-v1.md`.
Everything else in v1 still stands.

---

## What I searched, and what I found

You remembered a page on an old version of the site with a research section on
how fans stay, spend and bring more. I searched for it properly:

- every commit on every ref (`main`, `homepage-lighter`, `website-rework`, all
  of `origin`), using `git log -S` and a `git grep` across all history
- every file ever **deleted** from the repo (`ArticleCarousel`,
  `FlywheelDiagram`, `StageIcons`, `BlaBlaCarLiveNationPage`, `HomePageV2`,
  `InsightsPage` — I read `InsightsPage`, it was an empty blog placeholder)
- every `.html` prototype ever committed
- all three checkouts on disk, including the two stale ones
- searched on the research houses themselves: Bain, Nielsen, Gallup, Wharton,
  HBR, Deloitte, McKinsey, Forrester, Edelman, Accenture, Motista, Zendesk

**There is no lost page.** In the entire history of this repo, those citations
have only ever appeared in two files. The good news is that both are live right
now, and between them they hold exactly the Stay / Spend / Bring research you
were thinking of.

**I think what you're remembering is `/fan-value` itself.** Its whole model is
the three levers, each with its benchmark cited underneath the slider. That is
the research section — it just lives on the calculator rather than on a page
about fans.

---

## The research, verbatim, with its sources

### From `/fan-score` (`FanAuditPage.jsx:467-468`)

> Benchmarks: top fans **spend 66 to 80% more**, **stay 2 to 3 times longer**,
> and **refer around 4 times more** (Bain, Nielsen, HBR, Wharton).

One sentence, all three levers, four sources. This is the strongest single line
of proof on the whole site, and it is currently buried in a disclaimer under a
quiz result.

### From `/fan-value` (`FanValueModelPage.jsx:509-518, 664-667`)

Per-lever, each cited:

| Lever | Benchmark | Source |
|---|---|---|
| **Stay** | Loyalty and retention programs lift repeat purchasing 30 to 60% | industry benchmarks |
| **Spend** | Fully engaged customers spend around 23% more | Gallup |
| **Bring** | Referral and ambassador programs reach 20 to 35%; word of mouth around 14% | Wharton; Nielsen |

Plus the honesty note already written for each: *"Applied as a lower blended
lift across all repeat customers, since only some become fans."*

---

## ⚠️ One thing to decide before this goes on a page

The two sets of numbers **do not agree, on purpose**, and putting them on the
same page would look like a contradiction:

- `/fan-score` says fans **spend 66 to 80% more**
- `/fan-value` says fans **spend around 23% more**

They measure different populations. 66–80% is *top fans*; 23% is *fully engaged
customers*, deliberately used as a lower blended lift because only some
customers ever become fans. That reasoning is written down on `/fan-value` and
it is sound.

**Recommendation: the FLG page uses the `/fan-score` framing** (top fans: 66–80%
more, 2–3× longer, ~4× more referrals). It is about what a fan *is* — the same
subject as this page. The blended-down numbers belong on the calculator, where
the caveat that explains them is right there. I would not put both on one page.

**This needs your confirmation before it ships.** It is the only claim on the
page that isn't already public copy in the same context.

---

## Revised proof band

This replaces Option A / Option B in v1. It is stronger than either, because it
is research *and* results rather than a logo strip.

Placed between "What it is" and "Why fans" it does four jobs: earns the benefit
cards before they make their claims, breaks the two card grids apart, gives the
eye a rest, and sets up the six cards as "here is what that looks like in
practice."

> **Eyebrow:** The evidence
>
> **H2 — NEW, needs sign-off**
> This isn't a hunch.
>
> **Three stats — SOURCE: `/fan-score`, verbatim numbers**
>
> | | |
> |---|---|
> | **2 to 3×** | longer that top fans stay |
> | **66 to 80%** | more that top fans spend |
> | **~4×** | more often that fans refer |
>
> **Attribution line — SOURCE, verbatim**
> Bain, Nielsen, HBR, Wharton.
>
> **Then, in your own words — SOURCE: `HomePage.jsx` `CASES`, all three verbatim**
> And here is what it looked like when I built it:
> **Sold out** a $129 fan drop, in under 3 hours · US Mobile
> **60M+** UGC reach, at $0 media spend · Ubisoft
> **85%** positive sentiment, 15M players · Ghost Recon

The pairing is the point: **the benchmarks say fans do this, your case numbers
say you have made them do it.** Neither half is as strong alone. And it answers
the one question this page currently invites and cannot answer — "says who?"

### Lighter alternative, if that band feels too heavy

Given the "light touch" brief, the whole thing can collapse to **one line** under
the hero, with no cards and no grid:

> **SOURCE, verbatim**
> Top fans spend 66 to 80% more, stay 2 to 3 times longer, and refer around
> 4 times more. *Bain, Nielsen, HBR, Wharton.*

One sentence, four sources, zero new components, and it still kills the "says
who?" problem. It does not break up the two card grids, so the design fix for
that would have to come from somewhere else.

**My recommendation: the three-stat band, but typographic — big numbers on the
page ground, no card borders, no boxes.** That keeps the proof at full strength
while staying light, and a non-card band between the two card grids is exactly
the relief the page needs. It is the same reasoning that put the full-bleed
speaking band and the centred testimonial into the homepage rebuild.

---

## How this page connects to the rest of the site

Your note that the page's job is *"explain what FLG is, then connect to the rest
of the site"* gives the page a spine it doesn't currently have. Proposed roles,
which also settles the `/methodology` overlap:

| Page | Its one job | Where FLG hands off |
|---|---|---|
| **`/fan-led-growth`** | **What it is.** The idea, in plain language. | — |
| `/methodology` | **How I build it.** The Fan Engine™, five stages. | after the "so what do you do about it" band |
| `/fan-value` | **What it's worth.** Your number. | from the estimate card, and the close |
| `/fan-score` | **Where you stand.** 2-minute diagnostic. | tertiary link in the close |
| `/services` | **How we'd work.** The offers. | secondary link in the close |
| `/work` | **Proof it works.** The case files. | from the three case stats in the proof band |

Read down the page, that gives a clean argument: *here's the idea → here's the
evidence → here's what fans do → here's why it needs a system → here's who it's
for → here's your next step.* Every one of those beats hands to a different
page, so this becomes the front door to the site rather than a cul-de-sac.

Right now four of those six connections are missing.

---

## APPLIED — 22 Jul 2026

Built and verified in the browser. Measured at 1440×900 unless stated.

**Design, aligned to the homepage:**

| | Before | After |
|---|---|---|
| h1 / h2 | 60px / 44px | **84px / 44px** |
| hierarchy ratio | 1.36 | **1.91** (homepage: 1.91) |
| card grid width | 1052px | **960px**, capped and centred |
| sections | 3 | **6** |
| words per band | ~170 | **~109** |

- Type scale extracted to `src/lib/scale.js`; `Eyebrow` extracted to
  `src/components/Eyebrow.jsx`. Both now imported by HomePage and FLG, so the
  next round of polish reaches both. Homepage re-measured after the extraction:
  h1 84px, ratio 1.91, grid 960px, gold eyebrow — unchanged.
- Hero centred, matching the homepage's no-portrait hero. Long prose sets left
  inside the centred block (and on mobile the lede does too) — a centred rag on
  a five-line paragraph costs readability.
- Hero eyebrow red → gold. Fixes the one real contrast failure (3.75 → 11.17).
- `&nbsp;` widow control on seven line-ends; paragraph gaps opened to the
  homepage's `clamp(18px,2vw,24px)`.

**Copy, three new bands:**

- **The evidence** — typographic, no cards, between the hero and the first
  grid. The three benchmarks, verbatim from `/fan-score`, with the four sources
  named, and a link to `/work`.
- **What to do about it** — copy only, between the two card grids. Names the
  Fan Engine™ for the first time and hands to `/methodology`.
- **Where to start** — a real close at `h2close` scale: "Stop renting your
  growth." Primary `/fan-value`, secondary `/services`, then `/fan-score` and
  `/contact` as quiet tertiaries. All six site connections now exist.

**One extra fix, site-wide:** the prerenderer was baking scroll-reveal
`*-hide` classes (which set `opacity: 0`) into every snapshot — 7 on this page,
5 on the homepage. So the static HTML shipped content a crawler could read and
a human could not see until the SPA hydrated. `scripts/prerender.mjs` now
strips the hidden state before serialising. All 19 routes verified at 0.

**Verified:** lint clean on changed files; `npm run build` snapshots 19/19
routes; the FLG snapshot carries 706 words, the benchmarks, the sources line
and the new headings, with JSON-LD intact (DefinedTerm, WebPage, FAQPage).
No horizontal overflow at 375px; stats, both grids and the close CTAs all
collapse to one column. No console errors.

**Still open — your call, nothing blocked:** the "spend 66–80% vs 23%"
decision at the top of this file, and the three **NEW** copy blocks
(the "This isn't a hunch" beat, the handoff wording, the close headline). I used
my recommended option for each so the page is complete and reviewable rather
than half-built; all three are easy to swap.
