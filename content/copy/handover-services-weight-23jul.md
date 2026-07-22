# Handover: where /services got to, and what is still open

**Written:** 22 Jul 2026, end of session
**For:** a fresh chat picking up the page-by-page lightening work
**Repo:** `/Users/laura/AI Projects/laura-cordrey-site`, branch `main`
**State:** clean, **five commits ahead of `origin/main`, nothing pushed**

Read `handover-shorten-pages-without-breaking-seo.md` first if you have not.
Its SEO constraints are all still live. This file is what happened next.

---

## The five unpushed commits

| | |
|---|---|
| `1ac0f8a` | copy: lighten /services, /about and /fan-engine |
| `2f4f656` | fan-led growth: copy and design pass, and let the homepage close shout |
| `5718f3b` | design: settle two unwritten rules, and resync the FAQ schema |
| `ed9687d` | services: copy pass, and rescue the mark on the oxblood close |
| `4381bab` | services: the lighter rebuild this page never had |

**Nothing is deployed.** Netlify auto-build is off, so pushing is free, but
Laura decides when. Ask before pushing.

## Word counts and heights, measured

| Page | Words before | Words now | Height now |
|---|---|---|---|
| `/services` | 1,273 | **984** | 7,899px desktop |
| `/about` | 778 | 714 | |
| `/fan-engine` | 700 | 615 | |
| `/fan-led-growth` | 744 | 720 | 4,967px |

Benchmarks measured live on 22 Jul: **3,473px** and **3,722px** (see
`benchmark-services-page-22jul.md`).

## Rules settled this session

These are decided, applied site-wide, and should not be relitigated without a
reason. Two of them belong in `CLAUDE.md`; see
`design-rules-arrows-and-close-bands.md` for the wording.

1. **Arrows mark links, not buttons.** Standalone text links get a trailing
   arrow, inline links get none, buttons get none. 27 arrows removed from
   buttons across 9 files. Directional arrows that carry meaning (back, in-page
   jump, external) are exempt.
2. **Editorial pages close on oxblood `#A12A1E`.** All seven now do.
   `/fan-led-growth` was the exception and is not any more.
3. **One CTA in the hero.** Every page now has exactly one.
4. **`GRID_CAP_LEFT`** in `src/lib/scale.js` for left-aligned editorial pages;
   plain `GRID_CAP` stays centred for the homepage.
5. **An `ox` tone on `Eyebrow`** (`#F2D79A`) for the oxblood ground.

## What is still open on /services

The page is 7,899px against benchmarks near 3,600. **It is long because each
offer stacks seven or eight objects, five times over**, not because of
typography, which is now identical to the rebuilt pages.

Full option set with costs and estimated heights:
**`content/copy/services-weight-options.md`**. Laura's position at the close of
the session:

- **Agreed:** the cheap fixes, and moving off-topic bands off the page
- **Worried about:** a full accordion, because it makes comparison harder
- **Wants:** the colours flattened, they are heavy on the eyes
- **Asked about:** removing the index menu if nothing opens

### The three things queued next

1. **Flatten the colours.** The page cycles five grounds ten times. Go to one
   light ground plus the oxblood close, with hairline rules between offers
   (the same separator the index rows already use). This was Laura's idea and
   it is a good one.
2. **Cut the Payoff lines, keep the index.** Three of five index one-liners are
   near-verbatim the section's Payoff ("Deepen. Your top customers spend more
   and stay longer." / "your top customers spend more and stay longer."). That
   is the redundancy Laura is sensing. **Do not remove the index**: it is the
   only place all six offers are visible at once, so it is the comparison layer
   she is trying to protect.
3. **Summary visible, detail collapsible.** The middle option between the
   current page and a full accordion: kicker, title, "Need it when" and the
   proof number stay permanent, so comparison and scrolling work as they do
   now; "What you get", duration and CTA collapse behind one toggle. Lands
   around 5,000px. Build at `/services-v2` on the `/home-v2` precedent.

**If any disclosure pattern is built, four rules are non-negotiable:**

- **CSS-hide panels, never unmount them.** The build prerenders every route. A
  `{open && <Panel/>}` would delete ~700 words from the HTML a crawler sees.
- **Hash deep links must open their panel.** `/ai` links to
  `/services#sentiment-sos` and `#fan-moments`.
- **The flagship opens by default**, or the page reads as thin.
- **More than one open at once**, or comparison is impossible.

## Two things that were tried and did not work

Recorded so nobody spends the time twice.

- **Column ratio 5fr/7fr → 4fr/8fr.** Right column 646 → 738px, offer blocks
  shorter by **zero pixels**. The copy carries `max-width: 38rem`, a 608px
  readability cap, so the column was already wider than the text was allowed to
  be. Kept only because it helps between ~1000 and 1150px.
- **Moving the Fan Engine's four phase cards to `/fan-engine`.** Withdrawn on
  Laura's challenge, and she was right: the flagship is the most considered
  purchase on the page, and sending someone off-page for its deliverables while
  four cheaper offers state theirs inline makes the most important offer the
  worst explained.

## Mistakes made this session, and what they cost

Worth reading before trusting a claim in these docs without re-measuring.

1. **The FAQ schema drifted.** The copy edits on `/fan-led-growth` left five of
   six answers in `seo.js` quoting the old page copy. Caught and fixed in
   `5718f3b`. **If you edit `/fan-led-growth` or `/faq` copy, re-verify the
   schema against the built HTML in the same pass.**
2. **The oxblood close hid its own headline.** Changing that band's ground
   turned the red `<mark>` on "renting" into red-on-red at **1.4:1**. The
   buttons were checked for exactly this and the mark was not. Laura spotted it.
3. **The Brusson quote was not on `/about`.** It was claimed as duplicated when
   removing the `/services` proof band; it was on the homepage only. Caught by
   grepping the built HTML, and the quote was restored.
4. **A `~20%` height saving was predicted for the type fix. It delivered 6%.**
   The offer blocks are a grid with a sticky left column, so their height comes
   from the right column, not the titles.

The pattern: **the claims that failed were the ones asserted without
measuring.** Every finding in these docs that came from a measurement held up.
Measure in the browser, then write it down.

## How to verify anything

```bash
npm run build
```

Must report **19/19 routes snapshotted**. Then, from `dist/`:

```bash
for f in dist/index.html dist/services/index.html dist/fan-engine/index.html dist/faq/index.html; do echo "$f $(grep -o 'href="/fan-led-growth"' $f | wc -l)"; done
```

Each must return **2**. Note the original handover gives `grep -c`, which
counts matching *lines*; the built HTML is one line, so it returns 1 whether the
body link is there or not.

For live measurement, `preview_start` then run computed-style scripts in the
page. The dev server lands on **port 5175** when other sessions hold 5173/5174.

## Files written this session

| File | What it is |
|---|---|
| `copy-reduction-inner-pages-v1.md` | the four-page copy cut, with before/after |
| `review-fan-led-growth-copy-v1.md` | Why fans copy review |
| `review-fan-led-growth-design-v1.md` | Why fans design critique, measured |
| `design-rules-arrows-and-close-bands.md` | the two rules, with the site audit |
| `review-services-copy-v1.md` | Services copy review, all applied |
| `review-services-design-v1.md` | Services design critique, measured |
| `benchmark-services-page-22jul.md` | two live competitor measurements |
| `services-cards-on-light-proposal.md` | cards + light, then the accordion |
| **`services-weight-options.md`** | **the decision doc: eight options, costed** |
