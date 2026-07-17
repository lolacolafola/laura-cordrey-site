import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getStudyNeighbours } from '../data/caseStudiesCinematic.js'
import './CaseStudyCinematic.css'

/* ───────────────────────────────────────────────────────────
 * CaseStudyCinematic — renders one cinematic case study from data.
 *
 *   <CaseStudyCinematic slug="…" study={getCinematicStudy(slug)} />
 *
 * Study shape (see data/caseStudiesCinematic.js):
 *   { id, name, skin: 'dark'|'light', accent: '#hex', studyNum,
 *     hero: { meta, eyebrow, title, lede, img, imgAlt },
 *     blocks: [ { type, ... }, ... ] }
 *
 * Block types: statement | stats | scale | section | stagehero | band |
 *   intro | filmstrip | carousel | video | loops | rewards | seasons |
 *   videogrid | splitmedia | quote | result | proof | ratio | takeaway | cta
 *
 * Copy is first-party data, so dangerouslySetInnerHTML is used for inline
 * <mark>/<strong>. No untrusted input flows in.
 * ─────────────────────────────────────────────────────────── */

const CONTACT_URL = '/contact?intent=consulting'
const html = (s) => ({ dangerouslySetInnerHTML: { __html: s || '' } })

const isInternalHref = (h) => !!h && (h.charAt(0) === '/' || h.charAt(0) === '#')
function Anchor({ href, className, children }) {
  if (!href) return null
  if (isInternalHref(href)) {
    return <Link to={href} className={className}>{children}</Link>
  }
  return <a href={href} className={className}>{children}</a>
}

function CinLink({ link }) {
  if (!link || !link.href) return null
  return (
    <Anchor href={link.href} className="cscin__cinlink">
      {link.text} <span aria-hidden="true">→</span>
    </Anchor>
  )
}

function Reveal({ as: Tag = 'div', className, children, ...rest }) {
  return <Tag className={className} data-rev {...rest}>{children}</Tag>
}

/* ─── Carousel hook: per-block active index ─── */
function useCarousel(n) {
  const [i, setI] = useState(0)
  const safeI = Math.min(Math.max(0, i), Math.max(0, n - 1))
  return {
    i: safeI,
    prev: () => setI((safeI - 1 + n) % n),
    next: () => setI((safeI + 1) % n),
    goTo: setI,
  }
}

/* ─── Reusable: stacked-image slider (used by carousel + splitmedia) ─── */
function StackedSlider({ items, aspect = '16/10', width, fit = 'contain', cls = '', caption }) {
  const { i, prev, next, goTo } = useCarousel(items.length)
  const multi = items.length > 1
  // A block-level `caption` shows one static line for the whole carousel;
  // otherwise fall back to the active slide's own `cap`.
  const activeCap = caption != null ? caption : ((items[i] && items[i].cap) || '')
  const videoRefs = useRef([])

  // Only the visible slide plays; the others autoplay-start then get paused and
  // rewound. Browsers cap simultaneous video decoding, so leaving every slide
  // playing starves them all. The active slide keeps its autoplay.
  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return
      if (idx === i) { v.play().catch(() => {}) }
      else { v.pause(); v.currentTime = 0 }
    })
  }, [i])

  return (
    <div className={`cscin__slider ${cls}`} style={width ? { width } : undefined}>
      <div className="cscin__slider-frame" style={{ aspectRatio: aspect }}>
        {items.map((it, idx) => (
          /\.(mp4|webm)$/i.test(it.src) || it.video ? (
            <video
              key={idx}
              ref={(el) => { videoRefs.current[idx] = el }}
              src={it.src}
              poster={it.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{ opacity: idx === i ? 1 : 0, objectFit: it.fit || fit }}
            />
          ) : (
            <img
              key={idx}
              src={it.src}
              alt={it.alt || ''}
              loading="lazy"
              style={{ opacity: idx === i ? 1 : 0, objectFit: it.fit || fit }}
            />
          )
        ))}
      </div>
      <div className="cscin__slider-foot">
        <figcaption className="cscin__cap">{activeCap}</figcaption>
        {multi && (
          <div className="cscin__slider-nav">
            <button type="button" className="cscin__slider-arrow cscin__slider-arrow--prev" onClick={prev} aria-label="Previous">‹</button>
            <div className="cscin__slider-dots">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={'cscin__slider-dot' + (idx === i ? ' is-active' : '')}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            <button type="button" className="cscin__slider-arrow cscin__slider-arrow--next" onClick={next} aria-label="Next">›</button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Splitmedia single-image / framed / video helper ─── */
function SplitSingle({ images, framed, caption }) {
  return (
    <div className="cscin__split-single">
      <div className="cscin__hs">
        {images.map((im, i) => {
          const isVid = /\.(mp4|webm|mov)$/i.test(im.src || '')
          return (
            <div key={i} className={'cscin__split-tile' + (framed ? ' cscin__split-tile--framed' : '')}>
              {isVid
                ? <video src={im.src} autoPlay muted loop playsInline preload="metadata" />
                : <img src={im.src} alt={im.alt || ''} loading="lazy" />}
            </div>
          )
        })}
      </div>
      {caption && (
        <figcaption className={'cscin__cap cscin__split-cap' + (framed ? ' cscin__split-cap--framed' : '')}>
          {caption}
        </figcaption>
      )}
    </div>
  )
}

function Block({ b }) {
  switch (b.type) {
    case 'statement':
      return (
        <section className="cscin__statement">
          <Reveal as="p" {...html(b.text)} />
        </section>
      )

    case 'stats':
      return (
        <section className="cscin__stats">
          <div className="cscin__stats-inner">
            {b.items.map((s, i) => (
              <Reveal className="cscin__stat" key={i}>
                <span className="cscin__stat-value">{s.value}</span>
                <span className="cscin__stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </section>
      )

    case 'scale':
      return (
        <section className="cscin__scale">
          <Reveal as="span" className="cscin__kicker">{b.kicker}</Reveal>
          <Reveal as="h2" className="cscin__scale-title" {...html(b.title)} />
          {b.lede && <Reveal as="p" className="cscin__scale-lede" {...html(b.lede)} />}
          <div className="cscin__scale-grid">
            {b.items.map((s, i) => (
              <Reveal className="cscin__scale-cell" key={i}>
                <span className="cscin__scale-value">{s.value}</span>
                <span className="cscin__scale-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
          {b.source && <Reveal as="p" className="cscin__scale-source">{b.source}</Reveal>}
        </section>
      )

    case 'section': {
      const cls = 'cscin__section'
        + (b.divider ? ' cscin__section--divider' : '')
        + (b.invert ? ' cscin__section--invert' : '')
      return (
        <section className={cls}>
          <div className="cscin__section-grid">
            <Reveal as="span" className="cscin__kicker cscin__section-kicker">{b.kicker}</Reveal>
            <Reveal as="h2" className="cscin__section-title" {...html(b.title)} />
            <Reveal className="cscin__section-body">
              {(b.body || []).map((p, i) => {
                if (typeof p === 'string') return <p key={i} {...html(p)} />
                if (p.img) return (
                  <figure key={i} className="cscin__inline-fig">
                    <img src={p.img} alt={p.alt || ''} loading="lazy" />
                    {p.cap && <figcaption>{p.cap}</figcaption>}
                  </figure>
                )
                return <p key={i} {...html(p.t || '')} />
              })}
              <CinLink link={b.link} />
            </Reveal>
          </div>
        </section>
      )
    }

    case 'stagehero':
      return (
        <section className="cscin__stagehero">
          {b.video && <video src={b.video} poster={b.poster} autoPlay muted loop playsInline preload="metadata" />}
          <div className="cscin__stagehero-scrim" aria-hidden="true" />
          <Reveal className="cscin__stagehero-inner">
            <span className="cscin__kicker">{b.kicker}</span>
            <h2 className="cscin__stagehero-title" {...html(b.title)} />
            <div className="cscin__stagehero-body">
              {(b.body || []).map((p, i) => <p key={i} {...html(typeof p === 'string' ? p : (p.t || ''))} />)}
            </div>
            {b.link && (
              <Anchor href={b.link.href} className="cscin__cinlink cscin__cinlink--light">
                {b.link.text} <span aria-hidden="true">→</span>
              </Anchor>
            )}
          </Reveal>
        </section>
      )

    case 'band':
      return (
        <Reveal as="figure" className={'cscin__band' + (b.contain ? ' cscin__band--contain' : '') + (b.narrow ? ' cscin__band--narrow' : '')}>
          <img src={b.src} alt={b.alt || ''} loading="lazy" />
          {(b.caption || b.link) && (
            <figcaption className="cscin__band-foot">
              {b.caption && <span>{b.caption}</span>}
              <CinLink link={b.link} />
            </figcaption>
          )}
        </Reveal>
      )

    case 'intro':
      return (
        <>
          {b.divider && <div className="cscin__intro-divider" />}
          <section className="cscin__intro">
            {b.lead && <Reveal as="p" className="cscin__intro-lead" {...html(b.lead)} />}
            {b.eyebrow && <Reveal as="span" className="cscin__kicker cscin__intro-eyebrow">{b.eyebrow}</Reveal>}
            {b.title && <Reveal as="h2" className="cscin__intro-title" {...html(b.title)} />}
          </section>
        </>
      )

    case 'filmstrip':
      return (
        <section className="cscin__filmstrip-wrap">
          <div className="cscin__filmstrip cscin__hs">
            {b.items.map((f, i) => {
              const containItem = f.contain != null ? !!f.contain : !!b.contain
              const natural = !!b.natural
              return (
                <figure key={i} className="cscin__film">
                  {natural
                    ? <div className="cscin__film-natural"><img src={f.src} alt={f.alt || ''} loading="lazy" /></div>
                    : <div className="cscin__film-boxed"><img src={f.src} alt={f.alt || ''} loading="lazy" style={{ objectFit: containItem ? 'contain' : 'cover' }} /></div>
                  }
                  {f.cap && <figcaption>{f.cap}</figcaption>}
                </figure>
              )
            })}
          </div>
        </section>
      )

    case 'carousel': {
      const items = (b.items || []).map((it) => ({
        ...it,
        fit: (it.contain != null ? !!it.contain : !!b.contain) ? 'contain' : 'cover',
      }))
      return (
        <section className="cscin__carousel-section">
          <div className="cscin__carousel-inner">
            <StackedSlider items={items} aspect={b.aspect || '16/10'} width={b.itemW || 'min(88vw,940px)'} caption={b.caption} />
          </div>
        </section>
      )
    }

    case 'video':
      return (
        <Reveal as="figure" className="cscin__video">
          <div className="cscin__video-frame" style={b.aspect ? { aspectRatio: b.aspect } : undefined}>
            {b.embed
              ? <iframe src={b.embed} title={b.title || ''} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
              : <video src={b.src} poster={b.poster} controls muted playsInline preload="metadata" />}
          </div>
          {(b.caption || b.link) && (
            <figcaption className="cscin__video-cap">
              {b.caption && <span>{b.caption}</span>}
              <CinLink link={b.link} />
            </figcaption>
          )}
        </Reveal>
      )

    case 'loops': {
      const count = (b.items || []).length
      const colCls = b.cols ? `c${b.cols}` : (b.small ? 'c1s' : `c${Math.min(count, 3)}`)
      return (
        <section className={'cscin__loops' + (b.light ? ' cscin__loops--light' : '')} style={{ paddingTop: b.padTop, paddingBottom: b.padBottom }}>
          <div className={`cscin__loops-grid ${colCls}`}>
            {(b.items || []).map((lp, i) => (
              <Reveal as="figure" className="cscin__loop" key={i}>
                <div className="cscin__loop-frame">
                  <video src={lp.src} autoPlay muted loop playsInline preload="metadata" />
                </div>
                {lp.cap && <figcaption>{lp.cap}</figcaption>}
              </Reveal>
            ))}
          </div>
        </section>
      )
    }

    case 'rewards': {
      const cls = 'cscin__rewards' + (b.light ? ' cscin__rewards--light' : '')
      return (
        <section className={cls}>
          <div className="cscin__rewards-inner">
            {(b.eyebrow || b.title || b.lead) && (
              <Reveal className="cscin__rewards-head">
                {b.eyebrow && <span className="cscin__kicker">{b.eyebrow}</span>}
                {b.title && <h2 className="cscin__rewards-title" {...html(b.title)} />}
                {b.lead && <p className="cscin__rewards-lead" {...html(b.lead)} />}
              </Reveal>
            )}
            {b.goodies && b.goodies.length > 0 && (
              <>
                {b.goodiesLabel && <Reveal as="p" className="cscin__rewards-label">{b.goodiesLabel}</Reveal>}
                <div className="cscin__goodies-grid">
                  {b.goodies.map((g, i) => (
                    <Reveal as="figure" key={i} className="cscin__goodie">
                      <div className="cscin__goodie-frame"><img src={g.src} alt={g.alt || ''} loading="lazy" /></div>
                      {g.cap && <figcaption>{g.cap}</figcaption>}
                    </Reveal>
                  ))}
                </div>
              </>
            )}
            {b.itemsLabel && <Reveal as="p" className="cscin__rewards-label cscin__rewards-label--bottom">{b.itemsLabel}</Reveal>}
            <div className="cscin__reward-grid">
              {(b.items || []).map((rw, i) => {
                const isVid = /\.(mp4|webm|mov)$/i.test(rw.src || '')
                return (
                  <Reveal className="cscin__reward-tile" key={i}>
                    {isVid
                      ? <video src={rw.src} autoPlay muted loop playsInline preload="metadata" />
                      : <img src={rw.src} alt="" loading="lazy" />}
                  </Reveal>
                )
              })}
            </div>
            {b.credit && <Reveal as="p" className="cscin__rewards-credit">{b.credit}</Reveal>}
          </div>
        </section>
      )
    }

    case 'seasons':
      return (
        <section className="cscin__seasons">
          <div className="cscin__seasons-grid">
            {(b.items || []).map((s, i) => (
              <Reveal as="figure" className="cscin__season" key={i}>
                <div className="cscin__season-frame"><img src={s.src} alt={s.alt || ''} loading="lazy" /></div>
                {s.cap && <figcaption>{s.cap}</figcaption>}
              </Reveal>
            ))}
          </div>
        </section>
      )

    case 'videogrid':
      return (
        <section className="cscin__videogrid">
          {(b.eyebrow || b.title) && (
            <Reveal className="cscin__videogrid-head">
              {b.eyebrow && <span className="cscin__kicker">{b.eyebrow}</span>}
              {b.title && <h2 className="cscin__videogrid-title" {...html(b.title)} />}
            </Reveal>
          )}
          <div className="cscin__videogrid-row">
            {(b.videos || []).map((v, i) => (
              <figure key={i} className="cscin__vg-item">
                <div className="cscin__vg-frame">
                  <iframe src={v.embed} title={v.cap || ''} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" />
                </div>
                {v.cap && <figcaption>{v.cap}</figcaption>}
              </figure>
            ))}
          </div>
        </section>
      )

    case 'splitmedia': {
      const cls = 'cscin__split'
        + (b.divider ? ' cscin__split--divider' : '')
        + (b.invert ? ' cscin__split--invert' : '')
        + (b.tightBottom ? ' cscin__split--tight' : '')
        + (b.vcenter ? ' cscin__split--vcenter' : '')
      const gridCols = b.splitCols || (b.mediaWide ? 'minmax(0,0.9fr) minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,0.82fr)')
      const images = b.images || (b.src ? [{ src: b.src }] : [])
      const isCarousel = !!b.carousel && images.length > 1
      return (
        <section className={cls}>
          <div className="cscin__split-grid" style={{ gridTemplateColumns: gridCols }}>
            <Reveal className="cscin__split-text">
              <span className="cscin__kicker">{b.kicker}</span>
              <h2 className="cscin__split-title" {...html(b.title)} />
              <div className="cscin__split-body">
                {(b.body || []).map((p, i) => <p key={i} {...html(typeof p === 'string' ? p : (p.t || ''))} />)}
              </div>
              <CinLink link={b.link} />
            </Reveal>
            <Reveal as="figure" className={'cscin__split-fig' + (b.framed ? ' cscin__split-fig--framed' : '') + (b.mediaWide ? ' cscin__split-fig--wide' : '')}>
              {isCarousel
                ? <StackedSlider items={images} aspect={b.carAspect || '3/4'} fit="contain" />
                : <SplitSingle images={images} framed={b.framed} caption={b.caption} />}
            </Reveal>
          </div>
        </section>
      )
    }

    case 'quote':
      return (
        <section className="cscin__quote">
          <Reveal as="figure" className="cscin__quote-fig">
            <blockquote className="cscin__quote-text">“{b.quote}”</blockquote>
            <figcaption className="cscin__quote-cite">
              {b.cite}
              {b.link && b.link.href && (
                <> <Anchor href={b.link.href} className="cscin__quote-link">{b.link.text}</Anchor></>
              )}
            </figcaption>
          </Reveal>
        </section>
      )

    case 'result':
      return (
        <Reveal as="section" className={'cscin__result' + (b.tight ? ' cscin__result--tight' : '')}>
          <span className="cscin__sep" aria-hidden="true" />
          <span className="cscin__kicker cscin__result-kicker">{b.kicker}</span>
          <p className="cscin__result-value">{b.value}</p>
          {b.caption && <p className="cscin__result-cap" {...html(b.caption)} />}
        </Reveal>
      )

    case 'proof':
      return (
        <Reveal className="cscin__proof">
          <span className="cscin__sep" aria-hidden="true" />
          <span className="cscin__kicker cscin__result-kicker">{b.kicker}</span>
          <p className="cscin__result-value">{b.value}</p>
          {b.sub && <p className="cscin__proof-sub">{b.sub}</p>}
          {b.caption && <p className="cscin__result-cap" {...html(b.caption)} />}
        </Reveal>
      )

    case 'ratio':
      return (
        <section className="cscin__ratio">
          <Reveal className="cscin__ratio-inner">
            <div className="cscin__ratio-stat">
              <span className="cscin__ratio-value cscin__ratio-value--accent">{b.a.value}</span>
              <span className="cscin__ratio-label">{b.a.label}</span>
            </div>
            <span className="cscin__ratio-divider" aria-hidden="true">{b.divider || '/'}</span>
            <div className="cscin__ratio-stat">
              <span className="cscin__ratio-value">{b.b.value}</span>
              <span className="cscin__ratio-label">{b.b.label}</span>
            </div>
            <p className="cscin__ratio-cap" {...html(b.caption)} />
          </Reveal>
        </section>
      )

    case 'takeaway':
      return (
        <section className="cscin__takeaway">
          <Reveal className="cscin__takeaway-head">
            <span className="cscin__kicker">{b.kicker}</span>
            <h2 className="cscin__takeaway-title" {...html(b.title)} />
          </Reveal>
          {b.lede && <Reveal as="p" className="cscin__takeaway-lede" {...html(b.lede)} />}
          {b.principles && b.principles.length > 0 && (
            <>
              <Reveal as="span" className="cscin__kicker cscin__principles-label">Three repeatable principles</Reveal>
              <div className="cscin__principles">
                {b.principles.map((t, i) => (
                  <Reveal className="cscin__principle" key={i}>
                    <span className="cscin__principle-num">{t.num}</span>
                    <h3 {...html(t.head)} />
                    <p {...html(t.body)} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </section>
      )

    case 'cta':
      return (
        <section className="cscin__cta">
          <Reveal className="cscin__cta-inner">
            <span className="cscin__kicker">{b.kicker || 'Want this for your brand?'}</span>
            <h2 className="cscin__cta-title" {...html(b.title || "Let’s build one <mark>just like it</mark>.")} />
            <Link className="cscin__cta-btn" to={b.href || CONTACT_URL}>
              {b.label || 'Let’s talk'} <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </section>
      )

    default:
      return null
  }
}

export default function CaseStudyCinematic({ study, slug }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll('[data-rev]')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    // Mark anything already in viewport as in-view BEFORE arming the hide
    // class, so above-the-fold content never flashes blank.
    const inView = (el) => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight && r.bottom > 0
    }
    els.forEach((el) => { if (inView(el)) el.classList.add('is-in') })
    root.classList.add('reveal-on')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target) }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -7% 0px' },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [study])

  if (!study) return null
  const { hero, blocks, skin = 'dark', accent } = study
  const { prev, next } = getStudyNeighbours(slug || study.id)

  return (
    <article
      className="cscin"
      data-skin={skin}
      data-slug={slug}
      ref={rootRef}
      style={accent ? { '--accent': accent } : undefined}
    >
      {/* Slim top bar — back link + per-study eyebrow */}
      <div className="cscin__topbar">
        <Link to="/case-studies" className="cscin__topbar-back">
          <span className="cscin__topbar-arrow" aria-hidden="true">←</span>
          <span>All work</span>
        </Link>
        <span className="cscin__topbar-eyebrow">{hero.eyebrow}</span>
      </div>

      {/* Hero */}
      <section className="cscin__hero">
        <img className="cscin__hero-img" src={hero.img} alt={hero.imgAlt || ''} />
        <div className="cscin__hero-scrim" aria-hidden="true" />
        <div className="cscin__hero-bar">
          <span className="cscin__hero-meta">{hero.meta}</span>
        </div>
        <div className="cscin__hero-foot">
          <span className="cscin__hero-eyebrow">{hero.eyebrow}</span>
          <h1 className="cscin__hero-title" {...html(hero.title)} />
          <p className="cscin__hero-lede" {...html(hero.lede)} />
        </div>
        <div className="cscin__cue" aria-hidden="true">
          <span className="cscin__cue-label">Scroll</span>
          <span className="cscin__cue-line" />
        </div>
      </section>

      {blocks.map((b, i) => <Block b={b} key={i} />)}

      {/* Study footer — prev/next + back to index */}
      <nav className="cscin__footer" aria-label="Case study navigation">
        {prev && (
          <Link to={prev.route} className="cscin__footer-side cscin__footer-side--prev">
            <span className="cscin__footer-kicker"><span aria-hidden="true">←</span> Previous case study</span>
            <span className="cscin__footer-name">{prev.name}</span>
          </Link>
        )}
        <Link to="/case-studies" className="cscin__footer-home">
          <span className="cscin__footer-kicker">All case studies</span>
          <span className="cscin__footer-home-glyph" aria-hidden="true">▦</span>
        </Link>
        {next && (
          <Link to={next.route} className="cscin__footer-side cscin__footer-side--next">
            <span className="cscin__footer-kicker">Next case study <span aria-hidden="true">→</span></span>
            <span className="cscin__footer-name">{next.name}</span>
          </Link>
        )}
      </nav>
    </article>
  )
}
