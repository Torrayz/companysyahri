'use server'

/**
 * Server Actions — Kelola pesan masuk (Messages).
 *
 * Semua operasi di sini bersifat admin-only:
 * - getMessages: membaca semua pesan (termasuk yang belum dibaca)
 * - markAsRead: menandai pesan sebagai sudah dibaca
 * - deleteMessage: menghapus pesan
 *
 * @module actions/messages
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth } from '@/lib/supabase/auth'
import { revalidatePath } from 'next/cache'

/** Fetch semua pesan, diurutkan terbaru — hanya admin. */
export async function getMessages() {
  await requireAuth()
  const supabase = createAdminClient()
  const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false })
  return data ?? []
}

/** Tandai pesan sebagai sudah dibaca — hanya admin. */
export async function markAsRead(id: string) {
  await requireAuth()
  const supabase = createAdminClient()
  await supabase.from('messages').update({ is_read: true }).eq('id', id)
  revalidatePath('/kelola-panel/pesan')
}

/** Hapus pesan — hanya admin. */
export async function deleteMessage(id: string) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('messages').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/kelola-panel/pesan')
  return { success: true }
}
