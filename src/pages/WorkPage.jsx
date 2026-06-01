import { Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies.js'

export default function WorkPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-9) 0' }}>
      <span className="marker">Work · Index</span>
      <h1 style={{ fontSize: 'var(--fs-display-l)', margin: 'var(--space-3) 0 var(--space-7)' }}>
        Selected work.
      </h1>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {caseStudies.map((cs, i) => (
          <li key={cs.id} style={{ borderTop: '1px solid var(--hairline)', padding: 'var(--space-5) 0' }}>
            <Link to={`/work/${cs.id}`} style={{ display: 'block' }}>
              <span className="marker">[{String(i + 1).padStart(2, '0')}] · {cs.year}</span>
              <h2 style={{ fontSize: 'var(--fs-display-m)', margin: 'var(--space-2) 0' }}>
                {cs.company} — {cs.headline}
              </h2>
              <p style={{ color: 'var(--ink-muted)' }}>{cs.hook}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
