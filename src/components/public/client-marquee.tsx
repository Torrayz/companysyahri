'use client'

import { Building2 } from 'lucide-react'

// Placeholder clients - nanti bisa diganti dari admin/database
const clients = [
  'Instansi Pemerintah',
  'PT. Mitra Sejahtera',
  'CV. Berkah Mandiri',
  'Dinas Pendidikan',
  'PT. Teknologi Nusantara',
  'UMKM Digital',
  'PT. Karya Prima',
  'Kementerian Keuangan',
]

export function ClientMarquee() {
  return (
    <section className="overflow-hidden border-y border-border bg-background-muted py-8">
      <div className="container mx-auto px-4">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
          Dipercaya oleh berbagai instansi & perusahaan
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background-muted to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background-muted to-transparent" />

        {/* Scrolling track */}
        <div className="flex animate-marquee gap-8">
          {[...clients, ...clients].map((client, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-2.5 rounded-lg border border-border bg-background px-5 py-3"
            >
              <Building2 className="h-4 w-4 text-primary" />
              <span className="whitespace-nowrap text-sm font-medium text-text-muted">{client}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
