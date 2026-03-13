---
title: NotificationSubscriber Model
description: ORM reference for FluentCommunity\App\Models\NotificationSubscriber.
---

# NotificationSubscriber Model

Represents rows in `fcom_notification_users` where `object_type = notification`.

## Table

- **Table:** `fcom_notification_users`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `object_type` | `VARCHAR(50)` | Yes | `'notification'` | Discriminator used to reuse the same table for multiple object types. |
| `notification_type` | `VARCHAR(50)` | Yes | `'web'` | Delivery channel or notification subtype for the row. |
| `object_id` | `BIGINT UNSIGNED` | Yes | `—` | Associated object ID, interpreted together with the object type. |
| `user_id` | `BIGINT UNSIGNED` | Yes | `—` | WordPress user ID associated with the row. |
| `is_read` | `TINYINT(1) UNSIGNED` | Yes | `0` | Boolean-like flag indicating whether the notification has been read. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |
| `notification()` | `belongsTo` | `Notification` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `Unread` | `$query` | Unread scope declared on the model. |
| `Read` | `$query` | Read scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunity\App\Models\NotificationSubscriber;

$records = NotificationSubscriber::query()
    ->unread()
    ->limit(10)
    ->get();

$first = NotificationSubscriber::query()->first();
```
