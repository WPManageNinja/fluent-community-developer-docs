---
title: Permissions Filters
description: Permissions filter hooks for FluentCommunity.
---

# Permissions Filters

9 unique filter hooks currently map to this category, across 23 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/bulk_members/can_create_wp_users`](#fluent-community-bulk-members-can-create-wp-users) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/BulkMemberHelper.php:438` |
| [`fluent_community/can_access_portal`](#fluent-community-can-access-portal) | Core | 8 | `fluent-community/app/Services/Helper.php:530` |
| [`fluent_community/can_view_comments_{feed}`](#fluent-community-can-view-comments-feed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:32` |
| [`fluent_community/can_view_leaderboard_members`](#fluent-community-can-view-leaderboard-members) | Core | 3 | `fluent-community/app/Functions/Utility.php:315` |
| [`fluent_community/can_view_members_page`](#fluent-community-can-view-members-page) | Core | 3 | `fluent-community/app/Functions/Utility.php:300` |
| [`fluent_community/can_view_user_profile`](#fluent-community-can-view-user-profile) | Core | 3 | `fluent-community/app/Functions/Utility.php:330` |
| [`fluent_community/super_admin_capability`](#fluent-community-super-admin-capability) | Core | 1 | `fluent-community/app/Services/Helper.php:230` |
| [`fluent_community/user/permissions`](#fluent-community-user-permissions) | Core | 2 | `fluent-community/app/Models/User.php:512` |
| [`fluent_community/user/space/permissions`](#fluent-community-user-space-permissions) | Core | 1 | `fluent-community/app/Models/User.php:651` |

<a id="fluent-community-bulk-members-can-create-wp-users"></a>

## `fluent_community/bulk_members/can_create_wp_users`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/BulkMemberHelper.php:438` | `current_user_can('create_users')` (array) |

### Example

```php
add_filter('fluent_community/bulk_members/can_create_wp_users', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-can-access-portal"></a>

## `fluent_community/can_access_portal`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 8
- **When it fires:** Filters whether a user may access the community portal at all.

Applied at every return point of `Helper::canAccessPortal()`, so a callback sees the decision but not the reason behind it — the access level, role check and active-profile check are all collapsed into one boolean by the time it runs. No user ID is passed, so resolve the subject yourself if you need it. A callback that unconditionally returns `true` opens the portal to logged-out visitors as well.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$canAccess` | `bool` | The decision reached from the access level, role list and profile status. |

**Return:** `bool` — `true` to allow portal access, `false` to deny. The value is used directly, so return a real boolean.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:530` | `true` (bool) |
| Core | `fluent-community/app/Services/Helper.php:538` | `false` (bool) |
| Core | `fluent-community/app/Services/Helper.php:542` | `true` (bool) |
| Core | `fluent-community/app/Services/Helper.php:546` | `true` (bool) |
| Core | `fluent-community/app/Services/Helper.php:554` | `false` (bool) |
| Core | `fluent-community/app/Services/Helper.php:560` | `false` (bool) |
| Core | `fluent-community/app/Services/Helper.php:564` | `true` (bool) |
| Core | `fluent-community/app/Services/Helper.php:571` | `$result` (mixed) |

### Example

```php
add_filter('fluent_community/can_access_portal', function ($canAccess) {
    return $canAccess;
}, 10, 1);
```

**Related:** [`fluent_community/super_admin_capability`](#fluent-community-super-admin-capability)

<a id="fluent-community-can-view-comments-feed"></a>

## `fluent_community/can_view_comments_{feed}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Dynamic filter deciding whether the comment list for a post or lesson is returned at all.

The placeholder is `$feed->type`, so in practice it is `fluent_community/can_view_comments_text` for ordinary posts and `fluent_community/can_view_comments_course_lesson` for lesson discussions — there is no un-suffixed variant to hook. Returning `false` makes the endpoint respond with an empty `comments` array rather than an error, so the client shows a post with no comments instead of a permission message. The post has already passed its own visibility check by then.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$canViewComments` | `bool` | Whether to return the comments. `true` by default. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post or lesson the comments belong to. |

**Return:** `bool` — a falsy value yields an empty comment list, not a 403.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:32` | `true` (bool)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/can_view_comments_{feed}', function ($canViewComments, $feed) {
    return $canViewComments;
}, 10, 2);
```

**Related:** [`fluent_community/user/space/permissions`](#fluent-community-user-space-permissions)

<a id="fluent-community-can-view-leaderboard-members"></a>

## `fluent_community/can_view_leaderboard_members`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Filters whether the current user may see the member list on the leaderboard.

Reads the `leaderboard_members_visibility` privacy setting and otherwise mirrors the members-page check. It controls visibility of the ranked members, not whether the leaderboard feature itself is enabled.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$canView` | `bool` | The decision derived from the privacy setting. |
| 2 | `$pageStatus` | `string` | The `leaderboard_members_visibility` setting: `everybody`, `logged_in`, or a moderator-only value. |

**Return:** `bool` — `true` to allow viewing.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:315` | `true` (bool)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:319` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:322` | `Helper::isModerator()` (mixed)<br>`$pageStatus` (mixed) |

### Example

```php
add_filter('fluent_community/can_view_leaderboard_members', function ($canView, $pageStatus) {
    return $canView;
}, 10, 2);
```

**Related:** [`fluent_community/can_view_members_page`](#fluent-community-can-view-members-page)

<a id="fluent-community-can-view-members-page"></a>

## `fluent_community/can_view_members_page`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Filters whether the current user may view the members directory.

Driven by the `members_page_status` privacy setting, with the same three-way shape as the profile and leaderboard checks. It gates the directory page only; individual profiles are governed separately by `fluent_community/can_view_user_profile`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$canView` | `bool` | The decision derived from the privacy setting. |
| 2 | `$pageStatus` | `string` | The `members_page_status` setting: `everybody`, `logged_in`, or a moderator-only value. |

**Return:** `bool` — `true` to allow viewing.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:300` | `true` (bool)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:304` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:307` | `Helper::isModerator()` (mixed)<br>`$pageStatus` (mixed) |

### Example

```php
add_filter('fluent_community/can_view_members_page', function ($canView, $pageStatus) {
    return $canView;
}, 10, 2);
```

**Related:** [`fluent_community/can_view_user_profile`](#fluent-community-can-view-user-profile) · [`fluent_community/can_view_leaderboard_members`](#fluent-community-can-view-leaderboard-members)

<a id="fluent-community-can-view-user-profile"></a>

## `fluent_community/can_view_user_profile`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Filters whether the current user may view a member profile page.

The base decision comes from the `profile_page_visibility` privacy setting: `everybody` yields `true`, `logged_in` yields the login state, and anything else falls back to "own profile or moderator". `$pageStatus` is passed so a callback can relax one visibility mode without hard-coding the others. `$targetUserId` is frequently `null` — the own-profile branch compares it with a strict `===`, so a string ID will not match.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$canView` | `bool` | The decision derived from the privacy setting. |
| 2 | `$pageStatus` | `string` | The `profile_page_visibility` setting: `everybody`, `logged_in`, or a moderator-only value. |
| 3 | `$targetUserId` | `int` | The profile owner's user ID. May be `null` when the caller did not supply one. |

**Return:** `bool` — `true` to allow viewing.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:330` | `true` (bool)<br>`$pageStatus` (mixed)<br>`$targetUserId` (int) |
| Core | `fluent-community/app/Functions/Utility.php:334` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (int) |
| Core | `fluent-community/app/Functions/Utility.php:339` | `($isOwn &#124;&#124; Helper::isModerator())` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (int) |

### Example

```php
add_filter('fluent_community/can_view_user_profile', function ($canView, $pageStatus, $targetUserId) {
    return $canView;
}, 10, 3);
```

**Related:** [`fluent_community/can_view_members_page`](#fluent-community-can-view-members-page)

<a id="fluent-community-super-admin-capability"></a>

## `fluent_community/super_admin_capability`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the WordPress capability that identifies a FluentCommunity super admin.

Defaults to `manage_options` and is checked with `user_can()`. Returning an empty or falsy value makes `Helper::isSuperAdmin()` return `false` for everyone, which disables the super-admin escape hatch across the plugin — that is the supported way to switch it off, not an error. This is distinct from the community `admin` role, which is stored per member rather than derived from WordPress capabilities.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$capability` | `string` | The capability to test, `manage_options` by default. |

**Return:** `string` — a WordPress capability name, or a falsy value to disable the super-admin check entirely.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:230` | `'manage_options'` (string) |

### Example

```php
add_filter('fluent_community/super_admin_capability', function ($capability) {
    return $capability;
}, 10, 1);
```

**Related:** [`fluent_community/user/permissions`](#fluent-community-user-permissions)

<a id="fluent-community-user-permissions"></a>

## `fluent_community/user/permissions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the permission map derived from a user's community roles.

Applied at both ends of `User::getRolePermissions()`. Users with no community role reach the early branch and receive only `['read' => true]` with an empty `$roles` array, so a callback must cope with a map that has none of the usual keys. The result is cached per user for the request and is what the Vue app receives as `appVars.permissions`, so anything added here becomes visible to the front end.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$permissions` | `array` | Permission keys mapped to booleans, for example `community_admin`, `delete_any_feed`, `course_creator`. |
| 2 | `$roles` | `array` | The user's community role slugs. Empty for users with no community role. |
| 3 | `$user` | `\FluentCommunity\App\Models\User` | The user the permissions belong to. |

**Return:** `array` — the permission map. Keep the existing keys unless you intend to revoke them; several controllers read them directly.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:512` | `[ 'read' => true, ]` (array)<br>`$roles` (mixed)<br>`$this` (mixed) |
| Core | `fluent-community/app/Models/User.php:539` | `$permissions` (mixed)<br>`$roles` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/user/permissions', function ($permissions, $roles, $user) {
    return $permissions;
}, 10, 3);
```

**Related:** [`fluent_community/super_admin_capability`](#fluent-community-super-admin-capability)

<a id="fluent-community-user-space-permissions"></a>

## `fluent_community/user/space/permissions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the permission map a user holds inside one particular space.

Distinct from the site-wide `fluent_community/user/permissions`: this is resolved per space and per role, and it is what the front end receives on each space object. Two very different maps reach it — non-members get a short read-only set, while members and moderators get the full one with `community_admin`, the `*_any_feed` and `*_any_comment` keys and the membership flags — so check for a key before relying on it. `is_member` is added just before the filter and is the reliable way to tell the two apart. Several controllers read these keys directly for authorisation, so removing one denies access rather than merely hiding a control.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$permissions` | `array` | Permission keys mapped to booleans for this space. |
| 2 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The space the permissions apply to. |
| 3 | `$role` | `string` | The user's role in the space: `admin`, `moderator`, `member`, `student`, or empty for a non-member. |
| 4 | `$user` | `\FluentCommunity\App\Models\User` | The user the permissions belong to. |

**Return:** `array` — the permission map.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:651` | `$permissions` (mixed)<br>`$space` (Space)<br>`$role` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/user/space/permissions', function ($permissions, $space, $role, $user) {
    return $permissions;
}, 10, 4);
```

**Related:** [`fluent_community/user/permissions`](#fluent-community-user-permissions)

