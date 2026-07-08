import { Code2, GraduationCap, Shield, ExternalLink, MapPin, Calendar } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL } from '@/data/socialLinks'

const highlights = [
  {
    icon: Code2,
    title: 'Web Development',
    description:
      'React, Next.js, TypeScript, Tailwind. Setiap proyek punya performance dan UX yang dipikirkan dari awal.',
    accent: 'gold' as const,
  },
  {
    icon: GraduationCap,
    title: 'Informatika ITERA',
    description:
      'Mahasiswa aktif dengan fondasi CS yang solid: algoritma, jaringan komputer, dan rekayasa perangkat lunak.',
    accent: 'teal' as const,
  },
  {
    icon: Shield,
    title: 'Web Security (aktif)',
    description:
      'PortSwigger Labs, TryHackMe, dan write-up HackerOne. Membangun website sambil berpikir dari sudut pandang attacker.',
    accent: 'gold' as const,
  },
]

// ── Profile card (pengganti foto) ─────────────────────────────────────────
function ProfileCard() {
  return (
    <div className="relative">
      {/* Decorative outer ring */}
      <div
        aria-hidden="true"
        className="absolute -inset-px rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, rgba(201,162,39,0.25) 0%, rgba(20,184,166,0.15) 50%, rgba(201,162,39,0.08) 100%)',
        }}
      />

      <div className="relative card-static rounded-2xl p-7 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            {/* Glow ring */}
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-2xl blur-md bg-gold/20"
            />
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(201,162,39,0.18), rgba(20,184,166,0.12))',
                border: '1px solid rgba(201,162,39,0.25)',
              }}
              aria-label="Inisial Rafly"
            >
              <span className="text-gold-gradient">RF</span>
            </div>
            {/* Online dot */}
            <span
              aria-label="Tersedia untuk proyek"
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-teal border-2 border-card flex items-center justify-center"
            >
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            </span>
          </div>

          <div>
            <p className="font-display font-semibold text-tx-1 text-base leading-tight">
              Muhammad Rafly
            </p>
            <p className="font-display font-semibold text-tx-1 text-base leading-tight">
              Yahya Ramadhan
            </p>
            <p className="text-tx-3 text-xs mt-1">Web Developer & UI/UX</p>
          </div>
        </div>

        {/* Meta info */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5 text-tx-2 text-sm">
            <MapPin size={13} className="text-gold shrink-0" aria-hidden="true" />
            Lampung, Indonesia
          </div>
          <div className="flex items-center gap-2.5 text-tx-2 text-sm">
            <GraduationCap size={13} className="text-teal shrink-0" aria-hidden="true" />
            Informatika · ITERA · Aktif
          </div>
          <div className="flex items-center gap-2.5 text-tx-2 text-sm">
            <Calendar size={13} className="text-gold shrink-0" aria-hidden="true" />
            Tersedia untuk freelance
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/10" />

        {/* Activity cards */}
        <div className="space-y-2.5">
          <p className="text-[10px] font-bold text-tx-3 uppercase tracking-widest">
            Sedang dikerjakan
          </p>
          {[
            { label: 'Portfolio Next.js',   status: 'Live',   color: 'teal' },
            { label: 'PortSwigger Labs',    status: 'Aktif',  color: 'gold' },
            { label: 'Cari klien UMKM',     status: 'Aktif',  color: 'gold' },
          ].map(({ label, status, color }) => (
            <div
              key={label}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-tx-2">{label}</span>
              <span
                className={
                  color === 'teal'
                    ? 'badge badge-teal'
                    : 'badge badge-gold'
                }
              >
                {status}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative corner glow */}
        <div
          aria-hidden="true"
          className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-teal/8 blur-2xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-gold/8 blur-2xl pointer-events-none"
        />
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left — bio */}
          <div>
            <p className="section-label reveal">Tentang</p>
            <h2
              id="about-heading"
              className="font-display font-bold text-3xl sm:text-4xl text-tx-1 leading-tight mb-6 reveal reveal-d1"
            >
              Bukan developer generik.{' '}
              <span className="text-gold-gradient">Punya sudut pandang.</span>
            </h2>

            <div className="space-y-4 text-tx-2 leading-relaxed text-base reveal reveal-d2">
              <p>
                Nama saya{' '}
                <strong className="text-tx-1">Muhammad Rafly Yahya Ramadhan</strong>,
                biasa dipanggil Rafly. Mahasiswa Informatika di Institut Teknologi
                Sumatera (ITERA).
              </p>
              <p>
                Saya fokus membangun website yang tidak sekadar cantik — tapi dapat
                dipahami pengunjung dalam 5 detik pertama dan mendorong mereka
                melakukan sesuatu: menghubungi, membeli, atau mempercayai bisnis Anda.
              </p>
              <p>
                Di luar web development, saya belajar keamanan web secara aktif. Dua
                jalur ini saling melengkapi: ketika saya menulis kode, saya sudah
                memikirkan vektor serangan yang bisa muncul dari setiap baris.
              </p>
              <p>
                Saat ini{' '}
                <strong className="text-teal">saya menerima proyek website</strong>{' '}
                UMKM, landing page, dan company profile dengan harga yang realistis
                untuk pemula Indonesia.
              </p>
            </div>

            {/* Highlight cards */}
            <ul className="space-y-3 mt-8 reveal reveal-d3" role="list">
              {highlights.map(({ icon: Icon, title, description, accent }) => (
                <li key={title} className="card p-4 flex gap-3.5">
                  <div
                    className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
                      accent === 'gold' ? 'bg-gold/10 text-gold' : 'bg-teal/10 text-teal'
                    }`}
                    aria-hidden="true"
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-tx-1 text-sm mb-0.5">
                      {title}
                    </p>
                    <p className="text-tx-2 text-xs leading-relaxed">{description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div className="flex flex-wrap gap-3 mt-7 reveal reveal-d4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2"
              >
                <ExternalLink size={14} aria-hidden="true" /> GitHub
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-sm py-2"
              >
                <ExternalLink size={14} aria-hidden="true" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right — profile card */}
          <div className="reveal reveal-d2 lg:pt-10">
            <ProfileCard />
          </div>

        </div>
      </div>
    </section>
  )
}
