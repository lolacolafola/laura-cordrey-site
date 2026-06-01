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
