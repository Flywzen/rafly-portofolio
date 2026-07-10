import { Github, Linkedin, MessageCircle } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/data/socialLinks'

const footerLinks = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Security', href: '#security' },
  { label: 'Contact',  href: '#contact'  },
]

const socialIcons = [
  { icon: Github,        href: GITHUB_URL,   label: 'GitHub Rafly'   },
  { icon: Linkedin,      href: LINKEDIN_URL, label: 'LinkedIn Rafly' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp Rafly' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-2 border-white/20 py-10" aria-label="Footer">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Brand */}
          <div>
            <p className="font-pixel text-sm text-zinc-50 mb-2">RF</p>
            <p className="text-zinc-500 text-base">Muhammad Rafly Yahya Ramadhan</p>
            <p className="text-zinc-500 text-base">Computer Science · ITERA · Lampung, Indonesia</p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {footerLinks.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="text-base uppercase tracking-wide text-zinc-500 hover:text-zinc-50 transition-colors duration-150">
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
                className="w-9 h-9 border-2 border-white/20 flex items-center justify-center text-zinc-500 hover:text-zinc-50 hover:border-white/40 transition-colors duration-150"
              >
                <Icon size={15} aria-hidden="true" />
              </a>
            ))}
          </div>

        </div>

        <div className="mt-8 pt-6 border-t-2 border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-500 text-base">
            © {year} Rafly · Built with Next.js, TypeScript, Tailwind
          </p>
          <p className="text-zinc-500 text-base">
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
