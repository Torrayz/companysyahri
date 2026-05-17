'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { portfolioSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function getPortfolios() {
  const supabase = await createClient()
  const { data } = await supabase.from('portfolios').select('*').eq('is_active', true).order('created_at', { ascending: false })
  return data ?? []
}

export async function createPortfolio(data: unknown) {
  const parsed = portfolioSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('portfolios').insert(parsed.data)
  if (error) return { error: error.message }

  revalidatePath('/portfolio')
  revalidatePath('/kelola-panel/portfolio')
  return { success: true }
}

export async function updatePortfolio(id: string, data: unknown) {
  const parsed = portfolioSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('portfolios').update(parsed.data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/portfolio')
  revalidatePath('/kelola-panel/portfolio')
  return { success: true }
}

export async function deletePortfolio(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('portfolios').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/portfolio')
  revalidatePath('/kelola-panel/portfolio')
  return { success: true }
}
