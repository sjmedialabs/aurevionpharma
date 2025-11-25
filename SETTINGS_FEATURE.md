# Settings Feature Documentation

## Overview
A comprehensive settings management system has been added to the Aurevion admin dashboard.

## Features Implemented

### 1. SEO Settings
- **Global SEO Configuration:**
  - Site Name
  - Site Description
  - Site URL
  - OG Image Path
  - Twitter Handle
  - Default Keywords

- **Page-wise SEO:**
  - Individual meta titles, descriptions, and keywords for:
    - Home page
    - About page
    - Products page
    - Services page
    - Contact page

### 2. Branding Settings
- **Logo & Favicon Management:**
  - Website Logo (path)
  - Website Favicon (path)
  - Dashboard Logo (path)
  - Dashboard Favicon (path)

- **Brand Colors:**
  - Primary Color (color picker)
  - Secondary Color (color picker)

- **Typography:**
  - Primary Font
  - Secondary Font
  - Paragraph Font
  - Font Sizes for: H1, H2, H3, H4, H5, H6, Paragraph

### 3. Company Information
- **Basic Details:**
  - Company Name
  - Phone Number
  - Email Address

- **Address:**
  - Street Address
  - City
  - State
  - Zip Code
  - Country

- **Social Media:**
  - Facebook
  - Twitter
  - LinkedIn
  - YouTube
  - Instagram

## Files Created

1. **Database Model:**
   - `/lib/db/models/Settings.ts` - Mongoose schema for settings

2. **API Routes:**
   - `/app/api/admin/settings/route.ts` - GET and PUT endpoints

3. **Admin Page:**
   - `/app/admin/settings/page.tsx` - Full-featured settings management UI

4. **Navigation:**
   - Updated `/components/admin/admin-sidebar.tsx` - Added Settings link

## How to Use

1. **Access Settings:**
   - Navigate to admin dashboard
   - Click on "Settings" in the sidebar

2. **Configure Settings:**
   - Use the tabs to switch between SEO, Branding, and Company sections
   - Fill in or update the fields as needed
   - Click "Save Changes" to persist updates

3. **API Endpoints:**
   - `GET /api/admin/settings` - Fetch current settings
   - `PUT /api/admin/settings` - Update settings (requires authentication)

## Database

The settings are stored in MongoDB with a single document. If no settings exist, default values are automatically created on first access.

## Future Enhancements

Consider adding:
- Media upload functionality for logos and favicons
- Preview feature to see changes before saving
- Export/Import settings functionality
- Backup/restore capability
- Dynamic theme application based on brand colors

## Notes

- Settings are protected by authentication (admin only)
- All changes take effect immediately after saving
- Default values are provided for all fields
- The system creates initial settings automatically if none exist
