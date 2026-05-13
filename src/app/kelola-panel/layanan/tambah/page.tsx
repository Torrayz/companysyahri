import { ServiceForm } from '@/components/admin/service-form'

export default function TambahLayananPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Tambah Layanan</h1>
      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  )
}
