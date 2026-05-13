import { PenTool, Monitor, Armchair, UtensilsCrossed, Globe } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    icon: PenTool,
    title: 'Pengadaan ATK',
    description: 'Alat tulis kantor lengkap untuk kebutuhan operasional.',
  },
  {
    icon: Monitor,
    title: 'IT Hardware & Elektronik',
    description: 'Perangkat komputer, printer, dan networking.',
  },
  {
    icon: Armchair,
    title: 'Furniture Kantor',
    description: 'Meja, kursi, dan partisi kantor modular.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Konsumsi Event',
    description: 'Catering fleksibel untuk corporate dan instansi.',
  },
  {
    icon: Globe,
    title: 'Website & Aplikasi',
    description: 'Solusi digital modern sesuai kebutuhan bisnis.',
  },
]

export function ServiceHighlight() {
  return (
    <section className="bg-background-muted py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-text md:text-4xl">Layanan Kami</h2>
          <p className="mt-3 text-text-muted">
            Solusi lengkap untuk kebutuhan bisnis Anda
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <service.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-text">{service.title}</h3>
              <p className="mt-2 text-sm text-text-muted">{service.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Lihat semua layanan
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
