'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export async function uploadImage(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) return { error: 'No file provided' }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
  if (!allowedTypes.includes(file.type)) {
    return { error: 'Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau SVG.' }
  }

  if (file.size > 2 * 1024 * 1024) {
    return { error: 'Ukuran file maksimal 2MB.' }
  }

  const supabase = createAdminClient()
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage.from('media').upload(fileName, file)
  if (error) return { error: error.message }

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)
  return { success: true, url: publicUrl }
}
