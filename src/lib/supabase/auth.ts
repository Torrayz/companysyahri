/**
 * Server-side auth helper — Utility untuk memverifikasi autentikasi
 * di server actions dan API route handlers.
 *
 * Menggunakan getUser() (bukan getSession()) karena getUser()
 * memverifikasi JWT secara server-side dan tidak bisa di-spoof.
 *
 * @module lib/supabase/auth
 */

import { createClient } from '@/lib/supabase/server'

/**
 * Memastikan user sudah terotentikasi.
 * Throws error jika user belum login — gunakan di server actions.
 *
 * @throws {Error} 'Unauthorized' jika user belum login
 * @returns {Promise<{ id: string; email?: string }>} User data
 *
 * @example
 * ```ts
 * export async function createService(data: unknown) {
 *   await requireAuth()
 *   // ... lanjut operasi admin
 * }
 * ```
 */
export async function requireAuth() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

/**
 * Mengecek apakah user sudah terotentikasi tanpa throw error.
 * Cocok untuk API route handlers yang perlu return custom response.
 *
 * @returns {Promise<{ authenticated: boolean; user: User | null }>}
 *
 * @example
 * ```ts
 * const { authenticated, user } = await checkAuth()
 * if (!authenticated) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
 * ```
 */
export async function checkAuth() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return { authenticated: !!user, user }
}
