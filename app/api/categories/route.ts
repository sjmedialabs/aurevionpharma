import { NextResponse } from "next/server"
import { getRepository } from "@/lib/repo"

// Enable caching for categories - they don't change often
export const revalidate = 3600 // Cache for 1 hour

export async function GET() {
  try {
    const repository = getRepository()
    const categories = await repository.getAllCategories()
    
    return NextResponse.json(categories, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    })
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
