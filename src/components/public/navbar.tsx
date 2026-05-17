'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronRight } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/50 bg-background/80 shadow-sm backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="relative overflow-hidden rounded-xl">
            <Image
              src="/images/logo.jpeg"
              alt="Prabaswara"
              width={40}
              height={40}
              className="rounded-xl transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-primary">
              Prabaswara
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted sm:block">
              Gandar Prima
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-muted hover:bg-background-muted hover:text-text'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* CTA button — desktop only */}
          <Link
            href="/kontak"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-md hover:shadow-primary/10 lg:inline-flex"
          >
            Hubungi Kami
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-background-muted md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — slide down */}
      <div
        className={`overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-muted hover:bg-background-muted hover:text-text'
                    }`}
                  >
                    {link.label}
                    <ChevronRight className={`h-4 w-4 ${isActive ? 'text-primary' : 'text-text-light'}`} />
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Mobile CTA */}
          <div className="mt-4 border-t border-border pt-4">
            <Link
              href="/kontak"
              className="block rounded-xl bg-primary py-3 text-center text-sm font-semibold text-white transition-all hover:bg-primary-light"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
