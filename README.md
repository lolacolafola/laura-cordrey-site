# lauracordrey.com

Personal site for Laura Cordrey — fan-led growth for fan-driven brands. A fast,
content-forward marketing site with two interactive tools (Fan Score, Fan Value)
and a set of cinematic case studies.

- **Production:** https://lauracordrey.com (Netlify, built from `main`)
- **Free preview:** https://lolacolafola.github.io/laura-cordrey-site/ (GitHub Pages, built from `website-rework`)

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | **React 19** |
| Build tool | **Vite 8** (`@vitejs/plugin-react`) |
| Routing | **React Router 7** (`BrowserRouter`) |
| Content | **MDX** (`@mdx-js/rollup` + gray-matter/remark frontmatter) for long-form articles |
| Graphics | **OGL** (lightweight WebGL) for ambient shader backgrounds |
| Styling | Plain CSS with design tokens (`src/styles/tokens.css`); no CSS framework |
| Prerender | **Playwright** (headless Chromium) — see [Build & prerender](#build--prerender) |
| Forms | **Netlify Forms** (contact + Fan Score lead capture) |
| Hosting | Netlify (prod) · GitHub Pages (preview) |

Single typeface throughout: **Manrope** (loaded from Google Fonts).

---

## Project structure

```
.
├── index.html                # App shell + static <head> meta + hidden Netlify form defs
├── vite.config.js            # Vite + MDX config; base path via VITE_BASE (default '/')
├── netlify.toml              # Production build config (Netlify)
├── scripts/
│   └── prerender.mjs         # Build-time static-HTML snapshots (see below)
├── public/                   # Copied verbatim to dist/
│   ├── robots.txt            # Explicitly allows major AI/answer-engine crawlers
│   ├── sitemap.xml           # Canonical URL list — also drives the prerender
│   ├── _redirects            # Netlify: tool-slug 301s + SPA fallback
│   ├── og-image.jpg          # 1200×630 social share card
│   └── ...                   # logos, case-study media, favicon
└── src/
    ├── main.jsx              # Entry: mounts <App> in BrowserRouter (basename = Vite BASE)
    ├── App.jsx               # All routes
    ├── pages/                # One component per route (19)
    ├── components/           # Layout, nav/footer, ScrollToTop, shared UI, shaders (9)
    ├── data/                 # caseStudies*.js, speaking.js — content as data
    ├── hooks/
    │   └── useDocumentMeta.js  # Per-route <title>/meta/canonical/OG + JSON-LD
    ├── lib/
    │   ├── seo.js            # Canonical URLs + JSON-LD schema builders
    │   └── forms.js          # Netlify Forms submission helper
    └── styles/               # tokens.css (design tokens) + base.css + shared.css
```

`dist/` is the build output and is git-ignored — never commit it.

---

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `vite build` **then** prerender (writes static HTML per route) |
| `npm run build:spa` | `vite build` only — skip prerender (the plain SPA) |
| `npm run prerender` | Run the prerender step against an existing `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | ESLint |

---

## Build & prerender

The app is a client-rendered SPA, so the raw HTML a crawler downloads would
otherwise contain an empty `<div id="root">`. Search engines that execute
JavaScript (Googlebot) cope, but most **AI answer-engine crawlers**
(GPTBot, ClaudeBot, PerplexityBot, CCBot, …) read raw HTML and would see nothing.

`scripts/prerender.mjs` fixes this. After `vite build`, it:

1. serves the built `dist/` on a local port (honouring `VITE_BASE`, with SPA fallback);
2. launches **headless Chromium via Playwright** (installing it on first run if needed);
3. visits **every route in `sitemap.xml`**, waits for the app to render, and lets
   `useDocumentMeta` inject the page's `<title>`/meta/canonical/OG/JSON-LD;
4. writes the rendered HTML to `dist/<route>/index.html`.

Each snapshot therefore ships the full body copy **and** the correct per-page
`<head>` metadata and structured data.

**Key properties**

- **Additive & non-destructive.** `src/main.jsx` is unchanged — on load React
  re-renders over the snapshot, so behaviour for human visitors is identical
  (and client-side navigation still works).
- **Resilient.** If a browser can't be launched in a build environment, the step
  logs a warning and exits `0`. A prerender problem can **never** fail a deploy —
  the worst case is the previous SPA behaviour.
- **Single source of truth.** Add a route to `sitemap.xml` and it gets prerendered.

Both CI paths install Chromium before building: GitHub Actions via
`npx playwright install --with-deps chromium` (see the workflow), Netlify via the
resilient in-script install with `PLAYWRIGHT_BROWSERS_PATH=0` for build-cache reuse.

---

## Deployment

Two branches, two targets:

- **`main` → Netlify → lauracordrey.com.** Netlify **auto-build is off**, so
  pushing `main` does not deploy — trigger a deploy manually in the Netlify UI
  (Deploys → Trigger deploy). Build config lives in `netlify.toml`.
- **`website-rework` → GitHub Actions → GitHub Pages.** Every push rebuilds the
  free preview (~40s, no Netlify credits) via `.github/workflows/preview-pages.yml`,
  built with `VITE_BASE=/laura-cordrey-site/`.

Day-to-day work happens on `website-rework` and is verified on the Pages preview;
`main` is updated by fast-forwarding `website-rework` into it when a batch is ready.

Routing on both hosts relies on an SPA fallback (`public/_redirects` on Netlify;
`404.html` = the prerendered home on Pages) plus the now-prerendered per-route files.

---

## SEO / AEO

- `public/robots.txt` explicitly allows the major search and AI crawlers and links the sitemap.
- `public/sitemap.xml` lists every canonical URL.
- Prerendering (above) puts real content + per-page metadata + JSON-LD in the static HTML.
- Per-route metadata is defined via `useDocumentMeta`; JSON-LD schema builders live in `src/lib/seo.js`.

---

## Conventions

Working rules — voice (no em dashes, canonical product names), the **hover-honesty**
rule (only `<a>`/`<button>` react to the cursor), versioning, and where site copy
lives — are documented in [`CLAUDE.md`](./CLAUDE.md).
