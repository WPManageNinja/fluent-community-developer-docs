---
title: Comments Actions
description: Comments action hooks for FluentCommunity.
---

# Comments Actions

14 unique action hooks currently map to this category, across 18 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/before_comment_create`](#fluent_communitybefore_comment_create) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:126` |
| [`fluent_community/before_comment_delete`](#fluent_communitybefore_comment_delete) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:564` |
| [`fluent_community/check_rate_limit/create_comment`](#fluent_communitycheck_rate_limitcreate_comment) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:68` |
| [`fluent_community/comment_added`](#fluent_communitycomment_added) | Core + <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:198` |
| [`fluent_community/comment_deleted`](#fluent_communitycomment_deleted) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:577` |
| [`fluent_community/comment_updated`](#fluent_communitycomment_updated) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:252` |
| [`fluent_community/comment/media_deleted`](#fluent_communitycommentmedia_deleted) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:246` |
| [`fluent_community/comment/new_comment_{comment}`](#fluent_communitycommentnew_comment_comment) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:158` |
| [`fluent_community/comment/react_added`](#fluent_communitycommentreact_added) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:622` |
| [`fluent_community/comment/react_removed`](#fluent_communitycommentreact_removed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:634` |
| [`fluent_community/comment/updated`](#fluent_communitycommentupdated) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:304` |
| [`fluent_community/notification/comment/notifed_to_author`](#fluent_communitynotificationcommentnotifed_to_author) | Core | 2 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:273` |
| [`fluent_community/notification/comment/notifed_to_mentions`](#fluent_communitynotificationcommentnotifed_to_mentions) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:415` |
| [`fluent_community/notification/comment/notifed_to_thread_commetenter`](#fluent_communitynotificationcommentnotifed_to_thread_commetenter) | Core | 2 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:543` |

<a id="fluent_communitybefore_comment_create"></a>

## `fluent_community/before_comment_create`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Before Comment Create hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:126` | `$commentData` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/before_comment_create', function ($commentData, $feed) {
}, 10, 2);
```

<a id="fluent_communitybefore_comment_delete"></a>

## `fluent_community/before_comment_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Before Comment Delete hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:564` | `$comment` (Comment|mixed) |

### Example

```php
add_action('fluent_community/before_comment_delete', function ($comment) {
}, 10, 1);
```

<a id="fluent_communitycheck_rate_limitcreate_comment"></a>

## `fluent_community/check_rate_limit/create_comment`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Check Rate Limit/Create Comment hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:68` | `$user` (mixed) |

### Example

```php
add_action('fluent_community/check_rate_limit/create_comment', function ($user) {
}, 10, 1);
```

<a id="fluent_communitycomment_added"></a>

## `fluent_community/comment_added`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Comment Added hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:198` | `$content` (mixed)<br>`$feed` (Feed|mixed) |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:168` | `$comment` (Comment|mixed)<br>`$feed` (Feed|mixed)<br>`Arr::get($mentions, 'users', [])` (array) |

### Example

```php
add_action('fluent_community/comment_added', function ($content, $feed) {
}, 10, 2);
```

<a id="fluent_communitycomment_deleted"></a>

## `fluent_community/comment_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Comment Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:577` | `$commentId` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/comment_deleted', function ($commentId, $feed) {
}, 10, 2);
```

<a id="fluent_communitycomment_updated"></a>

## `fluent_community/comment_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Comment Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:252` | `$comment` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/comment_updated', function ($comment, $feed) {
}, 10, 2);
```

<a id="fluent_communitycommentmedia_deleted"></a>

## `fluent_community/comment/media_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Comment/Media Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:246` | `$otherMedias` (mixed) |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:567` | `$comment->media` (Comment|mixed) |

### Example

```php
add_action('fluent_community/comment/media_deleted', function ($otherMedias) {
}, 10, 1);
```

<a id="fluent_communitycommentnew_comment_comment"></a>

## `fluent_community/comment/new_comment_{comment}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Comment/New Comment {Comment} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:158` | `$comment` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/comment/new_comment_{comment}', function ($comment, $feed) {
}, 10, 2);
```

<a id="fluent_communitycommentreact_added"></a>

## `fluent_community/comment/react_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Comment/React Added hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:622` | `$reaction` (mixed)<br>`$comment` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/comment/react_added', function ($reaction, $comment, $feed) {
}, 10, 3);
```

<a id="fluent_communitycommentreact_removed"></a>

## `fluent_community/comment/react_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Comment/React Removed hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:634` | `$comment` (Comment|mixed)<br>`$feed` (Feed|mixed) |

### Example

```php
add_action('fluent_community/comment/react_removed', function ($comment, $feed) {
}, 10, 2);
```

<a id="fluent_communitycommentupdated"></a>

## `fluent_community/comment/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Comment/Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:304` | `$comment` (Comment|mixed)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/comment/updated', function ($comment, $dirty) {
}, 10, 2);
```

<a id="fluent_communitynotificationcommentnotifed_to_author"></a>

## `fluent_community/notification/comment/notifed_to_author`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Notification/Comment/Notifed To Author hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:273` | `[ 'user_ids' => [$feed->user_id], 'notification' => $exist, 'key' => 'notifed_to_author', 'comment' => $comment, 'feed' => $feed, 'created' => false ]` (array) |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:299` | `[ 'user_ids' => [$feed->user_id], 'notification' => $notification, 'comment' => $comment, 'key' => 'notifed_to_author', 'feed' => $feed, 'created' => true ]` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_author', function ($user_id) {
}, 10, 1);
```

<a id="fluent_communitynotificationcommentnotifed_to_mentions"></a>

## `fluent_community/notification/comment/notifed_to_mentions`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Notification/Comment/Notifed To Mentions hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:415` | `[ 'user_ids' => $mentionedUserIds, 'notification' => $mentionNotification, 'key' => 'notifed_to_mentions', 'comment' => $comment, 'feed' => $feed ]` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_mentions', function ($mentionedUserIds) {
}, 10, 1);
```

<a id="fluent_communitynotificationcommentnotifed_to_thread_commetenter"></a>

## `fluent_community/notification/comment/notifed_to_thread_commetenter`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Notification/Comment/Notifed To Thread Commetenter hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:543` | `[ 'user_ids' => $childCommentUserIds, 'notification' => $existingNotification, 'key' => 'notifed_to_thread_commetenter', 'comment' => $comment, 'feed' => $feed ]` (array) |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:580` | `[ 'user_ids' => $childCommentUserIds, 'notification' => $notification, 'key' => 'notifed_to_thread_commetenter', 'comment' => $comment, 'feed' => $feed ]` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_thread_commetenter', function ($childCommentUserIds) {
}, 10, 1);
```

