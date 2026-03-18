---
title: Cloud Storage
description: Configure remote media storage providers for FluentCommunity Pro.
---

# Cloud Storage <span class="pro-badge">PRO</span>

FluentCommunity Pro can store uploaded media on remote object storage instead of the local uploads directory. The current source supports these drivers:

- `local`
- `cloudflare_r2`
- `amazon_s3`
- `bunny_cdn`

## Configuration Sources

There are two supported ways to configure storage:

1. Through the admin modal backed by [Get Storage Settings](/restapi/operations/admin/get-storage-settings) and [Save Storage Settings](/restapi/operations/admin/save-storage-settings)
2. Through `wp-config.php` constants read by `FluentCommunityPro\App\Modules\CloudStorage\StorageHelper`

If you define `FLUENT_COMMUNITY_CLOUD_STORAGE`, config-file values take precedence and the admin UI becomes read-only.

## Driver Requirements

| Driver | Required fields in current validation | Notes |
| --- | --- | --- |
| `local` | `driver` | Keeps files on the WordPress server. |
| `cloudflare_r2` | `access_key`, `secret_key`, `public_url`, `endpoint_url` | `StorageHelper` can derive `endpoint_url` from `account_id` + `bucket` in config-driven setups. |
| `amazon_s3` | `access_key`, `secret_key`, `bucket` | The UI also sends `s3_endpoint` from the location dropdown. |
| `bunny_cdn` | `access_key`, `s3_endpoint`, `bucket`, `public_url` | Uses the storage-zone API plus a public CDN URL. |

## Provider Guides

- [Cloudflare R2](/guides/cloud-storage/cloudflare-r2)
- [Amazon S3](/guides/cloud-storage/amazon-s3)
- [BunnyCDN](/guides/cloud-storage/bunnycdn)

## Notes from the Current Implementation

- Access keys and secret keys are encrypted before they are stored in WordPress options.
- The Pro filter set enriches the storage settings response with S3 and Bunny location lists for the admin UI.
- Saving a remote driver automatically enables the `cloud_storage` feature flag in FluentCommunity.
