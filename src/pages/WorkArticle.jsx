import { useParams, Link } from 'react-router-dom'
import caseStudies from '../data/caseStudies.js'

export default function WorkArticle() {
  const { slug } = useParams()
  const cs = caseStudies.find((c) => c.id === slug)

  if (!cs) {
    return (
      <div className="container" style={{ padding: 'var(--space-9) 0' }}>
        <p className="marker">Not found</p>
        <h1>This case study doesn&rsquo;t exist.</h1>
        <Link to="/work" className="marker">← Back to work</Link>
      </div>
    )
  }

  return (
    <article className="container" style={{ padding: 'var(--space-9) 0', maxWidth: '880px' }}>
      <Link to="/work" className="marker">← Index</Link>
      <p className="marker" style={{ marginTop: 'var(--space-6)' }}>
        {cs.year} · {cs.role}
      </p>
      <h1 style={{ fontSize: 'var(--fs-display-l)', margin: 'var(--space-3) 0' }}>
        {cs.company} — {cs.headline}
      </h1>
      <p style={{ fontSize: 'var(--fs-body-l)', color: 'var(--ink-muted)', marginBottom: 'var(--space-7)' }}>
        {cs.hook}
      </p>

      <h2 style={{ fontSize: 'var(--fs-display-m)', marginTop: 'var(--space-7)' }}>Challenge</h2>
      <p style={{ marginTop: 'var(--space-3)' }}>{cs.challenge}</p>

      <h2 style={{ fontSize: 'var(--fs-display-m)', marginTop: 'var(--space-7)' }}>Approach</h2>
      <p style={{ marginTop: 'var(--space-3)' }}>{cs.approach}</p>

      <h2 style={{ fontSize: 'var(--fs-display-m)', marginTop: 'var(--space-7)' }}>Takeaway</h2>
      <p style={{ marginTop: 'var(--space-3)' }}>{cs.takeaway}</p>
    </article>
  )
}
