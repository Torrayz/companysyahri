'use client'

import { useEffect, useState } from 'react'
import { Building2 } from 'lucide-react'

export function ClientMarquee() {
  const [clients, setClients] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    fetch('/api/public/clients').then(r => r.json()).then(setClients)
  }, [])

  if (clients.length === 0) return null

  return (
    <section className="overflow-hidden border-y border-border bg-background-muted py-8">
      <div className="container mx-auto px-4">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-text-muted">
          Dipercaya oleh berbagai instansi & perusahaan
        </p>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background-muted to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background-muted to-transparent" />

        <div className="flex animate-marquee gap-8">
          {[...clients, ...clients].map((client, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2.5 rounded-lg border border-border bg-background px-5 py-3">
              <Building2 className="h-4 w-4 text-primary" />
              <span className="whitespace-nowrap text-sm font-medium text-text-muted">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
