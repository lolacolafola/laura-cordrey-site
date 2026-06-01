export default function AboutPage() {
  return (
    <div className="container" style={{ padding: 'var(--space-9) 0', maxWidth: '820px' }}>
      <span className="marker">About</span>
      <h1 style={{ fontSize: 'var(--fs-display-l)', margin: 'var(--space-3) 0 var(--space-7)' }}>
        About Laura.
      </h1>
      <p style={{ fontSize: 'var(--fs-body-l)', color: 'var(--ink-muted)' }}>
        Placeholder — bio goes here. First-person, direct, no corporate-speak.
        Cover: range across brand / product / community / growth · industries (consumer, tech, gaming) ·
        notable employers and projects · how you work · where you work · what you&rsquo;re known for.
      </p>
    </div>
  )
}
