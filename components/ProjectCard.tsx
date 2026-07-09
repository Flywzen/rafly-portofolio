'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'
import type { Project } from '@/types'
import { getCaseStudyFields, CaseStudyRow } from '@/components/CaseStudyFields'

const EASE = [0.16, 1, 0.3, 1] as const

// ── Thumbnail ───────────────────────────────────────────────────────────

function ProjectThumbnail({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <div className="relative w-full h-44 overflow-hidden rounded-t-md">
        <Image
          src={project.imageUrl}
          alt={`Screenshot ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
    )
  }

  // No screenshot yet: a plain monogram tile. Flat, no gradients, no
  // decorative blur blobs, no grid texture.
  return (
    <div
      className="w-full h-40 flex items-center justify-center bg-white/[0.02] border-b border-white/[0.08]"
      aria-hidden="true"
    >
      <span className="text-2xl font-semibold text-zinc-500">
        {project.title.slice(0, 2).toUpperCase()}
      </span>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const reduceMotion = useReducedMotion()

  const demoReady   = !project.demoUrl.includes('your-demo')
  const githubReady = !project.githubUrl.includes('USERNAME')

  // The "problem" teaser is always visible; the expand panel covers
  // everything else so it isn't repeated.
  const expandedFields = getCaseStudyFields(project).filter((f) => f.id !== 'problem')

  return (
    <article
      className="surface surface-interactive flex flex-col overflow-hidden"
      aria-label={`Proyek: ${project.title}`}
    >
      <ProjectThumbnail project={project} />

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="mb-3">
          <span className="tag mb-2">{project.category}</span>
          <h3 className="font-semibold text-zinc-50 text-lg leading-snug mt-2">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-0.5">{project.subtitle}</p>
        </div>

        {/* Stack */}
        <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}><span className="tag text-[10px]">{s}</span></li>
          ))}
        </ul>

        {/* Problem teaser */}
        <p className="text-zinc-400 text-sm leading-relaxed">{project.problem}</p>
      </div>

      {/* Toggle */}
      <div className="border-t border-white/[0.08] mt-auto">
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          aria-expanded={expanded}
          aria-controls={`cs-${project.id}`}
          className="w-full flex items-center justify-between px-6 py-3 text-xs font-medium text-zinc-500 hover:text-zinc-50 transition-colors duration-150"
        >
          <span>{expanded ? 'Sembunyikan' : 'Lihat case study'}</span>
          {expanded
            ? <ChevronUp size={14} aria-hidden="true" />
            : <ChevronDown size={14} aria-hidden="true" />}
        </button>
      </div>

      {/* Case study body — height animates open/closed instead of snapping */}
      <AnimatePresence initial={false}>
        {expanded && (
          <m.div
            key="case-study"
            id={`cs-${project.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE }}
            className="overflow-hidden border-t border-white/[0.08]"
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
                  className={`btn-primary text-xs py-2 px-3 ${!demoReady ? 'opacity-40 pointer-events-none' : ''}`}
                >
                  <ExternalLink size={13} aria-hidden="true" />
                  {demoReady ? 'Live Demo' : 'Demo Soon'}
                </a>
                <a
                  href={githubReady ? project.githubUrl : '#'}
                  target={githubReady ? '_blank' : undefined}
                  rel={githubReady ? 'noopener noreferrer' : undefined}
                  aria-disabled={!githubReady}
                  className={`btn-secondary text-xs py-2 px-3 ${!githubReady ? 'opacity-40 pointer-events-none' : ''}`}
                >
                  <Github size={13} aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </article>
  )
}
