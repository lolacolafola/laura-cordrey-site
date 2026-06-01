import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import './HomePage.css' // shared .btn / .section-head styles
import './AboutPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'
const BASE = import.meta.env.BASE_URL

const range = [
  { word: 'Brand',     note: 'Story, identity, voice.' },
  { word: 'Product',   note: 'UX, gamification, user feedback.' },
  { word: 'Community', note: 'Creator, loyalty, advocacy.' },
  { word: 'Growth',    note: 'Organic, influencer, UGC.' },
]

// Featured 3 — one per format (stage, studio, livestream)
const speaking = [
  {
    youtube: 'aSyZa3b58QA',
    headline: 'Live stage presentation',
    venue: 'E3 2019 · Ubisoft press conference · Los Angeles',
    detail:
      'I went on the E3 stage to premiere Delta&nbsp;Company — Ubisoft’s first creator advocacy program — live to <mark>millions of viewers</mark>. Go-big-or-go-home launch strategy, executed on the biggest stage in gaming.',
  },
  {
    youtube: 'ufsGn7eXY3k',
    headline: 'Live studio interview',
    venue: 'Inside Xbox · Seattle',
    detail:
      'I travelled to Seattle for a live <strong>Inside Xbox</strong> segment to detail a new content update for Ghost&nbsp;Recon Wildlands — on-camera, live, no second takes.',
  },
  {
    youtube: 'P2NYC5cQIZA',
    headline: 'Livestream I produced',
    venue: 'Ghost Recon Breakpoint · World-premiere announce',
    detail:
      'Part of the core team to present <strong>Ghost Recon Breakpoint</strong> in the world-premiere announce livestream. The launch moment that opened the franchise to a new generation of fans.',
  },
]

// Spokesperson reel — multiple videos where Laura is the on-camera voice.
// Drop YouTube IDs into the `youtube` field as Laura provides them.
const spokespersonReel = [
  { youtube: null, caption: 'Spokesperson clip · TBD' },
  { youtube: null, caption: 'Spokesperson clip · TBD' },
  { youtube: null, caption: 'Spokesperson clip · TBD' },
  { youtube: null, caption: 'Spokesperson clip · TBD' },
]

// Videos Laura produced AND spoke on (both roles, same project).
const producedSpokeOn = [
  { youtube: null, caption: 'Produced & narrated · TBD' },
  { youtube: null, caption: 'Produced & narrated · TBD' },
  { youtube: null, caption: 'Produced & narrated · TBD' },
]

// Voice over example — a video Laura made for another company.
const voiceOverExample = {
  youtube: null,
  title: 'Voice over example',
  detail:
    'A brand film I narrated for another company. Native English, fluent French — recorded studio or remote.',
}

const career = [
  {
    range: 'Jan 2024 — present',
    company: 'Cordrey Consulting',
    role: 'Consultant · Fan-Powered Growth',
    note: 'Paris & New York. Magic (founding team), US Mobile, Geode, Fivegem.',
  },
  {
    range: 'Nov 2021 — Aug 2023',
    company: 'Azarus',
    role: 'Head of Fan Growth → VP Marketing',
    note: 'Streamer Awards 2022, $AZA token launch, gamified ad platform pivot.',
  },
  {
    range: 'Jul 2021 — Dec 2021',
    company: 'Amazon Games',
    role: 'Community Lead, EMEA',
    note: 'New World launch — 1M+ CCV, 12.3M streamer hours watched.',
  },
  {
    range: 'Jan 2018 — Jul 2021',
    company: 'Ubisoft',
    role: 'Community Developer → Sr. Engagement Mgr.',
    note: 'Delta Company, Ghost Recon, R6 Siege Creator Program. Spokesperson at E3 2019.',
  },
  {
    range: 'Jun 2013 — Dec 2017',
    company: 'BlaBlaCar',
    role: 'UK Community → Brand Content Mgr.',
    note: 'UK launch 0→1M members. Brand & creative engine across 22 markets.',
  },
]

const expertise = [
  'Fan-Powered Growth Strategy',
  'Brand Positioning & Storytelling',
  'Go-To-Market Strategy',
  'Fan Ecosystem Design',
  'Community & Advocacy',
  'Loyalty Building',
  'Influencer & Partnership Strategy',
  'Creative Direction & Production',
  'Global Campaign Delivery',
  'Event & Activation Management',
  'Keynote & On-Stage Presenting',
  'Voice Over & Narration',
  'Cross-Team Leadership',
  'Executive Pitches & Investor Decks',
]

// Text-only appearances beyond the 3 video clips. Add more here freely.
const appearances = [
  { event: 'E3 2019 · Ubisoft Press Conference', context: 'Live stage · Delta Company global unveil · 10M+ viewers', year: '2019' },
  { event: 'Inside Xbox', context: 'Live TV interview · Ghost Recon Wildlands content drop', year: '2019' },
  { event: 'Ghost Recon Breakpoint · World Premiere', context: 'Global announce livestream · core presentation team', year: '2019' },
  { event: 'PlayStation Showcase appearances', context: 'On-camera segments · franchise updates', year: '2018–2021' },
  { event: 'Walmart · Target · GameStop pitches', context: 'Retail buy-in pitches for Ubisoft franchises', year: '2018–2021' },
  { event: 'R6 Siege Champions Program reveal', context: 'Community livestream host · 150+ creator program launch', year: '2021' },
  { event: 'Assassin’s Creed advocacy program', context: 'Community-facing presentations · brand updates', year: '2020' },
  { event: 'Ubisoft brand spokesperson', context: '20+ global press, TV and live events across 4 years', year: '2018–2022' },
]

export default function AboutPage() {
  useDocumentMeta({
    title: 'About Laura Cordrey · Strategic consultant · Brand · Product · Community · Growth',
    description:
      "Laura Cordrey is a strategic consultant building fan-powered growth engines. Twelve years across brand, product, community and growth at Ubisoft, BlaBlaCar, Amazon Games, Azarus, US Mobile and more.",
    canonical: '/about',
  })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="about-hero__top">
            <span className="marker">About · Vol. 01</span>
            <span className="marker about-hero__top-right">Paris · New York · English / Français</span>
          </div>

          <div className="about-hero__split">
            <div className="about-hero__text">
              <h1 className="about-hero__title">
                Community growth wasn&rsquo;t a job ten years ago.{' '}
                <mark>I made it one.</mark>
              </h1>
              <p className="about-hero__lede">
                I&rsquo;ve built from nothing. I&rsquo;ve built from
                millions. No matter where a brand is in their journey,
                I spot the opportunities, make the connections, and find
                the solutions that take brands{' '}
                <mark>from forgettable to fan-powered</mark>. I&rsquo;ve
                spent twelve years honing my craft at French and American
                conglomerates and startups — Ubisoft, Amazon, BlaBlaCar
                to name a few — and now I&rsquo;m here to build it for
                you.
              </p>
            </div>

            <figure className="about-hero__portrait">
              <img
                src={BASE + 'portraits/laura-e3.jpg'}
                alt="Laura Cordrey on the Ubisoft E3 2019 stage in Los Angeles, presenting Delta Company"
                loading="eager"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* ─── RANGE: Brand · Product · Community · Growth ──────── */}
      <section className="about-range">
        <div className="container">
          <div className="section-head">
            <span className="marker">Cross-discipline leadership</span>
            <h2 className="section-head__title">What I bring.</h2>
            <p className="about-range__lede">
              Most consultants own one topic. I own four. Work with a
              leader who can bring the whole <mark>bridge</mark> to your
              business.
            </p>
          </div>
          <ol className="about-range__list" aria-label="Disciplines I work across">
            {range.map((d) => (
              <li className="about-range__item" key={d.word}>
                <span className="about-range__mark" aria-hidden="true">✦</span>
                <span className="about-range__word">{d.word}</span>
                <span className="about-range__note">{d.note}</span>
              </li>
            ))}
          </ol>

          <div className="about-range__cta">
            <Link to="/work" className="btn btn--ghost">
              See it in practice <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── KEYNOTE SPEAKER ──────────────────────────────────── */}
      <section className="about-speaking">
        <div className="container">
          <div className="section-head">
            <span className="marker">Keynote &amp; public speaking</span>
            <h2 className="section-head__title">Keynote speaker.</h2>
            <p className="about-speaking__lede">
              <mark>50+ speaking moments</mark> so far. From the Los Angeles
              E3 stage to Inside Xbox, from executive retailer meetings to
              live community broadcasts. Here are a few.
            </p>
          </div>

          <ul className="about-speaking__list">
            {speaking.map((s) => (
              <li className="about-speaking__item" key={s.headline}>
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
            <h3 className="about-speaking__reel-title">Spokesperson reel.</h3>
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
            <h3 className="about-speaking__reel-title">Produced &amp; spoke on.</h3>
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
            <h3 className="about-speaking__voiceover-title">
              I voice videos for other brands too.
            </h3>
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
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Book me to speak <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── CAREER ───────────────────────────────────────────── */}
      <section className="about-career">
        <div className="container">
          <div className="section-head">
            <span className="marker">Career · Selected</span>
            <h2 className="section-head__title">Where I&rsquo;ve done it.</h2>
          </div>
          <ol className="about-career__list">
            {career.map((c) => (
              <li className="about-career__item" key={c.company + c.range}>
                <span className="marker about-career__range">{c.range}</span>
                <div className="about-career__body">
                  <h3 className="about-career__company">{c.company}</h3>
                  <p className="about-career__role">{c.role}</p>
                  <p className="about-career__note">{c.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── EXPERTISE ────────────────────────────────────────── */}
      <section className="about-expertise">
        <div className="container">
          <div className="section-head">
            <span className="marker">Expertise</span>
            <h2 className="section-head__title">What I&rsquo;m hired for.</h2>
          </div>
          <ul className="about-expertise__list">
            {expertise.map((x) => (
              <li className="about-expertise__chip" key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── EDUCATION + DETAILS ─────────────────────────────── */}
      <section className="about-details">
        <div className="container about-details__grid">
          <div>
            <span className="marker">Education</span>
            <ul className="about-details__list">
              <li>BA Honours, Comparative Literature — QMUL, London</li>
              <li>Entrepreneurship Strategy: From Ideation to Exit — HEC</li>
              <li>UX Foundations — Design Lab</li>
              <li>Creative Writing — Penguin</li>
            </ul>
          </div>
          <div>
            <span className="marker">Languages</span>
            <ul className="about-details__list">
              <li>English — native</li>
              <li>French — fluent</li>
            </ul>
          </div>
          <div>
            <span className="marker">Based in</span>
            <ul className="about-details__list">
              <li>Paris, France</li>
              <li>New York, US (regularly)</li>
              <li>Remote-friendly across EMEA / US timezones</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <span className="marker">Let&rsquo;s talk</span>
          <h2 className="about-cta__title">
            Want to build something fans <mark>can&rsquo;t stop talking about</mark>?
          </h2>
          <div className="about-cta__buttons">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
              Book a 30-min call <span aria-hidden="true">→</span>
            </a>
            <Link to="/work" className="btn btn--ghost btn--lg">
              See the work first
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
