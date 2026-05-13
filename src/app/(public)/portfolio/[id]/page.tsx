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

  // Fetch related portfolios (same category, exclude current)
  const { data: related } = await supabase
    .from('portfolios')
    .select('*')
    .eq('category', item.category)
    .eq('is_active', true)
    .neq('id', id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary">
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Portfolio
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_280px]">
          {/* Main content */}
          <div>
            {item.image_url && (
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image src={item.image_url} alt={item.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 700px" />
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

          {/* Sidebar - related portfolios */}
          <aside className="hidden lg:block">
            <h3 className="text-sm font-semibold text-text">Lainnya di kategori <span className="capitalize">{item.category}</span></h3>
            <div className="mt-4 space-y-3">
              {related?.map((rel) => (
                <Link key={rel.id} href={`/portfolio/${rel.id}`} className="group flex gap-3 rounded-lg border border-border p-2 transition-colors hover:border-primary/30">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-background-muted">
                    {rel.image_url ? (
                      <Image src={rel.image_url} alt={rel.title} fill className="object-cover" sizes="56px" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-text-muted">—</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text group-hover:text-primary">{rel.title}</p>
                    <p className="text-xs text-text-muted">
                      {new Date(rel.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))}
              {(!related || related.length === 0) && (
                <p className="text-xs text-text-muted">Belum ada portfolio lain di kategori ini.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
