import { SITE_CONFIG } from '@/lib/constants'

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.tagline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ciledug',
      addressRegion: 'Banten',
      addressCountry: 'ID',
      streetAddress: SITE_CONFIG.address,
    },
    foundingDate: '2026',
    areaServed: 'ID',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_CONFIG.name,
    description: 'Penyedia barang dan jasa kantor, konsumsi event, pembuatan website & aplikasi, serta pengadaan ATK.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ciledug',
      addressRegion: 'Banten',
      postalCode: '15151',
      addressCountry: 'ID',
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 08:00-17:00',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
