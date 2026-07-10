import type { SocialLink } from '@/types'

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/USERNAME',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/USERNAME',
    icon: 'linkedin',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/628XXXXXXXXX?text=Hi%20Rafly%2C%20I%20would%20like%20to%20discuss%20a%20website%20project',
    icon: 'whatsapp',
  },
  {
    label: 'Email',
    href: 'mailto:rafly@example.com',
    icon: 'mail',
  },
]

// Used in multiple components — single source of truth
export const WHATSAPP_URL =
  'https://wa.me/628XXXXXXXXX?text=Hi%20Rafly%2C%20I%20would%20like%20to%20discuss%20a%20website%20project'

export const GITHUB_URL   = 'https://github.com/USERNAME'
export const LINKEDIN_URL = 'https://linkedin.com/in/USERNAME'
export const EMAIL        = 'rafly@example.com'
