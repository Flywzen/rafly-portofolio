'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { WHATSAPP_URL } from '@/data/socialLinks'
import { cn } from '@/lib/utils'

interface NavLink {
  label: string
  /** Section id on the homepage, e.g. 'about' for '#about'. */
  anchor: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Projects',   anchor: 'projects'   },
  { label: 'Philosophy', anchor: 'philosophy' },
  { label: 'About',      anchor: 'about'      },
  { label: 'Contact',    anchor: 'contact'    },
]

/** Single source of truth for the WhatsApp CTA label, used on the nav
 *  (only when already in the services journey) and on /services itself. */
export const CONTACT_CTA_LABEL = 'Discuss Your Website'

function scrollToSection(id: string): void {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isServicesRoute = pathname.startsWith('/services')

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

  // Homepage sentinel doesn't exist on other routes — treat any non-home
  // route as permanently "scrolled" so the nav background never sits
  // transparent over page content that starts right at the top.
  useEffect(() => {
    if (!isHome) setScrolled(true)
  }, [isHome])

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
      if (!isHome) return // let Link navigate to /#anchor normally
      e.preventDefault()
      setMenuOpen(false)
      scrollToSection(anchor)
    },
    [isHome],
  )

  // The persistent nav CTA respects the audience split: on /services it's
  // the WhatsApp pitch (you're already in "hire me" mode there); anywhere
  // else it's a plain, low-commitment link to the homepage Contact section.
  const navCta = isServicesRoute
    ? { label: CONTACT_CTA_LABEL, href: WHATSAPP_URL, external: true }
    : { label: 'Contact', href: '/#contact', external: false }

  return (
    <>
      {/* Invisible sentinel the observer above watches. Sits at the very top of the homepage. */}
      {isHome && <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-full" />}

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-colors duration-200',
          scrolled
            ? 'bg-ink/95 border-b border-white/20'
            : 'bg-transparent border-b border-transparent',
        )}
      >
        <nav
          className="max-w-content mx-auto px-5 sm:px-8 flex items-center justify-between h-16"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2" aria-label="Rafly, home">
            <span className="font-display italic text-lg text-paper">RF</span>
            <span className="text-paper0 text-base opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Rafly
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-5" role="list">
            {NAV_LINKS.map(({ label, anchor }) => (
              <li key={anchor}>
                <Link
                  href={`/#${anchor}`}
                  onClick={(e) => handleAnchorClick(e, anchor)}
                  className="text-paper/60 hover:text-paper text-base uppercase tracking-wide transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                className={cn(
                  'text-base uppercase tracking-wide transition-colors duration-150',
                  isServicesRoute ? 'text-signal' : 'text-paper/60 hover:text-paper',
                )}
                aria-current={isServicesRoute ? 'page' : undefined}
              >
                Services
              </Link>
            </li>
          </ul>

          {/* Desktop CTA */}
          {navCta.external ? (
            <a
              href={navCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hidden lg:inline-flex py-2 px-4 text-sm"
            >
              {navCta.label}
            </a>
          ) : (
            <Link
              href={navCta.href}
              onClick={(e) => isHome && handleAnchorClick(e, 'contact')}
              className="btn-primary hidden lg:inline-flex py-2 px-4 text-sm"
            >
              {navCta.label}
            </Link>
          )}

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-paper/60 hover:text-paper transition-colors p-1 -mr-1"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile drawer */}
        <div
          className={cn(
            'lg:hidden transition-all duration-200 overflow-hidden bg-ink/95 border-b border-white/20',
            menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
          )}
          aria-hidden={!menuOpen}
        >
          <ul className="px-5 py-4 flex flex-col gap-0.5" role="list">
            {NAV_LINKS.map(({ label, anchor }) => (
              <li key={anchor}>
                <Link
                  href={`/#${anchor}`}
                  onClick={(e) => handleAnchorClick(e, anchor)}
                  className="block py-2.5 text-paper/60 hover:text-paper text-base uppercase tracking-wide transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/services"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block py-2.5 text-base uppercase tracking-wide transition-colors duration-150',
                  isServicesRoute ? 'text-signal' : 'text-paper/60 hover:text-paper',
                )}
                aria-current={isServicesRoute ? 'page' : undefined}
              >
                Services
              </Link>
            </li>
            <li className="pt-3 mt-1 border-t border-white/20">
              {navCta.external ? (
                <a
                  href={navCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-sm w-full justify-center"
                >
                  {navCta.label}
                </a>
              ) : (
                <Link
                  href={navCta.href}
                  onClick={(e) => isHome && handleAnchorClick(e, 'contact')}
                  className="btn-primary text-sm w-full justify-center"
                >
                  {navCta.label}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  )
}
