'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ADMIN_NAV_LINKS } from '@/lib/constants'
import {
  LayoutDashboard, Building2, Briefcase, FolderOpen,
  FileCheck, Image, Mail, LogOut, Moon, Sun
} from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Building2, Briefcase, FolderOpen, FileCheck, Image, Mail,
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
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-border bg-background-muted">
      <div className="p-4">
        <h2 className="text-sm font-bold text-primary">Admin Panel</h2>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {ADMIN_NAV_LINKS.map((link) => {
          const Icon = iconMap[link.icon] ?? LayoutDashboard
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-text-muted hover:bg-background hover:text-text'
              }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-1">
        <button
          onClick={toggle}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-background hover:text-text"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-text-muted hover:bg-background hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </div>
    </aside>
  )
}
