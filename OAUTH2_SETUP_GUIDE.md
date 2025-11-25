# OAuth 2.0 Email Setup Guide for Aurevion Pharma

## Current Status
✅ Email service updated with OAuth 2.0 support
✅ All emails now sent from: `sales@aurevionpharma.com`
✅ Fallback to app password working (currently active)
✅ googleapis package installed

## Important Changes
1. **Sender Email**: Changed from `sudheer@sjmedialabs.com` to `sales@aurevionpharma.com`
2. **Recipient Email**: Admin notifications go to `sales@aurevionpharma.com` (cc: sudheer@sjmedialabs.com)
3. **Customer Confirmation**: Customers receive confirmation from `sales@aurevionpharma.com`

## Next Steps to Enable OAuth 2.0

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Gmail API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Gmail API"
   - Click "Enable"

### Step 2: Create OAuth 2.0 Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth 2.0 Client ID"
3. Configure consent screen if prompted:
   - User Type: External (or Internal if you have Google Workspace)
   - Fill in required fields
   - Add scope: `https://mail.google.com/`
4. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: "Aurevion Email Service"
   - Authorized redirect URIs: `https://developers.google.com/oauthplayground`
5. Save the **Client ID** and **Client Secret**

### Step 3: Generate Refresh Token
1. Go to [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)
2. Click the settings icon (⚙️) in the top right
3. Check "Use your own OAuth credentials"
4. Enter your **Client ID** and **Client Secret**
5. In Step 1 (left panel):
   - Find "Gmail API v1"
   - Select `https://mail.google.com/`
   - Click "Authorize APIs"
6. Sign in with `sales@aurevionpharma.com` (IMPORTANT: use the sales email)
7. Allow the permissions
8. In Step 2:
   - Click "Exchange authorization code for tokens"
   - Copy the **Refresh Token**

### Step 4: Update Configuration
Edit the file `/www/wwwroot/aurevion/ecosystem.config.js` and uncomment the OAuth lines:

```javascript
env: {
  NODE_ENV: 'production',
  
  // OAuth2 Configuration (Add your credentials)
  GMAIL_CLIENT_ID: 'your-client-id-here.apps.googleusercontent.com',
  GMAIL_CLIENT_SECRET: 'your-client-secret-here',
  GMAIL_REFRESH_TOKEN: 'your-refresh-token-here',
  
  // SMTP Configuration
  SMTP_HOST: 'smtp.gmail.com',
  SMTP_PORT: '587',
  SMTP_USER: 'sales@aurevionpharma.com',
  
  // Remove or comment out SMTP_PASS once OAuth2 is working
  // SMTP_PASS: 'mjoicoozoifsutnu'
}
```

### Step 5: Restart Application
```bash
cd /www/wwwroot/aurevion
pm2 restart aurevion-pharma
pm2 save
```

### Step 6: Verify
Check logs to confirm OAuth2 is working:
```bash
pm2 logs aurevion-pharma --lines 50
```

You should see: `✅ Email service configured with OAuth2`

### Step 7: Test
Submit a test enquiry on your website and check:
1. Customer receives email from `sales@aurevionpharma.com`
2. Admin notification arrives at `sales@aurevionpharma.com`
3. Logs show successful email delivery

## Important Gmail Account Setup

### For sales@aurevionpharma.com account:
1. **Enable 2-Step Verification** (required for OAuth2)
   - Go to Google Account → Security
   - Enable 2-Step Verification
2. **Allow less secure apps** is NOT needed for OAuth2
3. Make sure the account can send emails

## Troubleshooting

### If OAuth2 fails:
- Check all credentials are correct (no extra spaces)
- Verify you authorized with `sales@aurevionpharma.com` account
- Make sure Gmail API is enabled in Google Cloud Console
- Check the refresh token hasn't expired

### If emails still fail:
- The system will automatically fallback to app password
- Check PM2 logs for detailed error messages
- Verify `sales@aurevionpharma.com` has proper permissions

## Current Behavior (Before OAuth2 Setup)
- System is using app password with `sudheer@sjmedialabs.com` credentials
- You'll see: `⚠️ Using app password authentication`
- All emails appear to be from `sales@aurevionpharma.com` but authenticated with sudheer's password

⚠️ **Note**: The current setup uses sudheer's Gmail credentials but sends emails showing `sales@aurevionpharma.com` as the sender. This may be flagged by Gmail. For proper operation, you should either:
1. Set up OAuth2 for `sales@aurevionpharma.com` (recommended)
2. OR generate an app password specifically for `sales@aurevionpharma.com` account

## Benefits of OAuth 2.0
✅ More secure - no password stored
✅ Better control - can revoke access anytime
✅ Google recommended method
✅ No app password expiration issues
✅ Proper sender authentication
