import { createAdminClient } from '@/lib/supabase/admin'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'

export default async function PortfolioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: item } = await supabase.from('portfolios').select('*').eq('id', id).eq('is_active', true).single()

  if (!item) notFound()

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-3xl px-4">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Portfolio
        </Link>

        {item.image_url && (
          <div className="relative mt-6 aspect-video overflow-hidden rounded-xl">
            <Image src={item.image_url} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        )}

        <div className="mt-6">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary capitalize">
            {item.category}
          </span>

          <h1 className="mt-3 text-3xl font-bold text-text">{item.title}</h1>

          <div className="mt-3 flex items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            {item.client_name && <span>Klien: {item.client_name}</span>}
          </div>

          {item.description && (
            <div className="mt-6 whitespace-pre-line leading-relaxed text-text-muted">
              {item.description}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
