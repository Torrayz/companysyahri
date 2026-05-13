'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { Image as ImageIcon, Download, Trash2 } from 'lucide-react'

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
    if (!confirm('Hapus file ini? File yang sedang dipakai di portfolio/legalitas akan hilang.')) return
    await fetch('/api/admin/media', { method: 'DELETE', body: JSON.stringify({ path }) })
    setFiles(files.filter(f => f.path !== path))
  }

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Media</h1>
      <p className="mt-1 text-sm text-text-muted">{files.length} file • Supabase Storage (maks 1GB)</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {files.map((file) => {
          const isImage = /\.(jpg|jpeg|png|webp|svg)$/i.test(file.name)
          return (
            <div key={file.path} className="group overflow-hidden rounded-lg border border-border">
              {isImage ? (
                <div className="relative aspect-square bg-background-muted">
                  <Image src={file.url} alt={file.name} fill className="object-cover" sizes="200px" />
                </div>
              ) : (
                <div className="flex aspect-square items-center justify-center bg-background-muted">
                  <ImageIcon className="h-10 w-10 text-text-muted" />
                </div>
              )}
              <div className="flex items-center justify-between p-2">
                <p className="min-w-0 truncate text-xs text-text-muted">{file.name}</p>
                <div className="flex shrink-0 gap-1">
                  <a href={file.url} target="_blank" download className="rounded p-1 text-text-muted hover:text-primary">
                    <Download className="h-3.5 w-3.5" />
                  </a>
                  <button onClick={() => handleDelete(file.path)} className="rounded p-1 text-text-muted hover:text-red-600">
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
          <ImageIcon className="mx-auto h-12 w-12 opacity-50" />
          <p className="mt-3">Belum ada file yang diupload.</p>
        </div>
      )}
    </div>
  )
}
