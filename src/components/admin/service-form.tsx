'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createService, updateService } from '@/actions/services'
import type { Service } from '@/types'

const iconOptions = ['PenTool', 'Monitor', 'Armchair', 'UtensilsCrossed', 'Globe', 'Package']

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

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-text">Judul</label>
        <input
          name="title"
          defaultValue={service?.title}
          required
          className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text">Deskripsi</label>
        <textarea
          name="description"
          defaultValue={service?.description ?? ''}
          rows={3}
          className="mt-1 w-full resize-none rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text">Icon</label>
        <select
          name="icon"
          defaultValue={service?.icon ?? 'Package'}
          className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary"
        >
          {iconOptions.map((icon) => (
            <option key={icon} value={icon}>{icon}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text">Urutan</label>
        <input
          name="order"
          type="number"
          min="0"
          step="1"
          defaultValue={service?.order ?? 0}
          className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          name="is_active"
          type="checkbox"
          defaultChecked={service?.is_active ?? true}
          className="h-4 w-4 rounded border-border"
        />
        <label className="text-sm text-text">Aktif</label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : isEdit ? 'Update' : 'Tambah'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-border px-5 py-2 text-sm text-text-muted hover:bg-background-muted"
        >
          Batal
        </button>
      </div>
    </form>
  )
}
