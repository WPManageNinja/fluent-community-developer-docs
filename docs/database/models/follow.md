---
title: Follow Model
description: ORM reference for FluentCommunity\App\Models\Follow.
---

# Follow Model

A follower relationship in `fcom_followers` (Pro), scoped to active rows.

## Table

- **Table:** `fcom_followers`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `follower_id` | `integer` | Yes | `—` | Follower ID stored for this record. |
| `followed_id` | `integer` | Yes | `—` | Followed ID stored for this record. |
| `level` | `string` | Yes | `—` | Level stored for this record. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `follower()` | `belongsTo` | `XProfile` | Signature: `—` |
| `followed()` | `belongsTo` | `XProfile` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| — | — | No custom scopes are declared on this model. |

## Key Methods

| Method | Description |
| --- | --- |
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunityPro\App\Models\Follow;

$records = Follow::query()
    
    ->limit(10)
    ->get();

$first = Follow::query()->first();
```
