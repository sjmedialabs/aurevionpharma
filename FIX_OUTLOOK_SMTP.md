# 🔴 URGENT: Outlook SMTP Authentication Fix

## Current Status

✅ **Form Submission**: Working perfectly - enquiries are being saved to database
❌ **Email Sending**: Failing - Outlook rejecting SMTP authentication

## Error Message
```
535 5.7.3 Authentication unsuccessful
```

## The Problem

Outlook.com (Microsoft) has strict security settings that **block SMTP access by default**. 
The password `Waterfal@123` is correct, but Outlook won't allow it to be used for SMTP.

## SOLUTION: Enable SMTP in Outlook Settings

### Step 1: Sign in to Outlook Account
Go to https://outlook.live.com/ and sign in with `sales@aurevionpharma.com`

### Step 2: Enable SMTP Authentication

#### Option A: Enable "Authenticated SMTP" (Recommended)
1. Go to https://outlook.live.com/mail/0/options/mail/accounts
2. Click on "**Sync email**" or "**Connected accounts**"
3. Look for "**POP and IMAP settings**"
4. OR go directly to: Settings → View all Outlook settings → Mail → Sync email → POP and IMAP

5. **Enable**: "Let devices and apps use POP" 
6. **Enable**: "Let devices and apps use SMTP"

#### Option B: Use App Password (If 2FA is enabled)
If you have Two-Factor Authentication enabled:

1. Go to https://account.microsoft.com/security
2. Click "Advanced security options"
3. Under "App passwords", click "Create a new app password"
4. Name it "Website Email Service"
5. Copy the generated password (format: xxxx-xxxx-xxxx-xxxx)

Then update the ecosystem config:
```bash
nano /www/wwwroot/aurevion/ecosystem.config.js
```

Replace:
```javascript
SMTP_PASS: 'Waterfal@123'
```

With:
```javascript
SMTP_PASS: 'your-app-password-here'
```

Restart:
```bash
pm2 restart aurevion-pharma
pm2 save
```

### Step 3: Check if Account is Locked
Sometimes Outlook locks accounts after failed SMTP attempts:

1. Sign in to https://outlook.live.com/
2. Check for any security alerts
3. If prompted, verify your identity
4. Check if you can send emails manually

### Step 4: Alternative - Use Office 365 Settings
If this is a business account (Office 365), the SMTP settings might be different:

**For Office 365/Microsoft 365:**
- Host: `smtp.office365.com`
- Port: `587`
- TLS: Yes

Update ecosystem.config.js:
```javascript
SMTP_HOST: 'smtp.office365.com',  // Instead of smtp-mail.outlook.com
SMTP_PORT: '587',
SMTP_USER: 'sales@aurevionpharma.com',
SMTP_PASS: 'Waterfal@123'
```

## Quick Test After Enabling SMTP

After enabling SMTP in Outlook settings:

1. **Restart the application**:
   ```bash
   pm2 restart aurevion-pharma
   ```

2. **Watch logs**:
   ```bash
   pm2 logs aurevion-pharma
   ```

3. **Submit a test enquiry** on the website

4. **Look for success**:
   ```
   ✅ Auto-reply email sent: <message-id>
   ✅ Admin notification email sent to: sales@aurevionpharma.com
   ```

## If Still Not Working

### Try This Alternative: Use Gmail Instead

Since you have `sudheer@sjmedialabs.com` working with Gmail, you could use that temporarily:

```bash
nano /www/wwwroot/aurevion/ecosystem.config.js
```

Change to:
```javascript
env: {
  NODE_ENV: 'production',
  
  // Gmail SMTP (Working Alternative)
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: '587',
  SMTP_USER: 'sudheer@sjmedialabs.com',
  SMTP_PASS: 'mjoicoozoifsutnu'
}
```

**BUT** remember: emails will show as FROM "sales@aurevionpharma.com" but authenticated with Gmail. This works but isn't ideal long-term.

## Summary

**The form works fine!** Enquiries are being saved. We just need to:
1. Enable SMTP in Outlook.com settings
2. OR use an app password if 2FA is enabled
3. OR try smtp.office365.com if it's a business account
4. OR fall back to Gmail temporarily

## Commands to Remember

Check current SMTP settings:
```bash
pm2 env 69 | grep SMTP
```

Restart after changes:
```bash
pm2 restart aurevion-pharma && pm2 save
```

Watch logs in real-time:
```bash
pm2 logs aurevion-pharma
```

View database enquiries (to confirm form is working):
```bash
# Enquiries are being saved even if email fails!
```

---

**Good News**: The form submission is working perfectly. The email issue is just an Outlook security setting that needs to be enabled.
