import Link from 'next/link'
import { ArrowRight, Globe, Shield, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/public/reveal'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-primary pt-24 lg:pt-0">
      {/* Background solid with very subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80" />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-[92vh] flex-col items-center justify-center px-4 text-center lg:px-8">
        
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            Berdiri sejak 2026 • Tangerang
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Sinergi Kebutuhan Bisnis
            <br />
            <span className="text-secondary">dan Inovasi Digital.</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg md:text-xl">
            Penyedia barang & jasa kantor, konsumsi event, dan solusi teknologi digital 
            untuk instansi pemerintah, perusahaan swasta, dan UMKM.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/layanan"
              className="group flex items-center justify-center gap-2 rounded-lg bg-secondary px-8 py-4 font-bold text-primary transition-all hover:bg-secondary-light hover:-translate-y-1 shadow-lg"
            >
              Jelajahi Layanan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/kontak"
              className="flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 font-bold text-white transition-all hover:border-white hover:bg-white hover:text-primary"
            >
              Hubungi Kami
            </Link>
          </div>
        </Reveal>

        {/* Trust indicators */}
        <Reveal delay={400}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12 border-t border-white/10 pt-8">
            {[
              { icon: Shield, text: 'Terdaftar Resmi' },
              { icon: Globe, text: 'Solusi Digital' },
              { icon: CheckCircle2, text: 'Mitra Terpercaya' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                <item.icon className="h-5 w-5 text-secondary" />
                <span className="uppercase tracking-wider">{item.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Bottom fade into white background of next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
