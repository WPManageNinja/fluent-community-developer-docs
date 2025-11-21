<DocStatusBanner />

# Cloud Storage Configuration ​

## Introduction ​

Fluent Community Pro allows you to store media files in cloud storage services instead of your local server. This is highly recommended for active communities with lots of media files, as it provides better performance, scalability, and cost-effectiveness.

::: tip Recommended
For production communities with significant media uploads, we strongly recommend using cloud storage to reduce server load and improve performance.
:::

---

## Supported Cloud Storage Providers ​

### Cloudflare R2 (Recommended) ​

**Why We Recommend R2:**
- ✅ Most cost-effective option
- ✅ No egress fees (free data transfer out)
- ✅ Fast global delivery
- ✅ S3-compatible API
- ✅ Simple pricing model

**Best For:** Communities of all sizes, especially those with high media consumption

[Configure Cloudflare R2 →](./cloudflare-r2.md)

---

### Amazon S3 ​

**Why Choose S3:**
- ✅ Industry standard and proven
- ✅ Extensive global infrastructure
- ✅ Advanced features and integrations
- ✅ Excellent reliability

**Best For:** Enterprise communities, complex integrations, existing AWS infrastructure

[Configure Amazon S3 →](./amazon-s3.md)

---

### BunnyCDN ​

**Why Choose BunnyCDN:**
- ✅ Affordable pricing
- ✅ Fast global CDN
- ✅ Easy setup
- ✅ Good performance

**Best For:** Budget-conscious communities, simple setups

[Configure BunnyCDN →](./bunnycdn.md)

---

## Comparison Table ​

| Feature | Cloudflare R2 | Amazon S3 | BunnyCDN |
|---------|--------------|-----------|----------|
| **Pricing** | $0.015/GB storage | $0.023/GB storage | $0.01-0.02/GB |
| **Egress Fees** | ✅ Free | ❌ $0.09/GB | ✅ Free (with Pull Zone) |
| **Setup Difficulty** | Easy | Medium | Easy |
| **S3 Compatible** | ✅ Yes | ✅ Yes | ⚠️ Partial |
| **Global CDN** | ✅ Included | ❌ Separate (CloudFront) | ✅ Included |
| **Best For** | Most communities | Enterprise | Budget-conscious |

---

## Configuration Methods ​

All cloud storage providers can be configured using two methods:

### Method 1: Plugin UI (Recommended for Most Users) ​

**Advantages:**
- User-friendly interface
- No file editing required
- Easy to update credentials
- Visual feedback

**How to Access:**
1. Go to FluentCommunity admin panel
2. Navigate to **Settings → Features**
3. Find the **Cloud Storage** section
4. Select your provider and enter credentials

---

### Method 2: wp-config.php (Recommended for Security) ​

**Advantages:**
- More secure (credentials not in database)
- Better for version control
- Prevents accidental changes
- Ideal for multi-environment setups

**How to Configure:**
Add configuration constants to your `wp-config.php` file (see provider-specific guides for exact code).

::: warning Priority
If you configure both methods, wp-config.php settings will take precedence over UI settings.
:::

---

## When to Use Cloud Storage ​

### ✅ You Should Use Cloud Storage If: ​

- Your community has 1,000+ active users
- Users upload images/videos regularly
- You want to reduce server storage costs
- You need better media delivery performance
- Your server has limited storage space
- You want automatic backups and redundancy

### ❌ You May Not Need Cloud Storage If: ​

- Your community is small (<500 users)
- Media uploads are infrequent
- You have ample server storage
- You're just starting out

---

## Cost Estimation ​

### Example: Medium Community ​

**Assumptions:**
- 5,000 active users
- 100 new images per day
- Average image size: 500KB (after optimization)
- 30-day retention

**Monthly Storage:**
- Images: 100 × 30 × 0.5MB = 1.5GB
- Total storage: ~2GB

**Monthly Costs:**

| Provider | Storage Cost | Egress Cost (10GB) | Total |
|----------|-------------|-------------------|-------|
| **Cloudflare R2** | $0.03 | $0.00 | **$0.03** |
| **Amazon S3** | $0.05 | $0.90 | **$0.95** |
| **BunnyCDN** | $0.02 | $0.00 | **$0.02** |

::: tip
Cloudflare R2's zero egress fees make it significantly cheaper for communities with high media consumption.
:::

---

## Performance Benefits ​

### Before Cloud Storage ​

- Media served from your web server
- Competes with PHP/MySQL for resources
- Limited by server bandwidth
- Single point of failure
- Slower for distant users

### After Cloud Storage ​

- Media served from global CDN
- Web server focuses on application logic
- Unlimited bandwidth (effectively)
- Redundant storage
- Fast delivery worldwide

**Expected Improvements:**
- 40-60% faster media loading
- 30-50% reduction in server load
- Better user experience globally

---

## Migration Process ​

### Migrating Existing Media ​

When you enable cloud storage, Fluent Community will:

1. **New Uploads:** Automatically go to cloud storage
2. **Existing Files:** Remain on your server initially

**To Migrate Existing Files:**

::: warning Coming Soon
Automatic migration tool is planned for a future release. Currently, existing files remain on your server and continue to work normally.
:::

**Manual Migration (Advanced):**
If you need to migrate existing files immediately, contact support for guidance.

---

## Security Considerations ​

### Public vs Private Files ​

**Public Files (Default):**
- Accessible via direct URL
- Cached by CDN
- Best for images, videos
- Faster delivery

**Private Files:**
- Require authentication
- Not cached
- Best for documents, downloads
- More secure but slower

### Best Practices ​

1. **Use wp-config.php for credentials** - Keeps secrets out of database
2. **Restrict IAM permissions** - Only grant necessary access
3. **Enable bucket versioning** - Protect against accidental deletion
4. **Monitor access logs** - Detect unusual activity
5. **Rotate credentials regularly** - Enhance security

---

## Troubleshooting ​

### Common Issues ​

**"Unable to connect to storage"**
- Verify credentials are correct
- Check bucket/zone name
- Ensure proper permissions
- Verify region settings

**"Files not uploading"**
- Check bucket permissions
- Verify CORS settings (if applicable)
- Ensure sufficient storage quota
- Check error logs

**"Images not displaying"**
- Verify public URL is correct
- Check bucket public access settings
- Ensure CDN is enabled
- Clear browser cache

---

## Next Steps ​

Choose your cloud storage provider and follow the setup guide:

1. [Configure Cloudflare R2](./cloudflare-r2.md) - Recommended for most communities
2. [Configure Amazon S3](./amazon-s3.md) - For enterprise setups
3. [Configure BunnyCDN](./bunnycdn.md) - For budget-conscious communities

---

## Related Documentation ​

- [Server Requirements](/deployment/server-requirements.md) - Recommended server configuration
- [Performance Optimization](/deployment/performance-optimization.md) - Advanced optimization
- [Media Handling](/guides/code-snippets.md#media-performance) - Code snippets for media

