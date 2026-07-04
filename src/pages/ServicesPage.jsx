import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, serviceJsonLd } from '../lib/seo.js'
import './ServicesPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

// Problem router — the buyer finds themselves in the symptom, then lands
// on the right offer. Copy source: content/copy/copy-services-v2.md.
const fits = [
  {
    symptom: 'Growth leans on paid, and every new customer costs more than the last.',
    offer: 'The Fan Engine',
    anchor: '#fan-engine',
  },
  {
    symptom: 'You have real fans, but no system that turns them into growth you can measure.',
    offer: 'The Fan Engine',
    anchor: '#fan-engine',
  },
  {
    symptom: 'Reviews have turned, the community is frustrated, and every update lands worse than the last.',
    offer: 'Sentiment SOS',
    anchor: '#sentiment-sos',
  },
  {
    symptom: 'You’re pre-launch and want to build for fans from day one, not bolt it on later.',
    offer: 'The Fan Engine · Start',
    anchor: '#fan-engine',
  },
]

// The Fan Engine — five-part anatomy. Flow: who you are → the habit →
// belonging → advocacy → proof.
const engineParts = [
  { name: 'Brand.', kicker: 'The foundation', body: 'Story, identity, voice. The narrative fans identify with, and the rituals and moments that create shared identity.' },
  { name: 'Product.', kicker: 'The loops', body: 'Gamification, progression, rewards, onboarding and the first-time experience. The habit that earns the next visit.' },
  { name: 'Community.', kicker: 'Belonging', body: 'The spaces, rituals and shared identity that make fans feel part of something bigger than the product.' },
  { name: 'Growth.', kicker: 'Advocacy', body: 'Belonging turned into reach: UGC, referrals, creator and superfan programs, earned media. Fans bringing the next wave.' },
  { name: 'Measurement.', kicker: 'The spine', body: 'The KPI tree that ties every part to a number: baselines, cohorts, the scoreboard. The part that proves it worked.' },
]

const engineModes = [
  { name: 'Start.', body: 'No fanbase yet, or pre-launch. We design the engine before the habits set, so you grow with fans from day one.' },
  { name: 'Fix.', body: 'You have fans and traction, but one part of the engine is underbuilt and growth shows it. We find the part, rebuild it, and reconnect it to the rest.' },
  { name: 'Optimise.', body: 'The engine runs. We tune it against your numbers and scale what is working.' },
]

const engineIncludes = [
  <>The <strong>plan that fits your business</strong>, not a template.</>,
  <><strong>Measurement wired in</strong> from day one.</>,
  <>Your <strong>team trained</strong> to run it after I am gone.</>,
  <>Where it makes sense, <strong>I help build it</strong>: positioning and brand systems, advocacy and creator programs, lifecycle design, launch go-to-market.</>,
]

const sentimentMoves = [
  { name: 'Listen.', body: 'Read the sentiment across reviews, social and community, good and bad, and find the real patterns.' },
  { name: 'Fix.', body: 'Translate it into a prioritized, build-ready product roadmap, tied to your goals and what your team can actually ship. Not a report. A roadmap.' },
  { name: 'Rebuild.', body: 'The comms and community work to win the room back and rebuild trust.' },
  { name: 'Prevent.', body: 'The listening systems so it does not slide back.' },
]

export default function ServicesPage() {
  useDocumentMeta({
    title: 'Services · Laura Cordrey · Fan-led growth for fan-driven brands',
    description:
      'Fan-led growth for fan-driven brands. Start with your free Fan Score, then build the Fan Engine: brand, product, community, growth and measurement run as one system. In a sentiment hole? Sentiment SOS.',
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
            Build the <em className="accent">whole engine</em>,<br />
            or the one part holding you back.
          </h1>
          <p className="services-hero__lede">
            Fan-led growth for fan-driven brands. I find the growth waiting in
            the fans you already have, hand you the plan that fits your
            business, and where it makes sense, I help build it.
          </p>
          <div className="services-hero__ctas">
            <Link to="/fan-led-growth-audit" className="btn btn--primary btn--lg">
              Get your free Fan Score <span aria-hidden="true">→</span>
            </Link>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost btn--lg">
              Book a 30-min call <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── WHICH ONE IS YOU (problem router) ────────────────── */}
      <section className="services-fit">
        <div className="container services-fit__inner">
          <div className="section-head">
            <span className="marker">Which one is you?</span>
            <h2 className="section-head__title">Start from the problem.</h2>
          </div>
          <ul className="services-fit__grid">
            {fits.map((f) => (
              <li key={f.symptom}>
                <a href={f.anchor} className="services-fit__card">
                  <p className="services-fit__symptom">&ldquo;{f.symptom}&rdquo;</p>
                  <span className="services-fit__offer marker">
                    {f.offer} <span aria-hidden="true">→</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── THE FAN ENGINE ───────────────────────────────────── */}
      <section className="services-engine" id="fan-engine">
        <div className="container services-engine__inner">
          <div className="section-head">
            <span className="marker">Plug in the whole system</span>
            <h2 className="section-head__title">
              The Fan <em className="accent">Engine</em>.
            </h2>
            <p className="section-head__lede">
              My fan-led growth system, plugged into your business. Five
              parts, wired together and measured end to end, so your fans
              stay longer, spend more, and bring the next wave.
            </p>
          </div>

          <ol className="services-moves services-moves--five">
            {engineParts.map((p, i) => (
              <li className="services-moves__item" key={p.name}>
                <span className="services-moves__num marker">
                  {String(i + 1).padStart(2, '0')} · {p.kicker}
                </span>
                <h3 className="services-moves__name">{p.name}</h3>
                <p className="services-moves__body">{p.body}</p>
              </li>
            ))}
          </ol>

          <div className="services-modes">
            <span className="marker services-modes__label">Three modes. Find yourself in one.</span>
            <div className="services-trio">
              {engineModes.map((m) => (
                <article className="services-card services-card--mode" key={m.name}>
                  <h3 className="services-card__title">{m.name}</h3>
                  <p className="services-card__outcome">{m.body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="services-card services-card--feature">
            <span className="marker services-card__label">How every project starts</span>
            <p className="services-card__outcome">
              First, the <strong>Fan Score</strong>, run properly on your real
              data (the free version above is the two-minute taste). In two to
              three weeks you get your score, your <strong>Fan Value</strong>{' '}
              sized in your own numbers (CAC, LTV, retention, earned reach), a
              scored map of the five parts, and a prioritized 90-day plan you
              can act on, with or without me.
            </p>
            <span className="marker services-card__label">What you get</span>
            <ul className="services-card__list">
              {engineIncludes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <dl className="services-card__meta">
              <div>
                <dt className="marker">Shape</dt>
                <dd>
                  Starts with the two-to-three-week Fan Score diagnostic, fixed
                  fee. Then a fixed-scope sprint, or ongoing with me embedded
                  as your fractional brand and growth lead. I keep the
                  embedded roster deliberately small. Pricing on request.
                </dd>
              </div>
              <div>
                <dt className="marker">Best for</dt>
                <dd>
                  Teams with a hit and a fanbase, or the makings of one, and
                  no senior brand or growth leader yet.
                </dd>
              </div>
            </dl>
            <div className="services-card__cta">
              <Link to="/fan-led-growth-audit" className="btn btn--primary">
                Start with your free Fan Score <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SENTIMENT SOS ────────────────────────────────────── */}
      <section className="services-signature" id="sentiment-sos">
        <div className="container services-signature__inner">
          <div className="section-head">
            <span className="marker">When it can&rsquo;t wait</span>
            <h2 className="section-head__title">
              Sentiment <em className="accent">SOS</em>.
            </h2>
            <p className="section-head__lede">
              Your reviews turned. The subreddit is angry. Support is swamped,
              churn is creeping up, and every update lands worse than the
              last. You know the answers are in what your community is saying.
              There is just too much of it, and none of it sorted. That is
              what this is for. A recovery, in four moves.
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
              <span className="marker">Shape</span>
              Bounded, fast, project-priced. It is the emergency version of
              the Engine&rsquo;s Fix mode: one focused project, no system
              commitment.
            </p>
            <p>
              <span className="marker">Best for</span>
              A brand in a sentiment hole that needs a way out, fast.
            </p>
          </div>
        </div>
      </section>

      {/* ─── OBJECTION ────────────────────────────────────────── */}
      <section className="services-objection">
        <div className="container services-objection__inner">
          <span className="marker">The question I always get</span>
          <h2 className="services-objection__q">
            &ldquo;Isn&rsquo;t this just community building?&rdquo;
          </h2>
          <p className="services-objection__a">
            No. A community is people who belong. A fan is a community member
            with the volume turned up: <mark>passion, identity, advocacy</mark>.
            Community is where it starts. Fandom is what brings the growth. I
            build the bridge.
          </p>
        </div>
      </section>

      {/* ─── NOT SURE WHERE YOU FIT ───────────────────────────── */}
      <section className="services-intro-call">
        <div className="container services-intro-call__inner">
          <div className="services-intro-call__body">
            <span className="marker">Not sure where you fit?</span>
            <p className="services-intro-call__copy">
              Book a free 30-minute intro call. No pitch, just a straight read
              on where you are and whether I can help. Or take the free{' '}
              <Link to="/fan-led-growth-audit">Fan Score</Link> first and
              bring your result.
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
            streamer platform scaled and acquired by Animoca.
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
            <Link to="/fan-led-growth-value-model" className="btn btn--primary btn--lg">
              Size your Fan Value <span aria-hidden="true">→</span>
            </Link>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost btn--lg">
              Book a 30-min call <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
