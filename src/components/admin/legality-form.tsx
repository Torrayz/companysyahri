'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createLegality } from '@/actions/legality'

export function LegalityForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get('title') as string,
      number: form.get('number') as string,
      description: form.get('description') as string,
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
