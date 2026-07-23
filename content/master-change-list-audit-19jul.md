# Master change list — implementation audit (19 Jul 2026)

**What this is:** a read-only audit of the "MASTER change list" against the actual code,
followed by the batch that was then applied once Laura confirmed the decisions.

> **UPDATE — applied 19 Jul (repo confirmed: `~/laura-cordrey-site/laura-cordrey-site`
> on `website-rework`).** The following were applied and verified in the browser
> (hero, Section 2, close, Fan Score page — no console/build errors):
> - Terminology: "fan-powered" → "fan-led" (Fan Score page + FAQ); "bring the next wave"
>   → "bring you new customers" (Fan Value ×2, Methodology, About).
> - Tenure stragglers → "thirteen years" (homepage meta, Methodology, LogoBanner).
> - Homepage KPI card: "$32K in under three hours" + "streamer-led product launches".
> - Homepage **hero sub** → locked handover line; **Section 2** → own/rent opener +
>   locked FLG body (verbatim); "Growth you own, not rent" moved from hero to Section 2.
> - Homepage **close** → Fan Value primary ("See what your fans are worth →") + Let's talk
>   + Fan Score kept as a lowest-emphasis tertiary link (Laura's "both").
> - **About intro** rewrite (verbatim; kept "ten years ago" headline + "higher lifetime
>   value"). **Contact** service dropdown reordered (SOS · Fan Programs · Fan Moments ·
>   Fan Engine · Advisory · AI · Not sure).
> - Fan Score: intro escape-hatch link → Fan Value; result CTA reworded to
>   "See what your fans are worth →".
>
> **Name+question pairing (added 19 Jul, second pass):** applied the colon form at the two
> genuine cross-tool hand-offs — Fan Value page's "new here" bar now reads
> "Fan Score: how fan-led is your growth?"; Fan Score intro escape-hatch now reads
> "Fan Value: what your fans are worth?". Not forced onto each tool's own page (the H1 is
> already the question) or into the many "Take the 2-min Fan Score" CTAs (clear in context).
>
> **Still not applied:** Contact "one vs two working days"
> left as-is (only the hero/contact one-day lines exist; the confirmation/lede still say
> two — say the word and I'll unify). 8 files changed, **not committed, not pushed.**

**Original audit below (the pre-change snapshot):**

## Repo resolution (STILL OPEN #1) — audited against `website-rework`

There are **three** physical copies on disk, not two:

| Path | Branch | Last commit | Role |
|---|---|---|---|
| `~/AI Projects/laura-cordrey-site` (this session's folder) | `main` | 16 Jul | The "product-led growth" homepage rewrite. Stale-ish. |
| `~/laura-cordrey-site` | `main` | 11 Jul | Oldest; just a wrapper that contains the nested copy. |
| `~/laura-cordrey-site/laura-cordrey-site` | **`website-rework`** | **19 Jul (today)** | The copy the handoffs were written against; my notes flag it as the canonical Netlify checkout + active WIP. |

I audited **`~/laura-cordrey-site/laura-cordrey-site` on `website-rework`**. Evidence it's
the right one: the URL renames + 301s are already applied there, the tenure sweep is mostly
applied there, and it's the only copy committed today. **Please confirm this is the source
of truth before anyone applies edits.** (The main-repo copy still has the old
"You know product-led growth" Section 2.)

Legend: ✅ done · ❌ not done · 🟡 partial/different from spec · 🔵 needs your decision

---

## GLOBAL TERMINOLOGY

- ❌ **"fan-powered" → "fan-led"** — still "fan-powered" in `FaqPage.jsx:56` and ~13 spots
  across `FanAuditPage.jsx` (H1, lede, result labels, share text, splits, pre-launch copy).
- ❌ **"bring the next wave" → "bring you new customers"** — 4 spots remain:
  `FanValueModelPage.jsx:251, 385`; `MethodologyPage.jsx:75`; `AboutPage.jsx:221`.
- 🟡 **Azarus → "+80% MAU from streamer-led product launches"** — homepage KPI card still
  reads "from fan-focused product launches" (`HomePage.jsx:17`) ❌. Methodology proof row
  already says "streamer campaign" ✅; case-study data already "streamer-led" ✅.
- 🟡 **"$32K in 3 hrs" → "under three hours"** — case-study data, Methodology, Services,
  Work, meta all say "under three hours" ✅. Homepage KPI card still `unit: 'in 3 hrs'`
  (`HomePage.jsx:15`) ❌.
- 🟡 **Tenure "a decade" → "thirteen years"** — applied across hero, About, Work, Services,
  Speaking, Fan Score bio ✅. Still "a decade"/"ten years" in: `HomePage.jsx:75` meta
  ("A decade across Ubisoft…") ❌, `MethodologyPage.jsx:230` ("I have spent a decade") ❌,
  `LogoBanner.jsx:13` ("Ten years building this") ❌. About headline "wasn't a job ten
  years ago" (`AboutPage.jsx:153`) correctly **preserved** ✅.
- ✅ **Tagline "stay, pay, and bring more"** — verbatim in hero, methodology, FAQ.

## TOOL NAMING + URLs

- ✅ **URL renames** — `/fan-score` + `/fan-value` routes live; old slugs
  `/fan-led-growth-audit` and `/fan-led-growth-value-model` 301-redirect
  (`App.jsx:63-64` + `public/_redirects` with `301!`); `sitemap.xml` updated; no old
  internal links remain.
- ✅ **Visible "audit" → "Fan Score"** — tool is titled "The Fan Score"; bio says
  "This Fan Score is part of it." (Note: the *"fan-powered"* wording is a separate,
  still-open item above.)
- ❌ **Pair name + question at decision points** ("Fan Score: how fan-led is your growth?" /
  "Fan Value: what your fans are worth?") — not found in the code; appears not applied.

## HOMEPAGE

- 🔵 **Hero sub** — current text is a *different* rewrite ("You pay ads to bring customers
  in… Growth you own, not rent.", `HomePage.jsx:131`), **not** the spec'd
  "The customers you already paid for are worth far more…". Needs your call on which wins.
- ✅ **Hero microcopy** — "Every message comes straight to me, and I reply within one
  working day." (`HomePage.jsx:142`).
- 🟡🔵 **Section 2 (own/rent + LOCKED FLG body)** — own/rent framing + the product-led→
  fan-led framing are both present (`:189`, `:261`), but the **LOCKED verbatim body is not
  used** — line 189 is a condensed paraphrase. This is also STILL OPEN #2 (framing fork).
- ✅ **KPI cards kept (all four)** — but see $32K + Azarus wording above (❌ on homepage).
- ✅ **Fan Value "$560K a year" given weight** — bold red no-wrap focal number
  (`HomePage.jsx:233`).
- 🔵 **Homepage CLOSE** — **contradicts spec.** Spec: close leads with the Fan *Value*
  calculator ("See what your fans are worth →" primary + "Let's talk" secondary), Fan Score
  stays in the hero. Current close leads with **"Take the 2-min Fan Score →"** + "Let's
  talk" (`HomePage.jsx:450-456`). Needs your call.

## METHODOLOGY

- ✅ Azarus streamer-led (proof row).
- ❌ "bring the next wave" (`:75`).
- ❌ "a decade" → thirteen years (`:230`).
- ❌ Optional: "Rainbow Six Siege" on the 50M+ card — not added.

## ABOUT

- 🟡 Intro — "Thirteen years building fan-led growth" present (`:184`); the stay/pay/bring
  KPI remap not verified line-by-line — worth a visual check.
- ❌ "bring the next wave" in the gap section (`:221`).
- 🔵 OPEN toggles (STILL OPEN #3): "higher lifetime value" vs "more revenue from customers
  you have"; headline "ten years ago" vs "when I started".

## SERVICES

- ✅ **Advisory "what you get"** — applied verbatim (`ServicesPage.jsx:291`).

## FAN SCORE (quiz)

- ❌ "fan-powered" → "fan-led" (many spots).
- ✅ Bio — "…thirteen years… Ubisoft, Amazon Games and BlaBlaCar… acquired by Animoca…
  This Fan Score is part of it." (`FanAuditPage.jsx:220`).
- ❌ Intro escape hatch ("Prefer to skip to the numbers? See what your fans are worth →")
  — absent.
- 🟡 Result-screen primary into calculator — present but worded "See what closing this is
  worth →" (`:515`), not the spec'd "See what your fans are worth →".
- ✅ URL `/fan-score`.

## FAN VALUE (calculator)

- ❌ "bring the next wave" ×2 (`FanValueModelPage.jsx:251, 385`).
- ✅ URL `/fan-value`.

## FAQ

- ❌ "how fan-powered your growth is" → "how fan-led" (`FaqPage.jsx:56`).

## CONTACT

- ✅ "Every message comes straight to me… one working day." (`ContactPage.jsx:208`).
  ⚠️ Note: 4 other lines still say "two working days" (`:72, :139, :141, :142, :403`) —
  inconsistent, worth deciding whether to unify.
- ✅ Intent bucket "Growth & brand" → "Fan-led growth" (`:231`).
- ✅ Added "Fan Programs: I want my users bringing new customers" (`:50, :303`).
- ❌ **Dropdown reorder** — spec order is SOS · Fan Programs · Fan Moments · Fan Engine ·
  session · advisory · AI · Not sure. Current order is Fan Engine · SOS · Fan Programs ·
  Fan Moments · Advisory · AI · Not sure (`:301-307`). Fan Engine is first, not fourth.

## NAV

- ✅ Header order: Home · Services · Method · Work · AI · About + Fan Score
  (`Layout.jsx:12-18`).
- ✅ Logo is a clickable Home link (`:107`); "Home" kept.
- ✅ "Method" added; "Speaking" removed from header, kept in footer (`:31`); "AI" kept.
- 🟡 Fan Score as a *lighter secondary* button (not a 2nd filled red) — present as a
  separate nav item; worth a quick visual confirm of the button styling.
- ✅ "Work" label in nav + footer (`:15, :25`); Case Studies page eyebrow not verified.

---

## Shortlist of what's actually left to apply (if `website-rework` is confirmed)

**Straight find-and-replace (low risk):**
1. "fan-powered" → "fan-led" across `FanAuditPage.jsx` + `FaqPage.jsx`.
2. "bring the next wave" → "bring you new customers" ×4 (FanValue ×2, Methodology, About).
3. Homepage KPI card: Azarus label → "from streamer-led product launches"; `$32K` unit →
   "in under three hours" (or restructure the card).
4. Remaining tenure spots → "thirteen years" (Home meta `:75`, Methodology `:230`,
   LogoBanner `:13`).
5. Contact service dropdown reorder.
6. Fan Score intro escape-hatch link; align result-CTA wording if you want it verbatim.

**Needs your decision first:**
- Repo source of truth (confirm `website-rework`).
- Hero sub: keep current rewrite or swap to the spec'd version.
- Section 2: which framing wins + drop in the LOCKED body verbatim.
- Homepage CLOSE: keep Fan Score front-door, or switch to the Fan Value calculator per spec.
- About toggles (lifetime-value phrasing; headline wording).
- Name+question pairing at decision points — apply or drop.
- Contact "one vs two working days" consistency.
