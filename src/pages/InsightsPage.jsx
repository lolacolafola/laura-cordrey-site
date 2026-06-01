export default function InsightsPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-9) 0', maxWidth: '880px' }}>
      <span className="marker">Insights</span>
      <h1 style={{ fontSize: 'var(--fs-display-l)', margin: 'var(--space-3) 0 var(--space-7)' }}>
        Insights.
      </h1>
      <p style={{ fontSize: 'var(--fs-body-l)', color: 'var(--ink-muted)' }}>
        Placeholder — MDX-driven blog index. Posts live in <code>/content/insights/*.mdx</code>.
        First-class blog (this is what was missing in the Framer build).
      </p>
    </div>
  )
}
