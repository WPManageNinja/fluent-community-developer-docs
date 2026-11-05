---
title: "Invitation Model"
description: "ORM reference for FluentCommunity\\App\\Models\\Invitation."
---

# Invitation Model

A pending invitation to the portal or a space, sharing `fcom_post_comments` under `type = invitation` via a global scope.

## Table

- **Table:** `fcom_post_comments`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `user_id` | `BIGINT UNSIGNED` | Yes | `—` | WordPress user ID associated with the row. |
| `post_id` | `BIGINT UNSIGNED` | Yes | `—` | Associated feed post ID. |
| `parent_id` | `BIGINT UNSIGNED` | Yes | `—` | Parent row ID used for threading or hierarchy. |
| `reactions_count` | `BIGINT UNSIGNED` | Yes | `0` | Cached number of reactions attached to the record. |
| `message` | `LONGTEXT` | Yes | `—` | Raw message or body content. |
| `message_rendered` | `LONGTEXT` | Yes | `—` | Rendered HTML representation of the message. |
| `meta` | `LONGTEXT` | Yes | `—` | Serialized meta payload used by FluentCommunity. |
| `type` | `VARCHAR(100)` | Yes | `'comment'` | Subtype discriminator for the row. |
| `content_type` | `VARCHAR(100)` | Yes | `'text'` | Content subtype such as text, document, or survey. |
| `status` | `VARCHAR(100)` | Yes | `'published'` | Lifecycle or moderation status. |
| `is_sticky` | `TINYINT(1)` | Yes | `0` | Boolean-like flag used for pinned or sticky records. |
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
| — | — | No custom scopes are declared on this model. |

## Key Methods

| Method | Description |
| --- | --- |
| `findExistingInvitation()` | find Existing Invitation implemented on the model. |
| `createNewInvitation()` | create New Invitation implemented on the model. |
| `isValid()` | is Valid implemented on the model. |

## Usage Examples

```php
use FluentCommunity\Modules\Auth\Classes\Invitation;

$records = Invitation::query()
    
    ->limit(10)
    ->get();

$first = Invitation::query()->first();
```
