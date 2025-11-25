import mongoose, { Schema, type Document } from "mongoose"
import type { SubCategory as SubCategoryType } from "@/types"

export interface SubCategoryDocument extends Omit<SubCategoryType, "id">, Document {
  _id: mongoose.Types.ObjectId
}

const SubCategorySchema = new Schema<SubCategoryDocument>({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Category",
    required: true 
  },
}, {
  timestamps: true,
})

// Index for better performance when querying by category
SubCategorySchema.index({ categoryId: 1 })

export const SubCategoryModel = 
  mongoose.models.SubCategory || 
  mongoose.model<SubCategoryDocument>("SubCategory", SubCategorySchema)
