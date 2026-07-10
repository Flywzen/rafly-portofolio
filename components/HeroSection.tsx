import { ArrowDown } from 'lucide-react'
import { WHATSAPP_URL } from '@/data/socialLinks'
import { CONTACT_CTA_LABEL } from '@/components/Navbar'
import { RevealGroup, RevealItem } from '@/components/Reveal'

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex flex-col justify-center pt-24 pb-16 min-h-[80dvh]"
    >
      <RevealGroup className="max-w-content mx-auto px-5 sm:px-8 w-full" stagger={0.1}>
        {/* Headline */}
        <RevealItem>
          <h1 className="leading-[1.7] mb-8 text-lg sm:text-xl lg:text-2xl text-zinc-50 max-w-2xl">
            A website that actually works for your business.
          </h1>
        </RevealItem>

        {/* Sub */}
        <RevealItem>
          <p className="text-zinc-400 text-lg sm:text-xl max-w-xl leading-relaxed mb-10">
            I&apos;m Rafly, a Computer Science student at ITERA. I build websites for
            small businesses and personal portfolios that are fast, clean, and actually
            get used.
          </p>
        </RevealItem>

        {/* CTAs */}
        <RevealItem className="flex flex-wrap gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {CONTACT_CTA_LABEL}
          </a>
          <a href="#projects" className="btn-secondary">
            View Projects
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}
