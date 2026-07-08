import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base:     '#060B14',
        surface:  '#0D1528',
        card:     '#111827',
        'card-h': '#162035',
        gold:     '#C9A227',
        'gold-l': '#E8C84A',
        'gold-d': '#8A6E17',
        teal:     '#14B8A6',
        'teal-d': '#0D9488',
        'tx-1':   '#F0F4FF',
        'tx-2':   '#8B9CC8',
        'tx-3':   '#4B5A7A',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marqueeSroll: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,162,39,0)' },
          '50%':       { boxShadow: '0 0 0 8px rgba(201,162,39,0.08)' },
        },
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'marquee':    'marqueeSroll 30s linear infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
