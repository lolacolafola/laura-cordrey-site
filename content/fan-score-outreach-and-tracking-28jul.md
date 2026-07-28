# The Fan Score™ as an outreach tool: the two doors, and how to track it

28 July 2026. Written in response to two questions: what the live / pre-launch
split is actually for, and how to set up tracking. Facts below are read from
`src/pages/FanAuditPage.jsx`, not assumed.

---

## 1. The two doors

The gate asks one question: **"Is your product live, with real users yet?"**
The two answers lead to genuinely different tools, not two skins on one quiz.

| | **Live edition** | **Pre-launch edition** |
|---|---|---|
| Who | Has users whose behaviour can be described | Still building, or about to launch |
| Questions | 8, about how users actually behave | 5, about readiness to build for fans |
| Output | **A number**: `% fan-led`, plus a tier | **A verdict**, no number |
| Bands | Untapped / Earned / Compounding | Not ready yet / Nearly there / Ready to build |
| Closes with | "The one move" plus a Fan Value cross-sell | No cross-sell |

The reason for the split is in the headline of the pre-launch intro: with no
users, a "% fan-led" figure would be invented. Rather than produce a number that
can't mean anything, that edition changes the question from *how fan-led are
you* to *are you set up to become fan-led*.

**Why the pre-launch path deliberately doesn't cross-sell.** The code is
explicit: pre-launch has no revenue to model, so the Fan Value hand-off is
withheld and replaced with "the full engagement begins the day you go live."
That is a considered choice and worth keeping — it is the thing that makes the
tool feel like a diagnosis rather than a funnel.

### What each door is good for in outreach

- **Live edition — the sharper sales instrument.** It returns a number and a
  band. A number invites comparison, creates a gap, and gives the reply a
  subject: "you came out Untapped, here's the one move." Best for companies with
  traction, where the pitch is that existing customers are underused.
- **Pre-launch edition — the relationship instrument.** It returns a judgement,
  not a score, and explicitly says the engagement starts at launch. It's a way
  to be useful to a founder months before there's anything to sell them, and to
  be the person they call on launch day. Lower conversion now, better positioned
  later.

They are different plays and probably want different outreach lists and
different follow-ups.

---

## 2. What blocks using it for outreach today

**a) The pre-launch edition has no link.** Someone must land on `/fan-score`,
click "Get my Fan Score", then choose "Not yet, we're pre-launch". There is no
way to send a pre-launch founder straight to the version written for them.
Confirmed: the tool reads no URL parameters at all.

Fix: accept `/fan-score?edition=pre-launch` (and `?edition=live`) and skip the
gate. Small, self-contained.

**b) Every lead looks identical.** Submissions are tagged
`source_page: fan-score`. A lead from a cold email, a LinkedIn post and organic
search are indistinguishable once they land in Netlify.

Fix: read a `?from=` parameter and pass it through into the existing form
payload as a registered field. Then `?from=linkedin-oct` shows up on the
submission itself. Free, no third party, and it answers the only question that
matters — *which outreach produced a conversation* — rather than merely how many
people visited.

Note the constraint: Netlify silently drops unregistered fields, so any new
field must be added to the hidden forms in `index.html` at the same time. See
`forms-capture-audit-28jul.md`.

---

## 3. Tracking: what exists, and the options

**There is currently no analytics on the site at all.** No GA, no Plausible, no
tag of any kind. The only measurement today is Search Console (search side only)
and Netlify's form submissions (conversions only). Nothing measures visits.

Two constraints that rule some options in and out:

- **The CSP is enforcing.** `public/_headers` ships a real Content-Security-Policy,
  so any third-party script is silently blocked until its origin is added there.
  This is not optional and it is easy to forget — it has already broken one
  feature for three weeks.
- **Cookie consent.** Laura is in Paris, so GDPR applies. Cookie-based analytics
  (GA4) requires a consent banner. The site has none today, and adding one is a
  real cost to the experience. Cookieless analytics does not need one.

| Option | Script? | CSP edit | Consent banner | Notes |
|---|---|---|---|---|
| **`?from=` on the form** | none | none | none | Measures *conversions*, not visits. Free. |
| **Netlify Analytics** | none, server-side | none | none | Reads server logs, so it also counts bots/non-JS. Paid per site. |
| **Plausible / Fathom** | small | yes, add origin | none | Cookieless, privacy-first, per-page and referrer data. Paid. |
| **GA4** | large | yes, add origin | **yes** | Free and powerful, but the banner and the setup cost are real. |

Prices change; check current rates rather than trusting a figure here.

### Recommendation, in order

1. **`?from=` and `?edition=` first.** They cost nothing per month, add no
   third-party code, need no CSP change and no banner, and they answer the
   actual question: did this outreach produce a lead. Do this before paying for
   anything.
2. **Then Netlify Analytics if you want traffic numbers.** No script, no CSP
   change, no consent banner, and it's already in the dashboard you use. The
   lightest way to see whether anyone is arriving.
3. **Plausible instead of Netlify Analytics** if you later want to see which
   pages and referrers specifically, and are willing to add one origin to the
   CSP.
4. **GA4 only if** something specifically requires it. The consent banner is a
   genuine cost on a site this considered.

---

## Open question for Laura

Outreach at what volume, and to whom? A handful of hand-written emails a week
and a list of several hundred want different things: the first only needs
`?from=`, the second probably wants real analytics and a per-campaign link
scheme. Worth answering before building anything beyond item 1.
