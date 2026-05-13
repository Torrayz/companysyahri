'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortfolio } from '@/actions/portfolios'
import { ImageUpload } from '@/components/admin/image-upload'

const categories = [
  { value: 'pengadaan', label: 'Pengadaan' },
  { value: 'konsumsi', label: 'Konsumsi' },
  { value: 'digital', label: 'Digital' },
  { value: 'atk', label: 'ATK' },
]

export function PortfolioForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get('title') as string,
      description: form.get('description') as string,
      category: form.get('category') as string,
      client_name: form.get('client_name') as string,
      image_url: imageUrl || undefined,
      is_active: true,
    }

    const result = await createPortfolio(data)
    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/kelola-panel/portfolio')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-text">Judul</label>
        <input name="title" required className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium text-text">Deskripsi</label>
        <textarea name="description" rows={3} className="mt-1 w-full resize-none rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium text-text">Kategori</label>
        <select name="category" required className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary">
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text">Nama Klien</label>
        <input name="client_name" className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
      </div>

      <div>
        <label className="block text-sm font-medium text-text">Gambar</label>
        <div className="mt-1">
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </div>
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
