'use client'

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { EASE_ELASTIC, DURATION } from '@/lib/motion'

/**
 * Four corner marks that snap in on hover or keyboard-focus of the parent,
 * an interaction cursor/reticle. Parent element needs `group relative` in
 * its className (this component listens on that parent directly, found
 * via the DOM at mount, so it still works without any group-hover CSS).
 *
 * Was CSS opacity transition pre-redesign (PixelCorners); now driven by
 * anime.js with a slight elastic overshoot on scale — the corners "snap
 * into place" rather than fade, a more deliberate, tactile cue.
 * mouseenter/focusin both trigger it: without the focus listener, keyboard
 * users tabbing through project cards get no equivalent signal that the
 * card is interactive.
 */
export default function SignalCorners() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cornersRef = useRef<HTMLSpanElement[]>([])

  const setCorner = (el: HTMLSpanElement | null) => {
    if (el && !cornersRef.current.includes(el)) cornersRef.current.push(el)
  }

  useEffect(() => {
    const parent = wrapperRef.current?.parentElement
    if (!parent) return

    const play = (show: boolean) => {
      anime({
        targets: cornersRef.current,
        opacity: show ? [0, 1] : [1, 0],
        scale: show ? [0.3, 1] : [1, 0.3],
        duration: show ? DURATION.base : DURATION.fast,
        easing: show ? EASE_ELASTIC : 'easeInQuad',
        delay: show ? anime.stagger(30) : 0,
      })
    }

    const onEnter = () => play(true)
    const onLeave = () => play(false)

    parent.addEventListener('mouseenter', onEnter)
    parent.addEventListener('mouseleave', onLeave)
    parent.addEventListener('focusin', onEnter)
    parent.addEventListener('focusout', onLeave)
    return () => {
      parent.removeEventListener('mouseenter', onEnter)
      parent.removeEventListener('mouseleave', onLeave)
      parent.removeEventListener('focusin', onEnter)
      parent.removeEventListener('focusout', onLeave)
    }
  }, [])

  const corner = 'absolute w-2 h-2 bg-accent opacity-0 pointer-events-none'

  return (
    <div ref={wrapperRef} className="contents">
      <span aria-hidden="true" ref={setCorner} className={`${corner} -top-[3px] -left-[3px]`} />
      <span aria-hidden="true" ref={setCorner} className={`${corner} -top-[3px] -right-[3px]`} />
      <span aria-hidden="true" ref={setCorner} className={`${corner} -bottom-[3px] -left-[3px]`} />
      <span aria-hidden="true" ref={setCorner} className={`${corner} -bottom-[3px] -right-[3px]`} />
    </div>
  )
}
