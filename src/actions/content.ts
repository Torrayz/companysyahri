'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { revalidatePath } from 'next/cache'

// ============ WHY CHOOSE US ============
export async function getWhyChooseUs() {
  const supabase = await createClient()
  const { data } = await supabase.from('why_choose_us').select('*').eq('is_active', true).order('order')
  return data ?? []
}

export async function createWhyChooseUs(data: { title: string; description: string; icon: string; order: number }) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('why_choose_us').insert(data)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

export async function updateWhyChooseUs(id: string, data: { title: string; description: string; icon: string; order: number }) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('why_choose_us').update(data).eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

export async function deleteWhyChooseUs(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('why_choose_us').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

// ============ HOW IT WORKS ============
export async function getHowItWorks() {
  const supabase = await createClient()
  const { data } = await supabase.from('how_it_works').select('*').eq('is_active', true).order('step_number')
  return data ?? []
}

export async function createHowItWorks(data: { step_number: number; title: string; description: string; icon: string }) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('how_it_works').insert(data)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

export async function deleteHowItWorks(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('how_it_works').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

// ============ CLIENTS ============
export async function getClients() {
  const supabase = await createClient()
  const { data } = await supabase.from('clients').select('*').eq('is_active', true).order('order')
  return data ?? []
}

export async function createClientItem(data: { name: string; order: number }) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('clients').insert(data)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

export async function deleteClientItem(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('clients').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}

// ============ SITE CONFIG ============
export async function getSiteConfig(key: string) {
  const supabase = await createClient()
  const { data } = await supabase.from('site_config').select('value').eq('key', key).single()
  return data?.value ?? ''
}

export async function getAllSiteConfig() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('site_config').select('*')
  return data ?? []
}

export async function updateSiteConfig(key: string, value: string) {
  const supabase = createAdminClient()
  const { error } = await supabase.from('site_config').upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: 'key' })
  if (error) return { error: error.message }
  revalidatePath('/')
  return { success: true }
}
