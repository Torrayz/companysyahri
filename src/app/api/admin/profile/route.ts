/**
 * Admin API — Fetch profil perusahaan untuk halaman admin.
 *
 * Dilindungi oleh middleware auth + auth guard defense-in-depth.
 *
 * @route GET /api/admin/profile
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { checkAuth } from '@/lib/supabase/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const { authenticated } = await checkAuth()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data } = await supabase.from('profiles').select('*').single()
  return NextResponse.json(data)
}
