import Image from 'next/image'
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'
import type { Project } from '@/types'
import { getCaseStudyFields, CaseStudyRow } from '@/components/CaseStudyFields'
import SignalCorners from '@/components/SignalCorners'
import DistortImage from '@/components/DistortImage'
import { getProjectLinkStatus } from '@/lib/project-links'
import ExpandPanel from '@/components/ExpandPanel'

// ── Thumbnail ───────────────────────────────────────────────────────────

function ProjectThumbnail({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <DistortImage className="w-full h-44" data-cursor="view">
        <Image
          src={project.imageUrl}
          alt={`Screenshot ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </DistortImage>
    )
  }

  // No screenshot yet: a big pixel-font monogram tile, still gets the
  // distortion treatment so every card feels consistent pre-screenshot.
  return (
    <DistortImage className="w-full h-40" data-cursor="view">
      <div
        className="w-full h-full flex items-center justify-center bg-white/[0.03] border-b border-white/20"
        aria-hidden="true"
      >
        <span className="font-display text-2xl text-paper/50">
          {project.title.slice(0, 2).toUpperCase()}
        </span>
      </div>
    </DistortImage>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function ProjectCard({ project }: { project: Project }) {
  const { demoReady, githubReady } = getProjectLinkStatus(project)

  // Context + problem are always visible; the expand panel covers
  // everything else so they aren't repeated.
  const expandedFields = getCaseStudyFields(project).filter(
    (f) => f.id !== 'context' && f.id !== 'problem',
  )

  return (
    <article
      className="surface surface-interactive relative group flex flex-col"
      aria-label={`Project: ${project.title}`}
    >
      <SignalCorners />
      <ProjectThumbnail project={project} />

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="mb-3">
          <span className="tag mb-2">{project.category}</span>
          <h3 className="text-paper text-xl leading-snug mt-2">
            {project.title}
          </h3>
          <p className="text-paper/60 text-base mt-1">{project.subtitle}</p>
        </div>

        {/* Stack */}
        <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}><span className="tag text-sm">{s}</span></li>
          ))}
        </ul>

        {/* Context + problem teaser */}
        <p className="text-paper/60 text-base leading-relaxed">{project.context}</p>
        <p className="text-paper/60 text-base leading-relaxed mt-2">{project.problem}</p>
      </div>

      {/* Toggle + case study body, shared primitive with the FAQ accordion */}
      <ExpandPanel
        id={`cs-${project.id}`}
        triggerClassName="w-full flex items-center justify-between px-6 py-3 text-base text-paper0 hover:text-paper transition-colors duration-150 border-t border-white/20 mt-auto"
        panelClassName="overflow-hidden border-t border-white/20"
        collapsedTrigger={
          <>
            <span>View case study</span>
            <ChevronDown size={16} aria-hidden="true" />
          </>
        }
        expandedTrigger={
          <>
            <span>Hide</span>
            <ChevronUp size={16} aria-hidden="true" />
          </>
        }
      >
        <div className="px-6 pb-6 pt-5 space-y-5">
          {expandedFields.map((field) => (
            <CaseStudyRow key={field.id} {...field} />
          ))}

          {/* Links */}
          <div className="flex gap-3 pt-1">
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
      </ExpandPanel>
    </article>
  )
}
