import { Link } from 'react-router-dom'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import '../styles/shared.css'

// Catch-all for /case-studies/:slug.
//
// Every case study has its own cinematic route in App.jsx, so a slug only
// reaches this component when it matches no study at all. This used to render
// a generic article template as a fallback; that path became unreachable once
// the last study (BlaBlaCar) got a cinematic page, so it's gone.
//
// Adding a new study means adding a cinematic entry in caseStudiesCinematic.js
// plus a route — there is no generic fallback to land on any more.
export default function WorkArticle() {
  useDocumentMeta({ title: 'Case study not found' })

  return (
    <div className="container" style={{ padding: 'var(--space-9) 0' }}>
      <p className="marker">404 · Not found</p>
      <h1 style={{ fontSize: 'var(--fs-display-l)', margin: 'var(--space-3) 0' }}>
        This case study doesn&rsquo;t exist.
      </h1>
      <Link to="/case-studies" className="marker">← All Case Studies</Link>
    </div>
  )
}
