'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ExternalLink, Github, ChevronDown, ChevronUp,
  Target, Lightbulb, Layers, AlertTriangle, Zap, CheckCircle2,
} from 'lucide-react'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

// ── Thumbnail placeholder ──────────────────────────────────────────────────

function ProjectThumbnail({ project }: { project: Project }) {
  const isGold = project.colorAccent === 'gold'

  if (project.imageUrl) {
    return (
      <div className="relative w-full h-44 overflow-hidden rounded-t-2xl">
        <Image
          src={project.imageUrl}
          alt={`Screenshot ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {/* gradient overlay so text on top stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>
    )
  }

  // Stylised placeholder when no screenshot yet
  return (
    <div
      className={cn(
        'relative w-full h-40 flex items-center justify-center overflow-hidden rounded-t-2xl',
        isGold ? 'bg-gold/[0.06]' : 'bg-teal/[0.06]',
      )}
      aria-hidden="true"
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),' +
            'linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Centre monogram */}
      <div className={cn(
        'relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-display font-bold',
        isGold
          ? 'bg-gold/15 text-gold border border-gold/20'
          : 'bg-teal/15 text-teal border border-teal/20',
      )}>
        {project.title.slice(0, 2).toUpperCase()}
      </div>
      {/* Decorative blobs */}
      <div className={cn(
        'absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl',
        isGold ? 'bg-gold/10' : 'bg-teal/10',
      )} />
      <div className={cn(
        'absolute -bottom-6 -left-6 w-20 h-20 rounded-full blur-2xl',
        isGold ? 'bg-gold/8' : 'bg-teal/8',
      )} />
    </div>
  )
}

// ── Case-study row ────────────────────────────────────────────────────────

function CaseRow({
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
    accent === 'gold' ? 'text-gold' : accent === 'teal' ? 'text-teal' : 'text-tx-3'
  const lblCls =
    accent === 'gold' ? 'text-gold' : accent === 'teal' ? 'text-teal' : 'text-tx-3'

  return (
    <div className="flex gap-3">
      <Icon size={14} className={cn('shrink-0 mt-0.5', iconCls)} aria-hidden="true" />
      <div>
        <p className={cn('text-[10px] font-bold uppercase tracking-widest mb-1.5', lblCls)}>
          {label}
        </p>
        {children}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)

  const demoReady   = !project.demoUrl.includes('your-demo')
  const githubReady = !project.githubUrl.includes('USERNAME')

  return (
    <article
      className="card flex flex-col overflow-hidden"
      aria-label={`Proyek: ${project.title}`}
    >
      {/* Thumbnail */}
      <ProjectThumbnail project={project} />

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className={cn(
              'badge mb-2',
              project.colorAccent === 'gold' ? 'badge-gold' : 'badge-teal',
            )}>
              {project.category}
            </span>
            <h3 className="font-display font-semibold text-tx-1 text-lg leading-snug">
              {project.title}
            </h3>
            <p className="text-tx-2 text-sm mt-0.5">{project.subtitle}</p>
          </div>
        </div>

        {/* Stack */}
        <ul className="flex flex-wrap gap-1.5 mb-4" aria-label="Tech stack">
          {project.stack.map((s) => (
            <li key={s}><span className="badge badge-muted text-[10px]">{s}</span></li>
          ))}
        </ul>

        {/* Problem teaser */}
        <p className="text-tx-2 text-sm leading-relaxed">{project.problem}</p>
      </div>

      {/* Toggle */}
      <div className="border-t border-gold/8 mt-auto">
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          aria-expanded={expanded}
          aria-controls={`cs-${project.id}`}
          className="w-full flex items-center justify-between px-6 py-3 text-xs font-medium text-tx-3 hover:text-tx-1 transition-colors duration-200"
        >
          <span>{expanded ? 'Sembunyikan' : 'Lihat case study'}</span>
          {expanded
            ? <ChevronUp size={14} aria-hidden="true" />
            : <ChevronDown size={14} aria-hidden="true" />}
        </button>
      </div>

      {/* Case study body */}
      {expanded && (
        <div
          id={`cs-${project.id}`}
          className="px-6 pb-6 space-y-5 border-t border-gold/8"
        >
          <div className="pt-5 space-y-5">
            <CaseRow icon={Target} label="Goal" accent="gold">
              <p className="text-tx-2 text-sm leading-relaxed">{project.goal}</p>
            </CaseRow>

            <CaseRow icon={Lightbulb} label="My Role" accent="teal">
              <p className="text-tx-2 text-sm leading-relaxed">{project.role}</p>
            </CaseRow>

            <CaseRow icon={Layers} label="Features" accent="gold">
              <ul className="space-y-1.5">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2 text-tx-2 text-sm">
                    <CheckCircle2 size={12} className="text-teal shrink-0 mt-0.5" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </CaseRow>

            <CaseRow icon={AlertTriangle} label="Tantangan" accent="muted">
              <p className="text-tx-2 text-sm leading-relaxed">{project.challenges}</p>
            </CaseRow>

            <CaseRow icon={Zap} label="Hasil" accent="teal">
              <p className="text-tx-2 text-sm leading-relaxed">{project.result}</p>
            </CaseRow>
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-1">
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
      )}
    </article>
  )
}
