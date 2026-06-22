'use server'

/**
 * Server Actions — Kelola legalitas perusahaan.
 *
 * Read: anon client + RLS public read.
 * Write: admin client + `requireAuth()` guard.
 *
 * @module actions/legality
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { legalitySchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

/** Fetch semua dokumen legalitas, diurutkan berdasarkan order (public). */
export async function getLegality() {
  const supabase = await createClient()
  const { data } = await supabase.from('legality').select('*').order('order')
  return data ?? []
}

/**
 * Tambah dokumen legalitas baru — hanya admin.
 * Data divalidasi dengan Zod `legalitySchema` sebelum insert.
 */
export async function createLegality(data: unknown) {
  await requireAuth()
  const parsed = legalitySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('legality').insert(parsed.data)
  if (error) return { error: error.message }

  revalidatePath('/legalitas')
  revalidatePath('/kelola-panel/legalitas')
  return { success: true }
}

/**
 * Update dokumen legalitas — hanya admin.
 * Data divalidasi dengan Zod `legalitySchema` sebelum update.
 */
export async function updateLegality(id: string, data: unknown) {
  await requireAuth()
  const parsed = legalitySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('legality').update(parsed.data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/legalitas')
  revalidatePath('/kelola-panel/legalitas')
  return { success: true }
}

/** Hapus dokumen legalitas — hanya admin. */
export async function deleteLegality(id: string) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('legality').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/legalitas')
  revalidatePath('/kelola-panel/legalitas')
  return { success: true }
}
