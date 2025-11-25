import { type NextRequest, NextResponse } from "next/server"
import { getRepository } from "@/lib/repo"
import { getSession } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return await updateProduct(request, params)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return await updateProduct(request, params)
}

async function updateProduct(request: NextRequest, params: Promise<{ id: string }>) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const data = await request.json()

    console.log("Updating product with data:", data)

    // Basic validation
    if (!data.name || !data.casNumber || !data.description) {
      return NextResponse.json(
        { error: "Missing required fields: name, casNumber, description" },
        { status: 400 }
      )
    }

    // Handle category mapping
    let categoryName = data.category
    if (data.categoryId) {
      const repo = getRepository()
      const categories = await repo.getAllCategories()
      const category = categories.find(c => c.id === data.categoryId)
      if (category) {
        categoryName = category.name
      }
    }

    // Prepare update data
    const updateData = {
      name: data.name,
      casNumber: data.casNumber,
      description: data.description,
      category: categoryName,
      molecularFormula: data.molecularFormula || undefined,
      molecularWeight: data.molecularWeight || undefined,
      inStock: data.inStock !== undefined ? data.inStock : true,
      image: data.image || undefined,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-")
    }

    console.log("Processed update data:", updateData)

    const repo = getRepository()
    const product = await repo.updateProduct(id, updateData)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    console.log("Product updated successfully:", product.name)
    return NextResponse.json(product)
  } catch (error: any) {
    console.error("Failed to update product:", error)
    return NextResponse.json({ error: error.message || "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const repo = getRepository()
    const success = await repo.deleteProduct(id)

    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Failed to delete product:", error)
    return NextResponse.json({ error: error.message || "Failed to delete product" }, { status: 500 })
  }
}