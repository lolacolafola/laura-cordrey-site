import caseStudies from '../data/caseStudies.js'
import WorkCard from '../components/WorkCard.jsx'
import useDocumentMeta from '../hooks/useDocumentMeta.js'
import { pageUrl, workIndexJsonLd } from '../lib/seo.js'
import './HomePage.css' // shared .work-card / .work-grid / .section-head styles

export default function WorkPage() {
  useDocumentMeta({
    title: 'Selected work · Fan-led growth case studies · Laura Cordrey',
    description:
      'Selected case studies from twelve years of fan-led growth work — Ubisoft Delta Company, Siege Champions, US Mobile Dark Star, BlaBlaCar × Live Nation, Azarus, and Claw Mobile.',
    canonical: pageUrl('work'),
    ogType: 'website',
    jsonLd: workIndexJsonLd({ caseStudies }),
  })

  return (
    <section className="work">
      <div className="container">
        <div className="section-head">
          <span className="marker">Work · Selected · 2013–2026</span>
          <h1 className="section-head__title">The work.</h1>
          <p className="section-head__lede">
            A select few of my favorite work examples. Want to see your brand
            on here? <a href="https://calendly.com/laura-lcordrey/30min" target="_blank" rel="noreferrer" className="section-head__lede-link">Get in touch.</a>
          </p>
        </div>

        <div className="work-grid">
          {caseStudies.map((cs) => (
            <WorkCard key={cs.id} caseStudy={cs} slot="work" />
          ))}
        </div>
      </div>
    </section>
  )
}
