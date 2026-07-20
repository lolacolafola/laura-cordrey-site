import useDocumentMeta from '../hooks/useDocumentMeta.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function BlaBlaCarStorytellingPage() {
  useDocumentMeta({
    title: 'BlaBlaCar · Storytelling as growth · Laura Cordrey',
    description: 'How I built BlaBlaCar’s storytelling system: real carpool moments over polished ads, one brand across 22 markets, acquisition organic-first to a €5 CAC.',
    canonical: '/work/blablacar-storytelling',
  })
  return <CaseStudyCinematic study={getCinematicStudy('blablacar-storytelling')} />
}
