// SEO + AIO helpers.
//
// Centralises:
//   - SITE_URL canonical base
//   - AUTHOR (Laura) Person schema
//   - Article / CaseStudy JSON-LD builders for each case study page
//
// Consumed by useDocumentMeta(). Keep page-level usage thin:
//   useDocumentMeta({
//     title, description, canonical: caseStudyUrl(slug),
//     ogImage: assetUrl(image), jsonLd: caseStudyJsonLd({...}),
//   })

// ─── Constants ──────────────────────────────────────────────────────────
// SITE_URL is the canonical origin without trailing slash.
// Override via VITE_SITE_URL once the custom domain is live; defaults to
// the GitHub Pages production URL.
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL || 'https://lauracordrey.github.io/laura-cordrey-site'
).replace(/\/$/, '')

export const AUTHOR = {
  name: 'Laura Cordrey',
  jobTitle: 'Strategic Consultant — Brand, Product, Community, Growth',
  description:
    'Senior strategic consultant for consumer, tech and gaming brands. Builds fan-led growth engines that turn communities into measurable revenue.',
  url: SITE_URL,
  sameAs: [
    // Add LinkedIn / X / etc. here once handles are confirmed.
    // 'https://www.linkedin.com/in/lauracordrey/',
  ],
  knowsAbout: [
    'Fan-Led Growth',
    'Product-Led Growth',
    'Fandom Flywheel',
    'Community Strategy',
    'Brand Strategy',
    'Creator Programs',
    'Community Advocacy Programs',
    'Premium Drops',
    'Gamification',
  ],
}

// Resolve a public asset path (e.g. "case-studies/foo.png") to an
// absolute URL — required for og:image and schema imageObject.
export function assetUrl(relPath) {
  if (!relPath) return undefined
  if (/^https?:\/\//i.test(relPath)) return relPath
  // GitHub Pages base path is /laura-cordrey-site/ in production.
  const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
  const clean = String(relPath).replace(/^\//, '')
  return `${SITE_URL}${base}/${clean}`
}

export function pageUrl(routePath) {
  const base = (import.meta.env?.BASE_URL || '/').replace(/\/$/, '')
  const clean = String(routePath || '/').replace(/^\//, '')
  return `${SITE_URL}${base}/${clean}`
}

// ─── Person schema (re-usable across pages) ─────────────────────────────
export function authorJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    description: AUTHOR.description,
    url: AUTHOR.url,
    sameAs: AUTHOR.sameAs,
    knowsAbout: AUTHOR.knowsAbout,
  }
}

// ─── Case-study schemas ─────────────────────────────────────────────────
// Each case study emits Article + (optional) FAQPage in a single @graph
// block. @graph is the schema.org-recommended way to bundle multiple
// related entities on one page — cleaner than emitting separate <script>
// tags and gives crawlers a richer relationship graph.
//
// `faqItems` shape: [{ question: '...', answer: '...' }, ...]
// Use to expose each principle/takeaway as a structured Q/A pair —
// AIO engines (Google AI Overviews, Perplexity, ChatGPT) preferentially
// pull from FAQPage schema when answering user queries.
export function caseStudyJsonLd({ slug, title, description, image, datePublished, about, keywords, principles, faqItems, client, role, market, sector }) {
  const canonical = pageUrl(`work/${slug}`)
  const imageUrl = assetUrl(image)

  // Prepend the client as a structured Organization so the case file is
  // entity-linked to the brand — engines treat this as "this Article is
  // about Organization X" rather than just topic tags.
  const aboutList = client
    ? [{ '@type': 'Organization', name: client }, ...(about || [])]
    : about

  // Per-case author: same Person, but with jobTitle reflecting Laura's
  // role on this engagement so LLMs can answer "what was Laura's role at
  // [client]?" from structured data, not prose inference.
  const articleAuthor = role
    ? {
        '@type': 'Person',
        name: AUTHOR.name,
        url: AUTHOR.url,
        jobTitle: client ? `${role} at ${client}` : role,
      }
    : { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url }

  const article = {
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished,
    author: articleAuthor,
    publisher: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    about: aboutList,
    // `audience` (not spatialCoverage) — this is the market the work reached,
    // not a geography the article is about. For region-specific cases swap
    // `name` for `geographicArea: { '@type': 'AdministrativeArea', name: ... }`.
    ...(market ? { audience: { '@type': 'Audience', name: market } } : {}),
    // `articleSection` is the standard publication-section field — the
    // sector/category bucket engines use to classify the case file.
    ...(sector ? { articleSection: sector } : {}),
    keywords: [...(keywords || []), ...(principles || [])].join(', '),
    inLanguage: 'en',
    // Speakable: tells voice assistants (Google Assistant, Siri) which
    // section to read aloud as the page's primary answer. The takeaway
    // is always the most quotable, self-contained beat — every bespoke
    // case study uses the .delta__section-body--takeaway class.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.delta__section-body--takeaway', '.delta__section-title'],
    },
  }

  const graph = [article]

  // BreadcrumbList — every case study has the same shape (Home → Work → X).
  // Auto-include so we don't repeat per page.
  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: pageUrl('') },
      { '@type': 'ListItem', position: 2, name: 'Work', item: pageUrl('work') },
      { '@type': 'ListItem', position: 3, name: title, item: canonical },
    ],
  })

  if (faqItems && faqItems.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map(({ question, answer }) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
          author: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

// ─── Work index (collection of case studies) ────────────────────────────
// CollectionPage + ItemList tells crawlers "this is a curated portfolio"
// with structured links to each case study. Higher-quality alternative
// to a plain anchor list — every item gets a position and a URL.
export function workIndexJsonLd({ caseStudies }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': pageUrl('work'),
        name: 'Work — Selected case studies by Laura Cordrey',
        description:
          'Selected fan-led growth case studies — Ubisoft Delta Company, Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation, Azarus, Claw Mobile.',
        author: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
        url: pageUrl('work'),
      },
      {
        '@type': 'ItemList',
        itemListElement: caseStudies.map((cs, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${cs.company} — ${cs.headline}`,
          url: pageUrl(`work/${cs.id}`),
        })),
      },
    ],
  }
}

// ─── Services / consulting offer ────────────────────────────────────────
// ProfessionalService surfaces Laura as a hireable consultant for
// queries like "fan-led growth consultant" / "community strategy
// consultant for gaming brands".
export function serviceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Laura Cordrey — Fan-Led Growth Consulting',
    description:
      'Strategic consulting for consumer, tech and gaming brands. Brand, product, community, and growth — with a specialism in fan-led growth engines.',
    provider: {
      '@type': 'Person',
      name: AUTHOR.name,
      url: AUTHOR.url,
      jobTitle: AUTHOR.jobTitle,
    },
    url: pageUrl('services'),
    areaServed: 'Global',
    serviceType: [
      'Fan-Led Growth strategy',
      'Community strategy',
      'Brand strategy',
      'Product strategy',
      'Creator program design',
      'Community advocacy program design',
      'Premium drop and limited-edition launch design',
      'Gamified pre-launch funnels',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'Consumer brands, tech, gaming, early-stage and scale-up companies',
    },
  }
}

// ─── Methodology (the Fandom Flywheel) ──────────────────────────────────
// HowTo + DefinedTerm bundle. HowTo lets AIO surface the 5 stages as
// step-by-step content for "how do you build a fan-led growth program"
// queries. DefinedTerm anchors "Fandom Flywheel" as a named methodology
// in the entity graph (Laura's IP).
export function methodologyJsonLd({ stages }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        '@id': `${pageUrl('methodology')}#fandom-flywheel`,
        name: 'Fandom Flywheel',
        description:
          'A five-stage methodology for turning passive audiences into fans that build a business: Activation, Habit, Belonging, Identity, Advocacy. Built by Laura Cordrey across brand, product, community and growth work at Ubisoft, BlaBlaCar, US Mobile and Azarus.',
        inDefinedTermSet: 'Fan-Led Growth methodology',
        url: pageUrl('methodology'),
      },
      {
        '@type': 'HowTo',
        name: 'How to build a fan-led growth engine using the Fandom Flywheel',
        description:
          'Five-stage methodology by Laura Cordrey for turning passive audiences into fans that drive measurable growth.',
        author: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
        step: stages.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.name,
          text: s.text,
        })),
      },
    ],
  }
}

// ─── Breadcrumbs (per case study) ───────────────────────────────────────
export function breadcrumbJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
