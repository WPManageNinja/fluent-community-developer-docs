---
title: SpaceUserPivot Model
description: ORM reference for FluentCommunity\App\Models\SpaceUserPivot.
---

# SpaceUserPivot Model

Stores the membership, role, and membership metadata for users inside spaces.

## Table

- **Table:** `fcom_space_user`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `space_id` | `BIGINT UNSIGNED` | Yes | `—` | Space ID stored for this record. |
| `user_id` | `VARCHAR(194)` | No | `—` | WordPress user ID associated with the row. |
| `status` | `VARCHAR(100)` | Yes | `'active'` | Lifecycle or moderation status. |
| `role` | `VARCHAR(100)` | Yes | `'member'` | Membership role assigned to the user. |
| `meta` | `TEXT` | Yes | `—` | Serialized meta payload used by FluentCommunity. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |
| `space()` | `belongsTo` | `BaseSpace` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `BySpace` | `$query, $spaceId` | By Space scope declared on the model. |
| `ByUser` | `$query, $userId` | By User scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunity\App\Models\SpaceUserPivot;

$records = SpaceUserPivot::query()
    ->bySpace(1)
    ->limit(10)
    ->get();

$first = SpaceUserPivot::query()->first();
```
