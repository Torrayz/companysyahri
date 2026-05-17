import Link from 'next/link'
import { ArrowRight, Building2, Globe, UtensilsCrossed, Shield, Sparkles, CheckCircle2 } from 'lucide-react'
import { Reveal } from '@/components/public/reveal'

export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#070E1F] via-[#0F2B5B] to-[#0C1E3E]" />

      {/* Animated mesh gradient orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-[#D4982A]/15 blur-[120px] animate-float" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#0EA5E9]/10 blur-[100px]" style={{ animationDelay: '2s' }} />
        <div className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full bg-[#D4982A]/8 blur-[80px]" style={{ animationDelay: '4s' }} />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute left-[10%] top-[20%] -z-10 hidden lg:block">
        <div className="h-2 w-2 rounded-full bg-[#D4982A]/40 animate-float" />
      </div>
      <div className="absolute right-[15%] top-[30%] -z-10 hidden lg:block">
        <div className="h-3 w-3 rounded-full bg-[#0EA5E9]/30 animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute left-[20%] bottom-[25%] -z-10 hidden lg:block">
        <div className="h-1.5 w-1.5 rounded-full bg-white/20 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="flex min-h-[92vh] flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <Reveal>
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/80 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-[#D4982A]" />
            <span>Berdiri sejak 2026</span>
            <div className="h-1 w-1 rounded-full bg-white/30" />
            <span className="text-[#D4982A]">Tangerang, Banten</span>
          </div>
        </Reveal>

        {/* Heading */}
        <Reveal delay={100}>
          <h1 className="max-w-5xl text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Sinergi Kebutuhan Bisnis
            <br />
            <span className="gradient-text">dan Inovasi Digital</span>
          </h1>
        </Reveal>

        {/* Subheading */}
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-base text-white/60 sm:text-lg md:text-xl leading-relaxed">
            Penyedia barang & jasa kantor, konsumsi event, dan solusi teknologi digital
            untuk instansi pemerintah, perusahaan swasta, dan UMKM.
          </p>
        </Reveal>

        {/* CTA Buttons */}
        <Reveal delay={300}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/layanan"
              className="btn-shine group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#D4982A] to-[#F5B84C] px-7 py-3.5 font-semibold text-[#0F2B5B] shadow-lg shadow-[#D4982A]/20 transition-all hover:shadow-xl hover:shadow-[#D4982A]/30"
            >
              Lihat Layanan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            >
              Hubungi Kami
            </Link>
          </div>
        </Reveal>

        {/* Trust indicators */}
        <Reveal delay={400}>
          <div className="mt-20 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {[
              { icon: Shield, text: 'Terdaftar Resmi', color: 'text-emerald-400' },
              { icon: Globe, text: 'Solusi Digital', color: 'text-sky-400' },
              { icon: CheckCircle2, text: 'Mitra Terpercaya', color: 'text-[#D4982A]' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2.5 text-sm text-white/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <item.icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
