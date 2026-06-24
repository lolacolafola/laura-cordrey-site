import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import {
  speakingSections,
  appearances,
} from '../data/speaking.js'
import '../styles/shared.css' // shared .btn / .section-head styles
import './AboutPage.css' // reuses .about-speaking* classes
import './SpeakingPage.css' // local .speaking-hero* classes

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Speaking — full keynote and on-camera reel page.
 *
 * Organised by FORMAT: Stage / Studio & TV / Livestream / Produced &
 * voiced. Each section has 1+ clips; the first is the standout. About
 * page reuses speaking.js's derived `featuredSpeaking` for its teaser.
 *
 * Reuses .about-speaking* class system from AboutPage.css for clip
 * card styling. */
export default function SpeakingPage() {
  useDocumentMeta({
    title: 'Speaking · Laura Cordrey · Keynote, spokesperson, voice over',
    description:
      'Laura Cordrey speaking reel: keynote presentations, live studio interviews, livestream hosting, on-camera spokesperson work and voice over. 20+ speaking moments across stage, studio and broadcast.',
    canonical: pageUrl('speaking'),
    ogType: 'profile',
  })

  const BASE = import.meta.env.BASE_URL

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="speaking-hero">
        <figure className="speaking-hero__media">
          <video
            src={BASE + 'speaking/laura-e3-stage-wide.mp4'}
            poster={BASE + 'speaking/laura-e3-stage-wide-poster.jpg'}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Laura Cordrey on the Ubisoft E3 2019 stage in Los Angeles, presenting Delta Company to a live audience."
          />
        </figure>
        <div className="container speaking-hero__body">
          <span className="marker speaking-hero__kicker">Keynote &amp; on camera</span>
          <h1 className="speaking-hero__title">Speaking reel.</h1>
          <p className="speaking-hero__lede">
            <mark>20+ speaking moments</mark> so far. From the Los
            Angeles E3 stage to Inside Xbox, from executive retailer
            meetings to live community broadcasts.
          </p>
        </div>
      </section>

      <section className="about-speaking about-speaking--hero">
        <div className="container">

          {/* ─── FORMAT SECTIONS ──────────────────────────────────
              Stage / Studio & TV / Livestream / Produced & voiced.
              Each section title bar, then 1+ clip cards stacked. */}
          {speakingSections.map((section) => (
            <div
              key={section.key}
              className={`speaking-section speaking-section--${section.key}${
                section.clips.length === 1 ? ' speaking-section--single' : ''
              }`}
            >
              <header className="speaking-section__head">
                <span className="marker speaking-section__eyebrow">{section.eyebrow}</span>
                <h2 className="speaking-section__title">{section.title}.</h2>
              </header>

              <ul
                className={`about-speaking__list ${
                  section.clips.length > 1 ? 'about-speaking__list--grid' : ''
                }`}
              >
                {section.clips.map((s) => (
                  <li className="about-speaking__item" key={s.youtube || s.headline}>
                    <div className="about-speaking__video">
                      {s.youtube ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${s.youtube}${s.start ? `?start=${s.start}` : ''}`}
                          title={s.headline}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      ) : (
                        <div className="about-speaking__placeholder" aria-hidden="true">
                          <span>Clip · TBD</span>
                        </div>
                      )}
                    </div>
                    <div className="about-speaking__body">
                      {s.venue && (
                        <span className="marker about-speaking__venue">{s.venue}</span>
                      )}
                      <h3 className="about-speaking__headline">{s.headline}</h3>
                      <p
                        className="about-speaking__detail"
                        dangerouslySetInnerHTML={{ __html: s.detail }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ─── APPEARANCES LOG ──────────────────────────────── */}
          <div className="about-speaking__appearances">
            <span className="marker">Selected appearances</span>
            <ol className="about-speaking__list-text">
              {appearances.map((a) => (
                <li key={a.event + a.year} className="about-speaking__row">
                  <span className="about-speaking__row-year">{a.year}</span>
                  <span className="about-speaking__row-event">{a.event}</span>
                  <span className="about-speaking__row-context">{a.context}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="about-speaking__cta">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
              Book me to speak <span aria-hidden="true">→</span>
            </a>
            <Link to="/about" className="btn btn--ghost btn--lg">
              Back to about
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
