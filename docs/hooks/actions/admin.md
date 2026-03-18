---
title: Admin Actions
description: Admin action hooks for FluentCommunity.
---

# Admin Actions

4 unique action hooks currently map to this category, across 8 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/content_moderation/created`](#fluent_communitycontent_moderationcreated) | <span class="pro-badge">PRO</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:73` |
| [`fluent_community/report/{status}`](#fluent_communityreportstatus) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:207` |
| [`fluent_community/report/after_delete`](#fluent_communityreportafter_delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:222` |
| [`fluent_community/report/before_delete`](#fluent_communityreportbefore_delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:219` |

<a id="fluent_communitycontent_moderationcreated"></a>

## `fluent_community/content_moderation/created`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 5
- **When it fires:** Content Moderation/Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:73` | `$report` (mixed)<br>`$feed` (Feed|mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:116` | `$report` (mixed)<br>`$comment` (Comment|mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:425` | `$report` (mixed)<br>`$feed` (Feed|mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:465` | `$report` (mixed)<br>`$comment` (Comment|mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:124` | `$report` (mixed)<br>`$content` (mixed)<br>`$data['content_type']` (array) |

### Example

```php
add_action('fluent_community/content_moderation/created', function ($report, $feed) {
}, 10, 2);
```

<a id="fluent_communityreportstatus"></a>

## `fluent_community/report/{status}`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Report/{Status} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:207` | `$report` (mixed) |

### Example

```php
add_action('fluent_community/report/{status}', function ($report) {
}, 10, 1);
```

<a id="fluent_communityreportafter_delete"></a>

## `fluent_community/report/after_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Report/After Delete hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:222` | `$report` (mixed) |

### Example

```php
add_action('fluent_community/report/after_delete', function ($report) {
}, 10, 1);
```

<a id="fluent_communityreportbefore_delete"></a>

## `fluent_community/report/before_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Report/Before Delete hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:219` | `$report` (mixed) |

### Example

```php
add_action('fluent_community/report/before_delete', function ($report) {
}, 10, 1);
```

