# Design critique: the oxblood close on every page

**Written:** 22 Jul 2026
**Question:** is closing every editorial page on a full-bleed `#A12A1E` band
good art direction, and is `/work` not having one a problem?
**Short answers:** the pattern is right and over-applied. `/work` is correct as
it is, and should not get one.

---

## What is actually there

Eight pages carry an oxblood close. Measured this session:

| Page | Close height | Page height | Share of page |
|---|---|---|---|
| `/services` | 560px | 4,005 | **14%** |
| `/about` | ~640px | 5,160 | **12%** |
| `/speaking` | 544px | 4,653 | **12%** |
| `/ai` | 544px | 5,804 | 9% |
| `/fan-engine` | 110px padding + content | 4,493 | ~12% |
| `/fan-led-growth` | full band | 4,967 | ~12% |
| `/` | full band, **and it holds the contact form** | | |
| `/work` | none | 2,342 | — |

So roughly **one eighth of every page is the same red block**, and on seven of
the eight it holds a headline and a button.

---

## First impression, across a session rather than a page

On one page in isolation the close is good: high contrast, unmissable, a clear
ask, and a definite ending rather than trailing into the footer.

The problem only appears where visitors actually live, which is three or four
pages deep. By the third page the red band has stopped being a moment and
become **chrome**: a second footer, above the real footer. The eye learns the
pattern in two exposures and starts scrolling past on the third. A gesture used
everywhere is not a gesture, it is a background.

**This is the same thing Laura has been fixing all day, at the other end of the
page.** The heroes are now deliberately different: a full-bleed photograph on
black for `/about`, brown for `/services`, a stripped three-element header on
`/work`. The feet are still identical. The site currently opens with
personality and ends with a template, which is half a differentiation and reads
as one.

## The strongest argument against the current setup

**The homepage close does the most work and looks the same as the ones that do
the least.** The homepage's oxblood band carries the actual contact *form*.
`/speaking`'s carries a headline and a button. Same colour, same weight, same
prominence, an order of magnitude apart in what they ask for and deliver.

If oxblood is the loudest colour in the palette — and it is — then the page
that deserves the definitive version is the homepage, and inner pages should be
quieter. There is hierarchy *within* every page on this site now. There is none
*between* them.

## Is `/work` a problem? No, and it should stay that way

`/work` is an index. Its job is to send someone into a case study, and the last
thing on the screen should be more work to click.

Three reasons not to add a close:

1. **Every card is already a CTA.** A red band would interrupt a grid of
   clickable work with a request to email instead, at the exact moment the
   visitor was about to do the thing the page exists for.
2. **The ask is elsewhere and closer.** Nav button, footer, and the foot of
   every case study the grid links to. A visitor is at most one click from a
   contact CTA at all times.
3. **The absence is doing useful work.** `/work` already looks different from
   everything else after the header rebuild. Ending differently compounds that
   rather than undoing it.

The one real risk is the page feeling like it stops rather than ends. It
doesn't, because a grid has a natural bottom edge; a paragraph would not.

---

## Recommendation: tier the close by what the page is for

Not "remove them all". Oxblood should be spent where the ask is the point, and
withheld where the next step is another page.

| Page | Close | Why |
|---|---|---|
| `/` | **Oxblood, with the form** | The definitive version. It should be the loudest close on the site and currently isn't distinguishable from the others. |
| `/services` | **Oxblood** | Commercial page. The ask *is* the page. It earns the loudest ending. |
| `/about` | **Oxblood** | The trust page, and usually the last thing read before someone emails. The ask lands here better than anywhere except /services. |
| `/fan-engine` | **Quiet close, own ground** | Explanatory. The right next step is /services or the Fan Score, not an email. Hand off, don't ask. |
| `/fan-led-growth` | **Quiet close, own ground** | Same. This page's job is to win an argument and pass the reader on. |
| `/speaking` | **Quiet close, own ground** | Different buyer, different ask. A booking enquiry is not the consulting CTA, and dressing it in the consulting close blurs both. |
| `/ai` | **Quiet close** | Becomes a sent link, not a browsed page (see the /ai cut proposal). |
| `/work` | **None** | Correct as-is. |

That takes oxblood from eight closes to three, which is what restores its
impact. "Quiet close" means the page's own ground, the same heading scale, a
strong text link or ghost button rather than a filled one, and roughly half the
band height.

## What NOT to do

- **Do not remove the close from `/services`.** It is the highest-intent page
  on the site and the one place a loud ask is unambiguously right.
- **Do not replace oxblood with a different colour on the quiet pages.** The
  problem is not the hue, it is that the loudest treatment is used
  indiscriminately. A second loud colour would recreate the problem.
- **Do not leave a page with no ending at all.** Prose needs a terminal
  element; only an index can stop on its own content.

## The rule, if this is adopted

> **Oxblood closes the pages that ask. Explanatory pages hand off on their own
> ground; index pages end on their index.** The homepage close is the loudest
> on the site, and no inner page should match it.

That is a one-line addition to the Design rules in `CLAUDE.md`, and it
supersedes "editorial pages close on oxblood `#A12A1E`. All seven now do."
from the 22 Jul handover, which is the rule that produced the current state.

---

## Accessibility note, unchanged by any of this

Cream on `#A12A1E` measures 4.32 for the primary buttons that sit in these
bands. That is a known site-wide item flagged in the earlier handover as its
own decision, and it applies to three closes or eight equally. Reducing the
number of oxblood bands reduces how often a visitor meets it, but does not fix
it. Worth deciding separately.
