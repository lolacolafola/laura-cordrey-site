# /services is too heavy: the full option set

**Written:** 22 Jul 2026
**Supersedes** the scattered recommendations in `benchmark-services-page-22jul.md`
and `services-cards-on-light-proposal.md`. This is the decision doc.

**Where the page stands after today's fixes:** 1,035 words, **8,255px desktop**,
**10,830px mobile**. Benchmarks measured today: 3,473px and 3,722px.

**The type scale is no longer the problem.** Section headings are 41px against
the benchmarks' 41.7 and 46. Everything below is about structure, not styling.

---

## First: the hover idea, and why the homepage can do it and this page cannot

Laura asked about copying the homepage's reveal. **The homepage genuinely does
this** and I was wrong to imply otherwise: `.svcard-copy` sits at
`grid-template-rows: 0fr; opacity: 0` and opens to `1fr` on `:hover`, animating
over 0.42s. It is a nicely built pattern.

The part that decides it, in `HomePage.css`:

```css
@media (hover: none), (prefers-reduced-motion: reduce) {
  .cinv2 .svcard-copy { grid-template-rows: 1fr; opacity: 1; }
}
```

**On touch, everything is shown.** That is the correct fallback, and on the
homepage it costs nothing: the hidden copy is about 30 words per card.

On `/services` it costs everything:

| | Desktop | Mobile |
|---|---|---|
| Now | 8,255px | **10,830px** |
| With hover-reveal | ~4,000px | **10,830px, unchanged** |

Mobile is where "too heavy" hurts most, and hover-reveal does nothing for it.
Two further problems specific to this page:

- **Each offer has its own CTA inside it.** Hover-revealing a button means
  hovering to see it, then travelling to it without leaving the card. The
  homepage cards deliberately have no CTA inside for this reason: one button
  sits under the group.
- **You cannot deep-link a hover state.** `/ai` links to
  `/services#sentiment-sos` and `#fan-moments`.

**Verdict: it is the accordion's weaker sibling.** Same idea, works on one
platform instead of both, and cannot be linked to.

---

## The options, cheapest first

| # | Option | Desktop | Mobile | Build | Loses |
|---|---|---|---|---|---|
| 1 | Cheap fixes only | ~7,300 | ~9,800 | 1h | nothing |
| 2 | Move "How I work" + proof band off the page | ~7,100 | ~9,300 | 1h | nothing from the offers |
| 3 | Hover-reveal | ~4,000 | **10,830** | 2h | mobile, deep links, in-card CTAs |
| 4 | Cards on light | ~6,900 | ~8,600 | half day | nothing |
| 5 | **Accordion** | **~3,500** | **~4,200** | half day | comparison becomes clicking |
| 6 | Tabs | ~2,900 | ~3,800 | half day | comparison almost entirely |
| 7 | Three doors, not six | ~6,000 | ~7,500 | half day | granularity at the top |
| 8 | One page per offer | ~2,200 | ~2,800 | 2 days | nothing, gains 5 indexable pages |

### 1. The cheap fixes
Heading weight 700 → 500/600, fold the index heading into the hero, column
ratio 5fr/7fr → 4fr/8fr, proof cards to proof lines, compact the four phases.
**Real but not enough on its own.** Do these whatever else is chosen: they cost
nothing and they compound with every other option.

### 2. Move "How I work" and the proof band off the page
**Nobody has raised this and it is nearly free.** Those two bands are
**1,191px, 14% of the page**, and neither is about the offers. "How I work" is a
process explainer that belongs on `/about`; the logos and the Brusson quote are
already on `/about` and the homepage. A one-line link ("How I work →") replaces
them.

### 3. Hover-reveal
See above. Not recommended for this page.

### 4. Cards on a light ground
Detail in `services-cards-on-light-proposal.md`. Good, and it makes the page
lighter to look at, but it does not solve "too much at once": all five offers
are still fully expanded, just packed tighter.

### 5. Accordion — the recommendation
Six rows, each opening in place. Flagship open by default, more than one open at
a time, panels CSS-hidden rather than unmounted, hash deep links open their
panel. Detail in `services-cards-on-light-proposal.md`.

**The only option that reaches benchmark parity without deleting a word**, and
the only one that fixes mobile as much as desktop.

### 6. Tabs
Shorter still, because only one panel exists at a time. Rejected: six tab labels
do not fit a mobile tab bar, and it makes comparing two offers actively
difficult rather than merely slower.

### 7. Three doors instead of six
Reframe the top of the page as three decisions rather than six products:

> **Something is on fire** → Sentiment SOS
> **I want growth I do not pay for** → Fan Programs, Fan Moments
> **I want the whole engine** → The Fan Engine, Advisory

This treats the real problem as **choice** rather than **length**, which may be
closer to the truth: six options each carrying seven elements is a lot to weigh
regardless of how tall the page is. Worth considering *with* the accordion
rather than instead of it, as the framing above the rows.

### 8. One page per offer
What Energize Consulting does, and what the site's own structure is drifting
toward. `/services` becomes a real index at roughly 2,200px; each offer gets a
page with room for a case study, an FAQ and its own meta.

**Best long-term answer, biggest build, and it is the only option that adds SEO
surface**: five pages targeting five different problems, where today one page
targets none of them well. It also splits the buying flow across clicks, which
is the same objection Laura raised to moving the Fan Engine phases, so it is
only right if each page is genuinely complete on its own.

---

## Recommendation

**2 + 5 + 1, in that order**, with 7 as a copy change on top if it appeals.

1. Move "How I work" and the proof band off the page (1h, free win, nobody's
   sacred cow)
2. Build the accordion at `/services-v2` (half day)
3. Apply the cheap fixes to whichever version wins

Expected landing: **~3,000px desktop, ~3,600px mobile**, from 8,255 and 10,830.
That is benchmark parity on both, with every word, every number and every CTA
still on the page.

**Option 8 is the better answer in six months**, once there is a case study
worth hanging off each offer. It is not the right first move, because it is four
times the work to reach a similar place.
