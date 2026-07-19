import { useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import {
  speakingSections,
  producedSections,
  appearances,
} from '../data/speaking.js'
import '../styles/shared.css'
import './SpeakingPage.css'

const CONTACT_URL = '/contact?intent=speaking'
const HELLO_EMAIL = 'hello@lauracordrey.com'

/* /speaking — Editorial index (direction 1d) per 8 Jul handoff.
 *
 * Five bands, ordered:
 *   1. Video hero        · #0E0B09 · full-bleed E3 clip + title anchored bottom
 *   2. On the stage      · #15110F · three editorial rows (60px|1.15fr|1fr)
 *   3. Off the stage     · #2D2723 · compact 2-column list, small tiles
 *   4. Selected appearances · #0E0B09 · vertical timeline w/ left rail
 *   5. Finale            · #A12A1E · oxblood, cream Book a chat CTA
 *
 * State: one `playingId` at a time. Clicking a poster swaps to an
 * autoplay YouTube iframe; starting another clip resets the previous.
 * Copy is verbatim from the handoff. */

// On-stage clips — flagship stage / live / livestream, one each.
// Studio's World-premiere announce stays out (Delta Company E3 above covers it).
const ON_STAGE_KEYS = ['stage', 'live', 'livestream']
const onStageClips = ON_STAGE_KEYS.map((k) => {
  const s = speakingSections.find((x) => x.key === k)
  return { ...s.clips[0], kicker: s.title }
})

// Off-stage clips — all produced pieces minus Delta Company announce
// (`XiIiqCktG2g`) since the on-stage E3 unveil covers Delta already.
// Case-study routes added where a piece has a dedicated /work case
// study (Azarus target = /case-studies/azarus-game-ads since the explainer is
// for the ad platform, not the streamer-led growth work).
const CASE_STUDY_MAP = {
  RsimGZVWlsU: '/case-studies/claw-mobile',
  '34AzFfo7C6E': '/case-studies/azarus-game-ads',
  F5g7fOzxGYY: '/case-studies/ubisoft-delta-company',
}
const offStageClips = producedSections
  .flatMap((s) => s.clips)
  .filter((c) => c.youtube !== 'XiIiqCktG2g')
  .map((c) => (CASE_STUDY_MAP[c.youtube] ? { ...c, caseStudy: CASE_STUDY_MAP[c.youtube] } : c))

/* Reusable poster / play / iframe pattern.
 * `size` = "lg" (on-stage row tile) or "sm" (off-stage compact tile). */
function ClipPoster({ clip, isPlaying, onPlay, size = 'lg' }) {
  if (isPlaying) {
    return (
      <div className={`sp-poster sp-poster--${size} is-playing`}>
        <iframe
          src={`https://www.youtube.com/embed/${clip.youtube}?autoplay=1&rel=0&modestbranding=1${clip.start ? `&start=${clip.start}` : ''}`}
          title={clip.headline}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }
  return (
    <button
      type="button"
      className={`sp-poster sp-poster--${size}`}
      onClick={onPlay}
      aria-label={`Play: ${clip.headline}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${clip.youtube}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <span className="sp-poster__play" aria-hidden="true">
        <svg width={size === 'lg' ? 24 : 18} height={size === 'lg' ? 24 : 18} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
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
  const [playingId, setPlayingId] = useState(null)

  return (
    <>
      {/* ─── 1 · VIDEO HERO ────────────────────────────────
        * Full-bleed E3 stage clip (autoplay-muted-loop) with a bottom-up
        * scrim so the title block reads against any frame. Nav sits
        * transparent from the Layout above. */}
      <section className="sp-hero">
        <figure className="sp-hero__media">
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
        <div className="container sp-hero__body">
          <span className="sp-eyebrow sp-eyebrow--gold">
            Speaking · On stage · On camera · Voice
          </span>
          <h1 className="sp-h1">The stages, the screen, the voice.</h1>
          <p className="sp-hero__lede">
            Thirteen years fronting fan moments for the biggest names in gaming. World-stage keynotes, live broadcast, and the pieces I wrote, produced and voiced myself.
          </p>
          <Link to={CONTACT_URL} className="btn btn--primary btn--lg sp-hero__cta">
            Book me to speak <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── 2 · ON THE STAGE (editorial rows) ─────────────
        * Three large work-rows on dark. Grid per row:
        * [ big index numeral | 16:9 click-to-play poster | text block ]. */}
      <section className="sp-band sp-band--onstage">
        <div className="container">
          <header className="sp-band__head">
            <div>
              <span className="sp-eyebrow sp-eyebrow--red">On stage &amp; on camera</span>
              <h2 className="sp-h2">On the stage.</h2>
            </div>
            <span className="sp-band__aside">Keynote · broadcast · host</span>
          </header>
          <ol className="sp-rows" aria-label="On the stage">
            {onStageClips.map((clip, i) => {
              const n = String(i + 1).padStart(2, '0')
              return (
                <li className="sp-row" key={clip.youtube}>
                  <span className="sp-row__idx" aria-hidden="true">{n}</span>
                  <div className="sp-row__media">
                    <ClipPoster
                      clip={clip}
                      isPlaying={playingId === clip.youtube}
                      onPlay={() => setPlayingId(clip.youtube)}
                      size="lg"
                    />
                  </div>
                  <div className="sp-row__body">
                    <span className="sp-kicker">{clip.kicker}</span>
                    <h3 className="sp-row__ttl">{clip.headline}</h3>
                    <span className="sp-venue">{clip.venue}</span>
                    <p className="sp-row__detail">{clip.detail}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ─── 3 · OFF THE STAGE (compact list) ───────────────
        * Two-column grid of compact items on warm grey. Each item:
        * small 16:9 tile + text block with an optional case study link. */}
      <section className="sp-band sp-band--offstage">
        <div className="container">
          <header className="sp-band__head">
            <div>
              <span className="sp-eyebrow sp-eyebrow--gold">Produced &amp; voiced</span>
              <h2 className="sp-h2">Off the stage.</h2>
            </div>
            <p className="sp-band__intro">
              Not just fronting the camera. The scripts, edits and voice tracks behind the work.
            </p>
          </header>
          <ol className="sp-list" aria-label="Off the stage">
            {offStageClips.map((clip) => (
              <li
                className={`sp-list__item${playingId === clip.youtube ? ' sp-list__item--playing' : ''}`}
                key={clip.youtube}
              >
                <div className="sp-list__media">
                  <ClipPoster
                    clip={clip}
                    isPlaying={playingId === clip.youtube}
                    onPlay={() => setPlayingId(clip.youtube)}
                    size="sm"
                  />
                </div>
                <div className="sp-list__body">
                  <span className="sp-kicker sp-kicker--bright">{clip.kicker}</span>
                  <h3 className="sp-list__ttl">{clip.headline}</h3>
                  <span className="sp-venue">{clip.venue}</span>
                  {clip.caseStudy && (
                    <Link to={clip.caseStudy} className="sp-caselink">
                      Read the case study <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 4 · SELECTED APPEARANCES (vertical timeline) ──
        * Left-rail gold vertical line + red ring nodes, one per row.
        * All nodes identical — no year is singled out visually. */}
      <section className="sp-band sp-band--timeline">
        <div className="container">
          <header className="sp-band__head">
            <div>
              <span className="sp-eyebrow sp-eyebrow--gold">The full picture</span>
              <h2 className="sp-h2">Selected appearances.</h2>
            </div>
            <p className="sp-band__intro">
              20+ moments across stage, broadcast and community.
            </p>
          </header>
          <ol className="sp-timeline" aria-label="Selected appearances">
            {appearances.map((a) => (
              <li key={a.event + a.year} className="sp-timeline__row">
                <span className="sp-timeline__node" aria-hidden="true" />
                <div className="sp-timeline__content">
                  <div className="sp-timeline__line">
                    <span className="sp-timeline__year">{a.year}</span>
                    <span className="sp-timeline__title">{a.event}</span>
                  </div>
                  <p className="sp-timeline__ctx">{a.context}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 5 · FINALE (oxblood) ──────────────────────────
        * Gold radial glow from bottom, cream Book a chat button,
        * plus a mailto: fallback. */}
      <section className="sp-band sp-band--finale">
        <div aria-hidden="true" className="sp-band__glow" />
        <div className="container sp-finale">
          <span className="sp-eyebrow sp-eyebrow--brightgold">The next one</span>
          <h2 className="sp-finale__title">
            If you have a moment coming up, put me in it.
          </h2>
          <Link to={CONTACT_URL} className="btn btn--lg sp-finale__cta">
            Book a chat <span aria-hidden="true">→</span>
          </Link>
          <p className="sp-finale__mail">
            Or email <a href={`mailto:${HELLO_EMAIL}`}>{HELLO_EMAIL}</a>
          </p>
        </div>
      </section>
    </>
  )
}
