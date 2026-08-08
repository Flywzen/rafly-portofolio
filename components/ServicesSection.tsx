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
            className="text-lg sm:text-xl text-zinc-50 leading-[1.8] mb-4"
          >
            What I Do
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl">
            Prices below are starting estimates. We&apos;ll nail down scope before
            anything&apos;s final, and there are no surprise charges after.
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
          <p className="text-center text-zinc-500 text-base">
            Prices are estimates. We talk first, agree after.{' '}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-text hover:underline"
            >
              Ask on WhatsApp
            </a>
          </p>
        </Reveal>

      </div>
    </section>
  )
}
