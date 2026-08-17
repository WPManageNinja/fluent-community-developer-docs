---
title: Members Actions
description: Members action hooks for FluentCommunity.
---

# Members Actions

16 unique action hooks currently map to this category, across 27 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/after_sync_bp_users`](#fluent-community-after-sync-bp-users) | Core | 2 | `fluent-community/app/Hooks/CLI/BuddyPressMigrator.php:153` |
| [`fluent_community/before_unfollowing_user`](#fluent-community-before-unfollowing-user) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/FollowController.php:76` |
| [`fluent_community/followed_user`](#fluent-community-followed-user) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/FollowController.php:47` |
| [`fluent_community/managed/after_remove`](#fluent-community-managed-after-remove) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:132` |
| [`fluent_community/manager/added`](#fluent-community-manager-added) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:108` |
| [`fluent_community/manager/before_remove`](#fluent-community-manager-before-remove) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:128` |
| [`fluent_community/manager/updated`](#fluent-community-manager-updated) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:91` |
| [`fluent_community/members_query_ref`](#fluent-community-members-query-ref) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:124` |
| [`fluent_community/profile_deactivated`](#fluent-community-profile-deactivated) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:175` |
| [`fluent_community/reactivate_account`](#fluent-community-reactivate-account) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:232` |
| [`fluent_community/space/member/role_updated`](#fluent-community-space-member-role-updated) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:637` |
| [`fluent_community/space/user_left`](#fluent-community-space-user-left) | Core <span class="edition-note">(also fired by Pro)</span> | 4 | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:365` |
| [`fluent_community/track_activity`](#fluent-community-track-activity) | Core | 3 | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:87` |
| [`fluent_community/update_profile_link_providers`](#fluent-community-update-profile-link-providers) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:528` |
| [`fluent_community/user_level_upgraded`](#fluent-community-user-level-upgraded) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/LeaderBoard/LeaderBoardModule.php:111` |
| [`fluent_community/user_points_updated`](#fluent-community-user-points-updated) | Core <span class="edition-note">(also fired by Pro)</span> | 3 | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:82` |

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

<a id="fluent-community-before-unfollowing-user"></a>

## `fluent_community/before_unfollowing_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

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

<a id="fluent-community-followed-user"></a>

## `fluent_community/followed_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

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

<a id="fluent-community-managed-after-remove"></a>

## `fluent_community/managed/after_remove`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:132` | `$user` (User) |

### Example

```php
add_action('fluent_community/managed/after_remove', function ($user) {
}, 10, 1);
```

<a id="fluent-community-manager-added"></a>

## `fluent_community/manager/added`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:108` | `$user` (User)<br>`$roles` (mixed) |

### Example

```php
add_action('fluent_community/manager/added', function ($user, $roles) {
}, 10, 2);
```

<a id="fluent-community-manager-before-remove"></a>

## `fluent_community/manager/before_remove`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:128` | `$user` (User) |

### Example

```php
add_action('fluent_community/manager/before_remove', function ($user) {
}, 10, 1);
```

<a id="fluent-community-manager-updated"></a>

## `fluent_community/manager/updated`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:91` | `$user` (User)<br>`$roles` (mixed) |

### Example

```php
add_action('fluent_community/manager/updated', function ($user, $roles) {
}, 10, 2);
```

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

<a id="fluent-community-space-member-role-updated"></a>

## `fluent_community/space/member/role_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:637` | `$space` (Space)<br>`$pivot` (mixed) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:654` | `$space` (Space)<br>`$pivot` (mixed) |

### Example

```php
add_action('fluent_community/space/member/role_updated', function ($space, $pivot) {
}, 10, 2);
```

<a id="fluent-community-space-user-left"></a>

## `fluent_community/space/user_left`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 4

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:365` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/RemoveFromSpaceAction.php:87` | `$space` (Space)<br>`$user->ID` (int)<br>`'automation'` (string) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:706` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| Core | `fluent-community/app/Services/Helper.php:1831` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |

### Example

```php
add_action('fluent_community/space/user_left', function ($space, $userId, $by) {
}, 10, 3);
```

<a id="fluent-community-track-activity"></a>

## `fluent_community/track_activity`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/LeaderBoardModule.php:111` | `$xprofile` (XProfile)<br>`$newLevel` (mixed)<br>`$oldLevel` (mixed) |

### Example

```php
add_action('fluent_community/user_level_upgraded', function ($xprofile, $newLevel, $oldLevel) {
}, 10, 3);
```

<a id="fluent-community-user-points-updated"></a>

## `fluent_community/user_points_updated`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 3

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:82` | `$profileModel` (mixed)<br>`$oldPoints` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/Services/LeaderBoardHelper.php:189` | `$xprofile` (XProfile)<br>`$oldPoints` (mixed) |
| Core | `fluent-community/app/Hooks/CLI/Commands.php:153` | `$xProfile` (XProfile)<br>`$oldPoints` (mixed) |

### Example

```php
add_action('fluent_community/user_points_updated', function ($xProfile, $oldPoints) {
}, 10, 2);
```

