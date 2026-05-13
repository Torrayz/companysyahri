import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { Briefcase, Plus, Pencil } from 'lucide-react'
import { DeleteServiceButton } from '@/components/admin/delete-service-button'

export default async function AdminLayananPage() {
  const supabase = createAdminClient()
  const { data: services } = await supabase.from('services').select('*').order('order')

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Kelola Layanan</h1>
          <p className="mt-1 text-sm text-text-muted">{services?.length ?? 0} layanan</p>
        </div>
        <Link
          href="/kelola-panel/layanan/tambah"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          <Plus className="h-4 w-4" />
          Tambah
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {services?.map((service) => (
          <div key={service.id} className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-text">{service.title}</p>
                <p className="text-xs text-text-muted">{service.description?.slice(0, 60)}...</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className={`mr-2 rounded-full px-2 py-0.5 text-xs ${service.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {service.is_active ? 'Aktif' : 'Nonaktif'}
              </span>
              <Link
                href={`/kelola-panel/layanan/${service.id}`}
                className="rounded-lg p-2 text-text-muted hover:bg-background-muted hover:text-primary"
              >
                <Pencil className="h-4 w-4" />
              </Link>
              <DeleteServiceButton id={service.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
