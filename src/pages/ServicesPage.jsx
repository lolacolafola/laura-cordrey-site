import { useCallback, useEffect, useState } from 'react'
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

/* Services — "Work with me". Six offers as cards; a plus opens the one you
 * want, in place.
 *
 * The card face is the design from Laura's handoff boards: a letterspaced
 * kicker, the title over two lines with the last word in red and a full stop,
 * one teaser line, and a plus. Grounds alternate bone and espresso in a
 * checkerboard across the grid.
 *
 * THE DETAIL INSIDE EACH CARD IS THE ORIGINAL COPY, restored verbatim from
 * 81af613 — Need it when / What you get / Payoff / Proof / duration / CTA, and
 * the Fan Engine's four phases. An intermediate version cut this down to tick
 * lists and lost the diagnosis; that was wrong and is reverted. The only copy
 * written for this version is the six teaser lines on the card faces.
 *
 * FOUR RULES THIS MUST KEEP (handover-services-weight-23jul.md):
 *   1. Panels are CSS-hidden, NEVER unmounted. The build prerenders every
 *      sitemap route; a conditional render would delete the offer detail from
 *      the HTML a crawler is served.
 *   2. Hash deep links open their panel. /ai points at #sentiment-sos and
 *      #fan-moments.
 *   3. The flagship opens by default, or the page reads as thin.
 *   4. More than one open at once, or comparison is impossible.
 */

const OFFERS = [
  {
    id: 'fan-engine',
    tone: 'gold',
    kicker: 'The whole system',
    a: 'The Fan',
    b: 'Engine',
    tm: true,
    teaser: 'The whole engine, powered by your fans.',
    body:
      'My own framework, shaped over thirteen years at Ubisoft, Amazon Games and BlaBlaCar. Fan-led growth built into the bones of the business, run as one system and measured end to end.',
    need:
      'your growth stops the day you stop paying, and the userbase you paid for gives you nothing back.',
    phasesLabel: 'What you get, end to end',
    phases: [
      { label: 'The picture', copy: 'Who your fans are, what they’re worth today, and where you’re losing money, on your own data. Your Fan Value, and a six-month plan.' },
      { label: 'The build', copy: 'The whole engine working as one: the brand they fall for, the product that keeps them coming back with loops designed like a game, the community they belong to, and the programs that bring their friends.' },
      { label: 'The tracking', copy: 'Who’s staying, who’s spending more, who’s bringing others in, and how they feel. Built to your stack, reported to the teams who can act on it.' },
      { label: 'Every quarter', copy: 'A re-score and a fresh read on what your fans are worth.' },
    ],
    payoff:
      'more revenue from the customers you already have, from an engine that keeps working after I’ve gone.',
    proofFig: '60M+ fan views and ~$600K+ earned media',
    proofRest: 'across Ubisoft programs, at $0 media spend.',
    meta: '6 to 8 weeks to build, then ongoing · Priced per engagement',
    /* NAMING RULE: it is never "the Engine". It is always the Fan Engine, and
     * it always carries the ™. See CLAUDE.md. */
    cta: {
      label: (
        <>
          Let&rsquo;s talk about the Fan Engine<span className="tm">™</span>
        </>
      ),
      need: 'engine',
    },
    link: {
      to: '/fan-engine',
      label: (
        <>
          How the Fan Engine<span className="tm">™</span> works
        </>
      ),
    },
  },
  {
    id: 'sentiment-sos',
    tone: 'espresso',
    kicker: 'Protect',
    a: 'Sentiment',
    b: 'SOS',
    teaser: 'When your community turns, move fast.',
    need: 'your community has turned on you in public, and it’s getting worse.',
    get:
      'the real cause found in days, a fix shipped across product and community, and sentiment tracked so you watch it climb back. Five days when it is contained, longer when it runs deep or wide.',
    payoff: 'you keep the customers a blow-up would have cost you.',
    proofFig: '85% positive sentiment',
    proofRest: 'held across a 15M-player community. Ghost Recon, Ubisoft.',
    /* Five days to two weeks and up, per Laura 23 Jul 2026. This said "1 to 2
     * weeks", which was wrong at both ends: it hid the five-day path and it
     * capped something that can legitimately run longer. Do not put a fixed
     * duration back here — the whole point is that it scales to the urgency
     * and the size of the problem. The FAQ carries the same range. */
    meta: 'From 5 days · Scoped to the urgency and the size',
    cta: { label: 'It’s urgent, let’s talk', need: 'sos' },
    note: 'In a crisis right now? We can start this week.',
  },
  {
    id: 'fan-programs',
    tone: 'espresso',
    kicker: 'Grow',
    a: 'Fan',
    b: 'Programs',
    teaser: 'Your users bring you the next ones.',
    need: 'you pay for every new customer, and your users could be bringing them instead.',
    get:
      'one program, built and measured, creator, advocacy, loyalty or referral, whichever fits.',
    payoff: 'growth you don’t pay for every time.',
    proofFig: '50M+ views',
    proofRest:
      'from a program I structured, members reaching their own audiences at $0 media spend. Rainbow Six Siege, Ubisoft.',
    meta: 'From 3 weeks · Scoped to the program',
    cta: { label: 'Talk about a program', need: 'programs' },
    link: { to: '/work', label: 'See programs I’ve built' },
  },
  {
    id: 'fan-moments',
    tone: 'espresso',
    kicker: 'Deepen',
    a: 'Fan',
    b: 'Moments',
    teaser: 'Give your best customers something to feel.',
    need:
      'your best customers get exactly what everyone else gets, and nothing you do makes them feel any different.',
    get:
      'something built for them, a VIP event, unique merch, a drop, or a brand collab. Measured, so you see what it drove.',
    payoff: 'your top customers spend more and stay longer.',
    proofFig: '$32K in under three hours',
    proofRest:
      'from a fan drop that sold out, US Mobile. And a Live Nation activation where over half of users said they wouldn’t have carpooled to shows without it, BlaBlaCar.',
    meta: 'From 2 weeks · Scheduled around your date',
    cta: { label: 'Talk about your moment', need: 'moments' },
    link: { to: '/work', label: 'See moments I’ve built' },
  },
  {
    id: 'advisory',
    tone: 'bone',
    kicker: 'In the room',
    a: '',
    b: 'Advisory',
    teaser: 'One decision, or an embedded role.',
    need:
      'you have one decision to get right, or you want senior fan-led growth leadership without a full-time hire.',
    get:
      'one call on your hardest fan-led growth question, with someone who has built it at scale. You leave knowing exactly what to do, and the plan lands in writing that week.',
    payoff: 'you get the call right the first time, without carrying a full-time hire to do it.',
    proofFig: 'Thirteen years',
    proofRest:
      'of the judgment behind fan programs at Ubisoft and US Mobile, and a platform acquired by Animoca.',
    meta: 'Priced per session or an ongoing embedded role',
    cta: { label: 'Book a session', need: 'advisory' },
  },
]

export default function ServicesPage() {
  useDocumentMeta({
    title: 'Work with me · Laura Cordrey · Fan-led growth',
    description:
      'Make the userbase you already paid for worth more: Sentiment SOS, Fan Programs, Fan Moments, the Fan Engine™, or advisory. Free 2-minute Fan Score™.',
    canonical: pageUrl('services'),
    ogType: 'website',
    jsonLd: serviceJsonLd(),
  })

  /* Every row starts CLOSED, at Laura's call on 22 Jul 2026. This supersedes
   * the "flagship opens by default, or the page reads as thin" rule in
   * handover-services-weight-23jul.md — that rule was written when the rows
   * were plain text and the page needed something to show. The faces now carry
   * the kicker, the title and a teaser on four colour grounds, so the closed
   * stack reads as a deliberate menu rather than as an empty page.
   *
   * Still a Set, not a single id, so any number can be open at once and two
   * offers can be compared side by side. */
  const [open, setOpen] = useState(() => new Set())

  const toggle = useCallback((id) => {
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Rule 2. A deep link that lands on a closed card is a broken promise.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace('#', '')
      if (!id || !OFFERS.some((o) => o.id === id)) return
      setOpen((prev) => new Set(prev).add(id))
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: 'start' })
      })
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="svc-hero">
        <div className="container svc-hero__inner">
          <div className="svc-hero__top">
            <span className="marker">Work with me</span>
          </div>
          <h1 className="svc-hero__title">
            The whole engine, or just the <mark>piece you need</mark>.
          </h1>
          <p className="svc-hero__lede">
            Make the userbase you already paid for worth more. Protect it, grow
            from it, deepen it, or build the whole system that does all three.
          </p>
          {/* No backlink to /fan-led-growth here on purpose. It used to sit
            * between the lede and the CTA, offering an exit at the one moment
            * this page is asking for a conversation. "Why fans" is the first
            * nav item on every page, so the route is still one click away, and
            * the homepage and /methodology both link it in body copy. */}
          <div className="svc-hero__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
              Let&rsquo;s talk</Link>
          </div>
        </div>
      </section>

      {/* ─── THE SIX OFFERS, AS CARDS ─────────────────────────── */}
      <section className="svc-band svc-band--bone">
        <div className="container">
          <div className="svc-index__head">
            <h2 className="svc-index__title">Where would you start?</h2>
          </div>

          <div className="svc-cards">
            {OFFERS.map((o) => {
              const isOpen = open.has(o.id)
              return (
                <article
                  key={o.id}
                  id={o.id}
                  className={`svc-row svc-row--${o.tone}`}
                  data-open={isOpen}
                >
                  {/* The whole face is the control, with the plus marking it at
                    * the top right. A full-width row that reacts to the cursor
                    * has to be clickable across its whole surface, or the hover
                    * is a lie (CLAUDE.md hover honesty). The plus is absolutely
                    * positioned but lives inside the button, so it is part of
                    * the same hit area rather than a second target. */}
                  <button
                    type="button"
                    className="svc-row__face"
                    aria-expanded={isOpen}
                    aria-controls={`${o.id}-panel`}
                    onClick={() => toggle(o.id)}
                  >
                    <span className="svc-row__head">
                      <span className="svc-row__kick">{o.kicker}</span>
                      <span className="svc-row__title">
                        {o.a && <span className="svc-row__a">{o.a}</span>}
                        <span className="svc-row__b">
                          {o.b}
                          {o.tm && <span className="tm">™</span>}
                          <span className="svc-row__stop">.</span>
                        </span>
                      </span>
                    </span>
                    {/* Sits in the right column, exactly where the detail
                      * appears when the row opens, so opening reads as the
                      * teaser being replaced by the full case. */}
                    <span className="svc-row__teaser">{o.teaser}</span>
                    <span className="svc-row__plus" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" className="svc-row__bar" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </button>

                  {/* Rule 1: always rendered, hidden with grid-template-rows.
                    *
                    * The panel content is the ORIGINAL offer band, in the
                    * original order and using the original classes, offset into
                    * the right column so an open row reads exactly like the old
                    * page: title on the left, the case on the right.
                    *
                    * `svc-band--bone` goes on only on the light rows. The
                    * original .svc-youget / .svc-credit / .svc-txtlink defaults
                    * were written for the dark bands, so the espresso rows get
                    * the right colours by inheriting them untouched. Both
                    * grounds reuse contrast work that was already done. */}
                  <div
                    className={`svc-row__panel${o.tone === 'espresso' ? '' : ' svc-band--bone'}`}
                    id={`${o.id}-panel`}
                  >
                    <div className="svc-row__panelin">
                      <div className="svc-row__pad">
                        <div className="svc-row__body">
                          {o.body && <p className="svc-eng__body">{o.body}</p>}
                          <p className="svc-youget"><strong>Need it when:</strong> {o.need}</p>
                          {o.get && <p className="svc-youget"><strong>What you get:</strong> {o.get}</p>}
                          {o.phases && (
                            <>
                              <span className="svc-phases__eyebrow">{o.phasesLabel}</span>
                              <div className="svc-phases">
                                {o.phases.map((p) => (
                                  <div className="svc-phase" key={p.label}>
                                    <span className="svc-phase__label">{p.label}</span>
                                    <p>{p.copy}</p>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                          <p className="svc-youget"><strong>Payoff:</strong> {o.payoff}</p>
                          <div className="svc-proofcard">
                            <span className="svc-proofcard__label">Proof</span>
                            <p><strong>{o.proofFig}</strong> {o.proofRest}</p>
                          </div>
                          <div className="svc-credit">
                            <span className="svc-credit__fmt">{o.meta}</span>
                          </div>
                          <div className="svc-eng__act">
                            <Link to={contactFor(o.cta.need)} className="btn btn--primary btn--lg svc-eng__cta">
                              {o.cta.label}
                            </Link>
                            {o.note && <span className="svc-ctanote">{o.note}</span>}
                            {o.link && (
                              <Link to={o.link.to} className="svc-txtlink">
                                {o.link.label} <span aria-hidden="true">→</span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}

            {/* AI is NOT a row. It is not an offer, it is an audience, and it
              * goes somewhere rather than opening. It has its own band below
              * the offers — see the FOR AI COMPANIES section. */}
          </div>

          <p className="svc-cards__foot">
            Each one stands on its own. If you don&rsquo;t have the team to run it, I bring one.{' '}
            <a href="#how-i-work" className="svc-txtlink svc-cards__footlink">
              How I work <span aria-hidden="true">↓</span>
            </a>
          </p>
        </div>
      </section>

      {/* ─── FOR AI COMPANIES ─────────────────────────────────────
        * The OG slim pointer band, restored from 1ac0f8a~1 where it was cut on
        * 22 Jul in the copy reduction. Copy is unchanged.
        *
        * It now carries the E3 photograph, which is the image the /ai page
        * uses, so the band both points at that page and breaks up a run of
        * five text rows with the only picture on the page. */}
      <section className="svc-band svc-band--deep svc-ai">
        <div className="container svc-ai__inner">
          <figure className="svc-ai__fig">
            <img
              src={BASE + 'portraits/laura-e3.jpg'}
              alt="Laura Cordrey on stage at E3"
              loading="lazy"
              width="540"
              height="488"
            />
          </figure>
          <div className="svc-ai__copy">
            <span className="svc-ai__kick">For AI companies</span>
            <h2 className="svc-ai__title">
              Shipping a model with a crowd around it? There&rsquo;s a page in your language.
            </h2>
            <p className="svc-ai__lede">
              The same work, in your language, on founding-partner terms while I
              build the first AI case studies.
            </p>
            <Link to="/ai" className="btn btn--ghost btn--lg svc-ai__cta">
              Fan-led growth for AI <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW I WORK ───────────────────────────────────────── */}
      <section id="how-i-work" className="svc-band svc-band--bone">
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(36px,4vw,52px)' }}>
          <div style={{ maxWidth: '46rem', display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,22px)' }}>
            {/* #8E2520, not #C8362B: the red measured 4.32 on the bone ground
                against 4.5 for text this size. Same substitution as the other
                bone-ground kickers on /about, /ai and /fan-engine. */}
            <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#8E2520', fontWeight: 700 }}>
              How I work
            </span>
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
              { n: '01', label: 'I go deep.', copy: 'Your product, your data, your team: interviews, a survey, the real numbers, so the plan is built on what’s actually happening.' },
              { n: '02', label: 'You get a plan that’s ready to run.', copy: 'A fan-led growth strategy and roadmap, built on your own data: the moves that matter, sequenced and measurable.' },
              { n: '03', label: 'I bring the people to run it.', copy: 'No team for it? I pull in specialists I trust and direct them, so you get the plan and the people.' },
            ].map((s) => (
              <li key={s.n} className="svc-how__step" style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span
                  className="svc-how__num"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start', fontSize: 'clamp(1.35rem,2vw,1.75rem)', fontWeight: HEAD_W, letterSpacing: '-.02em', lineHeight: 1, color: 'var(--accent-text)', background: '#EFE9DC', padding: '0 14px', height: 68, position: 'relative', zIndex: 1 }}
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

          {/* The Brusson quote was cut on 22 Jul 2026 at Laura's request,
            * along with the proof band it originally sat in.
            * NOTE FOR WHOEVER PICKS THIS UP: checking the built HTML on 22 Jul
            * showed this quote is NOT duplicated on /about — it survives on
            * the homepage only. So /services, the site's commercial page, now
            * carries no third-party voice at all. That is a deliberate call,
            * not an oversight, but it is worth revisiting if the page ever
            * needs to work harder. */}
        </div>
      </section>

      {/* ─── FINALE (oxblood, centered) ───────────────────────── */}
      <section className="svc-band svc-band--ox svc-finale">
        <div className="svc-halo svc-halo--bl" aria-hidden="true" />
        {/* The two gold sparkles were removed on 22 Jul 2026. They were the
          * only decoration of their kind on the page, so they read as a
          * leftover rather than as a motif. The halo stays: it is a soft
          * gradient wash, not a mark. */}
        <div className="container svc-finale__inner">
          <h2 className="svc-finale__title">What&rsquo;s your fanbase worth?</h2>
          <p className="svc-finale__line">
            Take the 2-minute Fan Score<span className="tm">™</span>, or tell me what&rsquo;s going on.
          </p>
          <div className="svc-finale__ctas">
            <Link to={CONTACT_URL} className="btn btn--primary btn--lg">
              Let&rsquo;s talk</Link>
            <Link to="/fan-score" className="btn btn--lg svc-finale__ghost">
              Take the 2-min Fan Score<span className="tm">™</span></Link>
            <Link to="/fan-value" className="btn btn--lg svc-finale__ghost">
              Size your Fan Value<span className="tm">™</span></Link>
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
