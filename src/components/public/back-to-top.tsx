'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/80 text-text-muted shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-primary/10 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
      aria-label="Kembali ke atas"
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  )
}
