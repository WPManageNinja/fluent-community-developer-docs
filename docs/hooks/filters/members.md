---
title: Members Filters
description: Members filter hooks for FluentCommunity.
---

# Members Filters

20 unique filter hooks currently map to this category, across 27 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/activity/after_contents_user`](#fluent_communityactivityafter_contents_user) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:97` |
| [`fluent_community/activity/before_contents_user`](#fluent_communityactivitybefore_contents_user) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:98` |
| [`fluent_community/admin_course_non_members_api_response`](#fluent_communityadmin_course_non_members_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1065` |
| [`fluent_community/can_view_leaderboard_members`](#fluent_communitycan_view_leaderboard_members) | Core | 3 | `fluent-community/app/Functions/Utility.php:305` |
| [`fluent_community/can_view_members_page`](#fluent_communitycan_view_members_page) | Core | 3 | `fluent-community/app/Functions/Utility.php:290` |
| [`fluent_community/can_view_user_profile`](#fluent_communitycan_view_user_profile) | Core | 3 | `fluent-community/app/Functions/Utility.php:320` |
| [`fluent_community/leaderboard_api_response`](#fluent_communityleaderboard_api_response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:109` |
| [`fluent_community/max_profile_description_length`](#fluent_communitymax_profile_description_length) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:335` |
| [`fluent_community/members_api_response`](#fluent_communitymembers_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:114` |
| [`fluent_community/mention_members_api_response`](#fluent_communitymention_members_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:75` |
| [`fluent_community/profile_all_memberships_api_response`](#fluent_communityprofile_all_memberships_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:429` |
| [`fluent_community/profile_comments_api_response`](#fluent_communityprofile_comments_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:513` |
| [`fluent_community/profile_link_providers_api_response`](#fluent_communityprofile_link_providers_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:525` |
| [`fluent_community/profile_notification_pref_api_response`](#fluent_communityprofile_notification_pref_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:673` |
| [`fluent_community/profile_view_data`](#fluent_communityprofile_view_data) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:131` |
| [`fluent_community/reserved_usernames`](#fluent_communityreserved_usernames) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:213` |
| [`fluent_community/update_profile_data`](#fluent_communityupdate_profile_data) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:246` |
| [`fluent_community/user/permissions`](#fluent_communityuserpermissions) | Core | 2 | `fluent-community/app/Models/User.php:468` |
| [`fluent_community/xprofile_public_fields`](#fluent_communityxprofile_public_fields) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:48` |
| [`fluent_community/xprofile/badge`](#fluent_communityxprofilebadge) | Core | 1 | `fluent-community/app/Models/XProfile.php:214` |

<a id="fluent_communityactivityafter_contents_user"></a>

## `fluent_community/activity/after_contents_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Activity/After Contents User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:97` | `''` (mixed)<br>`$userId` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/after_contents_user', function ($param1, $userId, $context) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityactivitybefore_contents_user"></a>

## `fluent_community/activity/before_contents_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Activity/Before Contents User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:98` | `''` (mixed)<br>`$userId` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/before_contents_user', function ($param1, $userId, $context) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityadmin_course_non_members_api_response"></a>

## `fluent_community/admin_course_non_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Admin Course Non Members API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1065` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_non_members_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitycan_view_leaderboard_members"></a>

## `fluent_community/can_view_leaderboard_members`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Can View Leaderboard Members hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:305` | `true` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:309` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:312` | `Helper::isModerator()` (mixed)<br>`$pageStatus` (mixed) |

### Example

```php
add_filter('fluent_community/can_view_leaderboard_members', function ($param1, $pageStatus) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitycan_view_members_page"></a>

## `fluent_community/can_view_members_page`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Can View Members Page hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:290` | `true` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:294` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:297` | `Helper::isModerator()` (mixed)<br>`$pageStatus` (mixed) |

### Example

```php
add_filter('fluent_community/can_view_members_page', function ($param1, $pageStatus) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitycan_view_user_profile"></a>

## `fluent_community/can_view_user_profile`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Can View User Profile hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:320` | `true` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:324` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:329` | `($isOwn &#124;&#124; Helper::isModerator())` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (mixed) |

### Example

```php
add_filter('fluent_community/can_view_user_profile', function ($param1, $pageStatus, $targetUserId) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityleaderboard_api_response"></a>

## `fluent_community/leaderboard_api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Leaderboard API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:109` | `[ 'leaderboard' => $leaderBoard ]` (array)<br>`$xProfiles` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/leaderboard_api_response', function ($leaderBoard, $xProfiles, $all) {
    return $leaderBoard;
}, 10, 3);
```

<a id="fluent_communitymax_profile_description_length"></a>

## `fluent_community/max_profile_description_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Max Profile Description Length hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:335` | `5000` (mixed) |

### Example

```php
add_filter('fluent_community/max_profile_description_length', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitymembers_api_response"></a>

## `fluent_community/members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Members API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/MembersController.php:114` | `[ 'members' => $members, 'execution_time' => microtime(true) - $start ]` (array)<br>`$members` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/members_api_response', function ($members, $members_2, $all) {
    return $members;
}, 10, 3);
```

<a id="fluent_communitymention_members_api_response"></a>

## `fluent_community/mention_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Mention Members API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/MembersController.php:75` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/mention_members_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityprofile_all_memberships_api_response"></a>

## `fluent_community/profile_all_memberships_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile All Memberships API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:429` | `[ 'memberships' => $memberships ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_all_memberships_api_response', function ($memberships, $all) {
    return $memberships;
}, 10, 2);
```

<a id="fluent_communityprofile_comments_api_response"></a>

## `fluent_community/profile_comments_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile Comments API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:513` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_comments_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityprofile_link_providers_api_response"></a>

## `fluent_community/profile_link_providers_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile Link Providers API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:525` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_link_providers_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityprofile_notification_pref_api_response"></a>

## `fluent_community/profile_notification_pref_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile Notification Pref API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:673` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_notification_pref_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityprofile_view_data"></a>

## `fluent_community/profile_view_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile View Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:131` | `$profile` (mixed)<br>`$xprofile` (mixed) |

### Example

```php
add_filter('fluent_community/profile_view_data', function ($profile, $xprofile) {
    return $profile;
}, 10, 2);
```

<a id="fluent_communityreserved_usernames"></a>

## `fluent_community/reserved_usernames`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Reserved Usernames hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:213` | `[ 'admin', 'administrator', 'me', 'moderator', 'mod', 'superuser', 'root', 'system', 'official', 'staff', 'support', 'helpdesk', 'user', 'guest', 'anonymous', 'everyone', 'anybody', 'someone', 'webmaster', 'postmaster', 'hostmaster', 'abuse', 'security', 'ssl', 'firewall', 'no-reply', 'noreply', 'mail', 'email', 'mailer', 'smtp', 'pop', 'imap', 'ftp', 'sftp', 'ssh', 'ceo', 'cfo', 'cto', 'founder', 'cofounder', 'owner', 'president', 'vicepresident', 'director', 'manager', 'supervisor', 'executive', 'info', 'contact', 'sales', 'marketing', 'support', 'billing', 'accounting', 'finance', 'hr', 'humanresources', 'legal', 'compliance', 'it', 'itsupport', 'customerservice', 'customersupport', 'dev', 'developer', 'api', 'sdk', 'app', 'bot', 'chatbot', 'sysadmin', 'devops', 'infosec', 'security', 'test', 'testing', 'beta', 'alpha', 'staging', 'production', 'development', 'home', 'about', 'contact', 'faq', 'help', 'news', 'blog', 'forum', 'community', 'events', 'calendar', 'shop', 'store', 'cart', 'checkout', 'social', 'follow', 'like', 'share', 'tweet', 'post', 'status', 'privacy', 'terms', 'copyright', 'trademark', 'legal', 'policy', 'all', 'none', 'null', 'undefined', 'true', 'false', 'default', 'example', 'sample', 'demo', 'temporary', 'delete', 'remove', 'profanity', 'explicit', 'offensive', 'yourappname', 'yourbrandname', 'yourdomain', ]` (array) |

### Example

```php
add_filter('fluent_community/reserved_usernames', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityupdate_profile_data"></a>

## `fluent_community/update_profile_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Update Profile Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:246` | `$updateData` (mixed)<br>`$data` (mixed)<br>`$xProfile` (mixed) |

### Example

```php
add_filter('fluent_community/update_profile_data', function ($updateData, $data, $xProfile) {
    return $updateData;
}, 10, 3);
```

<a id="fluent_communityuserpermissions"></a>

## `fluent_community/user/permissions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** User/Permissions hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:468` | `[ 'read' => true ]` (array)<br>`$roles` (mixed)<br>`$this` (mixed) |
| Core | `fluent-community/app/Models/User.php:495` | `$permissions` (mixed)<br>`$roles` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/user/permissions', function ($param1, $roles, $param3) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityxprofile_public_fields"></a>

## `fluent_community/xprofile_public_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Xprofile Public Fields hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:48` | `$fields` (mixed) |

### Example

```php
add_filter('fluent_community/xprofile_public_fields', function ($fields) {
    return $fields;
}, 10, 1);
```

<a id="fluent_communityxprofilebadge"></a>

## `fluent_community/xprofile/badge`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Xprofile/Badge hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/XProfile.php:214` | `null` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/xprofile/badge', function ($param1, $param2) {
    return $param1;
}, 10, 2);
```

