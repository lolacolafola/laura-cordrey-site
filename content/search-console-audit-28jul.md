# Search Console coverage audit — 28 July 2026

Source: `lauracordrey.com-Coverage-2026-07-28.zip` (GSC export, "All known pages"),
plus live checks against production run the same day.

Follows `seo-audit-20jul.md`. That one covered on-page SEO. This one is about
indexing and crawl, which is a different failure surface.

---

## What the export actually says

| | |
|---|---|
| Indexed | 22 |
| Not indexed | 8 |
| Critical issues | "Page with redirect" — 8 pages, validation **Started** |
| Non-critical issues | none |
| Impressions, 19–24 Jul | 1, 1, 9, 3, 6 |

The chart only carries index counts for 24 July. Everything before that is
impressions only.

---

## 1. The redirect issue is real, but the export doesn't say which URLs

**Needs confirming in GSC before acting.** The export gives a count, not a URL
list. Click into "Page with redirect" in Search Console to see the actual 8.

There are two candidate explanations and they have opposite implications:

**a) The 8 are the legacy `/case-studies/*` URLs.** There are exactly 8 such
rules in `public/_redirects` (`/case-studies` plus 7 children). If that's the
match, this is **benign** — it is precisely what a 301 is supposed to do, those
URLs are meant to be dead, and no action is needed.

**b) The 8 are real pages.** Then it's the trailing-slash problem below.

The count matching 8 exactly is suggestive of (a), but it is not proof, and (2)
below means the site will start generating these regardless.

---

## 2. Every sitemap URL except the homepage redirects

This is the actual defect, and it is live right now. Checked all 19 URLs in
`public/sitemap.xml`:

```
200  https://lauracordrey.com/
301  https://lauracordrey.com/about      →  /about/
301  https://lauracordrey.com/services   →  /services/
301  https://lauracordrey.com/fan-engine →  /fan-engine/
...18 of 19 behave this way
```

**Why.** `scripts/prerender.mjs` writes each route as
`dist/<route>/index.html`. Netlify's pretty-URL handling therefore serves the
page at `/about/` and 301s `/about` to it.

**Why it matters.** The three signals disagree:

| signal | says |
|---|---|
| `sitemap.xml` | `/about` |
| `<link rel="canonical">` in the served page | `/about` |
| what the server actually serves with a 200 | `/about/` |

So Google follows the sitemap to `/about`, gets bounced to `/about/`, and finds
a page whose canonical points back at `/about` — a URL that redirects. A
canonical pointing at a redirecting URL is a contradiction, and "Page with
redirect" is the documented consequence.

**This also means the validation currently running will fail** if it covers
these URLs, because nothing has changed to make them stop redirecting.

### Two ways to fix it

**Option A — make the no-slash URL real (recommended).** Change `prerender.mjs`
to write `dist/<route>.html` rather than `dist/<route>/index.html`. Netlify then
serves `/about` with a 200 and no redirect. Nothing else has to move: sitemap,
canonical, `og:url` and every internal `<Link to="/about">` already use the
no-slash form, so this makes the server agree with what the site already claims.

Needs verifying after deploy that `/work` still serves 200, since that route
would have both a `work.html` and a `work/` directory alongside it.

**Option B — adopt the trailing slash.** Keep the build as is and rewrite the
sitemap and every canonical to `/about/`. More files touched, and it changes the
URLs the site advertises, which is a bigger commitment for no gain over A.

---

## 3. `/favicon-options/` is a live, indexable page

`https://lauracordrey.com/favicon-options/` returns 200 and is titled
"Favicon options — LC". It is the June scratch page for comparing the eight
favicon designs, sitting in `public/` and therefore shipped to production.

`robots.txt` allows everything, and the page carries no `noindex`. It is not in
the sitemap, but Google indexes plenty that isn't. 22 pages are indexed against
19 sitemap routes, so at least 3 indexed URLs come from outside the sitemap, and
this is a candidate.

Fix: move it out of `public/`, since it is a design scratch pad rather than
something the build needs. Blocking it in `robots.txt` is the weaker option —
that prevents crawling, not indexing.

---

## 4. Impressions are low, and that is expected

1–9 a day. Not a defect on its own: the domain is young, the redesign only
recently went live, and `project_positioning_problem_first` already established
that the old "fan-led growth" framing had no search demand. Worth watching as a
baseline rather than treating as a problem to solve now.

---

## Not a problem

- No non-critical issues at all.
- 22 pages indexed against 19 sitemap routes means coverage is broadly working.
- The 301s in `_redirects` are all `301!` (forced), which is correct.
- `robots.txt` explicitly allows the AI crawlers, which is deliberate.

---

## Suggested order

1. Look up the actual 8 URLs in GSC. One click, and it decides whether §1 is
   anything at all.
2. Fix the trailing-slash mismatch (Option A). This is the one with real cost if
   left.
3. Remove `/favicon-options/` from `public/`.
4. Re-run the validation in GSC only after 2 is deployed.

Note that Netlify auto-build is currently ON, so each of these is a deploy.
Worth batching 2 and 3 into one push.
