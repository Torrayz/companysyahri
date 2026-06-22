/**
 * Admin API — Kelola media di Supabase Storage.
 *
 * GET: List semua file di bucket `media` (termasuk subfolder `docs`).
 * DELETE: Hapus file, dengan pengecekan apakah file sedang digunakan.
 *
 * Dilindungi oleh middleware auth + auth guard defense-in-depth.
 *
 * @route GET /api/admin/media
 * @route DELETE /api/admin/media
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { checkAuth } from '@/lib/supabase/auth'
import { NextRequest, NextResponse } from 'next/server'

/** List semua file media dari Supabase Storage. */
export async function GET() {
  const { authenticated } = await checkAuth()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data: files } = await supabase.storage.from('media').list('', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })
  const { data: docFiles } = await supabase.storage.from('media').list('docs', { limit: 100, sortBy: { column: 'created_at', order: 'desc' } })

  const allFiles = [
    ...(files?.filter(f => f.name !== '.emptyFolderPlaceholder' && f.name !== 'docs').map(f => ({
      name: f.name,
      path: f.name,
      url: supabase.storage.from('media').getPublicUrl(f.name).data.publicUrl,
    })) ?? []),
    ...(docFiles?.filter(f => f.name !== '.emptyFolderPlaceholder').map(f => ({
      name: f.name,
      path: `docs/${f.name}`,
      url: supabase.storage.from('media').getPublicUrl(`docs/${f.name}`).data.publicUrl,
    })) ?? []),
  ]

  return NextResponse.json(allFiles)
}

/**
 * Hapus file media dari Supabase Storage.
 * Mengecek apakah file sedang digunakan di portfolios atau legality
 * sebelum menghapus (mencegah broken references).
 */
export async function DELETE(req: NextRequest) {
  const { authenticated } = await checkAuth()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { path } = await req.json()
  const supabase = createAdminClient()

  // Check if file is in use by portfolios or legality documents
  const url = supabase.storage.from('media').getPublicUrl(path).data.publicUrl
  const [portfolios, legality] = await Promise.all([
    supabase.from('portfolios').select('title').eq('image_url', url),
    supabase.from('legality').select('title').eq('file_url', url),
  ])

  const usedBy: string[] = []
  portfolios.data?.forEach(p => usedBy.push(`Portfolio: ${p.title}`))
  legality.data?.forEach(l => usedBy.push(`Legalitas: ${l.title}`))

  if (usedBy.length > 0) {
    return NextResponse.json(
      { error: `File sedang digunakan oleh: ${usedBy.join(', ')}`, usedBy },
      { status: 409 }
    )
  }

  const { error } = await supabase.storage.from('media').remove([path])
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
