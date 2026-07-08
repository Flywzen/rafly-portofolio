import { Github, Linkedin, MessageCircle } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/data/socialLinks'

const footerLinks = [
  { label: 'Tentang',    href: '#about'    },
  { label: 'Jasa',       href: '#services' },
  { label: 'Proyek',     href: '#projects' },
  { label: 'Tech Stack', href: '#techstack'},
  { label: 'Security',   href: '#security' },
  { label: 'Kontak',     href: '#contact'  },
]

const socialIcons = [
  { icon: Github,        href: GITHUB_URL,   label: 'GitHub Rafly'   },
  { icon: Linkedin,      href: LINKEDIN_URL, label: 'LinkedIn Rafly' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp Rafly' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gold/8 py-10" aria-label="Footer">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Brand */}
          <div>
            <p className="font-display font-bold text-xl text-gold-gradient mb-1">RF</p>
            <p className="text-tx-3 text-xs">Muhammad Rafly Yahya Ramadhan</p>
            <p className="text-tx-3 text-xs mt-0.5">Informatika · ITERA · Lampung</p>
          </div>

          {/* Nav — plain anchor hrefs, smooth scroll from CSS */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-xs text-tx-3 hover:text-tx-1 transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex gap-2.5" aria-label="Social media">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label={label}>
                <Icon size={14} aria-hidden="true" />
              </a>
            ))}
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-gold/6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-tx-3 text-xs">
            © {year} Rafly — Built with Next.js + TypeScript + Tailwind
          </p>
          <p className="text-tx-3 text-xs">
            Deployed on{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-tx-1 transition-colors duration-200">Vercel</a>
            {' · '}Source on{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-tx-1 transition-colors duration-200">GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
