---
title: XProfile Model
description: ORM reference for FluentCommunity\App\Models\XProfile.
---

# XProfile Model

Stores public-facing profile fields, status, verification, and community profile metadata.

## Table

- **Table:** `fcom_xprofile`
- **Primary key:** `user_id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `user_id` | `BIGINT UNSIGNED  UNIQUE, cast: integer` | No | `—` | WordPress user ID associated with the row. |
| `total_points` | `INT(11) UNSIGNED, cast: integer` | No | `0` | Accumulated profile points used for rankings and badges. |
| `username` | `VARCHAR(100)` | Yes | `—` | Profile username or WordPress username alias. |
| `status` | `enum('active', 'blocked', 'pending')` | No | `'active'` | Lifecycle or moderation status. |
| `is_verified` | `TINYINT(1) UNSIGNED, cast: integer` | No | `0` | Is Verified stored for this record. |
| `display_name` | `VARCHAR(192)` | Yes | `—` | Public display name shown in the portal. |
| `avatar` | `TEXT` | Yes | `—` | Avatar URL for the profile or user. |
| `short_description` | `TEXT` | Yes | `—` | Short biographical text or intro. |
| `last_activity` | `DATETIME` | Yes | `—` | Timestamp of the last tracked user activity. |
| `meta` | `LONGTEXT` | Yes | `—` | Serialized meta payload used by FluentCommunity. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `contact()` | `hasOne` | `Contact` | Signature: `—` |
| `spaces()` | `belongsToMany` | `BaseSpace` | Signature: `—` |
| `posts()` | `hasMany` | `Feed` | Signature: `—` |
| `follows()` | `hasMany` | `Follow` | Signature: `—` |
| `followers()` | `hasMany` | `Follow` | Signature: `—` |
| `comments()` | `hasMany` | `Comment` | Signature: `—` |
| `courses()` | `belongsToMany` | `Course` | Signature: `—` |
| `space_pivot()` | `belongsTo` | `SpaceUserPivot` | Signature: `—` |
| `community_role()` | `belongsTo` | `Meta` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `SearchBy` | `$query, $search` | Search By scope declared on the model. |
| `MentionBy` | `$query, $search` | Mention By scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `hasCustomAvatar()` | Returns whether the profile has an explicitly assigned avatar URL. |
| `getPermalink()` | Builds the canonical portal profile URL for the user. |
| `scheduledPosts()` | scheduled Posts implemented on the model. |

## Usage Examples

```php
use FluentCommunity\App\Models\XProfile;

$records = XProfile::query()
    ->searchBy('example')
    ->limit(10)
    ->get();

$first = XProfile::query()->first();
```
