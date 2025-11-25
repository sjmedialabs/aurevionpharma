"use client"
import { PageHeader } from "@/components/admin/page-header"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plus, Search, Layers } from "lucide-react"
import type { Category, SubCategory } from "@/types"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToastContext } from "@/components/providers/toast-provider"
import { AccordionItem } from "@/components/admin/accordion-item"

export default function AdminSubcategoriesPage() {
  const { success, error } = useToastContext()
  const [subcategories, setSubcategories] = useState<SubCategory[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSubcategory, setEditingSubcategory] = useState<SubCategory | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "", categoryId: "" })

  useEffect(() => {
    fetchSubcategories()
    fetchCategories()
  }, [])

  const fetchSubcategories = async () => {
    try {
      const response = await fetch("/api/admin/subcategories")
      const data = await response.json()
      setSubcategories(data)
    } catch (err) {
      error("Failed to fetch subcategories")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories")
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      error("Failed to fetch categories")
    }
  }

  const handleSaveSubcategory = async () => {
    if (!formData.name || !formData.description || !formData.categoryId) {
      error("Please fill in all required fields")
      return
    }

    setSaving(true)
    try {
      const method = editingSubcategory ? "PUT" : "POST"
      const url = editingSubcategory ? `/api/admin/subcategories/${editingSubcategory.id}` : "/api/admin/subcategories"
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to save subcategory")

      success(editingSubcategory ? "Subcategory updated successfully" : "Subcategory created successfully")
      setDialogOpen(false)
      fetchSubcategories()
    } catch (err) {
      error("Failed to save subcategory")
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteSubcategory = async (subcategoryId: string) => {
    if (!confirm("Are you sure you want to delete this subcategory?")) return

    try {
      const response = await fetch(`/api/admin/subcategories/${subcategoryId}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete subcategory")
      success("Subcategory deleted successfully")
      fetchSubcategories()
    } catch (err) {
      error("Failed to delete subcategory")
    }
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || "Unknown"
  }

  const filteredSubcategories = subcategories.filter(subcategory =>
    subcategory.name.toLowerCase().includes(search.toLowerCase()) ||
    subcategory.description.toLowerCase().includes(search.toLowerCase()) ||
    getCategoryName(subcategory.categoryId).toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Subcategories</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Organize products into detailed subcategories</p>
          </div>
          <Button onClick={() => { setEditingSubcategory(null); setFormData({ name: "", description: "", categoryId: "" }); setDialogOpen(true) }}>
            <Plus className="h-4 w-4 mr-2" />Add Subcategory
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search subcategories..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Layers className="h-4 w-4" />{filteredSubcategories.length} subcategories
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="text-gray-500 dark:text-gray-400">Loading subcategories...</div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredSubcategories.length === 0 ? (
            <Card className="p-12 text-center dark:bg-gray-800 dark:border-gray-700">
              <Layers className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No subcategories found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {search ? "Try adjusting your search criteria" : "Get started by adding your first subcategory"}
              </p>
            </Card>
          ) : (
            filteredSubcategories.map((subcategory) => (
              <AccordionItem
                key={subcategory.id}
                id={subcategory.id}
                title={subcategory.name}
                subtitle={`Category: ${getCategoryName(subcategory.categoryId)}`}
                summary={<span className="text-gray-600 dark:text-gray-400">{subcategory.description.slice(0, 100)}...</span>}
                details={
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">Description</h4>
                      <p className="text-gray-700 dark:text-gray-300">{subcategory.description}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Parent Category</h5>
                      <p className="text-sm text-gray-900 dark:text-white">{getCategoryName(subcategory.categoryId)}</p>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 border-t pt-2">
                      Created: {new Date(subcategory.createdAt).toLocaleDateString()}
                      {subcategory.updatedAt && subcategory.updatedAt !== subcategory.createdAt && (
                        <span className="ml-4">Updated: {new Date(subcategory.updatedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                }
                onEdit={() => { 
                  setEditingSubcategory(subcategory); 
                  setFormData({ name: subcategory.name, description: subcategory.description, categoryId: subcategory.categoryId }); 
                  setDialogOpen(true) 
                }}
                onDelete={() => handleDeleteSubcategory(subcategory.id)}
              />
            ))
          )}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSubcategory ? "Edit Subcategory" : "Create New Subcategory"}</DialogTitle>
            <DialogDescription>
              {editingSubcategory ? "Update subcategory information" : "Add a new product subcategory"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="categoryId">Parent Category*</Label>
              <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="name">Subcategory Name*</Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter subcategory name" />
            </div>
            <div>
              <Label htmlFor="description">Description*</Label>
              <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter subcategory description" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveSubcategory} disabled={saving}>
              {saving ? "Saving..." : editingSubcategory ? "Update Subcategory" : "Create Subcategory"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
