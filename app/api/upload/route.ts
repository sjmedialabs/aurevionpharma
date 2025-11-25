import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"
import { getSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  // Check authentication
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string // "icon" or "image"
    
    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 })
    }

    if (!type || !["icon", "image"].includes(type)) {
      return NextResponse.json({ error: "Invalid type. Must be 'icon' or 'image'" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only images are allowed." }, { status: 400 })
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: "File too large. Maximum size is 5MB." }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
    const filename = `${timestamp}_${originalName}`
    
    // Determine upload path based on type
    const uploadDir = type === "icon" ? "services/icons" : "services/images"
    const filepath = join(process.cwd(), "public", "uploads", uploadDir, filename)
    
    // Write file
    await writeFile(filepath, buffer)
    
    // Return the public URL
    const publicUrl = `/api/uploads/${uploadDir}/${filename}`
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      filename: filename,
      type: type
    })
    
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
