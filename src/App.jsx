import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import Layout from './components/Layout.jsx'

// Passes the :slug through to the new /case-studies/:slug route. Renders null;
// the Navigate fires on mount so visitors see the destination page.
function WorkRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/case-studies/${slug}`} replace />
}
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
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
          <Route path="/case-studies" element={<WorkPage />} />
          {/* Bespoke deep-dive case studies — explicit routes take precedence
              over the generic /case-studies/:slug template. */}
          <Route path="/case-studies/ubisoft-delta-company" element={<DeltaCompanyPage />} />
          <Route path="/case-studies/us-mobile-dark-star" element={<UsMobilePage />} />
          <Route path="/case-studies/ubisoft-siege-champions" element={<UbisoftSiegeChampionsPage />} />
          <Route path="/case-studies/blablacar-storytelling" element={<BlaBlaCarStorytellingPage />} />
          <Route path="/case-studies/azarus" element={<AzarusStreamersPage />} />
          <Route path="/case-studies/azarus-game-ads" element={<AzarusGameAdsPage />} />
          <Route path="/case-studies/claw-mobile" element={<ClawMobilePage />} />
          <Route path="/case-studies/:slug" element={<WorkArticle />} />
          {/* Client-side redirect: old /work* URLs kept working after the
              rename to /case-studies. Preserves external links + old share URLs. */}
          <Route path="/work" element={<Navigate to="/case-studies" replace />} />
          <Route path="/work/:slug" element={<WorkRedirect />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/fan-led-growth-value-model" element={<FanValueModelPage />} />
          <Route path="/fan-led-growth-audit" element={<FanAuditPage />} />
          <Route path="/ai" element={<AIPage />} />
          <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </>
  )
}
