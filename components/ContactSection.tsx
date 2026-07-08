import { MessageCircle, Mail, Github, Linkedin, ArrowRight } from 'lucide-react'
import { WHATSAPP_URL, GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/data/socialLinks'

interface ContactCard {
  icon: React.ElementType
  label: string
  description: string
  href: string
  ariaLabel: string
}

const contactCards: ContactCard[] = [
  {
    icon: Mail,
    label: 'Email',
    description: EMAIL,
    href: `mailto:${EMAIL}`,
    ariaLabel: 'Kirim email ke Rafly',
  },
  {
    icon: Github,
    label: 'GitHub',
    description: 'Lihat source code proyek',
    href: GITHUB_URL,
    ariaLabel: 'Lihat profil GitHub Rafly',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    description: 'Koneksi profesional',
    href: LINKEDIN_URL,
    ariaLabel: 'Lihat profil LinkedIn Rafly',
  },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">

        {/* Header */}
        <div className="mb-12 reveal">
          <p className="section-label flex justify-center">Kontak</p>
          <h2
            id="contact-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-tx-1 leading-tight mb-5"
          >
            Website Anda,{' '}
            <span className="text-gold-gradient">mulai dari percakapan.</span>
          </h2>
          <p className="text-tx-2 text-base max-w-xl mx-auto leading-relaxed">
            Tidak perlu brief yang panjang. Ceritakan bisnis Anda, saya akan tanyakan hal yang
            perlu ditanyakan. Estimasi gratis, tanpa komitmen.
          </p>
        </div>

        {/* Primary CTA */}
        <div className="mb-4 reveal reveal-d1">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base py-4 px-8 inline-flex animate-pulse-gold"
            aria-label="Hubungi Rafly via WhatsApp untuk diskusi website"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Hubungi via WhatsApp
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <p className="text-tx-3 text-xs mb-14 reveal reveal-d2">
          Respons dalam 1–3 jam di jam aktif (08.00–21.00 WIB)
        </p>

        {/* Secondary cards */}
        <div
          className="grid sm:grid-cols-3 gap-4 reveal reveal-d3"
          aria-label="Kontak alternatif"
        >
          {contactCards.map(({ icon: Icon, label, description, href, ariaLabel }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="card p-5 flex flex-col items-center gap-2.5 text-center group"
              aria-label={ariaLabel}
            >
              <div
                className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-200"
                aria-hidden="true"
              >
                <Icon size={17} className="text-gold" />
              </div>
              <p className="font-display font-semibold text-tx-1 text-sm">{label}</p>
              <p className="text-tx-3 text-xs break-all">{description}</p>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
