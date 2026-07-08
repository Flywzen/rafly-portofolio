import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-pad"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-12 reveal">
          <p className="section-label">Proyek</p>
          <h2
            id="projects-heading"
            className="font-display font-bold text-3xl sm:text-4xl text-tx-1 leading-tight mb-3"
          >
            Proyek nyata,{' '}
            <span className="text-gold-gradient">bukan latihan tutorial.</span>
          </h2>
          <p className="text-tx-2 text-base max-w-xl leading-relaxed">
            Setiap proyek punya problem nyata, solusi yang dipikirkan, dan hasil yang bisa
            diverifikasi. Buka case study untuk melihat proses lengkapnya.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`reveal reveal-d${Math.min((i % 2) + 1, 4)}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-tx-3 text-xs mt-10 reveal">
          Semua proyek di atas bisa dilihat source code-nya di{' '}
          <a
            href="https://github.com/USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            GitHub →
          </a>
        </p>

      </div>
    </section>
  )
}
