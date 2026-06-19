import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, serviceJsonLd } from '../lib/seo.js'
import './ServicesPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'
const ASSESSMENT_URL = '#assessment'

const buildIncludes = [
  <>The <strong>built lever itself</strong>: a positioning and brand system, an advocacy or creator program (the Delta and Siege blueprint), a lifecycle and CRM design, or a launch go-to-market.</>,
  <><strong>Measurement wired in</strong> from day one.</>,
  <>Your <strong>team trained</strong> to run it after I am gone.</>,
]

const embeddedIncludes = [
  <><strong>Ongoing ownership</strong> of brand and fan-led growth: strategy set, work shipped, reported monthly against the scoreboard.</>,
  <>A <strong>founder-level CMO&rsquo;s output</strong> without the hours or the overhead, because AI does the heavy lifting.</>,
]

const diagnosticIncludes = [
  <>Your <strong>Fan-Led Growth Score</strong>, run on your real data.</>,
  <>Your <strong>Fan Value</strong>, sized in your own numbers (CAC, LTV, retention, earned reach).</>,
  <>A <strong>scored map</strong> of the four disciplines and five stages: where you are strong, where the engine is underbuilt.</>,
  <>A <strong>prioritized 90-day plan</strong> you can act on, with or without me.</>,
]

const sentimentMoves = [
  { name: 'Listen.', body: 'Read the sentiment across reviews, social and community, good and bad, and find the real patterns.' },
  { name: 'Fix.', body: 'Translate it into a prioritized, build-ready product roadmap, tied to your goals and what your team can actually ship. Not a report. A roadmap.' },
  { name: 'Rebuild.', body: 'The comms and community work to win the room back and rebuild trust.' },
  { name: 'Prevent.', body: 'The listening systems so it does not slide back.' },
]

export default function ServicesPage() {
  useDocumentMeta({
    title: 'Services · Laura Cordrey · Founder-level CMO for fan-driven brands',
    description:
      'I act as a founder-level CMO for fan-driven brands. The Diagnostic sizes the opportunity, then Build or Embedded ships the work. Sentiment-to-Roadmap recovers brands in a sentiment hole.',
    canonical: pageUrl('services'),
    ogType: 'website',
    jsonLd: serviceJsonLd(),
  })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="services-hero">
        <div className="container services-hero__inner">
          <span className="marker">Services</span>
          <h1 className="services-hero__title">
            Brand and <em className="accent">fan-led growth</em>,<br />
            built to ship.
          </h1>
          <p className="services-hero__lede">
            I act as a founder-level CMO for fan-driven brands. I build the brand
            that makes people fall for you, and the Fan Engine that turns that
            love into repeatable, measurable growth. One operator, because AI is
            the team.
          </p>
          <div className="services-hero__ctas">
            <a href={ASSESSMENT_URL} className="btn btn--primary btn--lg">
              Score your fan growth <span aria-hidden="true">→</span>
            </a>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost btn--lg">
              Book a 30-min call <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHAT I DO ────────────────────────────────────────── */}
      <section className="services-what">
        <div className="container services-what__inner">
          <span className="marker">What I do</span>
          <p className="services-what__copy">
            Most consultants hand you a strategy deck and leave you to build it.
            I design it and I ship it: the positioning, the programs, the tools,
            and the measurement to prove it worked.
          </p>
          <p className="services-what__copy">
            Brand is the foundation. Fan-led growth is the engine. Everything
            ladders back to a number: <mark>lower acquisition cost, higher
            retention, earned reach you would otherwise pay for</mark>. I work
            across the four disciplines most teams split between four hires:
            Brand, Product, Community and Growth, run as one system.
          </p>
        </div>
      </section>

      {/* ─── START HERE: THE DIAGNOSTIC ───────────────────────── */}
      <section className="services-diagnostic">
        <div className="container services-diagnostic__inner">
          <div className="section-head">
            <span className="marker">Start here</span>
            <h2 className="section-head__title">The Diagnostic.</h2>
            <p className="section-head__lede">
              In two to three weeks, I map where your Fan Engine is underbuilt
              and what fixing it is worth, in your own numbers.
            </p>
          </div>

          <div className="services-card services-card--feature">
            <span className="marker services-card__label">What you get</span>
            <ul className="services-card__list">
              {diagnosticIncludes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <dl className="services-card__meta">
              <div>
                <dt className="marker">Shape</dt>
                <dd>Two to three weeks. Fixed fee, on request.</dd>
              </div>
              <div>
                <dt className="marker">Best for</dt>
                <dd>
                  Teams who suspect there is growth left on the table and want
                  it quantified before committing.
                </dd>
              </div>
            </dl>

            <div className="services-card__cta">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
                Start with the Diagnostic <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BUILD + EMBEDDED ─────────────────────────────────── */}
      <section className="services-deeper">
        <div className="container services-deeper__inner">
          <div className="section-head">
            <span className="marker">Then, where the Diagnostic points</span>
            <h2 className="section-head__title">
              Two ways to go <em className="accent">deeper</em>.
            </h2>
            <p className="section-head__lede">
              Once we know where the value is, I either ship the one lever that
              matters, or I run the function.
            </p>
          </div>

          <div className="services-pair">
            <article className="services-card">
              <h3 className="services-card__title">Build.</h3>
              <p className="services-card__outcome">
                Fixed-scope sprints on the one lever that matters most. I ship
                the actual thing, not a recommendation to go build it.
              </p>
              <span className="marker services-card__label">What you get</span>
              <ul className="services-card__list">
                {buildIncludes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <dl className="services-card__meta">
                <div>
                  <dt className="marker">Shape</dt>
                  <dd>Fixed-scope sprint. Pricing on request.</dd>
                </div>
                <div>
                  <dt className="marker">Best for</dt>
                  <dd>A specific, urgent lever you want owned end to end.</dd>
                </div>
              </dl>
            </article>

            <article className="services-card">
              <h3 className="services-card__title">Embedded.</h3>
              <p className="services-card__outcome">
                I run your fan-led growth function as your fractional,
                founder-level CMO.
              </p>
              <span className="marker services-card__label">What you get</span>
              <ul className="services-card__list">
                {embeddedIncludes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <dl className="services-card__meta">
                <div>
                  <dt className="marker">Shape</dt>
                  <dd>
                    Ongoing support, monthly retainer. Pricing on request. I keep
                    my embedded roster deliberately small, so each client gets a
                    founder&rsquo;s full attention.
                  </dd>
                </div>
                <div>
                  <dt className="marker">Best for</dt>
                  <dd>
                    Funded teams with a hit and a fanbase but no senior brand or
                    growth leader yet.
                  </dd>
                </div>
              </dl>
            </article>
          </div>
        </div>
      </section>

      {/* ─── SIGNATURE: SENTIMENT-TO-ROADMAP ──────────────────── */}
      <section className="services-signature">
        <div className="container services-signature__inner">
          <div className="section-head">
            <span className="marker">The signature engagement</span>
            <h2 className="section-head__title">
              Sentiment-to-<em className="accent">Roadmap</em>.
            </h2>
            <p className="section-head__lede">
              For brands drowning in negative reviews or community frustration
              who do not know how to act on it. I turn what your community is
              saying, the complaints and the praise, into a recovery, in four
              moves.
            </p>
          </div>

          <ol className="services-moves">
            {sentimentMoves.map((m, i) => (
              <li className="services-moves__item" key={m.name}>
                <span className="services-moves__num marker">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="services-moves__name">{m.name}</h3>
                <p className="services-moves__body">{m.body}</p>
              </li>
            ))}
          </ol>

          <div className="services-signature__meta">
            <p>
              <span className="marker">What you get</span>
              The roadmap, the recovery plan, and the system that keeps it
              fixed.
            </p>
            <p>
              <span className="marker">Proof</span>
              Across the Ghost Recon lifecycle I sustained{' '}
              <mark>75 to 85% positive sentiment for a 15M-player community</mark>,
              and at Assassin&rsquo;s Creed and Siege scale held{' '}
              <mark>83% positive sentiment with 90% engagement across 18
              subsidiaries</mark>.
            </p>
            <p>
              <span className="marker">Best for</span>
              A brand in a sentiment hole that needs a way out, fast.
            </p>
          </div>
        </div>
      </section>

      {/* ─── NOT SURE WHERE YOU FIT ───────────────────────────── */}
      <section className="services-intro-call">
        <div className="container services-intro-call__inner">
          <div className="services-intro-call__body">
            <span className="marker">Not sure where you fit?</span>
            <p className="services-intro-call__copy">
              Book a free 30-minute intro call. No pitch, just a straight read
              on where you are and whether I can help. If a Diagnostic is the
              right next step, we will talk about it then.
            </p>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Book a 30-min intro call <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHY ONE PERSON ───────────────────────────────────── */}
      <section className="services-why">
        <div className="container services-why__inner">
          <span className="marker">Why one person can do all this</span>
          <p className="services-why__copy">
            A decade across some of the biggest names in gaming and a unicorn
            startup is what makes the work good.{' '}
            <mark>Working AI-natively is what makes it fast</mark>, so one
            operator ships what normally takes a department.
          </p>
        </div>
      </section>

      {/* ─── PROOF ────────────────────────────────────────────── */}
      <section className="services-proof">
        <div className="container services-proof__inner">
          <span className="marker">Proof</span>
          <p className="services-proof__copy">
            <mark>60M+ UGC views at zero media spend</mark> across Ubisoft&rsquo;s
            programs. A free SIM kit turned into a{' '}
            <mark>sold-out $32K drop in under three hours</mark> at US Mobile. A
            streamer platform scaled and acquired by Animoca at Azarus / Animoca.
          </p>
          <Link to="/work" className="btn btn--ghost">
            See the work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── CLOSE ────────────────────────────────────────────── */}
      <section className="services-close">
        <div className="container services-close__inner">
          <h2 className="services-close__title">
            What&rsquo;s your <em className="accent">fandom</em> worth?
          </h2>
          <p className="services-close__line">
            Find your number, then let&rsquo;s build the Fan Engine that
            captures it.
          </p>
          <div className="services-close__ctas">
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
