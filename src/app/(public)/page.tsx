import { Hero } from '@/components/public/hero'
import { ClientMarquee } from '@/components/public/client-marquee'
import { ServiceHighlight } from '@/components/public/service-highlight'
import { HowItWorks } from '@/components/public/how-it-works'
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
      <ClientMarquee />
      <ServiceHighlight services={services} />
      <HowItWorks />
      <WhyChooseUs />
      <CtaSection />
    </>
  )
}
