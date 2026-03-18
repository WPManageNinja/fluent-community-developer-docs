---
title: SidebarLink Model
description: ORM reference for FluentCommunity\App\Models\SidebarLink.
---

# SidebarLink Model

Uses the shared spaces table to store custom sidebar navigation links.

## Table

- **Table:** `fcom_spaces`
- **Primary key:** `id`

- **Extends:** `BaseSpace`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |
| `created_by` | `string` | Yes | `—` | WordPress user ID that created the record. |
| `parent_id` | `integer` | Yes | `—` | Parent row ID used for threading or hierarchy. |
| `title` | `string` | Yes | `—` | Human-readable title stored for the record. |
| `slug` | `string` | Yes | `—` | Sanitized slug or public identifier. |
| `description` | `string` | Yes | `—` | Description stored for this record. |
| `logo` | `string` | Yes | `—` | Logo stored for this record. |
| `cover_photo` | `string` | Yes | `—` | Cover Photo stored for this record. |
| `type` | `string` | Yes | `—` | Subtype discriminator for the row. |
| `privacy` | `string` | Yes | `—` | Visibility state used by feeds and spaces. |
| `status` | `string` | Yes | `—` | Lifecycle or moderation status. |
| `serial` | `integer` | Yes | `—` | Ordering index inside a group of related records. |
| `settings` | `serialized` | Yes | `—` | Serialized settings payload. |

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
| `isCourseSpace()` | is Course Space implemented on the model. |
| `isAdmin()` | is Admin implemented on the model. |
| `updateCustomData()` | update Custom Data implemented on the model. |
| `isContentSpace()` | is Content Space implemented on the model. |
| `defaultSettings()` | default Settings implemented on the model. |
| `canViewMembers()` | can View Members implemented on the model. |
| `verifyUserPermisson()` | verify User Permisson implemented on the model. |
| `hasPaywallIntegration()` | has Paywall Integration implemented on the model. |
| `updateCustomMeta()` | update Custom Meta implemented on the model. |
| `syncTopics()` | sync Topics implemented on the model. |
| `formatSpaceData()` | format Space Data implemented on the model. |

## Usage Examples

```php
use FluentCommunity\App\Models\SidebarLink;

$records = SidebarLink::query()
    ->searchBy('example')
    ->limit(10)
    ->get();

$first = SidebarLink::query()->first();
```
