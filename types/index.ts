// Shared TypeScript interfaces for the portfolio

export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  tags: string[]
  stack: string[]
  problem: string
  goal: string
  role: string
  features: string[]
  challenges: string
  result: string
  demoUrl: string
  githubUrl: string
  /** Optional: path to screenshot in /public/images/, e.g. '/images/kiroku.png' */
  imageUrl?: string
}

export interface Service {
  id: string
  title: string
  subtitle: string
  price: string
  priceNote?: string
  duration: string
  featured: boolean
  deliverables: string[]
  note?: string
}

export interface SocialLink {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'whatsapp' | 'mail'
}

export interface WriteUp {
  title: string
  tags: string[]
  description: string
  impact: string
}

export interface LearningPhase {
  phase: string
  title: string
  status: 'done' | 'active' | 'upcoming'
  items: string[]
}
