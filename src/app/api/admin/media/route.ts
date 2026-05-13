import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
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

export async function DELETE(req: NextRequest) {
  const { path } = await req.json()
  const supabase = createAdminClient()
  const { error } = await supabase.storage.from('media').remove([path])
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
