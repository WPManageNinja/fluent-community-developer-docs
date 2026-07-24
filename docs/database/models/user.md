---
title: User Model
description: ORM reference for FluentCommunity\App\Models\User.
---

# User Model

Wraps the WordPress `users` table with community-specific relationships and helpers.

## Table

- **Table:** `users`
- **Primary key:** `ID`
- **Schema ownership:** WordPress core table. FluentCommunity reads from it but does not create or migrate it.
- **Extends:** `Model`

## Attributes

| Column | Type | Nullable | Default | Description |
| --- | --- | --- | --- | --- |

## Relationships

| Method | Type | Target | Notes |
| --- | --- | --- | --- |
| `xprofile()` | `belongsTo` | `XProfile` | Signature: `—` |
| `follows()` | `hasMany` | `Follow` | Signature: `—` |
| `followers()` | `hasMany` | `Follow` | Signature: `—` |
| `usermeta()` | `hasMany` | `UserMeta` | Signature: `—` |
| `messages()` | `hasMany` | `Message` | Signature: `—` |
| `spaces()` | `belongsToMany` | `BaseSpace` | Signature: `—` |
| `courses()` | `belongsToMany` | `Course` | Signature: `—` |
| `notificationSubscriptions()` | `hasMany` | `NotificationSubscription` | Signature: `—` |
| `space_pivot()` | `belongsTo` | `SpaceUserPivot` | Signature: `—` |
| `notification_records()` | `hasMany` | `NotificationSubscriber` | Signature: `—` |
| `crm_contact()` | `belongsTo` | `Contact` | Signature: `—` |
| `community_role()` | `belongsTo` | `Meta` | Signature: `—` |

## Scopes

| Scope | Parameters | Purpose |
| --- | --- | --- |
| `SearchBy` | `$query, $search` | Search By scope declared on the model. |
| `MentionBy` | `$query, $search` | Mention By scope declared on the model. |

## Key Methods

| Method | Description |
| --- | --- |
| `getGeneralData()` | Builds a normalized profile payload used by controllers and portal views. |
| `cacheAccessSpaces()` | Caches the set of spaces the user can access to reduce repeated permission lookups. |
| `updateCustomData()` | update Custom Data implemented on the model. |
| `updateCustomMeta()` | update Custom Meta implemented on the model. |
| `isNotMemberOfAnySpace()` | is Not Member Of Any Space implemented on the model. |
| `isCommunityAdmin()` | is Community Admin implemented on the model. |
| `isCommunityModerator()` | is Community Moderator implemented on the model. |
| `hasCommunityModeratorAccess()` | has Community Moderator Access implemented on the model. |
| `hasCommunityAdminAccess()` | has Community Admin Access implemented on the model. |
| `hasCourseCreatorAccess()` | has Course Creator Access implemented on the model. |
| `isSpaceModerator()` | is Space Moderator implemented on the model. |
| `hasSpaceManageAccess()` | has Space Manage Access implemented on the model. |
| `hasCommunityPermission()` | has Community Permission implemented on the model. |
| `hasSpacePermission()` | has Space Permission implemented on the model. |
| `verifyCommunityPermission()` | verify Community Permission implemented on the model. |
| `verifySpacePermission()` | verify Space Permission implemented on the model. |
| `canEditFeed()` | can Edit Feed implemented on the model. |
| `canDeleteFeed()` | can Delete Feed implemented on the model. |
| `can()` | can implemented on the model. |
| `hasPermissionOrInCurrentSpace()` | has Permission Or In Current Space implemented on the model. |
| `isVerified()` | is Verified implemented on the model. |
| `syncXProfile()` | sync XProfile implemented on the model. |

## Usage Examples

```php
use FluentCommunity\App\Models\User;

$records = User::query()
    ->searchBy('example')
    ->limit(10)
    ->get();

$first = User::query()->first();
```
