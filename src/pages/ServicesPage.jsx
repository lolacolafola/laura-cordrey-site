import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, serviceJsonLd } from '../lib/seo.js'
import './ServicesPage.css'

const BASE = import.meta.env.BASE_URL
const CONTACT_URL = '/contact?intent=consulting'

/* Brand logos for the proof band — same assets/order as About's proof strip. */
const CLIENTS = [
  { src: 'logos/blablacar-vert.png', alt: 'BlaBlaCar', maxw: 108 },
  { src: 'logos/ubisoft-stacked-white.png', alt: 'Ubisoft', maxw: 108 },
  { src: 'logos/amazon-game-studios.png', alt: 'Amazon Games', maxw: 96 },
  { src: 'logos/azarus-vert.png', alt: 'Azarus / Animoca', maxw: 108 },
  { src: 'logos/us-mobile-mark.png', alt: 'US Mobile', maxw: 108 },
]

/* Services — editorial "Work with me" page. Structure kept from the live
 * design (hero → numbered index → per-offer blocks → How I work → close);
 * copy is the CMO-pass v-final deck (18 Jul). Engine-first: the Fan Engine
 * flagship, then the pieces (protect / acquire / deepen), then Advisory.
 * Logos + the Brusson quote live together in one proof band before the close. */

export default function ServicesPage() {
  useDocumentMeta({
    title: 'Work with me · Laura Cordrey · Fan-led growth for fan-driven brands',
    description:
      'Make the userbase you already paid for worth more. Protect it with Sentiment SOS, grow off it with Fan Programs, deepen it with Fan Moments, build the whole Fan Engine, or get advisory. Start with the free 2-minute Fan Score.',
    canonical: pageUrl('services'),
    ogType: 'website',
    jsonLd: serviceJsonLd(),
  })

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="svc-hero">
        <div className="container svc-hero__inner">
          <div className="svc-hero__top">
            <span className="marker">Work with me</span>
          </div>
          <h1 className="svc-hero__title">
            The whole engine, or just the{' '}
            <mark>piece you need</mark>.
          </h1>
          <p className="svc-hero__lede">
            Make the userbase you already paid for worth more. Protect it, grow
            off it, deepen it, or build the whole system that does all three.
          </p>
          <div className="svc-hero__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
              Let&rsquo;s talk <span aria-hidden="true">→</span>
            </Link>
            <Link to="/fan-score" className="btn btn--ghost btn--lg">
              Take the 2-min Fan Score <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT INDEX (Engine flagship first, then the pieces) ─ */}
      <section className="svc-band svc-band--deep">
        <div className="container">
          <div className="svc-index__head">
            <h2 className="svc-index__title">Start with the whole engine, or one piece.</h2>
            <p className="svc-index__lede">
              The Fan Engine is all of it, run as one system. Or begin with a
              single lever you already think in: protect what you have, acquire
              without paying, deepen your best. Each connects to the same engine.
            </p>
          </div>
          <nav className="svc-index" aria-label="Engagements">
            <a href="#fan-engine" className="svc-index__row svc-index__row--flag">
              <span className="svc-index__nm">The Fan Engine<span className="tm">™</span></span>
              <span className="svc-index__one">The flagship. The whole engine, powered by your fans.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <a href="#sentiment-sos" className="svc-index__row">
              <span className="svc-index__nm">Sentiment SOS</span>
              <span className="svc-index__one">Protect. Keep the customers a blow-up would cost you.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <a href="#fan-programs" className="svc-index__row">
              <span className="svc-index__nm">Fan Programs</span>
              <span className="svc-index__one">Acquire. Growth you don&rsquo;t pay for every time.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <a href="#fan-moments" className="svc-index__row">
              <span className="svc-index__nm">Fan Moments</span>
              <span className="svc-index__one">Deepen. Your top customers spend more and stay longer.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <a href="#advisory" className="svc-index__row">
              <span className="svc-index__nm">Advisory</span>
              <span className="svc-index__one">One decision, or an embedded role.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <Link to="/ai" className="svc-index__row svc-index__row--ai">
              <span className="svc-index__nm">For AI companies</span>
              <span className="svc-index__one">Fan-led growth, built for AI. Founding-partner terms.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </Link>
          </nav>
          <p style={{ marginTop: 'clamp(20px,2.4vw,28px)', marginBottom: 0, fontSize: '.95rem', lineHeight: 1.55, color: 'rgba(239,233,220,.7)', fontWeight: 500 }}>
            Each one plug-and-play. If you don&rsquo;t have the team to run it, I bring one.{' '}
            <a href="#how-i-work" className="svc-txtlink" style={{ color: '#D4C896', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid rgba(212,200,150,.32)', paddingBottom: 2 }}>
              How I work <span aria-hidden="true">↓</span>
            </a>
          </p>
        </div>
      </section>

      {/* ─── §01 THE FAN ENGINE · flagship (oxblood) ──────────── */}
      <section className="svc-band svc-band--ox" id="fan-engine">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick">The whole system</span>
            <h2 className="svc-eng__title">The Fan Engine<span className="tm">™</span>.</h2>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg svc-eng__cta">
              Let&rsquo;s talk about the Engine <span aria-hidden="true">→</span>
            </Link>
            <Link to="/methodology" className="svc-txtlink">
              How the Engine works <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="svc-eng__right">
            <p className="svc-eng__body">
              Fan-led growth built into the bones of the business, measured end
              to end. Everything else, run as one system, not one-off projects.
            </p>
            <p className="svc-youget"><strong>Need it when:</strong> your growth runs on paid and stops the day you stop paying, and the userbase you paid a fortune to build gives you nothing back.</p>
            <span className="svc-phases__eyebrow">What you get, end to end</span>
            <div className="svc-phases">
              <div className="svc-phase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="20" x2="4" y2="13" /><line x1="10" y1="20" x2="10" y2="5" /><line x1="16" y1="20" x2="16" y2="10" /><line x1="20" y1="20" x2="20" y2="15" /></svg>
                <span className="svc-phase__label">The picture</span>
                <p>Who your fans are, what they&rsquo;re worth today, and where you&rsquo;re losing money, all on your own data. That&rsquo;s your Fan Value, and a plan for the next six months.</p>
              </div>
              <div className="svc-phase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" /><path d="M3 12l9 4.5L21 12" /><path d="M3 16.5L12 21l9-4.5" /></svg>
                <span className="svc-phase__label">The build</span>
                <p>The whole engine, working as one, the brand they fall for, the product that keeps them coming back, its loops designed like a game (and a power-user group feeding it feedback, if you want that), the community they belong to, and the programs that bring their friends.</p>
              </div>
              <div className="svc-phase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 12 7 12 10 5 14 19 17 12 21 12" /></svg>
                <span className="svc-phase__label">The tracking</span>
                <p>You see who&rsquo;s staying, who&rsquo;s spending more, who&rsquo;s posting about you and bringing others in, and how they feel. Your fans grouped and tagged. Built with you, to your stack and needs, with reporting to the right teams so they can act on it.</p>
              </div>
              <div className="svc-phase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7" /><polyline points="21 3 21 8 16 8" /></svg>
                <span className="svc-phase__label">Every quarter</span>
                <p>A re-score and a fresh read on what your fans are worth, so it keeps paying off.</p>
              </div>
            </div>
            <p className="svc-youget"><strong>How far I take it is your call:</strong> the design, built and launched alongside you, or run day to day with a team I bring and direct.</p>
            <p className="svc-youget"><strong>Payoff:</strong> more revenue from the customers you already have, from an engine that keeps working after I&rsquo;ve gone.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                <strong>60M+ fan views and ~$600K+ earned media</strong> across Ubisoft programs, at $0 spend.
              </p>
            </div>
            <div className="svc-credit">
              <span className="svc-credit__fmt">
                6 to 8 weeks to build, then ongoing · Priced per engagement
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* ─── §02 SENTIMENT SOS · Protect (grey) ───────────────── */}
      <section className="svc-band svc-band--grey" id="sentiment-sos">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick svc-eng__kick--accent">01 · Protect</span>
            <h2 className="svc-eng__title">
              Sentiment <mark>SOS</mark>.
            </h2>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg svc-eng__cta">
              It&rsquo;s urgent, let&rsquo;s talk <span aria-hidden="true">→</span>
            </Link>
            <span className="svc-ctanote">
              In a crisis right now? We can start this week.
            </span>
          </div>
          <div className="svc-eng__right">
            <p className="svc-youget"><strong>Need it when:</strong> your community has turned on you in public, and it&rsquo;s getting worse.</p>
            <p className="svc-youget"><strong>What you get:</strong> the real cause found in days, and a fix to ship across product and community, in one to two weeks, faster if it can&rsquo;t wait. And sentiment tracked, so you watch it climb back.</p>
            <p className="svc-youget"><strong>Payoff:</strong> you keep the customers a blow-up would have cost you.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                <strong>85% positive sentiment</strong> held across a 15M-player community. Ghost Recon, Ubisoft.
              </p>
            </div>
            <div className="svc-credit">
              <span className="svc-credit__fmt">1 to 2 weeks · Faster if it can&rsquo;t wait</span>
            </div>
          </div>
        </div>
      </section>
      {/* ─── §03 FAN PROGRAMS · Acquire (dark) ────────────────── */}
      <section className="svc-band" id="fan-programs">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick svc-eng__kick--accent">02 · Acquire</span>
            <h2 className="svc-eng__title">
              Fan <mark>Programs</mark>.
            </h2>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg svc-eng__cta">
              Talk about a program <span aria-hidden="true">→</span>
            </Link>
            <Link to="/case-studies" className="svc-txtlink">
              See programs I&rsquo;ve built <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="svc-eng__right">
            <p className="svc-youget"><strong>Need it when:</strong> you pay for every new customer, and your users could be bringing them instead.</p>
            <p className="svc-youget"><strong>What you get:</strong> one program, built and measured, creator, advocacy, loyalty or referral, whichever fits.</p>
            <p className="svc-youget"><strong>Payoff:</strong> growth you don&rsquo;t pay for every time.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                <strong>50M+ views</strong> from a program I structured, members reaching their own audiences at $0 media spend. Rainbow Six Siege, Ubisoft.
              </p>
            </div>
            <div className="svc-credit">
              <span className="svc-credit__fmt">From 3 weeks · Scoped to the program</span>
            </div>
          </div>
        </div>
      </section>
      {/* ─── §04 FAN MOMENTS · Deepen (bone) ──────────────────── */}
      <section className="svc-band svc-band--bone" id="fan-moments">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick">03 · Deepen</span>
            <h2 className="svc-eng__title">
              Fan <mark>Moments</mark>.
            </h2>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg svc-eng__cta">
              Talk about your moment <span aria-hidden="true">→</span>
            </Link>
            <Link to="/case-studies" className="svc-txtlink">
              See moments I&rsquo;ve built <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="svc-eng__right">
            <p className="svc-youget"><strong>Need it when:</strong> you want to give your best fans a moment they&rsquo;ll love.</p>
            <p className="svc-youget"><strong>What you get:</strong> something built for them, a VIP event, a workshop, unique merch, a drop, or a brand collab made right for your audience. Measured, so you see what it drove.</p>
            <p className="svc-youget"><strong>Payoff:</strong> your top customers spend more and stay longer.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                A fan drop that sold out and made <strong>$32K in under three hours</strong>, US Mobile. A Live Nation activation that changed behaviour: over half its users said they wouldn&rsquo;t have carpooled to shows without it. BlaBlaCar.
              </p>
            </div>
            <div className="svc-credit">
              <span className="svc-credit__fmt">From 2 weeks · Scheduled around your date</span>
            </div>
          </div>
        </div>
      </section>
      {/* ─── §05 ADVISORY (dark) ──────────────────────────────── */}
      <section className="svc-band svc-band--grey" id="advisory">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick">04 · In the room</span>
            <h2 className="svc-eng__title">
              <mark>Advisory</mark>.
            </h2>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg svc-eng__cta">
              Book a session <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="svc-eng__right">
            <p className="svc-youget"><strong>Need it when:</strong> you have one decision to get right, or you want senior fan-led growth leadership without a full-time hire.</p>
            <p className="svc-youget"><strong>What you get:</strong> one call on your hardest fan-led growth question, with someone who&rsquo;s built it at scale. You leave knowing exactly what to do, and the plan to do it lands in writing that week. Book one session, or keep me on.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                <strong>Thirteen years</strong> of the judgment behind fan programs at Ubisoft and US Mobile, and a platform acquired by Animoca.
              </p>
            </div>
            <div className="svc-credit">
              <span className="svc-credit__fmt">Priced per session or an ongoing embedded role</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOR AI COMPANIES (slim pointer band) ─────────────── */}
      <section className="svc-band svc-band--deep">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(20px,3vw,40px)' }}>
          <div style={{ maxWidth: '52ch', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>
              For AI companies
            </span>
            <h2 style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)', lineHeight: 1.2, letterSpacing: '-.02em', fontWeight: 800, color: '#EFE9DC', margin: 0, textWrap: 'balance' }}>
              Shipping a model with a crowd around it? There&rsquo;s a page in your language.
            </h2>
            <p style={{ fontSize: '1rem', lineHeight: 1.55, color: 'rgba(239,233,220,.66)', margin: 0 }}>
              The same work, in your language, on founding-partner terms while I build the first AI case studies.
            </p>
          </div>
          <Link to="/ai" className="btn btn--ghost btn--lg" style={{ flex: 'none' }}>
            Fan-led growth for AI <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ─── HOW I WORK (cream, intro + 3 labelled steps) ─────── */}
      <section id="how-i-work" className="svc-band svc-band--bone">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px,4vw,52px)' }}>
          <div style={{ maxWidth: '46rem', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,22px)' }}>
            <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>
              How I work
            </span>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.4rem)', lineHeight: 1.2, letterSpacing: '-.02em', fontWeight: 800, color: '#15110F', margin: 0, textWrap: 'balance' }}>
              I go deep, then hand you a plan you can actually run.
            </h2>
            <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.55, fontWeight: 500, color: '#5E564E', margin: 0, textWrap: 'pretty' }}>
              However you work with me, the process is the same. I get inside your product, your data and your team first, so what I build fits your reality and lands ready to run. And if you don&rsquo;t have the people to run it, I bring them.
            </p>
          </div>

          <ol
            className="svc-how__steps"
            aria-label="How I work: three steps"
            style={{
              position: 'relative',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'clamp(28px,4vw,64px)',
            }}
          >
            <span
              aria-hidden="true"
              className="svc-how__rule"
              style={{ position: 'absolute', top: 34, left: '5%', right: '5%', height: 1, background: 'rgba(21,17,15,.14)', pointerEvents: 'none' }}
            />
            {[
              {
                n: '01',
                label: 'I go deep.',
                copy: 'Your product, your data, your team: interviews, a survey, the real numbers, so the plan is built on what’s actually happening, not a surface read.',
              },
              {
                n: '02',
                label: 'You get a plan that’s ready to run.',
                copy: 'A fan-led growth strategy and roadmap, built on your own data: the moves that matter, sequenced and measurable, ready to run from day one.',
              },
              {
                n: '03',
                label: 'I bring the people to run it.',
                copy: 'No team for it? I pull in a network of specialists I trust and direct them, so you get the plan and the people, without waiting to hire.',
              },
            ].map((s) => (
              <li
                key={s.n}
                className="svc-how__step"
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}
              >
                <span
                  className="svc-how__num"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'flex-start',
                    fontSize: 'clamp(1.6rem,2.4vw,2.1rem)',
                    fontWeight: 800,
                    letterSpacing: '-.02em',
                    lineHeight: 1,
                    color: '#C8362B',
                    background: '#EFE9DC',
                    padding: '0 14px',
                    height: 68,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {s.n}
                </span>
                <h3 style={{ fontSize: 'clamp(1.15rem,1.6vw,1.4rem)', fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.2, color: '#15110F', margin: 0 }}>
                  {s.label}
                </h3>
                <p style={{ fontSize: 'clamp(.98rem,1.15vw,1.08rem)', lineHeight: 1.55, color: '#5E564E', margin: 0 }}>
                  {s.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── PROOF BAND · who you're working with + logos + quote ── */}
      <section className="svc-band svc-band--deep">
        <div className="container svc-proof">
          <div style={{ maxWidth: '48rem', display: 'flex', flexDirection: 'column', gap: 'clamp(12px,1.6vw,18px)' }}>
            <span className="svc-proof__kick">Who you&rsquo;re working with</span>
            <p style={{ fontSize: 'clamp(1.05rem,1.4vw,1.2rem)', lineHeight: 1.55, color: 'var(--ink)', margin: 0, textWrap: 'pretty' }}>
              Thirteen years across Ubisoft, Amazon Games, BlaBlaCar and a US
              startup acquired by Animoca. One person who has built brand, product,
              community and growth, so I read all four as one system.
            </p>
          </div>
          <ul className="svc-proof__logos" aria-label="Brands where Laura has run fan-led growth">
            {CLIENTS.map((l) => (
              <li key={l.alt} className="svc-proof__cell">
                <img src={BASE + l.src} alt={l.alt} style={{ maxWidth: l.maxw }} loading="lazy" />
              </li>
            ))}
          </ul>
          <figure className="svc-proof__quote">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="#D4C896" aria-hidden="true" style={{ flexShrink: 0 }}>
              <path d="M17 7c-6 2.4-10 8-10 15v11h13V22h-6.6c.2-4 2.6-7 6.6-8.6L17 7zm18 0c-6 2.4-10 8-10 15v11h13V22h-6.6c.2-4 2.6-7 6.6-8.6L35 7z" />
            </svg>
            <blockquote>
              Laura is a <mark>start-up swiss knife</mark> &hellip; with some extra fun!
            </blockquote>
            <figcaption>
              <img src={BASE + 'portraits/nicolas-brusson.png'} alt="Nicolas Brusson" loading="lazy" />
              <span>
                <strong>Nicolas Brusson</strong>
                <span>Co-founder &amp; CEO, BlaBlaCar</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── FINALE (oxblood, centered) ───────────────────────── */}
      <section className="svc-band svc-band--ox svc-finale">
        <div className="svc-halo svc-halo--bl" aria-hidden="true" />
        <div className="svc-sparkles svc-sparkles--gold" aria-hidden="true">
          <span className="svc-sparkle">✦</span>
          <span className="svc-sparkle">✦</span>
        </div>
        <div className="container svc-finale__inner">
          <p className="svc-finale__reassure">
            Not sure which fits? Tell me what&rsquo;s going on and we&rsquo;ll
            find the right one together.
          </p>
          <h2 className="svc-finale__title">What&rsquo;s your fanbase worth?</h2>
          <p className="svc-finale__line">
            Take the 2-minute Fan Score, or tell me what&rsquo;s going on.
          </p>
          <div className="svc-finale__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
              Let&rsquo;s talk <span aria-hidden="true">→</span>
            </Link>
            <Link to="/fan-score" className="btn btn--lg svc-finale__ghost">
              Take the 2-min Fan Score <span aria-hidden="true">→</span>
            </Link>
            <Link to="/fan-value" className="btn btn--lg svc-finale__ghost">
              Size your Fan Value <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="svc-finale__note">
            Prefer to send a note?{' '}
            <a href="mailto:hello@lauracordrey.com">hello@lauracordrey.com</a>
          </p>
        </div>
      </section>
    </>
  )
}
