"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Linkedin, Youtube, Mail } from "lucide-react"

interface FooterContent {
  logo: string
  productLinks: Array<{ name: string; href: string }>
  aboutLinks: Array<{ name: string; href: string }>
  newsletter: { heading: string; placeholder: string }
  copyright: string
}

interface CompanySettings {
  name: string
  address: { street: string; city: string; state: string; zipCode: string; country: string }
  phone: string
  email: string
  socialMedia: { facebook?: string; twitter?: string; linkedin?: string; youtube?: string; instagram?: string }
}

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export function Footer() {
  const [content, setContent] = useState<FooterContent | null>(null)
  const [company, setCompany] = useState<CompanySettings | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch("/api/content/footer").then((res) => res.json()),
      fetch("/api/settings").then((res) => res.json()),
    ])
      .then(([footerData, settingsData]) => {
        console.log('Footer data:', footerData)
        console.log('Settings data:', settingsData)
        setContent(footerData)
        setCompany(settingsData.company)
      })
      .catch((error) => console.error("Failed to fetch footer data:", error))

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    console.log("Newsletter subscription:", email)
    e.currentTarget.reset()
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!content || !company) {
    return (
      <footer className="bg-[#0f1f3d] py-16">
        <div className="container mx-auto px-4">
          <div className="h-64 bg-gray-700 animate-pulse rounded" />
        </div>
      </footer>
    )
  }

  return (
    <>
      <footer className="bg-[#0f1f3d] py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Description */}
            <div>
              <Image
                src={content.logo || "/placeholder.svg"}
                alt="Company Logo"
                width={150}
                height={50}
                className="mb-4"
              />
            </div>

            {/* Product Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Products</h3>
              <ul className="space-y-2">
                {content.productLinks?.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">About</h3>
              <ul className="space-y-2">
                {content.aboutLinks?.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">{content.newsletter?.heading || 'Newsletter'}</h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  name="email"
                  placeholder={content.newsletter?.placeholder || 'Your email address'}
                  className="w-full rounded-md bg-[#1a3a5c] px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Social Media from Settings */}
          {(company.socialMedia?.facebook || company.socialMedia?.twitter || company.socialMedia?.linkedin || company.socialMedia?.youtube) && (
            <div className="mt-12 flex justify-center gap-6">
              {company.socialMedia.facebook && (
                <a
                  href={company.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {company.socialMedia.twitter && (
                <a
                  href={company.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <XIcon />
                </a>
              )}
              {company.socialMedia.linkedin && (
                <a
                  href={company.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
              {company.socialMedia.youtube && (
                <a
                  href={company.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Bottom Bar with Company Contact from Settings */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {company.email}
                </span>
                <span>|</span>
                <span>{company.phone}</span>
                <span>|</span>
                <span>{company.address.city}, {company.address.country}</span>
              </div>
              <div className="text-sm text-gray-400" dangerouslySetInnerHTML={{ __html: content.copyright || '© 2025 All rights reserved' }} />
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#4dd0e1] text-white shadow-lg transition-all hover:bg-[#26c6da]"
          aria-label="Scroll to top"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  )
}
