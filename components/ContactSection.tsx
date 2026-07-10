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
    ariaLabel: 'Email Rafly',
  },
  {
    icon: Github,
    label: 'GitHub',
    description: 'View project source code',
    href: GITHUB_URL,
    ariaLabel: "View Rafly's GitHub profile",
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    description: 'Professional network',
    href: LINKEDIN_URL,
    ariaLabel: "View Rafly's LinkedIn profile",
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
            className="text-xl sm:text-2xl text-zinc-50 leading-[1.8] mb-6"
          >
            Your website starts with a conversation.
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
            I don&apos;t have a client list to show off yet, since I&apos;m just starting
            to take on professional projects. What I do offer: a clear process, fast
            communication, and results you can check for yourself in the Projects
            section. Tell me what you need, and I&apos;ll ask the right questions.
          </p>
        </RevealItem>

        {/* Primary CTA — same label as nav and hero, one intent, one name */}
        <RevealItem className="mb-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-3.5 px-7 inline-flex text-[0.75rem]"
            aria-label={`${CONTACT_CTA_LABEL} via WhatsApp`}
          >
            <MessageCircle size={18} aria-hidden="true" />
            {CONTACT_CTA_LABEL}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </RevealItem>

        <RevealItem>
          <p className="text-zinc-500 text-base mb-14">
            Replies within 1-3 hours during active hours (8 AM-9 PM WIB)
          </p>
        </RevealItem>

        {/* Secondary links — flat, not boxed */}
        <RevealItem
          className="flex flex-col sm:flex-row divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-white/20 border-t-2 border-b-2 border-white/20"
        >
          <div className="flex flex-col sm:flex-row w-full" aria-label="Other ways to reach me">
            {contactLinks.map(({ icon: Icon, label, description, href, ariaLabel }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="flex-1 flex items-center justify-center gap-2.5 py-5 px-4 hover:bg-white/[0.04] transition-colors duration-150"
                aria-label={ariaLabel}
              >
                <Icon size={18} className="text-zinc-500 shrink-0" aria-hidden="true" />
                <span className="text-left">
                  <span className="block text-zinc-50 text-base">{label}</span>
                  <span className="block text-zinc-500 text-sm">{description}</span>
                </span>
              </a>
            ))}
          </div>
        </RevealItem>

      </RevealGroup>
    </section>
  )
}
