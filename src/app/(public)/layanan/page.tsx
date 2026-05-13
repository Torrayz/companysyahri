import type { Metadata } from 'next'
import { getServices } from '@/actions/services'
import { PenTool, Monitor, Armchair, UtensilsCrossed, Globe, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Layanan',
  description: 'Layanan CV. Prabaswara Gandar Prima — pengadaan ATK, IT hardware, furniture kantor, konsumsi event, dan pembuatan website & aplikasi.',
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  PenTool,
  Monitor,
  Armchair,
  UtensilsCrossed,
  Globe,
  Package,
}

export default async function LayananPage() {
  const services = await getServices()

  return (
    <div className="py-16">
      {/* Header */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-text md:text-4xl">Layanan Kami</h1>
        <p className="mt-3 max-w-xl mx-auto text-text-muted">
          Solusi lengkap untuk kebutuhan pengadaan, event, dan teknologi digital bisnis Anda.
        </p>
      </section>

      {/* Service grid */}
      <section className="container mx-auto mt-12 px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon ?? ''] ?? Package
            return (
              <div
                key={service.id}
                className="group rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-text">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Empty state */}
        {services.length === 0 && (
          <div className="py-20 text-center text-text-muted">
            <Package className="mx-auto h-12 w-12 opacity-50" />
            <p className="mt-4">Belum ada layanan yang ditampilkan.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="container mx-auto mt-16 px-4 text-center">
        <div className="rounded-xl bg-background-muted p-8">
          <h2 className="text-xl font-semibold text-text">Butuh Layanan Khusus?</h2>
          <p className="mt-2 text-text-muted">
            Hubungi kami untuk konsultasi kebutuhan spesifik bisnis Anda.
          </p>
          <a
            href="/kontak"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-light"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </div>
  )
}
