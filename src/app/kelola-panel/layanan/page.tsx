import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { Briefcase, Plus, Pencil } from 'lucide-react'
import { DeleteServiceButton } from '@/components/admin/delete-service-button'
import type { Service } from '@/types'

export default async function AdminLayananPage() {
  const supabase = createAdminClient()
  const { data: services } = await supabase.from('services').select('*').order('order')

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Kelola Layanan</h1>
          <p className="mt-1 text-sm text-text-muted">{services?.length ?? 0} layanan terdaftar</p>
        </div>
        <Link
          href="/kelola-panel/layanan/tambah"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-md hover:shadow-primary/10"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {services?.map((service: Service) => (
          <div
            key={service.id}
            className="flex items-center justify-between rounded-2xl border border-border bg-background p-5 transition-all hover:border-border-light hover:shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-text">{service.title}</p>
                <p className="mt-0.5 text-xs text-text-muted line-clamp-1">{service.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                service.is_active
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-red-500/10 text-red-600 dark:text-red-400'
              }`}>
                {service.is_active ? 'Aktif' : 'Nonaktif'}
              </span>
              <Link
                href={`/kelola-panel/layanan/${service.id}`}
                className="rounded-xl p-2.5 text-text-muted transition-all hover:bg-background-muted hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteServiceButton id={service.id} />
            </div>
          </div>
        ))}

        {(!services || services.length === 0) && (
          <div className="py-16 text-center text-text-muted">
            <Briefcase className="mx-auto h-12 w-12 opacity-30" />
            <p className="mt-3">Belum ada layanan. Klik &ldquo;Tambah&rdquo; untuk membuat.</p>
          </div>
        )}
      </div>
    </div>
  )
}
