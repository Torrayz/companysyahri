import type { Metadata } from 'next'
import { MapPin, Mail, Phone, Clock, Send } from 'lucide-react'
import { ContactForm } from '@/components/public/contact-form'
import { SITE_CONFIG } from '@/lib/constants'
import { MapWrapper } from '@/components/public/map-wrapper'
import { Reveal } from '@/components/public/reveal'

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi CV. Prabaswara Gandar Prima untuk konsultasi kebutuhan pengadaan, event, dan solusi digital.',
}

const contactInfo = [
  {
    icon: MapPin,
    title: 'Alamat',
    value: SITE_CONFIG.address,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@prabaswara.id',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    icon: Phone,
    title: 'WhatsApp',
    value: 'Klik tombol hijau di kanan bawah',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    value: 'Senin - Jumat, 08:00 - 17:00 WIB',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
  },
]

export default function KontakPage() {
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
              <Send className="h-3.5 w-3.5 text-secondary" />
              Hubungi Kami
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">
              Mari Berkolaborasi
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
              Kami siap membantu kebutuhan bisnis Anda. Kirim pesan atau hubungi kami langsung.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact info cards */}
      <section className="relative z-10 -mt-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info, index) => (
              <Reveal key={info.title} delay={index * 80}>
                <div className="card-corporate p-5">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${info.bg}`}>
                    <info.icon className={`h-5 w-5 ${info.color}`} />
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-text-light">{info.title}</p>
                  <p className="mt-1 text-sm font-medium text-text">{info.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Maps */}
      <section className="container mx-auto mt-16 px-4 pb-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Contact form */}
          <Reveal>
            <div className="card-corporate p-8">
              <h2 className="text-2xl font-bold text-text">Kirim Pesan</h2>
              <div className="mt-1 h-1 w-12 rounded-full bg-gradient-to-r from-primary to-secondary" />
              <p className="mt-4 text-sm text-text-muted">
                Isi form di bawah dan kami akan segera merespons dalam 1x24 jam.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          {/* Maps */}
          <Reveal delay={200}>
            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl border border-border">
                <MapWrapper />
              </div>
              <div className="rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 p-6">
                <h3 className="font-bold text-text">Respons Cepat</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  Untuk respons lebih cepat, gunakan tombol WhatsApp di kanan bawah layar.
                  Kami biasanya merespons dalam hitungan menit pada jam kerja.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
