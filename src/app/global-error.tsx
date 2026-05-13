'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="id">
      <body className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Terjadi Kesalahan</h2>
          <button onClick={reset} className="mt-4 rounded bg-blue-600 px-4 py-2 text-white">
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  )
}
