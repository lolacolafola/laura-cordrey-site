import { useParams, Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies.js'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import WorkCard from '../components/WorkCard.jsx'
import ArticleCarousel from '../components/ArticleCarousel.jsx'
import './HomePage.css' // shared .work-card / .work-grid / .btn styles
import './WorkArticle.css'

const BASE = import.meta.env.BASE_URL
const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

export default function WorkArticle() {
  const { slug } = useParams()
  const cs = caseStudies.find((c) => c.id === slug)

  useDocumentMeta({
    title: cs ? `${cs.company} — ${cs.headline} · Laura Cordrey` : 'Case study not found',
    description: cs?.tldr,
    canonical: cs ? `/work/${cs.id}` : undefined,
  })

  if (!cs) {
    return (
      <div className="container" style={{ padding: 'var(--space-9) 0' }}>
        <p className="marker">404 · Not found</p>
        <h1 style={{ fontSize: 'var(--fs-display-l)', margin: 'var(--space-3) 0' }}>
          This case study doesn&rsquo;t exist.
        </h1>
        <Link to="/work" className="marker">← All work</Link>
      </div>
    )
  }

  const lightHero = cs.media?.heroBackground === 'white'

  // Related — other case studies, prefer different brands, max 3
  const related = caseStudies
    .filter((c) => c.id !== cs.id)
    .sort((a, b) => (a.company === cs.company ? 1 : -1))
    .slice(0, 3)

  return (
    <article className="article">
      {/* ─── MASTHEAD ──────────────────────────────────────────── */}
      <div className="container article__masthead">
        <Link to="/work" className="marker article__back">
          <span aria-hidden="true">←</span> All work
        </Link>
        <span className="marker article__masthead-meta">
          {cs.year} · {cs.role}
        </span>
      </div>

      {/* ─── COVER ────────────────────────────────────────────── */}
      <header className="article__cover">
        <div className="container">
          <ul className="article__tags" aria-label="Tags">
            {cs.tags.map((t) => (
              <li key={t} className="marker article__tag">{t}</li>
            ))}
          </ul>
          <span className="article__company">{cs.company}</span>
          <h1 className="article__headline">{cs.headline}</h1>
          <p className="article__hook">{cs.hook}</p>
        </div>
      </header>

      {/* ─── HERO IMAGE (full-bleed, magazine-cover scale) ────── */}
      {cs.media?.image && (
        <figure className={`article__hero${lightHero ? ' article__hero--light' : ''}`}>
          <div className="article__hero-frame">
            <img
              src={BASE + cs.media.image}
              alt={cs.media.imageAlt || `${cs.company} — ${cs.headline}`}
            />
          </div>
        </figure>
      )}

      {/* ─── STAND-FIRST (editorial intro paragraph) ──────────── */}
      <section className="container article__standfirst">
        <p>{cs.tldr}</p>
      </section>

      {/* ─── STATS ────────────────────────────────────────────── */}
      <section className="container article__stats">
        <ul>
          {cs.stats.map((s, i) => (
            <li key={i} className="article__stat">
              <span className="article__stat-value">{s.value}</span>
              <span className="marker article__stat-label">{s.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── CHALLENGE ────────────────────────────────────────── */}
      <section className="container article__section">
        <div className="article__section-head">
          <span className="marker">[01] · The brief</span>
          <h2 className="article__section-title">The challenge.</h2>
        </div>
        <p className="article__body">{cs.challenge}</p>
      </section>

      {/* ─── APPROACH ─────────────────────────────────────────── */}
      <section className="container article__section">
        <div className="article__section-head">
          <span className="marker">[02] · The work</span>
          <h2 className="article__section-title">The approach.</h2>
        </div>
        <p className="article__body">{cs.approach}</p>
      </section>

      {/* ─── TAKEAWAY ─────────────────────────────────────────── */}
      <section className="container article__section article__section--takeaway">
        <div className="article__section-head">
          <span className="marker">[03] · The outcome</span>
          <h2 className="article__section-title">The takeaway.</h2>
        </div>
        <p className="article__body article__body--takeaway">{cs.takeaway}</p>
      </section>

      {/* ─── GALLERY: scroll-snap carousel ────────────────────── */}
      {cs.gallery?.length > 0 && (
        <section className="container article__gallery">
          <ArticleCarousel items={cs.gallery} />
        </section>
      )}

      {/* ─── VIDEO (optional, Claw Mobile etc.) ───────────────── */}
      {cs.media?.youtube && (
        <figure className="container article__video">
          <div className="article__video-frame">
            <iframe
              src={`https://www.youtube.com/embed/${cs.media.youtube}`}
              title={cs.media.videoTitle || cs.company}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </figure>
      )}

      {/* ─── ADDITIONAL VIDEOS (optional) ─────────────────────── */}
      {cs.additionalVideos?.length > 0 && (
        <section className="container article__additional">
          <span className="marker">More from this campaign</span>
          <div className="article__additional-grid">
            {cs.additionalVideos.map((v) => (
              <figure key={v.id} className="article__additional-cell">
                <div className="article__video-frame">
                  <iframe
                    src={`https://www.youtube.com/embed/${v.id}`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <figcaption className="marker">{v.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ─── RELATED WORK ─────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="container article__related">
          <div className="article__related-head">
            <span className="marker">More work</span>
            <h2 className="article__related-title">Another story.</h2>
          </div>
          <div className="work-grid work-grid--three">
            {related.map((c, i) => (
              <WorkCard key={c.id} caseStudy={c} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* ─── CTA ──────────────────────────────────────────────── */}
      <section className="article__cta">
        <div className="container article__cta-inner">
          <span className="marker">Want this for your brand?</span>
          <h2 className="article__cta-title">
            Let&rsquo;s build something <em className="accent">just like this</em>.
          </h2>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
            Book a 30-min call <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </article>
  )
}
