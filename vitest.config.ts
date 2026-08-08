import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  // tsconfig.json sets jsx: "preserve" for Next.js's own SWC compiler to
  // handle. Vite 8's oxc transformer needs its own JSX setting instead of
  // inheriting that — this only affects the test runner, not the real
  // Next.js build.
  oxc: {
    jsx: {
      runtime: 'automatic',
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
    exclude: ['node_modules', '.next'],
  },
})
