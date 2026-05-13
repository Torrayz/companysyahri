'use client'

import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import Image from 'next/image'
import { uploadImage } from '@/actions/media'

export function ImageUpload({
  value,
  onChange,
}: {
  value?: string
  onChange: (url: string) => void
}) {
  const [preview, setPreview] = useState(value || '')
  const [uploading, setUploading] = useState(false)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    const result = await uploadImage(formData)
    if (result.url) {
      setPreview(result.url)
      onChange(result.url)
    }
    setUploading(false)
  }

  return (
    <div>
      {preview ? (
        <div className="relative h-40 w-full overflow-hidden rounded-lg border border-border">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(''); onChange('') }}
            className="absolute right-2 top-2 rounded-full bg-white p-1 shadow"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border hover:border-primary">
          <Upload className="h-8 w-8 text-text-muted" />
          <span className="mt-2 text-sm text-text-muted">
            {uploading ? 'Mengupload...' : 'Klik untuk upload gambar'}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      )}
    </div>
  )
}
