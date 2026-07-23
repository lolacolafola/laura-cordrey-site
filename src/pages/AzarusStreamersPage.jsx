import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, caseStudyJsonLdFor } from '../lib/seo.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function AzarusStreamersPage() {
  useDocumentMeta({
    title: 'Azarus · Streamer-led growth · 500K viewers · Laura Cordrey',
    description: 'Title sponsorship of the first Streamer Awards plus an always-on creator engine: 500K peak viewers, 90% engagement, 20% converted to members on the spot.',
    canonical: pageUrl('work/azarus'),
    // Article + Organization(client) + BreadcrumbList, derived from
    // src/data/caseStudies.js. See caseStudyJsonLdFor.
    jsonLd: caseStudyJsonLdFor('azarus'),
  })
  return <CaseStudyCinematic study={getCinematicStudy('azarus')} />
}
