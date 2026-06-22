'use server'

/**
 * Server Actions — Kelola konten beranda (Why Choose Us, How It Works, Clients, Site Config).
 *
 * Read operations menggunakan anon client (dengan RLS policy `is_active = TRUE`).
 * Write operations menggunakan admin client + auth guard `requireAuth()`.
 *
 * @module actions/content
 */

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { requireAuth } from '@/lib/supabase/auth'
import { revalidatePath } from 'next/cache'

// ============ WHY CHOOSE US ============

/** Fetch semua item "Kenapa Pilih Kami" yang aktif (public, RLS-filtered). */
export async function getWhyChooseUs() {
  const supabase = await createClient()
  const { data } = await supabase.from('why_choose_us').select('*').eq('is_active', true).order('order')
  return data ?? []
}

/** Tambah item "Kenapa Pilih Kami" — hanya admin. */
export async function createWhyChooseUs(data: { title: string; description: string; icon: string; order: number }) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('why_choose_us').insert(data)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

/** Update item "Kenapa Pilih Kami" — hanya admin. */
export async function updateWhyChooseUs(id: string, data: { title: string; description: string; icon: string; order: number }) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('why_choose_us').update(data).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

/** Hapus item "Kenapa Pilih Kami" — hanya admin. */
export async function deleteWhyChooseUs(id: string) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('why_choose_us').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

// ============ HOW IT WORKS ============

/** Fetch semua langkah "Cara Kerja Kami" yang aktif (public, RLS-filtered). */
export async function getHowItWorks() {
  const supabase = await createClient()
  const { data } = await supabase.from('how_it_works').select('*').eq('is_active', true).order('step_number')
  return data ?? []
}

/** Tambah langkah "Cara Kerja Kami" — hanya admin. */
export async function createHowItWorks(data: { step_number: number; title: string; description: string; icon: string }) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('how_it_works').insert(data)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

/** Hapus langkah "Cara Kerja Kami" — hanya admin. */
export async function deleteHowItWorks(id: string) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('how_it_works').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

// ============ CLIENTS ============

/** Fetch semua klien aktif (public, RLS-filtered). */
export async function getClients() {
  const supabase = await createClient()
  const { data } = await supabase.from('clients').select('*').eq('is_active', true).order('order')
  return data ?? []
}

/** Tambah klien baru — hanya admin. */
export async function createClientItem(data: { name: string; order: number }) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('clients').insert(data)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

/** Hapus klien — hanya admin. */
export async function deleteClientItem(id: string) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

// ============ SITE CONFIG ============

/** Fetch satu config value berdasarkan key (public). */
export async function getSiteConfig(key: string) {
  const supabase = await createClient()
  const { data } = await supabase.from('site_config').select('value').eq('key', key).single()
  return data?.value ?? ''
}

/** Fetch semua config (admin only). */
export async function getAllSiteConfig() {
  await requireAuth()
  const supabase = createAdminClient()
  const { data } = await supabase.from('site_config').select('*')
  return data ?? []
}

/** Update/upsert config value — hanya admin. */
export async function updateSiteConfig(key: string, value: string) {
  await requireAuth()
  const supabase = createAdminClient()
  const { error } = await supabase.from('site_config').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}
