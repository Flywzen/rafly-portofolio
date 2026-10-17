'use client'

import { useState, useRef, useEffect } from 'react'
import anime from 'animejs'
import { EASE_OUT } from '@/lib/motion'

export default function IntroDoor() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const leftDoorRef = useRef<HTMLDivElement>(null)
  const rightDoorRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Lock body scroll when doors are closed
    if (!isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setIsHidden(true)
      return
    }

    const timeline = anime.timeline({
      easing: EASE_OUT,
      complete: () => setIsHidden(true),
    })

    timeline
      .add({
        targets: textRef.current,
        opacity: [1, 0],
        duration: 300,
      })
      .add(
        {
          targets: leftDoorRef.current,
          translateX: ['0%', '-100%'],
          duration: 1200,
        },
        '-=100'
      )
      .add(
        {
          targets: rightDoorRef.current,
          translateX: ['0%', '100%'],
          duration: 1200,
        },
        '-=1200'
      )
      .add(
        {
          targets: containerRef.current,
          scale: [1, 2],
          opacity: [1, 0],
          duration: 1000,
        },
        '-=800'
      )
  }

  if (isHidden) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex overflow-hidden cursor-pointer"
      onClick={handleOpen}
    >
      <div
        ref={leftDoorRef}
        className="w-1/2 h-full bg-zinc-950 border-r-2 border-zinc-800 relative shadow-[10px_0_30px_rgba(0,0,0,0.8)] z-10"
      >
        {/* Door details */}
        <div className="absolute top-1/2 right-8 w-4 h-16 bg-zinc-800 -translate-y-1/2 border-2 border-zinc-700 shadow-pixel" />
      </div>

      <div
        ref={rightDoorRef}
        className="w-1/2 h-full bg-zinc-950 border-l-2 border-zinc-800 relative shadow-[-10px_0_30px_rgba(0,0,0,0.8)] z-10"
      >
        <div className="absolute top-1/2 left-8 w-4 h-16 bg-zinc-800 -translate-y-1/2 border-2 border-zinc-700 shadow-pixel" />
      </div>

      <div
        ref={textRef}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <div className="surface p-6 bg-zinc-900 border-2 border-paper/20 shadow-pixel text-center animate-pulse">
          <span className="font-pixel text-xl sm:text-2xl text-paper tracking-widest">
            ENTER
          </span>
          <div className="font-mono text-paper/60 text-xs mt-2 uppercase tracking-widest">
            Click anywhere
          </div>
        </div>
      </div>
    </div>
  )
}
