import { Link } from 'react-router-dom'

/* WorkCard — reusable visual card for a case study.
 *
 * Used on the HomePage (selected work grid) and the MethodologyPage
 * (see-it-in-practice grid). Pass the case study object from
 * src/data/caseStudies.js and a 1-based index for the [01]–[0N] marker.
 *
 * Styles live in src/pages/HomePage.css (.work-card, .work-card--light).
 */

export default function WorkCard({ caseStudy }) {
  const cs = caseStudy
  // Prefer cardImage (campaign visual) for the index grid. Fall back to the
  // article hero image. heroBackground only applies when the card is using
  // that hero image as a fallback — campaign images don't need the light mat.
  const cardSrc = cs.media?.cardImage || cs.media?.image
  const cardAlt = cs.media?.cardImageAlt || cs.media?.imageAlt
  const lightBg = !cs.media?.cardImage && cs.media?.heroBackground === 'white'

  return (
    <Link
      to={`/work/${cs.id}`}
      className={`work-card${lightBg ? ' work-card--light' : ''}`}
    >
      <div className="work-card__media">
        <img
          src={import.meta.env.BASE_URL + cardSrc}
          alt={cardAlt || `${cs.company} — ${cs.headline}`}
          loading="lazy"
        />
      </div>
      <div className="work-card__body">
        <div className="work-card__row">
          <span className="work-card__brand">{cs.company}</span>
          <span className="marker work-card__year">{cs.year}</span>
        </div>
        <p className="work-card__hook">{cs.hook}</p>
        <span className="work-card__view marker">
          Read the story <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}
