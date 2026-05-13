import { SITE_CONFIG } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-muted py-8">
      <div className="container mx-auto px-4 text-center text-sm text-text-muted">
        <p>&copy; 2026 {SITE_CONFIG.name}. All rights reserved.</p>
        <p className="mt-1">{SITE_CONFIG.address}</p>
      </div>
    </footer>
  )
}
