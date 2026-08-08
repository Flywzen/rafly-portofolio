import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard'
import { RevealGroup, RevealItem } from '@/components/Reveal'

export default function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-pad"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-12">
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl text-paper leading-[1.15] mb-4"
          >
            Built to solve real problems.
          </h2>
          <p className="text-paper/60 text-lg max-w-xl leading-relaxed">
            Each one started as a real problem I had to solve. Open a case study to
            see how, and check the result yourself.
          </p>
        </div>

        {/* Grid */}
        <RevealGroup className="grid sm:grid-cols-2 gap-5">
          {projects.map((project) => (
            <RevealItem key={project.id}>
              <ProjectCard project={project} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Footer note */}
        <p className="text-center text-paper0 text-base mt-10">
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

      </div>
    </section>
  )
}
