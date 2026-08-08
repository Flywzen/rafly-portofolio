'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import { EASE_OUT, DURATION } from '@/lib/motion'

interface ExpandPanelProps {
  /** Used for aria-controls / the panel's id. Must be unique on the page. */
  id: string
  /**
   * Pre-rendered trigger content for each state, not a render-prop function.
   * Server Components can pass JSX across to a Client Component like this
   * one, but not a function — so the caller renders both states up front
   * and ExpandPanel just picks which one is visible.
   */
  collapsedTrigger: React.ReactNode
  expandedTrigger: React.ReactNode
  triggerClassName?: string
  panelClassName?: string
  children: React.ReactNode
  defaultExpanded?: boolean
}

export default function ExpandPanel({
  id,
  collapsedTrigger,
  expandedTrigger,
  triggerClassName,
  panelClassName,
  children,
  defaultExpanded = false,
}: ExpandPanelProps) {
  const [expanded, setExpanded] = useState(defaultExpanded)
  const [rendered, setRendered] = useState(defaultExpanded)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (expanded) {
      setRendered(true)
      // Wait a frame so the panel has its natural content height to measure.
      requestAnimationFrame(() => {
        const target = panelRef.current
        if (!target) return
        const height = target.scrollHeight
        if (reduceMotion) {
          anime.set(target, { height, opacity: 1 })
          return
        }
        anime({
          targets: target,
          height: [0, height],
          opacity: [0, 1],
          duration: DURATION.base,
          easing: EASE_OUT,
          complete: () => {
            target.style.height = 'auto'
          },
        })
      })
    } else if (rendered) {
      const height = panel.scrollHeight
      if (reduceMotion) {
        anime.set(panel, { height: 0, opacity: 0 })
        setRendered(false)
        return
      }
      anime({
        targets: panel,
        height: [height, 0],
        opacity: [1, 0],
        duration: DURATION.base,
        easing: EASE_OUT,
        complete: () => setRendered(false),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded])

  return (
    <>
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        aria-expanded={expanded}
        aria-controls={id}
        className={triggerClassName}
      >
        {expanded ? expandedTrigger : collapsedTrigger}
      </button>
      {rendered && (
        <div id={id} ref={panelRef} className={panelClassName} style={{ height: 0, opacity: 0, overflow: 'hidden' }}>
          {children}
        </div>
      )}
    </>
  )
}
