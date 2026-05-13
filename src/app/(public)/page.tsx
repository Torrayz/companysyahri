import { Hero } from '@/components/public/hero'
import { ServiceHighlight } from '@/components/public/service-highlight'
import { CtaSection } from '@/components/public/cta-section'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceHighlight />
      <CtaSection />
    </>
  )
}
