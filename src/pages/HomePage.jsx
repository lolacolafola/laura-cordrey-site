import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import './HomePage.css'

const CONTACT_URL = '/contact?intent=consulting'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const BASE = import.meta.env.BASE_URL

// Best wins stat bar — four ironclad numbers across revenue, reach, growth and sentiment.
// Ubisoft is program-wide 60M+ reach (labelled "across programs"). Cards route to
// /case-studies. BlaBlaCar's story is told in the carousel, not as a headline number.
const stats = [
  { value: '$32K', unit: 'in under three hours', label: 'a $129 fan drop that sold out instantly', client: 'US Mobile', img: 'case-studies/homepage/hp-kpi-us-mobile-sim.png', alt: 'US Mobile Dark Star drop' },
  { value: '60M+', unit: 'reach', label: 'across Ubisoft programs, at $0 media spend', client: 'Ubisoft', img: 'case-studies/homepage/hp-kpi-ubi.jpg', alt: 'Ubisoft creator programs' },
  { value: '+80%', unit: 'MAU', label: 'from streamer-led product launches', client: 'Azarus', img: 'case-studies/homepage/hp-kpi-azarus.jpg', alt: 'Azarus game ad platform' },
  { value: '85%', unit: 'positive sentiment', label: 'held across a 15M-player live-service community', client: 'Ghost Recon', img: 'case-studies/homepage/hp-kpi-ghost-recon.jpg', alt: 'Ghost Recon community' },
]

const whyFans = [
  { title: 'They invest more',       copy: 'Fans stay longer and spend more, so you keep and grow what you paid to win.', icon: 'lock' },
  { title: 'They spread the word',      copy: 'Fans make the content that markets you, at no media cost.', icon: 'megaphone' },
  { title: 'They recommend you',    copy: 'Fans bring their friends in, so growth leans less on ad spend.', icon: 'users' },
  { title: 'They defend you',        copy: 'Fans stay through a rough week, and defend you in public.', icon: 'shield' },
  { title: 'AI recommends you too', copy: 'When people ask AI what to pick, it answers from what your fans post. The more they love you, the more it points to you.', icon: 'sparkle' },
  { title: 'It compounds',      copy: 'Built once, the engine keeps working and starts to fuel itself.', icon: 'loop' },
]

const situations = [
  { title: 'You’re burning cash on growth', copy: 'Every new customer costs more than the last, and you need growth that doesn’t stop the moment you stop paying.' },
  { title: 'You’ve hit product-market fit', copy: 'The product works. Now you’re ready for the extra growth fans bring on top.' },
  { title: 'You’re getting hammered online', copy: 'Sentiment has turned, and you need someone who knows product and community to turn it back.' },
  { title: 'You’re building from day one', copy: 'You already know fans are the moat, and you want the engine in from the start.' },
]

// Small inline-svg helpers — stroke-based, matching the design.
const Icon = ({ name, size = 28 }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  switch (name) {
    case 'rocket':
      return (<svg {...common} strokeWidth={1.6}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>)
    case 'lock':
      return (<svg {...common}><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>)
    case 'megaphone':
      return (<svg {...common}><path d="M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M16 8.5a4 4 0 0 1 0 7"/></svg>)
    case 'users':
      return (<svg {...common}><circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M18 7v6M21 10h-6"/></svg>)
    case 'shield':
      return (<svg {...common}><path d="M12 3l7 3v5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/></svg>)
    case 'sparkle':
      return (<svg {...common}><path d="M12 2.5l2.1 6.1 6.4.1-5.1 3.9 1.9 6.1-5.2-3.7-5.2 3.7 1.9-6.1-5.1-3.9 6.4-.1z"/></svg>)
    case 'loop':
      return (<svg {...common}><path d="M17 5a7 7 0 0 1 0 14H8"/><path d="M11 22l-3-3 3-3"/><path d="M7 19A7 7 0 0 1 7 5h9"/><path d="M13 2l3 3-3 3"/></svg>)
    case 'pulse':
      return (<svg {...common} strokeWidth={1.6}><path d="M2 12h4l2.5-7 4 14L15 12h7"/></svg>)
    case 'spark':
      return (<svg {...common} strokeWidth={1.6}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></svg>)
    case 'gear':
      return (<svg {...common}><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>)
    case 'image':
      return (<svg {...common} strokeWidth={1.2}><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M21 16l-5-5L6 20"/></svg>)
    default:
      return null
  }
}

const SECTION_PAD = 'clamp(72px, 9vw, 128px) clamp(20px, 5vw, 64px)'
const INNER = { maxWidth: 1280, margin: '0 auto', width: '100%' }

export default function HomePage() {
  useDocumentMeta({
    title: 'Laura Cordrey · Fan-led growth for fan-driven brands',
    description:
      'Laura Cordrey builds the fan-led growth engine that turns customers into fans who stay, pay, and bring more. Thirteen years across Ubisoft, BlaBlaCar, US Mobile, Azarus.',
    canonical: pageUrl(''),
    ogType: 'website',
    jsonLd: authorJsonLd(),
  })

  // Scroll-reveal: any [data-rev] element below the fold starts hidden and reveals once it scrolls in.
  const rootRef = useRef(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const h0 = window.innerHeight || 800
    const els = root.querySelectorAll('[data-rev]')
    els.forEach((el) => {
      if (el.getBoundingClientRect().top >= h0 * 0.9) el.classList.add('cin-hide')
    })
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove('cin-hide')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={rootRef}
      className="cin"
      style={{
        background: '#15110F',
        color: '#EFE9DC',
        fontFamily: 'Manrope, system-ui, sans-serif',
        fontWeight: 500,
        lineHeight: 1.55,
      }}
    >
      {/* ─── HERO ─── */}
      <section id="top" style={{ position: 'relative', minHeight: '100vh', width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#0E0B09' }}>
        <div className="heroglow" style={{ position: 'absolute', top: '-20%', right: '-10%', width: '70vw', height: '70vw', maxWidth: 900, maxHeight: 900, background: 'radial-gradient(circle,rgba(200,54,43,.16) 0%,rgba(200,54,43,0) 62%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-25%', left: '-12%', width: '55vw', height: '55vw', maxWidth: 700, maxHeight: 700, background: 'radial-gradient(circle,rgba(212,200,150,.08) 0%,rgba(212,200,150,0) 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', padding: 'clamp(112px,14vh,160px) clamp(20px,5vw,64px) clamp(44px,5vw,68px)', ...INNER }}>
          <span style={{ display: 'block', fontSize: '.78rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700, marginBottom: 'clamp(20px,3vw,30px)' }}>Fan-led growth for fan-driven brands</span>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2.9rem,8vw,7.4rem)', lineHeight: 0.92, letterSpacing: '-.04em', margin: 0, maxWidth: '15ch' }}>
            Fans who <mark>stay</mark>, <mark>pay</mark>, and <mark>bring more</mark>.
          </h1>
          <p style={{ fontSize: 'clamp(1.12rem,1.7vw,1.5rem)', lineHeight: 1.5, color: 'rgba(239,233,220,.82)', maxWidth: '50ch', margin: 'clamp(24px,3.4vw,38px) 0 0' }}>
            The customers you already paid for are worth far more than you&rsquo;re getting. I build the brand love and advocacy that turns them into fans, so they stay, spend more, and bring new customers with them.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,1.6vw,18px)', marginTop: 'clamp(30px,3.6vw,44px)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 26px' }}>
              <Link to={CONTACT_URL} className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none', transition: 'background .2s ease,color .2s ease,border-color .2s ease' }}>
                Let’s talk <span className="ar" aria-hidden>→</span>
              </Link>
              <a href="#what-it-is" className="btnsoft" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, textDecoration: 'none' }}>
                See how it works <span className="ar" aria-hidden>→</span>
              </a>
            </div>
            <span style={{ fontSize: '.86rem', color: '#8A8078', fontWeight: 600 }}>Every message comes straight to me, and I reply within one working day.</span>
          </div>

          {/* Edit 5: hero proof strip — hairline top only (no bottom rule so
            * the hero reads as one continuous moment), gold kicker centered,
            * real PNGs at ~60px so they're legible. Bigger than the old 44px
            * row but keeps the logos as a footer under the promise, not a
            * separate "client roster" chapter. */}
          <div className="hero-trust logoband" style={{ marginTop: 'clamp(44px,5vw,68px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(20px,2.6vw,30px)', textAlign: 'center', borderTop: '1px solid rgba(239,233,220,.14)', paddingTop: 'clamp(28px,4vw,44px)' }}>
            <span style={{ fontSize: '.78rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>
              Thirteen years building fan-led growth across video games &amp; tech
            </span>
            <ul className="herologos logoshelf" style={{ listStyle: 'none', margin: 0, padding: 0, width: '100%', maxWidth: 1000, display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', alignItems: 'end', justifyItems: 'center', gap: 'clamp(20px,4vw,60px)' }}>
              {[
                { src: 'logos/ubisoft-stacked-white.png', alt: 'Ubisoft', maxw: 130 },
                { src: 'logos/amazon-game-studios.png',   alt: 'Amazon Game Studios', maxw: 120 },
                { src: 'logos/blablacar-vert.png',        alt: 'BlaBlaCar', maxw: 130 },
                { src: 'logos/us-mobile-mark.png',        alt: 'US Mobile', maxw: 130 },
                { src: 'logos/azarus-vert.png',           alt: 'Azarus / Animoca', maxw: 130 },
              ].map((l) => (
                <li key={l.alt} className="lgocell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <img src={BASE + l.src} alt={l.alt} style={{ maxHeight: 60, maxWidth: l.maxw, width: 'auto', objectFit: 'contain' }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── WHAT IT IS ─── */}
      <section id="what-it-is" style={{ background: '#15110F', color: '#EFE9DC', borderTop: '1px solid rgba(239,233,220,.1)' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
            <div data-rev>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(16px,2.2vw,24px)' }}>
                <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name="rocket" size={22} /></span>
                <span style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>What it is</span>
              </div>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.1rem,4.8vw,3.9rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0 }}>
                Fans are <mark>the growth you already own</mark>.
              </h2>
            </div>
            <div data-rev style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3vw,32px)' }}>
              <p style={{ fontSize: 'clamp(1.08rem,1.45vw,1.34rem)', lineHeight: 1.66, color: 'rgba(239,233,220,.82)', margin: 0 }}>
                <strong style={{ color: '#EFE9DC', fontWeight: 800 }}>You&rsquo;ve been renting your growth.</strong> You pay for every customer, and the day you stop, it stops. Fans work the other way: build them once, and they keep growing you long after the spend ends. <mark>Growth you own, not rent.</mark>
              </p>
              <p style={{ fontSize: 'clamp(1.08rem,1.45vw,1.34rem)', lineHeight: 1.66, color: '#EFE9DC', fontWeight: 600, margin: 0 }}>
                When people love what you do, they stay, they spend more, and they bring others with them. Nothing sells harder than a fan telling a friend, because people trust people, not marketing. But no single team makes a fan: it takes your brand, your product, and your community pulling the same way. Get that right, and customers become fans. That&rsquo;s <mark>fan-led growth</mark>, and I build it into <Link to="/methodology" style={{ color: '#D4C896', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(212,200,150,.45)' }}>an engine you own</Link>, then show you what it&rsquo;s worth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY FANS ─── */}
      <section style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev>
            <span style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700, marginBottom: 'clamp(18px,2.4vw,26px)' }}>Why fans</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.2rem,5.2vw,4.4rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0, maxWidth: '22ch', color: '#15110F' }}>
              You don’t buy fans. You <mark>earn</mark> them.
            </h2>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.6, color: '#4A423B', margin: '18px 0 0', maxWidth: '50ch' }}>
              People become fans when they feel they belong. Give them a reason to belong, a space to connect, a voice, and the feeling of being seen and special. Ad spend can’t buy that. Earn it, and here is what your fans start doing for you.
            </p>
          </div>

          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(16px,2vw,24px)', marginTop: 'clamp(40px,5vw,68px)' }}>
            {whyFans.map((p) => (
              <div key={p.title} className="pot" data-rev style={{ display: 'flex', flexDirection: 'column', gap: 14, background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderRadius: 3, padding: 'clamp(24px,2.8vw,38px)', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
                <span className="pico" style={{ color: '#C8362B', lineHeight: 0, transition: 'color .2s ease' }}><Icon name={p.icon} size={28} /></span>
                <h3 style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.8rem)', letterSpacing: '-.02em', margin: 0, color: '#15110F' }}>{p.title}</h3>
                <p style={{ fontSize: 'clamp(.98rem,1.2vw,1.12rem)', lineHeight: 1.6, color: '#4A423B', margin: 0 }}>{p.copy}</p>
              </div>
            ))}
          </div>

          {/* Edit 6 (treatment 2a): dark espresso CTA card. The estimate
            * demotes from a cream-card readout that competed with the six
            * benefit tiles into a distinct secondary tier — dark ground
            * previews the AI section below, keeping one accent per section.
            * The number moves inline in a body-scale sentence, not a
            * standalone display number. */}
          <div data-rev style={{ position: 'relative', overflow: 'hidden', marginTop: 'clamp(28px,3.4vw,44px)', background: 'linear-gradient(155deg,#241a16,#15110F)', border: '1px solid rgba(200,54,43,.4)', borderRadius: 3, padding: 'clamp(28px,3.4vw,44px)' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '-40%', right: '-6%', width: '40vw', height: '40vw', maxWidth: 420, maxHeight: 420, background: 'radial-gradient(circle,rgba(200,54,43,.16) 0%,rgba(200,54,43,0) 64%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(24px,3vw,48px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: '46ch' }}>
                <span style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>
                  Fan Value estimate
                </span>
                <p style={{ fontSize: 'clamp(1.12rem,1.6vw,1.5rem)', lineHeight: 1.3, fontWeight: 700, color: '#EFE9DC', margin: 0 }}>
                  The growth is already in <span style={{ color: '#D4C896' }}>your userbase</span>, about <span style={{ color: '#C8362B', fontWeight: 800, whiteSpace: 'nowrap' }}>$560K a year</span> for a $5M brand.
                </p>
                <p style={{ fontSize: '.92rem', lineHeight: 1.55, color: 'rgba(239,233,220,.66)', margin: 0 }}>
                  On conservative benchmarks: revenue from fans who buy again, plus the ad spend you save when they bring others. An example, not your numbers.
                </p>
              </div>
              <div className="fv-cta-col" style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', flex: 'none' }}>
                <Link to="/fan-value" className="btnp fv-cta-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.04rem', padding: '16px 30px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
                  See what your fans are worth <span className="ar" aria-hidden>→</span>
                </Link>
                <span style={{ fontSize: '.9rem', color: 'rgba(239,233,220,.7)', fontWeight: 600 }}>
                  or <Link to={CONTACT_URL} style={{ color: '#D4C896', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(212,200,150,.45)' }}>let’s talk</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY YOU'RE HERE ─── */}
      <section id="why-youre-here" style={{ background: '#15110F', borderTop: '1px solid rgba(239,233,220,.12)' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ maxWidth: '60ch' }}>
            <span style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700, marginBottom: 'clamp(18px,2.4vw,26px)' }}>Why you’re here</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.1rem,5vw,4rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0 }}>
              However you got here, <mark>fans are the next step</mark>.
            </h2>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.62, color: 'rgba(239,233,220,.82)', margin: 'clamp(18px,2.4vw,26px) 0 0' }}>
              I work with companies that have a disruptive brand, a vocal userbase, and growth that runs on network effects. If product-led growth got you here, fan-led growth is the next logical step: the product sold itself, now your fans sell it too. The two are a perfect marriage, and fan-led is the half still on the table.
            </p>
          </div>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(14px,1.8vw,22px)', marginTop: 'clamp(40px,5vw,64px)' }}>
            {situations.map((s, i) => (
              <div key={s.title} data-rev style={{ display: 'flex', flexDirection: 'column', gap: 10, background: '#1F1A17', border: '1px solid rgba(239,233,220,.12)', borderTop: '2px solid rgba(200,54,43,.55)', borderRadius: 4, padding: 'clamp(24px,2.8vw,36px)' }}>
                <span style={{ fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                <h3 style={{ fontWeight: 800, fontSize: 'clamp(1.25rem,2vw,1.6rem)', letterSpacing: '-.02em', margin: 0, color: '#EFE9DC' }}>{s.title}</h3>
                <p style={{ fontSize: 'clamp(.98rem,1.2vw,1.12rem)', lineHeight: 1.58, color: 'rgba(239,233,220,.72)', margin: 0 }}>{s.copy}</p>
              </div>
            ))}
          </div>
          <div data-rev style={{ marginTop: 'clamp(30px,3.6vw,48px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 22px' }}>
            <span style={{ fontSize: 'clamp(1.08rem,1.5vw,1.3rem)', fontWeight: 700, color: '#EFE9DC' }}>Sound like you? That’s exactly what I build.</span>
            <Link to={CONTACT_URL} className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.04rem', padding: '16px 30px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>Let’s talk <span className="ar" aria-hidden>→</span></Link>
            <Link to="/services" className="btnsoft" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.02rem', padding: '16px 30px', borderRadius: 3, textDecoration: 'none' }}>See how we&rsquo;d work together <span className="ar" aria-hidden>→</span></Link>
          </div>
        </div>
      </section>

      {/* ─── WHY ME ─── */}
      <section id="about" style={{ background: '#0E0B09', borderTop: '1px solid rgba(239,233,220,.12)' }}>
        <div className="grid-2" style={{ ...INNER, padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) clamp(40px,5vw,64px)', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)', gap: 'clamp(36px,7vw,100px)', alignItems: 'center' }}>
          <div data-rev style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>About me</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.3rem,5.2vw,4.4rem)', lineHeight: 0.98, letterSpacing: '-.03em', margin: 0 }}>
              I’ve seen the whole picture. <mark>This is the part I chose to build</mark>.
            </h2>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.62, color: 'rgba(239,233,220,.84)', margin: 0, maxWidth: '50ch' }}>
              Thirteen years across brand, growth and community at Ubisoft, Amazon Games and BlaBlaCar, then VP Marketing of a US startup acquired by Animoca. Complicated tech, crowded roadmaps, budgets from shoestring to enormous. I’ve worked the whole machine.
            </p>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.62, color: '#EFE9DC', fontWeight: 600, margin: 'clamp(14px,1.6vw,20px) 0 0', maxWidth: '50ch' }}>
              Which is how I know where growth really comes from, and where it leaks. The biggest opportunity most companies walk straight past is the customers they already have. So that is what I build: the system that makes them stay, spend and recommend, with brand, product, community and growth run as one <mark>Fan Engine<span className="tm">™</span></mark>, and the baselines to prove it.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 24px', marginTop: 8 }}>
              <Link to="/about" className="btnsoft" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.02rem', padding: '16px 30px', borderRadius: 3, textDecoration: 'none' }}>
                More about me <span className="ar" aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <figure data-rev style={{ margin: 0 }}>
            <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 3, overflow: 'hidden', background: '#15110F', border: '1px solid rgba(239,233,220,.12)' }}>
              <img src={BASE + 'portraits/laura-e3.jpg'} alt="Laura Cordrey speaking on stage at E3" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%', display: 'block' }} />
              <span style={{ position: 'absolute', left: 0, bottom: 0, right: 0, padding: '18px 20px', background: 'linear-gradient(transparent,rgba(14,11,9,.85))', fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 600 }}>On stage · E3</span>
            </div>
          </figure>
        </div>

        <div data-rev style={{ ...INNER, padding: '0 clamp(20px,5vw,64px) clamp(40px,5vw,64px)' }}>
          {/* Espresso-card testimonial per the 7 Jul quote-card handoff.
            * Replaces the earlier gold-ground / red-top-bar treatment that
            * fought the brand system. Dark #1F1A17 surface with a gold rule,
            * a soft red halo top-right, gold quote glyph, red mark on the
            * flagship phrase. */}
          <figure className="quotecard" style={{ position: 'relative', overflow: 'hidden', margin: '0 auto', maxWidth: 620, background: '#1F1A17', border: '1px solid rgba(239,233,220,.12)', borderTop: '2px solid rgba(212,200,150,.5)', borderRadius: 4, padding: '52px 48px 44px' }}>
            <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 88% -10%, rgba(200,54,43,.16), transparent 60%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="#D4C896" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M17 7c-6 2.4-10 8-10 15v11h13V22h-6.6c.2-4 2.6-7 6.6-8.6L17 7zm18 0c-6 2.4-10 8-10 15v11h13V22h-6.6c.2-4 2.6-7 6.6-8.6L35 7z" />
                </svg>
                <blockquote style={{ margin: 0, padding: 0 }}>
                  <p style={{ fontWeight: 600, fontSize: 20, lineHeight: 1.4, letterSpacing: '-.01em', color: 'rgba(239,233,220,.86)', margin: 0, textWrap: 'pretty' }}>
                    Laura is a <mark style={{ background: 'transparent', color: '#E0574B', fontWeight: 700 }}>start-up swiss knife</mark> &hellip; with some extra fun!
                  </p>
                </blockquote>
              </div>
              <figcaption style={{ marginTop: 30, paddingTop: 24, borderTop: '1px solid rgba(239,233,220,.12)', display: 'flex', alignItems: 'center', gap: 18 }}>
                <img src={BASE + 'portraits/nicolas-brusson.png'} alt="Nicolas Brusson" loading="lazy" style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', flex: 'none', boxShadow: '0 0 0 1px rgba(212,200,150,.4)' }} />
                <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-.015em', color: '#EFE9DC', lineHeight: 1.1 }}>Nicolas Brusson</span>
                  <span style={{ fontSize: 16, fontWeight: 600, color: 'rgba(239,233,220,.78)', lineHeight: 1.3 }}>Co-founder &amp; CEO, BlaBlaCar</span>
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* ─── PROOF ─── */}
      <section style={{ background: '#2D2723', color: '#EFE9DC', borderTop: '1px solid rgba(239,233,220,.1)' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ marginBottom: 'clamp(32px,4vw,52px)', maxWidth: '40ch' }}>
            <span style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700, marginBottom: 14 }}>Best wins</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.9rem,4.4vw,3.4rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0, color: '#EFE9DC' }}>Proof it pays.</h2>
          </div>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'clamp(14px,1.6vw,22px)' }}>
            {stats.map((s) => (
              <Link to="/case-studies" key={s.client} className="statc" data-rev style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderRadius: 4, overflow: 'hidden', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
                <figure style={{ margin: 0, aspectRatio: '16 / 10', overflow: 'hidden', background: '#15110F' }}>
                  <img src={BASE + s.img} alt={s.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </figure>
                <div style={{ padding: 'clamp(18px,1.8vw,26px)', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.6rem,2.5vw,2.4rem)', lineHeight: 1.04, letterSpacing: '-.03em', color: '#C8362B', display: 'block' }}>
                    {s.value} <span style={{ fontSize: '1em', fontWeight: 800, color: '#C8362B', letterSpacing: '-.03em', whiteSpace: 'nowrap' }}>{s.unit}</span>
                  </span>
                  <span style={{ fontSize: '.92rem', color: '#4A423B', fontWeight: 600, lineHeight: 1.42 }}>{s.label}</span>
                  <span style={{ fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: '#9A8E7C', fontWeight: 700, marginTop: 4 }}>{s.client}</span>
                </div>
              </Link>
            ))}
          </div>
          <div data-rev style={{ marginTop: 'clamp(32px,4.5vw,56px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
            <Link to="/case-studies" className="tlink" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#C8362B', fontWeight: 700, fontSize: '.9rem', letterSpacing: '.04em', textDecoration: 'none', borderBottom: '1px solid rgba(200,54,43,.32)', paddingBottom: 3 }}>
              See my deep-dive case studies <span aria-hidden>→</span>
            </Link>
            <span style={{ fontSize: '.78rem', color: 'rgba(239,233,220,.62)', fontWeight: 600 }}>
              These numbers roll up several projects per brand, the full write-ups live on the Case Studies page.
            </span>
          </div>
        </div>
      </section>

      {/* ─── WAYS TO WORK ─── */}
      <section id="services" style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ maxWidth: '46ch', marginBottom: 'clamp(40px,5vw,64px)' }}>
            <span style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700, marginBottom: 'clamp(18px,2.4vw,26px)' }}>Services</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.2rem,5.2vw,4.4rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0, color: '#15110F' }}>Ways to work with me.</h2>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.6, color: '#4A423B', margin: '18px 0 0' }}>
              Whatever brought you here, there are two ways in: build the whole engine that keeps and grows your fans, or fix one thing now.
            </p>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(16px,2vw,24px)' }}>
            <Link to="/services#fan-engine" className="wtwd" data-rev style={{ textDecoration: 'none', color: 'inherit', background: 'linear-gradient(155deg,#241a16,#15110F)', border: '1px solid rgba(200,54,43,.4)', borderRadius: 3, padding: 'clamp(28px,3.2vw,46px)', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,2.6vw,30px)' }}>
              <span style={{ fontSize: '.74rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>Build the whole engine</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name="gear" size={30} /></span>
                <span style={{ fontWeight: 800, fontSize: 'clamp(1.7rem,2.8vw,2.5rem)', letterSpacing: '-.02em', lineHeight: 1, color: '#EFE9DC' }}>The Fan Engine<span className="tm">™</span></span>
                <span style={{ fontSize: '1.04rem', lineHeight: 1.6, color: 'rgba(239,233,220,.82)' }}>
                  My own framework, shaped over thirteen years turning customers into fans. The whole system, plugged into your company. It connects the brand they fall for, the product they stick with, and the way you grow into one engine, measured end to end. Whether you’re starting from zero or growing the fanbase you already have.
                </span>
              </div>
              <ul style={{ listStyle: 'none', margin: 'auto 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Brand', 'Product', 'Community', 'Growth'].map((p) => (
                  <li key={p} style={{ fontSize: '.76rem', letterSpacing: '.04em', fontWeight: 600, color: '#D4C896', border: '1px solid rgba(212,200,150,.32)', borderRadius: 999, padding: '7px 14px' }}>{p}</li>
                ))}
              </ul>
            </Link>

            <Link to="/services" className="wtw" data-rev style={{ textDecoration: 'none', color: 'inherit', background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderRadius: 3, padding: 'clamp(28px,3.2vw,46px)', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,2.6vw,30px)', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
              <span style={{ fontSize: '.74rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>Fix one thing now</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 22, borderBottom: '1px solid rgba(21,17,15,.1)' }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="pulse" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Sentiment SOS</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>Your community is turning on you. I find what’s really driving it and hand you a fix you can ship, across product, comms and community, fast.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 22, borderBottom: '1px solid rgba(21,17,15,.1)' }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="megaphone" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Fan Programs</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>You pay for every new customer, and your users could be bringing them in instead. One program, creator, advocacy, loyalty or referral, built and measured.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 22, borderBottom: '1px solid rgba(21,17,15,.1)' }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="spark" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Fan Moments</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>You’ve got a big moment coming: a launch, a release, a milestone. I turn it into one your fans carry for you, built for reach and sales, not just spend.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="users" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Advisory</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>Senior fan-led growth leadership, without the full-time hire. Drop in for a strategy session, stay on as a retainer, or run it as an embedded fractional lead. As much or as little as you need.</span>
                </div>
              </div>
            </Link>
          </div>

          <div data-rev style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 24px', marginTop: 'clamp(32px,4vw,48px)' }}>
            <Link to={CONTACT_URL} className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.06rem', padding: '17px 32px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
              Let’s talk <span className="ar" aria-hidden>→</span>
            </Link>
            <Link to="/services" className="btnsoftd" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.02rem', padding: '17px 32px', borderRadius: 3, textDecoration: 'none' }}>
              See all the ways to work with me <span className="ar" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CLOSE ─── */}
      <section style={{ background: '#A12A1E', color: '#FBF4E6' }}>
        <div data-rev style={{ ...INNER, padding: 'clamp(88px,11vw,150px) clamp(20px,5vw,64px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(24px,3.5vw,40px)' }}>
          <span style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#F2D79A', fontWeight: 700 }}>Let’s work together</span>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.8rem,9vw,7rem)', lineHeight: 0.9, letterSpacing: '-.04em', margin: 0, maxWidth: '13ch', color: '#FBF4E6' }}>
            What’s your <span style={{ color: '#F2D79A' }}>fanbase</span> worth?
          </h2>
          <p style={{ fontSize: 'clamp(1.15rem,1.8vw,1.5rem)', lineHeight: 1.5, color: 'rgba(251,244,230,.86)', maxWidth: '42ch', margin: 0 }}>
            See what your fans are worth on your own numbers, or tell me what&rsquo;s going on and I&rsquo;ll be in touch.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 6 }}>
            <Link to="/fan-value" className="btncream" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#FBF4E6', color: '#15110F', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid #FBF4E6', textDecoration: 'none' }}>
              See what your fans are worth <span className="ar" aria-hidden>→</span>
            </Link>
            <Link to={CONTACT_URL} className="btncreamo" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(251,244,230,.16)', color: '#FBF4E6', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid rgba(251,244,230,.4)', textDecoration: 'none' }}>
              Let’s talk <span className="ar" aria-hidden>→</span>
            </Link>
          </div>
          <span style={{ fontSize: '.95rem', color: 'rgba(251,244,230,.7)', fontWeight: 600, marginTop: 2 }}>
            Or take the <Link to="/fan-score" style={{ color: '#F2D79A', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(242,215,154,.45)' }}>2-minute Fan Score</Link> to find your gaps first.
          </span>
          {/* Just-keeping-tabs LinkedIn line — the dead email-capture form
            * that used to live here was removed once /contact took over as
            * the real contact surface (that form did nothing on submit). */}
          <span style={{ fontSize: '.92rem', color: 'rgba(251,244,230,.7)', fontWeight: 600, marginTop: 'clamp(8px,1.4vw,16px)' }}>
            Just keeping tabs?{' '}
            <a href={LINKEDIN_URL} className="limov" style={{ color: '#FBF4E6', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(251,244,230,.45)' }}>
              Connect on LinkedIn <span aria-hidden>→</span>
            </a>
          </span>
        </div>
      </section>

    </div>
  )
}
