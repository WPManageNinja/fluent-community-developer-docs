---
title: Query Builder
description: Common query builder patterns and available model scopes.
---

# Query Builder

FluentCommunity models inherit the WPFluent query builder. The generated scope inventory below comes directly from `scope*` methods in the model layer.

## Scope Inventory

| Model | Scope | Parameters |
| --- | --- | --- |
| [`Activity`](/database/models/activity) | `ByActions` | `$query, $actions = []` |
| [`Activity`](/database/models/activity) | `BySpace` | `$query, $spaceId` |
| [`BaseSpace`](/database/models/base-space) | `SearchBy` | `$query, $search` |
| [`BaseSpace`](/database/models/base-space) | `OnlyMain` | `$query` |
| [`BaseSpace`](/database/models/base-space) | `FilterByUserId` | `$query, $userId` |
| [`BaseSpace`](/database/models/base-space) | `ByUserAccess` | `$query, $userId` |
| [`Comment`](/database/models/comment) | `SearchBy` | `$query, $search` |
| [`Comment`](/database/models/comment) | `ByContentModerationAccessStatus` | `$query, $user, $space = null` |
| [`Feed`](/database/models/feed) | `SearchBy` | `$query, $search, $in = []` |
| [`Feed`](/database/models/feed) | `ByUserAccess` | `$query, $userId` |
| [`Feed`](/database/models/feed) | `ByContentModerationAccessStatus` | `$query, $user, $space = null` |
| [`Feed`](/database/models/feed) | `ByBookMarked` | `$query, $userId` |
| [`Feed`](/database/models/feed) | `ByTopicSlug` | `$query, $topicSlug` |
| [`Feed`](/database/models/feed) | `FilterBySpaceSlug` | `$query, $space` |
| [`Feed`](/database/models/feed) | `ByType` | `$query, $type` |
| [`Feed`](/database/models/feed) | `CustomOrderBy` | `$query, $type` |
| [`Feed`](/database/models/feed) | `ByStatus` | `$query, $status` |
| [`Feed`](/database/models/feed) | `ByFollowing` | `$query, $userId = null` |
| [`Feed`](/database/models/feed) | `FilterByUserId` | `$query, $userId` |
| [`Media`](/database/models/media) | `BySource` | `$query, $sources = []` |
| [`Media`](/database/models/media) | `ByMediaKey` | `$query, $key` |
| [`Media`](/database/models/media) | `ByUser` | `$query, $userId` |
| [`Meta`](/database/models/meta) | `ByType` | `$query, $type` |
| [`Meta`](/database/models/meta) | `ByMetaKey` | `$query, $key` |
| [`Meta`](/database/models/meta) | `ByObjectId` | `$query, $objectId` |
| [`Notification`](/database/models/notification) | `ByStatus` | `$query, $status, $userId` |
| [`Notification`](/database/models/notification) | `ByType` | `$query, $type` |
| [`NotificationSubscriber`](/database/models/notification-subscriber) | `Unread` | `$query` |
| [`NotificationSubscriber`](/database/models/notification-subscriber) | `Read` | `$query` |
| [`Reaction`](/database/models/reaction) | `TypeBy` | `$query, $type = 'like'` |
| [`Reaction`](/database/models/reaction) | `ObjectType` | `$query, $type = 'feed'` |
| [`SidebarLink`](/database/models/sidebar-link) | `SearchBy` | `$query, $search` |
| [`SidebarLink`](/database/models/sidebar-link) | `OnlyMain` | `$query` |
| [`SidebarLink`](/database/models/sidebar-link) | `FilterByUserId` | `$query, $userId` |
| [`SidebarLink`](/database/models/sidebar-link) | `ByUserAccess` | `$query, $userId` |
| [`Space`](/database/models/space) | `SearchBy` | `$query, $search` |
| [`Space`](/database/models/space) | `OnlyMain` | `$query` |
| [`Space`](/database/models/space) | `FilterByUserId` | `$query, $userId` |
| [`Space`](/database/models/space) | `ByUserAccess` | `$query, $userId` |
| [`SpaceGroup`](/database/models/space-group) | `SearchBy` | `$query, $search` |
| [`SpaceUserPivot`](/database/models/space-user-pivot) | `BySpace` | `$query, $spaceId` |
| [`SpaceUserPivot`](/database/models/space-user-pivot) | `ByUser` | `$query, $userId` |
| [`Term`](/database/models/term) | `SearchBy` | `$query, $search` |
| [`UserMeta`](/database/models/user-meta) | `ByKey` | `$query, $key` |
| [`UserMeta`](/database/models/user-meta) | `ByUser` | `$query, $userId` |
| [`XProfile`](/database/models/x-profile) | `SearchBy` | `$query, $search` |
| [`XProfile`](/database/models/x-profile) | `MentionBy` | `$query, $search` |

## Common Patterns

```php
use FluentCommunity\App\Models\Feed;
use FluentCommunity\App\Models\Space;

$feeds = Feed::query()
    ->searchBy('release notes')
    ->byUserAccess(get_current_user_id())
    ->limit(10)
    ->get();

$spaces = Space::query()
    ->searchBy('marketing')
    ->orderBy('title', 'ASC')
    ->get();
```
