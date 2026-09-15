---
title: NotificationPreference Model
description: ORM reference for FluentCommunity\App\Models\NotificationPreference.
---

# NotificationPreference Model

Holds a member's explicit notification overrides in `fcom_notification_prefs`, one row per event and channel. A missing row means the site default applies.

## Table

- **Table:** `fcom_notification_prefs`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `user_id` | `BIGINT UNSIGNED` | No | `—` | WordPress user ID associated with the row. |
| `channel` | `VARCHAR(20)` | No | `'mail'` | Channel stored for this record. |
| `event_key` | `VARCHAR(50)` | No | `—` | Event Key stored for this record. |
| `object_id` | `BIGINT UNSIGNED` | No | `0` | Associated object ID, interpreted together with the object type. |
| `value` | `TINYINT UNSIGNED` | No | `0` | Serialized meta value. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `ForChannel` | `$query, $channel` | For Channel scope declared on the model. |
| `ForEvent` | `$query, $eventKey` | For Event scope declared on the model. |
| `GlobalScoped` | `$query` | Global Scoped scope declared on the model. |
| `Enabled` | `$query` | Enabled scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunity\App\Models\NotificationPreference;

$records = NotificationPreference::query()
    ->forChannel(null)
    ->limit(10)
    ->get();

$first = NotificationPreference::query()->first();
```
