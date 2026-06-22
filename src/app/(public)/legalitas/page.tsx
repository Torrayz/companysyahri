import type { Metadata } from 'next'
import { getLegality } from '@/actions/legality'
import { FileCheck, Download, ShieldCheck, Award } from 'lucide-react'
import { Reveal } from '@/components/public/reveal'
import type { Legality } from '@/types'

export const metadata: Metadata = {
  title: 'Legalitas',
  description: 'Informasi legalitas CV. Prabaswara Gandar Prima — perusahaan terdaftar resmi.',
}

export default async function LegalitasPage() {
  const documents = await getLegality()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary py-24">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/80" />

        <div className="container relative z-10 mx-auto px-4 text-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              <Award className="h-3.5 w-3.5" />
              Terdaftar Resmi
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Legalitas Perusahaan
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              CV. Prabaswara Gandar Prima adalah perusahaan yang terdaftar secara resmi
            </p>
          </Reveal>
        </div>
      </section>

      {/* Documents */}
      <section className="relative z-10 container mx-auto px-4 pt-8 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-4">
          {documents.map((doc: Legality, index: number) => (
            <Reveal key={doc.id} delay={index * 80}>
              <div className="card-corporate flex items-start gap-5 p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 transition-transform duration-300 group-hover:scale-110">
                  <FileCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-text">{doc.title}</h3>
                  {doc.number && (
                    <p className="mt-1 text-sm font-medium text-primary">No: {doc.number}</p>
                  )}
                  {doc.description && (
                    <p className="mt-1 text-sm text-text-muted">{doc.description}</p>
                  )}
                </div>
                {doc.file_url && (
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-xl border border-border p-2.5 text-text-muted transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                    aria-label={`Download ${doc.title}`}
                  >
                    <Download className="h-5 w-5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}

          {/* Empty state */}
          {documents.length === 0 && (
            <div className="py-20 text-center text-text-muted">
              <ShieldCheck className="mx-auto h-16 w-16 opacity-30" />
              <p className="mt-4 text-lg">Dokumen legalitas sedang dalam proses pengunggahan.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust note */}
      <section className="container mx-auto mt-16 px-4 pb-20 lg:px-8">
        <Reveal>
          <div className="card-corporate mx-auto max-w-2xl p-8 text-center">
            <div className="relative">
              <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
              <h3 className="mt-4 text-lg font-bold text-text">Perusahaan Terverifikasi</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Seluruh dokumen legalitas perusahaan tersedia dan dapat diverifikasi.
                Hubungi kami jika memerlukan informasi lebih lanjut.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
