'use server'

/**
 * Server Actions — Kelola profil perusahaan.
 *
 * Read: anon client (halaman publik profil).
 * Write: admin client + `requireAuth()` + Zod validation.
 *
 * @module actions/profile
 */

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth } from '@/lib/supabase/auth'
import { profileSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

/** Fetch profil perusahaan (single row, public). */
export async function getProfile() {
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select('*').single()
  return data
}

/**
 * Update profil perusahaan — hanya admin.
 * Data divalidasi dengan Zod `profileSchema` sebelum update.
 *
 * @param data - Data profil yang akan diupdate
 * @returns `{ success: true }` atau `{ error: string }`
 */
export async function updateProfile(data: unknown) {
  await requireAuth()

  const parsed = profileSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const supabase = createAdminClient()
  const { data: profile } = await supabase.from('profiles').select('id').single()
  if (!profile) return { error: 'Profile not found' }

  const { error } = await supabase.from('profiles').update(parsed.data).eq('id', profile.id)
  if (error) return { error: error.message }

  revalidatePath('/profil')
  revalidatePath('/kelola-panel/profil')
  return { success: true }
}
