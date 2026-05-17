'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createService, updateService } from '@/actions/services'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import type { Service } from '@/types'

const iconOptions = ['PenTool', 'Monitor', 'Armchair', 'UtensilsCrossed', 'Globe', 'Package']

const iconLabels: Record<string, string> = {
  PenTool: 'Pengadaan ATK',
  Monitor: 'IT Hardware',
  Armchair: 'Furniture',
  UtensilsCrossed: 'Konsumsi Event',
  Globe: 'Website & Digital',
  Package: 'Lainnya',
}

export function ServiceForm({ service }: { service?: Service }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isEdit = !!service

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get('title') as string,
      description: form.get('description') as string,
      icon: form.get('icon') as string,
      order: Number(form.get('order')) || 0,
      is_active: form.get('is_active') === 'on',
    }

    const result = isEdit
      ? await updateService(service.id, data)
      : await createService(data)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    router.push('/kelola-panel/layanan')
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
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-light">Detail Layanan</h2>

          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text">Judul</label>
              <input name="title" defaultValue={service?.title} required className={inputClass} placeholder="Nama layanan" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text">Deskripsi</label>
              <textarea name="description" defaultValue={service?.description ?? ''} rows={3} className={`${inputClass} resize-none`} placeholder="Deskripsi singkat layanan" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-text">Icon</label>
                <select name="icon" defaultValue={service?.icon ?? 'Package'} className={inputClass}>
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{iconLabels[icon] ?? icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text">Urutan</label>
                <input name="order" type="number" min="0" step="1" defaultValue={service?.order ?? 0} className={inputClass} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                name="is_active"
                type="checkbox"
                defaultChecked={service?.is_active ?? true}
                id="is_active"
                className="h-4 w-4 rounded border-border accent-primary"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-text">Aktif (tampil di website)</label>
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
              <><Save className="h-4 w-4" /> {isEdit ? 'Update' : 'Tambah'}</>
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
