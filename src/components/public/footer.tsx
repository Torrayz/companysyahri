import Link from 'next/link'
import Image from 'next/image'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background-muted">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpeg"
                alt="Prabaswara"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <span className="text-lg font-bold text-primary">Prabaswara</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              {SITE_CONFIG.tagline}
            </p>
            <div className="mt-6 flex items-start gap-2 text-sm text-text-muted">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>{SITE_CONFIG.address}</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-text">
              Navigasi
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-primary"
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
            <h4 className="text-sm font-bold uppercase tracking-wider text-text">
              Layanan
            </h4>
            <ul className="mt-5 space-y-3">
              {['Pengadaan ATK', 'IT Hardware', 'Furniture Kantor', 'Konsumsi Event', 'Website & Aplikasi'].map(
                (service) => (
                  <li key={service}>
                    <Link
                      href="/layanan"
                      className="text-sm text-text-muted transition-colors hover:text-primary"
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
            <h4 className="text-sm font-bold uppercase tracking-wider text-text">
              Kontak
            </h4>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-light">Email</p>
                  <p className="mt-0.5 text-sm text-text-muted">info@prabaswara.id</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-text-light">WhatsApp</p>
                  <p className="mt-0.5 text-sm text-text-muted">Klik tombol di kanan bawah</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-text-light">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
