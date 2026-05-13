import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-light px-6 py-16 text-center text-white md:px-12">
          {/* Decorative */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold md:text-4xl">
              Siap Bermitra dengan Kami?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Konsultasikan kebutuhan bisnis Anda. Kami siap memberikan solusi terbaik
              dengan pelayanan profesional dan tepat waktu.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/kontak"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-medium text-white transition-all hover:bg-secondary/90 hover:shadow-lg"
              >
                <MessageCircle className="h-5 w-5" />
                Hubungi Kami
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
