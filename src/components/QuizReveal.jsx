import { useEffect, useRef, useState } from 'react'
import './QuizReveal.css'

// Quiz-reveal transition, shared by both Fan Score editions (live + pre-launch).
// Plays once between the last answer and the next screen. Shows no score or
// verdict; that is the next page's job.
// Holds were 1000/1000/1800, so 3.8s before anyone saw anything. Halved: the
// reveal should sell the moment, not spend it.
//
// The phrases were "Starting the fan engine… / Vroom, vroom… / Ready for blast
// off!" — dropped 28 Jul 2026 at Laura's call. They mixed an engine with a
// rocket, "vroom, vroom" was a register that appears nowhere else on the site,
// and the whole thing played immediately after ten considered questions about
// someone's business and immediately before a verdict on it. "Starting the fan
// engine" was also a bare lowercase use of the Fan Engine™ mark.
//
// The pacing is kept exactly as it was — only the words are gone. One steady
// line now holds the slot, so the reveal still reads as work being done.
const REV_STEPS = [
  { pct: 22, hold: 500 },
  { pct: 60, hold: 500 },
  { pct: 100, hold: 900 },
]
// Hard ceiling: no matter what happens with the tick chain, onDone MUST fire
// within this window. Prevents users getting stranded on a stuck reveal.
const FAILSAFE_MS = 3000

const Sparkle = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.9z" />
  </svg>
)

export default function QuizReveal({ onDone }) {
  const [step, setStep] = useState(0)
  const doneRef = useRef(onDone)
  const firedRef = useRef(false)
  useEffect(() => { doneRef.current = onDone }, [onDone])

  const finish = () => {
    if (!firedRef.current) { firedRef.current = true; doneRef.current() }
  }

  useEffect(() => {
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish()
      return undefined
    }
    let i = 0
    let t
    const tick = () => {
      t = setTimeout(() => {
        if (i < REV_STEPS.length - 1) {
          i += 1
          setStep(i)
          tick()
        } else {
          finish()
        }
      }, REV_STEPS[i].hold)
    }
    tick()
    // Failsafe: no matter what happens above, force-advance after FAILSAFE_MS.
    const failsafe = setTimeout(finish, FAILSAFE_MS)
    return () => { clearTimeout(t); clearTimeout(failsafe) }
  }, [])

  const cur = REV_STEPS[step]
  return (
    <div className="qr-panel">
      <div className="qr-glow" aria-hidden="true" />
      <div className="qr-in">
        <div className="qr-fig"><Sparkle />The Fan Score</div>
        <div className="qr-stage" role="status" aria-live="polite">
          {/* No key={step}: the line no longer changes, so re-triggering the
              slide-up on every step would just make it twitch. */}
          <div className="qr-phrase">Reading what you told me</div>
          <div className="qr-bar"><i style={{ width: cur.pct + '%' }} /></div>
        </div>
        {/* Escape hatch — user always has something to click. Visible after a
            beat so it doesn't compete with the reveal on the happy path. */}
        <button type="button" className="qr-skip" onClick={finish}>
          Show my result <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
