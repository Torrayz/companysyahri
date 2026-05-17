import { PenTool, Monitor, Armchair, UtensilsCrossed, Globe, Package, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/public/reveal'
import type { Service } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PenTool, Monitor, Armchair, UtensilsCrossed, Globe, Package,
}

const colorList = [
  { iconColor: 'text-blue-600 dark:text-blue-400', iconBg: 'bg-blue-500/10', gradient: 'from-blue-500/10 to-cyan-500/10' },
  { iconColor: 'text-violet-600 dark:text-violet-400', iconBg: 'bg-violet-500/10', gradient: 'from-violet-500/10 to-purple-500/10' },
  { iconColor: 'text-amber-600 dark:text-amber-400', iconBg: 'bg-amber-500/10', gradient: 'from-amber-500/10 to-orange-500/10' },
  { iconColor: 'text-rose-600 dark:text-rose-400', iconBg: 'bg-rose-500/10', gradient: 'from-rose-500/10 to-pink-500/10' },
  { iconColor: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-500/10', gradient: 'from-emerald-500/10 to-teal-500/10' },
  { iconColor: 'text-sky-600 dark:text-sky-400', iconBg: 'bg-sky-500/10', gradient: 'from-sky-500/10 to-blue-500/10' },
]

const iconColorMap: Record<string, number> = {
  PenTool: 0, Monitor: 1, Armchair: 2, UtensilsCrossed: 3, Globe: 4, Package: 5,
}

interface ServiceHighlightProps {
  services: Service[]
}

export function ServiceHighlight({ services }: ServiceHighlightProps) {
  /* Show max 6 on homepage, link to /layanan for more */
  const displayed = services.slice(0, 6)
  const hasMore = services.length > 6

  /* Determine grid layout: for ≤3 items use single row, for 4 use 2x2, for 5 use 2+3, for 6 use 3x2 */
  const useAutoGrid = displayed.length <= 3 || displayed.length === 4 || displayed.length === 6

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background-muted/50 to-background" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Section header */}
        <Reveal>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              Layanan Kami
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
              Solusi Lengkap untuk{' '}
              <span className="text-primary">Bisnis Anda</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-text-muted">
              {displayed.length} layanan utama yang dirancang untuk memenuhi setiap kebutuhan operasional
              dan digital perusahaan Anda.
            </p>
          </div>
        </Reveal>

        {/* Service cards */}
        {useAutoGrid ? (
          /* Standard grid for even distributions */
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        ) : (
          /* 5 items: 2 on top, 3 on bottom */
          <>
            <div className="mt-16 grid gap-5 sm:grid-cols-2">
              {displayed.slice(0, 2).map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {displayed.slice(2).map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index + 2} />
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {displayed.length === 0 && (
          <div className="mt-16 py-16 text-center text-text-muted">
            <Package className="mx-auto h-16 w-16 opacity-30" />
            <p className="mt-4 text-lg">Belum ada layanan.</p>
          </div>
        )}

        {/* CTA */}
        <Reveal delay={400}>
          <div className="mt-14 text-center">
            <Link
              href="/layanan"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary/5 px-6 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/10"
            >
              {hasMore ? `Lihat semua ${services.length} layanan` : 'Lihat semua layanan'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* Extracted card component — avoids re-renders since it's a pure function */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon ?? ''] ?? Package
  const colorIndex = iconColorMap[service.icon ?? ''] ?? (index % colorList.length)
  const colors = colorList[colorIndex]

  return (
    <Reveal delay={index * 80}>
      <div className={`card-glow group h-full rounded-2xl border border-border bg-gradient-to-br ${colors.gradient} p-7`}>
        <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.iconBg} transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`h-7 w-7 ${colors.iconColor}`} />
        </div>
        <h3 className="mt-5 text-xl font-bold text-text">{service.title}</h3>
        <p className="mt-2 leading-relaxed text-text-muted">{service.description}</p>
      </div>
    </Reveal>
  )
}
