---
title: Feed Model
description: ORM reference for FluentCommunity\App\Models\Feed.
---

# Feed Model

Represents community posts, announcements, scheduled posts, and other feed content.

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
| `is_sticky` | `TINYINT(1), cast: int` | Yes | `0` | Boolean-like flag used for pinned or sticky records. |
| `comments_count` | `INT(11), cast: int` | Yes | `0` | Cached number of comments attached to the record. |
| `reactions_count` | `INT(11), cast: int` | Yes | `0` | Cached number of reactions attached to the record. |
| `priority` | `INT(11), cast: int` | Yes | `0` | Numeric priority used for pinned or featured ordering. |
| `expired_at` | `DATETIME` | Yes | `—` | Expired At stored for this record. |
| `scheduled_at` | `DATETIME` | Yes | `—` | Scheduled At stored for this record. |
| `created_at` | `TIMESTAMP` | Yes | `—` | Creation timestamp maintained by the ORM. |
| `updated_at` | `TIMESTAMP` | Yes | `—` | Update timestamp maintained by the ORM. |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `user()` | `belongsTo` | `User` | Signature: `—` |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |
| `space()` | `belongsTo` | `BaseSpace` | Signature: `—` |
| `comments()` | `hasMany` | `Comment` | Signature: `—` |
| `reactions()` | `hasMany` | `Reaction` | Signature: `—` |
| `follows()` | `hasMany` | `Follow` | Signature: `—` |
| `surveyVotes()` | `hasMany` | `Reaction` | Signature: `—` |
| `terms()` | `belongsToMany` | `Term` | Signature: `—` |
| `activities()` | `hasMany` | `Activity` | Signature: `—` |
| `notifications()` | `hasMany` | `Notification` | Signature: `—` |
| `media()` | `hasMany` | `Media` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `SearchBy` | `$query, $search, $in = []` | Search By scope declared on the model. |
| `ByUserAccess` | `$query, $userId` | By User Access scope declared on the model. |
| `ByContentModerationAccessStatus` | `$query, $user, $space = null` | By Content Moderation Access Status scope declared on the model. |
| `ByBookMarked` | `$query, $userId` | By Book Marked scope declared on the model. |
| `ByTopicSlug` | `$query, $topicSlug` | By Topic Slug scope declared on the model. |
| `FilterBySpaceSlug` | `$query, $space` | Filter By Space Slug scope declared on the model. |
| `ByType` | `$query, $type` | By Type scope declared on the model. |
| `CustomOrderBy` | `$query, $type` | Custom Order By scope declared on the model. |
| `ByStatus` | `$query, $status` | By Status scope declared on the model. |
| `ByFollowing` | `$query, $userId = null` | By Following scope declared on the model. |
| `FilterByUserId` | `$query, $userId` | Filter By User Id scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `getHumanExcerpt()` | Returns a short excerpt used in notifications and activity messages. |
| `hasEditAccess()` | Checks whether the current user can edit the feed item. |
| `updateCustomMeta()` | Persists a single custom meta value on the feed record. |
| `getCustomMeta()` | Reads a single custom meta value from the serialized feed meta payload. |
| `hasUserReact()` | has User React implemented on the model. |
| `attachTopics()` | attach Topics implemented on the model. |
| `recountStats()` | recount Stats implemented on the model. |
| `isEnabledForEveryoneTag()` | is Enabled For Everyone Tag implemented on the model. |

## Usage Examples

```php
use FluentCommunity\App\Models\Feed;

$records = Feed::query()
    ->searchBy('example', null)
    ->limit(10)
    ->get();

$first = Feed::query()->first();
```
