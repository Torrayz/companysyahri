'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Lock, Loader2, AlertCircle, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email atau password salah.')
      setLoading(false)
      return
    }

    router.push('/kelola-panel/dashboard')
  }

  const inputClass =
    'mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition-all focus:border-[#D4982A]/50 focus:bg-white/10 focus:ring-2 focus:ring-[#D4982A]/20'

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#070E1F] via-[#0F2B5B] to-[#0C1E3E] px-4">
      {/* Decorative orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#D4982A]/8 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#0EA5E9]/8 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D4982A] to-[#F5B84C]">
              <Shield className="h-7 w-7 text-[#0F2B5B]" />
            </div>
            <h1 className="mt-5 text-2xl font-bold text-white">Admin Panel</h1>
            <p className="mt-1.5 text-sm text-white/50">Masuk untuk mengelola website</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-white/70">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                placeholder="admin@prabaswara.id"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-white/70">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-shine flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D4982A] to-[#F5B84C] py-3.5 font-semibold text-[#0F2B5B] transition-all hover:shadow-lg hover:shadow-[#D4982A]/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Masuk
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-white/30">
          CV. Prabaswara Gandar Prima &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  )
}
