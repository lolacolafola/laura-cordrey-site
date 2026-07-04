import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import './HomePage.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const BASE = import.meta.env.BASE_URL

const stats = [
  { value: 'Sold out', unit: 'drop', label: 'in under 3 hrs, a FOMO fan drop generating $32K', client: 'US Mobile', img: 'case-studies/homepage/hp-kpi-us-mobile-sim.png', alt: 'US Mobile Dark Star fan drop' },
  { value: '0 → 1M', unit: 'users', label: 'in a new market, scaled from newcomer to advocate', client: 'BlaBlaCar', img: 'case-studies/homepage/hp-kpi-blablacar.jpg', alt: 'BlaBlaCar festival community' },
  { value: '60M+', unit: 'reach', label: 'via fan-program member UGC, $0 spend', client: 'Ubisoft', img: 'case-studies/homepage/hp-kpi-ubi.jpg', alt: 'Ubisoft Siege Champions creator program' },
  { value: '+80%', unit: 'MAU', label: 'from fan-focused product launches', client: 'Azarus', img: 'case-studies/homepage/hp-kpi-azarus.png', alt: 'Azarus game ad platform' },
]

const whyFans = [
  { title: 'Lower churn',       copy: 'Fans stay longer, so you keep more of what you paid to win.', icon: 'lock' },
  { title: 'Earned reach',      copy: 'Fans make the content that markets you, at no media cost.', icon: 'megaphone' },
  { title: 'More referrals',    copy: 'Fans bring others in, so growth leans less on ad spend.', icon: 'users' },
  { title: 'Resilience',        copy: 'Fans stay through a rough week, and defend you in public.', icon: 'shield' },
  { title: 'AI recommends you', copy: 'Your fans’ posts are what it reads. That’s AEO, the new SEO.', icon: 'sparkle' },
  { title: 'It compounds',      copy: 'Built once, the engine keeps working and starts to fuel itself.', icon: 'loop' },
]

const aiPoints = [
  { idx: '01 · Distribution', title: 'Recommended by the models',  copy: 'When someone asks an AI what to use, you want to be the answer. Models learn from what real users write online, so fan advocacy is now distribution.' },
  { idx: '02 · Sentiment',    title: 'Sentiment you can move',     copy: 'Improve how your brand is talked about in comments, threads and communities. That is the same signal both buyers and models read about you.' },
  { idx: '03 · Advocacy',     title: 'Advocacy that writes',       copy: 'Build programs that get fans writing about you in reviews, posts and articles, not only making videos. Text is what AI reads.' },
  { idx: '04 · Operations',   title: 'Run it like a live service', copy: 'Manage your AI community the way I ran games with millions of players: real-time, close to the product, ready before sentiment turns.' },
]

const work = [
  { idx: '01', company: 'US Mobile', year: '2024', title: 'Dark Star', result: '$32K in under three hours.', line: 'A free SIM kit turned into a $129 fan bundle that sold out instantly.', img: 'case-studies/us-mobile/us-mobile-dark-star-banner.png', alt: 'US Mobile Dark Star', href: '/work/us-mobile-dark-star' },
  { idx: '02', company: 'Azarus',    year: '2022–2023', title: 'Game ad platform', result: 'Built, then acquired by Animoca.', line: 'A gamified ad platform at a $2 CPI, with Ubisoft and Logitech as advertisers.', img: 'case-studies/azarus/azarus-game-ads-card.png', alt: 'Azarus game ad platform', href: '/work/azarus-game-ads' },
  { idx: '03', company: 'Ubisoft',   year: '2020–2021', title: 'Siege Champions', result: '50M+ UGC views at $0 media spend.', line: 'A creator advocacy program across 18 markets, where fans made the reach, not ads.', img: 'case-studies/ubisoft-siege/ubisoft-siege-champions-hero.jpg', alt: 'Ubisoft Siege Champions', href: '/work/ubisoft-siege-champions' },
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
      'Laura Cordrey builds the fan-led growth engine that turns customers into fans who stay, pay, and bring more. A decade across Ubisoft, BlaBlaCar, US Mobile, Azarus.',
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
            The growth most brands chase with ad spend is already sitting in their userbase. I build the fan-led growth engine that unlocks it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,1.6vw,18px)', marginTop: 'clamp(30px,3.6vw,44px)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 26px' }}>
              <Link to="/fan-led-growth-audit" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none', transition: 'background .2s ease,color .2s ease,border-color .2s ease' }}>
                Get your Fan Score <span className="ar" aria-hidden>→</span>
              </Link>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btnsoft" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, textDecoration: 'none' }}>
                Book a 30-min call <span className="ar" aria-hidden>→</span>
              </a>
            </div>
            <span style={{ fontSize: '.86rem', color: '#8A8078', fontWeight: 600 }}>Free 30-minute intro · or take the 2-minute diagnostic first.</span>
          </div>

          {/* In-hero proof strip — clients sit with the promise, not below it. */}
          <div className="hero-trust" style={{ marginTop: 'clamp(44px,5vw,68px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(14px,1.8vw,20px)', textAlign: 'center' }}>
            <span style={{ display: 'block', width: 48, height: 1, background: '#D4C896' }} />
            <span style={{ fontSize: '.74rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A8078', fontWeight: 700 }}>
              A decade building fan-led growth across video games &amp; tech
            </span>
            <ul className="herologos grid-5" style={{ listStyle: 'none', margin: 0, padding: 0, width: '100%', maxWidth: 820, display: 'grid', gridTemplateColumns: 'repeat(5,minmax(0,1fr))', alignItems: 'center', justifyItems: 'center', gap: 'clamp(14px,2vw,28px) clamp(20px,3vw,44px)' }}>
              {[
                { src: 'logos/ubisoft-stacked-white.png', alt: 'Ubisoft', maxw: 110 },
                { src: 'logos/amazon-game-studios.png',   alt: 'Amazon Game Studios', maxw: 96 },
                { src: 'logos/blablacar-vert.png',        alt: 'BlaBlaCar', maxw: 110 },
                { src: 'logos/us-mobile-mark.png',        alt: 'US Mobile', maxw: 110 },
                { src: 'logos/azarus-vert.png',           alt: 'Azarus / Animoca', maxw: 110 },
              ].map((l) => (
                <li key={l.alt} className="lgocell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                  <img src={BASE + l.src} alt={l.alt} style={{ maxHeight: 44, maxWidth: l.maxw, width: 'auto', objectFit: 'contain' }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── WHAT IT IS ─── */}
      <section style={{ background: '#2D2723', color: '#EFE9DC', borderTop: '1px solid rgba(239,233,220,.1)' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
            <div data-rev>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 'clamp(16px,2.2vw,24px)' }}>
                <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name="rocket" size={22} /></span>
                <span style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>What it is</span>
              </div>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.1rem,4.8vw,3.9rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0 }}>
                You know product-led growth. This is <mark>fan-led growth</mark>.
              </h2>
            </div>
            <div data-rev style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,3vw,32px)' }}>
              <p style={{ fontSize: 'clamp(1.08rem,1.45vw,1.34rem)', lineHeight: 1.66, color: 'rgba(239,233,220,.82)', margin: 0 }}>
                Product-led growth made the product sell itself. Fan-led growth makes your fans sell it for you. They bring the next customers in, and because they are fans, they stay longer and spend more too.
              </p>
              <p style={{ fontSize: 'clamp(1.08rem,1.45vw,1.34rem)', lineHeight: 1.66, color: '#EFE9DC', fontWeight: 600, margin: 0 }}>
                It’s the <mark>highest-return growth you already own</mark>, and the easiest to miss, because fan-led work is hard to measure. So I built a way to measure what it’s actually worth to your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROOF ─── */}
      <section style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ marginBottom: 'clamp(32px,4vw,52px)', maxWidth: '40ch' }}>
            <span style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700, marginBottom: 14 }}>The receipts</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.9rem,4.4vw,3.4rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0, color: '#15110F' }}>Fan-led work, in numbers.</h2>
          </div>
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'clamp(14px,1.6vw,22px)' }}>
            {stats.map((s) => (
              <div key={s.client} className="statc" data-rev style={{ display: 'flex', flexDirection: 'column', background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderRadius: 4, overflow: 'hidden', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
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
              </div>
            ))}
          </div>
          <div data-rev style={{ marginTop: 'clamp(40px,5.5vw,72px)' }}>
            <Link to="/work" className="tlink" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#C8362B', fontWeight: 700, fontSize: '.82rem', letterSpacing: '.04em', textDecoration: 'none' }}>
              See the work <span className="ar" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY ME ─── */}
      <section id="about" style={{ background: '#0E0B09', borderTop: '1px solid rgba(239,233,220,.12)' }}>
        <div className="grid-2" style={{ ...INNER, padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) clamp(40px,5vw,64px)', display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)', gap: 'clamp(36px,7vw,100px)', alignItems: 'center' }}>
          <div data-rev style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <span style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>Why me</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.3rem,5.2vw,4.4rem)', lineHeight: 0.98, letterSpacing: '-.03em', margin: 0 }}>
              Brand, product, community, growth. <mark>I’ve done all four.</mark>
            </h2>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.62, color: 'rgba(239,233,220,.84)', margin: 0, maxWidth: '50ch' }}>
              Fan-led growth only works when brand, product, community and growth connect. I’ve worked across all four at every stop, going deepest on brand and community at BlaBlaCar, product and advocacy at Ubisoft across Assassin’s Creed, Ghost Recon and Rainbow Six Siege, and growth at American and French startups since.
            </p>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.62, color: 'rgba(239,233,220,.84)', margin: 'clamp(14px,1.6vw,20px) 0 0', maxWidth: '50ch' }}>
              Across the board, these pillars run as separate teams. I come in to connect them into one <mark>Fan Engine</mark>, built for your business and powered by your own fans.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 24px', marginTop: 8 }}>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.04rem', padding: '16px 30px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
                Book a 30-min call <span className="ar" aria-hidden>→</span>
              </a>
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
          <figure className="quotecard" style={{ margin: '0 auto', maxWidth: 680, textAlign: 'center', background: '#D4C896', border: '1px solid rgba(21,17,15,.1)', borderTop: '3px solid #C8362B', borderRadius: 3, padding: 'clamp(30px,3.4vw,46px)' }}>
            <blockquote style={{ margin: 0, padding: 0 }}>
              <p style={{ fontWeight: 700, fontSize: 'clamp(1.15rem,2vw,1.6rem)', lineHeight: 1.36, letterSpacing: '-.015em', color: '#15110F', margin: 0 }}>
                “Laura is a <mark>start-up swiss knife</mark>... with some extra fun!”
              </p>
            </blockquote>
            <figcaption style={{ marginTop: 'clamp(20px,2.4vw,28px)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
              <img src={BASE + 'portraits/nicolas-brusson.png'} alt="Nicolas Brusson" loading="lazy" style={{ width: 58, height: 58, borderRadius: '50%', objectFit: 'cover', flex: 'none', border: '1px solid rgba(21,17,15,.2)' }} />
              <span style={{ display: 'flex', flexDirection: 'column', gap: 3, textAlign: 'left' }}>
                <span style={{ fontSize: 'clamp(1.1rem,1.5vw,1.32rem)', fontWeight: 800, letterSpacing: '-.01em', color: '#15110F' }}>Nicolas Brusson</span>
                <span style={{ fontSize: '.9rem', fontWeight: 600, color: '#6B5A2E' }}>Co-founder &amp; CEO, BlaBlaCar</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ─── WHY FANS ─── */}
      <section style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev>
            <span style={{ display: 'block', fontSize: '.75rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700, marginBottom: 'clamp(18px,2.4vw,26px)' }}>Why fans</span>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.2rem,5.2vw,4.4rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0, maxWidth: '16ch', color: '#15110F' }}>
              Why grow with <mark>fans</mark>?
            </h2>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.6, color: '#4A423B', margin: '18px 0 0', maxWidth: '50ch' }}>
              Paid growth stops the moment you stop paying. Fan-led growth keeps working, and pays off in ways ad spend can’t.
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

          <div data-rev className="grid-2" style={{ marginTop: 'clamp(36px,4.5vw,60px)', paddingTop: 'clamp(28px,3.5vw,44px)', borderTop: '1px solid rgba(21,17,15,.16)', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(28px,4vw,64px)', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px,1.4vw,16px)' }}>
              <p style={{ fontSize: 'clamp(1.15rem,1.8vw,1.6rem)', lineHeight: 1.32, fontWeight: 600, color: '#15110F', margin: 0, maxWidth: '24ch' }}>
                The growth is already in <mark>your userbase</mark>.
              </p>
              <span style={{ fontWeight: 800, fontSize: 'clamp(2.8rem,5.5vw,4.6rem)', lineHeight: 0.92, letterSpacing: '-.03em', color: '#C8362B' }}>
                ≈ $560K<span style={{ fontSize: '.34em', fontWeight: 700, color: '#9A8E7C', letterSpacing: '.02em', marginLeft: '.5em' }}>a year</span>
              </span>
              <p style={{ fontSize: '.95rem', lineHeight: 1.55, color: '#6B6157', margin: 0, maxWidth: '46ch' }}>
                For a $5M brand spending $800K a year to win customers, fan-led growth can work out to about $560K a year on conservative benchmarks: revenue from fans who buy again, plus the ad spend you save when they bring others.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
              <Link to="/fan-led-growth-value-model" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.06rem', padding: '17px 32px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
                Estimate yours <span className="ar" aria-hidden>→</span>
              </Link>
              <span style={{ fontSize: '.95rem', color: '#6B6157', fontWeight: 600 }}>
                or <a href={CALENDLY_URL} target="_blank" rel="noreferrer" style={{ color: '#C8362B', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(200,54,43,.4)' }}>book a call</a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI ─── */}
      <section id="ai" style={{ position: 'relative', background: '#0E0B09', borderTop: '1px solid rgba(239,233,220,.12)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-26%', right: '-8%', width: '48vw', height: '48vw', maxWidth: 620, maxHeight: 620, background: 'radial-gradient(circle,rgba(200,54,43,.18) 0%,rgba(200,54,43,0) 64%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', ...INNER, padding: SECTION_PAD }}>
          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.15fr) minmax(0,.85fr)', gap: 'clamp(36px,5vw,72px)', alignItems: 'center' }}>
            <div data-rev style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(20px,2.6vw,30px)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '.74rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700, border: '1px solid rgba(200,54,43,.4)', borderRadius: 999, padding: '8px 16px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C8362B' }} />
                New · Fan-led growth for AI
              </span>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,3.2rem)', lineHeight: 1.08, letterSpacing: '-.03em', margin: 0 }}>
                AI communities behave like the live-service game communities I ran at Ubisoft: passionate, loud, <mark>one model update from turning</mark>.
              </h2>
              <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.82)', margin: 0, maxWidth: '48ch' }}>
                The same engine that keeps fans of a game works for the people around your model. And right now it pays off in places that matter more than ever.
              </p>
            </div>

            <div data-rev style={{ position: 'relative', alignSelf: 'stretch', minHeight: 'clamp(340px,38vw,520px)', borderRadius: 3, background: 'linear-gradient(160deg,rgba(239,233,220,.06),rgba(239,233,220,.015))', border: '1px solid rgba(239,233,220,.14)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, textAlign: 'center', padding: 24 }}>
              <span style={{ color: 'rgba(212,200,150,.6)', lineHeight: 0 }}><Icon name="image" size={46} /></span>
              <span style={{ fontSize: '.78rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(239,233,220,.55)', fontWeight: 700 }}>Visual · AI community in action</span>
              <span style={{ position: 'absolute', left: 14, top: 12, fontSize: '.62rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(239,233,220,.32)', fontWeight: 700 }}>Image to add</span>
            </div>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 'clamp(16px,2vw,24px)', marginTop: 'clamp(40px,5vw,68px)' }}>
            {aiPoints.map((p) => (
              <div key={p.idx} className="aic" data-rev style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#241D19', border: '1px solid rgba(239,233,220,.14)', borderRadius: 3, padding: 'clamp(26px,3vw,40px)' }}>
                <span style={{ fontSize: '.72rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>{p.idx}</span>
                <h3 style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.8rem)', letterSpacing: '-.02em', margin: 0 }}>{p.title}</h3>
                <p style={{ fontSize: 'clamp(.98rem,1.2vw,1.12rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.8)', margin: 0 }}>{p.copy}</p>
              </div>
            ))}
          </div>

          <div data-rev style={{ marginTop: 'clamp(36px,4.5vw,60px)', background: 'linear-gradient(150deg,#A12A1E,#6E1B13)', border: '1px solid rgba(251,244,230,.22)', borderRadius: 3, padding: 'clamp(32px,4.2vw,56px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(24px,3vw,40px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, maxWidth: '48ch' }}>
              <h3 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem,3vw,2.6rem)', lineHeight: 1.05, letterSpacing: '-.025em', margin: 0 }}>
                This is new ground. <mark style={{ color: '#F2D79A' }}>Who wants to build it with me?</mark>
              </h3>
              <p style={{ fontSize: 'clamp(1.04rem,1.4vw,1.24rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.82)', margin: 0 }}>
                No one has run fan-led growth for AI products at scale yet. I have run it for live-service games with millions of players, the closest thing there is. If you are shipping a model and want to get ahead of this, let’s try it together.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
              <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btncream" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#FBF4E6', color: '#15110F', fontWeight: 700, fontSize: '1.06rem', padding: '17px 32px', borderRadius: 3, border: '1px solid #FBF4E6', textDecoration: 'none' }}>
                Book a 30-min call <span className="ar" aria-hidden>→</span>
              </a>
            </div>
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
              Two ways in. Bring me in for a specific need, or plug in the whole system.
            </p>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(16px,2vw,24px)' }}>
            <div className="wtw" data-rev style={{ background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderRadius: 3, padding: 'clamp(28px,3.2vw,46px)', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,2.6vw,30px)', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
              <span style={{ fontSize: '.74rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>Hire the expert</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 22, borderBottom: '1px solid rgba(21,17,15,.1)' }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="pulse" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Sentiment SOS</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>Your community is turning. In two to four weeks I find what is really driving it and hand you a build-ready fix across product, comms and community.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="spark" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Fan Moments</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>You have a big moment coming: a launch, a major release, a milestone. I turn it into one your fans amplify, built for awareness, reach and sales, not just budget spent.</span>
                </div>
              </div>
            </div>

            <div className="wtwd" data-rev style={{ background: 'linear-gradient(155deg,#241a16,#15110F)', border: '1px solid rgba(200,54,43,.4)', borderRadius: 3, padding: 'clamp(28px,3.2vw,46px)', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,2.6vw,30px)' }}>
              <span style={{ fontSize: '.74rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>Plug in the system · my IP</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name="gear" size={30} /></span>
                <span style={{ fontWeight: 800, fontSize: 'clamp(1.7rem,2.8vw,2.5rem)', letterSpacing: '-.02em', lineHeight: 1, color: '#EFE9DC' }}>The Fan Engine</span>
                <span style={{ fontSize: '1.04rem', lineHeight: 1.6, color: 'rgba(239,233,220,.82)' }}>
                  The fan-led-growth system that plugs into any company, startup to conglomerate. It builds the brand they fall for, connects what your fans feel, what you ship and how you grow into one engine, and measures it end to end. Whether you are starting from zero or growing the fanbase you already have.
                </span>
              </div>
              <ul style={{ listStyle: 'none', margin: 'auto 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Brand', 'Product', 'Community', 'Growth', 'Measurement'].map((p) => (
                  <li key={p} style={{ fontSize: '.76rem', letterSpacing: '.04em', fontWeight: 600, color: '#D4C896', border: '1px solid rgba(212,200,150,.32)', borderRadius: 999, padding: '7px 14px' }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div data-rev style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 24px', marginTop: 'clamp(32px,4vw,48px)' }}>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.06rem', padding: '17px 32px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
              Book a 30-min call <span className="ar" aria-hidden>→</span>
            </a>
            <Link to="/services" className="btnsoftd" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.02rem', padding: '17px 32px', borderRadius: 3, textDecoration: 'none' }}>
              See all the ways to work <span className="ar" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" style={{ background: '#0E0B09', borderTop: '1px solid rgba(239,233,220,.12)' }}>
        <div style={{ ...INNER, padding: 'clamp(72px,9vw,128px) clamp(20px,5vw,64px) clamp(40px,5vw,64px)' }}>
          <div data-rev style={{ maxWidth: '48ch' }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.2rem,5.2vw,4.4rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0 }}>The work behind the numbers.</h2>
            <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.82)', margin: '18px 0 0' }}>
              Drops, programs and launches across gaming, tech, consumer and entertainment.
            </p>
          </div>
        </div>

        <ol style={{ listStyle: 'none', margin: '0 auto', padding: '0 clamp(20px,5vw,64px)', maxWidth: 1280, display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,24px)' }}>
          {work.map((w) => (
            <li key={w.idx}>
              <Link to={w.href} className="wrow" data-rev style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.05fr)', gap: 'clamp(24px,4vw,56px)', alignItems: 'center', textDecoration: 'none', color: 'inherit', background: '#15110F', border: '1px solid rgba(239,233,220,.12)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ padding: 'clamp(28px,3.4vw,48px)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                    <span style={{ fontWeight: 800, fontSize: '1rem', color: '#C8362B' }}>{w.idx}</span>
                    <span style={{ fontSize: '.75rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#8A8078', fontWeight: 600 }}>{w.company} · {w.year}</span>
                  </span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.7rem,3vw,2.7rem)', letterSpacing: '-.025em', lineHeight: 1 }}>{w.title}</span>
                  <span style={{ fontWeight: 700, fontSize: 'clamp(1.1rem,1.6vw,1.45rem)', color: '#D4C896', lineHeight: 1.2, marginTop: 2 }}>{w.result}</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: 'rgba(239,233,220,.78)', maxWidth: '40ch' }}>{w.line}</span>
                  <span className="wcta" style={{ marginTop: 6, fontSize: '.78rem', letterSpacing: '.12em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 600, transition: 'color .2s ease' }}>Read the story →</span>
                </div>
                <figure className="wmedia" style={{ margin: 0, height: '100%', minHeight: 'clamp(240px,30vw,380px)', overflow: 'hidden', background: '#0E0B09' }}>
                  <img src={BASE + w.img} alt={w.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </figure>
              </Link>
            </li>
          ))}
        </ol>

        <div data-rev style={{ ...INNER, padding: 'clamp(28px,3.5vw,44px) clamp(20px,5vw,64px) clamp(56px,8vw,110px)', display: 'flex', justifyContent: 'center' }}>
          <Link to="/work" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.02rem', padding: '16px 30px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
            See the work <span className="ar" aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ─── CLOSE ─── */}
      <section style={{ background: '#A12A1E', color: '#FBF4E6' }}>
        <div data-rev style={{ ...INNER, padding: 'clamp(88px,11vw,150px) clamp(20px,5vw,64px)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(24px,3.5vw,40px)' }}>
          <span style={{ fontSize: '.75rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#F2D79A', fontWeight: 700 }}>Let’s work together</span>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.8rem,9vw,7rem)', lineHeight: 0.9, letterSpacing: '-.04em', margin: 0, maxWidth: '13ch', color: '#FBF4E6' }}>
            What’s your <span style={{ color: '#F2D79A' }}>fan growth</span> worth?
          </h2>
          <p style={{ fontSize: 'clamp(1.15rem,1.8vw,1.5rem)', lineHeight: 1.5, color: 'rgba(251,244,230,.86)', maxWidth: '42ch', margin: 0 }}>
            Take the 2-minute score, or book a call for a straight read on where you stand.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 6 }}>
            <Link to="/fan-led-growth-audit" className="btncream" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#FBF4E6', color: '#15110F', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid #FBF4E6', textDecoration: 'none' }}>
              Get your Fan Score <span className="ar" aria-hidden>→</span>
            </Link>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="btncreamo" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(251,244,230,.16)', color: '#FBF4E6', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid rgba(251,244,230,.4)', textDecoration: 'none' }}>
              Book a 30-min call <span className="ar" aria-hidden>→</span>
            </a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'clamp(8px,1.4vw,16px)', width: '100%', maxWidth: 520 }}>
            <span style={{ fontSize: '.95rem', color: 'rgba(251,244,230,.8)', fontWeight: 600 }}>Not ready to book? Leave your email and I’ll come to you.</span>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <input type="email" className="cinmail" placeholder="you@company.com" style={{ flex: 1, minWidth: 220, background: 'rgba(251,244,230,.1)', border: '1px solid rgba(251,244,230,.4)', borderRadius: 3, padding: '15px 18px', color: '#FBF4E6', fontSize: '1rem', fontFamily: 'Manrope, sans-serif', outline: 'none' }} />
              <button type="submit" className="btnsend" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, background: '#15110F', color: '#FBF4E6', border: '1px solid #15110F', borderRadius: 3, padding: '15px 26px', fontWeight: 700, fontSize: '1rem', fontFamily: 'Manrope, sans-serif', cursor: 'pointer' }}>
                Email me <span aria-hidden>→</span>
              </button>
            </form>
            <span style={{ fontSize: '.92rem', color: 'rgba(251,244,230,.7)', fontWeight: 600, marginTop: 4 }}>
              Just keeping tabs?{' '}
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="limov" style={{ color: '#FBF4E6', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(251,244,230,.45)' }}>
                Connect on LinkedIn <span aria-hidden>→</span>
              </a>
            </span>
          </div>
        </div>
      </section>

    </div>
  )
}
