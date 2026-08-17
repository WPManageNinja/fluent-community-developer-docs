---
title: Members Actions
description: Members action hooks for FluentCommunity.
---

# Members Actions

18 unique action hooks currently map to this category, across 26 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community_sync_user_points`](#fluent-community-sync-user-points) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/LeaderBoard/LeaderBoardModule.php:96` |
| [`fluent_community/after_sync_bp_users`](#fluent-community-after-sync-bp-users) | Core | 2 | `fluent-community/app/Hooks/CLI/BuddyPressMigrator.php:153` |
| [`fluent_community/before_unblocking_user`](#fluent-community-before-unblocking-user) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/FollowController.php:205` |
| [`fluent_community/before_unfollowing_user`](#fluent-community-before-unfollowing-user) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/FollowController.php:76` |
| [`fluent_community/blocked_user`](#fluent-community-blocked-user) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/FollowController.php:176` |
| [`fluent_community/email_notify_users_everyone_tag`](#fluent-community-email-notify-users-everyone-tag) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:490` |
| [`fluent_community/followed_user`](#fluent-community-followed-user) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/FollowController.php:47` |
| [`fluent_community/managed/after_remove`](#fluent-community-managed-after-remove) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:132` |
| [`fluent_community/manager/added`](#fluent-community-manager-added) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:108` |
| [`fluent_community/manager/before_remove`](#fluent-community-manager-before-remove) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:128` |
| [`fluent_community/manager/updated`](#fluent-community-manager-updated) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:91` |
| [`fluent_community/members_query_ref`](#fluent-community-members-query-ref) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:124` |
| [`fluent_community/profile_deactivated`](#fluent-community-profile-deactivated) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:175` |
| [`fluent_community/reactivate_account`](#fluent-community-reactivate-account) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:232` |
| [`fluent_community/track_activity`](#fluent-community-track-activity) | Core | 3 | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:87` |
| [`fluent_community/update_profile_link_providers`](#fluent-community-update-profile-link-providers) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:528` |
| [`fluent_community/user_level_upgraded`](#fluent-community-user-level-upgraded) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/LeaderBoard/LeaderBoardModule.php:111` |
| [`fluent_community/user_points_updated`](#fluent-community-user-points-updated) | Core <span class="edition-note">(also fired by Pro)</span> | 3 | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:82` |

<a id="fluent-community-sync-user-points"></a>

## `fluent_community_sync_user_points`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/LeaderBoardModule.php:96` | No parameters |

### Example

```php
add_action('fluent_community_sync_user_points', function () {
}, 10, 0);
```

<a id="fluent-community-after-sync-bp-users"></a>

## `fluent_community/after_sync_bp_users`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/CLI/BuddyPressMigrator.php:153` | `$users` (array) |
| Core | `fluent-community/Modules/Migrations/Http/Controllers/BPMigrationController.php:162` | `$users` (array) |

### Example

```php
add_action('fluent_community/after_sync_bp_users', function ($users) {
}, 10, 1);
```

<a id="fluent-community-before-unblocking-user"></a>

## `fluent_community/before_unblocking_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires just before a block is lifted.

The row still exists when callbacks run; the handler deletes it on the next line. Unblocking deletes the row outright rather than restoring it to level 1, so the previous follow relationship is not recovered and no follow action fires afterwards.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$follow` | `\FluentCommunityPro\App\Models\Follow` | The level-0 follow row about to be deleted. |
| 2 | `$xProfile` | `\FluentCommunity\App\Models\XProfile` | Profile of the user being unblocked. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:205` | `$follow` (mixed)<br>`$xProfile` (XProfile) |

### Example

```php
add_action('fluent_community/before_unblocking_user', function ($follow, $xProfile) {
}, 10, 2);
```

**Related:** [`fluent_community/blocked_user`](#fluent-community-blocked-user)

<a id="fluent-community-before-unfollowing-user"></a>

## `fluent_community/before_unfollowing_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Fires just before a follow relationship is deleted.

Fired from both the explicit POST /profile/{username}/unfollow endpoint and the toggle-follow endpoint when the toggle resolves to "unfollow". The row still exists when callbacks run — this is the last chance to read it, since the handler calls $follow->delete() on the next line. There is no matching "after" action.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$follow` | `\FluentCommunityPro\App\Models\Follow` | The follow row about to be deleted. |
| 2 | `$xProfile` | `\FluentCommunity\App\Models\XProfile` | Profile of the user being unfollowed. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:76` | `$follow` (mixed)<br>`$xProfile` (XProfile) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:113` | `$follow` (mixed)<br>`$xProfile` (XProfile) |

### Example

```php
add_action('fluent_community/before_unfollowing_user', function ($follow, $xProfile) {
}, 10, 2);
```

**Related:** [`fluent_community/followed_user`](#fluent-community-followed-user)

<a id="fluent-community-blocked-user"></a>

## `fluent_community/blocked_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires after one member blocks another.

A block is stored as a Follow row with level 0, so this fires both when a brand new row is created and when an existing follow is demoted to a block. This is a member-to-member block, not a moderation action: the endpoint explicitly refuses when the target has community moderator access, and also refuses when the *caller* is a moderator.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$follow` | `\FluentCommunityPro\App\Models\Follow` | The follow row now at level 0. |
| 2 | `$xProfile` | `\FluentCommunity\App\Models\XProfile` | Profile of the blocked user. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:176` | `$follow` (mixed)<br>`$xProfile` (XProfile) |

### Example

```php
add_action('fluent_community/blocked_user', function ($follow, $xProfile) {
}, 10, 2);
```

**Related:** [`fluent_community/before_unblocking_user`](#fluent-community-before-unblocking-user)

<a id="fluent-community-email-notify-users-everyone-tag"></a>

## `fluent_community/email_notify_users_everyone_tag`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:490` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:730` | No parameters |

### Example

```php
add_action('fluent_community/email_notify_users_everyone_tag', function () {
}, 10, 0);
```

<a id="fluent-community-followed-user"></a>

## `fluent_community/followed_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Fires immediately after one member starts following another.

Fired from two call sites — the explicit POST /profile/{username}/follow endpoint and the POST /profile/{userId}/toggle-follow endpoint when the toggle resolves to "follow". The Follow row has already been inserted with its default level of 1, so a callback can read $follow->id. It does not fire when an existing block is lifted, and it never fires for self-follows or for a user who already has any Follow row (including a block, which is a Follow row at level 0).

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$follow` | `\FluentCommunityPro\App\Models\Follow` | The newly created follow row (follower_id, followed_id, level). |
| 2 | `$xProfile` | `\FluentCommunity\App\Models\XProfile` | Profile of the user being followed. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:47` | `$follow` (mixed)<br>`$xProfile` (XProfile) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:120` | `$follow` (mixed)<br>`$xProfile` (XProfile) |

### Example

```php
add_action('fluent_community/followed_user', function ($follow, $xProfile) {
}, 10, 2);
```

**Related:** [`fluent_community/before_unfollowing_user`](#fluent-community-before-unfollowing-user) · [`fluent_community/blocked_user`](#fluent-community-blocked-user)

<a id="fluent-community-managed-after-remove"></a>

## `fluent_community/managed/after_remove`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires after a user's community manager roles have been deleted.

The paired action for `manager/before_remove`. The segment is spelled `managed` rather than `manager`, which looks like a typo but is part of the public surface; the role row no longer exists by the time this runs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$user` | `\FluentCommunity\App\Models\User` | The demoted user. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:132` | `$user` (User) |

### Example

```php
add_action('fluent_community/managed/after_remove', function ($user) {
}, 10, 1);
```

**Related:** [`fluent_community/manager/before_remove`](#fluent-community-manager-before-remove)

<a id="fluent-community-manager-added"></a>

## `fluent_community/manager/added`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when a user is given community manager roles for the first time.

Fires only on first assignment — updating an existing manager fires fluent_community/manager/updated instead. The roles array has already been normalised: "admin" collapses the list to just ["admin"], and course_creatror is dropped when course_admin is also present.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$user` | `\FluentCommunity\App\Models\User` | The user, with community_role freshly loaded. |
| 2 | `$roles` | `array` | Normalised list of role slugs. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:108` | `$user` (User)<br>`$roles` (mixed) |

### Example

```php
add_action('fluent_community/manager/added', function ($user, $roles) {
}, 10, 2);
```

**Related:** [`fluent_community/manager/updated`](#fluent-community-manager-updated) · [`fluent_community/manager/before_remove`](#fluent-community-manager-before-remove)

<a id="fluent-community-manager-before-remove"></a>

## `fluent_community/manager/before_remove`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires just before a user's community manager roles are deleted.

The community_role relation is still readable here, which is the only place to capture which roles are being taken away — the paired after-action runs once the row is gone. Note the after-action is named `managed/after_remove`, not `manager/after_remove`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$user` | `\FluentCommunity\App\Models\User` | The manager being demoted, with community_role still loaded. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:128` | `$user` (User) |

### Example

```php
add_action('fluent_community/manager/before_remove', function ($user) {
}, 10, 1);
```

**Related:** [`fluent_community/managed/after_remove`](#fluent-community-managed-after-remove)

<a id="fluent-community-manager-updated"></a>

## `fluent_community/manager/updated`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when an existing community manager's roles change.

Guarded by a value comparison, so re-saving the same set of roles fires nothing. The roles have already been normalised the same way as on add.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$user` | `\FluentCommunity\App\Models\User` | The manager being updated. |
| 2 | `$roles` | `array` | The new normalised list of role slugs. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:91` | `$user` (User)<br>`$roles` (mixed) |

### Example

```php
add_action('fluent_community/manager/updated', function ($user, $roles) {
}, 10, 2);
```

**Related:** [`fluent_community/manager/added`](#fluent-community-manager-added)

<a id="fluent-community-members-query-ref"></a>

## `fluent_community/members_query_ref`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/MembersController.php:124` | `&$members` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_action('fluent_community/members_query_ref', function (&$members, $all) {
}, 10, 2);
```

<a id="fluent-community-profile-deactivated"></a>

## `fluent_community/profile_deactivated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:175` | `$xprofile` (XProfile) |

### Example

```php
add_action('fluent_community/profile_deactivated', function ($xprofile) {
}, 10, 1);
```

<a id="fluent-community-reactivate-account"></a>

## `fluent_community/reactivate_account`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:232` | `$xprofile` (XProfile) |

### Example

```php
add_action('fluent_community/reactivate_account', function ($xprofile) {
}, 10, 1);
```

<a id="fluent-community-track-activity"></a>

## `fluent_community/track_activity`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** A no-argument ping that a user did something worth refreshing their last-seen timestamp for.

Fired after a post or comment activity row is written, and on every portal ticker poll. It carries no payload — the handler resolves the current profile itself, and debounces so `last_activity` is written at most once every five minutes. Do not treat it as a content event; use the specific content hooks for that.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:87` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:109` | No parameters |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1098` | No parameters |

### Example

```php
add_action('fluent_community/track_activity', function () {
}, 10, 0);
```

**Related:** [`fluent_community/feed/created`](#fluent-community-feed-created) · [`fluent_community/comment_added`](#fluent-community-comment-added)

<a id="fluent-community-update-profile-link-providers"></a>

## `fluent_community/update_profile_link_providers`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:528` | `$config` (mixed) |

### Example

```php
add_action('fluent_community/update_profile_link_providers', function ($config) {
}, 10, 1);
```

<a id="fluent-community-user-level-upgraded"></a>

## `fluent_community/user_level_upgraded`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when a member's point total moves them into a higher leaderboard level.

Fires only on a genuine level change, not on every point change: the handler first checks that the new total exceeds the old level's ceiling and then that the level slug actually differs. Because it hangs off fluent_community/user_points_updated it can fire from the hourly point recalculation or the daily sync job, not only from live activity. It is one-directional — there is no downgrade action. Requires the leader_board_module feature to be enabled; FluentCRM automations use it as a trigger.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$xprofile` | `\FluentCommunity\App\Models\XProfile` | The member who levelled up, with the new total_points already saved. |
| 2 | `$newLevel` | `array` | The new level — title, tagline, slug, level, min_points, max_points. |
| 3 | `$oldLevel` | `array` | The previous level, same shape. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/LeaderBoardModule.php:111` | `$xprofile` (XProfile)<br>`$newLevel` (mixed)<br>`$oldLevel` (mixed) |

### Example

```php
add_action('fluent_community/user_level_upgraded', function ($xprofile, $newLevel, $oldLevel) {
}, 10, 3);
```

**Related:** [`fluent_community/leaderboard_api_response`](#fluent-community-leaderboard-api-response)

<a id="fluent-community-user-points-updated"></a>

## `fluent_community/user_points_updated`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 3
- **When it fires:** Fires after a member's total leaderboard points are recalculated to a different value.

Points are recalculated lazily and cached for an hour per user, so this fires at most once an hour per member under normal traffic, and not at all when the recalculated total matches the stored one. The profile is already saved with the new total; `$oldPoints` is the only way to see the delta. Pro's leaderboard listens here to detect level changes.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$xprofile` | `\FluentCommunity\App\Models\XProfile` | The member profile, already saved with the new total. |
| 2 | `$oldPoints` | `int` | The point total before the recalculation. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:82` | `$profileModel` (mixed)<br>`$oldPoints` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/Services/LeaderBoardHelper.php:189` | `$xprofile` (XProfile)<br>`$oldPoints` (mixed) |
| Core | `fluent-community/app/Hooks/CLI/Commands.php:153` | `$xProfile` (XProfile)<br>`$oldPoints` (mixed) |

### Example

```php
add_action('fluent_community/user_points_updated', function ($xprofile, $oldPoints) {
}, 10, 2);
```

