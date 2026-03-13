---
title: Notification Model
description: ORM reference for FluentCommunity\App\Models\Notification.
---

# Notification Model

Stores notification payloads before they are fanned out to per-user delivery rows.

## Table

- **Table:** `fcom_notifications`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `feed_id` | `BIGINT UNSIGNED` | Yes | `—` | Associated feed ID. |
| `object_id` | `BIGINT UNSIGNED` | Yes | `—` | Associated object ID, interpreted together with the object type. |
| `src_user_id` | `BIGINT UNSIGNED` | Yes | `—` | User that triggered the notification or action. |
| `src_object_type` | `VARCHAR(100)` | Yes | `—` | Source object type that created the notification. |
| `action` | `VARCHAR(100)` | Yes | `—` | Action name stored for the notification or activity. |
| `title` | `VARCHAR(192)` | Yes | `—` | Human-readable title stored for the record. |
| `content` | `TEXT` | Yes | `—` | Content stored for this record. |
| `route` | `TEXT` | Yes | `—` | Portal route used to open the notification or action destination. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `subscribers()` | `hasMany` | `NotificationSubscriber` | Signature: `—` |
| `subscriber()` | `hasOne` | `NotificationSubscriber` | Signature: `—` |
| `feed()` | `belongsTo` | `Feed` | Signature: `—` |
| `src_user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `ByStatus` | `$query, $status, $userId` | By Status scope declared on the model. |
| `ByType` | `$query, $type` | By Type scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `getRouteAttribute()` | Returns the resolved notification route that the portal uses for navigation. |
| `subscribe()` | subscribe implemented on the model. |

## Usage Examples

```php
use FluentCommunity\App\Models\Notification;

$records = Notification::query()
    ->byStatus(null, 1)
    ->limit(10)
    ->get();

$first = Notification::query()->first();
```
