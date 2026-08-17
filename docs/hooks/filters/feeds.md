---
title: Feeds Filters
description: Feeds filter hooks for FluentCommunity.
---

# Feeds Filters

36 unique filter hooks currently map to this category, across 44 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/bookmarks_api_response`](#fluent-community-bookmarks-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:269` |
| [`fluent_community/create_post_default_space`](#fluent-community-create-post-default-space) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:737` |
| [`fluent_community/disable_duplicate_post_check`](#fluent-community-disable-duplicate-post-check) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:793` |
| [`fluent_community/disable_self_post_react`](#fluent-community-disable-self-post-react) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:519` |
| [`fluent_community/feed_api_response`](#fluent-community-feed-api-response) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:175` |
| [`fluent_community/feed_general_config`](#fluent-community-feed-general-config) | Core | 2 | `fluent-community/app/Services/FeedsHelper.php:1060` |
| [`fluent_community/feed_links_api_response`](#fluent-community-feed-links-api-response) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:742` |
| [`fluent_community/feed_oembed_api_response`](#fluent-community-feed-oembed-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:1305` |
| [`fluent_community/feed_ticker`](#fluent-community-feed-ticker) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:1167` |
| [`fluent_community/feed_view_json_ld`](#fluent-community-feed-view-json-ld) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1153` |
| [`fluent_community/feed/filterable_statuses`](#fluent-community-feed-filterable-statuses) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:44` |
| [`fluent_community/feed/new_feed_data`](#fluent-community-feed-new-feed-data) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:364` |
| [`fluent_community/feed/new_feed_data_type_{formContentType}`](#fluent-community-feed-new-feed-data-type-formContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:369` |
| [`fluent_community/feed/new_feed_response`](#fluent-community-feed-new-feed-response) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:427` |
| [`fluent_community/feed/patch_feed_response`](#fluent-community-feed-patch-feed-response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:716` |
| [`fluent_community/feed/save_status`](#fluent-community-feed-save-status) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:284` |
| [`fluent_community/feed/update_data`](#fluent-community-feed-update-data) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:586` |
| [`fluent_community/feed/update_feed_data`](#fluent-community-feed-update-feed-data) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:515` |
| [`fluent_community/feed/update_feed_data_type_{newContentType}`](#fluent-community-feed-update-feed-data-type-newContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:537` |
| [`fluent_community/feed/update_feed_response`](#fluent-community-feed-update-feed-response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:662` |
| [`fluent_community/feed/uploaded_feed_medias`](#fluent-community-feed-uploaded-feed-medias) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:997` |
| [`fluent_community/feeds_api_response`](#fluent-community-feeds-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:154` |
| [`fluent_community/get_welcome_banner_settings`](#fluent-community-get-welcome-banner-settings) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:333` |
| [`fluent_community/has_global_post`](#fluent-community-has-global-post) | Core | 1 | `fluent-community/app/Services/Helper.php:511` |
| [`fluent_community/has_post_title`](#fluent-community-has-post-title) | Core | 1 | `fluent-community/app/Functions/Utility.php:493` |
| [`fluent_community/last_activity_date_for_unread_feeds`](#fluent-community-last-activity-date-for-unread-feeds) | Core | 1 | `fluent-community/app/Services/Helper.php:982` |
| [`fluent_community/max_media_per_post`](#fluent-community-max-media-per-post) | Core | 2 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:506` |
| [`fluent_community/max_post_length`](#fluent-community-max-post-length) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:590` |
| [`fluent_community/pinned_posts_api_response`](#fluent-community-pinned-posts-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:195` |
| [`fluent_community/post_order_options`](#fluent-community-post-order-options) | Core | 1 | `fluent-community/app/Services/Helper.php:2261` |
| [`fluent_community/rate_limit/posts_per_5_minutes`](#fluent-community-rate-limit-posts-per-5-minutes) | Core | 1 | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:31` |
| [`fluent_community/scheduled_posts_api_response`](#fluent-community-scheduled-posts-api-response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:46` |
| [`fluent_community/update_welcome_banner_settings`](#fluent-community-update-welcome-banner-settings) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:357` |
| [`fluent_community/welcome_banner_api_response`](#fluent-community-welcome-banner-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:730` |
| [`fluent_community/welcome_banner_for_guests`](#fluent-community-welcome-banner-for-guests) | Core | 1 | `fluent-community/app/Services/Helper.php:1574` |
| [`fluent_community/welcome_banner_for_logged_in`](#fluent-community-welcome-banner-for-logged-in) | Core | 1 | `fluent-community/app/Services/Helper.php:1571` |

<a id="fluent-community-bookmarks-api-response"></a>

## `fluent_community/bookmarks_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:269` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/bookmarks_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-create-post-default-space"></a>

## `fluent_community/create_post_default_space`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:737` | `''` (string) |

### Example

```php
add_filter('fluent_community/create_post_default_space', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-disable-duplicate-post-check"></a>

## `fluent_community/disable_duplicate_post_check`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:793` | `false` (bool)<br>`$userId` (int)<br>`$spaceId` (int) |

### Example

```php
add_filter('fluent_community/disable_duplicate_post_check', function ($param1, $userId, $spaceId) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-disable-self-post-react"></a>

## `fluent_community/disable_self_post_react`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:519` | `false` (bool)<br>`$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:91` | `false` (bool)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/disable_self_post_react', function ($param1, $feed) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-feed-api-response"></a>

## `fluent_community/feed_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:175` | `$data` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:203` | `[ 'feed' => $feed, 'execution_time' => microtime(true) - $start ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-general-config"></a>

## `fluent_community/feed_general_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:1060` | `array (4 keys: user_id, interactions, comment_like_ids, …)` (array)<br>`$feed` (Feed)<br>`$userId` (int) |
| Core | `fluent-community/app/Services/FeedsHelper.php:1117` | `array (4 keys: user_id, interactions, comment_like_ids, …)` (array)<br>`$feeds` (mixed)<br>`$feedIds` (int[]) |

### Example

```php
add_filter('fluent_community/feed_general_config', function ($userId, $feed, $userId_3) {
    return $userId;
}, 10, 3);
```

<a id="fluent-community-feed-links-api-response"></a>

## `fluent_community/feed_links_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:742` | `$data` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:749` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_links_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-oembed-api-response"></a>

## `fluent_community/feed_oembed_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1305` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_oembed_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-ticker"></a>

## `fluent_community/feed_ticker`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1167` | `$response` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_ticker', function ($response, $all) {
    return $response;
}, 10, 2);
```

<a id="fluent-community-feed-view-json-ld"></a>

## `fluent_community/feed_view_json_ld`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1153` | `[]` (array)<br>`$feed` (Feed)<br>`$data` (mixed) |

### Example

```php
add_filter('fluent_community/feed_view_json_ld', function ($param1, $feed, $data) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-feed-filterable-statuses"></a>

## `fluent_community/feed/filterable_statuses`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:44` | `[]` (array) |

### Example

```php
add_filter('fluent_community/feed/filterable_statuses', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-feed-new-feed-data"></a>

## `fluent_community/feed/new_feed_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:364` | `$data` (mixed)<br>`$requestData` (array) |
| Core | `fluent-community/app/Services/FeedsHelper.php:509` | `$feedData` (mixed)<br>`$allData` (mixed) |

### Example

```php
add_filter('fluent_community/feed/new_feed_data', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-new-feed-data-type-formContentType"></a>

## `fluent_community/feed/new_feed_data_type_{formContentType}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:369` | `$data` (mixed)<br>`$requestData` (array) |

### Example

```php
add_filter('fluent_community/feed/new_feed_data_type_{formContentType}', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-new-feed-response"></a>

## `fluent_community/feed/new_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:427` | `array (3 keys: feed, message, last_fetched_timestamp)` (array)<br>`$feed` (Feed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:444` | `array (3 keys: feed, message, last_fetched_timestamp)` (array)<br>`$feed` (Feed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/new_feed_response', function ($feed, $feed_2, $all) {
    return $feed;
}, 10, 3);
```

<a id="fluent-community-feed-patch-feed-response"></a>

## `fluent_community/feed/patch_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:716` | `[ 'feed' => $feed, 'message' => __('Feed updated', 'fluent-community') ]` (array)<br>`$feed` (Feed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/patch_feed_response', function ($feed, $feed_2, $all) {
    return $feed;
}, 10, 3);
```

<a id="fluent-community-feed-save-status"></a>

## `fluent_community/feed/save_status`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:284` | `$data['status']` (array)<br>`$requestData` (array)<br>`null` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:481` | `$fallbackStatus` (mixed)<br>`$requestData` (array)<br>`$existingFeed` (Feed) |

### Example

```php
add_filter('fluent_community/feed/save_status', function ($data, $requestData, $existingFeed) {
    return $data;
}, 10, 3);
```

<a id="fluent-community-feed-update-data"></a>

## `fluent_community/feed/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:586` | `$data` (mixed)<br>`$existingFeed` (Feed) |

### Example

```php
add_filter('fluent_community/feed/update_data', function ($data, $existingFeed) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-update-feed-data"></a>

## `fluent_community/feed/update_feed_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:515` | `$data` (mixed)<br>`$requestData` (array) |

### Example

```php
add_filter('fluent_community/feed/update_feed_data', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-update-feed-data-type-newContentType"></a>

## `fluent_community/feed/update_feed_data_type_{newContentType}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:537` | `$data` (mixed)<br>`$requestData` (array)<br>`$existingFeed` (Feed) |

### Example

```php
add_filter('fluent_community/feed/update_feed_data_type_{newContentType}', function ($data, $requestData, $existingFeed) {
    return $data;
}, 10, 3);
```

<a id="fluent-community-feed-update-feed-response"></a>

## `fluent_community/feed/update_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:662` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/update_feed_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-uploaded-feed-medias"></a>

## `fluent_community/feed/uploaded_feed_medias`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:997` | `$uplaodedDocs` (mixed)<br>`$requestData` (array) |

### Example

```php
add_filter('fluent_community/feed/uploaded_feed_medias', function ($uplaodedDocs, $requestData) {
    return $uplaodedDocs;
}, 10, 2);
```

<a id="fluent-community-feeds-api-response"></a>

## `fluent_community/feeds_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:154` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feeds_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-get-welcome-banner-settings"></a>

## `fluent_community/get_welcome_banner_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:333` | `Helper::getWelcomeBannerSettings()` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/get_welcome_banner_settings', function ($param1, $all) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-has-global-post"></a>

## `fluent_community/has_global_post`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:511` | `$status` (mixed) |

### Example

```php
add_filter('fluent_community/has_global_post', function ($status) {
    return $status;
}, 10, 1);
```

<a id="fluent-community-has-post-title"></a>

## `fluent_community/has_post_title`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:493` | `$pref` (mixed) |

### Example

```php
add_filter('fluent_community/has_post_title', function ($pref) {
    return $pref;
}, 10, 1);
```

<a id="fluent-community-last-activity-date-for-unread-feeds"></a>

## `fluent_community/last_activity_date_for_unread_feeds`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:982` | `$lastActivityDate` (mixed)<br>`$xprofile` (XProfile) |

### Example

```php
add_filter('fluent_community/last_activity_date_for_unread_feeds', function ($lastActivityDate, $xprofile) {
    return $lastActivityDate;
}, 10, 2);
```

<a id="fluent-community-max-media-per-post"></a>

## `fluent_community/max_media_per_post`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:506` | `Utility::getCustomizationSetting('max_media_per_post')` (mixed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:955` | `Utility::getCustomizationSetting('max_media_per_post')` (mixed) |

### Example

```php
add_filter('fluent_community/max_media_per_post', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-max-post-length"></a>

## `fluent_community/max_post_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:590` | `15000` (int) |

### Example

```php
add_filter('fluent_community/max_post_length', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-pinned-posts-api-response"></a>

## `fluent_community/pinned_posts_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:195` | `$formattedActivities` (mixed)<br>`$spaceId` (int)<br>`$isTrending` (mixed) |

### Example

```php
add_filter('fluent_community/pinned_posts_api_response', function ($formattedActivities, $spaceId, $isTrending) {
    return $formattedActivities;
}, 10, 3);
```

<a id="fluent-community-post-order-options"></a>

## `fluent_community/post_order_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2261` | `$options` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/post_order_options', function ($options, $context) {
    return $options;
}, 10, 2);
```

<a id="fluent-community-rate-limit-posts-per-5-minutes"></a>

## `fluent_community/rate_limit/posts_per_5_minutes`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:31` | `5` (int) |

### Example

```php
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-scheduled-posts-api-response"></a>

## `fluent_community/scheduled_posts_api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:46` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/scheduled_posts_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-update-welcome-banner-settings"></a>

## `fluent_community/update_welcome_banner_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:357` | `$settings` (mixed) |

### Example

```php
add_filter('fluent_community/update_welcome_banner_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

<a id="fluent-community-welcome-banner-api-response"></a>

## `fluent_community/welcome_banner_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:730` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/welcome_banner_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-welcome-banner-for-guests"></a>

## `fluent_community/welcome_banner_for_guests`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1574` | `$welcomeBanner` (mixed) |

### Example

```php
add_filter('fluent_community/welcome_banner_for_guests', function ($welcomeBanner) {
    return $welcomeBanner;
}, 10, 1);
```

<a id="fluent-community-welcome-banner-for-logged-in"></a>

## `fluent_community/welcome_banner_for_logged_in`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1571` | `$welcomeBanner` (mixed) |

### Example

```php
add_filter('fluent_community/welcome_banner_for_logged_in', function ($welcomeBanner) {
    return $welcomeBanner;
}, 10, 1);
```

