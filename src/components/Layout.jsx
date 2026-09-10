import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Layout.css'

const CONTACT_URL = '/contact'
const LINKEDIN_URL = 'https://www.linkedin.com/in/lauracordrey/'
const HELLO_EMAIL = 'hello@lauracordrey.com'

// Header nav. Five slots and one CTA; two of the five are grouped panels
// rather than single links.
//
// GROUPED 10 Sep 2026. Until then the header carried four items and the footer
// eleven, and a reviewer flagged the mismatch as confusing. The real cost was
// not the inconsistency: five substantive pages (the method, both tools, AI and
// Speaking) were reachable only from the footer, so the header advertised less
// of the business than the site actually had. The same reviewer said he came
// away not understanding what Laura does, and /fan-engine — the page that
// answers exactly that — was one of the pages he never found.
//
// Grouping rather than listing keeps the row the same visual weight it had
// before. Eleven top-level items would not fit above the 1024px breakpoint and
// would read as a sitemap.
//
// ORDER IS THE JOURNEY, not the page count: problem (Why fans), method (The Fan
// Engine), proof (Work), offer (Services), person (About).
//
// A group's trigger is a <button>, not a link. CLAUDE.md's hover-honesty rule
// says a cursor response must promise something, and opening a panel is
// something. Because a button cannot also navigate, every group repeats its
// landing page as the first item in its own panel — "The method" is
// /fan-engine, "Advisory" is /services, "About Laura" is /about — so no
// destination is lost by making the parent a control.
//
// Labels stay plain strings. CLAUDE.md keeps marks out of the chrome: the nav
// renders on every page, so a ™ here would spend the one-per-page allowance
// before the hero could use it. "The Fan Engine" is written in full — the
// naming rule forbids shortening it, and the previous "Method" label was a
// workaround for it being a bare nav item, which it no longer is.
const navLinks = [
  { key: 'flg',  label: 'Why fans', path: '/fan-led-growth' },
  {
    key: 'engine',
    label: 'The Fan Engine',
    items: [
      { label: 'The method', to: '/fan-engine', sub: 'The five stages' },
      { label: 'Fan Score',  to: '/fan-score',  sub: 'Score your fandom' },
      { label: 'Fan Value',  to: '/fan-value',  sub: 'What fans are worth' },
    ],
  },
  { key: 'work', label: 'Work', path: '/work' },
  {
    key: 'services',
    label: 'Services',
    items: [
      { label: 'Advisory', to: '/services', sub: 'How I work with you' },
      { label: 'Speaking', to: '/speaking', sub: 'Keynotes and hosting' },
      { label: 'AI',       to: '/ai',       sub: 'For AI companies' },
    ],
  },
  {
    key: 'about',
    label: 'About',
    items: [
      { label: 'About Laura', to: '/about', sub: 'Background and track record' },
      { label: 'FAQ',         to: '/faq',   sub: 'Common questions' },
    ],
  },
]

// Same journey as the header, plus the IP pages, AI and Speaking that the
// header keeps tucked away. These footer entries are load-bearing for the
// pages not in the header: they are how a crawler reaches /ai, /speaking and
// the three IP pages at all. Do not thin this list to declutter.
const footerLinks = [
  { label: 'Home',      to: '/' },
  { label: 'Work',      to: '/work' },
  { label: 'Services',  to: '/services' },
  // CLAUDE.md: no ™ in the chrome. The nav and footer render on all 19 pages,
  // so a mark here would eat the one-per-page allowance before the hero ever
  // gets to use it. These are wayfinding labels, not prose.
  { label: 'The Fan Engine', to: '/fan-engine' },
  { label: 'Fan Score', to: '/fan-score' },
  { label: 'Fan Value', to: '/fan-value' },
  { label: 'AI',        to: '/ai' },
  { label: 'Speaking',  to: '/speaking' },
  { label: 'About',     to: '/about' },
  { label: 'FAQ',       to: '/faq' },
  { label: 'Contact',   to: '/contact' },
  // Added 19 Aug 2026. Utility route, footer-only: a reader looks for a
  // privacy notice in the footer, and it should not spend a header slot.
  { label: 'Privacy',   to: '/privacy' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  // Which header group panel is open, by key, or null. One at a time.
  const [openGroup, setOpenGroup] = useState(null)
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
    setOpenGroup(null)
  }

  // Close drawer on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Escape closes an open group panel and returns focus to its trigger, which
  // is what a keyboard user expects and the only way out of the panel that does
  // not involve tabbing through every item in it.
  useEffect(() => {
    if (!openGroup) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      const trigger = document.querySelector(`[data-navgroup="${openGroup}"] .cinnav__grouptrig`)
      setOpenGroup(null)
      if (trigger) trigger.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openGroup])

  // A click anywhere outside the open group closes it. Separate from the
  // drawer's outside-click handler: that one only runs while the drawer is
  // open, and these two are never open at the same time.
  useEffect(() => {
    if (!openGroup) return
    const onDown = (e) => { if (!e.target.closest('.cinnav__group')) setOpenGroup(null) }
    document.addEventListener('click', onDown)
    return () => document.removeEventListener('click', onDown)
  }, [openGroup])

  // Moving focus out of a group panel with Tab closes it. Without this the
  // panel stays visibly open while focus is three items further along the page.
  const onGroupBlur = (key) => (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return
    setOpenGroup((cur) => (cur === key ? null : cur))
  }

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

  // A group counts as active when any page inside it is the current route, so
  // the header still tells you where you are now that the destination sits one
  // level down.
  const groupIsActive = (l) => l.items.some((i) => location.pathname === i.to)

  const renderNavLink = (l) => {
    if (l.items) {
      const open = openGroup === l.key
      return (
        <div
          key={l.key}
          className="cinnav__group"
          data-navgroup={l.key}
          onMouseEnter={() => setOpenGroup(l.key)}
          onMouseLeave={() => setOpenGroup((cur) => (cur === l.key ? null : cur))}
          onBlur={onGroupBlur(l.key)}
        >
          <button
            type="button"
            className={`cinnav__link cinnav__grouptrig${groupIsActive(l) ? ' is-active' : ''}`}
            aria-expanded={open}
            aria-haspopup="true"
            /* Opens; never closes. A toggle here fights the hover: on a mouse,
             * mouseenter has already opened the panel by the time the click
             * lands, so a toggle read the panel as open and shut it again —
             * the click looked like it did nothing. Closing is handled by
             * mouseleave, Escape, a click outside, tabbing out, or choosing an
             * item, all of which are unambiguous. */
            onClick={() => setOpenGroup(l.key)}
            onFocus={() => setOpenGroup(l.key)}
          >
            {l.label}
            <svg className="cinnav__caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
          </button>
          {/* Rendered always, hidden with [hidden]/CSS rather than unmounted:
            * the panel animates open, and a node that does not exist cannot
            * transition. It stays out of the tab order while closed because
            * `hidden` removes it from the accessibility tree entirely. */}
          <div className="cinnav__panel" hidden={!open}>
            {l.items.map((i) => (
              <NavLink
                key={i.to}
                to={i.to}
                className={({ isActive }) => `cinnav__panellink${isActive ? ' is-active' : ''}`}
                onClick={() => setOpenGroup(null)}
              >
                <span className="cinnav__panellabel">{i.label}</span>
                <span className="cinnav__panelsub">{i.sub}</span>
              </NavLink>
            ))}
          </div>
        </div>
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
            {/* The drawer flattens the groups instead of nesting accordions
              * inside it. It is already a full-height sheet with room to
              * scroll, so hiding items behind a second tap would add a step
              * and save nothing. The group name becomes a section heading —
              * not a link, because its landing page is the first item under
              * it, and two controls to the same place is how you get a
              * mis-tap. */}
            {nav.map((l) => (
              l.items ? (
                <div key={l.key} className="cinnav__mgroup">
                  <span className="cinnav__mgrouplabel">{l.label}</span>
                  {l.items.map((i) => (
                    <Link key={i.to} to={i.to} className="cinnav__mlink cinnav__mlink--sub" onClick={() => setMenuOpen(false)}>{i.label}</Link>
                  ))}
                </div>
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
            {/* "Paris · Working globally", not "Paris. Working globally".
              * Laura asked whether this wanted a full stop at the end; it wants
              * the opposite. This renders UPPERCASE and letterspaced, so it is
              * a label, not a sentence, and no uppercase label anywhere on the
              * site takes a terminal stop. The full stop after "Paris" was the
              * only one of its kind on the site, and the middot is already the
              * separator used in exactly this position — "SELECTED WORK ·
              * 2013–2026", "KEYNOTE · BROADCAST · HOST", and the footer's own
              * copyright row directly below this line. The sentence-case line
              * above it keeps its stop; that one really is a sentence. */}
            <span className="cinfoot__meta">Paris · Working globally</span>
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
