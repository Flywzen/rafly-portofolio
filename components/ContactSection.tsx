import { MessageCircle, Mail, Github, Linkedin } from 'lucide-react'
import { WHATSAPP_URL, GITHUB_URL, LINKEDIN_URL, EMAIL } from '@/data/socialLinks'
import { RevealGroup, RevealItem } from '@/components/Reveal'

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
    icon: Linkedin,
    label: 'LinkedIn',
    description: 'Roles, referrals, networking',
    href: LINKEDIN_URL,
    ariaLabel: "View Rafly's LinkedIn profile",
  },
  {
    icon: Github,
    label: 'GitHub',
    description: 'Code, commits, real work',
    href: GITHUB_URL,
    ariaLabel: "View Rafly's GitHub profile",
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    description: 'Freelance project inquiries',
    href: WHATSAPP_URL,
    ariaLabel: 'Message Rafly on WhatsApp',
  },
]

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad"
    >
      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">

        {/* Header */}
        <div className="mb-10">
          <h2
            id="contact-heading"
            className="text-2xl sm:text-3xl text-paper leading-[1.15] mb-6"
          >
            Get in touch.
          </h2>
          <p className="text-paper/60 text-lg max-w-xl mx-auto leading-relaxed">
            Email or LinkedIn for roles and opportunities. WhatsApp if you are here
            about freelance website work.
          </p>
        </div>

        {/* Channels — equal weight, not one dominant CTA, on purpose */}
        <RevealGroup
          className="grid grid-cols-2 divide-x divide-y divide-white/20 border border-white/20"
          stagger={0.06}
        >
          {contactLinks.map(({ icon: Icon, label, description, href, ariaLabel }) => (
            <RevealItem key={label}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="flex flex-col items-center justify-center gap-1.5 py-8 px-4 h-full hover:bg-white/[0.04] transition-colors duration-150"
                aria-label={ariaLabel}
              >
                <Icon size={20} className="text-paper0 shrink-0 mb-1" aria-hidden="true" />
                <span className="text-paper text-base">{label}</span>
                <span className="text-paper0 text-sm">{description}</span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

      </div>
    </section>
  )
}
