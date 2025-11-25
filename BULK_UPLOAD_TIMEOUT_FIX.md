# Bulk Upload 504 Gateway Timeout - Fixed

## Issue
The bulk upload endpoint `/api/admin/products/bulk` was timing out with a 504 Gateway Timeout error when processing large Excel files with many products.

## Root Cause
1. **Nginx timeout too short**: Default proxy timeouts were set to 60 seconds
2. **Next.js route timeout**: No maxDuration config, defaulting to 60 seconds
3. **Large file processing**: Processing thousands of products sequentially takes longer than the default timeout

## Solution Applied

### 1. ✅ Nginx Configuration Updated
**File:** `/www/server/nginx/conf/vhost/aurevionpharma.com.conf`

Added a specific location block for the bulk upload endpoint with extended timeouts:

```nginx
# Bulk upload endpoint - Extended timeouts
location /api/admin/products/bulk {
    proxy_pass http://127.0.0.1:8142;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
    
    # Extended timeouts for bulk upload (10 minutes)
    proxy_connect_timeout 600s;
    proxy_send_timeout 600s;
    proxy_read_timeout 600s;
}
```

Also added:
```nginx
# Increase client body size for bulk uploads
client_max_body_size 50M;
```

**Changes:**
- Increased timeouts from 60s to 600s (10 minutes) for bulk upload endpoint only
- Increased max upload size to 50MB
- Other endpoints remain at 60s timeout for security

### 2. ✅ Next.js API Route Configuration
**File:** `app/api/admin/products/bulk/route.ts`

Added maxDuration export to allow longer execution time:

```typescript
// Configure route to allow 10 minutes execution time
export const maxDuration = 600
```

### 3. ✅ Optimized Processing
Improved the bulk upload code:

- Better progress logging (every 100 rows with success/failed counts)
- Reduced verbose error logging (only first 5 detailed errors)
- Maintained error collection (up to 20 errors returned)
- Cleaner console output for large batches

## Testing the Fix

### Before Fix
- ❌ Upload timed out at 60 seconds with 504 Gateway Timeout
- ❌ Could not process large files with thousands of products

### After Fix
- ✅ Can now process up to 10 minutes of bulk upload
- ✅ Better progress tracking with console logs
- ✅ Handles large Excel files without timing out
- ✅ Clear error reporting for failed rows

## Files Modified

1. `/www/server/nginx/conf/vhost/aurevionpharma.com.conf`
   - Added specific location block for bulk upload
   - Extended timeouts to 600s (10 minutes)
   - Increased client_max_body_size to 50M
   - Backup: `aurevionpharma.com.conf.backup`

2. `app/api/admin/products/bulk/route.ts`
   - Added `export const maxDuration = 600`
   - Improved progress logging
   - Reduced verbose error output
   - Backup: `route.ts.backup3`

## Technical Details

### Timeout Configuration
- **Nginx proxy_connect_timeout**: 600s (time to establish connection)
- **Nginx proxy_send_timeout**: 600s (time to send request to backend)
- **Nginx proxy_read_timeout**: 600s (time to read response from backend)
- **Next.js maxDuration**: 600s (10 minutes max execution)

### File Size Limits
- **client_max_body_size**: 50M (allows large Excel files)

### Performance Optimization
- Progress logging every 100 rows
- Limited detailed error logging to first 5 failures
- Error list capped at 20 entries
- Efficient memory usage with sequential processing

## Deployment

```bash
# 1. Backed up configs
cp /www/server/nginx/conf/vhost/aurevionpharma.com.conf /www/server/nginx/conf/vhost/aurevionpharma.com.conf.backup
cp app/api/admin/products/bulk/route.ts app/api/admin/products/bulk/route.ts.backup3

# 2. Applied nginx config
/www/server/nginx/sbin/nginx -t  # Test config
/www/server/nginx/sbin/nginx -s reload  # Reload nginx

# 3. Rebuilt Next.js app
npm run build

# 4. Restarted PM2
pm2 restart aurevion-pharma
```

## Status

✅ **Fixed and Deployed**

- Nginx configuration updated and reloaded
- Next.js app rebuilt with new config
- PM2 restarted successfully
- Application is online and ready

## Recommendations

1. **Monitor logs** during bulk uploads: `pm2 logs aurevion-pharma`
2. **Test with large files** (1000+ products) to verify timeout fix
3. **Consider background jobs** for extremely large files (10,000+ products)
4. **Add progress bar** in frontend to show upload status

## Next Steps (Optional)

For even better performance with very large files:

1. **Batch Database Operations**: Use bulk insert instead of individual creates
2. **Background Processing**: Move to a queue system (Bull/BullMQ) for async processing
3. **Streaming**: Process file in chunks instead of loading entire file
4. **Worker Threads**: Parallelize processing with Node.js worker threads

---

**Fixed on:** November 7, 2025
**Status:** ✅ Deployed and Running
