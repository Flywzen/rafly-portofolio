import type { TechCategory } from '@/types'

export const techStack: TechCategory[] = [
  {
    category: 'Frontend',
    items: [
      { name: 'React 18',      level: 'solid'    },
      { name: 'Next.js 14',    level: 'solid'    },
      { name: 'TypeScript',    level: 'solid'    },
      { name: 'Tailwind CSS',  level: 'solid'    },
      { name: 'Vite',          level: 'solid'    },
      { name: 'HTML & CSS',    level: 'solid'    },
    ],
  },
  {
    category: 'UI / Design',
    items: [
      { name: 'Figma',           level: 'solid'    },
      { name: 'Responsive Design', level: 'solid' },
      { name: 'Canva',           level: 'solid'    },
      { name: 'Design System',   level: 'learning' },
    ],
  },
  {
    category: 'Tools & Deploy',
    items: [
      { name: 'Git & GitHub', level: 'solid'    },
      { name: 'Vercel',       level: 'solid'    },
      { name: 'Netlify',      level: 'solid'    },
      { name: 'VS Code',      level: 'solid'    },
    ],
  },
  {
    category: 'Web Security',
    items: [
      { name: 'OWASP Top 10',    level: 'learning' },
      { name: 'PortSwigger Labs', level: 'learning' },
      { name: 'Burp Suite',      level: 'learning' },
      { name: 'TryHackMe',       level: 'learning' },
    ],
  },
]

export const marqueeItems: string[] = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite',
  'Figma', 'Git', 'Vercel', 'HTML & CSS', 'Netlify',
  'Responsive Design', 'OWASP', 'Burp Suite', 'TryHackMe',
  'UI/UX', 'Web Security', 'Clean Code',
]
