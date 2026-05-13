import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { FolderOpen, Plus, Pencil } from 'lucide-react'
import { DeletePortfolioButton } from '@/components/admin/delete-portfolio-button'

export default async function AdminPortfolioPage() {
  const supabase = createAdminClient()
  const { data: portfolios } = await supabase.from('portfolios').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Kelola Portfolio</h1>
          <p className="mt-1 text-sm text-text-muted">{portfolios?.length ?? 0} portfolio</p>
        </div>
        <Link href="/kelola-panel/portfolio/tambah" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light">
          <Plus className="h-4 w-4" />
          Tambah
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {portfolios?.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <FolderOpen className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-text">{item.title}</p>
                <p className="text-xs text-text-muted capitalize">{item.category} {item.client_name ? `• ${item.client_name}` : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link href={`/kelola-panel/portfolio/${item.id}`} className="rounded-lg p-2 text-text-muted hover:bg-background-muted hover:text-primary">
                <Pencil className="h-4 w-4" />
              </Link>
              <DeletePortfolioButton id={item.id} />
            </div>
          </div>
        ))}

        {(!portfolios || portfolios.length === 0) && (
          <p className="py-8 text-center text-sm text-text-muted">Belum ada portfolio.</p>
        )}
      </div>
    </div>
  )
}
