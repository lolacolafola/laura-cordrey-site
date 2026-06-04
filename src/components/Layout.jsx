import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Layout.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/methodology', label: 'Method' },
  { to: '/services', label: 'Services' },
]

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Close the drawer whenever the route changes (i.e. user picked a link).
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Close on Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = menuOpen ? 'hidden' : original
    return () => { document.body.style.overflow = original }
  }, [menuOpen])

  return (
    <div className="layout">
      <header className="nav">
        <div className="nav__inner container">
          <Link to="/" className="nav__wordmark">
            <span className="nav__wordmark-name">Laura&nbsp;Cordrey</span>
          </Link>
          <nav className="nav__links">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `nav__link${isActive ? ' is-active' : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="nav__cta"
          >
            Book a call <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            className={`nav__burger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav__burger-line" aria-hidden="true" />
            <span className="nav__burger-line" aria-hidden="true" />
            <span className="nav__burger-line" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobile drawer — opens full-screen, links + CTA centered. */}
      <div
        id="mobile-menu"
        className={`nav__drawer${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        onClick={(e) => {
          // Close if clicking the backdrop itself (not the inner content).
          if (e.target === e.currentTarget) setMenuOpen(false)
        }}
      >
        <nav className="nav__drawer-inner">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nav__drawer-link${isActive ? ' is-active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="nav__drawer-cta"
          >
            Book a call <span aria-hidden="true">→</span>
          </a>
        </nav>
      </div>

      <main className="page">{children}</main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__col">
            <p className="marker">Laura Cordrey · Paris · Since 2013</p>
            <p className="footer__line">
              Strategic consultant. Brand · Product · Community · Growth.
            </p>
          </div>
          <div className="footer__col footer__col--links">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className="footer__link">
                {label}
              </Link>
            ))}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Book a call
            </a>
          </div>
          <div className="footer__col footer__col--meta">
            <p className="marker">© {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
