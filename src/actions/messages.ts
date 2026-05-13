'use server'

import { createClient } from '@/lib/supabase/server'

export async function getMessages() {
  const supabase = await createClient()
  const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
  return data ?? []
}

export async function markAsRead(id: string) {
  const supabase = await createClient()
  await supabase.from('messages').update({ is_read: true }).eq('id', id)
}

export async function deleteMessage(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('messages').delete().eq('id', id)
  if (error) return { error: error.message }
  return { success: true }
}
