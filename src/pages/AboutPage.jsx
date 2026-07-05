import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import { featuredSpeaking } from '../data/speaking.js'
import '../styles/shared.css' // shared .btn / .section-head styles
import './AboutPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const BASE = import.meta.env.BASE_URL

// Four disciplines, run as one Fan Engine.
const range = [
  { word: 'Brand',     note: 'Build the story that turns customers into fans.' },
  { word: 'Product',   note: 'Design the wow moments that bring fans back.' },
  { word: 'Community', note: 'Build a space where fans belong.' },
  { word: 'Growth',    note: "Earn the reach you'd otherwise pay for." },
]

// Selected experience — a monochrome logo strip replaces the dated CV
// timeline. Reuses the same proven, correctly-rendering logo assets as
// the homepage proof strip (all read on the dark band below).
const experience = [
  { src: 'logos/blablacar-vert.png',        alt: 'BlaBlaCar', maxw: 108 },
  { src: 'logos/ubisoft-stacked-white.png', alt: 'Ubisoft', maxw: 108 },
  { src: 'logos/amazon-game-studios.png',   alt: 'Amazon Game Studios', maxw: 96 },
  { src: 'logos/azarus-vert.png',           alt: 'Azarus / Animoca', maxw: 108 },
  { src: 'logos/us-mobile-mark.png',        alt: 'US Mobile', maxw: 108 },
]

export default function AboutPage() {
  useDocumentMeta({
    title: 'About · Laura Cordrey · Fan-led growth for fan-driven brands',
    description:
      'Laura Cordrey builds fan-led growth for fan-driven brands: the brand people fall for, and the Fan Engine that turns that love into measurable growth. Thirteen years across brand, product, community and growth at Ubisoft, BlaBlaCar, Amazon Games, Azarus and US Mobile.',
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
            name: 'Laura Cordrey · Fan-Led Growth Consulting',
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
            <span className="marker">About</span>
          </div>

          <div className="about-hero__split">
            <div className="about-hero__text">
              <h1 className="about-hero__title">
                Fan-led growth wasn&rsquo;t a job ten years ago.{' '}
                <mark>I made it one</mark>.
              </h1>
              <p className="about-hero__lede">
                I build fan-led growth for fan-driven brands: the brand
                they fall for, and the Fan Engine that turns that love
                into <mark>growth you can measure</mark>. Lower
                acquisition cost, higher retention, the reach you would
                otherwise pay for.
              </p>
              <p className="about-hero__lede">
                I&rsquo;ve built from nothing and I&rsquo;ve built from
                millions. Thirteen years of it, most of it in gaming,
                entertainment and live service, where fans are loudest and
                feedback lands in real time. That is{' '}
                <mark>founder-level experience</mark>, not a job title.
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

      {/* ─── THE GAP (thesis) ─────────────────────────────────── */}
      <section className="about-prose">
        <div className="container about-prose__inner">
          <span className="marker">The opportunity</span>
          <h2 className="about-prose__title">The gap I&rsquo;m building for.</h2>
          <p className="about-prose__copy">
            Paid acquisition is a whole discipline now: budgets, teams,
            dashboards, a playbook everyone follows. Growing with the fans
            you already have is not. The work that makes acquisition pay
            off, the onboarding that lands, the habit that forms, the
            advocacy that brings the next wave, rarely gets built as a
            structured system, and almost never gets measured properly. So
            it looks optional. It isn&rsquo;t.
          </p>
          <p className="about-prose__copy">
            That is what I build: fan-led growth, run as a structured
            engine and measured in your numbers. You know product-led
            growth, where the product sells itself. This is the next turn:{' '}
            <mark>your fans sell it for you</mark>, and I can prove what
            it&rsquo;s worth to the business.
          </p>
        </div>
      </section>

      {/* ─── STORYTELLER ──────────────────────────────────────── */}
      <section className="about-prose about-prose--alt">
        <div className="container about-prose__inner">
          <span className="marker">How I think</span>
          <h2 className="about-prose__title">I&rsquo;m a storyteller first.</h2>
          <p className="about-prose__copy">
            Everything I build starts with story. A brand people fall for
            is a story told well. So is a product that pulls people back
            the next day, a launch that travels, a community that feels
            like somewhere you belong. I&rsquo;ve named and positioned
            brands, written and produced from script to screen, and built
            content engines that ran across twenty-two markets. The
            strategy works because <mark>the story underneath it holds</mark>.
          </p>
        </div>
      </section>

      {/* ─── WORLDS (Product / gamification) ──────────────────── */}
      <section className="about-prose">
        <div className="container about-prose__inner">
          <span className="marker">Product</span>
          <h2 className="about-prose__title">I build worlds people fall for.</h2>
          <p className="about-prose__copy">
            I&rsquo;ve always loved games. Working at Ubisoft taught me
            what makes people fall for a world: a reason to explore, to
            collect, to climb for status, to belong. It&rsquo;s a lesson
            I&rsquo;ve carried through every brand, product and community
            I&rsquo;ve built since: <mark>build worlds people want to live
            in</mark>, not just funnels they pass through.
          </p>
        </div>
      </section>

      {/* ─── SENTIMENT (Community) ────────────────────────────── */}
      <section className="about-prose about-prose--alt">
        <div className="container about-prose__inner">
          <span className="marker">Community</span>
          <h2 className="about-prose__title">I catch a community before it turns.</h2>
          <p className="about-prose__copy">
            Live games taught me that a 15-million-player community can
            turn in a day. I held it at an average of 85% positive
            sentiment through launches, updates and the rough patches, by
            reading the signals in real time and acting before they
            spiked. Steering a community&rsquo;s mood is a craft, and an
            early-warning system. It is <mark>the one AI products will need
            most</mark>, and I have run it at the scale of a live game.
          </p>
        </div>
      </section>

      {/* ─── BIG MOMENT (Live) ────────────────────────────────── */}
      <section className="about-prose">
        <div className="container about-prose__inner">
          <span className="marker">Live</span>
          <h2 className="about-prose__title">Trusted with the big moment.</h2>
          <p className="about-prose__copy">
            Hand me your biggest brand moment, the launch, the drop, the
            thing everyone will be watching, and I&rsquo;ll deliver it{' '}
            <mark>with a cool head</mark>. I&rsquo;ve unveiled my own fan
            program live on the E3 stage, with millions watching worldwide,
            and run live events with 500,000 watching at once, owning every
            part of them. Go big or go home.
          </p>
        </div>
      </section>

      {/* ─── HOW I WORK NOW (Magic) ───────────────────────────── */}
      <section className="about-now">
        <div className="container about-now__inner">
          <span className="marker">How I work now</span>
          <p className="about-now__copy">
            I run my practice solo: strategy, positioning, brand, product, and
            the code to ship it. And I&rsquo;m not just advising on fan
            engagement, <mark>I&rsquo;m building it</mark>, as Fractional Head
            of Brand &amp; Growth at <strong>Magic</strong>, a fan engagement
            platform. Experience makes the work good. AI makes it fast.
          </p>
        </div>
      </section>

      {/* ─── FOUR DISCIPLINES, ONE ENGINE ─────────────────────── */}
      <section className="about-range">
        <div className="container">
          <div className="section-head">
            <span className="marker">Brand · Product · Community · Growth</span>
            <h2 className="section-head__title">Four disciplines. One engine.</h2>
            <p className="about-range__lede">
              I don&rsquo;t own one topic, I own four, and I run them as{' '}
              <mark>one Fan Engine</mark>.
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

          <p className="about-range__close">
            I&rsquo;ve built in all four. That is what lets me wire them
            into one engine and put a number on the whole thing.
          </p>

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

      {/* ─── SELECTED EXPERIENCE (logo strip) ─────────────────── */}
      <section className="about-experience">
        <div className="container about-experience__inner">
          <span className="marker about-experience__marker">Selected experience</span>
          <h2 className="about-experience__title">Where I&rsquo;ve built this.</h2>
          <ul className="about-experience__logos" aria-label="Brands I have built fan-led growth for">
            {experience.map((l) => (
              <li className="about-experience__cell" key={l.alt}>
                <img
                  src={BASE + l.src}
                  alt={l.alt}
                  style={{ maxWidth: l.maxw }}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
          <p className="about-experience__note">
            These were roles, not just clients. One of them, Azarus, went on
            to be <strong>acquired by Animoca</strong>. Full history on{' '}
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn</a>.
            Case studies on <Link to="/work">Work</Link>.
          </p>
        </div>
      </section>

      {/* ─── EDUCATION + DETAILS ─────────────────────────────── */}
      <section className="about-details">
        <div className="container about-details__grid">
          <div>
            <span className="marker">Education</span>
            <ul className="about-details__list">
              <li>BA Honours, Comparative Literature · QMUL, London</li>
              <li>Entrepreneurship Strategy: From Ideation to Exit · HEC</li>
              <li>UX Foundations · Design Lab</li>
              <li>Creative Writing · Penguin</li>
            </ul>
          </div>
          <div>
            <span className="marker">Languages</span>
            <ul className="about-details__list">
              <li>English · native</li>
              <li>French · fluent</li>
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
          <p className="about-cta__lede">
            If you have a fanbase, or the makings of one, there is measurable
            growth in it waiting to be built.
          </p>
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
