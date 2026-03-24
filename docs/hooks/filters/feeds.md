---
title: Feeds Filters
description: Feeds filter hooks for FluentCommunity.
---

# Feeds Filters

31 unique filter hooks currently map to this category, across 36 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/can_view_comments_{feed}`](#fluent_communitycan_view_comments_feed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:22` |
| [`fluent_community/disable_self_post_react`](#fluent_communitydisable_self_post_react) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:488` |
| [`fluent_community/feed_api_response`](#fluent_communityfeed_api_response) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:216` |
| [`fluent_community/feed_general_config`](#fluent_communityfeed_general_config) | Core | 2 | `fluent-community/app/Services/FeedsHelper.php:896` |
| [`fluent_community/feed_links_api_response`](#fluent_communityfeed_links_api_response) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:791` |
| [`fluent_community/feed_oembed_api_response`](#fluent_communityfeed_oembed_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:1463` |
| [`fluent_community/feed_ticker`](#fluent_communityfeed_ticker) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:1293` |
| [`fluent_community/feed_view_json_ld`](#fluent_communityfeed_view_json_ld) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1109` |
| [`fluent_community/feed/new_feed_data`](#fluent_communityfeednew_feed_data) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:445` |
| [`fluent_community/feed/new_feed_data_type_{formContentType}`](#fluent_communityfeednew_feed_data_type_formContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:450` |
| [`fluent_community/feed/new_feed_response`](#fluent_communityfeednew_feed_response) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:507` |
| [`fluent_community/feed/patch_feed_response`](#fluent_communityfeedpatch_feed_response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:765` |
| [`fluent_community/feed/update_data`](#fluent_communityfeedupdate_data) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:642` |
| [`fluent_community/feed/update_feed_data`](#fluent_communityfeedupdate_feed_data) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:582` |
| [`fluent_community/feed/update_feed_data_type_{newContentType}`](#fluent_communityfeedupdate_feed_data_type_newContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:604` |
| [`fluent_community/feed/update_feed_response`](#fluent_communityfeedupdate_feed_response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:711` |
| [`fluent_community/feed/updated_survey_config`](#fluent_communityfeedupdated_survey_config) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:391` |
| [`fluent_community/feed/uploaded_feed_medias`](#fluent_communityfeeduploaded_feed_medias) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:833` |
| [`fluent_community/feeds_api_response`](#fluent_communityfeeds_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:195` |
| [`fluent_community/has_global_post`](#fluent_communityhas_global_post) | Core | 1 | `fluent-community/app/Services/Helper.php:415` |
| [`fluent_community/has_post_title`](#fluent_communityhas_post_title) | Core | 1 | `fluent-community/app/Functions/Utility.php:443` |
| [`fluent_community/last_activity_date_for_unread_feeds`](#fluent_communitylast_activity_date_for_unread_feeds) | Core | 1 | `fluent-community/app/Services/Helper.php:857` |
| [`fluent_community/max_media_per_post`](#fluent_communitymax_media_per_post) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:791` |
| [`fluent_community/max_post_length`](#fluent_communitymax_post_length) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:548` |
| [`fluent_community/new_feed_everybody_notification/email_sections`](#fluent_communitynew_feed_everybody_notificationemail_sections) | Core | 1 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:456` |
| [`fluent_community/new_feed_notification/email_sections`](#fluent_communitynew_feed_notificationemail_sections) | Core | 1 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:180` |
| [`fluent_community/pinned_posts_api_response`](#fluent_communitypinned_posts_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:191` |
| [`fluent_community/post_order_options`](#fluent_communitypost_order_options) | Core | 1 | `fluent-community/app/Services/Helper.php:2113` |
| [`fluent_community/rate_limit/posts_per_5_minutes`](#fluent_communityrate_limitposts_per_5_minutes) | Core | 1 | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:31` |
| [`fluent_community/rendering_feed_model`](#fluent_communityrendering_feed_model) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:889` |
| [`fluent_community/scheduled_posts_api_response`](#fluent_communityscheduled_posts_api_response) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:46` |

<a id="fluent_communitycan_view_comments_feed"></a>

## `fluent_community/can_view_comments_{feed}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Can View Comments {Feed} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:22` | `true` (mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_filter('fluent_community/can_view_comments_{feed}', function ($param1, $feed) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitydisable_self_post_react"></a>

## `fluent_community/disable_self_post_react`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Disable Self Post React hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:488` | `false` (mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_filter('fluent_community/disable_self_post_react', function ($param1, $feed) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communityfeed_api_response"></a>

## `fluent_community/feed_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:216` | `$data` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:271` | `[ 'feed' => $feed, 'execution_time' => microtime(true) - $start ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfeed_general_config"></a>

## `fluent_community/feed_general_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed General Config hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:896` | `[ 'user_id' => $userId, 'interactions' => [], 'comment_like_ids' => [], 'is_collection' => false ]` (array)<br>`$feed` (Feed|mixed)<br>`$userId` (mixed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:953` | `[ 'user_id' => $userId, 'interactions' => [], 'comment_like_ids' => $commentLikeIds, 'is_collection' => true ]` (array)<br>`$feeds` (Feed|mixed)<br>`$feedIds` (array) |

### Example

```php
add_filter('fluent_community/feed_general_config', function ($userId, $feed, $userId_3) {
    return $userId;
}, 10, 3);
```

<a id="fluent_communityfeed_links_api_response"></a>

## `fluent_community/feed_links_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed Links API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:791` | `$data` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:798` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_links_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfeed_oembed_api_response"></a>

## `fluent_community/feed_oembed_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed OEmbed API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1463` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_oembed_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfeed_ticker"></a>

## `fluent_community/feed_ticker`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed Ticker hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1293` | `$response` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_ticker', function ($response, $all) {
    return $response;
}, 10, 2);
```

<a id="fluent_communityfeed_view_json_ld"></a>

## `fluent_community/feed_view_json_ld`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed View JSON Ld hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1109` | `[]` (array)<br>`$feed` (Feed|mixed)<br>`$data` (mixed) |

### Example

```php
add_filter('fluent_community/feed_view_json_ld', function ($param1, $feed, $data) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityfeednew_feed_data"></a>

## `fluent_community/feed/new_feed_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed/New Feed Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:445` | `$data` (mixed)<br>`$requestData` (array) |
| Core | `fluent-community/app/Services/FeedsHelper.php:472` | `$feedData` (Feed|mixed)<br>`$allData` (mixed) |

### Example

```php
add_filter('fluent_community/feed/new_feed_data', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfeednew_feed_data_type_formContentType"></a>

## `fluent_community/feed/new_feed_data_type_{formContentType}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/New Feed Data Type {FormContentType} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:450` | `$data` (mixed)<br>`$requestData` (array) |

### Example

```php
add_filter('fluent_community/feed/new_feed_data_type_{formContentType}', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfeednew_feed_response"></a>

## `fluent_community/feed/new_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Feed/New Feed Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:507` | `[ 'feed' => FeedsHelper::transformFeed($feed), 'message' => $message, 'last_fetched_timestamp' => current_time('timestamp') ]` (array)<br>`$feed` (Feed|mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:522` | `[ 'feed' => FeedsHelper::transformFeed($feed), 'message' => __('Your post has been published', 'fluent-community'), 'last_fetched_timestamp' => current_time('timestamp') ]` (array)<br>`$feed` (Feed|mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/new_feed_response', function ($feed, $feed_2, $all) {
    return $feed;
}, 10, 3);
```

<a id="fluent_communityfeedpatch_feed_response"></a>

## `fluent_community/feed/patch_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Patch Feed Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:765` | `[ 'feed' => $feed, 'message' => __('Feed updated', 'fluent-community') ]` (array)<br>`$feed` (Feed|mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/patch_feed_response', function ($feed, $feed_2, $all) {
    return $feed;
}, 10, 3);
```

<a id="fluent_communityfeedupdate_data"></a>

## `fluent_community/feed/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Update Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:642` | `$data` (mixed)<br>`$existingFeed` (Feed|mixed) |

### Example

```php
add_filter('fluent_community/feed/update_data', function ($data, $existingFeed) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfeedupdate_feed_data"></a>

## `fluent_community/feed/update_feed_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Update Feed Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:582` | `$data` (mixed)<br>`$requestData` (array) |

### Example

```php
add_filter('fluent_community/feed/update_feed_data', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfeedupdate_feed_data_type_newContentType"></a>

## `fluent_community/feed/update_feed_data_type_{newContentType}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Update Feed Data Type {NewContentType} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:604` | `$data` (mixed)<br>`$requestData` (array)<br>`$existingFeed` (Feed|mixed) |

### Example

```php
add_filter('fluent_community/feed/update_feed_data_type_{newContentType}', function ($data, $requestData, $existingFeed) {
    return $data;
}, 10, 3);
```

<a id="fluent_communityfeedupdate_feed_response"></a>

## `fluent_community/feed/update_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Update Feed Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:711` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/update_feed_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfeedupdated_survey_config"></a>

## `fluent_community/feed/updated_survey_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Updated Survey Config hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:391` | `$surveyConfig` (mixed)<br>`$feed` (Feed|mixed)<br>`$userId` (mixed) |

### Example

```php
add_filter('fluent_community/feed/updated_survey_config', function ($surveyConfig, $feed, $userId) {
    return $surveyConfig;
}, 10, 3);
```

<a id="fluent_communityfeeduploaded_feed_medias"></a>

## `fluent_community/feed/uploaded_feed_medias`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feed/Uploaded Feed Medias hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:833` | `$uplaodedDocs` (mixed)<br>`$requestData` (array) |

### Example

```php
add_filter('fluent_community/feed/uploaded_feed_medias', function ($uplaodedDocs, $requestData) {
    return $uplaodedDocs;
}, 10, 2);
```

<a id="fluent_communityfeeds_api_response"></a>

## `fluent_community/feeds_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Feeds API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:195` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feeds_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityhas_global_post"></a>

## `fluent_community/has_global_post`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Has Global Post hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:415` | `$status` (mixed) |

### Example

```php
add_filter('fluent_community/has_global_post', function ($status) {
    return $status;
}, 10, 1);
```

<a id="fluent_communityhas_post_title"></a>

## `fluent_community/has_post_title`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Has Post Title hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:443` | `$pref` (mixed) |

### Example

```php
add_filter('fluent_community/has_post_title', function ($pref) {
    return $pref;
}, 10, 1);
```

<a id="fluent_communitylast_activity_date_for_unread_feeds"></a>

## `fluent_community/last_activity_date_for_unread_feeds`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Last Activity Date For Unread Feeds hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:857` | `$lastActivityDate` (mixed)<br>`$xprofile` (mixed) |

### Example

```php
add_filter('fluent_community/last_activity_date_for_unread_feeds', function ($lastActivityDate, $xprofile) {
    return $lastActivityDate;
}, 10, 2);
```

<a id="fluent_communitymax_media_per_post"></a>

## `fluent_community/max_media_per_post`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Max Media Per Post hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:791` | `Utility::getCustomizationSetting('max_media_per_post')` (mixed) |

### Example

```php
add_filter('fluent_community/max_media_per_post', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitymax_post_length"></a>

## `fluent_community/max_post_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Max Post Length hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:548` | `15000` (mixed) |

### Example

```php
add_filter('fluent_community/max_post_length', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitynew_feed_everybody_notificationemail_sections"></a>

## `fluent_community/new_feed_everybody_notification/email_sections`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** New Feed Everybody Notification/Email Sections hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:456` | `[ 'before_content' => '', 'after_content' => '' ]` (array)<br>`$user` (mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_filter('fluent_community/new_feed_everybody_notification/email_sections', function ($param1, $user, $feed) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communitynew_feed_notificationemail_sections"></a>

## `fluent_community/new_feed_notification/email_sections`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** New Feed Notification/Email Sections hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:180` | `[ 'before_content' => '', 'after_content' => '' ]` (array)<br>`$user` (mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_filter('fluent_community/new_feed_notification/email_sections', function ($param1, $user, $feed) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communitypinned_posts_api_response"></a>

## `fluent_community/pinned_posts_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Pinned Posts API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:191` | `$formattedActivities` (mixed)<br>`$spaceId` (Space|mixed)<br>`$isTrending` (mixed) |

### Example

```php
add_filter('fluent_community/pinned_posts_api_response', function ($formattedActivities, $spaceId, $isTrending) {
    return $formattedActivities;
}, 10, 3);
```

<a id="fluent_communitypost_order_options"></a>

## `fluent_community/post_order_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Post Order Options hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2113` | `$options` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/post_order_options', function ($options, $context) {
    return $options;
}, 10, 2);
```

<a id="fluent_communityrate_limitposts_per_5_minutes"></a>

## `fluent_community/rate_limit/posts_per_5_minutes`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Rate Limit/Posts Per 5 Minutes hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:31` | `5` (mixed) |

### Example

```php
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityrendering_feed_model"></a>

## `fluent_community/rendering_feed_model`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Rendering Feed Model hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:889` | `$feed` (Feed|mixed)<br>`$config` (mixed) |

### Example

```php
add_filter('fluent_community/rendering_feed_model', function ($feed, $config) {
    return $feed;
}, 10, 2);
```

<a id="fluent_communityscheduled_posts_api_response"></a>

## `fluent_community/scheduled_posts_api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Scheduled Posts API Response hook emitted from the current call site.

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

