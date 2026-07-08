import { BookOpen, ExternalLink, AlertOctagon } from 'lucide-react'
import type { LearningPhase, WriteUp } from '@/types'
import { cn } from '@/lib/utils'
import { GITHUB_URL } from '@/data/socialLinks'

// ── Data ───────────────────────────────────────────────────────────────────

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

const writeUps: WriteUp[] = [
  {
    title: 'Reflected XSS via DOM innerHTML — PortSwigger Lab',
    tags: ['XSS', 'DOM'],
    description:
      'Input dari parameter URL langsung dimasukkan ke innerHTML tanpa sanitasi. Payload sederhana mampu mengeksekusi script di konteks halaman.',
    impact: 'Session hijacking via cookie theft, defacement, phishing yang meyakinkan.',
  },
  {
    title: 'SQL Injection pada Form Login — DVWA Low',
    tags: ['SQLi', 'Auth Bypass'],
    description:
      'Query tidak menggunakan prepared statement. Input `\' OR \'1\'=\'1` berhasil mem-bypass autentikasi karena query selalu bernilai true.',
    impact: 'Full database dump, bypass login tanpa kredensial valid.',
  },
]

const devSecExamples = [
  {
    bug: "innerHTML = userInput",
    vuln: 'XSS (Cross-Site Scripting)',
    fix: 'Gunakan textContent atau sanitize dengan DOMPurify.',
  },
  {
    bug: "`SELECT * WHERE id = ${req.params.id}`",
    vuln: 'SQL Injection',
    fix: 'Parameterized query / prepared statement. Selalu.',
  },
  {
    bug: 'Access check hanya di frontend',
    vuln: 'Broken Access Control / IDOR',
    fix: 'Backend harus validasi siapa yang boleh akses resource apa.',
  },
]

// ── Sub-components ─────────────────────────────────────────────────────────

type PhaseStatus = LearningPhase['status']

const STATUS_MAP: Record<
  PhaseStatus,
  { label: string; badgeCls: string; dotCls: string }
> = {
  done:     { label: 'Selesai',  badgeCls: 'badge-teal', dotCls: 'bg-teal'   },
  active:   { label: 'Aktif',    badgeCls: 'badge-gold', dotCls: 'bg-gold'   },
  upcoming: { label: 'Upcoming', badgeCls: 'badge-muted', dotCls: 'bg-tx-3'  },
}

function PhaseCard({ phase }: { phase: LearningPhase }) {
  const { label, badgeCls, dotCls } = STATUS_MAP[phase.status]
  return (
    <article className="card p-5" aria-label={`Fase ${phase.phase}: ${phase.title}`}>
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-display font-bold text-2xl text-tx-3"
          aria-label={`Fase ${phase.phase}`}
        >
          {phase.phase}
        </span>
        <span className={cn('badge', badgeCls)} aria-label={`Status: ${label}`}>
          {label}
        </span>
      </div>
      <h4 className="font-display font-semibold text-tx-1 text-sm mb-3">{phase.title}</h4>
      <ul className="space-y-2" role="list">
        {phase.items.map((item) => (
          <li key={item} className="flex gap-2 text-tx-2 text-xs leading-relaxed">
            <span
              className={cn('mt-1.5 w-1 h-1 rounded-full shrink-0', dotCls)}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

function WriteUpCard({ wu }: { wu: WriteUp }) {
  return (
    <article className="card p-5">
      <div className="flex gap-2 mb-3" aria-label="Tags">
        {wu.tags.map((t) => (
          <span key={t} className="badge badge-teal">
            {t}
          </span>
        ))}
      </div>
      <h4 className="font-display font-semibold text-tx-1 text-sm mb-2 leading-snug">
        {wu.title}
      </h4>
      <p className="text-tx-2 text-xs leading-relaxed mb-3">{wu.description}</p>
      <p className="text-xs">
        <span className="text-gold font-semibold">Impact: </span>
        <span className="text-tx-2">{wu.impact}</span>
      </p>
    </article>
  )
}

// ── Main export ─────────────────────────────────────────────────────────────

export default function CybersecuritySection() {
  return (
    <section
      id="security"
      aria-labelledby="security-heading"
      className="section-pad"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-12 reveal">
          <p className="section-label">Keamanan Web</p>
          <h2
            id="security-heading"
            className="font-display font-bold text-3xl sm:text-4xl text-tx-1 leading-tight mb-4"
          >
            Belajar security bukan untuk{' '}
            <span className="text-teal-gradient">merusak.</span>
          </h2>
          <p className="text-tx-2 text-base max-w-2xl leading-relaxed">
            Membangun website membuat saya sadar betapa mudahnya sebuah bug kecil menjadi celah
            besar. Saya belajar web security secara aktif — lewat labs, write-up, dan praktik
            langsung — untuk memahami cara kerja serangan dari dalam.
          </p>
        </div>

        {/* Learning roadmap */}
        <div className="mb-16">
          <h3 className="font-display font-semibold text-tx-1 text-lg mb-6 reveal">
            Learning Roadmap
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {learningPath.map((phase, i) => (
              <div
                key={phase.phase}
                className={cn('reveal', `reveal-d${Math.min(i + 1, 4)}`)}
              >
                <PhaseCard phase={phase} />
              </div>
            ))}
          </div>
        </div>

        {/* Write-ups */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 reveal">
            <h3 className="font-display font-semibold text-tx-1 text-lg">
              Write-ups & Lab Notes
            </h3>
            <span className="text-tx-3 text-xs">Diperbarui setiap minggu</span>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {writeUps.map((wu, i) => (
              <div key={wu.title} className={cn('reveal', `reveal-d${i + 1}`)}>
                <WriteUpCard wu={wu} />
              </div>
            ))}

            {/* Placeholder card */}
            <div className="card p-5 flex flex-col items-center justify-center text-center min-h-[140px] reveal reveal-d3">
              <BookOpen
                size={20}
                className="text-tx-3 mb-2"
                aria-hidden="true"
              />
              <p className="text-tx-3 text-xs leading-relaxed">
                Write-up baru ditambahkan setiap minggu.
                <br />
                Pantau di GitHub.
              </p>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold text-xs mt-3 hover:underline inline-flex items-center gap-1"
              >
                Lihat GitHub
                <ExternalLink size={11} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Dev ↔ Security bridge */}
        <div className="card-static p-6 sm:p-8 reveal">
          <div className="flex gap-3 mb-6">
            <AlertOctagon
              size={18}
              className="text-gold shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <h3 className="font-display font-semibold text-tx-1 text-base">
              Kenapa developer perlu tahu security?
            </h3>
          </div>

          <p className="text-tx-2 text-sm mb-6 leading-relaxed">
            Setiap baris kode yang ditulis tanpa mempertimbangkan keamanan adalah calon
            vulnerability. Tiga contoh paling umum dari pengalaman belajar saya:
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {devSecExamples.map(({ bug, vuln, fix }) => (
              <div
                key={vuln}
                className="bg-base/60 rounded-xl p-4 border border-gold/8"
                role="group"
                aria-label={`Contoh: ${vuln}`}
              >
                <p className="text-[10px] text-tx-3 uppercase tracking-wider mb-1.5">
                  Kesalahan coding
                </p>
                <code className="text-xs text-gold/90 font-mono block mb-3 break-all">
                  {bug}
                </code>
                <p className="text-[10px] text-tx-3 uppercase tracking-wider mb-1.5">
                  Celah yang timbul
                </p>
                <p className="text-xs text-teal font-semibold mb-3">{vuln}</p>
                <p className="text-[10px] text-tx-3 uppercase tracking-wider mb-1.5">
                  Cara benar
                </p>
                <p className="text-xs text-tx-2 leading-relaxed">{fix}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
