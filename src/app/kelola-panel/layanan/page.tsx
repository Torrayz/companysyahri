import { createClient } from '@/lib/supabase/server'
import { Briefcase } from 'lucide-react'

export default async function AdminLayananPage() {
  const supabase = await createClient()
  const { data: services } = await supabase.from('services').select('*').order('order')

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Kelola Layanan</h1>
      <p className="mt-1 text-sm text-text-muted">{services?.length ?? 0} layanan</p>

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
            <span className={`rounded-full px-2 py-0.5 text-xs ${service.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {service.is_active ? 'Aktif' : 'Nonaktif'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
