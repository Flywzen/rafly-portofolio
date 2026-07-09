'use client'

import { m, useReducedMotion, type Variants } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const
const DISTANCE = 10
const DURATION = 0.4

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: DISTANCE },
  visible: { opacity: 1, y: 0 },
}

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Extra delay in seconds, for hand-placed sequencing outside a RevealGroup. */
  delay?: number
}

/** A single element that fades/rises into view once, the first time it crosses the viewport. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={itemVariants}
      transition={{ duration: reduceMotion ? 0 : DURATION, ease: EASE, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </m.div>
  )
}

interface RevealGroupProps {
  children: React.ReactNode
  className?: string
  /** Seconds between each child's start. */
  stagger?: number
}

/** Wraps a set of RevealItem children and staggers their entrance automatically. */
export function RevealGroup({ children, className, stagger = 0.08 }: RevealGroupProps) {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : stagger } },
      }}
    >
      {children}
    </m.div>
  )
}

/** One child of a RevealGroup. Must be a direct-ish descendant to inherit the stagger timing. */
export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <m.div
      className={className}
      variants={itemVariants}
      transition={{ duration: reduceMotion ? 0 : DURATION, ease: EASE }}
    >
      {children}
    </m.div>
  )
}
