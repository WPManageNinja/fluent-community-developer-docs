---
title: Notifications Actions
description: Notifications action hooks for FluentCommunity.
---

# Notifications Actions

3 unique action hooks currently map to this category, across 4 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community_send_daily_digest`](#fluent-community-send-daily-digest) | Core | 2 | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:578` |
| [`fluent_community_send_daily_digest_init`](#fluent-community-send-daily-digest-init) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:60` |
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
| Core | `fluent-community/app/Hooks/Handlers/EmailNotificationHandler.php:578` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:21` | No parameters |

### Example

```php
add_action('fluent_community_send_daily_digest', function () {
}, 10, 0);
```

**Related:** [`fluent_community_scheduled_hour_jobs`](#fluent-community-scheduled-hour-jobs)

<a id="fluent-community-send-daily-digest-init"></a>

## `fluent_community_send_daily_digest_init`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:60` | No parameters |

### Example

```php
add_action('fluent_community_send_daily_digest_init', function () {
}, 10, 0);
```

<a id="fluent-community-remove-old-notifications"></a>

## `fluent_community/remove_old_notifications`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:26` | No parameters |

### Example

```php
add_action('fluent_community/remove_old_notifications', function () {
}, 10, 0);
```

