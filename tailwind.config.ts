import type { Config } from 'tailwindcss'

/**
 * Design tokens — pixel-art reskin.
 *
 * Radius is 0 everywhere (blocky, no curves — that's the whole point).
 * Shadows are hard-edged offsets instead of blur (pixelShadow.*), the
 * classic "8-bit card" look. Two font families: pixelDisplay (Press Start
 * 2P) for headings/buttons/logo only — it's unreadable below ~12px, so it
 * never carries body text — and pixelBody (VT323) for everything else.
 * Geist Mono is kept for actual <code> blocks, where exact monospace
 * alignment matters more than the retro font.
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
        accent: {
          /** Solid fills (buttons). Tuned so white text clears 4.5:1. */
          DEFAULT: '#2F5FE0',
          /** Text/icons/links on dark backgrounds. Tuned so it clears 4.5:1 on zinc-950. */
          text: '#6B93FF',
        },
        /**
         * Second accent, used for exactly one job: highlight/selection —
         * hover corner-brackets, focus ring, the "Populer" tier. Not used
         * for arbitrary category color-coding; that's still one job per
         * color, same rule as the blue accent.
         */
        'pixel-yellow': '#F5D033',
      },
      fontFamily: {
        sans: ['var(--font-vt323)', 'monospace'],
        pixel: ['var(--font-press-start)', 'monospace'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xs: '0px',
        sm: '0px',
        md: '0px',
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(0,0,0,0.9)',
        'pixel-sm': '3px 3px 0 0 rgba(0,0,0,0.9)',
        'pixel-accent': '4px 4px 0 0 #2F5FE0',
        'pixel-press': '1px 1px 0 0 rgba(0,0,0,0.9)',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s steps(6) forwards',
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
