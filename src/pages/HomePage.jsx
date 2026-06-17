import { Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies.js'
import LogoBanner from '../components/LogoBanner.jsx'
import WorkCard from '../components/WorkCard.jsx'
import Counter from '../components/Counter.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import './HomePage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

const eyebrow = 'Founder-level CMO for fan-driven brands'

const heroStats = [
  { value: 100, suffix: 'M+', label: 'Audiences reached' },
  { value: 70,  suffix: 'M+', label: 'Users engaged' },
  { value: 60,  suffix: 'M+', label: 'UGC views' },
]

// One featured card per brand. Pulls the primary case study and pairs it with
// a one-line "big stat" overlay (separate from the article hook).
// Featured on the homepage selected-work strip. Order matters — top
// left to bottom right in the 2-col grid. To insert a new top feature
// (e.g. the AI case study), prepend its id here and drop the last entry
// to keep the layout clean.
const featuredIds = ['us-mobile-dark-star', 'azarus-game-ads', 'ubisoft-siege-champions', 'ubisoft-delta-company']
const featured = featuredIds
  .map((id) => caseStudies.find((c) => c.id === id))
  .filter(Boolean)

const disciplines = [
  { word: 'Brand',     note: 'Story, identity, voice.' },
  { word: 'Product',   note: 'UX, gamification, user feedback.' },
  { word: 'Community', note: 'Creator, loyalty, advocacy.' },
  { word: 'Growth',    note: 'Organic, influencer, UGC.' },
]

export default function HomePage() {
  useDocumentMeta({
    title: 'Laura Cordrey — Strategic consultant · Fan-Led Growth · Brand · Product · Community · Growth',
    description:
      'Laura Cordrey acts as a founder-level CMO for fan-driven brands. Brand plus fan-led growth, AI as the engine. Case studies: Ubisoft Delta Company, Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation.',
    canonical: pageUrl(''),
    ogType: 'website',
    jsonLd: authorJsonLd(),
  })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__top">
            <span className="marker">London · Paris · New York · English &amp; French · Since 2013</span>
          </div>

          <div className="hero__identities">
            <span className="hero__identity">
              <span className="hero__diamond" aria-hidden="true">✦</span>
              <span>{eyebrow}</span>
              <span className="hero__diamond" aria-hidden="true">✦</span>
            </span>
          </div>

          <h1 className="hero__title">
            Fans who <em className="accent">stay</em>, <em className="accent">pay</em>,<br />
            and <em className="accent">bring more</em>.
          </h1>

          <div className="hero__meta">
            <div className="hero__lede">
              <p>
                I&rsquo;m Laura. I&rsquo;ll make people fall in love with you,
                then supercharge that love into repeatable, measurable growth.
                Think a drop that sold out in three hours, or 60M views at
                zero ad spend. Let&rsquo;s build your fan-powered growth engine.
              </p>
              <div className="hero__ctas">
                <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
                  Book a call <span aria-hidden="true">→</span>
                </a>
                <Link to="/work" className="btn btn--ghost">
                  See the work
                </Link>
              </div>
            </div>

            <figure className="hero__portrait">
              <div className="hero__portrait-frame" aria-hidden="true">
                <span className="hero__portrait-placeholder">PORTRAIT&nbsp;·&nbsp;TBD</span>
              </div>
            </figure>
          </div>

        </div>
      </section>

      {/* ─── HERO PROOF: client logos, then KPI strip ─────────── */}
      <LogoBanner />

      <section className="hero-proof-stats">
        <div className="container">
          <div className="hero__stats">
            {heroStats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <span className="hero__stat-value">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="hero__stat-label marker">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SELECTED WORK — visual cards ─────────────────────── */}
      <section className="work">
        <div className="container">
          <div className="section-head">
            <span className="marker">Selected work · 2013–2026</span>
            <h2 className="section-head__title">The work.</h2>
          </div>

          <div className="work-grid">
            {featured.map((cs) => (
              <WorkCard key={cs.id} caseStudy={cs} slot="home" />
            ))}
          </div>

          <div className="work__all">
            <Link to="/work" className="btn btn--ghost">
              All work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── METHODOLOGY: the unique angle ────────────────────── */}
      <section className="method">
        <div className="container method__inner">
          <div className="method__lede">
            <span className="marker">The methodology</span>
            <h2 className="method__title">
              Brand. Product.<br />
              Community. <em className="accent">Growth</em>.
            </h2>
            <p className="method__copy">
              Most strategists work in one of these. A few work across two.
              I&rsquo;ve built systems across all four, at Ubisoft, BlaBlaCar,
              US Mobile and Azarus. The Fandom&nbsp;Flywheel&trade; is the
              method I&rsquo;ve drawn from that work: a five-stage system for
              turning audiences into fans, and fans into the engine that grows
              the business.
            </p>
            <Link to="/methodology" className="btn btn--ghost">
              Inside the method <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ol className="method__disciplines" aria-label="Disciplines I work across">
            {disciplines.map((d) => (
              <li className="method__discipline" key={d.word}>
                <span className="method__discipline-mark" aria-hidden="true">✦</span>
                <span className="method__discipline-word">{d.word}</span>
                <span className="method__discipline-note">{d.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="final-cta">
        <div className="container final-cta__inner">
          <span className="marker">Let&rsquo;s work together</span>
          <h2 className="final-cta__title">
            If your audience matters, <em className="accent">we should talk</em>.
          </h2>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
            Book a 30-min call <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  )
}
