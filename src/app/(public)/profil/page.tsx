import type { Metadata } from 'next'
import { Building2, Target, Rocket, Handshake } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Profil Perusahaan',
  description: 'Profil, visi, dan misi CV. Prabaswara Gandar Prima — perusahaan penyedia barang dan jasa yang inovatif dan terpercaya.',
}

const missions = [
  {
    icon: Rocket,
    text: 'Menyediakan produk dan layanan berkualitas dalam bidang pengadaan kebutuhan kantor dan konsumsi event.',
  },
  {
    icon: Target,
    text: 'Memberikan solusi teknologi digital melalui pengembangan website dan aplikasi yang modern, efektif, dan sesuai kebutuhan klien.',
  },
  {
    icon: Handshake,
    text: 'Membangun hubungan kerja jangka panjang dengan mitra melalui pelayanan yang profesional, responsif, dan tepat waktu.',
  },
]

export default function ProfilPage() {
  return (
    <div className="py-16">
      {/* Header */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-text md:text-4xl">Profil Perusahaan</h1>
        <p className="mt-3 text-text-muted">Mengenal lebih dekat {SITE_CONFIG.name}</p>
      </section>

      {/* About */}
      <section className="container mx-auto mt-12 px-4">
        <div className="mx-auto max-w-3xl rounded-xl border border-border bg-background p-8">
          <div className="flex items-center gap-3">
            <Building2 className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Tentang Kami</h2>
          </div>
          <p className="mt-4 leading-relaxed text-text-muted">
            CV. Prabaswara Gandar Prima adalah perusahaan penyedia barang dan jasa yang berdiri
            pada tahun 2026, berlokasi di {SITE_CONFIG.address}. Kami melayani kebutuhan pengadaan
            kantor, konsumsi event, serta solusi teknologi digital untuk instansi pemerintah,
            perusahaan swasta, dan UMKM yang sedang berkembang.
          </p>
          <p className="mt-4 leading-relaxed text-text-muted">
            Dengan komitmen terhadap kualitas dan profesionalisme, kami hadir sebagai mitra
            terpercaya yang mampu memberikan nilai tambah bagi setiap klien kami.
          </p>
        </div>
      </section>

      {/* Visi */}
      <section className="container mx-auto mt-12 px-4">
        <div className="mx-auto max-w-3xl rounded-xl bg-primary/5 p-8">
          <h2 className="text-center text-2xl font-bold text-text">Visi</h2>
          <p className="mt-4 text-center text-lg leading-relaxed text-text-muted">
            Menjadi perusahaan penyedia barang dan jasa yang inovatif, terpercaya, dan mampu
            memberikan nilai tambah bagi mitra bisnis di Indonesia.
          </p>
        </div>
      </section>

      {/* Misi */}
      <section className="container mx-auto mt-12 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-text">Misi</h2>
          <div className="mt-8 space-y-6">
            {missions.map((mission, index) => (
              <div key={index} className="flex gap-4 rounded-lg border border-border p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <mission.icon className="h-5 w-5 text-primary" />
                </div>
                <p className="text-text-muted">{mission.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
