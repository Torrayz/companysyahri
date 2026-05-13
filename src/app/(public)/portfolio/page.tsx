import type { Metadata } from 'next'
import { getPortfolios } from '@/actions/portfolios'
import { PortfolioGrid } from '@/components/public/portfolio-grid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio proyek CV. Prabaswara Gandar Prima — pengadaan, konsumsi event, dan solusi digital.',
}

export default async function PortfolioPage() {
  const portfolios = await getPortfolios()

  return (
    <div className="py-16">
      <section className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-text md:text-4xl">Portfolio</h1>
        <p className="mt-3 text-text-muted">
          Proyek dan kegiatan yang telah kami kerjakan
        </p>
      </section>

      <section className="container mx-auto mt-12 px-4">
        <PortfolioGrid portfolios={portfolios} />
      </section>
    </div>
  )
}
