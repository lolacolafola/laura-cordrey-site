# SEO Audit — lauracordrey.com
**Date:** 20 July 2026
**Scope:** Full technical + on-page audit of all 12 live routes, cross-checked against this session's earlier crawlability/indexing investigation.
**Data sources:** Direct HTTP checks (curl), source code inspection, Google Search Console + Bing Webmaster Tools screenshots shared during this session. No Ahrefs/Semrush/similar connected — keyword opportunity section is directional based on competitive research done earlier this session and web search, not real volume/difficulty data. Connect an SEO tool via MCP for precise numbers.

---

## Executive Summary

Technical foundation is genuinely strong: clean `robots.txt` explicitly allowing every major AI crawler, valid sitemap, working prerendered HTML on every real route (verified — each has exactly one `<h1>`, one JSON-LD block, real text, not an empty SPA shell), 100% image alt-text coverage, and correct canonical tags. This is well ahead of where most small consulting sites are.

Two real technical problems, in priority order:
1. **`/work` silently serves duplicate homepage content** (same ETag, same bytes) instead of its own page — a genuine bug, not a styling nitpick.
2. **Meta descriptions are running 1.5–2x over length almost everywhere except the homepage** (which we fixed locally this session, not yet pushed) — most non-home pages are 170–260 characters against a ~155–160 guideline.

A third item below is *not* an SEO issue and shouldn't be read as one — it's a forward-looking positioning note, included for completeness since it came up during the audit conversation, not because it affects crawlability or rankings.

Nothing here is a crawlability block. The earlier "AI can't find the site" issue (from earlier in this session) was ranking/authority, not a technical fault, and Bing's live re-test after the domain cutover confirmed the site is indexable.

---

## Critical / High-Priority Issues

| Page | Issue | Severity | Recommended Fix |
|---|---|---|---|
| `/work` | Serves byte-identical homepage content (same ETag `5e5749856c49d087c7ba2881eff2b588-ssl`, same 59,154 bytes) instead of the Work/Case Studies listing page | **Critical** | `/work` and `/work/:slug` are real routes in `App.jsx` but aren't in `sitemap.xml`, so `scripts/prerender.mjs` (which reads its route list from the sitemap) never snapshots them. They fall through to the `_redirects` SPA catch-all, which serves `index.html` — and `index.html` gets overwritten with the *homepage's* prerendered snapshot at build time. Either add `/work` to the sitemap so it gets its own snapshot, or if `/case-studies` is the real canonical listing page and `/work` is legacy, redirect `/work` → `/case-studies` in `public/_redirects` and remove the route. |
| Any non-existent URL | Returns HTTP 200 with full homepage content instead of a 404 (confirmed with a random nonsense path) | Medium | Standard SPA-fallback behavior, not unique to this site, but it means broken/typo'd links get indexed as duplicate homepage content rather than cleanly dropped. Lower priority than the `/work` bug since it only affects URLs that shouldn't exist in the first place. |
| Nearly every non-home page | Meta description 170–260 characters (guideline ~155–160) | High | See table below — worst offenders first. |
| Several case-study pages | Title tag 80–103 characters (guideline ~50–60) | Medium | See table below. |

### Meta description lengths (live, as of this audit)

| Page | Length | Status |
|---|---|---|
| BlaBlaCar Storytelling | 261ch | Fail — worst on site |
| Ubisoft Siege Champions | 258ch | Fail |
| Services | 225ch (source shows 252ch pre-trim variant) | Fail |
| Azarus Game Ads | 231ch | Fail |
| Claw Mobile | 230ch | Fail |
| Delta Company | 203/230ch | Fail |
| About | 201/226ch | Fail |
| Speaking | 196/223ch | Fail |
| Azarus Streamers | 213ch | Fail |
| Methodology | 175/202ch | Fail |
| AI | 170/197ch | Fail |
| FAQ | 151/178ch | Borderline |
| Homepage | 169ch live / **151ch fixed locally, not pushed yet** | Fixed, pending deploy |
| Fan Value Model | 143/170ch | Borderline |
| Contact | 134/161ch | Pass |
| Fan Score | 117/144ch | Pass |

(Two numbers where shown: live-fetched length / source-file length — they differ slightly because the live page hasn't picked up any deploy since these were last touched. Both are over guideline regardless.)

### Title tag lengths

| Page | Length | Status |
|---|---|---|
| Azarus Game Ads | 103ch | Fail |
| Delta Company | 96ch | Fail |
| Azarus Streamers | 92ch | Fail |
| Ubisoft Siege Champions | 91ch | Fail |
| Claw Mobile | 82ch | Borderline |
| US Mobile Dark Star | 82ch | Borderline |
| FAQ | 84/70ch | Borderline |
| Services | 81/69ch | Borderline |
| Speaking | 76/62ch | Borderline |
| Fan Value Model | 78/64ch | Borderline |
| Fan Score | 75/61ch | Pass |
| About | 74/62ch | Pass |
| Homepage | 75/61ch | Pass |
| BlaBlaCar Storytelling | 66ch | Pass |
| Work (listing) | 66ch | Pass |
| Methodology | 59/45ch | Pass |
| AI | 52/38ch | Pass |
| Contact | 38/24ch | Pass — actually has *room* to add a keyword |

---

## Technical SEO Checklist

| Check | Status | Details |
|---|---|---|
| robots.txt | Pass | Explicitly allows GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, PerplexityBot, Googlebot, Bingbot, and more |
| XML sitemap | Pass | Valid, 18 URLs, submitted and indexed on Google (confirmed via Search Console this session) |
| HTTPS | Pass | |
| Noindex tags/headers | Pass | Confirmed absent from source and live headers — the earlier Bing "NOINDEX" flag was stale pre-cutover crawl data, resolved by the live re-test this session |
| Prerendered HTML (crawlability for non-JS bots) | Pass | Verified on 12 routes — real text, one `<h1>`, one JSON-LD block each |
| Canonical tags | Pass | Self-referencing, correct on spot-checked pages |
| Image alt text | Pass | 24/24 `<img>` tags have descriptive `alt` |
| `/work` route | **Fail** | Serves duplicate homepage content — see above |
| 404 handling | Fail (minor) | Soft-404s return 200 with homepage content |
| Title tag lengths | Mixed | 4 pages clearly over, 6 borderline, rest fine |
| Meta description lengths | Mostly fail | Only 2 of 12 pages currently pass |
| Core Web Vitals | Not measured | No Lighthouse/PSI run this session — flagging as unmeasured, not assumed-fine |

---

## Content Gap Recommendations

| Gap | Why it matters | Format | Priority | Effort |
|---|---|---|---|---|
| No blog/insights content | There's no recurring content engine capturing informational, long-tail search ("what is fan-led growth," "how to build a brand community") — the FAQ page partially covers this but isn't built to expand. Competitors in adjacent space (e.g. Duel.tech) run active blogs. | Blog or "Insights" section, even a slow-cadence one | Medium | Strategic, ongoing |
| No comparison/definition content for "fan-led growth" itself | Since it's a coined term with zero competing definitions (confirmed via search this session), there's a real opportunity to own "what is fan-led growth" as a search result before anyone else defines it for you | Single pillar page or FAQ expansion | Medium | Quick win (half day) |

**Not an SEO finding, but worth naming:** all current case studies are digital-native categories (games, rideshare, telecom) where an online community already exists by default. Gaming/rideshare/telecom are consumer brands, full stop — this isn't a "not consumer enough" gap. The open question, now that positioning explicitly reaches toward beauty and sports too, is whether the *method* visibly transfers to categories where community forms differently (retail, sponsorships, physical product). Not urgent — the broader positioning was only locked in today — just a natural next case study to go land, not a site defect.

---

## Prioritized Action Plan

**Quick wins (this week):**
- Fix the `/work` route bug — either add it to the sitemap or redirect it to `/case-studies`. High impact (duplicate content), low effort.
- Trim the 12 over-length meta descriptions using the same approach as the homepage fix this session (aim for 145–155 characters, keep the strongest proof point).
- Trim the 4 clearly-over title tags (Azarus Game Ads, Delta Company, Azarus Streamers, Ubisoft Siege Champions).
- Push and deploy the already-committed homepage/title/tagline fixes from this session — they're sitting local-only right now, so none of today's positioning work is live yet.
- Submit sitemap to Bing Webmaster Tools if not already done (flagged earlier this session, still worth confirming complete).

**Strategic investments (this quarter):**
- Decide whether `/work` is a real second listing page worth keeping distinct from `/case-studies`, or a legacy route to retire — the fix depends on that call.
- Stand up a lightweight content section to start capturing "what is fan-led growth" and adjacent searches while the term is still uncontested.
- Longer-term, not urgent: a case study outside the current digital-native cluster (games, rideshare, telecom) would help prove the method transfers to categories like beauty or sports where community forms differently — worth having in mind for the next relevant engagement, not something to manufacture now.

---

*Note: keyword opportunity data, competitor SERP-feature ownership, and backlink profile comparisons are not included with real numbers — no SEO tool (Ahrefs/Semrush/similar) is connected this session. What's here is grounded in direct technical checks and the competitive research already done earlier in this conversation, not estimated search volume.*
