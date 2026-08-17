---
title: Moderation Actions
description: Moderation action hooks for FluentCommunity.
---

# Moderation Actions

7 unique action hooks currently map to this category, across 11 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/before_unblocking_user`](#fluent-community-before-unblocking-user) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/FollowController.php:205` |
| [`fluent_community/blocked_user`](#fluent-community-blocked-user) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/FollowController.php:176` |
| [`fluent_community/content_flagged`](#fluent-community-content-flagged) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:223` |
| [`fluent_community/content_moderation/created`](#fluent-community-content-moderation-created) | <span class="pro-badge">PRO</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:81` |
| [`fluent_community/report/{status}`](#fluent-community-report-status) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:220` |
| [`fluent_community/report/after_delete`](#fluent-community-report-after-delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:245` |
| [`fluent_community/report/before_delete`](#fluent-community-report-before-delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:242` |

<a id="fluent-community-before-unblocking-user"></a>

## `fluent_community/before_unblocking_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:205` | `$follow` (mixed)<br>`$xProfile` (XProfile) |

### Example

```php
add_action('fluent_community/before_unblocking_user', function ($follow, $xProfile) {
}, 10, 2);
```

<a id="fluent-community-blocked-user"></a>

## `fluent_community/blocked_user`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/FollowController.php:176` | `$follow` (mixed)<br>`$xProfile` (XProfile) |

### Example

```php
add_action('fluent_community/blocked_user', function ($follow, $xProfile) {
}, 10, 2);
```

<a id="fluent-community-content-flagged"></a>

## `fluent_community/content_flagged`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:223` | `$report` (mixed)<br>`$content` (mixed) |

### Example

```php
add_action('fluent_community/content_flagged', function ($report, $content) {
}, 10, 2);
```

<a id="fluent-community-content-moderation-created"></a>

## `fluent_community/content_moderation/created`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 5

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:81` | `$report` (mixed)<br>`$feed` (Feed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:148` | `$report` (mixed)<br>`$comment` (Comment) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:490` | `$report` (mixed)<br>`$feed` (Feed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:549` | `$report` (mixed)<br>`$comment` (Comment) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:130` | `$report` (mixed)<br>`$content` (mixed)<br>`$data['content_type']` (array) |

### Example

```php
add_action('fluent_community/content_moderation/created', function ($report, $content, $data) {
}, 10, 3);
```

<a id="fluent-community-report-status"></a>

## `fluent_community/report/{status}`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:220` | `$report` (mixed)<br>`$content` (mixed) |

### Example

```php
add_action('fluent_community/report/{status}', function ($report, $content) {
}, 10, 2);
```

<a id="fluent-community-report-after-delete"></a>

## `fluent_community/report/after_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:245` | `$report` (mixed) |

### Example

```php
add_action('fluent_community/report/after_delete', function ($report) {
}, 10, 1);
```

<a id="fluent-community-report-before-delete"></a>

## `fluent_community/report/before_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:242` | `$report` (mixed) |

### Example

```php
add_action('fluent_community/report/before_delete', function ($report) {
}, 10, 1);
```

