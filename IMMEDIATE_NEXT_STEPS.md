# ✅ IMMEDIATE NEXT STEPS - Outlook Email Setup

## What's Been Done
✅ Email service updated to use `sales@aurevionpharma.com` as sender
✅ SMTP configured for Outlook (smtp-mail.outlook.com)
✅ Admin notifications configured to go to `sales@aurevionpharma.com`
✅ Customer confirmations will come from `sales@aurevionpharma.com`

## What You Need to Do NOW

### Step 1: Add the Password

Edit the configuration file:
```bash
nano /www/wwwroot/aurevion/ecosystem.config.js
```

Find this line:
```javascript
SMTP_PASS: 'YOUR_OUTLOOK_PASSWORD_HERE'
```

Replace it with ONE of these options:

#### Option A: If NO 2-Factor Authentication
```javascript
SMTP_PASS: 'your-actual-outlook-password'
```

#### Option B: If 2-Factor Authentication is ENABLED
1. Go to https://account.microsoft.com/security
2. Click "Advanced security options"
3. Under "App passwords", click "Create a new app password"
4. Copy the generated password (looks like: abcd-efgh-ijkl-mnop)
5. Use that in the config:
```javascript
SMTP_PASS: 'abcd-efgh-ijkl-mnop'
```

### Step 2: Save the File
Press `Ctrl + X`, then `Y`, then `Enter`

### Step 3: Restart the Application
```bash
pm2 restart aurevion-pharma
pm2 save
```

### Step 4: Verify It Works
```bash
pm2 logs aurevion-pharma --lines 30
```

Look for:
- ✅ `Auto-reply email sent:` (SUCCESS)
- ❌ `Failed to send auto-reply email:` (FAILED - check password)

### Step 5: Test
1. Go to your website
2. Submit a test enquiry
3. Check that emails are received at `sales@aurevionpharma.com`

---

## Quick Reference

**Current Configuration:**
- SMTP Host: `smtp-mail.outlook.com`
- SMTP Port: `587`
- Email: `sales@aurevionpharma.com`
- Password: **YOU NEED TO ADD THIS**

**Files Updated:**
- `/www/wwwroot/aurevion/lib/services/email-service.ts` (email service with OAuth fallback)
- `/www/wwwroot/aurevion/ecosystem.config.js` (Outlook SMTP config)

**Documentation Created:**
- `OUTLOOK_EMAIL_SETUP.md` - Detailed setup guide
- `OAUTH2_SETUP_GUIDE.md` - Gmail OAuth guide (ignore this)
- `URGENT_FIX_NEEDED.md` - Previous Gmail issue (resolved)
- `IMMEDIATE_NEXT_STEPS.md` - This file

---

## If You Get Stuck

### Error: "Invalid login"
→ The password is wrong or you need to use an app password

### Error: "Connection timeout"  
→ Check firewall settings or SMTP host/port

### Emails not arriving
→ Check spam folder or verify the Outlook account works

### Still having issues?
Run these commands and share the output:
```bash
pm2 logs aurevion-pharma --lines 50 --nostream
pm2 env 52 | grep SMTP
```

---

## One-Liner to Get Started

If you know the password and DON'T have 2FA:
```bash
nano /www/wwwroot/aurevion/ecosystem.config.js
# (add password, save, exit)
pm2 restart aurevion-pharma && pm2 save && pm2 logs aurevion-pharma --lines 20
```

That's it! Once you add the password and restart, emails should work immediately.
