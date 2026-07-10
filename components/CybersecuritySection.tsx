import { ExternalLink } from 'lucide-react'
import type { LearningPhase, WriteUp } from '@/types'
import { GITHUB_URL } from '@/data/socialLinks'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

// ── Data ───────────────────────────────────────────────────────────────────

const devSecExamples = [
  {
    bug: 'innerHTML = userInput',
    vuln: 'XSS (Cross-Site Scripting)',
    fix: 'Use textContent, or sanitize with DOMPurify.',
  },
  {
    bug: '`SELECT * WHERE id = ${req.params.id}`',
    vuln: 'SQL Injection',
    fix: 'Parameterized queries or prepared statements. Always.',
  },
  {
    bug: 'Access check only exists on the frontend',
    vuln: 'Broken Access Control / IDOR',
    fix: "The backend has to validate who's allowed to access what.",
  },
]

const writeUps: WriteUp[] = [
  {
    title: 'Reflected XSS via DOM innerHTML, PortSwigger Lab',
    tags: ['XSS', 'DOM'],
    description:
      "A URL parameter gets dropped straight into innerHTML with no sanitization. A simple payload is enough to execute a script in the page's context.",
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

type PhaseStatus = LearningPhase['status']

const STATUS_LABEL: Record<PhaseStatus, string> = {
  done:     'Done',
  active:   'Active',
  upcoming: 'Upcoming',
}

/** Plain text weight/color, not a boxed badge: quieter for a status shown 4x in a row. */
function statusClassName(status: PhaseStatus): string {
  return status === 'active'
    ? 'text-sm text-accent-text'
    : 'text-sm text-zinc-500'
}

function PhaseCard({ phase }: { phase: LearningPhase }) {
  return (
    <article className="surface p-5" aria-label={`Phase ${phase.phase}: ${phase.title}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm text-zinc-500" aria-label={`Phase ${phase.phase}`}>
          {phase.phase}
        </span>
        <span className={statusClassName(phase.status)}>
          {STATUS_LABEL[phase.status]}
        </span>
      </div>
      <h4 className="font-pixel text-[0.65rem] uppercase text-zinc-50 leading-[1.8] mb-3">
        {phase.title}
      </h4>
      <ul className="space-y-2" role="list">
        {phase.items.map((item) => (
          <li key={item} className="text-zinc-400 text-base leading-relaxed pl-3 border-l-2 border-white/20">
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
      <h4 className="font-pixel text-[0.6rem] uppercase text-zinc-50 leading-[1.8] mb-3">
        {wu.title}
      </h4>
      <p className="text-zinc-400 text-base leading-relaxed mb-3">{wu.description}</p>
      <p className="text-base">
        <span className="text-accent-text">Impact: </span>
        <span className="text-zinc-400">{wu.impact}</span>
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
        <Reveal className="mb-8 max-w-2xl">
          <h2
            id="security-heading"
            className="text-lg sm:text-xl text-zinc-50 leading-[1.8] mb-5"
          >
            Learning security isn&apos;t about <span className="text-accent-text">breaking things.</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Building websites showed me how easily one careless line of code becomes an
            opening. I study web security actively, through labs and hands-on practice,
            because working code and secure code aren&apos;t automatically the same
            thing. Three of the most common mistakes I&apos;ve learned to avoid:
          </p>
        </Reveal>

        {/* Dev x Security bridge — leads, since it's the actual business argument */}
        <RevealGroup className="grid sm:grid-cols-3 gap-4 mb-16">
          {devSecExamples.map(({ bug, vuln, fix }) => (
            <RevealItem
              key={vuln}
              className="p-4 border-2 border-white/20 bg-white/[0.03]"
            >
              <div role="group" aria-label={`Example: ${vuln}`}>
                <p className="font-pixel text-[0.55rem] text-zinc-500 uppercase mb-2">
                  The coding mistake
                </p>
                <code className="text-sm text-zinc-300 font-mono block mb-4 break-all">
                  {bug}
                </code>
                <p className="font-pixel text-[0.55rem] text-zinc-500 uppercase mb-2">
                  The vulnerability it creates
                </p>
                <p className="text-base text-accent-text mb-4">{vuln}</p>
                <p className="font-pixel text-[0.55rem] text-zinc-500 uppercase mb-2">
                  The right way
                </p>
                <p className="text-base text-zinc-400 leading-relaxed">{fix}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Write-ups — evidence */}
        <div className="mb-16">
          <Reveal className="mb-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base text-zinc-50 leading-[1.8]">
                Write-ups & Lab Notes
              </h3>
              <span className="text-zinc-500 text-base">Updated weekly</span>
            </div>
          </Reveal>

          <RevealGroup className="grid sm:grid-cols-3 gap-4">
            {writeUps.map((wu) => (
              <RevealItem key={wu.title}>
                <WriteUpCard wu={wu} />
              </RevealItem>
            ))}

            {/* Placeholder — text only */}
            <RevealItem className="surface p-5 flex flex-col items-center justify-center text-center min-h-[140px]">
              <p className="text-zinc-500 text-base leading-relaxed">
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
          <Reveal className="mb-6">
            <h3 className="text-base text-zinc-50 leading-[1.8]">
              Learning Roadmap
            </h3>
          </Reveal>
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
