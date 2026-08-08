'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Github, Linkedin, MessageCircle } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/data/socialLinks'
import ScorpioMark from '@/components/ScorpioMark'

const sectionLinks = [
  { label: 'Projects',   anchor: 'projects'   },
  { label: 'Philosophy', anchor: 'philosophy' },
  { label: 'About',      anchor: 'about'      },
  { label: 'Contact',    anchor: 'contact'    },
]

const socialIcons = [
  { icon: Github,        href: GITHUB_URL,   label: 'GitHub Rafly'   },
  { icon: Linkedin,      href: LINKEDIN_URL, label: 'LinkedIn Rafly' },
  { icon: MessageCircle, href: WHATSAPP_URL, label: 'WhatsApp Rafly' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const pathname = usePathname()
  const isHome = pathname === '/'

  const handleAnchorClick = (e: React.MouseEvent, anchor: string) => {
    if (!isHome) return // let Link navigate to /#anchor normally
    e.preventDefault()
    document.querySelector(`#${anchor}`)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/20 py-10" aria-label="Footer">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <p className="font-display italic text-lg text-paper">RF</p>
              <ScorpioMark />
            </div>
            <p className="text-paper0 text-base">Muhammad Rafly Yahya Ramadhan</p>
            <p className="text-paper0 text-base">Computer Science · ITERA · Lampung, Indonesia</p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
              {sectionLinks.map(({ label, anchor }) => (
                <li key={anchor}>
                  <Link
                    href={`/#${anchor}`}
                    onClick={(e) => handleAnchorClick(e, anchor)}
                    className="text-base uppercase tracking-wide text-paper0 hover:text-paper transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-base uppercase tracking-wide text-paper0 hover:text-paper transition-colors duration-150"
                >
                  Services
                </Link>
              </li>
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
                className="w-9 h-9 border border-white/20 flex items-center justify-center text-paper0 hover:text-paper hover:border-white/40 transition-colors duration-150"
              >
                <Icon size={15} aria-hidden="true" />
              </a>
            ))}
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-paper0 text-base">
            © {year} Rafly · Built with Next.js, TypeScript, Tailwind
          </p>
          <p className="text-paper0 text-base">
            Deployed on{' '}
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors duration-150">Vercel</a>
            {' · '}Source on{' '}
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-paper transition-colors duration-150">GitHub</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
