import { PenTool, Monitor, Armchair, UtensilsCrossed, Globe, Package, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Reveal } from '@/components/public/reveal'
import type { Service } from '@/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PenTool, Monitor, Armchair, UtensilsCrossed, Globe, Package,
}

const colorList = [
  { iconColor: 'text-blue-600 dark:text-blue-400', iconBg: 'bg-blue-500/10', gradient: 'from-blue-500/10 to-cyan-500/10', border: 'group-hover:border-b-blue-500' },
  { iconColor: 'text-violet-600 dark:text-violet-400', iconBg: 'bg-violet-500/10', gradient: 'from-violet-500/10 to-purple-500/10', border: 'group-hover:border-b-violet-500' },
  { iconColor: 'text-amber-600 dark:text-amber-400', iconBg: 'bg-amber-500/10', gradient: 'from-amber-500/10 to-orange-500/10', border: 'group-hover:border-b-amber-500' },
  { iconColor: 'text-rose-600 dark:text-rose-400', iconBg: 'bg-rose-500/10', gradient: 'from-rose-500/10 to-pink-500/10', border: 'group-hover:border-b-rose-500' },
  { iconColor: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-500/10', gradient: 'from-emerald-500/10 to-teal-500/10', border: 'group-hover:border-b-emerald-500' },
  { iconColor: 'text-sky-600 dark:text-sky-400', iconBg: 'bg-sky-500/10', gradient: 'from-sky-500/10 to-blue-500/10', border: 'group-hover:border-b-sky-500' },
]

const iconColorMap: Record<string, number> = {
  PenTool: 0, Monitor: 1, Armchair: 2, UtensilsCrossed: 3, Globe: 4, Package: 5,
}

interface ServiceHighlightProps {
  services: Service[]
}

export function ServiceHighlight({ services }: ServiceHighlightProps) {
  const displayed = services.slice(0, 6)
  const hasMore = services.length > 6

  /* 5 items use a 2+3 split layout; everything else uses the standard grid */
  const useAutoGrid = displayed.length <= 3 || displayed.length === 4 || displayed.length === 6

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        {/* ── Section header (left-aligned) ── */}
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              LAYANAN KAMI
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-text md:text-4xl lg:text-5xl">
              Solusi Lengkap untuk Bisnis Anda
            </h2>
            <p className="mt-4 leading-relaxed text-text-muted">
              Kami menyediakan berbagai layanan profesional untuk mendukung operasional
              dan pertumbuhan bisnis Anda — dari kebutuhan kantor hingga solusi digital.
            </p>
          </div>
        </Reveal>

        {/* ── Service cards ── */}
        {useAutoGrid ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayed.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {displayed.slice(0, 2).map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayed.slice(2).map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index + 2} />
              ))}
            </div>
          </>
        )}

        {/* ── Empty state ── */}
        {displayed.length === 0 && (
          <div className="mt-16 py-16 text-center text-text-muted">
            <Package className="mx-auto h-16 w-16 opacity-30" />
            <p className="mt-4 text-lg">Belum ada layanan.</p>
          </div>
        )}

        {/* ── CTA ── */}
        <Reveal delay={400}>
          <div className="mt-14 text-center">
            <Link
              href="/layanan"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              {hasMore ? `Lihat semua ${services.length} layanan` : 'Lihat semua layanan'} →
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── Card sub-component ── */
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon ?? ''] ?? Package
  const colorIndex = iconColorMap[service.icon ?? ''] ?? (index % colorList.length)
  const colors = colorList[colorIndex]

  return (
    <Reveal delay={index * 80}>
      <div
        className={`card-corporate group flex h-full flex-col border-b-2 border-b-transparent p-7 transition-all ${colors.border}`}
      >
        {/* Icon */}
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${colors.iconBg}`}
        >
          <Icon className={`h-6 w-6 ${colors.iconColor}`} />
        </div>

        {/* Content */}
        <h3 className="mt-5 text-lg font-bold text-text">{service.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
          {service.description}
        </p>
      </div>
    </Reveal>
  )
}
