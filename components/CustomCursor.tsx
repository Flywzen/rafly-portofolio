'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { EASE_OUT, DURATION } from '@/lib/motion'

/**
 * Custom cursor: a small dot + a trailing square reticle, replacing the
 * native cursor on devices with a precise pointer. Two different jobs,
 * two different techniques, on purpose:
 *
 *  - POSITION is a per-frame value, not a tween — it's re-set 60 times a
 *    second by the mouse, so it's driven by a plain requestAnimationFrame
 *    lerp loop. Feeding that into anime.js would mean starting/cancelling
 *    an animation on every mousemove, fighting the engine instead of
 *    using it.
 *  - STATE CHANGES (hovering something interactive, hovering a project
 *    thumbnail) are discrete transitions with a clear before/after — the
 *    reticle's scale, rotation, and label opacity. That's exactly what
 *    anime.js is for, so those run through it.
 *
 * Elements opt in via `data-cursor="link"` (subtle grow) or
 * `data-cursor="view"` (reticle grows further and shows a "VIEW" label —
 * used on project thumbnails).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canHover || reduceMotion) return

    document.documentElement.classList.add('custom-cursor-active')

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Real cursor position (set every mousemove) vs. the lagging position
    // we actually render for the ring — the gap between the two is what
    // creates the trailing feel.
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...mouse }
    let rafId = 0

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`
    }

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
      rafId = requestAnimationFrame(tick)
    }

    let current: 'default' | 'link' | 'view' = 'default'

    const setState = (next: 'default' | 'link' | 'view') => {
      if (next === current) return
      current = next
      const scale = next === 'view' ? 2.6 : next === 'link' ? 1.5 : 1
      anime({
        targets: ring,
        scale,
        duration: DURATION.base,
        easing: EASE_OUT,
      })
      anime({
        targets: dot,
        scale: next === 'default' ? 1 : 0,
        duration: DURATION.fast,
        easing: EASE_OUT,
      })
      if (labelRef.current) {
        anime({
          targets: labelRef.current,
          opacity: next === 'view' ? 1 : 0,
          duration: DURATION.fast,
          easing: 'linear',
        })
      }
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-cursor="view"]')) return setState('view')
      if (target.closest('a, button, [role="button"]')) return setState('link')
      setState('default')
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <div aria-hidden="true" className="cursor-root pointer-events-none fixed inset-0 z-[100]">
      <div ref={dotRef} className="fixed left-0 top-0 w-1.5 h-1.5 bg-accent" style={{ willChange: 'transform' }} />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 w-9 h-9 border border-accent flex items-center justify-center"
        style={{ willChange: 'transform', transformOrigin: 'center' }}
      >
        <span ref={labelRef} className="font-mono text-[8px] tracking-widest text-accent opacity-0">
          VIEW
        </span>
      </div>
    </div>
  )
}
