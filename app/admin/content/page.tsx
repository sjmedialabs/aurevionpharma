"use client"
import { PageHeader } from "@/components/admin/page-header"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MediaUpload } from "@/components/admin/media-upload"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"
import { useToastContext } from "@/components/providers/toast-provider"
import type { HomePageContent, AboutPageContent, ContactPageContent, FooterContent } from "@/types"

export default function AdminContentPage() {
  const { success, error } = useToastContext()
  const [activeTab, setActiveTab] = useState("home")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Home Page State
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null)

  // About Page State
  const [aboutContent, setAboutContent] = useState<AboutPageContent | null>(null)

  // Contact Page State
  const [contactContent, setContactContent] = useState<ContactPageContent | null>(null)

  // Footer State
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    setLoading(true)
    try {
      const [home, about, contact, footer] = await Promise.all([
        fetch("/api/admin/content/home").then((r) => r.json()),
        fetch("/api/admin/content/about").then((r) => r.json()),
        fetch("/api/admin/content/contact").then((r) => r.json()),
        fetch("/api/admin/content/footer").then((r) => r.json()),
      ])
      setHomeContent(home)
      setAboutContent(about)
      setContactContent(contact)
      setFooterContent(footer)
    } catch (err) {
      error("Failed to fetch content", "Please try refreshing the page")
    } finally {
      setLoading(false)
    }
  }

  const saveHomeContent = async () => {
    if (!homeContent) return
    setSaving(true)
    try {
      const response = await fetch("/api/admin/content/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(homeContent),
      })
      if (response.ok) {
        success("Home page updated successfully", "Your changes have been saved and are now live")
      } else {
        error("Failed to save home page", "Please check your input and try again")
      }
    } catch (err) {
      error("Failed to save home page", "Please check your connection and try again")
    } finally {
      setSaving(false)
    }
  }

  const saveAboutContent = async () => {
    if (!aboutContent) return
    setSaving(true)
    try {
      const response = await fetch("/api/admin/content/about", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutContent),
      })
      if (response.ok) {
        success("About page updated successfully", "Your changes have been saved and are now live")
      } else {
        error("Failed to save about page", "Please check your input and try again")
      }
    } catch (err) {
      error("Failed to save about page", "Please check your connection and try again")
    } finally {
      setSaving(false)
    }
  }

  const saveContactContent = async () => {
    if (!contactContent) return
    setSaving(true)
    try {
      const response = await fetch("/api/admin/content/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactContent),
      })
      if (response.ok) {
        success("Contact page updated successfully", "Your changes have been saved and are now live")
      } else {
        error("Failed to save contact page", "Please check your input and try again")
      }
    } catch (err) {
      error("Failed to save contact page", "Please check your connection and try again")
    } finally {
      setSaving(false)
    }
  }

  const saveFooterContent = async () => {
    if (!footerContent) return
    setSaving(true)
    try {
      const response = await fetch("/api/admin/content/footer", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(footerContent),
      })
      if (response.ok) {
        success("Footer updated successfully", "Your changes have been saved and are now live")
      } else {
        error("Failed to save footer", "Please check your input and try again")
      }
    } catch (err) {
      error("Failed to save footer", "Please check your connection and try again")
    } finally {
      setSaving(false)
    }
  }

  // Helper functions for managing dynamic content
  const addHomeFeature = () => {
    if (!homeContent) return
    setHomeContent({
      ...homeContent,
      aboutPreview: {
        ...homeContent.aboutPreview,
        features: [
          ...homeContent.aboutPreview.features,
          { icon: "", title: "", description: "" }
        ]
      }
    })
  }

  const removeHomeFeature = (index: number) => {
    if (!homeContent) return
    setHomeContent({
      ...homeContent,
      aboutPreview: {
        ...homeContent.aboutPreview,
        features: homeContent.aboutPreview.features.filter((_, i) => i !== index)
      }
    })
  }

  const addProcessStep = () => {
    if (!homeContent) return
    setHomeContent({
      ...homeContent,
      process: {
        ...homeContent.process,
        steps: [
          ...homeContent.process.steps,
          { number: "", title: "", description: "", icon: "" }
        ]
      }
    })
  }

  const removeProcessStep = (index: number) => {
    if (!homeContent) return
    setHomeContent({
      ...homeContent,
      process: {
        ...homeContent.process,
        steps: homeContent.process.steps.filter((_, i) => i !== index)
      }
    })
  }

  // About page helpers
  const addAboutIntroFeature = () => {
    if (!aboutContent) return
    setAboutContent({
      ...aboutContent,
      intro: {
        ...aboutContent.intro,
        features: [
          ...aboutContent.intro.features,
          { icon: "", title: "", description: "" }
        ]
      }
    })
  }

  const removeAboutIntroFeature = (index: number) => {
    if (!aboutContent) return
    setAboutContent({
      ...aboutContent,
      intro: {
        ...aboutContent.intro,
        features: aboutContent.intro.features.filter((_, i) => i !== index)
      }
    })
  }

  const addWhyUsFeature = () => {
    if (!aboutContent) return
    setAboutContent({
      ...aboutContent,
      whyUs: {
        ...aboutContent.whyUs,
        features: [
          ...aboutContent.whyUs.features,
          { icon: "", title: "", description: "" }
        ]
      }
    })
  }

  const removeWhyUsFeature = (index: number) => {
    if (!aboutContent) return
    setAboutContent({
      ...aboutContent,
      whyUs: {
        ...aboutContent.whyUs,
        features: aboutContent.whyUs.features.filter((_, i) => i !== index)
      }
    })
  }

  // Footer helpers
  const addProductLink = () => {
    if (!footerContent) return
    setFooterContent({
      ...footerContent,
      productLinks: [
        ...footerContent.productLinks,
        { name: "", href: "" }
      ]
    })
  }

  const removeProductLink = (index: number) => {
    if (!footerContent) return
    setFooterContent({
      ...footerContent,
      productLinks: footerContent.productLinks.filter((_, i) => i !== index)
    })
  }

  const addAboutLink = () => {
    if (!footerContent) return
    setFooterContent({
      ...footerContent,
      aboutLinks: [
        ...footerContent.aboutLinks,
        { name: "", href: "" }
      ]
    })
  }

  const removeAboutLink = (index: number) => {
    if (!footerContent) return
    setFooterContent({
      ...footerContent,
      aboutLinks: footerContent.aboutLinks.filter((_, i) => i !== index)
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading content...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="text-gray-600 mt-1">Manage your website content and settings</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="contact">Contact Page</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {/* Home Page Content */}
        <TabsContent value="home">
          <div className="space-y-6">
            {homeContent && (
              <>
                {/* Hero Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hero Section</CardTitle>
                    <CardDescription>Manage your homepage hero section content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="hero-title" className="mb-2 block">Hero Title</Label>
                      <Input
                        id="hero-title"
                        value={homeContent.hero?.title || ""}
                        onChange={(e) =>
                          setHomeContent({
                            ...homeContent,
                            hero: { ...homeContent.hero, title: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="hero-description" className="mb-2 block">Hero Description</Label>
                      <Textarea
                        id="hero-description"
                        rows={3}
                        value={homeContent.hero?.description || ""}
                        onChange={(e) =>
                          setHomeContent({
                            ...homeContent,
                            hero: { ...homeContent.hero, description: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="primary-btn-text" className="mb-2 block">Primary Button Text</Label>
                        <Input
                          id="primary-btn-text"
                          value={homeContent.hero?.primaryButtonText || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              hero: { ...homeContent.hero, primaryButtonText: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="primary-btn-link" className="mb-2 block">Primary Button Link</Label>
                        <Input
                          id="primary-btn-link"
                          value={homeContent.hero?.primaryButtonLink || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              hero: { ...homeContent.hero, primaryButtonLink: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="secondary-btn-text" className="mb-2 block">Secondary Button Text</Label>
                        <Input
                          id="secondary-btn-text"
                          value={homeContent.hero?.secondaryButtonText || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              hero: { ...homeContent.hero, secondaryButtonText: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="secondary-btn-link" className="mb-2 block">Secondary Button Link</Label>
                        <Input
                          id="secondary-btn-link"
                          value={homeContent.hero?.secondaryButtonLink || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              hero: { ...homeContent.hero, secondaryButtonLink: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Hero Background Image</Label>
                      <MediaUpload
                        value={homeContent.hero?.backgroundImage || ""}
                        onChange={(url) =>
                          setHomeContent({
                            ...homeContent,
                            hero: { ...homeContent.hero, backgroundImage: url },
                          })
                        }
                        accept="image"
                        maxWidth={1920}
                        maxHeight={1080}
                        aspectRatio="16:9"
                        maxSizeMB={5}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Statistics Section</CardTitle>
                    <CardDescription>Manage your company statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="years-exp" className="mb-2 block">Years Experience</Label>
                        <Input
                          id="years-exp"
                          type="number"
                          value={homeContent.stats?.yearsExperience || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              stats: { ...homeContent.stats, yearsExperience: parseInt(e.target.value) || 0 },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="years-exp-label" className="mb-2 block">Years Experience Label</Label>
                        <Input
                          id="years-exp-label"
                          value={homeContent.stats?.yearsExperienceLabel || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              stats: { ...homeContent.stats, yearsExperienceLabel: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="products-delivered" className="mb-2 block">Products Delivered</Label>
                        <Input
                          id="products-delivered"
                          type="number"
                          value={homeContent.stats?.productsDelivered || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              stats: { ...homeContent.stats, productsDelivered: parseInt(e.target.value) || 0 },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="products-delivered-label" className="mb-2 block">Products Delivered Label</Label>
                        <Input
                          id="products-delivered-label"
                          value={homeContent.stats?.productsDeliveredLabel || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              stats: { ...homeContent.stats, productsDeliveredLabel: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="satisfied-clients" className="mb-2 block">Satisfied Clients</Label>
                        <Input
                          id="satisfied-clients"
                          type="number"
                          value={homeContent.stats?.satisfiedClients || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              stats: { ...homeContent.stats, satisfiedClients: parseInt(e.target.value) || 0 },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="satisfied-clients-label" className="mb-2 block">Satisfied Clients Label</Label>
                        <Input
                          id="satisfied-clients-label"
                          value={homeContent.stats?.satisfiedClientsLabel || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              stats: { ...homeContent.stats, satisfiedClientsLabel: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="countries-served" className="mb-2 block">Countries Served</Label>
                        <Input
                          id="countries-served"
                          type="number"
                          value={homeContent.stats?.countriesServed || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              stats: { ...homeContent.stats, countriesServed: parseInt(e.target.value) || 0 },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="countries-served-label" className="mb-2 block">Countries Served Label</Label>
                        <Input
                          id="countries-served-label"
                          value={homeContent.stats?.countriesServedLabel || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              stats: { ...homeContent.stats, countriesServedLabel: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* About Preview Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Preview Section</CardTitle>
                    <CardDescription>Manage the about section preview on homepage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="about-badge" className="mb-2 block">Badge</Label>
                        <Input
                          id="about-badge"
                          value={homeContent.aboutPreview?.badge || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              aboutPreview: { ...homeContent.aboutPreview, badge: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="about-title" className="mb-2 block">Title</Label>
                        <Input
                          id="about-title"
                          value={homeContent.aboutPreview?.title || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              aboutPreview: { ...homeContent.aboutPreview, title: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="about-description" className="mb-2 block">Description</Label>
                      <Textarea
                        id="about-description"
                        rows={3}
                        value={homeContent.aboutPreview?.description || ""}
                        onChange={(e) =>
                          setHomeContent({
                            ...homeContent,
                            aboutPreview: { ...homeContent.aboutPreview, description: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="about-primary-btn" className="mb-2 block">Primary Button Text</Label>
                        <Input
                          id="about-primary-btn"
                          value={homeContent.aboutPreview?.primaryButtonText || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              aboutPreview: { ...homeContent.aboutPreview, primaryButtonText: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="about-secondary-btn" className="mb-2 block">Secondary Button Text</Label>
                        <Input
                          id="about-secondary-btn"
                          value={homeContent.aboutPreview?.secondaryButtonText || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              aboutPreview: { ...homeContent.aboutPreview, secondaryButtonText: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Features</Label>
                        <Button onClick={addHomeFeature} size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Feature
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {homeContent.aboutPreview?.features?.map((feature, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-medium">Feature {index + 1}</h4>
                              <Button onClick={() => removeHomeFeature(index)} size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label>Feature Icon</Label>
                                <MediaUpload
                                  value={feature.icon}
                                  onChange={(url) => {
                                    const updatedFeatures = [...homeContent.aboutPreview.features]
                                    updatedFeatures[index].icon = url
                                    setHomeContent({
                                      ...homeContent,
                                      aboutPreview: { ...homeContent.aboutPreview, features: updatedFeatures }
                                    })
                                  }}
                                  accept="image"
                                  maxWidth={64}
                                  maxHeight={64}
                                  aspectRatio="1:1"
                                  maxSizeMB={1}
                                  placeholder="Upload feature icon"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    value={feature.title}
                                    onChange={(e) => {
                                      const updatedFeatures = [...homeContent.aboutPreview.features]
                                      updatedFeatures[index].title = e.target.value
                                      setHomeContent({
                                        ...homeContent,
                                        aboutPreview: { ...homeContent.aboutPreview, features: updatedFeatures }
                                      })
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <Textarea
                                    rows={2}
                                    value={feature.description}
                                    onChange={(e) => {
                                      const updatedFeatures = [...homeContent.aboutPreview.features]
                                      updatedFeatures[index].description = e.target.value
                                      setHomeContent({
                                        ...homeContent,
                                        aboutPreview: { ...homeContent.aboutPreview, features: updatedFeatures }
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Process Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Process Section</CardTitle>
                    <CardDescription>Manage your company process steps</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="process-title" className="mb-2 block">Process Title</Label>
                        <Input
                          id="process-title"
                          value={homeContent.process?.title || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              process: { ...homeContent.process, title: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="process-subtitle" className="mb-2 block">Process Subtitle</Label>
                        <Input
                          id="process-subtitle"
                          value={homeContent.process?.subtitle || ""}
                          onChange={(e) =>
                            setHomeContent({
                              ...homeContent,
                              process: { ...homeContent.process, subtitle: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* Process Steps */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Process Steps</Label>
                        <Button onClick={addProcessStep} size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Step
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {homeContent.process?.steps?.map((step, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-medium">Step {index + 1}</h4>
                              <Button onClick={() => removeProcessStep(index)} size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label>Process Step Icon</Label>
                                <MediaUpload
                                  value={step.icon}
                                  onChange={(url) => {
                                    const updatedSteps = [...homeContent.process.steps]
                                    updatedSteps[index].icon = url
                                    setHomeContent({
                                      ...homeContent,
                                      process: { ...homeContent.process, steps: updatedSteps }
                                    })
                                  }}
                                  accept="image"
                                  maxWidth={80}
                                  maxHeight={80}
                                  aspectRatio="1:1"
                                  maxSizeMB={1}
                                  placeholder="Upload process step icon"
                                />
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <Label>Step Number</Label>
                                  <Input
                                    value={step.number}
                                    onChange={(e) => {
                                      const updatedSteps = [...homeContent.process.steps]
                                      updatedSteps[index].number = e.target.value
                                      setHomeContent({
                                        ...homeContent,
                                        process: { ...homeContent.process, steps: updatedSteps }
                                      })
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    value={step.title}
                                    onChange={(e) => {
                                      const updatedSteps = [...homeContent.process.steps]
                                      updatedSteps[index].title = e.target.value
                                      setHomeContent({
                                        ...homeContent,
                                        process: { ...homeContent.process, steps: updatedSteps }
                                      })
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <Textarea
                                    rows={2}
                                    value={step.description}
                                    onChange={(e) => {
                                      const updatedSteps = [...homeContent.process.steps]
                                      updatedSteps[index].description = e.target.value
                                      setHomeContent({
                                        ...homeContent,
                                        process: { ...homeContent.process, steps: updatedSteps }
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button onClick={saveHomeContent} disabled={saving} size="lg">
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Home Content
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        {/* About Page Content */}
        <TabsContent value="about">
          <div className="space-y-6">
            {aboutContent && (
              <>
                {/* Hero Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Page Hero</CardTitle>
                    <CardDescription>Manage the hero section of your about page</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label>Hero Background Image</Label>
                      <MediaUpload
                        value={aboutContent.hero?.backgroundImage || ""}
                        onChange={(url) =>
                          setAboutContent({
                            ...aboutContent,
                            hero: { ...aboutContent.hero, backgroundImage: url },
                          })
                        }
                        accept="image"
                        maxWidth={1920}
                        maxHeight={1080}
                        aspectRatio="16:9"
                        maxSizeMB={5}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Intro Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Introduction Section</CardTitle>
                    <CardDescription>Manage the introduction section content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="intro-badge" className="mb-2 block">Badge</Label>
                        <Input
                          id="intro-badge"
                          value={aboutContent.intro?.badge || ""}
                          onChange={(e) =>
                            setAboutContent({
                              ...aboutContent,
                              intro: { ...aboutContent.intro, badge: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="intro-title" className="mb-2 block">Title</Label>
                        <Input
                          id="intro-title"
                          value={aboutContent.intro?.title || ""}
                          onChange={(e) =>
                            setAboutContent({
                              ...aboutContent,
                              intro: { ...aboutContent.intro, title: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="intro-description" className="mb-2 block">Description</Label>
                      <Textarea
                        id="intro-description"
                        rows={4}
                        value={aboutContent.intro?.description || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            intro: { ...aboutContent.intro, description: e.target.value },
                          })
                        }
                      />
                    </div>

                    {/* Intro Features */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Introduction Features</Label>
                        <Button onClick={addAboutIntroFeature} size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Feature
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {aboutContent.intro?.features?.map((feature, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-medium">Feature {index + 1}</h4>
                              <Button onClick={() => removeAboutIntroFeature(index)} size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label>Feature Icon</Label>
                                <MediaUpload
                                  value={feature.icon}
                                  onChange={(url) => {
                                    const updatedFeatures = [...aboutContent.intro.features]
                                    updatedFeatures[index].icon = url
                                    setAboutContent({
                                      ...aboutContent,
                                      intro: { ...aboutContent.intro, features: updatedFeatures }
                                    })
                                  }}
                                  accept="image"
                                  maxWidth={64}
                                  maxHeight={64}
                                  aspectRatio="1:1"
                                  maxSizeMB={1}
                                  placeholder="Upload feature icon"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    value={feature.title}
                                    onChange={(e) => {
                                      const updatedFeatures = [...aboutContent.intro.features]
                                      updatedFeatures[index].title = e.target.value
                                      setAboutContent({
                                        ...aboutContent,
                                        intro: { ...aboutContent.intro, features: updatedFeatures }
                                      })
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <Textarea
                                    rows={2}
                                    value={feature.description}
                                    onChange={(e) => {
                                      const updatedFeatures = [...aboutContent.intro.features]
                                      updatedFeatures[index].description = e.target.value
                                      setAboutContent({
                                        ...aboutContent,
                                        intro: { ...aboutContent.intro, features: updatedFeatures }
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Vision Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Vision Section</CardTitle>
                    <CardDescription>Manage the vision section content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="vision-badge" className="mb-2 block">Badge</Label>
                        <Input
                          id="vision-badge"
                          value={aboutContent.vision?.badge || ""}
                          onChange={(e) =>
                            setAboutContent({
                              ...aboutContent,
                              vision: { ...aboutContent.vision, badge: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="vision-main-heading" className="mb-2 block">Main Heading</Label>
                        <Input
                          id="vision-main-heading"
                          value={aboutContent.vision?.mainHeading || ""}
                          onChange={(e) =>
                            setAboutContent({
                              ...aboutContent,
                              vision: { ...aboutContent.vision, mainHeading: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="vision-title" className="mb-2 block">Vision Title</Label>
                      <Input
                        id="vision-title"
                        value={aboutContent.vision?.visionTitle || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            vision: { ...aboutContent.vision, visionTitle: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="vision-description" className="mb-2 block">Vision Description</Label>
                      <Textarea
                        id="vision-description"
                        rows={4}
                        value={aboutContent.vision?.visionDescription || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            vision: { ...aboutContent.vision, visionDescription: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Vision Image</Label>
                      <MediaUpload
                        value={aboutContent.vision?.visionImage || ""}
                        onChange={(url) =>
                          setAboutContent({
                            ...aboutContent,
                            vision: { ...aboutContent.vision, visionImage: url },
                          })
                        }
                        accept="image"
                        maxWidth={800}
                        maxHeight={600}
                        aspectRatio="4:3"
                        maxSizeMB={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Mission Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Mission Section</CardTitle>
                    <CardDescription>Manage the mission section content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="mission-title" className="mb-2 block">Mission Title</Label>
                      <Input
                        id="mission-title"
                        value={aboutContent.mission?.missionTitle || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            mission: { ...aboutContent.mission, missionTitle: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="mission-description" className="mb-2 block">Mission Description</Label>
                      <Textarea
                        id="mission-description"
                        rows={4}
                        value={aboutContent.mission?.missionDescription || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            mission: { ...aboutContent.mission, missionDescription: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label>Mission Image</Label>
                      <MediaUpload
                        value={aboutContent.mission?.missionImage || ""}
                        onChange={(url) =>
                          setAboutContent({
                            ...aboutContent,
                            mission: { ...aboutContent.mission, missionImage: url },
                          })
                        }
                        accept="image"
                        maxWidth={800}
                        maxHeight={600}
                        aspectRatio="4:3"
                        maxSizeMB={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Why Us Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Why Choose Us Section</CardTitle>
                    <CardDescription>Manage the why choose us section content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="whyus-badge" className="mb-2 block">Badge</Label>
                        <Input
                          id="whyus-badge"
                          value={aboutContent.whyUs?.badge || ""}
                          onChange={(e) =>
                            setAboutContent({
                              ...aboutContent,
                              whyUs: { ...aboutContent.whyUs, badge: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="whyus-title" className="mb-2 block">Title</Label>
                        <Input
                          id="whyus-title"
                          value={aboutContent.whyUs?.title || ""}
                          onChange={(e) =>
                            setAboutContent({
                              ...aboutContent,
                              whyUs: { ...aboutContent.whyUs, title: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="whyus-description" className="mb-2 block">Description</Label>
                      <Textarea
                        id="whyus-description"
                        rows={3}
                        value={aboutContent.whyUs?.description || ""}
                        onChange={(e) =>
                          setAboutContent({
                            ...aboutContent,
                            whyUs: { ...aboutContent.whyUs, description: e.target.value },
                          })
                        }
                      />
                    </div>


                    <div>
                      <Label className="mb-2 block">Why Us Section Image</Label>
                      <MediaUpload
                        value={aboutContent.whyUs?.image || ""}
                        onChange={(url) =>
                          setAboutContent({
                            ...aboutContent,
                            whyUs: { ...aboutContent.whyUs, image: url },
                          })
                        }
                        accept="image"
                        maxWidth={600}
                        maxHeight={500}
                      />
                    </div>
                    {/* Why Us Features */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Why Choose Us Features</Label>
                        <Button onClick={addWhyUsFeature} size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Feature
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {aboutContent.whyUs?.features?.map((feature, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-medium">Feature {index + 1}</h4>
                              <Button onClick={() => removeWhyUsFeature(index)} size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <Label>Feature Icon</Label>
                                <MediaUpload
                                  value={feature.icon}
                                  onChange={(url) => {
                                    const updatedFeatures = [...aboutContent.whyUs.features]
                                    updatedFeatures[index].icon = url
                                    setAboutContent({
                                      ...aboutContent,
                                      whyUs: { ...aboutContent.whyUs, features: updatedFeatures }
                                    })
                                  }}
                                  accept="image"
                                  maxWidth={64}
                                  maxHeight={64}
                                  aspectRatio="1:1"
                                  maxSizeMB={1}
                                  placeholder="Upload feature icon"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <Label>Title</Label>
                                  <Input
                                    value={feature.title}
                                    onChange={(e) => {
                                      const updatedFeatures = [...aboutContent.whyUs.features]
                                      updatedFeatures[index].title = e.target.value
                                      setAboutContent({
                                        ...aboutContent,
                                        whyUs: { ...aboutContent.whyUs, features: updatedFeatures }
                                      })
                                    }}
                                  />
                                </div>
                                <div>
                                  <Label>Description</Label>
                                  <Textarea
                                    rows={2}
                                    value={feature.description}
                                    onChange={(e) => {
                                      const updatedFeatures = [...aboutContent.whyUs.features]
                                      updatedFeatures[index].description = e.target.value
                                      setAboutContent({
                                        ...aboutContent,
                                        whyUs: { ...aboutContent.whyUs, features: updatedFeatures }
                                      })
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button onClick={saveAboutContent} disabled={saving} size="lg">
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save About Content
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        {/* Contact Page Content */}
        <TabsContent value="contact">
          <div className="space-y-6">
            {contactContent && (
              <>
                {/* Contact Hero Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Page Hero</CardTitle>
                    <CardDescription>Manage the hero section of your contact page</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contact-hero-title" className="mb-2 block">Title</Label>
                        <Input
                          id="contact-hero-title"
                          value={contactContent.hero?.title || ""}
                          onChange={(e) =>
                            setContactContent({
                              ...contactContent,
                              hero: { ...contactContent.hero, title: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="contact-hero-subtitle" className="mb-2 block">Subtitle</Label>
                        <Input
                          id="contact-hero-subtitle"
                          value={contactContent.hero?.subtitle || ""}
                          onChange={(e) =>
                            setContactContent({
                              ...contactContent,
                              hero: { ...contactContent.hero, subtitle: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Hero Background Image</Label>
                      <MediaUpload
                        value={contactContent.hero?.backgroundImage || ""}
                        onChange={(url) =>
                          setContactContent({
                            ...contactContent,
                            hero: { ...contactContent.hero, backgroundImage: url },
                          })
                        }
                        accept="image"
                        maxWidth={1920}
                        maxHeight={1080}
                        aspectRatio="16:9"
                        maxSizeMB={5}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Manage your contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email Info */}
                    <div>
                      <h4 className="text-lg font-medium mb-4">Email Information</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="email-title" className="mb-2 block">Email Title</Label>
                          <Input
                            id="email-title"
                            value={contactContent.contactInfo?.email?.title || ""}
                            onChange={(e) =>
                              setContactContent({
                                ...contactContent,
                                contactInfo: {
                                  ...contactContent.contactInfo,
                                  email: { ...contactContent.contactInfo?.email, title: e.target.value }
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="email-description" className="mb-2 block">Email Description</Label>
                          <Input
                            id="email-description"
                            value={contactContent.contactInfo?.email?.description || ""}
                            onChange={(e) =>
                              setContactContent({
                                ...contactContent,
                                contactInfo: {
                                  ...contactContent.contactInfo,
                                  email: { ...contactContent.contactInfo?.email, description: e.target.value }
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="email-value" className="mb-2 block">Email Address</Label>
                          <Input
                            id="email-value"
                            type="email"
                            value={contactContent.contactInfo?.email?.value || ""}
                            onChange={(e) =>
                              setContactContent({
                                ...contactContent,
                                contactInfo: {
                                  ...contactContent.contactInfo,
                                  email: { ...contactContent.contactInfo?.email, value: e.target.value }
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Phone Info */}
                    <div>
                      <h4 className="text-lg font-medium mb-4">Phone Information</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="phone-title" className="mb-2 block">Phone Title</Label>
                          <Input
                            id="phone-title"
                            value={contactContent.contactInfo?.phone?.title || ""}
                            onChange={(e) =>
                              setContactContent({
                                ...contactContent,
                                contactInfo: {
                                  ...contactContent.contactInfo,
                                  phone: { ...contactContent.contactInfo?.phone, title: e.target.value }
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone-description" className="mb-2 block">Phone Description</Label>
                          <Input
                            id="phone-description"
                            value={contactContent.contactInfo?.phone?.description || ""}
                            onChange={(e) =>
                              setContactContent({
                                ...contactContent,
                                contactInfo: {
                                  ...contactContent.contactInfo,
                                  phone: { ...contactContent.contactInfo?.phone, description: e.target.value }
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone-value" className="mb-2 block">Phone Number</Label>
                          <Input
                            id="phone-value"
                            value={contactContent.contactInfo?.phone?.value || ""}
                            onChange={(e) =>
                              setContactContent({
                                ...contactContent,
                                contactInfo: {
                                  ...contactContent.contactInfo,
                                  phone: { ...contactContent.contactInfo?.phone, value: e.target.value }
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Office Info */}
                    <div>
                      <h4 className="text-lg font-medium mb-4">Office Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="office-title" className="mb-2 block">Office Title</Label>
                          <Input
                            id="office-title"
                            value={contactContent.contactInfo?.office?.title || ""}
                            onChange={(e) =>
                              setContactContent({
                                ...contactContent,
                                contactInfo: {
                                  ...contactContent.contactInfo,
                                  office: { ...contactContent.contactInfo?.office, title: e.target.value }
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="office-address" className="mb-2 block">Office Address</Label>
                          <Textarea
                            id="office-address"
                            rows={3}
                            value={contactContent.contactInfo?.office?.address || ""}
                            onChange={(e) =>
                              setContactContent({
                                ...contactContent,
                                contactInfo: {
                                  ...contactContent.contactInfo,
                                  office: { ...contactContent.contactInfo?.office, address: e.target.value }
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button onClick={saveContactContent} disabled={saving} size="lg">
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Contact Content
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>

        {/* Footer Content */}
        <TabsContent value="footer">
          <div className="space-y-6">
            {footerContent && (
              <>
                {/* Basic Footer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Footer Basic Information</CardTitle>
                    <CardDescription>Manage basic footer content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Footer Logo</Label>
                      <MediaUpload
                        value={footerContent.logo || ""}
                        onChange={(url) =>
                          setFooterContent({
                            ...footerContent,
                            logo: url,
                          })
                        }
                        accept="image"
                        maxWidth={400}
                        maxHeight={200}
                        maxSizeMB={2}
                        placeholder="Upload footer logo"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company-info" className="mb-2 block">Company Information</Label>
                      <Textarea
                        id="company-info"
                        rows={3}
                        value={footerContent.companyInfo || ""}
                        onChange={(e) =>
                          setFooterContent({
                            ...footerContent,
                            companyInfo: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="copyright" className="mb-2 block">Copyright Text</Label>
                      <Input
                        id="copyright"
                        value={footerContent.copyright || ""}
                        onChange={(e) =>
                          setFooterContent({
                            ...footerContent,
                            copyright: e.target.value,
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Product Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Links</CardTitle>
                    <CardDescription>Manage footer product links</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Product Links</Label>
                        <Button onClick={addProductLink} size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Link
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {footerContent.productLinks?.map((link, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-medium">Product Link {index + 1}</h4>
                              <Button onClick={() => removeProductLink(index)} size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Link Name</Label>
                                <Input
                                  value={link.name}
                                  onChange={(e) => {
                                    const updatedLinks = [...footerContent.productLinks]
                                    updatedLinks[index].name = e.target.value
                                    setFooterContent({
                                      ...footerContent,
                                      productLinks: updatedLinks
                                    })
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Link URL</Label>
                                <Input
                                  value={link.href}
                                  onChange={(e) => {
                                    const updatedLinks = [...footerContent.productLinks]
                                    updatedLinks[index].href = e.target.value
                                    setFooterContent({
                                      ...footerContent,
                                      productLinks: updatedLinks
                                    })
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* About Links */}
                <Card>
                  <CardHeader>
                    <CardTitle>About Links</CardTitle>
                    <CardDescription>Manage footer about links</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>About Links</Label>
                        <Button onClick={addAboutLink} size="sm">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Link
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {footerContent.aboutLinks?.map((link, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="text-sm font-medium">About Link {index + 1}</h4>
                              <Button onClick={() => removeAboutLink(index)} size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Link Name</Label>
                                <Input
                                  value={link.name}
                                  onChange={(e) => {
                                    const updatedLinks = [...footerContent.aboutLinks]
                                    updatedLinks[index].name = e.target.value
                                    setFooterContent({
                                      ...footerContent,
                                      aboutLinks: updatedLinks
                                    })
                                  }}
                                />
                              </div>
                              <div>
                                <Label>Link URL</Label>
                                <Input
                                  value={link.href}
                                  onChange={(e) => {
                                    const updatedLinks = [...footerContent.aboutLinks]
                                    updatedLinks[index].href = e.target.value
                                    setFooterContent({
                                      ...footerContent,
                                      aboutLinks: updatedLinks
                                    })
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media & Newsletter */}
                <Card>
                  <CardHeader>
                    <CardTitle>Social Media & Newsletter</CardTitle>
                    <CardDescription>Manage social media links and newsletter settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Social Media */}
                    <div>
                      <h4 className="text-lg font-medium mb-4">Social Media Links</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="facebook" className="mb-2 block">Facebook URL</Label>
                          <Input
                            id="facebook"
                            value={footerContent.socialMedia?.facebook || ""}
                            onChange={(e) =>
                              setFooterContent({
                                ...footerContent,
                                socialMedia: { ...footerContent.socialMedia, facebook: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="twitter" className="mb-2 block">Twitter URL</Label>
                          <Input
                            id="twitter"
                            value={footerContent.socialMedia?.twitter || ""}
                            onChange={(e) =>
                              setFooterContent({
                                ...footerContent,
                                socialMedia: { ...footerContent.socialMedia, twitter: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin" className="mb-2 block">LinkedIn URL</Label>
                          <Input
                            id="linkedin"
                            value={footerContent.socialMedia?.linkedin || ""}
                            onChange={(e) =>
                              setFooterContent({
                                ...footerContent,
                                socialMedia: { ...footerContent.socialMedia, linkedin: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="youtube" className="mb-2 block">YouTube URL</Label>
                          <Input
                            id="youtube"
                            value={footerContent.socialMedia?.youtube || ""}
                            onChange={(e) =>
                              setFooterContent({
                                ...footerContent,
                                socialMedia: { ...footerContent.socialMedia, youtube: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                      <h4 className="text-lg font-medium mb-4">Newsletter Settings</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="newsletter-heading" className="mb-2 block">Newsletter Heading</Label>
                          <Input
                            id="newsletter-heading"
                            value={footerContent.newsletter?.heading || ""}
                            onChange={(e) =>
                              setFooterContent({
                                ...footerContent,
                                newsletter: { ...footerContent.newsletter, heading: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="newsletter-placeholder" className="mb-2 block">Newsletter Placeholder</Label>
                          <Input
                            id="newsletter-placeholder"
                            value={footerContent.newsletter?.placeholder || ""}
                            onChange={(e) =>
                              setFooterContent({
                                ...footerContent,
                                newsletter: { ...footerContent.newsletter, placeholder: e.target.value },
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Footer Contact Information</CardTitle>
                    <CardDescription>Manage contact information shown in footer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="footer-location" className="mb-2 block">Location</Label>
                      <Textarea
                        id="footer-location"
                        rows={2}
                        value={footerContent.contact?.location || ""}
                        onChange={(e) =>
                          setFooterContent({
                            ...footerContent,
                            contact: { ...footerContent.contact, location: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="footer-phone" className="mb-2 block">Phone</Label>
                        <Input
                          id="footer-phone"
                          value={footerContent.contact?.phone || ""}
                          onChange={(e) =>
                            setFooterContent({
                              ...footerContent,
                              contact: { ...footerContent.contact, phone: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="footer-email" className="mb-2 block">Email</Label>
                        <Input
                          id="footer-email"
                          type="email"
                          value={footerContent.contact?.email || ""}
                          onChange={(e) =>
                            setFooterContent({
                              ...footerContent,
                              contact: { ...footerContent.contact, email: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                  <Button onClick={saveFooterContent} disabled={saving} size="lg">
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Footer Content
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
