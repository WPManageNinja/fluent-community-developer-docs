---
title: BaseSpace Model
description: ORM reference for FluentCommunity\App\Models\BaseSpace.
---

# BaseSpace Model

Provides the shared ORM behavior for spaces, courses, space groups, and sidebar links.

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
| `space_pivot()` | `belongsTo` | `SpaceUserPivot` | Signature: `—` |
| `admins()` | `belongsToMany` | `User` | Signature: `—` |
| `posts()` | `hasMany` | `Feed` | Signature: `—` |
| `comments()` | `hasManyThrough` | `Comment` | Signature: `—` |
| `members()` | `belongsToMany` | `User` | Signature: `—` |
| `x_members()` | `belongsToMany` | `XProfile` | Signature: `—` |
| `group()` | `belongsTo` | `SpaceGroup` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `SearchBy` | `$query, $search` | Search By scope declared on the model. |
| `OnlyMain` | `$query` | Only Main scope declared on the model. |
| `FilterByUserId` | `$query, $userId` | Filter By User Id scope declared on the model. |
| `ByUserAccess` | `$query, $userId` | By User Access scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `updateCustomData()` | Sanitizes and persists mutable space fields such as title, description, media, and settings. |
| `getMembership()` | Returns the current user membership record for the space, including the pivot metadata. |
| `isAdmin()` | Checks whether a user is an admin or, optionally, a moderator for the current space. |
| `formatSpaceData()` | Normalizes related data before a space object is returned from controllers. |
| `isCourseSpace()` | is Course Space implemented on the model. |
| `isContentSpace()` | is Content Space implemented on the model. |
| `defaultSettings()` | default Settings implemented on the model. |
| `canViewMembers()` | can View Members implemented on the model. |
| `verifyUserPermisson()` | verify User Permisson implemented on the model. |
| `hasPaywallIntegration()` | has Paywall Integration implemented on the model. |
| `updateCustomMeta()` | update Custom Meta implemented on the model. |
| `syncTopics()` | sync Topics implemented on the model. |

## Usage Examples

```php
use FluentCommunity\App\Models\BaseSpace;

$records = BaseSpace::query()
    ->searchBy('example')
    ->limit(10)
    ->get();

$first = BaseSpace::query()->first();
```
