import {
  Clock, CheckCircle2, AlertCircle,
  LayoutTemplate, Building2, User, Wrench,
} from 'lucide-react'
import type { Service } from '@/types'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<Service['icon'], React.ElementType> = {
  layout:   LayoutTemplate,
  building: Building2,
  user:     User,
  wrench:   Wrench,
}

interface ServiceCardProps {
  service: Service
  /** Tailwind reveal delay class, e.g. 'reveal-d2' */
  delayClass?: string
}

export default function ServiceCard({ service, delayClass = '' }: ServiceCardProps) {
  const Icon = ICON_MAP[service.icon]

  return (
    <article
      className={cn('card p-6 flex flex-col relative reveal', delayClass)}
      aria-label={`Paket ${service.title}`}
    >
      {/* "Populer" badge */}
      {service.featured && (
        <div className="absolute -top-3 left-5">
          <span className="badge badge-gold" aria-label="Paket populer">Populer</span>
        </div>
      )}

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4"
        aria-hidden="true"
      >
        <Icon size={18} className="text-gold" />
      </div>

      {/* Title + subtitle */}
      <h3 className="font-display font-semibold text-tx-1 text-base mb-1">
        {service.title}
      </h3>
      <p className="text-tx-3 text-xs mb-5 leading-relaxed">{service.subtitle}</p>

      {/* Price */}
      <div className="mb-5">
        <p className="text-gold font-display font-bold text-lg leading-tight">
          {service.price}
        </p>
        {service.priceNote && (
          <p className="text-tx-3 text-[11px] mt-0.5">{service.priceNote}</p>
        )}
        <p className="flex items-center gap-1.5 text-tx-3 text-xs mt-1.5">
          <Clock size={11} aria-hidden="true" />
          {service.duration}
        </p>
      </div>

      {/* Deliverables */}
      <ul className="space-y-2.5 mb-5 flex-1" aria-label="Yang termasuk dalam paket">
        {service.deliverables.map((item) => (
          <li key={item} className="flex gap-2 text-xs text-tx-2 leading-relaxed">
            <CheckCircle2
              size={13}
              className="text-teal shrink-0 mt-0.5"
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      {/* Note */}
      {service.note && (
        <p className="flex gap-1.5 text-[11px] text-tx-3 leading-relaxed mt-auto pt-3 border-t border-gold/8">
          <AlertCircle size={12} className="shrink-0 mt-0.5 text-gold/40" aria-hidden="true" />
          {service.note}
        </p>
      )}
    </article>
  )
}
