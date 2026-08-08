import type { Project } from '@/types'

export interface CaseStudyField {
  id:
    | 'context'
    | 'problem'
    | 'approach'
    | 'architectureDecisions'
    | 'technicalChallenges'
    | 'tradeoffs'
    | 'outcome'
    | 'lessonsLearned'
    | 'ifRebuiltToday'
  label: string
  content: React.ReactNode
}

const textCls = 'text-paper/60 text-base leading-relaxed'

/** A short list of related points (architecture decisions, trade-offs) —
 *  a left border instead of a bullet icon, matching the same "related
 *  items under one heading" treatment used in the Security roadmap. No
 *  checkmark icon here on purpose: these aren't a checklist of completed
 *  work, they're individual decisions each worth reading on its own. */
function PointList({ items, ariaLabel }: { items: string[]; ariaLabel: string }) {
  return (
    <ul className="space-y-3" aria-label={ariaLabel}>
      {items.map((item) => (
        <li
          key={item}
          className="text-paper/60 text-base leading-relaxed pl-3 border-l border-white/20"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * One canonical row definition per project field. ProjectCard's expand
 * panel and the standalone CaseStudySection both map over this instead of
 * keeping their own separate (and previously inconsistent) copies.
 *
 * Field order is deliberate and mirrors how an engineer actually explains
 * a project: what it was, what was broken, how I approached it, the
 * specific decisions I made and why, what was technically hard, what I
 * gave up in exchange for what, what actually happened, and what I would
 * do differently. Not "Overview / Features / Tech Stack" — that structure
 * shows what got built. This shows the thinking behind it.
 *
 * No icons: the uppercase label is already sufficient to identify each
 * row, so an icon next to it adds a visual element without adding
 * information.
 */
export function getCaseStudyFields(project: Project): CaseStudyField[] {
  return [
    { id: 'context',  label: 'Context',  content: <p className={textCls}>{project.context}</p> },
    { id: 'problem',  label: 'Problem',  content: <p className={textCls}>{project.problem}</p> },
    { id: 'approach', label: 'Approach', content: <p className={textCls}>{project.approach}</p> },
    {
      id: 'architectureDecisions',
      label: 'Architecture Decisions',
      content: (
        <PointList items={project.architectureDecisions} ariaLabel="Architecture decisions" />
      ),
    },
    {
      id: 'technicalChallenges',
      label: 'Technical Challenges',
      content: <p className={textCls}>{project.technicalChallenges}</p>,
    },
    {
      id: 'tradeoffs',
      label: 'Trade-offs',
      content: <PointList items={project.tradeoffs} ariaLabel="Trade-offs" />,
    },
    { id: 'outcome', label: 'Outcome', content: <p className={textCls}>{project.outcome}</p> },
    {
      id: 'lessonsLearned',
      label: 'Lessons Learned',
      content: <p className={textCls}>{project.lessonsLearned}</p>,
    },
    {
      id: 'ifRebuiltToday',
      label: 'If I Rebuilt It Today',
      content: <p className={textCls}>{project.ifRebuiltToday}</p>,
    },
  ]
}

/** A single labeled row: uppercase micro-label, content. */
export function CaseStudyRow({ label, content }: CaseStudyField) {
  return (
    <div>
      <p className="font-sans text-sm tracking-wide text-paper0 uppercase mb-2.5">
        {label}
      </p>
      {content}
    </div>
  )
}
