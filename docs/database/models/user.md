---
title: User Model
description: ORM reference for FluentCommunity\App\Models\User.
---

# User Model

Wraps the WordPress `users` table with community-specific relationships and helpers.

## Table

- **Table:** `users`
- **Primary key:** `id`
- **Schema ownership:** WordPress core table. FluentCommunity reads from it but does not create or migrate it.
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| — | — | — | No relationships are declared on this model. |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| — | — | No custom scopes are declared on this model. |

## Key Methods

| Method | Description |
| --- | --- |
| `getGeneralData()` | Builds a normalized profile payload used by controllers and portal views. |
| `cacheAccessSpaces()` | Caches the set of spaces the user can access to reduce repeated permission lookups. |

## Usage Examples

```php
use FluentCommunityPro\App\Models\User;

$records = User::query()
    
    ->limit(10)
    ->get();

$first = User::query()->first();
```
