'use client'

import { useEffect, useRef, useState } from 'react'
import anime from 'animejs'
import { EASE_OUT } from '@/lib/motion'

/**
 * First-visit intro: a receding-perspective text crawl, black screen,
 * before the actual site is revealed underneath. Homage to the classic
 * opening-crawl *technique* (perspective tilt + slow scroll into the
 * distance) — the copy below is original, written for this site, not
 * Lucasfilm's text, and there's no "STAR WARS" wordmark or logo styling
 * here, just the scroll effect itself.
 *
 * Two layers, as requested: this component (full-screen, on top) and the
 * actual homepage underneath it, already mounted in the DOM the whole
 * time — nothing about the real page is delayed or refetched, this is
 * purely a visual layer that un-mounts itself.
 *
 * Runs once per browser tab (sessionStorage flag) so it doesn't get in
 * the way of someone re-reading the page or clicking between routes.
 * Skippable at any time. Skipped outright if the visitor has
 * prefers-reduced-motion on — a 25-second scrolling wall of text is
 * exactly the kind of motion that setting exists to opt out of.
 */

const CRAWL_KEY = 'rafly-intro-seen'
const CRAWL_DURATION = 22000

export default function IntroCrawl() {
  const [active, setActive] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const prologueRef = useRef<HTMLDivElement>(null)
  const crawlRef = useRef<HTMLDivElement>(null)
  const finished = useRef(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const seen = sessionStorage.getItem(CRAWL_KEY)
    if (reduceMotion || seen) return
    setActive(true)
    document.body.style.overflow = 'hidden'
  }, [])

  useEffect(() => {
    if (!active) return

    const finish = () => {
      if (finished.current) return
      finished.current = true
      sessionStorage.setItem(CRAWL_KEY, '1')
      anime({
        targets: overlayRef.current,
        opacity: [1, 0],
        duration: 700,
        easing: EASE_OUT,
        complete: () => {
          document.body.style.overflow = ''
          setActive(false)
        },
      })
    }

    const crawlState = { y: 115 }
    const applyCrawlTransform = () => {
      if (crawlRef.current) {
        crawlRef.current.style.transform = `translateY(${crawlState.y}%) rotateX(28deg)`
      }
    }
    applyCrawlTransform()

    const timeline = anime.timeline({ autoplay: true, complete: finish })
    timeline
      .add({ targets: prologueRef.current, opacity: [0, 1], duration: 1100, easing: EASE_OUT })
      .add({ targets: prologueRef.current, opacity: 1, duration: 1600 })
      .add({ targets: prologueRef.current, opacity: [1, 0], duration: 800, easing: EASE_OUT })
      .add({
        targets: crawlState,
        y: -640,
        duration: CRAWL_DURATION,
        easing: 'linear',
        update: applyCrawlTransform,
      })

    return () => {
      timeline.pause()
    }
  }, [active])

  if (!active) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[300] bg-ink flex items-center justify-center overflow-hidden"
      role="dialog"
      aria-label="Intro"
    >
      {/* Sparse starfield — a handful of fixed dots, not decoration-heavy. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(1.5px 1.5px at 20% 30%, rgba(243,241,234,0.6) 100%, transparent), radial-gradient(1.5px 1.5px at 65% 15%, rgba(243,241,234,0.4) 100%, transparent), radial-gradient(1px 1px at 80% 60%, rgba(243,241,234,0.5) 100%, transparent), radial-gradient(1px 1px at 40% 80%, rgba(243,241,234,0.35) 100%, transparent), radial-gradient(1.5px 1.5px at 90% 40%, rgba(243,241,234,0.5) 100%, transparent), radial-gradient(1px 1px at 10% 65%, rgba(243,241,234,0.3) 100%, transparent), radial-gradient(1px 1px at 55% 50%, rgba(201,243,29,0.4) 100%, transparent)',
        }}
      />

      {/* Prologue title card — fades in, holds, fades out before the crawl starts. */}
      <div
        ref={prologueRef}
        className="absolute px-6 text-center opacity-0"
        style={{ maxWidth: '560px' }}
      >
        <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-3">A long time in development&hellip;</p>
        <p className="font-display text-3xl sm:text-4xl text-paper italic">rafly.dev</p>
      </div>

      {/* Perspective crawl */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          perspective: '340px',
          perspectiveOrigin: '50% 100%',
          maskImage: 'linear-gradient(to top, black 55%, transparent 92%)',
          WebkitMaskImage: 'linear-gradient(to top, black 55%, transparent 92%)',
        }}
      >
        <div
          ref={crawlRef}
          className="absolute left-1/2 bottom-0 w-[86%] max-w-xl -translate-x-1/2 text-center font-display font-semibold text-accent leading-relaxed"
          style={{ transformOrigin: '50% 100%' }}
        >
          <p className="text-xl sm:text-2xl mb-8">EPISODE &infin; &mdash; STILL SHIPPING</p>
          <p className="text-base sm:text-lg mb-8">
            It is a period of continuous iteration. Small refactors and quiet bug
            fixes have secured the codebase against entropy, technical debt, and
            the occasional 2 a.m. regression.
          </p>
          <p className="text-base sm:text-lg mb-8">
            During the struggle, RAFLY, a software engineer, gathered scattered
            commits into a small fleet of real projects &mdash; each one shipped,
            each one a signal sent into the wider network.
          </p>
          <p className="text-base sm:text-lg mb-8">
            Pursued by deadlines and dark-pattern design, he now presents this
            page, carrying the case studies, the philosophy, and the plan that
            could bring clarity to your next build&hellip;
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          if (finished.current) return
          finished.current = true
          sessionStorage.setItem(CRAWL_KEY, '1')
          anime({
            targets: overlayRef.current,
            opacity: [1, 0],
            duration: 500,
            easing: EASE_OUT,
            complete: () => {
              document.body.style.overflow = ''
              setActive(false)
            },
          })
        }}
        className="absolute bottom-6 right-6 z-10 tag hover:text-paper hover:border-white/40 transition-colors"
      >
        Skip intro &rarr;
      </button>
    </div>
  )
}
