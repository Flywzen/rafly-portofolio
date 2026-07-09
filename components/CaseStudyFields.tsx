import { CheckCircle2 } from 'lucide-react'
import type { Project } from '@/types'

export interface CaseStudyField {
  id: 'problem' | 'goal' | 'role' | 'features' | 'challenges' | 'result'
  label: string
  content: React.ReactNode
}

const textCls = 'text-zinc-400 text-sm leading-relaxed'

/**
 * One canonical row definition per project field. ProjectCard's expand
 * panel and the standalone CaseStudySection both map over this instead of
 * keeping their own separate (and previously inconsistent) copies.
 *
 * No icons: the uppercase label is already sufficient to identify each
 * row, so an icon next to it adds a visual element without adding
 * information.
 */
export function getCaseStudyFields(project: Project): CaseStudyField[] {
  return [
    { id: 'problem',    label: 'Problem',  content: <p className={textCls}>{project.problem}</p> },
    { id: 'goal',       label: 'Goal',     content: <p className={textCls}>{project.goal}</p> },
    { id: 'role',       label: 'My Role',  content: <p className={textCls}>{project.role}</p> },
    {
      id: 'features',
      label: 'Features',
      content: (
        <ul className="space-y-1.5" aria-label="Fitur proyek">
          {project.features.map((f) => (
            <li key={f} className="flex gap-2 text-zinc-400 text-sm leading-relaxed">
              <CheckCircle2 size={13} className="text-zinc-500 shrink-0 mt-0.5" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    { id: 'challenges', label: 'Tantangan', content: <p className={textCls}>{project.challenges}</p> },
    { id: 'result',     label: 'Hasil',     content: <p className={textCls}>{project.result}</p> },
  ]
}

/** A single labeled row: uppercase micro-label, content. */
export function CaseStudyRow({ label, content }: CaseStudyField) {
  return (
    <div>
      <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide mb-1.5">
        {label}
      </p>
      {content}
    </div>
  )
}
