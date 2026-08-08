import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL } from '@/data/socialLinks'

/**
 * Single column, prose only. Sits near the end of the homepage now
 * (Projects and Security carry the proof, Philosophy carries the
 * reflection), so this doesn't need to re-introduce the build/security
 * angle a third time, just close out who's behind it.
 *
 * No scroll-reveal wrapper: this used the same 3-block sequential stagger
 * as Hero, which was fine used once, but repeated across sections it's
 * the same decorative pattern the fade-up critique is about. Hero keeps
 * its stagger as the one page-load moment; everything scrolled to after
 * that renders as it is.
 */
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">

          <h2
            id="about-heading"
            className="text-2xl sm:text-3xl text-paper leading-[1.15] mb-8"
          >
            A bit more about me.
          </h2>

          <div className="space-y-4 text-paper/60 leading-relaxed text-lg">
            <p>
              I&apos;m <strong className="text-paper font-normal">Muhammad Rafly Yahya Ramadhan</strong>,
              known as Rafly. Computer Science student at Institut Teknologi Sumatera
              (ITERA), based in Lampung, Indonesia.
            </p>
            <p>
              I build with React, Next.js, and TypeScript. The parts I spend the most
              time on are the ones that are easy to skip: loading states, error
              handling, what happens on a slow connection. The birthday website&apos;s
              photo gallery is where I got this wrong. It never loaded well on a slow
              connection, which is the first thing I would fix if I rebuilt it.
            </p>
            <p>
              I&apos;m currently open to <strong className="text-paper font-normal">internship and junior engineering roles</strong>.
              Looking to hire for freelance website work instead? That&apos;s a
              separate conversation: see{' '}
              <Link href="/services" className="text-accent-text hover:underline">
                Services
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
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
          </div>

        </div>
      </div>
    </section>
  )
}
