import { useLayoutEffect, useRef, useState } from 'react'

/* AnimatedNumber — counts up once on mount, then tracks instantly.
 *
 * Props:
 *   value     — the target number
 *   format    — (n) => string, applied to every frame (e.g. the calculator's fmtK)
 *   duration  — ms; defaults to 900
 *
 * Deliberately NOT the existing Counter component, which is wrong here on two
 * counts: it renders `prefix + rounded integer + suffix` so it cannot apply a
 * formatter, and it fires once on scroll and then ignores every later change to
 * `value`. This one is driven by sliders, so it has to follow them.
 *
 * The split matters: a count-up on first render sells the number, but a
 * count-up on every drag would make the sliders feel broken and laggy. So the
 * animation happens exactly once, and every change after that is immediate.
 *
 * `anim` is the whole design. It holds the in-flight animated value, or null
 * for "not animating, just show the real one". That gives the instant tracking
 * for free: once the count-up finishes, anim is null forever and every later
 * render reads `value` directly, with no effect involved. It also keeps the
 * decision to animate in the initial state, not in an effect — resetting to 0
 * from inside an effect would flash the final value first and cascade a second
 * render.
 *
 * Two environments must never see the animation, and both are load-bearing:
 *
 * - The prerenderer. scripts/prerender.mjs snapshots 600ms after load and this
 *   runs for 900ms, so an animating number would bake a half-counted figure
 *   into the static HTML that search and answer engines read. The calculator's
 *   $562K default backs a claim made on the homepage, so a wrong number there
 *   is an error, not a cosmetic slip. prerender.mjs already strips scroll-reveal
 *   state for the same reason: transient animation state must not be serialised.
 * - prefers-reduced-motion.
 */
function shouldAnimate() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  // navigator.webdriver is true under Playwright, which drives prerender.mjs.
  if (typeof navigator !== 'undefined' && navigator.webdriver) return false
  return true
}

export default function AnimatedNumber({ value, format = (n) => String(n), duration = 900 }) {
  const [anim, setAnim] = useState(() => (shouldAnimate() ? 0 : null))
  const frame = useRef(0)

  useLayoutEffect(() => {
    if (anim === null) return undefined
    // No "already started" ref here. StrictMode double-invokes effects in dev,
    // and a ref guard made the second run bail out after the first run's
    // cleanup had already cancelled the frame and the failsafe — leaving
    // nothing scheduled and the number stuck on "$0". The cleanup below is
    // complete, so re-running is safe and is the point of the double-invoke.
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic, matching Counter
      if (p < 1) {
        setAnim(value * eased)
        frame.current = requestAnimationFrame(tick)
      } else {
        setAnim(null) // hand back to `value`, and track it from here on
      }
    }
    frame.current = requestAnimationFrame(tick)

    // Failsafe, the same idea as QuizReveal's FAILSAFE_MS. requestAnimationFrame
    // does not run at all in a hidden tab — verified: zero frames in three
    // seconds — so a page opened in a background tab would otherwise sit on "$0"
    // until it was focused. setTimeout still fires when hidden.
    const failsafe = setTimeout(() => setAnim(null), duration + 400)
    return () => {
      cancelAnimationFrame(frame.current)
      clearTimeout(failsafe)
    }
    // Runs once. Later `value` changes are picked up by the render below,
    // which reads `value` directly as soon as anim is null.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{format(anim === null ? value : anim)}</>
}
