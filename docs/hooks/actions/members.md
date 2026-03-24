---
title: Members Actions
description: Members action hooks for FluentCommunity.
---

# Members Actions

12 unique action hooks currently map to this category, across 17 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/after_sync_bp_users`](#fluent_communityafter_sync_bp_users) | Core | 2 | `fluent-community/app/Hooks/CLI/BuddyPressMigrator.php:152` |
| [`fluent_community/auth/show_invitation_for_user`](#fluent_communityauthshow_invitation_for_user) | Core | 1 | `fluent-community/Modules/Auth/AuthModdule.php:267` |
| [`fluent_community/before_unblocking_user`](#fluent_communitybefore_unblocking_user) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/FollowController.php:205` |
| [`fluent_community/before_unfollowing_user`](#fluent_communitybefore_unfollowing_user) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/FollowController.php:76` |
| [`fluent_community/blocked_user`](#fluent_communityblocked_user) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/FollowController.php:176` |
| [`fluent_community/followed_user`](#fluent_communityfollowed_user) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/FollowController.php:47` |
| [`fluent_community/members_query_ref`](#fluent_communitymembers_query_ref) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:110` |
| [`fluent_community/notification/comment/notifed_to_other_users`](#fluent_communitynotificationcommentnotifed_to_other_users) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:483` |
| [`fluent_community/profile_deactivated`](#fluent_communityprofile_deactivated) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:156` |
| [`fluent_community/update_profile_link_providers`](#fluent_communityupdate_profile_link_providers) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:537` |
| [`fluent_community/user_level_upgraded`](#fluent_communityuser_level_upgraded) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/LeaderBoard/LeaderBoardModule.php:110` |
| [`fluent_community/user_points_updated`](#fluent_communityuser_points_updated) | Core + <span class="pro-badge">PRO</span> | 3 | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:82` |

<a id="fluent_communityafter_sync_bp_users"></a>

## `fluent_community/after_sync_bp_users`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** After Sync Bp Users hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/CLI/BuddyPressMigrator.php:152` | `$users` (array) |
| Core | `fluent-community/Modules/Migrations/Http/Controllers/BPMigrationController.php:165` | `$users` (array) |

### Example

```php
add_action('fluent_community/after_sync_bp_users', function ($users) {
}, 10, 1);
```

<a id="fluent_communityauthshow_invitation_for_user"></a>

## `fluent_community/auth/show_invitation_for_user`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Auth/Show Invitation For User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:267` | `$inviation` (mixed)<br>`$frameData` (mixed) |

### Example

```php
add_action('fluent_community/auth/show_invitation_for_user', function ($inviation, $frameData) {
}, 10, 2);
```

<a id="fluent_communitybefore_unblocking_user"></a>

## `fluent_community/before_unblocking_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Before Unblocking User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:205` | `$follow` (mixed)<br>`$xProfile` (mixed) |

### Example

```php
add_action('fluent_community/before_unblocking_user', function ($follow, $xProfile) {
}, 10, 2);
```

<a id="fluent_communitybefore_unfollowing_user"></a>

## `fluent_community/before_unfollowing_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Before Unfollowing User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:76` | `$follow` (mixed)<br>`$xProfile` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:113` | `$follow` (mixed)<br>`$xProfile` (mixed) |

### Example

```php
add_action('fluent_community/before_unfollowing_user', function ($follow, $xProfile) {
}, 10, 2);
```

<a id="fluent_communityblocked_user"></a>

## `fluent_community/blocked_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Blocked User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:176` | `$follow` (mixed)<br>`$xProfile` (mixed) |

### Example

```php
add_action('fluent_community/blocked_user', function ($follow, $xProfile) {
}, 10, 2);
```

<a id="fluent_communityfollowed_user"></a>

## `fluent_community/followed_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Followed User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:47` | `$follow` (mixed)<br>`$xProfile` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:120` | `$follow` (mixed)<br>`$xProfile` (mixed) |

### Example

```php
add_action('fluent_community/followed_user', function ($follow, $xProfile) {
}, 10, 2);
```

<a id="fluent_communitymembers_query_ref"></a>

## `fluent_community/members_query_ref`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Members Query Ref hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/MembersController.php:110` | `[&$members, $request->all()]` (array) |

### Example

```php
add_action('fluent_community/members_query_ref', function ($all) {
}, 10, 1);
```

<a id="fluent_communitynotificationcommentnotifed_to_other_users"></a>

## `fluent_community/notification/comment/notifed_to_other_users`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Notification/Comment/Notifed To Other Users hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:483` | `[ 'user_ids' => $sendingUserIds, 'key' => 'notifed_to_other_users', 'notification' => $notification, 'comment' => $comment, 'feed' => $feed ]` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_other_users', function ($sendingUserIds) {
}, 10, 1);
```

<a id="fluent_communityprofile_deactivated"></a>

## `fluent_community/profile_deactivated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile Deactivated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:156` | `$xprofile` (mixed) |

### Example

```php
add_action('fluent_community/profile_deactivated', function ($xprofile) {
}, 10, 1);
```

<a id="fluent_communityupdate_profile_link_providers"></a>

## `fluent_community/update_profile_link_providers`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Update Profile Link Providers hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:537` | `$config` (mixed) |

### Example

```php
add_action('fluent_community/update_profile_link_providers', function ($config) {
}, 10, 1);
```

<a id="fluent_communityuser_level_upgraded"></a>

## `fluent_community/user_level_upgraded`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** User Level Upgraded hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/LeaderBoardModule.php:110` | `$xprofile` (mixed)<br>`$newLevel` (mixed)<br>`$oldLevel` (mixed) |

### Example

```php
add_action('fluent_community/user_level_upgraded', function ($xprofile, $newLevel, $oldLevel) {
}, 10, 3);
```

<a id="fluent_communityuser_points_updated"></a>

## `fluent_community/user_points_updated`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 3
- **When it fires:** User Points Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:82` | `$profileModel` (mixed)<br>`$oldPoints` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/Services/LeaderBoardHelper.php:180` | `$xprofile` (mixed)<br>`$oldPoints` (mixed) |
| Core | `fluent-community/app/Hooks/CLI/Commands.php:151` | `$xProfile` (mixed)<br>`$oldPoints` (mixed) |

### Example

```php
add_action('fluent_community/user_points_updated', function ($profileModel, $oldPoints) {
}, 10, 2);
```

