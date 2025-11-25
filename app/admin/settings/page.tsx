"use client"
import { PageHeader } from "@/components/admin/page-header"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2, Save } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { MediaUpload } from "@/components/admin/media-upload"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Settings {
  seo: {
    siteName: string
    siteDescription: string
    siteUrl: string
    ogImage: string
    twitterHandle: string
    keywords: string[]
    pages: {
      home: { title: string; description: string; keywords: string[] }
      about: { title: string; description: string; keywords: string[] }
      products: { title: string; description: string; keywords: string[] }
      services: { title: string; description: string; keywords: string[] }
      contact: { title: string; description: string; keywords: string[] }
    }
  }
  branding: {
    websiteLogo: string
    websiteFavicon: string
    dashboardLogo: string
    dashboardFavicon: string
    colors: { primary: string; secondary: string }
    fonts: {
      primaryFont: string
      secondaryFont: string
      paragraphFont: string
      fontSource: "google" | "upload"
      googleFontUrl?: string
      uploadedFonts?: { name: string; url: string }[]
      sizes: { h1: string; h2: string; h3: string; h4: string; h5: string; h6: string; paragraph: string }
    }
  }
  company: {
    name: string
    address: { street: string; city: string; state: string; zipCode: string; country: string }
    phone: string
    email: string
    socialMedia: { facebook?: string; twitter?: string; linkedin?: string; youtube?: string; instagram?: string }
  }
}

const defaultSettings: Settings = {
  seo: {
    siteName: "Aurevion Pharmatech Pvt Ltd",
    siteDescription: "Leading pharmaceutical company specializing in high-quality APIs, CMO, CDMO, and partnering services for global pharma needs.",
    siteUrl: "https://aurevion.com",
    ogImage: "/og-image.jpg",
    twitterHandle: "@aurevion",
    keywords: ["pharmaceutical", "APIs", "active pharmaceutical ingredients", "CMO", "CDMO", "contract manufacturing"],
    pages: {
      home: { title: "Home", description: "", keywords: [] },
      about: { title: "About Us", description: "", keywords: [] },
      products: { title: "Products", description: "", keywords: [] },
      services: { title: "Services", description: "", keywords: [] },
      contact: { title: "Contact Us", description: "", keywords: [] }
    }
  },
  branding: {
    websiteLogo: "/logo.png",
    websiteFavicon: "/favicon.ico",
    dashboardLogo: "/logo.png",
    dashboardFavicon: "/favicon.ico",
    colors: { primary: "#2563eb", secondary: "#1e40af" },
    fonts: {
      primaryFont: "Poppins",
      secondaryFont: "Inter",
      paragraphFont: "Poppins",
      fontSource: "google",
      googleFontUrl: "",
      uploadedFonts: [],
      sizes: { h1: "3rem", h2: "2.5rem", h3: "2rem", h4: "1.5rem", h5: "1.25rem", h6: "1rem", paragraph: "1rem" }
    }
  },
  company: {
    name: "Aurevion Pharmatech Pvt Ltd",
    address: { street: "123 Pharma Street", city: "Mumbai", state: "Maharashtra", zipCode: "400001", country: "IN" },
    phone: "+91-22-1234-5678",
    email: "info@aurevion.com",
    socialMedia: { facebook: "", twitter: "https://twitter.com/aurevion", linkedin: "https://linkedin.com/company/aurevion", youtube: "", instagram: "" }
  }
}

function mergeWithDefaults(data: any): Settings {
  return {
    seo: {
      siteName: data?.seo?.siteName || defaultSettings.seo.siteName,
      siteDescription: data?.seo?.siteDescription || defaultSettings.seo.siteDescription,
      siteUrl: data?.seo?.siteUrl || defaultSettings.seo.siteUrl,
      ogImage: data?.seo?.ogImage || defaultSettings.seo.ogImage,
      twitterHandle: data?.seo?.twitterHandle || defaultSettings.seo.twitterHandle,
      keywords: data?.seo?.keywords || defaultSettings.seo.keywords,
      pages: {
        home: data?.seo?.pages?.home || defaultSettings.seo.pages.home,
        about: data?.seo?.pages?.about || defaultSettings.seo.pages.about,
        products: data?.seo?.pages?.products || defaultSettings.seo.pages.products,
        services: data?.seo?.pages?.services || defaultSettings.seo.pages.services,
        contact: data?.seo?.pages?.contact || defaultSettings.seo.pages.contact
      }
    },
    branding: {
      websiteLogo: data?.branding?.websiteLogo || defaultSettings.branding.websiteLogo,
      websiteFavicon: data?.branding?.websiteFavicon || defaultSettings.branding.websiteFavicon,
      dashboardLogo: data?.branding?.dashboardLogo || defaultSettings.branding.dashboardLogo,
      dashboardFavicon: data?.branding?.dashboardFavicon || defaultSettings.branding.dashboardFavicon,
      colors: {
        primary: data?.branding?.colors?.primary || defaultSettings.branding.colors.primary,
        secondary: data?.branding?.colors?.secondary || defaultSettings.branding.colors.secondary
      },
      fonts: {
        primaryFont: data?.branding?.fonts?.primaryFont || defaultSettings.branding.fonts.primaryFont,
        secondaryFont: data?.branding?.fonts?.secondaryFont || defaultSettings.branding.fonts.secondaryFont,
        paragraphFont: data?.branding?.fonts?.paragraphFont || defaultSettings.branding.fonts.paragraphFont,
        fontSource: data?.branding?.fonts?.fontSource || defaultSettings.branding.fonts.fontSource,
        googleFontUrl: data?.branding?.fonts?.googleFontUrl || defaultSettings.branding.fonts.googleFontUrl,
        uploadedFonts: data?.branding?.fonts?.uploadedFonts || defaultSettings.branding.fonts.uploadedFonts,
        sizes: {
          h1: data?.branding?.fonts?.sizes?.h1 || defaultSettings.branding.fonts.sizes.h1,
          h2: data?.branding?.fonts?.sizes?.h2 || defaultSettings.branding.fonts.sizes.h2,
          h3: data?.branding?.fonts?.sizes?.h3 || defaultSettings.branding.fonts.sizes.h3,
          h4: data?.branding?.fonts?.sizes?.h4 || defaultSettings.branding.fonts.sizes.h4,
          h5: data?.branding?.fonts?.sizes?.h5 || defaultSettings.branding.fonts.sizes.h5,
          h6: data?.branding?.fonts?.sizes?.h6 || defaultSettings.branding.fonts.sizes.h6,
          paragraph: data?.branding?.fonts?.sizes?.paragraph || defaultSettings.branding.fonts.sizes.paragraph
        }
      }
    },
    company: {
      name: data?.company?.name || defaultSettings.company.name,
      address: {
        street: data?.company?.address?.street || defaultSettings.company.address.street,
        city: data?.company?.address?.city || defaultSettings.company.address.city,
        state: data?.company?.address?.state || defaultSettings.company.address.state,
        zipCode: data?.company?.address?.zipCode || defaultSettings.company.address.zipCode,
        country: data?.company?.address?.country || defaultSettings.company.address.country
      },
      phone: data?.company?.phone || defaultSettings.company.phone,
      email: data?.company?.email || defaultSettings.company.email,
      socialMedia: {
        facebook: data?.company?.socialMedia?.facebook || defaultSettings.company.socialMedia.facebook,
        twitter: data?.company?.socialMedia?.twitter || defaultSettings.company.socialMedia.twitter,
        linkedin: data?.company?.socialMedia?.linkedin || defaultSettings.company.socialMedia.linkedin,
        youtube: data?.company?.socialMedia?.youtube || defaultSettings.company.socialMedia.youtube,
        instagram: data?.company?.socialMedia?.instagram || defaultSettings.company.socialMedia.instagram
      }
    }
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      if (!response.ok) throw new Error("Failed to fetch settings")
      const data = await response.json()
      const mergedSettings = mergeWithDefaults(data)
      setSettings(mergedSettings)
    } catch (error) {
      toast.error("Failed to load settings")
      console.error(error)
      setSettings(defaultSettings)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return
    setSaving(true)
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (!response.ok) throw new Error("Failed to save settings")
      toast.success("Settings saved successfully")
    } catch (error) {
      toast.error("Failed to save settings")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!settings) return <div className="p-8">Failed to load settings</div>

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your website configuration"
        onSave={handleSave}
        isSaving={saving}
      />
      <div className="p-8">
      <Tabs defaultValue="seo" className="space-y-4">
        <TabsList>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>

        <TabsContent value="seo" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General SEO Settings</CardTitle>
              <CardDescription>Configure site-wide SEO metadata</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.seo.siteName}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, siteName: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL</Label>
                  <Input
                    id="siteUrl"
                    value={settings.seo.siteUrl}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, siteUrl: e.target.value } })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.seo.siteDescription}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, siteDescription: e.target.value } })}
                  rows={3}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>OG Image</Label>
                  <MediaUpload
                    value={settings.seo.ogImage}
                    onChange={(url) => setSettings({ ...settings, seo: { ...settings.seo, ogImage: url } })}
                    accept="image"
                    maxWidth={1200}
                    maxHeight={630}
                    aspectRatio="1.91:1"
                    maxSizeMB={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitterHandle">Twitter Handle</Label>
                  <Input
                    id="twitterHandle"
                    value={settings.seo.twitterHandle}
                    onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, twitterHandle: e.target.value } })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Textarea
                  id="keywords"
                  value={settings.seo.keywords.join(", ")}
                  onChange={(e) => setSettings({ ...settings, seo: { ...settings.seo, keywords: e.target.value.split(",").map(k => k.trim()) } })}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {(["home", "about", "products", "services", "contact"] as const).map((page) => (
            <Card key={page}>
              <CardHeader>
                <CardTitle className="capitalize">{page} Page SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={settings.seo.pages[page].title}
                    onChange={(e) => setSettings({
                      ...settings,
                      seo: {
                        ...settings.seo,
                        pages: {
                          ...settings.seo.pages,
                          [page]: { ...settings.seo.pages[page], title: e.target.value }
                        }
                      }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={settings.seo.pages[page].description}
                    onChange={(e) => setSettings({
                      ...settings,
                      seo: {
                        ...settings.seo,
                        pages: {
                          ...settings.seo.pages,
                          [page]: { ...settings.seo.pages[page], description: e.target.value }
                        }
                      }
                    })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Keywords (comma-separated)</Label>
                  <Input
                    value={settings.seo.pages[page].keywords.join(", ")}
                    onChange={(e) => setSettings({
                      ...settings,
                      seo: {
                        ...settings.seo,
                        pages: {
                          ...settings.seo.pages,
                          [page]: { ...settings.seo.pages[page], keywords: e.target.value.split(",").map(k => k.trim()) }
                        }
                      }
                    })}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logos & Favicons</CardTitle>
              <CardDescription>Upload your brand assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Website Logo</Label>
                  <MediaUpload
                    value={settings.branding.websiteLogo}
                    onChange={(url) => setSettings({ ...settings, branding: { ...settings.branding, websiteLogo: url } })}
                    accept="image"
                    maxWidth={500}
                    maxHeight={200}
                    maxSizeMB={2}
                    placeholder="Upload website logo"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Website Favicon</Label>
                  <MediaUpload
                    value={settings.branding.websiteFavicon}
                    onChange={(url) => setSettings({ ...settings, branding: { ...settings.branding, websiteFavicon: url } })}
                    accept="image"
                    maxWidth={64}
                    maxHeight={64}
                    aspectRatio="1:1"
                    maxSizeMB={1}
                    uploadType="icon"
                    placeholder="Upload favicon (32x32 or 64x64)"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dashboard Logo</Label>
                  <MediaUpload
                    value={settings.branding.dashboardLogo}
                    onChange={(url) => setSettings({ ...settings, branding: { ...settings.branding, dashboardLogo: url } })}
                    accept="image"
                    maxWidth={500}
                    maxHeight={200}
                    maxSizeMB={2}
                    placeholder="Upload dashboard logo"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Dashboard Favicon</Label>
                  <MediaUpload
                    value={settings.branding.dashboardFavicon}
                    onChange={(url) => setSettings({ ...settings, branding: { ...settings.branding, dashboardFavicon: url } })}
                    accept="image"
                    maxWidth={64}
                    maxHeight={64}
                    aspectRatio="1:1"
                    maxSizeMB={1}
                    uploadType="icon"
                    placeholder="Upload dashboard favicon"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={settings.branding.colors.primary}
                      onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, colors: { ...settings.branding.colors, primary: e.target.value } } })}
                      className="w-20"
                    />
                    <Input
                      value={settings.branding.colors.primary}
                      onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, colors: { ...settings.branding.colors, primary: e.target.value } } })}
                      placeholder="#2563eb"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={settings.branding.colors.secondary}
                      onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, colors: { ...settings.branding.colors, secondary: e.target.value } } })}
                      className="w-20"
                    />
                    <Input
                      value={settings.branding.colors.secondary}
                      onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, colors: { ...settings.branding.colors, secondary: e.target.value } } })}
                      placeholder="#1e40af"
                    />
                  </div>
                </div>
              </div>
                <div>
                  <Label htmlFor="primaryTextColor">Primary Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryTextColor"
                      type="color"
                      value={settings.branding.colors.primaryTextColor || "#000000"}
                      onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, colors: { ...settings.branding.colors, primaryTextColor: e.target.value } } })}
                      className="w-20"
                    />
                    <Input
                      value={settings.branding.colors.primaryTextColor || "#000000"}
                      onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, colors: { ...settings.branding.colors, primaryTextColor: e.target.value } } })}
                      placeholder="#000000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="secondaryTextColor">Secondary Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryTextColor"
                      type="color"
                      value={settings.branding.colors.secondaryTextColor || "#333333"}
                      onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, colors: { ...settings.branding.colors, secondaryTextColor: e.target.value } } })}
                      className="w-20"
                    />
                    <Input
                      value={settings.branding.colors.secondaryTextColor || "#333333"}
                      onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, colors: { ...settings.branding.colors, secondaryTextColor: e.target.value } } })}
                      placeholder="#333333"
                    />
                  </div>
                </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography</CardTitle>
              <CardDescription>Configure fonts and sizes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Label>Font Source</Label>
                <RadioGroup
                  value={settings.branding.fonts.fontSource}
                  onValueChange={(value: "google" | "upload") => setSettings({
                    ...settings,
                    branding: {
                      ...settings.branding,
                      fonts: { ...settings.branding.fonts, fontSource: value }
                    }
                  })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="google" id="google" />
                    <Label htmlFor="google" className="font-normal">Google Fonts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="upload" />
                    <Label htmlFor="upload" className="font-normal">Upload Custom Fonts</Label>
                  </div>
                </RadioGroup>
              </div>

              {settings.branding.fonts.fontSource === "google" && (
                <div className="space-y-2">
                  <Label htmlFor="googleFontUrl">Google Font URL</Label>
                  <Input
                    id="googleFontUrl"
                    value={settings.branding.fonts.googleFontUrl || ""}
                    onChange={(e) => setSettings({
                      ...settings,
                      branding: {
                        ...settings.branding,
                        fonts: { ...settings.branding.fonts, googleFontUrl: e.target.value }
                      }
                    })}
                    placeholder="https://fonts.googleapis.com/css2?family=..."
                  />
                  <p className="text-sm text-gray-500">
                    Get font URL from{" "}
                    <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      Google Fonts
                    </a>
                  </p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="primaryFont">Primary Font</Label>
                  <Input
                    id="primaryFont"
                    value={settings.branding.fonts.primaryFont}
                    onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, fonts: { ...settings.branding.fonts, primaryFont: e.target.value } } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryFont">Secondary Font</Label>
                  <Input
                    id="secondaryFont"
                    value={settings.branding.fonts.secondaryFont}
                    onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, fonts: { ...settings.branding.fonts, secondaryFont: e.target.value } } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paragraphFont">Paragraph Font</Label>
                  <Input
                    id="paragraphFont"
                    value={settings.branding.fonts.paragraphFont}
                    onChange={(e) => setSettings({ ...settings, branding: { ...settings.branding, fonts: { ...settings.branding.fonts, paragraphFont: e.target.value } } })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Font Sizes</Label>
                <div className="grid gap-4 md:grid-cols-4">
                  {(["h1", "h2", "h3", "h4", "h5", "h6", "paragraph"] as const).map((size) => (
                    <div key={size} className="space-y-1">
                      <Label className="text-xs uppercase">{size}</Label>
                      <Input
                        value={settings.branding.fonts.sizes[size]}
                        onChange={(e) => setSettings({
                          ...settings,
                          branding: {
                            ...settings.branding,
                            fonts: {
                              ...settings.branding.fonts,
                              sizes: { ...settings.branding.fonts.sizes, [size]: e.target.value }
                            }
                          }
                        })}
                        placeholder="2rem"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Basic company details displayed on contact page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings.company.name}
                  onChange={(e) => setSettings({ ...settings, company: { ...settings.company, name: e.target.value } })}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={settings.company.phone}
                    onChange={(e) => setSettings({ ...settings, company: { ...settings.company, phone: e.target.value } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.company.email}
                    onChange={(e) => setSettings({ ...settings, company: { ...settings.company, email: e.target.value } })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  value={settings.company.address.street}
                  onChange={(e) => setSettings({ ...settings, company: { ...settings.company, address: { ...settings.company.address, street: e.target.value } } })}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={settings.company.address.city}
                    onChange={(e) => setSettings({ ...settings, company: { ...settings.company, address: { ...settings.company.address, city: e.target.value } } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={settings.company.address.state}
                    onChange={(e) => setSettings({ ...settings, company: { ...settings.company, address: { ...settings.company.address, state: e.target.value } } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input
                    id="zipCode"
                    value={settings.company.address.zipCode}
                    onChange={(e) => setSettings({ ...settings, company: { ...settings.company, address: { ...settings.company.address, zipCode: e.target.value } } })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={settings.company.address.country}
                    onChange={(e) => setSettings({ ...settings, company: { ...settings.company, address: { ...settings.company.address, country: e.target.value } } })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {(["facebook", "twitter", "linkedin", "youtube", "instagram"] as const).map((platform) => (
                  <div key={platform} className="space-y-2">
                    <Label className="capitalize">{platform}</Label>
                    <Input
                      value={settings.company.socialMedia[platform] || ""}
                      onChange={(e) => setSettings({
                        ...settings,
                        company: {
                          ...settings.company,
                          socialMedia: { ...settings.company.socialMedia, [platform]: e.target.value }
                        }
                      })}
                      placeholder={`https://${platform}.com/yourcompany`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </>
  )
}
