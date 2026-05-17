import { Hero } from '@/components/public/hero'
import { ServiceHighlight } from '@/components/public/service-highlight'
import { WhyChooseUs } from '@/components/public/why-choose-us'
import { CtaSection } from '@/components/public/cta-section'
import { OrganizationJsonLd, LocalBusinessJsonLd } from '@/components/public/structured-data'
import { getServices } from '@/actions/services'

export default async function HomePage() {
  const services = await getServices()

  return (
    <>
      <OrganizationJsonLd />
      <LocalBusinessJsonLd />
      <Hero />
      <ServiceHighlight services={services} />
      <WhyChooseUs />
      <CtaSection />
    </>
  )
}
