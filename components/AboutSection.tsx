import { ExternalLink } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL } from '@/data/socialLinks'
import { RevealGroup, RevealItem } from '@/components/Reveal'

/**
 * Single column, prose only. The previous version said "ITERA", "security
 * learning", and the tech stack three times each across a bio, a highlights
 * list, and a sidebar card. That's one piece of information wearing three
 * costumes. This says each thing once.
 */
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <RevealGroup className="max-w-2xl">

          <RevealItem>
            <h2
              id="about-heading"
              className="font-semibold text-3xl sm:text-4xl text-zinc-50 leading-tight mb-6 tracking-tight"
            >
              Bukan developer generik. <span className="text-accent-text">Punya sudut pandang.</span>
            </h2>
          </RevealItem>

          <RevealItem className="space-y-4 text-zinc-400 leading-relaxed text-base">
            <p>
              Saya <strong className="text-zinc-50 font-medium">Muhammad Rafly Yahya Ramadhan</strong>,
              biasa dipanggil Rafly. Mahasiswa Informatika di Institut Teknologi
              Sumatera (ITERA), berbasis di Lampung.
            </p>
            <p>
              Saya membangun website dengan React, Next.js, dan TypeScript. Fokusnya bukan
              sekadar tampilan, tapi supaya pengunjung paham dalam 5 detik pertama dan mau
              menghubungi, membeli, atau percaya pada bisnis Anda.
            </p>
            <p>
              Saya juga belajar keamanan web secara aktif, karena kode yang ditulis tanpa
              mempertimbangkan serangan adalah bug yang menunggu waktu. Detailnya ada di
              bagian{' '}
              <a href="#security" className="text-accent-text hover:underline">
                Security
              </a>
              .
            </p>
            <p>
              Saat ini <strong className="text-zinc-50 font-medium">saya menerima proyek website</strong> UMKM,
              landing page, dan company profile dengan harga yang realistis untuk klien
              pertama di Indonesia.
            </p>
          </RevealItem>

          <RevealItem className="flex flex-wrap gap-3 mt-8">
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
          </RevealItem>

        </RevealGroup>
      </div>
    </section>
  )
}
