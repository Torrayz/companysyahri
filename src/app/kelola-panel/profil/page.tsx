'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { updateProfile } from '@/actions/profile'

export default function AdminProfilPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const supabase = createClient()
    supabase.from('profiles').select('*').single().then(({ data }) => {
      setProfile(data)
      setLoading(false)
    })
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    const form = new FormData(e.currentTarget)
    const data = {
      company_name: form.get('company_name') as string,
      tagline: form.get('tagline') as string,
      description: form.get('description') as string,
      address: form.get('address') as string,
      phone: form.get('phone') as string,
      email: form.get('email') as string,
      whatsapp: form.get('whatsapp') as string,
      vision: form.get('vision') as string,
      mission: (form.get('mission') as string).split('\n').filter(Boolean),
    }

    const result = await updateProfile(data)
    setSaving(false)

    if (result.error) {
      setMessage(`Error: ${result.error}`)
    } else {
      setMessage('Profil berhasil diperbarui!')
    }
  }

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>

  if (!profile) return <p className="py-8 text-center text-text-muted">Profil belum tersedia. Jalankan seed data terlebih dahulu.</p>

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Kelola Profil Perusahaan</h1>
      <p className="mt-1 text-sm text-text-muted">Edit informasi yang tampil di halaman publik</p>

      <form onSubmit={handleSubmit} className="mt-6 max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-text">Nama Perusahaan</label>
          <input name="company_name" defaultValue={profile.company_name} required className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text">Tagline</label>
          <input name="tagline" defaultValue={profile.tagline ?? ''} className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text">Deskripsi</label>
          <textarea name="description" defaultValue={profile.description ?? ''} rows={4} className="mt-1 w-full resize-none rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-text">Alamat</label>
            <input name="address" defaultValue={profile.address ?? ''} className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Telepon</label>
            <input name="phone" defaultValue={profile.phone ?? ''} className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text">Email</label>
            <input name="email" type="email" defaultValue={profile.email ?? ''} className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text">WhatsApp</label>
            <input name="whatsapp" defaultValue={profile.whatsapp ?? ''} placeholder="628xxxxxxxxxx" className="mt-1 w-full rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text">Visi</label>
          <textarea name="vision" defaultValue={profile.vision ?? ''} rows={3} className="mt-1 w-full resize-none rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-text">Misi (satu per baris)</label>
          <textarea name="mission" defaultValue={Array.isArray(profile.mission) ? profile.mission.join('\n') : ''} rows={4} className="mt-1 w-full resize-none rounded-lg border border-border px-4 py-2 text-sm outline-none focus:border-primary" />
        </div>

        {message && (
          <p className={`rounded-lg p-3 text-sm ${message.startsWith('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </p>
        )}

        <button type="submit" disabled={saving} className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-50">
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
    </div>
  )
}
