<DocStatusBanner />

# Amazon S3 Configuration ​

## Introduction ​

This guide walks you through configuring Amazon S3 for media storage with Fluent Community. Amazon S3 is the industry-standard object storage service, offering excellent reliability and extensive integration options.

::: tip When to Choose S3
Amazon S3 is ideal for enterprise communities, complex integrations, or when you already have AWS infrastructure in place.
:::

---

## Prerequisites ​

- Amazon Web Services (AWS) account
- Fluent Community Pro installed and activated
- Basic understanding of AWS IAM and S3

---

## Step 1: Create an S3 Bucket ​

### 1.1 Access S3 Console ​

1. Log in to [AWS Management Console](https://console.aws.amazon.com/)
2. Navigate to **S3** service
3. Click **"Create bucket"**

### 1.2 Configure Bucket Settings ​

**Bucket Name:**
- Choose a globally unique name (e.g., `my-community-media`)
- Use lowercase letters, numbers, and hyphens only

**Region:**
- Select a region close to your users
- Common choices: `us-east-1`, `eu-west-1`, `ap-southeast-1`

**Block Public Access Settings:**
- ⚠️ **Disable** "Block all public access"
- This allows public access to uploaded media files

**Object Ownership:**
- Enable **"ACLs enabled"**
- Select **"Object writer"** from Object Ownership options

**Other Settings:**
- Keep default settings or adjust as needed
- Enable versioning (optional, recommended for safety)

### 1.3 Create Bucket ​

Click **"Create bucket"** to finalize.

---

## Step 2: Create IAM User ​

### 2.1 Access IAM Console ​

1. In AWS Management Console, go to **IAM** (Identity and Access Management)
2. Click **"Users"** in the left sidebar
3. Click **"Add user"** or **"Create user"**

### 2.2 Configure User ​

**User Name:**
- Choose a descriptive name (e.g., `fluent-community-s3`)

**Access Type:**
- Select **"Programmatic access"**
- Or leave unchecked: "Provide user access to the AWS Management Console"

### 2.3 Set Permissions ​

**Option A: Full S3 Access (Simpler)**
- Attach existing policy: **`AmazonS3FullAccess`**

**Option B: Restricted Access (More Secure)**
- Create a custom policy with limited permissions:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::YOUR-BUCKET-NAME",
                "arn:aws:s3:::YOUR-BUCKET-NAME/*"
            ]
        }
    ]
}
```

Replace `YOUR-BUCKET-NAME` with your actual bucket name.

### 2.4 Complete User Creation ​

1. Click through to complete user creation
2. You'll see a success message

---

## Step 3: Generate Access Keys ​

### 3.1 Access Security Credentials ​

1. Go to the user's details page
2. Click on **"Security credentials"** tab
3. Find the **"Access keys"** section

### 3.2 Create Access Key ​

1. Click **"Create access key"**
2. Select **"Other"** in the "Access key best practices & alternatives" screen
3. Add description tag (optional)
4. Click **"Create access key"**

### 3.3 Save Credentials ​

::: danger Important
Save these credentials immediately! You won't be able to see the Secret Access Key again.
:::

**Copy and save securely:**
- **Access Key ID** (e.g., `AKIAIOSFODNN7EXAMPLE`)
- **Secret Access Key** (e.g., `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`)

---

## Step 4: Configure Fluent Community ​

You have two options for configuration:

### Option A: Using Plugin UI (Recommended for Most Users) ​

1. Go to **FluentCommunity → Settings → Features**
2. Find the **Cloud Storage** section
3. Fill in the form:

**Storage Provider:**
- Select **"Amazon S3"** from dropdown

**Access Key:**
- Paste your Access Key ID

**Secret Key:**
- Paste your Secret Access Key

**Region:**
- Enter your bucket region (e.g., `us-east-1`)
- Leave empty if using global region

**Bucket:**
- Enter your bucket name (e.g., `my-community-media`)

**Sub Folder (Optional):**
- Enter a subfolder path if you want to organize files
- Example: `community-files` or `site-name`
- Leave empty to store files in bucket root

4. Click **"Save Changes"**

---

### Option B: Using wp-config.php (Recommended for Security) ​

Add these constants to your `wp-config.php` file (before the "That's all, stop editing!" line):

```php
// Amazon S3 Configuration
define('FLUENT_COMMUNITY_CLOUD_STORAGE', 'amazon_s3');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_REGION', 'us-east-1'); // Change to your region
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ACCESS_KEY', 'YOUR_ACCESS_KEY_ID');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SECRET_KEY', 'YOUR_SECRET_ACCESS_KEY');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_BUCKET', 'your-bucket-name');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SUB_FOLDER', 'community-files'); // Optional
```

**Replace with your actual values:**
- `us-east-1` → Your bucket region
- `YOUR_ACCESS_KEY_ID` → Your Access Key ID
- `YOUR_SECRET_ACCESS_KEY` → Your Secret Access Key
- `your-bucket-name` → Your bucket name
- `community-files` → Your subfolder (or remove this line)

::: tip
If you leave the region empty or remove the line, it will use the global region.
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

1. Check your S3 bucket in AWS Console
2. You should see the uploaded file
3. Verify the file is publicly accessible

### 3. Check Image Display ​

1. View the post in your community
2. Image should load from S3 URL
3. URL format: `https://your-bucket.s3.region.amazonaws.com/path/to/image.jpg`

---

## AWS Regions Reference ​

Common AWS regions:

| Region Code | Location | Description |
|------------|----------|-------------|
| `us-east-1` | N. Virginia | US East (most common) |
| `us-east-2` | Ohio | US East |
| `us-west-1` | N. California | US West |
| `us-west-2` | Oregon | US West |
| `eu-west-1` | Ireland | Europe (most common) |
| `eu-west-2` | London | Europe |
| `eu-central-1` | Frankfurt | Europe |
| `ap-southeast-1` | Singapore | Asia Pacific |
| `ap-southeast-2` | Sydney | Asia Pacific |
| `ap-northeast-1` | Tokyo | Asia Pacific |

[View all AWS regions →](https://docs.aws.amazon.com/general/latest/gr/s3.html)

---

## Cost Estimation ​

### S3 Pricing (as of 2024) ​

**Storage:**
- First 50 TB: $0.023 per GB/month
- Next 450 TB: $0.022 per GB/month

**Data Transfer (Egress):**
- First 10 TB: $0.09 per GB
- Next 40 TB: $0.085 per GB

**Requests:**
- PUT/POST: $0.005 per 1,000 requests
- GET: $0.0004 per 1,000 requests

### Example: Medium Community ​

**Monthly Usage:**
- Storage: 10 GB
- Egress: 50 GB
- Uploads: 10,000 images

**Monthly Cost:**
- Storage: 10 × $0.023 = $0.23
- Egress: 50 × $0.09 = $4.50
- Requests: (10,000 × $0.005) / 1,000 = $0.05
- **Total: ~$4.78/month**

::: tip Cost Optimization
Consider using CloudFront CDN to reduce egress costs, or switch to Cloudflare R2 for zero egress fees.
:::

---

## Troubleshooting ​

### "Access Denied" Error ​

**Causes:**
- Incorrect IAM permissions
- Bucket policy blocking access
- Wrong credentials

**Solutions:**
1. Verify IAM user has S3 permissions
2. Check bucket policy allows public read
3. Confirm Access Key and Secret Key are correct
4. Ensure no extra spaces in credentials

---

### "Bucket Not Found" Error ​

**Causes:**
- Wrong bucket name
- Wrong region
- Bucket doesn't exist

**Solutions:**
1. Double-check bucket name (case-sensitive)
2. Verify region matches bucket region
3. Confirm bucket exists in AWS Console

---

### Images Not Displaying ​

**Causes:**
- Block Public Access enabled
- ACLs not configured
- CORS issues

**Solutions:**
1. Disable "Block all public access" in bucket settings
2. Enable ACLs in Object Ownership settings
3. Add CORS configuration if needed:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "HEAD"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
    }
]
```

---

### Permission Issues ​

**Review IAM Policy:**
1. Go to IAM → Users → Your User
2. Check attached policies
3. Ensure S3 permissions are granted

**Review Bucket Policy:**
1. Go to S3 → Your Bucket → Permissions
2. Check bucket policy
3. Ensure public read access is allowed

---

## Security Best Practices ​

1. **Use wp-config.php** - Keep credentials out of database
2. **Restrict IAM permissions** - Only grant necessary access
3. **Enable bucket versioning** - Protect against accidental deletion
4. **Monitor CloudTrail logs** - Track API activity
5. **Rotate access keys** - Change credentials periodically
6. **Use MFA for AWS account** - Protect your AWS account
7. **Enable S3 access logging** - Track bucket access

---

## Advanced Configuration ​

### Using CloudFront CDN ​

For better performance and lower costs, consider using CloudFront:

1. Create CloudFront distribution
2. Set S3 bucket as origin
3. Update `FLUENT_COMMUNITY_CLOUD_STORAGE_PUBLIC_URL` to CloudFront URL

### Custom Domain ​

You can use a custom domain for your media:

1. Create CloudFront distribution
2. Add custom domain (CNAME)
3. Configure SSL certificate
4. Update public URL in Fluent Community

---

## Related Documentation ​

- [Cloud Storage Overview](./index.md) - Compare all providers
- [Cloudflare R2](./cloudflare-r2.md) - Alternative with zero egress fees
- [Performance Optimization](/deployment/performance-optimization.md) - Optimize your setup

