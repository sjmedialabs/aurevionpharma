# Brand Colors Implementation Guide

## Overview
The website now uses dynamic brand colors that can be configured from the admin settings panel. All hardcoded colors have been replaced with CSS variables that automatically update based on the settings.

## Brand Color Configuration

### Admin Settings
Navigate to `/admin/settings` to configure:
- **Primary Color**: Main brand color (default: #4384C5)
- **Secondary Color**: Secondary brand color (default: #053C74)

### How It Works
1. Colors are stored in the Settings model (`branding.colors.primary` and `branding.colors.secondary`)
2. The API endpoint `/api/settings` returns these colors
3. The root layout (`app/layout.tsx`) sets CSS custom properties:
   - `--color-primary`
   - `--color-secondary`
4. All components use these CSS variables for styling

## Using Brand Colors

### In CSS/Tailwind Classes
Use the pre-defined utility classes:

```tsx
// Backgrounds
<div className="bg-brand-primary">...</div>
<div className="bg-brand-secondary">...</div>

// Text Colors
<span className="text-brand-primary">...</span>
<span className="text-brand-secondary">...</span>

// Borders
<div className="border-brand-primary border-2">...</div>

// Hover States
<button className="bg-brand-primary hover:bg-brand-primary">...</button>
```

### In Inline Styles
Use CSS variables directly:

```tsx
<div style={{ backgroundColor: "var(--color-primary)" }}>...</div>
<h1 style={{ color: "var(--color-primary)" }}>...</h1>
<button style={{ borderColor: "var(--color-primary)" }}>...</button>
```

### With React Context (Optional)
Use the `useBrandColors` hook if needed:

```tsx
import { useBrandColors } from "@/components/providers/brand-colors-provider"

function MyComponent() {
  const { colors, isLoading } = useBrandColors()
  
  return (
    <div style={{ backgroundColor: colors.primary }}>
      {/* Content */}
    </div>
  )
}
```

## Replaced Colors

The following hardcoded colors have been replaced:
- `#4384C5` → `var(--color-primary)` - Primary blue
- `#053C74` → `var(--color-secondary)` - Dark blue
- `#141570` → `var(--color-primary)` - Dark blue text

## Testing Brand Colors

1. Go to `/admin/settings`
2. Change the Primary and Secondary colors
3. Save settings
4. Reload the website to see changes applied across:
   - Header and navigation
   - Buttons and CTAs
   - Section backgrounds
   - Text highlights
   - Borders and accents
   - Hover states

## Files Modified

- `app/api/settings/route.ts` - Returns brand colors
- `app/globals.css` - Added brand color utility classes
- `components/providers/brand-colors-provider.tsx` - React context for colors
- All component files - Replaced hardcoded colors with CSS variables

## Fallback Colors

If settings are not configured or fail to load, the system falls back to:
- Primary: #4384C5 (Blue)
- Secondary: #053C74 (Dark Blue)
