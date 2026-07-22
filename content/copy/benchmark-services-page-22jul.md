# Benchmark: how heavy is /services, really?

**Written:** 22 Jul 2026
**Why:** after the type-scale fix, `/services` still felt heavy. Rather than
keep guessing, two comparable pages were measured live with the same script
used on Laura's pages.

**Sample size is two.** A third source promised 30+ consultant sites and listed
no URLs. Treat the direction as reliable and the precise ratios as indicative.

---

## The numbers

Measured at 1280x900, live, same method throughout.

| | **Laura /services** | Anastasia Shtompel<br>*Services & Products* | Energize Consulting<br>*Fan Engagement Strategies* |
|---|---|---|---|
| **Words** | **1,035** | **418** | **249** |
| **Page height** | **8,255px** | **3,722px** | **3,473px** |
| Offers on the page | **5** (+ an AI row) | 3 | 1 |
| Section h2 size | 41px | 41.7px | 46px |
| **Heading weight** | **700** | **400** | **400** |
| h1 | 84px | *(none)* | 25px |
| Hero CTAs | 1 | 0 (per-offer instead) | 0 |

### What this says

**1. The type scale is no longer the problem.** Section headings are 41px
against their 41.7 and 46. That part is now in line, and today's fix is
confirmed by the comparison rather than just by internal consistency.

**2. The page is 2.5x the words and 2.2x the height of its closest
comparable.** That gap is not typography. It is how many offers are carried,
at what depth.

**3. Both benchmarks run headings at weight 400.** Laura is at 700, down from
800 this morning. `homepage-density-analysis.md` already called weight "the
biggest single lever" and the benchmark agrees: it is the one purely visual
lever still on the table, worth roughly the same again as 800 → 700 was.

**4. Neither benchmark carries five offers at depth on one page.** Anastasia
runs three, each about 100 words. Energize gives each service **its own page**.
Laura runs five at 150 to 250 words each. That is the entire difference.

**5. Laura's page is better than both in ways worth protecting.** It has a real
h1 (Anastasia's page has none, which is an SEO fault, not a style choice). Every
offer carries a proof card with a real number. Every offer states a duration and
a price basis. Neither benchmark does any of that, and it is why Laura's page
converts an informed buyer better than a prettier, emptier one would.

---

## Options, cheapest first

### A. Heading weight 700 → 500 or 600
**Cost:** one value. **Loses:** nothing.
Both benchmarks sit at 400. Manrope at 400 is probably too light for this brand,
but 500 or 600 would take real weight off the page without touching a word or a
layout. This is the highest ratio of effect to effort left.

### B. Move the Fan Engine's four phase cards to /fan-engine
**Cost:** small. **Loses:** nothing from this page's job.
Already recommended twice, now with a measurement: those four cards are **495px**,
and the Fan Engine band is 1,406px, 17% of the page. `/fan-engine` explains the
method but never says what you actually get, so the content lands somewhere it
improves a second page.

### C. Fold the index heading into the hero
**Cost:** small. **Loses:** nothing.
Right now the page opens twice: hero (603px), then a second intro at "Where
would you start?" before the six rows (957px). That is 1,560px of preamble
before the first offer. If the hero *is* the index intro and the rows follow
immediately, the page starts working sooner and stops feeling like the homepage.
This is also the answer to "make the intro feel less like the HP": the reason it
reads similarly is not the wording, it is that both pages open with
eyebrow → h1 → lede → one CTA and then a section heading. Removing the second
opening breaks the echo.

### D. Thin the repeated furniture inside each offer
**Cost:** medium. **Loses:** a little.
Each of the four non-flagship offers runs ~780px carrying: kicker, title, three
labelled lines, a proof card, a duration line, a CTA, sometimes a second link.
Dropping the proof *card* to a single proof *line* would save roughly 60px per
offer, ~240px total, without losing a number.

### E. One page per offer
**Cost:** large. **Loses:** nothing, gains SEO surface.
This is what Energize does. `/services` becomes a real index (which it already
half is) and each offer gets a page with room to breathe. It is the structurally
correct answer for five offers at this depth, and the biggest build.

### F. Fold five offers into three
**Cost:** medium build, large decision. **Loses:** offer granularity.
The only option that gets the page near the benchmark's word count. It is a
business decision about the offer set, not a design one.

---

## REVISION, same day: B is withdrawn

Laura's challenge: *"is it a weird experience to have to go through different
pages to get the Fan Engine services?"*

**Yes, and it kills option B.** The Fan Engine is the flagship: the most
expensive, most considered purchase on the page. Sending someone off-page to
find out what they get, while the four cheaper offers state it inline, would
make the most important offer **the least well explained one on the page**.
That is backwards, and the 495px was never worth it.

The distinction I leaned on (method on `/fan-engine`, engagement on `/services`)
is real, but "The picture / The build / The tracking / Every quarter" is a
**deliverables** list, and deliverables belong where the buying decision
happens. `/fan-engine` still lacks a "what you get" section, but that is
`/fan-engine`'s problem to solve with its own content, not by taking this
page's.

### Where that 495px comes from instead: the layout

Measured inside the offer blocks, and there is more slack here than in the copy.

| | Left column | Right column |
|---|---|---|
| Width | **461px** | 646px |
| Content height (4 of 5 offers) | **61px** | 550 to 614px |
| Content height (Fan Engine) | 150px | 1,214px |

The left column is 42% of the content width and holds a kicker and a 41px
title, then several hundred pixels of nothing, while the right column is
squeezed into 646px and grows tall to fit. Whitespace is not the enemy, but
this much of it is *costing* height rather than creating calm.

**Three layout changes, no content moved off the page:**

| Change | Saves | Loses |
|---|---|---|
| Column ratio 5fr/7fr → **4fr/8fr** (right column 646 → ~740) | **~350 to 400px** | nothing |
| Proof **card** → proof **line** (5 cards, 659px total, boxed with a "PROOF" label) | **~330px** | the box, not a single number |
| The four phase cards compacted (495px, 4 stacked icon cards of ~240px) | **~250px** | nothing |

Together that is roughly **950px**, more than option B offered, while the
flagship keeps its deliverables exactly where a buyer needs them.

### On removing the proof entirely

Laura asked whether the proof line can go. **Keep the numbers, drop the card.**

Every offer's proof is a real figure: 60M+ fan views and ~$600K earned media,
85% across 15M players, 50M+ views, $32K in three hours, thirteen years. Those
are the only evidence on the page and they sit exactly where the reader is
deciding. **Neither benchmark has a single number anywhere**, and that is the
main thing this page does better than either of them.

What can go is the chrome: the inset box, the border and the "PROOF" label,
which is 24px/32px of padding around one sentence, five times over. As a quiet
single line under the offer it keeps every figure and saves most of the height.

If the intent is to remove the evidence itself, that is a real trade and worth
naming: the page gets shorter and less persuasive at the same time.

---

## Recommendation (revised)

**A + C + the three layout changes above.** B is withdrawn.

Order: heading weight, fold the index heading into the hero, column ratio,
proof cards to lines, compact the phases. Expected landing around **7,200px**
from 8,255, with the Fan Engine block intact and every number still on the page.

## Original recommendation (superseded)

**A + B + C together**, in that order. All three are cheap, none removes
anything a buyer needs, and together they should take the page from 8,255px to
roughly 7,000 while removing the "second intro" that makes it echo the homepage.

Then re-measure and decide whether D, E or F is worth it. My guess is that after
C the page will feel materially different for a reason that has nothing to do
with length: it will stop introducing itself twice.

**Sources:**
[anastasiashtompel.com/services-and-products](https://www.anastasiashtompel.com/services-and-products) ·
[energizeconsulting.com/fan-engagement-strategies](https://www.energizeconsulting.com/fan-engagement-strategies) ·
[wpminds.com/best-consultant-websites](https://wpminds.com/best-consultant-websites/) ·
[knapsackcreative.com/best-consulting-websites](https://knapsackcreative.com/best-consulting-websites)
