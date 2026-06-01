import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import './HomePage.css' // shared .btn / .section-head styles
import './AboutPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

const range = [
  { word: 'Brand',     note: 'Story, identity, voice.' },
  { word: 'Product',   note: 'Loops, mechanics, retention.' },
  { word: 'Community', note: 'Belonging, advocacy, scale.' },
  { word: 'Growth',    note: 'Channels, CAC, repeat revenue.' },
]

// Drop YouTube IDs into `youtube` when a clip is ready. When null, the
// card renders as a typographic placeholder so the layout still works.
const speaking = [
  {
    youtube: null, // E3 2019 Ubisoft press conference — Delta Company moment
    headline: 'E3 2019 · Delta Company unveil',
    venue: 'Ubisoft press conference · Los Angeles',
    detail:
      'I went on stage at E3 2019 to unveil Delta&nbsp;Company — Ubisoft’s first creator advocacy program — live to <mark>10M+ viewers</mark>. The program went on to drive 60M+ organic UGC views with zero ad spend across three franchises.',
  },
  {
    youtube: null, // Drop a representative Ubisoft press / livestream clip
    headline: 'Ubisoft Spokesperson · 2018 — 2022',
    venue: '20+ global press, TV and live events',
    detail:
      'The public face for Ghost&nbsp;Recon, R6&nbsp;Siege and Assassin’s&nbsp;Creed creator programs. Franchise launches, on-camera press interviews, and retail pitches that landed Walmart, Target and GameStop buy-in.',
  },
  {
    youtube: null,
    headline: 'Available for keynotes, panels and workshops',
    venue: 'EMEA · US · Remote',
    detail:
      'Topics I take to the stage: <strong>fan-powered growth</strong>, <strong>community as an acquisition channel</strong>, <strong>creator programs at scale</strong>, <strong>turning audiences into advocates</strong>, and <strong>brand storytelling that travels</strong>.',
  },
]

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
  'Cross-Team Leadership',
  'Executive Pitches & Investor Decks',
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

          <h1 className="about-hero__title">
            I build fan-powered<br /> growth engines.
          </h1>

          <div className="about-hero__meta">
            <p className="about-hero__lede">
              Twelve years across brand, product, community and growth — at
              Ubisoft, BlaBlaCar, Amazon&nbsp;Games, Azarus and US&nbsp;Mobile.
              The pattern across all of them: the brands that grow fastest
              aren&rsquo;t the ones with the biggest ad budgets. They&rsquo;re the ones
              their fans <mark>can&rsquo;t stop talking about</mark>.
            </p>
            <p className="about-hero__sublede">
              I help founders and brand teams build that. The strategy, the
              programs, the operating system. Not in theory — in the room,
              under deadline, with revenue attached.
            </p>
          </div>
        </div>
      </section>

      {/* ─── RANGE: Brand · Product · Community · Growth ──────── */}
      <section className="about-range">
        <div className="container">
          <div className="section-head">
            <span className="marker">The range</span>
            <h2 className="section-head__title">Where I work.</h2>
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
        </div>
      </section>

      {/* ─── KEYNOTE SPEAKER ──────────────────────────────────── */}
      <section className="about-speaking">
        <div className="container">
          <div className="section-head">
            <span className="marker">Keynote &amp; public speaking</span>
            <h2 className="section-head__title">Keynote speaker.</h2>
            <p className="about-speaking__lede">
              I&rsquo;ve told the story of fan-powered growth on the biggest
              stages in entertainment — and to small executive rooms where
              the budget actually gets unlocked.
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
