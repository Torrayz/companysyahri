import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-main',
})

export const metadata: Metadata = {
  title: {
    default: 'CV. Prabaswara Gandar Prima',
    template: '%s | CV. Prabaswara Gandar Prima',
  },
  description:
    'Penyedia barang dan jasa kantor, konsumsi event, pembuatan website & aplikasi, serta pengadaan ATK. Sinergi Kebutuhan Bisnis dan Inovasi Digital.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'CV. Prabaswara Gandar Prima',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" className={font.variable}>
      <body>{children}</body>
    </html>
  )
}
