import { useEffect, useRef, useState } from 'react'
import './ArticleCarousel.css'

const BASE = import.meta.env.BASE_URL

/* ArticleCarousel — horizontal scroll-snap gallery for case study articles.
 *
 * - Each slide takes the full track width with scroll-snap alignment.
 * - Arrow buttons scroll prev/next.
 * - A small "01 / 04" counter tracks position.
 * - Manual scrolling also updates the counter (closest slide to track start).
 */

export default function ArticleCarousel({ items }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const count = items.length

  const scrollTo = (i) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.max(0, Math.min(count - 1, i))
    const slide = track.children[clamped]
    if (!slide) return
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: 'smooth',
    })
    setIndex(clamped)
  }

  // Keep counter in sync when the user scrolls manually.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = null
        const slideWidth = track.children[0]?.offsetWidth || 1
        const next = Math.round(track.scrollLeft / slideWidth)
        setIndex((prev) => (next === prev ? prev : next))
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [count])

  const currentCaption = items[index]?.caption || ''

  return (
    <div className="carousel">
      <div ref={trackRef} className="carousel__track" aria-roledescription="carousel">
        {items.map((g, i) => (
          <figure
            className="carousel__slide"
            key={i}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            <img src={BASE + g.src} alt={g.alt || ''} loading="lazy" />
          </figure>
        ))}
      </div>

      <div className="carousel__footer">
        <p className="carousel__caption" aria-live="polite">
          {currentCaption || ' '}
        </p>
        <div className="carousel__controls">
          <button
            type="button"
            className="carousel__nav"
            onClick={() => scrollTo(index - 1)}
            disabled={index === 0}
            aria-label="Previous image"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className="carousel__nav"
            onClick={() => scrollTo(index + 1)}
            disabled={index === count - 1}
            aria-label="Next image"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
