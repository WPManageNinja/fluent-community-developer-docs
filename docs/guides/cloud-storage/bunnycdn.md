---
title: BunnyCDN
description: Configure BunnyCDN storage zones for FluentCommunity Pro media uploads.
---

# BunnyCDN <span class="pro-badge">PRO</span>

The Bunny driver uses a storage-zone API endpoint plus a separate public CDN URL.

## Admin UI Fields

The current UI collects:

- `BunnyCDN API Key`
- `BunnyCDN Storage Zone Name`
- `Primary Storage Region`
- `BunnyCDN Public URL`

Unlike the S3 and R2 flows, the current Bunny admin form does not expose a sub-folder field.

## wp-config.php Example

```php
define('FLUENT_COMMUNITY_CLOUD_STORAGE', 'bunny_cdn');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_ACCESS_KEY', 'your-storage-zone-password');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_BUCKET', 'community-media');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_S3_REGION', 'ny.storage.bunnycdn.com');
define('FLUENT_COMMUNITY_CLOUD_STORAGE_PUBLIC_URL', 'https://community-media.b-cdn.net');
```

## Driver Behavior

`CloudStorageModule::bunnyCdnDriver()` builds the API URL as:

```text
https://{s3_endpoint}/{bucket}
```

That API endpoint is used for upload, delete, and connection test requests. Public file URLs are served from the separate `public_url` value you configure.
