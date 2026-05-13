import type { Metadata } from 'next'
import { MapPin, Mail, Phone } from 'lucide-react'
import { ContactForm } from '@/components/public/contact-form'
import { GoogleMaps } from '@/components/public/google-maps'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi CV. Prabaswara Gandar Prima untuk konsultasi kebutuhan pengadaan, event, dan solusi digital.',
}

export default function KontakPage() {
  return (
    <div className="py-16">
      {/* Header */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-text md:text-4xl">Hubungi Kami</h1>
        <p className="mt-3 text-text-muted">
          Kami siap membantu kebutuhan bisnis Anda
        </p>
      </section>

      <section className="container mx-auto mt-12 px-4">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact form */}
          <div>
            <h2 className="text-xl font-semibold text-text">Kirim Pesan</h2>
            <p className="mt-2 text-sm text-text-muted">
              Isi form di bawah dan kami akan segera merespons.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          {/* Contact info + Maps */}
          <div className="space-y-8">
            {/* Info */}
            <div>
              <h2 className="text-xl font-semibold text-text">Informasi Kontak</h2>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-text">Alamat</p>
                    <p className="text-sm text-text-muted">{SITE_CONFIG.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-text">Email</p>
                    <p className="text-sm text-text-muted">info@prabaswara.id</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="font-medium text-text">WhatsApp</p>
                    <p className="text-sm text-text-muted">Klik tombol WhatsApp di kanan bawah</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Maps */}
            <div>
              <h2 className="text-xl font-semibold text-text">Lokasi</h2>
              <div className="mt-4">
                <GoogleMaps />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
