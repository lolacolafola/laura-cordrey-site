# The ™ policy: one hero mark

29 July 2026. Supersedes the "it always carries the ™" rule that had stood since
22 July. Laura's call, in her words:

> Keep Fan Engine™. One hero mark. Drop the symbol from Fan Value and Fan Score
> — they're tool names, let them just be tools. Use the symbol on first
> prominent use per page, not every mention. Repeating it in every paragraph is
> the thing that tips a site into looking anxious.

---

## The rule now

| | Before | After |
|---|---|---|
| Fan Engine | ™ on every mention | ™ on the **first prominent use per page**, plain after |
| Fan Score | ™ on every mention | **no ™, anywhere** |
| Fan Value / Fan Value Model | ™ on every mention | **no ™, anywhere** |
| Never "the Engine" | absolute | **unchanged, still absolute** |

The *names* are still canonical and still never abbreviated or improvised. Only
the symbol moved.

## One factual note, recorded so it isn't rediscovered later

™ is the **unregistered**-mark notation. Dropping it from Fan Score and Fan
Value forfeits nothing — there is no registration to weaken. It stops asserting
a claim, which is a different thing. If either name is ever put forward for
registration, the symbol would want to come back on that name first.

This also means the standing rule holds: **never write that the Fan Engine is
trademarked, registered or protected.** The claim to make is authorship — Laura
built the method — which is true, and is the stronger claim anyway.

## Three carve-outs, and why

These are the places where "first prominent use per page" needed a decision
rather than a lookup. Recorded so they don't get tidied away by someone reading
only the headline rule.

**1. No mark in the chrome.** The nav and footer render on all 19 pages. A mark
there consumes the one-per-page allowance before the hero can ever use it —
the exact inverse of the intent. `Layout.jsx` labels are now plain strings.

**2. Meta, JSON-LD and `llms.txt` keep it on the Fan Engine.** One instance per
page, never seen by a reader, and it is the canonical-name signal that search
and AI answer engines read. It cannot make the site look anxious to a human
because no human sees it.

**3. Surfaces that travel keep their own mark**, because they arrive somewhere
else with no surrounding context to identify them:
- the downloadable Fan Score card footer (`fa-cfoot`, both editions)
- the OG image (`scripts/og-image.html`)

A page's on-screen signature is *not* one of these. Those went plain.

## Correction, same day: it is "first OR MOST PROMINENT", not strictly first

Laura spotted the gold **01 · The Fan Engine · THE METHOD I BUILT** card on the
homepage reading plain, and was right. The rule had been implemented as
*first in DOM order*, so the homepage's one mark went to the about-band lede
(`HomePage.jsx`, "a method of my own: the Fan Engine") and the flagship card
below it was stripped.

That was a misreading. The actual convention is **first *or most prominent***
use, and the gold card is the most prominent mention on that page by a
distance. Fixed: the card carries the mark, the lede below it went plain, the
page still holds exactly one.

Implementation note: the mark is a `tm: true` flag on the offer, not a ™
character inside the title string, so it renders as the styled `.tm`
superscript instead of a full-size ™ sitting heavy beside a display title.
Same pattern as the `/services` flagship card.

**`/fan-engine` needed no change** under the corrected reading — its H1 is both
the first and the most prominent mention, and already had the mark. The
schematic diagram's centre label stays plain.

## What the research actually said

Checked properly on 29 Jul rather than asserted, because the question came up
of whether other people mark more heavily.

**The guidance.** [INTA](https://www.inta.org/fact-sheets/trademark-symbols/),
the trademark industry body: the symbol "need only appear with the first or
most prominent mention of a mark." IP firm
[Sterne Kessler](https://www.sternekessler.com/news-insights/insights/tm-marks-spot-best-practices-trademark-symbols-and-marking/)
is more specific: mark "the first and most prominent use — for example, the
first use in a website page header."

**What comparable consultancies do**, all of them built on a named proprietary
method, which is the closest reference class to this site:

| Site | Master brand | Sub-methods | Footer TM line |
|---|---|---|---|
| [StoryBrand](https://www.storybrand.com/) | no symbol anywhere | none marked | none |
| [EOS Worldwide](https://www.eosworldwide.com/) | "EOS" unmarked, dozens of times | Level 10 Meeting, Rocks, Accountability Chart all unmarked | none |
| [Scaling Up](https://scalingup.com/) | unmarked | `4 DECISIONS™`, `PEOPLE, STRATEGY, EXECUTION, CASH™`, once each | none |

So this site, before 29 Jul, was marked **more heavily than any of the three**.
The change moved it from an outlier to a conventional position.

**Two things that were wrong in the first recommendation and are corrected
here**, so the wrong version doesn't get picked up later:

- A footer trademark attribution line ("Fan Engine is a trademark of Laura
  Cordrey") was first recommended on the basis that "it's what companies do".
  That is true of Microsoft and Adobe and **not** true of the reference class
  above — none of the three has one. **Decided: no footer line.** The footer
  keeps its copyright row only.
- No ™ on the nav or footer link either. Same reason, plus the per-page point.

## What the ™ does and does not do

Recorded because the underlying goal is "show this is my IP, my work, my
methodology", and the symbol is a poor instrument for it.

™ means only: *I am using this word as a brand name.* No application, no
approval, anyone can type it. It claims the **name** as a source identifier. It
does **not** protect the methodology, the ideas, or authorship, and it does not
say "I invented this".

What actually carries that message, all of which the site already does:

1. **Saying it in words** — the card kicker "The method I built", "a method of
   my own", "I built what I learned into the Fan Engine, my framework for
   fan-led growth", "The Fan Engine is the system I build to…".
2. **Provenance** — "shaped over thirteen years at Ubisoft, Amazon Games and
   BlaBlaCar". The least copyable claim on the site.
3. **Copyright**, already in the footer, which covers the expression: the five
   stages, the Fan Score questions, the diagrams.
4. **Registration**, the only route to ® and the only thing with real legal
   weight — particularly relevant since Laura is Paris-based and France has no
   common-law trademark rights, so an unregistered name is barely protected.

This is consistent with the note already sitting above the offer cards in
`HomePage.jsx`: never claim the mark is registered or protected; the claim to
make is **authorship**, which is true.

## What changed on disk

- **32 marks removed** from Fan Score and Fan Value, site-wide, every form
  (`<span className="tm">`, `&trade;`, literal `™`).
- **25 repeat marks removed** from the Fan Engine across 8 files.
- Nav and footer labels went from JSX fragments to plain strings.
- `CLAUDE.md` "Naming rules" rewritten; `public/llms.txt` naming note rewritten.
- One pre-existing violation fixed in passing: `src/lib/seo.js` JSON-LD read
  "built once, the engine keeps working" where the matching on-page copy says
  "the Fan Engine". That is the never-"the Engine" rule, which did not change.

### Two things the mechanical sweep missed, and how they were caught

Both are worth knowing because they will recur.

1. **`/about` wraps the name across two source lines** — `the Fan\nEngine™`. A
   line-based grep for `Fan Engine™` returns clean on it. It was caught only by
   grepping for orphan `className="tm"` spans. `tm:check` now counts across the
   whole file for this reason.
2. **`/services` builds its flagship title from parts** — `a: 'The Fan'`,
   `b: 'Engine'`, `tm: true` — so the mark is a boolean, not a character, and
   no text search finds it. `tm:check` counts `tm: true` as a mark.

## Enforcement

```bash
npm run tm:check
```

Two checks: zero marks on Fan Score and Fan Value, and a per-file ceiling on
Fan Engine marks. It fails on a count going **down** as well as up — losing the
hero mark entirely is drift too.

Proven to fail, not just to pass: re-adding a single `Fan Score™` to
`/services` was injected and the check exited 1 naming the file and line.

When a count changes on purpose, raise the baseline in `scripts/tm-check.mjs`
in the same commit and say why. That edit is the record.

The older name-drift grep is still needed alongside it, because `tm:check`
cannot see the *name* drifting:

```bash
grep -rni "the engine\|an engine\|your engine\|a fan engine" src/ | grep -v "Fan Engine"
```

## Verified

- `npm run lint` clean.
- `npm run build` — 20/20 routes prerendered.
- `npm run csp:check` — no violations; both Fan Score editions reached their
  result and both downloads clicked.
- `npm run calc:check` — every control accounted for.
- Every prerendered route in `dist/` inspected: **at most one ™ per page body,
  and every one attached to the Fan Engine.** The single exception is
  `/work/azarus-game-ads`, which carries `The Overlay Games™` — a client's mark,
  correctly left alone. Third-party marks sit outside this policy.
