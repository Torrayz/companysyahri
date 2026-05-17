import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('clients').select('id, name').eq('is_active', true).order('order')
  return NextResponse.json(data ?? [])
}
