import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'birthday-dad',
    title: "My Father's 50th Birthday Website",
    subtitle: 'Personal storytelling for a birthday that mattered',
    category: 'Personal Project',
    tags: ['Storytelling', 'Personal'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    problem:
      "A WhatsApp message felt too small for my father's 50th birthday. Family was spread across different cities and couldn't gather in person.",
    goal:
      'A personal website accessible anytime, with a family photo gallery, an open letter, and a real-time age counter.',
    role: 'Solo developer: concept, design, development, deployment.',
    features: [
      'Real-time age counter (days, hours, minutes, seconds)',
      'Family photo gallery with lightbox',
      'An open letter, set in comfortable, readable typography',
      'Shareable via a short link',
      'Mobile-first, fast to load',
    ],
    challenges:
      'Building an accurate age counter from a birth date and time without an external library, while keeping the bundle small.',
    result:
      'Live on the day itself. Family in three different cities visited and left messages at the same time.',
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/birthday-dad',
    // imageUrl: '/images/birthday-dad.png',  <- uncomment + add file after taking a screenshot
  },
  {
    id: 'desa-kkn',
    title: 'Village Website (KKN Program)',
    subtitle: 'A public information portal for a village government',
    category: 'Civic / Community Service',
    tags: ['Public', 'Information'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    problem:
      'The village where I completed my community service placement (KKN) had no digital presence residents or outsiders could use to learn about the village, read news, or find services.',
    goal:
      "A village information website that's easy to manage, fast on weak connections, and doubles as proof of the placement's contribution.",
    role: 'Solo developer, from wireframe to deployment.',
    features: [
      'Village profile: history, vision and mission, government structure',
      'News and announcements',
      'Basic demographic data',
      'Location map via embedded Google Maps',
      'Photo gallery of village activities',
      'Contact info and resident services',
    ],
    challenges:
      'Designing it so non-technical village staff could understand the content without manual updates. Solution: content managed through a simple TypeScript/JSON file.',
    result:
      "Live, used as a reference in the placement's final report, and handed over to the village head.",
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/desa-kkn',
    // imageUrl: '/images/desa-kkn.png',
  },
  {
    id: 'kiroku',
    title: 'Kiroku',
    subtitle: 'A life-logging app: journal, finances, routines',
    category: 'Web App',
    tags: ['Productivity', 'Personal'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
    problem:
      'My notes on life were scattered across Notes, WhatsApp messages to myself, a physical notebook, and spreadsheets that never talked to each other.',
    goal:
      'One minimal app for a daily journal, tracking finances, building routines, and recording life milestones.',
    role: 'Solo developer and product designer.',
    features: [
      'Daily journal with lightweight markdown',
      'Finance tracking: income, expenses, balance',
      'Routine tracker with a streak counter',
      'Milestone board for bigger goals',
      'Data stored locally, no account, no server',
      'Dark mode by default',
    ],
    challenges:
      'Designing state management that stayed reliable without Redux, and making sure local data survived a browser clear (IndexedDB fallback).',
    result:
      'MVP live and self-used for 30+ days. Now doubles as a demo of full frontend development ability.',
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/kiroku',
    // imageUrl: '/images/kiroku.png',
  },
  {
    id: 'umkm-landing',
    title: 'Small Business Landing Page',
    subtitle: 'Service demo: a landing page for a local business',
    category: 'Freelance Demo',
    tags: ['Small Business', 'Demo', 'Freelance'],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    problem:
      'Local small businesses rely on Instagram to sell, but have no page that shows products, testimonials, and a call to action in one structured place.',
    goal:
      'A single-page landing site that helps turn visitors into buyers: fast, mobile-first, easy to update.',
    role: 'Web developer + basic content consultant.',
    features: [
      'Hero section with product photos and a WhatsApp CTA',
      'Featured products section with pricing',
      'Customer testimonials',
      'Short FAQ',
      'Footer with contact info and location',
    ],
    challenges:
      'Convincing the client that conversion depends on speed and message clarity, not feature count.',
    result:
      'The live demo is now used as a reference when pitching to other small businesses. Positive response from 3 prospective clients.',
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/umkm-landing',
    // imageUrl: '/images/umkm-landing.png',
  },
]
