<DocStatusBanner />

# BunnyCDN Configuration ​

## Introduction ​

This guide walks you through configuring BunnyCDN for media storage with Fluent Community. BunnyCDN offers affordable pricing and fast global delivery, making it a great choice for budget-conscious communities.

::: tip When to Choose BunnyCDN
BunnyCDN is ideal for communities looking for affordable storage with good performance and simple setup.
:::

---

## Prerequisites ​

- Bunny.net account
- Fluent Community Pro installed and activated
- Basic understanding of cloud storage concepts

---

## Step 1: Create a Storage Zone ​

### 1.1 Access Bunny.net Dashboard ​

1. Log in to your [Bunny.net account](https://panel.bunny.net/)
2. Navigate to **Storage** in the left sidebar
3. Click **"Add Storage Zone"**

### 1.2 Configure Storage Zone ​

**Storage Zone Name:**
- Choose a unique name (e.g., `my-community-media`)
- Use lowercase letters, numbers, and hyphens only

**Storage Tier:**
- **Standard** - Best for frequently accessed files
- **HDD** - More affordable for archival storage

**Main Storage Region:**
- Select region closest to your users
- Options: Falkenstein (DE), London (UK), New York (US), Los Angeles (US), Singapore (SG), Stockholm (SE), São Paulo (BR), Johannesburg (SA), Sydney (AUS)

**Replication Regions (Optional):**
- Select additional regions for geo-replication
- Improves performance for global audiences

### 1.3 Create Storage Zone ​

Click **"Add Storage Zone"** to finalize.

---

## Step 2: Connect Pull Zone ​

A Pull Zone acts as a CDN for your storage, delivering files quickly to users worldwide.

### 2.1 Access Connected Pull Zones ​

1. Go to your newly created Storage Zone
2. Find the **"Connected Pull Zones"** section
3. Click **"Connect Pull Zone"**

### 2.2 Create Pull Zone ​

1. Click **"Add Pull Zone"**
2. Fill in the details:

**Pull Zone Name:**
- Choose a descriptive name (e.g., `my-community-cdn`)

**Storage Zone:**
- Select your Storage Zone from the dropdown

**Other Settings:**
- Keep default settings or adjust as needed

3. Click **"Add Pull Zone"**

---

## Step 3: Get Storage Zone Credentials ​

### 3.1 Access FTP & API Settings ​

1. Go to your Storage Zone
2. Click on the **"FTP & API Access"** tab
3. Copy the **Password** (API Key)

::: tip Save This Password
You'll need this password to configure Fluent Community. Keep it secure!
:::

### 3.2 Note Storage Region Endpoint ​

Based on your selected region, note the endpoint:

| Region | Endpoint |
|--------|----------|
| Falkenstein, DE | `storage.bunnycdn.com` |
| London, UK | `uk.storage.bunnycdn.com` |
| New York, US | `ny.storage.bunnycdn.com` |
| Los Angeles, US | `la.storage.bunnycdn.com` |
| Singapore, SG | `sg.storage.bunnycdn.com` |
| Stockholm, SE | `se.storage.bunnycdn.com` |
| São Paulo, BR | `br.storage.bunnycdn.com` |
| Johannesburg, SA | `jh.storage.bunnycdn.com` |
| Sydney, AUS | `syd.storage.bunnycdn.com` |

---

## Step 4: Get Pull Zone URL ​

### 4.1 Access Pull Zone Settings ​

1. Go to **CDN** → **Pull Zones**
2. Click on your Pull Zone
3. Find the **"Linked Hostnames"** section
4. Copy the default hostname (e.g., `my-community-cdn.b-cdn.net`)

### 4.2 Format Public URL ​

Your public URL will be:
```
https://your-pull-zone.b-cdn.net
```

::: tip Custom Domain
You can also configure a custom domain for better branding. See the Advanced Configuration section below.
:::

---

## Step 5: Configure Fluent Community ​

You have two options for configuration:

### Option A: Using Plugin UI (Recommended for Most Users) ​

1. Go to **FluentCommunity → Settings → Features**
2. Find the **Cloud Storage** section
3. Fill in the form:

**Storage Provider:**
- Select **"BunnyCDN"** from dropdown

**BunnyCDN API Key:**
- Paste your Storage Zone password from Step 3

**BunnyCDN Storage Zone Name:**
- Enter your Storage Zone name (e.g., `my-community-media`)

**Primary Storage Region:**
- Enter the endpoint from Step 3.2 (e.g., `storage.bunnycdn.com`)

**BunnyCDN Public URL:**
- Enter your Pull Zone URL from Step 4
- Format: `https://your-pull-zone.b-cdn.net`
- ⚠️ Make sure to include `https://`

**Sub Folder (Optional):**
- Enter a subfolder path if you want to organize files
- Example: `community-files` or `site-name`
- Leave empty to store files in storage root

4. Click **"Save Changes"**

---

### Option B: Using wp-config.php (Recommended for Security) ​

Add these constants to your `wp-config.php` file (before the "That's all, stop editing!" line):

```php
// BunnyCDN Configuration
define('FLUENT_COMMUNITY_CLOUD_STORAGE', 'bunny_cdn');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_S3_REGION', 'storage.bunnycdn.com'); // Change to your region endpoint
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ACCESS_KEY', 'YOUR_STORAGE_ZONE_PASSWORD'); // Your Storage Zone Password
define('FLUENT_COMMUNITY_CLOUD_STORAGE_BUCKET', 'my-community-media'); // Your Storage Zone Name
define('FLUENT_COMMUNITY_CLOUD_STORAGE_PUBLIC_URL', 'https://your-pull-zone.b-cdn.net'); // Your Pull Zone URL
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SUB_FOLDER', 'community-files'); // Optional
```

**Replace with your actual values:**
- `storage.bunnycdn.com` → Your region endpoint (see table in Step 3.2)
- `YOUR_STORAGE_ZONE_PASSWORD` → Your Storage Zone password
- `my-community-media` → Your Storage Zone name
- `https://your-pull-zone.b-cdn.net` → Your Pull Zone URL
- `community-files` → Your subfolder (or remove this line)

---

## Configuration Priority ​

If you configure both methods:
- ✅ **wp-config.php settings take precedence**
- UI settings are ignored when wp-config.php constants are defined

---

## Testing Your Configuration ​

### 1. Upload a Test Image ​

1. Go to your Fluent Community portal
2. Create a new post
3. Upload an image
4. Publish the post

### 2. Verify Upload ​

1. Check your Storage Zone in Bunny.net dashboard
2. You should see the uploaded file
3. Verify the file size and count

### 3. Check Image Display ​

1. View the post in your community
2. Image should load from BunnyCDN URL
3. URL format: `https://your-pull-zone.b-cdn.net/path/to/image.jpg`

---

## Cost Estimation ​

### BunnyCDN Pricing (as of 2024) ​

**Storage:**
- Standard: $0.01 per GB/month
- HDD: $0.005 per GB/month

**Bandwidth (with Pull Zone):**
- ✅ **FREE** when using Pull Zone
- Pull Zone bandwidth: $0.01-0.05 per GB (varies by region)

### Example: Medium Community ​

**Monthly Usage:**
- Storage: 10 GB (Standard)
- Bandwidth: 50 GB (via Pull Zone)

**Monthly Cost:**
- Storage: 10 × $0.01 = $0.10
- Bandwidth: 50 × $0.01 = $0.50
- **Total: ~$0.60/month**

::: tip Very Affordable
BunnyCDN is one of the most affordable options, especially for communities with moderate traffic.
:::

---

## Important Limitations ​

### ACL Support ​

::: warning Known Limitation
BunnyCDN is not fully S3-compatible and does not support ACL (Access Control Lists).
:::

**Impact:**
- Document uploads will still be served via CDN
- Full URL will be used instead of signed URLs
- Files are publicly accessible via direct URL

**Workaround:**
- For sensitive documents, consider using a different storage provider
- Or implement application-level access control

---

## Troubleshooting ​

### "Access Denied" Error ​

**Causes:**
- Incorrect Storage Zone password
- Wrong Storage Zone name
- Wrong region endpoint

**Solutions:**
1. Verify Storage Zone password is correct
2. Check Storage Zone name (case-sensitive)
3. Confirm region endpoint matches your Storage Zone region
4. Ensure no extra spaces in credentials

---

### "Connection Failed" Error ​

**Causes:**
- Wrong region endpoint
- Network connectivity issues
- Firewall blocking connection

**Solutions:**
1. Double-check region endpoint from the table
2. Test connection from server
3. Check firewall rules
4. Verify server can reach BunnyCDN endpoints

---

### Images Not Displaying ​

**Causes:**
- Wrong Pull Zone URL
- Pull Zone not connected to Storage Zone
- CORS issues

**Solutions:**
1. Verify Pull Zone URL is correct
2. Check Pull Zone is connected to Storage Zone
3. Ensure Pull Zone is enabled
4. Clear browser cache

---

### Slow Upload Speed ​

**Causes:**
- Wrong region selected
- Network latency
- Server location far from Storage Zone

**Solutions:**
1. Choose Storage Zone region closest to your server
2. Enable geo-replication for better performance
3. Check server network speed

---

## Advanced Configuration ​

### Using Custom Domain ​

For better branding, you can use your own domain:

#### 1. Add Custom Hostname in BunnyCDN ​

1. Go to your Pull Zone → **Hostnames**
2. Click **"Add Hostname"**
3. Enter your domain (e.g., `media.yourdomain.com`)
4. Add the CNAME record to your DNS:
   - Type: `CNAME`
   - Name: `media`
   - Value: `your-pull-zone.b-cdn.net`

#### 2. Enable SSL ​

1. In Pull Zone settings, go to **SSL**
2. Enable **"Free SSL"** (Let's Encrypt)
3. Wait for SSL certificate to be issued

#### 3. Update Fluent Community Configuration ​

Update the public URL to use your custom domain:

```php
define('FLUENT_COMMUNITY_CLOUD_STORAGE_PUBLIC_URL', 'https://media.yourdomain.com');
```

---

### Geo-Replication ​

To improve performance for global audiences:

1. Go to your Storage Zone → **Replication**
2. Enable replication for additional regions
3. Files will be automatically replicated
4. Users will be served from the nearest location

**Cost:** Additional storage charges for replicated data

---

### Cache Configuration ​

Optimize Pull Zone caching:

1. Go to your Pull Zone → **Caching**
2. Adjust cache settings:
   - **Browser Cache Expiration:** 1 day or more
   - **CDN Cache Expiration:** 7 days or more
   - **Query String Caching:** Enabled

---

### Purge Cache ​

To clear cached files:

1. Go to your Pull Zone → **Purge**
2. Choose purge method:
   - **Purge All** - Clear entire cache
   - **Purge URL** - Clear specific file
   - **Purge Tag** - Clear by tag (if configured)

---

## Security Best Practices ​

1. **Use wp-config.php** - Keep credentials out of database
2. **Restrict Storage Zone access** - Use strong password
3. **Enable Pull Zone security** - Token authentication, hotlink protection
4. **Use HTTPS only** - Enable SSL for custom domains
5. **Monitor usage** - Check analytics regularly
6. **Rotate passwords** - Change credentials periodically
7. **Enable DDoS protection** - Use BunnyCDN's built-in protection

---

## Performance Optimization ​

### Enable Optimizer ​

BunnyCDN Optimizer can automatically optimize images:

1. Go to your Pull Zone → **Optimizer**
2. Enable **"Bunny Optimizer"**
3. Configure optimization settings:
   - Image quality
   - WebP conversion
   - Lazy loading

**Benefits:**
- Smaller file sizes
- Faster loading
- Automatic format conversion

---

### Enable Perma-Cache ​

For static files that never change:

1. Go to your Pull Zone → **Caching**
2. Enable **"Perma-Cache"**
3. Set long cache expiration

---

## Comparison with Other Providers ​

| Feature | BunnyCDN | Cloudflare R2 | Amazon S3 |
|---------|----------|---------------|-----------|
| **Storage Cost** | $0.01/GB | $0.015/GB | $0.023/GB |
| **Bandwidth Cost** | $0.01-0.05/GB | ✅ FREE | $0.09/GB |
| **Setup Difficulty** | Easy | Easy | Medium |
| **S3 Compatible** | ⚠️ Partial | ✅ Yes | ✅ Yes |
| **ACL Support** | ❌ No | ✅ Yes | ✅ Yes |
| **Best For** | Budget-conscious | Most communities | Enterprise |

---

## Related Documentation ​

- [Cloud Storage Overview](./index.md) - Compare all providers
- [Cloudflare R2](./cloudflare-r2.md) - Recommended alternative
- [Amazon S3](./amazon-s3.md) - Enterprise alternative
- [Performance Optimization](/deployment/performance-optimization.md) - Optimize your setup

