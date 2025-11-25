# Email Auto-Reply Setup Guide

The Aurevion Pharmaceuticals website now includes an automated email system that sends welcome messages and admin notifications when users submit enquiries.

## Features

### ✨ Customer Auto-Reply Emails
- **Personalized welcome messages** based on enquiry type
- **Professional email templates** with company branding
- **Type-specific content** for different enquiry types:
  - **Product Enquiries**: API-specific information and next steps
  - **General Product Enquiries**: Product information and guidance
  - **General Enquiries**: General assistance and contact information

### 📧 Admin Notifications
- **Instant notifications** to admin when new enquiries are received
- **Detailed enquiry information** including customer details and messages
- **Quick action reminders** to respond within 24 hours

## Email Configuration

### Using Gmail SMTP (Recommended)

1. **Enable 2-Factor Authentication** in your Gmail account
2. **Generate an App Password**:
   - Go to Google Account Settings > Security
   - Select "2-step verification" > "App passwords"
   - Generate a new app password for "Mail"
3. **Update Environment Variables** in `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-generated-app-password
```

### Using Custom Email Server

If you have your own email server, update these settings:

```env
SMTP_HOST=mail.your-domain.com
SMTP_PORT=587  # or 465 for SSL
SMTP_USER=info@aurevionpharma.com
SMTP_PASS=your-email-password
```

## Email Templates

### Customer Auto-Reply Features:
- **Company branding** with logo
- **Personalized greeting** with customer name
- **Enquiry confirmation** with submitted details
- **Response timeline** (24 hours)
- **Next steps information** specific to enquiry type
- **Contact information** for immediate assistance
- **Professional footer** with company details

### Admin Notification Features:
- **Urgent notification** styling
- **Complete customer information** with clickable links
- **Enquiry type and timestamp**
- **Product details** (if applicable)
- **Customer message** content
- **Action required** reminder

## Enquiry Types and Responses

### 1. Product Enquiry (`type: "product"`)
**Subject**: "Thank You for Your API Enquiry - Aurevion Pharmaceuticals"
**Content**: API-specific information, regulatory assistance, quotation process

### 2. General Product Enquiry (`type: "general_product"`)
**Subject**: "Thank You for Your Product Enquiry - Aurevion Pharmaceuticals"
**Content**: Product information, specifications, ordering process

### 3. General Enquiry (`type: "general"`)
**Subject**: "Thank You for Contacting Aurevion Pharmaceuticals"
**Content**: General assistance, contact information, response timeline

## Testing the Email System

### Test without Email Configuration
- The system will log warnings but continue to work
- Enquiries will still be saved to the database
- No emails will be sent

### Test with Email Configuration
1. Configure SMTP settings in `.env.local`
2. Restart the application: `pm2 restart aurevion-pharma`
3. Submit a test enquiry through the website
4. Check the application logs: `pm2 logs aurevion-pharma`
5. Verify email delivery in the configured email account

## Troubleshooting

### Common Issues:

1. **Gmail Authentication Error**
   - Ensure 2-factor authentication is enabled
   - Use app password, not regular password
   - Check that "Less secure app access" is disabled (use app passwords instead)

2. **Email Not Sending**
   - Check SMTP settings in `.env.local`
   - Verify network connectivity
   - Check PM2 logs for error messages

3. **Emails Going to Spam**
   - Consider using a professional email domain
   - Add SPF/DKIM records for your domain
   - Test with different email providers

### Debugging Commands:
```bash
# Check application logs
pm2 logs aurevion-pharma

# Check email configuration (without revealing passwords)
pm2 env aurevion-pharma | grep SMTP

# Restart after configuration changes
pm2 restart aurevion-pharma
```

## Email Service Status

The email service is **gracefully degraded**, meaning:
- ✅ The website continues to work even without email configuration
- ✅ Enquiries are always saved to the database
- ✅ Users see success messages regardless of email status
- ⚠️ Email failures are logged but don't affect user experience

## Future Enhancements

Consider these improvements:
- **Email templates editor** in admin panel
- **Email analytics** and delivery tracking
- **Multiple language support** for auto-replies
- **Email scheduling** for follow-up messages
- **Integration with CRM systems**

---

**Note**: For production use, consider using professional email services like SendGrid, Mailgun, or AWS SES for better deliverability and analytics.
