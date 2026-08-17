---
title: Comments Filters
description: Comments filter hooks for FluentCommunity.
---

# Comments Filters

13 unique filter hooks currently map to this category, across 13 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/comment_api_response`](#fluent-community-comment-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:734` |
| [`fluent_community/comment_order_options`](#fluent-community-comment-order-options) | Core | 1 | `fluent-community/app/Services/Helper.php:2273` |
| [`fluent_community/comment/comment_data`](#fluent-community-comment-comment-data) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:140` |
| [`fluent_community/comment/new_comment_response`](#fluent-community-comment-new-comment-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:177` |
| [`fluent_community/comment/patch_comment_response`](#fluent-community-comment-patch-comment-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:334` |
| [`fluent_community/comment/update_comment_data`](#fluent-community-comment-update-comment-data) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:225` |
| [`fluent_community/comments_api_response`](#fluent-community-comments-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:71` |
| [`fluent_community/comments_query_response`](#fluent-community-comments-query-response) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:52` |
| [`fluent_community/disable_duplicate_comment_check`](#fluent-community-disable-duplicate-comment-check) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:94` |
| [`fluent_community/disable_self_comment_react`](#fluent-community-disable-self-comment-react) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:633` |
| [`fluent_community/max_comment_char_length`](#fluent-community-max-comment-char-length) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:448` |
| [`fluent_community/profile_comments_api_response`](#fluent-community-profile-comments-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:713` |
| [`fluent_community/rate_limit/comments_per_minute`](#fluent-community-rate-limit-comments-per-minute) | Core | 1 | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:49` |

<a id="fluent-community-comment-api-response"></a>

## `fluent_community/comment_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:734` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/comment_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

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
| Core | `fluent-community/app/Services/Helper.php:2273` | `$options` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/comment_order_options', function ($options, $context) {
    return $options;
}, 10, 2);
```

**Related:** [`fluent_community/portal_vars`](#fluent-community-portal-vars)

<a id="fluent-community-comment-comment-data"></a>

## `fluent_community/comment/comment_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:140` | `$commentData` (mixed)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/comment/comment_data', function ($commentData, $feed) {
    return $commentData;
}, 10, 2);
```

<a id="fluent-community-comment-new-comment-response"></a>

## `fluent_community/comment/new_comment_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:177` | `$response` (mixed)<br>`$comment` (Comment) |

### Example

```php
add_filter('fluent_community/comment/new_comment_response', function ($response, $comment) {
    return $response;
}, 10, 2);
```

<a id="fluent-community-comment-patch-comment-response"></a>

## `fluent_community/comment/patch_comment_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:334` | `array (2 keys: comment, message)` (array)<br>`$comment` (Comment)<br>`$feed` (Feed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/comment/patch_comment_response', function ($param1, $comment, $feed, $all) {
    return $param1;
}, 10, 4);
```

<a id="fluent-community-comment-update-comment-data"></a>

## `fluent_community/comment/update_comment_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:225` | `$commentData` (mixed)<br>`$feed` (Feed)<br>`$requestData` (array)<br>`$comment` (Comment) |

### Example

```php
add_filter('fluent_community/comment/update_comment_data', function ($commentData, $feed, $requestData, $comment) {
    return $commentData;
}, 10, 4);
```

<a id="fluent-community-comments-api-response"></a>

## `fluent_community/comments_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:71` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/comments_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-comments-query-response"></a>

## `fluent_community/comments_query_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:52` | `$comments` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/comments_query_response', function ($comments, $all) {
    return $comments;
}, 10, 2);
```

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
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:94` | `false` (bool)<br>`get_current_user_id()` (int)<br>`$feed->id` (int) |

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
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:633` | `false` (bool)<br>`$feed` (Feed) |

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
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:448` | `10000` (int) |

### Example

```php
add_filter('fluent_community/max_comment_char_length', function ($maxLength) {
    return $maxLength;
}, 10, 1);
```

**Related:** [`fluent_community/max_post_length`](#fluent-community-max-post-length)

<a id="fluent-community-profile-comments-api-response"></a>

## `fluent_community/profile_comments_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:713` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_comments_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

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
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:49` | `5` (int) |

### Example

```php
add_filter('fluent_community/rate_limit/comments_per_minute', function ($limitPerMinute) {
    return $limitPerMinute;
}, 10, 1);
```

**Related:** [`fluent_community/disable_duplicate_comment_check`](#fluent-community-disable-duplicate-comment-check)

