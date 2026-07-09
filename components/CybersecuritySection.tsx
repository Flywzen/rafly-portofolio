import { ExternalLink } from 'lucide-react'
import type { LearningPhase, WriteUp } from '@/types'
import { GITHUB_URL } from '@/data/socialLinks'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

// ── Data ───────────────────────────────────────────────────────────────────

const devSecExamples = [
  {
    bug: 'innerHTML = userInput',
    vuln: 'XSS (Cross-Site Scripting)',
    fix: 'Gunakan textContent atau sanitize dengan DOMPurify.',
  },
  {
    bug: '`SELECT * WHERE id = ${req.params.id}`',
    vuln: 'SQL Injection',
    fix: 'Parameterized query / prepared statement. Selalu.',
  },
  {
    bug: 'Access check hanya di frontend',
    vuln: 'Broken Access Control / IDOR',
    fix: 'Backend harus validasi siapa yang boleh akses resource apa.',
  },
]

const writeUps: WriteUp[] = [
  {
    title: 'Reflected XSS via DOM innerHTML, PortSwigger Lab',
    tags: ['XSS', 'DOM'],
    description:
      'Input dari parameter URL langsung dimasukkan ke innerHTML tanpa sanitasi. Payload sederhana mampu mengeksekusi script di konteks halaman.',
    impact: 'Session hijacking via cookie theft, defacement, phishing yang meyakinkan.',
  },
  {
    title: 'SQL Injection pada Form Login, DVWA Low',
    tags: ['SQLi', 'Auth Bypass'],
    description:
      'Query tidak menggunakan prepared statement. Input `\' OR \'1\'=\'1` berhasil mem-bypass autentikasi karena query selalu bernilai true.',
    impact: 'Full database dump, bypass login tanpa kredensial valid.',
  },
]

const learningPath: LearningPhase[] = [
  {
    phase: '01',
    title: 'Foundation',
    status: 'done',
    items: [
      'HTTP request/response lifecycle',
      'HTML, CSS, JavaScript dasar',
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
      'DVWA lokal untuk eksperimen',
    ],
  },
  {
    phase: '04',
    title: 'Bug Bounty',
    status: 'upcoming',
    items: [
      'Baca write-up HackerOne & Bugcrowd',
      'Mulai dari program private/tertutup',
      'Target: first valid report',
    ],
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────

type PhaseStatus = LearningPhase['status']

const STATUS_LABEL: Record<PhaseStatus, string> = {
  done:     'Selesai',
  active:   'Aktif',
  upcoming: 'Upcoming',
}

/** Plain text weight/color, not a boxed badge: quieter for a status shown 4x in a row. */
function statusClassName(status: PhaseStatus): string {
  return status === 'active'
    ? 'text-xs font-medium text-accent-text'
    : 'text-xs text-zinc-500'
}

function PhaseCard({ phase }: { phase: LearningPhase }) {
  return (
    <article className="surface p-5" aria-label={`Fase ${phase.phase}: ${phase.title}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-xs text-zinc-500" aria-label={`Fase ${phase.phase}`}>
          {phase.phase}
        </span>
        <span className={statusClassName(phase.status)}>
          {STATUS_LABEL[phase.status]}
        </span>
      </div>
      <h4 className="font-semibold text-zinc-50 text-sm mb-3">{phase.title}</h4>
      <ul className="space-y-2" role="list">
        {phase.items.map((item) => (
          <li key={item} className="text-zinc-400 text-xs leading-relaxed pl-3 border-l border-white/[0.1]">
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
      <h4 className="font-semibold text-zinc-50 text-sm mb-2 leading-snug">
        {wu.title}
      </h4>
      <p className="text-zinc-400 text-xs leading-relaxed mb-3">{wu.description}</p>
      <p className="text-xs">
        <span className="text-accent-text font-medium">Impact: </span>
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
            className="font-semibold text-3xl sm:text-4xl text-zinc-50 leading-tight mb-4 tracking-tight"
          >
            Belajar security bukan untuk <span className="text-accent-text">merusak.</span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Membangun website membuat saya sadar betapa mudahnya satu baris kode yang ceroboh
            menjadi celah masuk. Saya belajar keamanan web secara aktif, lewat labs dan praktik
            langsung, supaya kode yang saya tulis tidak hanya berfungsi, tapi juga tidak mudah
            ditembus. Tiga kesalahan paling umum yang saya pelajari untuk dihindari:
          </p>
        </Reveal>

        {/* Dev x Security bridge — leads, since it's the actual business argument */}
        <RevealGroup className="grid sm:grid-cols-3 gap-4 mb-16">
          {devSecExamples.map(({ bug, vuln, fix }) => (
            <RevealItem
              key={vuln}
              className="rounded-sm p-4 border border-white/[0.08] bg-white/[0.02]"
            >
              <div role="group" aria-label={`Contoh: ${vuln}`}>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-1.5">
                  Kesalahan coding
                </p>
                <code className="text-xs text-zinc-300 font-mono block mb-3 break-all">
                  {bug}
                </code>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-1.5">
                  Celah yang timbul
                </p>
                <p className="text-xs text-accent-text font-medium mb-3">{vuln}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-1.5">
                  Cara benar
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">{fix}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Write-ups — evidence */}
        <div className="mb-16">
          <Reveal className="mb-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-zinc-50 text-lg">
                Write-ups & Lab Notes
              </h3>
              <span className="text-zinc-500 text-xs">Diperbarui setiap minggu</span>
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
              <p className="text-zinc-500 text-xs leading-relaxed">
                Write-up baru ditambahkan setiap minggu.
                <br />
                Pantau di GitHub.
              </p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-text text-xs mt-3 hover:underline inline-flex items-center gap-1"
              >
                Lihat GitHub
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            </RevealItem>
          </RevealGroup>
        </div>

        {/* Learning roadmap — process */}
        <div>
          <Reveal className="mb-6">
            <h3 className="font-semibold text-zinc-50 text-lg">
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
