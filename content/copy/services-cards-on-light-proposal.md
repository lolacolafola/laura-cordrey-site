# /services: cards on a lighter ground

**Written:** 22 Jul 2026
**Status:** proposal, nothing built. Laura's idea, costed against measurements.

> **SUPERSEDED IN PART, same day.** Laura then asked: what if the menu at the
> top opens each service instead? That is a better answer to the actual problem
> and the numbers say so. See "The accordion" at the foot of this file. The
> light ground, the flagship-is-not-one-of-five principle and the no-prices rule
> all carry over; the five-cards-in-a-grid layout does not.

**Context:** `benchmark-services-page-22jul.md` (the page is 8,255px and 1,035
words against benchmarks at ~3,600px and ~330 words).

---

## Short version

The two ideas fix each other. Going light removes the thing that currently
separates one offer from the next (band colour), and cards put that separation
back in a form that costs far less height. Neither works as well alone.

Measured, it is also the **biggest single lever discussed today**: roughly
1,300px, against ~950px for all the layout tweaks combined.

---

## Why cards save so much

| | Now |
|---|---|
| Total band padding, all 10 sections | **1,788px** (22% of the page) |
| Padding inside the five offer bands alone | **961px** |
| Actual offer content | 3,566px |
| Five offer bands, total | 4,527px |

Five full-bleed bands each pay 96px of padding top and bottom. Five cards
inside **one** section pay it once.

| | Saving |
|---|---|
| Nine band paddings → one, plus card gaps | **~690px** |
| Content reflows to full width (the empty 461px left column goes, so text blocks get shorter rather than taller) | **~600px** |
| **Total** | **~1,300px** |

That would put the page near **6,900px** before any of the smaller fixes, and
near **6,200px** with them.

## Why lighter is defensible, and what it costs

`editorial-mode-light-vs-dark-v1.md` already did this analysis for
`/fan-led-growth` and its findings apply directly:

- Dark-to-cream is **369 RGB units**, the only real signal in the palette. The
  two darks are 11 apart, espresso is 38. There is no third ground.
- "Long-form reading genuinely belongs on light ground." At 1,035 words,
  `/services` is long-form by any measure.
- Both benchmarks are light.

**The cost, named honestly.** That document established `dark = something you
read, cream = something you use`, and then spent some of it moving
`/fan-led-growth` to cream. Moving `/services` too means cream no longer
distinguishes anything much: the site would be light nearly everywhere.

**But that may be the right trade, because it swaps a weak signal for a strong
one.** Colour has exactly two usable values. Structure has many. If this lands,
the site reads:

| Page type | Signal |
|---|---|
| Editorial (`/fan-led-growth`) | prose, left-aligned, on light |
| **Commercial (`/services`)** | **cards, on light** |
| Tools (`/fan-score`, `/fan-value`, `/contact`) | forms and controls, on light |
| Homepage | the one dark page, and therefore unmistakable |

That is a better system than the current one, and it makes the homepage more
distinctive rather than less.

## The risk worth taking seriously

**Cards can read as a pricing table, and this is not one.** Laura sells bespoke
engagements; five equal cards in a grid is the visual language of SaaS tiers,
and it could cheapen a considered purchase.

Three things stop that:

1. **The flagship is not one of five.** The Fan Engine gets a full-width
   featured card carrying its four phases; the four pieces sit under it as a
   2x2. The hierarchy becomes explicit rather than implied by band order.
2. **Keep the proof line in every card.** Numbers are what make this look like
   evidence rather than a menu, and neither benchmark has any.
3. **No prices in the cards.** The duration and "priced per engagement" lines
   stay as they are. The moment five cards carry five numbers it becomes a
   tier table.

The homepage's "Three ways I help" band is the precedent that this reads as
considered rather than commodity, on this brand, with this palette.

## Proposed structure

```
Hero            dark, one CTA, index heading folded in
The six rows    light — unchanged, this is the skim layer and it works
─────────────── one section, light ground
  [ THE FAN ENGINE ]  full-width featured card
      kicker · title · framework line · Need it when
      the four phases, compact
      Payoff · proof line · duration · CTA
  [ SOS ]   [ PROGRAMS ]     2x2, equal cards
  [ MOMENTS ] [ ADVISORY ]   each: kicker · title · 3 lines · proof · duration · CTA
───────────────
How I work      light
Proof band      dark  ← the one inversion, where the logos and the quote live
Finale          oxblood, unchanged
```

Two dark moments on the whole page: the hero and the proof band. Everything
else light. The finale stays oxblood per the close-band rule settled earlier
today.

## Cost, honestly

This is a **rebuild of the page's core**, not a tweak. The five offer blocks are
a 5fr/7fr grid with a sticky column and per-band colour overrides; cards mean
new markup and a new set of CSS. Half a day of work, and it needs looking at
before it is trusted.

**Recommendation: build it at `/services-v2` and compare side by side.** That is
exactly how the homepage rebuild was done (`/home-v2`), it costs nothing to
abandon, and it is the only way to answer "does this cheapen it?" honestly,
which no amount of reasoning here will settle.

## If the answer is no

The fallback is the revised list in the benchmark doc, all of it cheap and none
of it structural: heading weight 700 → 500/600, fold the index heading into the
hero, column ratio 5fr/7fr → 4fr/8fr, proof cards to lines, compact the phases.
Around 950px and a lighter feel, keeping the current design language.

---

# The accordion: open each service from the menu

**Laura, same session:** *"what about that menu at the top opening up each
service? this page as it stands is too heavy no matter what."*

**She is right, and this beats the card proposal above on its own terms.**

## The numbers

Estimated from the measured parts of the current page.

| | Now | Cards on light | **Accordion** |
|---|---|---|---|
| Hero | 603 | ~500 | ~500 |
| Index / offers | 957 + 4,527 | ~2,900 | **~1,260** (six rows + one panel open) |
| How I work | 654 | 654 | 654 |
| Proof band | 537 | 537 | 537 |
| Finale | 560 | 560 | 560 |
| **Total** | **8,255** | **~6,900** | **~3,500** |

Benchmarks measured today: **3,473px** and **3,722px**.

The accordion is the only option on the table that reaches benchmark parity,
and it does it **without deleting a single word**. Every offer keeps its four
beats, its proof, its duration and its CTA. Nothing is lost, it is just not all
demanded at once.

That is the difference between this and every other idea today: the others make
the page smaller by making it say less. This one makes it smaller by asking
less of the reader.

## The four rules it must follow

These are requirements, not preferences. Each is a real failure if missed.

1. **CSS-hide the panels, never unmount them.** The build prerenders every route
   to static HTML. If closed panels are conditionally rendered out of the React
   tree, ~700 words vanish from the snapshot a crawler receives, along with most
   of what the page says. Hidden-by-CSS content stays in the DOM and is indexed
   normally. `<details>`/`<summary>` or a height/visibility toggle, not
   `{open && <Panel/>}`.

2. **Deep links must open their panel.** `/ai` links to
   `/services#sentiment-sos` and `/services#fan-moments`. Arriving with a hash
   has to open that panel and scroll to it, or those two inbound links land on a
   closed row and look broken.

3. **The flagship opens by default.** Otherwise the page is a list of six links
   and nothing else, which reads as thin rather than light, and the most
   important offer becomes the one nobody sees. It also gives the page something
   to *be* above the fold.

4. **More than one can be open at once.** This is a considered purchase and
   people compare. An accordion that closes the last panel every time you open
   the next makes comparison impossible, which is worse than a long page.

Plus the usual: a real `<button>` with `aria-expanded` and `aria-controls`, not
a div; and the row already moves on hover and will now do something on click,
so hover honesty is satisfied.

## The one real cost

**Comparison becomes clicking instead of scrolling.** Someone weighing
Sentiment SOS against Fan Programs currently scrolls between them; now they open
two panels. Rules 3 and 4 above soften it, but they do not remove it.

Worth watching rather than solving up front: the six one-line promises in the
index rows already carry the comparison ("Protect. Keep the customers a blow-up
would cost you." / "Grow. Growth you don't pay for every time."), and those stay
visible whatever is open. That may be all the comparison layer a reader needs.

## Recommendation

Build it at **`/services-v2`**, light ground, accordion, flagship open, on the
`/home-v2` precedent. Compare the two live before committing.

If it works, this is the answer for `/about` and `/ai` too, both of which stack
long sections nobody asked for yet.
