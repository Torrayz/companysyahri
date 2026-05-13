'use server'

import { contactFormSchema } from '@/lib/validations'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/rate-limit'

export async function submitContactForm(formData: FormData) {
  // Rate limit check
  const ip = 'unknown' // Will be extracted from headers in production
  const { allowed } = checkRateLimit(`contact:${ip}`, 3, 60 * 60 * 1000)
  if (!allowed) {
    return { error: 'Terlalu banyak pesan. Coba lagi nanti.' }
  }

  // Validate
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

  // Insert to database
  const supabase = await createClient()
  const { error } = await supabase.from('messages').insert(result.data)

  if (error) {
    return { error: 'Gagal mengirim pesan. Silakan coba lagi.' }
  }

  return { success: true }
}
