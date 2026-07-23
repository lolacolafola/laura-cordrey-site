import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function BlaBlaCarStorytellingPage() {
  useDocumentMeta({
    title: 'BlaBlaCar · Storytelling as growth · Laura Cordrey',
    description: 'How I built BlaBlaCar’s storytelling system: real carpool moments over polished ads, one brand across 22 markets, and paid acquisition down to a €5 CAC.',
    canonical: pageUrl('work/blablacar-storytelling'),
  })
  return <CaseStudyCinematic study={getCinematicStudy('blablacar-storytelling')} />
}
