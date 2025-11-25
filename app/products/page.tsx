"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/common/header"
import { Footer } from "@/components/common/footer"
import { WhatsAppButton } from "@/components/common/whatsapp-button"
import { ProductsHero } from "@/components/products/products-hero"
import { ProductsGrid } from "@/components/products/products-grid"
import type { Product, Category } from "@/types"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    totalPages: 0,
    hasMore: false
  })
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    inStock: "",
    sort: ""
  })

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")
    
    if (categoryParam || searchParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam || "",
        search: searchParam || ""
      }))
    }
  }, [searchParams])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [pagination.page, filters])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Failed to fetch categories:", error)
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.category && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
        ...(filters.inStock && { inStock: filters.inStock }),
        ...(filters.sort && { sort: filters.sort }),
      })

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()
      
      setProducts(data.products || [])
      setPagination(prev => ({ ...prev, ...data.pagination }))
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
    setPagination(prev => ({ ...prev, page: 1 })) // Reset to page 1 on filter change
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main>
        <ProductsHero />
        <ProductsGrid 
          products={products} 
          categories={categories}
          loading={loading}
          pagination={pagination}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
        />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
