# Handover: shorten the pages without breaking the SEO

**Written:** 22 Jul 2026
**For:** a fresh chat starting the copy-reduction work
**Repo:** `/Users/laura/AI Projects/laura-cordrey-site`, branch `main`, clean at commit `e29642d`

Read this before touching any page copy. It exists because the SEO work landed the same day and a normal "make it shorter" pass would quietly undo parts of it.

---

## The job

Laura wants the pages shorter. Her words, from an earlier session: *"the website feels too heavy."*

The heaviness is not the homepage. It is that every click off the homepage lands somewhere one and a half to two and a half times heavier.

## Current word counts

Measured from the built HTML in `dist/` on 22 Jul, after the SEO commit. Each figure includes about 35 words of nav and footer chrome, so treat them as comparative rather than absolute.

| Page | Words | Type |
|---|---|---|
| **`/services`** | **1272** | commercial |
| `/faq` | 849 | informational |
| `/ai` | 818 | commercial |
| `/about` | 774 | trust |
| `/fan-led-growth` | 744 | **informational, the search target** |
| `/fan-value` | 717 | tool |
| `/fan-engine` | 701 | explanation |
| `/` | 541 | entry |
| `/speaking` | 401 | commercial |
| `/work` | 302 | index |

Case studies run 511 to 909 and are mostly fine: long-form is what that format is for.

**Start with `/services`.** It is the biggest page by 400 words, the closest to money, and the worst ratio of length to job. It is also the safest to cut, for the reason in the next section.

---

## The single most important thing to understand

**Word count is not a ranking factor.** Google does not reward long pages. You can cut hard without an SEO penalty.

What *is* a risk is thin content on a page that answers an informational query, because the page has to actually answer the question to be worth ranking. That splits the site in two:

**Cut freely (commercial and navigational pages).** `/services`, `/ai`, `/speaking`, `/about`, `/work`. These are found by people who already know who Laura is, or reached via internal links. Length buys them nothing. `/services` at 1272 words is pure cost.

**Cut carefully (informational pages).** `/fan-led-growth` and `/faq`. These are the only two pages doing acquisition work, answering questions strangers actually type. Tightening the prose is fine. Removing the substance that answers the question is not. I would not take `/fan-led-growth` below about 550 words of real content.

**`/fan-engine` sits in the middle.** Nobody searches "Fan Engine" (it is Laura's trademark), so it has no search job at all. Its only reader arrives from `/fan-led-growth`. Cut it on readability grounds alone.

---

## Hard constraints. Do not break these.

### 1. The four inbound links to `/fan-led-growth`

That page had **zero** inbound internal links until 22 Jul, which made the one page with a real chance of being found the least-linked page on the site. Four were added. **If a rewrite deletes the paragraph one lives in, the link must be re-placed, not dropped.**

| File | Anchor text |
|---|---|
| `src/pages/HomePage.jsx` (under the services band) | "How customers become fans" |
| `src/pages/MethodologyPage.jsx` (proofstrip) | "Why fans grow a business" |
| `src/pages/ServicesPage.jsx` (hero) | "how customers become fans" |
| `src/pages/FaqPage.jsx` (first answer, `more` field) | "How customers become fans" |

The wording matters as much as the link. Anchor text tells Google what the destination is about, and every one of these is phrased like the query the page targets. Do not rewrite them to "learn more" or "read on".

Verify after any edit:
```bash
grep -rn "fan-led-growth" src --include="*.jsx" | grep "Link to\|more: {"
```

### 2. FAQ answers are shared with the schema

In both `src/pages/FaqPage.jsx` and `fanLedGrowthJsonLd()` in `src/lib/seo.js`, the answer strings are used **twice**: once rendered on the page, once emitted as FAQPage JSON-LD.

Schema must reflect what is on the page. **If you shorten a visible FAQ answer, the schema shortens with it automatically, which is correct. But if you shorten one and not the other, the schema is non-compliant.** This is why the `/faq` "read more" link is a separate `more` field rather than an inline link inside the answer string: it keeps the two from drifting.

### 3. Meta titles and descriptions

Titles ≤ 60 characters. Descriptions ≤ 160. **Count them in a script, not by eye.** Laura had already sized the whole site correctly and will spot an over-long one.

```bash
python3 -c "print(len('''<paste here>'''))"
```

Currently all descriptions are compliant. Ten titles run over 60, nearly all case studies using the `Client · Result · Laura Cordrey` pattern. **Leave those.** They rank on brand-name searches and the client name sits at the front where it survives truncation.

### 4. Do not retarget `/fan-led-growth`

Its title ("How to turn customers into fans"), H1 ("Turn your customers into fans") and DefinedTerm schema are deliberate and recent. "Fan-led growth" has no commercial search demand and a SERP owned by LED ceiling fans and the UK football fan-led review. The page is aimed at the problem people actually search for. Full reasoning in [seo-audit-nav-and-targeting-22jul.md](seo-audit-nav-and-targeting-22jul.md).

**Keep "fan-led growth" everywhere as branding.** It is distinctive and it is Laura's. It is just not a keyword. The homepage eyebrow uses it and should stay: it sits directly above an H1 that explains it.

### 5. The research proof on `/fan-led-growth`

The band citing Bain, Nielsen, HBR and Wharton (fans stay 2 to 3x longer, spend 66 to 80% more, refer around 4x more often) is load-bearing. It is the only hard evidence on the page and it feeds the FAQPage schema. **Never invent, round or restate a number.** If a claim needs checking, flag it rather than adjusting it.

### 6. Repo rules that catch people out

- **Save drafts as files** in `content/copy/`, versioned, never only in chat. See `CLAUDE.md`.
- **Commits need author *and* committer** set to the noreply address in one command:
  `git -c user.name="Laura Cordrey" -c user.email="261253710+lolacolafola@users.noreply.github.com" commit -m "..."`
- **Never push or deploy without asking.** Netlify auto-build is off, so pushes are free, but deploys cost credits and are Laura's call.
- **Do not touch** `postLead`, the scoring logic, or the Fan Value maths. Hand-calibrated. UI is fine, the compute is not.
- **Type scale:** import from `src/lib/scale.js` and use `components/Eyebrow.jsx`. Never redeclare per page; it drifted once and broke a page's hierarchy.
- **Hover honesty:** if it moves under the cursor, clicking it must do something. `:hover` motion belongs only on `<a>` and `<button>`.

---

## Suggested approach for `/services`

Not prescriptive, but this is where the earlier analysis landed. The page is 1272 words because it carries full depth on five offers with no skim layer. The suggested fix was **a skim layer of roughly 80 words over the existing depth** rather than deleting the depth: someone comparing offers needs the detail, someone orienting needs to not drown in it.

Worth checking against `content/copy/services-v2-apply-proposal.md`, an existing uncommitted draft that may already cover some of this.

---

## How to verify any change

```bash
npm run build
```

This runs Vite plus `scripts/prerender.mjs`, which snapshots all 19 sitemap routes to static HTML. It must report **19/19 routes snapshotted**.

Then check what a crawler actually receives, not just the source:

```bash
grep -o '<title>[^<]*</title>' dist/index.html
grep -c 'href="/fan-led-growth"' dist/index.html dist/services/index.html dist/fan-engine/index.html dist/faq/index.html
```

Each of those four should return **2**: one nav link plus one body link. If any returns 1, a rewrite dropped an inbound link.

To see it running, use the preview tools rather than Bash. There is a `vite-dev` config in `.claude/launch.json` with `autoPort` enabled, because another session sometimes holds port 5173.

---

## Open items not in scope here

1. **No measurement.** No SEO tool is authorised and Google Search Console status is unknown. Nobody can tell whether any of this worked until that changes.
2. **Not deployed.** Everything through `e29642d` sits on `main` undeployed. One manual Netlify deploy outstanding.
3. **£ currency on `/contact`** speaker-budget dropdown while Laura targets US customers. She has parked it, deliberately.
