import { Link } from 'react-router-dom'
import FlywheelDiagram from '../components/FlywheelDiagram.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, methodologyJsonLd } from '../lib/seo.js'
import './MethodologyPage.css'

const CONTACT_URL = '/contact?intent=consulting'

const disciplines = [
  { word: 'Brand',     note: 'Story, identity, voice. The foundation that sets what gets built.' },
  { word: 'Product',   note: 'UX, gamification, user feedback. The experiences that earn the next visit.' },
  { word: 'Community', note: 'Creator, loyalty, advocacy. The belonging that makes people stay.' },
  { word: 'Growth',    note: 'Organic, influencer, UGC. The reach that turns fans into new customers.' },
]

const milestones = [
  { name: 'Activation', body: 'a first win that makes someone glad they came.' },
  { name: 'Habit',      body: 'a reason to come back on their own, without a discount every time.' },
  { name: 'Belonging',  body: 'a real community, where fans are in it with each other and with you.' },
  { name: 'Identity',   body: 'where your brand becomes part of how a fan sees themselves.' },
  { name: 'Advocacy',   body: 'fans bringing the next wave, so your acquisition cost falls.' },
]

const scoreboard = [
  { label: 'LTV:CAC', body: 'does each user you buy pay back further?' },
  { label: 'Payback period', body: 'does each user pay back faster?' },
  { label: 'Cohort retention', body: 'do the users you bought stay?' },
  { label: '% organic-sourced growth', body: 'are more new users arriving without spend?' },
]

export default function MethodologyPage() {
  useDocumentMeta({
    title: 'The Fan Engine · A five-stage fan-led growth methodology by Laura Cordrey',
    description:
      'The Fan Engine: four disciplines run as one system that turns customers into fans who stay, spend more, and bring the next wave. Brand, product, community and growth, measured against the numbers a board cares about.',
    canonical: pageUrl('methodology'),
    ogType: 'article',
    jsonLd: methodologyJsonLd({
      stages: milestones.map((m) => ({ name: m.name, text: m.body })),
    }),
  })

  return (
    <>
      {/* ─── 1. HERO ──────────────────────────────────────────── */}
      <section className="meth-hero">
        <div className="container meth-hero__inner">
          <div className="meth-hero__top">
            <span className="marker">The method</span>
          </div>

          <h1 className="meth-hero__title">
            The Fan<br />
            <em className="accent">Engine</em>.
          </h1>

          <div className="meth-hero__meta">
            <p className="meth-hero__lede">
              The customers you pay to acquire are worth far more than they cost
              you. The Fan Engine is the system I build to capture that value:
              it turns customers into fans who stay, spend more, and bring the
              next wave, so your spend compounds instead of leaking away.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 2. THE PROBLEM ───────────────────────────────────── */}
      <section className="meth-problem">
        <div className="container meth-problem__inner">
          <div className="section-head">
            <span className="marker">The problem</span>
            <h2 className="section-head__title">
              The growth you <em className="accent">already paid for</em>.
            </h2>
          </div>
          <p className="meth-problem__copy">
            Most teams pour budget into acquisition and stop at the sale. But
            the value that makes a customer profitable comes after it: whether
            they stay, buy again, and bring others. That work is split across
            brand, product, community and growth, so no one owns it, and almost
            no one measures it. So the bucket leaks, and you keep paying to
            refill it.
          </p>
        </div>
      </section>

      {/* ─── 3. THE METHOD: FOUR DISCIPLINES, ONE ENGINE ──────── */}
      <section className="meth-method">
        <div className="container meth-method__inner">
          <div className="section-head">
            <span className="marker">The method</span>
            <h2 className="section-head__title">
              Four disciplines. <em className="accent">One engine.</em>
            </h2>
          </div>
          <p className="meth-method__copy">
            Almost no one else can offer this: I run all four disciplines as a
            single engine. Most strategists own one, brand or product or
            community or growth. I have spent ten years across all four, because
            the leaks do not respect the org chart. A drop-off after the first
            purchase is a product problem and a brand problem at once.{' '}
            <mark>Owning the whole engine is what lets it compound</mark>{' '}
            instead of stalling between handoffs.
          </p>

          <ol className="meth-pillars" aria-label="The four disciplines">
            {disciplines.map((d) => (
              <li className="meth-pillars__item" key={d.word}>
                <span className="meth-pillars__mark" aria-hidden="true">✦</span>
                <h3 className="meth-pillars__word">{d.word}</h3>
                <p className="meth-pillars__note">{d.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── 4. THE JOURNEY IT BUILDS ─────────────────────────── */}
      <section className="meth-journey">
        <div className="container meth-journey__inner">
          <div className="section-head">
            <span className="marker">The journey it builds</span>
            <h2 className="section-head__title">
              The journey the engine builds.
            </h2>
            <p className="section-head__lede">
              The engine moves a customer from a first purchase to bringing
              others in, through five milestones. Real people do not climb them
              in a tidy line, so treat it as a map, not a formula.
            </p>
          </div>

          <div className="meth-journey__visual">
            <FlywheelDiagram />
            <p className="meth-journey__caption marker">
              Fig. 01 · Five milestones, one loop. Advocacy brings in the next
              wave.
            </p>
          </div>

          <ol className="meth-milestones">
            {milestones.map((m, i) => (
              <li className="meth-milestones__item" key={m.name}>
                <span className="meth-milestones__num marker">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="meth-milestones__name">{m.name}.</h3>
                <p className="meth-milestones__body">{m.body}</p>
              </li>
            ))}
          </ol>

          <p className="meth-journey__through-line">
            <mark>You cannot buy advocacy, you earn it.</mark> Belonging and
            identity are what make it compound for free instead of needing to
            be paid for every time, and they are the part most teams leave
            unbuilt.
          </p>
        </div>
      </section>

      {/* ─── 5. MEASURED ──────────────────────────────────────── */}
      <section className="meth-measured">
        <div className="container meth-measured__inner">
          <div className="section-head">
            <span className="marker">Measured</span>
            <h2 className="section-head__title">
              And <em className="accent">I can prove it</em>.
            </h2>
            <p className="section-head__lede">
              Fan-led work usually goes unmeasured, and undervalued because of
              it. I change that. Every program is tied to the engine metric it
              moves, which ladders to a business outcome. No vanity numbers.
            </p>
          </div>

          <div className="meth-measured__block">
            <span className="marker">The chain</span>
            <p>
              The engine metrics I own and move first, activation, engagement,
              belonging, advocacy, pull the outcomes a board cares about:{' '}
              <mark>CAC down, LTV up, more organic growth, earned media
              value</mark>.
            </p>
          </div>

          <div className="meth-measured__block">
            <span className="marker">The honest method</span>
            <p>
              Earned growth resists clean last-click attribution, and I do not
              pretend otherwise. I baseline first (no baseline, no claim), track
              deltas by cohort instead of last clicks, use holdouts where
              feasible, and name the limits out loud. Stating the method is
              what makes &ldquo;measurable&rdquo; defensible.
            </p>
          </div>

          <div className="meth-measured__block">
            <span className="marker">The scoreboard (for paid-led teams)</span>
            <p>
              Lead with paid, and four numbers tell the story. Moving them
              together is your spend compounding.
            </p>
            <ul className="meth-scoreboard">
              {scoreboard.map((s) => (
                <li className="meth-scoreboard__item" key={s.label}>
                  <span className="meth-scoreboard__label">{s.label}</span>
                  <span className="meth-scoreboard__body">{s.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 6. CLOSE ─────────────────────────────────────────── */}
      <section className="meth-close">
        <div className="container meth-close__inner">
          <span className="marker">See where your engine stands</span>
          <h2 className="meth-close__title">
            Five questions show you which part of your engine to{' '}
            <em className="accent">build first</em>.
          </h2>
          <p className="meth-close__line">
            Then we size it against your real numbers.
          </p>
          <div className="meth-close__ctas">
            <Link to="/fan-led-growth-audit" className="btn btn--primary btn--lg">
              Take the 2-min Fan Score <span aria-hidden="true">→</span>
            </Link>
            <a href={CONTACT_URL} className="btn btn--ghost btn--lg">
              Book a call <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="marker meth-close__back">
            Or <Link to="/work" className="meth-close__link">see the work first →</Link>
          </p>
        </div>
      </section>
    </>
  )
}
