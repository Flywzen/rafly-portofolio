import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-pad"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">

        {/* Header */}
        <Reveal className="mb-12">
          <h2
            id="projects-heading"
            className="font-semibold text-3xl sm:text-4xl text-zinc-50 leading-tight mb-3 tracking-tight"
          >
            Proyek nyata, bukan latihan tutorial.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl leading-relaxed">
            Setiap proyek punya problem nyata, solusi yang dipikirkan, dan hasil yang bisa
            diverifikasi. Buka case study untuk melihat proses lengkapnya.
          </p>
        </Reveal>

        {/* Grid */}
        <RevealGroup className="grid sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <RevealItem key={project.id}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Footer note */}
        <Reveal className="mt-10">
          <p className="text-center text-zinc-500 text-xs">
            Semua proyek di atas bisa dilihat source code-nya di{' '}
            <a
              href="https://github.com/USERNAME"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-text hover:underline"
            >
              GitHub
            </a>
          </p>
        </Reveal>

      </div>
    </section>
  )
}
