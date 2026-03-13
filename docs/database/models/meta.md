---
title: Meta Model
description: ORM reference for FluentCommunity\App\Models\Meta.
---

# Meta Model

Backs the shared meta table used across spaces, terms, users, and other object types.

## Table

- **Table:** `fcom_meta`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `object_type` | `VARCHAR(50)` | No | `—` | Discriminator used to reuse the same table for multiple object types. |
| `object_id` | `BIGINT` | Yes | `—` | Associated object ID, interpreted together with the object type. |
| `meta_key` | `VARCHAR(100)` | No | `—` | Meta Key stored for this record. |
| `value` | `LONGTEXT` | Yes | `—` | Serialized meta value. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| — | — | — | No relationships are declared on this model. |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `ByType` | `$query, $type` | By Type scope declared on the model. |
| `ByMetaKey` | `$query, $key` | By Meta Key scope declared on the model. |
| `ByObjectId` | `$query, $objectId` | By Object Id scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| — | No additional public methods are documented for this model. |

## Usage Examples

```php
use FluentCommunity\App\Models\Meta;

$records = Meta::query()
    ->byType('example')
    ->limit(10)
    ->get();

$first = Meta::query()->first();
```
