# Laura Cordrey — Site Brief

The locked brief. North star for every decision. Update only deliberately.

## Positioning

**Senior strategic consultant.** Span: brand + product + community + growth.

NOT designer. NOT creative director. NOT agency. The work crosses tech, gaming and consumer — and the framing should never pigeonhole her into one service category. She is the strategist behind the work, not the executor of one craft.

Premium. Expensive. Personal. First-person voice throughout.

## Visual lineage

- **Dark editorial confidence** (Viper template energy — but stripped of designer/agency vocabulary)
- **Personal intimacy** (Osei template voice — three-identity intro, first-person bio)
- **Editorial/magazine spreads**, not card grids
- **Numbered case studies** `[01]` `[02]` `[03]` `[04]`
- **All-caps small markers** with diamond/dot separators
- **One strong accent colour** carrying the gesture
- **Tattoo-visible portrait** — the single biggest signal that this is her, not a polished template
- **NOT** clean girl. NOT Aesop minimalism. NOT pink/florals. NOT pretty for pretty's sake.

## Working palette

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#15110F` | Warm near-black background |
| `--surface` | `#EFE9DC` | Bone (inverted sections, cards) |
| `--ink` | `#EFE9DC` | Primary text on dark |
| `--ink-muted` | `#8A8078` | Body / supporting text |
| `--accent` | `#C8362B` | Editorial red — single gesture colour |
| `--edge` | `#D4C896` | Small marks, rules, mono labels |

## Typography rules

- **Two red treatments, two jobs.** The site has two ways to render red accent text — they're not interchangeable.
  - `<em className="accent">` → *italic red* → use for **phrase emphasis** in body copy and section titles. Example: HomePage hero (*"talk about"*), Methodology (*"Stage by stage"*).
  - `<mark>` → upright red → use for **named things, facts, stat highlights, and CTA closes**. Example: Delta (*"Delta Company"*, *"10M+ UGC views"*, *"just like it"*), US Mobile (*"$32.25K"*, *"Dark Star"*).
  - Rule of thumb: italic is a *tone*, mark is a *thing*. If you're emphasising a feeling, use `<em>`. If you're pointing at a noun/number, use `<mark>`.

- **Red punctuation rule.** When red text (`<em className="accent">` or `<mark>`) ends a sentence, the closing punctuation (period, question mark, exclamation) stays in the default ink colour — never red. Wrap the words but keep punctuation outside the red tag.
  - ✅ `<em className="accent">we should talk</em>.`  ✅ `Creating <mark>Delta Company</mark>.`
  - ❌ `<em className="accent">we should talk.</em>`  ❌ `Creating <mark>Delta Company.</mark>`
  - Why: the red is a *gesture* on the words, not on the punctuation. A red period reads as a stray dot; a white period closes the sentence cleanly.

- **Case-study card rule (work index + homepage grid).** Each case-study card follows the same shape so the /work index reads as one editorial set, not a patchwork.
  - **`company`** field: `Brand · Project` when the case study covers a specific named project (e.g. `Ubisoft · Delta Company`, `US Mobile · Dark Star`). Use just the brand only when the case study spans multiple projects under one brand.
  - **`hook`** field: two short clauses, descriptive, ending with periods — *what it was* + *when or outcome*. Not a stat-headline. Example: *"First-of-its-kind community advocacy program. Unveiled live on the E3 stage."* / *"Limited-edition $129 fan bundle. Sold out in three hours."*
  - **`media.image`** is the single source of truth — it doubles as both the article hero and the card thumbnail. Only add a `cardImage` override if the article hero genuinely can't function as a card (rare).
  - **`heroBackground: 'white'`** only when the image needs a light mat to read (e.g. a logo with no background of its own). Default is dark — most editorial-quality images sit better on the warm-black page colour.

- **Case-study spacing rule (vertical rhythm — symmetric dividers).** Every section/callout divider on a case study page has *balanced space above and below the hairline*. Reader's eye doesn't see "this divider has loads of space, this one has barely any."
  - **`.delta__section`** (numbered sections [01]–[0X]) → `padding-top: var(--space-8)`, `padding-bottom: var(--space-8)` (both 64px, symmetric), `border-top: 1px solid var(--hairline)`. The symmetry is the rule: same breathing room above and below each divider.
  - **`.delta__hero`** (full-bleed brand banner / key art) → `margin: 0`, edge-to-edge, bottom hairline. Sits flush against what's above and below — cinematic punctuation.
  - **`.delta__plate` / `.delta__brand-carousel` / `.delta__social-grid`** (floating visual moments inside the page flow) → `margin: var(--space-8) auto` by default. Same rhythm regardless of media type, so plates and carousels read as siblings.
  - **`.delta__result` / `.delta__ratio`** (callouts) → `margin: 0`, `padding: var(--space-8) 0` (matches section padding), dark bg, top + bottom hairlines. Callout padding *deliberately matches* section padding so callout→section dividers have the same 64px-above / 64px-below rhythm as section→section dividers.
  - **Contextual collapse rule for floats next to sections.** When a `.delta__plate` / `.delta__brand-carousel` / `.delta__social-grid` is *adjacent* to a `.delta__section`, the float's adjacent margin shrinks to `var(--space-5)` (24px — gives the caption breathing room) AND the section's adjacent padding-top shrinks to `var(--space-6)` (32px). Total gap ~56px, ~balanced. Applied via `:has()` and `+` adjacent-sibling selectors in `DeltaCompanyPage.css` — automatic, no per-page work needed.
  - **Do not** add custom margins / padding to override these defaults inside JSX. If a spacing rhythm feels off, fix it once in the shared CSS — not per-page.

- **Case-study kicker rule (cover header).** Each case-study page opens with a split-metadata band above the H1, inside the cover container.
  - **Left:** `Case study` (in red accent via `.delta__case-kicker`)
  - **Right:** `Brand · Year · Market` (e.g. `Ubisoft · 2020–2021 · Global`, `BlaBlaCar · 2013–2016 · United Kingdom`, `US Mobile · 2024 · USA`). Market is a quick scope signal — use `Global` for multi-region programs, country name for single-market work.
  - Both spans live inside a `.delta__case-meta` div (flex, `justify-content: space-between`).
  - The masthead bar *above* the cover should only contain the back link (`← All work`). No brand · year duplicate.
  - No `Vol. 0X` numbering — editorial flair that didn't earn its space. The metadata band tells the reader what kind of content and what era; the H1 tells them what specifically.
  - Date ranges use **en dashes, no spaces** (`2013–2016`), never em dashes or hyphens. Single years are bare (`2024`).

- **Em-dash rule: use sparingly.** The em-dash (—) is a tell of AI-generated prose when overused and flattens the rhythm. Default to **periods, semicolons, or shorter sentences** instead. A whole page should have one or two em-dashes at most, not one per paragraph. Specifically:
  - ❌ *"It was the cosplayers — the artists — the streamers — the video-makers — a whole universe."*
  - ✅ *"It was the cosplayers, the artists, the streamers, the video-makers. A whole universe."*
  - ❌ *"Scarcity wasn't a marketing trick — it was an operational constraint."*
  - ✅ *"Scarcity wasn't a marketing trick. It was an operational constraint."*
  - The em-dash is for **genuine dramatic shifts** mid-sentence, not for general phrase-joining. If a period works, use a period.

- **Stat row rule: 4 stats max.** Any horizontal stat row (like the case-study hero row) is capped at **4 items**. 4 divides cleanly into both desktop (4-col) and mobile (2×2) without leaving an orphan cell or breaking the editorial rhythm.
  - ✅ Hero row with 4 stats → 4-col desktop, 2×2 mobile.
  - ❌ 5+ stats in one row — leaves an orphan cell on mobile and squeezes labels at any width.
  - If you have a fifth (or further) stat that matters, **pull it out as its own banner callout** (the `.delta__ratio` or `.delta__result` patterns) — gives it more weight, not less.

## Working type

- **Display**: heavy/condensed sans — start with **Archivo Black** (Google, free). Upgrade path: PP Editorial New, GT America Condensed Black.
- **Body**: **Inter** — clean grotesque.
- **Marker**: **JetBrains Mono** — editorial labels, dates, vol numbers.

## Information architecture

1. **Home** — hero · work teasers · bio · services brief · testimonials · final CTA
2. **Work** (`/work`) — numbered case study index → article pages at `/work/:slug`
3. **About** (`/about`) — bio, range, voice
4. **Services** (`/services`) — what she does, retainer language, no fixed prices
5. **Insights** (`/insights`) — blog/articles — first-class, MDX-driven
6. **Methodology** (`/methodology`) — Fandom Flywheel, demoted to one page
7. **Contact** — Calendly link, no dedicated page

## Pricing

- Day rate + monthly retainer ranges
- Projects scoped on a call
- **No** fixed `$15k` / `$45k` tiers
- Whether rates are shown or gated: open decision

## Non-negotiables

1. First-class blog/insights — MDX from day one (this is why she left Osei)
2. Portrait that shows tattoos (visual signal of who she is)
3. Editorial confidence over prettiness
4. Free hosting (GitHub Pages now → custom domain when ready)
5. Clean repo: source only, no CVs/docs/prototypes in root

## What we carried over from the old repo

- `src/data/caseStudies.js` — four case studies (Ubisoft, US Mobile, BlaBlaCar, Azarus)
- `public/case-studies/` — seven hero images
- `src/hooks/useDocumentMeta.js` — per-route SEO hook
- `src/components/FlywheelDiagram.jsx` — animated SVG for methodology page

Everything else was left behind deliberately.

## What we explicitly are not building

- Prism / WebGL hero animation
- $15k / $45k pricing tiers
- "Fandom Flywheel™" as a brand or product (it's a methodology)
- Gold + teal palette
- Card-based agency layout language
