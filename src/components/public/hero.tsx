import Link from 'next/link'
import { ArrowRight, Shield, Globe, CheckCircle2, Calendar, MapPin, Users } from 'lucide-react'
import { Reveal } from '@/components/public/reveal'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-primary pt-24 lg:pt-0">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content — split layout */}
      <div className="container relative z-10 mx-auto flex min-h-[90vh] flex-col items-center gap-12 px-4 py-16 lg:flex-row lg:gap-16 lg:px-8 lg:py-0">
        {/* ── LEFT SIDE (60%) ── */}
        <div className="flex w-full flex-col justify-center lg:w-[60%]">
          {/* Badge */}
          <Reveal>
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
              <span className="h-2 w-2 rounded-full bg-secondary" />
              CV. Prabaswara Gandar Prima
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal delay={100}>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Mitra Terpercaya untuk Pengadaan &{' '}
              <span className="text-secondary">Solusi Digital</span>
            </h1>
          </Reveal>

          {/* Subheading */}
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
              Menyediakan kebutuhan ATK, perangkat IT, furnitur kantor, konsumsi
              event, hingga pengembangan website & aplikasi — untuk instansi
              pemerintah, perusahaan swasta, dan UMKM di seluruh Indonesia.
            </p>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={300}>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/layanan"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-8 py-4 font-bold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:bg-secondary-light"
              >
                Jelajahi Layanan
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-8 py-4 font-bold text-white transition-all hover:border-white hover:bg-white hover:text-primary"
              >
                Hubungi Kami
              </Link>
            </div>
          </Reveal>

          {/* Trust Indicators */}
          <Reveal delay={400}>
            <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8 sm:gap-10">
              {[
                { icon: Shield, text: 'Terdaftar Resmi' },
                { icon: Globe, text: 'Solusi Digital' },
                { icon: CheckCircle2, text: 'Mitra Terpercaya' },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2.5 text-sm font-semibold text-white/70"
                >
                  <item.icon className="h-5 w-5 text-secondary" />
                  <span className="uppercase tracking-wider">{item.text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── RIGHT SIDE (40%) ── */}
        <div className="flex w-full items-center justify-center lg:w-[40%]">
          <Reveal delay={300}>
            <div className="card-corporate w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
              {/* Card header */}
              <div className="mb-6">
                <h2 className="text-lg font-extrabold tracking-tight text-primary">
                  Profil Perusahaan
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Informasi singkat mengenai perusahaan kami
                </p>
              </div>

              {/* Stats */}
              <div className="divide-y divide-gray-100">
                {/* Stat 1 */}
                <div className="flex items-center gap-4 py-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07]">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight text-primary">
                      2026
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      Tahun Berdiri
                    </p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-4 py-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07]">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight text-primary">
                      Tangerang
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      Lokasi
                    </p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-4 py-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/[0.07]">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight text-primary">
                      B2B & B2G
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      Target Market
                    </p>
                  </div>
                </div>
              </div>

              {/* Card footer accent */}
              <div className="mt-4 rounded-lg bg-primary/[0.04] px-4 py-3">
                <p className="text-center text-xs font-semibold text-primary/70">
                  ATK • IT Hardware • Furnitur • Catering • Web & App Dev
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
