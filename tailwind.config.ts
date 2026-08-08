import type { Config } from 'tailwindcss'

/**
 * Design tokens — "Ink & Signal".
 *
 * Redesign from the previous pixel/CRT identity. Off-black ink background,
 * warm off-white text, one loud accent (signal lime) used exclusively for
 * primary actions and motion highlights, one warm accent (coral) reserved
 * for the same single job the old pixel-yellow had: "this is interactive /
 * this is now focused" — still one job per color.
 *
 * Radius is still 0 — that survives the redesign, it reads as precise and
 * intentional independent of any pixel theming. Shadows move from hard
 * black offsets to a soft directional glow in the accent color: signal,
 * not game-jam.
 *
 * Typography: Fraunces (variable, optical-size aware) carries display/
 * headings — it has weight and personality at large sizes. Inter carries
 * body copy — quiet, legible, gets out of the way. Geist Mono is kept for
 * tags, labels, and the logo mark, where a mono texture still earns its
 * place.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0A0C',
          raised: '#141417',
        },
        paper: '#F3F1EA',
        accent: {
          /** Signal lime — primary actions, links on hover, motion highlights. */
          DEFAULT: '#C9F31D',
          /** Ink-on-lime clears 4.5:1; this is what sits on top of the fill. */
          ink: '#0A0A0C',
          /** Inline text/link use on dark backgrounds — same hue, tuned for reading, not fills. */
          text: '#D7F157',
        },
        /**
         * Second accent, used for exactly one job: highlight/selection —
         * hover corner-marks, focus ring, the "Popular" tier. Not used for
         * arbitrary category color-coding.
         */
        signal: '#FF5A3C',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        /** Headings + display numerals only. */
        display: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xs: '0px',
        sm: '0px',
        md: '0px',
      },
      boxShadow: {
        signal: '0 6px 24px -4px rgba(201, 243, 29, 0.25)',
        'signal-sm': '0 2px 10px -2px rgba(201, 243, 29, 0.2)',
        'signal-press': 'none',
        ring: '0 0 0 1px rgba(243, 241, 234, 0.08)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
