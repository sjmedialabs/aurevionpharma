"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import type { Product, Category } from "@/types"
import { EnquiryModal } from "@/components/products/enquiry-modal"

interface ProductsGridProps {
  products: Product[]
  categories: Category[]
  loading?: boolean
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
  onFilterChange?: (filters: any) => void
  onPageChange?: (page: number) => void
}

const getCategoryName = (product: Product, categories: Category[]) => {
  if (product.categoryId) {
    return categories.find(cat => cat.id === product.categoryId)?.name || "Unknown"
  }
  return product.category || "Unknown"
}

export function ProductsGrid({ 
  products, 
  categories, 
  loading = false,
  pagination,
  onFilterChange,
  onPageChange 
}: ProductsGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined)

  const handleSearch = () => {
    onFilterChange?.({ search: searchQuery, category: selectedCategory === "all" ? "" : selectedCategory })
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    onFilterChange?.({ category: value === "all" ? "" : value, search: searchQuery })
  }

  const handleEnquiryClick = (product: Product) => {
    setSelectedProduct(product)
    setIsEnquiryModalOpen(true)
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Search and Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 gap-2">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} disabled={loading}>Search</Button>
          </div>

          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        {pagination && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No products found</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <div key={product.id} className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
                  <Link href={`/products/${product.slug}`} className="block">
                    {product.image && (
                      <div className="aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="mb-1 font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="mb-2 text-sm text-gray-500">
                        CAS: {product.casNumber}
                      </p>
                      <p className="mb-3 text-xs text-gray-400">
                        {getCategoryName(product, categories)}
                      </p>
                      {product.description && (
                        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </Link>
                  <div className="p-4 pt-0">
                    <Button
                      onClick={() => handleEnquiryClick(product)}
                      className="w-full"
                      size="sm"
                    >
                      Enquire Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (() => {
              const currentPage = pagination.page
              const totalPages = pagination.totalPages
              const maxVisiblePages = 7 // Maximum number of page buttons to show
              
              const getPageNumbers = () => {
                // If total pages are less than or equal to maxVisiblePages, show all
                if (totalPages <= maxVisiblePages) {
                  return Array.from({ length: totalPages }, (_, i) => i + 1)
                }
                
                const pages: (number | string)[] = []
                const leftSiblingIndex = Math.max(currentPage - 1, 1)
                const rightSiblingIndex = Math.min(currentPage + 1, totalPages)
                
                const shouldShowLeftDots = leftSiblingIndex > 2
                const shouldShowRightDots = rightSiblingIndex < totalPages - 1
                
                // Always show first page
                pages.push(1)
                
                if (shouldShowLeftDots) {
                  pages.push('left-ellipsis')
                } else if (leftSiblingIndex === 2) {
                  pages.push(2)
                }
                
                // Show pages around current page
                for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
                  if (i !== 1 && i !== totalPages) {
                    pages.push(i)
                  }
                }
                
                if (shouldShowRightDots) {
                  pages.push('right-ellipsis')
                } else if (rightSiblingIndex === totalPages - 1) {
                  pages.push(totalPages - 1)
                }
                
                // Always show last page
                if (totalPages !== 1) {
                  pages.push(totalPages)
                }
                
                return pages
              }
              
              const pageNumbers = getPageNumbers()
              
              return (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(pagination.page - 1)}
                    disabled={pagination.page === 1 || loading}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) => {
                      if (typeof page === 'string') {
                        // Render ellipsis
                        return (
                          <span
                            key={page}
                            className="w-8 h-8 flex items-center justify-center text-gray-400"
                          >
                            ...
                          </span>
                        )
                      }
                      
                      return (
                        <Button
                          key={page}
                          variant={pagination.page === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => onPageChange?.(page)}
                          disabled={loading}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange?.(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages || loading}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )
            })()}
          </>
        )}
      </div>

      {/* Enquiry Modal */}
      {selectedProduct && (
        <EnquiryModal
          isOpen={isEnquiryModalOpen}
          onClose={() => setIsEnquiryModalOpen(false)}
          product={selectedProduct}
        />
      )}
    </section>
  )
}
