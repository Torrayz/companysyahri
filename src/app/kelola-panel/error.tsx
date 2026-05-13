'use client'

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h2 className="text-xl font-bold">Error</h2>
      <p className="mt-2 text-sm text-text-muted">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded bg-primary px-4 py-2 text-white">
        Retry
      </button>
    </div>
  )
}
