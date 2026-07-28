# Are all the forms reaching Netlify? — audit, 28 July 2026

Question: Netlify only shows 2 forms to send notifications from, but there look
to be more than 2 places a visitor can get in touch.

Short answer: **the capture is working, and 2 is the correct number of forms.**
There are 5 submission points, but they deliberately all post to one form named
`contact`. The second form, `fan-score`, is registered but receives nothing.

Verified against production, not just source.

---

## The 5 submission points, and where each lands

| # | Where | Component | Posts as | Tagged with |
|---|---|---|---|---|
| 1 | `/contact` | `ContactPage.jsx:263` | `contact` | `intent`, `source_page` |
| 2 | Homepage inline form | `HomePage.jsx:746` | `contact` | `source_page: 'homepage'` |
| 3 | Fan Score result | `FanAuditPage.jsx:475` | `contact` | `tool: 'fan-score'`, `score` |
| 4 | Fan Score, pre-launch result | `FanAuditPage.jsx:754` | `contact` | `tool: 'fan-score'`, `score` |
| 5 | Fan Value result | `FanValueModelPage.jsx:679` | `contact` | `tool: 'fan-value'`, `score` |

3, 4 and 5 are the same component (`ResultContactForm`) mounted three times.

So all five arrive in the single `contact` inbox. **Turning notifications on for
`contact` alone covers every entry point on the site.** They stay
distinguishable once inside: `source_page` says where it came from, and the tool
submissions also carry `tool` and `score`, plus a `_subject` line like
`[fan-value] Jane Smith · £84k / yr`.

---

## Registration is genuinely working on production

Netlify only registers forms it finds in deployed HTML at deploy time. Confirmed
it has:

```
<form hidden method='post' name='contact'>
<input type='hidden' name='form-name' value='contact' />
<form hidden method='post' name='fan-score'>
<input type='hidden' name='form-name' value='fan-score' />
```

The `method='post'` and the injected `form-name` inputs are Netlify's own
rewrite of the hidden forms in `index.html`, which is proof it parsed and
registered both. Also confirmed the hidden forms survive the Playwright
prerender step into `dist/index.html` and into every route snapshot, which was
the plausible way they could have been silently lost.

## No fields are being dropped

Netlify silently discards fields that aren't registered. Checked every one.

`ContactPage` is the risky one because it submits
`Object.fromEntries(fd.entries())`, i.e. whatever is in the DOM. Its 10 field
names are `name`, `email`, `organisation`, `message`, `consulting_need`,
`consulting_timeline`, `event_date`, `event_format`, `event_location`, and
`company_url`. The first nine are all registered in `index.html`; `company_url`
is the honeypot and is explicitly deleted before the POST. The other two
surfaces send fixed payloads, all registered.

**Nothing is being lost.** No action needed here.

---

## Findings worth acting on

### 1. The `fan-score` form is a dead inbox

`postLead` defaults to `form: 'fan-score'`, but both call sites explicitly pass
`form: 'contact'`, so nothing has ever posted to it. It will show zero
submissions forever, which is confusing when scanning the Netlify dashboard.

Options: leave it (harmless), or delete the hidden form from `index.html` so the
dashboard shows one form and one meaning. **Do not** change the default in
`postLead` to make it "work" — per the do-not-touch rule, `postLead` is
hand-calibrated and the tool leads are deliberately funnelled into `contact` so
they arrive alongside everything else.

### 2. Six mailto links bypass Netlify entirely

`hello@lauracordrey.com` appears as a `mailto:` in `Layout.jsx` (footer),
`AIPage.jsx`, `ContactPage.jsx`, `ServicesPage.jsx` and twice in
`SpeakingPage.jsx`.

These are real entry points but they will never appear in Netlify, because they
go straight to the mailbox. That is correct behaviour, not a fault, but it does
mean **"submissions in Netlify" is not the same as "enquiries received"** — if
you are counting leads, the inbox is a second source. This may be the gap that
prompted the question.

### 3. Tool-result submissions fail silently by design

`postLead` is fire-and-forget: `.catch(() => {})`. If a submission fails, the
visitor still sees the success state and nothing is logged. That is deliberate,
so a backend hiccup never breaks the reveal, and `postLead` is do-not-touch. But
it does mean a capture failure on the Fan Score and Fan Value forms would be
invisible from both ends. `ContactPage` is different: it checks `res.ok` and
shows an error.

Worth knowing rather than worth changing.

---

## The one thing not verified

Everything above is verified from the deployed HTML and the source. What can't
be checked from here is **the Netlify notification setting itself** — whether an
email notification is actually switched on for the `contact` form, and which
address it goes to. That is in Site configuration → Forms → Form notifications.

The end-to-end proof would be a real test submission, which would land a genuine
entry in the inbox. Worth doing once, deliberately, rather than assuming.
