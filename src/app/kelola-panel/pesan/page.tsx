import { getMessages } from '@/actions/messages'
import { Mail, MailOpen } from 'lucide-react'

export default async function AdminPesanPage() {
  const messages = await getMessages()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Pesan Masuk</h1>
      <p className="mt-1 text-sm text-text-muted">{messages.length} pesan</p>

      <div className="mt-6 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-lg border p-4 ${
              msg.is_read ? 'border-border bg-background' : 'border-primary/30 bg-primary/5'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                {msg.is_read ? (
                  <MailOpen className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                ) : (
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                )}
                <div>
                  <p className="font-medium text-text">{msg.name}</p>
                  <p className="text-xs text-text-muted">{msg.email}</p>
                  {msg.subject && <p className="mt-1 text-sm font-medium text-text">{msg.subject}</p>}
                  <p className="mt-1 text-sm text-text-muted">{msg.message}</p>
                </div>
              </div>
              <span className="shrink-0 text-xs text-text-muted">
                {new Date(msg.created_at).toLocaleDateString('id-ID')}
              </span>
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
