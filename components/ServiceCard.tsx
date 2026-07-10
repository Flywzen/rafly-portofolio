import { Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Service } from '@/types'
import { cn } from '@/lib/utils'

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article
      className={cn(
        'p-6 flex flex-col bg-zinc-900',
        service.featured
          ? 'border-2 border-pixel-yellow shadow-[4px_4px_0_0_#F5D033]'
          : 'surface',
      )}
      aria-label={`Package: ${service.title}`}
    >
      {/* Title + subtitle — "Populer" is a color/weight distinction, not a badge */}
      <div className="mb-5">
        <h3 className="text-zinc-50 text-xs leading-[1.8] flex items-center gap-2 flex-wrap">
          {service.title}
          {service.featured && (
            <span className="text-pixel-yellow text-sm normal-case">Populer</span>
          )}
        </h3>
        <p className="text-zinc-500 text-base mt-2 leading-relaxed">{service.subtitle}</p>
      </div>

      {/* Price */}
      <div className="mb-5">
        <p className="text-zinc-50 font-pixel text-sm leading-relaxed">
          {service.price}
        </p>
        {service.priceNote && (
          <p className="text-zinc-500 text-sm mt-1">{service.priceNote}</p>
        )}
        <p className="flex items-center gap-1.5 text-zinc-500 text-base mt-2">
          <Clock size={13} aria-hidden="true" />
          {service.duration}
        </p>
      </div>

      {/* Deliverables — checkmarks are functional here: they mean "included" */}
      <ul className="space-y-2.5 mb-5 flex-1" aria-label="What's included">
        {service.deliverables.map((item) => (
          <li key={item} className="flex gap-2 text-base text-zinc-400 leading-relaxed">
            <CheckCircle2
              size={15}
              className="text-zinc-500 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Note */}
      {service.note && (
        <p className="flex gap-1.5 text-sm text-zinc-500 leading-relaxed mt-auto pt-3 border-t-2 border-white/10">
          <AlertCircle size={14} className="shrink-0 mt-0.5 text-zinc-600" aria-hidden="true" />
          {service.note}
        </p>
      )}
    </article>
  )
}
