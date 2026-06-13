import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import {
  featuredSpeaking,
  spokespersonReel,
  producedSpokeOn,
  voiceOverExample,
  appearances,
} from '../data/speaking.js'
import './HomePage.css' // shared .btn / .section-head styles
import './AboutPage.css' // reuses .about-speaking* classes

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* Speaking — full keynote and on-camera reel page.
 *
 * About page carries a tight teaser (3-up gallery + see-more CTA).
 * This page is the deep version: appearances log, spokesperson reel,
 * produced-and-spoke-on grid, voice-over example, booking CTA.
 *
 * Shares the .about-speaking* class system from AboutPage.css. */
export default function SpeakingPage() {
  useDocumentMeta({
    title: 'Speaking · Laura Cordrey · Keynote, spokesperson, voice over',
    description:
      'Laura Cordrey speaking reel: keynote presentations, live studio interviews, livestream hosting, on-camera spokesperson work and voice over. 50+ speaking moments across stage, studio and broadcast.',
    canonical: pageUrl('speaking'),
    ogType: 'profile',
  })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="about-speaking about-speaking--hero">
        <div className="container">
          <div className="section-head">
            <span className="marker">Keynote &amp; on camera</span>
            <h1 className="section-head__title">Speaking reel.</h1>
            <p className="about-speaking__lede">
              <mark>50+ speaking moments</mark> so far. From the Los
              Angeles E3 stage to Inside Xbox, from executive retailer
              meetings to live community broadcasts.
            </p>
          </div>

          {/* Featured 3 — same gallery shown as a teaser on About. */}
          <ul className="about-speaking__list about-speaking__list--grid">
            {featuredSpeaking.map((s) => (
              <li className="about-speaking__item" key={s.headline}>
                <span className="marker about-speaking__format">{s.format}</span>
                <div className="about-speaking__video">
                  {s.youtube ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${s.youtube}`}
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
                  <h3 className="about-speaking__headline">{s.headline}</h3>
                  {s.venue && (
                    <span className="marker about-speaking__venue">{s.venue}</span>
                  )}
                  <p
                    className="about-speaking__detail"
                    dangerouslySetInnerHTML={{ __html: s.detail }}
                  />
                </div>
              </li>
            ))}
          </ul>

          {/* Text-only list of further appearances beyond the 3 featured clips */}
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

          {/* Spokesperson reel — additional on-camera clips */}
          <div className="about-speaking__reel">
            <span className="marker">More on camera</span>
            <h2 className="about-speaking__reel-title">Spokesperson reel.</h2>
            <ul className="about-speaking__reel-grid">
              {spokespersonReel.map((v, i) => (
                <li key={i} className="about-speaking__reel-cell">
                  {v.youtube ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${v.youtube}`}
                      title={v.caption}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div className="about-speaking__placeholder" aria-hidden="true">
                      <span>Clip · TBD</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Videos Laura produced AND spoke on */}
          <div className="about-speaking__reel">
            <span className="marker">Behind and in front of the camera</span>
            <h2 className="about-speaking__reel-title">Produced &amp; spoke on.</h2>
            <ul className="about-speaking__reel-grid">
              {producedSpokeOn.map((v, i) => (
                <li key={i} className="about-speaking__reel-cell">
                  {v.youtube ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${v.youtube}`}
                      title={v.caption}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div className="about-speaking__placeholder" aria-hidden="true">
                      <span>Clip · TBD</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Voice over example */}
          <div className="about-speaking__voiceover">
            <span className="marker">Also</span>
            <h2 className="about-speaking__voiceover-title">
              I voice videos for other brands too.
            </h2>
            <p className="about-speaking__voiceover-detail">
              {voiceOverExample.detail}
            </p>
            <div className="about-speaking__voiceover-video">
              {voiceOverExample.youtube ? (
                <iframe
                  src={`https://www.youtube.com/embed/${voiceOverExample.youtube}`}
                  title={voiceOverExample.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              ) : (
                <div className="about-speaking__placeholder" aria-hidden="true">
                  <span>VO example · TBD</span>
                </div>
              )}
            </div>
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
