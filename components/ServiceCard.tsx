import { Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className="surface p-6 flex flex-col"
      aria-label={`Paket ${service.title}`}
    >
      {/* Title + subtitle — "Populer" is a color/weight distinction, not a badge */}
      <div className="mb-5">
        <h3 className="font-semibold text-zinc-50 text-base flex items-center gap-2 flex-wrap">
          {service.title}
          {service.featured && (
            <span className="text-accent-text text-xs font-medium">Populer</span>
          )}
        </h3>
        <p className="text-zinc-500 text-xs mt-1 leading-relaxed">{service.subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-5">
        <p className="text-zinc-50 font-semibold text-lg leading-tight">
          {service.price}
        </p>
        {service.priceNote && (
          <p className="text-zinc-500 text-[11px] mt-0.5">{service.priceNote}</p>
        )}
        <p className="flex items-center gap-1.5 text-zinc-500 text-xs mt-1.5">
          <Clock size={11} aria-hidden="true" />
          {service.duration}
        </p>
      </div>

      {/* Deliverables — checkmarks are functional here: they mean "included" */}
      <ul className="space-y-2.5 mb-5 flex-1" aria-label="Yang termasuk dalam paket">
        {service.deliverables.map((item) => (
          <li key={item} className="flex gap-2 text-xs text-zinc-400 leading-relaxed">
            <CheckCircle2
              size={13}
              className="text-zinc-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Note */}
      {service.note && (
        <p className="flex gap-1.5 text-[11px] text-zinc-500 leading-relaxed mt-auto pt-3 border-t border-white/[0.08]">
          <AlertCircle size={12} className="shrink-0 mt-0.5 text-zinc-600" aria-hidden="true" />
          {service.note}
        </p>
      )}
    </article>
  )
}
