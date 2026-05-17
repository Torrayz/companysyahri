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
    <section className="py-20 bg-background-muted">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-text md:text-4xl">Cara Kerja Kami</h2>
            <p className="mt-3 text-text-muted">Proses kerjasama yang mudah dan transparan</p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon] ?? Star
            return (
              <Reveal key={step.id} delay={index * 120}>
                <div className="relative text-center">
                  {index < steps.length - 1 && (
                    <div className="absolute right-0 top-10 hidden h-px w-full translate-x-1/2 bg-border lg:block" />
                  )}
                  <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-bold text-white">
                      {String(step.step_number).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-text">{step.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{step.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
