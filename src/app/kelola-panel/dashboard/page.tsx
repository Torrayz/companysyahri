import { createAdminClient } from '@/lib/supabase/admin'
import { Briefcase, FolderOpen, FileCheck, Mail } from 'lucide-react'

async function getStats() {
  const supabase = createAdminClient()
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
    { label: 'Layanan', value: stats.services, icon: Briefcase, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { label: 'Portfolio', value: stats.portfolios, icon: FolderOpen, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
    { label: 'Legalitas', value: stats.legality, icon: FileCheck, color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Pesan Belum Dibaca', value: stats.unreadMessages, icon: Mail, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
  ]

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="mt-1 text-sm text-text-muted">Selamat datang di panel admin Prabaswara</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="relative overflow-hidden rounded-xl border border-border bg-background p-5">
            <div className={`absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br ${card.color} opacity-20 blur-xl`} />
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">{card.label}</span>
              <div className={`rounded-lg ${card.bg} p-2`}>
                <card.icon className="h-4 w-4 text-text-muted" />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-text">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text">Aksi Cepat</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <a href="/kelola-panel/layanan/tambah" className="flex items-center gap-3 rounded-xl border border-border p-4 transition-all hover:border-blue-300 hover:shadow-sm">
            <div className="rounded-lg bg-blue-50 p-2"><Briefcase className="h-5 w-5 text-blue-600" /></div>
            <div>
              <p className="font-medium text-text">Tambah Layanan</p>
              <p className="text-xs text-text-muted">Buat layanan baru</p>
            </div>
          </a>
          <a href="/kelola-panel/portfolio/tambah" className="flex items-center gap-3 rounded-xl border border-border p-4 transition-all hover:border-purple-300 hover:shadow-sm">
            <div className="rounded-lg bg-purple-50 p-2"><FolderOpen className="h-5 w-5 text-purple-600" /></div>
            <div>
              <p className="font-medium text-text">Tambah Portfolio</p>
              <p className="text-xs text-text-muted">Upload proyek baru</p>
            </div>
          </a>
          <a href="/kelola-panel/pesan" className="flex items-center gap-3 rounded-xl border border-border p-4 transition-all hover:border-orange-300 hover:shadow-sm">
            <div className="rounded-lg bg-orange-50 p-2"><Mail className="h-5 w-5 text-orange-600" /></div>
            <div>
              <p className="font-medium text-text">Lihat Pesan</p>
              <p className="text-xs text-text-muted">{stats.unreadMessages} belum dibaca</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
