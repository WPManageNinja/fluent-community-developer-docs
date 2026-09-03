---
title: Comments Filters
description: Comments filter hooks for FluentCommunity.
---

# Comments Filters

13 unique filter hooks currently map to this category, across 13 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/comment_api_response`](#fluent-community-comment-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:749` |
| [`fluent_community/comment_order_options`](#fluent-community-comment-order-options) | Core | 1 | `fluent-community/app/Services/Helper.php:2279` |
| [`fluent_community/comment/comment_data`](#fluent-community-comment-comment-data) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:124` |
| [`fluent_community/comment/new_comment_response`](#fluent-community-comment-new-comment-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:182` |
| [`fluent_community/comment/patch_comment_response`](#fluent-community-comment-patch-comment-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:339` |
| [`fluent_community/comment/update_comment_data`](#fluent-community-comment-update-comment-data) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:230` |
| [`fluent_community/comments_api_response`](#fluent-community-comments-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:72` |
| [`fluent_community/comments_query_response`](#fluent-community-comments-query-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:53` |
| [`fluent_community/disable_duplicate_comment_check`](#fluent-community-disable-duplicate-comment-check) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:127` |
| [`fluent_community/disable_self_comment_react`](#fluent-community-disable-self-comment-react) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:640` |
| [`fluent_community/max_comment_char_length`](#fluent-community-max-comment-char-length) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:453` |
| [`fluent_community/profile_comments_api_response`](#fluent-community-profile-comments-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:718` |
| [`fluent_community/rate_limit/comments_per_minute`](#fluent-community-rate-limit-comments-per-minute) | Core | 1 | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:50` |

<a id="fluent-community-comment-api-response"></a>

## `fluent_community/comment_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the single-comment response.

Serves the endpoint the portal calls when deep-linking to a comment and when opening one for editing. With `context=edit` the payload has been reshaped first: `meta` is unset and any attached images are lifted onto a `media_images` property, or a non-uploader preview is put back under `meta.media_preview`. Access is verified against the parent post before the filter runs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `comment` key. |
| 2 | `$requestData` | `array` | The full request parameters, including `context`. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:749` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/comment_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/comments_api_response`](#fluent-community-comments-api-response)

<a id="fluent-community-comment-order-options"></a>

## `fluent_community/comment_order_options`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the comment sort options a space administrator can choose from as that space's default.

Defaults to `oldest` (labelled "Earliest"), `latest`, `popular` and `most_replied`. It reaches the portal as `comment_order_by_options`, and the only consumer is the space settings form. The reader-facing sort dropdown is hard-coded in the Vue components and the sorting itself is done client-side, so adding a key here makes it selectable as a space default but nothing will know how to apply it. Removing keys is the safe direction. `$context` is `comment` at the only current call site.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$options` | `array` | Sort keys mapped to translated labels. |
| 2 | `$context` | `string` | The list being sorted; `comment` today. |

**Return:** `array` — an associative map of sort key to label, preserving order.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2279` | `$options` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/comment_order_options', function ($options, $context) {
    return $options;
}, 10, 2);
```

**Related:** [`fluent_community/portal_vars`](/hooks/filters/rendering#fluent-community-portal-vars)

<a id="fluent-community-comment-comment-data"></a>

## `fluent_community/comment/comment_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the attributes a new comment is about to be created from.

The pre-save hook for comments, applied immediately after the read-only `fluent_community/before_comment_create` action. Setting `status` to something other than `published` here diverts the request into the held-comment branch — that is how Pro's moderation holds a comment back. There is no `WP_Error` contract: unlike the post-side filters, whatever you return is passed straight to `Comment::create()`, so throw if you need to abort.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$commentData` | `array` | The attributes to create the comment with: `post_id`, `message`, `message_rendered`, `parent_id`, `is_admin`, `meta`, `status`. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post being commented on. |

**Return:** `array` — the attribute map. It is not validated, so unknown keys will reach the model.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:124` | `$commentData` (mixed)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/comment/comment_data', function ($commentData, $feed) {
    return $commentData;
}, 10, 2);
```

**Related:** [`fluent_community/comment/update_comment_data`](#fluent-community-comment-update-comment-data) · [`fluent_community/before_comment_create`](/hooks/actions/comments#fluent-community-before-comment-create)

<a id="fluent-community-comment-new-comment-response"></a>

## `fluent_community/comment/new_comment_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response returned when a new comment is not published.

Only applied on the held-for-moderation branch. The success path returns its payload without any filter at all, so this is not a general "comment created" response hook — it exists so Pro can explain to the author why their comment is pending. The `comment` value is the raw model with its relations loaded.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Response payload: `comment` and `message`. |
| 2 | `$comment` | `\FluentCommunity\App\Models\Comment` | The stored comment, in its non-published status. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:182` | `$response` (mixed)<br>`$comment` (Comment) |

### Example

```php
add_filter('fluent_community/comment/new_comment_response', function ($response, $comment) {
    return $response;
}, 10, 2);
```

**Related:** [`fluent_community/comment/new_comment_{comment}`](/hooks/actions/comments#fluent-community-comment-new-comment-comment) · [`fluent_community/comment/patch_comment_response`](#fluent-community-comment-patch-comment-response)

<a id="fluent-community-comment-patch-comment-response"></a>

## `fluent_community/comment/patch_comment_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response of the comment patch endpoint.

The patch endpoint handles the pin toggle only and is restricted to moderators and admins. The filter is applied whether or not anything changed, and receives four arguments — note that the request data is last, not second as in most response filters.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | Response payload: `comment` and `message`. |
| 2 | `$comment` | `\FluentCommunity\App\Models\Comment` | The comment after the patch. |
| 3 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to. |
| 4 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:339` | `array (2 keys: comment, message)` (array)<br>`$comment` (Comment)<br>`$feed` (Feed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/comment/patch_comment_response', function ($response, $comment, $feed, $requestData) {
    return $response;
}, 10, 4);
```

**Related:** [`fluent_community/comment/updated`](/hooks/actions/comments#fluent-community-comment-updated)

<a id="fluent-community-comment-update-comment-data"></a>

## `fluent_community/comment/update_comment_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the attributes an edited comment is about to be saved with.

The update-side twin of `fluent_community/comment/comment_data`, with two extra arguments. What you return is filled onto the model and determines the dirty check, so returning the attributes unchanged makes the edit a silent no-op that fires neither `fluent_community/comment_updated` nor its type-scoped twin. Pro uses it to re-flag an edited comment.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$commentData` | `array` | The attributes for the edit. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to. |
| 3 | `$requestData` | `array` | The full request payload; carries `is_admin`. |
| 4 | `$comment` | `\FluentCommunity\App\Models\Comment` | The comment as currently stored. |

**Return:** `array` — the attribute map.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:230` | `$commentData` (mixed)<br>`$feed` (Feed)<br>`$requestData` (array)<br>`$comment` (Comment) |

### Example

```php
add_filter('fluent_community/comment/update_comment_data', function ($commentData, $feed, $requestData, $comment) {
    return $commentData;
}, 10, 4);
```

**Related:** [`fluent_community/comment/comment_data`](#fluent-community-comment-comment-data)

<a id="fluent-community-comments-api-response"></a>

## `fluent_community/comments_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the comment listing response for one post.

The endpoint returns every comment on the post in one go — there is no paging, and sorting is done client side — so on a busy thread the payload can be large. Replies are flat in the list, distinguished by `parent_id`. When `fluent_community/can_view_comments_{type}` denies access the endpoint returns an empty list early and this filter never runs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `comments` collection. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:72` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/comments_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/comments_query_response`](#fluent-community-comments-query-response) · [`fluent_community/can_view_comments_{feed}`](/hooks/filters/permissions#fluent-community-can-view-comments-feed)

<a id="fluent-community-comments-query-response"></a>

## `fluent_community/comments_query_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the comment collection for a post before the viewer's likes are marked on it.

Receives an Eloquent collection of `Comment` models, not an array and not a response payload — return a collection or the `each()` call that follows will fail. It runs after moderation-status scoping and after inactive-profile comments have been excluded, which makes it the right place to drop or reorder comments; `fluent_community/comments_api_response` is the place to reshape the response.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comments` | `\FluentCommunity\Framework\Database\Orm\Collection` | The post's comments, with `xprofile` eager-loaded. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The comment collection.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:53` | `$comments` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/comments_query_response', function ($comments, $requestData) {
    return $comments;
}, 10, 2);
```

**Related:** [`fluent_community/comments_api_response`](#fluent-community-comments-api-response)

<a id="fluent-community-disable-duplicate-comment-check"></a>

## `fluent_community/disable_duplicate_comment_check`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the identical-comment guard is skipped for this submission.

By default a comment whose body exactly matches an earlier comment by the same user on the same post is rejected with "No duplicate comment please!". The check only runs when the comment has text, so image-only replies bypass it regardless. Return `true` to skip it — useful for short affirmations such as "thanks" in busy spaces.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$skipCheck` | `bool` | Whether to skip the duplicate check. `false` by default. |
| 2 | `$userId` | `int` | The commenting user's ID. |
| 3 | `$feedId` | `int` | The post being commented on. |

**Return:** `bool` — `true` to allow the duplicate through.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:127` | `false` (bool)<br>`get_current_user_id()` (int)<br>`$feed->id` (int) |

### Example

```php
add_filter('fluent_community/disable_duplicate_comment_check', function ($skipCheck, $userId, $feedId) {
    return $skipCheck;
}, 10, 3);
```

**Related:** [`fluent_community/rate_limit/comments_per_minute`](#fluent-community-rate-limit-comments-per-minute)

<a id="fluent-community-disable-self-comment-react"></a>

## `fluent_community/disable_self_comment_react`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether users are barred from reacting to their own comments.

The name reads as a switch that is on by default, but it is not: it defaults to `false`, meaning self-reacting is permitted. Return `true` to block it, at which point the API responds with an error. It applies to comment reactions only — reactions on the user's own posts are unaffected.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$disabled` | `bool` | Whether to reject the reaction. `false` by default, so self-reacting is allowed. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to, so the rule can be scoped per space. |

**Return:** `bool` — `true` to reject a reaction on the user's own comment.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:640` | `false` (bool)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/disable_self_comment_react', function ($disabled, $feed) {
    return $disabled;
}, 10, 2);
```

<a id="fluent-community-max-comment-char-length"></a>

## `fluent_community/max_comment_char_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the maximum number of characters allowed in a comment or reply.

Defaults to 10000 and, like the post limit, is measured with `strlen()` on the Markdown source, so it is a byte count. Exceeding it throws a 422 before the comment is stored. It applies to both new comments and edits, since both run through the same validation routine.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxLength` | `int` | The byte ceiling for a comment body, 10000 by default. |

**Return:** `int` — the maximum length.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:453` | `10000` (int) |

### Example

```php
add_filter('fluent_community/max_comment_char_length', function ($maxLength) {
    return $maxLength;
}, 10, 1);
```

**Related:** [`fluent_community/max_post_length`](/hooks/filters/feeds#fluent-community-max-post-length)

<a id="fluent-community-profile-comments-api-response"></a>

## `fluent_community/profile_comments_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the comment listing shown on a member profile.

Scoped to comments on plain `text` posts the viewer may access, newest first, and paginated. The payload carries the paginator plus the profile itself. The parent posts of the listed comments have already been run through `FeedsHelper::transformFeedsCollection()`, so they are hydrated in place on each comment's `post` relation.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `comments` paginator and `xprofile`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:718` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_comments_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/comments_api_response`](#fluent-community-comments-api-response)

<a id="fluent-community-rate-limit-comments-per-minute"></a>

## `fluent_community/rate_limit/comments_per_minute`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters how many comments a member may post in a rolling one-minute window.

Defaults to 5. The comparison is `count > limit` against comments created in the last 60 seconds, so the effective allowance is one more than the number returned — the default lets six through before the sixth attempt is refused. Site administrators are exempt before the filter is reached, and exceeding the limit throws rather than returning a structured error.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$limitPerMinute` | `int` | Comments allowed per rolling minute, 5 by default. |

**Return:** `int` — the limit. A very large value effectively disables comment rate limiting.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:50` | `5` (int) |

### Example

```php
add_filter('fluent_community/rate_limit/comments_per_minute', function ($limitPerMinute) {
    return $limitPerMinute;
}, 10, 1);
```

**Related:** [`fluent_community/disable_duplicate_comment_check`](#fluent-community-disable-duplicate-comment-check)

