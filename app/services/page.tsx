import type { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { WhatsAppButton } from "@/components/common/whatsapp-button"
import { ServicesHero } from "@/components/services/services-hero"
import { ServicesGrid } from "@/components/services/services-grid"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    path: "/services",
  })
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesGrid />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
