import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, fanLedGrowthJsonLd } from '../lib/seo.js'
import { HEAD_W, T, SECTION_PAD, INNER, GRID_CAP_LEFT } from '../lib/scale.js'
import Eyebrow from '../components/Eyebrow.jsx'
import './FanLedGrowthPage.css'


/* /fan-led-growth — the plain-language front door.
 *
 * The page's job, in Laura's words: explain what fan-led growth IS, then
 * connect that to the rest of the site. Six beats, each handing to a
 * different page, so this is a front door rather than a cul-de-sac:
 *
 *   What it is       (here)
 *   The evidence  →  /work
 *   Why fans      →  /fan-value      (the estimate card)
 *   So what do you do about it  →  /fan-engine
 *   Who it's for     (here)
 *   Where to start →  /fan-value · /services · /fan-score
 *
 * Provenance: content/copy/fan-led-growth-page-plan.md for the three original
 * sections (lifted verbatim from the old homepage), and
 * content/copy/fan-led-growth-critique-and-copy-v1.md +
 * fan-led-growth-proof-research-v2.md for the three bands added on 22 Jul.
 *
 * Shipped out of preview 22 Jul 2026: indexed, in the sitemap, prerendered.
 *
 * The type scale is imported, NOT redeclared. It used to be a local copy of
 * HomePage's, and the copy had drifted — h1 silently held the h2close value,
 * so the page opened at section volume with no hierarchy release, and a round
 * of homepage breathing-room work could not reach it. See src/lib/scale.js.
 */

// Benchmarks, verbatim from the line already live on /fan-score
// (FanAuditPage.jsx). Kept word-for-word so the two pages cannot drift.
//
// Deliberately the "top fans" figures, not the blended ones on /fan-value.
// /fan-value applies a LOWER lift (Gallup's ~23%) because only some customers
// ever become fans, and its caveat explaining that sits right next to it.
// This page is about what a fan IS, so the per-fan numbers are the honest
// ones here. Do not mix the two sets on one page: they look contradictory
// without the caveat that reconciles them.
const BENCHMARKS = [
  { value: '2 to 3×', label: 'longer top fans stay' },
  { value: '66 to 80%', label: 'more top fans spend' },
  { value: '~4×', label: 'more often top fans refer' },
]
const BENCHMARK_SOURCES = 'Bain, Nielsen, HBR, Wharton'

// Card copy tightened on 22 Jul 2026 (copy reduction). Every card stays: six
// reasons and four situations are what answer the query this page targets, so
// the cut was wording, not substance.
const whyFans = [
  // "They invest more" until 22 Jul 2026: fans spend, investors invest, and it
  // was the only place on the page using that word. The title now matches the
  // sentence under it.
  // Cards 1 and 3 carry only the consequence. Their bodies used to open by
  // restating their own titles ("They stay and spend more" / "Fans stay longer
  // and spend more..."), which meant you read the same thing twice inside one
  // card before reaching the part that earns its place. It was also what made
  // the evidence band above read as an echo: the stats measure the behaviour,
  // the cards are supposed to price it.
  { title: 'They stay and spend more', copy: 'You keep what you paid to win, instead of buying the same customer twice.', icon: 'lock' },
  { title: 'They spread the word', copy: 'Fans make the content that markets you, at no media cost.', icon: 'megaphone' },
  { title: 'They recommend you', copy: 'Their friends arrive on a recommendation, so your cost per customer falls.', icon: 'users' },
  { title: 'They defend you', copy: 'Fans stay through a rough week, and defend you in public.', icon: 'shield' },
  { title: 'AI recommends you too', copy: 'Ask an AI what to pick, and it answers from what your fans post.', icon: 'sparkle' },
  { title: 'It compounds', copy: 'Built once, the engine keeps working and starts to fuel itself.', icon: 'loop' },
]

const situations = [
  { title: 'You’re burning cash on growth', copy: 'Every new customer costs more than the last, and you need growth that doesn’t stop when the spend does.', icon: 'spark' },
  { title: 'You’ve hit product-market fit', copy: 'The product works. Now you’re ready for the growth fans bring on top.', icon: 'rocket' },
  { title: 'You’re getting hammered online', copy: 'Sentiment has turned, and you need someone who knows product and community to turn it back.', icon: 'shield' },
  { title: 'You’re building from day one', copy: 'You already know fans are the moat, and you want the engine in from the start.', icon: 'gear' },
]

const Icon = ({ name, size = 28 }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'rocket':
      return (<svg {...common} strokeWidth={1.6}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>)
    case 'lock':
      return (<svg {...common}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>)
    case 'megaphone':
      return (<svg {...common}><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z" /><path d="M16 8.5a4 4 0 0 1 0 7" /></svg>)
    case 'users':
      return (<svg {...common}><circle cx="9" cy="8" r="3" /><path d="M3.5 20a5.5 5.5 0 0 1 11 0" /><path d="M18 7v6M21 10h-6" /></svg>)
    case 'shield':
      return (<svg {...common}><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z" /></svg>)
    case 'sparkle':
      return (<svg {...common}><path d="M12 2.5l2.1 6.1 6.4.1-5.1 3.9 1.9 6.1-5.2-3.7-5.2 3.7 1.9-6.1-5.1-3.9 6.4-.1z" /></svg>)
    case 'loop':
      return (<svg {...common}><path d="M17 5a7 7 0 0 1 0 14H8" /><path d="M11 22l-3-3 3-3" /><path d="M7 19A7 7 0 0 1 7 5h9" /><path d="M13 2l3 3-3 3" /></svg>)
    case 'spark':
      return (<svg {...common} strokeWidth={1.6}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg>)
    case 'gear':
      return (<svg {...common}><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg>)
    default:
      return null
  }
}

export default function FanLedGrowthPage() {
  // Targeted at the PROBLEM, not the category. A demand check on 22 Jul found
  // "fan-led growth" has no commercial search volume and is homonym-poisoned:
  // the SERP for it is ceiling fans, LED grow lights and the UK football
  // fan-led review. Meanwhile "how to turn customers into fans" is a crowded,
  // high-demand query set (Forbes twice, Tony Robbins, Fanocracy, Superfans).
  //
  // So the label is the ANSWER on this page, never the question. Fan-led
  // growth and the Fan Engine stay everywhere as brand and as the thing that
  // closes; they are just no longer asked to bring the traffic.
  // See content/copy/keyword-demand-check-fan-led-growth.md.
  useDocumentMeta({
    title: 'How to turn customers into fans · Laura Cordrey',
    description:
      'Fans stay longer, spend more and bring others in. How to turn customers into fans, why superfans compound, and what they are worth to your business.',
    canonical: pageUrl('fan-led-growth'),
    jsonLd: fanLedGrowthJsonLd(),
  })

  const rootRef = useRef(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const h0 = window.innerHeight || 800
    const els = root.querySelectorAll('[data-rev]')
    els.forEach((el) => {
      if (el.getBoundingClientRect().top >= h0 * 0.9) el.classList.add('flg-hide')
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.remove('flg-hide'); io.unobserve(e.target) }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="flg flg--editorial" style={{ background: '#EFE9DC', color: '#15110F', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500, lineHeight: 1.55 }}>

      {/* ─── 1. WHAT IT IS ─── */}
      {/* EDITORIAL MODE (pilot, 22 Jul 2026). Light ground, left-aligned.
        * Rationale in content/copy/editorial-mode-light-vs-dark-v1.md: nine of
        * twelve routes opened on the same dark ground, so nothing told you what
        * kind of page you had landed on. Dark-to-cream is the only pair in the
        * palette far enough apart to signal that (369 RGB units; the two darks
        * are 11 apart and espresso is 38, so neither can do the job).
        *
        * The centred hero is the HOMEPAGE's signature and stays unique to it —
        * flipping only the ground would have read as "the homepage in light
        * mode", because this hero was built to match it exactly. */}
      <section className="on-light" style={{ background: '#EFE9DC' }}>
        <div className="flg-hero" style={{ ...INNER, padding: 'clamp(76px,9vw,120px) clamp(20px,5vw,64px) clamp(64px,7.5vw,100px)' }}>
          {/* 82ch, was 62ch, 23 Jul 2026. Laura asked the h1 to break
            * after "customers": "Turn your customers / into fans."
            *
            * The h1 is T.h1 (84px) and needs ~840px for that first line;
            * at 62ch the column was 621px so it wrapped to three. Dropping
            * the font to ~66px would also work but would put this page's
            * h1 out of step with every other page's — the per-page scale
            * drift CLAUDE.md warns about. Widening the column is cheaper.
            *
            * The paragraphs inside keep a 62ch cap of their own: at 82ch a
            * lede runs ~90 characters a line, well past comfortable. Only
            * the h1 wants the extra width. */}
          <div className="flg-hero__copy" style={{ maxWidth: '82ch' }}>
            <Eyebrow tone="deep">Fan-led growth</Eyebrow>
            {/* The h1 carries the query people actually search; the old
              * headline ("Fans are the growth you already own") was not cut,
              * it opens the lede below. The label stays in the eyebrow. */}
            <h1 style={{ fontWeight: HEAD_W, fontSize: T.h1, lineHeight: 1.04, letterSpacing: '-.03em', margin: 'clamp(16px,2vw,22px) 0 0', color: '#15110F' }}>
              {/* nbsp inside the mark, 23 Jul 2026. It was breaking as
                * "Turn your / customers into / fans." — splitting the mark
                * itself and stranding "fans." alone on the last line. Now
                * "Turn your / customers / into fans.", so the marked phrase
                * stays whole and the line ends on it.
                *
                * A true two-line version ("Turn your customers / into fans.")
                * is not available here: at 84px that first line needs ~837px
                * and the hero column is 621px. Getting it would mean widening
                * the column, which is a layout change, not a copy one. */}
              Turn your customers <mark>into&nbsp;fans</mark>.
            </h1>
            <p style={{ fontSize: T.lede, lineHeight: 1.66, color: '#4A423B', margin: 'clamp(24px,3vw,32px) 0 0', textWrap: 'balance', maxWidth: '62ch' }}>
              <strong style={{ color: '#15110F', fontWeight: 700 }}>Fans are the growth you already own.</strong> You&rsquo;ve been renting yours: you pay for every customer, and the day you stop, it stops. Fans work the other way. Build them once, and they keep growing you long after the spend&nbsp;ends.
            </p>
          </div>

          <div data-rev className="flg-pull" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(155deg,#241a16,#15110F)', border: '1px solid rgba(200,54,43,.4)', borderRadius: 3, padding: 'clamp(20px,2.4vw,28px) clamp(22px,2.6vw,32px)', margin: 'clamp(32px,3.8vw,44px) 0 0', maxWidth: 620 }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '-50%', right: '-10%', width: '30vw', height: '30vw', maxWidth: 260, maxHeight: 260, background: 'radial-gradient(circle,rgba(200,54,43,.18) 0%,rgba(200,54,43,0) 64%)', pointerEvents: 'none' }} />
            {/* Explicit cream for the same reason as the dark bands: on a
              * light page this dark card would otherwise inherit ink. */}
            <p style={{ position: 'relative', fontSize: 'clamp(1.3rem,2.2vw,1.8rem)', fontWeight: HEAD_W, letterSpacing: '-.02em', lineHeight: 1.15, margin: 0, color: '#EFE9DC' }}>
              Growth you <span style={{ color: '#E4695E' }}>own</span>, not rent.
            </p>
          </div>

          <p data-rev className="flg-hero__close" style={{ fontSize: T.lede, lineHeight: 1.66, color: '#15110F', fontWeight: 600, margin: 'clamp(28px,3.4vw,38px) 0 0', maxWidth: '62ch' }}>
            When people love what you do, they stay, they spend more, and they bring others with them. Nothing sells harder than a fan telling a friend. But no single team makes a fan: it takes your brand, your product, your community and your growth pulling the same way. Get that right, and customers become fans. That&rsquo;s <mark>fan-led growth</mark>, and I build it into <Link to="/fan-engine" className="flg-inline flg-inline--ink">an engine you own</Link>, then show you what it&rsquo;s&nbsp;worth.
          </p>
        </div>
      </section>

      {/* ─── 2. THE EVIDENCE ─── */}
      {/* Typographic, no cards. Two jobs: answer the "says who?" that the six
        * benefit cards below invite, and give the eye a non-card band between
        * the hero and the first grid. Same reasoning that put the full-bleed
        * speaking band into the homepage rebuild. */}
      <section className="on-light" style={{ background: '#FCFAF3', borderTop: '1px solid rgba(21,17,15,.1)', borderBottom: '1px solid rgba(21,17,15,.1)' }}>
        <div style={{ ...INNER, padding: 'clamp(48px,5.5vw,76px) clamp(20px,5vw,64px)' }}>
          <div data-rev>
            <Eyebrow tone="deep">The evidence</Eyebrow>
            <p style={{ fontSize: T.lede, lineHeight: 1.6, color: '#15110F', fontWeight: 600, margin: 'clamp(12px,1.6vw,18px) 0 0', maxWidth: '46ch' }}>
              Not every customer becomes a superfan. Your top fans behave differently, and it shows up in the&nbsp;numbers.
            </p>
          </div>
          <div className="flg-stats" data-rev style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(22px,3vw,44px)', marginTop: 'clamp(24px,3vw,34px)', maxWidth: 860 }}>
            {BENCHMARKS.map((b) => (
              <div key={b.label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontWeight: HEAD_W, fontSize: 'clamp(1.9rem,3.6vw,3rem)', lineHeight: 1, letterSpacing: '-.03em', color: '#C8362B' }}>{b.value}</span>
                <span style={{ fontSize: T.body, lineHeight: 1.45, color: '#4A423B', fontWeight: 600 }}>{b.label}</span>
              </div>
            ))}
          </div>
          <p data-rev style={{ fontSize: '.86rem', color: '#5E564E', fontWeight: 600, margin: 'clamp(22px,2.6vw,30px) 0 0' }}>
            {BENCHMARK_SOURCES}. <Link to="/work" className="flg-inline flg-inline--ink">See what it looked like when I built it&nbsp;&rarr;</Link>
          </p>
        </div>
      </section>

      {/* ─── 3. WHY FANS ─── */}
      <section className="on-light" style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev>
            <Eyebrow tone="deep">Why fans</Eyebrow>
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.06, letterSpacing: '-.028em', margin: 'clamp(14px,1.8vw,20px) 0 0', maxWidth: '22ch', color: '#15110F' }}>
              {/* Non-breaking spaces either side of the mark so "You earn
                * them." cannot split. It was breaking as "You don't buy fans.
                * You earn / them." with "them." orphaned. */}
              You don&rsquo;t buy fans. You&nbsp;<mark>earn</mark>&nbsp;them.
            </h2>
            {/* text-wrap: balance, 23 Jul 2026. Laura asked for "Earn it, and
              * here is what your fans start doing for you." to read as its own
              * sentence rather than being split with "and here is what your
              * fans start doing for you." dumped onto a line of its own.
              * Balance evens the lines so the closing sentence is not left
              * hanging. Same fix as the two paragraphs in the hero and the
              * "who I work with" beat, and as the /services hero lede. */}
            <p style={{ fontSize: T.lede, lineHeight: 1.6, color: '#4A423B', margin: 'clamp(18px,2.2vw,24px) 0 0', maxWidth: '58ch', textWrap: 'balance' }}>
              People become fans when they feel they belong: a reason to care, a space to connect, a voice, the feeling of being seen. Ad spend can&rsquo;t buy that. Earn it, and here is what your fans start doing for&nbsp;you.
            </p>
          </div>

          {/* Capped and centred so the row is never the widest thing on the
            * page, matching the homepage work-card grid. */}
          <div className="flg-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(14px,1.8vw,20px)', marginTop: 'clamp(34px,4.4vw,56px)', ...GRID_CAP_LEFT }}>
            {whyFans.map((p) => (
              <div key={p.title} data-rev style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderRadius: 3, padding: 'clamp(22px,2.6vw,32px)', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
                <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name={p.icon} size={26} /></span>
                <h3 style={{ fontWeight: HEAD_W, fontSize: T.h3, letterSpacing: '-.02em', margin: 0, color: '#15110F' }}>{p.title}</h3>
                <p style={{ fontSize: T.body, lineHeight: 1.6, color: '#4A423B', margin: 0 }}>{p.copy}</p>
              </div>
            ))}
          </div>

          <div data-rev style={{ position: 'relative', overflow: 'hidden', marginTop: 'clamp(24px,3vw,38px)', background: 'linear-gradient(155deg,#241a16,#15110F)', border: '1px solid rgba(200,54,43,.4)', borderRadius: 3, padding: 'clamp(26px,3.2vw,40px)', ...GRID_CAP_LEFT }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '-40%', right: '-6%', width: '40vw', height: '40vw', maxWidth: 420, maxHeight: 420, background: 'radial-gradient(circle,rgba(200,54,43,.16) 0%,rgba(200,54,43,0) 64%)', pointerEvents: 'none' }} />
            <div className="flg-est" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(20px,3vw,44px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, maxWidth: '52ch' }}>
                <span style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>Fan Value<span className="tm">&trade;</span> estimate</span>
                <p style={{ fontSize: 'clamp(1.1rem,1.5vw,1.4rem)', lineHeight: 1.32, fontWeight: HEAD_W, color: '#EFE9DC', margin: 0 }}>
                  {/* #E4695E, not #C8362B: the deep red measured 3.26 to 3.59
                    * against this card's gradient, which clears AA for large
                    * text but only just, on the one number the whole band
                    * exists to show. This is the lighter red already used on
                    * the hero pull card, and it lands near 6. */}
                  The growth is already in <span style={{ color: '#D4C896' }}>your userbase</span>, about <span style={{ color: '#E4695E', whiteSpace: 'nowrap' }}>$560K a year</span> for a $5M&nbsp;brand.
                </p>
                <p style={{ fontSize: '.9rem', lineHeight: 1.55, color: 'rgba(239,233,220,.66)', margin: 0 }}>
                  On conservative benchmarks: revenue from fans who buy again, plus the ad spend you save when they bring others in. An example, not your numbers.
                </p>
              </div>
              <Link to="/fan-value" className="flg-btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, background: '#C8362B', color: '#FCFAF3', fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none', flex: 'none' }}>
                See what your fans are worth</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. SO WHAT DO YOU DO ABOUT IT ─── */}
      {/* The beat the page was missing: it won the argument and then went
        * quiet. Also the hand-off that gives each page one job — this page is
        * the idea, /fan-engine is the method. Copy-only, no cards, so it
        * doubles as the break between the two card grids. */}
      {/* `color` is set on the section, not just inherited: the page root is
        * now ink-on-cream, so every dark band has to re-declare its text
        * colour or it inherits #15110F onto #15110F and vanishes. */}
      {/* On SECTION_PAD since 22 Jul 2026. This band used to run a bespoke
        * clamp that resolved to 83px against the site's 96px, so it sat 13px
        * tighter than the bands either side of it for no reason a reader
        * could name. The evidence strip above is still deliberately tighter:
        * that one is a slim proof band and the padding is what makes it read
        * as one. */}
      <section style={{ background: '#15110F', color: '#EFE9DC' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ maxWidth: '60ch' }}>
            <Eyebrow>What to do about it</Eyebrow>
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.06, letterSpacing: '-.028em', margin: 'clamp(14px,1.8vw,20px) 0 0', color: '#EFE9DC' }}>
              Knowing fans matter is the <mark>easy part</mark>.
            </h2>
            {/* The "paid is a discipline" framing arrived here on 22 Jul 2026
              * from the /about manifesto band, which was cut because it made
              * this same argument on a page whose job is Laura, not the
              * argument. This is the one line of it sharper than what was
              * already here: it names what fandom is being measured against,
              * which is what makes "nobody owns it" land as a gap rather than
              * an excuse. */}
            <p style={{ fontSize: T.lede, lineHeight: 1.66, color: 'rgba(239,233,220,.82)', margin: 'clamp(18px,2.2vw,24px) 0 0' }}>
              Paid acquisition is a discipline: it got the budgets, the teams, the dashboards. Fandom is not one yet. Keeping the customers you have, and turning them into the ones who bring you new customers, got none of&nbsp;that.
            </p>
            <p style={{ fontSize: T.lede, lineHeight: 1.66, color: 'rgba(239,233,220,.82)', margin: 'clamp(18px,2.2vw,24px) 0 0' }}>
              So it looks optional. It is not. It just never had an owner: brand, product, community and growth each hold a piece, and nobody holds the whole. So it stays a feeling nobody can put a number&nbsp;on.
            </p>
            <p style={{ fontSize: T.lede, lineHeight: 1.66, color: '#EFE9DC', fontWeight: 600, margin: 'clamp(18px,2vw,24px) 0 0' }}>
              That is the part I build. The <mark>Fan Engine<span className="tm">&trade;</span></mark> runs all four as one system, and ties each part to a number you can take to a&nbsp;board.
            </p>
            <div style={{ marginTop: 'clamp(24px,2.8vw,32px)' }}>
              <Link to="/fan-engine" className="flg-btnsoft" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, textDecoration: 'none' }}>
                {/* Label in ONE span. This Link is inline-flex with
                  * gap: 10, so unwrapped the text before the mark, the
                  * .tm span and the text after it are three flex items,
                  * and the gap opens 10.5px either side of a 7.3px mark.
                  * Laura: "too far away". One wrapper = one flex item. */}
                <span>See how the Fan Engine<span className="tm">™</span> works</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. WHO IT'S FOR ─── */}
      <section className="on-light" style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ maxWidth: '66ch' }}>
            <Eyebrow tone="deep">Who it&rsquo;s for</Eyebrow>
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.06, letterSpacing: '-.028em', margin: 'clamp(14px,1.8vw,20px) 0 0', color: '#15110F' }}>
              However you got here, <mark>fans are the next step</mark>.
            </h2>
            <p style={{ fontSize: T.lede, lineHeight: 1.62, color: '#4A423B', margin: 'clamp(18px,2.2vw,24px) 0 0', textWrap: 'balance' }}>
              I work with companies that have a disruptive brand, a vocal userbase and growth that runs on network effects. If product-led growth got you here, fan-led growth is what comes next: the product sold itself, now your fans sell it&nbsp;too.
            </p>
          </div>

          <div className="flg-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'clamp(14px,1.8vw,20px)', marginTop: 'clamp(34px,4.4vw,56px)', ...GRID_CAP_LEFT }}>
            {situations.map((s, i) => (
              <div key={s.title} data-rev style={{ display: 'flex', flexDirection: 'column', gap: 10, background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderTop: '2px solid #C8362B', borderRadius: 4, padding: 'clamp(22px,2.6vw,34px)', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#8E2520', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name={s.icon} size={22} /></span>
                </div>
                <h3 style={{ fontWeight: HEAD_W, fontSize: T.h3, letterSpacing: '-.02em', margin: 0, color: '#15110F' }}>{s.title}</h3>
                <p style={{ fontSize: T.body, lineHeight: 1.58, color: '#4A423B', margin: 0 }}>{s.copy}</p>
              </div>
            ))}
          </div>

          {/* Added 22 Jul 2026. This was the only band on the page with no way
            * out: the reader recognises themselves in one of the four cards
            * and then hits the close with nothing offered in between, which
            * broke the six-beat "each band hands to a different page" design
            * this page was built on. A text link, not a button, so it doesn't
            * pull against the close's primary CTA two screens later. */}
          <p data-rev style={{ fontSize: '.95rem', fontWeight: 600, color: '#5E564E', margin: 'clamp(24px,3vw,34px) 0 0' }}>
            If that sounds like you, <Link to="/services" className="flg-inline flg-inline--ink">see how we&rsquo;d work together&nbsp;&rarr;</Link>
          </p>
        </div>
      </section>

      {/* ─── 6. WHERE TO START ─── */}
      {/* The page used to end on an inline sentence and two buttons, then the
        * footer. Every other page closes with a band. Three tiers, the order
        * settled on the homepage close: the number first, the offer second,
        * the low-commitment diagnostic as a quiet third. */}
      {/* OXBLOOD since 22 Jul 2026, was #0E0B09.
        *
        * The dark close was justified as "the one full inversion", a light page
        * earning its ending by going dark. The premise was wrong: the page
        * already goes dark two sections earlier for "What to do about it"
        * (#15110F), and #0E0B09 is 11 RGB units from it. To the eye the close
        * was repeating a ground the reader had just seen, at the one moment it
        * most needs to feel like an ending.
        *
        * Every other editorial page on the site closes on #A12A1E, so the red
        * band is also the site-wide signal for "this is the ask". Band order is
        * now cream, off-white, cream, near-black, cream, oxblood: a genuinely
        * new ground at the end.
        *
        * Colours follow the homepage close, which is the same ground: #F2D79A
        * gold and #FBF4E6 cream. The on-espresso pair (#D4C896 / #EFE9DC) goes
        * muddy on oxblood. */}
      <section className="flg-close--ox" style={{ background: '#A12A1E', color: '#FBF4E6' }}>
        <div style={{ ...INNER, padding: 'clamp(72px,9vw,110px) clamp(20px,5vw,64px)', textAlign: 'center' }}>
          {/* Width in px, not ch: `ch` resolves against THIS div's inherited
            * 16px font, not the 60px heading inside it, so a 30ch cap came out
            * at ~240px and broke the headline over four lines. */}
          <div data-rev style={{ maxWidth: 620, margin: '0 auto' }}>
            <Eyebrow tone="ox">Where to start</Eyebrow>
            <hr style={{ width: 46, height: 3, background: '#F2D79A', border: 'none', margin: '16px auto 22px' }} />
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2close, lineHeight: 1.04, letterSpacing: '-.03em', margin: 0, color: '#FBF4E6' }}>
              Stop <mark>renting</mark> your growth.
            </h2>
          </div>
          <p data-rev style={{ fontSize: T.lede, lineHeight: 1.6, color: 'rgba(251,244,230,.86)', margin: 'clamp(18px,2.2vw,24px) auto 0', maxWidth: '46ch' }}>
              {/* Was "the next step is a number, not a meeting." Laura: odd,
                * and we should not tell people a meeting isn't needed. Right,
                * and it was worse than odd — it dismissed a meeting directly
                * above a button reading "See how we'd work together", which
                * leads to exactly that. The line argued against its own second
                * CTA.
                *
                * The rewrite introduces both routes instead of ruling one out,
                * and maps onto the two buttons in order: the number is
                * /fan-value, "me" is /services. */}
              If any of that sounded like your company, start with the number, or start with&nbsp;me.
          </p>
          {/* Primary is the ink button, not the red one: red on oxblood is
            * near-invisible, which the homepage close hit and solved the same
            * way (see the .btnsend note in HomePage.css). */}
          <div data-rev className="flg-close__ctas" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '14px 16px', marginTop: 'clamp(26px,3.2vw,36px)' }}>
            <Link to="/fan-value" className="flg-btnink" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, textDecoration: 'none' }}>
              See what your fans are worth</Link>
            <Link to="/services" className="flg-btnsoft flg-btnsoft--ox" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, textDecoration: 'none' }}>
              See how we&rsquo;d work together</Link>
          </div>
          {/* "Or tell me about your brand" was cut on 22 Jul 2026. The close
            * offered four exits, and the fourth was a meeting one line under
            * the old "the next step is a number, not a meeting" line. Contact is in the nav
            * as "Get in touch" on every screen, and the second button here
            * goes to /services, which opens with two ways to talk. */}
          <p data-rev style={{ fontSize: '.92rem', fontWeight: 600, color: 'rgba(251,244,230,.82)', margin: 'clamp(18px,2.2vw,26px) 0 0' }}>
            Not ready for either? <Link to="/fan-score" className="flg-inline flg-inline--ox">Take the 2-minute Fan Score<span className="tm">™</span>&nbsp;&rarr;</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
