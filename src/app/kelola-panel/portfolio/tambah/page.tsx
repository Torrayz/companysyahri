import { PortfolioForm } from '@/components/admin/portfolio-form'

export default function TambahPortfolioPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Tambah Portfolio</h1>
      <p className="mt-1 text-sm text-text-muted">Upload proyek baru ke portfolio</p>
      <div className="mt-6">
        <PortfolioForm />
      </div>
    </div>
  )
}
