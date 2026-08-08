'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * SignatureSpiral — the one deliberately-visible piece in this system.
 *
 * Everything in BackgroundSystem is generic and meant to go unnoticed.
 * This is the opposite on purpose: a personal signature, not atmosphere.
 * Rafly picked "always iterating, never truly finished" as the trait
 * that describes him as a developer — a spiral fits that literally, not
 * just decoratively: it has no closing point by construction, and how
 * much of it you see is tied to how far you've scrolled through the
 * portfolio, so it never presents itself as "complete" either.
 *
 * Scroll drives the number of visible coils (more of the page seen, more
 * of the spiral revealed). Dragging independently rotates the whole
 * shape — a small tactile extra, layered on top rather than replacing
 * the scroll link.
 *
 * Hidden below `lg` — this is a hero flourish, not something worth
 * fighting for space with the headline on a phone screen.
 */

const CX = 200
const CY = 200
const MIN_TURNS = 1.4
const MAX_TURNS = 5.6
const MID_TURNS = (MIN_TURNS + MAX_TURNS) / 2

function spiralPath(turns: number) {
  const steps = 220
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * turns * Math.PI * 2
    const r = 6 + (i / steps) * 26 * turns
    const x = CX + r * Math.cos(angle)
    const y = CY + r * Math.sin(angle)
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ',' + y.toFixed(1) + ' '
  }
  return d
}

export default function SignatureSpiral() {
  const pathRef = useRef<SVGPathElement>(null)
  const groupRef = useRef<SVGGElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const rotation = useRef(0)
  const dragging = useRef(false)
  const lastX = useRef(0)
  const ticking = useRef(false)
  const [reduced, setReduced] = useState(false)

  // Respect prefers-reduced-motion: no scroll-linked redraw, no breathing
  // opacity, just a static spiral sitting at a fixed, representative turn
  // count. Dragging still works — it's a discrete user action, not
  // autoplaying motion.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
  }, [])

  useEffect(() => {
    if (reduced) {
      pathRef.current?.setAttribute('d', spiralPath(MID_TURNS))
      return
    }

    const updateFromScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      pathRef.current?.setAttribute('d', spiralPath(MIN_TURNS + progress * (MAX_TURNS - MIN_TURNS)))
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(updateFromScroll)
      }
    }

    updateFromScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduced])

  useEffect(() => {
    const wrap = wrapRef.current
    const group = groupRef.current
    if (!wrap || !group) return

    const onPointerDown = (e: PointerEvent) => {
      dragging.current = true
      lastX.current = e.clientX
      wrap.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return
      rotation.current += (e.clientX - lastX.current) * 0.5
      group.style.transform = `rotate(${rotation.current}deg)`
      lastX.current = e.clientX
    }
    const onPointerUp = () => {
      dragging.current = false
    }

    wrap.addEventListener('pointerdown', onPointerDown)
    wrap.addEventListener('pointermove', onPointerMove)
    wrap.addEventListener('pointerup', onPointerUp)
    wrap.addEventListener('pointerleave', onPointerUp)
    return () => {
      wrap.removeEventListener('pointerdown', onPointerDown)
      wrap.removeEventListener('pointermove', onPointerMove)
      wrap.removeEventListener('pointerup', onPointerUp)
      wrap.removeEventListener('pointerleave', onPointerUp)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 xl:w-80 xl:h-80 cursor-grab active:cursor-grabbing touch-none select-none"
    >
      <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
        <g ref={groupRef} style={{ transformOrigin: '200px 200px' }}>
          <path
            ref={pathRef}
            className={reduced ? undefined : 'signature-spiral-breathe'}
            stroke="rgba(243,241,234,0.28)"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}
