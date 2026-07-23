---
title: Members Filters
description: Members filter hooks for FluentCommunity.
---

# Members Filters

29 unique filter hooks currently map to this category, across 38 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/activity/after_contents_user`](#fluent_communityactivityafter_contents_user) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:97` |
| [`fluent_community/activity/before_contents_user`](#fluent_communityactivitybefore_contents_user) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:98` |
| [`fluent_community/admin_course_non_members_api_response`](#fluent_communityadmin_course_non_members_api_response) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1199` |
| [`fluent_community/bulk_members/{filterTag}`](#fluent_communitybulk_membersfilterTag) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` |
| [`fluent_community/bulk_members/add_members_response`](#fluent_communitybulk_membersadd_members_response) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:72` |
| [`fluent_community/bulk_members/add_students_response`](#fluent_communitybulk_membersadd_students_response) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:30` |
| [`fluent_community/bulk_members/import_members_response`](#fluent_communitybulk_membersimport_members_response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:116` |
| [`fluent_community/bulk_members/import_students_response`](#fluent_communitybulk_membersimport_students_response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:102` |
| [`fluent_community/can_view_leaderboard_members`](#fluent_communitycan_view_leaderboard_members) | Core | 3 | `fluent-community/app/Functions/Utility.php:310` |
| [`fluent_community/can_view_members_page`](#fluent_communitycan_view_members_page) | Core | 3 | `fluent-community/app/Functions/Utility.php:295` |
| [`fluent_community/can_view_user_profile`](#fluent_communitycan_view_user_profile) | Core | 3 | `fluent-community/app/Functions/Utility.php:325` |
| [`fluent_community/created_user_role`](#fluent_communitycreated_user_role) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:331` |
| [`fluent_community/custom_profile_field_types`](#fluent_communitycustom_profile_field_types) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProfileFieldsService.php:60` |
| [`fluent_community/leaderboard_api_response`](#fluent_communityleaderboard_api_response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:109` |
| [`fluent_community/max_profile_description_length`](#fluent_communitymax_profile_description_length) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:360` |
| [`fluent_community/max_profile_headline_length`](#fluent_communitymax_profile_headline_length) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:371` |
| [`fluent_community/members_api_response`](#fluent_communitymembers_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:118` |
| [`fluent_community/mention_members_api_response`](#fluent_communitymention_members_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:75` |
| [`fluent_community/profile_all_memberships_api_response`](#fluent_communityprofile_all_memberships_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:551` |
| [`fluent_community/profile_comments_api_response`](#fluent_communityprofile_comments_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:700` |
| [`fluent_community/profile_courses_api_response`](#fluent_communityprofile_courses_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:651` |
| [`fluent_community/profile_link_providers_api_response`](#fluent_communityprofile_link_providers_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:516` |
| [`fluent_community/profile_notification_pref_api_response`](#fluent_communityprofile_notification_pref_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:861` |
| [`fluent_community/profile_view_data`](#fluent_communityprofile_view_data) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:150` |
| [`fluent_community/reserved_usernames`](#fluent_communityreserved_usernames) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:217` |
| [`fluent_community/update_profile_data`](#fluent_communityupdate_profile_data) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:271` |
| [`fluent_community/user/permissions`](#fluent_communityuserpermissions) | Core | 2 | `fluent-community/app/Models/User.php:487` |
| [`fluent_community/xprofile_public_fields`](#fluent_communityxprofile_public_fields) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:48` |
| [`fluent_community/xprofile/badge`](#fluent_communityxprofilebadge) | Core | 1 | `fluent-community/app/Models/XProfile.php:235` |

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
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:1199` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/admin_course_non_members_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitybulk_membersfilterTag"></a>

## `fluent_community/bulk_members/{filterTag}`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Bulk Members/{FilterTag} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` | `$response` (mixed)<br>`$request->all()` (array)<br>`$contextId` (mixed) |

### Example

```php
add_filter('fluent_community/bulk_members/{filterTag}', function ($response, $all, $contextId) {
    return $response;
}, 10, 3);
```

<a id="fluent_communitybulk_membersadd_members_response"></a>

## `fluent_community/bulk_members/add_members_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Bulk Members/Add Members Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:72` | `$result` (mixed)<br>`$request->all()` (array)<br>`$spaceSlug` (Space|mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:89` | `$response` (mixed)<br>`$request->all()` (array)<br>`$spaceSlug` (Space|mixed) |

### Example

```php
add_filter('fluent_community/bulk_members/add_members_response', function ($result, $all, $spaceSlug) {
    return $result;
}, 10, 3);
```

<a id="fluent_communitybulk_membersadd_students_response"></a>

## `fluent_community/bulk_members/add_students_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Bulk Members/Add Students Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:30` | `$result` (mixed)<br>`$request->all()` (array)<br>`$courseId` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:47` | `$response` (mixed)<br>`$request->all()` (array)<br>`$courseId` (mixed) |

### Example

```php
add_filter('fluent_community/bulk_members/add_students_response', function ($result, $all, $courseId) {
    return $result;
}, 10, 3);
```

<a id="fluent_communitybulk_membersimport_members_response"></a>

## `fluent_community/bulk_members/import_members_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Bulk Members/Import Members Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:116` | `$result` (mixed)<br>`$request->all()` (array)<br>`$spaceSlug` (Space|mixed) |

### Example

```php
add_filter('fluent_community/bulk_members/import_members_response', function ($result, $all, $spaceSlug) {
    return $result;
}, 10, 3);
```

<a id="fluent_communitybulk_membersimport_students_response"></a>

## `fluent_community/bulk_members/import_students_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Bulk Members/Import Students Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:102` | `$result` (mixed)<br>`$request->all()` (array)<br>`$courseId` (mixed) |

### Example

```php
add_filter('fluent_community/bulk_members/import_students_response', function ($result, $all, $courseId) {
    return $result;
}, 10, 3);
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
| Core | `fluent-community/app/Functions/Utility.php:310` | `true` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:314` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:317` | `Helper::isModerator()` (mixed)<br>`$pageStatus` (mixed) |

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
| Core | `fluent-community/app/Functions/Utility.php:295` | `true` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:299` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:302` | `Helper::isModerator()` (mixed)<br>`$pageStatus` (mixed) |

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
| Core | `fluent-community/app/Functions/Utility.php:325` | `true` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:329` | `is_user_logged_in()` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:334` | `($isOwn &#124;&#124; Helper::isModerator())` (mixed)<br>`$pageStatus` (mixed)<br>`$targetUserId` (mixed) |

### Example

```php
add_filter('fluent_community/can_view_user_profile', function ($param1, $pageStatus, $targetUserId) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communitycreated_user_role"></a>

## `fluent_community/created_user_role`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Created User Role hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:331` | `'subscriber'` (mixed)<br>`$userData` (mixed) |

### Example

```php
add_filter('fluent_community/created_user_role', function ($param1, $userData) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitycustom_profile_field_types"></a>

## `fluent_community/custom_profile_field_types`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Custom Profile Field Types hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProfileFieldsService.php:60` | `[ 'text' => __('Text', 'fluent-community-pro'), 'textarea' => __('Textarea', 'fluent-community-pro'), 'number' => __('Number', 'fluent-community-pro'), 'date' => __('Date', 'fluent-community-pro'), 'select' => __('Dropdown', 'fluent-community-pro'), 'radio' => __('Radio', 'fluent-community-pro'), 'url' => __('URL', 'fluent-community-pro'), 'multiselect' => __('Multi Select', 'fluent-community-pro'), ]` (array) |

### Example

```php
add_filter('fluent_community/custom_profile_field_types', function ($param1) {
    return $param1;
}, 10, 1);
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
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:360` | `5000` (mixed) |

### Example

```php
add_filter('fluent_community/max_profile_description_length', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitymax_profile_headline_length"></a>

## `fluent_community/max_profile_headline_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Max Profile Headline Length hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:371` | `60` (mixed) |

### Example

```php
add_filter('fluent_community/max_profile_headline_length', function ($param1) {
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
| Core | `fluent-community/app/Http/Controllers/MembersController.php:118` | `[ 'members' => $members, 'execution_time' => microtime(true) - $start ]` (array)<br>`$members` (mixed)<br>`$request->all()` (array) |

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
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:551` | `[ 'memberships' => $memberships ]` (array)<br>`$request->all()` (array) |

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
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:700` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_comments_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityprofile_courses_api_response"></a>

## `fluent_community/profile_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile Courses API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:651` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_courses_api_response', function ($data, $all) {
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
| Core | `fluent-community/app/Http/Controllers/AdminController.php:516` | `$data` (mixed)<br>`$request->all()` (array) |

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
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:861` | `$data` (mixed)<br>`$request->all()` (array) |

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
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:150` | `$profile` (mixed)<br>`$xprofile` (mixed)<br>`$isAdmin` (mixed) |

### Example

```php
add_filter('fluent_community/profile_view_data', function ($profile, $xprofile, $isAdmin) {
    return $profile;
}, 10, 3);
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
| Core | `fluent-community/app/Services/ProfileHelper.php:217` | `[ 'admin', 'administrator', 'me', 'moderator', 'mod', 'superuser', 'root', 'system', 'official', 'staff', 'support', 'helpdesk', 'user', 'guest', 'anonymous', 'everyone', 'anybody', 'someone', 'webmaster', 'postmaster', 'hostmaster', 'abuse', 'security', 'ssl', 'firewall', 'no-reply', 'noreply', 'mail', 'email', 'mailer', 'smtp', 'pop', 'imap', 'ftp', 'sftp', 'ssh', 'ceo', 'cfo', 'cto', 'founder', 'cofounder', 'owner', 'president', 'vicepresident', 'director', 'manager', 'supervisor', 'executive', 'info', 'contact', 'sales', 'marketing', 'support', 'billing', 'accounting', 'finance', 'hr', 'humanresources', 'legal', 'compliance', 'it', 'itsupport', 'customerservice', 'customersupport', 'dev', 'developer', 'api', 'sdk', 'app', 'bot', 'chatbot', 'sysadmin', 'devops', 'infosec', 'security', 'test', 'testing', 'beta', 'alpha', 'staging', 'production', 'development', 'home', 'about', 'contact', 'faq', 'help', 'news', 'blog', 'forum', 'community', 'events', 'calendar', 'shop', 'store', 'cart', 'checkout', 'social', 'follow', 'like', 'share', 'tweet', 'post', 'status', 'privacy', 'terms', 'copyright', 'trademark', 'legal', 'policy', 'all', 'none', 'null', 'undefined', 'true', 'false', 'default', 'example', 'sample', 'demo', 'temporary', 'delete', 'remove', 'profanity', 'explicit', 'offensive', 'yourappname', 'yourbrandname', 'yourdomain', ]` (array) |

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
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:271` | `$updateData` (mixed)<br>`$data` (mixed)<br>`$xProfile` (mixed)<br>`$currentUser` (mixed) |

### Example

```php
add_filter('fluent_community/update_profile_data', function ($updateData, $data, $xProfile, $currentUser) {
    return $updateData;
}, 10, 4);
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
| Core | `fluent-community/app/Models/User.php:487` | `[ 'read' => true, ]` (array)<br>`$roles` (mixed)<br>`$this` (mixed) |
| Core | `fluent-community/app/Models/User.php:514` | `$permissions` (mixed)<br>`$roles` (mixed)<br>`$this` (mixed) |

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
| Core | `fluent-community/app/Models/XProfile.php:235` | `null` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/xprofile/badge', function ($param1, $param2) {
    return $param1;
}, 10, 2);
```

