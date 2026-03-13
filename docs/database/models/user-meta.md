---
title: UserMeta Model
description: ORM reference for FluentCommunity\App\Models\UserMeta.
---

# UserMeta Model

Wraps the WordPress `usermeta` table for community-focused metadata access.

## Table

- **Table:** `usermeta`
- **Primary key:** `umeta_id`
- **Schema ownership:** WordPress core table. FluentCommunity exposes it through `UserMeta`, but schema ownership stays with WordPress.
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `user_id` | `integer` | Yes | `—` | WordPress user ID associated with the row. |
| `meta_key` | `string` | Yes | `—` | Meta Key stored for this record. |
| `meta_value` | `string` | Yes | `—` | Meta Value stored for this record. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `user()` | `belongsTo` | `User` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `ByKey` | `$query, $key` | By Key scope declared on the model. |
| `ByUser` | `$query, $userId` | By User scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunity\App\Models\UserMeta;

$records = UserMeta::query()
    ->byKey('example')
    ->limit(10)
    ->get();

$first = UserMeta::query()->first();
```
