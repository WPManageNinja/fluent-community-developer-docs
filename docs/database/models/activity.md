---
title: Activity Model
description: ORM reference for FluentCommunity\App\Models\Activity.
---

# Activity Model

Tracks member-facing activity stream entries such as feed publications and comments.

## Table

- **Table:** `fcom_user_activities`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `user_id` | `BIGINT UNSIGNED` | Yes | `—` | WordPress user ID associated with the row. |
| `feed_id` | `BIGINT UNSIGNED` | Yes | `—` | Associated feed ID. |
| `space_id` | `BIGINT UNSIGNED` | Yes | `—` | Space ID stored for this record. |
| `related_id` | `BIGINT UNSIGNED` | Yes | `—` | Secondary related object ID used by activity records. |
| `message` | `TEXT` | Yes | `—` | Raw message or body content. |
| `is_public` | `TINYINT(1)` | Yes | `1` | Visibility flag used by activity rows. |
| `action_name` | `VARCHAR(100)` | Yes | `''` | Action Name stored for this record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `feed()` | `belongsTo` | `Feed` | Signature: `—` |
| `space()` | `belongsTo` | `BaseSpace` | Signature: `—` |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `ByActions` | `$query, $actions = []` | By Actions scope declared on the model. |
| `BySpace` | `$query, $spaceId` | By Space scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `getFormattedMessage()` | Builds the HTML activity sentence shown in the activity feed for supported activity types. |

## Usage Examples

```php
use FluentCommunity\App\Models\Activity;

$records = Activity::query()
    ->byActions([])
    ->limit(10)
    ->get();

$first = Activity::query()->first();
```
