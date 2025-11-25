import { type NextRequest, NextResponse } from "next/server"
import { getRepository } from "@/lib/repo"
import { getSession } from "@/lib/auth"
import { productSchema } from "@/lib/validations"
import * as XLSX from "xlsx"

// Configure route to allow 10 minutes execution time
export const maxDuration = 600

// Increase body size limit for large files
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb'
    }
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const workbook = XLSX.read(buffer, { type: "buffer" })
    const worksheet = workbook.Sheets[workbook.SheetNames[0]]
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" })

    console.log(`Starting bulk upload: ${jsonData.length} rows`)
    
    const repo = getRepository()
    
    // Get or create default category
    let categories = await repo.getAllCategories()
    if (categories.length === 0) {
      const defaultCategory = await repo.createCategory({
        name: "APIs",
        description: "Active Pharmaceutical Ingredients"
      })
      categories = [defaultCategory]
    }
    
    const defaultCategoryName = categories[0].name
    console.log("Using default category:", defaultCategoryName)

    let success = 0, failed = 0, skipped = 0
    const errors: string[] = []
    
    const totalRows = jsonData.length
    const PROGRESS_INTERVAL = 500
    const BATCH_SIZE = 100

    // Process in batches for better performance
    for (let batchStart = 0; batchStart < totalRows; batchStart += BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + BATCH_SIZE, totalRows)
      const batch = jsonData.slice(batchStart, batchEnd)

      for (let i = 0; i < batch.length; i++) {
        const globalIndex = batchStart + i
        
        // Log progress
        if (globalIndex > 0 && globalIndex % PROGRESS_INTERVAL === 0) {
          console.log(`Progress: ${globalIndex}/${totalRows} rows (${success} success, ${failed} failed, ${skipped} skipped)`)
        }
        
        const row = batch[i] as any
        const rowNumber = globalIndex + 2
        
        try {
          // Extract data with multiple fallback options
          const name = (row.Name || row.name || row.ProductName || row.product_name || row["Product Name"] || "").toString().trim()
          const casNumber = (row.casNumber || row.CAS || row.cas || row["CAS Number"] || "").toString().trim()
          let description = (row.description || row.Description || row.desc || row.Desc || "").toString().trim()
          const category = (row.category || row.Category || "").toString().trim()

          // Skip empty rows
          if (!name && !casNumber) {
            skipped++
            continue
          }

          // Validate required fields
          if (!name) {
            if (errors.length < 10) {
              errors.push(`Row ${rowNumber}: Missing product name`)
            }
            failed++
            continue
          }

          if (!casNumber) {
            if (errors.length < 10) {
              errors.push(`Row ${rowNumber}: Missing CAS number`)
            }
            failed++
            continue
          }

          // Use default description if empty
          if (!description || description.length < 10) {
            description = `${name} - Active Pharmaceutical Ingredient`
          }

          // Match category
          let finalCategory = defaultCategoryName
          if (category) {
            const foundCategory = categories.find(c => 
              c.name.toLowerCase().includes(category.toLowerCase()) ||
              category.toLowerCase().includes(c.name.toLowerCase())
            )
            if (foundCategory) {
              finalCategory = foundCategory.name
            }
          }

          // Prepare product data
          const productData = {
            name,
            casNumber,
            description,
            category: finalCategory,
            molecularFormula: (row.molecularFormula || row.MolecularFormula || "").toString().trim() || undefined,
            molecularWeight: (row.molecularWeight || row.MolecularWeight || "").toString().trim() || undefined,
            inStock: true
          }

          // Validate and create
          const validated = productSchema.parse(productData)
          await repo.createProduct(validated)
          success++
          
        } catch (error: any) {
          // Handle duplicates silently (common in large imports)
          if (error.message && (error.message.includes("duplicate") || error.message.includes("E11000"))) {
            skipped++
            if (errors.length < 10) {
              errors.push(`Row ${rowNumber}: Duplicate product`)
            }
          } else {
            failed++
            if (errors.length < 10) {
              const errorMsg = error.message || JSON.stringify(error).substring(0, 100)
              errors.push(`Row ${rowNumber}: ${errorMsg}`)
            }
          }
        }
      }
    }

    console.log(`Bulk upload completed: ${success} success, ${failed} failed, ${skipped} skipped`)
    
    return NextResponse.json({ 
      success, 
      failed: failed + skipped,
      errors: errors.slice(0, 10),
      message: success > 0 
        ? `Successfully uploaded ${success} products! ${skipped > 0 ? `(${skipped} duplicates skipped)` : ''}`
        : "Upload failed. Check errors."
    })
    
  } catch (error: any) {
    console.error("Bulk upload error:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
