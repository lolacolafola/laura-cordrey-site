import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, serviceJsonLd } from '../lib/seo.js'
import './ServicesPage.css'

const CONTACT_URL = '/contact?intent=consulting'

/* Services — editorial "Work with me" page.
 * Structure: hero → engagement index → four offer bands (oxblood → grey → bone → dark)
 * → oxblood finale. Each offer is a 2-col grid: sticky left column (kicker,
 * title, CTA, txtlink) and scrolling right column (body, "you get", proof
 * card, credit meta). Copy is FINAL v5 (2026-07-05); design handoff lives at
 * design_handoff_final_pass/services/. */

export default function ServicesPage() {
  useDocumentMeta({
    title: 'Work with me · Laura Cordrey · Fan-led growth for fan-driven brands',
    description:
      'How to work with me: the Fan Engine (my flagship fan-led growth system), Sentiment SOS when your community turns, Fan Moments for launches and drops, and fractional and advisory support. Begin with a free intro call or your Fan Score.',
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
            Four ways to work together, each built to turn the fans you already have into growth, and to show you what it&rsquo;s worth.
          </p>
          <div className="svc-hero__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
              Let&rsquo;s talk <span aria-hidden="true">→</span>
            </Link>
            <Link to="/fan-led-growth-audit" className="btn btn--ghost btn--lg">
              Take the 2-min Fan Score <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT INDEX ─────────────────────────────────── */}
      <section className="svc-band svc-band--deep">
        <div className="container">
          <nav className="svc-index" aria-label="Engagements">
            <a href="#fan-engine" className="svc-index__row">
              <span className="svc-index__n">01</span>
              <span className="svc-index__nm">The Fan Engine</span>
              <span className="svc-index__one">The flagship. One system, powered by your own fans.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <a href="#sentiment-sos" className="svc-index__row">
              <span className="svc-index__n">02</span>
              <span className="svc-index__nm">Sentiment SOS</span>
              <span className="svc-index__one">When it can&rsquo;t wait. The recovery roadmap.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <a href="#fan-moments" className="svc-index__row">
              <span className="svc-index__n">03</span>
              <span className="svc-index__nm">Fan Moments</span>
              <span className="svc-index__one">The big swing. A moment that has to land.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <a href="#consulting" className="svc-index__row">
              <span className="svc-index__n">04</span>
              <span className="svc-index__nm">Fractional &amp; advisory</span>
              <span className="svc-index__one">Advisory. From a call to an embedded role.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </a>
            <Link to="/ai" className="svc-index__row svc-index__row--ai">
              <span className="svc-index__n">AI</span>
              <span className="svc-index__nm">For AI companies</span>
              <span className="svc-index__one">Fan-led growth, built for AI. Founding-partner terms.</span>
              <span className="svc-index__arr" aria-hidden="true">→</span>
            </Link>
          </nav>
          {/* Pointer: plants the "plug-and-play + team if you need one"
            * reassurance before the reader dives into the offers, and
            * gestures to the How I work section further down. */}
          <p style={{ marginTop: 'clamp(20px,2.4vw,28px)', marginBottom: 0, fontSize: '.95rem', lineHeight: 1.55, color: 'rgba(239,233,220,.7)', fontWeight: 500 }}>
            Each one plug-and-play. If you don&rsquo;t have the team to run it, I bring one.{' '}
            <a href="#how-i-work" className="svc-txtlink" style={{ color: '#D4C896', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid rgba(212,200,150,.32)', paddingBottom: 2 }}>
              How I work <span aria-hidden="true">↓</span>
            </a>
          </p>
        </div>
      </section>

      {/* ─── §01 THE FAN ENGINE (flagship, oxblood) ───────────── */}
      <section className="svc-band svc-band--ox" id="fan-engine">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick">01 · The flagship</span>
            <h2 className="svc-eng__title">The Fan Engine.</h2>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg svc-eng__cta">
              Let&rsquo;s talk about the Engine <span aria-hidden="true">→</span>
            </Link>
            <Link to="/methodology" className="svc-txtlink">
              How the Engine works <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="svc-eng__right">
            <p className="svc-youget"><strong>What it&rsquo;s for:</strong> Growth leaning on paid while your fans sit idle. You want one system, not four disconnected teams.</p>
            <p className="svc-youget"><strong>What you get:</strong> First, a deep-dive review of where your growth is leaking and what your fans are really worth. Then an engine that plugs into your company across brand, product, community and growth, built to run as one and powered by the fans you already have. In your hands: your Fan Score, your Fan Value in your own numbers, and a six-month growth plan. So you stop renting growth from ads and start owning it.</p>
            <p className="svc-youget"><strong>How long:</strong> 6 to 8 weeks to build, then ongoing sprints.</p>
            <p className="svc-youget"><strong>What it costs:</strong> Priced per project.</p>
            <p className="svc-youget"><strong>The payoff:</strong> For the first time, a real number on what your fanbase is worth, and growth that no longer lives or dies by ad spend.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                <strong>$500K+ in earned media</strong> across three Ubisoft game IPs, at zero media spend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── §02 SENTIMENT SOS (warm grey) ────────────────────── */}
      <section className="svc-band svc-band--grey" id="sentiment-sos">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick svc-eng__kick--accent">
              02 · When it can&rsquo;t wait
            </span>
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
            <p className="svc-youget"><strong>What it&rsquo;s for:</strong> Reviews have turned and every update lands worse than the last. You need it handled fast.</p>
            <p className="svc-youget"><strong>What you get:</strong> Triage in days, so you&rsquo;re moving while it&rsquo;s still hot. Then a fix your team can ship: a product roadmap and the community comms to go with it, both aimed at what&rsquo;s really driving it. Not another report that sits in a drawer.</p>
            <p className="svc-youget"><strong>How long:</strong> 1 to 3 weeks, scoped to how urgent it is.</p>
            <p className="svc-youget"><strong>What it costs:</strong> Priced per project.</p>
            <p className="svc-youget"><strong>The payoff:</strong> The bleeding stops, the community comes back onside, and your team can see the next crisis before it hits.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proven at scale</span>
              <p>
                Built on the system I ran for a <strong>15-million-player live-service community</strong>, held at <strong>85% positive sentiment</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── §03 FAN MOMENTS (bone) ───────────────────────────── */}
      <section className="svc-band svc-band--bone" id="fan-moments">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick">03 · The big swing</span>
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
            <p className="svc-youget"><strong>What it&rsquo;s for:</strong> A launch, a drop, a reveal that has to land.</p>
            <p className="svc-youget"><strong>What you get:</strong> The whole moment, designed end to end, with your fans built in to carry it. And the numbers behind it, so you see exactly what worked.</p>
            <p className="svc-youget"><strong>How long:</strong> From 2 weeks, scheduled around your date, depending on scope.</p>
            <p className="svc-youget"><strong>What it costs:</strong> Priced per project.</p>
            <p className="svc-youget"><strong>The payoff:</strong> Your fans amplify the moment on top of your media budget, so your spend works harder, and you leave with a proven playbook to run again.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                A fan program I unveiled <strong>live on the E3 stage</strong>, 10,000 applications from US fans alone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── §04 CONSULTING (dark, with price) ────────────────── */}
      <section className="svc-band" id="consulting">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick">04 · In the room</span>
            <h2 className="svc-eng__title">
              <mark>Fractional &amp; advisory</mark>.
            </h2>
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg svc-eng__cta">
              Let&rsquo;s talk <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="svc-eng__right">
            <p className="svc-youget"><strong>What it&rsquo;s for:</strong> You don&rsquo;t need a program, you need me in the room, on the decision in front of you.</p>
            <p className="svc-youget"><strong>What you get:</strong> Senior fan-led growth judgment on the decision in front of you, one to one. A straight read on where you really stand, and a clear plan you can act on this week.</p>
            <p className="svc-youget"><strong>How long:</strong> From a single call to an ongoing role: a call, a workshop, ongoing advisory, or an embedded fractional lead.</p>
            <p className="svc-youget"><strong>What it costs:</strong> Scoped to your time.</p>
            <p className="svc-youget"><strong>The payoff:</strong> You move faster and skip the expensive wrong turn.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Who you&rsquo;re working with</span>
              <p>
                You get a <strong>thirteen-year operator</strong>, seasoned across Ubisoft, Amazon Games, the French unicorn BlaBlaCar, and a US startup acquired by Animoca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOR AI COMPANIES (slim pointer band) ──────────────
        * AI is an audience, not a fifth offer: this points AI buyers to
        * /ai, where the same jobs are sold in their language on
        * founding-partner terms. Keep in sync with the /ai offer stack. */}
      <section className="svc-band svc-band--deep">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(20px,3vw,40px)' }}>
          <div style={{ maxWidth: '52ch', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>
              For AI companies
            </span>
            <h2 style={{ fontSize: 'clamp(1.4rem,2.4vw,1.9rem)', lineHeight: 1.2, letterSpacing: '-.02em', fontWeight: 800, color: '#EFE9DC', margin: 0, textWrap: 'balance' }}>
              Shipping models with a crowd around them? There&rsquo;s a page in your language.
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

      {/* ─── HOW I WORK ────────────────────────────────────────
        * Reassurance moment between the four offers and the CTA close.
        * Copy source: content/copy/copy-how-i-work-2026-07-05.md.
        * Layout: 3-col numbered sequence (immerse → deliver → staff) on
        * the site's dark ground, with a thin gold connector rule behind
        * the number markers to show the flow at a glance. Not in the
        * engagement index (that's the four-offer nav); this is meta —
        * how every engagement runs, regardless of which offer. */}
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
            {/* Connector rule — thin ink hairline behind the number markers
              * on the bone ground. Numbers sit on top with a solid bone
              * background so the line reads as segments running between
              * them. Hidden ≤900px when the steps stack (ServicesPage.css). */}
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
                style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}
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
                    marginTop: 0,
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

      {/* ─── FINALE (oxblood, centered) ───────────────────────── */}
      <section className="svc-band svc-band--ox svc-finale">
        <div className="svc-halo svc-halo--bl" aria-hidden="true" />
        <div className="svc-sparkles svc-sparkles--gold" aria-hidden="true">
          <span className="svc-sparkle">✦</span>
          <span className="svc-sparkle">✦</span>
        </div>
        <div className="container svc-finale__inner">
          <p className="svc-finale__reassure">
            Not sure which fits? That&rsquo;s what the free intro call is for.
            No pitch, a straight read.
          </p>
          <h2 className="svc-finale__title">What&rsquo;s your fanbase worth?</h2>
          <p className="svc-finale__line">
            Take the two-minute Fan Score, or size what it&rsquo;s worth with
            the Fan Value calculator. Then let&rsquo;s build the engine that
            captures it.
          </p>
          <div className="svc-finale__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
              Let&rsquo;s talk <span aria-hidden="true">→</span>
            </Link>
            <Link to="/fan-led-growth-audit" className="btn btn--lg svc-finale__ghost">
              Take the 2-min Fan Score <span aria-hidden="true">→</span>
            </Link>
            <Link to="/fan-led-growth-value-model" className="btn btn--lg svc-finale__ghost">
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
