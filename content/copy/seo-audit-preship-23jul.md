# SEO / AEO audit before launch — 23 Jul 2026

Audited against the **built output** (`dist/`, 19 prerendered routes) rather than
the source, because the prerendered HTML is what a crawler is actually served.
Every number below was measured, not estimated.

## What this audit could not do

**No keyword volumes, difficulty scores, ranking positions or backlink data.**
No SEO tool is authorised in this session — Ahrefs and the other marketing
connectors need OAuth, which can't be completed from a non-interactive session.
Rather than invent numbers, this audit covers what is verifiable from the
artefact: technical SEO, meta, structured data, internal linking and
answer-engine readiness.

To get the keyword half, authorise Ahrefs (or Semrush) via the claude.ai
connector settings and re-run. Until then, treat any volume claim about
"fan-led growth" vs "turn customers into fans" as the reasoned positioning call
it already is, not as measured demand.

---

## Executive summary

**The technical foundation is genuinely strong** — stronger than most sites at
launch. Canonicals, meta, sitemap, prerendering, `robots.txt` and image `alt`
coverage all pass cleanly, and the AI-crawler allowlist is better than most
production sites ever get.

The problem is not what's broken. It's **what was built and never switched on.**

Three top priorities:

1. **Three JSON-LD builders are written and never called.** `caseStudyJsonLd`,
   `methodologyJsonLd` and `breadcrumbJsonLd` are complete, sophisticated
   functions in `src/lib/seo.js` that no page imports. The result: the seven
   case studies — the site's proof — emit no page-specific schema at all, and
   `/fan-engine` emits no `DefinedTerm` for the method it exists to define.
2. **`/faq` has zero in-body inbound links.** The site's single best
   answer-engine asset is reachable only from the footer.
3. **55+ case-study images carry `alt=""`.** Not decorative — this is the proof
   imagery, on the proof pages.

Overall: **strong foundation, significant unrealised value.** Nothing here
blocks launch. All of it is worth doing before the site is promoted.

---

## 1. Structured data — the big one

### 1a. Three builders exist and are never called 🔴

| Builder | Lines | Called from | Emits |
|---|---|---|---|
| `authorJsonLd` | ~20 | HomePage, AboutPage | Person |
| `workIndexJsonLd` | ~30 | WorkPage | CollectionPage + ItemList |
| `serviceJsonLd` | ~35 | ServicesPage | ProfessionalService |
| `fanLedGrowthJsonLd` | ~80 | FanLedGrowthPage | DefinedTerm + WebPage + FAQPage |
| **`caseStudyJsonLd`** | **~97** | **nowhere** | Article + Organization + FAQ |
| **`methodologyJsonLd`** | **~60** | **nowhere** | DefinedTerm + HowTo |
| **`breadcrumbJsonLd`** | **~12** | **nowhere** | BreadcrumbList |

What each unused one would have done:

**`caseStudyJsonLd`** is not a stub. It emits an `Article` with the client
prepended as a structured `Organization` so the case file is entity-linked to
the brand, and a per-engagement author whose `jobTitle` reflects Laura's actual
role on that project. Its own comment states the intent: *"so LLMs can answer
'what was Laura's role at [client]?' from structured data, not prose
inference."* That is exactly the AEO job the site is trying to do, fully built,
switched off.

**`methodologyJsonLd`** emits the `DefinedTerm` anchoring the Fan Engine™ as a
named methodology, plus a `HowTo` over the five stages. `/fan-engine` currently
emits neither. Worth noting: the trademark pass earlier today corrected the ™
inside this builder — those edits are correct but currently ship nothing.

**`breadcrumbJsonLd`** matters most for the case studies, which are the only
two-level routes on the site (`/work/<slug>`) and the only ones where a
breadcrumb trail would appear in results.

**Current state, measured across all 19 routes:**

| Route | Page-specific schema |
|---|---|
| `/fan-led-growth` | DefinedTerm, WebPage, FAQPage |
| `/faq` | FAQPage |
| `/services` | ProfessionalService |
| `/work` | CollectionPage, ItemList |
| `/about` | AboutPage |
| **the 7 `/work/*` case studies** | **none** |
| **`/fan-engine`** | **none** |
| `/ai`, `/contact`, `/speaking`, `/fan-score`, `/fan-value` | none |

Nine of nineteen routes carry no page-specific structured data.

### 1b. The Person block on all 19 pages is leaked, not intentional 🟡

Every page carries an identical `Person` block, including the eleven that never
call `authorJsonLd`. That is not a site-wide schema decision — it is a
prerenderer artefact, and the mechanism is worth understanding because it can
bite harder later.

`scripts/prerender.mjs` walks the sitemap in order. `/` is **first**, and it
writes its snapshot to `dist/index.html` (line 140: `route === '/' ? DIST : …`).
That same file is the static server's SPA fallback (line 63:
`existsSync(nested) ? nested : join(DIST, 'index.html')`). So every route
prerendered *after* the homepage loads a shell that already has the homepage's
JSON-LD baked in — and `useDocumentMeta` **appends** its block rather than
replacing what's in the served HTML, so the snapshot captures both.

Right now the leaked block is Laura's `Person`, which is harmless and arguably
desirable site-wide. **The risk is what happens next:** the moment anything
page-specific is added to the homepage's schema — a `WebSite`, an
`Organization`, a homepage-only FAQ — it will silently appear on all eighteen
other routes.

Cleanest fix, one line in `useDocumentMeta`: before appending, remove any
existing `script[data-route-json-ld]` from the document. The attribute is
already being set (line 65), so the hook can find and clear a stale one. That
also hardens client-side navigation. Alternatively, prerender `/` last.

---

## 2. Internal linking

Measured with the header, `<nav>` and `<footer>` stripped, so these are genuine
in-body editorial links.

| Route | In-body inbound | From |
|---|---|---|
| **`/faq`** | **0** | **nowhere — footer only** |
| `/` | 0 | (homepage; reached via logo/nav — not a real gap) |
| `/about` | 1 | `/` |
| `/work/blablacar-storytelling` | 1 | `/work` |
| `/work/ubisoft-siege-champions` | 1 | `/work` |
| `/ai` | 2 | `/fan-engine`, `/services` |
| `/fan-engine` | 2 | `/fan-led-growth`, `/services` |
| `/fan-led-growth` | 2 | `/fan-engine`, `/faq` |
| `/services` | 3 | `/ai`, `/fan-led-growth`, `/` |
| `/fan-value` | 4 | `/fan-led-growth`, `/fan-score`, `/`, `/services` |
| `/fan-score` | 6 | four pages |
| `/work` | 12 | broad |
| `/contact` | 15 | broad |

**`/faq` is the finding.** It carries `FAQPage` schema and twelve direct
answers — it is the most citable page on the site for an answer engine — and
nothing in any body copy points at it. Two natural homes: the `/services` page
(objections handled before the call is literally the page's stated second job)
and `/contact` (someone hesitating before the form). Both are one-line additions.

**Good news:** the previously-flagged issue that `/fan-led-growth` had no
internal links except the nav is **resolved** — it now has two in-body inbound
links, from `/fan-engine` and `/faq`.

`/about` at a single inbound link is thin for a consultancy where the person
*is* the product, but it is in the nav and gets the homepage link, so this is a
nice-to-have rather than a gap.

---

## 3. Image alt text 🟡

**Zero images are missing the `alt` attribute** — that part is clean. But 68
carry `alt=""`, and they split into two very different groups:

**Legitimately decorative (13) — leave alone.** The YouTube thumbnails on
`/speaking` and `/about` sit inside a `<button>` that already carries
`aria-label={`Play: ${headline}`}`. An empty alt is correct; giving them alt
text would double-announce.

**Content images wrongly marked decorative (55) — fix.** Every image on the
seven case-study pages:

| Page | Images with `alt=""` |
|---|---|
| `/work/ubisoft-delta-company` | 16 |
| `/work/ubisoft-siege-champions` | 16 |
| `/work/blablacar-storytelling` | 9 |
| `/work/azarus` | 5 |
| `/work/claw-mobile` | 5 |
| `/work/us-mobile-dark-star` | 4 |

These are files like `05-laura-e3-stage.jpg`,
`ubisoft-siege-champions-program-banner.png` and `us-mobile-vip-landing.png` —
the actual evidence on the actual proof pages, invisible to image search and to
any answer engine reading the page.

**This is a content job, not a one-line fix.** The source is
`CaseStudyCinematic.jsx:375`, which hardcodes `alt=""` — but the cinematic data
has **no `alt` field at all** (69 `src:`, 32 `caption:`, 0 `alt:`). So the fix
is: add `alt` to the data, then pass `rw.alt` through the component. The 32
existing captions are a useful starting point but are not a substitute — a
caption says why the image matters, alt says what it shows.

---

## 4. Technical checklist

| Check | Status | Detail |
|---|---|---|
| Sitemap present and complete | ✅ Pass | 19 URLs, exactly matching the 19 prerendered routes |
| `robots.txt` | ✅ Pass | Sitemap declared; explicit allows for GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot and 12 more |
| Prerendering | ✅ Pass | 19/19 routes snapshot to static HTML with content, meta and schema |
| Canonicals | ✅ Pass | All 19 absolute and self-referencing (7 were relative before today's fix) |
| Title uniqueness | ✅ Pass | 19/19 unique |
| Title length | ✅ Pass | All ≤60 chars (6 were 65–86 before today's fix) |
| Description uniqueness | ✅ Pass | 19/19 unique |
| Description length | ✅ Pass | All ≤160 |
| One `<h1>` per page | ✅ Pass | Exactly one on all 19 |
| `og:image` / `twitter:card` | ✅ Pass | Present on all 19 |
| `lang` attribute | ✅ Pass | `en` on all 19 |
| Images with `alt` attribute | ✅ Pass | 0 missing |
| HTTPS / mixed content | ✅ Pass | All internal refs root-relative or absolute HTTPS |
| `noindex` leakage | ✅ Pass | None on any indexable route |
| JSON-LD validity | ✅ Pass | Every block parses |
| **Structured data coverage** | ⚠️ Warning | 9/19 routes carry no page-specific schema |
| **Schema leakage via prerender shell** | ⚠️ Warning | Homepage JSON-LD inherited by 18 routes |
| **`/faq` internal links** | ⚠️ Warning | Zero in-body inbound |
| **Case-study image alt** | ⚠️ Warning | 55 content images marked decorative |
| Thin content | ⚠️ Warning | `/contact` 160 words, `/fan-score` 177, `/work` 261 |

### On thin content

`/contact` (160) and `/fan-score` (177) are thin by word count but that is
correct — one is a form, the other an interactive quiz whose content lives
behind JS state. Neither is a ranking target. **`/work` at 261 words is the one
worth attention:** it is a category page for seven case studies, it has twelve
in-body inbound links, and it is the natural landing page for anyone searching
for proof. A short framing paragraph per case (or even per client) would give it
something to rank on.

### On `/faq` heading structure

`/faq` reports zero `<h2>` elements because the questions are `<dt>` inside a
`<dl>`. That is semantically correct for a definition list and it carries valid
`FAQPage` schema, so answer engines have a clean parse either way. No change
needed — noted only so it isn't mistaken for a missing-heading bug on a re-audit.

---

## Prioritised action plan

### Quick wins (under 2 hours each)

1. **Link `/faq` from `/services` and `/contact`.** Two one-line additions.
   Impact: high — makes the most citable page on the site reachable by readers
   and by crawlers following editorial links, not just the footer.
2. **Wire `methodologyJsonLd` into `/fan-engine`.** The builder is written and
   the stages array it needs is already in that file. Impact: high — it is the
   `DefinedTerm` that anchors the trademarked method, on the page that defines
   it.
3. **Stop the prerender schema leak.** One line in `useDocumentMeta` to clear a
   stale `[data-route-json-ld]` before appending. Impact: medium now, high as
   insurance against a future homepage schema change silently polluting 18
   routes.
4. **Add a framing paragraph to `/work`.** Impact: medium.

### Strategic (this quarter)

5. **Wire `caseStudyJsonLd` into the seven case studies.** Impact: high, effort
   moderate — the builder is done, but each page needs its `about`, `keywords`,
   `client`, `role`, `market` and `sector` values supplied. This is the single
   biggest AEO gain available, because it turns seven proof pages into
   entity-linked `Article`s that name the client organisation and Laura's role.
6. **Write alt text for 55 case-study images.** Impact: medium-high, effort
   moderate. Add `alt` to the cinematic data, pass `rw.alt` at
   `CaseStudyCinematic.jsx:375`. Do it alongside #5 — same files, same sitting.
7. **Add `breadcrumbJsonLd` to the case studies.** Impact: medium, effort low
   once #5 is done.
8. **Authorise an SEO tool and re-run the keyword half.** Everything above is
   the supply side. None of it tells you what people actually search for, which
   is the one question this audit could not answer.

---

## What is genuinely good here

Worth stating plainly, because pre-launch audits tend to read as a list of sins:

- **The AI-crawler allowlist is better than most production sites.** Explicit
  allows for 20+ agents across OpenAI, Anthropic, Google, Microsoft, Meta,
  Apple, Perplexity, Mistral, Cohere and Common Crawl, with the intent
  documented in comments.
- **Build-time prerendering on a React SPA**, verified at 19/19 routes with real
  content, per-page meta and per-page schema in the static HTML. This is the
  thing most React marketing sites get wrong and it is done properly here.
- **Meta hygiene is clean across the board** after today's fixes: unique,
  in-window titles and descriptions on every route, absolute self-referencing
  canonicals, `og:image` and `twitter:card` everywhere.
- **Zero images missing an `alt` attribute.** The problem is 55 wrong values,
  not missing ones — a much better place to start from.
