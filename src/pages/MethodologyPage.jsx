import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import './MethodologyPage.css'

const CONTACT_URL = '/contact?intent=consulting'

/* /methodology (The Fan Engine) cinematic dark-band design, ported from
 * the v6 comp. Six full-bleed bands:
 *   1. Hero     : deep ground, split layout, engine emblem right
 *   2. Problem  : bone ground, numbered editorial head
 *   3. Method   : warm dark card ground, signature schematic
 *   4. Journey  : bone ground, quiet five-stage list
 *   5. Measured : deep ground, honest method + scoreboard
 *   6. Close    : oxblood finale, cream CTA
 * Copy is final and verbatim from the comp. No em dashes, no figure
 * labels, no compare-down framing. */

const BrandIcon = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
  </svg>
)
const ProductIcon = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="m17 2 4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>
)
const CommunityIcon = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="19" y1="8" x2="19" y2="14" />
    <line x1="22" y1="11" x2="16" y2="11" />
  </svg>
)
const GrowthIcon = (props) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    <path d="m3 11 18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
)

const disciplines = [
  {
    icon: <BrandIcon />,
    word: 'Brand',
    note: 'The foundation. Story, identity and the moments that create shared belonging.',
  },
  {
    icon: <ProductIcon />,
    word: 'Product',
    note: 'The loops. Progression, rewards and onboarding: the habit that earns the next visit.',
  },
  {
    icon: <CommunityIcon />,
    word: 'Community',
    note: 'Belonging. The spaces and rituals that make fans feel part of something bigger.',
  },
  {
    icon: <GrowthIcon />,
    word: 'Growth',
    note: 'Advocacy. Belonging turned into reach: referrals, creators, UGC and earned media.',
  },
]

const stages = [
  { num: '01', name: 'Activation.', body: 'A first win that makes someone glad they came.' },
  { num: '02', name: 'Habit.', body: 'A reason to come back on their own, without a discount every time.' },
  { num: '03', name: 'Belonging.', body: 'A real community, where fans are in it with each other and with you.' },
  { num: '04', name: 'Identity.', body: 'Where your brand becomes part of how a fan sees themselves.' },
  { num: '05', name: 'Advocacy.', body: 'Fans bringing the next wave, so your acquisition cost falls.' },
]

const scoreboard = [
  { label: 'LTV:CAC, up', body: 'fans spend more over time, so each user you buy is worth more.' },
  { label: 'Payback period, down', body: 'fans buy again sooner, so you recoup acquisition cost faster.' },
  { label: 'Cohort retention, up', body: 'the users you paid for stay.' },
  { label: '% organic-sourced growth, up', body: 'fans bring others in, so new users arrive without spend.' },
  { label: 'Earned reach, up', body: 'fans make the content that markets you, so you reach new people without paying for media.' },
]

export default function MethodologyPage() {
  useDocumentMeta({
    title: 'The Fan Engine · The method · Laura Cordrey',
    description:
      "You're sitting on more fandom than you can see, prove, or bank. The Fan Engine is the system Laura Cordrey builds to turn customers into fans, and to prove what they're worth.",
    canonical: pageUrl('methodology'),
  })

  return (
    <div className="meth-page">
      {/* 1. HERO (split: headline left, engine emblem right) */}
      <section className="meth-band meth-band--hero">
        <div aria-hidden="true" className="meth-hero__halo" />
        <div className="meth-container meth-hero__grid">
          <div>
            <span className="meth-eyebrow meth-eyebrow--gold">The method</span>
            <h1 className="meth-h1">
              The Fan <mark>Engine</mark>.
            </h1>
            <p className="meth-hero__lede">
              You're sitting on more fandom than you can see, prove, or bank.
              The Fan Engine<span className="tm">™</span> is the system I build to turn customers into fans,
              and to prove what they're worth.
            </p>
            <div className="meth-ctas">
              <Link to="/fan-score" className="btn btn--primary btn--lg">
                Take the 2-min Fan Score
              </Link>
              <Link to={CONTACT_URL} className="btn btn--ghost btn--lg">
                Let’s talk
              </Link>
            </div>
          </div>

          <div className="meth-hero__plate">
            <svg viewBox="0 0 440 440" className="meth-hero__emblem fe-float" aria-hidden="true">
              <defs>
                <radialGradient id="feGlow" cx="50%" cy="50%" r="55%">
                  <stop offset="0" stopColor="rgba(200,54,43,.2)" />
                  <stop offset="1" stopColor="rgba(200,54,43,0)" />
                </radialGradient>
                <radialGradient id="feCore" cx="50%" cy="44%" r="66%">
                  <stop offset="0" stopColor="#1F1A17" />
                  <stop offset=".58" stopColor="#241D19" />
                  <stop offset="1" stopColor="#8E2520" />
                </radialGradient>
              </defs>
              <rect width="440" height="440" fill="url(#feGlow)" />
              <circle cx="220" cy="220" r="188" fill="none" stroke="rgba(212,200,150,.12)" strokeWidth="1" strokeDasharray="5 16" />
              <circle cx="220" cy="220" r="152" fill="none" stroke="rgba(212,200,150,.2)" strokeWidth="1" strokeDasharray="2 20" />
              <g stroke="rgba(200,54,43,.3)" strokeWidth="1.4">
                <line x1="220" y1="220" x2="220" y2="89" />
                <line x1="220" y1="220" x2="351" y2="220" />
                <line x1="220" y1="220" x2="220" y2="351" />
                <line x1="220" y1="220" x2="89" y2="220" />
              </g>
              <circle cx="220" cy="220" r="66" fill="url(#feCore)" stroke="rgba(212,200,150,.5)" strokeWidth="1.5" />
              <g transform="translate(205,193) scale(1.25)" fill="none" stroke="#C8362B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </g>
              <text x="220" y="242" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="10.5" fontWeight="800" letterSpacing="2" fill="#D4C896">
                FAN ENGINE
              </text>
              <circle cx="220" cy="66" r="23" fill="#241D19" stroke="rgba(212,200,150,.32)" strokeWidth="1" />
              <g transform="translate(210.2,56.2) scale(.82)" fill="none" stroke="#C8362B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
              </g>
              <circle cx="374" cy="220" r="23" fill="#241D19" stroke="rgba(212,200,150,.32)" strokeWidth="1" />
              <g transform="translate(364.2,210.2) scale(.82)" fill="none" stroke="#C8362B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m17 2 4 4-4 4" />
                <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                <path d="m7 22-4-4 4-4" />
                <path d="M21 13v1a4 4 0 0 1-4 4H3" />
              </g>
              <circle cx="220" cy="374" r="23" fill="#241D19" stroke="rgba(212,200,150,.32)" strokeWidth="1" />
              <g transform="translate(210.2,364.2) scale(.82)" fill="none" stroke="#C8362B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </g>
              <circle cx="66" cy="220" r="23" fill="#241D19" stroke="rgba(212,200,150,.32)" strokeWidth="1" />
              <g transform="translate(56.2,210.2) scale(.82)" fill="none" stroke="#C8362B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 11 18-5v12L3 14v-3z" />
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
              </g>
            </svg>
            <span className="meth-hero__plate-cap">Four disciplines, one spine</span>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM (bone) */}
      <section className="meth-band meth-band--problem">
        <div className="meth-container">
          <div className="meth-narrow">
            <div className="meth-sechead meth-sechead--onbone">
              <span className="meth-sechead__num">01</span>
              <span className="meth-eyebrow meth-eyebrow--ink">The problem</span>
            </div>
            <h2 className="meth-h2 meth-h2--problem">
              The growth you <mark>already paid for</mark>.
            </h2>
            <p className="meth-lede meth-lede--onbone">
              Budget pours into acquisition and stops at the sale. The value
              that makes a customer profitable comes after it: whether they
              stay, buy again, and bring others. That work is split across
              brand, product, community and growth, so no one owns it and it
              goes unmeasured. The bucket leaks, and you keep paying to refill
              it.
            </p>

            <div className="meth-whofor">
              <span className="meth-eyebrow meth-eyebrow--red meth-whofor__label">Who this is for</span>
              <p className="meth-whofor__body">
                This is for you if you pay to acquire customers, then watch the
                value leak after the sale, or if you have a real fanbase you
                can't yet prove or bank. It's not the fit if what you need is a
                one-off spike this quarter. Fan-led growth compounds, which
                takes a few quarters, not a few weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE METHOD (signature schematic) */}
      <section className="meth-band meth-band--method">
        <div className="meth-container">
          <div className="meth-narrow meth-narrow--wide">
            <div className="meth-sechead">
              <span className="meth-sechead__num">02</span>
              <span className="meth-eyebrow meth-eyebrow--gold">The method</span>
            </div>
            <h2 className="meth-h2">
              Four disciplines. <mark>One spine.</mark>
            </h2>
            <p className="meth-lede">
              Fan-led growth: growth that comes from fans who stay, pay, and
              bring more. I build the engine that creates those fans, and I
              prove it moved.
            </p>
            <p className="meth-lede meth-lede--follow">
              I run all four disciplines as one engine, wired together by a
              measurement spine. I have spent a decade across brand, product,
              community and growth, because the leaks do not respect the org
              chart.{' '}
              <mark className="meth-underline">
                Fan-led work is usually felt, not counted. I tie every part to
                a number
              </mark>
              , so what you build is something you can put in front of a board.
            </p>
          </div>

          <div className="meth-schematic">
            <span className="meth-eyebrow meth-eyebrow--gold meth-schematic__label">The Fan Engine</span>

            <div className="meth-schematic__grid">
              {disciplines.map((d) => (
                <div className="meth-schematic__cell" key={d.word}>
                  {d.icon}
                  <span className="meth-schematic__word">{d.word}</span>
                  <span className="meth-schematic__note">{d.note}</span>
                </div>
              ))}
            </div>

            <div aria-hidden="true" className="meth-schematic__wiring" />

            <div className="meth-schematic__spine">
              <span className="meth-schematic__spine-name">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
                <span className="meth-schematic__spine-title">
                  Measurement <span className="meth-schematic__spine-sub">&middot; the spine</span>
                </span>
              </span>
              <span className="meth-schematic__spine-desc">The KPI tree that ties every part to a number</span>
            </div>

            <div className="meth-schematic__output">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="12" x2="18" y2="12" />
                <polyline points="12 6 18 12 12 18" />
              </svg>
              Growth that compounds, not spend that leaks.
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE JOURNEY (quiet list) */}
      <section className="meth-band meth-band--journey">
        <div className="meth-container">
          <div className="meth-narrow">
            <div className="meth-sechead meth-sechead--onbone">
              <span className="meth-sechead__num">03</span>
              <span className="meth-eyebrow meth-eyebrow--ink">What it builds</span>
            </div>
            <h2 className="meth-h2 meth-h2--onbone">What the engine builds for your customer.</h2>
            <p className="meth-lede meth-lede--onbone">
              The four disciplines move a customer from a first purchase to
              bringing others in, through five stages. Real people do not climb
              them in a tidy line, so treat it as a map, not a formula.
            </p>
          </div>

          <ol className="meth-stages">
            {stages.map((s) => (
              <li className="meth-stages__item" key={s.name}>
                <span className="meth-stages__num">{s.num}</span>
                <h3 className="meth-stages__name">{s.name}</h3>
                <p className="meth-stages__body">{s.body}</p>
              </li>
            ))}
          </ol>

          <div className="meth-loop">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8362B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 9-9" />
              <polyline points="3 3 3 8 8 8" />
            </svg>
            <span className="meth-loop__note">
              Advocacy feeds back to activation: the engine brings in the next
              wave, so it grows itself.
            </span>
          </div>

          <p className="meth-journey__quote">
            Belonging and identity are what make advocacy compound instead of
            needing to be bought again every time.{' '}
            <mark>I build that, and I show it moving in the numbers.</mark>
          </p>
        </div>
      </section>

      {/* 5. MEASURED (how I prove it) */}
      <section className="meth-band meth-band--measured">
        <div className="meth-container">
          <div className="meth-narrow meth-narrow--wide">
            <div className="meth-sechead">
              <span className="meth-sechead__num">04</span>
              <span className="meth-eyebrow meth-eyebrow--gold">How I prove it</span>
            </div>
            <h2 className="meth-h2">
              And <mark>I can prove it</mark>.
            </h2>
            <p className="meth-lede">
              This is the part fan-led work usually skips, and the reason it
              gets undervalued. I do not. Every stage of the journey is tied to
              the number it moves, and each of those ladders to a business
              outcome. No vanity metrics.
            </p>
          </div>

          {/* Proof strip: the receipts behind "I can prove it". Numbers are
           * verbatim from the case studies; each links to its story. */}
          <div className="meth-proofstrip">
            <Link to="/case-studies/ubisoft-siege-champions" className="meth-proof">
              <span className="meth-proof__n">50M+</span>
              <span className="meth-proof__l">UGC views at $0 media spend · Ubisoft</span>
            </Link>
            <Link to="/case-studies/us-mobile-dark-star" className="meth-proof">
              <span className="meth-proof__n">$32K</span>
              <span className="meth-proof__l">in under three hours, sold out · US Mobile</span>
            </Link>
            <Link to="/case-studies/azarus-game-ads" className="meth-proof">
              <span className="meth-proof__n">+80%</span>
              <span className="meth-proof__l">MAU from one streamer campaign · Azarus</span>
            </Link>
          </div>

          <div className="meth-measured__blocks">
            <div className="meth-measured__block">
              <span className="meth-eyebrow meth-eyebrow--gold">The honest method</span>
              <p className="meth-measured__body">
                Earned growth resists clean last-click attribution, and I do
                not pretend otherwise. I baseline first (no baseline, no
                claim), track deltas by cohort instead of last clicks, use
                holdouts where feasible, and name the limits out loud. Stating
                the method is what makes &ldquo;measurable&rdquo; defensible.
              </p>
            </div>

            <div className="meth-measured__block">
              <span className="meth-eyebrow meth-eyebrow--gold">The scoreboard: the numbers you already track</span>
              <p className="meth-measured__body">
                You don't need new fan metrics to see it working. Fan-led
                growth moves the numbers your team already reports, the same
                stay, pay and bring-more behaviours in the language of your
                P&amp;L. When they move together, your paid spend is
                compounding instead of leaking.
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
        </div>
      </section>

      {/* 6. CLOSE (oxblood finale) */}
      <section className="meth-band meth-band--close">
        <div aria-hidden="true" className="meth-close__glow" />
        <div className="meth-container meth-close">
          <span className="meth-eyebrow meth-eyebrow--brightgold">See where your engine stands</span>
          <h2 className="meth-close__title">
            A short diagnostic shows you which part of your engine to{' '}
            <span className="meth-close__hl">build first</span>.
          </h2>
          <p className="meth-close__lede">
            The Fan Score takes two minutes. You'll see where your fan-led
            growth is already worth more than you're counting, then we size it
            against your real numbers.
          </p>
          <div className="meth-ctas">
            <Link to="/fan-score" className="btn btn--lg meth-close__cta">
              Take the 2-min Fan Score
            </Link>
            <Link to={CONTACT_URL} className="btn btn--ghost btn--lg meth-close__ghost">
              Let’s talk
            </Link>
          </div>
          <p className="meth-close__back">
            Or <Link to="/case-studies">see the work first &rarr;</Link>
            {' '}&middot;{' '}
            <Link to="/ai">fan-led growth for AI &rarr;</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
