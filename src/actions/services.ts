'use server'

import { createClient } from '@/lib/supabase/server'
import { serviceSchema } from '@/lib/validations'
import { revalidatePath } from 'next/cache'

export async function getServices() {
  const supabase = await createClient()
  const { data } = await supabase.from('services').select('*').eq('is_active', true).order('order')
  return data ?? []
}

export async function createService(data: unknown) {
  const parsed = serviceSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = await createClient()
  const { error } = await supabase.from('services').insert(parsed.data)
  if (error) return { error: error.message }

  revalidatePath('/layanan')
  return { success: true }
}

export async function updateService(id: string, data: unknown) {
  const parsed = serviceSchema.safeParse(data)
  if (!parsed.success) return { error: parsed.error.errors[0].message }

  const supabase = await createClient()
  const { error } = await supabase.from('services').update(parsed.data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/layanan')
  return { success: true }
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('services').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/layanan')
  return { success: true }
}
