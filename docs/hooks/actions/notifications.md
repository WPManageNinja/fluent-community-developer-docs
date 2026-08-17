---
title: Notifications Actions
description: Notifications action hooks for FluentCommunity.
---

# Notifications Actions

2 unique action hooks currently map to this category, across 2 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community_send_daily_digest`](#fluent-community-send-daily-digest) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:21` |
| [`fluent_community/remove_old_notifications`](#fluent-community-remove-old-notifications) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:26` |

<a id="fluent-community-send-daily-digest"></a>

## `fluent_community_send_daily_digest`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:21` | No parameters |

### Example

```php
add_action('fluent_community_send_daily_digest', function () {
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

