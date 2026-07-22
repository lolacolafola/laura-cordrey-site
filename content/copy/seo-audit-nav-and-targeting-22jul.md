# SEO audit: nav, page targeting and internal linking
**Date:** 22 Jul 2026
**Scope:** settle the nav / IA / keyword-targeting question left open at the end of the fan-led-growth build.
**Method:** code-grounded audit of the live repo (routes, per-page meta, JSON-LD, internal link graph, sitemap, robots), plus the SERP-composition research from the previous session.

## Data caveat, stated once

Ahrefs and Semrush are not authorised on this session, so there are **no search-volume or keyword-difficulty numbers here.** Every demand claim below inherits from the earlier SERP-composition analysis (what actually returns for the term, and how commercially dense the results are). That is decisive at this end of the scale, where the question is "any demand or none", but it is not the same evidence as volume data. Anything that depends on precise volume is flagged as such.

Everything about the **site itself** (link graph, meta, schema, orphan status) is verified directly from the code and is not inferred.

---

## Executive summary

The site's technical SEO is genuinely strong. Prerendering, canonicals, a complete sitemap, per-page JSON-LD, and an unusually thorough AI-crawler allowlist are all in place and correct. That is not the problem.

The problem is a single structural inversion, and it explains the confusion:

> **The site aims its authority at the dead term and starves the live one.**

The homepage, which is the strongest page on the domain, has the title *"Laura Cordrey | Fan-Led Growth Consultant for Consumer Brands"*, targeting a term with no commercial demand. Meanwhile `/fan-led-growth`, which was correctly retargeted at *"How to turn customers into fans"* (the query people actually type), has **zero inbound internal links from anywhere on the site except the nav item.** Verified: a grep for links to `/fan-led-growth` across every `.jsx` file returns nothing outside `App.jsx`.

So the page carrying the real query is the weakest-linked page on the site, and the page carrying the most authority points at ceiling fans and football reviews.

**Top three priorities:**
1. Retarget the homepage title and description at the problem, keeping the two pages on distinct intents so they do not cannibalise.
2. Fix the orphan. `/fan-led-growth` needs three to four inbound body links with query-shaped anchor text.
3. Change the nav label, for a reason that is stronger than taste (below).

**Overall assessment: strong foundation, one structural fix.** This is not a rebuild. It is roughly a half-day of edits.

---

## 1. The nav question, settled

The previous session framed this as a copy choice between "Fan-Led Growth", "How it works" and "The Fan Engine". That framing missed the thing that makes it an SEO decision rather than a taste decision.

**Internal anchor text is a ranking signal.** It tells the crawler what the destination page is about. Normally a page has many inbound links, so no single anchor dominates.

`/fan-led-growth` has exactly one inbound link. Its anchor text is "Fan-Led Growth".

That means **100% of that page's internal anchor-text signal currently reinforces the term with no demand.** Every crawl confirms to Google that this page is about fan-led growth, which is the one thing we have decided not to compete for. The title says one thing, the only link pointing at it says another.

That reframes the label question. It is not "which word reads best in a nav bar". It is "the single most important anchor text on the site is currently wrong".

### Recommendation: **"Turn customers into fans"**

Against the three earlier options:

| Label | Clear to a stranger? | Anchor-text signal | Matches the destination H1? |
|---|---|---|---|
| Fan-Led Growth (today) | No, term not yet known | Actively wrong | No |
| How it works | Yes | None, semantically empty | Loosely |
| The Fan Engine | Yes but points elsewhere | Wrong page | No, H1 says "Turn your customers into fans" |
| **Turn customers into fans** | **Yes, no prior knowledge needed** | **Exactly the target query** | **Yes, verbatim** |

"How it works" was the right answer to the question as it was asked. It is not the right answer once anchor text is on the table: it is clear to a human but tells the crawler nothing, and this is the one link on the site that cannot afford to be silent.

"Turn customers into fans" is the only option that is simultaneously plain English to a first-time visitor, the exact query with demand, and a verbatim match for the destination page's H1. It also says what Laura does, which no other nav item currently does.

### The width problem, and how it resolves Speaking

"Turn customers into fans" is 24 characters against 4 to 8 for the other items. In a header carrying the brand, five links and a CTA, that is a real layout risk, not a hypothetical one.

Three outcomes, in order:
1. It fits. Ship it.
2. It crowds. Drop to **"Customers into fans"** (19 chars), which keeps the query core.
3. It still crowds. **Move Speaking to the footer.** That frees roughly the width needed.

This turns the open Speaking question from a pure taste call into a decision with a tiebreaker: if the nav needs the room, Speaking is the item to give it up, because it is the only nav item that does not sit on the hire-me path. Speaking already lives in the footer, so nothing is lost from the crawl.

Needs a visual check before shipping. Flagged.

---

## 2. Which page targets which query

The clean answer to "own the IP or own the sector". Neither is the acquisition play. One page per intent, no overlap:

| Page | Intent | Target query shape | Job |
|---|---|---|---|
| `/` | Navigational + commercial | "Laura Cordrey", "consultant who turns customers into fans" | Getting hired |
| `/fan-led-growth` | Informational | "how to turn customers into fans", "what is a superfan worth" | Getting found |
| `/fan-engine` | Branded / IP | "the Fan Engine", "fan-led growth methodology" | Getting remembered, then paid |
| `/services` | Commercial | "fan engagement consultant", "community strategy consultant" | Converting |
| `/work` | Evidence | brand-name queries (Ubisoft, BlaBlaCar, US Mobile) | Proving |
| `/faq` | Long-tail informational + AEO | question-shaped queries, answer-engine citation | Handling objections |

The cannibalisation risk between `/` and `/fan-led-growth` is real but manageable: the homepage carries **person plus service** (hire intent), the FLG page carries **how-to** (learn intent). Keep those framings distinct in the titles and they will not compete.

**"Fan-led growth" stays everywhere as branding.** It is distinctive, it is Laura's, and it is excellent said out loud on a stage. It is simply not an acquisition keyword, and the site should stop spending its strongest signals on it.

---

## 3. On-page issues

| Page | Issue | Severity | Fix |
|---|---|---|---|
| `/fan-led-growth` | **Orphan page.** Zero inbound internal links except the nav item. Verified by grep. | **Critical** | Add 3 to 4 body links (see §4) |
| `/fan-led-growth` | Only inbound anchor text is "Fan-Led Growth", the dead term | **Critical** | Change nav label + add query-shaped body anchors |
| `/` | Title targets "Fan-Led Growth Consultant", a term with no demand, from the site's highest-authority page | **High** | Retarget at the problem (see below) |
| `/` | Meta description leads with "builds fan-led growth" | **High** | Lead with the problem, keep the category as the second beat |
| `/fan-led-growth` | Slug says `fan-led-growth`, title/H1/schema all say "turn customers into fans" | Medium | **Leave it.** Slug is a weak factor; a rename costs a second 301 and resets the page's short history. Not worth it. |
| `/fan-led-growth` | "Superfan" appears twice on the page and in no heading, despite being the one adjacent term with real demand | Medium | Work it into one H2 or subhead |
| `/faq` and `/fan-led-growth` | Both emit FAQPage schema answering "What is fan-led growth?" with different answers | Low | Reword one, or drop it from the FLG set |
| `/about`, `/work`, `/services` | Titles all lead with "fan-led growth" | Low | Not urgent. These are not acquisition pages. Revisit after the two above land. |

### Proposed homepage meta

Current:
> `Laura Cordrey | Fan-Led Growth Consultant for Consumer Brands`

Proposed:
> `Laura Cordrey | I turn your customers into fans`
> *(46 chars, inside the 50 to 60 window)*

Description, current:
> "Laura Cordrey builds fan-led growth for consumer brands. Thirteen years turning customers into fans across Ubisoft, BlaBlaCar, US Mobile, Amazon Games."

Proposed:
> "Your customers are worth more than you're getting. I build the belonging and advocacy that turn them into fans, so they stay, spend more and bring others in. Thirteen years across Ubisoft, BlaBlaCar, US Mobile, Amazon Games."
> *(Lifted from the existing H1 lede, so it introduces no new claim. 222 chars, will truncate in SERP at ~160; the first sentence and a half carry it.)*

Both need Laura's sign-off on voice before shipping.

---

## 4. The orphan fix

Four inbound links, each with anchor text shaped like the target query. These are the highest-value edits in this document, because they fix both the crawl path and the anchor-text signal at once.

| From | Where | Suggested anchor |
|---|---|---|
| `/` | After the hero lede or in the services band | "how customers become fans" |
| `/fan-engine` | The close, next to the existing "See the case studies" link | "why fans grow a business" |
| `/services` | Intro, before the service cards | "turning customers into fans" |
| `/faq` | The "What is fan-led growth?" answer | "turn customers into fans" |

`/fan-led-growth` already links **out** well: to `/fan-engine` twice, `/work`, `/services`, `/fan-score`. It is a good hub with no roads leading to it. This is purely an inbound problem.

---

## 5. Technical SEO

| Check | Status | Detail |
|---|---|---|
| Prerendering | Pass | Playwright build-time snapshot per sitemap route, content plus meta plus JSON-LD |
| Canonical tags | Pass | Every page sets one via `useDocumentMeta` |
| XML sitemap | Pass | 19 URLs, all live routes, no redirect targets included |
| robots.txt | Pass | Unusually thorough. Explicit allow for every major AI crawler plus sitemap reference. |
| HTTPS | Pass | |
| Structured data | Pass | Person, Service, Article, FAQPage, DefinedTerm, BreadcrumbList. FAQPage shape verified correct (the `.map()` at `src/lib/seo.js:365` builds proper Question/acceptedAnswer nodes). |
| Redirects | Pass | `/methodology` → `/fan-engine`, `/case-studies*` → `/work*`, old tool slugs. True 301s via Netlify `_redirects`, plus SPA-side `Navigate` fallbacks. |
| Internal link graph | **Fail** | One orphan page, and it is the page with the target query |
| Duplicate FAQ schema | Warning | Same question, two answers, two pages |
| Image alt text | Not audited | Out of scope for this pass |
| Core Web Vitals | Not audited | Needs a live deploy to measure |

Technical foundations are in better shape than most consultancy sites. The link graph is the only real failure, and it is a content edit rather than an engineering one.

---

## 6. Prioritised action plan

### Quick wins (this week, roughly 2 to 3 hours total)

| Action | Impact | Effort | Depends on |
|---|---|---|---|
| Change nav label to "Turn customers into fans" | High | 15 min | Visual width check |
| Add four inbound links to `/fan-led-growth` | High | 45 min | Laura's sign-off on anchor wording |
| Retarget homepage title and description | High | 15 min | Voice sign-off |
| Decide Speaking: header or footer | Medium | 5 min | Falls out of the width check |
| Work "superfan" into an FLG H2 | Medium | 20 min | Voice sign-off |
| Deduplicate the "What is fan-led growth?" FAQ answer | Low | 15 min | |

### Strategic investments (this quarter)

| Action | Impact | Effort | Note |
|---|---|---|---|
| **Get Ahrefs or Semrush authorised** | High | 30 min | Everything here is SERP-inferred. One connected tool converts this from a well-argued hypothesis into a measured one. Highest-leverage single action in this document. |
| Verify prerender output on the Netlify production path | High | 1 hour | Confirmed on the Pages preview, never on prod. Blocked on the first manual deploy. |
| A dedicated "superfan" asset | Medium | Multi-day | The one adjacent term with real demand that does not collide with appliances or football. Confirm with volume data first. |
| Register the site in Google Search Console and watch which queries actually land | High | 1 hour | The only way to test whether the retargeting worked |
| Revisit `/about`, `/work`, `/services` titles | Low | 1 hour | After the two priority pages have had time to settle |

---

## What this does not tell you

- **No volume numbers.** "Turn customers into fans" is demonstrably a query people use (Forbes, Tony Robbins, Brittany Hodak's *Superfans*, *Fanocracy* and Pragmatic Institute all rank for it, and nobody writes for a query with no searchers). How *much* demand, and how hard it is to rank, are unmeasured.
- **No backlink data.** Domain authority, referring domains and competitor link profiles are all unaudited.
- **No competitor SEO comparison.** The earlier research established that nobody else in marketing uses "fan-led growth", which is the finding that matters, but there is no head-to-head benchmark here against the Hodak / Fanocracy / community-led-growth cluster.
- **No Core Web Vitals.** Needs a live production deploy first.

All four close with one connected SEO tool plus a deploy.
