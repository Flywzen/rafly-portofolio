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
            className="text-lg sm:text-xl text-zinc-50 leading-[1.8] mb-4"
          >
            Real projects, not tutorial exercises.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
            Every project has a real problem, a considered solution, and a result you
            can verify. Open a case study to see the full process.
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
          <p className="text-center text-zinc-500 text-base">
            Source code for all of the above is on{' '}
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
