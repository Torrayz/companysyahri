'use client'

import { useEffect, useState } from 'react'
import { updateProfile } from '@/actions/profile'
import { Building2, Loader2, CheckCircle2, AlertCircle, Save } from 'lucide-react'

export default function AdminProfilPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/profile').then(r => r.json()).then((data) => {
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
      setMessage(`error:${result.error}`)
    } else {
      setMessage('success:Profil berhasil diperbarui!')
    }
  }

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-text-light focus:border-primary focus:ring-2 focus:ring-primary/10'

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="py-16 text-center text-text-muted">
        <Building2 className="mx-auto h-12 w-12 opacity-30" />
        <p className="mt-3">Profil belum tersedia. Jalankan seed data terlebih dahulu.</p>
      </div>
    )
  }

  const isError = message.startsWith('error:')
  const msgText = message.replace(/^(error:|success:)/, '')

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Kelola Profil Perusahaan</h1>
      <p className="mt-1 text-sm text-text-muted">Edit informasi yang tampil di halaman publik</p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-6">
        {/* Company info */}
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-light">Informasi Umum</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text">Nama Perusahaan</label>
              <input name="company_name" defaultValue={profile.company_name} required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text">Tagline</label>
              <input name="tagline" defaultValue={profile.tagline ?? ''} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text">Deskripsi</label>
              <textarea name="description" defaultValue={profile.description ?? ''} rows={4} className={`${inputClass} resize-none`} />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-light">Kontak</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-text">Alamat</label>
              <input name="address" defaultValue={profile.address ?? ''} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text">Telepon</label>
              <input name="phone" defaultValue={profile.phone ?? ''} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text">Email</label>
              <input name="email" type="email" defaultValue={profile.email ?? ''} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text">WhatsApp</label>
              <input name="whatsapp" defaultValue={profile.whatsapp ?? ''} placeholder="628xxxxxxxxxx" className={inputClass} />
            </div>
          </div>
        </div>

        {/* Visi Misi */}
        <div className="rounded-2xl border border-border bg-background p-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-light">Visi & Misi</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-text">Visi</label>
              <textarea name="vision" defaultValue={profile.vision ?? ''} rows={3} className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text">Misi (satu per baris)</label>
              <textarea name="mission" defaultValue={Array.isArray(profile.mission) ? profile.mission.join('\n') : ''} rows={4} className={`${inputClass} resize-none`} />
            </div>
          </div>
        </div>

        {/* Status message */}
        {message && (
          <div className={`flex items-center gap-3 rounded-xl border p-4 ${
            isError
              ? 'border-red-500/20 bg-red-500/10'
              : 'border-emerald-500/20 bg-emerald-500/10'
          }`}>
            {isError ? (
              <AlertCircle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
            ) : (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
            )}
            <p className={`text-sm ${isError ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
              {msgText}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-light hover:shadow-md hover:shadow-primary/10 disabled:opacity-50"
        >
          {saving ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Menyimpan...</>
          ) : (
            <><Save className="h-4 w-4" /> Simpan Perubahan</>
          )}
        </button>
      </form>
    </div>
  )
}
