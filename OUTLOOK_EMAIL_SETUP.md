# Outlook Email Setup for Aurevion Pharma

## Current Configuration
✅ Email service configured for Outlook/Microsoft 365
✅ Sender: `sales@aurevionpharma.com`
✅ Admin notifications: `sales@aurevionpharma.com` (cc: sudheer@sjmedialabs.com)

## Setup Options for Outlook

### Option 1: Use Regular Password (Simplest)

If you have a simple Outlook account:

1. **Update the password in ecosystem.config.js**:
   ```bash
   nano /www/wwwroot/aurevion/ecosystem.config.js
   ```

2. Replace `YOUR_OUTLOOK_PASSWORD_HERE` with the actual password for `sales@aurevionpharma.com`

3. **Restart the application**:
   ```bash
   pm2 restart aurevion-pharma
   pm2 save
   ```

⚠️ **Important**: If you have 2-Factor Authentication (2FA) enabled on the Outlook account, you CANNOT use the regular password. Use Option 2 instead.

---

### Option 2: Use App Password (If 2FA is enabled)

If your Outlook account has 2-Factor Authentication:

#### Step 1: Generate App Password

1. **Sign in to your Microsoft account**: https://account.microsoft.com/
2. Go to **Security** → **Advanced security options**
3. Under **App passwords**, click **Create a new app password**
4. Copy the generated app password (it will look like: `xxxx-xxxx-xxxx-xxxx`)

#### Step 2: Update Configuration

```bash
nano /www/wwwroot/aurevion/ecosystem.config.js
```

Replace `YOUR_OUTLOOK_PASSWORD_HERE` with the app password:
```javascript
SMTP_PASS: 'xxxx-xxxx-xxxx-xxxx'
```

#### Step 3: Restart

```bash
pm2 restart aurevion-pharma
pm2 save
```

---

### Option 3: OAuth 2.0 for Microsoft 365 (Enterprise - Most Secure)

⚠️ **Note**: This requires a Microsoft 365 Business account and Azure AD setup. Skip this if you have a personal Outlook account.

This is more complex but provides the best security for business accounts.

#### Prerequisites:
- Microsoft 365 Business subscription
- Azure AD admin access
- sales@aurevionpharma.com is a Microsoft 365 account (not free outlook.com)

#### Steps:

1. **Register App in Azure**:
   - Go to https://portal.azure.com/
   - Navigate to "Azure Active Directory" → "App registrations"
   - Click "New registration"
   - Name: "Aurevion Email Service"
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: Leave blank
   - Click "Register"

2. **Configure API Permissions**:
   - Go to "API permissions"
   - Click "Add a permission"
   - Choose "Microsoft Graph"
   - Select "Delegated permissions"
   - Add: `Mail.Send`, `SMTP.Send`
   - Click "Grant admin consent"

3. **Create Client Secret**:
   - Go to "Certificates & secrets"
   - Click "New client secret"
   - Description: "Email Service"
   - Expires: 24 months
   - Click "Add"
   - **Copy the secret value** (you won't see it again)

4. **Update email service code** (contact your developer for this)

**For most users, Option 1 or 2 is sufficient.**

---

## Quick Start (Most Common Scenario)

### If you DON'T have 2FA on sales@aurevionpharma.com:

```bash
nano /www/wwwroot/aurevion/ecosystem.config.js
```

Change this line:
```javascript
SMTP_PASS: 'YOUR_OUTLOOK_PASSWORD_HERE'
```

To (replace with actual password):
```javascript
SMTP_PASS: 'your-actual-password'
```

Save and restart:
```bash
pm2 restart aurevion-pharma
pm2 save
```

### If you DO have 2FA enabled:

1. Generate an app password at https://account.microsoft.com/security
2. Use that app password instead of your regular password

---

## Verify It's Working

Check logs:
```bash
pm2 logs aurevion-pharma --lines 30
```

**Success looks like**:
```
⚠️  Using app password authentication
✅ Auto-reply email sent: <message-id>
✅ Admin notification email sent to: sales@aurevionpharma.com
```

**Failure looks like**:
```
❌ Failed to send auto-reply email: Error: Invalid login
```

---

## Testing

1. Go to your website and submit a test enquiry
2. Check that:
   - You receive an admin notification at `sales@aurevionpharma.com`
   - The customer receives a confirmation email from `sales@aurevionpharma.com`
   - Both emails appear in the logs as successful

---

## Troubleshooting

### Error: "Invalid login"
- Double-check the password/app password
- Make sure you're using the correct email: `sales@aurevionpharma.com`
- If 2FA is enabled, you MUST use an app password

### Error: "Connection timeout"
- Check that SMTP_HOST is `smtp-mail.outlook.com`
- Check that SMTP_PORT is `587`
- Verify server firewall allows outbound port 587

### Emails not arriving
- Check spam/junk folders
- Verify the Outlook account can send emails (try manually sending)
- Check PM2 logs for detailed error messages

### "Authentication failed" with app password
- Regenerate the app password
- Make sure you copied it exactly (no spaces)
- Try the regular password first to confirm the email works

---

## Security Best Practices

1. **Never commit passwords to git**
2. **Use app passwords instead of main password** (if 2FA enabled)
3. **Rotate passwords regularly**
4. **Monitor the logs for suspicious activity**

---

## Need Help?

If you're still having issues:
1. Check what error message you're seeing in logs
2. Confirm whether 2FA is enabled on the Outlook account
3. Verify you can manually send emails from sales@aurevionpharma.com

Current SMTP settings:
- Host: `smtp-mail.outlook.com`
- Port: `587`
- User: `sales@aurevionpharma.com`
- Pass: (needs to be set by you)
