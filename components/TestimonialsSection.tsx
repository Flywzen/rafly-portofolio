import { Quote, Star, MessageCircle, ArrowRight } from 'lucide-react'
import { WHATSAPP_URL } from '@/data/socialLinks'
import type { Testimonial } from '@/types'

// ── Real testimonials go here. Keep placeholder: false once filled. ────────
const testimonials: Testimonial[] = []

// ── Empty state — renders when no real testimonials exist ─────────────────
function EmptyState() {
  return (
    <div className="card-static rounded-2xl p-10 sm:p-14 flex flex-col items-center text-center reveal">
      {/* Quote icon */}
      <div
        aria-hidden="true"
        className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6"
      >
        <Quote size={24} className="text-gold/60" />
      </div>

      <h3 className="font-display font-semibold text-tx-1 text-xl mb-3">
        Belum ada testimoni — tapi bisa dari Anda.
      </h3>
      <p className="text-tx-2 text-sm max-w-sm leading-relaxed mb-8">
        Saya sedang mencari klien pertama. Jika bisnis Anda butuh website, saya
        akan kerjakan dengan serius dan minta ulasan jujur setelah selesai.
        Ulasan Anda akan tampil di sini.
      </p>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary text-sm"
        aria-label="Diskusi website via WhatsApp"
      >
        <MessageCircle size={15} aria-hidden="true" />
        Jadilah klien pertama
        <ArrowRight size={14} aria-hidden="true" />
      </a>

      {/* Decorative stars */}
      <div className="flex gap-1.5 mt-8" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="text-gold/20 fill-gold/10" />
        ))}
      </div>
      <p className="text-tx-3 text-xs mt-2">Rating akan diisi setelah proyek pertama</p>
    </div>
  )
}

// ── Real testimonial card ─────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  return (
    <figure
      className={`card p-6 reveal reveal-d${Math.min(index + 1, 4)}`}
      aria-label={`Testimoni dari ${testimonial.name}`}
    >
      <Quote size={18} className="text-gold/40 mb-4" aria-hidden="true" />
      <blockquote className="mb-5">
        <p className="text-tx-2 text-sm leading-relaxed">&ldquo;{testimonial.body}&rdquo;</p>
      </blockquote>
      <figcaption className="flex items-end justify-between gap-3">
        <div>
          <p className="font-display font-semibold text-tx-1 text-sm">{testimonial.name}</p>
          <p className="text-tx-3 text-xs mt-0.5">{testimonial.role}</p>
          {testimonial.company && (
            <p className="text-tx-3 text-xs">{testimonial.company}</p>
          )}
        </div>
        <div
          className="flex gap-0.5 shrink-0"
          aria-label={`Rating: ${testimonial.rating} dari 5`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < testimonial.rating
                  ? 'text-gold fill-gold/80'
                  : 'text-tx-3/30 fill-transparent'
              }
              aria-hidden="true"
            />
          ))}
        </div>
      </figcaption>
    </figure>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const hasTestimonials = testimonials.length > 0

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-pad bg-surface/20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        <div className="mb-10 reveal">
          <p className="section-label">Testimoni</p>
          <h2
            id="testimonials-heading"
            className="font-display font-bold text-3xl sm:text-4xl text-tx-1 leading-tight"
          >
            {hasTestimonials ? 'Yang klien katakan' : 'Klien pertama, dimulai dari sini.'}
          </h2>
        </div>

        {hasTestimonials ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}

      </div>
    </section>
  )
}
