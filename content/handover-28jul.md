# Handover — end of 28 July 2026

Everything below is **shipped and verified on production**. Working tree clean,
nothing unpushed. `origin/main` @ `3f5c35a`.

Netlify auto-build is **ON**, so a push is a deploy and spends credits. Confirm
before pushing.

---

## What changed today

| Area | State |
|---|---|
| Favicon | Real `.ico` shipped. Google's search-result icon was OVH's because `/favicon.ico` returned HTML; fixed and live. The SERP icon updates on Google's schedule, days to weeks. |
| 404 | The site had none — every dead URL returned 200. Now a designed page with a real 404 status. |
| Sitemap | All 19 URLs returned 301; now all 200. Prerender writes `dist/<route>.html`, not `<route>/index.html`. |
| Forms | Capture verified end to end across all 5 entry points. `subject` (not `_subject`) now drives notification subject lines. |
| Copy | Fan Engine™ protected site-wide; "growth engine" for the generic metaphor. Full inventory generated. |
| Calculator | Advocacy field now counts, inputs clamped, retention ceiling explains itself, every slider echoes its figure. |
| Checkouts | Three on disk reduced to one. |

## Three commands worth knowing

```bash
npm run csp:check        # anything third-party added? run this or it's silently blocked
npm run calc:check       # every calculator control moves the number, or says why not
npm run copy:inventory   # regenerate content/copy-inventory-tools.md from source
```

All three fail loudly and have been proven to fail, not just to pass.

## Open, in priority order

1. **The outreach links — not started.** `?from=` so a lead carries which
   campaign produced it, and `?edition=pre-launch` so a founder can be dropped
   straight into their version of the Fan Score. Blocked on one answer from
   Laura: what volume of outreach, and to whom. A handful of hand-written
   emails needs only the links; a list of several hundred wants a campaign
   scheme. Detail in `content/fan-score-outreach-and-tracking-28jul.md`.
2. **Netlify Analytics** — Laura's toggle, not something I can do. Agreed as
   the right choice (no script, no CSP change, no cookie banner). Worth turning
   on *before* any outreach push so there's a baseline to compare against.
3. **Laura to sanity-check the calculator** with her own numbers, specifically
   entering a value in "Growth from referrals & word of mouth". That path
   changed materially today — the estimate is now *larger* for anyone who fills
   it in, roughly double at 50%. The maths is derived and tested; the judgement
   call is whether the resulting figure is one she'd want quoted back at her.
4. **Small chores:** delete the test form submission in Netlify (labelled "Test
   submission (Claude Code)"), empty the Trash for 1.9 GB from the old
   checkouts, and let the Search Console validation resolve on its own — if it
   reports failed, check whether it's only the `www`/`http` variants, which is
   correct and permanent.

## Two decisions taken, so they don't get reopened

- **Growth carries 3 of the 9 scored Fan Score questions** where the others have
  2. Reviewed against equal weighting and deliberately kept — the one profile
  that changes tier gets a *worse* answer under equal weighting. Recorded above
  `scoreLive`.
- **"Growth engine" for the metaphor, "the Fan Engine™" for Laura's system.**
  The rule is who the sentence is about. `CLAUDE.md` has it, and its drift grep
  is now case-insensitive — the old one was case-sensitive and returned clean
  while nine lowercase usages sat in the tools.

## Where the detail lives

- `content/plan-fan-value-calculator-28jul.md` — the calculator work, including
  the per-customer derivation of the advocacy formula.
- `content/copy-audit-tools-28jul.md` — full copy audit and the cross-tool
  findings.
- `content/copy-inventory-tools.md` — every string in the Fan Score with the
  condition that triggers it. Generated; don't edit by hand.
- `content/search-console-audit-28jul.md` — the coverage export, the redirect
  fix and the 404.
- `content/forms-capture-audit-28jul.md` — how the 5 entry points map to 2
  Netlify forms.
