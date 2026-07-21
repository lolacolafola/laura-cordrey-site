import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import './FanLedGrowthPage.css'

const CONTACT_URL = '/contact?intent=consulting'

/* /fan-led-growth — plain-language overview page.
 *
 * Destination for the "Fan-led growth" item in the simplified v2 nav.
 *
 * IMPORTANT: no copy on this page is newly written. Every line is lifted
 * verbatim from the live homepage (src/pages/HomePage.jsx on main), from the
 * three sections the v2 homepage cut: "What it is", "Why fans" and "Why
 * you're here". Those sections were ~500 words and ten cards, and cutting
 * them was the biggest single lever on homepage density. The argument they
 * carried now lives here instead of three screens down a homepage.
 *
 * Provenance table: content/copy/fan-led-growth-page-plan.md
 *
 * Preview only: noindex and absent from the sitemap (so the prerender skips
 * it) until the v2 direction is decided. Overlaps /methodology in places;
 * that overlap is flagged in the plan doc, not resolved.
 */

const HEAD_W = 700
const T = {
  h1: 'clamp(2.4rem, 5vw, 3.75rem)',
  h2: 'clamp(1.8rem, 3.2vw, 2.75rem)',
  h3: 'clamp(1.15rem, 1.6vw, 1.4rem)',
  lede: 'clamp(1.05rem, 1.3vw, 1.22rem)',
  body: 'clamp(.95rem, 1.05vw, 1.04rem)',
  marker: '.74rem',
}
const SECTION_PAD = 'clamp(64px, 7.5vw, 108px) clamp(20px, 5vw, 64px)'
const INNER = { maxWidth: 1180, margin: '0 auto', width: '100%' }

const whyFans = [
  { title: 'They invest more', copy: 'Fans stay longer and spend more, so you keep and grow what you paid to win.', icon: 'lock' },
  { title: 'They spread the word', copy: 'Fans make the content that markets you, at no media cost.', icon: 'megaphone' },
  { title: 'They recommend you', copy: 'Fans bring their friends in, so growth leans less on ad spend.', icon: 'users' },
  { title: 'They defend you', copy: 'Fans stay through a rough week, and defend you in public.', icon: 'shield' },
  { title: 'AI recommends you too', copy: 'When people ask AI what to pick, it answers from what your fans post. The more they love you, the more it points to you.', icon: 'sparkle' },
  { title: 'It compounds', copy: 'Built once, the engine keeps working and starts to fuel itself.', icon: 'loop' },
]

const situations = [
  { title: 'You’re burning cash on growth', copy: 'Every new customer costs more than the last, and you need growth that doesn’t stop the moment you stop paying.', icon: 'spark' },
  { title: 'You’ve hit product-market fit', copy: 'The product works. Now you’re ready for the extra growth fans bring on top.', icon: 'rocket' },
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
  useDocumentMeta({
    title: 'Fan-led growth · Laura Cordrey',
    description: 'What fan-led growth is, why fans compound, and who it is for. Preview page.',
    ogType: 'article',
  })

  // Preview-only, same treatment as /home-v2: keep it out of search and stop
  // it inheriting index.html's static canonical (which points at "/").
  useEffect(() => {
    const robots = document.createElement('meta')
    robots.setAttribute('name', 'robots')
    robots.setAttribute('content', 'noindex, nofollow')
    document.head.appendChild(robots)
    const canonical = document.head.querySelector('link[rel="canonical"]')
    const prevHref = canonical?.getAttribute('href')
    canonical?.setAttribute('href', `${window.location.origin}/fan-led-growth`)
    return () => {
      robots.parentNode?.removeChild(robots)
      if (canonical && prevHref != null) canonical.setAttribute('href', prevHref)
    }
  }, [])

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
    <div ref={rootRef} className="flg" style={{ background: '#15110F', color: '#EFE9DC', fontFamily: 'Manrope, system-ui, sans-serif', fontWeight: 500, lineHeight: 1.55 }}>

      {/* ─── WHAT IT IS ─── */}
      <section style={{ background: '#0E0B09' }}>
        <div style={{ ...INNER, padding: 'clamp(76px,9vw,120px) clamp(20px,5vw,64px) clamp(64px,7.5vw,100px)' }}>
          <div style={{ maxWidth: '62ch' }}>
            <span style={{ display: 'block', fontSize: T.marker, letterSpacing: '.2em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>What it is</span>
            <h1 style={{ fontWeight: HEAD_W, fontSize: T.h1, lineHeight: 1.04, letterSpacing: '-.03em', margin: 'clamp(16px,2vw,22px) 0 0' }}>
              Fans are <mark>the growth you already own</mark>.
            </h1>
            <p style={{ fontSize: T.lede, lineHeight: 1.66, color: 'rgba(239,233,220,.82)', margin: 'clamp(20px,2.6vw,28px) 0 0' }}>
              <strong style={{ color: '#EFE9DC', fontWeight: 700 }}>You&rsquo;ve been renting your growth.</strong> You pay for every customer, and the day you stop, it stops. Fans work the other way: build them once, and they keep growing you long after the spend ends.
            </p>
          </div>

          <div data-rev style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(155deg,#241a16,#15110F)', border: '1px solid rgba(200,54,43,.4)', borderRadius: 3, padding: 'clamp(20px,2.4vw,28px) clamp(22px,2.6vw,32px)', margin: 'clamp(28px,3.4vw,40px) 0 0', maxWidth: 620 }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '-50%', right: '-10%', width: '30vw', height: '30vw', maxWidth: 260, maxHeight: 260, background: 'radial-gradient(circle,rgba(200,54,43,.18) 0%,rgba(200,54,43,0) 64%)', pointerEvents: 'none' }} />
            <p style={{ position: 'relative', fontSize: 'clamp(1.3rem,2.2vw,1.8rem)', fontWeight: HEAD_W, letterSpacing: '-.02em', lineHeight: 1.15, margin: 0 }}>
              Growth you <span style={{ color: '#C8362B' }}>own</span>, not rent.
            </p>
          </div>

          <p data-rev style={{ fontSize: T.lede, lineHeight: 1.66, color: '#EFE9DC', fontWeight: 600, margin: 'clamp(24px,3vw,34px) 0 0', maxWidth: '62ch' }}>
            When people love what you do, they stay, they spend more, and they bring others with them. Nothing sells harder than a fan telling a friend, because people trust people, not marketing. But no single team makes a fan: it takes your brand, your product, and your community pulling the same way. Get that right, and customers become fans. That&rsquo;s <mark>fan-led growth</mark>, and I build it into <Link to="/methodology" style={{ color: '#D4C896', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}>an engine you own</Link>, then show you what it&rsquo;s worth.
          </p>
        </div>
      </section>

      {/* ─── WHY FANS ─── */}
      <section style={{ background: '#EFE9DC', color: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev>
            <span style={{ display: 'block', fontSize: T.marker, letterSpacing: '.22em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>Why fans</span>
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.06, letterSpacing: '-.028em', margin: 'clamp(14px,1.8vw,20px) 0 0', maxWidth: '22ch', color: '#15110F' }}>
              You don&rsquo;t buy fans. You <mark>earn</mark> them.
            </h2>
            <p style={{ fontSize: T.lede, lineHeight: 1.6, color: '#4A423B', margin: 'clamp(16px,2vw,22px) 0 0', maxWidth: '58ch' }}>
              People become fans when they feel they belong. Give them a reason to belong, a space to connect, a voice, and the feeling of being seen and special. Ad spend can&rsquo;t buy that. Earn it, and here is what your fans start doing for you.
            </p>
          </div>

          <div className="flg-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 'clamp(14px,1.8vw,20px)', marginTop: 'clamp(34px,4.4vw,56px)' }}>
            {whyFans.map((p) => (
              <div key={p.title} data-rev style={{ display: 'flex', flexDirection: 'column', gap: 12, background: '#FCFAF3', border: '1px solid rgba(21,17,15,.1)', borderRadius: 3, padding: 'clamp(22px,2.6vw,32px)', boxShadow: '0 1px 3px rgba(21,17,15,.06)' }}>
                <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name={p.icon} size={26} /></span>
                <h3 style={{ fontWeight: HEAD_W, fontSize: T.h3, letterSpacing: '-.02em', margin: 0, color: '#15110F' }}>{p.title}</h3>
                <p style={{ fontSize: T.body, lineHeight: 1.6, color: '#4A423B', margin: 0 }}>{p.copy}</p>
              </div>
            ))}
          </div>

          <div data-rev style={{ position: 'relative', overflow: 'hidden', marginTop: 'clamp(24px,3vw,38px)', background: 'linear-gradient(155deg,#241a16,#15110F)', border: '1px solid rgba(200,54,43,.4)', borderRadius: 3, padding: 'clamp(26px,3.2vw,40px)' }}>
            <div aria-hidden="true" style={{ position: 'absolute', top: '-40%', right: '-6%', width: '40vw', height: '40vw', maxWidth: 420, maxHeight: 420, background: 'radial-gradient(circle,rgba(200,54,43,.16) 0%,rgba(200,54,43,0) 64%)', pointerEvents: 'none' }} />
            <div className="flg-est" style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 'clamp(20px,3vw,44px)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9, maxWidth: '52ch' }}>
                <span style={{ fontSize: '.72rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>Fan Value estimate</span>
                <p style={{ fontSize: 'clamp(1.1rem,1.5vw,1.4rem)', lineHeight: 1.32, fontWeight: HEAD_W, color: '#EFE9DC', margin: 0 }}>
                  The growth is already in <span style={{ color: '#D4C896' }}>your userbase</span>, about <span style={{ color: '#C8362B', whiteSpace: 'nowrap' }}>$560K a year</span> for a $5M brand.
                </p>
                <p style={{ fontSize: '.9rem', lineHeight: 1.55, color: 'rgba(239,233,220,.66)', margin: 0 }}>
                  On conservative benchmarks: revenue from fans who buy again, plus the ad spend you save when they bring others. An example, not your numbers.
                </p>
              </div>
              <Link to="/fan-value" className="flg-btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none', flex: 'none' }}>
                See what your fans are worth <span className="ar" aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── WHY YOU'RE HERE ─── */}
      <section style={{ background: '#15110F' }}>
        <div style={{ ...INNER, padding: SECTION_PAD }}>
          <div data-rev style={{ maxWidth: '66ch' }}>
            <span style={{ display: 'block', fontSize: T.marker, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4C896', fontWeight: 700 }}>Who it&rsquo;s for</span>
            <h2 style={{ fontWeight: HEAD_W, fontSize: T.h2, lineHeight: 1.06, letterSpacing: '-.028em', margin: 'clamp(14px,1.8vw,20px) 0 0' }}>
              However you got here, <mark>fans are the next step</mark>.
            </h2>
            <p style={{ fontSize: T.lede, lineHeight: 1.62, color: 'rgba(239,233,220,.82)', margin: 'clamp(16px,2vw,22px) 0 0' }}>
              I work with companies that have a disruptive brand, a vocal userbase, and growth that runs on network effects. If product-led growth got you here, fan-led growth is the next logical step: the product sold itself, now your fans sell it too. The two are a perfect marriage, and fan-led is the half still on the table.
            </p>
          </div>

          <div className="flg-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 'clamp(14px,1.8vw,20px)', marginTop: 'clamp(34px,4.4vw,56px)' }}>
            {situations.map((s, i) => (
              <div key={s.title} data-rev style={{ display: 'flex', flexDirection: 'column', gap: 10, background: '#1F1A17', border: '1px solid rgba(239,233,220,.12)', borderTop: '2px solid rgba(200,54,43,.55)', borderRadius: 4, padding: 'clamp(22px,2.6vw,34px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '.72rem', letterSpacing: '.14em', textTransform: 'uppercase', color: '#C8362B', fontWeight: 700 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ color: '#C8362B', lineHeight: 0 }}><Icon name={s.icon} size={22} /></span>
                </div>
                <h3 style={{ fontWeight: HEAD_W, fontSize: T.h3, letterSpacing: '-.02em', margin: 0, color: '#EFE9DC' }}>{s.title}</h3>
                <p style={{ fontSize: T.body, lineHeight: 1.58, color: 'rgba(239,233,220,.72)', margin: 0 }}>{s.copy}</p>
              </div>
            ))}
          </div>

          <div data-rev style={{ marginTop: 'clamp(28px,3.4vw,44px)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '14px 20px' }}>
            <span style={{ fontSize: T.lede, fontWeight: HEAD_W, color: '#EFE9DC' }}>Sound like you? That&rsquo;s exactly what I build.</span>
            <Link to={CONTACT_URL} className="flg-btnp" style={{ display: 'inline-flex', alignItems: 'center', gap: 11, background: '#C8362B', color: '#EFE9DC', fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, border: '1px solid #C8362B', textDecoration: 'none' }}>
              Get in touch <span className="ar" aria-hidden>→</span>
            </Link>
            <Link to="/services" className="flg-btnsoft" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: '1rem', padding: '15px 28px', borderRadius: 3, textDecoration: 'none' }}>
              See how we&rsquo;d work together <span className="ar" aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
