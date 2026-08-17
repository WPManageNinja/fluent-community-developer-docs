---
title: Moderation Actions
description: Moderation action hooks for FluentCommunity.
---

# Moderation Actions

8 unique action hooks currently map to this category, across 12 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/' . $contentType . '_report_added_async`](#fluent-community-' . contentType . '-report-added-async) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:272` |
| [`fluent_community/comment_report_added_async`](#fluent-community-comment-report-added-async) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:610` |
| [`fluent_community/content_flagged`](#fluent-community-content-flagged) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:223` |
| [`fluent_community/content_moderation/created`](#fluent-community-content-moderation-created) | <span class="pro-badge">PRO</span> | 5 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:81` |
| [`fluent_community/post_report_added_async`](#fluent-community-post-report-added-async) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:669` |
| [`fluent_community/report/{status}`](#fluent-community-report-status) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:220` |
| [`fluent_community/report/after_delete`](#fluent-community-report-after-delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:245` |
| [`fluent_community/report/before_delete`](#fluent-community-report-before-delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ModerationController.php:242` |

<a id="fluent-community-' . contentType . '-report-added-async"></a>

## `fluent_community/' . $contentType . '_report_added_async`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:272` | No parameters |

### Example

```php
add_action('fluent_community/' . $contentType . '_report_added_async', function () {
}, 10, 0);
```

<a id="fluent-community-comment-report-added-async"></a>

## `fluent_community/comment_report_added_async`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:610` | No parameters |

### Example

```php
add_action('fluent_community/comment_report_added_async', function () {
}, 10, 0);
```

<a id="fluent-community-content-flagged"></a>

## `fluent_community/content_flagged`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires when accumulated reports push a post or comment over the configured flag threshold and it is unpublished.

Only reached when content moderation is enabled, a positive `flag_after_threshold` is configured, the content is still `published`, and the report count has met the threshold. By the time callbacks run the content status is already `pending`, the report is marked `flagged`, and a flagged comment has been decremented from its post's comment count. This is Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$report` | `\FluentCommunityPro\App\Models\Moderation` | The moderation record that crossed the threshold. |
| 2 | `$content` | `mixed` | The flagged `Feed` or `Comment` model, already saved as `pending`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:223` | `$report` (mixed)<br>`$content` (mixed) |

### Example

```php
add_action('fluent_community/content_flagged', function ($report, $content) {
}, 10, 2);
```

**Related:** [`fluent_community/content_moderation/created`](#fluent-community-content-moderation-created)

<a id="fluent-community-content-moderation-created"></a>

## `fluent_community/content_moderation/created`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 5
- **When it fires:** Fires whenever a moderation report is created against a post or comment.

Covers both member-submitted reports and automatic profanity or first-post flags, which create a report with `meta.flagged_by = auto` and no `user_id` — check that before treating a report as human-submitted. Only the member-report endpoint passes the third argument; the auto-flag paths pass two. Several Pro handlers are attached, including the threshold check that may go on to fire `fluent_community/content_flagged`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$report` | `\FluentCommunityPro\App\Models\Moderation` | The stored moderation record. |
| 2 | `$content` | `mixed` | The reported `Feed` or `Comment` model. |
| 3 | `$contentType` | `string` | `post` or `comment`. Optional — supplied only by the member-report endpoint. |

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
add_action('fluent_community/content_moderation/created', function ($report, $content, $contentType) {
}, 10, 3);
```

**Related:** [`fluent_community/content_flagged`](#fluent-community-content-flagged) · [`fluent_community/report_reasons`](#fluent-community-report-reasons)

<a id="fluent-community-post-report-added-async"></a>

## `fluent_community/post_report_added_async`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:669` | No parameters |

### Example

```php
add_action('fluent_community/post_report_added_async', function () {
}, 10, 0);
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

