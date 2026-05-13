import { LegalityForm } from '@/components/admin/legality-form'

export default function TambahLegalitasPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Tambah Legalitas</h1>
      <div className="mt-6">
        <LegalityForm />
      </div>
    </div>
  )
}
