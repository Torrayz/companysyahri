import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ table: string }> }) {
  const { table } = await params
  const allowed = ['clients', 'why_choose_us', 'how_it_works']
  if (!allowed.includes(table)) return NextResponse.json([], { status: 400 })

  const supabase = createAdminClient()
  const orderCol = table === 'how_it_works' ? 'step_number' : 'order'
  const { data } = await supabase.from(table).select('*').order(orderCol)
  return NextResponse.json(data ?? [])
}
