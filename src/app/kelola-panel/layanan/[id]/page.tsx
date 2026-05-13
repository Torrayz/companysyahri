import { createClient } from '@/lib/supabase/server'
import { ServiceForm } from '@/components/admin/service-form'
import { notFound } from 'next/navigation'

export default async function EditLayananPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: service } = await supabase.from('services').select('*').eq('id', id).single()

  if (!service) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Edit Layanan</h1>
      <div className="mt-6">
        <ServiceForm service={service} />
      </div>
    </div>
  )
}
