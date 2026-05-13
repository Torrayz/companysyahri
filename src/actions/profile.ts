'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProfile() {
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select('*').single()
  return data
}

export async function updateProfile(data: Record<string, unknown>) {
  const supabase = await createClient()
  const { data: profile } = await supabase.from('profiles').select('id').single()
  if (!profile) return { error: 'Profile not found' }

  const { error } = await supabase.from('profiles').update(data).eq('id', profile.id)
  if (error) return { error: error.message }

  revalidatePath('/profil')
  return { success: true }
}
