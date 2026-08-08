import { describe, it, expect } from 'vitest'
import { getCaseStudyFields } from './CaseStudyFields'
import type { Project } from '@/types'

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  subtitle: 'A project used only in tests',
  category: 'Test',
  tags: ['Test'],
  stack: ['TypeScript'],
  context: 'The context statement.',
  problem: 'The problem statement.',
  approach: 'The approach statement.',
  architectureDecisions: ['Decision one.', 'Decision two.'],
  technicalChallenges: 'The technical challenges statement.',
  tradeoffs: ['Trade-off one.', 'Trade-off two.'],
  outcome: 'The outcome statement.',
  lessonsLearned: 'The lessons learned statement.',
  ifRebuiltToday: 'The if-rebuilt-today statement.',
  demoUrl: 'https://example.vercel.app',
  githubUrl: 'https://github.com/example/test-project',
}

describe('getCaseStudyFields', () => {
  it('returns exactly 9 fields, in a stable order', () => {
    const fields = getCaseStudyFields(mockProject)
    expect(fields.map((f) => f.id)).toEqual([
      'context',
      'problem',
      'approach',
      'architectureDecisions',
      'technicalChallenges',
      'tradeoffs',
      'outcome',
      'lessonsLearned',
      'ifRebuiltToday',
    ])
  })

  it('gives every field a non-empty label', () => {
    const fields = getCaseStudyFields(mockProject)
    for (const field of fields) {
      expect(field.label.length).toBeGreaterThan(0)
    }
  })

  it('gives every field renderable content', () => {
    const fields = getCaseStudyFields(mockProject)
    for (const field of fields) {
      expect(field.content).toBeDefined()
    }
  })

  // ProjectCard filters out 'context' and 'problem' since both are already
  // shown as a teaser above the expand toggle — if either id ever changes,
  // this catches it.
  it('keeps "context" then "problem" as the first two field ids, since ProjectCard filters on them by name', () => {
    const fields = getCaseStudyFields(mockProject)
    expect(fields[0].id).toBe('context')
    expect(fields[1].id).toBe('problem')
  })
})
