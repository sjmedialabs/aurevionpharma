"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import type { AboutPageContent } from "@/types"

export function AboutIntro() {
  const [content, setContent] = useState<AboutPageContent["intro"] | null>(null)

  useEffect(() => {
    fetch("/api/content/about")
      .then((res) => res.json())
      .then((data: AboutPageContent) => {
        if (data.intro) {
          setContent(data.intro)
        }
      })
      .catch((error) => console.error("Failed to fetch about intro:", error))
  }, [])

  // Default content fallback
  const defaultContent = {
    badge: "ABOUT US",
    title: "PIONEERING INNOVATION IN DRUG DISCOVERY",
    description: "We are committed to pushing the boundaries of pharmaceutical innovation, driving forward the development of life-changing medications through cutting-edge research and uncompromising quality standards.",
    features: [
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
  }

  // Use CMS content if available, otherwise use defaults
  const introContent = content || defaultContent

  if (!content) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-96 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <Image
              src="/images/scientist-with-microscope.png"
              alt="Scientist in laboratory"
              width={500}
              height={500}
              className="rounded-lg shadow-lg w-full h-auto"
              priority
            />
          </div>

          {/* Right Column - Content */}
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
              {introContent.badge}
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 font-poppins leading-tight">
              {introContent.title}
            </h2>

            {/* Description */}
            <div className="text-gray-600 font-poppins leading-relaxed space-y-4">
              {introContent.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {introContent.features.map((feature, index) => (
            <div key={index} className="text-center bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {/* Feature Icon */}
              <div className="mb-4 flex justify-center">
                <Image
                  src={feature.icon || "/images/icon-default.png"}
                  alt={feature.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>
              
              {/* Feature Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 font-poppins">
                {feature.title}
              </h3>
              
              {/* Feature Description */}
              <p className="text-gray-600 leading-relaxed font-poppins">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
