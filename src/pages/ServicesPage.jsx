import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, serviceJsonLd } from '../lib/seo.js'

export default function ServicesPage() {
  useDocumentMeta({
    title: 'Services · Fan-Led Growth consulting · Laura Cordrey',
    description:
      'Strategic consulting for consumer, tech and gaming brands. Fan-led growth strategy, community, brand, product, and creator program design. Day rates and monthly retainers. Project pricing on a call.',
    canonical: pageUrl('services'),
    ogType: 'website',
    jsonLd: serviceJsonLd(),
  })

  return (
    <div className="container" style={{ padding: 'var(--space-9) 0', maxWidth: '880px' }}>
      <span className="marker">Services</span>
      <h1 style={{ fontSize: 'var(--fs-display-l)', margin: 'var(--space-3) 0 var(--space-7)' }}>
        What I do.
      </h1>
      <p style={{ fontSize: 'var(--fs-body-l)', color: 'var(--ink-muted)', marginBottom: 'var(--space-7)' }}>
        Placeholder — services overview. Retainer + day-rate language, no fixed tiers.
        Project pricing on a call.
      </p>
    </div>
  )
}
