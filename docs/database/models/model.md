---
title: Model Model
description: ORM reference for FluentCommunity\App\Models\Model.
---

# Model Model

Defines the shared base ORM behavior inherited by FluentCommunity models built on WPFluent.

## Table

- **Table:** Inherited / runtime-defined
- **Primary key:** `id`

- **Extends:** `BaseModel`

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
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunityPro\App\Models\Model;

$records = Model::query()
    
    ->limit(10)
    ->get();

$first = Model::query()->first();
```
