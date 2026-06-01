import caseStudies from '../data/caseStudies.js'
import WorkCard from '../components/WorkCard.jsx'
import './HomePage.css' // shared .work-card / .work-grid / .section-head styles

export default function WorkPage() {
  return (
    <section className="work">
      <div className="container">
        <div className="section-head">
          <span className="marker">Work · Selected · 2014 — 2026</span>
          <h1 className="section-head__title">The work.</h1>
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
