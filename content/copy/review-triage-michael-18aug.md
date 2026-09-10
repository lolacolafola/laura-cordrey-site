# Triage: Michael's website notes, 18 Aug 2026

Date: 19 August 2026
Source: Michael (New York), two parts — a scoping note about a scraper/social
listening tool, and "Laura website notes v1".

Everything below marked **VERIFIED** was checked against the code today, not
taken at face value. Three of his claims resolve differently once checked.

---

## A · Already fixed. He is looking at a stale version.

### The ™ on Fan Score and Fan Value

> "Do you really own the trademarks for these? Fan Score TM and Fan Value TM?"

**VERIFIED: there are zero ™ marks on Fan Score or Fan Value anywhere in the
source.** Grepped across `src/`, `public/` and `scripts/`. `npm run tm:check`
passes, and that script exists specifically to enforce it.

This was the 29 Jul naming change: one hero mark, on the Fan Engine only, once
per page. Fan Score and Fan Value carry no mark at all, because they are tool
names.

**So the important finding is not the trademark question. It is that Michael saw
marks that are not in the repo, which means what is deployed is behind `main`.**
Worth confirming what is actually live before anything else in this list.

His instinct is still worth recording, because it is exactly the risk CLAUDE.md
already guards against: never write that the Fan Engine is trademarked,
registered or protected. ™ is the unregistered-mark notation and needs no
ownership claim. The claim being made is authorship, which is true.

### Header and footer not matching

> "Is there a particular reason for this split?"

Yes, and it is documented in `Layout.jsx`. The header is one journey (problem,
proof, offer, person); the footer is the crawl path and carries the pages
deliberately kept out of the header. Speaking left the header on 22 Jul because
it is a second product for a second buyer.

**Partly actioned already:** Method was added to the header on 29 Jul, pointing
at /fan-engine, which was his strongest specific example.

His dropdown suggestion conflicts with an earlier standing decision: do not hide
important paths, and do not assume users hunt. A dropdown is a hiding pattern.
**Recommend: no change beyond Method, which is done.**

---

## B · Real gap. Fix this first.

### There is no privacy policy

> "Because you've got a contact form, you need to have a privacy policy."

**VERIFIED: there is no privacy page.** No route, no component, no footer link.
The contact form collects name, email and free text through Netlify Forms.

**He is right, and this is the highest-priority item in his entire list.** It is
also the cheapest: one short page and one footer link. Nothing else here is a
compliance exposure.

### Cookies and analytics

He is right conditionally. There is no analytics today, so no banner is needed
today. Note for when it goes on: Netlify Analytics is server-side log analysis
and sets no cookies, so it does not trigger a consent banner. A client-side tag
(GA4 or similar) does. **The choice of analytics decides whether a banner is
needed at all**, so decide that before building one.

---

## C · Not a bug, but a real finding

### The referrals input on /fan-value

> "Is 'Growth from referrals & word of mouth' an input to the formula? Changing
> it doesn't have any effect on the calculation infographic below?"

**VERIFIED: it is wired in, and it does change the result.** `bring0` feeds
`bringLift`, which feeds `saved`:

    bringLift = min(fanN, max(0, 100 - bring0N))
    saved     = bring0N >= 100 ? acqN : acqN * (bringLift / (100 - bring0N))

Worked example, fan share 10%: at 0% the saving is `0.10 × acq`; at 20% it is
`0.125 × acq`. So it moves, by roughly a quarter of one component.

**But he could not see it, and that is the actual problem.** It only touches the
ad-budget-saved component, and only slightly. There is already a text readout
("on top of the X% you already get"), and he missed that too.

**The fix is visibility, never the maths.** The Fan Value model is hand-calibrated
and is on the do-not-touch list. Options: surface the saved component as its own
figure, or make the "on top of X%" readout more prominent.

This is the second time a reviewer has hit exactly this control. It was the
subject of the 3f5c35a work ("make every control do something, or say why it
can't"). It does something. It does not *look* like it does something.

---

## D · Two reviewers now agree. Decide it.

### Pricing

> "Is there any reference to pricing you could give? The way you're pitching
> feels pretty premium, but no idea what that might translate to."

This is now a signal from two independent readers plus the reference-site
comparison. `anastasiashtompel.com/services` states a real number on two of
seven offers and "PRICE: UPON REQUEST" on the other five.

Even the explicit refusal beats silence, because it shows the question was
heard. Four of five cards currently say "priced per engagement", which is not an
answer.

**Laura's call. No figure has been drafted.**

### ICP

Both reviewers opened with it. It remains the parked question, and parking it is
still right: it should be settled by real sales conversations, not before them.

---

## E · Overlaps with the work already in flight

His point 2 — recognise the problem, then the result, then what you do, then how
it works — is the same structure the /services rebuild has been converging on
all along. Nothing new to action; it is confirmation.

His point 1 (the hero) and point 3 (a "is fan-led growth right for you"
article/flowchart) are new and are messaging work, not fixes. Point 3 is
genuinely good as a lead qualifier but it is a new page, which the standing plan
ruled out for now.

His point 4 (Speaking feels unfocused) is fair and is a small, self-contained
copy job.

---

## F · Park entirely

The scraper / social listening scope in the first half of his message is a
product and business question, not website work: whether to build monitoring
into Sentiment SOS and the Fan Value diagnostic.

The substantive flags in it are real and worth keeping for when it is picked up:
Reddit's API has been paid and rate-limited for commercial use since 2023 and
scraping outside it breaches ToS; the platform mix differs sharply between gaming
and general consumer clients; and Brandwatch, Talkwalker and Meltwater already do
a version of this, so there needs to be a reason not to resell one.

**None of it belongs in this session.**

---

## Recommended order

1. **Privacy policy.** The only compliance exposure. Half a day at most.
2. **Confirm what is actually deployed.** He saw ™ marks that left the repo on
   29 Jul, so the live site is likely behind `main`.
3. **Make the referrals input visibly do something.** Presentation only. The
   maths is not to be touched.
4. **Decide the pricing signal.** Two reviewers, one reference site, same gap.
5. Speaking page focus. Small copy job.
6. Hero and the qualifier article. Messaging, and the larger piece of work.
