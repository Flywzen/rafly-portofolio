import type { LearningPhase } from '@/types'

export type PhaseStatus = LearningPhase['status']

export const STATUS_LABEL: Record<PhaseStatus, string> = {
  done:     'Done',
  active:   'Active',
  upcoming: 'Upcoming',
}

/** Plain text weight/color, not a boxed badge: quieter for a status shown 4x in a row. */
export function statusClassName(status: PhaseStatus): string {
  return status === 'active'
    ? 'text-sm text-accent-text'
    : 'text-sm text-zinc-500'
}
