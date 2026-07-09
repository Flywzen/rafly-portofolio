'use client'

import { LazyMotion, domAnimation } from 'framer-motion'

/**
 * Loads framer-motion's domAnimation feature set instead of the full
 * `motion` bundle. We only use fade/slide, viewport detection, and explicit
 * height animation (not framer's automatic layout diffing or drag), so
 * domAnimation covers everything components/Reveal.tsx and ProjectCard.tsx
 * need at roughly half the bundle cost.
 *
 * `strict` throws if any component imports `motion.div` instead of `m.div`
 * — a guardrail so a future addition can't silently pull in the full bundle.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
