import Link from 'next/link'
import { ArrowRight, Building2, Globe, UtensilsCrossed } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary to-primary-light" />

      {/* Decorative shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-secondary/10 blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 -z-10 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Content */}
      <div className="flex min-h-[85vh] flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/90 backdrop-blur-sm">
          <Building2 className="h-4 w-4" />
          <span>Berdiri sejak 2026</span>
        </div>

        {/* Heading */}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Sinergi Kebutuhan Bisnis dan{' '}
          <span className="text-secondary">Inovasi Digital</span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl text-lg text-white/70 md:text-xl">
          Penyedia barang & jasa kantor, konsumsi event, dan solusi teknologi digital
          untuk instansi pemerintah, perusahaan swasta, dan UMKM.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-white transition-all hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/25"
          >
            Lihat Layanan
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/kontak"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Hubungi Kami
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            <span>Terdaftar Resmi</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <span>Solusi Digital</span>
          </div>
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5" />
            <span>Layanan Fleksibel</span>
          </div>
        </div>
      </div>
    </section>
  )
}
