/**
 * Admin API — Fetch data konten berdasarkan nama tabel.
 *
 * Dilindungi oleh middleware auth (session check).
 * Tambahan: auth guard di level handler untuk defense-in-depth.
 * Hanya tabel yang di-whitelist yang bisa diakses.
 *
 * @route GET /api/admin/content/:table
 */

import { createAdminClient } from '@/lib/supabase/admin'
import { checkAuth } from '@/lib/supabase/auth'
import { NextRequest, NextResponse } from 'next/server'

/** Daftar tabel yang diizinkan untuk diakses via API ini. */
const ALLOWED_TABLES = ['clients', 'why_choose_us', 'how_it_works'] as const

export async function GET(_req: NextRequest, { params }: { params: Promise<{ table: string }> }) {
  // Auth guard (defense-in-depth, selain middleware)
  const { authenticated } = await checkAuth()
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { table } = await params

  if (!ALLOWED_TABLES.includes(table as typeof ALLOWED_TABLES[number])) {
    return NextResponse.json([], { status: 400 })
  }

  const supabase = createAdminClient()
  const orderCol = table === 'how_it_works' ? 'step_number' : 'order'
  const { data } = await supabase.from(table).select('*').order(orderCol)
  return NextResponse.json(data ?? [])
}
