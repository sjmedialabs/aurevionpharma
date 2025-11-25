## SEO Features

- **Metadata**: Comprehensive meta tags for all pages
- **Structured Data**: JSON-LD for products, organization, and breadcrumbs
- **Sitemap**: Auto-generated XML sitemap at `/sitemap.xml`
- **Robots.txt**: Search engine crawling configuration
- **Open Graph**: Social media sharing optimization
- **Analytics**: Google Analytics integration ready

## Database

The application uses MongoDB for data persistence in production and an in-memory store for development.

### MongoDB Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Set `MONGODB_URI` in your `.env` file
3. Set `USE_MONGODB=true` for production
4. Run seed script to populate database:
   \`\`\`bash
   npm run seed
   \`\`\`

### Data Models

- **Products**: Chemical products with specifications
- **Categories**: Product categories
- **Services**: Laboratory services offered
- **Enquiries**: Customer enquiries and contact forms
- **Content**: CMS content for pages (home, about, contact, footer)

## CMS Features

The admin dashboard includes a comprehensive CMS for managing:

### Home Page Content
- Hero section (title, subtitle, CTA buttons)
- Statistics section
- About preview section
- Process section (4 steps with icons)

### About Page Content
- Hero section
- Company introduction
- Vision and mission statements
- Why choose us section

### Contact Page Content
- Hero section
- Contact information (address, phone, email)
- Business hours

### Footer Content
- Company information
- Navigation links
- Social media links
- Newsletter subscription
- Contact details

### Image Management
All image fields support:
- URL input for external images
- File upload for local images
- Image preview

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for VPS hosting.

### Quick Deployment Steps

1. Set up VPS with Node.js, MongoDB, Nginx, and PM2
2. Clone repository
3. Install dependencies: `npm install`
4. Configure environment variables
5. Seed database: `npm run seed`
6. Build application: `npm run build`
7. Start with PM2: `pm2 start ecosystem.config.js`
8. Configure Nginx as reverse proxy
9. Set up SSL with Let's Encrypt

### Environment Variables

Required for production:
\`\`\`env
# MongoDB
MONGODB_URI=mongodb://user:password@localhost:27017/aurevion
USE_MONGODB=true

# Admin Authentication
ADMIN_USERNAME=your-admin-username
ADMIN_PASSWORD=your-secure-password
SESSION_SECRET=your-secret-key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
\`\`\`

### SEO Configuration

1. Set your site URL in `.env`:
   \`\`\`env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   \`\`\`

2. Add Google Analytics ID (optional):
   \`\`\`env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   \`\`\`

3. The sitemap is automatically generated and available at `/sitemap.xml`
