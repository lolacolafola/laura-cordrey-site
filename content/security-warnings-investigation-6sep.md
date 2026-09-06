# "People keep getting security warnings" — investigation, 6 Sep 2026

Laura reported that people keep getting security warnings about the site.

> **⚠️ SUPERSEDED CONCLUSION — read "Update: it is ISP filtering" at the bottom
> first.** Laura clarified that the warning appears *when on a particular
> internet provider*. That rules out the email theory below. The email finding
> is still a real and separate gap worth fixing, but it is **not** the cause of
> this symptom. The section is kept because the DMARC gap is genuine.

**The cause is not on the website** — that part holds, and is now confirmed
from several more angles.

---

## The website itself is clean

Everything below was measured live against lauracordrey.com on 6 Sep 2026, not
assumed.

| Check | Result |
|---|---|
| TLS certificate | Valid. Let's Encrypt, `CN=lauracordrey.com`, SANs cover **both** `lauracordrey.com` and `www.lauracordrey.com` |
| Certificate validity | 15 Jul 2026 → **13 Oct 2026**. Netlify auto-renews |
| `http://` apex | 301 → `https://lauracordrey.com/` |
| `http://www` | 301 → `https://www.lauracordrey.com/` |
| `https://www` | 301 → `https://lauracordrey.com/` (single canonical host) |
| HSTS | `max-age=63072000; includeSubDomains; preload` |
| Mixed content | **None.** No `http://` resources anywhere in the served HTML |
| Third-party origins | Only `fonts.googleapis.com`, `fonts.gstatic.com`, `www.linkedin.com` — all allowed in CSP |
| Security headers | CSP (enforcing), `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` all present |
| Live sitemap URLs | All 20 return **200** |

There is no certificate error, no mixed content, no insecure form post, and no
missing HTTPS redirect. A browser has nothing here to warn about. If someone is
seeing a browser padlock warning on lauracordrey.com itself, I need a screenshot,
because nothing measurable supports it.

---

## Leading hypothesis: it is the email, not the site

This is where there is a real, confirmed gap.

| Record | Status |
|---|---|
| MX | OVH (`mx1/2/3.mail.ovh.net`) |
| SPF | `v=spf1 include:mx.ovh.com -all` — present, and a **hard fail** (`-all`) |
| **DMARC** | **MISSING.** No record at `_dmarc.lauracordrey.com` |
| DKIM | Not found at the common selectors I could guess (`ovh`, `default`, `google`, `selector1`, `selector2`, `mail`, `k1`). Selectors are arbitrary, so this is **not proof** it is off — check in the OVH panel |

Why this produces "security warnings":

- SPF is set to `-all`, which tells receiving servers to **hard-reject** mail
  from anything that is not OVH. That is strict and correct *only if you send
  exclusively through OVH webmail.* If you send from Gmail "send mail as", a
  newsletter tool, a CRM, a scheduler, or any outreach tool using your address,
  those messages fail SPF outright.
- With **no DMARC record**, receivers fall back to their own judgement, and
  Gmail/Outlook increasingly show an explicit interstitial on unauthenticated
  mail: "Be careful with this message", "we could not verify that this message
  came from lauracordrey.com", or a red padlock.
- A recipient seeing that would very reasonably tell you they got "a security
  warning about your site" — the domain in the warning *is* your site's domain.

This fits the symptom far better than anything on the website does.

### What to do (needs your OVH login — I did not touch DNS)

1. **Add a DMARC record.** Start in monitor mode so nothing gets blocked while
   you watch:
   - Host: `_dmarc`
   - Type: TXT
   - Value: `v=DMARC1; p=none; rua=mailto:laurajanecordrey@gmail.com; fo=1`
   - Leave it at `p=none` for a few weeks, read the reports, then tighten to
     `p=quarantine` once you can see everything legitimate is passing.
2. **Confirm DKIM is switched on** for the domain in the OVH mail panel, and
   note the selector it gives you.
3. **List everywhere you send mail from** using your @lauracordrey.com address.
   Anything that is not OVH has to be added to the SPF include list, or it will
   keep hard-failing.

⚠️ Do not tighten DMARC to `p=reject` before step 3 is done — with `-all` SPF
already in place, that combination can start bouncing your own outreach.

### Second possibility, if it is not email

Corporate link scanners (Outlook SafeLinks, Proofpoint, Mimecast) and workplace
web filters routinely flag domains that are simply **new and uncategorised**
rather than actually dangerous. The warning usually says "uncategorised site" or
"this link has not been verified". Nothing to fix on your end; it ages out. If
this is what people describe, it is harmless.

---

## What I need from you to close this out

1. **What does the warning actually say?** Exact wording, or a screenshot.
2. **Where do they see it** — in an email client, or in a browser on the site?
3. **Which people?** If it is only people at large companies, it is the link
   scanner. If it is everyone, and it is in email, it is the DMARC gap.

---

## Separately: fixed in this session

Two real issues found while investigating. Both fixed in code, **not pushed** —
see the commit note. Neither is related to the security warnings.

1. **The GitHub Pages preview was open to search indexing.** `public/robots.txt`
   ships `Allow: /` and was copied verbatim into the preview build, so the
   github.io copy of the whole site was crawlable. With Netlify auto-build off,
   that preview is frequently *ahead* of what is actually live, so an indexed
   copy could show visitors unreleased work.
2. **Canonical tags on the preview pointed at URLs that 404.** `pageUrl()` in
   `src/lib/seo.js` concatenated `BASE_URL`, producing
   `https://lauracordrey.com/laura-cordrey-site/about` — which does not exist.
   A canonical pointing at a 404 is ignored, so it was not protecting the real
   site from being duplicated. Production was always correct (base is `/`), and
   the fix changes production output **not at all** — verified by building and
   diffing against the live site.

## Also worth knowing

- **Do not deploy the `public/sitemap.xml` change without `PrivacyPage.jsx`.**
  Your uncommitted sitemap edit adds `/privacy`, but the page is still untracked
  WIP. Shipping the sitemap alone puts a 404 in your sitemap. They must go
  together.
- The site sends `preload` in its HSTS header but is **not** on the browser
  preload list. That is fine and not a problem. But note `includeSubDomains` is
  active: if you ever add a subdomain, it must serve valid HTTPS from day one or
  it will fail hard with no click-through.


---

# Update: it is ISP filtering, not email

Laura clarified: the warning appears **when on a particular internet provider**.
That single detail rules out the email theory and points somewhere specific.

## What that rules out — everything measurable is clean

| Check | Result |
|---|---|
| DNSSEC validation | **Passes.** `ad` flag returned by 8.8.8.8, 1.1.1.1, 9.9.9.9. Not a broken DNSSEC chain — that was the best structural candidate and it is definitively out |
| Domain age | Registered **15 Feb 2026** via OVH — about 7 months old. Past the usual 30–90 day "newly registered domain" window, but still young |
| Threat/malware blocklists | **Clean on every one tested.** Cloudflare Security (1.1.1.2), Cloudflare Family, Quad9, OpenDNS, OpenDNS FamilyShield, AdGuard, CleanBrowsing Security, ControlD all return the true IP `75.2.60.5`. The domain is not flagged as malicious anywhere significant |
| TLS / headers / redirects | Clean, as measured above |

So this is not a real security problem. Something on that one provider's network
is objecting, and it is not because your site is on a threat list.

## Why it appears as a scary *security* warning rather than a block page

This is the part worth understanding, because it explains the wording.

The site sends:

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

That tells every browser: *for the next two years, only ever reach this domain
over HTTPS, and never let the user click through a certificate problem.*

When an ISP filter intercepts a request, it normally answers with its own block
page. But it cannot present a valid certificate for `lauracordrey.com` — nobody
can except you. So instead of the ISP's polite "this site is blocked on your
broadband filter" page, HSTS turns that interception into a **hard browser
certificate error with no "proceed anyway" link**:

> Your connection is not private / NET::ERR_CERT_AUTHORITY_INVALID

Which reads to a normal person as *"this website is a security risk"* — exactly
what people are reporting. The interception is ordinary filtering; HSTS is what
makes it look alarming and unbypassable.

**Do not remove HSTS to fix this.** It is correct security, and removing it
would not help quickly anyway — browsers cache the instruction for the full two
years, so anyone who has already visited would be unaffected by the change for a
long time. The fix is to stop the interception, not to weaken the site.

## The most likely cause: the domain is uncategorised on that ISP's filter

UK consumer ISPs run their own filters with their own category databases,
entirely separate from the public blocklists I tested: BT Web Protect, Sky
Broadband Shield, TalkTalk HomeSafe, Virgin Media Web Safe, Vodafone Content
Control. Several of these **block uncategorised sites by default** on their
stricter settings.

A 7-month-old personal consulting site with modest traffic is very likely simply
**not in their category database yet**. It is not flagged as bad; it is unknown,
and unknown gets blocked.

### Second possibility: shared-IP reputation

Your apex `lauracordrey.com` resolves to `75.2.60.5`, which reverse-resolves to
`acd89244c803f7181.awsglobalaccelerator.com` — Netlify's **shared** anycast
address, used by a very large number of unrelated sites. Filters that judge by
IP rather than domain can flag it because of a neighbouring site. You cannot do
much about that one, and it is less likely than the categorisation gap.

## What to actually do

**1. Get these three facts from someone who sees it.** They decide everything:

- **Which provider** are they on?
- **What exactly does it say** — the error code matters. `NET::ERR_CERT_*` means
  interception (the HSTS story above). A provider-branded "this site is blocked"
  page means plain category filtering.
- **Is there a "proceed anyway" link?** Absent = HSTS interception confirmed.

**2. Submit the domain for categorisation.** This is the standard, free fix for
an uncategorised-domain block, and it is worth doing regardless of the above.
Each vendor has a public "submit a site for review / dispute a category" form.
Ask to be categorised as *business* or *professional services*. Worth doing at
minimum for the ISP in question, plus Symantec/Broadcom, Forcepoint, Palo Alto
and Zscaler, whose databases many other filters license.

**3. Do not change anything on the site.** There is nothing wrong with it. I
made no changes for this issue.

## Honest limits of this

I cannot reproduce the warning from here — I am not on that provider's network,
which is the whole point of the symptom. Everything above is inference from what
is measurable externally plus the one detail you gave. The three facts in step 1
would turn this from a strong hypothesis into a confirmed diagnosis, and the
error code alone would probably settle it.
