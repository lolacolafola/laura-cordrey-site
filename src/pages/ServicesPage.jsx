import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, serviceJsonLd } from '../lib/seo.js'
import { HEAD_W, T } from '../lib/scale.js'
import './ServicesPage.css'

const BASE = import.meta.env.BASE_URL
const CONTACT_URL = '/contact?intent=consulting'
// Deep-link a specific offer so the contact form opens with it pre-selected.
// Keys must match VALID_NEEDS in ContactPage.jsx.
const contactFor = (need) => `/contact?intent=consulting&need=${need}`

/* Services — editorial "Work with me" page. Structure kept from the live
 * design (hero → numbered index → per-offer blocks → How I work → close);
 * copy is the CMO-pass v-final deck (18 Jul). Engine-first: the Fan Engine
 * flagship, then the pieces (protect / acquire / deepen), then Advisory.
 * Logos + the Brusson quote live together in one proof band before the close. */

export default function ServicesPage() {
  useDocumentMeta({
    // 45 chars. Was 65, over the 60 limit, since before this week. The
    // handover's "leave the over-long titles" exemption is for the case
    // studies, where the pattern is `Client · Result · Laura Cordrey` and the
    // client name survives truncation. This one just ran long.
    title: 'Work with me · Laura Cordrey · Fan-led growth',
    description:
      'Make the userbase you already paid for worth more: Sentiment SOS, Fan Programs, Fan Moments, the Fan Engine, or advisory. Free 2-minute Fan Score.',
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
          {/* The three verbs here are the same three words the index rows and
            * section kickers use, deliberately: protect / grow / deepen. The
            * index used to say "Acquire" for the middle one, so the page
            * promised three things in the hero and then labelled one of them
            * something else. "grow off it" was also clumsy. */}
          <p className="svc-hero__lede">
            Make the userbase you already paid for worth more. Protect it, grow
            from it, deepen it, or build the whole system that does all three.
          </p>
          {/* For anyone who lands here cold: the argument sits one click away.
              Kept out of the lede so it doesn't compete with the two CTAs. */}
          <p className="svc-hero__backlink">
            New to this? Start with{' '}
            <Link to="/fan-led-growth" className="svc-txtlink">
              how customers become fans
            </Link>
            .
          </p>
          {/* ONE hero CTA, 22 Jul 2026. The Fan Score ghost button was the
            * second, and this was the only page on the site with two: the
            * homepage, /ai, /speaking and /fan-score all carry exactly one.
            * The Fan Score is still offered twice in the close, where a reader
            * who is not ready to talk is the one who needs it. */}
          <div className="svc-hero__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
              Let&rsquo;s talk</Link>
          </div>
        </div>
      </section>

      {/* ─── ENGAGEMENT INDEX (Engine flagship first, then the pieces) ─
        * Bone ground so this opening section lifts off the dark hero. */}
      <section className="svc-band svc-band--bone">
        <div className="container">
          {/* The lede under this heading was cut on 22 Jul 2026 (copy
            * reduction). It restated the hero and then the six rows below
            * restated it a third time in their own words. The rows ARE the
            * skim layer; they did not need a paragraph introducing them.
            *
            * The heading changed with it. It read "Start with the whole engine,
            * or one piece", which is the H1 ("The whole engine, or just the
            * piece you need") said twice, one screen apart. The cut lede had
            * been the only thing separating them. It now asks the question the
            * six rows below actually answer. */}
          <div className="svc-index__head">
            <h2 className="svc-index__title">Where would you start?</h2>
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
              <span className="svc-index__one">Grow. Growth you don&rsquo;t pay for every time.</span>
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
          <p style={{ marginTop: 'clamp(20px,2.4vw,28px)', marginBottom: 0, fontSize: '.95rem', lineHeight: 1.55, color: 'var(--ink-muted-on-surface)', fontWeight: 500 }}>
            Each one stands on its own. If you don&rsquo;t have the team to run it, I bring one.{' '}
            <a href="#how-i-work" className="svc-txtlink" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none', borderBottom: '1px solid rgba(200,54,43,.32)', paddingBottom: 2 }}>
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
            <Link to={contactFor('engine')} className="btn btn--primary btn--lg svc-eng__cta">
              Let&rsquo;s talk about the Engine</Link>
            <Link to="/fan-engine" className="svc-txtlink">
              How the Engine works <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="svc-eng__right">
            <p className="svc-eng__body">
              My own framework, shaped over thirteen years at Ubisoft, Amazon
              Games and BlaBlaCar. Fan-led growth built into the bones of the
              business, run as one system and measured end to end.
            </p>
            <p className="svc-youget"><strong>Need it when:</strong> your growth stops the day you stop paying, and the userbase you paid for gives you nothing back.</p>
            <span className="svc-phases__eyebrow">What you get, end to end</span>
            <div className="svc-phases">
              <div className="svc-phase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="4" y1="20" x2="4" y2="13" /><line x1="10" y1="20" x2="10" y2="5" /><line x1="16" y1="20" x2="16" y2="10" /><line x1="20" y1="20" x2="20" y2="15" /></svg>
                <span className="svc-phase__label">The picture</span>
                <p>Who your fans are, what they&rsquo;re worth today, and where you&rsquo;re losing money, on your own data. Your Fan Value, and a six-month plan.</p>
              </div>
              <div className="svc-phase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 4.5-9 4.5-9-4.5L12 3z" /><path d="M3 12l9 4.5L21 12" /><path d="M3 16.5L12 21l9-4.5" /></svg>
                <span className="svc-phase__label">The build</span>
                <p>The whole engine working as one: the brand they fall for, the product that keeps them coming back with loops designed like a game, the community they belong to, and the programs that bring their friends.</p>
              </div>
              <div className="svc-phase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="3 12 7 12 10 5 14 19 17 12 21 12" /></svg>
                <span className="svc-phase__label">The tracking</span>
                <p>Who&rsquo;s staying, who&rsquo;s spending more, who&rsquo;s bringing others in, and how they feel. Built to your stack, reported to the teams who can act on it.</p>
              </div>
              <div className="svc-phase">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-3-6.7" /><polyline points="21 3 21 8 16 8" /></svg>
                <span className="svc-phase__label">Every quarter</span>
                <p>A re-score and a fresh read on what your fans are worth.</p>
              </div>
            </div>
            {/* "How far I take it is your call" was cut on 22 Jul 2026: the
              * light end is Advisory and the heavy end is step 03 of How I
              * Work ("I bring the people to run it"), both on this page. */}
            <p className="svc-youget"><strong>Payoff:</strong> more revenue from the customers you already have, from an engine that keeps working after I&rsquo;ve gone.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                <strong>60M+ fan views and ~$600K+ earned media</strong> across Ubisoft programs, at $0 media spend.
              </p>
            </div>
            <div className="svc-credit">
              <span className="svc-credit__fmt">
                6 to 8 weeks to build, then ongoing · Priced per engagement
              </span>
            </div>
            <div className="svc-eng__act">
              <Link to={contactFor('engine')} className="btn btn--primary btn--lg svc-eng__cta">
                Let&rsquo;s talk about the Engine</Link>
            </div>
          </div>
        </div>
      </section>
      {/* ─── §02 SENTIMENT SOS · Protect (grey) ───────────────── */}
      <section className="svc-band svc-band--grey" id="sentiment-sos">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick svc-eng__kick--accent">Protect</span>
            <h2 className="svc-eng__title">
              Sentiment <mark>SOS</mark>.
            </h2>
          </div>
          <div className="svc-eng__right">
            <p className="svc-youget"><strong>Need it when:</strong> your community has turned on you in public, and it&rsquo;s getting worse.</p>
            <p className="svc-youget"><strong>What you get:</strong> the real cause found in days, a fix shipped across product and community in one to two weeks, and sentiment tracked so you watch it climb back.</p>
            <p className="svc-youget"><strong>Payoff:</strong> you keep the customers a blow-up would have cost you.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                <strong>85% positive sentiment</strong> held across a 15M-player community. Ghost Recon, Ubisoft.
              </p>
            </div>
            <div className="svc-credit">
              {/* "Faster if it can't wait" was cut on 22 Jul 2026: the CTA note
                * right below says the same thing more concretely ("we can start
                * this week"), and "one to two weeks" is already in the What you
                * get line above. The timeline was stated twice and the urgency
                * twice, inside about 80 words. */}
              <span className="svc-credit__fmt">1 to 2 weeks</span>
            </div>
            <div className="svc-eng__act">
              <Link to={contactFor('sos')} className="btn btn--primary btn--lg svc-eng__cta">
                It&rsquo;s urgent, let&rsquo;s talk</Link>
              <span className="svc-ctanote">
                In a crisis right now? We can start this week.
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* ─── §03 FAN PROGRAMS · Acquire (dark) ────────────────── */}
      <section className="svc-band" id="fan-programs">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick svc-eng__kick--accent">Grow</span>
            <h2 className="svc-eng__title">
              Fan <mark>Programs</mark>.
            </h2>
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
            <div className="svc-eng__act">
              <Link to={contactFor('programs')} className="btn btn--primary btn--lg svc-eng__cta">
                Talk about a program</Link>
              <Link to="/work" className="svc-txtlink">
                See programs I&rsquo;ve built <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ─── §04 FAN MOMENTS · Deepen (bone) ──────────────────── */}
      <section className="svc-band svc-band--bone" id="fan-moments">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick">Deepen</span>
            <h2 className="svc-eng__title">
              Fan <mark>Moments</mark>.
            </h2>
          </div>
          <div className="svc-eng__right">
            {/* Was "you want to give your best fans a moment they'll love",
              * which was the only "Need it when" on the page naming a want
              * rather than a problem, and it was circular: you need a fan
              * moment when you want a fan moment. Every other one gives the
              * reader a reason to act now. */}
            <p className="svc-youget"><strong>Need it when:</strong> your best customers get exactly what everyone else gets, and nothing you do makes them feel any different.</p>
            <p className="svc-youget"><strong>What you get:</strong> something built for them, a VIP event, unique merch, a drop, or a brand collab. Measured, so you see what it drove.</p>
            <p className="svc-youget"><strong>Payoff:</strong> your top customers spend more and stay longer.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                A fan drop that sold out and made <strong>$32K in under three hours</strong>, US Mobile. A Live Nation activation where over half of users said they wouldn&rsquo;t have carpooled to shows without it, BlaBlaCar.
              </p>
            </div>
            <div className="svc-credit">
              <span className="svc-credit__fmt">From 2 weeks · Scheduled around your date</span>
            </div>
            <div className="svc-eng__act">
              <Link to={contactFor('moments')} className="btn btn--primary btn--lg svc-eng__cta">
                Talk about your moment</Link>
              <Link to="/work" className="svc-txtlink">
                See moments I&rsquo;ve built <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* ─── §05 ADVISORY (dark) ──────────────────────────────── */}
      <section className="svc-band svc-band--grey" id="advisory">
        <div className="container svc-eng">
          <div className="svc-eng__left">
            <span className="svc-eng__kick">In the room</span>
            <h2 className="svc-eng__title">
              <mark>Advisory</mark>.
            </h2>
          </div>
          <div className="svc-eng__right">
            <p className="svc-youget"><strong>Need it when:</strong> you have one decision to get right, or you want senior fan-led growth leadership without a full-time hire.</p>
            <p className="svc-youget"><strong>What you get:</strong> one call on your hardest fan-led growth question, with someone who has built it at scale. You leave knowing exactly what to do, and the plan lands in writing that week.</p>
            {/* Added 22 Jul 2026. Advisory was the one offer of five without a
              * Payoff, on a page whose whole spine is Need it when / What you
              * get / Payoff / Proof. It is also the easiest yes here, so it was
              * the offer where a reader is closest to acting and the page went
              * quiet on them. */}
            <p className="svc-youget"><strong>Payoff:</strong> you get the call right the first time, without carrying a full-time hire to do it.</p>
            <div className="svc-proofcard">
              <span className="svc-proofcard__label">Proof</span>
              <p>
                <strong>Thirteen years</strong> of the judgment behind fan programs at Ubisoft and US Mobile, and a platform acquired by Animoca.
              </p>
            </div>
            <div className="svc-credit">
              <span className="svc-credit__fmt">Priced per session or an ongoing embedded role</span>
            </div>
            <div className="svc-eng__act">
              <Link to={contactFor('advisory')} className="btn btn--primary btn--lg svc-eng__cta">
                Book a session</Link>
            </div>
          </div>
        </div>
      </section>

      {/* The "For AI companies" band was cut on 22 Jul 2026 (copy reduction).
        * The index nav at the top of this page already carries a "For AI
        * companies" row, with its own one-liner, pointing at the same page,
        * so the band was a second button to a destination the reader had
        * already been offered. */}

      {/* ─── HOW I WORK (cream, intro + 3 labelled steps) ─────── */}
      <section id="how-i-work" className="svc-band svc-band--bone">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px,4vw,52px)' }}>
          <div style={{ maxWidth: '46rem', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,22px)' }}>
            <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>
              How I work
            </span>
            {/* T.h2 / HEAD_W from src/lib/scale.js, was clamp(1.6rem,3vw,2.4rem)@800. */}
            <h2 style={{ fontSize: T.h2, lineHeight: 1.2, letterSpacing: '-.02em', fontWeight: HEAD_W, color: '#15110F', margin: 0, textWrap: 'balance' }}>
              I go deep, then hand you a plan you can actually run.
            </h2>
            <p style={{ fontSize: T.lede, lineHeight: 1.55, fontWeight: 500, color: '#5E564E', margin: 0, textWrap: 'pretty' }}>
              However you work with me, the process is the same. I get inside your product, your data and your team first, so what I build lands ready to run.
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
                copy: 'Your product, your data, your team: interviews, a survey, the real numbers, so the plan is built on what’s actually happening.',
              },
              {
                n: '02',
                label: 'You get a plan that’s ready to run.',
                copy: 'A fan-led growth strategy and roadmap, built on your own data: the moves that matter, sequenced and measurable.',
              },
              {
                n: '03',
                label: 'I bring the people to run it.',
                copy: 'No team for it? I pull in specialists I trust and direct them, so you get the plan and the people.',
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
                    fontSize: 'clamp(1.35rem,2vw,1.75rem)',
                    fontWeight: HEAD_W,
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
                <h3 style={{ fontSize: T.h3, fontWeight: HEAD_W, letterSpacing: '-.01em', lineHeight: 1.2, color: '#15110F', margin: 0 }}>
                  {s.label}
                </h3>
                <p style={{ fontSize: 'clamp(.98rem,1.15vw,1.08rem)', lineHeight: 1.55, color: '#5E564E', margin: 0 }}>
                  {s.copy}
                </p>
              </li>
            ))}
          </ol>

          {/* The Brusson quote, kept when the proof band around it was removed
            * on 22 Jul 2026. The five client logos in that band genuinely were
            * duplicated (homepage and /about both carry them), but the quote
            * was NOT: checking the built HTML after the cut showed it surviving
            * on the homepage alone, which left the site's commercial page with
            * no third-party voice at all. It sits here rather than in its own
            * band because this section is about what working with Laura is
            * like, which is what the quote is about. ~150px against the 537px
            * band it came from. */}
          <figure className="svc-how__quote">
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

      {/* The PROOF BAND (logos + the Brusson quote) was removed on 22 Jul 2026.
        * It was 537px, 6.5% of the page, and entirely duplicated: the same five
        * logos and the same quote are on /about and the homepage. It was also
        * the weakest proof on this page, because every offer already carries its
        * own proof with a real number (60M+ views, 85% across 15M players, $32K
        * in three hours), which beats a logo wall at the moment someone is
        * deciding. See content/copy/services-weight-options.md, option 2. */}

      {/* ─── FINALE (oxblood, centered) ───────────────────────── */}
      <section className="svc-band svc-band--ox svc-finale">
        <div className="svc-halo svc-halo--bl" aria-hidden="true" />
        <div className="svc-sparkles svc-sparkles--gold" aria-hidden="true">
          <span className="svc-sparkle">✦</span>
          <span className="svc-sparkle">✦</span>
        </div>
        {/* The reassurance line above the title was cut on 22 Jul 2026: it
          * said "tell me what's going on" two lines above the close line that
          * says "or tell me what's going on". */}
        <div className="container svc-finale__inner">
          <h2 className="svc-finale__title">What&rsquo;s your fanbase worth?</h2>
          <p className="svc-finale__line">
            Take the 2-minute Fan Score, or tell me what&rsquo;s going on.
          </p>
          <div className="svc-finale__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
              Let&rsquo;s talk</Link>
            <Link to="/fan-score" className="btn btn--lg svc-finale__ghost">
              Take the 2-min Fan Score</Link>
            <Link to="/fan-value" className="btn btn--lg svc-finale__ghost">
              Size your Fan Value</Link>
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
