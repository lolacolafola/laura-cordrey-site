# Fan Score and Fan Value: the build spec

**Date:** 26 July 2026
**Supersedes:** the 25 July consolidated plan, and the v2 of this document written earlier
today. Both were written without reading the code. This one is verified against
`origin/main` @ `4b3dc48` (23 July), read directly from GitHub.
**Brief:** make these two tools strong conversion tools.

---

## The verdict

The tools are already good. The build is not the problem.

They convert below what they are worth for four reasons. Three are subtraction: the best
material is hidden behind an accordion and an email wall, the most engaged visitor is the
last person to see the result, and three lines on the page promise things that do not
happen. The fourth is an omission: at the moment of highest intent, the only way to start a
conversation is a link to another page and a five-field branching form.

So the recommendation is not to build these into something else. It is to stop them
getting in their own way. About a day and a half of work, almost all of it deletion.

The strategic version, because it decides every judgement call below: **these convert by
being generous, not by being gated.** What is being sold is defensibility, and the tool is
the proof of it. Every gate is the site quietly arguing that the proof is worth less than
an email address.

**Generous is not the same as absent.** An earlier draft of this document removed every
email field on both tools, which threw out the contact path along with the gate. Those are
opposite things. Asking for an address to unlock something a visitor has already earned is
a toll. Offering a way to reply to what they have just been shown is the conversion event
itself. Item 11 puts the second one back.

---

## The three open decisions, now settled

**No newsletter checkbox.** Offering to sign someone up to a newsletter that does not exist
is the same untrue promise Pass 1 is deleting, with a tick-box next to it. When the
newsletter exists, adding an unticked, plainly worded opt-in to the result-page form is
about an hour's work. Not before.

**"userbase" stays.** It is site-wide vocabulary (homepage, Services, FAQ, AI page), and
`FanValueModelPage.jsx` L252 deliberately mirrors the homepage line at L233. Changing it on
the calculator alone creates an inconsistency rather than fixing one. If the word is ever
to go, it goes everywhere, as its own decision. The item is dropped.

**"The gap, in money" becomes "The opportunity, in money".** It keeps the rhythm and the
specificity of the original, flips the one deficit word, and does not collide with the
sub-headline directly above it, which already ends "Here's what it's worth."

**html2canvas gets bundled.** It currently loads from cdnjs at click time
(`FanAuditPage.jsx` L10, L170). Once the download is the only thing a visitor takes away,
it cannot depend on a third-party CDN being reachable, and corporate networks block them.
Add it as an npm dependency and lazy-import it, so the initial page load still does not pay
for it. There is no CSP on this site, so nothing else has to change.

---

## Pass 0 · Before touching anything

- **Work in the nested repo:** `laura-cordrey-site/laura-cordrey-site`. The outer copy in
  the same folder contains no tool pages at all and is a stale checkout.
- **`git checkout main && git pull`.** The working copy is on `website-rework` @ `884c6f6`,
  132 commits behind `main`, and fully contained in it. Nothing is lost by switching.
- Empty the `_cowork_to_delete/` folder.
- **Line numbers below are against `4b3dc48` and will drift as edits land.** The quoted
  strings are the source of truth. Search for the string, not the line.

---

## Read this before editing FanAuditPage.jsx

**There are two quiz editions in this file, not one.**

- **Live edition**, L20. Ten questions across Brand, Product, Community, Growth, plus a
  measurement question. Downloads `fan-score.png`.
- **Pre-launch edition**, L74. Five checks with Fuel as the gate. Downloads
  `fan-engine-readiness.png`.

Every Fan Score change below applies to **both** unless it says otherwise.

**The word "gate" means three different things in this file.** Getting these confused would
break the tool:

| Name | What it is | Touch it? |
|---|---|---|
| `GateScreen` (L~245) | The edition chooser, live vs pre-launch | **No** |
| `gate: true` on a question | The measurement question inside each quiz | **No** |
| `LiveEmailGate` (L394) | The email wall before the result | **Remove** |

---

## Pass 1 · Integrity

About an hour. None of it optional, because each item is the site saying something untrue.
Nothing here touches logic. Ship it on its own if you like.

1. **Fix the capitalisation** after "start with the earliest: {startPillar}." The lowercase
   word is at the front of the `LEAK_COPY` entries themselves, not at the join site
   (`FanAuditPage.jsx` L~451). Fix the entries.

2. **Remove both "Email me a copy" buttons** (L563 live, L875 pre-launch) and the
   `emailCopy` handler behind them. It opens the visitor's own mail client addressed to
   themselves. It is the only genuinely false control on either tool.

3. **Cut both newsletter promises.** There is no newsletter.
   - L429: "No spam. Your result, plus the occasional note on fan-led growth. Unsubscribe
     anytime."
   - L885: "Leave your email and I'll send this over, plus the occasional note on building
     0→1 for fans. No spam, unsubscribe anytime."

4. **Restore the focus outlines.** Both currently set `outline: 0` and rely on a colour
   change on a hairline border, which fails keyboard users.
   - `.fa-fld:focus`, `FanAuditPage.css` L758
   - `.fvm-input:focus`, `FanValueModelPage.css` L245
   Add a visible focus ring. Keep the colour change as well.

---

## Pass 2 · Unhide

Half a day. This is where the return is, and it is almost entirely deletion.

5. **Remove the email wall.** Delete `LiveEmailGate` (L394) and its use at L311. The
   `liveEmail` screen state goes, so `QuizReveal`'s `onDone` advances straight from the
   reveal to `liveResult`. Do the same for the pre-launch edition's email block around
   L875-890.

6. **Clean up what that orphans:** the `lead` and `err` state, `isEmail` (L~168),
   `submitEmail`, and the `postLead` call.

   **Leave `src/lib/forms.js` and the hidden `fan-score` form in `index.html` in place.**
   They cost nothing, they break nothing, and they mean capture can be restored in an hour
   if that decision ever changes.

7. **The download becomes a free, prominent action** on both result screens. Bundle
   html2canvas per the decision above. Keep the `dlError` state, and give it a visible
   message rather than failing silently.

8. **Surface the calculator sliders.** `FanValueModelPage.jsx` L490. Either default
   `assumOpen` to `true`, or lift the three sliders out of the accordion into their own
   visible band and leave the workings collapsible below them.
   - Relabel the toggle from "How I worked this out" to **"Try your own assumptions"**.
   - Keep the intro line verbatim: "Conservative defaults from published research. Drag if
     you know your own numbers."

   This is the single highest-value change in the document. A playable economic model is
   what separates this from a marketing quiz, and it is currently labelled like a footnote.

9. **"The gap, in money" becomes "The opportunity, in money"**
   (`FanValueModelPage.jsx` L377).

10. **Move the Fan Value cross-sell below the result** on the Fan Score page. Today the
    first high-contrast element is a red button sending people to the other tool, before
    they have seen their own headline.

11. **Put a contact form at the bottom of every result screen.** This is the item the
    earlier draft got wrong, and it matters more than anything else in Pass 3.

    Today the only contact path on either tool is `CONTACT_URL = '/contact?intent=consulting'`
    (`FanAuditPage.jsx` L9, used L535 and L843; `FanValueModelPage.jsx` L7, used L655). So a
    visitor who has just been handed a diagnosis has to leave the page, land on the
    intent-first branching form, pick an intent and fill five fields. That is a page hop at
    the exact moment of highest intent.

    **Reuse the homepage's short form** (`HomePage.jsx` L746-753). It already exists, it is
    styled, the honeypot is in it, and it posts to the registered `contact` form:
    - Fields: `name`, `email`, `message`, plus the `bot-field` honeypot.
    - **Keep the message field.** An earlier draft said to drop it as friction. That is
      wrong here. On a result screen the visitor has just been told something about their
      business and has something to say back, and the message is the difference between an
      address and an enquiry. Reword the placeholder from "What are you working on?" to
      something that follows the result, for example "Anything surprise you?".
    - Carry the reassurance line across: "I read every message myself and I'll come back to
      you within one working day."
    - Leave the `Link` to `/contact` in place as a secondary path for anyone who wants the
      full branching form.

    **Sending the form also downloads their card.** One click, two outcomes: the visitor
    gets their copy, Laura gets the enquiry, and nothing has to be emailed to anyone.

    - The download stays free and standalone as well (item 7). This is a reward for getting
      in touch, not the price of the card. Nothing is gated.
    - Put one line under the button saying what will happen, for example "Your card
      downloads when you send this." Never let the button do something it has not said.
    - **Order matters.** Kick off the card generation first, then post the form
      *regardless of whether the image succeeded*. Wrap the download in its own
      `try/catch` so an `html2canvas` failure can never swallow the enquiry. The message is
      the valuable half; the image is the courtesy.
    - **Disable the submit button while in flight.** Otherwise a double click sends two
      enquiries and downloads two files.
    - On success, replace the form with a confirmation that keeps the result visible on the
      page and reuses the existing wording pattern from `ContactPage.jsx` L148: the message
      is in, she reads every one herself, and she replies within one working day.
    - Announce the download in a `role="status"` region rather than letting a file appear
      silently.

    Note that `postLead` swallows network failures by design, so the confirmation shows even
    if the POST fails. That is a deliberate existing choice and worth keeping at this
    volume, but it means a lost enquiry is invisible. Do not "fix" it by blocking the
    visitor on a network call.

    **Optional, verify before relying on it:** Netlify Forms supports a file field, so the
    generated PNG could ride along with the notification and Laura would see the exact card
    the visitor saw. Confirm it works with a base64 image from `html2canvas` before building
    on it. This is a nice-to-have and must never delay or block the submit.

12. **Make tool enquiries distinguishable from homepage enquiries.** The `contact` form has
    no score field, and unregistered fields are silently dropped by Netlify, so without this
    a tool enquiry arrives looking exactly like any other message. That difference is the
    whole reason a tool lead is worth more.
    - Add `score` and `tool` to the hidden `contact` form in `index.html` (the registration
      block around L42). Two lines. No new form.
    - Submit `tool: 'fan-score' | 'fan-value'`, `score` (percentage and tier for Fan Score,
      the annual total for Fan Value), and set `_subject` to
      `[fan-score] {name} · {owned}% · {tier}` so it is obvious in the inbox, matching the
      pattern already used elsewhere in the codebase.
    - `postLead` is already fire-and-forget and never blocks the visitor. Leave that
      behaviour alone.

---

## Pass 3 · Make it feel alive

Half a day. The only additive work here.

13. **Halve the reveal.** `QuizReveal.jsx` currently holds for 1000 + 1000 + 1800ms, so
    3.8 seconds before anyone sees anything.
    - Holds become 500 / 500 / 900, so 1.9 seconds.
    - `FAILSAFE_MS` 5000 becomes 3000, to stay proportionate.
    - The skip button currently fades in at 1.4s (`QuizReveal.css` L115
      `qrSkipFadeIn 0.3s ease 1.4s`). Bring it to 0.5s, or it appears after the reveal is
      effectively over.

    The component is shared by both editions, so this is one change for both.
    `prefers-reduced-motion` is already handled correctly. Leave that alone.

14. **Animate the calculator's headline number.** `fvm-bignum__val`
    (`FanValueModelPage.jsx` L385) currently renders `derived.fmtK(derived.total)` as static
    text. There is already a `Counter` component in the codebase doing eased count-up with
    reduced-motion handling, and the calculator does not use it.
    - Count up on first render, so the first thing a visitor sees is the number moving.
    - Track **instantly** on every slider change afterwards. A count-up on every drag would
      make the sliders feel broken, and surfacing those sliders is the point of Pass 2.
    - **`Counter` is not a drop-in.** It renders `prefix + rounded integer + suffix` and
      cannot apply `fmtK`. Either add a `format` prop to `Counter` or write a small variant
      alongside it. Do not force the existing component and lose the K formatting.

15. **One primary action per screen.** Never two filled red buttons side by side. With the
    form from item 11 on the page, the order down each result screen is: the result, then
    the one primary action, then the form, then everything else.
    - **Fan Score result:** primary is "See what your fans are worth" in filled red, below
      the full result. The download and the `/contact` link are secondary.
      This is a deliberate exception to the site rule that "Let's talk" is the only primary.
      Note it in a code comment. A score is not yet a buying moment; a number in pounds is.
    - **Fan Value result:** the form is the primary action, so it goes directly under the
      result with no competing red button above it. The download and the `/contact` link
      are secondary.

16. **Give the Fan Score card a share action.** Specify it exactly, or it ships broken.
    - Where supported: `navigator.share`, guarded by `navigator.canShare({ files: [file] })`.
    - Everywhere else: download the image and copy the page URL, confirmed in one line
      ("Card saved. Link copied.").
    - Feature detect and fall back. Never render a control that silently does nothing, and
      do not hide the control either.
    - LinkedIn cannot accept an attached image through a share URL, only a link. If a
      LinkedIn option appears at all, it opens the composer with the page URL and the user
      attaches the saved image. Say so on the button, or leave it out.
    - **Card content leads with the tier and the strongest discipline.** Nobody posts their
      weakest area to a network that includes their employer. The opportunity and the
      starting point belong on the page and in the downloaded file.

---

## Do not change

- Scoring logic, thresholds, tier boundaries, and both question sets.
- Calculator formulas and defaults. The ~$562K default is load-bearing: it is what makes
  the homepage "$560K a year for a $5M brand" claim true.
- `GateScreen`, the edition chooser, and the `gate: true` measurement questions.
- The existing `prefers-reduced-motion` handling.
- The card's visual design. Only its content ordering changes, in item 16.
- The `/contact` branching form itself, and the homepage form. Item 11 borrows the
  homepage form's markup and styling; it does not modify it.
- Any copy not named in this document.
- Nav, homepage, and every other page.

One pull request per pass, so each is revertable on its own.

---

## Do not build

- **No lead-magnet capture.** Nothing is locked behind an address, the download is free,
  and there is no autoresponder, ESP, Netlify function, PDF generator or nurture sequence.
  Nothing is sent, so nothing needs sending infrastructure. The contact form in item 11 is
  not this: it exists so someone can reply, not so a list can be built.
- **No new Netlify forms.** Items 11 and 12 reuse the existing registered `contact` form
  and add two fields to it.
- **No second slider on Fan Score.** Fan Value carries the mechanic. Prove it there first.
- **No percentile benchmarking.** It needs roughly thirty submissions and there are none.
  Do not invent a distribution.
- **No gamification.** No badges, streaks or progress bars. Item 12 is responsiveness, not
  game mechanics, and the difference matters for a tool whose job is to look like it was
  built by someone senior enough to charge properly. Item 14 is the whole of it.

---

## Before calling it done

- Both editions of Fan Score, and Fan Value, driven end to end. Desktop and mobile.
- **Submit the new result-page form once from each tool and confirm the message lands in
  Netlify with `score` and `tool` populated.** If those two arrive empty, the registration
  in `index.html` did not take and the fields are being dropped silently.
- **Submit once with the image deliberately broken** (block cdnjs, or throw inside the
  download path) and confirm the enquiry still sends and the confirmation still shows. The
  message must never depend on the picture.
- **Double-click the submit button** and confirm only one enquiry and one file result.
- Download produces a clean file on both, with html2canvas bundled rather than fetched.
- Share falls back correctly on desktop Safari and desktop Firefox.
- Keyboard tab through every tool. Focus visible on every control.
- Calculator default still lands at roughly $562K.
- No new console errors.
- Before and after screenshots of every result screen on the pull request.

---

## Open, for Laura only

The reveal copy is "Starting the fan engine…", "Vroom, vroom…", "Ready for blast off!". It
is warm and it is fast to read, which is good. It is also playful for a tool whose result
gets shown to whoever owns the budget. Worth a look while the timings are being changed,
but it is a voice call, not a fix, and it is yours.

---

## What actually decides this

There are no submissions because the site has not been marketed. Conversion on no traffic
is nothing, whatever the copy says.

Ship Pass 1 so nothing on the site is untrue. Ship Pass 2, because it is where the return
is and it is half a day. Pass 3 when there is time. Then stop building and spend the hours
on the UK warm paths.

The tools are not the constraint any more. Distribution is.

---

Laura Cordrey · lauracordrey.com
