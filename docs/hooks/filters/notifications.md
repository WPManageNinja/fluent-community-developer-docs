---
title: Notifications Filters
description: Notifications filter hooks for FluentCommunity.
---

# Notifications Filters

6 unique filter hooks currently map to this category, across 6 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/default_course_email_notification`](#fluent_communitydefault_course_email_notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/ProHelper.php:178` |
| [`fluent_community/digest_email_body`](#fluent_communitydigest_email_body) | Core | 1 | `fluent-community/app/Services/Libs/DailyDigest.php:118` |
| [`fluent_community/digest_email_subject`](#fluent_communitydigest_email_subject) | Core | 1 | `fluent-community/app/Services/Libs/DailyDigest.php:148` |
| [`fluent_community/digest_notification/email_sections`](#fluent_communitydigest_notificationemail_sections) | Core | 1 | `fluent-community/app/Services/Libs/DailyDigest.php:105` |
| [`fluent_community/notifications_api_response`](#fluent_communitynotifications_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/NotificationsController.php:37` |
| [`fluent_community/unread_notifications_api_response`](#fluent_communityunread_notifications_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/NotificationsController.php:57` |

<a id="fluent_communitydefault_course_email_notification"></a>

## `fluent_community/default_course_email_notification`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Default Course Email Notification hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:178` | `[ 'subject' => '{&#8203;{section.title}&#8203;} is now available for you in {&#8203;{course.title}&#8203;}', 'message' => 'Hi {&#8203;{user.display_name}&#8203;},' . PHP_EOL . PHP_EOL . '{&#8203;{section.title}&#8203;} is now available to you in {&#8203;{course.title}&#8203;}.' . PHP_EOL . 'To complete this section, please follow this link:' . PHP_EOL . '{&#8203;{section.url}&#8203;},' . PHP_EOL . PHP_EOL . 'Thanks,' . PHP_EOL .'{&#8203;{community.name_with_url}&#8203;}' ]` (array) |

### Example

```php
add_filter('fluent_community/default_course_email_notification', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitydigest_email_body"></a>

## `fluent_community/digest_email_body`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Digest Email Body hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/DailyDigest.php:118` | `$emailBody` (mixed)<br>`$this->user` (mixed) |

### Example

```php
add_filter('fluent_community/digest_email_body', function ($emailBody, $user) {
    return $emailBody;
}, 10, 2);
```

<a id="fluent_communitydigest_email_subject"></a>

## `fluent_community/digest_email_subject`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Digest Email Subject hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/DailyDigest.php:148` | `$emailSubject` (mixed)<br>`$this->user` (mixed)<br>`$notificationCount` (mixed) |

### Example

```php
add_filter('fluent_community/digest_email_subject', function ($emailSubject, $user, $notificationCount) {
    return $emailSubject;
}, 10, 3);
```

<a id="fluent_communitydigest_notificationemail_sections"></a>

## `fluent_community/digest_notification/email_sections`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Digest Notification/Email Sections hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Libs/DailyDigest.php:105` | `[ 'before_content' => '', 'after_content' => '' ]` (array)<br>`$this->user` (mixed) |

### Example

```php
add_filter('fluent_community/digest_notification/email_sections', function ($param1, $user) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitynotifications_api_response"></a>

## `fluent_community/notifications_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Notifications API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/NotificationsController.php:37` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/notifications_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityunread_notifications_api_response"></a>

## `fluent_community/unread_notifications_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Unread Notifications API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/NotificationsController.php:57` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/unread_notifications_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

