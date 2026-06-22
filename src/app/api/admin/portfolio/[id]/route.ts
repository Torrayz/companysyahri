/**
 * Admin API — Fetch detail portfolio berdasarkan ID.
 *
 * Dilindungi oleh middleware auth + auth guard defense-in-depth.
 *
 * @route GET /api/admin/portfolio/:id
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { checkAuth } from '@/lib/supabase/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { authenticated } = await checkAuth()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const supabase = createAdminClient()
  const { data } = await supabase.from('portfolios').select('*').eq('id', id).single()
  return NextResponse.json(data)
}
