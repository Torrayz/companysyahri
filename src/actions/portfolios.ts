'use server'

/**
 * Server Actions — Kelola portfolio.
 *
 * Read: anon client + RLS `is_active = TRUE`.
 * Write: admin client + `requireAuth()` guard.
 *
 * @module actions/portfolios
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { requireAuth } from '@/lib/supabase/auth'
import { portfolioSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

/** Fetch semua portfolio aktif, diurutkan terbaru (public). */
export async function getPortfolios() {
  const supabase = await createClient()
  const { data } = await supabase.from('portfolios').select('*').eq('is_active', true).order('created_at', { ascending: false })
  return data ?? []
}

/**
 * Buat portfolio baru — hanya admin.
 * Data divalidasi dengan Zod `portfolioSchema` sebelum insert.
 */
export async function createPortfolio(data: unknown) {
  await requireAuth()
  const parsed = portfolioSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('portfolios').insert(parsed.data)
  if (error) return { error: error.message }

  revalidatePath('/portfolio')
  revalidatePath('/kelola-panel/portfolio')
  return { success: true }
}

/**
 * Update portfolio — hanya admin.
 * Data divalidasi dengan Zod `portfolioSchema` sebelum update.
 */
export async function updatePortfolio(id: string, data: unknown) {
  await requireAuth()
  const parsed = portfolioSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('portfolios').update(parsed.data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/portfolio')
  revalidatePath('/kelola-panel/portfolio')
  return { success: true }
}

/** Hapus portfolio — hanya admin. */
export async function deletePortfolio(id: string) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('portfolios').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/portfolio')
  revalidatePath('/kelola-panel/portfolio')
  return { success: true }
}
