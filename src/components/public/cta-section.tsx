import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="rounded-2xl bg-primary px-6 py-16 text-center text-white md:px-12">
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
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-primary transition-colors hover:bg-white/90"
            >
              <MessageCircle className="h-5 w-5" />
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
