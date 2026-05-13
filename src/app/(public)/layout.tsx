import { Navbar } from '@/components/public/navbar'
import { Footer } from '@/components/public/footer'
import { WhatsappButton } from '@/components/public/whatsapp-button'
import { BackToTop } from '@/components/public/back-to-top'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsappButton />
      <BackToTop />
    </>
  )
}
