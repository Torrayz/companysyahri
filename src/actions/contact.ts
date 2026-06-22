'use server'

/**
 * Server Action — Submit form kontak publik.
 *
 * Flow:
 * 1. Extract IP dari request headers untuk rate limiting
 * 2. Rate limit check (3 pesan per jam per IP)
 * 3. Validasi data dengan Zod `contactFormSchema`
 * 4. Insert ke tabel `messages` via anon client (RLS policy: public insert)
 *
 * @module actions/contact
 */

import { contactFormSchema } from '@/lib/validations'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'
import { headers } from 'next/headers'

/**
 * Submit pesan dari form kontak publik.
 *
 * @param formData - FormData dari form kontak (name, email, subject, message)
 * @returns `{ success: true }` atau `{ error: string }`
 */
export async function submitContactForm(formData: FormData) {
  // Extract real IP dari request headers (Vercel/proxy mengirim via x-forwarded-for)
  const headerList = await headers()
  const ip = headerList.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? headerList.get('x-real-ip')
    ?? 'unknown'

  // Rate limit: max 3 pesan per jam per IP
  const { allowed } = checkRateLimit(`contact:${ip}`, 3, 60 * 60 * 1000)
  if (!allowed) {
    return { error: 'Terlalu banyak pesan. Coba lagi nanti.' }
  }

  // Validate input
  const raw = {
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  }

  const result = contactFormSchema.safeParse(raw)
  if (!result.success) {
    return { error: result.error.errors[0].message }
  }

  // Insert ke database (menggunakan anon client — RLS policy: public insert)
  const supabase = await createClient()
  const { error } = await supabase.from('messages').insert(result.data)

  if (error) {
    return { error: 'Gagal mengirim pesan. Silakan coba lagi.' }
  }

  return { success: true }
}
