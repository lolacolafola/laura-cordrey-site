import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import WorkPage from './pages/WorkPage.jsx'
import WorkArticle from './pages/WorkArticle.jsx'
import DeltaCompanyPage from './pages/DeltaCompanyPage.jsx'
import UsMobilePage from './pages/UsMobilePage.jsx'
import UbisoftSiegeChampionsPage from './pages/UbisoftSiegeChampionsPage.jsx'
import BlaBlaCarLiveNationPage from './pages/BlaBlaCarLiveNationPage.jsx'
import AzarusStreamersPage from './pages/AzarusStreamersPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import MethodologyPage from './pages/MethodologyPage.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          {/* Bespoke deep-dive case studies — explicit routes take precedence
              over the generic /work/:slug template. */}
          <Route path="/work/ubisoft-delta-company" element={<DeltaCompanyPage />} />
          <Route path="/work/us-mobile-dark-star" element={<UsMobilePage />} />
          <Route path="/work/ubisoft-siege-champions" element={<UbisoftSiegeChampionsPage />} />
          <Route path="/work/blablacar-live-nation" element={<BlaBlaCarLiveNationPage />} />
          <Route path="/work/azarus" element={<AzarusStreamersPage />} />
          <Route path="/work/:slug" element={<WorkArticle />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
        </Routes>
      </Layout>
    </>
  )
}
