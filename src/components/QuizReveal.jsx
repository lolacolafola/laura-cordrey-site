import { useEffect, useRef, useState } from 'react'
import './QuizReveal.css'

// Quiz-reveal transition, shared by both Fan Score editions (live + pre-launch).
// Plays once between the last answer and the next screen. Shows no score or
// verdict; that is the next page's job.
const REV_PHRASES = [
  { text: 'Starting the fan engine…', pct: 22, hold: 1000 },
  { text: 'Vroom, vroom…', pct: 60, hold: 1000 },
  { text: 'Ready for blast off!', pct: 100, hold: 1800 },
]
// Hard ceiling: no matter what happens with the tick chain, onDone MUST fire
// within this window. Prevents users getting stranded on a stuck reveal.
const FAILSAFE_MS = 5000

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
        if (i < REV_PHRASES.length - 1) {
          i += 1
          setStep(i)
          tick()
        } else {
          finish()
        }
      }, REV_PHRASES[i].hold)
    }
    tick()
    // Failsafe: no matter what happens above, force-advance after FAILSAFE_MS.
    const failsafe = setTimeout(finish, FAILSAFE_MS)
    return () => { clearTimeout(t); clearTimeout(failsafe) }
  }, [])

  const cur = REV_PHRASES[step]
  return (
    <div className="qr-panel">
      <div className="qr-glow" aria-hidden="true" />
      <div className="qr-in">
        <div className="qr-fig"><Sparkle />The Fan Score</div>
        <div className="qr-stage" role="status" aria-live="polite">
          <div className="qr-phrase" key={step}>{cur.text}</div>
          <div className="qr-sub">Reading what you told us</div>
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
