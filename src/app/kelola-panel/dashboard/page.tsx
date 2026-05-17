import { createAdminClient } from '@/lib/supabase/admin'
import { Briefcase, FolderOpen, FileCheck, Mail, ArrowUpRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

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
    {
      label: 'Layanan',
      value: stats.services,
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10',
      href: '/kelola-panel/layanan',
    },
    {
      label: 'Portfolio',
      value: stats.portfolios,
      icon: FolderOpen,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-500/10',
      href: '/kelola-panel/portfolio',
    },
    {
      label: 'Legalitas',
      value: stats.legality,
      icon: FileCheck,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-500/10',
      href: '/kelola-panel/legalitas',
    },
    {
      label: 'Pesan Baru',
      value: stats.unreadMessages,
      icon: Mail,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10',
      href: '/kelola-panel/pesan',
    },
  ]

  const quickActions = [
    {
      label: 'Tambah Layanan',
      desc: 'Buat layanan baru',
      href: '/kelola-panel/layanan/tambah',
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-500/10',
      hoverBorder: 'hover:border-blue-500/30',
    },
    {
      label: 'Tambah Portfolio',
      desc: 'Upload proyek baru',
      href: '/kelola-panel/portfolio/tambah',
      icon: FolderOpen,
      color: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-500/10',
      hoverBorder: 'hover:border-violet-500/30',
    },
    {
      label: 'Lihat Pesan',
      desc: `${stats.unreadMessages} belum dibaca`,
      href: '/kelola-panel/pesan',
      icon: Mail,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-500/10',
      hoverBorder: 'hover:border-amber-500/30',
    },
  ]

  return (
    <div>
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          <p className="mt-1 text-sm text-text-muted">Selamat datang di panel admin Prabaswara</p>
        </div>
        <div className="hidden items-center gap-2 rounded-xl border border-border bg-background-muted px-4 py-2 text-sm text-text-muted sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Website Aktif
        </div>
      </div>

      {/* Stat cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-background p-5 transition-all hover:border-primary/20 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text-muted">{card.label}</span>
              <div className={`rounded-xl ${card.bg} p-2.5`}>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </div>
            </div>
            <p className="mt-3 text-3xl font-bold text-text">{card.value}</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-text-light opacity-0 transition-opacity group-hover:opacity-100">
              <span>Lihat detail</span>
              <ArrowUpRight className="h-3 w-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-text">Aksi Cepat</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className={`group flex items-center gap-4 rounded-2xl border border-border bg-background p-5 transition-all ${action.hoverBorder} hover:shadow-md`}
            >
              <div className={`rounded-xl ${action.bg} p-3 transition-transform group-hover:scale-110`}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
              </div>
              <div>
                <p className="font-semibold text-text">{action.label}</p>
                <p className="text-xs text-text-muted">{action.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
