
**Muhammad Rafly Yahya Ramadhan**, web developer & UI/UX.

**Live:** [rafly.vercel.app](https://rafly.vercel.app) *(update after deploying)*

---

## Stack

| Layer        | Tech                                    |
|--------------|-----------------------------------------|
| Framework    | Next.js 14 (App Router)                 |
| Language     | TypeScript (strict)                     |
| Styling      | Tailwind CSS v3                         |
| Motion       | framer-motion (scroll-reveal + expand/collapse only) |
| Testing      | Vitest (pure functions only, no DOM)    |
| Icons        | Lucide React                            |
| Fonts        | Press Start 2P + VT323 (@fontsource, self-hosted) + Geist Mono (next/font, code only) |
| Deployment   | Vercel                                  |
| Source       | GitHub                                  |

Zero external UI libraries. Zero paid dependencies. Zero backend.

---

## Folder Structure

```
rafly-portfolio/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, viewport, shared Navbar/Footer
│   ├── page.tsx             # Homepage: personal branding only, no pricing
│   ├── globals.css         # Tailwind + design system utilities
│   └── services/
│       └── page.tsx        # Freelance pitch: what I build, process, FAQ, no fixed prices
│
├── components/
│   ├── Reveal.tsx             # Client, framer-motion scroll-reveal primitives (Reveal, RevealGroup, RevealItem)
│   ├── ExpandPanel.tsx        # Client, shared accordion primitive (project case studies + FAQ)
│   ├── PixelCorners.tsx      # Client-safe hover accent: 4 corner pixels on interactive cards
│   ├── MotionProvider.tsx    # Client, LazyMotion wrapper (loads domAnimation only)
│   ├── Navbar.tsx            # Client, route-aware nav (anchors on home, real links elsewhere)
│   ├── HeroSection.tsx       # Server, headline, CTA (homepage only)
│   ├── AboutSection.tsx      # Server, bio prose (homepage only)
│   ├── PhilosophySection.tsx # Server, "How I Think", narrative not a principles list (homepage only)
│   ├── ServiceCard.tsx       # Server, one package card (scope, not price; /services only)
│   ├── FaqItem.tsx           # Server wrapper around ExpandPanel (/services only)
│   ├── ProjectCard.tsx       # Server, expandable case study card (ExpandPanel inside)
│   ├── CaseStudyFields.tsx   # Shared row definitions (used by ProjectCard + CaseStudySection)
│   ├── CaseStudySection.tsx  # Server, standalone full case study view
│   ├── FeaturedProjects.tsx  # Server, grid wrapper for ProjectCard (homepage only)
│   ├── CybersecuritySection.tsx # Server, dev/sec bridge + write-ups + roadmap (homepage only)
│   ├── ContactSection.tsx    # Server, four equal-weight contact channels (homepage only)
│   └── Footer.tsx            # Client, route-aware nav, socials, copyright
│
├── data/
│   ├── projects.ts         # Typed project data (Project[])
│   ├── services.ts         # Typed service packages (Service[]), scope not price
│   └── socialLinks.ts      # Typed social links + URL constants
│
├── lib/
│   ├── motion.ts           # Motion tokens: easing, duration, spring configs
│   ├── project-links.ts    # Shared placeholder-URL detection (+ test)
│   ├── security-status.ts  # Security roadmap status -> label/style (+ test)
│   └── utils.ts            # cn(), merge class names (+ test)
│
├── types/
│   └── index.ts            # Shared TypeScript interfaces
│
├── public/
│   └── favicon.svg
│
├── .gitignore
├── .eslintrc.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## ADR: Splitting Home and Services

**Status:** Active, as of the audience-split redesign.

**Context:** This site serves two audiences with different goals: recruiters and
engineering leads evaluating Rafly as an engineer, and small business owners
deciding whether to hire him for freelance website work. Earlier versions put both
on one scrolling homepage, pricing cards included, between About and Projects.

**Problem:** A recruiter scrolling past four pricing cards to reach the project
portfolio reads as a small business's website-for-hire, not an engineer's portfolio.
The two pitches also want different tones: the homepage can be quiet and let the
work speak; a freelance pitch has to actively make the case and ask for the sale.
Blending them weakened both.

**Decision:**
- `/` (homepage) is personal branding only: who I am, what I've built, how I think,
  why I'm worth trusting, how to reach me. No pricing, no service pitch.
- `/services` is a separate, deliberately-entered page for the freelance pitch: what
  I build, how a project starts, FAQ, WhatsApp CTA. One page, not a fragmented
  `/services/process` + `/services/faq` split, the content is short enough that
  extra page loads would cost more in friction than they'd gain in separation.
- Pricing is not published anywhere. `Service.scope` (a qualitative sentence) replaced
  `Service.price` and `Service.duration` in `types/index.ts`. Every project gets
  scoped individually over WhatsApp instead.
- Navbar and Footer are rendered once, in `app/layout.tsx`, and are route-aware:
  section links resolve to same-page smooth-scroll on `/` and to `/#section`
  navigation from anywhere else. The "Services" nav item is a real route link, not
  an anchor, and gets a highlighted active state when already on `/services`. The
  nav's persistent CTA button also switches: "Discuss Your Website" (WhatsApp) on
  `/services`, a plain "Contact" (`/#contact`) everywhere else. The audience split
  is enforced in the shared chrome, not only the page content.

**Trade-off, stated plainly:** removing visible pricing raises the bar to message a
stranger on WhatsApp. For an established freelancer this is a reasonable trade for
looking more credible; for someone with zero clients and Rp0 starting capital, it is
a real cost against conversion, not a free upgrade. Worth revisiting once the first
few clients are in.

---

## ADR: Homepage Section Order, and When Motion Earns Its Place

**Status:** Active.

**Section order, proof before reflection:** the homepage went through a version
ordered `Hero → About → Philosophy → Projects → Security → Contact`. That order had
a real bug: the Philosophy section's evidence lines name specific projects by name
("Kiroku's roadmap dropped a comment wall...") before the reader has seen Projects
at all, an unexplained namedrop instead of a callback. Current order is
`Hero → Projects → Security → Philosophy → About → Contact`: proof first (what got
built), then the specialized differentiator (Security), then reflection on the
proof just shown (Philosophy, "How I Think"), then identity (About, kept short and
positioned as a close rather than an opener since Security already carries the
build/security angle), then the ask (Contact).

**Motion, one page-load moment, animation only where it signals something real:**
an earlier pass wrapped almost every section heading in the same scroll-triggered
fade-and-rise (`<Reveal>`), which is itself a template pattern once it's the
identical treatment applied to a dozen different headings in a row, motion as
decoration wearing the appearance of purpose. Current rule, applied throughout:

- Each page gets exactly one sequential stagger (`<RevealGroup>` + `<RevealItem>`
  on 2-3 elements), its own hero. `HeroSection` on `/`, the H1/sub/CTA block on
  `/services`. This is the one place a staggered reveal mirrors how a person
  reads content in order, and it happens once per page, not per section.
- Grids of parallel items keep `<RevealGroup>` + `<RevealItem>` stagger:
  the project grid, the three Security grids (dev/sec examples, write-ups,
  roadmap), the four Contact channels, the service-card grid and FAQ list on
  `/services`. The stagger there communicates "these are related," which is real
  information, not decoration.
- Everything else, standalone section headings and intro paragraphs, single blocks
  of prose like Philosophy or the current About, renders as a plain `<div>`. No
  `Reveal` import if a file doesn't need one. If content isn't a page's entry
  moment and isn't a set of related items, animating it on scroll wasn't
  communicating anything, it was just the site's default.

---

## Setup & Run

### 1. Clone the repo

```bash
git clone https://github.com/USERNAME/rafly-portfolio.git
cd rafly-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the dev server

```bash
npm run dev
# Open http://localhost:3000
```

### 4. Production build

```bash
npm run build
npm run start   # Preview the production build locally
```

### 5. Run tests

```bash
npm test
```

Covers the pure logic that used to be silently duplicated or untested:
`cn()`, the placeholder-URL detection shared by `ProjectCard` and
`CaseStudySection` (`lib/project-links.ts`), the security roadmap's
status-to-style mapping (`lib/security-status.ts`), and the shape of
`getCaseStudyFields()`'s output. Deliberately does not test components
directly, no React Testing Library, no jsdom, everything covered is a
plain function with a clear input and output. If interactive behavior
(the mobile menu, the expand/collapse animation) ever needs coverage,
that is a different, heavier setup, and should stay separate rather
than making every test file pull in a DOM.

---

## Deploy to Vercel

### Option A: GUI (recommended)

1. Push the code to GitHub
2. Open [vercel.com](https://vercel.com) → **Add New Project**
3. Import the repo from GitHub
4. Framework Preset: **Next.js** (auto-detected)
5. Click **Deploy**

Vercel rebuilds automatically on every `git push` to `main`.

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option C: GitHub Actions (optional, advanced)

Create `.github/workflows/deploy.yml` using the `vercel/actions` action.

---

## Customizing Content

All portfolio content lives in the `data/` folder. No need to touch the components.

### Update projects

Edit `data/projects.ts`:

```typescript
// Replace '#' with real URLs once the project is live
demoUrl: 'https://project-name.vercel.app',
githubUrl: 'https://github.com/USERNAME/project-name',
```

### Update service packages

Edit `data/services.ts`, change `scope` and `deliverables`. There is no `price`
field on purpose (see the ADR above); `scope` is a sentence describing when that
package fits, not a number.

### Update social links & WhatsApp number

Edit `data/socialLinks.ts`:

```typescript
export const WHATSAPP_URL =
  'https://wa.me/628XXXXXXXXX?text=Hi%20Rafly...'
//                  ^^^^^^^^^^ replace with a real number

export const GITHUB_URL   = 'https://github.com/YOUR_USERNAME'
export const LINKEDIN_URL = 'https://linkedin.com/in/YOUR_USERNAME'
export const EMAIL        = 'your@email.com'
```

Changes in `socialLinks.ts` automatically propagate everywhere they're used
(Navbar, About, Contact, Footer, `/services`) since every component imports from
there instead of hardcoding a link.

---

## Pre-Deploy Checklist

- [ ] Replace `WHATSAPP_URL` with a real, active WhatsApp number in `data/socialLinks.ts`
- [ ] Replace `GITHUB_URL` and `LINKEDIN_URL` with real accounts
- [ ] Replace `EMAIL` with an active email address
- [ ] Update `demoUrl` and `githubUrl` in `data/projects.ts` once each project is live
- [ ] Update the name and bio in `components/AboutSection.tsx` if needed
- [ ] Replace the live URL on the first line of this README after deploying
- [ ] Test on Chrome mobile (DevTools > Toggle device toolbar)
- [ ] Test smooth scroll on every navbar link
- [ ] Test ProjectCard expand/collapse on mobile
- [ ] Confirm `<html lang="en">` is correct in `app/layout.tsx`

---

## Responsive Checklist

```
Mobile  (320-480px)  -> vertical hero stack, hamburger navbar
Tablet  (481-768px)  -> 2-column grid for services & projects
Desktop (769px+)     -> 4-column grid for services, 2-column for projects
```

Test in Chrome: DevTools → Toggle Device Toolbar → pick Pixel 7, iPhone 14, iPad.

---

## Design System

**Full pixel-art reskin** (a deliberate choice, see the note below). 0 radius on every
element, thick borders, hard-offset shadows (not blur), two pixel/terminal fonts. The
color system and layout/IA underneath are unchanged from the previous version: one
accent, neutral zinc, the same 6 sections.

### Colors

| Token          | Hex       | Usage                                   |
|----------------|-----------|-------------------------------------------|
| `zinc-950`     | `#09090b` | Main background                         |
| `zinc-900`     | —         | Surface/card background (see `.surface`) |
| `zinc-50`      | `#fafafa` | Primary text                            |
| `zinc-400`     | `#a1a1aa` | Secondary text                          |
| `zinc-500/600` | —         | Muted text / small labels               |
| `accent`       | `#2F5FE0` | Solid button fill (contrasts with white text) |
| `accent-text`  | `#6B93FF` | Text/links/icons on dark backgrounds    |
| `pixel-yellow` | `#F5D033` | Highlight/selection only: hover corner-bracket, focus ring, "Popular" tier |

`accent` and `accent-text` are deliberately two shades of the same hue: `accent` fills
buttons (contrasts against white text), `accent-text` is for text/links on dark
backgrounds. Both are checked against WCAG AA contrast (≥4.5:1).

`pixel-yellow` is a second accent, added specifically for the pixel-art aesthetic
(reference: retro-game selection cursors). It does **one job** in exactly three places:
the 4 corner pixels on `ProjectCard` hover (`components/PixelCorners.tsx`), the
`:focus-visible` outline site-wide, and the border + "Popular" tier badge on
`ServiceCard`. It's not used for arbitrary category/status color-coding, same
one-color-one-job rule as `accent`.

### Fonts

Two pixel fonts, deliberately unequal in how much of the site they carry:

- **VT323** (`font-sans`, default): everything, headings included (`h1`/`h2`/`h3` pick
  this up automatically via base layer CSS, normal case, not uppercase). Reads as
  pixel/terminal without becoming illegible or shouty at heading scale, which
  **Press Start 2P did**. That was the actual problem with the original reskin: an
  8-bit arcade font on every headline reads as a game jam, not an engineer's
  portfolio, no matter how refined the rest of the system is.
- **Press Start 2P** (`font-pixel`): reserved for exactly two things now, the "RF"
  logo mark and the project-card monogram tiles. Both are short, iconic, 2-character
  marks, the one context where the font's width and unreadability at length don't
  matter. It is never applied to a sentence.
- **Geist Mono** (`font-mono`): the one exception, used specifically in `<code>` blocks
  (vulnerability examples in the Security section), because precise monospace alignment
  matters more there than the pixel aesthetic.

Both are loaded via `@fontsource/press-start-2p` and `@fontsource/vt323` (self-hosted
from npm), **not** `next/font/google`. Deliberately, so the build never needs network
access to `fonts.googleapis.com`. The `--font-press-start` and `--font-vt323` CSS
variables are defined manually in `globals.css`, pointing at the font-family names those
packages register.

The root `<html>` font-size is bumped to 108% (`app/globals.css`) because VT323 has thin
strokes, so Tailwind's whole `rem` scale grows proportionally without touching every
individual `text-*` class.

### Utility Components

| Class                 | Purpose                                              |
|-----------------------|--------------------------------------------------------|
| `.surface`             | Container: border-2, hard-offset shadow (not blur), used only where elevation means something (pricing, project cards) |
| `.surface-interactive` | Adds a hover state (translate + bigger shadow) for clickable `.surface` elements |
| `.btn-primary`         | Solid accent button, white border, pixel shadow, "presses" (translate + shadow disappears) on `:active` |
| `.btn-secondary`       | Outline button, smaller pixel shadow, same press behavior |
| `.tag`                 | Small rectangular label, VT323 (not Press Start 2P, so it stays legible small) |
| `.section-pad`         | Consistent vertical padding between sections            |

### Motion

Scroll-reveal and expand/collapse animation use `framer-motion`, not CSS. The
components live in `components/Reveal.tsx`. Full reasoning for when each one is
actually used is in the ADR above ("Homepage Section Order, and When Motion Earns
Its Place"), short version:

| Component               | Purpose                                              | Used for |
|--------------------------|---------------------------------------------------------|-------------------------------------------|
| `<RevealGroup>` + `<RevealItem>` | Children stagger automatically (no manual per-item delay math) | Exactly two things: each page's own hero block (one sequential stagger per page), and grids of genuinely parallel items (projects, Security's three grids, Contact's channels, `/services`'s cards and FAQ) |

There used to be a third component here, a single-element `<Reveal>` for one-off
fades. It went unused once the rule above became explicit (every remaining case is
either the one-per-page hero stagger, a real grid, or a plain static block), so it
was removed rather than kept around "for later." A primitive with zero call sites
is exactly the kind of thing worth deleting on sight, the same standard applied to
`ServicesSection.tsx` and `marqueeItems` earlier in this project's history.

Everything respects `prefers-reduced-motion` via `useReducedMotion()`, animation
becomes instant if the user has that set at the OS level. Button/nav/mobile-menu
hovers stay plain CSS transitions (with `steps()` timing for a "stepped," retro feel
instead of a smooth ease), not everything moved to JS.

### Radius & Shadow

Radius is 0px on every element (`xs`/`sm`/`md` are all overridden to 0 in
`tailwind.config.ts`, so any `rounded-*` class anywhere is automatically blocky, no
need to hunt down each usage). Shadows use `shadow-pixel` / `shadow-pixel-sm`
(hard-offset, not blur) instead of Tailwind's built-in `shadow-lg` and friends.

### Why this reskin exists

This is a large pivot away from the "premium minimal SaaS" system (Linear/Vercel/
Stripe-coded) built earlier, at the explicit request of the project owner, who
deliberately picked the "full pixel-art reskin" option from a set of more conservative
alternatives (sharp corners only, a pixel accent on the logo only, etc). If you need to
go back to the earlier direction, check the git history before this reskin, or ask for
a manual rebuild. The two systems are different enough that they shouldn't be merged.

---

## Component Architecture

### Server Components (default, zero client JS)

`HeroSection`, `AboutSection`, `FeaturedProjects`, `ProjectCard`,
`CybersecuritySection`, `ContactSection`, `CaseStudySection`, `ServiceCard`,
`FaqItem`

### Client Components (`'use client'`)

| Component      | Why it needs to be client                            |
|----------------|--------------------------------------------------------|
| `RevealGroup`/`RevealItem` | `framer-motion` hooks (`useReducedMotion`, `whileInView`) |
| `ExpandPanel`  | `useState` + `framer-motion` for the shared expand/collapse animation |
| `Navbar`       | `usePathname`, `useState` for scroll state & mobile menu |
| `Footer`       | `usePathname`, to resolve anchors correctly off the homepage |
| `MotionProvider` | `LazyMotion` context provider                        |

Note `ProjectCard` is a Server Component: the actual interactive state lives in
`ExpandPanel`, which it renders as a child. Keeping the card itself server-rendered
means the case study text is in the initial HTML, not injected after hydration.

---

## Adding a New Project

1. Open `data/projects.ts`
2. Add a new object to the `projects` array:

```typescript
{
  id: 'project-name',          // lowercase, hyphenated
  title: 'Project Name',
  subtitle: 'One-sentence description',
  category: 'Freelance',       // your choice
  tags: ['Tag1', 'Tag2'],
  stack: ['Next.js', 'TypeScript', 'Tailwind'],
  context: 'What this was and why it existed, one or two sentences.',
  problem: 'The specific problem, stated concretely. Not "poor UX."',
  approach: 'How you approached solving it, not just what you wanted to build.',
  architectureDecisions: [
    'A specific technical choice and the reasoning behind it: what you picked, and why that over the obvious alternative.',
    'A second one, if there is one worth mentioning.',
  ],
  technicalChallenges: 'The concrete technical difficulty, and how you actually solved it.',
  tradeoffs: [
    'What you gave up in exchange for what, stated plainly. If a project has no real trade-off here, that is worth a second look before publishing it.',
  ],
  outcome: 'The concrete, checkable result.',
  lessonsLearned: 'What you would do differently, or what surprised you. Not a victory lap.',
  ifRebuiltToday: 'One specific, concrete thing that would be different if started today. Not "I would use better practices," name a real alternative.',
  demoUrl: 'https://demo.vercel.app',
  githubUrl: 'https://github.com/USERNAME/project-name',
},
```

3. Save. The component renders it automatically, no other changes needed.

This structure (`Context → Problem → Approach → Architecture Decisions → Technical
Challenges → Trade-offs → Outcome → Lessons Learned → If I Rebuilt It Today`)
replaced an earlier `Overview / Features / Tech Stack` shape on purpose: that
structure showed what got built, this one shows the thinking behind it.
`architectureDecisions` and `tradeoffs` are arrays, not paragraphs, because they
are meant to be a short list of distinct, specific points, not one long
explanation. If you cannot fill `tradeoffs` with something real, the project might
not be ready to publish yet, every real technical decision costs something.

---

## Performance

Build output:

```
Page      : /
Size      : ~95 kB (JS) + ~22 kB (CSS)
First Load: ~170 kB gzip
```

Target Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

---

## License

MIT, free to use, modify, and distribute.

---

*Built from Rp0. Deployed for free. Real skill.*
