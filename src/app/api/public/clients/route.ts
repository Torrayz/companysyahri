/**
 * Public API — Fetch daftar klien aktif.
 *
 * Menggunakan server client (anon key + RLS), BUKAN admin client.
 * Data difilter oleh RLS policy `is_active = TRUE`.
 *
 * @route GET /api/public/clients
 */

import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('clients')
    .select('id, name')
    .eq('is_active', true)
    .order('order')
  return NextResponse.json(data ?? [])
}
