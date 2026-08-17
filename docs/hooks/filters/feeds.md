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
- **When it fires:** Filters the response of the bookmarked-posts listing.

The payload wraps a `feeds` block with the usual paging keys, and adds `last_id` on page one only. Bookmarks are restricted to `published` posts, so the list never contains scheduled, pending or unlisted items even for moderators.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `feeds` block and, on page one, `last_id`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:269` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/bookmarks_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/feeds_api_response`](#fluent-community-feeds-api-response)

<a id="fluent-community-create-post-default-space"></a>

## `fluent_community/create_post_default_space`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the space pre-selected in the post composer.

Surfaces as `portal_vars.default_post_space` and takes a space slug. The composer applies it only on the all-feeds and profile-feeds routes, only when no space is already chosen, and only if the slug appears among the spaces the viewer may post in — so an invalid or inaccessible slug is quietly ignored rather than producing an error. The special slug `__self__post__` selects the viewer's own profile.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$spaceSlug` | `string` | Slug of the space to pre-select. Empty by default. |

**Return:** `string` — a space slug, or an empty string for no pre-selection.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:737` | `''` (string) |

### Example

```php
add_filter('fluent_community/create_post_default_space', function ($spaceSlug) {
    return $spaceSlug;
}, 10, 1);
```

**Related:** [`fluent_community/portal_vars`](#fluent-community-portal-vars)

<a id="fluent-community-disable-duplicate-post-check"></a>

## `fluent_community/disable_duplicate_post_check`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the identical-post guard is skipped for this submission.

By default a post whose trimmed body exactly matches one the same author made in the same space within the last seven days is refused with "No duplicate post please!". The window is much wider than the comment equivalent, which has no time bound but is scoped to a single post. Note the third argument is the space ID and is `null` for profile posts.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$skipCheck` | `bool` | Whether to skip the duplicate check. `false` by default. |
| 2 | `$userId` | `int` | The author's user ID. |
| 3 | `$spaceId` | `int` | The target space ID, or `null` for a profile post. |

**Return:** `bool` — a truthy return skips the check entirely and allows the duplicate.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:793` | `false` (bool)<br>`$userId` (int)<br>`$spaceId` (int) |

### Example

```php
add_filter('fluent_community/disable_duplicate_post_check', function ($skipCheck, $userId, $spaceId) {
    return $skipCheck;
}, 10, 3);
```

**Related:** [`fluent_community/disable_duplicate_comment_check`](#fluent-community-disable-duplicate-comment-check)

<a id="fluent-community-disable-self-post-react"></a>

## `fluent_community/disable_self_post_react`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters whether members are barred from reacting to their own posts.

Like its comment twin the name inverts the default: it is `false`, so self-reacting is allowed unless you return `true`. The filter is only consulted when the reacting user is the author, and it is applied before the like/bookmark split, so blocking it also blocks members bookmarking their own posts. Two identical call sites exist because the react endpoint is implemented twice.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$disabled` | `bool` | Whether to reject the reaction. `false` by default. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post being reacted to, so the rule can be scoped per space. |

**Return:** `bool` — `true` to reject the reaction with an error.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:519` | `false` (bool)<br>`$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:91` | `false` (bool)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/disable_self_post_react', function ($disabled, $feed) {
    return $disabled;
}, 10, 2);
```

**Related:** [`fluent_community/disable_self_comment_react`](#fluent-community-disable-self-comment-react)

<a id="fluent-community-feed-api-response"></a>

## `fluent_community/feed_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the single-post response, for both the read and the edit views.

Applied at three points in `getFeedBySlug()`, and `getFeedById()` delegates to it, so every single-post fetch passes through. The payload shape is not constant: with `context=edit` it is `{ feed }` built by `FeedsHelper::transformForEdit()`, otherwise `{ feed, execution_time }` built by `transformFeed()`. Check which one you have before reaching into the feed object.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `feed`, plus `execution_time` on the read path. |
| 2 | `$requestData` | `array` | The full request parameters, including `context`. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:175` | `$data` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:203` | `[ 'feed' => $feed, 'execution_time' => microtime(true) - $start ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/feeds_api_response`](#fluent-community-feeds-api-response) · [`fluent_community/rendering_feed_model`](#fluent-community-rendering-feed-model)

<a id="fluent-community-feed-general-config"></a>

## `fluent_community/feed_general_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the shared configuration used while transforming posts for output.

Two call sites with incompatible trailing arguments: `transformFeed()` passes a single `Feed` and the current user ID, while `transformFeedsCollection()` passes the whole collection and an array of post IDs. The `is_collection` key in the config tells them apart — branch on that rather than on argument types. Setting `interactions` here is pointless for logged-in viewers: the collection path overwrites it per post from a pre-fetched reaction map, and the single path overwrites it outright.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$config` | `array` | Transform config: `user_id`, `interactions`, `comment_like_ids`, `is_collection`. |
| 2 | `$feed` | `mixed` | A single `Feed` model, or the `Collection` of posts on the collection path. |
| 3 | `$context` | `mixed` | The current user ID on the single path, or the array of post IDs on the collection path. |

**Return:** The config array. Keep `is_collection` intact — the transformer branches on it.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:1060` | `array (4 keys: user_id, interactions, comment_like_ids, …)` (array)<br>`$feed` (Feed)<br>`$userId` (int) |
| Core | `fluent-community/app/Services/FeedsHelper.php:1117` | `array (4 keys: user_id, interactions, comment_like_ids, …)` (array)<br>`$feeds` (mixed)<br>`$feedIds` (int[]) |

### Example

```php
add_filter('fluent_community/feed_general_config', function ($config, $feed, $context) {
    return $config;
}, 10, 3);
```

**Related:** [`fluent_community/rendering_feed_model`](#fluent-community-rendering-feed-model)

<a id="fluent-community-feed-links-api-response"></a>

## `fluent_community/feed_links_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the response of the feed custom-links endpoint.

Applied on both branches with the same payload key. With `scope=view` the list has already been filtered down to links the current viewer may see; any other scope returns the raw stored list for the settings screen, including disabled and privacy-restricted entries. Read `scope` out of the second argument if the difference matters.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `links` array. |
| 2 | `$requestData` | `array` | The full request parameters, including `scope`. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:742` | `$data` (mixed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:749` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_links_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-feed-oembed-api-response"></a>

## `fluent_community/feed_oembed_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the link-preview response returned for a pasted URL.

Only applied when `RemoteUrlParser` successfully resolved metadata; a failed or invalid URL returns an error response that never reaches this filter. The `oembed` value is the parser output — `title`, `image`, `description`, `icon`, `type` and `url` — and is what ends up stored as the post's `meta.media_preview`. To intervene before the remote request is made, use `fluent_community/preview_metadata_pre_fetch` instead.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with an `oembed` metadata array. |
| 2 | `$requestData` | `array` | The full request parameters, including `url`. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1305` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_oembed_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/preview_metadata_pre_fetch`](#fluent-community-preview-metadata-pre-fetch)

<a id="fluent-community-feed-ticker"></a>

## `fluent_community/feed_ticker`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the polling payload the portal uses to refresh feeds and the notification badge.

The SPA polls this endpoint every 45 to 75 seconds per open session, so callbacks run very frequently and must stay cheap. The payload carries `timestamp`, `has_changes`, a `feeds` array of up to 20 change records each with a fully transformed `feed_data`, an unread `notifications` count, an unused `spaces` placeholder, and `execution_time`. The `new_count` inside `notifications` is hard-coded to 0.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Ticker payload: `timestamp`, `has_changes`, `feeds`, `notifications`, `spaces`, `execution_time`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1167` | `$response` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed_ticker', function ($response, $requestData) {
    return $response;
}, 10, 2);
```

**Related:** [`fluent_community/track_activity`](#fluent-community-track-activity)

<a id="fluent-community-feed-view-json-ld"></a>

## `fluent_community/feed_view_json_ld`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Collects the JSON-LD structured data emitted in the head of a single post page.

Starts as an empty array and is only reached on server-rendered post views, so it has no effect on SPA navigation between posts. Nothing in core adds to it; Pro's SEO module is the only contributor, and the whole graph is dropped when nothing is added. The third argument is the page meta being assembled, which already contains the resolved title, description, canonical URL and featured image.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$jsonLd` | `array` | The structured-data graph. Empty by default. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post being rendered. |
| 3 | `$data` | `array` | The head meta assembled so far: `title`, `og_title`, `description`, `canonical_url`, `featured_image`. |

**Return:** The structured-data array. An empty array emits no JSON-LD block.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1153` | `[]` (array)<br>`$feed` (Feed)<br>`$data` (mixed) |

### Example

```php
add_filter('fluent_community/feed_view_json_ld', function ($jsonLd, $feed, $data) {
    return $jsonLd;
}, 10, 3);
```

<a id="fluent-community-feed-filterable-statuses"></a>

## `fluent_community/feed/filterable_statuses`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters which post statuses a caller may explicitly request in the feed listing.

Defaults to an empty array, meaning no status filter is honoured at all in core — the free plugin always falls back to the moderation-aware default scope. Pro adds `published`, `unlisted`, `pending` and `scheduled`. The requested status is matched with a strict `in_array()`, so return plain strings, and the filter only unlocks the request for moderators or a member viewing their own profile feed; anyone else is silently held to the default scope.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$statuses` | `array` | Allowed status strings. Empty by default. |

**Return:** `array` — a flat list of status strings, compared strictly against the requested `status`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:44` | `[]` (array) |

### Example

```php
add_filter('fluent_community/feed/filterable_statuses', function ($statuses) {
    return $statuses;
}, 10, 1);
```

**Related:** [`fluent_community/feed/save_status`](#fluent-community-feed-save-status)

<a id="fluent-community-feed-new-feed-data"></a>

## `fluent_community/feed/new_feed_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the attribute array a new post is about to be created from.

The main pre-save hook for posts, applied by both `FeedsController::store()` and `FeedsHelper::createFeed()`. By this point `message_rendered`, `meta` and the mention IDs are all populated and media has been resolved, so changing `message` alone will not change what readers see. Returning a `WP_Error` aborts the save and surfaces its message and error data to the client — Pro's moderation and post-scheduling handlers both use this hook, the latter to switch `status` to `scheduled`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The attributes to create the post with: `message`, `message_rendered`, `status`, `space_id`, `content_type`, `meta` and so on. |
| 2 | `$requestData` | `array` | The full request payload; carries `is_admin` on the controller path. |

**Return:** `array` — the attribute map, or a `WP_Error` to reject the post.

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

**Related:** [`fluent_community/feed/new_feed_data_type_{formContentType}`](#fluent-community-feed-new-feed-data-type-formContentType) · [`fluent_community/feed/update_feed_data`](#fluent-community-feed-update-feed-data)

<a id="fluent-community-feed-new-feed-data-type-formContentType"></a>

## `fluent_community/feed/new_feed_data_type_{formContentType}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Content-type-scoped twin of `fluent_community/feed/new_feed_data`.

Applied immediately after the generic filter, and only when the request carried a non-empty `content_type` — so the live names are `fluent_community/feed/new_feed_data_type_document` and `..._survey`. It shares the generic filter's `WP_Error` contract, which is how the Document Library rejects a post whose documents fail validation; it registers at priority 1 so it runs before other callbacks.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The attributes to create the post with, as returned by the generic filter. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the attribute map, or a `WP_Error` to reject the post.

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

**Related:** [`fluent_community/feed/new_feed_data`](#fluent-community-feed-new-feed-data)

<a id="fluent-community-feed-new-feed-response"></a>

## `fluent_community/feed/new_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the response returned after a post is created.

Applied on the published branch and on the held-for-moderation branch, but not on the scheduled branch, which returns early with an unfiltered payload carrying `scheduled_at`. The `message` key is the string the composer shows; Pro rewrites it for unlisted posts and for posts caught by moderation. Unusually for a response filter the second argument is the `Feed` model rather than the request data, which is the third.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Response payload: `feed`, `message`, `last_fetched_timestamp`. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post that was created. |
| 3 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:427` | `array (3 keys: feed, message, last_fetched_timestamp)` (array)<br>`$feed` (Feed)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:444` | `array (3 keys: feed, message, last_fetched_timestamp)` (array)<br>`$feed` (Feed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/new_feed_response', function ($response, $feed, $requestData) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/feed/update_feed_response`](#fluent-community-feed-update-feed-response) · [`fluent_community/feed/patch_feed_response`](#fluent-community-feed-patch-feed-response)

<a id="fluent-community-feed-patch-feed-response"></a>

## `fluent_community/feed/patch_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response of the lightweight post-patch endpoint.

The patch endpoint only ever touches `is_sticky`, `priority` and `comments_disabled`, and non-moderators are narrowed to `comments_disabled` alone. The `feed` in the payload is the raw model, not a transformed post, so it does not carry the interaction and permission keys the SPA sees elsewhere. The filter is applied even when nothing changed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Response payload: `feed` (raw model) and `message`. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post after the patch. |
| 3 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:716` | `[ 'feed' => $feed, 'message' => __('Feed updated', 'fluent-community') ]` (array)<br>`$feed` (Feed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/patch_feed_response', function ($response, $feed, $requestData) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/feed/update_feed_response`](#fluent-community-feed-update-feed-response)

<a id="fluent-community-feed-save-status"></a>

## `fluent_community/feed/save_status`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the status a post is about to be saved with.

Two call sites with different defaults. On create the incoming value is always `published`, and the third argument is `null`. On update it is only consulted when the request carried a `status` among `published`, `unlisted`, `scheduled` and `pending`, the incoming value is that status — except that a request for `unlisted` passes the post's current status instead — and the third argument is the existing post. Pro uses it to honour `unlisted`; the returned string is written straight to the column without validation.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$status` | `string` | The status to save. `published` on create. |
| 2 | `$requestData` | `array` | The full request payload, including the requested `status`. |
| 3 | `$existingFeed` | `\FluentCommunity\App\Models\Feed` | The post being edited, or `null` on create. |

**Return:** `string` — the status. It is not validated against a whitelist, so an unrecognised value will be stored and will hide the post.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:284` | `$data['status']` (array)<br>`$requestData` (array)<br>`null` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:481` | `$fallbackStatus` (mixed)<br>`$requestData` (array)<br>`$existingFeed` (Feed) |

### Example

```php
add_filter('fluent_community/feed/save_status', function ($status, $requestData, $existingFeed) {
    return $status;
}, 10, 3);
```

**Related:** [`fluent_community/feed/filterable_statuses`](#fluent-community-feed-filterable-statuses) · [`fluent_community/feed/new_feed_{feed}`](#fluent-community-feed-new-feed-feed)

<a id="fluent-community-feed-update-data"></a>

## `fluent_community/feed/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** The last chance to alter a post's attributes before an edit is saved.

Not to be confused with `fluent_community/feed/update_feed_data`, which is a different filter earlier in the same method. This one runs after content-type handling, edit-history stamping and any space move, immediately before `fill()` and `save()`, so whatever it returns is what lands in the row and in the `$dirty` map reported by `fluent_community/feed/updated`. Unlike the earlier filter it has no `WP_Error` path — returning one would be filled onto the model.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The attributes about to be written. |
| 2 | `$existingFeed` | `\FluentCommunity\App\Models\Feed` | The post as currently stored. |

**Return:** `array` — the attribute map. Must be an array; there is no error contract here.

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

**Related:** [`fluent_community/feed/update_feed_data`](#fluent-community-feed-update-feed-data) · [`fluent_community/feed/updated`](#fluent-community-feed-updated)

<a id="fluent-community-feed-update-feed-data"></a>

## `fluent_community/feed/update_feed_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters an edited post's attributes early in the update flow.

The update-side counterpart of `fluent_community/feed/new_feed_data`, applied before content-type resolution and before the space-move handling, and it does support `WP_Error` for rejecting an edit. Anything you set here can still be overwritten further down the method — notably `content_type`, `space_id` and `meta.last_edited`. For a final say, use `fluent_community/feed/update_data`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The attributes for the edit, including `message`, `message_rendered` and `meta`. |
| 2 | `$requestData` | `array` | The full request payload; carries `is_admin`. |

**Return:** `array` — the attribute map, or a `WP_Error` to reject the edit.

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

**Related:** [`fluent_community/feed/update_data`](#fluent-community-feed-update-data) · [`fluent_community/feed/new_feed_data`](#fluent-community-feed-new-feed-data)

<a id="fluent-community-feed-update-feed-data-type-newContentType"></a>

## `fluent_community/feed/update_feed_data_type_{newContentType}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Content-type-scoped filter applied when an edited post has a non-text content type.

The suffix is the incoming type, so `..._document` and `..._survey` are the live names. It is skipped entirely when the resolved type is `text`, including the case where a document post loses its documents and is demoted back to text. Note the extra third argument compared with the create-side twin, and that it honours `WP_Error` — the Document Library uses that to refuse an edit with invalid documents.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The attributes for the edit. |
| 2 | `$requestData` | `array` | The full request payload. |
| 3 | `$existingFeed` | `\FluentCommunity\App\Models\Feed` | The post as currently stored. |

**Return:** `array` — the attribute map, or a `WP_Error` to reject the edit.

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

**Related:** [`fluent_community/feed/new_feed_data_type_{formContentType}`](#fluent-community-feed-new-feed-data-type-formContentType) · [`fluent_community/feed/updating_content_type_old_{existingContentType}`](#fluent-community-feed-updating-content-type-old-existingContentType)

<a id="fluent-community-feed-update-feed-response"></a>

## `fluent_community/feed/update_feed_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response returned after a post is edited.

Applied unconditionally at the end of the update endpoint, including when the edit changed nothing and the `fluent_community/feed/updated` action was therefore skipped. The `feed` value is the fully transformed post, the same shape the listing endpoints return.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `feed` and `message`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:662` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feed/update_feed_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/feed/new_feed_response`](#fluent-community-feed-new-feed-response)

<a id="fluent-community-feed-uploaded-feed-medias"></a>

## `fluent_community/feed/uploaded_feed_medias`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the media models resolved for a post while its metadata is being prepared.

Applied at the end of `FeedsHelper::processFeedMetaData()`, which runs on both create and update, and the returned models are what the controller then binds to the post by setting `feed_id`, `is_active` and `object_source`. Every entry must be a saveable `Media` model — the caller writes properties onto each one directly. The core FluentPlayer integration uses it to swap in transcoded audio and video rows.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$medias` | `array` | The resolved `Media` models for this post. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — a flat list of `Media` models.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:997` | `$uplaodedDocs` (mixed)<br>`$requestData` (array) |

### Example

```php
add_filter('fluent_community/feed/uploaded_feed_medias', function ($medias, $requestData) {
    return $medias;
}, 10, 2);
```

<a id="fluent-community-feeds-api-response"></a>

## `fluent_community/feeds_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the main feed listing response.

Covers the global feed, space feeds and profile feeds — they are all the same endpoint. The payload holds a `feeds` block with the paging keys, a `sticky` post that is only ever populated on page one of a space feed, `execution_time`, and `last_fetched_timestamp` for a logged-in viewer on page one of an unfiltered feed. Note `total` is an estimate derived from the current page, not a real count.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `feeds`, `sticky`, `execution_time`, and sometimes `last_fetched_timestamp`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:154` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/feeds_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/feeds_query`](#fluent-community-feeds-query) · [`fluent_community/feed_api_response`](#fluent-community-feed-api-response)

<a id="fluent-community-get-welcome-banner-settings"></a>

## `fluent_community/get_welcome_banner_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the stored welcome-banner settings as returned to the admin settings screen.

This is the editor-facing shape: both the `login` and `logout` variants complete with their raw `description`, whether or not they are enabled. The reader-facing banner goes through `fluent_community/welcome_banner_for_logged_in` or `..._for_guests` instead, which strip the raw description and return `null` for a disabled banner.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | The banner settings, keyed `login` and `logout`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The settings array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:333` | `Helper::getWelcomeBannerSettings()` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/get_welcome_banner_settings', function ($settings, $requestData) {
    return $settings;
}, 10, 2);
```

**Related:** [`fluent_community/update_welcome_banner_settings`](#fluent-community-update-welcome-banner-settings) · [`fluent_community/welcome_banner_api_response`](#fluent-community-welcome-banner-api-response)

<a id="fluent-community-has-global-post"></a>

## `fluent_community/has_global_post`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether members may post outside a space, to their own profile feed.

The stored setting is inverted before the filter sees it: `disable_global_posts` set to `yes` arrives here as `false`. Returning `false` makes the composer reject a submission with no space and rejects the special `__self__post__` space slug, and it is also what the "Post to profile" option in the composer keys off.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$status` | `bool` | Whether profile posting is allowed. Derived from the `disable_global_posts` setting. |

**Return:** `bool` — `true` to allow posts with no space.

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
- **When it fires:** Filters whether posts carry a title, and whether that title is mandatory.

Despite the boolean-sounding name this is a string preference: `optional`, `required`, or an empty string when titles are off. The stored value `disabled` is normalised to an empty string before the filter runs, so return an empty string rather than `disabled` to switch titles off. Any truthy value enables title handling in the sanitiser, but only the exact string `required` makes a missing title an error; titles are trimmed to 192 characters regardless.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$pref` | `string` | `optional`, `required`, or an empty string. |

**Return:** `string` — an empty string disables titles, `required` makes them mandatory, and any other truthy string behaves as optional.

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
- **When it fires:** Filters the cut-off date used to count unread posts per space in the sidebar.

Defaults to the viewer's `last_activity` minus five minutes, expressed as a UTC `Y-m-d H:i:s` string, and is compared directly against `fcom_posts.created_at`. Returning a `DateTime` or a timestamp will not work — the value goes straight into the query. Members with no recorded activity never reach the filter, and counts are capped for display at `10+`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$lastActivityDate` | `string` | UTC datetime string; `last_activity` minus 300 seconds by default. |
| 2 | `$xprofile` | `\FluentCommunity\App\Models\XProfile` | The viewing member. |

**Return:** `string` — a `Y-m-d H:i:s` datetime.

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
- **When it fires:** Filters how many media items may be attached to a single post.

Applied twice with the same default from the customiser settings (4): once inside `portal_vars`, where the composer uses it to stop accepting further images, and once in `FeedsHelper` where surplus items are trimmed with `array_slice()`. Filter it unconditionally so both agree — raising only the client-side value results in silently discarded attachments. A value of `0` hides the attachment button altogether.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxMedia` | `int` | Maximum media items per post; comes from the `max_media_per_post` customiser setting, default 4. |

**Return:** `int` — the cap. It is cast with `(int)` before the server-side trim.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:506` | `Utility::getCustomizationSetting('max_media_per_post')` (mixed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:955` | `Utility::getCustomizationSetting('max_media_per_post')` (mixed) |

### Example

```php
add_filter('fluent_community/max_media_per_post', function ($maxMedia) {
    return $maxMedia;
}, 10, 1);
```

**Related:** [`fluent_community/portal_vars`](#fluent-community-portal-vars)

<a id="fluent-community-max-post-length"></a>

## `fluent_community/max_post_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the maximum number of characters allowed in a post body.

Defaults to 15000 and is enforced server-side in `FeedsHelper::sanitizeAndValidateData()`; exceeding it throws and the post is rejected. The check uses `strlen()` on the Markdown source, so it counts bytes rather than characters — multibyte content hits the ceiling sooner than the number suggests, and inline image syntax counts towards it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxLength` | `int` | The byte ceiling for a post body, 15000 by default. |

**Return:** `int` — the maximum length. There is no matching client-side limit, so this is the only enforcement point.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:590` | `15000` (int) |

### Example

```php
add_filter('fluent_community/max_post_length', function ($maxLength) {
    return $maxLength;
}, 10, 1);
```

**Related:** [`fluent_community/max_comment_char_length`](#fluent-community-max-comment-char-length)

<a id="fluent-community-pinned-posts-api-response"></a>

## `fluent_community/pinned_posts_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the pinned or trending posts shown alongside the activity list.

The first argument is a flat list of at most five items, each with `id`, `message` (a 100-character excerpt), `permalink`, `xprofile` and `created_at` — not a wrapped payload. The same filter serves two different queries: with `$isTrending` true and no space it returns the last seven days ordered by engagement, otherwise it returns posts explicitly flagged with `priority = 1`. Both arguments can be `null`/`false` on the global activity feed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$posts` | `array` | The formatted pinned posts, at most five. |
| 2 | `$spaceId` | `int` | The space being listed, or `null` for the global activity feed. |
| 3 | `$isTrending` | `bool` | Whether the trending query was used rather than the pinned query. |

**Return:** The list of formatted posts.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:195` | `$formattedActivities` (mixed)<br>`$spaceId` (int)<br>`$isTrending` (mixed) |

### Example

```php
add_filter('fluent_community/pinned_posts_api_response', function ($posts, $spaceId, $isTrending) {
    return $posts;
}, 10, 3);
```

**Related:** [`fluent_community/activities_api_response`](#fluent-community-activities-api-response)

<a id="fluent-community-post-order-options"></a>

## `fluent_community/post_order_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the sort options offered for post listings.

Defaults to new activity, latest, oldest, popular, likes, alphabetical and unanswered. The keys do double duty: they populate the portal dropdowns and they are the whitelist `Feed::scopeCustomOrderBy()` and the sanitiser validate against, so removing a key stops that sort working everywhere. Adding a key makes it selectable and accepted, but the scope has no branch for it and falls through to `fluent_community/custom_order_by` — that is where you implement the ordering. Pro adds `following` this way. `$context` is `feed` or `user`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$options` | `array` | Sort keys mapped to translated labels. |
| 2 | `$context` | `string` | `feed` for space and global listings, `user` for profile feeds. |

**Return:** `array` — an associative map of sort key to label, preserving order.

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

**Related:** [`fluent_community/custom_order_by`](#fluent-community-custom-order-by) · [`fluent_community/comment_order_options`](#fluent-community-comment-order-options)

<a id="fluent-community-rate-limit-posts-per-5-minutes"></a>

## `fluent_community/rate_limit/posts_per_5_minutes`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters how many posts a member may create in a rolling five-minute window.

Defaults to 5. The comparison is `count > limit` over posts created in the last 300 seconds, so the effective allowance is one more than the number returned. Site administrators are exempt before the filter is consulted, and exceeding the limit throws rather than returning a structured error.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$limitPer5Minutes` | `int` | Posts allowed per rolling five minutes, 5 by default. |

**Return:** `int` — the limit.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:31` | `5` (int) |

### Example

```php
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function ($limitPer5Minutes) {
    return $limitPer5Minutes;
}, 10, 1);
```

**Related:** [`fluent_community/rate_limit/comments_per_minute`](#fluent-community-rate-limit-comments-per-minute) · [`fluent_community/check_rate_limit/create_post`](#fluent-community-check-rate-limit-create-post)

<a id="fluent-community-scheduled-posts-api-response"></a>

## `fluent_community/scheduled_posts_api_response`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the GET /scheduled-posts response.

Each feed in the paginated list has already been run through FeedsHelper::transformFeed(), so it carries the same shape as a normal feed listing.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a paginated `feeds` key. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:46` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/scheduled_posts_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/feed/rescheduled`](#fluent-community-feed-rescheduled)

<a id="fluent-community-update-welcome-banner-settings"></a>

## `fluent_community/update_welcome_banner_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the welcome-banner settings on their way to storage.

Runs after sanitisation and after the markdown descriptions have been rendered into `description_rendered`, so if you change a `description` here you must render its HTML twin yourself. Whatever you return is written to the `welcome_banner_settings` option and cached for a week, and is also echoed back in the response. It takes a single argument — there is no request payload.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | The sanitised settings, keyed `login` and `logout`. |

**Return:** The settings array, written verbatim to the option.

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

**Related:** [`fluent_community/get_welcome_banner_settings`](#fluent-community-get-welcome-banner-settings)

<a id="fluent-community-welcome-banner-api-response"></a>

## `fluent_community/welcome_banner_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the welcome-banner payload the portal fetches at runtime.

The scope is chosen from the session, not the request: a logged-in visitor gets the `login` banner and a guest gets the `logout` one. `welcome_banner` is `null` when the relevant banner is disabled. The value has already passed through `fluent_community/welcome_banner_for_logged_in` or `..._for_guests`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `welcome_banner` key, possibly `null`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:730` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/welcome_banner_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/welcome_banner_for_logged_in`](#fluent-community-welcome-banner-for-logged-in) · [`fluent_community/welcome_banner_for_guests`](#fluent-community-welcome-banner-for-guests)

<a id="fluent-community-welcome-banner-for-guests"></a>

## `fluent_community/welcome_banner_for_guests`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the welcome banner shown to logged-out visitors.

Only reached when the `logout` banner is enabled — a disabled banner returns `null` before the filter runs, so this is not the hook for adding a banner where none is configured. The raw markdown `description` has been removed by this point; the rendered HTML lives in `description_rendered`. When a custom URL is not in use the call-to-action link has already been rewritten to the portal auth URL.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$welcomeBanner` | `array` | The guest banner: `enabled`, `description_rendered`, `mediaType`, `bannerImage`, `bannerVideo`, `buttonLabel`, `buttonLink`. |

**Return:** The banner array.

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

**Related:** [`fluent_community/welcome_banner_for_logged_in`](#fluent-community-welcome-banner-for-logged-in)

<a id="fluent-community-welcome-banner-for-logged-in"></a>

## `fluent_community/welcome_banner_for_logged_in`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the welcome banner shown to signed-in members.

The `login` twin of the guest filter, with the same caveats: it is skipped entirely when the banner is disabled, and the raw `description` has been stripped in favour of `description_rendered`. The banner is global — there is no per-space or per-member variant, so scope it yourself if you need one.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$welcomeBanner` | `array` | The member banner: `enabled`, `description_rendered`, `mediaType`, `allowClose`, `bannerImage`, `bannerVideo`, `ctaButtons`. |

**Return:** The banner array.

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

**Related:** [`fluent_community/welcome_banner_for_guests`](#fluent-community-welcome-banner-for-guests)

