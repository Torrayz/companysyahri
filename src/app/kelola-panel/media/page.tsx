import { createAdminClient } from '@/lib/supabase/admin'
import Image from 'next/image'
import { Image as ImageIcon } from 'lucide-react'

export default async function AdminMediaPage() {
  const supabase = createAdminClient()
  const { data: files } = await supabase.storage.from('media').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
  const { data: docFiles } = await supabase.storage.from('media').list('docs', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })

  const allFiles = [
    ...(files?.filter(f => f.name !== '.emptyFolderPlaceholder' && f.name !== 'docs').map(f => ({ ...f, path: f.name })) ?? []),
    ...(docFiles?.map(f => ({ ...f, path: `docs/${f.name}` })) ?? []),
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Media</h1>
      <p className="mt-1 text-sm text-text-muted">{allFiles.length} file diupload</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {allFiles.map((file) => {
          const url = supabase.storage.from('media').getPublicUrl(file.path).data.publicUrl
          const isImage = /\.(jpg|jpeg|png|webp|svg)$/i.test(file.name)

          return (
            <div key={file.path} className="group overflow-hidden rounded-lg border border-border">
              {isImage ? (
                <div className="relative aspect-square bg-background-muted">
                  <Image src={url} alt={file.name} fill className="object-cover" sizes="200px" />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center bg-background-muted">
                  <ImageIcon className="h-10 w-10 text-text-muted" />
                </div>
              )}
              <div className="p-2">
                <p className="truncate text-xs text-text-muted">{file.name}</p>
              </div>
            </div>
          )
        })}
      </div>

      {allFiles.length === 0 && (
        <div className="py-16 text-center text-text-muted">
          <ImageIcon className="mx-auto h-12 w-12 opacity-50" />
          <p className="mt-3">Belum ada file yang diupload.</p>
        </div>
      )}
    </div>
  )
}
