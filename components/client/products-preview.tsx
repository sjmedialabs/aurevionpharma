import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getRepository } from "@/lib/repo"

export async function ProductsPreview() {
  const repo = getRepository()
  const products = await repo.getAllProducts()
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1a2847]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/images/product-background.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-[42px] font-bold text-white">PRODUCTS</h2>
          <p className="text-[36px] font-light text-white">HIGH-QUALITY APIS FOR GLOBAL PHARMA NEEDS.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-lg">
              {/* Product name and CAS number section */}
              <div className="p-8 text-center min-h-[180px] flex flex-col justify-center">
                <h3 className="text-[#1a2847] font-semibold text-lg mb-3 leading-tight">{product.name}</h3>
                <p className="text-[#6b7a99] text-sm">Cas No : {product.casNumber}</p>
              </div>

              {/* Category info bar */}
              <div className="bg-[#5b8dc5] py-3 px-6 text-center">
                <p className="text-white text-sm font-medium">
                  {product.therapeuticArea || product.apiType || product.category || "Alectinib"}
                </p>
              </div>

              {/* Enquiry button section */}
              <div className="p-8 flex justify-center">
                <Button
                  asChild
                  className="bg-[#1a2847] hover:bg-[#2a3857] text-white rounded-full px-10 py-6 text-base font-medium"
                >
                  <Link href={`/products/${product.slug}`}>Enquiry Now</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 bg-transparent rounded-full px-10 py-6 text-base"
          >
            <Link href="/products">View all products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
