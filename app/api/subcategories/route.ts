import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/db/mongodb"
import { SubCategoryModel } from "@/lib/db/models/SubCategory"

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
      .sort({ name: 1 })
    
    const formattedSubcategories = subcategories.map((subcategory) => ({
      id: subcategory._id.toString(),
      name: subcategory.name,
      slug: subcategory.slug,
      description: subcategory.description,
      categoryId: subcategory.categoryId._id.toString(),
      category: subcategory.categoryId,
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
