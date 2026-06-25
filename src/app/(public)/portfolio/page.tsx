import type { Metadata } from 'next'
import { getPortfolios } from '@/actions/portfolios'
import { PortfolioGrid } from '@/components/public/portfolio-grid'
import { Reveal } from '@/components/public/reveal'
import { FolderOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio proyek CV. Prabaswara Gandar Prima — pengadaan, konsumsi event, dan solusi digital.',
}

export default async function PortfolioPage() {
  const portfolios = await getPortfolios()

  return (
    <div>
      {/* Hero — z-0 keeps it below the filter grid */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80" />

        <div className="container relative z-10 mx-auto px-4 text-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              <FolderOpen className="h-3.5 w-3.5 text-secondary" />
              Karya Kami
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Portfolio
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Proyek dan kegiatan yang telah kami kerjakan dengan penuh dedikasi
            </p>
          </Reveal>
        </div>
      </section>

      {/* Portfolio grid — z-10 lifts it above the hero in stacking context */}
      <section className="relative z-10 container mx-auto px-4 pb-20 lg:px-8 pt-10">
        <PortfolioGrid portfolios={portfolios} />
      </section>
    </div>
  )
}
