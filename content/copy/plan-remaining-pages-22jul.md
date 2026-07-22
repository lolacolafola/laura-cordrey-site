# Plan: the remaining pages, and which ones should exist

**Written:** 22 Jul 2026
**Follows:** `audit-four-pages-22jul.md` (the measurements) and
`handover-services-weight-23jul.md` (where /services got to)
**Status:** proposal. Three decisions are Laura's and are marked as such.

---

## The site as it stands

Thirteen routes plus seven case studies. Inbound internal links, counted from
`src/` excluding the header and footer, which link to almost everything and so
tell you nothing about whether a page is really part of the site:

| Page | Body links in | In header nav | Job it does |
|---|---|---|---|
| `/` | n/a | brand | |
| `/work` | 9 | yes | the proof |
| `/fan-score` | 5 | no | the diagnostic, the site-wide CTA |
| `/fan-value` | 5 | no | the model |
| `/speaking` | 4 | yes | second product |
| `/fan-led-growth` | 3 | yes | the problem |
| `/services` | 3 | yes | the offer |
| `/fan-engine` | 2 | no | the method |
| `/ai` | 2 | no | a segment bet |
| `/about` | **1** | yes | the trust |
| `/faq` | **0** | no | informational catch |

**The "too much" feeling is real and it is measurable.** Four pages sit on two
or fewer inbound links. Two of those, `/about` and `/faq`, are reachable in
practice only from the chrome. A page nothing links to is a page nothing needs.

But note what the table also says: the two pages Laura is questioning most,
`/about` and `/ai`, are questioned for *opposite* reasons. `/about` is
under-linked but does a job nothing else can. `/ai` is well-formed but does a
job that is not yet earned.

---

## The three open decisions

### 1. `/fan-engine` and SEO: the instinct is backwards

Laura's read is "I think for SEO I need to keep that one." Keep it, but not for
that reason, because the reason does not hold.

`/fan-engine` targets **"The Fan Engine"**, which is a trademark only Laura
uses. Its title tag is `The Fan Engine · The method · Laura Cordrey`. Nobody
searches a term they have not heard, so the page cannot earn search traffic
from people who do not already know her. Its traffic will always be people
already on the site.

The page that earns search is **`/fan-led-growth`**. The 20 Jul SEO audit names
it directly: "what is fan-led growth" is a coined term with **zero competing
definitions**, and the audit lists owning that definition as a quick win, half
a day of work, still open.

So the correct split is:

- **`/fan-led-growth`** is the SEO page. It should be built and maintained to
  answer the query and deserve the ranking. It cannot go thin.
- **`/fan-engine`** is the credibility page. Its job is to show the method is
  real and systematic, which is what makes a senior rate defensible. It is
  reached from `/services` by someone already considering buying.

**Recommendation: keep `/fan-engine`, stop treating it as an SEO asset.** That
also frees it to be shorter, because it no longer has to answer a search query.

### 2. `/ai`: keep the URL, stop treating it as a site page

The page says, in its own words, that Laura has not run this inside an AI
company and will not pretend otherwise, and offers founding-partner terms.
That honesty is good copy and it is the right position to take. It is also the
whole problem: **808 words, the longest of the four remaining pages, spent on
the one claim with no proof behind it**, on a page with two inbound links.

The rest of the site's power is "ran this at Ubisoft scale." `/ai` is the one
page that opens by conceding it has not.

The fork depends on a fact only Laura has:

- **If she is actively pitching AI companies now:** keep the URL, cut it to
  roughly 350 words, and treat it as a link sent into a conversation rather
  than a page browsed from the footer. Take it out of the footer nav. A pitch
  asset does not need to compete for attention on the site.
- **If AI is a "maybe one day":** cut it. Revisit when there is an AI case
  study to put on it, at which point it writes itself.

**Recommendation: the first, unless she says otherwise.** The URL costs nothing
and the segment is real and well funded. What costs something is 808 words of
site surface carrying the least-proven claim.

### 3. `/about`: keep, and cut it roughly in half

Argued in full in the previous turn. Short version: for a solo consultancy the
buyer's deciding question is "who is this and has she actually done it," and no
other page answers it. `/about` is usually the last page read before someone
emails, not the first.

It is also the worst page on the site right now: **7,480px for 690 words**,
against `/services` at 4,005px for 984. Eight sections. All five of its
headings compute to the same 76.8px at weight 800, so the hero-to-section ratio
is 1.00, the exact bug fixed on `/services`.

Two structural moves, both of which pay twice:

- **Move the manifesto ("Paid is a discipline. Fandom isn't a mood.") to
  `/fan-led-growth`.** It is an argument, not a biography, and it belongs on
  the page whose job is the argument. That page is also the SEO page from
  decision 1, and it currently has three inbound links, so it needs the weight.
- **Compress the three story beats.** They are case-study content that `/work`
  already owns across nine inbound links and seven dedicated pages. One beat
  plus a proof row linking out does the same work in a fifth of the height.

### 4. `/speaking` out of the header nav, page stays

Also argued last turn. It is a second product for a second buyer, and it is the
one nav item that leads away from the money. It keeps four inbound body links
plus the footer, and if `/about` keeps its speaking teaser it keeps its best
route in.

Header nav goes from five items to four: **Why fans · Work · Services · About.**

**The risk, which is Laura's to weigh:** if speaking is a revenue line she wants
to grow rather than maintain, removing it from the nav will cut its traffic.

---

## What that leaves

Thirteen routes becomes twelve, or eleven if `/ai` goes. More usefully, the
pages sort into three tiers with different standards:

**Tier 1, the sales path.** In the nav, held to the highest standard.
`/` · `/fan-led-growth` · `/work` · `/services` · `/about` · `/contact`

**Tier 2, the IP layer.** Reached from Services by someone already interested.
Allowed to be shorter, because they are not answering search queries.
`/fan-engine` · `/fan-score` · `/fan-value`

**Tier 3, sent not browsed.** Reachable, not competing for attention.
`/speaking` · `/ai` · `/faq`

`/faq` has zero inbound body links and should get at least one real one. It
carries the FAQPage schema, so it is cheap to keep and earns its place in
informational search, but nothing on the site currently points at it.

---

## Sequencing

**Structure before type.** There is no point restyling a section that is about
to be deleted, and the `/about` cut is large enough that doing it the other way
round wastes most of the styling work.

| | Step | Depends on | Risk |
|---|---|---|---|
| 1 | Nav change: `/speaking` out, four items | decision 4 | none |
| 2 | `/about` cut: manifesto moves to `/fan-led-growth`, story beats compress | decision 3 | SEO, see below |
| 3 | `/ai` cut to ~350 words, or delete | decision 2 | low |
| 4 | Type + contrast rebuild across all four survivors, one pass | steps 1 to 3 | none |
| 5 | Re-measure, rebuild, verify 19/19 routes | | |

Step 4 is the pass already fully measured in `audit-four-pages-22jul.md`. It is
mechanical, it touches no copy and no structure, and it can therefore not break
SEO. It is the fast part. Steps 2 and 3 are where the judgement is.

**The SEO constraint on step 2**, carried forward from
`handover-shorten-pages-without-breaking-seo.md` and still live: moving copy
onto `/fan-led-growth` means the FAQPage schema in `src/lib/seo.js` has to be
re-verified against the built HTML **in the same pass**. That schema drifted
once already, when five of six answers were left quoting old page copy, and it
was caught only by checking the built output. Do not skip it.

Verification after any of this:

```bash
npm run build
```

Must report 19/19 routes snapshotted, and the count drops by one per route
removed, which is the check that a deletion actually landed.
