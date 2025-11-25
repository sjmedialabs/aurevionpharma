import Image from "next/image"

export function ServicesHero() {
  return (
    <section className="relative h-[400px] bg-white">
      <div className="absolute inset-0">
        <Image
          src="/images/services/services-hero-banner.png"
          alt="Laboratory services"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <p className="text-brand-primary text-[42px] font-medium mb-2 uppercase tracking-wide">SERVICES</p>
          <h1 className="text-[42px] font-normal text-[#222] leading-tight">
            Because Your Health Deserves
            <br />
            the Best - AUREVION
          </h1>
        </div>
      </div>
    </section>
  )
}
