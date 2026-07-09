import { ArrowDown } from 'lucide-react'
import { WHATSAPP_URL } from '@/data/socialLinks'
import { CONTACT_CTA_LABEL } from '@/components/Navbar'
import { RevealGroup, RevealItem } from '@/components/Reveal'

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Perkenalan"
      className="relative flex flex-col justify-center pt-24 pb-16 min-h-[80dvh]"
    >
      <RevealGroup className="max-w-content mx-auto px-5 sm:px-8 w-full" stagger={0.1}>
        {/* Headline */}
        <RevealItem>
          <h1 className="font-semibold leading-[1.1] tracking-tight mb-6 text-4xl sm:text-5xl lg:text-6xl text-zinc-50 max-w-3xl">
            Website yang benar-benar bekerja untuk bisnis Anda.
          </h1>
        </RevealItem>

        {/* Sub */}
        <RevealItem>
          <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
            Saya Rafly, mahasiswa Informatika ITERA. Saya bangun website UMKM dan
            portfolio yang cepat, rapi, dan benar-benar terpakai.
          </p>
        </RevealItem>

        {/* CTAs */}
        <RevealItem className="flex flex-wrap gap-3">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            {CONTACT_CTA_LABEL}
          </a>
          <a href="#projects" className="btn-secondary">
            Lihat Proyek
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </RevealItem>
      </RevealGroup>
    </section>
  )
}
