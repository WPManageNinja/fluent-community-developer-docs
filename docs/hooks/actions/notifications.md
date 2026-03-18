---
title: Notifications Actions
description: Notifications action hooks for FluentCommunity.
---

# Notifications Actions

7 unique action hooks currently map to this category, across 7 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/course/{courseType}/unschedule_notification`](#fluent_communitycoursecourseTypeunschedule_notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:124` |
| [`fluent_community/course/{prevType}/unschedule_notification`](#fluent_communitycourseprevTypeunschedule_notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:114` |
| [`fluent_community/course/scheduled/init_notification`](#fluent_communitycoursescheduledinit_notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:225` |
| [`fluent_community/course/scheduled/unschedule_notification`](#fluent_communitycoursescheduledunschedule_notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:224` |
| [`fluent_community/course/structured/init_notification`](#fluent_communitycoursestructuredinit_notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:235` |
| [`fluent_community/course/structured/unschedule_notification`](#fluent_communitycoursestructuredunschedule_notification) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:234` |
| [`fluent_community/remove_old_notifications`](#fluent_communityremove_old_notifications) | Core | 1 | `fluent-community/app/Hooks/Handlers/Scheduler.php:26` |

<a id="fluent_communitycoursecourseTypeunschedule_notification"></a>

## `fluent_community/course/{courseType}/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Course/{CourseType}/Unschedule Notification hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:124` | `$course` (mixed)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/{courseType}/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent_communitycourseprevTypeunschedule_notification"></a>

## `fluent_community/course/{prevType}/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Course/{PrevType}/Unschedule Notification hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:114` | `$course` (mixed)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/{prevType}/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent_communitycoursescheduledinit_notification"></a>

## `fluent_community/course/scheduled/init_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Course/Scheduled/Init Notification hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:225` | `$course` (mixed)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/scheduled/init_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent_communitycoursescheduledunschedule_notification"></a>

## `fluent_community/course/scheduled/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Course/Scheduled/Unschedule Notification hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:224` | `$course` (mixed)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/scheduled/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent_communitycoursestructuredinit_notification"></a>

## `fluent_community/course/structured/init_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Course/Structured/Init Notification hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:235` | `$course` (mixed)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/structured/init_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent_communitycoursestructuredunschedule_notification"></a>

## `fluent_community/course/structured/unschedule_notification`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Course/Structured/Unschedule Notification hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/CourseEmailNotificationHandler.php:234` | `$course` (mixed)<br>`$section` (mixed) |

### Example

```php
add_action('fluent_community/course/structured/unschedule_notification', function ($course, $section) {
}, 10, 2);
```

<a id="fluent_communityremove_old_notifications"></a>

## `fluent_community/remove_old_notifications`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Remove Old Notifications hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/Scheduler.php:26` | No parameters |

### Example

```php
add_action('fluent_community/remove_old_notifications', function () {
}, 10, 0);
```

