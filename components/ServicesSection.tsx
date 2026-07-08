import ServiceCard from '@/components/ServiceCard'
import { services } from '@/data/services'
import { WHATSAPP_URL } from '@/data/socialLinks'

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-pad bg-surface/30"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-12 reveal">
          <p className="section-label">Jasa</p>
          <h2
            id="services-heading"
            className="font-display font-bold text-3xl sm:text-4xl text-tx-1 leading-tight mb-3"
          >
            Apa yang saya kerjakan
          </h2>
          <p className="text-tx-2 text-base max-w-xl">
            Harga di bawah adalah estimasi untuk proyek pemula. Scope dan kompleksitas
            akan didiskusikan sebelum deal — tidak ada biaya tersembunyi.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              delayClass={`reveal-d${Math.min(i + 1, 4)}`}
            />
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-tx-3 text-xs mt-8 reveal">
          Harga bersifat estimasi — diskusi dulu, deal kemudian.{' '}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Tanya via WhatsApp →
          </a>
        </p>

      </div>
    </section>
  )
}
