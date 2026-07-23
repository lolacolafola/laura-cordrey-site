import caseStudies from '../data/caseStudies.js'

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
// Override via VITE_SITE_URL if ever needed; defaults to the custom domain.
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL || 'https://lauracordrey.com'
).replace(/\/$/, '')

export const AUTHOR = {
  name: 'Laura Cordrey',
  jobTitle: 'Fan-led growth for consumer brands. Brand, product, community, growth.',
  description:
    'Builds fan-led growth for consumer brands: the Fan Engine™ that turns communities into measurable revenue.',
  url: SITE_URL,
  sameAs: [
    'https://www.linkedin.com/in/lauracordrey/',
  ],
  knowsAbout: [
    'Fan-Led Growth',
    'Product-Led Growth',
    'Fan Engine™',
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
    // section to read aloud as the page's primary answer. The takeaway is
    // always the most quotable, self-contained beat.
    //
    // Selectors corrected 23 Jul 2026. These were
    // '.delta__section-body--takeaway' and '.delta__section-title', classes
    // from the original bespoke Delta Company page. That design is gone — a
    // grep found those strings in this file and NOWHERE else in src/ — so the
    // spec pointed at elements that do not exist. Every case study now renders
    // through CaseStudyCinematic, whose takeaway block is .cscin__takeaway.
    // Never spotted before because this builder had no call sites.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.cscin__takeaway-title', '.cscin__takeaway'],
    },
  }

  const graph = [article]

  // BreadcrumbList — every case study has the same shape (Home → Work → X).
  // Auto-include so we don't repeat per page.
  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: pageUrl('') },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: pageUrl('work') },
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
        name: 'Case Studies · Selected work by Laura Cordrey',
        description:
          'Selected fan-led growth case studies: Ubisoft Delta Company, Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation, Azarus / Animoca, Claw Mobile.',
        author: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
        url: pageUrl('work'),
      },
      {
        '@type': 'ItemList',
        itemListElement: caseStudies.map((cs, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${cs.company} · ${cs.headline}`,
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
    name: 'Laura Cordrey · Fan-Led Growth Consulting',
    description:
      'Strategic consulting for consumer, tech and gaming brands. Brand, product, community, and growth, with a specialism in fan-led growth engines.',
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

// ─── Methodology (the Fan Engine) ───────────────────────────────────────
// HowTo + DefinedTerm bundle. HowTo lets AIO surface the 5 stages as
// step-by-step content for "how do you build a fan-led growth program"
// queries. DefinedTerm anchors "the Fan Engine" as a named methodology
// in the entity graph (Laura's IP).
export function methodologyJsonLd({ stages }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        '@id': `${pageUrl('fan-engine')}#fan-engine`,
        name: 'the Fan Engine™',
        description:
          'A five-stage methodology for turning passive audiences into fans that build a business: Activation, Habit, Belonging, Identity, Advocacy. Built by Laura Cordrey across brand, product, community and growth work at Ubisoft, BlaBlaCar, US Mobile and Azarus / Animoca.',
        inDefinedTermSet: 'Fan-Led Growth methodology',
        url: pageUrl('fan-engine'),
      },
      {
        '@type': 'HowTo',
        name: 'How to build a fan-led growth engine using the Fan Engine™',
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

// ─── Fan-led growth ─────────────────────────────────────────────────────
// Aimed at the PROBLEM, not the category. A demand check on 22 Jul 2026 found
// "fan-led growth" has no commercial search volume and a SERP full of ceiling
// fans, LED grow lights and the UK football fan-led review, while "how to turn
// customers into fans" is crowded with Forbes, Tony Robbins, Fanocracy and
// Superfans. So the FAQ leads with the question people ask, and the term is
// the answer given back to them. It still carries the DefinedTerm — the label
// is worth owning as an entity even where it is not worth chasing as a query —
// with "superfan" as an alternate name, which is the term with the demand.
//
// The FAQPage answers introduce no new claims: every sentence is lifted from
// the page, which is what FAQPage requires (schema must reflect on-page
// content, not extend it). One deliberate exception, and it is the only one:
// the three benchmark figures render on the page as display stats ("2 to 3x /
// longer top fans stay") rather than as a sentence, so the superfan answer
// states them in prose. The figures and their sources are visible on the page;
// only the sentence form differs.
//
// These DO drift: an edit to the hero copy on 22 Jul silently broke three of
// these answers. If you touch either side, re-run this in the console on
// /fan-led-growth and expect only the superfan sentence above to come back:
//
//   const n = s => s.replace(/[’']/g,"'").replace(/\s+/g,' ').trim()
//   const page = n(document.querySelector('.flg').innerText)
//   ;[...document.querySelectorAll('script[type="application/ld+json"]')]
//     .map(s => JSON.parse(s.textContent))
//     .flatMap(o => o['@graph'] || [])
//     .find(x => x['@type'] === 'FAQPage')
//     .mainEntity.flatMap(q => n(q.acceptedAnswer.text).split(/(?<=\.)\s+/))
//     .filter(s => s.length > 25 && !page.includes(s.replace(/^Sources: /,'')))
export function fanLedGrowthJsonLd() {
  const canonical = pageUrl('fan-led-growth')
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        '@id': `${canonical}#fan-led-growth`,
        name: 'Fan-Led Growth',
        alternateName: ['Superfan growth', 'Turning customers into fans'],
        description:
          'Growth driven by fans rather than paid acquisition. When people love what you do, they stay, they spend more, and they bring others with them. No single team makes a fan: it takes brand, product and community pulling the same way.',
        inDefinedTermSet: 'Fan-Led Growth methodology',
        url: canonical,
      },
      {
        '@type': 'WebPage',
        '@id': canonical,
        name: 'How to turn customers into fans',
        description:
          'How to turn customers into fans, why superfans compound, and what they are worth to your business.',
        url: canonical,
        author: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
        about: { '@id': `${canonical}#fan-led-growth` },
        inLanguage: 'en',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            question: 'How do you turn customers into fans?',
            answer:
              'When people love what you do, they stay, they spend more, and they bring others with them. Nothing sells harder than a fan telling a friend. But no single team makes a fan: it takes your brand, your product, and your community pulling the same way. Get that right, and customers become fans.',
          },
          {
            question: 'What is a superfan worth?',
            answer:
              'Not every customer becomes a superfan. Your top fans behave differently, and it shows up in the numbers. Top fans stay 2 to 3 times longer, spend 66 to 80% more, and refer around 4 times more often. Sources: Bain, Nielsen, HBR, Wharton.',
          },
          {
            question: 'What is fan-led growth?',
            answer:
              "People become fans when they feel they belong: a reason to care, a space to connect, a voice, the feeling of being seen. Ad spend can't buy that. Earn it, and here is what your fans start doing for you.",
          },
          {
            // The six benefit cards, in page order, each as "title: body" with
            // both halves verbatim from the card. Written this way rather than
            // paraphrased so the two cannot drift: if a card changes, the only
            // correct edit here is to paste the new card in.
            //
            // The AI card was missing from this answer until 22 Jul 2026, so
            // the schema listed five of the six on the page.
            question: 'Why do fans grow a business?',
            answer:
              'They stay and spend more: you keep what you paid to win, instead of buying the same customer twice. They spread the word: fans make the content that markets you, at no media cost. They recommend you: their friends arrive on a recommendation, so your cost per customer falls. They defend you: fans stay through a rough week, and defend you in public. AI recommends you too: ask an AI what to pick, and it answers from what your fans post. It compounds: built once, the engine keeps working and starts to fuel itself.',
          },
          {
            question: 'How is fan-led growth different from paid acquisition?',
            answer:
              "Fans are the growth you already own. You've been renting yours: you pay for every customer, and the day you stop, it stops. Fans work the other way. Build them once, and they keep growing you long after the spend ends.",
          },
          {
            question: 'Who is fan-led growth for?',
            answer:
              'I work with companies that have a disruptive brand, a vocal userbase and growth that runs on network effects. If product-led growth got you here, fan-led growth is what comes next: the product sold itself, now your fans sell it too.',
          },
        ].map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
            author: { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.url },
          },
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

// ─── Case-study schema, derived from the case-study data ────────────────
// Added 23 Jul 2026. caseStudyJsonLd above had existed since the case studies
// were built and was called from NOWHERE, so the seven /work/<slug> pages —
// the site's actual proof — shipped no page-specific structured data at all.
//
// Rather than hand-copy client / role / sector / keywords into seven page
// files (seven chances to mistype a fact), this derives every value from
// src/data/caseStudies.js, which already holds them and is what /work renders
// from. Nothing here is authored: it is the same facts, re-expressed as schema.
//
// caseStudyJsonLd emits the BreadcrumbList itself, so wiring this up also gives
// every case study a Home → Case Studies → X trail. No separate call needed.
export function caseStudyJsonLdFor(slug) {
  const study = caseStudies.find((c) => c.id === slug)
  if (!study) return undefined

  // `company` is a display string and sometimes carries two names
  // ("US Mobile · Claw Mobile"). The client entity is the first part — the
  // actual organisation — so the Organization in `about` resolves to a real
  // company rather than a campaign label.
  const client = (study.company || '').split('·')[0].trim() || undefined

  return caseStudyJsonLd({
    slug,
    title: study.headline,
    // `hook` is the one-sentence plain-text summary. `tldr` carries <mark>
    // markup for the page and would leak tags into schema.
    description: study.hook,
    image: study.media?.image,
    // Schema wants ISO 8601. The data holds a year string, which is valid on
    // its own — do not pad it to a fake month and day.
    datePublished: study.year,
    keywords: study.tags,
    client,
    role: study.role,
    sector: (study.sectors || []).join(', ') || undefined,
  })
}
