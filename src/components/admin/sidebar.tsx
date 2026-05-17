'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ADMIN_NAV_LINKS } from '@/lib/constants'
import {
  LayoutDashboard, Building2, Briefcase, FolderOpen,
  FileCheck, Image as ImageIcon, Mail, LogOut, Moon, Sun,
  ChevronLeft, ExternalLink, FileText
} from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Building2, Briefcase, FolderOpen, FileCheck, FileText, Image: ImageIcon, Mail,
}

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, toggle } = useTheme()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/kelola-panel')
  }

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-border bg-background-muted/50">
      {/* Header / Logo */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <Image
          src="/images/logo.jpeg"
          alt="Prabaswara"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-text">Prabaswara</p>
          <p className="text-[10px] font-medium uppercase tracking-widest text-text-muted">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-text-light">Menu</p>
        <div className="space-y-1">
          {ADMIN_NAV_LINKS.map((link) => {
            const Icon = iconMap[link.icon] ?? LayoutDashboard
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary shadow-sm'
                    : 'text-text-muted hover:bg-background-subtle hover:text-text'
                }`}
              >
                <Icon className="h-[18px] w-[18px]" />
                {link.label}
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer actions */}
      <div className="border-t border-border px-3 py-3 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-muted transition-all hover:bg-background-subtle hover:text-text"
        >
          <ExternalLink className="h-[18px] w-[18px]" />
          Lihat Website
        </Link>
        <button
          onClick={toggle}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-muted transition-all hover:bg-background-subtle hover:text-text"
        >
          {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-text-muted transition-all hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
