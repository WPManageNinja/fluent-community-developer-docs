---
title: Amazon S3
description: Configure Amazon S3 as the FluentCommunity Pro media backend.
---

# Amazon S3 <span class="pro-badge">PRO</span>

Amazon S3 is the most conventional remote media backend in the current FluentCommunity implementation.

## Admin UI Fields

The settings modal currently exposes:

- `Amazon S3 Access Key`
- `Amazon S3 Secret Key`
- `Amazon S3 Bucket Name`
- `Amazon S3 Location`
- `Bucket Sub-Folder (Optional)`

The location dropdown is populated from the Pro `fluent_community/storage_settings_response` filter.

## wp-config.php Example

```php
define('FLUENT_COMMUNITY_CLOUD_STORAGE', 'amazon_s3');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ACCESS_KEY', 'your-access-key');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SECRET_KEY', 'your-secret-key');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_BUCKET', 'community-media');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_S3_REGION', 's3-us-east-1.amazonaws.com');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SUB_FOLDER', 'portal-media');
```

Optional low-level overrides honored by the connection driver:

```php
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ENDPOINT', 's3-us-east-1.amazonaws.com');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_REGION', 'us-east-1');
```

## How Resolution Works

`StorageHelper` exposes `s3_endpoint` from config, and `CloudStorageModule::s3Driver()` uses that value unless an explicit endpoint override is defined. If no endpoint is available, it falls back to `s3.amazonaws.com` or derives one from the explicit region override.
