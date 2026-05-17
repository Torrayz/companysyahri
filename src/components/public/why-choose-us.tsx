import { ShieldCheck, Clock, Users, ThumbsUp, Star, Zap, Heart, Award } from 'lucide-react'
import { Reveal } from '@/components/public/reveal'
import { getWhyChooseUs } from '@/actions/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldCheck, Clock, Users, ThumbsUp, Star, Zap, Heart, Award,
}

export async function WhyChooseUs() {
  const reasons = await getWhyChooseUs()

  if (reasons.length === 0) return null

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-text md:text-4xl">Kenapa Pilih Kami?</h2>
            <p className="mt-3 text-text-muted">Keunggulan yang kami tawarkan untuk mitra bisnis</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => {
            const Icon = iconMap[reason.icon] ?? Star
            return (
              <Reveal key={reason.id} delay={index * 100}>
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/10">
                    <Icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="mt-4 font-semibold text-text">{reason.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{reason.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
