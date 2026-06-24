import useDocumentMeta from '../hooks/useDocumentMeta.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function UsMobilePage() {
  useDocumentMeta({
    title: 'US Mobile · Dark Star — $32K in under three hours · Laura Cordrey',
    description: 'I turned US Mobile’s free SIM kit into a $129 limited-edition Dark Star fan bundle — $32K revenue in under three hours, sold out, CAC down 38%.',
    canonical: '/work/us-mobile-dark-star',
  })
  return <CaseStudyCinematic study={getCinematicStudy('us-mobile-dark-star')} />
}
