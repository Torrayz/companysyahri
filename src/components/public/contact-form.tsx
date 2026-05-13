'use client'

import { useRef, useState } from 'react'
import { submitContactForm } from '@/actions/contact'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setStatus('loading')
    const result = await submitContactForm(formData)

    if (result.error) {
      setStatus('error')
      setMessage(result.error)
      // TIDAK reset form saat error — field tetap terisi
    } else {
      setStatus('success')
      setMessage('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.')
      formRef.current?.reset() // Hanya reset saat sukses
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text">
          Nama <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Nama lengkap"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="email@contoh.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text">
          Subjek
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Perihal pesan"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text">
          Pesan <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          placeholder="Tulis pesan Anda..."
        />
      </div>

      {/* Status message */}
      {status === 'success' && (
        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</p>
      )}
      {status === 'error' && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-lg bg-primary px-6 py-2.5 font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-50"
      >
        {status === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
      </button>
    </form>
  )
}
