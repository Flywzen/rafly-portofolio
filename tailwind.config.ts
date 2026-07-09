import type { Config } from 'tailwindcss'

/**
 * Design tokens.
 *
 * One accent color. Neutrals come from Tailwind's built-in zinc scale
 * (near-black / near-white, never pure #000 or #fff). Radius is a documented
 * three-step scale: xs for tags, sm for interactive controls, md for
 * containers. See globals.css for how these compose into components.
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
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '12px',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
}

export default config
