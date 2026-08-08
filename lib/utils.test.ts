import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('joins multiple class strings with a space', () => {
    expect(cn('a', 'b', 'c')).toBe('a b c')
  })

  it('drops falsy values: undefined, null, false, 0', () => {
    expect(cn('a', undefined, 'b', null, 'c', false, 'd', 0)).toBe('a b c d')
  })

  it('returns an empty string when everything is falsy', () => {
    expect(cn(undefined, null, false, 0)).toBe('')
  })

  it('supports the common conditional-class pattern', () => {
    const isActive = true
    const isDisabled = false
    expect(cn('btn', isActive && 'btn-active', isDisabled && 'btn-disabled')).toBe(
      'btn btn-active',
    )
  })

  it('returns an empty string when called with no arguments', () => {
    expect(cn()).toBe('')
  })
})
