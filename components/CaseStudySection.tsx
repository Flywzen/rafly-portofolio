/**
 * CaseStudySection — standalone case study display component.
 *
 * Usage:
 *   // Full section (all projects)
 *   <CaseStudySection />
 *
 *   // Single project by ID
 *   <CaseStudySection projectId="kiroku" />
 *
 *   // Pass a project object directly
 *   <CaseStudySection project={myProject} />
 */

import {
  Target, Lightbulb, Layers, AlertTriangle,
  Zap, CheckCircle2, ExternalLink, Github, Tag,
} from 'lucide-react'
import type { Project } from '@/types'
import { projects as allProjects } from '@/data/projects'
import { cn } from '@/lib/utils'

// ── Sub-components ─────────────────────────────────────────────────────────

function SectionRow({
  icon: Icon,
  label,
  accent,
  children,
}: {
  icon: React.ElementType
  label: string
  accent: 'gold' | 'teal' | 'muted'
  children: React.ReactNode
}) {
  const iconCls =
    accent === 'gold' ? 'text-gold'
    : accent === 'teal' ? 'text-teal'
    : 'text-tx-3'

  const labelCls =
    accent === 'gold' ? 'text-gold'
    : accent === 'teal' ? 'text-teal'
    : 'text-tx-3'

  return (
    <div className="flex gap-4 py-5 border-b border-gold/8 last:border-0">
      <div
        className={cn(
          'shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5',
          accent === 'gold' ? 'bg-gold/10' : accent === 'teal' ? 'bg-teal/10' : 'bg-tx-3/10',
        )}
        aria-hidden="true"
      >
        <Icon size={15} className={iconCls} />
      </div>

      <div className="flex-1 min-w-0">
        <p className={cn('text-[10px] font-bold uppercase tracking-widest mb-2', labelCls)}>
          {label}
        </p>
        {children}
      </div>
    </div>
  )
}

// ── Single project case study ──────────────────────────────────────────────

function CaseStudyCard({ project }: { project: Project }) {
  const isGold  = project.colorAccent === 'gold'
  const demoReady   = !project.demoUrl.includes('your-demo')
  const githubReady = !project.githubUrl.includes('USERNAME')

  return (
    <article
      id={`case-study-${project.id}`}
      className="card overflow-hidden"
      aria-labelledby={`cs-title-${project.id}`}
    >
      {/* Header bar */}
      <div
        className={cn(
          'px-7 py-5 border-b border-gold/8',
          isGold ? 'bg-gold/[0.04]' : 'bg-teal/[0.04]',
        )}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className={cn('badge mb-2', isGold ? 'badge-gold' : 'badge-teal')}>
              {project.category}
            </span>
            <h3
              id={`cs-title-${project.id}`}
              className="font-display font-bold text-tx-1 text-xl leading-snug"
            >
              {project.title}
            </h3>
            <p className="text-tx-2 text-sm mt-1">{project.subtitle}</p>
          </div>

          {/* Links */}
          <div className="flex gap-2.5 shrink-0">
            <a
              href={demoReady ? project.demoUrl : '#'}
              target={demoReady ? '_blank' : undefined}
              rel={demoReady ? 'noopener noreferrer' : undefined}
              aria-disabled={!demoReady}
              className={cn(
                'btn-primary text-xs py-2 px-3',
                !demoReady && 'opacity-40 pointer-events-none',
              )}
            >
              <ExternalLink size={13} aria-hidden="true" />
              {demoReady ? 'Live Demo' : 'Demo Soon'}
            </a>
            <a
              href={githubReady ? project.githubUrl : '#'}
              target={githubReady ? '_blank' : undefined}
              rel={githubReady ? 'noopener noreferrer' : undefined}
              aria-disabled={!githubReady}
              className={cn(
                'btn-secondary text-xs py-2 px-3',
                !githubReady && 'opacity-40 pointer-events-none',
              )}
            >
              <Github size={13} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mt-4" aria-label="Tech stack">
          {project.stack.map((s) => (
            <span key={s} className="badge badge-muted text-[10px]">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Case study body */}
      <div className="px-7">
        <SectionRow icon={Target} label="Problem" accent="muted">
          <p className="text-tx-2 text-sm leading-relaxed">{project.problem}</p>
        </SectionRow>

        <SectionRow icon={Lightbulb} label="Goal" accent="gold">
          <p className="text-tx-2 text-sm leading-relaxed">{project.goal}</p>
        </SectionRow>

        <SectionRow icon={Tag} label="My Role" accent="teal">
          <p className="text-tx-2 text-sm leading-relaxed">{project.role}</p>
        </SectionRow>

        <SectionRow icon={Layers} label="Features" accent="gold">
          <ul className="space-y-2" aria-label="Fitur proyek">
            {project.features.map((f) => (
              <li key={f} className="flex gap-2 text-tx-2 text-sm leading-relaxed">
                <CheckCircle2
                  size={13}
                  className="text-teal shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                {f}
              </li>
            ))}
          </ul>
        </SectionRow>

        <SectionRow icon={AlertTriangle} label="Tantangan" accent="muted">
          <p className="text-tx-2 text-sm leading-relaxed">{project.challenges}</p>
        </SectionRow>

        <SectionRow icon={Zap} label="Hasil" accent="teal">
          <p className="text-tx-2 text-sm leading-relaxed">{project.result}</p>
        </SectionRow>
      </div>
    </article>
  )
}

// ── Props interface ────────────────────────────────────────────────────────

interface CaseStudySectionProps {
  /** Render a single project by its id. If omitted, renders all projects. */
  projectId?: string
  /** Pass a project object directly instead of looking it up by id. */
  project?: Project
  /** Custom section heading. Defaults to "Case Studies". */
  heading?: string
}

// ── Main export ────────────────────────────────────────────────────────────

export default function CaseStudySection({
  projectId,
  project,
  heading = 'Case Studies',
}: CaseStudySectionProps) {
  // Resolve which project(s) to render
  let items: Project[]

  if (project) {
    items = [project]
  } else if (projectId) {
    const found = allProjects.find((p) => p.id === projectId)
    items = found ? [found] : []
  } else {
    items = allProjects
  }

  if (items.length === 0) {
    return (
      <p className="text-tx-3 text-sm text-center py-10">
        Proyek tidak ditemukan.
      </p>
    )
  }

  return (
    <section
      aria-labelledby="case-study-heading"
      className="section-pad"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {/* Only show heading when rendering more than one project */}
        {items.length > 1 && (
          <div className="mb-12 reveal">
            <p className="section-label">Portfolio</p>
            <h2
              id="case-study-heading"
              className="font-display font-bold text-3xl sm:text-4xl text-tx-1 leading-tight"
            >
              {heading}
            </h2>
          </div>
        )}

        <div className="space-y-8">
          {items.map((p, i) => (
            <div
              key={p.id}
              className={cn('reveal', `reveal-d${Math.min(i + 1, 4)}`)}
            >
              <CaseStudyCard project={p} />
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
