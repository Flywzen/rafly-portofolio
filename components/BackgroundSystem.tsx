'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'

/**
 * Ambient background system.
 *
 * Fixed to the viewport (not the document), site-wide, and generic — this
 * is the "invisible design system" layer, not a personal statement. The
 * personal piece (a scroll-linked spiral, since Rafly picked "always
 * iterating, never truly finished" as the trait that describes him) lives
 * separately in HeroSection, deliberately visible. This layer stays quiet.
 *
 * Four layers, all in the ink/paper/signal palette (never spilling into
 * `signal` — the coral is reserved for hover/focus elsewhere), all flat
 * (no blur/glow, matching the hard-edge shadow language):
 *
 *  1. Coordinate grid — the idea of a canvas with units, not decoration.
 *  2. Structure — a sparse dependency graph whose edges draw themselves
 *     in, hold, fade, and redraw on a loop (pure CSS, see globals.css):
 *     the architecture is never "done."
 *  3. Flow — small particles actually travelling along those same edges
 *     and along two lanes at the bottom, continuously, at different
 *     speeds per path. This is the "data is moving through this system
 *     right now" layer, and it's the one piece of this component that
 *     needs anime.js rather than CSS: `anime.path()` samples x/y/angle
 *     along an SVG path at any progress value, which is exactly what a
 *     particle riding a bent, multi-segment line needs and what a CSS
 *     keyframe (a fixed set of percentage checkpoints) can't express for
 *     an arbitrary path shape.
 *
 * Client component (the previous version was server-rendered, pure CSS)
 * specifically because of layer 3's use of anime.js. prefers-reduced-
 * motion is checked before any anime.js call runs, same principle as
 * elsewhere in this project: reduced motion means genuinely still, not
 * just slower.
 */

interface FlowPath {
  id: string
  d: string
  particleCount: number
  duration: number
  color: string
  radius: number
}

const EDGE_PATHS: FlowPath[] = [
  { id: 'edge-1', d: 'M300,250 L700,200', particleCount: 2, duration: 3200, color: 'rgba(201,243,29,0.75)', radius: 2.5 },
  { id: 'edge-2', d: 'M700,200 L950,450', particleCount: 2, duration: 3600, color: 'rgba(201,243,29,0.75)', radius: 2.5 },
  { id: 'edge-3', d: 'M950,450 L500,600', particleCount: 2, duration: 4000, color: 'rgba(201,243,29,0.75)', radius: 2.5 },
  { id: 'edge-4', d: 'M500,600 L1250,550', particleCount: 3, duration: 5200, color: 'rgba(201,243,29,0.75)', radius: 2.5 },
]

const LANE_PATHS: FlowPath[] = [
  { id: 'lane-1', d: 'M0,740 L1600,740', particleCount: 4, duration: 9000, color: 'rgba(243,241,234,0.4)', radius: 1.8 },
  { id: 'lane-2', d: 'M0,820 L1600,820', particleCount: 5, duration: 11000, color: 'rgba(201,243,29,0.4)', radius: 1.8 },
]

const ALL_PATHS = [...EDGE_PATHS, ...LANE_PATHS]

export default function BackgroundSystem() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !svgRef.current) return

    const animations = ALL_PATHS.map(({ id, particleCount, duration }) => {
      const pathEl = svgRef.current!.querySelector<SVGPathElement>(`#${id}`)
      if (!pathEl) return null

      const path = anime.path(pathEl)
      const particles = svgRef.current!.querySelectorAll<SVGCircleElement>(`[data-flow="${id}"]`)

      return anime({
        targets: particles,
        translateX: path('x'),
        translateY: path('y'),
        easing: 'linear',
        duration,
        loop: true,
        // Spread particles evenly around the loop instead of bunched at
        // the start, so a path with N particles reads as a steady stream
        // rather than N dots taking turns.
        delay: anime.stagger(-duration / particleCount),
      })
    })

    return () => {
      animations.forEach((a) => a?.pause())
    }
  }, [])

  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Layer 1 — coordinate grid */}
      <div className="absolute inset-0 bg-ambient-grid" />

      <svg
        ref={svgRef}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Layer 2 — structure: self-drawing dependency graph (CSS-driven) */}
        <g stroke="rgba(243,241,234,0.14)" strokeWidth="1" fill="none">
          <line x1="300" y1="250" x2="700" y2="200" strokeDasharray="404" className="bg-draw-edge" style={{ ['--len' as string]: '404', animationDuration: '34s', animationDelay: '0s' }} />
          <line x1="700" y1="200" x2="950" y2="450" strokeDasharray="354" className="bg-draw-edge" style={{ ['--len' as string]: '354', animationDuration: '34s', animationDelay: '-8.5s' }} />
          <line x1="950" y1="450" x2="500" y2="600" strokeDasharray="475" className="bg-draw-edge" style={{ ['--len' as string]: '475', animationDuration: '34s', animationDelay: '-17s' }} />
          <line x1="500" y1="600" x2="1250" y2="550" strokeDasharray="752" className="bg-draw-edge" style={{ ['--len' as string]: '752', animationDuration: '34s', animationDelay: '-25.5s' }} />
        </g>

        <g stroke="rgba(201,243,29,0.6)" strokeWidth="1" fill="none">
          <rect x="685" y="185" width="30" height="30" className="bg-ripple" style={{ animationDuration: '34s', animationDelay: '0s' }} />
          <rect x="935" y="435" width="30" height="30" className="bg-ripple" style={{ animationDuration: '34s', animationDelay: '-8.5s' }} />
          <rect x="485" y="585" width="30" height="30" className="bg-ripple" style={{ animationDuration: '34s', animationDelay: '-17s' }} />
          <rect x="1235" y="535" width="30" height="30" className="bg-ripple" style={{ animationDuration: '34s', animationDelay: '-25.5s' }} />
        </g>

        <g fill="rgba(201,243,29,0.5)">
          <rect x="297" y="247" width="6" height="6" />
          <rect x="697" y="197" width="6" height="6" />
          <rect x="947" y="447" width="6" height="6" />
          <rect x="497" y="597" width="6" height="6" />
          <rect x="1247" y="547" width="6" height="6" />
        </g>

        {/* Lane guide lines, kept faint — the moving particles below are what reads, not this. */}
        <g stroke="rgba(243,241,234,0.03)" strokeWidth="1">
          <line x1="0" y1="740" x2="1600" y2="740" />
          <line x1="0" y1="820" x2="1600" y2="820" />
        </g>

        {/*
          Layer 3 — flow: hidden geometry paths (anime.path() reads these
          for x/y/angle) plus the visible particles that ride them. The
          <path> elements themselves are never painted (fill/stroke none).
        */}
        {ALL_PATHS.map(({ id, d }) => (
          <path key={id} id={id} d={d} fill="none" stroke="none" />
        ))}
        {ALL_PATHS.map(({ id, particleCount, color, radius }) =>
          Array.from({ length: particleCount }).map((_, i) => (
            <circle key={`${id}-${i}`} data-flow={id} r={radius} fill={color} cx={0} cy={0} />
          )),
        )}
      </svg>
    </div>
  )
}
