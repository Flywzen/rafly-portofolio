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
 *
 * Shares its row rendering with ProjectCard's expand panel via
 * CaseStudyFields.tsx, so the two can no longer drift out of sync.
 */

import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types'
import { projects as allProjects } from '@/data/projects'
import { getCaseStudyFields, CaseStudyRow } from '@/components/CaseStudyFields'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { getProjectLinkStatus } from '@/lib/project-links'

function CaseStudyCard({ project }: { project: Project }) {
  const { demoReady, githubReady } = getProjectLinkStatus(project)

  return (
    <article
      id={`case-study-${project.id}`}
      className="surface overflow-hidden"
      aria-labelledby={`cs-title-${project.id}`}
    >
      {/* Header bar */}
      <div className="px-7 py-5 border-b border-white/20">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="tag mb-2">{project.category}</span>
            <h3
              id={`cs-title-${project.id}`}
              className="text-xl text-paper leading-snug mt-2"
            >
              {project.title}
            </h3>
            <p className="text-paper/60 text-base mt-1">{project.subtitle}</p>
          </div>

          <div className="flex gap-2.5 shrink-0">
            <a
              href={demoReady ? project.demoUrl : '#'}
              target={demoReady ? '_blank' : undefined}
              rel={demoReady ? 'noopener noreferrer' : undefined}
              aria-disabled={!demoReady}
              className={`btn-primary py-2 px-3 ${!demoReady ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <ExternalLink size={13} aria-hidden="true" />
              {demoReady ? 'Live Demo' : 'Demo Soon'}
            </a>
            <a
              href={githubReady ? project.githubUrl : '#'}
              target={githubReady ? '_blank' : undefined}
              rel={githubReady ? 'noopener noreferrer' : undefined}
              aria-disabled={!githubReady}
              className={`btn-secondary py-2 px-3 ${!githubReady ? 'opacity-40 pointer-events-none' : ''}`}
            >
              <Github size={13} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mt-4" aria-label="Tech stack">
          {project.stack.map((s) => (
            <span key={s} className="tag text-sm">{s}</span>
          ))}
        </div>
      </div>

      {/* Case study body — every field, since there's no teaser above it */}
      <div className="px-7 divide-y divide-white/20">
        {getCaseStudyFields(project).map((field) => (
          <div key={field.id} className="py-5">
            <CaseStudyRow {...field} />
          </div>
        ))}
      </div>
    </article>
  )
}

interface CaseStudySectionProps {
  /** Render a single project by its id. If omitted, renders all projects. */
  projectId?: string
  /** Pass a project object directly instead of looking it up by id. */
  project?: Project
  /** Custom section heading. Defaults to "Case Studies". */
  heading?: string
}

export default function CaseStudySection({
  projectId,
  project,
  heading = 'Case Studies',
}: CaseStudySectionProps) {
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
      <p className="text-paper0 text-base text-center py-10">
        Project not found.
      </p>
    )
  }

  return (
    <section aria-labelledby="case-study-heading" className="section-pad">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {items.length > 1 && (
          <div className="mb-12">
            <h2
              id="case-study-heading"
              className="text-2xl sm:text-3xl text-paper leading-[1.15]"
            >
              {heading}
            </h2>
          </div>
        )}

        <RevealGroup className="space-y-8">
          {items.map((p) => (
            <RevealItem key={p.id}>
              <CaseStudyCard project={p} />
            </RevealItem>
          ))}
        </RevealGroup>

      </div>
    </section>
  )
}
