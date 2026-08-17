---
title: Feeds Actions
description: Feeds action hooks for FluentCommunity.
---

# Feeds Actions

23 unique action hooks currently map to this category, across 39 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/check_rate_limit/create_post`](#fluent-community-check-rate-limit-create-post) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:276` |
| [`fluent_community/email_notify_new_posts`](#fluent-community-email-notify-new-posts) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:84` |
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
| [`fluent_community/feed/scheduled_publish`](#fluent-community-feed-scheduled-publish) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:44` |
| [`fluent_community/feed/scheduling_everyone_tag`](#fluent-community-feed-scheduling-everyone-tag) | Core | 1 | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:727` |
| [`fluent_community/feed/updated`](#fluent-community-feed-updated) | Core | 2 | `fluent-community/app/Http/Controllers/FeedsController.php:651` |
| [`fluent_community/feed/updating_content_type_old_{existingContentType}`](#fluent-community-feed-updating-content-type-old-existingContentType) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:533` |
| [`fluent_community/feeds_query`](#fluent-community-feeds-query) | Core | 1 | `fluent-community/app/Http/Controllers/FeedsController.php:117` |
| [`fluent_community/notify_profile_feed_new_post`](#fluent-community-notify-profile-feed-new-post) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/FollowHandler.php:191` |
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

<a id="fluent-community-email-notify-new-posts"></a>

## `fluent_community/email_notify_new_posts`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:84` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:211` | No parameters |

### Example

```php
add_action('fluent_community/email_notify_new_posts', function () {
}, 10, 0);
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
- **When it fires:** Runs immediately before a post row is deleted, while its relations are still readable.

This is the last point at which comments, reactions, activities, media and notifications attached to the post can still be queried — core's `CleanupHandler` uses exactly that window to cascade the deletes. Once the post is gone, `fluent_community/feed/deleted` fires with only the integer ID.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The post about to be deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:841` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/before_deleted', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/feed/media_deleted`](#fluent-community-feed-media-deleted)

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:76` | `$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:434` | `$feed` (Feed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:532` | `$feed` (Feed) |

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
- **When it fires:** Fires after a scheduled post is moved to a new publish time.

Fires only for posts still in `scheduled` status, and only once the new time has passed the 30-minutes-from-now minimum. The Action Scheduler job has already been unscheduled and re-queued at the new UTC time. Publishing a scheduled post early does not fire this — that path fires fluent_community/feed/created (and fluent_community/space_feed/created for space posts) instead.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The rescheduled post, with the new scheduled_at saved. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:131` | `$feed` (Feed) |

### Example

```php
add_action('fluent_community/feed/rescheduled', function ($feed) {
}, 10, 1);
```

**Related:** [`fluent_community/scheduled_posts_api_response`](#fluent-community-scheduled-posts-api-response)

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

<a id="fluent-community-feed-scheduled-publish"></a>

## `fluent_community/feed/scheduled_publish`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/SchedulePostHandler.php:44` | No parameters |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:129` | No parameters |

### Example

```php
add_action('fluent_community/feed/scheduled_publish', function () {
}, 10, 0);
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
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:651` | `$existingFeed` (Feed)<br>`$dirty` (mixed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:712` | `$feed` (Feed)<br>`$dirty` (mixed) |

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

<a id="fluent-community-notify-profile-feed-new-post"></a>

## `fluent_community/notify_profile_feed_new_post`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/FollowHandler.php:191` | No parameters |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/FollowHandler.php:263` | No parameters |

### Example

```php
add_action('fluent_community/notify_profile_feed_new_post', function () {
}, 10, 0);
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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/SchedulePostsController.php:79` | `$feed` (Feed) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:437` | `$feed` (Feed) |
| Core | `fluent-community/app/Services/FeedsHelper.php:535` | `$feed` (Feed) |

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

