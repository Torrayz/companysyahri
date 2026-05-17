import type { Metadata } from 'next'
import { Building2, Target, Rocket, Handshake, MapPin, Calendar, Users } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { Reveal } from '@/components/public/reveal'

export const metadata: Metadata = {
  title: 'Profil Perusahaan',
  description: 'Profil, visi, dan misi CV. Prabaswara Gandar Prima — perusahaan penyedia barang dan jasa yang inovatif dan terpercaya.',
}

const missions = [
  {
    icon: Rocket,
    title: 'Kualitas Terjamin',
    text: 'Menyediakan produk dan layanan berkualitas dalam bidang pengadaan kebutuhan kantor dan konsumsi event.',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Target,
    title: 'Solusi Digital',
    text: 'Memberikan solusi teknologi digital melalui pengembangan website dan aplikasi yang modern, efektif, dan sesuai kebutuhan klien.',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Handshake,
    title: 'Mitra Jangka Panjang',
    text: 'Membangun hubungan kerja jangka panjang dengan mitra melalui pelayanan yang profesional, responsif, dan tepat waktu.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
]

const stats = [
  { icon: Calendar, value: '2026', label: 'Tahun Berdiri' },
  { icon: MapPin, value: 'Tangerang', label: 'Lokasi Kantor' },
  { icon: Users, value: 'B2B & B2G', label: 'Target Market' },
]

export default function ProfilPage() {
  return (
    <div>
      {/* Hero banner */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#070E1F] via-[#0F2B5B] to-[#0C1E3E]" />
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#D4982A]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#0EA5E9]/10 blur-[100px]" />

        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#D4982A]">
              <Building2 className="h-3.5 w-3.5" />
              Tentang Kami
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Profil Perusahaan
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 text-lg text-white/60">
              Mengenal lebih dekat {SITE_CONFIG.name}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats row */}
      <section className="relative z-10 -mt-10">
        <div className="container mx-auto px-4 lg:px-8">
          <Reveal>
            <div className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-background p-1 shadow-lg">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center px-4 py-5">
                  <stat.icon className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-lg font-bold text-text sm:text-xl">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-text-muted sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="container mx-auto mt-16 px-4 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold text-text">Tentang Kami</h2>
            <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
            <p className="mt-6 text-lg leading-relaxed text-text-muted">
              CV. Prabaswara Gandar Prima adalah perusahaan penyedia barang dan jasa yang berdiri
              pada tahun 2026, berlokasi di {SITE_CONFIG.address}. Kami melayani kebutuhan pengadaan
              kantor, konsumsi event, serta solusi teknologi digital untuk instansi pemerintah,
              perusahaan swasta, dan UMKM yang sedang berkembang.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-text-muted">
              Dengan komitmen terhadap kualitas dan profesionalisme, kami hadir sebagai mitra
              terpercaya yang mampu memberikan nilai tambah bagi setiap klien kami.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Visi */}
      <section className="container mx-auto mt-20 px-4 lg:px-8">
        <Reveal>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 p-10">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-[60px]" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Visi
              </span>
              <p className="mt-5 text-xl font-medium leading-relaxed text-text md:text-2xl">
                &ldquo;Menjadi perusahaan penyedia barang dan jasa yang inovatif, terpercaya, dan mampu
                memberikan nilai tambah bagi mitra bisnis di Indonesia.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Misi */}
      <section className="container mx-auto mt-16 px-4 pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-bold text-text">Misi Kami</h2>
            <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
          </Reveal>

          <div className="mt-8 space-y-5">
            {missions.map((mission, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className="card-glow group flex gap-5 rounded-2xl border border-border bg-background p-6">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${mission.bg} transition-transform duration-300 group-hover:scale-110`}>
                    <mission.icon className={`h-6 w-6 ${mission.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text">{mission.title}</h3>
                    <p className="mt-1 leading-relaxed text-text-muted">{mission.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
