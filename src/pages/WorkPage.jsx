import { useState } from 'react'
import caseStudies from '../data/caseStudies.js'
import WorkCard from '../components/WorkCard.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, workIndexJsonLd } from '../lib/seo.js'
import '../styles/shared.css' // shared .work-card / .work-grid / .section-head styles

// CONTACT_URL and the react-router Link import went with the hero CTA on
// 22 Jul 2026. This page no longer links to /contact directly; the nav, the
// footer and every case study it points at all do.

// Derive unique sector list from the data — order = first-seen across the
// case-study array so editorial control stays in caseStudies.js.
const SECTORS = Array.from(
  new Set(caseStudies.flatMap((cs) => cs.sectors || []))
)

export default function WorkPage() {
  const [active, setActive] = useState('All')

  useDocumentMeta({
    title: 'Case Studies · Fan-led growth work by Laura Cordrey',
    // Trimmed from 176 chars on 22 Jul 2026: the tail was past the ~160 Google
    // shows, so the last two case studies were never visible. Also retargeted
    // from "fan-led growth work" to the problem phrasing people search for.
    description:
      'Thirteen years of turning customers into fans: Ubisoft Delta Company and Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation, Azarus, Claw Mobile.',
    canonical: pageUrl('work'),
    ogType: 'website',
    jsonLd: workIndexJsonLd({ caseStudies }),
  })

  const filtered =
    active === 'All'
      ? caseStudies
      : caseStudies.filter((cs) => (cs.sectors || []).includes(active))

  return (
    <>
      {/* ─── HEADER ───────────────────────────────────────────
        * Stripped back on 22 Jul 2026, per Laura: eyebrow, one small résumé
        * line, the filter choices. Nothing else.
        *
        * This page was carrying a full hero: an 89px "Receipts, not a résumé."
        * lockup beside a 58-word paragraph and a CTA. On an index page that is
        * the wrong shape. Every other page opens with a big statement, so
        * /work opened like all the others and then made you scroll past it to
        * reach the thing you came for. Here the work IS the hero, and the
        * header's only job is to say what this is and let you filter it.
        *
        * The h1 is kept, and kept as the only one on the page, because the
        * build prerenders every route and the SEO audit checks for exactly one
        * h1 per snapshot. It is just no longer at hero scale: 41px, the same
        * T.h2 step the rest of the site uses for section heads, so it reads as
        * a label rather than a headline. "Receipts, not a résumé" survives as
        * the eyebrow, where the joke still lands in a quarter of the space.
        *
        * The "Let's talk" CTA went with the lockup. It is in the nav, in the
        * footer, and at the foot of every case study this page links to, so a
        * fourth instance above the fold was asking before showing anything. */}
      <section style={{ position: 'relative', background: '#0E0B09', color: '#EFE9DC', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-24%', right: '-8%', width: '60vw', height: '60vw', maxWidth: 760, maxHeight: 760, background: 'radial-gradient(circle,rgba(200,54,43,.16) 0%,rgba(200,54,43,0) 62%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,64px) clamp(32px,4vw,48px)' }}>
          <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700, marginBottom: 'clamp(14px,1.8vw,20px)' }}>
            Receipts, not a résumé · 2013–2026
          </span>

          {/* The one line. Keeps the sector words the old paragraph carried
            * ("fan-led growth", "gaming", "mobility", "telco") because those
            * are what this page ranks on; drops the three proof numbers, which
            * are all restated on the cards directly below it. */}
          <h1 style={{ fontWeight: 700, fontSize: 'clamp(1.8rem,3.2vw,2.75rem)', lineHeight: 1.12, letterSpacing: '-.025em', margin: 0, maxWidth: '26ch' }}>
            Thirteen years of fan-led growth across AAA gaming, mobility and&nbsp;telco.
          </h1>

          {/* Filters sit inside the header band so they read as part of the
            * header stratum, not a separate section on the light ground. */}
          <div className="work-filters" role="tablist" aria-label="Filter case studies by sector" style={{ marginTop: 'clamp(28px,3.4vw,40px)', marginBottom: 0 }}>
            {['All', ...SECTORS].map((s) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={active === s}
                className={`btn btn--pill ${active === s ? 'btn--primary' : 'btn--ghost'}`}
                onClick={() => setActive(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GRID · dark ground, hairline top ─────────────────
        * Case-study cards live on the same dark ground as the hero (no
        * light/dark snap); a single hairline separates the two strata. */}
      <section style={{ background: '#0E0B09', borderTop: '1px solid rgba(239,233,220,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(28px,3vw,40px) clamp(24px,5vw,64px) clamp(48px,6vw,80px)' }}>
          <div className="work-grid">
            {filtered.map((cs) => (
              <WorkCard key={cs.id} caseStudy={cs} slot="work" />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
