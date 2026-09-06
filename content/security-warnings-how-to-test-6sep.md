# How to test the "security risk" warning — 6 Sep 2026

Companion to `content/security-warnings-investigation-6sep.md`, which explains
the likely cause. This file is just the testing: what to run, who runs it, and
what each result means.

The warning only appears on certain networks, so **the test has to happen on a
network that shows it.** Nothing measured from your machine or mine can settle
it, because neither of us is on that network. That is the entire difficulty.

---

# If you cannot ask the person who reported it

You do not need a diagnosis to act. **Skip straight to the fix.** It is free,
takes about fifteen minutes, is completely harmless if my diagnosis is wrong,
and is worth doing on its own merits regardless.

## Why it is worth doing even if I am wrong about the cause

An uncategorised domain does not just get blocked by consumer broadband
filters. **Corporate networks block uncategorised sites too** — often more
aggressively, because they default to "block anything unknown". Your buyers are
people sitting on exactly those corporate networks.

So if lauracordrey.com is genuinely uncategorised, the reported warnings may be
the *visible* part of a larger problem: prospects quietly failing to open your
site from their office and never mentioning it. Getting categorised fixes both,
and there is no downside.

## The fix — do this without diagnosing anything first

Each vendor has a free public form: look up the domain, see its current
category, and request a review if it is wrong or missing. Ask to be categorised
as **business** or **professional services**.

| Vendor | Where |
|---|---|
| Symantec / Broadcom WebPulse | `sitereview.bluecoat.com` |
| Forcepoint | `csi.forcepoint.com` |
| Palo Alto Networks | `urlfiltering.paloaltonetworks.com` |
| Zscaler | `sitereview.zscaler.com` |
| Cisco Talos | `talosintelligence.com/reputation_center` |
| Fortinet | `fortiguard.com/webfilter` |

These six matter disproportionately because a great many other filters, including
ISP ones, license their databases.

**These pages will show you the current category as well.** If it comes back
"Uncategorised", "Not rated" or "Newly observed domain", that is your diagnosis
confirmed, from your own laptop, no reporter needed.

⚠️ I could not do these lookups for you. All six are behind bot protection, and
Symantec's asks for a human verification step — I do not complete those. They
take about twenty seconds each in your own browser.

## Two tests you can run alone, in under a minute

1. **Your own phone, on mobile data with wifi off.** This is the best one. It is
   a different network with its own filter, and UK mobile carriers block
   uncategorised and unrated sites by default until the account is age-verified.
   If lauracordrey.com misbehaves there but is fine on your home wifi, you have
   reproduced the whole problem yourself and can stop looking.
2. **Any other network you are on anyway** — a café, a client's office, a
   coworking space. Open the site. It costs nothing to check while you are there.

If you ever do reproduce it on a network you are actually sitting on, run
`bash scripts/net-diagnose.sh` at that moment and it will tell you exactly what
is happening.

---

## Test A — for whoever reported it (2 minutes, no technical skill)

Paste this to them as-is:

> Could you help me pin down a problem some people are hitting? Takes two
> minutes, on the connection where you saw the warning.
>
> **1.** Open these three links and tell me which ones load. They are all the
> same website on different addresses:
>
> - https://lauracordrey.com
> - https://lauracordrey.netlify.app
> - https://lolacolafola.github.io/laura-cordrey-site/
>
> **2.** For any that fail, send me a screenshot of the error. The error code
> matters more than anything else — it is usually small grey text near the
> bottom, something like `NET::ERR_CERT_AUTHORITY_INVALID`.
>
> **3.** Is there a "proceed anyway" or "continue to site" link, or does it
> refuse completely?
>
> **4.** If you are on wifi, could you try the first link again with wifi off,
> on mobile data? Does it behave differently?
>
> **5.** Who is your broadband or mobile provider?

### Reading the answers

| What they report | What it means | What to do |
|---|---|---|
| lauracordrey.com fails, other two load | The network is filtering **the domain name**. Nothing wrong with the site | Submit the domain for categorisation |
| All three fail | Their network or device, not your site at all | Nothing on your end |
| Works on mobile data, fails on wifi | Their **home broadband filter**. Confirms it outright | They can toggle the filter off; you submit for categorisation |
| Error code starts `NET::ERR_CERT_` | Interception confirmed — the filter is substituting its own certificate | Categorisation. Do not touch HSTS |
| No "proceed anyway" link | HSTS working exactly as intended. Expected, not a fault | Nothing |
| A provider-branded "blocked" page | Plain category filtering, no interception | Categorisation |

---

## Test B — the definitive one, if you can get onto that network

I wrote `scripts/net-diagnose.sh` for this. It has to run **on the affected
network** — the affected broadband, or tethered to a phone on the affected
carrier.

```bash
bash scripts/net-diagnose.sh
```

It is read-only. It resolves names and opens TLS connections; it changes
nothing, sends nothing, and needs no login. Safe to forward to a technical
friend on that network.

It checks three things:

1. **DNS** — whether the network redirects the domain to its own server.
2. **Reachability** — the same three URLs as Test A, automatically.
3. **The certificate actually presented** — this is the decisive one.

**Check 3 is the whole game.** Your real certificate is issued by Let's
Encrypt. If the script reports any other issuer, something on that network is
substituting its own certificate, and that is conclusively the cause of the
warning — no further guessing needed.

I ran it here on 6 Sep and everything passed: DNS clean, all three URLs load,
genuine Let's Encrypt certificate. That is the expected "healthy" output, and it
is what an unaffected network looks like.

---

## What NOT to do

- **Do not remove or weaken HSTS.** It is correct security. It is also cached by
  browsers for two years, so removing it would not fix anyone who has already
  visited. It is not the cause; it only changes how the block *looks*.
- **Do not change the site.** Everything measurable about it is clean. Changing
  things now would only make it harder to tell whether anything improved.
- **Do not pay anyone to "fix your site's security".** There is nothing to fix.
  If the diagnosis lands where I expect, the fix is a free categorisation
  request form.

---

## If it is confirmed as a categorisation block

Free, and worth doing regardless. Each vendor has a public "submit a site for
review" or "dispute a category" form. Ask to be listed as **business** or
**professional services**.

Do the provider the person named first, then these, because a lot of other
filters license their databases:

- Symantec / Broadcom WebPulse
- Forcepoint
- Palo Alto Networks (PAN-DB)
- Zscaler
- Cisco Talos

Takes a few days to propagate. Nothing to install, nothing to change on the site.
