import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { FileCheck, Plus, Pencil } from 'lucide-react'
import { DeleteLegalityButton } from '@/components/admin/delete-legality-button'
import type { Legality } from '@/types'

export default async function AdminLegalitasPage() {
  const supabase = createAdminClient()
  const { data: docs } = await supabase.from('legality').select('*').order('order')

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Kelola Legalitas</h1>
          <p className="mt-1 text-sm text-text-muted">{docs?.length ?? 0} dokumen terdaftar</p>
        </div>
        <Link
          href="/kelola-panel/legalitas/tambah"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-md hover:shadow-primary/10"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {docs?.map((doc: Legality) => (
          <div
            key={doc.id}
            className="flex items-center justify-between rounded-2xl border border-border bg-background p-5 transition-all hover:border-border-light hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <FileCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-text">{doc.title}</p>
                <p className="mt-0.5 text-xs text-text-muted">{doc.number || 'Tanpa nomor'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/kelola-panel/legalitas/${doc.id}`}
                className="rounded-xl p-2.5 text-text-muted transition-all hover:bg-background-muted hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteLegalityButton id={doc.id} />
            </div>
          </div>
        ))}

        {(!docs || docs.length === 0) && (
          <div className="py-16 text-center text-text-muted">
            <FileCheck className="mx-auto h-12 w-12 opacity-30" />
            <p className="mt-3">Belum ada dokumen legalitas.</p>
          </div>
        )}
      </div>
    </div>
  )
}
