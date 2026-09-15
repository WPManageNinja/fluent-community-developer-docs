---
title: CourseTopic Model
description: ORM reference for FluentCommunity\App\Models\CourseTopic.
---

# CourseTopic Model

A section heading in `fcom_posts` that groups lessons within a course.

## Table

- **Table:** `fcom_posts`
- **Primary key:** `id`

- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `id` | `BIGINT UNSIGNED` | No | `—` | Primary key for the row. |
| `user_id` | `BIGINT UNSIGNED` | Yes | `—` | WordPress user ID associated with the row. |
| `parent_id` | `BIGINT UNSIGNED` | Yes | `—` | Parent row ID used for threading or hierarchy. |
| `title` | `VARCHAR(192)` | Yes | `—` | Human-readable title stored for the record. |
| `slug` | `VARCHAR(192)` | Yes | `—` | Sanitized slug or public identifier. |
| `message` | `LONGTEXT` | Yes | `—` | Raw message or body content. |
| `message_rendered` | `LONGTEXT` | Yes | `—` | Rendered HTML representation of the message. |
| `type` | `VARCHAR(100)` | Yes | `'feed'` | Subtype discriminator for the row. |
| `content_type` | `VARCHAR(100)` | Yes | `'text'` | Content subtype such as text, document, or survey. |
| `space_id` | `BIGINT UNSIGNED` | Yes | `—` | Space ID stored for this record. |
| `privacy` | `VARCHAR(100)` | Yes | `'public'` | Visibility state used by feeds and spaces. |
| `status` | `VARCHAR(100)` | Yes | `'published'` | Lifecycle or moderation status. |
| `featured_image` | `TEXT` | Yes | `—` | Featured Image stored for this record. |
| `meta` | `LONGTEXT` | Yes | `—` | Serialized meta payload used by FluentCommunity. |
| `is_sticky` | `TINYINT(1)` | Yes | `0` | Boolean-like flag used for pinned or sticky records. |
| `comments_count` | `INT(11), cast: int` | Yes | `0` | Cached number of comments attached to the record. |
| `reactions_count` | `INT(11), cast: int` | Yes | `0` | Cached number of reactions attached to the record. |
| `priority` | `INT(11)` | Yes | `0` | Numeric priority used for pinned or featured ordering. |
| `expired_at` | `DATETIME` | Yes | `—` | Expired At stored for this record. |
| `scheduled_at` | `DATETIME` | Yes | `—` | Scheduled At stored for this record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `lessons()` | `hasMany` | `CourseLesson` | Signature: `—` |
| `owner()` | `belongsTo` | `User` | Signature: `—` |
| `course()` | `belongsTo` | `Course` | Signature: `—` |
| `comments()` | `hasMany` | `Comment` | Signature: `—` |
| `reactions()` | `hasMany` | `Reaction` | Signature: `—` |
| `terms()` | `belongsToMany` | `Term` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `SearchBy` | `$query, $search` | Search By scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `hasUserReact()` | has User React implemented on the model. |
| `updateCustomMeta()` | update Custom Meta implemented on the model. |

## Usage Examples

```php
use FluentCommunity\Modules\Course\Model\CourseTopic;

$records = CourseTopic::query()
    ->searchBy('example')
    ->limit(10)
    ->get();

$first = CourseTopic::query()->first();
```
