---
title: Notifications Actions
description: Notifications action hooks for FluentCommunity.
---

# Notifications Actions

4 unique action hooks currently map to this category, across 6 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community_send_daily_digest`](#fluent-community-send-daily-digest) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:603` |
| [`fluent_community_send_daily_digest_init`](#fluent-community-send-daily-digest-init) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:60` |
| [`fluent_community/email_notify_users_everyone_tag`](#fluent-community-email-notify-users-everyone-tag) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:508` |
| [`fluent_community/remove_old_notifications`](#fluent-community-remove-old-notifications) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:26` |

<a id="fluent-community-send-daily-digest"></a>

## `fluent_community_send_daily_digest`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires when a batch of daily digest emails is due to be sent.

Not a once-per-day event. The scheduled `fluent_community_send_daily_digest_init` action fires it, and the core handler then walks recipients 100 at a time, re-scheduling this same action whenever it approaches its run-time budget — so it can fire many times for a single digest run. It takes no arguments; the handler tracks its position through the `last_digest_sent_user_id` option.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:603` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:21` | No parameters |

### Example

```php
add_action('fluent_community_send_daily_digest', function () {
}, 10, 0);
```

**Related:** [`fluent_community_scheduled_hour_jobs`](/hooks/actions/settings#fluent-community-scheduled-hour-jobs)

<a id="fluent-community-send-daily-digest-init"></a>

## `fluent_community_send_daily_digest_init`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Scheduled action that kicks off a digest run at the configured day and time.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Note the underscore-only naming. It is a one-shot Action Scheduler entry rather than a recurring one: the hourly maintenance job re-schedules the next occurrence, and unschedules it when digests are disabled globally and no member has opted in individually. Its only job is to fire `fluent_community_send_daily_digest`, which is where the batching happens, so hook that one for the actual send. It takes no arguments.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:60` | No parameters |

### Example

```php
add_action('fluent_community_send_daily_digest_init', function () {
}, 10, 0);
```

**Related:** [`fluent_community_send_daily_digest`](#fluent-community-send-daily-digest) · [`fluent_community_scheduled_hour_jobs`](/hooks/actions/settings#fluent-community-scheduled-hour-jobs)

<a id="fluent-community-email-notify-users-everyone-tag"></a>

## `fluent_community/email_notify_users_everyone_tag`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Action Scheduler task that broadcasts a post to every member of its space.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Queued five minutes after a space admin or moderator publishes a post carrying the everyone tag. It is the wide-reach path and it deliberately ignores per-space post subscriptions — the only opt-out honoured is a member having turned off mention mail. The handler pages through recipients and re-queues itself with the cursor in the second argument, so it fires many times for one post, and it bails immediately if the corresponding `space_feed/created` notification row cannot be found.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feedId` | `int` | ID of the post to broadcast. |
| 2 | `$lastSendUserId` | `int` | Highest recipient ID already mailed; 0 on the first batch. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:508` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/NotificationEventHandler.php:730` | No parameters |

### Example

```php
add_action('fluent_community/email_notify_users_everyone_tag', function ($feedId, $lastSendUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/feed/scheduling_everyone_tag`](/hooks/actions/feeds#fluent-community-feed-scheduling-everyone-tag) · [`fluent_community/email_notify_new_posts`](/hooks/actions/feeds#fluent-community-email-notify-new-posts)

<a id="fluent-community-remove-old-notifications"></a>

## `fluent_community/remove_old_notifications`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires once a day to prune notifications older than a month.

Dispatched from the `fluent_community_daily_jobs` handler. The core callback deletes at most 100 rows whose `updated_at` is over a month old per run, so a backlog is cleared gradually rather than in one pass. It takes no arguments and runs in an Action Scheduler request, so there is no current user.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:26` | No parameters |

### Example

```php
add_action('fluent_community/remove_old_notifications', function () {
}, 10, 0);
```

**Related:** [`fluent_community_daily_jobs`](/hooks/actions/settings#fluent-community-daily-jobs)

