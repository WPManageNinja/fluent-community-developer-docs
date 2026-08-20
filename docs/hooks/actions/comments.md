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
- **When it fires:** Fires with the prepared comment attributes just before the row is inserted.

Read-only: the attributes are passed by value, so mutating them changes nothing. The filter that runs on the very next line, `fluent_community/comment/comment_data`, is the one that can alter them. Everything is already resolved at this point — rendered HTML, media, `parent_id` for replies, `is_admin`, and `meta.mentioned_user_ids` — which makes this a convenient point for validation logging or for throwing to abort the request.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$commentData` | `array` | The attributes the comment will be created with. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post being commented on. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:138` | `$commentData` (mixed)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/before_comment_create', function ($commentData, $feed) {
}, 10, 2);
```

**Related:** [`fluent_community/comment/comment_data`](/hooks/filters/comments#fluent-community-comment-comment-data) · [`fluent_community/comment_added`](#fluent-community-comment-added)

<a id="fluent-community-before-comment-delete"></a>

## `fluent_community/before_comment_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs immediately before a comment row is deleted, while it and its relations are still readable.

The only place to capture a comment before it disappears — `fluent_community/comment_deleted` receives just the ID. Attached media is announced separately through `fluent_community/comment/media_deleted` right after this hook, and the post's comment count is recalculated after the delete, so the count on `$comment->post` is still the pre-delete value here.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comment` | `\FluentCommunity\App\Models\Comment` | The comment about to be deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:595` | `$comment` (Comment) |

### Example

```php
add_action('fluent_community/before_comment_delete', function ($comment) {
}, 10, 1);
```

**Related:** [`fluent_community/comment_deleted`](#fluent-community-comment-deleted) · [`fluent_community/comment/media_deleted`](#fluent-community-comment-media-deleted)

<a id="fluent-community-check-rate-limit-create-comment"></a>

## `fluent_community/check_rate_limit/create_comment`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs at the top of the create-comment endpoint so rate limiters can abort the request.

Core attaches `RateLimitHandler::maybeLimitComment()`, which throws once the member has exceeded `fluent_community/rate_limit/comments_per_minute` within the last 60 seconds. It fires before the comment text is validated and before the target post is even loaded, so the user is all you get. Throw to refuse; there is no return value.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$user` | `\FluentCommunity\App\Models\User` | The authenticated commenter. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:77` | `$user` (User) |

### Example

```php
add_action('fluent_community/check_rate_limit/create_comment', function ($user) {
}, 10, 1);
```

**Related:** [`fluent_community/rate_limit/comments_per_minute`](/hooks/filters/comments#fluent-community-rate-limit-comments-per-minute) · [`fluent_community/check_rate_limit/create_post`](/hooks/actions/feeds#fluent-community-check-rate-limit-create-post)

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
- **When it fires:** Post-type-scoped twin of `fluent_community/comment_added`, suffixed with the parent post's type.

The suffix is `$feed->type`, so the live names are `fluent_community/comment_added_text` for ordinary posts and `fluent_community/comment_added_document` for course lessons. It fires immediately before the generic `fluent_community/comment_added`, so listening to both double-handles the same comment. Pro fires it a second time from the moderation-approval path when a held comment is published.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comment` | `\FluentCommunity\App\Models\Comment` | The stored comment, with relations loaded. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post or lesson the comment belongs to. |

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

**Related:** [`fluent_community/comment_added`](#fluent-community-comment-added)

<a id="fluent-community-comment-added-async"></a>

## `fluent_community/comment_added_async`

- **Type:** action
- **Edition:** Core
- **Call sites:** 4
- **When it fires:** Action Scheduler task that sends the comment notification emails for one comment.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Queued for immediate execution from `EmailNotificationHandler::handleNewCommentEvent()` whenever the comment mentions somebody, the post author wants comment mail, or a thread participant wants reply mail. The handler re-queues this same action when it approaches its run-time budget, passing the last notified user ID as the cursor, so it fires repeatedly for a busy thread.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$commentId` | `int` | ID of the comment to notify about. |
| 2 | `$lastUserId` | `int` | Highest recipient ID already mailed; 0 on the first batch. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:231` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:245` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:260` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:372` | No parameters |

### Example

```php
add_action('fluent_community/comment_added_async', function ($commentId, $lastUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/comment_added`](#fluent-community-comment-added) · [`fluent_community/email_notify_new_posts`](/hooks/actions/feeds#fluent-community-email-notify-new-posts)

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
- **When it fires:** Post-type-scoped twin of `fluent_community/comment_deleted`.

Suffixed with `$feed->type`, and fired immediately before the generic hook, so both run for every deletion. As with the generic hook the first argument is an ID, not a model — the row is already gone. The post's `comments_count` has been recounted and saved without bumping `updated_at`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$commentId` | `int` | ID of the deleted comment. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belonged to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:607` | `$commentId` (int)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment_deleted_{feed}', function ($commentId, $feed) {
}, 10, 2);
```

**Related:** [`fluent_community/comment_deleted`](#fluent-community-comment-deleted) · [`fluent_community/before_comment_delete`](#fluent-community-before-comment-delete)

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
- **When it fires:** Post-type-scoped twin of `fluent_community/comment_updated`.

Suffixed with `$feed->type` and fired immediately after the generic hook, under the same dirty-check guard — an edit that changed nothing fires neither. Media dropped by the edit has already been announced through `fluent_community/comment/media_deleted`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comment` | `\FluentCommunity\App\Models\Comment` | The comment after saving, with relations loaded. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:273` | `$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment_updated_{feed}', function ($comment, $feed) {
}, 10, 2);
```

**Related:** [`fluent_community/comment_updated`](#fluent-community-comment-updated)

<a id="fluent-community-comment-media-deleted"></a>

## `fluent_community/comment/media_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Signals that media attached to a comment should be detached and cleaned up.

A request to clean up rather than a report that a delete happened: core's `CleanupHandler::queueMediaDelete()` is what removes local files and deactivates remote ones. Two call sites, and they pass different things — editing a comment passes only the media rows the edit dropped, whereas deleting a comment passes the whole `media` relation. It is not fired at all when an edit drops no media.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$media` | `\FluentCommunity\Framework\Database\Orm\Collection` | The `Media` rows to clean up. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:266` | `$otherMedias` (mixed) |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:598` | `$comment->media` (Comment) |

### Example

```php
add_action('fluent_community/comment/media_deleted', function ($media) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/media_deleted`](/hooks/actions/media#fluent-community-feed-media-deleted) · [`fluent_community/handle_remove_bulk_media`](/hooks/filters/media#fluent-community-handle-remove-bulk-media)

<a id="fluent-community-comment-new-comment-comment"></a>

## `fluent_community/comment/new_comment_{comment}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Status-scoped action for a comment that was not published, where the suffix is the comment status.

In practice the live name is `fluent_community/comment/new_comment_pending`, fired when moderation holds a comment back; Pro listens there to attach the flag record. A held comment fires neither `fluent_community/comment_added` nor its type-scoped twin, so if you are counting comments you must handle this branch as well.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comment` | `\FluentCommunity\App\Models\Comment` | The stored comment, in its non-published status. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:170` | `$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment/new_comment_{comment}', function ($comment, $feed) {
}, 10, 2);
```

**Related:** [`fluent_community/comment_added`](#fluent-community-comment-added) · [`fluent_community/comment/new_comment_response`](/hooks/filters/comments#fluent-community-comment-new-comment-response)

<a id="fluent-community-comment-react-added"></a>

## `fluent_community/comment/react_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when a member likes a comment.

Guarded by `wasRecentlyCreated`, so re-sending the same like is a no-op that does not fire again. The comment's incremented `reactions_count` is already saved. Comment reactions have no type dimension — unlike post reactions there is no bookmark variant. Core uses it to raise the reply-liked notification.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$reaction` | `\FluentCommunity\App\Models\Reaction` | The stored reaction row. |
| 2 | `$comment` | `\FluentCommunity\App\Models\Comment` | The comment that was liked. |
| 3 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:653` | `$reaction` (mixed)<br>`$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment/react_added', function ($reaction, $comment, $feed) {
}, 10, 3);
```

**Related:** [`fluent_community/comment/react_removed`](#fluent-community-comment-react-removed) · [`fluent_community/feed/react_added`](/hooks/actions/feeds#fluent-community-feed-react-added)

<a id="fluent-community-comment-react-removed"></a>

## `fluent_community/comment/react_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when a member withdraws a like from a comment.

Only fires when a row was actually deleted, so a stray un-like is silent. The reaction is gone by then, and unlike the add side no reaction model is passed, so the acting user is not available from the arguments.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comment` | `\FluentCommunity\App\Models\Comment` | The comment, with the decremented count already saved. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post the comment belongs to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:665` | `$comment` (Comment)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/comment/react_removed', function ($comment, $feed) {
}, 10, 2);
```

**Related:** [`fluent_community/comment/react_added`](#fluent-community-comment-react-added)

<a id="fluent-community-comment-updated"></a>

## `fluent_community/comment/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a comment is changed through the moderator patch endpoint.

A different event from `fluent_community/comment_updated`, which covers author edits to the body. This one only ever runs for the pin toggle: the patch endpoint accepts `is_sticky` alone, requires moderator or admin rights, and refuses to pin a reply. Pinning a comment un-pins every other comment on the post first, and those bulk un-pins do not fire the hook.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$comment` | `\FluentCommunity\App\Models\Comment` | The comment after saving. |
| 2 | `$dirty` | `array` | The changed attributes as returned by `getDirty()`; in practice just `is_sticky`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:330` | `$comment` (Comment)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/comment/updated', function ($comment, $dirty) {
}, 10, 2);
```

**Related:** [`fluent_community/comment_updated`](#fluent-community-comment-updated) · [`fluent_community/comment/patch_comment_response`](/hooks/filters/comments#fluent-community-comment-patch-comment-response)

<a id="fluent-community-notification-comment-notifed-to-author"></a>

## `fluent_community/notification/comment/notifed_to_author`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires after the post author has been notified about a new comment.

Takes a single associative array rather than positional arguments — the shape is shared by all four `notification/comment/*` hooks, and `key` repeats the hook name so one callback can serve several. Skipped when the commenter is the author, and skipped when the author was @-mentioned, in which case `fluent_community/notification/comment/notifed_to_mentions` covers them instead. `created` distinguishes a new notification row from an existing one that was updated and marked unread again. The bundled push notification module listens here.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$eventData` | `array` | Keys: `user_ids`, `notification` (a `Notification` model), `key`, `comment`, `feed`, `created`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:334` | `array (6 keys: user_ids, notification, key, …)` (array) |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:360` | `array (6 keys: user_ids, notification, comment, …)` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_author', function ($eventData) {
}, 10, 1);
```

**Related:** [`fluent_community/notification/comment/notifed_to_mentions`](#fluent-community-notification-comment-notifed-to-mentions) · [`fluent_community/notification/comment/notifed_to_thread_commetenter`](#fluent-community-notification-comment-notifed-to-thread-commetenter)

<a id="fluent-community-notification-comment-notifed-to-mentions"></a>

## `fluent_community/notification/comment/notifed_to_mentions`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after the users @-mentioned in a comment have been notified.

Runs for both top-level comments and replies, and always creates a fresh notification rather than updating an existing one, so there is no `created` key in the payload. It runs before the author and thread notifications, and mentioned users are then subtracted from those recipient lists, so a mentioned reader gets exactly one notification.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$eventData` | `array` | Keys: `user_ids`, `notification` (a `Notification` model), `key`, `comment`, `feed`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:556` | `array (5 keys: user_ids, notification, key, …)` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_mentions', function ($eventData) {
}, 10, 1);
```

**Related:** [`fluent_community/notification/comment/notifed_to_author`](#fluent-community-notification-comment-notifed-to-author)

<a id="fluent-community-notification-comment-notifed-to-other-users"></a>

## `fluent_community/notification/comment/notifed_to_other_users`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after other participants on a post have been notified about a new top-level comment.

The odd one out of the four. Its `notification` value is the raw attribute array used as a template, not a `Notification` model — a separate row is created per recipient — so code that reads `$notification->content` will fatal here. It only runs for top-level comments, never replies, and the bundled push notification module deliberately leaves it unsubscribed. `user_ids` merges freshly notified users with subscribers of pre-existing notifications that were refreshed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$eventData` | `array` | Keys: `user_ids`, `key`, `notification` (a plain attribute array, not a model), `comment`, `feed`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:521` | `array (5 keys: user_ids, key, notification, …)` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_other_users', function ($eventData) {
}, 10, 1);
```

**Related:** [`fluent_community/notification/comment/notifed_to_author`](#fluent-community-notification-comment-notifed-to-author)

<a id="fluent-community-notification-comment-notifed-to-thread-commetenter"></a>

## `fluent_community/notification/comment/notifed_to_thread_commetenter`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires after participants in a reply thread have been notified of a new reply.

Note the misspelling in the hook name; it is part of the public surface and is documented as written. Only reached for replies, that is comments with a `parent_id`. Two call sites: one updates an existing `child_comment_added` notification and re-marks it unread, the other creates a new one. Neither passes a `created` key, so compare `$notification->wasRecentlyCreated` if you need to tell them apart.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$eventData` | `array` | Keys: `user_ids`, `notification` (a `Notification` model), `key`, `comment`, `feed`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:626` | `array (5 keys: user_ids, notification, key, …)` (array) |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:663` | `array (5 keys: user_ids, notification, key, …)` (array) |

### Example

```php
add_action('fluent_community/notification/comment/notifed_to_thread_commetenter', function ($eventData) {
}, 10, 1);
```

**Related:** [`fluent_community/notification/comment/notifed_to_author`](#fluent-community-notification-comment-notifed-to-author)

