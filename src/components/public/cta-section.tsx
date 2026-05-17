import Link from 'next/link'
import { MessageCircle, ArrowRight, Phone } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F2B5B] via-[#1A4A8A] to-[#0F2B5B] px-6 py-20 text-center md:px-16 lg:py-24">
          {/* Decorative orbs */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#D4982A]/20 blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#0EA5E9]/15 blur-[100px]" />
          <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-white/5 blur-[80px]" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4982A]">
              <Phone className="h-3.5 w-3.5" />
              Konsultasi Gratis
            </span>
            <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Siap Bermitra dengan Kami?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/60">
              Konsultasikan kebutuhan bisnis Anda. Kami siap memberikan solusi terbaik
              dengan pelayanan profesional dan tepat waktu.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/kontak"
                className="btn-shine group inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#D4982A] to-[#F5B84C] px-8 py-4 font-semibold text-[#0F2B5B] shadow-lg shadow-[#D4982A]/20 transition-all hover:shadow-xl hover:shadow-[#D4982A]/30"
              >
                <MessageCircle className="h-5 w-5" />
                Hubungi Kami
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
