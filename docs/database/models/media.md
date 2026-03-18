---
title: Media Model
description: ORM reference for FluentCommunity\App\Models\Media.
---

# Media Model

Stores uploaded media metadata and delivery information for feeds, comments, and spaces.

## Table

- **Table:** `fcom_media_archive`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `object_source` | `VARCHAR(100)` | No | `—` | Object Source stored for this record. |
| `media_key` | `VARCHAR(100)` | No | `—` | Unique key used to identify a stored media object. |
| `user_id` | `BIGINT` | Yes | `—` | WordPress user ID associated with the row. |
| `feed_id` | `BIGINT` | Yes | `—` | Associated feed ID. |
| `is_active` | `TINYINT(1)` | Yes | `0` | Boolean-like flag indicating whether the row is currently active. |
| `sub_object_id` | `BIGINT` | Yes | `—` | Sub Object ID stored for this record. |
| `media_type` | `VARCHAR(192)` | Yes | `—` | Media subtype such as image, file, or video. |
| `driver` | `VARCHAR(192)` | Yes | `'local'` | Storage driver used to serve the media file. |
| `media_path` | `TEXT` | Yes | `—` | Internal storage path for the media file. |
| `media_url` | `TEXT` | Yes | `—` | Persisted public URL for the media file. |
| `settings` | `TEXT` | Yes | `—` | Serialized settings payload. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `feed()` | `belongsTo` | `Feed` | Signature: `—` |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `BySource` | `$query, $sources = []` | By Source scope declared on the model. |
| `ByMediaKey` | `$query, $key` | By Media Key scope declared on the model. |
| `ByUser` | `$query, $userId` | By User scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `getPublicUrlAttribute()` | Resolves the public URL through the active media driver filter. |
| `getSignedPublicUrl()` | Builds a temporary signed URL through the active driver when private media is enabled. |
| `deleteFile()` | Deletes the stored asset from the backing filesystem driver. |

## Usage Examples

```php
use FluentCommunity\App\Models\Media;

$records = Media::query()
    ->bySource(null)
    ->limit(10)
    ->get();

$first = Media::query()->first();
```
