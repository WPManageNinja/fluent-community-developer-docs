---
title: Relationships
description: Relationship patterns used by FluentCommunity models.
---

# Relationships

The model layer uses standard WPFluent relation helpers such as `belongsTo`, `hasMany`, `belongsToMany`, and `hasManyThrough`.

## Relationship Inventory

| Source | Method | Type | Target |
| --- | --- | --- | --- |
| [`Activity`](/database/models/activity) | `feed` | `belongsTo` | `Feed` |
| [`Activity`](/database/models/activity) | `space` | `belongsTo` | `BaseSpace` |
| [`Activity`](/database/models/activity) | `user` | `belongsTo` | `User` |
| [`Activity`](/database/models/activity) | `xprofile` | `belongsTo` | `XProfile` |
| [`BaseSpace`](/database/models/base-space) | `owner` | `belongsTo` | `User` |
| [`BaseSpace`](/database/models/base-space) | `space_pivot` | `belongsTo` | `SpaceUserPivot` |
| [`BaseSpace`](/database/models/base-space) | `admins` | `belongsToMany` | `User` |
| [`BaseSpace`](/database/models/base-space) | `posts` | `hasMany` | `Feed` |
| [`BaseSpace`](/database/models/base-space) | `comments` | `hasManyThrough` | `Comment` |
| [`BaseSpace`](/database/models/base-space) | `members` | `belongsToMany` | `User` |
| [`BaseSpace`](/database/models/base-space) | `x_members` | `belongsToMany` | `XProfile` |
| [`BaseSpace`](/database/models/base-space) | `group` | `belongsTo` | `SpaceGroup` |
| [`Comment`](/database/models/comment) | `user` | `belongsTo` | `User` |
| [`Comment`](/database/models/comment) | `xprofile` | `belongsTo` | `XProfile` |
| [`Comment`](/database/models/comment) | `media` | `hasOne` | `Media` |
| [`Comment`](/database/models/comment) | `post` | `belongsTo` | `Feed` |
| [`Comment`](/database/models/comment) | `space` | `hasOneThrough` | `BaseSpace` |
| [`Comment`](/database/models/comment) | `reactions` | `hasMany` | `Reaction` |
| [`Feed`](/database/models/feed) | `user` | `belongsTo` | `User` |
| [`Feed`](/database/models/feed) | `xprofile` | `belongsTo` | `XProfile` |
| [`Feed`](/database/models/feed) | `space` | `belongsTo` | `BaseSpace` |
| [`Feed`](/database/models/feed) | `comments` | `hasMany` | `Comment` |
| [`Feed`](/database/models/feed) | `reactions` | `hasMany` | `Reaction` |
| [`Feed`](/database/models/feed) | `follows` | `hasMany` | `Follow` |
| [`Feed`](/database/models/feed) | `surveyVotes` | `hasMany` | `Reaction` |
| [`Feed`](/database/models/feed) | `terms` | `belongsToMany` | `Term` |
| [`Feed`](/database/models/feed) | `activities` | `hasMany` | `Activity` |
| [`Feed`](/database/models/feed) | `notifications` | `hasMany` | `Notification` |
| [`Feed`](/database/models/feed) | `media` | `hasMany` | `Media` |
| [`Media`](/database/models/media) | `feed` | `belongsTo` | `Feed` |
| [`Media`](/database/models/media) | `user` | `belongsTo` | `User` |
| [`Media`](/database/models/media) | `xprofile` | `belongsTo` | `XProfile` |
| [`Notification`](/database/models/notification) | `subscribers` | `hasMany` | `NotificationSubscriber` |
| [`Notification`](/database/models/notification) | `subscriber` | `hasOne` | `NotificationSubscriber` |
| [`Notification`](/database/models/notification) | `feed` | `belongsTo` | `Feed` |
| [`Notification`](/database/models/notification) | `src_user` | `belongsTo` | `User` |
| [`Notification`](/database/models/notification) | `xprofile` | `belongsTo` | `XProfile` |
| [`NotificationSubscriber`](/database/models/notification-subscriber) | `user` | `belongsTo` | `User` |
| [`NotificationSubscriber`](/database/models/notification-subscriber) | `xprofile` | `belongsTo` | `XProfile` |
| [`NotificationSubscriber`](/database/models/notification-subscriber) | `notification` | `belongsTo` | `Notification` |
| [`NotificationSubscription`](/database/models/notification-subscription) | `user` | `belongsTo` | `User` |
| [`NotificationSubscription`](/database/models/notification-subscription) | `xprofile` | `belongsTo` | `XProfile` |
| [`Reaction`](/database/models/reaction) | `user` | `belongsTo` | `User` |
| [`Reaction`](/database/models/reaction) | `xprofile` | `belongsTo` | `XProfile` |
| [`Reaction`](/database/models/reaction) | `feed` | `belongsTo` | `Feed` |
| [`Reaction`](/database/models/reaction) | `comment` | `belongsTo` | `Comment` |
| [`SidebarLink`](/database/models/sidebar-link) | `owner` | `belongsTo` | `User` |
| [`SidebarLink`](/database/models/sidebar-link) | `space_pivot` | `belongsTo` | `SpaceUserPivot` |
| [`SidebarLink`](/database/models/sidebar-link) | `admins` | `belongsToMany` | `User` |
| [`SidebarLink`](/database/models/sidebar-link) | `posts` | `hasMany` | `Feed` |
| [`SidebarLink`](/database/models/sidebar-link) | `comments` | `hasManyThrough` | `Comment` |
| [`SidebarLink`](/database/models/sidebar-link) | `members` | `belongsToMany` | `User` |
| [`SidebarLink`](/database/models/sidebar-link) | `x_members` | `belongsToMany` | `XProfile` |
| [`SidebarLink`](/database/models/sidebar-link) | `group` | `belongsTo` | `SpaceGroup` |
| [`Space`](/database/models/space) | `owner` | `belongsTo` | `User` |
| [`Space`](/database/models/space) | `space_pivot` | `belongsTo` | `SpaceUserPivot` |
| [`Space`](/database/models/space) | `admins` | `belongsToMany` | `User` |
| [`Space`](/database/models/space) | `posts` | `hasMany` | `Feed` |
| [`Space`](/database/models/space) | `comments` | `hasManyThrough` | `Comment` |
| [`Space`](/database/models/space) | `members` | `belongsToMany` | `User` |
| [`Space`](/database/models/space) | `x_members` | `belongsToMany` | `XProfile` |
| [`Space`](/database/models/space) | `group` | `belongsTo` | `SpaceGroup` |
| [`SpaceGroup`](/database/models/space-group) | `owner` | `belongsTo` | `User` |
| [`SpaceGroup`](/database/models/space-group) | `spaces` | `hasMany` | `BaseSpace` |
| [`SpaceUserPivot`](/database/models/space-user-pivot) | `user` | `belongsTo` | `User` |
| [`SpaceUserPivot`](/database/models/space-user-pivot) | `xprofile` | `belongsTo` | `XProfile` |
| [`SpaceUserPivot`](/database/models/space-user-pivot) | `space` | `belongsTo` | `BaseSpace` |
| [`Term`](/database/models/term) | `posts` | `belongsToMany` | `Feed` |
| [`Term`](/database/models/term) | `base_spaces` | `belongsToMany` | `BaseSpace` |
| [`UserMeta`](/database/models/user-meta) | `user` | `belongsTo` | `User` |
| [`XProfile`](/database/models/x-profile) | `user` | `belongsTo` | `User` |
| [`XProfile`](/database/models/x-profile) | `contact` | `hasOne` | `Contact` |
| [`XProfile`](/database/models/x-profile) | `spaces` | `belongsToMany` | `BaseSpace` |
| [`XProfile`](/database/models/x-profile) | `posts` | `hasMany` | `Feed` |
| [`XProfile`](/database/models/x-profile) | `follows` | `hasMany` | `Follow` |
| [`XProfile`](/database/models/x-profile) | `followers` | `hasMany` | `Follow` |
| [`XProfile`](/database/models/x-profile) | `comments` | `hasMany` | `Comment` |
| [`XProfile`](/database/models/x-profile) | `courses` | `belongsToMany` | `Course` |
| [`XProfile`](/database/models/x-profile) | `space_pivot` | `belongsTo` | `SpaceUserPivot` |
| [`XProfile`](/database/models/x-profile) | `community_role` | `belongsTo` | `Meta` |
