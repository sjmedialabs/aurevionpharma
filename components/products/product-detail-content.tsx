"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { EnquiryModal } from "@/components/products/enquiry-modal"

interface ProductDetailContentProps {
  product: Product
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false)

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Chemical Structure Section */}
        <div className="mb-12 flex justify-center">
          <div className="relative h-[300px] w-full max-w-2xl">
            <Image
              src={product.image || "/chemical-molecular-structure-hexagonal-diagram.jpg"}
              alt={`${product.name} molecular structure`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Product Description Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-6 font-sans text-3xl font-semibold text-primary">Product Description</h2>
          <p className="mx-auto max-w-4xl font-sans text-base leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        </div>

        {/* Key Features and Details */}
        <div className="mb-8 text-center">
          <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">Key features and details</h3>
          <p className="font-sans text-lg text-muted-foreground">SKU:{product.id.toUpperCase()}</p>
        </div>

        {/* Product Details Table */}
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full">
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-sans text-sm font-medium text-foreground">Product Name</td>
                  <td className="px-6 py-4 font-sans text-sm text-muted-foreground">{product.name}</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-sans text-sm font-medium text-foreground">CAS Number</td>
                <tr className="hover:bg-muted/50">
                  <td className="px-6 py-4 font-sans text-sm font-medium text-foreground">Category</td>
                  <td className="px-6 py-4 font-sans text-sm text-muted-foreground">{product.category}</td>
                </tr>
                  <td className="px-6 py-4 font-sans text-sm text-muted-foreground">{product.casNumber}</td>
                </tr>
                {product.molecularFormula && (
                  <tr className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-sans text-sm font-medium text-foreground">Molecular Formula</td>
                    <td className="px-6 py-4 font-sans text-sm text-muted-foreground">{product.molecularFormula}</td>
                  </tr>
                )}
                {product.molecularWeight && (
                  <tr className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-sans text-sm font-medium text-foreground">Molecular Weight</td>
                    <td className="px-6 py-4 font-sans text-sm text-muted-foreground">
                      {product.molecularWeight} g/mol
                    </td>
                  </tr>
                )}
                {product.hsCode && (
                  <tr className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-sans text-sm font-medium text-foreground">MDL Number</td>
                    <td className="px-6 py-4 font-sans text-sm text-muted-foreground">{product.hsCode}</td>
                  </tr>
                )}
                {product.specifications?.purity && (
                  <tr className="hover:bg-muted/50">
                    <td className="px-6 py-4 font-sans text-sm font-medium text-foreground">Packaging size</td>
                    <td className="px-6 py-4 font-sans text-sm text-muted-foreground">
                      {product.specifications.purity}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Enquiry Button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setIsEnquiryOpen(true)}
              size="lg"
              className="rounded-full px-12 font-sans text-base font-medium"
            >
              Enquiry Now
            </Button>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} product={product} />
    </>
  )
}
