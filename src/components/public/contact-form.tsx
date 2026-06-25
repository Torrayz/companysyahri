'use client'

import { useRef, useState } from 'react'
import { submitContactForm } from '@/actions/contact'
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

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
    } else {
      setStatus('success')
      setMessage('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.')
      formRef.current?.reset()
    }
  }

  const inputClasses =
    'mt-1.5 w-full rounded-xl border border-border bg-background-muted/50 px-4 py-3 text-sm text-text outline-none transition-all placeholder:text-text-light focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/10'

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-text">
            Nama <span className="text-error">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className={inputClasses}
            placeholder="Nama lengkap"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text">
            Email <span className="text-error">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
            placeholder="email@contoh.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-text">
          Subjek
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className={inputClasses}
          placeholder="Perihal pesan"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-text">
          Pesan <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputClasses} resize-none`}
          placeholder="Tulis pesan Anda..."
        />
      </div>

      {/* Status messages */}
      {status === 'success' && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <p className="text-sm text-emerald-700 dark:text-emerald-300">{message}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-500/20 dark:bg-red-500/10">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
          <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 disabled:hover:shadow-none"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Kirim Pesan
          </>
        )}
      </button>
    </form>
  )
}
