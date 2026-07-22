# Copy reduction: the four inner pages

**Written:** 22 Jul 2026
**Follows:** `handover-shorten-pages-without-breaking-seo.md` (read that first)
**Pages:** `/services`, `/about`, `/fan-engine`, `/fan-led-growth`
**Supersedes nothing.** First pass at the inner-page cut. Homepage was done
separately on `homepage-lighter` and is not touched here.

The homepage went from 1,083 words to ~540 by cutting whole sections rather
than trimming sentences. Same treatment here, with one difference: the SEO
constraints in the handover mean `/fan-led-growth` gets the lightest touch of
the four.

---

## Outcome, measured

Both figures come from the same script over the built HTML in `dist/`, with
`<script>`, `<style>` and `<svg>` stripped. The "before" column was produced by
stashing these edits and rebuilding, so the two are directly comparable. Both
include ~35 words of nav and footer chrome.

| Page | Before | After | Cut |
|---|---|---|---|
| `/services` | 1273 | **1037** | −19% |
| `/about` | 778 | **714** | −8% |
| `/fan-engine` | 700 | **615** | −12% |
| `/fan-led-growth` | 744 | **715** | −4% |

Those before-figures land within four words of the handover's table, which is
the check that the measurement method matches.

**Read this honestly: this is a prose cut, not the homepage's cut.** The
homepage went 1,083 → 541 because whole arguments left the page. Here, three
sections and four paragraphs left, and the rest was tightened line by line.
`/services` is still 1,037 words and will not reach homepage density without a
decision only Laura can make. The two candidates are at the end of this file.

---

## What was protected

Checked before and after, per the handover:

- **The four inbound links to `/fan-led-growth`.** The `/services` hero
  backlink ("how customers become fans") and the `/fan-engine` proofstrip link
  ("Why fans grow a business") both sit in paragraphs that were rewritten. Both
  survive, with their anchor text word for word. `HomePage.jsx` and
  `FaqPage.jsx` were not edited at all.
- **The research proof band on `/fan-led-growth`** (Bain, Nielsen, HBR,
  Wharton: 2 to 3x, 66 to 80%, ~4x). Untouched, including the sources line.
- **Every number on every page.** No figure was rounded, restated or moved.
  $32K, 60M+, 50M+, 85%, 15M, 500K, 10M, +80%, ~$600K, $560K, 22 markets,
  thirteen years: all verbatim where they were kept, and none was invented.
- **Meta titles and descriptions.** Not changed on any of the four pages, so
  nothing needs re-counting against the 60 / 160 limits.
- **FAQ answers and their schema.** `/faq` is out of scope for this pass, so
  the shared answer strings in `FaqPage.jsx` and `fanLedGrowthJsonLd()` cannot
  have drifted.

---

## `/services` · 1273 → 1037

The page carried full depth on five offers with no skim layer, and said several
things twice.

**Cut whole:**

0. **The "For AI companies" band** (~55 words and a whole section). The index
   nav at the top of the page already carries a "For AI companies" row with its
   own one-liner, pointing at the same page. The band was a second button to a
   destination the reader had already been offered. `/ai` is still reachable
   from that row and from the footer.
1. **The index band lede** (46 words). It restated the hero
   ("The whole engine, or just the piece you need") and then the six index rows
   said the same thing again in their own words. The rows are the skim layer;
   they did not need a paragraph introducing them.
2. **"How far I take it is your call"** in the Fan Engine block (24 words).
   Advisory covers the light end and step 03 of How I Work ("I bring the people
   to run it") covers the heavy end.
3. **The AI band paragraph** (24 words). The band, its headline and its button
   stay. The paragraph repeated the headline above it.
4. **The finale reassurance** (20 words). "Not sure which fits? Tell me what's
   going on" sat two lines above "Take the 2-minute Fan Score, or tell me
   what's going on."

**Halved in place:** the Fan Engine framework paragraph, its "Need it when"
line, all four phase cards, Sentiment SOS "What you get", Fan Moments "What you
get", Advisory "What you get", the How I Work intro and all three of its steps,
and the proof-band credentials paragraph.

**Left alone:** every "Payoff" line (already one clause), every proof card,
every price and duration line, the whole index nav, both CTA pairs, and the
hero.

**Two ways to go further, both yours to call.** Neither was done here, because
both change what the page is rather than how tightly it is written.

1. **Move the Fan Engine's four phase cards to `/fan-engine`** ("The picture /
   The build / The tracking / Every quarter", ~110 words). They are engagement
   deliverables, and `/fan-engine` currently carries the method but not what
   you actually get. That would put `/services` near 925 and give the two pages
   a cleaner split.
2. **Drop from five offers to three**, folding Fan Moments and Sentiment SOS
   into a single "fix one thing now" block, the way the homepage already frames
   them. That is the only change that gets this page under 800.

## `/about` · 778 → 714

**Cut whole: the "Four disciplines, one engine" section** (~70 words, four
cards, one closing line). Brand / Product / Community / Growth with a note each
is on `/fan-engine` in the schematic and again on `/services`. Three pages
teaching the same four words is the clearest duplication on the site, and
`/about` is the one of the three whose job is Laura rather than the method.

The claim it made was worth keeping, so one sentence now closes the manifesto
instead: *"Brand, product, community and growth: I have built in all four,
which is what lets me wire them into one engine and put a number on it."*

**Merged:** the two Storytelling paragraphs into one. **Tightened:** the hero
sub-line, the manifesto opener, the Community paragraphs, Big Moments and How I
Work Now.

**One design change came with it.** Removing a bone section left "How I work
now" and the speaking teaser as two dark bands in a row, which is the flat
rhythm the homepage work was fixing. "How I work now" moved onto bone instead,
so the page still alternates: bone, dark, grey, oxblood, bone, dark, oxblood.
The teaser could not be the one to move, because its card captions are built
for a dark ground. Two CSS rules in `AboutPage.css` carry it, and the dead
`.about-disc` rules went with the cut section.

**Left alone:** the hero and its proof strip, the speaking teaser, the close,
all three art plates, and every pull figure.

## `/fan-engine` · 700 → 615

Nobody searches "Fan Engine" (it is a trademark, not a query), and its only
reader arrives from `/fan-led-growth` already sold. So this is a readability
cut with no SEO exposure.

**Cut whole: the Journey pull-quote** (30 words). "Belonging and identity are
what make advocacy compound instead of needing to be bought again every time"
restated the loop note six inches above it, and "I show it moving in the
numbers" is the entire next section's headline.

**Merged:** the two Method ledes into one. **Tightened:** the four discipline
notes, the Journey lede, the Measured lede, the scoreboard intro, all four
scoreboard entries, and the close lede.

**Left alone:** the schematic, the five stages, the loop note, the proof strip
and its two links (one of which is an inbound link to `/fan-led-growth`).

## `/fan-led-growth` · 744 → 715

Lightest touch of the four, deliberately. This and `/faq` are the only two
pages doing acquisition work, and the page has to answer the question to be
worth ranking for it. Nothing structural was removed: same six beats, same six
benefit cards, same four situation cards, same evidence band.

**Tightened only:** the hero closing paragraph, the "Why fans" lede, both
"What to do about it" paragraphs, the "Who it's for" lede, and the wording
inside the benefit and situation cards.

At 715 words it is now the second-heaviest of the four, which is the right way
round: it is the only one of them a stranger reaches from a search result.

Everything cut was connective tissue, not substance. The page still answers
what fan-led growth is, why fans behave differently, what the evidence says,
what to do about it, and who it is for.

---

## How to verify

```bash
npm run build
```

Must report 19/19 routes snapshotted. Then:

```bash
for f in dist/index.html dist/services/index.html dist/fan-engine/index.html dist/faq/index.html; do echo "$f $(grep -o 'href="/fan-led-growth"' $f | wc -l)"; done
```

Each must return 2 (one nav link, one body link). A 1 means a rewrite dropped
an inbound link.

**Note on the handover's version of this check.** It gives `grep -c`, which
counts matching *lines*. The built HTML is one line, so it returns 1 for every
page whether the body link is there or not. `grep -o | wc -l` counts
occurrences, which is what was wanted. All four returned 2 after this pass,
with anchor text intact:

| Page | Body anchor |
|---|---|
| `/` | "How customers become fans" |
| `/services` | "how customers become fans" |
| `/fan-engine` | "Why fans grow a business" |
| `/faq` | "How customers become fans" |

Also verified after the build: `19/19` routes snapshotted, no console errors,
the research figures still present on `/fan-led-growth`, all six benefit cards
and all four situation cards still rendering, and no title or description
changed on any of the four pages (65 / 58 / 43 / 47 chars, and 146 / 151 / 130
/ 148, all as they were).

`/services` has carried a 65-character title since before this work. The
handover's rule is titles ≤ 60, so it is worth a look, but it was left alone
here: retitling a commercial page is a separate decision from shortening it.
