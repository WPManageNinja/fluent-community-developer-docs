---
title: Term Model
description: ORM reference for FluentCommunity\App\Models\Term.
---

# Term Model

Stores taxonomy-like topics, categories, and term metadata used by feeds and courses.

## Table

- **Table:** `fcom_terms`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `parent_id` | `BIGINT UNSIGNED` | Yes | `—` | Parent row ID used for threading or hierarchy. |
| `taxonomy_name` | `VARCHAR(50)` | No | `—` | Taxonomy Name stored for this record. |
| `slug` | `VARCHAR(100)` | No | `—` | Sanitized slug or public identifier. |
| `title` | `LONGTEXT` | Yes | `—` | Human-readable title stored for the record. |
| `description` | `LONGTEXT` | Yes | `—` | Description stored for this record. |
| `settings` | `LONGTEXT` | Yes | `—` | Serialized settings payload. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `posts()` | `belongsToMany` | `Feed` | Signature: `—` |
| `base_spaces()` | `belongsToMany` | `BaseSpace` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `SearchBy` | `$query, $search` | Search By scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `posts()` | Returns the many-to-many relation between terms and feed posts. |

## Usage Examples

```php
use FluentCommunity\App\Models\Term;

$records = Term::query()
    ->searchBy('example')
    ->limit(10)
    ->get();

$first = Term::query()->first();
```
