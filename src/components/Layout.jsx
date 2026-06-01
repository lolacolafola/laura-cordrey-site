import { Link, NavLink } from 'react-router-dom'
import './Layout.css'

const CALENDLY_URL = 'https://calendly.com/laura-lcordrey/30min'

const navLinks = [
  { to: '/work', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/insights', label: 'Insights' },
]

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="nav">
        <div className="nav__inner container">
          <Link to="/" className="nav__wordmark">
            <span className="nav__wordmark-mark">LC</span>
            <span className="nav__wordmark-name">Laura&nbsp;Cordrey</span>
          </Link>
          <nav className="nav__links">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
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
        </div>
      </header>

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
