import { useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import {
  speakingSections,
  producedSections,
  appearances,
} from '../data/speaking.js'
import '../styles/shared.css' // shared .btn / .section-head styles
import './AboutPage.css' // reuses .about-speaking* classes
import './SpeakingPage.css' // local .speaking-hero* + .speaking-section* classes

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

/* /speaking — Laura's speaking + on/around-camera reel.
 *
 * Structure (per 7 Jul mockup):
 *   1. Hero — E3 stage video bg, big headline, book + play-with-sound CTAs
 *   2. Anchor line — "Here to book me for a speaking gig? Find a time →"
 *   3. On the stage — 3 tiles: signature stage, live broadcast, host
 *   4. Off the stage — 4 tiles: produced / voiced / on-camera work
 *   5. Selected appearances table
 *   6. Close — "Want me on your stage, or in your film?"
 *
 * The /produced page was folded in here: most of Laura's produced work
 * has her ON it (VO, on-camera, hosting) so the two bodies of work aren't
 * really separate. One page, two strands.
 *
 * Reuses .about-speaking* class system from AboutPage.css for clip cards. */

// On the stage — pull the three flagship clips from speakingSections.
// Studio (World-premiere announce) is dropped for tightness; the E3 stage
// unveil already carries the Delta Company story at the top of the strand.
const ON_STAGE_KEYS = ['stage', 'live', 'livestream']
const onStageClips = ON_STAGE_KEYS.map((k) => {
  const section = speakingSections.find((s) => s.key === k)
  return { ...section.clips[0], kicker: section.title }
})

// Off the stage — every produced clip except Delta Company announce
// (the E3 stage unveil covers Delta already, no need to repeat).
const offStageClips = producedSections
  .flatMap((s) => s.clips)
  .filter((c) => c.youtube !== 'XiIiqCktG2g')
  // Claw links out to its case study on /work — surface that.
  .map((c) => (c.youtube === 'RsimGZVWlsU' ? { ...c, caseStudy: '/work/claw-mobile' } : c))

function ClipCard({ clip, isPlaying, onPlay }) {
  return (
    <li className="about-speaking__item">
      <div className="about-speaking__video">
        {isPlaying ? (
          <iframe
            src={`https://www.youtube.com/embed/${clip.youtube}?autoplay=1${clip.start ? `&start=${clip.start}` : ''}`}
            title={clip.headline}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="about-speaking__poster"
            onClick={onPlay}
            aria-label={`Play: ${clip.headline}`}
          >
            <img
              src={`https://i.ytimg.com/vi/${clip.youtube}/maxresdefault.jpg`}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <span className="about-speaking__play" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="about-speaking__body">
        {clip.kicker && (
          <span className="marker about-speaking__format">{clip.kicker}</span>
        )}
        {clip.venue && (
          <span className="marker about-speaking__venue">{clip.venue}</span>
        )}
        <h3 className="about-speaking__headline">{clip.headline}</h3>
        <p className="about-speaking__detail">{clip.detail}</p>
        {clip.caseStudy && (
          <Link to={clip.caseStudy} className="about-speaking__caselink">
            Read the case study <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </li>
  )
}

export default function SpeakingPage() {
  useDocumentMeta({
    title: 'Speaking · Laura Cordrey · Keynote, spokesperson, voice over',
    description:
      'Laura Cordrey speaking reel: keynote presentations, live studio interviews, livestream hosting, on-camera spokesperson work and voice over. 20+ speaking moments across stage, studio and broadcast.',
    canonical: pageUrl('speaking'),
    ogType: 'profile',
  })

  const BASE = import.meta.env.BASE_URL
  // Only one clip plays at a time — click a poster to start it, playing
  // another auto-swaps the previous back to its poster state.
  const [playingId, setPlayingId] = useState(null)

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────
        * Full-bleed E3 stage video with a dark scrim from the bottom
        * so the title block reads against any frame. */}
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
          <span className="marker speaking-hero__kicker">
            Speaking · On stage · On camera · Voice
          </span>
          <h1 className="speaking-hero__title">The stages, the screen, the voice.</h1>
          <p className="speaking-hero__lede">
            A decade fronting fan moments for the biggest names in gaming. World-stage keynotes, live broadcast, and the pieces I wrote, produced and voiced myself.
          </p>
          <div className="speaking-hero__ctas">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
              Book me to speak <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <section className="about-speaking about-speaking--hero">
        <div className="container">

          {/* ─── ON THE STAGE (3 tiles) ────────────────────── */}
          <div className="speaking-section speaking-section--onstage">
            <header className="speaking-section__head">
              <span className="marker speaking-section__eyebrow">On stage &amp; on camera</span>
              <h2 className="speaking-section__title">On the stage.</h2>
              <p className="speaking-section__intro">Keynote · broadcast · host</p>
            </header>
            <ul className="about-speaking__list about-speaking__list--grid speaking-onstage__grid">
              {onStageClips.map((clip) => (
                <ClipCard
                  key={clip.youtube}
                  clip={clip}
                  isPlaying={playingId === clip.youtube}
                  onPlay={() => setPlayingId(clip.youtube)}
                />
              ))}
            </ul>
          </div>

          {/* ─── OFF THE STAGE (produced & voiced, 4 tiles) ── */}
          <div className="speaking-section speaking-section--offstage">
            <header className="speaking-section__head">
              <span className="marker speaking-section__eyebrow">Produced &amp; voiced</span>
              <h2 className="speaking-section__title">Off the stage.</h2>
              <p className="speaking-section__intro">
                Not just fronting the camera. The scripts, edits and voice tracks behind the work.
              </p>
            </header>
            <ul className="about-speaking__list about-speaking__list--grid speaking-offstage__grid">
              {offStageClips.map((clip) => (
                <ClipCard
                  key={clip.youtube}
                  clip={clip}
                  isPlaying={playingId === clip.youtube}
                  onPlay={() => setPlayingId(clip.youtube)}
                />
              ))}
            </ul>
          </div>

          {/* ─── APPEARANCES LOG ──────────────────────────────
            * Selected appearances table — the "long tail" alongside
            * the featured tiles. Format column separates keynote
            * from on-camera from buy-in pitches, per mockup. */}
          <div className="about-speaking__appearances">
            <span className="marker speaking-section__eyebrow">The full picture</span>
            <h2 className="speaking-section__title">Selected appearances.</h2>
            <p className="speaking-section__intro">20+ moments across stage, broadcast and community.</p>
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

          {/* ─── CLOSE ───────────────────────────────────────── */}
          <div className="speaking-close">
            <span className="marker speaking-close__kick">The next one</span>
            <h2 className="speaking-close__title">
              If you&rsquo;ve got a moment coming up, put me in it.
            </h2>
            <div className="speaking-close__ctas">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
                Book a chat <span aria-hidden="true">→</span>
              </a>
            </div>
            <p className="about-speaking__inquiry">
              Or email <a href="mailto:hello@lauracordrey.com">hello@lauracordrey.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
