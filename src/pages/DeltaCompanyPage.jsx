import useDocumentMeta from '../hooks/useDocumentMeta.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

// Cinematic Delta Company page. Body comes entirely from the shared
// component + data; keep your existing SEO meta here (adjust to match
// your real useDocumentMeta / jsonLd helpers).
export default function DeltaCompanyPage() {
  useDocumentMeta({
    title: 'Delta Company · A first-of-its-kind community program at Ubisoft · Laura Cordrey',
    description:
      'I designed and launched Delta Company at Ubisoft: 5 clusters, 14 languages, 130 invited members, 10M+ UGC views, unveiled live on the UbiE3 2019 stage. The blueprint Ubisoft replicated across franchises.',
    canonical: '/work/ubisoft-delta-company',
  })
  return <CaseStudyCinematic slug="ubisoft-delta-company" study={getCinematicStudy('ubisoft-delta-company')} />
}
