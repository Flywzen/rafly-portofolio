'use client'

import { useId, useRef } from 'react'
import anime from 'animejs'
import { EASE_OUT, DURATION } from '@/lib/motion'

/**
 * Awwwards-style hover distortion: on mouse enter, an SVG feDisplacementMap
 * warps the content through a fractal-noise turbulence map, settles back
 * to flat, and the image scales in slightly under it — the classic
 * "liquid glitch reveal" seen on agency/portfolio sites.
 *
 * The displacement `scale` attribute isn't one anime.js recognizes by
 * name (it's an SVG filter primitive attribute, not a CSS property or a
 * transform), so it's tweened the explicit way: animate a plain JS number
 * and write it to the DOM ourselves in `update`. That's the reliable
 * pattern for animating anything anime.js doesn't have a built-in
 * shorthand for — CSS custom properties, canvas params, in this case an
 * SVG filter attribute — same engine, one extra line.
 */
export default function DistortImage({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode
  className?: string
} & React.HTMLAttributes<HTMLDivElement>) {
  const filterId = `distort-${useId().replace(/:/g, '')}`
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const state = useRef({ scale: 0 })

  const animateTo = (target: number, duration: number) => {
    anime({
      targets: state.current,
      scale: target,
      duration,
      easing: EASE_OUT,
      update: () => {
        displacementRef.current?.setAttribute('scale', String(state.current.scale))
      },
    })
    anime({
      targets: contentRef.current,
      scale: target > 0 ? 1.06 : 1,
      duration,
      easing: EASE_OUT,
    })
  }

  return (
    <div
      className={`relative overflow-hidden ${className ?? ''}`}
      onMouseEnter={() => animateTo(55, DURATION.slow)}
      onMouseLeave={() => animateTo(0, DURATION.base)}
      {...rest}
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves={2} seed={3} result="noise" />
            <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="noise" scale={0} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div ref={contentRef} style={{ filter: `url(#${filterId})`, willChange: 'transform' }} className="w-full h-full">
        {children}
      </div>
    </div>
  )
}
