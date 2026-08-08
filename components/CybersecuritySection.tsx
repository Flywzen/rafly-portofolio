import { ExternalLink } from 'lucide-react'
import type { LearningPhase, WriteUp } from '@/types'
import { GITHUB_URL } from '@/data/socialLinks'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { STATUS_LABEL, statusClassName, type PhaseStatus } from '@/lib/security-status'

// ── Data ───────────────────────────────────────────────────────────────────

const devSecExamples = [
  {
    bug: 'innerHTML = userInput',
    vuln: 'XSS (Cross-Site Scripting)',
    plainMeaning:
      "A stranger could run their own code inside your website, in your visitors' browsers, without you knowing.",
    fix: 'Use textContent, or sanitize with DOMPurify.',
  },
  {
    bug: '`SELECT * WHERE id = ${req.params.id}`',
    vuln: 'SQL Injection',
    plainMeaning:
      'A stranger could type something into a form and read or delete your entire database instead of logging in.',
    fix: 'Always use parameterized queries or prepared statements.',
  },
  {
    bug: 'Access check only exists on the frontend',
    vuln: 'Broken Access Control / IDOR',
    plainMeaning:
      "One customer could see or change another customer's private data just by guessing a different ID in the web address.",
    fix: "The backend must validate who's allowed to access what.",
  },
]

const writeUps: WriteUp[] = [
  {
    title: 'Reflected XSS via DOM innerHTML, PortSwigger Lab',
    tags: ['XSS', 'DOM'],
    description:
      "The code drops a URL parameter straight into innerHTML with no sanitization. A simple payload executes a script in the page's context.",
    impact: 'Session hijacking via cookie theft, defacement, convincing phishing pages.',
  },
  {
    title: 'SQL Injection in a Login Form, DVWA Low',
    tags: ['SQLi', 'Auth Bypass'],
    description:
      "The query doesn't use a prepared statement. The input `' OR '1'='1` bypasses authentication because the query always evaluates to true.",
    impact: 'Full database dump, login bypass without valid credentials.',
  },
]

const learningPath: LearningPhase[] = [
  {
    phase: '01',
    title: 'Foundation',
    status: 'done',
    items: [
      'HTTP request/response lifecycle',
      'HTML, CSS, JavaScript basics',
      'Authentication & session management',
      'Cookie, localStorage & JWT basics',
    ],
  },
  {
    phase: '02',
    title: 'OWASP Top 10',
    status: 'active',
    items: [
      'Injection: SQLi, XSS, Command Injection',
      'Broken Access Control & IDOR',
      'CSRF & SSRF',
      'Insecure Direct Object Reference',
    ],
  },
  {
    phase: '03',
    title: 'Labs & Practice',
    status: 'active',
    items: [
      'PortSwigger Web Security Academy',
      'TryHackMe free rooms',
      'HackTheBox Academy',
      'Local DVWA for experimentation',
    ],
  },
  {
    phase: '04',
    title: 'Bug Bounty',
    status: 'upcoming',
    items: [
      'Read write-ups from HackerOne & Bugcrowd',
      'Start with private/invite-only programs',
      'Target: first valid report',
    ],
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────

function PhaseCard({ phase }: { phase: LearningPhase }) {
  return (
    <article className="surface p-5" aria-label={`Phase ${phase.phase}: ${phase.title}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm text-paper0" aria-label={`Phase ${phase.phase}`}>
          {phase.phase}
        </span>
        <span className={statusClassName(phase.status)}>
          {STATUS_LABEL[phase.status]}
        </span>
      </div>
      <h4 className="font-sans text-lg uppercase tracking-wide text-paper leading-snug mb-3">
        {phase.title}
      </h4>
      <ul className="space-y-2" role="list">
        {phase.items.map((item) => (
          <li key={item} className="text-paper/60 text-base leading-relaxed pl-3 border-l border-white/20">
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

function WriteUpCard({ wu }: { wu: WriteUp }) {
  return (
    <article className="surface p-5">
      <div className="flex gap-2 mb-3" aria-label="Tags">
        {wu.tags.map((t) => (
          <span key={t} className="tag">{t}</span>
        ))}
      </div>
      <h4 className="font-sans text-lg text-paper leading-snug mb-3">
        {wu.title}
      </h4>
      <p className="text-paper/60 text-base leading-relaxed mb-3">{wu.description}</p>
      <p className="text-base">
        <span className="text-accent-text">Impact: </span>
        <span className="text-paper/60">{wu.impact}</span>
      </p>
    </article>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────
//
// Order is deliberate: bridge (why this matters to a client) first, then
// write-ups (evidence), then roadmap (process). A business owner deciding
// whether to trust Rafly needs the first one; the other two are for anyone
// who wants to verify the claim.

export default function CybersecuritySection() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="section-pad"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">

        {/* Header + bridge intro, merged into one lead-in instead of two */}
        <div className="mb-8 max-w-2xl">
          <h2
            id="security-heading"
            className="text-2xl sm:text-3xl text-paper leading-[1.15] mb-5"
          >
            I study security to <span className="text-accent-text">protect what I build.</span>
          </h2>
          <p className="text-paper/60 text-lg leading-relaxed">
            One careless line of code gives an attacker an opening. Building websites
            taught me that. I close the gap with labs and hands-on practice: working
            code and secure code are not the same thing. Three of the most common
            mistakes I&apos;ve learned to avoid:
          </p>
        </div>

        {/* Dev x Security bridge — leads, since it's the actual business argument */}
        <RevealGroup className="grid sm:grid-cols-3 gap-4 mb-16">
          {devSecExamples.map(({ bug, vuln, plainMeaning, fix }) => (
            <RevealItem
              key={vuln}
              className="p-4 border border-white/20 bg-white/[0.03]"
            >
              <div role="group" aria-label={`Example: ${vuln}`}>
                <p className="font-sans text-xs tracking-wide text-paper0 uppercase mb-2">
                  The mistake in code
                </p>
                <code className="text-sm text-paper/70 font-mono block mb-4 break-all">
                  {bug}
                </code>
                <p className="text-base text-accent-text mb-2">{vuln}</p>
                <p className="text-paper/60 text-sm leading-relaxed mb-4">{plainMeaning}</p>
                <p className="font-sans text-xs tracking-wide text-paper0 uppercase mb-2">
                  The right way
                </p>
                <p className="text-base text-paper/60 leading-relaxed">{fix}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Write-ups — evidence */}
        <div className="mb-16">
          <div className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-xl text-paper leading-snug">
                Write-ups & Lab Notes
              </h3>
              <span className="text-paper0 text-base">Updated weekly</span>
            </div>
          </div>

          <RevealGroup className="grid sm:grid-cols-3 gap-4">
            {writeUps.map((wu) => (
              <RevealItem key={wu.title}>
                <WriteUpCard wu={wu} />
              </RevealItem>
            ))}

            {/* Placeholder — text only */}
            <RevealItem className="surface p-5 flex flex-col items-center justify-center text-center min-h-[140px]">
              <p className="text-paper0 text-base leading-relaxed">
                New write-ups added weekly.
                <br />
                Follow along on GitHub.
              </p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-text text-base mt-3 hover:underline inline-flex items-center gap-1"
              >
                View GitHub
                <ExternalLink size={13} aria-hidden="true" />
              </a>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Learning roadmap — process */}
        <div>
          <div className="mb-6">
            <h3 className="text-xl text-paper leading-snug">
              Learning Roadmap
            </h3>
          </div>
          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningPath.map((phase) => (
              <RevealItem key={phase.phase}>
                <PhaseCard phase={phase} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

      </div>
    </section>
  )
}
