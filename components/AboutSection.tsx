import { ExternalLink } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL } from '@/data/socialLinks'
import { RevealGroup, RevealItem } from '@/components/Reveal'

/**
 * Single column, prose only. The previous version said "ITERA", "security
 * learning", and the tech stack three times each across a bio, a highlights
 * list, and a sidebar card. That's one piece of information wearing three
 * costumes. This says each thing once.
 */
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <RevealGroup className="max-w-2xl">

          <RevealItem>
            <h2
              id="about-heading"
              className="text-base sm:text-lg text-zinc-50 leading-[1.8] mb-8"
            >
              Not a generic developer. <span className="text-accent-text">I have a point of view.</span>
            </h2>
          </RevealItem>

          <RevealItem className="space-y-4 text-zinc-400 leading-relaxed text-lg">
            <p>
              I&apos;m <strong className="text-zinc-50 font-normal">Muhammad Rafly Yahya Ramadhan</strong>,
              known as Rafly. Computer Science student at Institut Teknologi Sumatera
              (ITERA), based in Lampung, Indonesia.
            </p>
            <p>
              I build websites with React, Next.js, and TypeScript. A good-looking site
              isn&apos;t enough on its own: visitors need to understand what you do
              within the first five seconds, and trust your business enough to reach out,
              buy, or come back.
            </p>
            <p>
              I also study web security actively, because code written without
              considering how it could be attacked is just a bug waiting for its moment.
              More on that in the{' '}
              <a href="#security" className="text-accent-text hover:underline">
                Security
              </a>{' '}
              section.
            </p>
            <p>
              Right now, <strong className="text-zinc-50 font-normal">I&apos;m taking on website projects</strong>: small
              business sites, landing pages, and company profiles, at prices that make
              sense for a first client in Indonesia.
            </p>
          </RevealItem>

          <RevealItem className="flex flex-wrap gap-3 mt-8">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2"
            >
              <ExternalLink size={14} aria-hidden="true" /> GitHub
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary py-2"
            >
              <ExternalLink size={14} aria-hidden="true" /> LinkedIn
            </a>
          </RevealItem>

        </RevealGroup>
      </div>
    </section>
  )
}
