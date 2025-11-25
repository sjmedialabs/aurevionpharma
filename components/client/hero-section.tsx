"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { HomePageContent } from "@/types"

export function HeroSection() {
  const [content, setContent] = useState<HomePageContent["hero"] | null>(null)

  useEffect(() => {
    fetch("/api/content/home")
      .then((res) => res.json())
      .then((data) => setContent(data.hero))
      .catch((error) => console.error("Failed to fetch hero content:", error))
  }, [])

  if (!content) {
    return (
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="h-64" />
        </div>
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImage || "/placeholder.svg"}
          alt="Pharmaceutical Research Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="container relative mx-auto px-4 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-[36px] font-bold leading-tight text-balance text-white">{content.title}</h1>
              <p className="text-base font-light text-white leading-relaxed text-pretty">{content.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href={content.primaryButtonLink}>
                  {content.primaryButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Link href={content.secondaryButtonLink}>{content.secondaryButtonText}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
