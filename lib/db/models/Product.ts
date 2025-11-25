import mongoose, { Schema, type Document } from "mongoose"
import type { Product as ProductType } from "@/types"

export interface ProductDocument extends Omit<ProductType, "id">, Document {
  _id: mongoose.Types.ObjectId
}

const ProductSchema = new Schema<ProductDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    casNumber: { type: String, required: true },
    hsCode: { type: String },
    category: { type: String, required: true },
    subcategory: { type: String, required: false },
    description: { type: String, required: true },
    image: { type: String, required: false },
    specifications: {
      molecularFormula: String,
      molecularWeight: String,
      appearance: String,
      purity: String,
      storage: String,
    },
    applications: [String],
    inStock: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
)

// Add index for better performance when filtering by category and subcategory
ProductSchema.index({ category: 1, subcategory: 1 })

export const ProductModel = mongoose.models.Product || mongoose.model<ProductDocument>("Product", ProductSchema)
