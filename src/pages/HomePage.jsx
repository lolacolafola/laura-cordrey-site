import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, authorJsonLd } from '../lib/seo.js'
import './HomePage.css'

const CONTACT_URL = '/contact?intent=consulting'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const BASE = import.meta.env.BASE_URL

// Receipts stat bar — three cards. US Mobile lives in the featured work carousel below,
// so it's not repeated here (numbers = at a glance, carousel = stories). Ubisoft is
// program-wide 60M+ reach, resolves the old 60M-vs-50M mismatch with the Siege card.
const stats = [
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

// Featured work — five stories, rotated in the auto-carousel. Images come
// from the same case-study assets used on /work.
const work = [
  { idx: '01', company: 'US Mobile', year: '2024', title: 'Dark Star', result: '$32K in under three hours.', line: 'A free SIM kit turned into a $129 fan bundle that sold out instantly.', img: 'case-studies/us-mobile/us-mobile-dark-star-banner.png', alt: 'US Mobile Dark Star', href: '/work/us-mobile-dark-star' },
  { idx: '02', company: 'Azarus',    year: '2022–2023', title: 'Game ad platform', result: 'Built, then acquired by Animoca.', line: 'A gamified ad platform at a $2 CPI, with Ubisoft and Logitech as advertisers.', img: 'case-studies/azarus/azarus-game-ads-card.png', alt: 'Azarus game ad platform', href: '/work/azarus-game-ads' },
  { idx: '03', company: 'Ubisoft',   year: '2020–2021', title: 'Siege Champions', result: '50M+ UGC views at $0 media spend.', line: 'A creator advocacy program across 18 markets, where fans made the reach, not ads.', img: 'case-studies/ubisoft-siege/ubisoft-siege-champions-program-banner.png', alt: 'Ubisoft Siege Champions', href: '/work/ubisoft-siege-champions' },
  { idx: '04', company: 'Ubisoft',   year: '2019–2020', title: 'Delta Company', result: '10M+ UGC views, unveiled at E3.', line: 'A first-of-its-kind AAA community advocacy program, 130 members, 14 languages.', img: 'case-studies/ubisoft-delta/01-delta-badge-hero.png', alt: 'Ubisoft Delta Company', href: '/work/ubisoft-delta-company' },
  { idx: '05', company: 'BlaBlaCar', year: '2013–2016', title: 'Live Nation', result: 'First Official Ridesharing Partner.', line: '300+ branded parking spots and a festival community tent across Latitude, Leeds and Reading.', img: 'case-studies/blablacar/blablacar-live-nation-card.png', alt: 'BlaBlaCar × Live Nation', href: '/work/blablacar-live-nation' },
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

// ── AI sentiment visual ──────────────────────────────────────
// Inline SVG: a community sentiment monitor that draws in gold and holds
// steady, then flips signal-red at a dashed "MODEL UPDATE" marker.
// Loops (~7.5s) only while on screen (IntersectionObserver toggles .play).
// Fully static under prefers-reduced-motion.
// ── Featured work carousel ───────────────────────────────────
// Auto-advances every 5s. Pauses on hover/focus. Static under
// prefers-reduced-motion. Arrows + dots are keyboard-focusable.
// Card width ~82% so the next card peeks.
function WorkCarousel({ items }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef(null)
  const dragRef = useRef({ startX: 0, delta: 0, dragging: false, moved: false })
  const n = items.length

  const getStep = () => {
    const track = trackRef.current
    if (!track) return 0
    const first = track.children[0]
    if (!first) return 0
    const cs = getComputedStyle(track)
    const gap = parseFloat(cs.columnGap || cs.gap || 0) || 0
    return first.getBoundingClientRect().width + gap
  }

  const applyTransform = (i, extra = 0) => {
    const track = trackRef.current
    if (!track) return
    track.style.transform = `translateX(${-i * getStep() + extra}px)`
  }

  useEffect(() => { applyTransform(index) }, [index])
  useEffect(() => {
    const onResize = () => applyTransform(index)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [index])

  useEffect(() => {
    if (paused) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setIndex((i) => (i + 1) % n), 5000)
    return () => clearInterval(t)
  }, [paused, n])

  const go = (k) => setIndex((k + n) % n)

  // Pointer-drag: pointerdown starts, pointermove offsets, pointerup snaps to
  // nearest slide (or advances if past 15% threshold). Works for mouse + touch.
  const onPointerDown = (e) => {
    // Ignore non-primary buttons (right-click, middle-click).
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const track = trackRef.current
    if (!track) return
    dragRef.current = { startX: e.clientX, delta: 0, dragging: true, moved: false }
    track.style.transition = 'none'
    setPaused(true)
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch (_) { /* older browsers */ }
  }
  const onPointerMove = (e) => {
    const d = dragRef.current
    if (!d.dragging) return
    const delta = e.clientX - d.startX
    d.delta = delta
    if (Math.abs(delta) > 4) d.moved = true
    applyTransform(index, delta)
  }
  const onPointerUp = (e) => {
    const d = dragRef.current
    const track = trackRef.current
    if (!d.dragging || !track) return
    d.dragging = false
    const step = getStep()
    const threshold = step * 0.15
    track.style.transition = ''
    let nextIndex = index
    if (d.delta > threshold && index > 0) nextIndex = index - 1
    else if (d.delta < -threshold && index < n - 1) nextIndex = index + 1
    if (nextIndex === index) applyTransform(index)
    else setIndex(nextIndex)
    setPaused(false)
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch (_) { /* ignore */ }
  }
  // Swallow the Link click if the pointerdown-to-up movement was a drag.
  const onClickCapture = (e) => {
    if (dragRef.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      dragRef.current.moved = false
    }
  }

  return (
    <div
      className="wcarousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured work"
    >
      <div
        className="wcarousel__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
      >
        <div className="wcarousel__track" ref={trackRef}>
          {items.map((w, i) => (
            <Link key={w.idx} to={w.href} className="ccard" aria-hidden={i !== index ? 'true' : undefined} draggable={false}>
              <figure className="ccard__fig">
                <img src={BASE + w.img} alt={w.alt} loading="lazy" />
              </figure>
              <div className="ccard__body">
                <div className="ccard__meta">
                  <span className="ccard__idx">{w.idx}</span>
                  <span className="ccard__co">{w.company} · {w.year}</span>
                </div>
                <span className="ccard__ttl">{w.title}</span>
                <span className="ccard__res">{w.result}</span>
                <span className="ccard__line">{w.line}</span>
                <span className="ccard__cta">Read the story <span aria-hidden="true">→</span></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="wcarousel__nav">
        <div className="wcarousel__dots">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={'wcdot' + (i === index ? ' is-on' : '')}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
        <div className="wcarousel__arrows">
          <button type="button" className="wcarrow" onClick={() => go(index - 1)} aria-label="Previous slide"><span aria-hidden="true">←</span></button>
          <button type="button" className="wcarrow" onClick={() => go(index + 1)} aria-label="Next slide"><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  )
}

// AI sentiment "peaks" visual — sentiment mountain range with a MODEL UPDATE
// marker where the line dips into a red trough (pulsing dot + ping ring)
// then recovers to gold. Community nodes below: gold before the marker, red
// after. Animation plays once on view (loops only for the pulses); fully
// static under prefers-reduced-motion. See HomePage.css `.pk-*` rules.
function AiSentimentVisual() {
  const rootRef = useRef(null)
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('play'); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => el.classList.toggle('play', e.isIntersecting))
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={rootRef} className="aivis" data-rev>
      <span className="aivis__cap">Community sentiment · live</span>
      <svg viewBox="0 0 480 360" role="img" aria-label="A sentiment range with gold peaks, dipping red at a model update; the community nodes below turn red past the marker">
        <defs>
          <linearGradient id="pkA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(212,200,150,.3)" />
            <stop offset="1" stopColor="rgba(212,200,150,0)" />
          </linearGradient>
          <linearGradient id="pkB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(212,200,150,.14)" />
            <stop offset="1" stopColor="rgba(212,200,150,0)" />
          </linearGradient>
        </defs>
        <g stroke="rgba(239,233,220,.08)" strokeWidth="1">
          <line x1="0" y1="110" x2="480" y2="110" />
          <line x1="0" y1="180" x2="480" y2="180" />
          <line x1="0" y1="250" x2="480" y2="250" />
        </g>
        {/* Back range fill + drawn stroke */}
        <path d="M0,196 L60,172 L110,190 L170,150 L230,182 L300,158 L360,180 L420,164 L480,178 V300 H0 Z" fill="url(#pkB)" />
        <path className="pk-back" d="M0,196 L60,172 L110,190 L170,150 L230,182 L300,158 L360,180 L420,164 L480,178" fill="none" stroke="rgba(212,200,150,.3)" strokeWidth="1" />
        {/* Front range — fills, then gold segment, red trough, gold recovery */}
        <path d="M0,222 L50,194 L95,210 L150,138 L205,206 L260,114 L318,220 L360,252 L405,192 L480,208 V300 H0 Z" fill="url(#pkA)" />
        <path className="pk-gold" d="M0,222 L50,194 L95,210 L150,138 L205,206 L260,114 L318,220" fill="none" stroke="#D4C896" strokeWidth="1.8" />
        <path className="pk-red" d="M318,220 L360,252 L405,192" fill="none" stroke="#C8362B" strokeWidth="2.2" />
        <path className="pk-gold2" d="M405,192 L480,208" fill="none" stroke="#D4C896" strokeWidth="1.8" />
        {/* Peak dots + labels */}
        <g className="pk-label" fill="#EFE9DC">
          <circle cx="150" cy="138" r="3" />
          <circle cx="260" cy="114" r="3.4" />
        </g>
        <text className="pk-label" x="118" y="122" fontFamily="Manrope, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" fill="#D4C896">THE LAUNCH</text>
        <text className="pk-label" x="230" y="96" fontFamily="Manrope, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" fill="#D4C896">THE DROP</text>
        {/* MODEL UPDATE marker */}
        <line className="pk-mark" x1="360" y1="34" x2="360" y2="300" stroke="rgba(200,54,43,.45)" strokeWidth="1.5" strokeDasharray="4 5" />
        <circle className="pk-mark" cx="360" cy="34" r="3" fill="#C8362B" />
        <text className="pk-mark" x="372" y="38" fontFamily="Manrope, sans-serif" fontSize="10" fontWeight="700" letterSpacing="2" fill="#C8362B">MODEL UPDATE</text>
        {/* Trough pulsing dot + ping ring */}
        <g className="pk-reddot"><circle cx="360" cy="252" r="4" fill="#C8362B" /></g>
        <circle cx="360" cy="252" r="13" fill="none" stroke="#C8362B" strokeWidth="1" className="pk-blipring" />
        {/* Community nodes — gold before marker, red after */}
        <g className="pk-nodes" fill="rgba(212,200,150,.55)">
          <circle cx="24" cy="330" r="3" /><circle cx="62" cy="330" r="3" /><circle cx="100" cy="330" r="3" />
          <circle cx="138" cy="330" r="3" /><circle cx="176" cy="330" r="3" /><circle cx="214" cy="330" r="3" />
          <circle cx="252" cy="330" r="3" /><circle cx="290" cy="330" r="3" /><circle cx="328" cy="330" r="3" />
        </g>
        <g className="pk-rednodes" fill="#C8362B">
          <circle cx="366" cy="330" r="3" /><circle cx="404" cy="330" r="3" /><circle cx="442" cy="330" r="3" />
        </g>
      </svg>
    </div>
  )
}

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
            The growth you’re buying with ads is already sitting in your userbase. I build the fan-led growth engine that unlocks it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,1.6vw,18px)', marginTop: 'clamp(30px,3.6vw,44px)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 26px' }}>
              <Link to="/fan-led-growth-audit" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none', transition: 'background .2s ease,color .2s ease,border-color .2s ease' }}>
                Take the 2-min Fan Score <span className="ar" aria-hidden>→</span>
              </Link>
              <a href={CONTACT_URL} className="btnsoft" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, textDecoration: 'none' }}>
                Get in touch <span className="ar" aria-hidden>→</span>
              </a>
            </div>
            <span style={{ fontSize: '.86rem', color: '#8A8078', fontWeight: 600 }}>Free intro · or take the 2-minute Fan Score first.</span>
          </div>

          {/* Edit 5: hero proof strip — hairline top only (no bottom rule so
            * the hero reads as one continuous moment), gold kicker centered,
            * real PNGs at ~60px so they're legible. Bigger than the old 44px
            * row but keeps the logos as a footer under the promise, not a
            * separate "client roster" chapter. */}
          <div className="hero-trust logoband" style={{ marginTop: 'clamp(44px,5vw,68px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(20px,2.6vw,30px)', textAlign: 'center', borderTop: '1px solid rgba(239,233,220,.14)', paddingTop: 'clamp(28px,4vw,44px)' }}>
            <span style={{ fontSize: '.78rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>
              A decade building fan-led growth across video games &amp; tech
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
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 'clamp(14px,1.6vw,22px)' }}>
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
              <a href={CONTACT_URL} className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.04rem', padding: '16px 30px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
                Get in touch <span className="ar" aria-hidden>→</span>
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
                  Fan value estimate
                </span>
                <p style={{ fontSize: 'clamp(1.12rem,1.6vw,1.5rem)', lineHeight: 1.3, fontWeight: 700, color: '#EFE9DC', margin: 0 }}>
                  The growth is already in <span style={{ color: '#D4C896' }}>your userbase</span>, about <span style={{ color: '#C8362B', fontWeight: 800, whiteSpace: 'nowrap' }}>$560K a year</span> for a $5M brand.
                </p>
                <p style={{ fontSize: '.92rem', lineHeight: 1.55, color: 'rgba(239,233,220,.66)', margin: 0 }}>
                  On conservative benchmarks: revenue from fans who buy again, plus the ad spend you save when they bring others. An example, not your numbers.
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', flex: 'none' }}>
                <Link to="/fan-led-growth-value-model" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.04rem', padding: '16px 30px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
                  Estimate yours <span className="ar" aria-hidden>→</span>
                </Link>
                <span style={{ fontSize: '.9rem', color: 'rgba(239,233,220,.7)', fontWeight: 600 }}>
                  or <a href={CONTACT_URL} style={{ color: '#D4C896', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: 'rgba(212,200,150,.45)' }}>get in touch</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── AI TEASER ─── */}
      {/* Full AI section (intro + 4 discipline cards + oxblood pitch) lives at /ai.
       * Homepage keeps this short teaser with the sentiment visual. */}
      <section id="ai" style={{ position: 'relative', background: '#0E0B09', borderTop: '1px solid rgba(239,233,220,.12)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-26%', right: '-8%', width: '48vw', height: '48vw', maxWidth: 620, maxHeight: 620, background: 'radial-gradient(circle,rgba(200,54,43,.18) 0%,rgba(200,54,43,0) 64%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', ...INNER, padding: SECTION_PAD }}>
          <div className="aisplit grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,.95fr)', gap: 'clamp(32px,5vw,72px)', alignItems: 'center' }}>
            <div data-rev style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'clamp(18px,2.4vw,26px)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: '.74rem', letterSpacing: '.18em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700, border: '1px solid rgba(200,54,43,.4)', borderRadius: 999, padding: '8px 16px' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#C8362B' }} />
                New · Fan-led growth for AI
              </span>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,3.2rem)', lineHeight: 1.08, letterSpacing: '-.03em', margin: 0, maxWidth: '22ch' }}>
                AI communities behave like the live-service game communities I ran at Ubisoft: passionate, loud, <mark>one model update from turning</mark>.
              </h2>
              <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.82)', margin: 0, maxWidth: '44ch' }}>
                I build the same engine for the people around your model.
              </p>
              <Link to="/ai" className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.06rem', padding: '17px 32px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
                See fan-led growth for AI <span className="ar" aria-hidden>→</span>
              </Link>
              <p style={{ fontSize: '.95rem', lineHeight: 1.55, color: 'rgba(239,233,220,.66)', margin: 0, maxWidth: '46ch', borderTop: '1px solid rgba(239,233,220,.12)', paddingTop: 'clamp(16px,2vw,22px)' }}>
                When someone asks an AI for a recommendation, it answers from what people write online. The more your fans rave about you, the more it recommends you.{' '}
                <strong style={{ color: '#D4C896', fontWeight: 800 }}>That&rsquo;s AEO, the SEO of the AI era, and fan advocacy is how you win it.</strong>
              </p>
            </div>

            <AiSentimentVisual />
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
              Two ways in: bring me in for a specific need, or plug in the whole system.
            </p>
          </div>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 'clamp(16px,2vw,24px)' }}>
            <div className="wtw" data-rev style={{ background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderRadius: 3, padding: 'clamp(28px,3.2vw,46px)', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,2.6vw,30px)', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
              <span style={{ fontSize: '.74rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>Hire the expert</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 22, borderBottom: '1px solid rgba(21,17,15,.1)' }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="pulse" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Sentiment SOS</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>Your community is turning. I find what’s really driving it and hand you a build-ready fix across product, comms and community, at a pace that matches how urgent it is.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingBottom: 22, borderBottom: '1px solid rgba(21,17,15,.1)' }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="spark" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Fan Moments</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>A big moment coming: a launch, a major release, a milestone. I turn it into one your fans amplify, built for reach and sales, not just a big spend.</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ color: '#C8362B', lineHeight: 0, marginBottom: 2 }}><Icon name="users" size={24} /></span>
                  <span style={{ fontWeight: 800, fontSize: 'clamp(1.3rem,2vw,1.7rem)', letterSpacing: '-.01em', color: '#15110F' }}>Consulting</span>
                  <span style={{ fontSize: '1rem', lineHeight: 1.55, color: '#4A423B' }}>Senior fan-led growth direction, one to one. A focused strategy session, or an ongoing sounding board. From $500.</span>
                </div>
              </div>
            </div>

            <div className="wtwd" data-rev style={{ background: 'linear-gradient(155deg,#241a16,#15110F)', border: '1px solid rgba(200,54,43,.4)', borderRadius: 3, padding: 'clamp(28px,3.2vw,46px)', display: 'flex', flexDirection: 'column', gap: 'clamp(22px,2.6vw,30px)' }}>
              <span style={{ fontSize: '.74rem', letterSpacing: '.16em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>Plug in the system · my IP</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name="gear" size={30} /></span>
                <span style={{ fontWeight: 800, fontSize: 'clamp(1.7rem,2.8vw,2.5rem)', letterSpacing: '-.02em', lineHeight: 1, color: '#EFE9DC' }}>The Fan Engine</span>
                <span style={{ fontSize: '1.04rem', lineHeight: 1.6, color: 'rgba(239,233,220,.82)' }}>
                  The fan-led-growth system that plugs into any company, startup to conglomerate. It connects the brand they fall for, what you ship, and how you grow into one engine, measured end to end. Whether you’re starting from zero or growing the fanbase you already have.
                </span>
              </div>
              <ul style={{ listStyle: 'none', margin: 'auto 0 0', padding: 0, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Brand', 'Product', 'Community', 'Growth'].map((p) => (
                  <li key={p} style={{ fontSize: '.76rem', letterSpacing: '.04em', fontWeight: 600, color: '#D4C896', border: '1px solid rgba(212,200,150,.32)', borderRadius: 999, padding: '7px 14px' }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <div data-rev style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 24px', marginTop: 'clamp(32px,4vw,48px)' }}>
            <a href={CONTACT_URL} className="btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1.06rem', padding: '17px 32px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
              Get in touch <span className="ar" aria-hidden>→</span>
            </a>
            <Link to="/services" className="btnsoftd" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1.02rem', padding: '17px 32px', borderRadius: 3, textDecoration: 'none' }}>
              See all the ways to work <span className="ar" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WORK ─── */}
      <section id="work" style={{ background: '#0E0B09', borderTop: '1px solid rgba(239,233,220,.12)' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div className="worksplit" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,.85fr) minmax(0,1.15fr)', gap: 'clamp(28px,5vw,64px)', alignItems: 'center' }}>
            <div data-rev className="worklede" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px,1.8vw,20px)' }}>
              <h2 style={{ fontWeight: 800, fontSize: 'clamp(2.2rem,5.2vw,4.4rem)', lineHeight: 1, letterSpacing: '-.03em', margin: 0 }}>The work behind the numbers.</h2>
              <p style={{ fontSize: 'clamp(1.08rem,1.5vw,1.32rem)', lineHeight: 1.6, color: 'rgba(239,233,220,.82)', margin: 0, maxWidth: '34ch' }}>
                Drops, programs and launches across gaming, tech, consumer and entertainment.
              </p>
              <Link to="/work" className="tlink" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#D4C896', fontWeight: 700, fontSize: '.9rem', letterSpacing: '.04em', textDecoration: 'none', borderBottom: '1px solid rgba(212,200,150,.32)', paddingBottom: 3, marginTop: 'clamp(8px,1vw,16px)', alignSelf: 'flex-start' }}>
                See all the work <span aria-hidden>→</span>
              </Link>
            </div>
            <div data-rev>
              <WorkCarousel items={work} />
            </div>
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
            Take the 2-minute score, or get in touch for a straight read on where you stand.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 6 }}>
            <Link to="/fan-led-growth-audit" className="btncream" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#FBF4E6', color: '#15110F', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid #FBF4E6', textDecoration: 'none' }}>
              Take the 2-min Fan Score <span className="ar" aria-hidden>→</span>
            </Link>
            <a href={CONTACT_URL} className="btncreamo" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: 'rgba(251,244,230,.16)', color: '#FBF4E6', fontWeight: 700, fontSize: '1.08rem', padding: '18px 34px', borderRadius: 3, border: '1px solid rgba(251,244,230,.4)', textDecoration: 'none' }}>
              Get in touch <span className="ar" aria-hidden>→</span>
            </a>
          </div>
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
