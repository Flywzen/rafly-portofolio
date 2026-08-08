import { describe, it, expect } from 'vitest'
import { getProjectLinkStatus } from './project-links'

describe('getProjectLinkStatus', () => {
  it('flags both links as not ready when both are still placeholders', () => {
    const result = getProjectLinkStatus({
      demoUrl: 'https://your-demo.vercel.app',
      githubUrl: 'https://github.com/USERNAME/kiroku',
    })
    expect(result).toEqual({ demoReady: false, githubReady: false })
  })

  it('flags both links as ready when both are real URLs', () => {
    const result = getProjectLinkStatus({
      demoUrl: 'https://kiroku.vercel.app',
      githubUrl: 'https://github.com/flywzen/kiroku',
    })
    expect(result).toEqual({ demoReady: true, githubReady: true })
  })

  it('detects each link independently, one real and one still a placeholder', () => {
    const result = getProjectLinkStatus({
      demoUrl: 'https://kiroku.vercel.app',
      githubUrl: 'https://github.com/USERNAME/kiroku',
    })
    expect(result).toEqual({ demoReady: true, githubReady: false })
  })

  it('does not false-positive on a real username that contains the placeholder word', () => {
    // A real GitHub username like "USERNAME123" contains the substring
    // "USERNAME" but is not the placeholder "/USERNAME/" segment — this
    // must read as ready, not as a leftover placeholder.
    const result = getProjectLinkStatus({
      demoUrl: 'https://kiroku.vercel.app',
      githubUrl: 'https://github.com/USERNAME123/kiroku',
    })
    expect(result.githubReady).toBe(true)
  })

  it('does not false-positive on a real demo URL that contains "your-demo"', () => {
    const result = getProjectLinkStatus({
      demoUrl: 'https://my-your-demo-app.vercel.app',
      githubUrl: 'https://github.com/flywzen/kiroku',
    })
    expect(result.demoReady).toBe(true)
  })
})
