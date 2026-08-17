---
title: Notifications Filters
description: Notifications filter hooks for FluentCommunity.
---

# Notifications Filters

8 unique filter hooks currently map to this category, across 10 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/digest_email_body`](#fluent-community-digest-email-body) | Core | 1 | `fluent-community/app/Services/Libs/DailyDigest.php:119` |
| [`fluent_community/digest_email_subject`](#fluent-community-digest-email-subject) | Core | 1 | `fluent-community/app/Services/Libs/DailyDigest.php:149` |
| [`fluent_community/notifications_api_response`](#fluent-community-notifications-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/NotificationsController.php:38` |
| [`fluent_community/profile_notification_pref_api_response`](#fluent-community-profile-notification-pref-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:874` |
| [`fluent_community/smartcode_fallback`](#fluent-community-smartcode-fallback) | Core | 3 | `fluent-community/app/Services/SmartCodeParser.php:89` |
| [`fluent_community/smartcode_group_callback_{dataKey}`](#fluent-community-smartcode-group-callback-dataKey) | Core | 1 | `fluent-community/app/Services/SmartCodeParser.php:141` |
| [`fluent_community/unread_notifications_api_response`](#fluent-community-unread-notifications-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/NotificationsController.php:59` |
| [`fluent_community/verified_email_senders`](#fluent-community-verified-email-senders) | Core | 1 | `fluent-community/app/Functions/Utility.php:1267` |

<a id="fluent-community-digest-email-body"></a>

## `fluent_community/digest_email_body`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/DailyDigest.php:119` | `$emailBody` (mixed)<br>`$this->user` (User) |

### Example

```php
add_filter('fluent_community/digest_email_body', function ($emailBody, $user) {
    return $emailBody;
}, 10, 2);
```

<a id="fluent-community-digest-email-subject"></a>

## `fluent_community/digest_email_subject`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/DailyDigest.php:149` | `$emailSubject` (mixed)<br>`$this->user` (User)<br>`$notificationCount` (mixed) |

### Example

```php
add_filter('fluent_community/digest_email_subject', function ($emailSubject, $user, $notificationCount) {
    return $emailSubject;
}, 10, 3);
```

<a id="fluent-community-notifications-api-response"></a>

## `fluent_community/notifications_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/NotificationsController.php:38` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/notifications_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-profile-notification-pref-api-response"></a>

## `fluent_community/profile_notification_pref_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:874` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_notification_pref_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-smartcode-fallback"></a>

## `fluent_community/smartcode_fallback`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 3

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/SmartCodeParser.php:89` | `$matches[0]` (array)<br>`$this->store['user']` (array) |
| Core | `fluent-community/app/Services/SmartCodeParser.php:97` | `$matches[0]` (array)<br>`$this->store['user']` (array) |
| Core | `fluent-community/app/Services/SmartCodeParser.php:105` | `$matches[0]` (array)<br>`$this->store['user']` (array) |

### Example

```php
add_filter('fluent_community/smartcode_fallback', function ($matches, $store) {
    return $matches;
}, 10, 2);
```

<a id="fluent-community-smartcode-group-callback-dataKey"></a>

## `fluent_community/smartcode_group_callback_{dataKey}`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/SmartCodeParser.php:141` | `$matches[0]` (array)<br>`$valueKey` (mixed)<br>`$defaultValue` (mixed)<br>`static::$store['user']` (array) |

### Example

```php
add_filter('fluent_community/smartcode_group_callback_{dataKey}', function ($matches, $valueKey, $defaultValue, $store) {
    return $matches;
}, 10, 4);
```

<a id="fluent-community-unread-notifications-api-response"></a>

## `fluent_community/unread_notifications_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/NotificationsController.php:59` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/unread_notifications_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-verified-email-senders"></a>

## `fluent_community/verified_email_senders`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1267` | `$verifiedSenders` (mixed) |

### Example

```php
add_filter('fluent_community/verified_email_senders', function ($verifiedSenders) {
    return $verifiedSenders;
}, 10, 1);
```

