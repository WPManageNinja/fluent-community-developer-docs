---
title: Comments Filters
description: Comments filter hooks for FluentCommunity.
---

# Comments Filters

14 unique filter hooks currently map to this category, across 14 call sites.

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
| [`fluent_community/seo/ld_comment_limit`](#fluent-community-seo-ld-comment-limit) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:471` |

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
add_filter('fluent_community/comment/patch_comment_response', function ($comment, $comment_2, $feed, $all) {
    return $comment;
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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:94` | `false` (bool)<br>`get_current_user_id()` (int)<br>`$feed->id` (int) |

### Example

```php
add_filter('fluent_community/disable_duplicate_comment_check', function ($param1, $param2, $id) {
    return $param1;
}, 10, 3);
```

<a id="fluent-community-disable-self-comment-react"></a>

## `fluent_community/disable_self_comment_react`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:633` | `false` (bool)<br>`$feed` (Feed) |

### Example

```php
add_filter('fluent_community/disable_self_comment_react', function ($param1, $feed) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-max-comment-char-length"></a>

## `fluent_community/max_comment_char_length`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:448` | `10000` (int) |

### Example

```php
add_filter('fluent_community/max_comment_char_length', function ($param1) {
    return $param1;
}, 10, 1);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/RateLimitHandler.php:49` | `5` (int) |

### Example

```php
add_filter('fluent_community/rate_limit/comments_per_minute', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-seo-ld-comment-limit"></a>

## `fluent_community/seo/ld_comment_limit`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:471` | `100` (int) |

### Example

```php
add_filter('fluent_community/seo/ld_comment_limit', function ($param1) {
    return $param1;
}, 10, 1);
```

