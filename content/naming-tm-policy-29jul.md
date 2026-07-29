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

## The one call worth revisiting

On `/fan-engine`, two things wanted the mark: the H1 (`The Fan Engine™.`) and
the `FAN ENGINE™` label at the centre of the schematic diagram. Only one can
have it. **The H1 kept it** on the grounds that it is the page's definitive
statement; the diagram label went plain.

The argument the other way is real: the schematic label is the name rendered as
an object rather than as prose, which is the same class of thing as the
`/services` flagship card title and the OG image, both of which kept theirs. If
Laura prefers the diagram to carry it, it is a one-line swap in
`MethodologyPage.jsx` (the H1 at ~156, the `<text>` label at ~210) plus no
change to the baseline count.

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
