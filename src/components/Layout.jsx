import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Layout.css'

const CONTACT_URL = '/contact'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const HELLO_EMAIL = 'hello@lauracordrey.com'

// Site-wide simplified nav: five items and one CTA. Fan-Led Growth leads,
// then Work, Services, Speaking, About. Method, AI and Fan Score are dropped
// from the header and stay reachable from the footer and in-page links; Home
// is the logo. This replaced a seven-item nav at the homepage cutover.
const navLinks = [
  { key: 'flg',      label: 'Fan-Led Growth', path: '/fan-led-growth', isHash: false },
  { key: 'work',     label: 'Work',           path: '/work',           isHash: false },
  { key: 'services', label: 'Services',       path: '/services',       isHash: false },
  { key: 'speaking', label: 'Speaking',       path: '/speaking',       isHash: false },
  { key: 'about',    label: 'About',          path: '/about',          isHash: false },
]

// Same journey as the header, plus the IP pages and Speaking that the header
// keeps tucked away.
const footerLinks = [
  { label: 'Home',      to: '/' },
  { label: 'Work',      to: '/work' },
  { label: 'Services',  to: '/services' },
  { label: 'Method',    to: '/methodology' },
  { label: 'Fan Score', to: '/fan-score' },
  { label: 'Fan Value', to: '/fan-value' },
  { label: 'AI',        to: '/ai' },
  { label: 'Speaking',  to: '/speaking' },
  { label: 'About',     to: '/about' },
  { label: 'FAQ',       to: '/faq' },
  { label: 'Contact',   to: '/contact' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const nav = navLinks
  const ctaLabel = 'Get in touch'

  // Clicking the brand while already on the homepage scrolls to the top
  // instead of a no-op navigation. Elsewhere it is a normal link to "/".
  const onBrandClick = (e) => {
    if (!isHome) return
    e.preventDefault()
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
  }

  // Close drawer on route change.
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Close drawer on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Close drawer on a click/tap outside the header (nav + open sheet), so you
  // don't have to hit the X. The opening click is on the toggle (inside
  // .cinnav), so it won't self-close.
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e) => { if (!e.target.closest('.cinnav')) setMenuOpen(false) }
    document.addEventListener('click', onDown)
    return () => document.removeEventListener('click', onDown)
  }, [menuOpen])

  // Lock scroll while drawer open.
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : original
    return () => { document.body.style.overflow = original }
  }, [menuOpen])

  // Transparent over hero → solid on scroll. Only matters on /, but harmless
  // elsewhere (we force solid on non-home routes via the `is-solid` class).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || menuOpen || !isHome

  const renderNavLink = (l) => {
    // The /ai entry is a hash link back to the homepage. NavLink's isActive
    // would mark it active on every homepage view, which isn't what we want —
    // use a plain anchor so it never shows the active underline.
    if (l.isHash) {
      return (
        <a key={l.key} href={l.path} className="cinnav__link">{l.label}</a>
      )
    }
    return (
      <NavLink
        key={l.key}
        to={l.path}
        end={l.path === '/'}
        className={({ isActive }) => `cinnav__link${isActive ? ' is-active' : ''}`}
      >
        {l.label}
      </NavLink>
    )
  }

  return (
    <div className="layout">
      <header className={`cinnav${solid ? ' is-solid' : ''}${menuOpen ? ' is-open' : ''}`}>
        <div className="cinnav__inner">
          <Link to="/" onClick={onBrandClick} className="cinnav__brand" aria-label="Home">Laura Cordrey</Link>

          <div className="cinnav__links">
            {nav.map(renderNavLink)}
            {/* No arrow on the CTA and no LinkedIn icon: the simplified nav
                keeps the header to five items and one button. */}
            <Link to={CONTACT_URL} className="cinnav__cta">
              {ctaLabel}
            </Link>
          </div>

          <button
            type="button"
            className="cinnav__toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M5 5l14 14M19 5L5 19" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div className="cinnav__menu">
            {nav.map((l) => (
              l.isHash ? (
                <a key={l.key} href={l.path} className="cinnav__mlink" onClick={() => setMenuOpen(false)}>{l.label}</a>
              ) : (
                <Link key={l.key} to={l.path} className="cinnav__mlink" onClick={() => setMenuOpen(false)}>{l.label}</Link>
              )
            ))}
            <Link to={CONTACT_URL} className="cinnav__mcta" onClick={() => setMenuOpen(false)}>
              {ctaLabel}
            </Link>
          </div>
        )}
      </header>

      <main className={`page${isHome ? '' : ' page--offset'}`}>{children}</main>

      <footer className="cinfoot">
        <div className="cinfoot__inner">
          <div className="cinfoot__brand">
            <span className="cinfoot__name">Laura Cordrey</span>
            <span className="cinfoot__line">Fan-led growth for consumer brands.</span>
            <span className="cinfoot__meta">Paris. Working globally</span>
          </div>
          <nav className="cinfoot__nav">
            {footerLinks.map((n) => (
              <Link key={n.label} to={n.to} className="cinfoot__link">{n.label}</Link>
            ))}
          </nav>
        </div>
        <div className="cinfoot__copy">
          <span>© {new Date().getFullYear()} Laura Cordrey</span>
          <span className="cinfoot__sep" aria-hidden="true">·</span>
          <a href={`mailto:${HELLO_EMAIL}`} className="cinfoot__contact">
            Say hello <span aria-hidden="true">→</span> {HELLO_EMAIL}
          </a>
          <span className="cinfoot__sep" aria-hidden="true">·</span>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="cinfoot__contact">
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
