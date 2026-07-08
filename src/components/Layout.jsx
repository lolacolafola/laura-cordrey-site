import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Layout.css'

const CONTACT_URL = '/contact'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const HELLO_EMAIL = 'hello@lauracordrey.com'

const navLinks = [
  { key: 'about',    label: 'About',    path: '/about',    isHash: false },
  { key: 'services', label: 'Services', path: '/services', isHash: false },
  { key: 'work',     label: 'Work',     path: '/work',     isHash: false },
  { key: 'speaking', label: 'Speaking', path: '/speaking', isHash: false },
  { key: 'ai',       label: 'AI',       path: '/ai',       isHash: false },
]

const footerLinks = [
  { label: 'Home',      to: '/' },
  { label: 'About',     to: '/about' },
  { label: 'Speaking',  to: '/speaking' },
  { label: 'Work',      to: '/work' },
  { label: 'Method',    to: '/methodology' },
  { label: 'Services',  to: '/services' },
  { label: 'Fan Score', to: '/fan-led-growth-audit' },
  { label: 'Fan Value', to: '/fan-led-growth-value-model' },
  { label: 'AI',        to: '/ai' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Close drawer on route change.
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Close drawer on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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
          <Link to="/" className="cinnav__brand">Laura Cordrey</Link>

          <div className="cinnav__links">
            {navLinks.map(renderNavLink)}
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="cinnav__li">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
            </a>
            <Link to={CONTACT_URL} className="cinnav__cta">
              Book a call <span aria-hidden="true">→</span>
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
            {navLinks.map((l) => (
              l.isHash ? (
                <a key={l.key} href={l.path} className="cinnav__mlink" onClick={() => setMenuOpen(false)}>{l.label}</a>
              ) : (
                <Link key={l.key} to={l.path} className="cinnav__mlink" onClick={() => setMenuOpen(false)}>{l.label}</Link>
              )
            ))}
            <Link to={CONTACT_URL} className="cinnav__mcta">
              Book a 30-min call <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </header>

      <main className={`page${isHome ? '' : ' page--offset'}`}>{children}</main>

      <footer className="cinfoot">
        <div className="cinfoot__inner">
          <div className="cinfoot__brand">
            <span className="cinfoot__name">Laura Cordrey</span>
            <span className="cinfoot__line">Fan-led growth for fan-driven brands.</span>
            <span className="cinfoot__meta">Paris · Since 2013</span>
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
