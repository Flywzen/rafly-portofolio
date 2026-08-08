import { CheckCircle2, AlertCircle } from 'lucide-react'
import type { Service } from '@/types'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className={cn(
        'p-6 flex flex-col bg-ink-raised',
        service.featured
          ? 'border border-signal shadow-[0_0_0_1px_theme(colors.signal)]'
          : 'surface',
      )}
      aria-label={`Package: ${service.title}`}
    >
      {/* Title + subtitle — "Popular" is a color/weight distinction, not a badge */}
      <div className="mb-5">
        <h3 className="text-paper text-lg leading-snug flex items-center gap-2 flex-wrap">
          {service.title}
          {service.featured && (
            <span className="text-signal text-sm">Popular</span>
          )}
        </h3>
        <p className="text-paper0 text-base mt-2 leading-relaxed">{service.subtitle}</p>
      </div>

      {/* Scope — deliberately no price. See /services for why. */}
      <p className="text-paper/60 text-base leading-relaxed mb-5">
        {service.scope}
      </p>

      {/* Deliverables — checkmarks are functional here: they mean "included" */}
      <ul className="space-y-2.5 mb-5 flex-1" aria-label="What's included">
        {service.deliverables.map((item) => (
          <li key={item} className="flex gap-2 text-base text-paper/60 leading-relaxed">
            <CheckCircle2
              size={15}
              className="text-paper0 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Note */}
      {service.note && (
        <p className="flex gap-1.5 text-sm text-paper0 leading-relaxed mt-auto pt-3 border-t border-white/10">
          <AlertCircle size={14} className="shrink-0 mt-0.5 text-paper/35" aria-hidden="true" />
          {service.note}
        </p>
      )}
    </article>
  )
}
