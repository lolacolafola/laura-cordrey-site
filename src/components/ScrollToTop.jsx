import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scroll to the linked hash on navigation if present, otherwise jump to top.
// The hash target may not be mounted on the very first frame after a route
// change, so retry briefly until it appears (or give up after ~600ms).
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      // behavior: 'instant' overrides the global `html { scroll-behavior:
      // smooth }` (Layout.css). Without it, opening a new page ANIMATES the
      // scroll to the top, which reads as the current page scrolling rather
      // than a new page loading — genuinely confusing. The hash branch below
      // already jumps instantly, so this makes route resets consistent with it.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      return
    }
    const id = hash.slice(1)
    const start = Date.now()
    const tryScroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'instant', block: 'start' })
        // One more pass on the next frame in case layout shifted after the
        // initial scroll (lazy images, fonts, late-mounting sections).
        requestAnimationFrame(() => {
          const again = document.getElementById(id)
          if (again) again.scrollIntoView({ behavior: 'instant', block: 'start' })
        })
        return
      }
      if (Date.now() - start < 600) requestAnimationFrame(tryScroll)
    }
    tryScroll()
  }, [pathname, hash])
  return null
}
