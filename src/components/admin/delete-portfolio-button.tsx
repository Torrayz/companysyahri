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
    <button onClick={handleDelete} disabled={loading} className="rounded-xl p-2.5 text-text-muted transition-all hover:bg-red-500/10 hover:text-red-600 disabled:opacity-50 dark:hover:text-red-400" aria-label="Hapus">
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
