# ✅ GoDaddy Email Configured!

## Current Configuration

Since `sales@aurevionpharma.com` is a **GoDaddy email** (purchased from GoDaddy.in), I've updated the configuration to use GoDaddy's SMTP servers.

### SMTP Settings:
- **Host**: `smtpout.secureserver.net` (GoDaddy SMTP)
- **Port**: `465` (SSL)
- **Email**: `sales@aurevionpharma.com`
- **Password**: `Waterfal@123`

### Email Flow:
✅ **Sender**: `sales@aurevionpharma.com`  
✅ **Admin Notifications**: `sales@aurevionpharma.com` (cc: sudheer@sjmedialabs.com)  
✅ **Customer Confirmations**: From `sales@aurevionpharma.com`  

## Status
✅ Application running on port 8142  
✅ MongoDB connected  
✅ GoDaddy SMTP configured  
🔄 Ready to test

## Test the Email Now!

### Step 1: Watch the Logs
Open a terminal and run:
```bash
pm2 logs aurevion-pharma
```

### Step 2: Submit a Test Enquiry
1. Go to your website
2. Click "Enquiry Now" in the navbar
3. Fill out the form and submit

### Step 3: Check for Success
You should see in the logs:
```
✅ Email service configured (smtpout.secureserver.net:465, secure: true)
✅ Auto-reply email sent: <message-id>
✅ Admin notification email sent to: sales@aurevionpharma.com, cc: sudheer@sjmedialabs.com
```

### Step 4: Verify Emails
Check your inbox at `sales@aurevionpharma.com` for:
1. **Admin notification** - New enquiry details
2. **Test customer email** - Confirmation message

## If It Still Doesn't Work

GoDaddy sometimes requires additional steps:

### Option 1: Check GoDaddy Email Settings
1. Log in to https://email.godaddy.com/
2. Sign in with `sales@aurevionpharma.com` / `Waterfal@123`
3. Check if there are any security blocks or alerts
4. Make sure the email account is active

### Option 2: Try Alternate Port
If port 465 doesn't work, try port 587:

```bash
nano /www/wwwroot/aurevion/ecosystem.config.js
```

Change:
```javascript
SMTP_HOST: 'smtpout.secureserver.net',
SMTP_PORT: '587',  // Change from 465
```

Restart:
```bash
pm2 restart aurevion-pharma
```

### Option 3: Enable "Less Secure Apps" in GoDaddy
Some GoDaddy accounts require you to enable SMTP access:
1. Go to https://account.godaddy.com/
2. Navigate to Email settings
3. Look for SMTP or "Access for other clients" settings
4. Enable if disabled

## Verify Current Settings

Check what's loaded:
```bash
pm2 env 70 | grep SMTP
```

Should show:
```
SMTP_HOST: smtpout.secureserver.net
SMTP_PORT: 465
SMTP_USER: sales@aurevionpharma.com
SMTP_PASS: Waterfal@123
```

## Important Notes

1. **Form works!** - Enquiries are being saved even if emails fail
2. **GoDaddy SMTP** - Using correct server for your email provider
3. **Password** - Using your actual GoDaddy email password
4. **SSL enabled** - Port 465 uses secure SSL connection

## Next Steps

1. Submit a test enquiry now
2. Watch the logs for success messages
3. Check your email inbox
4. If it fails, let me know the error message and I'll help troubleshoot

---

**Ready to test!** Go ahead and submit an enquiry form on your website.
