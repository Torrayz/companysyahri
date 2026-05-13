import Link from 'next/link'
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-bold text-primary">{SITE_CONFIG.name}</h3>
            <p className="mt-2 text-sm text-text-muted">{SITE_CONFIG.tagline}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-text">Navigasi</h4>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-text-muted hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-text">Kontak</h4>
            <ul className="mt-3 space-y-2 text-sm text-text-muted">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-text-muted">
          <p>&copy; 2026 {SITE_CONFIG.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
