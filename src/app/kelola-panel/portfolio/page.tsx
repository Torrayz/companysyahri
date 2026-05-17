import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { FolderOpen, Plus, Pencil } from 'lucide-react'
import { DeletePortfolioButton } from '@/components/admin/delete-portfolio-button'
import type { Portfolio } from '@/types'

const categoryColors: Record<string, string> = {
  pengadaan: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  konsumsi: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  digital: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  atk: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  furniture: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
}

export default async function AdminPortfolioPage() {
  const supabase = createAdminClient()
  const { data: portfolios } = await supabase.from('portfolios').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Kelola Portfolio</h1>
          <p className="mt-1 text-sm text-text-muted">{portfolios?.length ?? 0} portfolio terdaftar</p>
        </div>
        <Link
          href="/kelola-panel/portfolio/tambah"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-md hover:shadow-primary/10"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {portfolios?.map((item: Portfolio) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-2xl border border-border bg-background p-5 transition-all hover:border-border-light hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                <FolderOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="font-semibold text-text">{item.title}</p>
                <div className="mt-1 flex items-center gap-2">
                  {item.category && (
                    <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold capitalize ${categoryColors[item.category] ?? 'bg-slate-500/10 text-slate-600 dark:text-slate-400'}`}>
                      {item.category}
                    </span>
                  )}
                  {item.client_name && (
                    <span className="text-xs text-text-muted">• {item.client_name}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/kelola-panel/portfolio/${item.id}`}
                className="rounded-xl p-2.5 text-text-muted transition-all hover:bg-background-muted hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeletePortfolioButton id={item.id} />
            </div>
          </div>
        ))}

        {(!portfolios || portfolios.length === 0) && (
          <div className="py-16 text-center text-text-muted">
            <FolderOpen className="mx-auto h-12 w-12 opacity-30" />
            <p className="mt-3">Belum ada portfolio. Klik &ldquo;Tambah&rdquo; untuk membuat.</p>
          </div>
        )}
      </div>
    </div>
  )
}
