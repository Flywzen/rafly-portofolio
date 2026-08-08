/**
 * Motion tokens — the one place easing curves and durations are defined.
 * Nothing in components/ should hardcode a bezier curve or a duration;
 * import from here instead, same discipline as color/spacing tokens in
 * tailwind.config.ts.
 *
 * Durations are in milliseconds (anime.js's native unit), not seconds.
 *
 *  - EASE_OUT: entrances (reveal, expand). Fast start, gentle settle.
 *  - EASE_ELASTIC: hover/focus micro-interactions (corner marks). A touch
 *    of overshoot reads as tactile, not floaty.
 */

export const EASE_OUT = 'cubicBezier(0.16, 1, 0.3, 1)'
export const EASE_ELASTIC = 'easeOutElastic(1, 0.6)'

export const DURATION = {
  fast: 150,
  base: 350,
  slow: 550,
} as const

/** Standard scroll-reveal distance in px. One value, everywhere. */
export const REVEAL_DISTANCE = 22
