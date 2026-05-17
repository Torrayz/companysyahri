'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Image as ImageIcon, Download, Trash2, Loader2, HardDrive } from 'lucide-react'

export default function AdminMediaPage() {
  const [files, setFiles] = useState<{ name: string; path: string; url: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFiles()
  }, [])

  async function fetchFiles() {
    const res = await fetch('/api/admin/media')
    const data = await res.json()
    setFiles(data)
    setLoading(false)
  }

  async function handleDelete(path: string) {
    if (!confirm('Hapus file ini?')) return
    const res = await fetch('/api/admin/media', {
      method: 'DELETE',
      body: JSON.stringify({ path }),
      headers: { 'Content-Type': 'application/json' },
    })
    const data = await res.json()

    if (res.status === 409) {
      alert(`⚠️ Tidak bisa dihapus!\n\n${data.error}`)
      return
    }
    if (data.error) { alert(data.error); return }
    setFiles((prev) => prev.filter(f => f.path !== path))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Media</h1>
          <p className="mt-1 text-sm text-text-muted">
            {files.length} file &bull; Supabase Storage
          </p>
        </div>
        <div className="hidden items-center gap-2 rounded-xl border border-border bg-background-muted px-4 py-2 text-sm text-text-muted sm:flex">
          <HardDrive className="h-4 w-4" />
          Maks 1GB (Free Tier)
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {files.map((file) => {
          const isImage = /\.(jpg|jpeg|png|webp|svg)$/i.test(file.name)
          return (
            <div key={file.path} className="group overflow-hidden rounded-2xl border border-border bg-background transition-all hover:border-border-light hover:shadow-sm">
              {isImage ? (
                <div className="relative aspect-square bg-background-muted">
                  <Image src={file.url} alt={file.name} fill className="object-cover" sizes="200px" />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center bg-background-muted">
                  <ImageIcon className="h-10 w-10 text-text-light" />
                </div>
              )}
              <div className="flex items-center justify-between p-3">
                <p className="min-w-0 truncate text-xs font-medium text-text-muted">{file.name}</p>
                <div className="flex shrink-0 gap-1">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="rounded-lg p-1.5 text-text-light transition-all hover:bg-primary/10 hover:text-primary"
                  >
                    <Download className="h-3.5 w-3.5" />
                  </a>
                  <button
                    onClick={() => handleDelete(file.path)}
                    className="rounded-lg p-1.5 text-text-light transition-all hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {files.length === 0 && (
        <div className="py-16 text-center text-text-muted">
          <ImageIcon className="mx-auto h-12 w-12 opacity-30" />
          <p className="mt-3">Belum ada file yang diupload.</p>
        </div>
      )}
    </div>
  )
}
