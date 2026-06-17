import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import { featuredSpeaking } from '../data/speaking.js'
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

const expertiseLead = [
  'Fan-led growth strategy',
  'Brand positioning & storytelling',
  'Go-to-market',
  'Fan ecosystem design',
]

const expertiseAlso = [
  'Community & advocacy',
  'Loyalty',
  'Influencer & partnerships',
  'Creative direction & production',
  'Global campaigns',
  'Events & activations',
  'On-stage presenting',
  'Voice over',
  'Executive & investor decks',
]

export default function AboutPage() {
  useDocumentMeta({
    title: 'About Laura Cordrey · Strategic consultant · Fan-Led Growth · Brand, product, community, growth',
    description:
      "Laura Cordrey acts as a founder-level CMO for fan-driven brands. Thirteen years across brand, product, community and growth at Ubisoft, BlaBlaCar, Amazon Games, Azarus, US Mobile and more.",
    canonical: pageUrl('about'),
    ogType: 'profile',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        // Extended Person schema for the About page — fuller than the
        // homepage version (includes previous employers as alumniOf and
        // works as creator-of).
        {
          ...authorJsonLd(),
          mainEntityOfPage: pageUrl('about'),
          worksFor: {
            '@type': 'Organization',
            name: 'Laura Cordrey — Fan-Led Growth Consulting',
            url: pageUrl(''),
          },
          alumniOf: [
            { '@type': 'Organization', name: 'Ubisoft' },
            { '@type': 'Organization', name: 'BlaBlaCar' },
            { '@type': 'Organization', name: 'Amazon Games' },
            { '@type': 'Organization', name: 'Azarus' },
            { '@type': 'Organization', name: 'US Mobile' },
          ],
        },
        // AboutPage entity ties this page to the Person.
        {
          '@type': 'AboutPage',
          '@id': pageUrl('about'),
          name: 'About Laura Cordrey',
          mainEntity: { '@type': 'Person', name: 'Laura Cordrey', url: pageUrl('') },
        },
      ],
    },
  })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="about-hero__top">
            <span className="marker">About · Vol. 01</span>
            <span className="marker about-hero__top-right">London · Paris · New York · English &amp; French · Since 2013</span>
          </div>

          <div className="about-hero__split">
            <div className="about-hero__text">
              <h1 className="about-hero__title">
                Community growth wasn&rsquo;t a job ten years ago.{' '}
                <mark>I made it one</mark>.
              </h1>
              <p className="about-hero__lede">
                I&rsquo;ve built from nothing. I&rsquo;ve built from
                millions. Wherever a brand is on its journey, I take it{' '}
                <mark>from forgettable to fan-powered</mark>: lower
                acquisition cost, higher retention, earned reach you
                would otherwise pay for. I&rsquo;ve spent thirteen years
                honing the craft at Ubisoft, Amazon Games and BlaBlaCar.
                Now I act as a founder-level CMO for fan-driven brands,
                building the brand that makes people fall for you and
                the fan-led engine that turns that love into repeatable,
                measurable growth.
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
              Most consultants own one topic. I own four. Work with{' '}
              <mark>one person</mark> who connects brand, product,
              community and growth, instead of four who don&rsquo;t.
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

      {/* ─── HOW I WORK NOW ───────────────────────────────────── */}
      <section className="about-range">
        <div className="container">
          <div className="section-head">
            <span className="marker">How I work now</span>
            <h2 className="section-head__title">AI is my team.</h2>
            <p className="about-range__lede">
              AI is my team. Ten years is my judgment. I&rsquo;m a
              founding team member at Magic, a next-gen fan engagement
              platform, and I run my own practice solo: strategy,
              positioning, brand, product, and the code to ship it.{' '}
              <mark>The decade makes it good. AI makes it fast.</mark>
            </p>
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
              <mark>20+ speaking moments</mark> so far. From the Los Angeles
              E3 stage to Inside Xbox, from executive retailer meetings to
              live community broadcasts. Here are a few.
            </p>
          </div>

          {/* Teaser gallery: one card per format (Stage / Studio /
              Livestream). Tight on About — the full reel lives at
              /speaking. */}
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

          <div className="about-speaking__cta">
            <Link to="/speaking" className="btn btn--ghost">
              See the full speaker reel <span aria-hidden="true">→</span>
            </Link>
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
            {expertiseLead.map((x) => (
              <li className="about-expertise__chip about-expertise__chip--lead" key={x}>{x}</li>
            ))}
          </ul>
          <p className="about-expertise__also marker">
            Also · {expertiseAlso.join(' · ')}
          </p>
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
              <li>New York, USA (regularly)</li>
              <li>Remote-friendly across EMEA / USA timezones</li>
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
