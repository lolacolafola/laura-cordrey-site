import { useEffect, useRef, useState } from 'react'

/* Counter — animates 0 → value once the component scrolls into view.
 *
 * Props:
 *   value     — the target number (e.g. 100)
 *   prefix    — string before the number (e.g. '$', '€')
 *   suffix    — string after the number (e.g. 'M+', 'K', '%')
 *   duration  — ms; defaults to 1400
 *
 * Respects prefers-reduced-motion: snaps straight to the final value
 * without animation. Only fires once per page load (uses an
 * IntersectionObserver gated by a ref flag).
 */

export default function Counter({ value, prefix = '', suffix = '', duration = 1400 }) {
  const ref = useRef(null)
  const fired = useRef(false)
  // Default to the final value, not 0. If the observer never fires (an old
  // browser, a privacy setting, a prerender snapshot, or a headless viewer),
  // the correct number is shown rather than a stuck "0". When it does fire it
  // resets to 0 and counts up, the standard scroll-triggered pattern.
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reduced motion: leave the number at its default, which is already the
    // final value, so it never animates.
    if (reduced) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || fired.current) return
        fired.current = true

        const start = performance.now()
        const tick = (now) => {
          const elapsed = now - start
          const progress = Math.min(1, elapsed / duration)
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3)
          setDisplay(Math.round(value * eased))
          if (progress < 1) requestAnimationFrame(tick)
          else setDisplay(value)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
