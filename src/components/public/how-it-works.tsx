import { MessageSquare, FileText, Cog, PackageCheck, Star } from 'lucide-react'
import { Reveal } from '@/components/public/reveal'
import { getHowItWorks } from '@/actions/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageSquare, FileText, Cog, PackageCheck, Star,
}

export async function HowItWorks() {
  const steps = await getHowItWorks()

  if (steps.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-primary py-24 lg:py-32">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        {/* Section header */}
        <div className="text-center">
          <Reveal>
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
              Proses Kerja
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Cara Kerja Kami
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 lg:text-lg">
              Proses kerjasama yang mudah dan transparan untuk memenuhi kebutuhan bisnis Anda
            </p>
          </Reveal>
        </div>

        {/* Steps grid */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] ?? Star
            return (
              <Reveal key={step.id} delay={index * 120}>
                <div className="relative flex flex-col items-center text-center lg:px-6">
                  {/* Connecting dashed line between steps (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-7 hidden h-px w-full border-t-2 border-dashed border-white/20 lg:block" />
                  )}

                  {/* Step number circle */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-lg font-bold text-primary shadow-lg">
                    {String(step.step_number).padStart(2, '0')}
                  </div>

                  {/* Icon box */}
                  <div className="mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="h-7 w-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
