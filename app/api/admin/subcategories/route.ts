import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import connectDB from "@/lib/db/mongodb"
import { SubCategoryModel } from "@/lib/db/models/SubCategory"
import { CategoryModel } from "@/lib/db/models/Category"

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// GET - List all subcategories
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get("categoryId")
    
    let query = {}
    if (categoryId) {
      query = { categoryId }
    }
    
    const subcategories = await SubCategoryModel.find(query)
      .populate('categoryId', 'name slug')
      .sort({ createdAt: -1 })
    
    const formattedSubcategories = subcategories.map((subcategory) => ({
      id: subcategory._id.toString(),
      name: subcategory.name,
      slug: subcategory.slug,
      description: subcategory.description,
      categoryId: subcategory.categoryId._id.toString(),
      category: subcategory.categoryId,
      createdAt: subcategory.createdAt,
      updatedAt: subcategory.updatedAt,
    }))

    return NextResponse.json(formattedSubcategories)
  } catch (error) {
    console.error("Error fetching subcategories:", error)
    return NextResponse.json(
      { error: "Failed to fetch subcategories" },
      { status: 500 }
    )
  }
}

// POST - Create new subcategory
export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await connectDB()
    
    const body = await request.json()
    console.log("Creating subcategory with data:", body)
    
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

    // Check if slug is unique
    const existing = await SubCategoryModel.findOne({ slug: finalSlug })
    if (existing) {
      return NextResponse.json(
        { error: "Subcategory with this slug already exists" },
        { status: 400 }
      )
    }

    // Create subcategory
    const subcategory = new SubCategoryModel({
      name,
      slug: finalSlug,
      description,
      categoryId,
    })

    await subcategory.save()

    // Populate category for response
    await subcategory.populate('categoryId', 'name slug')

    console.log("Subcategory created successfully:", subcategory.name)

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

    return NextResponse.json(formattedSubcategory, { status: 201 })
  } catch (error) {
    console.error("Error creating subcategory:", error)
    return NextResponse.json(
      { error: "Failed to create subcategory" },
      { status: 500 }
    )
  }
}
