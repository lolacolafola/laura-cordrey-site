# /services rebuilt as an accordion: what shipped, measured

> **SUPERSEDED, 22 Jul 2026.** The plain text accordion described here was
> replaced by the colour row design later the same day. The four SEO rules,
> the verification method and the measurements all still apply. What
> shipped is in `services-final-rows-22jul.md`.


**Written:** 22 Jul 2026
**Status:** built and verified on `main`, **uncommitted**
**Copy source:** `copy-services-v3-cards-and-ticks.md`
**Supersedes** `services-weight-options.md` (the eight options), the colour
flattening earlier today, and `services-flatten-and-payoff-v1.md`.

---

## What the page is now

One thing instead of two. The index used to be six grey text rows sitting on
top of five full-width offer bands. **The row IS the offer**, and five of the
six open in place.

```
dark hero
cream band → "Where would you start?" → 6 rows, flagship open
cream band → How I work + the Brusson quote
oxblood close
```

Per row, open: a hook line, two or three ticks, one proof line, the duration,
and one way in. That is it. Everything else went to the PDF.

**No colour on the rows.** Coloured cards, full-bleed colour rows, colour
blocks on the left and rows tinted to their block were all mocked up and
rejected across four rounds. What separates two offers is a hairline. What
marks one as openable is a plus.

**Plus versus arrow.** Five rows open in place and get a plus that rotates to
an x. Row 06, For AI companies, actually navigates, so it keeps an arrow and is
a link rather than a button. Same rule as
`design-rules-arrows-and-close-bands.md`.

## Measured, before and after

Before figures taken by reloading the pre-rebuild page, not quoted from
earlier docs.

| | Before | After | |
|---|---|---|---|
| Desktop height, 1280 | 7,899px | **3,947px** | **−50%** |
| Mobile height, 375 | 10,406px | **4,673px** | **−55%** |
| Benchmarks | | 3,473 and 3,722 | **parity** |
| Words in the built HTML | ~1,050 | **661** | |

Opening a second row adds about 350px; three open at once is 4,650px, still
under where the page started by 40%.

**This is the first change that actually moved the number.** The type pass
delivered 6%, the colour flattening delivered 6%. Cutting the copy and folding
the offers into the index delivered 50%, because it was the only one that
removed objects from the page rather than restyling them.

## The four rules, verified in the built HTML

1. **Panels are CSS-hidden, never unmounted.** Confirmed: "A re-score every
   quarter", "Sentiment tracked so you watch it climb back", "The plan in
   writing that week" and "85% positive sentiment" all appear in
   `dist/services/index.html` with their rows closed.
2. **Hash deep links open their panel.** `/services#fan-moments` on a cold load
   opens the row. `/ai` still carries both links, verified 2 in
   `dist/ai/index.html`.
3. **The flagship opens by default.** Confirmed on a fresh load.
4. **More than one open at once.** Confirmed: three rows opened together, each
   click toggling only its own row.

## Other checks

- `npm run build` → **19/19 routes snapshotted**
- `/fan-led-growth` inbound links: **2 each** in `index.html`, `services/`,
  `fan-engine/`, `faq/`
- All six anchor ids present in the prerendered HTML
- Contrast on every new element, against the cream ground: kicker 7.13, name
  15.51, hook 5.95, ticks 5.95, proof 5.95, proof figure 15.51, proof label
  7.13, duration 5.95, CTA note 5.95, foot link 7.13, arrow 7.13. **Lowest is
  5.95 against a 4.5 minimum.**
- No horizontal overflow at 375px. Row tap target 156px tall, plus button 34px.
- The five `?need=` contact keys are unchanged, so per-offer routing still
  pre-selects.

## One bug found and fixed during the build

A deep-linked row landed with its title flush to the top of the viewport,
which on this site means **underneath the fixed nav** —
`getBoundingClientRect().top` was 0 for `/services#fan-moments`.
`.svc-band[id]` already carried `scroll-margin-top: 96px` for the old section
anchors, but the accordion rows are the anchor targets now. Added
`.svc-acc__row[id] { scroll-margin-top: 96px }`. Re-measured: row top 171px,
nav bottom 69px.

## Left to do

**1. The services PDF does not exist.** Nothing on the page links to one yet,
so nothing is broken, but the ~700 words cut from the offers are its natural
contents and they are already written. Until it exists there is no route to the
detail for a reader who wants it.

**2. Dead CSS in `ServicesPage.css`.** These are now referenced by nothing and
should be deleted in a follow-up pass, not in the same change as the rebuild:

`.svc-eng` and all its children, `.svc-phases` / `.svc-phase`,
`.svc-proofcard`, `.svc-price`, `.svc-proof__*`, `.svc-index__row` /
`__nm` / `__one` / `__arr`, `.svc-band--flag`, `.svc-band--grey`,
`.svc-youget`. Roughly 300 lines. `.svc-credit`, `.svc-eng__act`,
`.svc-eng__cta`, `.svc-ctanote`, `.svc-txtlink`, the hero, How I work and the
finale are all still live.

**3. The SEO position is better than forecast but still worth watching.** The
v3 copy doc predicted about 450 words. The built page carries **661**, because
the closed panels stay in the HTML. That is above Energize at 249 and close to
Anastasia at 418. The long-term answer is unchanged: one page per offer, where
each gets its own title, meta and case study. Each row here is already the
index summary that structure would need.
