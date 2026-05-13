import Link from 'next/link'
import { ArrowRight, Building2, Globe, UtensilsCrossed } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-text-muted">
        <Building2 className="h-4 w-4 text-primary" />
        <span>Berdiri sejak 2026</span>
      </div>

      {/* Heading */}
      <h1 className="max-w-4xl text-4xl font-bold leading-tight text-text md:text-5xl lg:text-6xl">
        Sinergi Kebutuhan Bisnis dan{' '}
        <span className="text-primary">Inovasi Digital</span>
      </h1>

      {/* Subheading */}
      <p className="mt-6 max-w-2xl text-lg text-text-muted md:text-xl">
        Penyedia barang & jasa kantor, konsumsi event, dan solusi teknologi digital
        untuk instansi pemerintah, perusahaan swasta, dan UMKM.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/layanan"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-colors hover:bg-primary-light"
        >
          Lihat Layanan
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/kontak"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-text transition-colors hover:bg-background-muted"
        >
          Hubungi Kami
        </Link>
      </div>

      {/* Trust indicators */}
      <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-text-muted">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-accent" />
          <span>Terdaftar Resmi</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-accent" />
          <span>Solusi Digital</span>
        </div>
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-accent" />
          <span>Layanan Fleksibel</span>
        </div>
      </div>
    </section>
  )
}
