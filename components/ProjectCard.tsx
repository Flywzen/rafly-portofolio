'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react'
import type { Project } from '@/types'
import { getCaseStudyFields, CaseStudyRow } from '@/components/CaseStudyFields'
import PixelCorners from '@/components/PixelCorners'

const EASE = [0.16, 1, 0.3, 1] as const

// ── Thumbnail ───────────────────────────────────────────────────────────

function ProjectThumbnail({ project }: { project: Project }) {
  if (project.imageUrl) {
    return (
      <div className="relative w-full h-44 overflow-hidden">
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

  // No screenshot yet: a big pixel-font monogram tile.
  return (
    <div
      className="w-full h-40 flex items-center justify-center bg-white/[0.03] border-b-2 border-white/20"
      aria-hidden="true"
    >
      <span className="font-pixel text-2xl text-zinc-500">
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
      className="surface surface-interactive relative group flex flex-col"
      aria-label={`Project: ${project.title}`}
    >
      <PixelCorners />
      <ProjectThumbnail project={project} />

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="mb-3">
          <span className="tag mb-2">{project.category}</span>
          <h3 className="text-zinc-50 text-sm leading-[1.8] mt-2">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-base mt-1">{project.subtitle}</p>
        </div>

        {/* Stack */}
        <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}><span className="tag text-sm">{s}</span></li>
          ))}
        </ul>

        {/* Problem teaser */}
        <p className="text-zinc-400 text-base leading-relaxed">{project.problem}</p>
      </div>

      {/* Toggle */}
      <div className="border-t-2 border-white/20 mt-auto">
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          aria-expanded={expanded}
          aria-controls={`cs-${project.id}`}
          className="w-full flex items-center justify-between px-6 py-3 text-base text-zinc-500 hover:text-zinc-50 transition-colors duration-150"
        >
          <span>{expanded ? 'Hide' : 'View case study'}</span>
          {expanded
            ? <ChevronUp size={16} aria-hidden="true" />
            : <ChevronDown size={16} aria-hidden="true" />}
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
            className="overflow-hidden border-t-2 border-white/20"
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
          </m.div>
        )}
      </AnimatePresence>
    </article>
  )
}
