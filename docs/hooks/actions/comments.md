---
title: Comments Actions
description: Comments action hooks for FluentCommunity.
---

# Comments Actions

19 unique action hooks currently map to this category, across 27 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/before_comment_create`](#fluent-community-before-comment-create) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:138` |
| [`fluent_community/before_comment_delete`](#fluent-community-before-comment-delete) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:595` |
| [`fluent_community/check_rate_limit/create_comment`](#fluent-community-check-rate-limit-create-comment) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:77` |
| [`fluent_community/comment_added`](#fluent-community-comment-added) | Core <span class="edition-note">(also fired by Pro)</span> | 2 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:211` |
| [`fluent_community/comment_added_{feed}`](#fluent-community-comment-added-feed) | Core <span class="edition-note">(also fired by Pro)</span> | 2 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:210` |
| [`fluent_community/comment_added_async`](#fluent-community-comment-added-async) | Core | 4 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:231` |
| [`fluent_community/comment_deleted`](#fluent-community-comment-deleted) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:608` |
| [`fluent_community/comment_deleted_{feed}`](#fluent-community-comment-deleted-feed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:607` |
| [`fluent_community/comment_updated`](#fluent-community-comment-updated) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:272` |
| [`fluent_community/comment_updated_{feed}`](#fluent-community-comment-updated-feed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:273` |
| [`fluent_community/comment/media_deleted`](#fluent-community-comment-media-deleted) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:266` |
| [`fluent_community/comment/new_comment_{comment}`](#fluent-community-comment-new-comment-comment) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:170` |
| [`fluent_community/comment/react_added`](#fluent-community-comment-react-added) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:653` |
| [`fluent_community/comment/react_removed`](#fluent-community-comment-react-removed) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:665` |
| [`fluent_community/comment/updated`](#fluent-community-comment-updated) | Core | 1 | `fluent-community/app/Http/Controllers/CommentsController.php:330` |
| [`fluent_community/notification/comment/notifed_to_author`](#fluent-community-notification-comment-notifed-to-author) | Core | 2 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:334` |
| [`fluent_community/notification/comment/notifed_to_mentions`](#fluent-community-notification-comment-notifed-to-mentions) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:556` |
| [`fluent_community/notification/comment/notifed_to_other_users`](#fluent-community-notification-comment-notifed-to-other-users) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:521` |
| [`fluent_community/notification/comment/notifed_to_thread_commetenter`](#fluent-community-notification-comment-notifed-to-thread-commetenter) | Core | 2 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:626` |

<a id="fluent-community-before-comment-create"></a>

## `fluent_community/before_comment_create`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:138` | `$commentData` (mixed)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/before_comment_create', function ($commentData, $feed) {
}, 10, 2);
```

<a id="fluent-community-before-comment-delete"></a>

## `fluent_community/before_comment_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:595` | `$comment` (Comment) |

### Example

```php
add_action('fluent_community/before_comment_delete', function ($comment) {
}, 10, 1);
```

<a id="fluent-community-check-rate-limit-create-comment"></a>

## `fluent_community/check_rate_limit/create_comment`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:77` | `$user` (User) |

### Example

```php
add_action('fluent_community/check_rate_limit/create_comment', function ($user) {
}, 10, 1);
```

<a id="fluent-community-comment-added"></a>

## `fluent_community/comment_added`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 2
- **When it fires:** Runs after a published comment or reply has been stored and its media attached.

Comments held for moderation never reach it — those fire `fluent_community/comment/new_comment_{status}` instead. A type-scoped twin, `fluent_community/comment_added_{feed->type}`, fires immediately before it, so listening to both double-handles the same comment. Note the third argument is only supplied by `CommentsController::store()`; the Pro moderation-approval path passes just two.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comment` | `\FluentCommunity\App\Models\Comment` | The stored comment, with relations loaded. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to. |
| 3 | `$mentionedUsers` | `array` | Mentioned user models parsed out of the comment body. Optional; absent on the moderation-approval path. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:211` | `$content` (mixed)<br>`$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:181` | `$comment` (Comment)<br>`$feed` (Feed)<br>`Arr::get($mentions, 'users', [])` (array) |

### Example

```php
add_action('fluent_community/comment_added', function ($comment, $feed, $mentionedUsers) {
}, 10, 3);
```

**Related:** [`fluent_community/comment_updated`](#fluent-community-comment-updated) · [`fluent_community/comment_deleted`](#fluent-community-comment-deleted)

<a id="fluent-community-comment-added-feed"></a>

## `fluent_community/comment_added_{feed}`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:210` | `$content` (mixed)<br>`$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:180` | `$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment_added_{feed}', function ($comment, $feed) {
}, 10, 2);
```

<a id="fluent-community-comment-added-async"></a>

## `fluent_community/comment_added_async`

- **Type:** action
- **Edition:** Core
- **Call sites:** 4

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:231` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:245` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:260` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:372` | No parameters |

### Example

```php
add_action('fluent_community/comment_added_async', function () {
}, 10, 0);
```

<a id="fluent-community-comment-deleted"></a>

## `fluent_community/comment_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs after a comment row has been deleted and the post's comment count recalculated.

The first argument is the comment ID, not a model — the row is already gone by the time the hook runs, so anything you need from the comment must be captured earlier via `fluent_community/before_comment_delete`. Attached media is announced beforehand through `fluent_community/comment/media_deleted`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$commentId` | `int` | ID of the deleted comment. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belonged to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:608` | `$commentId` (int)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment_deleted', function ($commentId, $feed) {
}, 10, 2);
```

**Related:** [`fluent_community/comment_added`](#fluent-community-comment-added)

<a id="fluent-community-comment-deleted-feed"></a>

## `fluent_community/comment_deleted_{feed}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:607` | `$commentId` (int)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment_deleted_{feed}', function ($commentId, $feed) {
}, 10, 2);
```

<a id="fluent-community-comment-updated"></a>

## `fluent_community/comment_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs after an edited comment is saved, provided the save changed something.

Guarded by a dirty check, so a no-op edit is silent. Media attached to the comment is reconciled first, and any media dropped by the edit is announced separately through `fluent_community/comment/media_deleted`. The type-scoped `fluent_community/comment_updated_{feed->type}` fires directly after this one.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comment` | `\FluentCommunity\App\Models\Comment` | The comment after saving, with relations loaded. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:272` | `$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment_updated', function ($comment, $feed) {
}, 10, 2);
```

**Related:** [`fluent_community/comment_added`](#fluent-community-comment-added)

<a id="fluent-community-comment-updated-feed"></a>

## `fluent_community/comment_updated_{feed}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:273` | `$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment_updated_{feed}', function ($comment, $feed) {
}, 10, 2);
```

<a id="fluent-community-comment-media-deleted"></a>

## `fluent_community/comment/media_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:266` | `$otherMedias` (mixed) |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:598` | `$comment->media` (Comment) |

### Example

```php
add_action('fluent_community/comment/media_deleted', function ($otherMedias) {
}, 10, 1);
```

<a id="fluent-community-comment-new-comment-comment"></a>

## `fluent_community/comment/new_comment_{comment}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:170` | `$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment/new_comment_{comment}', function ($comment, $feed) {
}, 10, 2);
```

<a id="fluent-community-comment-react-added"></a>

## `fluent_community/comment/react_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:653` | `$reaction` (mixed)<br>`$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment/react_added', function ($reaction, $comment, $feed) {
}, 10, 3);
```

<a id="fluent-community-comment-react-removed"></a>

## `fluent_community/comment/react_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:665` | `$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment/react_removed', function ($comment, $feed) {
}, 10, 2);
```

<a id="fluent-community-comment-updated"></a>

## `fluent_community/comment/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:330` | `$comment` (Comment)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/comment/updated', function ($comment, $dirty) {
}, 10, 2);
```

<a id="fluent-community-notification-comment-notifed-to-author"></a>

## `fluent_community/notification/comment/notifed_to_author`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:334` | `array (6 keys: user_ids, notification, key, …)` (array) |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:360` | `array (6 keys: user_ids, notification, comment, …)` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_author', function ($param1) {
}, 10, 1);
```

<a id="fluent-community-notification-comment-notifed-to-mentions"></a>

## `fluent_community/notification/comment/notifed_to_mentions`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:556` | `array (5 keys: user_ids, notification, key, …)` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_mentions', function ($param1) {
}, 10, 1);
```

<a id="fluent-community-notification-comment-notifed-to-other-users"></a>

## `fluent_community/notification/comment/notifed_to_other_users`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:521` | `array (5 keys: user_ids, key, notification, …)` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_other_users', function ($param1) {
}, 10, 1);
```

<a id="fluent-community-notification-comment-notifed-to-thread-commetenter"></a>

## `fluent_community/notification/comment/notifed_to_thread_commetenter`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:626` | `array (5 keys: user_ids, notification, key, …)` (array) |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:663` | `array (5 keys: user_ids, notification, key, …)` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_thread_commetenter', function ($param1) {
}, 10, 1);
```

