import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary">
      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpeg"
                alt="Prabaswara"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-white">Prabaswara</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {SITE_CONFIG.tagline}
            </p>
            <div className="mt-6 flex items-start gap-2 text-sm text-white/60">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
              <span>{SITE_CONFIG.address}</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigasi
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Layanan
            </h4>
            <ul className="mt-5 space-y-3">
              {['Pengadaan ATK', 'IT Hardware', 'Furniture Kantor', 'Konsumsi Event', 'Website & Aplikasi'].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/layanan"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {service}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Kontak
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/50">Email</p>
                  <p className="mt-0.5 text-sm text-white/70">info@prabaswara.id</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/80" />
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/50">WhatsApp</p>
                  <p className="mt-0.5 text-sm text-white/70">Klik tombol di kanan bawah</p>
                </div>
              </li>
            </ul>
            {/* Operating hours */}
            <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-3">
              <p className="text-xs font-semibold text-white">Jam Operasional</p>
              <p className="mt-1 text-xs text-white/60">Senin - Jumat: 08.00 - 17.00 WIB</p>
              <p className="text-xs text-white/60">Sabtu: 08.00 - 12.00 WIB</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
