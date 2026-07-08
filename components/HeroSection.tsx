import { ArrowDown, Github, Linkedin, MessageCircle } from 'lucide-react'
import { marqueeItems } from '@/data/techStack'
import { WHATSAPP_URL, GITHUB_URL, LINKEDIN_URL } from '@/data/socialLinks'

const marqueeDouble = [...marqueeItems, ...marqueeItems]

interface StatItem {
  value: string
  label: string
}

const stats: StatItem[] = [
  { value: '4+',    label: 'Proyek selesai' },
  { value: 'Rp0',  label: 'Modal awal'      },
  { value: 'ITERA', label: 'Informatika'    },
  { value: '2025',  label: 'Aktif'           },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      aria-label="Perkenalan"
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-12 overflow-hidden"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,162,39,.7) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(201,162,39,.7) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      {/* Ambient glow */}
      <div aria-hidden="true" className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-gold/[0.045] blur-[110px] pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-teal/[0.04] blur-[90px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
        {/* Status pill */}
        <div className="mb-8 animate-fade-up">
          <span className="badge badge-teal">
            <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-teal mr-1.5 animate-pulse" />
            Tersedia untuk proyek baru
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold leading-[1.08] mb-6 animate-fade-up">
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-tx-1">Website yang</span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold-gradient">benar-benar bekerja</span>
          <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-tx-1">untuk bisnis Anda.</span>
        </h1>

        {/* Sub */}
        <p className="text-tx-2 text-base sm:text-lg max-w-2xl leading-relaxed mb-10 reveal">
          Saya <strong className="text-tx-1 font-medium">Rafly</strong>, mahasiswa Informatika ITERA.
          Saya membangun website UMKM, company profile, dan portfolio personal — fungsional, cepat,
          dan tampilannya tidak generik. Saya juga belajar keamanan web secara aktif.
        </p>

        {/* CTAs — plain anchor hrefs; scroll-behavior:smooth handles the rest */}
        <div className="flex flex-wrap gap-3 mb-14 reveal reveal-d1">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <MessageCircle size={16} aria-hidden="true" />
            Diskusi Website
          </a>
          <a href="#projects" className="btn-secondary">
            Lihat Proyek
            <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>

        {/* Social */}
        <div className="flex items-center gap-5 mb-16 reveal reveal-d2">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-tx-3 hover:text-tx-1 text-sm transition-colors duration-200">
            <Github size={15} aria-hidden="true" /> GitHub
          </a>
          <span aria-hidden="true" className="w-px h-4 bg-tx-3/40" />
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-tx-3 hover:text-tx-1 text-sm transition-colors duration-200">
            <Linkedin size={15} aria-hidden="true" /> LinkedIn
          </a>
        </div>

        {/* Stats */}
        <dl className="flex flex-wrap gap-8 sm:gap-12 reveal reveal-d3">
          {stats.map(({ value, label }) => (
            <div key={label}>
              <dt className="sr-only">{label}</dt>
              <dd className="font-display font-bold text-2xl text-gold">{value}</dd>
              <p className="text-tx-3 text-xs mt-0.5" aria-hidden="true">{label}</p>
            </div>
          ))}
        </dl>
      </div>

      {/* Marquee */}
      <div aria-hidden="true" className="relative z-10 mt-16 overflow-hidden py-4 border-y border-gold/8">
        <div className="flex animate-marquee whitespace-nowrap">
          {marqueeDouble.map((item, i) => (
            <span key={i} className="mx-6 text-sm text-tx-3 font-display font-medium tracking-wide shrink-0">
              <span className="text-gold/35 mr-2">·</span>{item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
