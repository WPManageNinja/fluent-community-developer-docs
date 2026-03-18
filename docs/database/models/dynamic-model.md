---
title: DynamicModel Model
description: ORM reference for FluentCommunity\App\Models\DynamicModel.
---

# DynamicModel Model

Creates runtime table bindings when FluentCommunity needs an ORM model for a dynamic table.

## Table

- **Table:** Inherited / runtime-defined
- **Primary key:** `id`

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
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunity\App\Models\DynamicModel;

$records = DynamicModel::query()
    
    ->limit(10)
    ->get();

$first = DynamicModel::query()->first();
```
