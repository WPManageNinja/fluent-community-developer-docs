---
title: Cloudflare R2
description: Configure Cloudflare R2 as the FluentCommunity Pro media backend.
---

# Cloudflare R2 <span class="pro-badge">PRO</span>

Use Cloudflare R2 when you want S3-compatible object storage with a separate public delivery URL.

## Admin UI Fields

The current storage settings UI expects:

- `Cloudflare Access Key`
- `Cloudflare Secret Key`
- `Cloudflare Bucket Public URL`
- `Cloudflare Endpoint URL`
- `Bucket Sub-Folder (Optional)`

The save endpoint validates `public_url` and `endpoint_url` as URLs before testing the connection.

## wp-config.php Example

```php
define('FLUENT_COMMUNITY_CLOUD_STORAGE', 'cloudflare_r2');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ACCOUNT_ID', 'your-account-id');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ACCESS_KEY', 'your-access-key');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SECRET_KEY', 'your-secret-key');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_BUCKET', 'community-media');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_PUBLIC_URL', 'https://pub-xxxx.r2.dev');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ENDPOINT_URL', 'https://your-account-id.r2.cloudflarestorage.com/community-media');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_SUB_FOLDER', 'portal-media');
```

`StorageHelper` can derive `endpoint_url` from `account_id` and `bucket` if you omit it in a config-driven setup, but the admin UI currently asks for the full endpoint explicitly.

## What the Driver Needs

`CloudStorageModule::cloudflareDriver()` extracts the bucket name and endpoint host from `endpoint_url`, then builds the remote driver with:

- access key
- secret key
- endpoint host
- bucket
- public URL

If any of those pieces are missing, the driver is rejected and the settings save fails.
