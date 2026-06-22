'use server'

/**
 * Server Actions — Kelola layanan (Services).
 *
 * Read: anon client + RLS `is_active = TRUE`.
 * Write: admin client + `requireAuth()` guard.
 *
 * @module actions/services
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { serviceSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

/** Fetch semua layanan aktif, diurutkan berdasarkan order (public). */
export async function getServices() {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').eq('is_active', true).order('order')
  return data ?? []
}

/**
 * Buat layanan baru — hanya admin.
 * Data divalidasi dengan Zod `serviceSchema` sebelum insert.
 */
export async function createService(data: unknown) {
  await requireAuth()
  const parsed = serviceSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('services').insert(parsed.data)
  if (error) {
    console.error('createService error:', error)
    return { error: error.message }
  }

  revalidatePath('/layanan')
  revalidatePath('/kelola-panel/layanan')
  return { success: true }
}

/**
 * Update layanan — hanya admin.
 * Data divalidasi dengan Zod `serviceSchema` sebelum update.
 */
export async function updateService(id: string, data: unknown) {
  await requireAuth()
  const parsed = serviceSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('services').update(parsed.data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/layanan')
  revalidatePath('/kelola-panel/layanan')
  return { success: true }
}

/** Hapus layanan — hanya admin. */
export async function deleteService(id: string) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/layanan')
  revalidatePath('/kelola-panel/layanan')
  return { success: true }
}
