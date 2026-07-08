'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { WHATSAPP_URL } from '@/data/socialLinks'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Tentang',    href: '#about'      },
  { label: 'Jasa',       href: '#services'   },
  { label: 'Proyek',     href: '#projects'   },
  { label: 'Tech Stack', href: '#techstack'  },
  { label: 'Security',   href: '#security'   },
  { label: 'Kontak',     href: '#contact'    },
]

function scrollToSection(href: string): void {
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault()
      setMenuOpen(false)
      scrollToSection(href)
    },
    [],
  )

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-base/95 backdrop-blur-md border-b border-gold/10 shadow-lg shadow-black/30'
          : 'bg-transparent',
      )}
    >
      <nav
        className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16"
        aria-label="Navigasi utama"
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2"
          aria-label="Ke bagian atas"
        >
          <span className="font-display font-bold text-xl text-gold-gradient">RF</span>
          <span className="text-tx-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Rafly
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="text-tx-2 hover:text-tx-1 text-sm font-medium transition-colors duration-200 relative
                           after:absolute after:bottom-[-3px] after:left-0 after:w-0 after:h-px
                           after:bg-gold after:transition-all after:duration-200 hover:after:w-full"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary hidden md:inline-flex py-2 px-4 text-sm"
        >
          Diskusi Website
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-tx-2 hover:text-tx-1 transition-colors p-1 -mr-1"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden transition-all duration-300 overflow-hidden bg-surface/95 backdrop-blur-md border-b border-gold/10',
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
        aria-hidden={!menuOpen}
      >
        <ul className="px-5 py-4 flex flex-col gap-0.5" role="list">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="block py-2.5 text-tx-2 hover:text-tx-1 text-sm font-medium transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
          <li className="pt-3 mt-1 border-t border-gold/10">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm w-full justify-center"
            >
              Diskusi Website
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
