import { useState } from 'react'
import caseStudies from '../data/caseStudies.js'
import WorkCard from '../components/WorkCard.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, workIndexJsonLd } from '../lib/seo.js'
import '../styles/shared.css' // shared .work-card / .work-grid / .section-head styles

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

// Derive unique sector list from the data — order = first-seen across the
// case-study array so editorial control stays in caseStudies.js.
const SECTORS = Array.from(
  new Set(caseStudies.flatMap((cs) => cs.sectors || []))
)

// Proof band — four receipts, front-loaded above the grid. Kept as things
// Laura personally built and measured. Two open editorial items flagged:
//   1. Ubisoft UGC: uses 60M+ to match homepage stats + About page. Note
//      caseStudies.js still records this as 50M+ on the Siege card — worth
//      reconciling to a single number across homepage, /work, and the case.
//   2. Sentiment: 75–85% range and its client attribution flagged as
//      verify-before-live in both this brief and the About handoff.
const proofStats = [
  {
    figure: '$32K',
    label: 'In sales, in under three hours. Sold out.',
    source: 'US Mobile',
  },
  {
    figure: '60M',
    accent: '+',
    label: 'UGC views from fan programs, at $0 media spend',
    source: 'Ubisoft',
  },
  {
    figure: '0',
    accent: ' → ',
    figureTail: '1M',
    label: 'Community grown in a new market, from zero',
    source: 'BlaBlaCar',
  },
  {
    figure: '75–85',
    accent: '%',
    label: 'Positive sentiment held through launches',
    source: 'Ubisoft',
  },
]

export default function WorkPage() {
  const [active, setActive] = useState('All')

  useDocumentMeta({
    title: 'Selected work · Fan-led growth case studies · Laura Cordrey',
    description:
      'Selected case studies from twelve years of fan-led growth work — Ubisoft Delta Company, Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation, Azarus, and Claw Mobile.',
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
                Twelve years of fan-led growth, from AAA gaming to mobility and telco. A select few of my favorite projects below. Want your brand on here?
              </p>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btnsoft" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1rem', padding: '14px 26px', borderRadius: 3, textDecoration: 'none' }}>
                Get in touch <span className="ar" aria-hidden>→</span>
              </a>
            </div>
          </div>

          {/* Proof band — one continuous credentials strip, not a card grid
            * (so it doesn't visually rhyme with the WorkCard grid below). */}
          <div className="work-proof" style={{ marginTop: 'clamp(40px,5vw,64px)', border: '1px solid rgba(239,233,220,.14)', borderRadius: 4, background: 'rgba(239,233,220,.035)', overflow: 'hidden' }}>
            <div style={{ padding: 'clamp(16px,1.8vw,22px) clamp(20px,2.4vw,30px) 0', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span aria-hidden="true" style={{ display: 'block', width: 22, height: 1, background: '#D4C896' }} />
              <span style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>The receipts</span>
            </div>
            <div className="work-proof__row" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))' }}>
              {proofStats.map((s, i) => (
                <div key={s.source} style={{ padding: 'clamp(18px,2vw,26px) clamp(20px,2.4vw,30px) clamp(22px,2.4vw,30px)', borderLeft: i === 0 ? 'none' : '1px solid rgba(239,233,220,.1)' }}>
                  <div style={{ fontWeight: 800, fontSize: 'clamp(2.6rem,4.4vw,3.9rem)', letterSpacing: '-.035em', lineHeight: 1 }}>
                    {s.figure}
                    {s.accent && <span style={{ color: '#C8362B' }}>{s.accent}</span>}
                    {s.figureTail && s.figureTail}
                  </div>
                  <div style={{ fontSize: '.9rem', fontWeight: 600, color: 'rgba(239,233,220,.74)', marginTop: 12, lineHeight: 1.42 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#B4A89A', marginTop: 12 }}>
                    {s.source}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FILTERS + GRID (unchanged) ─────────────────────── */}
      <section className="work">
        <div className="container">
          <div className="work-filters" role="tablist" aria-label="Filter case studies by sector">
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
