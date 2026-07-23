import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

export default function UbisoftSiegeChampionsPage() {
  useDocumentMeta({
    title: 'Ubisoft · Siege Champions · 50M+ UGC views · Laura Cordrey',
    description: 'I scaled Ubisoft’s advocacy model into an invite-only creator program for Rainbow Six Siege: 200 members, 18 markets, 50M+ UGC views in year one, zero spend.',
    canonical: pageUrl('work/ubisoft-siege-champions'),
  })
  return <CaseStudyCinematic study={getCinematicStudy('ubisoft-siege-champions')} />
}
