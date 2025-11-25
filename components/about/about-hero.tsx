import Image from "next/image"
import type { AboutPageContent } from "@/types"

interface AboutHeroProps {
  content?: AboutPageContent | null
}

export function AboutHero({ content }: AboutHeroProps) {
  const backgroundImage = content?.hero?.backgroundImage || "/images/about-hero.png"
  
  return (
    <section className="relative w-full h-[400px] md:h-[500px]">
      <Image 
        src={backgroundImage} 
        alt="Aurevion Pharmaceutical Campus" 
        fill 
        className="object-cover" 
        priority 
      />
    </section>
  )
}
