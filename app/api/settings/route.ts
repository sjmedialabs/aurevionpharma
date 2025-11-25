import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db/mongodb"
import { SettingsModel } from "@/lib/db/models/Settings"

export async function GET() {
  try {
    await connectDB()
    let settings = await SettingsModel.findOne()
    if (!settings) {
      return NextResponse.json({
        company: {
          name: "Aurevion Pharmatech Pvt Ltd",
          address: {
            street: "123 Pharma Street",
            city: "Mumbai",
            state: "Maharashtra",
            zipCode: "400001",
            country: "IN"
          },
          phone: "+91-22-1234-5678",
          email: "info@aurevion.com",
          socialMedia: {
            facebook: "",
            twitter: "https://twitter.com/aurevion",
            linkedin: "https://linkedin.com/company/aurevion",
            youtube: "",
            instagram: ""
          }
        },
        branding: {
          colors: {
            primary: "#4384C5",
            secondary: "#053C74"
          }
        }
      })
    }
    return NextResponse.json({ 
      company: settings.company,
      branding: {
        colors: settings.branding.colors
      }
    })
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}
