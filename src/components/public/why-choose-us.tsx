import { ShieldCheck, Clock, Users, ThumbsUp, Star, Zap, Heart, Award } from 'lucide-react'
import { Reveal } from '@/components/public/reveal'
import { getWhyChooseUs } from '@/actions/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Clock, Users, ThumbsUp, Star, Zap, Heart, Award,
}

const iconColors = [
  'bg-primary/10 text-primary',
  'bg-secondary/10 text-secondary',
  'bg-emerald-100 text-emerald-600',
  'bg-amber-100 text-amber-600',
]

export async function WhyChooseUs() {
  const reasons = await getWhyChooseUs()

  if (reasons.length === 0) return null

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-5">
          {/* Left Side — Text Content (40%) */}
          <div className="lg:col-span-2">
            <Reveal>
              <span className="text-sm font-semibold uppercase tracking-widest text-primary">
                Keunggulan Kami
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight text-text md:text-4xl">
                Kenapa Memilih Kami?
              </h2>
              <p className="mt-5 leading-relaxed text-text-muted">
                Kami berkomitmen memberikan layanan pengadaan terbaik dengan
                harga kompetitif, kualitas terjamin, dan pengiriman tepat waktu.
                Kepuasan mitra bisnis adalah prioritas utama kami.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="mt-8 inline-flex items-center gap-3 rounded-xl border-l-4 border-secondary bg-secondary/5 px-6 py-4">
                <span className="text-3xl font-extrabold text-secondary">100+</span>
                <span className="text-sm font-medium leading-tight text-text">
                  Proyek<br />Selesai
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right Side — 2×2 Grid (60%) */}
          <div className="lg:col-span-3">
            <div className="grid gap-5 sm:grid-cols-2">
              {reasons.slice(0, 4).map((reason, index) => {
                const Icon = iconMap[reason.icon] ?? Star
                const colorClass = iconColors[index % iconColors.length]
                return (
                  <Reveal key={reason.id} delay={index * 100}>
                    <div className="card-corporate p-6">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${colorClass}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 text-lg font-bold text-text">
                        {reason.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {reason.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
