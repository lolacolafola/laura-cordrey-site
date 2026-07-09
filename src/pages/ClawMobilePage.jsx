import useDocumentMeta from '../hooks/useDocumentMeta.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function ClawMobilePage() {
  useDocumentMeta({
    title: 'Claw Mobile · a stunt brand campaign for US Mobile · Laura Cordrey',
    description: 'I produced “Claw Mobile” for US Mobile: a Mint Mobile parody with a fake Hugh Jackman. 55% of Meta viewers watched past 15 seconds, plus organic Reddit traction.',
    canonical: '/work/claw-mobile',
  })
  return <CaseStudyCinematic study={getCinematicStudy('claw-mobile')} />
}
