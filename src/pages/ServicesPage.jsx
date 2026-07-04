import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, serviceJsonLd } from '../lib/seo.js'
import './ServicesPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

// The services menu — four visible offers, each with a "For you if"
// symptom line so buyers find themselves in one glance.
// Copy source: content/copy/copy-services-v3.md.
const offers = [
  {
    name: 'The Fan Engine',
    tag: 'The system',
    line: 'My complete fan-led growth system, plugged into your business and measured end to end.',
    fit: 'Growth leans on paid, you have real fans, and no system that turns them into growth you can measure.',
    anchor: '#fan-engine',
    link: 'See the Engine',
  },
  {
    name: 'Consulting',
    tag: 'Advisory',
    line: 'Senior direction on brand and fan-led growth. I set the strategy and keep it on track; your team ships.',
    fit: 'You have the hands to build, and want senior direction so they build the right things.',
    anchor: '#consulting',
    link: 'See Consulting',
  },
  {
    name: 'Fan Moments',
    tag: 'Project',
    line: 'One moment, built to land: a launch, a drop, a creator or advocacy program.',
    fit: 'You have a big moment coming and it has to land. No second take.',
    anchor: '#fan-moments',
    link: 'See Fan Moments',
  },
  {
    name: 'Sentiment SOS',
    tag: 'Project · Urgent',
    line: 'The rescue. What your community is saying, turned into a product and communications roadmap that fixes what is driving it.',
    fit: 'Reviews have turned, the community is frustrated, and every update lands worse than the last.',
    anchor: '#sentiment-sos',
    link: 'See Sentiment SOS',
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

const consultingIncludes = [
  <>The <strong>strategy and the roadmap</strong>: what to build, in what order, tied to your numbers.</>,
  <><strong>Senior judgment on the work in flight</strong>: reviews, prioritization, course corrections.</>,
  <>Your <strong>team upskilled</strong> to run fan-led growth without me.</>,
]

const momentsIncludes = [
  <>The moment <strong>designed end to end</strong>: concept, story, mechanics, rollout.</>,
  <>The <strong>advocacy built in</strong>, so the moment travels on your fans, not just your media budget.</>,
  <><strong>Measurement wired in</strong>, so you know what the moment was worth.</>,
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
      'Four ways to work with me: the Fan Engine system, senior consulting, a Fan Moment built to land, or Sentiment SOS when the community has turned. Start with your free Fan Score.',
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
            Fan-led growth for fan-driven brands. Four ways to work with me,
            from one focused project to the whole system. Each one starts
            from your numbers and ends with a plan that fits your business.
            Where it makes sense, I help build it.
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

      {/* ─── THE SERVICES (menu) ──────────────────────────────── */}
      <section className="services-fit">
        <div className="container services-fit__inner">
          <div className="section-head">
            <span className="marker">The services</span>
            <h2 className="section-head__title">Four ways in. Find yourself in one.</h2>
          </div>
          <ul className="services-fit__grid">
            {offers.map((o) => (
              <li key={o.name}>
                <a href={o.anchor} className="services-fit__card">
                  <div className="services-fit__head">
                    <h3 className="services-fit__name">{o.name}.</h3>
                    <span className="services-fit__tag marker">{o.tag}</span>
                  </div>
                  <p className="services-fit__line">{o.line}</p>
                  <p className="services-fit__symptom">
                    <span className="marker services-fit__fitlabel">For you if</span>
                    &ldquo;{o.fit}&rdquo;
                  </p>
                  <span className="services-fit__offer marker">
                    {o.link} <span aria-hidden="true">↓</span>
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
            <span className="marker">01 · The system</span>
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
                  Starts with the two-to-three-week Fan Score diagnostic,
                  fixed fee. Then fixed-scope sprints on what the score says
                  matters most. Pricing on request.
                </dd>
              </div>
              <div>
                <dt className="marker">Best for</dt>
                <dd>
                  Teams with a hit and a fanbase, or the makings of one,
                  ready to grow with the fans they already have.
                </dd>
              </div>
            </dl>
            <div className="services-card__cta">
              <Link to="/fan-led-growth-audit" className="btn btn--primary">
                Start with your free Fan Score <span aria-hidden="true">→</span>
              </Link>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--ghost">
                Book a call about the Engine <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONSULTING ───────────────────────────────────────── */}
      <section className="services-offer" id="consulting">
        <div className="container services-offer__inner">
          <div className="section-head">
            <span className="marker">02 · Advisory</span>
            <h2 className="section-head__title">
              <em className="accent">Consulting</em>.
            </h2>
            <p className="section-head__lede">
              You do not need me to run the function. You need the senior
              read: what to build, in what order, and how to prove it is
              working. I set the direction and keep it on track. Your team
              ships.
            </p>
          </div>

          <div className="services-card">
            <span className="marker services-card__label">What you get</span>
            <ul className="services-card__list">
              {consultingIncludes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <dl className="services-card__meta">
              <div>
                <dt className="marker">Shape</dt>
                <dd>
                  A one-off strategy sprint, or ongoing advisory on a rhythm
                  that fits your team. Pricing on request.
                </dd>
              </div>
              <div>
                <dt className="marker">Best for</dt>
                <dd>
                  Teams with the hands to build, missing the senior brand
                  and growth direction.
                </dd>
              </div>
            </dl>
            <div className="services-card__cta">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
                Talk about consulting <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAN MOMENTS ──────────────────────────────────────── */}
      <section className="services-offer services-offer--alt" id="fan-moments">
        <div className="container services-offer__inner">
          <div className="section-head">
            <span className="marker">03 · Project</span>
            <h2 className="section-head__title">
              Fan <em className="accent">Moments</em>.
            </h2>
            <p className="section-head__lede">
              Your biggest brand moment, delivered with a cool head: the
              launch, the drop, the anniversary, the program reveal. I have
              unveiled a fan program live on the E3 stage, turned a free SIM
              kit into a sold-out $32K drop in under three hours, and built
              the creator and advocacy programs behind 60M+ UGC views at zero
              media spend. Hand me the moment everyone will be watching.
            </p>
          </div>

          <div className="services-card">
            <span className="marker services-card__label">What you get</span>
            <ul className="services-card__list">
              {momentsIncludes.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <dl className="services-card__meta">
              <div>
                <dt className="marker">Shape</dt>
                <dd>Fixed-scope project, priced per moment. Pricing on request.</dd>
              </div>
              <div>
                <dt className="marker">Best for</dt>
                <dd>A launch, drop or reveal on the calendar that has to land.</dd>
              </div>
            </dl>
            <div className="services-card__cta">
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary">
                Talk about your moment <span aria-hidden="true">→</span>
              </a>
              <Link to="/work" className="btn btn--ghost">
                See moments I&rsquo;ve built <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SENTIMENT SOS ────────────────────────────────────── */}
      <section className="services-signature" id="sentiment-sos">
        <div className="container services-signature__inner">
          <div className="section-head">
            <span className="marker">04 · Project · When it can&rsquo;t wait</span>
            <h2 className="section-head__title">
              Sentiment <em className="accent">SOS</em>.
            </h2>
            <p className="section-head__lede">
              Your reviews turned. The subreddit is angry. Support is swamped,
              churn is creeping up, and every update lands worse than the
              last. You know the answers are in what your community is saying.
              There is just too much of it, and none of it sorted.
            </p>
            <p className="section-head__lede">
              This is the job I did on a AAA live-service game with 15
              million players. I take the raw sentiment, get inside your
              product, your roadmap and your business objectives, and turn it
              into <mark>one usable roadmap: the product fixes and the
              communications that address what is actually driving the
              negative sentiment</mark>. A recovery, in four moves.
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
              One roadmap across product and communications, prioritized
              against your objectives, plus the system that keeps it fixed.
            </p>
            <p>
              <span className="marker">Proof</span>
              Across the Ghost Recon lifecycle I sustained{' '}
              <mark>an average of 85% positive sentiment for a 15M-player community</mark>,
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

          <div className="services-signature__cta">
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
              It&rsquo;s urgent. Book now <span aria-hidden="true">→</span>
            </a>
            <span className="services-signature__ctanote">
              Skip the quiz. If your community is turning, we talk this week.
            </span>
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
