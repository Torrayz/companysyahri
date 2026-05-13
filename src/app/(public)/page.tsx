import { Hero } from '@/components/public/hero'
import { ServiceHighlight } from '@/components/public/service-highlight'
import { CtaSection } from '@/components/public/cta-section'
import { OrganizationJsonLd, LocalBusinessJsonLd } from '@/components/public/structured-data'

export default function HomePage() {
  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <Hero />
      <ServiceHighlight />
      <CtaSection />
    </>
  )
}
