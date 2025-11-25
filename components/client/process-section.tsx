"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import type { HomePageContent } from "@/types"

export function ProcessSection() {
  const [content, setContent] = useState<HomePageContent["process"] | null>(null)

  useEffect(() => {
    fetch("/api/content/home")
      .then((res) => res.json())
      .then((data: HomePageContent) => setContent(data.process))
      .catch((error) => console.error("Failed to fetch process content:", error))
  }, [])

  if (!content) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-4xl md:text-5xl font-bold text-[#053C74] tracking-wide">{content.title}</h2>
          <p className="text-xl md:text-2xl font-medium text-[#053C74]">{content.subtitle}</p>
        </div>

        <div className="relative">
          {/* Desktop layout */}
          <div className="hidden lg:flex justify-between items-start relative">
            {content.steps.map((step, index) => (
              <div key={step.number} className="flex-1 relative">
                <div
                  className={`flex flex-col items-center text-center space-y-6 ${index % 2 === 1 ? "mt-16" : "mt-0"}`}
                >
                  {/* Icon circle with dashed border */}
                  <div className="relative">
                    <div className="w-48 h-48 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-white">
                      <div className="w-32 h-32 rounded-full bg-white shadow-lg flex items-center justify-center mr-10">
                        <Image
                          src={step.icon || "/placeholder.svg"}
                          alt={step.title}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#4BD06F] text-white flex items-center justify-center text-lg font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="space-y-3 max-w-xs">
                    <h3 className="text-xl font-bold text-[#1a2847]">{step.title}</h3>
                    <p className="text-[#9CA3B8] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet layout */}
          <div className="lg:hidden space-y-12">
            {content.steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center text-center space-y-6">
                {/* Icon circle with dashed border */}
                <div className="relative">
                  <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-white">
                    <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <Image
                        src={step.icon || "/placeholder.svg"}
                        alt={step.title}
                        width={64}
                        height={64}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#4BD06F] text-white flex items-center justify-center text-base font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Text content */}
                <div className="space-y-3 max-w-sm px-4">
                  <h3 className="text-lg font-bold text-[#1a2847]">{step.title}</h3>
                  <p className="text-[#9CA3B8] text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
