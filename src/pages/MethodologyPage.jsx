import { Link } from 'react-router-dom'
import FlywheelDiagram from '../components/FlywheelDiagram.jsx'
import './MethodologyPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

const stages = [
  {
    num: '01',
    name: 'Activation',
    kicker: 'The hook that sticks.',
    body: [
      'The first time a person experiences real value — fast enough that they keep going.',
      'This is the moment most brands and products waste. Onboarding flows that explain instead of demonstrate. First sessions designed for new users in general instead of *this* user specifically. Activation is the difference between someone who installed and someone who *arrived*.',
    ],
    tags: ['Onboarding flows', 'Aha-moment design', 'First-session mechanics', 'Day-one retention'],
  },
  {
    num: '02',
    name: 'Habit',
    kicker: 'Loops that compound.',
    body: [
      'Built into the routine. Not motivated, not gamified-to-death — engineered to be the easier choice on day 30.',
      'I look for the loops already trying to form (the actions people take twice without prompting) and design the product, the comms, and the reward structures around making those loops sharper and faster.',
    ],
    tags: ['Engagement loops', 'Triggers', 'Streaks', 'Session depth', 'Lifecycle CRM'],
  },
  {
    num: '03',
    name: 'Belonging',
    kicker: 'Moments that bond.',
    body: [
      'When a user goes from "I use this" to "this is my place." That shift is almost always social — and it almost always happens in a specific moment.',
      'I build the spaces, rituals, and events those moments live inside: community programs, IRL touchpoints, shared rituals, the small social rewards that make a product feel less lonely.',
    ],
    tags: ['Community programs', 'Shared rituals', 'Events', 'Social identity', 'IRL touchpoints'],
  },
  {
    num: '04',
    name: 'Identity',
    kicker: 'Where UGC is born.',
    body: [
      'When the brand becomes part of how someone sees themselves — and how they want to be seen by others.',
      'This is the stage where users start *making things* with you. Customisation, status, progression, co-creation. The most valuable UGC, the most loyal customers, and the highest LTV all originate here.',
    ],
    tags: ['Progression systems', 'Status & badges', 'Customisation', 'Co-creation', 'Creator programs'],
  },
  {
    num: '05',
    name: 'Advocacy',
    kicker: 'Fans become growth.',
    body: [
      'When fans recruit, refer, and create. The point at which a community is no longer just a retention asset — it&rsquo;s an acquisition channel that beats paid media on cost and quality.',
      'I&rsquo;ve built this from scratch. At Ubisoft, 60M+ organic UGC views from a $0 paid spend. At BlaBlaCar, 1M members at €5 CAC. At US Mobile, $32K from a single product moment in 3 hours.',
    ],
    tags: ['Referral programs', 'Creator programs', 'Ambassador programs', 'UGC engines', 'Earned media'],
  },
]

const proofPoints = [
  { brand: 'Ubisoft',    stat: '$500K+', label: 'Earned media · $0 ad spend' },
  { brand: 'BlaBlaCar',  stat: '1M',     label: 'UK members · €5 CAC' },
  { brand: 'US Mobile',  stat: '$32K',   label: 'Revenue in 3 hours' },
  { brand: 'Azarus',     stat: '90%',    label: 'Engagement rate' },
]

const fits = [
  {
    title: 'For consumer brands ready to monetise their fans',
    body: 'You have an audience that loves you. They&rsquo;re posting, tagging, repeating. You haven&rsquo;t built the system that turns that affection into repeat revenue.',
  },
  {
    title: 'For tech and gaming companies with passive scale',
    body: 'Millions of users. A fraction of them activated as community. The flywheel is how you make the rest of them matter.',
  },
  {
    title: 'For founders pre-product-market-fit who keep losing users at day 7',
    body: 'Retention is a flywheel problem. So is acquisition cost. So is referral. I&rsquo;ll tell you which stage is leaking and what to fix first.',
  },
]

export default function MethodologyPage() {
  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="meth-hero">
        <div className="container meth-hero__inner">
          <div className="meth-hero__top">
            <span className="marker">Methodology · Vol. 01</span>
            <span className="marker">5 stages · 12 years · 4 industries</span>
          </div>

          <h1 className="meth-hero__title">
            The Fandom<br />
            <em className="accent">Flywheel</em>.™
          </h1>

          <div className="meth-hero__meta">
            <p className="meth-hero__lede">
              A five-stage system for turning passive audiences into the kind of
              fans that build a business. Drawn from twelve years of practice
              across brand, product, community and growth — at Ubisoft, BlaBlaCar,
              US&nbsp;Mobile and Azarus.
            </p>
            <p className="meth-hero__sublede">
              Not a framework I read. A method I built — at scale, under deadline,
              with revenue attached.
            </p>
          </div>
        </div>
      </section>

      {/* ─── DIAGRAM ──────────────────────────────────────────── */}
      <section className="meth-diagram">
        <div className="container meth-diagram__inner">
          <FlywheelDiagram />
          <p className="meth-diagram__caption marker">
            Fig. 01 · Five stages, one loop. Each stage feeds the next.
          </p>
        </div>
      </section>

      {/* ─── WHERE IT CAME FROM (proof) ───────────────────────── */}
      <section className="meth-proof">
        <div className="container">
          <div className="section-head">
            <span className="marker">Where it came from</span>
            <h2 className="section-head__title">Built from practice, not theory.</h2>
            <p className="meth-proof__lede">
              Every stage of the Fandom Flywheel was earned in the room — in
              launches, fixes, sprints, and post-mortems across four industries.
              These are the numbers it produced.
            </p>
          </div>

          <ul className="meth-proof__grid">
            {proofPoints.map((p) => (
              <li className="meth-proof__cell" key={p.brand}>
                <span className="marker meth-proof__brand">{p.brand}</span>
                <span className="meth-proof__stat">{p.stat}</span>
                <span className="meth-proof__label">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── FIVE STAGES (editorial spreads) ──────────────────── */}
      <section className="meth-stages">
        <div className="container">
          <div className="section-head">
            <span className="marker">The five stages</span>
            <h2 className="section-head__title">From first session to lifelong advocate.</h2>
          </div>

          <ol className="meth-stage-list">
            {stages.map((s) => (
              <li className="meth-stage" key={s.num}>
                <div className="meth-stage__rail">
                  <span className="marker meth-stage__num">[{s.num}]</span>
                </div>
                <div className="meth-stage__body">
                  <h3 className="meth-stage__name">{s.name}.</h3>
                  <p className="meth-stage__kicker">{s.kicker}</p>
                  {s.body.map((para, i) => (
                    <p className="meth-stage__para" key={i}
                       dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                  <ul className="meth-stage__tags" aria-label="What the work looks like">
                    {s.tags.map((t) => (
                      <li key={t} className="meth-stage__tag marker">{t}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── WHERE IT FITS (no pricing tiers) ─────────────────── */}
      <section className="meth-fit">
        <div className="container">
          <div className="section-head">
            <span className="marker">Where it fits</span>
            <h2 className="section-head__title">When you&rsquo;d use this.</h2>
          </div>

          <div className="meth-fit__grid">
            {fits.map((f) => (
              <article className="meth-fit__card" key={f.title}>
                <h3 className="meth-fit__title">{f.title}</h3>
                <p className="meth-fit__body">{f.body}</p>
              </article>
            ))}
          </div>

          <div className="meth-fit__rates marker">
            <span>Engagement</span>
            <span>·</span>
            <span>Diagnostic</span>
            <span>·</span>
            <span>Sprint</span>
            <span>·</span>
            <span>Embedded retainer</span>
            <span>·</span>
            <span className="accent">Scoped per brand on a call</span>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="meth-cta">
        <div className="container meth-cta__inner">
          <span className="marker">Want this for your brand?</span>
          <h2 className="meth-cta__title">
            Let&rsquo;s map your flywheel. <em className="accent">Stage by stage.</em>
          </h2>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btn btn--primary btn--lg">
            Book a 30-min call <span aria-hidden="true">→</span>
          </a>
          <p className="marker meth-cta__back">
            Or → <Link to="/work" className="meth-cta__link">see the work first</Link>
          </p>
        </div>
      </section>
    </>
  )
}
