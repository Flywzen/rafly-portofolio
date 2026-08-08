import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'birthday-dad',
    title: "My Father's 50th Birthday Website",
    subtitle: 'Personal storytelling for a birthday that mattered',
    category: 'Personal Project',
    tags: ['Storytelling', 'Personal'],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    context:
      "A personal project for my father's 50th birthday. Family was spread across different cities and couldn't gather in person.",
    problem:
      'A WhatsApp message felt too small for the occasion, and there was no single place for family to see photos, read messages, and mark the day together.',
    approach:
      'A personal website accessible anytime, built around a real-time age counter and a family gallery, simple enough to finish before the actual date.',
    architectureDecisions: [
      'Vite over Next.js: the site is fully static and client-only, so there was no server-rendering need, and I wanted a build I could deploy anywhere without hosting decisions.',
      'The age counter is a single custom hook, not a date library. The math (days, hours, minutes, seconds since a fixed timestamp) is simple enough that a dependency would have been overhead for one calculation.',
    ],
    technicalChallenges:
      'Keeping the age counter accurate across time zones and DST without a library, while keeping the bundle small enough to load instantly on a phone at a family gathering.',
    tradeoffs: [
      'No CMS. Content is hardcoded in one data file, meaning any change needs a redeploy. Fine for a single-occasion page with one audience, not a decision I would repeat for a site anyone else needed to edit.',
      'No analytics. I did not want to add tracking to a page built for family, even though it meant I could not measure how long people stayed.',
    ],
    outcome:
      'Live on the day itself. Family in three different cities visited and left messages at the same time.',
    lessonsLearned:
      "The hardest part was not the countdown logic, it was deciding what not to build. I cut a comment wall and photo uploads because they meant handling user input and moderation for a page meant to go live once.",
    ifRebuiltToday:
      'I would use Next.js instead of Vite, for the built-in Image component. The family photos were the one part of the original build that never loaded well on a slow connection.',
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
    context:
      'Built during my community service placement (KKN), a mandatory Indonesian university program where students spend time supporting a local community.',
    problem:
      'The village had no digital presence. Residents and outsiders had no way to look up basic information about it online, and the staff had no technical background to run one.',
    approach:
      'A village information website simple enough for non-technical staff to update themselves, and fast even on weak connections, built to outlast my time there.',
    architectureDecisions: [
      'Static generation instead of a database-backed CMS. The village has no dedicated IT support, so "nothing to maintain" mattered more than "editable from anywhere."',
      'Content lives in one typed data file instead of a headless CMS like Sanity. A CMS would have meant another account and another login to explain to staff after I left.',
    ],
    technicalChallenges:
      'Designing content so non-technical staff could understand and eventually touch it without breaking the site, without access to a real content-editing workflow.',
    tradeoffs: [
      'Editing content means editing a TypeScript file directly, a real barrier for someone without a dev background. I traded ease-of-editing for zero ongoing hosting cost and nothing that could break after I left.',
      'No admin dashboard. Building one would have taken longer than the rest of the project combined, for a site that gets updated a few times a month at most.',
    ],
    outcome:
      "Live, and handed over to the village head. It's referenced in the placement's final report.",
    lessonsLearned:
      "I originally planned a full CMS. Talking to the village staff first, before writing code, saved me from building something they would never use. The right technical decision came from a conversation, not a framework comparison.",
    ifRebuiltToday:
      'I would still skip a full CMS, but add a small password-protected form for the village staff to edit specific text fields, without touching code or a dashboard built for developers.',
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
    context:
      'A personal tool, built to solve my own problem before it was built to be a portfolio piece.',
    problem:
      'My notes on life were scattered across four different apps and a notebook, none of them talking to each other.',
    approach:
      'One minimal app to keep it all in one place: journal, finances, routines, with data staying local instead of on a server.',
    architectureDecisions: [
      'LocalStorage for the initial version, migrated the write path to IndexedDB once journal entries got large enough that synchronous LocalStorage writes started blocking the UI on save.',
      'Plain React Context plus useReducer, not Redux or Zustand. One user, no server sync, so the cross-component coordination problem a state library solves did not exist here.',
    ],
    technicalChallenges:
      'Keeping state updates predictable without a state-management library, and making sure local data survived a browser cache clear (it mostly does now, via the IndexedDB migration above).',
    tradeoffs: [
      'All data lives in the browser, no cross-device sync, on purpose. The moment data leaves the device it needs a server, auth, and a privacy policy, for a journal app solving my own problem first.',
      'No export or import yet, so a cleared browser cache is unrecoverable. That is the direct cost of the local-only decision above, and the next thing worth building if this became more than a personal tool.',
    ],
    outcome:
      "MVP live. I've used it myself for 30+ days, and it now doubles as a demo of full frontend development ability.",
    lessonsLearned:
      'I underestimated how much of "state management" comes down to "deciding what not to sync." Once I stopped trying to keep every piece of state consistent everywhere, the code got simpler.',
    ifRebuiltToday:
      'I would start with IndexedDB from day one instead of migrating into it partway through. I know the storage requirements upfront now, and the migration itself was the most fragile part of the build.',
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
    context:
      'A demo built to show local small business owners what a dedicated page could do beyond an Instagram feed.',
    problem:
      "There's no single page that pulls the pitch together: products, proof, and a way to act on it, in one structured place.",
    approach:
      'A single-page landing site that helps turn visitors into buyers, fast and easy for a non-technical owner to keep updated.',
    architectureDecisions: [
      'One static page, no client-side routing. A multi-page site would have meant more for the owner to maintain and more clicks between a visitor and the WhatsApp button.',
      "Images through Next.js's built-in Image component, not a third-party CDN. For a single-owner landing page, Vercel's built-in optimization was enough, and one less service to configure and pay for.",
    ],
    technicalChallenges:
      'Convincing the client that conversion depends on speed and message clarity, not feature count, then proving it by shipping the plainer version first.',
    tradeoffs: [
      'No CMS, so updating product photos means sending me a message. I chose that over a dashboard a non-technical owner could misconfigure, at the cost of me being a bottleneck for updates.',
      'No product filtering or search. The catalog was small enough that scrolling was faster to build, and faster to use, than a filter UI would have been.',
    ],
    outcome:
      'I now use the live demo as a reference when pitching to other small businesses. 3 prospective clients responded well.',
    lessonsLearned:
      "The client's first request was a photo carousel. I talked them out of it: one well-chosen photo per product loaded faster and tested better than a carousel, and it was one less thing to break on mobile.",
    ifRebuiltToday:
      'I would add the one thing I cut for scope: a lightweight way for the owner to swap product photos without messaging me. A Git-based CMS would remove that bottleneck without adding a database to maintain.',
    demoUrl: 'https://your-demo.vercel.app',
    githubUrl: 'https://github.com/USERNAME/umkm-landing',
    // imageUrl: '/images/umkm-landing.png',
  },
]
