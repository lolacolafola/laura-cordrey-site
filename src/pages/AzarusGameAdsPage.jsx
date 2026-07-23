import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, caseStudyJsonLdFor } from '../lib/seo.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function AzarusGameAdsPage() {
  useDocumentMeta({
    title: 'Azarus · Gamified ad platform · Laura Cordrey',
    description: 'I pivoted Azarus into a gamified ad platform: Ubisoft, Logitech as launch advertisers at $2 CPI, $AZA token launch, acquired by Animoca in Oct 2023.',
    canonical: pageUrl('work/azarus-game-ads'),
    // Article + Organization(client) + BreadcrumbList, derived from
    // src/data/caseStudies.js. See caseStudyJsonLdFor.
    jsonLd: caseStudyJsonLdFor('azarus-game-ads'),
  })
  return <CaseStudyCinematic study={getCinematicStudy('azarus-game-ads')} />
}
