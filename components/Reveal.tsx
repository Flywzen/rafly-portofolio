'use client'

import { createContext, useContext, useEffect, useRef } from 'react'
import anime from 'animejs'
import { EASE_OUT, DURATION, REVEAL_DISTANCE } from '@/lib/motion'

/**
 * Scroll-triggered reveal, powered by anime.js + IntersectionObserver.
 *
 * Kept the same public API as the previous framer-motion version
 * (RevealGroup / RevealItem) on purpose: every section that already
 * consumes this (HeroSection, FeaturedProjects, CybersecuritySection, …)
 * needed zero changes when the animation engine underneath was swapped.
 *
 * RevealGroup registers its children via context and fires one
 * anime.timeline() with staggered targets once the group scrolls into
 * view — a single timeline reads as more coordinated than N independent
 * animations racing each other, and it's the anime.js-native way to do
 * what framer's `staggerChildren` did declaratively.
 */

const RevealGroupContext = createContext<{
  register: (el: HTMLElement) => void
} | null>(null)

interface RevealGroupProps {
  children: React.ReactNode
  className?: string
  /** Seconds between each child's start (kept in seconds for API parity; converted to ms internally). */
  stagger?: number
}

export function RevealGroup({ children, className, stagger = 0.08 }: RevealGroupProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLElement[]>([])
  const played = useRef(false)

  const register = (el: HTMLElement) => {
    if (!itemsRef.current.includes(el)) itemsRef.current.push(el)
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const play = () => {
      if (played.current) return
      played.current = true

      const targets = itemsRef.current
      if (reduceMotion) {
        anime.set(targets, { opacity: 1, translateY: 0 })
        return
      }

      anime
        .timeline({ easing: EASE_OUT })
        .add({
          targets,
          opacity: [0, 1],
          translateY: [REVEAL_DISTANCE, 0],
          scale: [0.95, 1],
          duration: DURATION.slow,
          delay: anime.stagger(stagger * 1000),
        })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play()
      },
      { threshold: 0, rootMargin: '-80px 0px -80px 0px' },
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [stagger])

  return (
    <div ref={containerRef} className={className}>
      <RevealGroupContext.Provider value={{ register }}>{children}</RevealGroupContext.Provider>
    </div>
  )
}

/**
 * One child of a RevealGroup. Rendered pre-hidden (same on server and
 * client, so no hydration flash) and registered with the parent timeline
 * on mount; the timeline animates it back to visible once in view.
 */
export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const ctx = useContext(RevealGroupContext)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && ctx) ctx.register(ref.current)
  }, [ctx])

  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: `translateY(${REVEAL_DISTANCE}px) scale(0.95)` }}>
      {children}
    </div>
  )
}
