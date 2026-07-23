# Applied: tool entry copy (v2)

**Date:** 23 July 2026
**Status:** Shipped to the repo, not deployed.
**Supersedes:** `copy-tools-entry-v1-proposal.md`, which stays as the record of
the options considered. This file records what was actually applied and the one
place it departs from what Laura picked, and why.
**Diagnosis behind it:** `review-tools-entry-copy-23jul.md`.

---

## What Laura chose

Option B, plus my recommendations on the rest: Fan Score description B, title T1,
Fan Value Model description B.

## Where this departs from Option B, and why

Option B's H1 was **"How many of your customers would recommend you?"**

The v1 proposal flagged one check before applying it: that the quiz measures more
than advocacy. **The check failed.** The live quiz is 10 questions across four
dimensions (`FanAuditPage.jsx:21-72`):

| Dimension | Questions | What they ask about |
|---|---|---|
| Brand | 2 | whether positioning sets the roadmap; brand equity vs visual identity |
| Product | 2 | first "wow" moment; why users return |
| Community | 2 | top cohort and advocacy; how feedback is gathered and used |
| Growth | 3 | what happens if paid stops; unprompted promotion; referral programme |
| Gate | 1 | can you put a number on any of it |

Only two of the ten are about recommendation. The first three ask about roadmap
ownership, brand equity and onboarding. So Option B as written would have
promised one dimension and then immediately asked about three others, which is a
worse mismatch than the problem it was fixing.

What made Option B right was the *shape*: a question the reader has an instinct
about but no number for. That survives with a wider noun.

## What shipped

### Fan Score intro screen (`FanAuditPage.jsx:209-232`)

| Slot | Before | After |
|---|---|---|
| H1 | How fan-led is your growth? | **Are your customers fans, or just customers?** |
| Lede | Paid growth stops the moment you stop paying. Fan-led growth keeps going. | **Fans stay, spend more, and bring you new customers. This looks at what turns one into the other: your brand, your product, your community, and where your growth actually comes from.** |
| Get-line | unchanged | A few honest questions. Two minutes to your result and the one move to grow it. |
| CTA | unchanged | Get my Fan Score™ |

The lede now previews the four dimensions by name, so the H1 structurally cannot
promise narrower than the tool delivers. That closes the mismatch rather than
working around it.

### Meta

| | Before | After | Count |
|---|---|---|---|
| FS title | The Fan Score™ · How fan-led is your growth? · Laura Cordrey (60, at the cap) | The Fan Score™ · Are your customers fans? · Laura Cordrey | 57/60 |
| FS desc | A short diagnostic that tells you how fan-led your growth is today... | Find out how many of your customers would stay, spend more and recommend you, and the one move that would grow the number. Two minutes. | 135/160 |
| FVM desc | A quick estimate of what fan-led growth is worth to your brand each year... | A conservative estimate of what your customers are worth once they become fans, built from published benchmarks. It shows its work. | 131/160 |

The Fan Value Model title already read "What your fans are worth" and needed no
change. Counted in a script, not estimated.

### One design fix that came with it

The longer H1 stranded "customers?" alone on line two. `.fa-h1` never had
`text-wrap: balance`, though `shared.css` and eight other pages already use it.
Added (`FanAuditPage.css:75`). It fixes the strand at every width, including
mobile, and holds if the copy or the type scale moves again.

---

## Verified

- Desktop and mobile (375px): H1 balances to two and three lines respectively,
  no stranded word at either.
- Title, description, H1 and the cross-link now all describe each tool the same
  way. Both meta strings counted under the caps.
- No console errors. `vite build` passes.

## Known trade, accepted

The new lede runs five lines on a 375px screen where the old one ran two. That is
the cost of naming the four dimensions, and it buys the honesty that makes the
H1 safe. If it ever needs shortening, cut the dimension list before cutting
"Fans stay, spend more, and bring you new customers", which is the line carrying
the homepage promise.

## Still open

- **"Paid growth stops the moment you stop paying. Fan-led growth keeps going."**
  is not lost, it is out of the intro. It is a good line in the wrong slot. The
  result screen is where it belongs, once the reader has a number and is deciding
  what to do about it. Not done.
- The deeper audience language ("your product", "real users", "your userbase")
  is untouched, per tranche 3 of the plan. See `review-tools-entry-copy-23jul.md`
  finding 2.4.
- "Fan Value" vs "Fan Value Model™" as a short label site-wide.

## Claims

No new factual or performance claims. Nothing here needs confirmation before it
goes live.
