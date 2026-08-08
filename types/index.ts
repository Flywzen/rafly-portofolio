// Shared TypeScript interfaces for the portfolio

export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  tags: string[]
  stack: string[]
  /** One or two sentences: what this project was and why it existed. */
  context: string
  /** The specific problem, stated concretely, not "poor UX." */
  problem: string
  /** How I approached solving it, not just what I wanted to build. */
  approach: string
  /** 2-3 specific technical decisions and the reasoning behind each,
   *  not a features list. What did I choose, and why that over the
   *  obvious alternative? */
  architectureDecisions: string[]
  /** The concrete technical difficulty, and how I actually solved it. */
  technicalChallenges: string
  /** 2-3 honest trade-offs: what I gave up in exchange for what, stated
   *  plainly. A project with no trade-offs either had no real decisions
   *  or isn't being described honestly. */
  tradeoffs: string[]
  /** The concrete, checkable result. */
  outcome: string
  /** What I'd do differently, or what surprised me. Genuine reflection,
   *  not a victory lap. */
  lessonsLearned: string
  /** One specific, concrete thing that would be different if this were
   *  started today, not "I'd use better practices." A real answer names
   *  a real alternative. */
  ifRebuiltToday: string
  demoUrl: string
  githubUrl: string
  /** Optional: path to screenshot in /public/images/, e.g. '/images/kiroku.png' */
  imageUrl?: string
}

export interface Service {
  id: string
  title: string
  subtitle: string
  /** Qualitative scope signal, deliberately not a price or fixed timeline. */
  scope: string
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
