import useDocumentMeta from '../hooks/useDocumentMeta.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function BlaBlaCarStorytellingPage() {
  useDocumentMeta({
    title: 'BlaBlaCar · Storytelling as growth · Laura Cordrey',
    description: 'How I built BlaBlaCar’s first-person storytelling system, real carpool moments over polished ads, rolled one brand across 22 markets, and grew acquisition organic-first to a €5 CAC.',
    canonical: '/case-studies/blablacar-storytelling',
  })
  return <CaseStudyCinematic study={getCinematicStudy('blablacar-storytelling')} />
}
