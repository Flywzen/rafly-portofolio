import { describe, it, expect } from 'vitest'
import { statusClassName } from './security-status'

describe('statusClassName', () => {
  it('gives "active" the accent color', () => {
    expect(statusClassName('active')).toContain('text-accent-text')
  })

  it('gives "done" a plain muted color, not the accent', () => {
    const result = statusClassName('done')
    expect(result).not.toContain('text-accent-text')
    expect(result).toContain('text-zinc-500')
  })

  it('gives "upcoming" the same muted treatment as "done"', () => {
    expect(statusClassName('upcoming')).toBe(statusClassName('done'))
  })
})
