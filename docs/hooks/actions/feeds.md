---
title: Feeds Actions
description: Feeds action hooks for FluentCommunity.
---

# Feeds Actions

20 unique action hooks currently map to this category, across 33 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/check_rate_limit/create_post`](#fluent-community-check-rate-limit-create-post) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:276` |
| [`fluent_community/feed_mentioned`](#fluent-community-feed-mentioned) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:386` |
| [`fluent_community/feed_mentioned_user_ids`](#fluent-community-feed-mentioned-user-ids) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:681` |
| [`fluent_community/feed/before_deleted`](#fluent-community-feed-before-deleted) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:841` |
| [`fluent_community/feed/created`](#fluent-community-feed-created) | Core <span class="edition-note">(also fired by Pro)</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:92` |
| [`fluent_community/feed/deleted`](#fluent-community-feed-deleted) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:844` |
| [`fluent_community/feed/just_created_type_{formContentType}`](#fluent-community-feed-just-created-type-formContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:390` |
| [`fluent_community/feed/new_feed_{feed}`](#fluent-community-feed-new-feed-feed) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:424` |
| [`fluent_community/feed/react_added`](#fluent-community-feed-react-added) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:568` |
| [`fluent_community/feed/react_removed`](#fluent-community-feed-react-removed) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:538` |
| [`fluent_community/feed/rescheduled`](#fluent-community-feed-rescheduled) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:131` |
| [`fluent_community/feed/scheduled`](#fluent-community-feed-scheduled) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:412` |
| [`fluent_community/feed/scheduling_everyone_tag`](#fluent-community-feed-scheduling-everyone-tag) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:727` |
| [`fluent_community/feed/updated`](#fluent-community-feed-updated) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:651` |
| [`fluent_community/feed/updating_content_type_old_{existingContentType}`](#fluent-community-feed-updating-content-type-old-existingContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:533` |
| [`fluent_community/feeds_query`](#fluent-community-feeds-query) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:117` |
| [`fluent_community/profile_feed/created`](#fluent-community-profile-feed-created) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:439` |
| [`fluent_community/space_feed/created`](#fluent-community-space-feed-created) | Core <span class="edition-note">(also fired by Pro)</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:95` |
| [`fluent_community/space_feed/email_notify_sub_query`](#fluent-community-space-feed-email-notify-sub-query) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:77` |
| [`fluent_community/space_feed/updated`](#fluent-community-space-feed-updated) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:653` |

<a id="fluent-community-check-rate-limit-create-post"></a>

## `fluent_community/check_rate_limit/create_post`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:276` | `$user` (User) |

### Example

```php
add_action('fluent_community/check_rate_limit/create_post', function ($user) {
}, 10, 1);
```

<a id="fluent-community-feed-mentioned"></a>

## `fluent_community/feed_mentioned`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:386` | `$feed` (Feed)<br>`Arr::get($mentions, 'users')` (array) |
| Core | `fluent-community/app/Services/FeedsHelper.php:520` | `$feed` (Feed)<br>`$mentions['users']` (array) |

### Example

```php
add_action('fluent_community/feed_mentioned', function ($feed, $mentions) {
}, 10, 2);
```

<a id="fluent-community-feed-mentioned-user-ids"></a>

## `fluent_community/feed_mentioned_user_ids`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:681` | `$feed` (Feed)<br>`$mentionedUserIds` (int[]) |

### Example

```php
add_action('fluent_community/feed_mentioned_user_ids', function ($feed, $mentionedUserIds) {
}, 10, 2);
```

<a id="fluent-community-feed-before-deleted"></a>

## `fluent_community/feed/before_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:841` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/before_deleted', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-feed-created"></a>

## `fluent_community/feed/created`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 5

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:92` | `$feed` (Feed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:213` | `$content` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:76` | `$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:434` | `$feed` (Feed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:532` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/created', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-feed-deleted"></a>

## `fluent_community/feed/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:844` | `$feed_id` (int) |

### Example

```php
add_action('fluent_community/feed/deleted', function ($feed_id) {
}, 10, 1);
```

<a id="fluent-community-feed-just-created-type-formContentType"></a>

## `fluent_community/feed/just_created_type_{formContentType}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:390` | `$feed` (Feed)<br>`$requestData` (array) |

### Example

```php
add_action('fluent_community/feed/just_created_type_{formContentType}', function ($feed, $requestData) {
}, 10, 2);
```

<a id="fluent-community-feed-new-feed-feed"></a>

## `fluent_community/feed/new_feed_{feed}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:424` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/new_feed_{feed}', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-feed-react-added"></a>

## `fluent_community/feed/react_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:568` | `$react` (mixed)<br>`$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:140` | `$react` (mixed)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/react_added', function ($react, $feed) {
}, 10, 2);
```

<a id="fluent-community-feed-react-removed"></a>

## `fluent_community/feed/react_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:538` | `$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:110` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/react_removed', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-feed-rescheduled"></a>

## `fluent_community/feed/rescheduled`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:131` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/rescheduled', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-feed-scheduled"></a>

## `fluent_community/feed/scheduled`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:412` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/scheduled', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-feed-scheduling-everyone-tag"></a>

## `fluent_community/feed/scheduling_everyone_tag`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:727` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/scheduling_everyone_tag', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-feed-updated"></a>

## `fluent_community/feed/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:651` | `$existingFeed` (Feed)<br>`$dirty` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:712` | `$feed` (Feed)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/feed/updated', function ($existingFeed, $dirty) {
}, 10, 2);
```

<a id="fluent-community-feed-updating-content-type-old-existingContentType"></a>

## `fluent_community/feed/updating_content_type_old_{existingContentType}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:533` | `$existingFeed` (Feed)<br>`$newContentType` (mixed)<br>`$requestData` (array) |

### Example

```php
add_action('fluent_community/feed/updating_content_type_old_{existingContentType}', function ($existingFeed, $newContentType, $requestData) {
}, 10, 3);
```

<a id="fluent-community-feeds-query"></a>

## `fluent_community/feeds_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:117` | `&$feedsQuery` (mixed)<br>`$request->all()` (array)<br>`$queryArgs` (mixed) |

### Example

```php
add_action('fluent_community/feeds_query', function (&$feedsQuery, $all, $queryArgs) {
}, 10, 3);
```

<a id="fluent-community-profile-feed-created"></a>

## `fluent_community/profile_feed/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:439` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/profile_feed/created', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-space-feed-created"></a>

## `fluent_community/space_feed/created`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 5

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:95` | `$feed` (Feed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:215` | `$content` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:79` | `$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:437` | `$feed` (Feed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:535` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/space_feed/created', function ($feed) {
}, 10, 1);
```

<a id="fluent-community-space-feed-email-notify-sub-query"></a>

## `fluent_community/space_feed/email_notify_sub_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:77` | `&$query` (mixed)<br>`$feed` (Feed)<br>`$space` (Space)<br>`$types` (mixed) |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:131` | `&$query` (mixed)<br>`$feed` (Feed)<br>`$space` (Space)<br>`$types` (mixed) |

### Example

```php
add_action('fluent_community/space_feed/email_notify_sub_query', function (&$query, $feed, $space, $types) {
}, 10, 4);
```

<a id="fluent-community-space-feed-updated"></a>

## `fluent_community/space_feed/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:653` | `$existingFeed` (Feed) |

### Example

```php
add_action('fluent_community/space_feed/updated', function ($existingFeed) {
}, 10, 1);
```

