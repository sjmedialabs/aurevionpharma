import { z } from "zod"

// Helper function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  slug: z.string().min(1, "Slug is required").optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  casNumber: z.string().min(1, "CAS number is required"),
  hsCode: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  molecularFormula: z.string().optional(),
  molecularWeight: z.string().optional(),
  inStock: z.boolean().default(true),
  specifications: z
    .object({
      purity: z.string().optional(),
      appearance: z.string().optional(),
      solubility: z.string().optional(),
      storage: z.string().optional(),
    })
    .optional(),
}).transform((data) => ({
  ...data,
  slug: data.slug || generateSlug(data.name),
}))

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required").optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
}).transform((data) => ({
  ...data,
  slug: data.slug || generateSlug(data.name),
}))

export const enquirySchema = z.object({
  type: z.enum(["general", "product", "bulk", "service"]),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  productName: z.string().optional(),
  quantity: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ProductInput = z.infer<typeof productSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type EnquiryInput = z.infer<typeof enquirySchema>
