---
title: Comment Model
description: ORM reference for FluentCommunity\App\Models\Comment.
---

# Comment Model

Stores feed comments, threaded replies, and their moderation-aware relationships.

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
| `is_sticky` | `TINYINT(1), cast: int` | Yes | `0` | Boolean-like flag used for pinned or sticky records. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |
| `media()` | `hasOne` | `Media` | Signature: `—` |
| `post()` | `belongsTo` | `Feed` | Signature: `—` |
| `space()` | `hasOneThrough` | `BaseSpace` | Signature: `—` |
| `reactions()` | `hasMany` | `Reaction` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `SearchBy` | `$query, $search` | Search By scope declared on the model. |
| `ByContentModerationAccessStatus` | `$query, $user, $space = null` | By Content Moderation Access Status scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `getCommentParentUserIds()` | Collects the users that participated in a thread for mention and notification workflows. |
| `getHumanExcerpt()` | Returns a short, human-readable excerpt of the comment body. |

## Usage Examples

```php
use FluentCommunity\App\Models\Comment;

$records = Comment::query()
    ->searchBy('example')
    ->limit(10)
    ->get();

$first = Comment::query()->first();
```
