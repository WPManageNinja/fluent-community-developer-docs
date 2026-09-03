---
title: Feeds Actions
description: Feeds action hooks for FluentCommunity.
---

# Feeds Actions

23 unique action hooks currently map to this category, across 39 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/check_rate_limit/create_post`](#fluent-community-check-rate-limit-create-post) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:277` |
| [`fluent_community/email_notify_new_posts`](#fluent-community-email-notify-new-posts) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:84` |
| [`fluent_community/feed_mentioned`](#fluent-community-feed-mentioned) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:401` |
| [`fluent_community/feed_mentioned_user_ids`](#fluent-community-feed-mentioned-user-ids) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:681` |
| [`fluent_community/feed/before_deleted`](#fluent-community-feed-before-deleted) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:872` |
| [`fluent_community/feed/created`](#fluent-community-feed-created) | Core <span class="edition-note">(also fired by Pro)</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:92` |
| [`fluent_community/feed/deleted`](#fluent-community-feed-deleted) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:875` |
| [`fluent_community/feed/just_created_type_{formContentType}`](#fluent-community-feed-just-created-type-formContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:405` |
| [`fluent_community/feed/new_feed_{feed}`](#fluent-community-feed-new-feed-feed) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:439` |
| [`fluent_community/feed/react_added`](#fluent-community-feed-react-added) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:573` |
| [`fluent_community/feed/react_removed`](#fluent-community-feed-react-removed) | Core | 2 | `fluent-community/app/Http/Controllers/CommentsController.php:543` |
| [`fluent_community/feed/rescheduled`](#fluent-community-feed-rescheduled) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:148` |
| [`fluent_community/feed/scheduled`](#fluent-community-feed-scheduled) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:427` |
| [`fluent_community/feed/scheduled_publish`](#fluent-community-feed-scheduled-publish) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:44` |
| [`fluent_community/feed/scheduling_everyone_tag`](#fluent-community-feed-scheduling-everyone-tag) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:727` |
| [`fluent_community/feed/updated`](#fluent-community-feed-updated) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:672` |
| [`fluent_community/feed/updating_content_type_old_{existingContentType}`](#fluent-community-feed-updating-content-type-old-existingContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:548` |
| [`fluent_community/feeds_query`](#fluent-community-feeds-query) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:118` |
| [`fluent_community/notify_profile_feed_new_post`](#fluent-community-notify-profile-feed-new-post) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/FollowHandler.php:191` |
| [`fluent_community/profile_feed/created`](#fluent-community-profile-feed-created) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:454` |
| [`fluent_community/space_feed/created`](#fluent-community-space-feed-created) | Core <span class="edition-note">(also fired by Pro)</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:95` |
| [`fluent_community/space_feed/email_notify_sub_query`](#fluent-community-space-feed-email-notify-sub-query) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:77` |
| [`fluent_community/space_feed/updated`](#fluent-community-space-feed-updated) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:674` |

<a id="fluent-community-check-rate-limit-create-post"></a>

## `fluent_community/check_rate_limit/create_post`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs at the very top of the create-post endpoint so rate limiters can abort the request.

Core attaches `RateLimitHandler::maybeLimitPost()`, which throws when the author has created more posts than `fluent_community/rate_limit/posts_per_5_minutes` allows in the last five minutes. Throwing is the intended way to refuse a post from here — there is no return value, and the controller has not yet validated or sanitised anything, so the only thing you can reliably inspect is the user. Site administrators are exempted inside core's callback, not before the hook.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$user` | `\FluentCommunity\App\Models\User` | The authenticated author. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:277` | `$user` (User) |

### Example

```php
add_action('fluent_community/check_rate_limit/create_post', function ($user) {
}, 10, 1);
```

**Related:** [`fluent_community/rate_limit/posts_per_5_minutes`](/hooks/filters/feeds#fluent-community-rate-limit-posts-per-5-minutes) · [`fluent_community/check_rate_limit/create_comment`](/hooks/actions/comments#fluent-community-check-rate-limit-create-comment)

<a id="fluent-community-email-notify-new-posts"></a>

## `fluent_community/email_notify_new_posts`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Action Scheduler task that emails a space's subscribers about one newly published post.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Scheduled two minutes after a space post is published, and only when the space actually has mail subscribers or the post mentions somebody. The handler walks recipients 60 at a time and re-schedules this same action when it runs out of time budget, tracking its position in the post's `_last_email_user_id` custom meta — so it fires repeatedly for one post. The single argument is the post ID, although the handler also accepts a `Feed` model because it calls itself recursively.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feedId` | `int` | ID of the post to notify about. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:84` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:217` | No parameters |

### Example

```php
add_action('fluent_community/email_notify_new_posts', function ($feedId) {
}, 10, 1);
```

**Related:** [`fluent_community/space_feed/created`](#fluent-community-space-feed-created) · [`fluent_community/email_notify_users_everyone_tag`](/hooks/actions/notifications#fluent-community-email-notify-users-everyone-tag)

<a id="fluent-community-feed-mentioned"></a>

## `fluent_community/feed_mentioned`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires when a newly created post contains @-mentions, carrying the mentioned user models.

Fired from `FeedsController::store()` and from `FeedsHelper::createFeed()`, in both cases immediately after the post row is saved and before its media is attached — so `$feed->media` is not populated yet. It fires regardless of the resulting status, including for posts held as `pending` or `scheduled`. Editing a post to add a mention does not fire it. For the notification-side event, which passes IDs rather than models and only runs for published posts, use `fluent_community/feed_mentioned_user_ids`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The freshly saved post. |
| 2 | `$users` | `array` | The mentioned `User` models resolved from the message body. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:401` | `$feed` (Feed)<br>`Arr::get($mentions, 'users')` (array) |
| Core | `fluent-community/app/Services/FeedsHelper.php:540` | `$feed` (Feed)<br>`$mentions['users']` (array) |

### Example

```php
add_action('fluent_community/feed_mentioned', function ($feed, $users) {
}, 10, 2);
```

**Related:** [`fluent_community/feed_mentioned_user_ids`](#fluent-community-feed-mentioned-user-ids) · [`fluent_community/feed/created`](#fluent-community-feed-created)

<a id="fluent-community-feed-mentioned-user-ids"></a>

## `fluent_community/feed_mentioned_user_ids`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires while mention notifications are being built for a published post.

Hangs off `fluent_community/feed/created`, so unlike `fluent_community/feed_mentioned` it only sees posts that reached a published state. It runs before the mention notification row is created, and the IDs come from the post's `meta.mentioned_user_ids`, which means they are the IDs recorded at save time rather than a fresh parse of the body.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The published post. |
| 2 | `$mentionedUserIds` | `array` | WordPress user IDs read from `meta.mentioned_user_ids`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:681` | `$feed` (Feed)<br>`$mentionedUserIds` (int[]) |

### Example

```php
add_action('fluent_community/feed_mentioned_user_ids', function ($feed, $mentionedUserIds) {
}, 10, 2);
```

**Related:** [`fluent_community/feed_mentioned`](#fluent-community-feed-mentioned)

<a id="fluent-community-feed-before-deleted"></a>

## `fluent_community/feed/before_deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs immediately before a post row is deleted, while its relations are still readable.

This is the last point at which comments, reactions, activities, media and notifications attached to the post can still be queried — core's `CleanupHandler` uses exactly that window to cascade the deletes. Once the post is gone, `fluent_community/feed/deleted` fires with only the integer ID.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post about to be deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:872` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/before_deleted', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/media_deleted`](/hooks/actions/media#fluent-community-feed-media-deleted)

<a id="fluent-community-feed-created"></a>

## `fluent_community/feed/created`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 5
- **When it fires:** Runs after a post has been saved and published, once its media and mentions are attached.

Fired from `FeedsHelper::createFeed()` and from `FeedsController::createFeed()`, and again from Pro when a scheduled post goes live or a moderator approves a held post — so a single post can reach this hook through more than one path, but only once per publication. Posts that end up `scheduled`, `pending` or any other non-published status skip it entirely; those fire `fluent_community/feed/scheduled` or `fluent_community/feed/new_feed_{status}` instead. Core uses it to write the activity row and to dispatch mention notifications.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The saved post, with media rows already linked. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:92` | `$feed` (Feed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:213` | `$content` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:93` | `$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:449` | `$feed` (Feed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:552` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/created', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/space_feed/created`](#fluent-community-space-feed-created) · [`fluent_community/feed/updated`](#fluent-community-feed-updated) · [`fluent_community/feed/before_deleted`](#fluent-community-feed-before-deleted)

<a id="fluent-community-feed-deleted"></a>

## `fluent_community/feed/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Runs after a post row has been deleted, with only its ID.

The model is gone by this point, so capture anything you need from `fluent_community/feed/before_deleted` instead. Pro uses it to drop moderation reports filed against the post. Deleting a space, which removes its posts in bulk, does not route through the controller and therefore does not fire this hook per post.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feedId` | `int` | ID of the deleted post. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:875` | `$feed_id` (int) |

### Example

```php
add_action('fluent_community/feed/deleted', function ($feedId) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/before_deleted`](#fluent-community-feed-before-deleted)

<a id="fluent-community-feed-just-created-type-formContentType"></a>

## `fluent_community/feed/just_created_type_{formContentType}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Content-type-scoped action fired right after a post of that type is saved.

The suffix is the `content_type` value submitted with the request, so the live names are `fluent_community/feed/just_created_type_document` and `..._survey`. It fires only when the request carried a non-empty `content_type`, straight after `fluent_community/feed_mentioned` and before media is attached, and before any status branching — a post held for moderation reaches it too. Pro's Document Library uses it to bind uploaded documents to the new post.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The freshly saved post. |
| 2 | `$requestData` | `array` | The raw request payload, including the type-specific fields. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:405` | `$feed` (Feed)<br>`$requestData` (array) |

### Example

```php
add_action('fluent_community/feed/just_created_type_{formContentType}', function ($feed, $requestData) {
}, 10, 2);
```

**Related:** [`fluent_community/feed/new_feed_data_type_{formContentType}`](/hooks/filters/feeds#fluent-community-feed-new-feed-data-type-formContentType) · [`fluent_community/feed/updating_content_type_old_{existingContentType}`](#fluent-community-feed-updating-content-type-old-existingContentType)

<a id="fluent-community-feed-new-feed-feed"></a>

## `fluent_community/feed/new_feed_{feed}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Status-scoped action for a new post that did not go live, where the suffix is the post status.

The real names are `fluent_community/feed/new_feed_pending`, `..._draft` and so on. It is reached only when the saved status is neither `published` nor `unlisted`, and never for `scheduled`, which is intercepted earlier by `fluent_community/feed/scheduled`. In practice `pending` is the live case: Pro's moderation handler listens on it to attach the flag record to a held post. Posts that go live fire `fluent_community/feed/created` instead.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The saved post, in its non-published status. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:439` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/new_feed_{feed}', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/created`](#fluent-community-feed-created) · [`fluent_community/feed/scheduled`](#fluent-community-feed-scheduled)

<a id="fluent-community-feed-react-added"></a>

## `fluent_community/feed/react_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires when a like is stored against a post.

Only likes reach it — bookmarks are stored through the same endpoint but skip the counter update and the hook. There are two identical call sites, `ReactionController::addOrRemovePostReact()` and `CommentsController::addOrRemovePostReact()`, because the two REST routes `POST /feeds/{id}/react` and `POST /feeds/{id}/reactions/toggle` are served by duplicated implementations; a given request fires it once. The reaction's `xprofile` relation is eager-loaded before the hook runs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$react` | `\FluentCommunity\App\Models\Reaction` | The stored reaction row, with `xprofile` loaded. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post that was liked, with the incremented count already saved. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:573` | `$react` (mixed)<br>`$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:163` | `$react` (mixed)<br>`$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/react_added', function ($react, $feed) {
}, 10, 2);
```

**Related:** [`fluent_community/feed/react_removed`](#fluent-community-feed-react-removed) · [`fluent_community/comment/react_added`](/hooks/actions/comments#fluent-community-comment-react-added)

<a id="fluent-community-feed-react-removed"></a>

## `fluent_community/feed/react_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires when a like is withdrawn from a post.

Passes the post only — the reaction row is already deleted, so there is no way to tell from here which user un-liked it. As with the add side, bookmarks do not fire it, and the same duplicated code exists in both `ReactionController` and `CommentsController`. The decremented `reactions_count` has been saved without touching the post's `updated_at`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post, with the decremented count already saved. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/CommentsController.php:543` | `$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/ReactionController.php:112` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/react_removed', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/react_added`](#fluent-community-feed-react-added)

<a id="fluent-community-feed-rescheduled"></a>

## `fluent_community/feed/rescheduled`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires after a scheduled post is moved to a new publish time.

Fires only for posts still in `scheduled` status, and only once the new time has passed the 30-minutes-from-now minimum. The Action Scheduler job has already been unscheduled and re-queued at the new UTC time. Publishing a scheduled post early does not fire this — that path fires fluent_community/feed/created (and fluent_community/space_feed/created for space posts) instead.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The rescheduled post, with the new scheduled_at saved. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:148` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/rescheduled', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/scheduled_posts_api_response`](/hooks/filters/feeds#fluent-community-scheduled-posts-api-response)

<a id="fluent-community-feed-scheduled"></a>

## `fluent_community/feed/scheduled`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when a newly created post is saved with the `scheduled` status.

Checked before the published and non-published branches, so a scheduled post fires neither `fluent_community/feed/created` nor `fluent_community/feed/new_feed_{status}`. Nothing in core schedules the later publication: Pro's `SchedulePostHandler` listens here and queues `fluent_community/feed/scheduled_publish` for `$feed->scheduled_at`, which is when `fluent_community/feed/created` finally runs. Without Pro the post simply stays scheduled.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The scheduled post; `scheduled_at` is set. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:427` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/scheduled', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/scheduled_publish`](#fluent-community-feed-scheduled-publish) · [`fluent_community/feed/created`](#fluent-community-feed-created)

<a id="fluent-community-feed-scheduled-publish"></a>

## `fluent_community/feed/scheduled_publish`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Action Scheduler task that publishes one scheduled post when its time arrives.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Pro-only. Queued in the `fluent-community` group with the post ID as its single argument, and unscheduled again whenever the post is rescheduled, published early or deleted, so at most one pending occurrence exists per post. The handler is what flips the status to `published` and fires `fluent_community/feed/created`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feedId` | `int` | ID of the post due to be published. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:44` | No parameters |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:146` | No parameters |

### Example

```php
add_action('fluent_community/feed/scheduled_publish', function ($feedId) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/scheduled`](#fluent-community-feed-scheduled)

<a id="fluent-community-feed-scheduling-everyone-tag"></a>

## `fluent_community/feed/scheduling_everyone_tag`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires just before the "everyone" broadcast email for a post is queued.

Only reached for space posts whose body carries the everyone tag and whose author is a space admin or moderator. Core does not use it as an event so much as a marker: `EmailNotificationHandler` calls `did_action()` on it to suppress the ordinary per-subscriber post email, so that a broadcast post is not mailed twice. Immediately afterwards `fluent_community/email_notify_users_everyone_tag` is scheduled for five minutes out.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post carrying the everyone tag. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:727` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/scheduling_everyone_tag', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/email_notify_users_everyone_tag`](/hooks/actions/notifications#fluent-community-email-notify-users-everyone-tag) · [`fluent_community/email_notify_new_posts`](#fluent-community-email-notify-new-posts)

<a id="fluent-community-feed-updated"></a>

## `fluent_community/feed/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Runs after an existing post is saved with at least one changed column.

It is skipped when the save produced no dirty attributes, so editing a post without changing anything is silent. Two call sites pass different change sets: the full editor in `FeedsController::updateFeed()`, and `patchFeed()`, which only ever touches `is_sticky`, `priority` and `comments_disabled`. Media and topic changes are persisted before the hook runs but are not reflected in `$dirty`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post after saving. |
| 2 | `$dirty` | `array` | The changed attributes, keyed by column name, as returned by `getDirty()`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:672` | `$existingFeed` (Feed)<br>`$dirty` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:743` | `$feed` (Feed)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/feed/updated', function ($feed, $dirty) {
}, 10, 2);
```

**Related:** [`fluent_community/feed/created`](#fluent-community-feed-created)

<a id="fluent-community-feed-updating-content-type-old-existingContentType"></a>

## `fluent_community/feed/updating_content_type_old_{existingContentType}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when an edit changes a post from one content type to another, named after the outgoing type.

The suffix is the type being left behind, so a document post turned back into text fires `fluent_community/feed/updating_content_type_old_document`. It runs before the post is saved, giving a callback the chance to clean up the old type's attachments while they are still linked — that is exactly what Pro's Document Library does. Nothing fires for the incoming type; use `fluent_community/feed/update_feed_data_type_{newContentType}` for that side.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$existingFeed` | `\FluentCommunity\App\Models\Feed` | The post as currently stored, before the update is applied. |
| 2 | `$newContentType` | `string` | The content type it is changing to. |
| 3 | `$requestData` | `array` | The raw request payload. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:548` | `$existingFeed` (Feed)<br>`$newContentType` (mixed)<br>`$requestData` (array) |

### Example

```php
add_action('fluent_community/feed/updating_content_type_old_{existingContentType}', function ($existingFeed, $newContentType, $requestData) {
}, 10, 3);
```

**Related:** [`fluent_community/feed/update_feed_data_type_{newContentType}`](/hooks/filters/feeds#fluent-community-feed-update-feed-data-type-newContentType)

<a id="fluent-community-feeds-query"></a>

## `fluent_community/feeds_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Passes the main feed list query by reference so callbacks can constrain it before it is paged.

Fired with `do_action_ref_array()`, so declare the first parameter as `&$query` and mutate it in place — returning a builder does nothing. It runs after search, topic, status, space, author and access scoping have been applied and immediately before `limit()`/`offset()`, which makes it the right place to add joins or further `where` clauses but the wrong place to change the page size. `$queryArgs` is the resolved, array-filtered context and always carries `is_main_query`, true only for the unfiltered global feed. Pro uses it to apply block lists and the "Following" sort.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$query` | `\FluentCommunity\Framework\Database\Orm\Builder` | The Feed query, passed by reference. |
| 2 | `$requestData` | `array` | The full request parameters. |
| 3 | `$queryArgs` | `array` | Resolved context: `per_page`, `page`, optional `space_slug`, `user_id`, `search`, `selected_topic`, and `is_main_query`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:118` | `&$feedsQuery` (mixed)<br>`$request->all()` (array)<br>`$queryArgs` (mixed) |

### Example

```php
add_action('fluent_community/feeds_query', function ($query, $requestData, $queryArgs) {
}, 10, 3);
```

**Related:** [`fluent_community/feeds_api_response`](/hooks/filters/feeds#fluent-community-feeds-api-response)

<a id="fluent-community-notify-profile-feed-new-post"></a>

## `fluent_community/notify_profile_feed_new_post`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Action Scheduler task that emails a member's followers about a new profile post.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Pro-only, part of the Followers module. Scheduled two minutes after a profile post is published by the `fluent_community/profile_feed/created` listener, and re-scheduled by the handler in batches, so it fires more than once for a busy author. The second argument is the cursor into the follower list; it is 0 on the first run.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feedId` | `int` | ID of the profile post. |
| 2 | `$lastUserId` | `int` | Highest follower ID already mailed; 0 on the first batch. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/FollowHandler.php:191` | No parameters |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/FollowHandler.php:263` | No parameters |

### Example

```php
add_action('fluent_community/notify_profile_feed_new_post', function ($feedId, $lastUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/profile_feed/created`](#fluent-community-profile-feed-created)

<a id="fluent-community-profile-feed-created"></a>

## `fluent_community/profile_feed/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** The profile-scoped counterpart of `fluent_community/feed/created`, for posts with no space.

Fires immediately after `fluent_community/feed/created` when `$feed->space_id` is empty. Note the asymmetry with `fluent_community/space_feed/created`: only `FeedsController::store()` fires this one, so a profile post created programmatically through `FeedsHelper::createFeed()` fires the generic hook and nothing else. Pro's Followers module hangs the follower email off it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The published post; `space_id` is empty. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:454` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/profile_feed/created', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/space_feed/created`](#fluent-community-space-feed-created) · [`fluent_community/feed/created`](#fluent-community-feed-created)

<a id="fluent-community-space-feed-created"></a>

## `fluent_community/space_feed/created`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 5
- **When it fires:** The space-scoped counterpart of `fluent_community/feed/created`, for posts that belong to a space.

Always fires immediately after `fluent_community/feed/created` and only when `$feed->space_id` is set; on the controller path a profile-only post fires `fluent_community/profile_feed/created` instead. Use it when your callback would otherwise have to guard on `$feed->space_id` — core hangs the space email notification off it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The published post; `space_id` is guaranteed non-empty. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:95` | `$feed` (Feed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:215` | `$content` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:96` | `$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:452` | `$feed` (Feed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:555` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/space_feed/created', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/created`](#fluent-community-feed-created)

<a id="fluent-community-space-feed-email-notify-sub-query"></a>

## `fluent_community/space_feed/email_notify_sub_query`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Passes the recipient sub-query for space post emails by reference so extra recipients can be added.

Fired with `do_action_ref_array()` from two places that must stay in step: the cheap `exists()` probe that decides whether to queue the mail job at all, and the batch job that actually selects recipients. Adding recipients in only one of them either mails nobody or probes wrongly, so always register a single callback for both. The query at this point is an `orWhere`-friendly inner group over `User`; the surrounding query additionally requires an active space membership and an active profile, which your added recipients cannot escape.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$query` | `\FluentCommunity\Framework\Database\Orm\Builder` | The recipient sub-query, passed by reference. |
| 2 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post being notified about. |
| 3 | `$space` | `\FluentCommunity\App\Models\Space` | The space the post belongs to. |
| 4 | `$types` | `array` | Notification type keys being matched, `np_by_member_mail` plus `np_by_admin_mail` when the author is a space admin or moderator. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:77` | `&$query` (mixed)<br>`$feed` (Feed)<br>`$space` (Space)<br>`$types` (mixed) |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:131` | `&$query` (mixed)<br>`$feed` (Feed)<br>`$space` (Space)<br>`$types` (mixed) |

### Example

```php
add_action('fluent_community/space_feed/email_notify_sub_query', function ($query, $feed, $space, $types) {
}, 10, 4);
```

**Related:** [`fluent_community/email_notify_new_posts`](#fluent-community-email-notify-new-posts)

<a id="fluent-community-space-feed-updated"></a>

## `fluent_community/space_feed/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** The space-scoped counterpart of `fluent_community/feed/updated`.

Fires directly after `fluent_community/feed/updated` when the edited post belongs to a space, and only from the full editor endpoint — `patchFeed()`, which toggles sticky, priority and comment locking, fires the generic hook alone. It carries no change set, so read `getChanges()` off the model or listen to the generic hook if you need the dirty map.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post after saving; `space_id` is non-empty. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:674` | `$existingFeed` (Feed) |

### Example

```php
add_action('fluent_community/space_feed/updated', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/updated`](#fluent-community-feed-updated) · [`fluent_community/space_feed/created`](#fluent-community-space-feed-created)

