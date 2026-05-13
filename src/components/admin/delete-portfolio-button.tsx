'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deletePortfolio } from '@/actions/portfolios'
import { Trash2 } from 'lucide-react'

export function DeletePortfolioButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Yakin ingin menghapus portfolio ini?')) return
    setLoading(true)
    await deletePortfolio(id)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="rounded-lg p-2 text-text-muted hover:bg-red-50 hover:text-red-600 disabled:opacity-50" aria-label="Hapus">
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
