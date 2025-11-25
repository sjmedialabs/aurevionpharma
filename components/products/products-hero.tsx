export function ProductsHero() {
  return (
    <section className="relative w-full h-[400px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/products-hero.jpg)",
        }}
      />

      {/* Hexagonal pattern overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/hexagon-pattern.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/40" />

      {/* Content */}
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex flex-col justify-center h-full max-w-2xl">
          <h1 className="text-[#4a90e2] text-[42px] font-medium mb-4">PRODUCTS</h1>
          <p className="text-[#1a2847] text-2xl md:text-3xl font-light leading-relaxed">
            Act fast and make Aurevion
            <br />a part of your daily health routine
          </p>
        </div>
      </div>
    </section>
  )
}
