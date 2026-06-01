import { Link } from 'react-router-dom'

/* WorkCard — reusable visual card for a case study.
 *
 * Used on the HomePage (selected work grid) and the MethodologyPage
 * (see-it-in-practice grid). Pass the case study object from
 * src/data/caseStudies.js and a 1-based index for the [01]–[0N] marker.
 *
 * Styles live in src/pages/HomePage.css (.work-card, .work-card--light).
 */

export default function WorkCard({ caseStudy, index }) {
  const cs = caseStudy
  const lightBg = cs.media?.heroBackground === 'white'
  const num = String(index + 1).padStart(2, '0')

  return (
    <Link
      to={`/work/${cs.id}`}
      className={`work-card${lightBg ? ' work-card--light' : ''}`}
    >
      <div className="work-card__media">
        <img
          src={import.meta.env.BASE_URL + cs.media.image}
          alt={cs.media.imageAlt || `${cs.company} — ${cs.headline}`}
          loading="lazy"
        />
        <span className="work-card__num marker">[{num}]</span>
      </div>
      <div className="work-card__body">
        <div className="work-card__row">
          <span className="work-card__brand">{cs.company}</span>
          <span className="marker work-card__year">{cs.year}</span>
        </div>
        <h3 className="work-card__headline">{cs.headline}</h3>
        <p className="work-card__hook">{cs.hook}</p>
        <span className="work-card__view marker">
          Read the story <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}
