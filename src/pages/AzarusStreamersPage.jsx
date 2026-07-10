import useDocumentMeta from '../hooks/useDocumentMeta.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function AzarusStreamersPage() {
  useDocumentMeta({
    title: 'Azarus · Streamer-led growth · 500K viewers, 90% engagement · Laura Cordrey',
    description: 'Title sponsorship of the first Streamer Awards plus an always-on creator engine: 500K peak viewers, 90% engagement, 20% converted to members on the spot.',
    canonical: '/case-studies/azarus',
  })
  return <CaseStudyCinematic study={getCinematicStudy('azarus')} />
}
