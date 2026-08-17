---
title: Members Filters
description: Members filter hooks for FluentCommunity.
---

# Members Filters

37 unique filter hooks currently map to this category, across 44 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/activities_api_response`](#fluent-community-activities-api-response) | Core | 2 | `fluent-community/app/Http/Controllers/ActivityController.php:131` |
| [`fluent_community/activity/after_contents`](#fluent-community-activity-after-contents) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:104` |
| [`fluent_community/activity/after_contents_space`](#fluent-community-activity-after-contents-space) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:98` |
| [`fluent_community/activity/after_contents_user`](#fluent-community-activity-after-contents-user) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:101` |
| [`fluent_community/activity/before_contents`](#fluent-community-activity-before-contents) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:105` |
| [`fluent_community/activity/before_contents_space`](#fluent-community-activity-before-contents-space) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:99` |
| [`fluent_community/activity/before_contents_user`](#fluent-community-activity-before-contents-user) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:102` |
| [`fluent_community/bulk_members/{filterTag}`](#fluent-community-bulk-members-filterTag) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` |
| [`fluent_community/bulk_members/add_members_response`](#fluent-community-bulk-members-add-members-response) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:72` |
| [`fluent_community/bulk_members/add_students_response`](#fluent-community-bulk-members-add-students-response) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:30` |
| [`fluent_community/bulk_members/crm_tag_members_resolve_response`](#fluent-community-bulk-members-crm-tag-members-resolve-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` |
| [`fluent_community/bulk_members/crm_tag_students_resolve_response`](#fluent-community-bulk-members-crm-tag-students-resolve-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` |
| [`fluent_community/bulk_members/import_members_response`](#fluent-community-bulk-members-import-members-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:116` |
| [`fluent_community/bulk_members/import_students_response`](#fluent-community-bulk-members-import-students-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:102` |
| [`fluent_community/created_user_role`](#fluent-community-created-user-role) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:331` |
| [`fluent_community/custom_profile_field_types`](#fluent-community-custom-profile-field-types) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProfileFieldsService.php:60` |
| [`fluent_community/default_avatar`](#fluent-community-default-avatar) | Core | 4 | `fluent-community/app/Models/User.php:112` |
| [`fluent_community/default_profile_tab_route`](#fluent-community-default-profile-tab-route) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:736` |
| [`fluent_community/leaderboard_api_response`](#fluent-community-leaderboard-api-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:109` |
| [`fluent_community/max_profile_description_length`](#fluent-community-max-profile-description-length) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:360` |
| [`fluent_community/max_profile_headline_length`](#fluent-community-max-profile-headline-length) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:371` |
| [`fluent_community/members_api_response`](#fluent-community-members-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:128` |
| [`fluent_community/mention_members_api_response`](#fluent-community-mention-members-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:75` |
| [`fluent_community/menu_groups_for_user`](#fluent-community-menu-groups-for-user) | Core | 1 | `fluent-community/app/Services/Helper.php:964` |
| [`fluent_community/profile_all_memberships_api_response`](#fluent-community-profile-all-memberships-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:564` |
| [`fluent_community/profile_link_providers_api_response`](#fluent-community-profile-link-providers-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:516` |
| [`fluent_community/profile_spaces_api_response`](#fluent-community-profile-spaces-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:607` |
| [`fluent_community/profile_view_data`](#fluent-community-profile-view-data) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:150` |
| [`fluent_community/public_display_name`](#fluent-community-public-display-name) | Core | 1 | `fluent-community/app/Models/User.php:313` |
| [`fluent_community/reserved_usernames`](#fluent-community-reserved-usernames) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:217` |
| [`fluent_community/social_link_providers`](#fluent-community-social-link-providers) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:74` |
| [`fluent_community/space_members_api_response`](#fluent-community-space-members-api-response) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:424` |
| [`fluent_community/space_non_members_api_response`](#fluent-community-space-non-members-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:768` |
| [`fluent_community/track_activity_throttle_seconds`](#fluent-community-track-activity-throttle-seconds) | Core | 1 | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:123` |
| [`fluent_community/update_profile_data`](#fluent-community-update-profile-data) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:271` |
| [`fluent_community/xprofile_public_fields`](#fluent-community-xprofile-public-fields) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:48` |
| [`fluent_community/xprofile/badge`](#fluent-community-xprofile-badge) | Core | 1 | `fluent-community/app/Models/XProfile.php:235` |

<a id="fluent-community-activities-api-response"></a>

## `fluent_community/activities_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:131` | `$returnData` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:153` | `$returnData` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/activities_api_response', function ($returnData, $all) {
    return $returnData;
}, 10, 2);
```

<a id="fluent-community-activity-after-contents"></a>

## `fluent_community/activity/after_contents`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:104` | `''` (string)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/after_contents', function ($param1, $context) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-activity-after-contents-space"></a>

## `fluent_community/activity/after_contents_space`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:98` | `''` (string)<br>`$spaceId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/after_contents_space', function ($param1, $spaceId, $context) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-activity-after-contents-user"></a>

## `fluent_community/activity/after_contents_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:101` | `''` (string)<br>`$userId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/after_contents_user', function ($param1, $userId, $context) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-activity-before-contents"></a>

## `fluent_community/activity/before_contents`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:105` | `''` (string)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/before_contents', function ($param1, $context) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-activity-before-contents-space"></a>

## `fluent_community/activity/before_contents_space`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:99` | `''` (string)<br>`$spaceId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/before_contents_space', function ($param1, $spaceId, $context) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-activity-before-contents-user"></a>

## `fluent_community/activity/before_contents_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:102` | `''` (string)<br>`$userId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/before_contents_user', function ($param1, $userId, $context) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-bulk-members-filterTag"></a>

## `fluent_community/bulk_members/{filterTag}`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` | `$response` (mixed)<br>`$request->all()` (array)<br>`$contextId` (int) |

### Example

```php
add_filter('fluent_community/bulk_members/{filterTag}', function ($response, $all, $contextId) {
    return $response;
}, 10, 3);
```

<a id="fluent-community-bulk-members-add-members-response"></a>

## `fluent_community/bulk_members/add_members_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Filters the response of the bulk add-members-to-space endpoint.

Applied on both branches of the endpoint — the explicit user_ids batch (capped at 500 ids per request) and the copy-from-another-source batch — so a callback sees the same counter payload either way.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Counters: added, skipped, failed, processed, total, has_more, message. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$spaceSlug` | `string` | Slug of the target space. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:72` | `$result` (mixed)<br>`$request->all()` (array)<br>`$spaceSlug` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:89` | `$response` (mixed)<br>`$request->all()` (array)<br>`$spaceSlug` (mixed) |

### Example

```php
add_filter('fluent_community/bulk_members/add_members_response', function ($response, $requestData, $spaceSlug) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/bulk_members/import_members_response`](#fluent-community-bulk-members-import-members-response)

<a id="fluent-community-bulk-members-add-students-response"></a>

## `fluent_community/bulk_members/add_students_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Filters the response of the bulk enroll-students-in-course endpoint.

Applied on both branches of the endpoint — the explicit user_ids batch (capped at 500 ids per request) and the copy-from-another-source batch.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Counters: added, skipped, failed, processed, total, has_more, message. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$courseId` | `int` | Target course id. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:30` | `$result` (mixed)<br>`$request->all()` (array)<br>`$courseId` (int) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:47` | `$response` (mixed)<br>`$request->all()` (array)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/bulk_members/add_students_response', function ($response, $requestData, $courseId) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/bulk_members/import_students_response`](#fluent-community-bulk-members-import-students-response)

<a id="fluent-community-bulk-members-crm-tag-members-resolve-response"></a>

## `fluent_community/bulk_members/crm_tag_members_resolve_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the response of resolving a FluentCRM tag into space members.

::: info Resolved name
The source assembles this name at runtime from `fluent_community/bulk_members/{filterTag}`. This
is the concrete name to hook; the pattern is documented under that placeholder.
:::

The hook name is assembled at runtime from a prefix and a suffix, so a source scan for the literal string will not find it — the call site is the shared runCrmTagResolve() helper. Requires FluentCRM to be active. The payload is a page of resolved user ids plus counters; the caller pages through with offset and per_page, and create_missing controls whether contacts without a WordPress user get one created.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Resolved user_ids plus failed / processed counters. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$spaceSlug` | `string` | Slug of the space the tag is being resolved for. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` | `$response` (mixed)<br>`$request->all()` (array)<br>`$contextId` (int) |

### Example

```php
add_filter('fluent_community/bulk_members/crm_tag_members_resolve_response', function ($response, $requestData, $spaceSlug) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/bulk_members/crm_tag_students_resolve_response`](#fluent-community-bulk-members-crm-tag-students-resolve-response)

<a id="fluent-community-bulk-members-crm-tag-students-resolve-response"></a>

## `fluent_community/bulk_members/crm_tag_students_resolve_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the response of resolving a FluentCRM tag into course students.

::: info Resolved name
The source assembles this name at runtime from `fluent_community/bulk_members/{filterTag}`. This
is the concrete name to hook; the pattern is documented under that placeholder.
:::

The course-side counterpart, from the same runtime-assembled hook name in runCrmTagResolve(). Requires FluentCRM to be active.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Resolved user_ids plus failed / processed counters. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$courseId` | `int` | Course the tag is being resolved for. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` | `$response` (mixed)<br>`$request->all()` (array)<br>`$contextId` (int) |

### Example

```php
add_filter('fluent_community/bulk_members/crm_tag_students_resolve_response', function ($response, $requestData, $courseId) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/bulk_members/crm_tag_members_resolve_response`](#fluent-community-bulk-members-crm-tag-members-resolve-response)

<a id="fluent-community-bulk-members-import-members-response"></a>

## `fluent_community/bulk_members/import_members_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the response of the CSV/list import-members-into-space endpoint.

This is the import path, which may create WordPress users that do not exist yet; the add path never does. Chunked — has_more and the counters describe the current chunk against the running total.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Counters: added, skipped, failed, processed, total, has_more, message. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$spaceSlug` | `string` | Slug of the target space. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:116` | `$result` (mixed)<br>`$request->all()` (array)<br>`$spaceSlug` (mixed) |

### Example

```php
add_filter('fluent_community/bulk_members/import_members_response', function ($response, $requestData, $spaceSlug) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/bulk_members/add_members_response`](#fluent-community-bulk-members-add-members-response)

<a id="fluent-community-bulk-members-import-students-response"></a>

## `fluent_community/bulk_members/import_students_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the response of the CSV/list import-students-into-course endpoint.

The course-side counterpart of the member import; may create WordPress users that do not exist yet, and is chunked the same way.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Counters: added, skipped, failed, processed, total, has_more, message. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$courseId` | `int` | Target course id. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:102` | `$result` (mixed)<br>`$request->all()` (array)<br>`$courseId` (int) |

### Example

```php
add_filter('fluent_community/bulk_members/import_students_response', function ($response, $requestData, $courseId) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/bulk_members/add_students_response`](#fluent-community-bulk-members-add-students-response)

<a id="fluent-community-created-user-role"></a>

## `fluent_community/created_user_role`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:331` | `'subscriber'` (string)<br>`$userData` (mixed) |

### Example

```php
add_filter('fluent_community/created_user_role', function ($param1, $userData) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-custom-profile-field-types"></a>

## `fluent_community/custom_profile_field_types`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the field types available when building custom profile fields.

A map of type slug to label backing the admin field-type picker. Registering a type here only offers it in the picker — storage, validation and rendering for a new type have to be supplied separately.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$fieldTypes` | `array` | Map of type slug => label (text, textarea, number, date, select, radio, url, multiselect). |

**Return:** The field type map.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProfileFieldsService.php:60` | `array (8 keys: text, textarea, number, …)` (array) |

### Example

```php
add_filter('fluent_community/custom_profile_field_types', function ($fieldTypes) {
    return $fieldTypes;
}, 10, 1);
```

<a id="fluent-community-default-avatar"></a>

## `fluent_community/default_avatar`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 4
- **When it fires:** Filters the avatar URL used when a member has no usable profile image.

The default value differs by call site: when Gravatar is disabled it is the bundled `placeholder.png`, and when Gravatar is enabled it is a `ui-avatars.com` URL passed to `get_avatar_url()` as the `default` parameter. Returning a falsy value is safe — every caller falls back to the bundled placeholder. Be aware that `XProfile::getAvatarAttribute()` caches the resolved URL per user for a week, so changes will not be visible immediately for existing members.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$avatarUrl` | `string` | The default avatar URL for this context. |
| 2 | `$userId` | `int` | The user whose avatar is being resolved. |

**Return:** `string` — an absolute image URL. A falsy return falls back to the bundled placeholder image.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:112` | `FLUENT_COMMUNITY_PLUGIN_URL . 'assets/images/placeholder.png'` (mixed)<br>`$this->ID` (int) |
| Core | `fluent-community/app/Models/XProfile.php:181` | `FLUENT_COMMUNITY_PLUGIN_URL . 'assets/images/placeholder.png'` (mixed)<br>`$this->user_id` (int) |
| Core | `fluent-community/app/Models/XProfile.php:192` | `FLUENT_COMMUNITY_PLUGIN_URL . 'assets/images/placeholder.png'` (mixed)<br>`$this->user_id` (int) |
| Core | `fluent-community/app/Models/XProfile.php:217` | `'https://ui-avatars.com/api/' . esc_attr($displayName) . '/128'` (string)<br>`$this->user_id` (int) |

### Example

```php
add_filter('fluent_community/default_avatar', function ($avatarUrl, $userId) {
    return $avatarUrl;
}, 10, 2);
```

<a id="fluent-community-default-profile-tab-route"></a>

## `fluent_community/default_profile_tab_route`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters which tab a member profile opens on.

Surfaces as `portal_vars.default_profile_tab` and is matched against a fixed map of tab keys: `about`, `posts`, `spaces`, `comments` and `courses`. Anything outside that set is ignored and the profile opens on the default tab. The redirect happens client-side with `router.replace`, so the profile URL changes as the page settles.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$tab` | `string` | One of `about`, `posts`, `spaces`, `comments`, `courses`. Empty by default. |

**Return:** `string` — a recognised tab key, or an empty string to keep the default tab.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:736` | `''` (string) |

### Example

```php
add_filter('fluent_community/default_profile_tab_route', function ($tab) {
    return $tab;
}, 10, 1);
```

**Related:** [`fluent_community/portal_vars`](#fluent-community-portal-vars)

<a id="fluent-community-leaderboard-api-response"></a>

## `fluent_community/leaderboard_api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the GET /leaderboard response.

The payload holds a leaderboard list of exactly three boards, keyed 7_days, 30_days and all_time, each with a title and up to ten items. Entries whose XProfile is missing or not active have already been dropped, and the all-time pass may have written back a corrected total_points before this filter runs. The boards themselves are served from a cache that is cleared when leaderboard levels are saved.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Response payload with a `leaderboard` key. |
| 2 | `$xProfiles` | `\FluentCommunity\Framework\Database\Orm\Collection` | The XProfiles appearing on any board, keyed by user_id. |
| 3 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/LeaderBoard/Http/Controllers/LeaderBoardController.php:109` | `[ 'leaderboard' => $leaderBoard ]` (array)<br>`$xProfiles` (XProfile)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/leaderboard_api_response', function ($response, $xProfiles, $requestData) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/user_level_upgraded`](#fluent-community-user-level-upgraded)

<a id="fluent-community-max-profile-description-length"></a>

## `fluent_community/max_profile_description_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:360` | `5000` (int) |

### Example

```php
add_filter('fluent_community/max_profile_description_length', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-max-profile-headline-length"></a>

## `fluent_community/max_profile_headline_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:371` | `60` (int) |

### Example

```php
add_filter('fluent_community/max_profile_headline_length', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-members-api-response"></a>

## `fluent_community/members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/MembersController.php:128` | `[ 'members' => $members, 'execution_time' => microtime(true) - $start ]` (array)<br>`$members` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/members_api_response', function ($param1, $members, $all) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-mention-members-api-response"></a>

## `fluent_community/mention_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-menu-groups-for-user"></a>

## `fluent_community/menu_groups_for_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:964` | `$formattedGroups` (mixed)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/menu_groups_for_user', function ($formattedGroups, $user) {
    return $formattedGroups;
}, 10, 2);
```

<a id="fluent-community-profile-all-memberships-api-response"></a>

## `fluent_community/profile_all_memberships_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:564` | `[ 'memberships' => $memberships ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_all_memberships_api_response', function ($param1, $all) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-profile-link-providers-api-response"></a>

## `fluent_community/profile_link_providers_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-profile-spaces-api-response"></a>

## `fluent_community/profile_spaces_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:607` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_spaces_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-profile-view-data"></a>

## `fluent_community/profile_view_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:150` | `$profile` (mixed)<br>`$xprofile` (XProfile)<br>`$isAdmin` (mixed) |

### Example

```php
add_filter('fluent_community/profile_view_data', function ($profile, $xprofile, $isAdmin) {
    return $profile;
}, 10, 3);
```

<a id="fluent-community-public-display-name"></a>

## `fluent_community/public_display_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:313` | `$name` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/public_display_name', function ($name, $param2) {
    return $name;
}, 10, 2);
```

<a id="fluent-community-reserved-usernames"></a>

## `fluent_community/reserved_usernames`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:217` | `array (129 items)` (array) |

### Example

```php
add_filter('fluent_community/reserved_usernames', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-social-link-providers"></a>

## `fluent_community/social_link_providers`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:74` | `array (15 keys: instagram, twitter, youtube, …)` (array) |

### Example

```php
add_filter('fluent_community/social_link_providers', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-space-members-api-response"></a>

## `fluent_community/space_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:424` | `[ 'members' => $pendingRequests, 'pending_count' => $pendingCount ]` (array)<br>`$pendingRequests` (array)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:460` | `[ 'members' => $spaceMembers, 'pending_count' => $pendingCount ]` (array)<br>`$spaceMembers` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_members_api_response', function ($param1, $pendingRequests, $all) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-space-non-members-api-response"></a>

## `fluent_community/space_non_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:768` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_non_members_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-track-activity-throttle-seconds"></a>

## `fluent_community/track_activity_throttle_seconds`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:123` | `300` (int) |

### Example

```php
add_filter('fluent_community/track_activity_throttle_seconds', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-update-profile-data"></a>

## `fluent_community/update_profile_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:271` | `$updateData` (mixed)<br>`$data` (mixed)<br>`$xProfile` (XProfile)<br>`$currentUser` (User) |

### Example

```php
add_filter('fluent_community/update_profile_data', function ($updateData, $data, $xProfile, $currentUser) {
    return $updateData;
}, 10, 4);
```

<a id="fluent-community-xprofile-public-fields"></a>

## `fluent_community/xprofile_public_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-xprofile-badge"></a>

## `fluent_community/xprofile/badge`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the badge object exposed as XProfile::$badge.

Backs a model accessor, so it runs every time $xprofile->badge is read — including once per profile in any serialized member list. Nothing in core or Pro attaches a callback, and the default is null: this is an unimplemented extension point. Note that the shipped Pro badge feature does not go through it — those badges are stored per profile in xprofile meta under badge_slug and published to the portal separately via the user_badges portal var.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$badge` | `mixed` | Null by default. |
| 2 | `$xprofile` | `\FluentCommunity\App\Models\XProfile` | The profile whose badge is being resolved. |

**Return:** The badge value to expose on the profile, or null for none. Keep it cheap — this runs per profile, per render.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/XProfile.php:235` | `null` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/xprofile/badge', function ($badge, $xprofile) {
    return $badge;
}, 10, 2);
```

