import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import './NotFoundPage.css'

/* The 404. Added 28 Jul 2026 — the site had no catch-all route at all, so a
 * dead URL rendered an empty Layout, and Netlify's SPA fallback answered every
 * unknown path with a 200. That combination is a soft 404: Google reads the
 * status code, not the words, so every typo and stale inbound link looked to a
 * crawler like a real page with no content.
 *
 * Two halves to the fix and this is only one of them. The status code comes
 * from public/_redirects serving dist/404.html with a real 404, and that file
 * is this page, prerendered. See content/search-console-audit-28jul.md.
 *
 * No canonical is set. A canonical on a 404 would name a URL that should not
 * be indexed, and every 404 shares this one page, so a self-referencing one
 * would claim the same URL for every dead path on the site.
 *
 * The four links are the site's real destinations rather than a bare "go
 * home": someone who lands here followed something broken, and the useful
 * response is to show them where the site actually goes. */

const WAYS = [
  { to: '/work', label: 'The work', note: 'Case studies, with the numbers.' },
  { to: '/services', label: 'Work with me', note: 'Three ways to start.' },
  {
    to: '/fan-engine',
    // Styled mark, not a literal ™ — the JSX rule in CLAUDE.md.
    label: (
      <>
        The Fan Engine<span className="tm">™</span>
      </>
    ),
    note: 'How the system works.',
  },
  { to: '/contact', label: 'Get in touch', note: 'I reply within a working day.' },
]

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Page not found · Laura Cordrey',
    description:
      'That page does not exist. Links to the work, the services and the Fan Engine™.',
    ogType: 'website',
  })

  return (
    <div className="nf-page">
      <div className="nf-inner">
        <span className="nf-eyebrow">Error 404</span>
        <h1 className="nf-title">
          This page doesn&rsquo;t <mark>exist</mark>.
        </h1>
        <p className="nf-lede">
          The link may be old, or slightly mistyped. Nothing is broken on your
          end. Here is where the site actually goes.
        </p>

        <ul className="nf-ways">
          {WAYS.map((w) => (
            <li key={w.to}>
              <Link to={w.to} className="nf-way">
                <span className="nf-way__label">{w.label}</span>
                <span className="nf-way__note">{w.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
