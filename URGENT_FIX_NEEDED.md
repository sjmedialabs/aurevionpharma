# ⚠️ URGENT: Email Configuration Fix Needed

## Current Issue
The application is currently showing email authentication errors because:
- SMTP_USER is set to: `sales@aurevionpharma.com`
- SMTP_PASS is the app password for: `sudheer@sjmedialabs.com`

**These credentials don't match!**

## Quick Fix Options

### Option 1: Use OAuth 2.0 (RECOMMENDED)
Follow the steps in `OAUTH2_SETUP_GUIDE.md` to set up OAuth 2.0 for `sales@aurevionpharma.com`

This is the best solution because:
- More secure
- No password management
- Google's recommended method

### Option 2: Generate App Password for sales@aurevionpharma.com (QUICK FIX)

If you need emails working immediately:

1. **Login to sales@aurevionpharma.com Google Account**

2. **Enable 2-Step Verification** (if not already enabled):
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

3. **Generate App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "Aurevion Website"
   - Click "Generate"
   - Copy the 16-character password

4. **Update ecosystem.config.js**:
   ```bash
   nano /www/wwwroot/aurevion/ecosystem.config.js
   ```
   
   Replace the SMTP_PASS line with the new app password:
   ```javascript
   SMTP_USER: 'sales@aurevionpharma.com',
   SMTP_PASS: 'your-new-16-char-password-here'
   ```

5. **Restart the app**:
   ```bash
   pm2 restart aurevion-pharma
   pm2 save
   ```

6. **Test**:
   ```bash
   pm2 logs aurevion-pharma --lines 20
   ```
   Submit a test enquiry and check for success messages.

### Option 3: Temporarily Revert (NOT RECOMMENDED)

If you want to temporarily keep using sudheer's credentials:

```bash
nano /www/wwwroot/aurevion/ecosystem.config.js
```

Change:
```javascript
SMTP_USER: 'sudheer@sjmedialabs.com',  // Change back temporarily
```

But this means:
- Emails will show "sales@aurevionpharma.com" as sender
- But authenticated with sudheer's account
- May be flagged as suspicious by Gmail
- Not a proper long-term solution

## Recommended Path Forward

1. **Immediate**: Use Option 2 (app password for sales@aurevionpharma.com)
2. **Soon**: Migrate to Option 1 (OAuth 2.0) for better security

## Verify It's Working

After fixing, you should see in logs:
```
✅ Auto-reply email sent: <message-id>
✅ Admin notification email sent to: sales@aurevionpharma.com
```

Instead of:
```
❌ Failed to send auto-reply email: Error: Invalid login: 535-5.7.8
```

## Questions?
Check the full OAuth 2.0 setup guide: `OAUTH2_SETUP_GUIDE.md`
