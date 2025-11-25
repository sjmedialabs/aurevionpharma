"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { HomePageContent } from "@/types"

export function AboutPreview() {
  const [content, setContent] = useState<HomePageContent["aboutPreview"] | null>(null)

  useEffect(() => {
    fetch("/api/content/home")
      .then((res) => res.json())
      .then((data: HomePageContent) => setContent(data.aboutPreview))
      .catch((error) => console.error("Failed to fetch about preview:", error))
  }, [])

  const features = [
    {
      icon: "/images/icon-quality.png",
      title: "Reliability",
      description: "Our unwavering commitment to reliability ensures that every product we develop meets the highest standards of consistency and dependability."
    },
    {
      icon: "/images/icon-network.png",
      title: "Sustainability",
      description: "We prioritize sustainable practices in our operations, focusing on environmentally responsible manufacturing and long-term viability."
    },
    {
      icon: "/images/icon-medicines.png",
      title: "Quality & Cost-Effectiveness",
      description: "We deliver exceptional quality while maintaining cost-effectiveness, making essential medications accessible without compromising excellence."
    }
  ]

  if (!content) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-96 bg-gray-200 animate-pulse rounded-2xl" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        {/* About Content */}
        <div className="space-y-6">
          <h2 className="font-bold text-[32px] leading-tight" style={{ color: "#053C74" }}>
            ABOUT US
          </h2>

          <h3 className="font-light text-[36px] leading-tight" style={{ color: "var(--color-primary)" }}>
            {content.title}
          </h3>

          <p className="text-[14px] leading-relaxed" style={{ color: "#000" }}>
            {content.description}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              asChild
              className="rounded-full px-8 text-white hover:bg-[#2d5a8f]"
              style={{ backgroundColor: "#414881" }}
            >
              <Link href="/about">{content.primaryButtonText}</Link>
            </Button>
            <Button
              asChild
              className="rounded-full px-8 text-white hover:bg-[#2d6ba8]"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <Link href="/contact">{content.secondaryButtonText}</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid - Below intro text */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              {/* Feature Icon */}
              <div className="mb-4 flex justify-center">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
              
              {/* Feature Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              {/* Feature Description */}
              <p className="text-gray-600 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
