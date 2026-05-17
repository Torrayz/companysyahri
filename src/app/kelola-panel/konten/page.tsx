'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createWhyChooseUs, deleteWhyChooseUs, createHowItWorks, deleteHowItWorks, createClientItem, deleteClientItem, getAllSiteConfig, updateSiteConfig } from '@/actions/content'
import { ShieldCheck, Plus, Trash2, Save } from 'lucide-react'

export default function AdminKontenPage() {
  const [tab, setTab] = useState<'clients' | 'why' | 'how' | 'config'>('clients')
  const [items, setItems] = useState<any[]>([])
  const [configs, setConfigs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [tab])

  async function loadData() {
    setLoading(true)
    if (tab === 'config') {
      const data = await getAllSiteConfig()
      setConfigs(data)
    } else {
      const endpoint = tab === 'clients' ? 'clients' : tab === 'why' ? 'why_choose_us' : 'how_it_works'
      const res = await fetch(`/api/admin/content/${endpoint}`)
      const data = await res.json()
      setItems(data)
    }
    setLoading(false)
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus item ini?')) return
    if (tab === 'clients') await deleteClientItem(id)
    else if (tab === 'why') await deleteWhyChooseUs(id)
    else if (tab === 'how') await deleteHowItWorks(id)
    setItems(items.filter(i => i.id !== id))
  }

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    if (tab === 'clients') {
      await createClientItem({ name: form.get('name') as string, order: items.length + 1 })
    } else if (tab === 'why') {
      await createWhyChooseUs({ title: form.get('title') as string, description: form.get('description') as string, icon: 'Star', order: items.length + 1 })
    } else if (tab === 'how') {
      await createHowItWorks({ step_number: items.length + 1, title: form.get('title') as string, description: form.get('description') as string, icon: 'Cog' })
    }

    e.currentTarget.reset()
    loadData()
  }

  async function handleSaveConfig(key: string, value: string) {
    await updateSiteConfig(key, value)
  }

  const tabs = [
    { id: 'clients', label: 'Klien' },
    { id: 'why', label: 'Kenapa Pilih Kami' },
    { id: 'how', label: 'Cara Kerja' },
    { id: 'config', label: 'Pengaturan' },
  ] as const

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Kelola Konten</h1>
      <p className="mt-1 text-sm text-text-muted">Kelola konten yang tampil di halaman beranda</p>

      {/* Tabs */}
      <div className="mt-6 flex gap-2 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${tab === t.id ? 'border-b-2 border-primary text-primary' : 'text-text-muted hover:text-text'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="flex justify-center py-8"><div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>
        ) : tab === 'config' ? (
          <ConfigEditor configs={configs} onSave={handleSaveConfig} />
        ) : (
          <>
            {/* Add form */}
            <form onSubmit={handleAdd} className="flex flex-wrap gap-3 rounded-lg border border-border p-4">
              {tab === 'clients' ? (
                <input name="name" required placeholder="Nama klien" className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
              ) : (
                <>
                  <input name="title" required placeholder="Judul" className="flex-1 rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
                  <input name="description" required placeholder="Deskripsi singkat" className="flex-[2] rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary" />
                </>
              )}
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light">
                <Plus className="h-4 w-4" /> Tambah
              </button>
            </form>

            {/* List */}
            <div className="mt-4 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="font-medium text-text">{item.name || item.title}</p>
                    {item.description && <p className="text-xs text-text-muted">{item.description}</p>}
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="rounded-lg p-2 text-text-muted hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {items.length === 0 && <p className="py-4 text-center text-sm text-text-muted">Belum ada data.</p>}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ConfigEditor({ configs, onSave }: { configs: any[]; onSave: (key: string, value: string) => void }) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [saved, setSaved] = useState('')

  useEffect(() => {
    const map: Record<string, string> = {}
    configs.forEach(c => { map[c.key] = c.value || '' })
    setValues(map)
  }, [configs])

  async function handleSave(key: string) {
    await onSave(key, values[key] || '')
    setSaved(key)
    setTimeout(() => setSaved(''), 2000)
  }

  const fields = [
    { key: 'footer_hours', label: 'Jam Operasional (footer)', type: 'textarea' },
    { key: 'social_instagram', label: 'Instagram URL', type: 'text' },
    { key: 'social_linkedin', label: 'LinkedIn URL', type: 'text' },
    { key: 'social_facebook', label: 'Facebook URL', type: 'text' },
    { key: 'hero_background_url', label: 'Hero Background Image URL', type: 'text' },
  ]

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.key} className="rounded-lg border border-border p-4">
          <label className="block text-sm font-medium text-text">{field.label}</label>
          {field.type === 'textarea' ? (
            <textarea
              value={values[field.key] || ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              rows={3}
              className="mt-2 w-full resize-none rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
            />
          ) : (
            <input
              value={values[field.key] || ''}
              onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
              className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-primary"
            />
          )}
          <button
            onClick={() => handleSave(field.key)}
            className="mt-2 inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-light"
          >
            <Save className="h-3 w-3" />
            {saved === field.key ? 'Tersimpan!' : 'Simpan'}
          </button>
        </div>
      ))}
    </div>
  )
}
