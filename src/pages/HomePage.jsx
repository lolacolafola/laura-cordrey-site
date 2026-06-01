import { Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies.js'
import LogoBanner from '../components/LogoBanner.jsx'
import WorkCard from '../components/WorkCard.jsx'
import './HomePage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

const identities = ['Storyteller', 'Brand Strategist', 'Community Growth']

const heroStats = [
  { value: '100M+', label: 'Audiences reached' },
  { value: '70M+',  label: 'Users engaged' },
  { value: '60M+',  label: 'UGC views' },
]

// One featured card per brand. Pulls the primary case study and pairs it with
// a one-line "big stat" overlay (separate from the article hook).
const featuredIds = ['ubisoft', 'us-mobile', 'blablacar', 'azarus']
const featured = featuredIds
  .map((id) => caseStudies.find((c) => c.id === id))
  .filter(Boolean)

const disciplines = [
  { word: 'Brand',     note: 'Story, identity, voice.' },
  { word: 'Product',   note: 'Loops, mechanics, retention.' },
  { word: 'Community', note: 'Belonging, advocacy, scale.' },
  { word: 'Growth',    note: 'Channels, CAC, repeat revenue.' },
]

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__top">
            <span className="marker">Vol. 01 · Paris · Since 2013</span>
            <span className="marker hero__top-right">Available · 2026</span>
          </div>

          <div className="hero__identities" aria-hidden="true">
            {identities.map((word, i) => (
              <span className="hero__identity" key={word}>
                <span className="hero__diamond">✦</span>
                <span>{word}</span>
                {i === identities.length - 1 && (
                  <span className="hero__diamond">✦</span>
                )}
              </span>
            ))}
          </div>

          <h1 className="hero__title">
            Build brands<br />
            people <em className="accent">talk about</em>.
          </h1>

          <div className="hero__meta">
            <div className="hero__lede">
              <p>
                I&rsquo;m Laura — a strategic consultant for consumer, tech and gaming brands.
                I work across brand, product, community and growth to turn passive audiences
                into the kind of fans that build a business.
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
              <figcaption className="marker">Laura Cordrey · E3, Los Angeles</figcaption>
            </figure>
          </div>

          <div className="hero__stats">
            {heroStats.map((s) => (
              <div className="hero__stat" key={s.label}>
                <span className="hero__stat-value">{s.value}</span>
                <span className="hero__stat-label marker">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLIENT LOGOS ─────────────────────────────────────── */}
      <LogoBanner />

      {/* ─── SELECTED WORK — visual cards ─────────────────────── */}
      <section className="work">
        <div className="container">
          <div className="section-head">
            <span className="marker">Selected work · 2014 — 2026</span>
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
              Community. <em className="accent">Growth.</em>
            </h2>
            <p className="method__copy">
              Most strategists work in one of these. A few work across two.
              I&rsquo;ve built systems across all four — at Ubisoft, BlaBlaCar,
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
            {disciplines.map((d, i) => (
              <li className="method__discipline" key={d.word}>
                <span className="marker method__discipline-num">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
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
            If your audience matters, <em className="accent">we should talk.</em>
          </h2>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
            Book a 30-min call <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  )
}
