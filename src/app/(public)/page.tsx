import { cacheLife } from 'next/cache'

export default async function HomePage() {
  'use cache'
  cacheLife('hours')

  return (
    <div>
      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold text-primary md:text-6xl">
          CV. Prabaswara Gandar Prima
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-text-muted">
          Sinergi Kebutuhan Bisnis dan Inovasi Digital
        </p>
      </section>
    </div>
  )
}
