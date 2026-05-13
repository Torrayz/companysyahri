import { createClient } from '@/lib/supabase/server'
import { FolderOpen } from 'lucide-react'

export default async function AdminPortfolioPage() {
  const supabase = await createClient()
  const { data: portfolios } = await supabase.from('portfolios').select('*').order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Kelola Portfolio</h1>
      <p className="mt-1 text-sm text-text-muted">{portfolios?.length ?? 0} portfolio</p>

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
            <span className={`rounded-full px-2 py-0.5 text-xs ${item.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {item.is_active ? 'Aktif' : 'Nonaktif'}
            </span>
          </div>
        ))}

        {(!portfolios || portfolios.length === 0) && (
          <p className="py-8 text-center text-sm text-text-muted">Belum ada portfolio.</p>
        )}
      </div>
    </div>
  )
}
