"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Service } from "@/types"

export function ServicesGrid() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services")
        const data = await response.json()
        setServices(data)
      } catch (error) {
        console.error("Failed to fetch services:", error)
        // Fallback to empty array - no mock data
        setServices([])
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[42px] font-bold text-brand-primary">SERVICES</h2>
            <p className="text-4xl font-light text-brand-primary">COMPREHENSIVE PHARMA SUPPORT SOLUTIONS</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#141570]"></div>
          </div>
        </div>
      </section>
    )
  }

  if (services.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-[42px] font-bold text-brand-primary">SERVICES</h2>
            <p className="text-4xl font-light text-brand-primary">COMPREHENSIVE PHARMA SUPPORT SOLUTIONS</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">No services available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-[42px] font-bold text-brand-primary">SERVICES</h2>
          <p className="text-4xl font-light text-brand-primary">COMPREHENSIVE PHARMA SUPPORT SOLUTIONS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Icon and Text Section */}
              <div className="p-8 pb-4">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={service.icon || "/placeholder.svg"}
                      alt={`${service.title} icon`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="text-center space-y-2 mb-4">
                  <p className="text-sm text-[#8893B9] uppercase tracking-wide font-medium">{service.subtitle}</p>
                  <h3 className="text-3xl font-bold text-brand-primary">{service.title}</h3>
                </div>

                {/* Arrow Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center transition-colors">
                    <ArrowRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
