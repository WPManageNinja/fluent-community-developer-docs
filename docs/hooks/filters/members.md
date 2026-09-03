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
| [`fluent_community/max_profile_description_length`](#fluent-community-max-profile-description-length) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:361` |
| [`fluent_community/max_profile_headline_length`](#fluent-community-max-profile-headline-length) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:372` |
| [`fluent_community/members_api_response`](#fluent-community-members-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:128` |
| [`fluent_community/mention_members_api_response`](#fluent-community-mention-members-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/MembersController.php:75` |
| [`fluent_community/menu_groups_for_user`](#fluent-community-menu-groups-for-user) | Core | 1 | `fluent-community/app/Services/Helper.php:965` |
| [`fluent_community/profile_all_memberships_api_response`](#fluent-community-profile-all-memberships-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:565` |
| [`fluent_community/profile_link_providers_api_response`](#fluent-community-profile-link-providers-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:527` |
| [`fluent_community/profile_spaces_api_response`](#fluent-community-profile-spaces-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:608` |
| [`fluent_community/profile_view_data`](#fluent-community-profile-view-data) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:151` |
| [`fluent_community/public_display_name`](#fluent-community-public-display-name) | Core | 1 | `fluent-community/app/Models/User.php:313` |
| [`fluent_community/reserved_usernames`](#fluent-community-reserved-usernames) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:217` |
| [`fluent_community/social_link_providers`](#fluent-community-social-link-providers) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:74` |
| [`fluent_community/space_members_api_response`](#fluent-community-space-members-api-response) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:424` |
| [`fluent_community/space_non_members_api_response`](#fluent-community-space-non-members-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:768` |
| [`fluent_community/track_activity_throttle_seconds`](#fluent-community-track-activity-throttle-seconds) | Core | 1 | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:123` |
| [`fluent_community/update_profile_data`](#fluent-community-update-profile-data) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:272` |
| [`fluent_community/xprofile_public_fields`](#fluent-community-xprofile-public-fields) | Core | 1 | `fluent-community/app/Services/ProfileHelper.php:48` |
| [`fluent_community/xprofile/badge`](#fluent-community-xprofile-badge) | Core | 1 | `fluent-community/app/Models/XProfile.php:235` |

<a id="fluent-community-activities-api-response"></a>

## `fluent_community/activities_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the recent-activity listing response.

Applied at two call sites in the same method with slightly different payloads: the global and profile variant returns early and carries `pinned_posts` only when no member is selected, while the space variant adds `pinned_posts` and `pending_count` on request. Both always carry `activities`, `after_contents` and `before_contents`. Activities are deduplicated to the newest row per post and action, so the list is shorter than the raw activity table.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$returnData` | `array` | Response payload: `activities`, `after_contents`, `before_contents`, and sometimes `pinned_posts` and `pending_count`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:131` | `$returnData` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:153` | `$returnData` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/activities_api_response', function ($returnData, $requestData) {
    return $returnData;
}, 10, 2);
```

**Related:** [`fluent_community/pinned_posts_api_response`](/hooks/filters/feeds#fluent-community-pinned-posts-api-response) · [`fluent_community/activity/after_contents`](#fluent-community-activity-after-contents)

<a id="fluent-community-activity-after-contents"></a>

## `fluent_community/activity/after_contents`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters HTML appended below the activity list on the global activity feed.

One of three mutually exclusive variants — this one is used only when neither a space nor a member is in scope, with `..._space` and `..._user` taking over otherwise. It defaults to an empty string and reaches the portal as `after_contents`, so the markup is rendered by the SPA rather than echoed; return HTML rather than printing it, and escape it yourself.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$afterContent` | `string` | HTML to render below the activity list. Empty by default. |
| 2 | `$context` | `array` | The request `context` array; empty of `space_id` and `user_id` on this variant. |

**Return:** `string` — HTML. It is not sanitised for you.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:104` | `''` (string)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/after_contents', function ($afterContent, $context) {
    return $afterContent;
}, 10, 2);
```

**Related:** [`fluent_community/activity/before_contents`](#fluent-community-activity-before-contents) · [`fluent_community/activity/after_contents_space`](#fluent-community-activity-after-contents-space)

<a id="fluent-community-activity-after-contents-space"></a>

## `fluent_community/activity/after_contents_space`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters HTML appended below the activity list on a space page.

Used in place of `fluent_community/activity/after_contents` whenever the request carries a `space_id`; the space variant is checked first, so it also wins when both a space and a member are supplied. The second argument is the space ID, already cast to an integer.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$afterContent` | `string` | HTML to render below the activity list. Empty by default. |
| 2 | `$spaceId` | `int` | The space in scope. |
| 3 | `$context` | `array` | The request `context` array. |

**Return:** `string` — HTML. It is not sanitised for you.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:98` | `''` (string)<br>`$spaceId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/after_contents_space', function ($afterContent, $spaceId, $context) {
    return $afterContent;
}, 10, 3);
```

**Related:** [`fluent_community/activity/before_contents_space`](#fluent-community-activity-before-contents-space) · [`fluent_community/activity/after_contents`](#fluent-community-activity-after-contents)

<a id="fluent-community-activity-after-contents-user"></a>

## `fluent_community/activity/after_contents_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters HTML appended below the activity list on a member profile.

Reached only when the request carries a `user_id` and no `space_id`. Pro's FluentCRM integration uses it to render the member's CRM profile card underneath their activity.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$afterContent` | `string` | HTML to render below the activity list. Empty by default. |
| 2 | `$userId` | `int` | The member in scope. |
| 3 | `$context` | `array` | The request `context` array. |

**Return:** `string` — HTML. It is not sanitised for you.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:101` | `''` (string)<br>`$userId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/after_contents_user', function ($afterContent, $userId, $context) {
    return $afterContent;
}, 10, 3);
```

**Related:** [`fluent_community/activity/before_contents_user`](#fluent-community-activity-before-contents-user)

<a id="fluent-community-activity-before-contents"></a>

## `fluent_community/activity/before_contents`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters HTML rendered above the activity list on the global activity feed.

The mirror of `fluent_community/activity/after_contents`, resolved in the same else-branch and returned to the portal as `before_contents`. Both variants are evaluated on every activity request, so keep the callback cheap.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$beforeContent` | `string` | HTML to render above the activity list. Empty by default. |
| 2 | `$context` | `array` | The request `context` array. |

**Return:** `string` — HTML. It is not sanitised for you.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:105` | `''` (string)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/before_contents', function ($beforeContent, $context) {
    return $beforeContent;
}, 10, 2);
```

**Related:** [`fluent_community/activity/after_contents`](#fluent-community-activity-after-contents)

<a id="fluent-community-activity-before-contents-space"></a>

## `fluent_community/activity/before_contents_space`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters HTML rendered above the activity list on a space page.

The space-scoped mirror of `fluent_community/activity/before_contents`. It wins over the generic and member-scoped variants whenever a `space_id` is present in the request context.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$beforeContent` | `string` | HTML to render above the activity list. Empty by default. |
| 2 | `$spaceId` | `int` | The space in scope. |
| 3 | `$context` | `array` | The request `context` array. |

**Return:** `string` — HTML. It is not sanitised for you.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:99` | `''` (string)<br>`$spaceId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/before_contents_space', function ($beforeContent, $spaceId, $context) {
    return $beforeContent;
}, 10, 3);
```

**Related:** [`fluent_community/activity/after_contents_space`](#fluent-community-activity-after-contents-space)

<a id="fluent-community-activity-before-contents-user"></a>

## `fluent_community/activity/before_contents_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters HTML rendered above the activity list on a member profile.

The member-scoped mirror of `fluent_community/activity/before_contents`, reached only when a `user_id` is present and no `space_id` is.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$beforeContent` | `string` | HTML to render above the activity list. Empty by default. |
| 2 | `$userId` | `int` | The member in scope. |
| 3 | `$context` | `array` | The request `context` array. |

**Return:** `string` — HTML. It is not sanitised for you.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:102` | `''` (string)<br>`$userId` (int)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/before_contents_user', function ($beforeContent, $userId, $context) {
    return $beforeContent;
}, 10, 3);
```

**Related:** [`fluent_community/activity/after_contents_user`](#fluent-community-activity-after-contents-user)

<a id="fluent-community-bulk-members-filterTag"></a>

## `fluent_community/bulk_members/{filterTag}`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** The runtime-assembled name behind the two FluentCRM tag-resolution response filters.

The suffix is passed in by the caller, so a source scan for a literal hook name finds nothing here. It has exactly two live values, both from `BulkMembersController::runCrmTagResolve()`: `fluent_community/bulk_members/crm_tag_members_resolve_response` for spaces and `fluent_community/bulk_members/crm_tag_students_resolve_response` for courses. Hook those names rather than this one. Pro-only, and requires FluentCRM to be active.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Resolved `user_ids` plus failed and processed counters. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$contextId` | `mixed` | The space slug or the course ID, depending on which endpoint ran. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/BulkMembersController.php:164` | `$response` (mixed)<br>`$request->all()` (array)<br>`$contextId` (int) |

### Example

```php
add_filter('fluent_community/bulk_members/{filterTag}', function ($response, $requestData, $contextId) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/bulk_members/crm_tag_members_resolve_response`](#fluent-community-bulk-members-crm-tag-members-resolve-response) · [`fluent_community/bulk_members/crm_tag_students_resolve_response`](#fluent-community-bulk-members-crm-tag-students-resolve-response)

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
- **When it fires:** Filters the WordPress role given to accounts FluentCommunity creates for existing contacts.

Narrower than the name suggests. It is only consulted by `ProfileHelper::createWpUser()`, which serves the FluentForms integration and Pro's bulk member and student imports. Portal signup goes through `Modules/Auth/AuthHelper` and does not reach this filter, so it is not the hook for changing the role new members register with. The value is passed straight to `wp_insert_user()` and is not validated against registered roles.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$role` | `string` | The role slug, `subscriber` by default. |
| 2 | `$userData` | `array` | The supplied account data: `email`, `full_name`, `password`, `username`. |

**Return:** `string` — a role slug. An unregistered slug leaves the user with no capabilities.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:331` | `'subscriber'` (string)<br>`$userData` (mixed) |

### Example

```php
add_filter('fluent_community/created_user_role', function ($role, $userData) {
    return $role;
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

**Related:** [`fluent_community/portal_vars`](/hooks/filters/rendering#fluent-community-portal-vars)

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

**Related:** [`fluent_community/user_level_upgraded`](/hooks/actions/members#fluent-community-user-level-upgraded)

<a id="fluent-community-max-profile-description-length"></a>

## `fluent_community/max_profile_description_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the maximum length of a member's profile bio.

Defaults to 5000 and is measured with `strlen()` on the sanitised markdown, so it counts bytes rather than characters — multi-byte text hits the limit sooner than the number suggests. Note the headline limit next to it uses `mb_strlen()` instead. Exceeding it returns a validation error rather than truncating.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxDescriptionLength` | `int` | Maximum bio length in bytes, 5000 by default. |

**Return:** `int` — the limit.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:361` | `5000` (int) |

### Example

```php
add_filter('fluent_community/max_profile_description_length', function ($maxDescriptionLength) {
    return $maxDescriptionLength;
}, 10, 1);
```

**Related:** [`fluent_community/max_profile_headline_length`](#fluent-community-max-profile-headline-length)

<a id="fluent-community-max-profile-headline-length"></a>

## `fluent_community/max_profile_headline_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the maximum length of a member's profile headline.

Defaults to 60 and is measured with `mb_strlen()`, so it is a true character count — unlike the bio limit alongside it. Exceeding it returns a validation error rather than truncating. The headline is stored in `xprofile.meta`, so there is no column width forcing the value down.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxHeadlineLength` | `int` | Maximum headline length in characters, 60 by default. |

**Return:** `int` — the limit.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:372` | `60` (int) |

### Example

```php
add_filter('fluent_community/max_profile_headline_length', function ($maxHeadlineLength) {
    return $maxHeadlineLength;
}, 10, 1);
```

**Related:** [`fluent_community/max_profile_description_length`](#fluent-community-max-profile-description-length)

<a id="fluent-community-members-api-response"></a>

## `fluent_community/members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the members-directory listing response.

Reached only after the members page permission check passes and only on the non-mention branch — the @-mention autocomplete returns through `fluent_community/mention_members_api_response` instead. Moderators may additionally filter by status; everyone else is held to active profiles. Note the paginator is passed again as the second argument, and the request data is third.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `members` paginator and `execution_time`. |
| 2 | `$members` | `mixed` | The paginated XProfile result, also present inside the payload. |
| 3 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/MembersController.php:128` | `[ 'members' => $members, 'execution_time' => microtime(true) - $start ]` (array)<br>`$members` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/members_api_response', function ($data, $members, $requestData) {
    return $data;
}, 10, 3);
```

**Related:** [`fluent_community/members_query_ref`](/hooks/actions/members#fluent-community-members-query-ref) · [`fluent_community/mention_members_api_response`](#fluent-community-mention-members-api-response)

<a id="fluent-community-mention-members-api-response"></a>

## `fluent_community/mention_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the @-mention autocomplete results.

A separate early-return branch of the members endpoint, triggered by a `mention` query parameter. It requires a logged-in viewer, is capped at ten active profiles, always excludes the viewer, and is scoped to the space when one is supplied — with membership of that space enforced first. It does not pass through `fluent_community/members_query_ref` or the members page permission check.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: a `members.data` list and `execution_time`. |
| 2 | `$requestData` | `array` | The full request parameters, including `mention` and the space. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/MembersController.php:75` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/mention_members_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/members_api_response`](#fluent-community-members-api-response)

<a id="fluent-community-menu-groups-for-user"></a>

## `fluent_community/menu_groups_for_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the space groups and their spaces as shown in one member's sidebar.

Runs after per-viewer visibility has been applied: secret spaces the viewer does not belong to are removed entirely, private spaces they are not in are marked `show_lock`, and groups left with no visible spaces are dropped unless the viewer moderates the space. Each group carries `id`, `title`, `slug`, `logo` and a `children` list. Adding an entry here bypasses those checks, so re-apply them yourself.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$formattedGroups` | `array` | The visible space groups, each with a `children` list of spaces. |
| 2 | `$user` | `\FluentCommunity\App\Models\User` | The viewing member, or `null` for a guest. |

**Return:** `array` — the group list.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:965` | `$formattedGroups` (mixed)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/menu_groups_for_user', function ($formattedGroups, $user) {
    return $formattedGroups;
}, 10, 2);
```

**Related:** [`fluent_community/menu_groups`](/hooks/filters/spaces#fluent-community-menu-groups) · [`fluent_community/sidebar_menu_groups_config`](/hooks/filters/rendering#fluent-community-sidebar-menu-groups-config)

<a id="fluent-community-profile-all-memberships-api-response"></a>

## `fluent_community/profile_all_memberships_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the list of space IDs a member actively belongs to.

Returns bare IDs under a `memberships` key, not space models — the portal uses it to tick membership state in bulk. Only active memberships are counted, and secret spaces are included only when the viewer is the profile owner or a community moderator.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `memberships` list of space IDs. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:565` | `[ 'memberships' => $memberships ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_all_memberships_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/profile_spaces_api_response`](#fluent-community-profile-spaces-api-response)

<a id="fluent-community-profile-link-providers-api-response"></a>

## `fluent_community/profile_link_providers_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the social link providers returned to the admin profile-links screen.

Returns every registered provider, including the ones currently disabled, because the screen has to be able to switch them back on — `ProfileHelper::socialLinkProviders(true)` is the enabled-only variant used when rendering profiles. Each provider carries `title`, `icon_svg`, `placeholder`, `domain` and `enabled`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `providers` map keyed by provider slug. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:527` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_link_providers_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/social_link_providers`](#fluent-community-social-link-providers) · [`fluent_community/update_profile_link_providers`](/hooks/actions/members#fluent-community-update-profile-link-providers)

<a id="fluent-community-profile-spaces-api-response"></a>

## `fluent_community/profile_spaces_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the spaces listed on a member profile.

Only active memberships appear, and secret spaces are shown only to the profile owner and to community moderators. Member counts are zeroed for spaces that hide them from viewers without `can_view_members`. Courses are excluded — they are served by the separate profile courses endpoint.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `spaces` collection. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:608` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_spaces_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/profile_all_memberships_api_response`](#fluent-community-profile-all-memberships-api-response)

<a id="fluent-community-profile-view-data"></a>

## `fluent_community/profile_view_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the assembled profile payload for the member profile page.

The main extension point for profiles, and the busiest — Pro attaches follower counts, custom fields, scheduled posts and moderation flags here. The payload is trimmed by visibility before the filter runs: bio, website, social links and join date are absent when the viewer may not see the profile, and the account management keys only appear for the owner or a site admin. `profile_navs` is the tab list and `profile_nav_actions` an empty array left for extensions to fill.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$profile` | `array` | The profile payload, including `profile_navs` and `profile_nav_actions`. |
| 2 | `$xprofile` | `\FluentCommunity\App\Models\XProfile` | The profile being viewed. |
| 3 | `$isAdmin` | `bool` | Whether the viewer is a site administrator. Optional — several Pro callbacks register for two arguments only. |

**Return:** `array` — the profile payload. Removing keys the portal expects will break the profile page.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:151` | `$profile` (mixed)<br>`$xprofile` (XProfile)<br>`$isAdmin` (mixed) |

### Example

```php
add_filter('fluent_community/profile_view_data', function ($profile, $xprofile, $isAdmin) {
    return $profile;
}, 10, 3);
```

**Related:** [`fluent_community/update_profile_data`](#fluent-community-update-profile-data) · [`fluent_community/xprofile_public_fields`](#fluent-community-xprofile-public-fields)

<a id="fluent-community-public-display-name"></a>

## `fluent_community/public_display_name`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the name used for a member wherever the community refers to them publicly.

Resolves to the community profile's `display_name`, falling back to the WordPress user's. It exists specifically to keep a legal name out of notifications and emails, so overriding it carelessly reintroduces that leak. It runs once per name lookup with no caching — on a notification digest or an activity list that is once per row, so keep the callback free of queries.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$name` | `string` | The resolved public name. |
| 2 | `$user` | `\FluentCommunity\App\Models\User` | The member whose name is being resolved. |

**Return:** `string` — the display name. It is escaped by callers, not here.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:313` | `$name` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/public_display_name', function ($name, $user) {
    return $name;
}, 10, 2);
```

<a id="fluent-community-reserved-usernames"></a>

## `fluent_community/reserved_usernames`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the list of usernames members are not allowed to claim.

A large default list covering administrative, role-based and routing names. The check is a case-insensitive `in_array()` against a lowercased candidate, so add lowercase entries. It applies alongside a minimum length of three characters and a uniqueness check against existing WordPress logins. Removing entries is a real risk here: several of the defaults collide with portal route segments.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$reservedNames` | `array` | Lowercase reserved usernames. |

**Return:** `array` — a flat list of lowercase strings.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:217` | `array (129 items)` (array) |

### Example

```php
add_filter('fluent_community/reserved_usernames', function ($reservedNames) {
    return $reservedNames;
}, 10, 1);
```

<a id="fluent-community-social-link-providers"></a>

## `fluent_community/social_link_providers`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the social link providers members can add to their profile.

Keyed by provider slug, each entry carrying `title`, `icon_svg`, `placeholder`, `domain` and `enabled`. The keys are stored verbatim in `xprofile.meta.social_links`, so renaming one orphans links already saved under the old key. A separate stored option decides which providers are actually enabled, defaulting to Instagram, Twitter/X, YouTube, LinkedIn and Facebook when nothing has been saved, so adding a provider here does not by itself switch it on.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$links` | `array` | Provider definitions keyed by slug. |

**Return:** `array` — the provider map. `icon_svg` is rendered as markup, so supply trusted SVG only.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/ProfileHelper.php:74` | `array (15 keys: instagram, twitter, youtube, …)` (array) |

### Example

```php
add_filter('fluent_community/social_link_providers', function ($links) {
    return $links;
}, 10, 1);
```

**Related:** [`fluent_community/profile_link_providers_api_response`](#fluent-community-profile-link-providers-api-response) · [`fluent_community/update_profile_link_providers`](/hooks/actions/members#fluent-community-update-profile-link-providers)

<a id="fluent-community-space-members-api-response"></a>

## `fluent_community/space_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the member listing for one space.

Two call sites with the same payload shape but different contents: requesting `status=pending` returns pending join requests, and only for a viewer with `can_add_member`, while the default path returns active members. Both carry `pending_count`, which stays 0 for viewers who cannot add members. Rows are `SpaceUserPivot` models with `xprofile` eager-loaded, not profiles. The paginator is repeated as the second argument, with the request data third.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `members` paginator and `pending_count`. |
| 2 | `$members` | `mixed` | The paginated membership rows, also present inside the payload. |
| 3 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:424` | `[ 'members' => $pendingRequests, 'pending_count' => $pendingCount ]` (array)<br>`$pendingRequests` (array)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:460` | `[ 'members' => $spaceMembers, 'pending_count' => $pendingCount ]` (array)<br>`$spaceMembers` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_members_api_response', function ($data, $members, $requestData) {
    return $data;
}, 10, 3);
```

**Related:** [`fluent_community/space_non_members_api_response`](#fluent-community-space-non-members-api-response) · [`fluent_community/members_api_response`](#fluent-community-members-api-response)

<a id="fluent-community-space-non-members-api-response"></a>

## `fluent_community/space_non_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the list of site users who are not yet in a given space.

Backs the admin add-member picker. The result is doubly capped — an inner query takes at most 100 candidate IDs before the outer query paginates at 100 — so it is a search-as-you-type source rather than a complete directory, and an unsearched call returns an arbitrary hundred. On multisite it is narrowed to users with capabilities on the current blog. Rows are `User` models, not profiles.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a paginated `users` block. |
| 2 | `$requestData` | `array` | The full request parameters, including `search`. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:768` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_non_members_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/space_members_api_response`](#fluent-community-space-members-api-response)

<a id="fluent-community-track-activity-throttle-seconds"></a>

## `fluent_community/track_activity_throttle_seconds`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters how long a member's last-seen timestamp is left alone before it is written again.

Defaults to 300. The portal ticker polls every 45 to 75 seconds per session, and without this debounce every poll would issue a profile write, so lowering it materially increases database load on a busy community. Returning 0 disables the debounce entirely. The value also determines how stale `last_activity` may be, which in turn shifts the unread-post cut-off.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$throttleSeconds` | `int` | Minimum seconds between `last_activity` writes, 300 by default. |

**Return:** `int` — seconds.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:123` | `300` (int) |

### Example

```php
add_filter('fluent_community/track_activity_throttle_seconds', function ($throttleSeconds) {
    return $throttleSeconds;
}, 10, 1);
```

**Related:** [`fluent_community/track_activity`](/hooks/actions/members#fluent-community-track-activity) · [`fluent_community/last_activity_date_for_unread_feeds`](/hooks/filters/feeds#fluent-community-last-activity-date-for-unread-feeds)

<a id="fluent-community-update-profile-data"></a>

## `fluent_community/update_profile_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the profile attributes about to be saved from the profile edit form.

Runs early, on a payload narrowed to `first_name`, `last_name`, `short_description` and `website`, and before the moderator-only fields, the username change and the display name are resolved. That ordering matters: `display_name` and `short_description` are both overwritten from the request after this filter, so setting them here is pointless, while extra keys you add survive to the save. Pro uses it for custom profile fields and user moderation flags.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$updateData` | `array` | The attributes to save: `first_name`, `last_name`, `short_description`, `website`. |
| 2 | `$data` | `array` | The full submitted form data, including `headline` and `social_links`. |
| 3 | `$xProfile` | `\FluentCommunity\App\Models\XProfile` | The profile being edited. |
| 4 | `$currentUser` | `\FluentCommunity\App\Models\User` | The acting user, who may be a moderator editing someone else. Optional — some Pro callbacks register for three arguments. |

**Return:** `array` — the attribute map.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:272` | `$updateData` (mixed)<br>`$data` (mixed)<br>`$xProfile` (XProfile)<br>`$currentUser` (User) |

### Example

```php
add_filter('fluent_community/update_profile_data', function ($updateData, $data, $xProfile, $currentUser) {
    return $updateData;
}, 10, 4);
```

**Related:** [`fluent_community/profile_view_data`](#fluent-community-profile-view-data)

<a id="fluent-community-xprofile-public-fields"></a>

## `fluent_community/xprofile_public_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the profile columns selected whenever a member is embedded in another response.

Used as the `select()` list for the `xprofile` relation across posts, comments, reactions, member listings and notifications, so every entry must be a real column on `fcom_xprofile` or the query fails. The default set already varies with the privacy settings: `created_at` and `short_description` are added when profiles are viewable, `last_activity` when last-seen display is on. Adding columns here widens what is exposed everywhere at once.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$fields` | `array` | Column names on `fcom_xprofile`. |

**Return:** `array` — a flat list of column names. Non-existent columns produce SQL errors rather than being ignored.

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

**Related:** [`fluent_community/profile_view_data`](#fluent-community-profile-view-data)

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

