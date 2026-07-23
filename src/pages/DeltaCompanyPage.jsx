import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl } from '../lib/seo.js'
import CaseStudyCinematic from '../components/CaseStudyCinematic.jsx'
import { getCinematicStudy } from '../data/caseStudiesCinematic.js'

// Cinematic Delta Company page. Body comes entirely from the shared
// component + data; keep your existing SEO meta here (adjust to match
// your real useDocumentMeta / jsonLd helpers).
export default function DeltaCompanyPage() {
  useDocumentMeta({
    title: 'Delta Company · Ubisoft community program · Laura Cordrey',
    description:
      'I designed Delta Company at Ubisoft: 5 clusters, 14 languages, 130 invited members, 10M+ UGC views, unveiled at UbiE3 2019, replicated across franchises.',
    canonical: pageUrl('work/ubisoft-delta-company'),
  })
  return <CaseStudyCinematic slug="ubisoft-delta-company" study={getCinematicStudy('ubisoft-delta-company')} />
}
