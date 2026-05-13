import type { Metadata } from 'next'
import { getLegality } from '@/actions/legality'
import { FileCheck, Download, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Legalitas',
  description: 'Informasi legalitas CV. Prabaswara Gandar Prima — perusahaan terdaftar resmi.',
}

export default async function LegalitasPage() {
  const documents = await getLegality()

  return (
    <div className="py-16">
      {/* Header */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-text md:text-4xl">Legalitas Perusahaan</h1>
        <p className="mt-3 text-text-muted">
          CV. Prabaswara Gandar Prima adalah perusahaan yang terdaftar secara resmi
        </p>
      </section>

      {/* Documents */}
      <section className="container mx-auto mt-12 px-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-start gap-4 rounded-xl border border-border bg-background p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileCheck className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text">{doc.title}</h3>
                {doc.number && (
                  <p className="mt-0.5 text-sm text-text-muted">No: {doc.number}</p>
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
                  className="shrink-0 rounded-lg border border-border p-2 text-text-muted hover:border-primary hover:text-primary"
                  aria-label={`Download ${doc.title}`}
                >
                  <Download className="h-4 w-4" />
                </a>
              )}
            </div>
          ))}

          {/* Empty state */}
          {documents.length === 0 && (
            <div className="py-16 text-center text-text-muted">
              <ShieldCheck className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-4">Dokumen legalitas sedang dalam proses pengunggahan.</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust note */}
      <section className="container mx-auto mt-12 px-4">
        <div className="mx-auto max-w-2xl rounded-xl bg-primary/5 p-6 text-center">
          <ShieldCheck className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-3 text-sm text-text-muted">
            Seluruh dokumen legalitas perusahaan tersedia dan dapat diverifikasi.
            Hubungi kami jika memerlukan informasi lebih lanjut.
          </p>
        </div>
      </section>
    </div>
  )
}
