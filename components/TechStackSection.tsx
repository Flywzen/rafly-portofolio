import { techStack } from '@/data/techStack'
import { cn } from '@/lib/utils'

export default function TechStackSection() {
  return (
    <section
      id="techstack"
      aria-labelledby="techstack-heading"
      className="section-pad bg-surface/20"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-12 reveal">
          <p className="section-label">Tech Stack</p>
          <h2
            id="techstack-heading"
            className="font-display font-bold text-3xl sm:text-4xl text-tx-1 leading-tight mb-4"
          >
            Tools yang saya pakai
          </h2>

          {/* Legend */}
          <div className="flex flex-wrap gap-5" aria-label="Keterangan level">
            <span className="flex items-center gap-2 text-sm text-tx-2">
              <span
                className="w-2 h-2 rounded-full bg-teal inline-block"
                aria-hidden="true"
              />
              Solid — sudah dipakai di proyek nyata
            </span>
            <span className="flex items-center gap-2 text-sm text-tx-2">
              <span
                className="w-2 h-2 rounded-full bg-gold/50 inline-block"
                aria-hidden="true"
              />
              Learning — aktif dipelajari
            </span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((cat, i) => (
            <div
              key={cat.category}
              className={cn('reveal', `reveal-d${Math.min(i + 1, 4)}`)}
            >
              <p
                className="text-[10px] font-bold text-tx-3 uppercase tracking-widest mb-4"
                aria-label={`Kategori: ${cat.category}`}
              >
                {cat.category}
              </p>

              <ul className="space-y-3" role="list">
                {cat.items.map(({ name, level }) => (
                  <li
                    key={name}
                    className="flex items-center justify-between group"
                  >
                    <span className="text-sm text-tx-2 group-hover:text-tx-1 transition-colors duration-200">
                      {name}
                    </span>
                    <span
                      aria-label={level === 'solid' ? 'Solid' : 'Learning'}
                      className={cn(
                        'w-1.5 h-1.5 rounded-full shrink-0',
                        level === 'solid' ? 'bg-teal' : 'bg-gold/45',
                      )}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
