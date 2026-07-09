import { MessageCircle, Mail, Github, Linkedin, ArrowRight } from 'lucide-react'
import { WHATSAPP_URL, GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/data/socialLinks'
import { CONTACT_CTA_LABEL } from '@/components/Navbar'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

interface ContactLink {
  icon: React.ElementType
  label: string
  description: string
  href: string
  ariaLabel: string
}

const contactLinks: ContactLink[] = [
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
      <RevealGroup className="max-w-2xl mx-auto px-5 sm:px-8 text-center" stagger={0.1}>

        {/* Header */}
        <RevealItem className="mb-10">
          <h2
            id="contact-heading"
            className="font-semibold text-3xl sm:text-4xl md:text-5xl text-zinc-50 leading-tight mb-5 tracking-tight"
          >
            Website Anda, mulai dari percakapan.
          </h2>
          <p className="text-zinc-400 text-base max-w-xl mx-auto leading-relaxed">
            Saya belum punya daftar klien untuk dipamerkan, karena saya baru mulai menerima
            proyek profesional. Yang saya tawarkan: proses yang jelas, komunikasi cepat, dan
            hasil yang bisa Anda cek sendiri di bagian Proyek. Ceritakan kebutuhan Anda, saya
            akan tanyakan hal yang perlu ditanyakan.
          </p>
        </RevealItem>

        {/* Primary CTA — same label as nav and hero, one intent, one name */}
        <RevealItem className="mb-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base py-3.5 px-7 inline-flex"
            aria-label={`${CONTACT_CTA_LABEL} via WhatsApp`}
          >
            <MessageCircle size={18} aria-hidden="true" />
            {CONTACT_CTA_LABEL}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </RevealItem>

        <RevealItem>
          <p className="text-zinc-500 text-xs mb-14">
            Respons dalam 1-3 jam di jam aktif (08.00-21.00 WIB)
          </p>
        </RevealItem>

        {/* Secondary links — flat, not boxed */}
        <RevealItem
          className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08] border-t border-b border-white/[0.08]"
        >
          <div className="flex flex-col sm:flex-row w-full" aria-label="Kontak alternatif">
            {contactLinks.map(({ icon: Icon, label, description, href, ariaLabel }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="flex-1 flex items-center justify-center gap-2.5 py-5 px-4 hover:bg-white/[0.02] transition-colors duration-150"
                aria-label={ariaLabel}
              >
                <Icon size={16} className="text-zinc-500 shrink-0" aria-hidden="true" />
                <span className="text-left">
                  <span className="block font-medium text-zinc-50 text-sm">{label}</span>
                  <span className="block text-zinc-500 text-xs">{description}</span>
                </span>
              </a>
            ))}
          </div>
        </RevealItem>

      </RevealGroup>
    </section>
  )
}
