---
title: SpaceGroup Model
description: ORM reference for FluentCommunity\App\Models\SpaceGroup.
---

# SpaceGroup Model

Represents hierarchical group containers for organizing spaces on the portal.

## Table

- **Table:** `fcom_spaces`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `created_by` | `BIGINT UNSIGNED` | Yes | `—` | WordPress user ID that created the record. |
| `parent_id` | `BIGINT UNSIGNED` | Yes | `—` | Parent row ID used for threading or hierarchy. |
| `title` | `VARCHAR(194)` | No | `—` | Human-readable title stored for the record. |
| `slug` | `VARCHAR(194)` | No | `—` | Sanitized slug or public identifier. |
| `logo` | `TEXT` | Yes | `—` | Logo stored for this record. |
| `cover_photo` | `TEXT` | Yes | `—` | Cover Photo stored for this record. |
| `description` | `LONGTEXT` | Yes | `—` | Description stored for this record. |
| `type` | `VARCHAR(100)` | Yes | `—` | Subtype discriminator for the row. |
| `privacy` | `VARCHAR(100)` | Yes | `'public'` | Visibility state used by feeds and spaces. |
| `status` | `VARCHAR(100)` | Yes | `'published'` | Lifecycle or moderation status. |
| `serial` | `INT(11)` | Yes | `1` | Ordering index inside a group of related records. |
| `settings` | `LONGTEXT` | Yes | `—` | Serialized settings payload. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `owner()` | `belongsTo` | `User` | Signature: `—` |
| `spaces()` | `hasMany` | `BaseSpace` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `SearchBy` | `$query, $search` | Search By scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `updateCustomData()` | Sanitizes and updates the editable attributes for a space group record. |
| `defaultSettings()` | default Settings implemented on the model. |

## Usage Examples

```php
use FluentCommunity\App\Models\SpaceGroup;

$records = SpaceGroup::query()
    ->searchBy('example')
    ->limit(10)
    ->get();

$first = SpaceGroup::query()->first();
```
