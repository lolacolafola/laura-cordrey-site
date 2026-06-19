import { Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies.js'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import './HomePage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

// Placeholder routes — to be wired when the assessment + calculator tools ship.
const ASSESSMENT_URL = '#assessment'
const CALCULATOR_URL = '#value-calculator'

const eyebrow = 'Founder-level CMO for fan-driven brands'

// Hero proof strip: number → client → "a fan ___" tag.
// Order: drop / campaign / program (signals product / growth / community range).
const heroProofs = [
  {
    id: 'us-mobile-dark-star',
    value: '$32K, under 3 hrs',
    client: 'US Mobile',
    tag: 'a fan drop',
  },
  {
    id: 'azarus',
    value: '+80% MAU',
    client: 'Azarus / Animoca',
    tag: 'a fan campaign',
  },
  {
    id: 'ubisoft-siege-champions',
    value: '60M+ UGC views, $0 spend',
    client: 'Ubisoft',
    tag: 'a fan program',
  },
]

// Selected work: three featured case studies, full-width stacked rows.
// Top slot reserved for the future AI case study.
// Each row gets a different image shape (cinematic / portrait / square)
// to give the row its own visual personality. Backgrounds alternate
// bg / bg-deep / bg across the three rows for subtle band rhythm.
// Image cascades to media.cardImage if present, then media.image.
const selectedWork = [
  {
    id: 'us-mobile-dark-star',
    company: 'US Mobile',
    title: 'Dark Star',
    year: '2024',
    result: '$32K in under three hours.',
    line: 'A free SIM kit turned into a $129 fan bundle that sold out instantly.',
    shape: 'cinematic',
  },
  {
    id: 'azarus-game-ads',
    company: 'Azarus',
    title: 'Game ad platform',
    year: '2022–2023',
    result: 'Built, then acquired by Animoca.',
    line: 'A gamified ad platform at a $2 CPI, with Ubisoft and Logitech as advertisers.',
    shape: 'portrait',
  },
  {
    id: 'ubisoft-siege-champions',
    company: 'Ubisoft',
    title: 'Siege Champions',
    year: '2020–2021',
    result: '50M+ UGC views at $0 media spend.',
    line: 'A creator advocacy program across 18 markets, where fans made the reach, not ads.',
    shape: 'square',
  },
].map((w) => {
  const cs = caseStudies.find((c) => c.id === w.id)
  const image = cs?.media?.cardImage || cs?.media?.image
  return { ...w, image, imageAlt: cs?.media?.imageAlt || `${w.company} — ${w.title}` }
})

const BASE = import.meta.env.BASE_URL

const disciplines = [
  { word: 'Brand',     note: 'Story, identity, voice.' },
  { word: 'Product',   note: 'UX, gamification, user feedback.' },
  { word: 'Community', note: 'Creator, loyalty, advocacy.' },
  { word: 'Growth',    note: 'Organic, influencer, UGC.' },
]

export default function HomePage() {
  useDocumentMeta({
    title: 'Laura Cordrey · Founder-level CMO for fan-driven brands · Fan-Led Growth',
    description:
      'Laura Cordrey acts as a founder-level CMO for fan-driven brands. Brand plus fan-led growth, AI as the engine. Case studies: Ubisoft Delta Company, Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation.',
    canonical: pageUrl(''),
    ogType: 'website',
    jsonLd: authorJsonLd(),
  })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero__inner">
          <h1 className="hero__title">
            Fans who <em className="accent">stay</em>, <em className="accent">pay</em>,<br />
            and <em className="accent">bring more</em>.
          </h1>

          <p className="hero__lede-copy">
            The customers you pay to acquire are worth far more than
            they cost you. I build the engine that turns customers
            into fans who stay, spend more, and bring the next wave,
            so every dollar you spend compounds.
          </p>

          <div className="hero__ctas">
            <a href={ASSESSMENT_URL} className="btn btn--primary btn--lg">
              Score your fan growth <span aria-hidden="true">→</span>
            </a>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost btn--lg">
              Book a 30-min call <span aria-hidden="true">→</span>
            </a>
          </div>

        </div>
      </section>

      {/* ─── ABOUT: short intro left, portrait right ──────────── */}
      <section className="about-strip">
        <div className="container about-strip__inner">
          <div className="about-strip__body">
            <span className="marker">Hi, I&rsquo;m Laura</span>
            <h2 className="about-strip__intro">
              Ten years of <em className="accent">fan-led growth</em>.
            </h2>
            <p className="about-strip__copy">
              Founder-level CMO for brands ready to turn customers
              into fans, and fans into an engine of growth.
            </p>

            <div className="about-strip__ctas">
              <Link to="/about" className="btn btn--primary">
                Learn more about me <span aria-hidden="true">→</span>
              </Link>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Book a call <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <figure className="about-strip__portrait">
            <div className="about-strip__portrait-frame">
              <img
                src={BASE + 'portraits/laura-ubi-xp-2019-v2.jpeg'}
                alt="Laura Cordrey speaking on stage at Ubisoft XP"
                className="about-strip__portrait-img"
              />
            </div>
          </figure>
        </div>

        {/* ─── Client credentials, integrated into about-strip ─── */}
        <div className="container about-strip__clients">
          <span className="marker about-strip__clients-label">
            Ten years building this across
          </span>
          <ul className="about-strip__clients-list">
            <li className="about-strip__client">
              <img
                src={BASE + 'logos/ubisoft stacked logo_white.png'}
                alt="Ubisoft"
                className="about-strip__client-logo"
                loading="lazy"
              />
            </li>
            <li className="about-strip__client about-strip__client--wide">
              <img
                src={BASE + 'logos/amazon-game-studios.png'}
                alt="Amazon Game Studios"
                className="about-strip__client-logo"
                loading="lazy"
              />
            </li>
            <li className="about-strip__client">
              <img
                src={BASE + 'logos/BlaBlaCar_Vert_Blue_RGB.png'}
                alt="BlaBlaCar"
                className="about-strip__client-logo"
                loading="lazy"
              />
            </li>
            <li className="about-strip__client">
              <img
                src={BASE + 'logos/us-mobile-mark.png'}
                alt="US Mobile"
                className="about-strip__client-logo"
                loading="lazy"
              />
            </li>
            <li className="about-strip__client">
              <img
                src={BASE + 'logos/Azarus Logo Vertical-s.png'}
                alt="Azarus / Animoca"
                className="about-strip__client-logo"
                loading="lazy"
              />
            </li>
          </ul>
        </div>
      </section>

      {/* ─── THE OPPORTUNITY (static value beat) ──────────────── */}
      <section className="opportunity">
        <div className="container opportunity__inner">
          <div className="opportunity__lede">
            <span className="marker">What your fandom is worth</span>
            <h2 className="opportunity__title">
              The revenue waiting after <em className="accent">the first sale</em>.
            </h2>
            <p className="opportunity__copy">
              Most brands pour money into acquisition and stop there. But a lot
              of value comes after the first sale, from the customers you keep
              and the ones your fans bring. On conservative assumptions, that
              can run from <mark>six figures into the millions a year</mark>,
              depending on your size. It&rsquo;s a starting point, not a
              promise: I size the real number on your own data.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
              Book a call <span aria-hidden="true">→</span>
            </a>
          </div>

          <aside className="opportunity__callout" aria-hidden="true">
            <span className="opportunity__callout-line">From <em className="accent">six figures</em></span>
            <span className="opportunity__callout-line">into <em className="accent">the millions</em></span>
            <span className="opportunity__callout-tail marker">a year, depending on your size</span>
          </aside>
        </div>
      </section>

      {/* ─── WHY I'M HERE (vision, short) ─────────────────────── */}
      <section className="vision">
        <div className="container vision__inner">
          <span className="marker">Why I&rsquo;m here</span>
          <h2 className="vision__title">
            Connect the work. <em className="accent">Put a number on it.</em>
          </h2>
          <p className="vision__copy">
            For ten years I&rsquo;ve watched fan-led work drive
            results most teams only dream of: sold-out drops, millions
            of organic views, communities that grow themselves. But
            almost always in pieces. Brand here, community there,
            growth somewhere else, never built as one engine. And the
            people doing it could rarely prove its worth, so it got
            treated as a nice-to-have instead of the growth lever it
            is. I built my practice to change that: to connect the
            work into one system and put a number on it, so it stands
            alongside paid acquisition instead of in its shadow.
          </p>
        </div>
      </section>

      {/* ─── METHODOLOGY ──────────────────────────────────────── */}
      <section className="method">
        <div className="container method__inner">
          <div className="method__lede">
            <span className="marker">The methodology</span>
            <h2 className="method__title">
              Four disciplines.<br />
              <em className="accent">One system.</em>
            </h2>
            <p className="method__copy">
              Most strategists work in one domain. I&rsquo;ve spent
              ten years across all four and connected them into one
              system: the Fan Engine. Not a framework I read, a
              system I built.
            </p>
            <p className="method__copy">
              It turns a customer into a fan through five stages,
              Activation, Habit, Belonging, Identity, Advocacy, and
              advocacy brings in the next, so it compounds. Every
              stage measured, the part fan-led work usually leaves
              unproven.
            </p>
            <div className="method__ctas">
              <Link to="/methodology" className="btn btn--primary">
                Inside the method <span aria-hidden="true">→</span>
              </Link>
              <a href={ASSESSMENT_URL} className="btn btn--ghost">
                Score your fan growth <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <ol className="method__disciplines" aria-label="Disciplines I work across">
            {disciplines.map((d) => (
              <li className="method__discipline" key={d.word}>
                <span className="method__discipline-mark" aria-hidden="true">✦</span>
                <span className="method__discipline-word">{d.word}</span>
                <span className="method__discipline-note">{d.note}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── SELECTED WORK — full-width stacked rows ──────────── */}
      <section className="work">
        <div className="container">
          <div className="section-head">
            <span className="marker">Selected work · 2020–2024</span>
            <h2 className="section-head__title">The work.</h2>
          </div>

          <ol className="work-rows">
            {selectedWork.map((w, i) => (
              <li
                className={`work-row work-row--${w.shape}${i % 2 === 1 ? ' work-row--flip' : ''}`}
                key={w.id}
              >
                <Link to={`/work/${w.id}`} className="work-row__link">
                  <span className="work-row__index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="work-row__head">
                    <span className="work-row__company">{w.company}</span>
                    <span className="work-row__title">{w.title}</span>
                    <span className="work-row__year marker">{w.year}</span>
                  </div>
                  {w.image && (
                    <figure className="work-row__media">
                      <img src={BASE + w.image} alt={w.imageAlt} loading="lazy" />
                    </figure>
                  )}
                  <div className="work-row__body">
                    <p className="work-row__result">{w.result}</p>
                    <p className="work-row__line">{w.line}</p>
                    <span className="work-row__cta marker">
                      Read the story <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <div className="work__all">
            <Link to="/work" className="btn btn--ghost">
              All work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="final-cta">
        <div className="container final-cta__inner">
          <span className="marker">Let&rsquo;s work together</span>
          <h2 className="final-cta__title">
            What&rsquo;s your <em className="accent">fandom</em> worth?
          </h2>
          <p className="final-cta__line">
            Find your number, then let&rsquo;s build the engine that captures it.
          </p>
          <div className="final-cta__ctas">
            <a href={ASSESSMENT_URL} className="btn btn--primary btn--lg">
              Score your fan growth <span aria-hidden="true">→</span>
            </a>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost btn--lg">
              Book a 30-min call <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
