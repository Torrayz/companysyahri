import { PortfolioForm } from '@/components/admin/portfolio-form'

export default function TambahPortfolioPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Tambah Portfolio</h1>
      <div className="mt-6">
        <PortfolioForm />
      </div>
    </div>
  )
}
