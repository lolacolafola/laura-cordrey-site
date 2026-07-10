import { Link } from 'react-router-dom'
import { useState } from 'react'
import caseStudies from '../data/caseStudies.js'
import WorkCard from '../components/WorkCard.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, workIndexJsonLd } from '../lib/seo.js'
import '../styles/shared.css' // shared .work-card / .work-grid / .section-head styles

const CONTACT_URL = '/contact?intent=consulting'

// Derive unique sector list from the data — order = first-seen across the
// case-study array so editorial control stays in caseStudies.js.
const SECTORS = Array.from(
  new Set(caseStudies.flatMap((cs) => cs.sectors || []))
)

export default function WorkPage() {
  const [active, setActive] = useState('All')

  useDocumentMeta({
    title: 'Selected work · Fan-led growth case studies · Laura Cordrey',
    description:
      'Selected case studies from thirteen years of fan-led growth work: Ubisoft Delta Company, Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation, Azarus, and Claw Mobile.',
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
      {/* ─── HERO + PROOF BAND ────────────────────────────────
        * Replaces the old "The work." quiet head with a hero-scale
        * lockup ("Receipts, not a résumé.") and a continuous receipts
        * band front-loading four proof numbers, so the hard proof
        * (revenue, reach, community, sentiment) sits above the fold
        * instead of hiding below the grid. */}
      <section style={{ position: 'relative', background: '#0E0B09', color: '#EFE9DC', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: '-24%', right: '-8%', width: '60vw', height: '60vw', maxWidth: 760, maxHeight: 760, background: 'radial-gradient(circle,rgba(200,54,43,.16) 0%,rgba(200,54,43,0) 62%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(56px,7vw,104px) clamp(24px,5vw,64px) clamp(40px,5vw,64px)' }}>
          <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700, marginBottom: 'clamp(22px,3vw,34px)' }}>
            Work · Selected · 2013–2026
          </span>

          <div className="work-lockup" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.35fr) minmax(0,1fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'end' }}>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(2.8rem,6.4vw,5.6rem)', lineHeight: 0.94, letterSpacing: '-.04em', margin: 0, maxWidth: '13ch' }}>
              <mark style={{ background: 'transparent', color: '#C8362B', fontWeight: 800 }}>Receipts</mark>, not a résumé.
            </h1>
            <div style={{ paddingBottom: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <p style={{ fontSize: 'clamp(1.06rem,1.4vw,1.28rem)', lineHeight: 1.55, color: 'rgba(239,233,220,.82)', margin: '0 0 22px' }}>
                Thirteen years of fan-led growth across AAA gaming, mobility and telco. A $32K sellout in under three hours, 60M+ organic reach at zero media spend, 0 to a million in a new market. A select few of my favorite projects below. Want your brand on here?
              </p>
              <Link to={CONTACT_URL} className="work-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '.95rem', letterSpacing: '.02em', textDecoration: 'none' }}>
                Get in touch <span className="ar" aria-hidden>→</span>
              </Link>
            </div>
          </div>

          {/* Filters sit inside the hero band so they read as part of the
            * header stratum, not a separate section on the light ground. */}
          <div className="work-filters" role="tablist" aria-label="Filter case studies by sector" style={{ marginTop: 'clamp(40px,5vw,60px)', marginBottom: 0 }}>
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
