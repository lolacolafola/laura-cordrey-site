import { useEffect, useRef } from 'react'
import './FlywheelDiagram.css'

const stages = [
  { id: 'activation', number: '01', title: 'Activation', description: 'The hook that sticks', angle: -90 },
  { id: 'habit',      number: '02', title: 'Habit',      description: 'Loops that compound', angle: -18 },
  { id: 'belonging',  number: '03', title: 'Belonging',  description: 'Moments that bond',   angle: 54  },
  { id: 'identity',   number: '04', title: 'Identity',   description: 'Where UGC is born',   angle: 126 },
  { id: 'advocacy',   number: '05', title: 'Advocacy',   description: 'Fans become growth',  angle: 198 },
]

const CX = 220
const CY = 220
const ORBIT = 145
const NODE_W = 88
const NODE_H = 60
const DURATION = 8000 // ms per revolution

// Each node's position on the SVG circle path (0–100, clockwise from 3 o'clock)
// position = angle / 360 * 100, where angle is measured clockwise from rightmost
// Our angles use standard math convention, so we convert: pathPos = (angle % 360 + 360) % 360 / 360 * 100
const stagesWithPos = stages.map(s => ({
  ...s,
  pathPos: ((s.angle % 360) + 360) % 360 / 360 * 100,
}))

function toRad(deg) { return (deg * Math.PI) / 180 }

function nodePos(angleDeg) {
  const r = toRad(angleDeg)
  return { x: CX + ORBIT * Math.cos(r), y: CY + ORBIT * Math.sin(r) }
}

function StageNode({ stage, nodeRef }) {
  const pos = nodePos(stage.angle)
  const x = pos.x - NODE_W / 2
  const y = pos.y - NODE_H / 2
  return (
    <g ref={nodeRef} className={`flywheel-node-group`} transform={`translate(${x}, ${y})`}>
      <g className="flywheel-node">
        <rect className="flywheel-node-card" width={NODE_W} height={NODE_H} rx="10" />
        <text className="flywheel-node-number" x={NODE_W / 2} y="20" textAnchor="middle">{stage.number}</text>
        <text className="flywheel-node-title" x={NODE_W / 2} y="40" textAnchor="middle">{stage.title}</text>
      </g>
    </g>
  )
}

export default function FlywheelDiagram() {
  const glowRef = useRef(null)
  const nodeRefs = useRef(stagesWithPos.map(() => ({ current: null })))

  useEffect(() => {
    const glowEl = glowRef.current
    if (!glowEl) return
    let startTime = null
    let raf

    function animate(ts) {
      if (!startTime) startTime = ts
      const elapsed = ts - startTime
      const progress = (elapsed % DURATION) / DURATION

      // Comet: dashoffset 100→0 moves dash forward (clockwise) on SVG circle
      const offset = 100 - progress * 100
      glowEl.setAttribute('stroke-dashoffset', offset)

      // Comet's centre position on path (0–100, clockwise from 3 o'clock)
      // position = pathLength - offset (since positive dashoffset shifts pattern backward)
      const cometPos = (100 - offset + 8) % 100

      // Glow each node based on how close the comet is to it
      stagesWithPos.forEach((stage, i) => {
        const el = nodeRefs.current[i]?.current
        if (!el) return
        // Angular distance on the circle (handles wrap-around)
        let dist = Math.abs(cometPos - stage.pathPos)
        if (dist > 50) dist = 100 - dist
        // Glow window: full glow within 8 units, fades to nothing at 18 units
        const intensity = Math.max(0, 1 - Math.max(0, dist - 8) / 10)
        if (intensity > 0) {
          const a1 = intensity.toFixed(2)
          const a2 = (intensity * 0.5).toFixed(2)
          el.style.filter = `drop-shadow(0 0 ${12 * intensity}px rgba(200,54,43,${a1})) drop-shadow(0 0 ${24 * intensity}px rgba(200,54,43,${a2}))`
        } else {
          el.style.filter = 'none'
        }
      })

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className="flywheel-diagram-container">
      <svg viewBox="0 0 440 440" className="flywheel-svg-clean">
        <defs>
          <radialGradient id="orbit-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#C8362B" stopOpacity="0.18" />
            <stop offset="60%"  stopColor="#C8362B" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#C8362B" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="center-fill" cx="50%" cy="50%" r="65%">
            <stop offset="0%"   stopColor="#0E0B09" />
            <stop offset="65%"  stopColor="#1F1A17" />
            <stop offset="100%" stopColor="#8E2520" />
          </radialGradient>
        </defs>

        <circle cx={CX} cy={CY} r={ORBIT} fill="url(#orbit-fill)" stroke="none" />
        <circle cx={CX} cy={CY} r={ORBIT} className="flywheel-orbit-base" />
        <circle ref={glowRef} cx={CX} cy={CY} r={ORBIT} pathLength="100" className="flywheel-orbit-glow" strokeDashoffset="100" />

        <g className="flywheel-center">
          <circle className="flywheel-center-circle" cx={CX} cy={CY} r="70" style={{ fill: 'url(#center-fill)' }} />
          <text className="flywheel-center-label" x={CX} y={CY - 8}>FANDOM</text>
          <text className="flywheel-center-title" x={CX} y={CY + 16}>Flywheel</text>
        </g>

        {stagesWithPos.map((s, i) => (
          <StageNode key={s.id} stage={s} nodeRef={nodeRefs.current[i]} />
        ))}
      </svg>
    </div>
  )
}
