
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
│   ├── layout.tsx          # Root layout: fonts, metadata, viewport
│   ├── page.tsx            # One page: assembles every section
│   └── globals.css         # Tailwind + design system utilities
│
├── components/
│   ├── Reveal.tsx             # Client, framer-motion scroll-reveal primitives (Reveal, RevealGroup, RevealItem)
│   ├── PixelCorners.tsx      # Client-safe hover accent: 4 corner pixels on interactive cards
│   ├── MotionProvider.tsx    # Client, LazyMotion wrapper (loads domAnimation only)
│   ├── Navbar.tsx            # Client, sticky nav, mobile menu
│   ├── HeroSection.tsx       # Server, headline, CTA
│   ├── AboutSection.tsx      # Server, bio prose (single column, no duplication)
│   ├── ServicesSection.tsx   # Server, 4 service packages + pricing
│   ├── ProjectCard.tsx       # Client, expandable case study card
│   ├── CaseStudyFields.tsx   # Shared row definitions (used by ProjectCard + CaseStudySection)
│   ├── CaseStudySection.tsx  # Server, standalone full case study view
│   ├── FeaturedProjects.tsx  # Server, grid wrapper for ProjectCard
│   ├── CybersecuritySection.tsx # Server, dev/sec bridge + write-ups + roadmap
│   ├── ContactSection.tsx    # Server, WhatsApp CTA + contact
│   └── Footer.tsx            # Server, nav, socials, copyright
│
├── data/
│   ├── projects.ts         # Typed project data (Project[])
│   ├── services.ts         # Typed service packages (Service[])
│   └── socialLinks.ts      # Typed social links + URL constants
│
├── lib/
│   └── utils.ts            # cn(), merge class names
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

### Update service pricing

Edit `data/services.ts`, change the `price` and `deliverables` fields.

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

Changes in `socialLinks.ts` automatically propagate to every component
(Navbar, Hero, About, Contact, Footer) since they all import from there.

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

Two pixel fonts, chosen for their respective legibility:

- **Press Start 2P** (`font-pixel`) — headings (`h1`/`h2`/`h3` pick this up automatically
  via base layer CSS), buttons, logo. **Never used for body text** since it becomes
  unreadable below ~12px, and long strings get very wide per character.
- **VT323** (`font-sans`, default) — all body text, nav, tags, labels. Still reads as
  distinctly "pixel/terminal" but stays legible at small sizes, unlike Press Start 2P.
- **Geist Mono** (`font-mono`) — the one exception: used specifically in `<code>` blocks
  (vulnerability examples in the Security section), because precise monospace alignment
  matters more there than the pixel aesthetic.

Both are loaded via `@fontsource/press-start-2p` and `@fontsource/vt323` (self-hosted
from npm), **not** `next/font/google` — deliberately, so the build never needs network
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
components live in `components/Reveal.tsx`:

| Component               | Purpose                                              |
|-------------------------|---------------------------------------------------------|
| `<Reveal>`              | A single element: fade + rise 10px once, on entering the viewport |
| `<RevealGroup>` + `<RevealItem>` | Grids/lists: children stagger automatically (no manual per-item delay math) |

Everything respects `prefers-reduced-motion` via `useReducedMotion()`, animation
becomes instant automatically if the user has that set at the OS level. Used
deliberately sparingly: scroll reveal, and the height animation on `ProjectCard`'s case
study expand/collapse. Button/nav/mobile-menu hovers stay plain CSS transitions (with
`steps()` timing for a "stepped," retro feel instead of a smooth ease), not everything
moved to JS.

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
a manual rebuild — the two systems are different enough that they shouldn't be merged.

---

## Component Architecture

### Server Components (default, zero client JS)

`HeroSection`, `AboutSection`, `ServicesSection`, `FeaturedProjects`,
`CybersecuritySection`, `ContactSection`, `CaseStudySection`, `Footer`

### Client Components (`'use client'`)

| Component     | Why it needs to be client                    |
|---------------|----------------------------------------------|
| `Reveal`      | `framer-motion` hooks (`useReducedMotion`, `whileInView`) |
| `Navbar`      | `useState` for scroll state & mobile menu    |
| `ProjectCard` | `useState` + `framer-motion` for expand/collapse animation |

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
  problem: 'The problem it solves.',
  goal: "The project's goal.",
  role: 'What you worked on.',
  features: ['Feature 1', 'Feature 2'],
  challenges: 'Technical challenges you ran into.',
  result: 'The concrete result.',
  demoUrl: 'https://demo.vercel.app',
  githubUrl: 'https://github.com/USERNAME/project-name',
},
```

3. Save. The component renders it automatically, no other changes needed.

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
