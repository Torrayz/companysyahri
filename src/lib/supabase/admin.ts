/**
 * Supabase Admin Client — Menggunakan Service Role Key.
 *
 * ⚠️ Client ini BYPASS semua Row Level Security policies.
 * Hanya gunakan di server-side (server actions / API routes)
 * yang sudah dilindungi oleh `requireAuth()`.
 *
 * JANGAN PERNAH expose ke client-side / browser.
 *
 * @module lib/supabase/admin
 */

import { createClient } from '@supabase/supabase-js'

/** Buat Supabase client dengan service_role key (bypass RLS). */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
