'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Portfolio } from '@/types'

const categories = [
  { value: 'all', label: 'Semua' },
  { value: 'pengadaan', label: 'Pengadaan' },
  { value: 'konsumsi', label: 'Konsumsi' },
  { value: 'digital', label: 'Digital' },
  { value: 'atk', label: 'ATK' },
]

export function PortfolioGrid({ portfolios }: { portfolios: Portfolio[] }) {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? portfolios
    : portfolios.filter((p) => p.category === active)

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === cat.value
                ? 'bg-primary text-white'
                : 'bg-background-muted text-text-muted hover:text-text'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-md"
          >
            {/* Image */}
            <div className="relative aspect-video bg-background-muted">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-text-muted">
                  <span className="text-sm">No Image</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
                {item.category}
              </span>
              <h3 className="mt-2 font-semibold text-text">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-sm text-text-muted line-clamp-2">{item.description}</p>
              )}
              {item.client_name && (
                <p className="mt-2 text-xs text-text-muted">Klien: {item.client_name}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-16 text-center text-text-muted">
          <p>Belum ada portfolio untuk kategori ini.</p>
        </div>
      )}
    </div>
  )
}
