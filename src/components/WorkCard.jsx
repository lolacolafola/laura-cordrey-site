import { Link } from 'react-router-dom'

/* WorkCard — reusable visual card for a case study.
 *
 * Used on the HomePage (selected work grid), the /work index, and any
 * other place we want to surface a case study as a clickable thumbnail.
 *
 * Image resolution cascade (most → least specific):
 *   1. media[`${slot}Image`]   — page-specific override (workImage, etc.)
 *   2. media.cardImage         — general card thumbnail
 *   3. media.image             — article hero (final fallback)
 *
 * Pass `slot="work"` on the /work index, `slot="card"` on the homepage,
 * or omit slot to just cascade through cardImage → image. Per-slot alt
 * text follows the same cascade via `${slot}ImageAlt`.
 *
 * Styles live in src/pages/HomePage.css (.work-card, .work-card--light).
 */

export default function WorkCard({ caseStudy, slot }) {
  const cs = caseStudy
  const m = cs.media || {}

  const slotImage = slot ? m[`${slot}Image`] : null
  const slotAlt   = slot ? m[`${slot}ImageAlt`] : null

  const cardSrc = slotImage || m.cardImage || m.image
  const cardAlt = slotAlt || m.cardImageAlt || m.imageAlt

  // Light mat (heroBackground:'white') only applies when no thumbnail
  // override is in play — i.e. when we're rendering the original article
  // hero logo banner on the card.
  const usingOriginalImage = !slotImage && !m.cardImage
  const lightBg = usingOriginalImage && m.heroBackground === 'white'

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
