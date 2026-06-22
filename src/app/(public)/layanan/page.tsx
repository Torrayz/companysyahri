import type { Metadata } from 'next'
import { getServices } from '@/actions/services'
import { PenTool, Monitor, Armchair, UtensilsCrossed, Globe, Package, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/public/reveal'
import Link from 'next/link'
import type { Service } from '@/types'

export const metadata: Metadata = {
  title: 'Layanan',
  description: 'Layanan CV. Prabaswara Gandar Prima — pengadaan ATK, IT hardware, furniture kantor, konsumsi event, dan pembuatan website & aplikasi.',
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PenTool, Monitor, Armchair, UtensilsCrossed, Globe, Package,
}

const colorMap: Record<string, { iconColor: string; iconBg: string; gradient: string }> = {
  PenTool: { iconColor: 'text-blue-600 dark:text-blue-400', iconBg: 'bg-blue-500/10', gradient: 'from-blue-500/10 to-cyan-500/10' },
  Monitor: { iconColor: 'text-violet-600 dark:text-violet-400', iconBg: 'bg-violet-500/10', gradient: 'from-violet-500/10 to-purple-500/10' },
  Armchair: { iconColor: 'text-amber-600 dark:text-amber-400', iconBg: 'bg-amber-500/10', gradient: 'from-amber-500/10 to-orange-500/10' },
  UtensilsCrossed: { iconColor: 'text-rose-600 dark:text-rose-400', iconBg: 'bg-rose-500/10', gradient: 'from-rose-500/10 to-pink-500/10' },
  Globe: { iconColor: 'text-emerald-600 dark:text-emerald-400', iconBg: 'bg-emerald-500/10', gradient: 'from-emerald-500/10 to-teal-500/10' },
  Package: { iconColor: 'text-slate-600 dark:text-slate-400', iconBg: 'bg-slate-500/10', gradient: 'from-slate-500/10 to-gray-500/10' },
}

const fallbackColors = Object.values(colorMap)

export default async function LayananPage() {
  const services = await getServices()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80" />

        <div className="container relative z-10 mx-auto px-4 text-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              Layanan Kami
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Apa yang Kami Tawarkan
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Solusi lengkap untuk kebutuhan pengadaan, event, dan teknologi digital bisnis Anda.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Service grid — clean separation from hero */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service: Service, index: number) => {
              const Icon = iconMap[service.icon ?? ''] ?? Package
              const colors = colorMap[service.icon ?? ''] ?? fallbackColors[index % fallbackColors.length]
              return (
                <Reveal key={service.id} delay={index * 80}>
                  <div className="card-corporate h-full p-7">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${colors.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`h-7 w-7 ${colors.iconColor}`} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-text">{service.title}</h3>
                    <p className="mt-2 leading-relaxed text-text-muted">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              )
            })}
          </div>

          {/* Empty state */}
          {services.length === 0 && (
            <div className="py-24 text-center text-text-muted">
              <Package className="mx-auto h-16 w-16 opacity-30" />
              <p className="mt-4 text-lg">Belum ada layanan yang ditampilkan.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20 lg:px-8">
        <Reveal>
          <div className="card-corporate p-10 text-center">
            <div className="relative">
              <h2 className="text-2xl font-bold text-text md:text-3xl">Butuh Layanan Khusus?</h2>
              <p className="mx-auto mt-3 max-w-lg text-text-muted">
                Hubungi kami untuk konsultasi kebutuhan spesifik bisnis Anda.
              </p>
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}?text=${encodeURIComponent('Halo, saya tertarik dengan layanan CV. Prabaswara Gandar Prima. Bisa konsultasi?')}`}
                target="_blank"
                className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20"
              >
                Chat via WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
