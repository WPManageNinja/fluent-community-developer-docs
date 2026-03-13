---
title: Reaction Model
description: ORM reference for FluentCommunity\App\Models\Reaction.
---

# Reaction Model

Stores likes and survey votes for feeds, comments, and course content.

## Table

- **Table:** `fcom_post_reactions`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `user_id` | `BIGINT UNSIGNED` | Yes | `—` | WordPress user ID associated with the row. |
| `object_id` | `BIGINT UNSIGNED` | Yes | `—` | Associated object ID, interpreted together with the object type. |
| `parent_id` | `BIGINT UNSIGNED` | Yes | `—` | Parent row ID used for threading or hierarchy. |
| `object_type` | `VARCHAR(100)` | Yes | `'feed'` | Discriminator used to reuse the same table for multiple object types. |
| `type` | `VARCHAR(100)` | Yes | `'like'` | Subtype discriminator for the row. |
| `ip_address` | `VARCHAR(100)` | Yes | `—` | Ip Address stored for this record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |
| `feed()` | `belongsTo` | `Feed` | Signature: `—` |
| `comment()` | `belongsTo` | `Comment` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `TypeBy` | `$query, $type = 'like'` | Type By scope declared on the model. |
| `ObjectType` | `$query, $type = 'feed'` | Object Type scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunity\App\Models\Reaction;

$records = Reaction::query()
    ->typeBy('example')
    ->limit(10)
    ->get();

$first = Reaction::query()->first();
```
