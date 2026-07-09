'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { WHATSAPP_URL } from '@/data/socialLinks'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Tentang',  href: '#about'    },
  { label: 'Jasa',     href: '#services' },
  { label: 'Proyek',   href: '#projects' },
  { label: 'Security', href: '#security' },
  { label: 'Kontak',   href: '#contact'  },
]

/** Single source of truth for the "start a conversation" CTA label,
 *  used identically in the nav, hero, and contact section. */
export const CONTACT_CTA_LABEL = 'Diskusi Website'

function scrollToSection(href: string): void {
  const el = document.querySelector(href)
  el?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver instead of a scroll listener: no per-frame work,
  // no re-renders on every pixel of scroll.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-40px 0px 0px 0px' },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
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
    <>
      {/* Invisible sentinel the observer above watches. Sits at the very top of the page. */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-full" />

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-200',
          scrolled
            ? 'bg-zinc-950/90 backdrop-blur-md border-b border-white/[0.08]'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <nav
          className="max-w-content mx-auto px-5 sm:px-8 flex items-center justify-between h-16"
          aria-label="Navigasi utama"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex items-center gap-2"
            aria-label="Ke bagian atas"
          >
            <span className="font-semibold text-lg text-zinc-50">RF</span>
            <span className="text-zinc-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Rafly
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-6" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className="text-zinc-400 hover:text-zinc-50 text-sm font-medium transition-colors duration-150"
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
            className="btn-primary hidden lg:inline-flex py-2 px-4 text-sm"
          >
            {CONTACT_CTA_LABEL}
          </a>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-zinc-400 hover:text-zinc-50 transition-colors p-1 -mr-1"
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
            'lg:hidden transition-all duration-200 overflow-hidden bg-zinc-950/95 backdrop-blur-md border-b border-white/[0.08]',
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
                  className="block py-2.5 text-zinc-400 hover:text-zinc-50 text-sm font-medium transition-colors duration-150"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-3 mt-1 border-t border-white/[0.08]">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm w-full justify-center"
              >
                {CONTACT_CTA_LABEL}
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}
