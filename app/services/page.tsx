import type { Metadata } from 'next'
import { MessageCircle, ArrowRight } from 'lucide-react'
import ServiceCard from '@/components/ServiceCard'
import FaqItem from '@/components/FaqItem'
import { services } from '@/data/services'
import { WHATSAPP_URL } from '@/data/socialLinks'
import { CONTACT_CTA_LABEL } from '@/components/Navbar'
import { RevealGroup, RevealItem } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Website builds and fixes. What I build, how a project starts, and how to reach me for a proposal.',
}

const processSteps = [
  {
    step: '01',
    title: 'You reach out',
    body: 'Message me on WhatsApp with what you have in mind, even if it is not fully formed yet.',
  },
  {
    step: '02',
    title: 'We scope it together',
    body: "I ask what the site needs to do and who it's for. Then we agree on what \"done\" looks like.",
  },
  {
    step: '03',
    title: 'I send a proposal',
    body: 'A timeline and a number, scoped to what your project needs.',
  },
  {
    step: '04',
    title: 'We build it',
    body: 'Check-ins as it comes together. You see progress, not radio silence until the reveal.',
  },
]

const faqs = [
  {
    question: 'Why is there no price list?',
    answer:
      'Every project has different scope. A fixed number here would either overcharge something simple or undercharge something complex. I would rather understand what you need first, then give you a number that fits it.',
  },
  {
    question: 'How long does a project take?',
    answer:
      "Depends on scope. A single landing page moves faster than a multi-page company profile. You'll get a realistic timeline in the proposal, before anything starts.",
  },
  {
    question: 'Do I need a full brief before I message you?',
    answer:
      "No. Tell me what you're thinking, even roughly, and I'll ask the questions that narrow it down.",
  },
  {
    question: 'What if my budget is small?',
    answer:
      "Say so upfront. I'll tell you what's realistic for that budget, and if it isn't a fit, I'll say that too instead of wasting your time.",
  },
  {
    question: 'Do you offer revisions?',
    answer:
      'Yes. A set number of rounds is included in every package, listed under each one above. Extra rounds beyond that are a small add-on.',
  },
  {
    question: 'What do I get at the end?',
    answer:
      "The live site, deployed, plus the full source code. Nothing stays locked behind me after the project ends.",
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Intro */}
      <section aria-label="Services introduction" className="pt-24 pb-16">
        <RevealGroup className="max-w-content mx-auto px-5 sm:px-8" stagger={0.1}>
          <RevealItem>
            <h1 className="leading-[1.05] mb-6 text-3xl sm:text-4xl lg:text-5xl text-paper max-w-2xl">
              Websites built by someone who studies how they break.
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="text-paper/60 text-lg max-w-xl leading-relaxed mb-10">
              No price list below, on purpose. I scope every project on its own, then
              quote it, so you do not pay for complexity you do not have.
            </p>
          </RevealItem>
          <RevealItem className="flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {CONTACT_CTA_LABEL}
            </a>
            <a href="#what-i-build" className="btn-secondary">
              See What I Build
            </a>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* What I build */}
      <section id="what-i-build" aria-labelledby="build-heading" className="section-pad">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <h2 id="build-heading" className="text-2xl sm:text-3xl text-paper leading-[1.15] mb-4">
              What I Build
            </h2>
            <p className="text-paper/60 text-lg max-w-xl">
              Four kinds of projects, though most real work doesn&apos;t sort neatly
              into categories. If yours doesn&apos;t fit, message me anyway.
            </p>
          </div>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service) => (
              <RevealItem key={service.id}>
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* How I work */}
      <section aria-labelledby="process-heading" className="section-pad bg-white/[0.02]">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="mb-12">
            <h2 id="process-heading" className="text-2xl sm:text-3xl text-paper leading-[1.15] mb-4">
              How I Work
            </h2>
            <p className="text-paper/60 text-lg max-w-xl">
              Four steps, from first message to a live site.
            </p>
          </div>

          <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((s) => (
              <RevealItem key={s.step} className="surface p-5">
                <span className="font-mono text-sm text-paper0" aria-hidden="true">
                  {s.step}
                </span>
                <h3 className="font-sans text-lg uppercase tracking-wide text-paper leading-snug mt-3 mb-3">
                  {s.title}
                </h3>
                <p className="text-paper/60 text-base leading-relaxed">{s.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="section-pad">
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <div className="mb-8">
            <h2 id="faq-heading" className="text-2xl sm:text-3xl text-paper leading-[1.15]">
              Questions People Ask
            </h2>
          </div>

          <RevealGroup className="border-t border-white/20">
            {faqs.map((faq, i) => (
              <RevealItem key={faq.question}>
                <FaqItem id={`faq-${i}`} question={faq.question} answer={faq.answer} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Final CTA */}
      <section aria-labelledby="services-contact-heading" className="section-pad">
        <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
          <h2 id="services-contact-heading" className="text-2xl sm:text-3xl text-paper leading-[1.15] mb-6">
            Tell me what you&apos;re building.
          </h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary py-3.5 px-7 inline-flex text-lg"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {CONTACT_CTA_LABEL}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  )
}
