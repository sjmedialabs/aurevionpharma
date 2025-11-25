import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import connectDB from "@/lib/db/mongodb"
import { SubCategoryModel } from "@/lib/db/models/SubCategory"
import { CategoryModel } from "@/lib/db/models/Category"
import { ProductModel } from "@/lib/db/models/Product"

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// GET - Get subcategory by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const subcategory = await SubCategoryModel.findById(params.id)
      .populate('categoryId', 'name slug')
    
    if (!subcategory) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      )
    }

    const formattedSubcategory = {
      id: subcategory._id.toString(),
      name: subcategory.name,
      slug: subcategory.slug,
      description: subcategory.description,
      categoryId: subcategory.categoryId._id.toString(),
      category: subcategory.categoryId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
    }

    return NextResponse.json(formattedSubcategory)
  } catch (error) {
    console.error("Error fetching subcategory:", error)
    return NextResponse.json(
      { error: "Failed to fetch subcategory" },
      { status: 500 }
    )
  }
}

// PUT - Update subcategory
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()
    
    const body = await request.json()
    console.log("Updating subcategory with data:", body)
    
    const { name, slug, description, categoryId } = body

    // Validate required fields
    if (!name || !description || !categoryId) {
      return NextResponse.json(
        { error: "Name, description, and categoryId are required" },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const finalSlug = slug || generateSlug(name)

    // Check if category exists
    const category = await CategoryModel.findById(categoryId)
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    // Check if slug is unique (excluding current subcategory)
    const existing = await SubCategoryModel.findOne({ 
      slug: finalSlug, 
      _id: { $ne: params.id } 
    })
    if (existing) {
      return NextResponse.json(
        { error: "Subcategory with this slug already exists" },
        { status: 400 }
      )
    }

    // Update subcategory
    const subcategory = await SubCategoryModel.findByIdAndUpdate(
      params.id,
      { name, slug: finalSlug, description, categoryId },
      { new: true }
    ).populate('categoryId', 'name slug')

    if (!subcategory) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      )
    }

    console.log("Subcategory updated successfully:", subcategory.name)

    const formattedSubcategory = {
      id: subcategory._id.toString(),
      name: subcategory.name,
      slug: subcategory.slug,
      description: subcategory.description,
      categoryId: subcategory.categoryId._id.toString(),
      category: subcategory.categoryId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
    }

    return NextResponse.json(formattedSubcategory)
  } catch (error) {
    console.error("Error updating subcategory:", error)
    return NextResponse.json(
      { error: "Failed to update subcategory" },
      { status: 500 }
    )
  }
}

// DELETE - Delete subcategory
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()
    
    // Check if there are products using this subcategory
    const productsCount = await ProductModel.countDocuments({ 
      subcategory: params.id 
    })
    
    if (productsCount > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete subcategory. ${productsCount} products are using this subcategory.` 
        },
        { status: 400 }
      )
    }

    const subcategory = await SubCategoryModel.findByIdAndDelete(params.id)

    if (!subcategory) {
      return NextResponse.json(
        { error: "Subcategory not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Subcategory deleted successfully" })
  } catch (error) {
    console.error("Error deleting subcategory:", error)
    return NextResponse.json(
      { error: "Failed to delete subcategory" },
      { status: 500 }
    )
  }
}
