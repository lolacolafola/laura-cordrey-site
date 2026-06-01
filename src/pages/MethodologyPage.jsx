import { Link } from 'react-router-dom'
import FlywheelDiagram from '../components/FlywheelDiagram.jsx'
import { stageIcons } from '../components/StageIcons.jsx'
import './MethodologyPage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

const stages = [
  {
    num: '01',
    name: 'Activation',
    kicker: 'The hook that sticks.',
    body: 'The first time someone hits real value — fast enough they keep going. Most onboarding explains. The good kind <em>demonstrates</em>. Activation is the difference between someone who installed and someone who arrived.',
    tags: ['Onboarding flows', 'Aha-moment design', 'First-session mechanics', 'Day-one retention'],
  },
  {
    num: '02',
    name: 'Habit',
    kicker: 'Loops that compound.',
    body: 'Built into the routine. Not motivated, not gamified-to-death — engineered to be the easier choice on day&nbsp;30. I find the loops already trying to form and sharpen them.',
    tags: ['Engagement loops', 'Triggers', 'Streaks', 'Session depth', 'Lifecycle CRM'],
  },
  {
    num: '03',
    name: 'Belonging',
    kicker: 'Moments that bond.',
    body: 'When a user goes from <em>I use this</em> to <em>this is my place</em>. That shift is almost always social — and it almost always happens in a specific moment. I build the spaces, rituals and events those moments live inside.',
    tags: ['Community programs', 'Shared rituals', 'Events', 'Social identity', 'IRL touchpoints'],
  },
  {
    num: '04',
    name: 'Identity',
    kicker: 'Where UGC is born.',
    body: 'When the brand becomes part of how someone sees themselves — and how they want to be seen. Users start <em>making things</em> with you. The most valuable UGC, the loyalest customers and the highest LTV all originate here.',
    tags: ['Progression systems', 'Status & badges', 'Customisation', 'Co-creation', 'Creator programs'],
  },
  {
    num: '05',
    name: 'Advocacy',
    kicker: 'Fans become growth.',
    body: 'Fans recruit, refer and create. The community stops being a retention asset and becomes an acquisition channel — one that beats paid media on cost <em>and</em> quality. I design the programs that turn the loyal into the loud.',
    tags: ['Referral programs', 'Creator programs', 'Ambassador programs', 'UGC engines', 'Earned media'],
  },
]

const BASE = import.meta.env.BASE_URL

const proofPoints = [
  { brand: 'Ubisoft',    slug: 'ubisoft',   logo: null,                  stat: '$500K+', label: 'Earned media · $0 ad spend' },
  { brand: 'BlaBlaCar',  slug: 'blablacar', logo: 'logos/blablacar.png', stat: '1M',     label: 'UK members · €5 CAC' },
  { brand: 'US Mobile',  slug: 'us-mobile', logo: 'logos/us-mobile.png', stat: '$32K',   label: 'Revenue in 3 hours' },
  { brand: 'Azarus',     slug: 'azarus',    logo: 'logos/azarus.png',    stat: '90%',    label: 'Engagement rate' },
]

const fits = [
  {
    kicker: 'Consumer',
    title: 'You have fans. You don&rsquo;t have a system.',
    body: 'Your audience already loves you — they&rsquo;re posting, tagging, repeating. The flywheel turns that affection into repeat revenue.',
  },
  {
    kicker: 'Tech &amp; gaming',
    title: 'Millions of users. A handful of fans.',
    body: 'Big top-of-funnel, thin active community. We activate the dormant majority and build the loop that keeps them coming back.',
  },
  {
    kicker: 'Early-stage',
    title: 'You&rsquo;re losing users by day&nbsp;7.',
    body: 'Retention, CAC and referral are all the same problem. We diagnose which stage is leaking — and fix that one first.',
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
              Most strategists work in one corner of the business. I&rsquo;ve
              worked across all four — <em className="accent">brand, product, community
              and&nbsp;growth</em> — often at the same company, on the same problem.
              The Fandom Flywheel was built from that vantage. These are the
              numbers it produced.
            </p>
          </div>

          <ul className="meth-proof__grid">
            {proofPoints.map((p) => (
              <li className="meth-proof__cell" key={p.brand}>
                <Link to={`/work/${p.slug}`} className="meth-proof__link">
                  <div className="meth-proof__logo">
                    {p.logo ? (
                      <img src={BASE + p.logo} alt={p.brand} loading="lazy" />
                    ) : (
                      <span className="meth-proof__logo-text">{p.brand}</span>
                    )}
                  </div>
                  <span className="meth-proof__stat">{p.stat}</span>
                  <span className="meth-proof__label">{p.label}</span>
                  <span className="marker meth-proof__view">
                    Read the case <span aria-hidden="true">→</span>
                  </span>
                </Link>
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
            {stages.map((s) => {
              const Icon = stageIcons[s.name]
              return (
                <li className="meth-stage" key={s.num}>
                  <div className="meth-stage__rail">
                    {Icon && (
                      <Icon className="meth-stage__icon" aria-hidden="true" />
                    )}
                  </div>
                  <div className="meth-stage__body">
                    <h3 className="meth-stage__name">{s.name}.</h3>
                    <p className="meth-stage__kicker">{s.kicker}</p>
                    <p className="meth-stage__para"
                       dangerouslySetInnerHTML={{ __html: s.body }} />
                    <ul className="meth-stage__tags" aria-label="What the work looks like">
                      {s.tags.map((t) => (
                        <li key={t} className="meth-stage__tag marker">{t}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
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
              <article className="meth-fit__card" key={f.kicker}>
                <span className="marker meth-fit__kicker"
                      dangerouslySetInnerHTML={{ __html: f.kicker }} />
                <h3 className="meth-fit__title"
                    dangerouslySetInnerHTML={{ __html: f.title }} />
                <p className="meth-fit__body"
                   dangerouslySetInnerHTML={{ __html: f.body }} />
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
