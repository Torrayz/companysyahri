import { ServiceForm } from '@/components/admin/service-form'

export default function TambahLayananPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Tambah Layanan</h1>
      <p className="mt-1 text-sm text-text-muted">Buat layanan baru untuk ditampilkan di website</p>
      <div className="mt-6">
        <ServiceForm />
      </div>
    </div>
  )
}
