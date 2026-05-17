'use client'

import { useEffect, useState } from 'react'
import { getMessages, markAsRead, deleteMessage } from '@/actions/messages'
import { Mail, MailOpen, Trash2, ArrowLeft, Loader2, Reply, AlertCircle } from 'lucide-react'
import type { Message } from '@/types'

export default function AdminPesanPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMessages().then((data) => { setMessages(data); setLoading(false) })
  }, [])

  async function handleSelect(msg: Message) {
    setSelected(msg)
    if (!msg.is_read) {
      await markAsRead(msg.id)
      setMessages((prev) => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m))
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus pesan ini?')) return
    await deleteMessage(id)
    setMessages((prev) => prev.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  /* Detail view */
  if (selected) {
    return (
      <div>
        <button
          onClick={() => setSelected(null)}
          className="mb-6 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-text-muted transition-all hover:bg-background-muted hover:text-text"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>

        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-text">{selected.subject || '(Tanpa subjek)'}</h2>
              <p className="mt-1.5 text-sm text-text-muted">
                Dari: <span className="font-semibold text-text">{selected.name}</span> ({selected.email})
              </p>
              <p className="mt-0.5 text-xs text-text-light">
                {new Date(selected.created_at).toLocaleString('id-ID', {
                  day: 'numeric', month: 'long', year: 'numeric',
                  hour: '2-digit', minute: '2-digit'
                })}
              </p>
            </div>
            <button
              onClick={() => handleDelete(selected.id)}
              className="rounded-xl p-2.5 text-text-muted transition-all hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <hr className="my-5 border-border" />

          <p className="whitespace-pre-line leading-relaxed text-text">{selected.message}</p>

          <div className="mt-6">
            <a
              href={`mailto:${selected.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-md hover:shadow-primary/10"
            >
              <Reply className="h-4 w-4" />
              Balas via Email
            </a>
          </div>
        </div>
      </div>
    )
  }

  /* List view */
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Pesan Masuk</h1>
      <p className="mt-1 text-sm text-text-muted">
        {messages.length} pesan • {messages.filter(m => !m.is_read).length} belum dibaca
      </p>

      <div className="mt-8 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => handleSelect(msg)}
            className={`cursor-pointer rounded-2xl border p-5 transition-all hover:shadow-sm ${
              msg.is_read
                ? 'border-border bg-background hover:border-border-light'
                : 'border-primary/20 bg-primary/5 hover:border-primary/30'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  msg.is_read ? 'bg-background-muted' : 'bg-primary/10'
                }`}>
                  {msg.is_read ? (
                    <MailOpen className="h-4 w-4 text-text-muted" />
                  ) : (
                    <Mail className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm ${msg.is_read ? 'text-text' : 'font-bold text-text'}`}>{msg.name}</p>
                  <p className="truncate text-xs text-text-muted">{msg.subject || msg.message.slice(0, 80)}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs text-text-light">
                  {new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(msg.id) }}
                  className="rounded-lg p-1.5 text-text-light transition-all hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="py-16 text-center text-text-muted">
            <Mail className="mx-auto h-12 w-12 opacity-30" />
            <p className="mt-3">Belum ada pesan masuk.</p>
          </div>
        )}
      </div>
    </div>
  )
}
