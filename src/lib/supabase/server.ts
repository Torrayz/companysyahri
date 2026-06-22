/**
 * Supabase Server Client — Untuk Server Components & Server Actions.
 *
 * Menggunakan anon key + cookies untuk session management.
 * Operasi tunduk pada Row Level Security policies.
 * Cookie writing di-catch dengan try/catch karena tidak bisa dilakukan
 * di Server Components (hanya bisa di Server Actions / Route Handlers).
 *
 * @module lib/supabase/server
 */

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // Called from Server Component — ignore.
            // Cookies can only be set in Server Actions or Route Handlers.
          }
        },
      },
    }
  )
}
