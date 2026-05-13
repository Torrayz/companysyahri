'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteLegality } from '@/actions/legality'
import { Trash2 } from 'lucide-react'

export function DeleteLegalityButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Yakin ingin menghapus?')) return
    setLoading(true)
    await deleteLegality(id)
    router.refresh()
  }

  return (
    <button onClick={handleDelete} disabled={loading} className="rounded-lg p-2 text-text-muted hover:bg-red-50 hover:text-red-600 disabled:opacity-50" aria-label="Hapus">
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
