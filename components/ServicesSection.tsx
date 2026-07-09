import ServiceCard from '@/components/ServiceCard'
import { services } from '@/data/services'
import { WHATSAPP_URL } from '@/data/socialLinks'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-pad"
    >
      <div className="max-w-content mx-auto px-5 sm:px-8">

        {/* Header */}
        <Reveal className="mb-12">
          <h2
            id="services-heading"
            className="font-semibold text-3xl sm:text-4xl text-zinc-50 leading-tight mb-3 tracking-tight"
          >
            Apa yang saya kerjakan
          </h2>
          <p className="text-zinc-400 text-base max-w-xl">
            Harga di bawah adalah estimasi untuk proyek pemula. Scope dan kompleksitas
            akan didiskusikan sebelum deal, tidak ada biaya tersembunyi.
          </p>
        </Reveal>

        {/* Service cards */}
        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <RevealItem key={service.id}>
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Disclaimer */}
        <Reveal className="mt-8">
          <p className="text-center text-zinc-500 text-xs">
            Harga bersifat estimasi, diskusi dulu, deal kemudian.{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-text hover:underline"
            >
              Tanya via WhatsApp
            </a>
          </p>
        </Reveal>

      </div>
    </section>
  )
}
