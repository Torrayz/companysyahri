import { createClient } from '@/lib/supabase/server'
import { Briefcase, FolderOpen, FileCheck, Mail } from 'lucide-react'

async function getStats() {
  const supabase = await createClient()
  const [services, portfolios, legality, messages] = await Promise.all([
    supabase.from('services').select('id', { count: 'exact', head: true }),
    supabase.from('portfolios').select('id', { count: 'exact', head: true }),
    supabase.from('legality').select('id', { count: 'exact', head: true }),
    supabase.from('messages').select('id', { count: 'exact', head: true }).eq('is_read', false),
  ])
  return {
    services: services.count ?? 0,
    portfolios: portfolios.count ?? 0,
    legality: legality.count ?? 0,
    unreadMessages: messages.count ?? 0,
  }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const cards = [
    { label: 'Layanan', value: stats.services, icon: Briefcase },
    { label: 'Portfolio', value: stats.portfolios, icon: FolderOpen },
    { label: 'Legalitas', value: stats.legality, icon: FileCheck },
    { label: 'Pesan Belum Dibaca', value: stats.unreadMessages, icon: Mail },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Dashboard</h1>
      <p className="mt-1 text-sm text-text-muted">Ringkasan data website</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{card.label}</span>
              <card.icon className="h-5 w-5 text-text-muted" />
            </div>
            <p className="mt-2 text-3xl font-bold text-text">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
