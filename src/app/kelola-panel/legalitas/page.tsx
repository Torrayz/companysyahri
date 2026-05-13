import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { FileCheck, Plus } from 'lucide-react'
import { DeleteLegalityButton } from '@/components/admin/delete-legality-button'

export default async function AdminLegalitasPage() {
  const supabase = createAdminClient()
  const { data: docs } = await supabase.from('legality').select('*').order('order')

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Kelola Legalitas</h1>
          <p className="mt-1 text-sm text-text-muted">{docs?.length ?? 0} dokumen</p>
        </div>
        <Link href="/kelola-panel/legalitas/tambah" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light">
          <Plus className="h-4 w-4" />
          Tambah
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {docs?.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <FileCheck className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-text">{doc.title}</p>
                <p className="text-xs text-text-muted">{doc.number || 'Tanpa nomor'}</p>
              </div>
            </div>
            <DeleteLegalityButton id={doc.id} />
          </div>
        ))}
        {(!docs || docs.length === 0) && <p className="py-8 text-center text-sm text-text-muted">Belum ada dokumen legalitas.</p>}
      </div>
    </div>
  )
}
