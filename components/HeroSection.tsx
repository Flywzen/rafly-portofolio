import { ArrowRight } from 'lucide-react'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import SignatureSpiral from '@/components/SignatureSpiral'

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex flex-col justify-center pt-24 pb-16 min-h-[80dvh]"
    >
      <div className="relative max-w-content mx-auto px-5 sm:px-8 w-full">
        <RevealGroup stagger={0.1}>
          {/* Headline */}
          <RevealItem>
            <h1 className="leading-[1.05] mb-8 text-3xl sm:text-4xl lg:text-5xl text-paper max-w-2xl">
              I build software that works today, and holds up a year from now.
            </h1>
          </RevealItem>

          {/* Sub */}
          <RevealItem>
            <p className="text-paper/60 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
              Rafly, Computer Science student at ITERA. Real projects below, with the
              problems I ran into and how I solved them.
            </p>
          </RevealItem>

          {/* CTAs */}
          <RevealItem className="flex flex-wrap gap-3">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-secondary">
              Get in Touch
            </a>
          </RevealItem>
        </RevealGroup>

        <SignatureSpiral />
      </div>
    </section>
  )
}
