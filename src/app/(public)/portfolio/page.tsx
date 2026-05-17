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
      <section className="relative z-0 overflow-hidden bg-gradient-to-br from-[#070E1F] via-[#0F2B5B] to-[#0C1E3E] py-24">
        <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[500px] w-[500px] rounded-full bg-[#D4982A]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-[400px] w-[400px] rounded-full bg-[#0EA5E9]/10 blur-[100px]" />

        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4982A]">
              <FolderOpen className="h-3.5 w-3.5" />
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
