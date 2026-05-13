'use client'

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="text-2xl font-bold">Terjadi Kesalahan</h2>
      <p className="mt-2 text-text-muted">Maaf, terjadi kesalahan saat memuat halaman.</p>
      <button
        onClick={reset}
        className="mt-4 rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary-light"
      >
        Coba Lagi
      </button>
    </div>
  )
}
