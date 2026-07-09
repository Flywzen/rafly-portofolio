import { Github, Linkedin, MessageCircle } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/data/socialLinks'

const footerLinks = [
  { label: 'Tentang',  href: '#about'    },
  { label: 'Jasa',     href: '#services' },
  { label: 'Proyek',   href: '#projects' },
  { label: 'Security', href: '#security' },
  { label: 'Kontak',   href: '#contact'  },
]

const socialIcons = [
  { icon: Github,        href: GITHUB_URL,   label: 'GitHub Rafly'   },
  { icon: Linkedin,      href: LINKEDIN_URL, label: 'LinkedIn Rafly' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp Rafly' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.08] py-10" aria-label="Footer">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Brand */}
          <div>
            <p className="font-semibold text-lg text-zinc-50 mb-1">RF</p>
            <p className="text-zinc-500 text-xs">Muhammad Rafly Yahya Ramadhan</p>
            <p className="text-zinc-500 text-xs mt-0.5">Informatika · ITERA · Lampung</p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-xs text-zinc-500 hover:text-zinc-50 transition-colors duration-150">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex gap-2" aria-label="Social media">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-sm border border-white/[0.1] flex items-center justify-center text-zinc-500 hover:text-zinc-50 hover:border-white/[0.2] transition-colors duration-150"
              >
                <Icon size={14} aria-hidden="true" />
              </a>
            ))}
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-500 text-xs">
            © {year} Rafly · Built with Next.js, TypeScript, Tailwind
          </p>
          <p className="text-zinc-500 text-xs">
            Deployed on{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-50 transition-colors duration-150">Vercel</a>
            {' · '}Source on{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-50 transition-colors duration-150">GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
