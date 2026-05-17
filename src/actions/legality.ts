'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { legalitySchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function getLegality() {
  const supabase = await createClient()
  const { data } = await supabase.from('legality').select('*').order('order')
  return data ?? []
}

export async function createLegality(data: unknown) {
  const parsed = legalitySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('legality').insert(parsed.data)
  if (error) return { error: error.message }

  revalidatePath('/legalitas')
  revalidatePath('/kelola-panel/legalitas')
  return { success: true }
}

export async function updateLegality(id: string, data: unknown) {
  const parsed = legalitySchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = createAdminClient()
  const { error } = await supabase.from('legality').update(parsed.data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/legalitas')
  revalidatePath('/kelola-panel/legalitas')
  return { success: true }
}

export async function deleteLegality(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('legality').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/legalitas')
  revalidatePath('/kelola-panel/legalitas')
  return { success: true }
}
