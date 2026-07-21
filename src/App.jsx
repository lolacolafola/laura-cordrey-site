import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Layout from './components/Layout.jsx'

// Passes the :slug through to the /work/:slug route. Renders null;
// the Navigate fires on mount so visitors see the destination page.
function CaseStudiesRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/work/${slug}`} replace />
}
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import HomePageV2 from './pages/HomePageV2.jsx'
import FanLedGrowthPage from './pages/FanLedGrowthPage.jsx'
import WorkPage from './pages/WorkPage.jsx'
import WorkArticle from './pages/WorkArticle.jsx'
import DeltaCompanyPage from './pages/DeltaCompanyPage.jsx'
import UsMobilePage from './pages/UsMobilePage.jsx'
import UbisoftSiegeChampionsPage from './pages/UbisoftSiegeChampionsPage.jsx'
import BlaBlaCarStorytellingPage from './pages/BlaBlaCarStorytellingPage.jsx'
import AzarusStreamersPage from './pages/AzarusStreamersPage.jsx'
import AzarusGameAdsPage from './pages/AzarusGameAdsPage.jsx'
import ClawMobilePage from './pages/ClawMobilePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import SpeakingPage from './pages/SpeakingPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import MethodologyPage from './pages/MethodologyPage.jsx'
import FanValueModelPage from './pages/FanValueModelPage.jsx'
import FanAuditPage from './pages/FanAuditPage.jsx'
import AIPage from './pages/AIPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FaqPage from './pages/FaqPage.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Lighter homepage rebuild, parked alongside the live one so both
              can be compared. Not in the nav, not in the sitemap (so the
              prerender skips it) and noindex'd at runtime. Decide later
              whether it replaces "/" — see
              content/copy/homepage-density-analysis.md. */}
          <Route path="/home-v2" element={<HomePageV2 />} />
          {/* Destination for "Fan-led growth", the first item in the
              simplified v2 nav. Carries the three education sections the v2
              homepage cut, verbatim. Preview only: noindex, absent from the
              sitemap. See content/copy/fan-led-growth-page-plan.md. */}
          <Route path="/fan-led-growth" element={<FanLedGrowthPage />} />
          <Route path="/work" element={<WorkPage />} />
          {/* Bespoke deep-dive case studies — explicit routes take precedence
              over the generic /work/:slug template. */}
          <Route path="/work/ubisoft-delta-company" element={<DeltaCompanyPage />} />
          <Route path="/work/us-mobile-dark-star" element={<UsMobilePage />} />
          <Route path="/work/ubisoft-siege-champions" element={<UbisoftSiegeChampionsPage />} />
          <Route path="/work/blablacar-storytelling" element={<BlaBlaCarStorytellingPage />} />
          <Route path="/work/azarus" element={<AzarusStreamersPage />} />
          <Route path="/work/azarus-game-ads" element={<AzarusGameAdsPage />} />
          <Route path="/work/claw-mobile" element={<ClawMobilePage />} />
          <Route path="/work/:slug" element={<WorkArticle />} />
          {/* Client-side redirect: old /case-studies* URLs kept working after
              the rename back to /work. Preserves external links + old share URLs. */}
          <Route path="/case-studies" element={<Navigate to="/work" replace />} />
          <Route path="/case-studies/:slug" element={<CaseStudiesRedirect />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          {/* Tools live at their branded slugs. */}
          <Route path="/fan-value" element={<FanValueModelPage />} />
          <Route path="/fan-score" element={<FanAuditPage />} />
          {/* Client-side redirects: old slugs kept working after the rename to
              the branded tool names. Netlify serves true 301s (public/_redirects);
              these cover the SPA fallback (GitHub Pages) + any in-app nav. */}
          <Route path="/fan-led-growth-audit" element={<Navigate to="/fan-score" replace />} />
          <Route path="/fan-led-growth-value-model" element={<Navigate to="/fan-value" replace />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </>
  )
}
