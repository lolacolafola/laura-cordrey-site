import useDocumentMeta from '../hooks/useDocumentMeta.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function BlaBlaCarLiveNationPage() {
  useDocumentMeta({
    title: 'BlaBlaCar · Live Nation Official Ridesharing Partner · Laura Cordrey',
    description: 'I secured BlaBlaCar as Live Nation’s first Official Ridesharing Partner: 300+ branded parking spots and a community tent across Latitude, Leeds and Reading.',
    canonical: '/case-studies/blablacar-live-nation',
  })
  return <CaseStudyCinematic study={getCinematicStudy('blablacar-live-nation')} />
}
