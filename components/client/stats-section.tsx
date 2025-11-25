"use client"

import { useEffect, useRef, useState } from "react"
import type { HomePageContent } from "@/types"

const statsData = [
  { label: "Clients", value: 500 },
  { label: "Years of Experience", value: 15 },
  { label: "Professional Staff", value: 500 },
  { label: "Lab Techniques", value: 150 },
]

function useCountAnimation(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    const startValue = 0

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart)

      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, isVisible])

  return { count, setIsVisible }
}

function StatCard({ label, value }: { label: string; value: number }) {
  const { count, setIsVisible } = useCountAnimation(value)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [setIsVisible])

  return (
    <div ref={ref} className="text-center space-y-2">
      <div className="text-sm font-medium text-white md:text-base">{label}</div>
      <div className="text-3xl font-bold text-white md:text-4xl">{count}+</div>
    </div>
  )
}

export function StatsSection() {
  const [stats, setStats] = useState<Array<{ label: string; value: number }>>([])

  useEffect(() => {
    fetch("/api/content/home")
      .then((res) => res.json())
      .then((data: HomePageContent) => {
        setStats([
          { label: data.stats.yearsExperienceLabel, value: data.stats.yearsExperience },
          { label: data.stats.productsDeliveredLabel, value: data.stats.productsDelivered },
          { label: data.stats.satisfiedClientsLabel, value: data.stats.satisfiedClients },
          { label: data.stats.countriesServedLabel, value: data.stats.countriesServed },
        ])
      })
      .catch((error) => console.error("Failed to fetch stats:", error))
  }, [])

  if (stats.length === 0) {
    return (
      <section className="relative -mt-12 z-10">
        <div className="container mx-auto px-4">
          <div className="rounded-[200px] shadow-2xl p-8 bg-gray-200 animate-pulse" style={{ height: "150px" }} />
        </div>
      </section>
    )
  }

  return (
    <section className="relative -mt-12 z-10">
      <div className="container mx-auto px-4">
        <div className="rounded-[200px] shadow-2xl p-8 bg-brand-primary">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
