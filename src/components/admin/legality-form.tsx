'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createLegality } from '@/actions/legality'
import { uploadDocument } from '@/actions/media'
import { Upload, FileText } from 'lucide-react'

export function LegalityForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const [uploading, setUploading] = useState(false)

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadDocument(formData)
    if (result.error) {
      setError(result.error)
    } else if (result.url) {
      setFileUrl(result.url)
      setFileName(file.name)
    }
    setUploading(false)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get('title') as string,
      number: form.get('number') as string,
      description: form.get('description') as string,
      file_url: fileUrl || undefined,
      order: Number(form.get('order')) || 0,
    }

    const result = await createLegality(data)
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/kelola-panel/legalitas')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-text">Judul Dokumen</label>
        <input name="title" required placeholder="Contoh: NIB, NPWP, Akta Pendirian" className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text">Nomor Dokumen</label>
        <input name="number" placeholder="Nomor registrasi/sertifikat" className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
      </div>
      <div>
        <label className="block text-sm font-medium text-text">Keterangan</label>
        <textarea name="description" rows={2} className="mt-1 w-full resize-none rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
      </div>

      {/* File upload */}
      <div>
        <label className="block text-sm font-medium text-text">Dokumen (PDF/Gambar)</label>
        {fileUrl ? (
          <div className="mt-1 flex items-center gap-2 rounded-lg border border-border p-3">
            <FileText className="h-5 w-5 text-primary" />
            <span className="flex-1 truncate text-sm text-text-muted">{fileName}</span>
            <button type="button" onClick={() => { setFileUrl(''); setFileName('') }} className="text-xs text-red-500 hover:underline">Hapus</button>
          </div>
        ) : (
          <label className="mt-1 flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed border-border p-4 hover:border-primary">
            <Upload className="h-5 w-5 text-text-muted" />
            <span className="text-sm text-text-muted">{uploading ? 'Mengupload...' : 'Klik untuk upload (PDF, JPG, PNG — maks 5MB)'}</span>
            <input type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={handleFileUpload} disabled={uploading} className="hidden" />
          </label>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-text">Urutan</label>
        <input name="order" type="number" min="0" step="1" defaultValue={0} className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50">
          {loading ? 'Menyimpan...' : 'Tambah'}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-border px-5 py-2 text-sm text-text-muted hover:bg-background-muted">
          Batal
        </button>
      </div>
    </form>
  )
}
