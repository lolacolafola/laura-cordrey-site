import useDocumentMeta from '../hooks/useDocumentMeta.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function AzarusGameAdsPage() {
  useDocumentMeta({
    title: 'Azarus · Gamified ad platform — Ubisoft, Logitech, acquired by Animoca · Laura Cordrey',
    description: 'I pivoted Azarus into a gamified ad platform: Ubisoft and Logitech as launch advertisers at $2 CPI, $AZA token launch, acquired by Animoca Brands in October 2023.',
    canonical: '/work/azarus-game-ads',
  })
  return <CaseStudyCinematic study={getCinematicStudy('azarus-game-ads')} />
}
