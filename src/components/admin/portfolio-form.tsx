'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortfolio } from '@/actions/portfolios'
import { ImageUpload } from '@/components/admin/image-upload'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

const categories = [
  { value: 'pengadaan', label: 'Pengadaan' },
  { value: 'konsumsi', label: 'Konsumsi' },
  { value: 'digital', label: 'Digital' },
  { value: 'atk', label: 'ATK' },
  { value: 'furniture', label: 'Furniture' },
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

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-text-light focus:border-primary focus:ring-2 focus:ring-primary/10'

  return (
    <div>
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-text-muted transition-all hover:bg-background-muted hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali
      </button>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-6">
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-light">Detail Portfolio</h2>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text">Judul</label>
              <input name="title" required className={inputClass} placeholder="Nama proyek" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text">Deskripsi</label>
              <textarea name="description" rows={3} className={`${inputClass} resize-none`} placeholder="Deskripsi singkat proyek" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-text">Kategori</label>
                <select name="category" required className={inputClass}>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text">Nama Klien</label>
                <input name="client_name" className={inputClass} placeholder="Opsional" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text">Gambar</label>
              <div className="mt-1.5">
                <ImageUpload value={imageUrl} onChange={setImageUrl} />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-light hover:shadow-md hover:shadow-primary/10 disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</>
            ) : (
              <><Save className="h-4 w-4" /> Tambah</>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-text-muted transition-all hover:bg-background-muted hover:text-text"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  )
}
