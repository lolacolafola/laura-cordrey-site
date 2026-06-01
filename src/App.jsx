import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import HomePage from './pages/HomePage.jsx'
import WorkPage from './pages/WorkPage.jsx'
import WorkArticle from './pages/WorkArticle.jsx'
import DeltaCompanyPage from './pages/DeltaCompanyPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ServicesPage from './pages/ServicesPage.jsx'
import InsightsPage from './pages/InsightsPage.jsx'
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
          <Route path="/work/delta-company" element={<DeltaCompanyPage />} />
          <Route path="/work/:slug" element={<WorkArticle />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
        </Routes>
      </Layout>
    </>
  )
}
