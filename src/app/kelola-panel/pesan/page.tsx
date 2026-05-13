'use client'

import { useEffect, useState } from 'react'
import { getMessages, markAsRead, deleteMessage } from '@/actions/messages'
import { Mail, MailOpen, Trash2, ArrowLeft, X } from 'lucide-react'
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
      setMessages(messages.map(m => m.id === msg.id ? { ...m, is_read: true } : m))
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus pesan ini?')) return
    await deleteMessage(id)
    setMessages(messages.filter(m => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  if (loading) return <div className="flex justify-center py-12"><div className="h-6 w-6 animate-spin rounded-full border-4 border-primary border-t-transparent" /></div>

  // Detail view
  if (selected) {
    return (
      <div>
        <button onClick={() => setSelected(null)} className="mb-4 inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Kembali
        </button>
        <div className="rounded-xl border border-border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-text">{selected.subject || '(Tanpa subjek)'}</h2>
              <p className="mt-1 text-sm text-text-muted">Dari: <span className="font-medium text-text">{selected.name}</span> ({selected.email})</p>
              <p className="text-xs text-text-muted">{new Date(selected.created_at).toLocaleString('id-ID')}</p>
            </div>
            <button onClick={() => handleDelete(selected.id)} className="rounded-lg p-2 text-text-muted hover:bg-red-50 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          <hr className="my-4 border-border" />
          <p className="whitespace-pre-line leading-relaxed text-text">{selected.message}</p>
          <div className="mt-6">
            <a href={`mailto:${selected.email}`} className="inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light">
              Balas via Email
            </a>
          </div>
        </div>
      </div>
    )
  }

  // List view
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Pesan Masuk</h1>
      <p className="mt-1 text-sm text-text-muted">{messages.length} pesan</p>

      <div className="mt-6 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            onClick={() => handleSelect(msg)}
            className={`cursor-pointer rounded-lg border p-4 transition-colors hover:border-primary/30 ${
              msg.is_read ? 'border-border bg-background' : 'border-primary/20 bg-primary/5'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                {msg.is_read ? (
                  <MailOpen className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                ) : (
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                )}
                <div className="min-w-0">
                  <p className={`text-sm ${msg.is_read ? 'text-text' : 'font-semibold text-text'}`}>{msg.name}</p>
                  <p className="truncate text-xs text-text-muted">{msg.subject || msg.message.slice(0, 60)}</p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs text-text-muted">{new Date(msg.created_at).toLocaleDateString('id-ID')}</span>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(msg.id) }} className="rounded p-1 text-text-muted hover:text-red-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="py-12 text-center text-text-muted">
            <Mail className="mx-auto h-10 w-10 opacity-50" />
            <p className="mt-3">Belum ada pesan masuk.</p>
          </div>
        )}
      </div>
    </div>
  )
}
