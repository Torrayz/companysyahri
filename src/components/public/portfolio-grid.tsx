'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, FolderOpen } from 'lucide-react'
import type { Portfolio } from '@/types'

const categoryColors: Record<string, string> = {
  pengadaan: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  konsumsi: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  digital: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  atk: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  furniture: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
}

const fallbackColor = 'bg-slate-500/10 text-slate-600 dark:text-slate-400'

export function PortfolioGrid({ portfolios }: { portfolios: Portfolio[] }) {
  const [active, setActive] = useState('all')

  /* Generate category tabs dynamically from actual portfolio data */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(portfolios.map((p) => p.category).filter(Boolean))
    )
    return [
      { value: 'all', label: 'Semua' },
      ...uniqueCategories.map((cat) => ({
        value: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
    ]
  }, [portfolios])

  const filtered = active === 'all'
    ? portfolios
    : portfolios.filter((p) => p.category === active)

  return (
    <div>
      {/* Filter tabs */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 rounded-2xl border border-border bg-background p-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                active === cat.value
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-text-muted hover:bg-background-muted hover:text-text'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/portfolio/${item.id}`}
            className="card-glow group overflow-hidden rounded-2xl border border-border bg-background"
          >
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-background-muted">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-text-light">
                  <FolderOpen className="h-10 w-10 opacity-30" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            {/* Content */}
            <div className="p-5">
              {item.category && (
                <span className={`inline-block rounded-lg px-3 py-1 text-xs font-semibold capitalize ${categoryColors[item.category] ?? fallbackColor}`}>
                  {item.category}
                </span>
              )}
              <h3 className="mt-3 text-lg font-bold text-text transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted line-clamp-2">
                  {item.description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-text-light">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(item.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-24 text-center text-text-muted">
          <FolderOpen className="mx-auto h-16 w-16 opacity-30" />
          <p className="mt-4 text-lg">Belum ada portfolio untuk kategori ini.</p>
        </div>
      )}
    </div>
  )
}
