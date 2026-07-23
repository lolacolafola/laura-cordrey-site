import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Layout.css'

const CONTACT_URL = '/contact'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const HELLO_EMAIL = 'hello@lauracordrey.com'

// Site-wide simplified nav: five items and one CTA. "Why fans" leads, then
// Work, Services, Speaking, About. The Fan Engine, AI and Fan Score are dropped
// from the header and stay reachable from the footer and in-page links; Home
// is the logo. This replaced a seven-item nav at the homepage cutover.
//
// The first slot was labelled "Fan-Led Growth" until 22 Jul 2026. It points at
// the one page with a real job of being found by a stranger, and "fan-led
// growth" is a term that stranger does not know yet. "Why fans" poses the
// question the page answers. The search-facing wording lives in the body links
// that now point at the page, where a full phrase reads naturally.
//
// Speaking left this list on 22 Jul 2026. It is a second product for a second
// buyer, and it was the only nav item pointing away from the consulting sale.
// Event bookers arrive by referral or a direct link, not by browsing a
// consultancy's header. The page keeps four inbound body links (one from the
// homepage, three from /about) plus the footer, so it is not buried, and the
// header now reads as one journey rather than a list: problem, proof, offer,
// person.
const navLinks = [
  { key: 'flg',      label: 'Why fans', path: '/fan-led-growth', isHash: false },
  { key: 'work',     label: 'Work',     path: '/work',           isHash: false },
  { key: 'services', label: 'Services', path: '/services',       isHash: false },
  { key: 'about',    label: 'About',    path: '/about',          isHash: false },
]

// Same journey as the header, plus the IP pages, AI and Speaking that the
// header keeps tucked away. These footer entries are load-bearing for the
// pages not in the header: they are how a crawler reaches /ai, /speaking and
// the three IP pages at all. Do not thin this list to declutter.
const footerLinks = [
  { label: 'Home',      to: '/' },
  { label: 'Work',      to: '/work' },
  { label: 'Services',  to: '/services' },
  // CLAUDE.md: in JSX the mark is the styled <span className="tm">, not a bare
  // ™ character, which would render at full size and sit heavy in a footer row.
  { label: <>The Fan Engine<span className="tm">™</span></>, to: '/fan-engine' },
  { label: <>Fan Score<span className="tm">™</span></>, to: '/fan-score' },
  { label: <>Fan Value<span className="tm">™</span></>, to: '/fan-value' },
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
  //
  // Adjusted during render rather than in an effect. This is React's documented
  // pattern for "reset state when a value changes" (You Might Not Need an
  // Effect), and it is better here, not just quieter: React re-runs the
  // component immediately without committing the in-between state, so the
  // drawer cannot paint open for a frame on the new route. The effect version
  // closed it one commit late.
  //
  // Not redundant with the onClick handlers on the drawer links further down.
  // Those cover a tap on a link; this covers browser back/forward and any
  // programmatic navigation that happens while the drawer is open.
  const [prevPath, setPrevPath] = useState(location.pathname)
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname)
    setMenuOpen(false)
  }

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
              <Link key={n.to} to={n.to} className="cinfoot__link">{n.label}</Link>
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
