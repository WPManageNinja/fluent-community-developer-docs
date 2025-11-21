<DocStatusBanner />

# Cloudflare R2 Configuration ​

## Introduction ​

This guide walks you through configuring Cloudflare R2 for media storage with Fluent Community. R2 is our **recommended cloud storage provider** due to its zero egress fees and excellent performance.

::: tip Why We Recommend R2
Cloudflare R2 offers S3-compatible storage with **zero egress fees**, making it significantly more cost-effective than alternatives for communities with high media consumption.
:::

---

## Prerequisites ​

- Cloudflare account (free tier available)
- Fluent Community Pro installed and activated
- Basic understanding of cloud storage concepts

---

## Step 1: Create an R2 Bucket ​

### 1.1 Access R2 Dashboard ​

1. Log in to your [Cloudflare account](https://dash.cloudflare.com/)
2. Navigate to **R2** under the **Storage** section
3. Click **"Create bucket"**

### 1.2 Configure Bucket Settings ​

**Bucket Name:**
- Choose a unique name (e.g., `my-community-media`)
- Use lowercase letters, numbers, and hyphens only

**Location:**
- **Automatic** (Recommended) - Cloudflare automatically selects optimal location
- Or choose a specific region closest to your target audience

**Default Storage Class:**
- Select **"Standard"** (default)

### 1.3 Create Bucket ​

Click **"Create bucket"** to finalize.

---

## Step 2: Generate API Token ​

### 2.1 Access API Token Management ​

1. In your R2 dashboard, click **"Manage R2 API Tokens"**
2. Click **"Create API Token"**

### 2.2 Configure API Token ​

**Token Name:**
- Give it a descriptive name (e.g., `fluent-community-token`)

**Permissions:**
- Select **"Object Read & Write"**

**Specify Bucket(s):**
- Select **"Apply to specific buckets only"**
- Choose your newly created bucket from the dropdown

**TTL (Time to Live):**
- Select **"Forever"** (recommended)
- Or set an expiration date if you prefer to rotate tokens

### 2.3 Create and Save Token ​

1. Click **"Create API Token"**
2. You'll see a success screen with credentials

::: danger Important
Save these credentials immediately! You won't be able to see the Secret Access Key again.
:::

**Copy and save securely:**
- **Access Key ID** (e.g., `abc123def456...`)
- **Secret Access Key** (e.g., `xyz789uvw012...`)

---

## Step 3: Get R2 Endpoint Information ​

### 3.1 Get Account ID ​

1. In the R2 dashboard, go to **"Overview"**
2. Copy your **Account ID** (displayed at the top)
3. Format: `1718cb5a51e65c8f19e8sahdakh763`

### 3.2 Enable Public Access ​

1. Select your bucket from the list
2. Click on the **"Settings"** tab
3. Scroll to **"R2.dev subdomain"** section
4. Click **"Allow Access"**
5. Copy the **Public R2.dev Bucket URL**
6. Format: `https://pub-abc123def456.r2.dev`

::: tip Custom Domain
You can also configure a custom domain for your R2 bucket for better branding. See the Advanced Configuration section below.
:::

---

## Step 4: Configure Fluent Community ​

You have two options for configuration:

### Option A: Using Plugin UI (Recommended for Most Users) ​

1. Go to **FluentCommunity → Settings → Features**
2. Find the **Cloud Storage** section
3. Fill in the form:

**Storage Provider:**
- Select **"Cloudflare R2"** from dropdown

**Access Key:**
- Paste your Access Key ID from Step 2

**Secret Key:**
- Paste your Secret Access Key from Step 2

**Account ID:**
- Paste your Cloudflare Account ID from Step 3.1

**Bucket:**
- Enter your bucket name (e.g., `my-community-media`)

**Sub Folder (Optional):**
- Enter a subfolder path if you want to organize files
- Example: `community-files` or `site-name`
- Leave empty to store files in bucket root

**Public URL:**
- Paste your Public R2.dev Bucket URL from Step 3.2
- Example: `https://pub-abc123def456.r2.dev`

4. Click **"Save Changes"**

---

### Option B: Using wp-config.php (Recommended for Security) ​

Add these constants to your `wp-config.php` file (before the "That's all, stop editing!" line):

```php
// Cloudflare R2 Configuration
define('FLUENT_COMMUNITY_CLOUD_STORAGE', 'cloudflare_r2');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ACCOUNT_ID', '1718cb5a51e65c8f19e8sahdakh763'); // Your Account ID
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ACCESS_KEY', 'YOUR_ACCESS_KEY_ID'); // From Step 2
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SECRET_KEY', 'YOUR_SECRET_ACCESS_KEY'); // From Step 2
define('FLUENT_COMMUNITY_CLOUD_STORAGE_BUCKET', 'my-community-media'); // Your bucket name
define('FLUENT_COMMUNITY_CLOUD_STORAGE_PUBLIC_URL', 'https://pub-abc123def456.r2.dev'); // Your R2 public URL
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SUB_FOLDER', 'community-files'); // Optional
```

**Replace with your actual values:**
- `1718cb5a51e65c8f19e8sahdakh763` → Your Account ID
- `YOUR_ACCESS_KEY_ID` → Your Access Key ID
- `YOUR_SECRET_ACCESS_KEY` → Your Secret Access Key
- `my-community-media` → Your bucket name
- `https://pub-abc123def456.r2.dev` → Your R2 public URL
- `community-files` → Your subfolder (or remove this line)

::: tip Custom Domain
If you've configured a custom domain, use it in `FLUENT_COMMUNITY_CLOUD_STORAGE_PUBLIC_URL` instead of the R2.dev URL.
:::

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

1. Check your R2 bucket in Cloudflare dashboard
2. You should see the uploaded file
3. Verify the file count increased

### 3. Check Image Display ​

1. View the post in your community
2. Image should load from R2 URL
3. URL format: `https://pub-abc123def456.r2.dev/path/to/image.jpg`

---

## Cost Estimation ​

### R2 Pricing (as of 2024) ​

**Storage:**
- $0.015 per GB/month

**Class A Operations (writes):**
- $4.50 per million requests

**Class B Operations (reads):**
- $0.36 per million requests

**Egress (Data Transfer Out):**
- ✅ **FREE** (Zero egress fees!)

### Example: Medium Community ​

**Monthly Usage:**
- Storage: 10 GB
- Egress: 50 GB (FREE!)
- Uploads: 10,000 images
- Views: 100,000 image loads

**Monthly Cost:**
- Storage: 10 × $0.015 = $0.15
- Class A (uploads): (10,000 / 1,000,000) × $4.50 = $0.045
- Class B (reads): (100,000 / 1,000,000) × $0.36 = $0.036
- Egress: 50 GB × $0.00 = **$0.00**
- **Total: ~$0.23/month**

::: tip Massive Savings
Compare this to Amazon S3 where 50GB egress would cost $4.50/month! R2 saves you **$4.27/month** in this example.
:::

---

## Troubleshooting ​

### "Access Denied" Error ​

**Causes:**
- Incorrect API token permissions
- Wrong credentials
- Token expired

**Solutions:**
1. Verify API token has "Object Read & Write" permissions
2. Confirm Access Key and Secret Key are correct
3. Check token hasn't expired
4. Ensure no extra spaces in credentials

---

### "Bucket Not Found" Error ​

**Causes:**
- Wrong bucket name
- Wrong Account ID
- Bucket doesn't exist

**Solutions:**
1. Double-check bucket name (case-sensitive)
2. Verify Account ID is correct
3. Confirm bucket exists in Cloudflare dashboard

---

### Images Not Displaying ​

**Causes:**
- Public access not enabled
- Wrong public URL
- CORS issues

**Solutions:**
1. Enable "Allow Access" in R2.dev subdomain settings
2. Verify public URL is correct
3. Check browser console for errors
4. Clear browser cache

---

### "Invalid Account ID" Error ​

**Causes:**
- Wrong Account ID format
- Copied extra characters

**Solutions:**
1. Copy Account ID from R2 Overview page
2. Ensure no spaces or extra characters
3. Account ID should be alphanumeric string

---

## Advanced Configuration ​

### Using Custom Domain ​

For better branding, you can use your own domain:

#### 1. Add Custom Domain in Cloudflare ​

1. Go to your R2 bucket → **Settings**
2. Scroll to **"Custom Domains"** section
3. Click **"Connect Domain"**
4. Enter your domain (e.g., `media.yourdomain.com`)
5. Follow the DNS setup instructions

#### 2. Update Fluent Community Configuration ​

Update the public URL to use your custom domain:

```php
define('FLUENT_COMMUNITY_CLOUD_STORAGE_PUBLIC_URL', 'https://media.yourdomain.com');
```

---

### CORS Configuration ​

If you need to access R2 from different domains:

1. Go to your R2 bucket → **Settings**
2. Scroll to **"CORS Policy"** section
3. Add CORS rules:

```json
[
  {
    "AllowedOrigins": ["https://yourdomain.com"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": [],
    "MaxAgeSeconds": 3600
  }
]
```

---

### Bucket Lifecycle Rules ​

To automatically delete old files:

1. Go to your R2 bucket → **Settings**
2. Scroll to **"Lifecycle Rules"** section
3. Create rules to expire objects after X days

---

## Security Best Practices ​

1. **Use wp-config.php** - Keep credentials out of database
2. **Restrict API token scope** - Only grant necessary permissions
3. **Use specific bucket access** - Don't use account-wide tokens
4. **Enable custom domain** - Better control and branding
5. **Monitor usage** - Check R2 analytics regularly
6. **Rotate tokens periodically** - Change credentials every 6-12 months
7. **Use HTTPS only** - Never use HTTP for media URLs

---

## Why R2 is Better Than S3 ​

### Cost Comparison ​

| Feature | Cloudflare R2 | Amazon S3 |
|---------|--------------|-----------|
| **Storage** | $0.015/GB | $0.023/GB |
| **Egress** | ✅ **FREE** | ❌ $0.09/GB |
| **Class A Ops** | $4.50/million | $5.00/million |
| **Class B Ops** | $0.36/million | $0.40/million |

**For 10GB storage + 50GB egress:**
- R2: **$0.23/month**
- S3: **$4.78/month**
- **Savings: $4.55/month (95% cheaper!)**

### Performance ​

- ✅ Global CDN included
- ✅ Fast edge network
- ✅ Low latency worldwide
- ✅ Automatic optimization

### Simplicity ​

- ✅ Simpler pricing model
- ✅ No surprise egress charges
- ✅ Easy setup process
- ✅ Integrated with Cloudflare ecosystem

---

## Migration from S3 to R2 ​

If you're currently using S3 and want to switch to R2:

### 1. Create R2 Bucket ​

Follow Steps 1-3 above to set up R2.

### 2. Migrate Existing Files ​

Use Cloudflare's migration tools or AWS CLI:

```bash
# Using rclone (recommended)
rclone sync s3:your-s3-bucket r2:your-r2-bucket
```

### 3. Update Configuration ​

Change your wp-config.php from S3 to R2 settings.

### 4. Test Thoroughly ​

Verify all images load correctly before decommissioning S3.

---

## Free Tier Limits ​

Cloudflare R2 offers a generous free tier:

- **Storage:** 10 GB/month
- **Class A Operations:** 1 million/month
- **Class B Operations:** 10 million/month
- **Egress:** Unlimited (always free!)

::: tip Perfect for Small Communities
The free tier is perfect for small communities just getting started!
:::

---

## Related Documentation ​

- [Cloud Storage Overview](./index.md) - Compare all providers
- [Amazon S3](./amazon-s3.md) - Alternative provider
- [BunnyCDN](./bunnycdn.md) - Another alternative
- [Performance Optimization](/deployment/performance-optimization.md) - Optimize your setup

