# Two unwritten rules: CTA arrows, and the red close band

**Written:** 22 Jul 2026
**Why:** both came up on the /fan-led-growth pass. Neither is written down
anywhere, both are followed by most of the site, and the two most recently
rebuilt pages are the ones breaking them.

Audited across all 12 page components plus `Layout.jsx`, `WorkCard.jsx` and
`CaseStudyCinematic.jsx`.

---

## 1. Arrows on CTAs

### What the site actually does

Three categories, and two of them are already perfectly consistent.

**Inline links, inside a sentence. Never an arrow. No exceptions.**

> "New to this? Start with *how customers become fans*." (`/services` hero)
> "I build it into *an engine you own*" (`/fan-led-growth` hero)
> "Full history *on LinkedIn*, see the *case studies*." (`/about`)
> "Or find me on *LinkedIn*." (homepage close)

**Standalone text links, on their own line. Always an arrow. No exceptions.**

> "See all services →" · "See all work →" (homepage)
> "See the case studies →" · "Why fans grow a business →" (`/fan-engine`)
> "See programs I've built →" (`/services`)
> "More keynote speaking →" (`/about`)
> "Say hello →" (footer, every page)

**Buttons. This is the one that is split.**

| Arrow on buttons | No arrow on buttons |
|---|---|
| `/ai` · `/about` · `/fan-led-growth` · `/fan-value` · `/fan-score` · `/faq` · `/services` · `/speaking` | **homepage** · **`/fan-engine`** |

Eight pages to two. But the two are the two most recently rebuilt: the
homepage lighter rebuild (21 Jul) and the `/fan-engine` cut (22 Jul). So the
split is not random, it is **old standard versus new instinct**, and the new
instinct has only reached two pages.

### The rule I would write

> **Arrows mark links, not buttons.**
> A button already looks like an action. The arrow is chrome on top of a shape
> that is doing the job. A standalone text link has no shape, so the arrow is
> what makes it read as a link at a glance. A link inside a sentence has the
> sentence, so it needs nothing.

This keeps the two categories that are already consistent exactly as they are,
and resolves the third in favour of the homepage.

It also fits the direction of everything else this week: the homepage rebuild
dropped heading weight from 800 to 700 and cut a third of the words. Arrows on
every button are the same kind of noise, one layer down.

**Cost of adopting:** deleting `<span aria-hidden>→</span>` from the buttons on
eight pages. Mechanical, no copy changes, no layout risk. Roughly 20 buttons.

**The honest counter-argument:** an arrow on a button that leaves the page is a
small, real signal ("this navigates"). But the site does not use it that way
today. On the homepage, "Take the quiz" and "See my talks" both navigate to
other pages and neither has an arrow, while on `/services` "It's urgent, let's
talk →" has one. So the arrow currently signals nothing a reader could learn.
Either make it mean something consistently, or drop it. Dropping is cheaper and
quieter.

**Not in scope of the rule:** `←` on back links (`← All work`, `← Previous case
study`), `↓` on the one in-page jump (`How I work ↓`), and `↗` on the external
LinkedIn link in the footer. Those three point in a direction that carries
meaning, and they are already used consistently.

---

## 2. The red band at the bottom

### What the site actually does

**Six of the seven editorial pages end on the same oxblood band, `#A12A1E`:**

| Page | Closing band | Ground |
|---|---|---|
| Homepage | `.contact-red` | **#A12A1E** |
| `/services` | `.svc-band--ox .svc-finale` | **#A12A1E** |
| `/about` | `.about-band--ox .about-close` | **#A12A1E** |
| `/fan-engine` | `.meth-band--close` | **#A12A1E** |
| `/ai` | `.ai-band--finale` | **#A12A1E** |
| `/speaking` | `.sp-band--finale` | **#A12A1E** |
| **`/fan-led-growth`** | inline | **#0E0B09 near-black** |

`/work` also ends dark, but it is an index, not an editorial page, and the tool
pages (`/fan-score`, `/fan-value`, `/faq`) end inside their own result or
answer layout rather than on a band at all. So the exception is genuinely one
page: `/fan-led-growth`.

### The rule that already exists

> **Red is the action colour, and the page ends on it.** Every editorial page
> closes on the oxblood band. A reader who has seen any other page has learned
> that the red band is where the ask lives.

### Why /fan-led-growth broke it, and why I now think it should not

The page's own comment gives the reasoning:

> "The one full inversion, and it lands where it should [...] On an otherwise
> light page the dark ground does the work the homepage needs a red band for."

The logic is sound. The problem is that the premise is not true of this page,
because **it is not the page's only inversion.** The band order is:

| Band | Ground |
|---|---|
| Hero | cream `#EFE9DC` |
| The evidence | off-white `#FCFAF3` |
| Why fans | cream `#EFE9DC` |
| **What to do about it** | **near-black `#15110F`** |
| Who it's for | cream `#EFE9DC` |
| **Where to start (the close)** | **near-black `#0E0B09`** |

The two darks are 11 RGB units apart. To the eye they are the same ground. So
the close is not a full inversion arriving for the first time, it is **a repeat
of a ground the reader met two sections earlier**, at the exact moment the page
most needs to feel like an ending.

This is the same shape as the homepage close being the smallest h2 on its page:
a closing moment that is quieter than the middle of the page it closes.

**Recommendation: take `/fan-led-growth`'s close to `#A12A1E` like the other
six.** The band order becomes cream, off-white, cream, near-black, cream,
oxblood: a genuinely new ground at the ending, and the site-wide signal that
this is the ask.

**What it costs.** The close's two buttons are currently red `#C8362B` and a
cream wash, which will not work on oxblood. The site already has the answer in
two flavours, so nothing needs inventing:

- **Homepage's version:** ink button (`.btnink`, `#15110F`) as primary, cream
  text links under it.
- **`/services`' version:** `.btn--primary` red with a ghost outline beside it.

The homepage's is the better fit, since this close is three tiers (a primary, a
secondary and a quiet third) and the ink button gives the strongest contrast on
oxblood.

**The honest counter-argument:** the editorial mode pilot exists to make this
page feel like a different kind of page, and the dark close is part of that
identity. If the intent is that editorial pages are *visibly* a different
species, the exception is defensible. But then it should be written down as
"editorial pages close dark", and the next editorial page should do it too,
rather than sitting as a one-off.

---

## Proposed additions to CLAUDE.md

If both are settled, they belong next to the hover-honesty rule:

```markdown
- **Arrows mark links, not buttons.** A standalone text link gets a trailing
  `→` because it has no shape of its own. A link inside a sentence gets
  nothing. A button gets nothing: it already looks like an action.
  Directional arrows that carry meaning (`←` back, `↓` in-page jump,
  `↗` external) are exempt.
- **Editorial pages end on the oxblood band** (`#A12A1E`). Red is the action
  colour and the close is the ask. Index and tool pages are exempt: they end
  inside their own layout.
```

Neither is applied yet. Both are one decision each.
