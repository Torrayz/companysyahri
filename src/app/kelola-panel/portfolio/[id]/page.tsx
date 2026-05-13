'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { updatePortfolio } from '@/actions/portfolios'
import { ImageUpload } from '@/components/admin/image-upload'

const categories = [
  { value: 'pengadaan', label: 'Pengadaan' },
  { value: 'konsumsi', label: 'Konsumsi' },
  { value: 'digital', label: 'Digital' },
  { value: 'atk', label: 'ATK' },
]

export default function EditPortfolioPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [portfolio, setPortfolio] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    params.then(({ id }) => {
      fetch(`/api/admin/portfolio/${id}`).then(r => r.json()).then((data) => {
        setPortfolio(data)
        setImageUrl(data?.image_url || '')
      })
    })
  }, [params])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { id } = await params
    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get('title') as string,
      description: form.get('description') as string,
      category: form.get('category') as string,
      client_name: form.get('client_name') as string,
      image_url: imageUrl || undefined,
      is_active: true,
    }

    const result = await updatePortfolio(id, data)
    if (result.error) { setError(result.error); setLoading(false); return }
    router.push('/kelola-panel/portfolio')
    router.refresh()
  }

  if (!portfolio) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Edit Portfolio</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-lg space-y-4">
        <div>
          <label className="block text-sm font-medium text-text">Judul</label>
          <input name="title" defaultValue={portfolio.title} required className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text">Deskripsi</label>
          <textarea name="description" defaultValue={portfolio.description ?? ''} rows={3} className="mt-1 w-full resize-none rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text">Kategori</label>
          <select name="category" defaultValue={portfolio.category} className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary">
            {categories.map((cat) => <option key={cat.value} value={cat.value}>{cat.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text">Nama Klien</label>
          <input name="client_name" defaultValue={portfolio.client_name ?? ''} className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text">Gambar</label>
          <div className="mt-1"><ImageUpload value={imageUrl} onChange={setImageUrl} /></div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-3">
          <button type="submit" disabled={loading} className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50">{loading ? 'Menyimpan...' : 'Update'}</button>
          <button type="button" onClick={() => router.back()} className="rounded-lg border border-border px-5 py-2 text-sm text-text-muted hover:bg-background-muted">Batal</button>
        </div>
      </form>
    </div>
  )
}
