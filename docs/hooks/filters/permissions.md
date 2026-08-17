---
title: Permissions Filters
description: Permissions filter hooks for FluentCommunity.
---

# Permissions Filters

8 unique filter hooks currently map to this category, across 22 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/can_access_portal`](#fluent-community-can-access-portal) | Core | 8 | `fluent-community/app/Services/Helper.php:526` |
| [`fluent_community/can_view_comments_{feed}`](#fluent-community-can-view-comments-feed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:31` |
| [`fluent_community/can_view_leaderboard_members`](#fluent-community-can-view-leaderboard-members) | Core | 3 | `fluent-community/app/Functions/Utility.php:313` |
| [`fluent_community/can_view_members_page`](#fluent-community-can-view-members-page) | Core | 3 | `fluent-community/app/Functions/Utility.php:298` |
| [`fluent_community/can_view_user_profile`](#fluent-community-can-view-user-profile) | Core | 3 | `fluent-community/app/Functions/Utility.php:328` |
| [`fluent_community/super_admin_capability`](#fluent-community-super-admin-capability) | Core | 1 | `fluent-community/app/Services/Helper.php:229` |
| [`fluent_community/user/permissions`](#fluent-community-user-permissions) | Core | 2 | `fluent-community/app/Models/User.php:499` |
| [`fluent_community/user/space/permissions`](#fluent-community-user-space-permissions) | Core | 1 | `fluent-community/app/Models/User.php:637` |

<a id="fluent-community-can-access-portal"></a>

## `fluent_community/can_access_portal`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 8

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:526` | `true` (bool) |
| Core | `fluent-community/app/Services/Helper.php:534` | `false` (bool) |
| Core | `fluent-community/app/Services/Helper.php:538` | `true` (bool) |
| Core | `fluent-community/app/Services/Helper.php:542` | `true` (bool) |
| Core | `fluent-community/app/Services/Helper.php:550` | `false` (bool) |
| Core | `fluent-community/app/Services/Helper.php:556` | `false` (bool) |
| Core | `fluent-community/app/Services/Helper.php:560` | `true` (bool) |
| Core | `fluent-community/app/Services/Helper.php:567` | `$result` (mixed) |

### Example

```php
add_filter('fluent_community/can_access_portal', function ($result) {
    return $result;
}, 10, 1);
```

<a id="fluent-community-can-view-comments-feed"></a>

## `fluent_community/can_view_comments_{feed}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:31` | `true` (bool)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/can_view_comments_{feed}', function ($param1, $feed) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-can-view-leaderboard-members"></a>

## `fluent_community/can_view_leaderboard_members`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:313` | `true` (bool)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:317` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:320` | `Helper::isModerator()` (mixed)<br>`$pageStatus` (mixed) |

### Example

```php
add_filter('fluent_community/can_view_leaderboard_members', function ($param1, $pageStatus) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-can-view-members-page"></a>

## `fluent_community/can_view_members_page`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:298` | `true` (bool)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:302` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:305` | `Helper::isModerator()` (mixed)<br>`$pageStatus` (mixed) |

### Example

```php
add_filter('fluent_community/can_view_members_page', function ($param1, $pageStatus) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-can-view-user-profile"></a>

## `fluent_community/can_view_user_profile`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:328` | `true` (bool)<br>`$pageStatus` (mixed)<br>`$targetUserId` (int) |
| Core | `fluent-community/app/Functions/Utility.php:332` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (int) |
| Core | `fluent-community/app/Functions/Utility.php:337` | `($isOwn &#124;&#124; Helper::isModerator())` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (int) |

### Example

```php
add_filter('fluent_community/can_view_user_profile', function ($isOwn, $pageStatus, $targetUserId) {
    return $isOwn;
}, 10, 3);
```

<a id="fluent-community-super-admin-capability"></a>

## `fluent_community/super_admin_capability`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:229` | `'manage_options'` (string) |

### Example

```php
add_filter('fluent_community/super_admin_capability', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-user-permissions"></a>

## `fluent_community/user/permissions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:499` | `[ 'read' => true, ]` (array)<br>`$roles` (mixed)<br>`$this` (mixed) |
| Core | `fluent-community/app/Models/User.php:526` | `$permissions` (mixed)<br>`$roles` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/user/permissions', function ($permissions, $roles, $param3) {
    return $permissions;
}, 10, 3);
```

<a id="fluent-community-user-space-permissions"></a>

## `fluent_community/user/space/permissions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:637` | `$permissions` (mixed)<br>`$space` (Space)<br>`$role` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/user/space/permissions', function ($permissions, $space, $role, $param4) {
    return $permissions;
}, 10, 4);
```

