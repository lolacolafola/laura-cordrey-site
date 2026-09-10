# Website review fixes, batch 1 — 10 Sep 2026

Actioned from the external review of lauracordrey.com (v1, Sep 2026) and the
accompanying handover. Supersedes nothing; it is the first batch off that review.

**Status: built, checked, committed locally. NOT pushed and NOT deployed.**
One fact is still missing, the SIREN (see Task 1), and `npm run privacy:check`
fails until it is filled in, by design.

---

## Pre-flight findings

The handover warned the local checkout had previously been 100+ commits behind.
It was not: `git fetch origin` put local level with `origin/main`, 0 ahead and 0
behind. No stale-checkout problem this time.

What it did find was a **stale working tree**. Eight files were modified and two
untracked, all dated 19–20 Aug, sitting uncommitted through several September
commits. Two unrelated workstreams were tangled together in it:

1. The privacy page (Tasks 1 and part of 2) — largely written, never committed.
2. A Services cards redesign — 391 lines of CSS and 202 of JSX, plus seven
   draft copy files in `content/copy/`.

Only the first belongs to this batch. The Services and HomePage changes were
backed up and reverted before the deploy artifact was built, so `dist/` contains
this batch and nothing else. **Those changes are still uncommitted in the working
tree and still need attention** — they were not shipped, and not lost.

Verified against the live site, not just the repo: `/privacy` returned 404, the
header carried four items, the footer eleven. All three matched the reviewer.

---

## Task 1 · Privacy policy — BUILT, BLOCKED ON THREE FACTS

`/privacy` exists, is routed, is linked from the footer and from directly under
the contact form's submit button, and is in the sitemap and prerender.

**Resolved:** jurisdiction. The handover states Laura is French-resident and the
site footer already says "Paris", so the supervisory authority is the CNIL. That
placeholder is gone.

The August draft carried these as literal `[TO CONFIRM: …]` strings *in the
rendered copy* — one careless deploy from a stranger reading them as Laura's
actual privacy notice. They are now named constants at the top of
`src/pages/PrivacyPage.jsx`:

| Constant | Status |
|---|---|
| `RETENTION` | **Answered 10 Sep:** two years from our last contact |
| `EXPORT_TOOL` | **Answered 10 Sep:** `false`. Nothing leaves Netlify, so the notice names only Netlify, Google Fonts and YouTube |
| `SIREN` | **Still outstanding.** The micro-entreprise registration number |

None can be derived from the codebase, so none were guessed. `EXPORT_TOOL` in
particular was invisible to `csp:check`, because such an export happens inside
Netlify rather than in the browser, so it could only be answered by Laura.

Two guards were added so this cannot ship half-finished:

- A dev-only banner on the page listing what is missing.
- `npm run privacy:check`, which **fails the build** while any constant is null
  *and* the page is reachable. It currently fails, correctly.

### One factual correction

The August draft said, of the YouTube embeds: *"Nothing loads from YouTube until
you click play."* **That was false.** `CaseStudyCinematic.jsx` renders a plain
`<iframe src="youtube.com/embed/…">` with `loading="lazy"` — no click-to-load
facade. The embed fires when the video nears the viewport, and YouTube can set
cookies at that moment, whether or not anyone presses play. The embeds also use
`youtube.com`, not `youtube-nocookie.com`. Corrected in both the "Who else can
see it" and "Cookies" sections.

If the original sentence is the one Laura wants to be able to make, the fix is a
click-to-load facade in `CaseStudyCinematic.jsx` — not a change to the wording.

**Not in scope, and worth not forgetting:** no cookie consent banner was added.
There is no analytics on the site, so consent is not yet required. It becomes
required the moment analytics is switched on.

**Also flagged, separate obligation:** a French sole trader is generally expected
to publish *mentions légales* (name, address, contact, SIREN, and the host's
name and address). That is a different requirement from this privacy notice and
this page does not satisfy it.

---

## Task 2 · Header and footer alignment — DONE

The header now carries five slots and one CTA, two of them grouped panels:

| Slot | Contents |
|---|---|
| Why fans | `/fan-led-growth` |
| The Fan Engine ▾ | The method, Fan Score, Fan Value |
| Work | `/work` |
| Services ▾ | Advisory, Speaking, AI |
| About ▾ | About Laura, FAQ |

Order is the journey, not the page count: problem, method, proof, offer, person.
Every substantive footer destination is now reachable from the header. Home is
the logo, Contact is the CTA, Privacy stays footer-only as a utility route.

Notes on the build:

- A group's trigger is a `<button>`, not a link, per the hover-honesty rule. So
  each group **repeats its own landing page as the first panel item** — "The
  method" is `/fan-engine`, "Advisory" is `/services`, "About Laura" is
  `/about` — and no destination is lost by making the parent a control.
- The trigger **opens but never closes**. A toggle fought the hover: on a mouse,
  `mouseenter` had already opened the panel by the time the click landed, so the
  toggle read it as open and shut it again, and the click looked broken. Closing
  is by mouseleave, Escape, outside click, tabbing out, or choosing an item.
- Keyboard: focus opens, Escape closes and returns focus to the trigger, tabbing
  out closes. Panels use `hidden`, so a closed one is out of the tab order.
- Panel sub-labels are `#B8AEA2` on `#15110F`, measured at **8.59** against the
  4.5 that size needs.

### Two bugs found and fixed while checking

- **Tablet wrap:** no wrap. The row needs ~885px against a 1024px breakpoint,
  and at 1025px all five items sit on one line with no horizontal overflow. It
  is roomier than the nav it replaced.
- **Short-phone drawer:** the drawer grew to ~700px with the groups added, and
  body scroll is locked while it is open, so on a 667px-tall handset the "Get in
  touch" CTA was cut off with no way to reach it. Fixed with
  `max-height: calc(100dvh - 64px)` and `overflow-y: auto`; verified reachable at
  375×667.

---

## Task 3 · Method attribution — DONE, with one deliberate omission

Reason for the task: an unrelated **FanEngine Holdings Ltd** operates in sports
and entertainment IP, so the method's name alone no longer identifies it in a
SERP or an AI answer.

- **`/fan-engine` hero:** a byline, "A method by Laura Cordrey", under the H1.
  A separate line rather than words inside the heading — "The Fan Engine, by
  Laura Cordrey." as a single H1 reads as a book cover. Not a second ™; the mark
  above is the page's one allowance.
- **`/fan-engine` meta description:** now "…The Fan Engine™, by Laura Cordrey,
  turns customers into fans and proves what they're worth." 149 characters,
  inside the 160 ceiling. Keeps the existing opening hook.
- **JSON-LD:** the `HowTo` node already carries `author: Laura Cordrey`, and the
  `DefinedTerm` description already says "Built by Laura Cordrey". Left as is.

**Not changed: the homepage. Confirmed by Laura, 10 Sep.** The handover asked
for the method's first mention there. The homepage's most prominent mention is the gold flagship
offer card, whose kicker is already "The method I built", and `HomePage.jsx`
carries a long comment recording that **three separate drafts added a sentence
saying what the kicker already said, and all three were reverted at Laura's
instruction**. Adding "by Laura Cordrey" beside it would be the fourth. The page
already asserts authorship three ways in prose, and the disambiguation job is
done by /fan-engine's byline and meta description, which is what search and
answer engines actually read for the canonical name.

™ usage unchanged. `npm run tm:check` passes.

---

## Task 4 · /fan-value referral input — THE PREMISE IS WRONG, DO NOT ACT ON IT

The handover asked for a decision between (a) removing the input and (b) wiring
it in, on the grounds that "the formula never consumes a user-supplied referral
rate". **It does.** No change was made and none is needed.

`FanValueModelPage.jsx:233`:

```js
const saved = bring0N >= 100 ? acqN : acqN * (bringLift / (100 - bring0N))
```

Landed 29 Jul 2026 in commit `3f5c35a`, titled *"fan value: make every control
do something, or say why it can't"*. Committed, clean, and deployed.

**Tested on the live site**, not inferred: with defaults, typing 40 into the
referral field moved the headline from **$562K/yr to $637K/yr**.

The repo also already has an automated test for it. `npm run calc:check` reports
"existing advocacy 25% → 4 controls, all live" and the same at 75%.

The derivation is in `content/plan-fan-value-calculator-28jul.md`, from first
principles with a truth table. Note the direction: a brand already at 40%
referral gets a **larger** Bring figure, not a smaller one, because the
acquisition spend it saves is spread over a smaller paid base. That is the
opposite of what option (b) in the handover describes, so implementing (b) would
have replaced a derived formula with a wrong one.

The "Fan Value Model - Defensibility Spec.md" the handover cites **is not in this
repo**. If it describes the Bring lever as "referral saving (14%) × acquisition
spend", it is describing the pre-29-July formula and is out of date — that older
version is the special case of the current one where `bring0 = 0`.

### What the reviewer actually hit

There is a real defect here, just not the one reported. `saved` scales with
acquisition spend, so **if the acquisition spend field is empty or zero, the
referral input does nothing at all.** Confirmed live: with acquisition spend
cleared, the headline sits at $450K at 0%, 40% and 80% referrals.

The maths is right — save nothing on a budget you do not have — but the control
sits there accepting input and silently changing no number, which is exactly what
the 29 Jul commit set out to stop. There is already a pattern for this in the
same file: `stayCapped`, described in its own comment as being there "so the UI
can explain itself instead of sitting inert".

**Done, and it was neither (a) nor (b).** Laura's call, 10 Sep: mirror
`stayCapped`. A new `bringInert` flag (true when acquisition spend is zero or
blank) shows a short note under the advocacy field: *"Add an acquisition spend
above for this to change anything: advocacy works by saving you a share of that
budget."*

It touches no arithmetic, so the Defensibility Spec, the footnotes and the
objection-handling script all stay valid as written.

Verified at 1280px and 375px, with the headline checked at each step to confirm
the maths did not move:

| State | Headline | Note |
|---|---|---|
| Defaults | $562K/yr | hidden |
| Referrals 40% | $637K/yr | hidden |
| Acquisition spend cleared | $450K/yr | **shown** |
| Acquisition spend restored | $637K/yr | hidden |

On mobile the note takes the same 188px column as the existing sub-label on that
row, so it inherits the page's current narrow-label behaviour rather than
introducing a new one. `calc:check` still passes.

---

## Task 5 · Mentions légales — ADDED, blocked on the address

Not in the original review. Found while writing the privacy notice: France's
LCEN requires a professional website to identify its publisher (name, address,
contact, SIREN, publication director, and the host's details). That is a
**separate obligation** from the GDPR privacy notice, and the site had neither.

`/legal` now exists, routed, footer-linked, in the sitemap and prerendered.

**Is it worth doing?** Laura asked whether other consultants actually bother. In
France "Mentions légales" in the footer is close to a universal convention on
business sites, in a way it is not in the UK or US. Enforcement against a
one-person consultancy is essentially theoretical. The stronger argument is the
audience: consumer brands with procurement and legal functions, who notice.

**The address question, and the honest answer.** Laura's registration data is
already public — that is what pappers.fr is, a republisher of the public RNE
registry. Withholding the address from her own site therefore buys close to
nothing in privacy terms, while leaving the page non-compliant. That combination
is the worst of the available positions.

If the exposure genuinely matters, the fix is to change **what is registered**,
not what is on the site: a domiciliation address updates the registry entry, so
Pappers and the site are fixed together. Worth checking separately whether an
individual entrepreneur can have a personal address withheld from public
diffusion at the RNE — flagged, not verified, and not legal advice.

**Still outstanding for `/legal`,** all in `src/data/legalIdentity.js`:
`ADDRESS`, `PHONE` (`false` is a valid, deliberate "not published"), and `VAT`
(`false` renders the standard *TVA non applicable, art. 293 B* line).

**`SIREN` is filled in** — 934 824 525, from Laura's own Pappers URL — so
**`/privacy` is complete and passes its guard.** Worth one eyeball on the
grouped digits, since it is the one digit-for-digit fact on two legal pages.

Host address was read off Netlify's own Terms of Use, section 14, rather than
copied from another site's notice: four different Netlify addresses are in
circulation because the company has moved and people copied whichever was
current when they wrote theirs.

### Two traps caught while building it

- `useDocumentMeta` has **no `noindex` option**. Passing one would have been
  silently dropped, leaving a comment claiming a behaviour the site does not
  have.
- `scripts/prerender.mjs` takes its routes from `dist/sitemap.xml`, and
  `_redirects` ends in a strict `/* → /404.html 404`. **A route missing from the
  sitemap gets no file and 404s.** `/legal` is in the sitemap for that reason,
  not for SEO.

### Shipping /privacy without /legal

`privacy:check` keys off what each page actually asserts *and* whether it is
reachable. Unlinking `/legal` from the footer is therefore enough to ship this
batch today with `/privacy` complete, and let `/legal` follow when the address
is settled. No other change needed.

---

## Checks run

| Check | Result |
|---|---|
| `npm run build` | 21/21 routes prerendered |
| `npm run lint` | clean |
| `npm run tm:check` | pass |
| `npm run calc:check` | pass |
| `npm run csp:check` | no violations, both Fan Score downloads clicked |
| name-drift grep (case-insensitive) | only pre-existing comments and uppercase display labels |
| `npm run privacy:check` | `/privacy` **passes**; `/legal` fails on address, phone, VAT |

No third-party origin was added, so `public/_headers` is untouched.

---

## To ship

1. Either supply `ADDRESS`, `PHONE` and `VAT` in `src/data/legalIdentity.js`,
   or unlink `/legal` from the footer and ship `/privacy` now. `/privacy` is
   complete either way.
2. `npm run build && npm run privacy:check && npm run csp:check`
3. `netlify deploy --dir=dist` — one batch, not task by task.

The Services WIP is no longer a trap: it was parked on `services-redesign-wip`
on 10 Sep and `main` is clean, so a build no longer sweeps it into a deploy.
Rebase that branch onto main before picking it up — main has since gained the
grouped nav, which touches Layout, and /services is now "Advisory" inside the
Services group.

Nothing else is waiting on a decision. Retention, the CRM question, the Task 4
approach and the homepage call were all answered on 10 Sep.

Held for the ICP call, untouched here: ICP statement, hero line and problem-first
order, Speaking page purpose, pricing placement.
