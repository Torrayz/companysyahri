/**
 * Supabase Browser Client — Untuk digunakan di Client Components.
 *
 * Menggunakan anon key (public) sehingga semua operasi
 * tunduk pada Row Level Security policies yang sudah dikonfigurasi.
 *
 * @module lib/supabase/client
 */

import { createBrowserClient } from '@supabase/ssr'

/** Buat Supabase client untuk browser (Client Component). */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
