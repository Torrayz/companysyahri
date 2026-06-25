import Link from 'next/link'
import { MessageCircle, ArrowRight, Phone } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center md:px-16 lg:py-24">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              <Phone className="h-3.5 w-3.5 text-secondary" />
              Konsultasi Gratis
            </span>
            <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Siap Bermitra dengan Kami?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/80">
              Konsultasikan kebutuhan bisnis Anda. Kami siap memberikan solusi terbaik
              dengan pelayanan profesional dan tepat waktu.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/kontak"
                className="group inline-flex items-center gap-2.5 rounded-lg bg-secondary px-8 py-4 font-bold text-primary shadow-lg transition-all hover:bg-secondary-light hover:-translate-y-1"
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
