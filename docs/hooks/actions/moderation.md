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
- **When it fires:** The dynamic scheduling site behind the two report notification tasks.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

This entry documents the `as_schedule_single_action()` call in Pro's moderation handler, where the action name is built from the report's `content_type` — the extractor could not resolve the concatenation, which is why the name appears literally. In practice it only ever produces `fluent_community/comment_report_added_async` or `fluent_community/post_report_added_async`; hook those, not this. The task is queued immediately with the report ID and a starting user ID of 0.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$reportId` | `int` | ID of the moderation record. |
| 2 | `$lastUserId` | `int` | The user ID to resume after; `0` on the first run. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:272` | No parameters |

### Example

```php
add_action('fluent_community/' . $contentType . '_report_added_async', function ($reportId, $lastUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/post_report_added_async`](#fluent-community-post-report-added-async) · [`fluent_community/comment_report_added_async`](#fluent-community-comment-report-added-async)

<a id="fluent-community-comment-report-added-async"></a>

## `fluent_community/comment_report_added_async`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Action Scheduler task that emails moderators about a reported or auto-flagged comment.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

The comment-side twin of `fluent_community/post_report_added_async`, with the same batching and resume behaviour and the same recipient rules. The email body is the rendered comment with a "Review the comment" button, and the link carries a `comment_id` query parameter so the portal scrolls to it. Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$reportId` | `int` | ID of the moderation record. |
| 2 | `$lastUserId` | `int` | Resume point: only users with a higher ID are mailed on this run. `0` first time. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:610` | No parameters |

### Example

```php
add_action('fluent_community/comment_report_added_async', function ($reportId, $lastUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/post_report_added_async`](#fluent-community-post-report-added-async)

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

**Related:** [`fluent_community/content_flagged`](#fluent-community-content-flagged) · [`fluent_community/report_reasons`](/hooks/filters/moderation#fluent-community-report-reasons)

<a id="fluent-community-post-report-added-async"></a>

## `fluent_community/post_report_added_async`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Action Scheduler task that emails moderators about a reported or auto-flagged post.

::: info Scheduled job
This action is not fired inline. It is registered as a recurring background job
and runs on a schedule, so the source below is where the job is *scheduled*, not
where it fires. Hook it with `add_action()` as usual.
:::

Queued in the `fluent-community` group as soon as the report is created, and re-queued by its own handler whenever the send loop approaches its run-time budget — so it can fire several times for one report, each time resuming after `$lastUserId`. Recipients are community admins and moderators with an active profile, and the reporting user is excluded. It returns silently if the report or its post has since been deleted. Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$reportId` | `int` | ID of the moderation record. |
| 2 | `$lastUserId` | `int` | Resume point: only users with a higher ID are mailed on this run. `0` first time. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:669` | No parameters |

### Example

```php
add_action('fluent_community/post_report_added_async', function ($reportId, $lastUserId) {
}, 10, 2);
```

**Related:** [`fluent_community/comment_report_added_async`](#fluent-community-comment-report-added-async) · [`fluent_community/content_moderation/created`](#fluent-community-content-moderation-created)

<a id="fluent-community-report-status"></a>

## `fluent_community/report/{status}`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Dynamic action fired after a moderator sets the status of a report.

The placeholder is one of `published`, `unpublished`, `pending`, `rejected`, `flagged` or `ignored`, validated before the update. Only `unpublished` actually unpublishes the content — every other status publishes it — and Pro listens on `fluent_community/report/unpublished` to record a strike against the author. The status is applied to every report filed against the same content, not just the one being acted on. When approving content that had been held back, the ordinary creation hooks fire first, so a post can reach `fluent_community/feed/created` from here. This is Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$report` | `\FluentCommunityPro\App\Models\Moderation` | The moderation record, saved with the new status and an `updated_by` in its meta. |
| 2 | `$content` | `mixed` | The `Feed` or `Comment` the report is about. Can be `null` if the content has since been deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:220` | `$report` (mixed)<br>`$content` (mixed) |

### Example

```php
add_action('fluent_community/report/{status}', function ($report, $content) {
}, 10, 2);
```

**Related:** [`fluent_community/report/before_delete`](#fluent-community-report-before-delete) · [`fluent_community/content_flagged`](#fluent-community-content-flagged)

<a id="fluent-community-report-after-delete"></a>

## `fluent_community/report/after_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires immediately after a moderation report row has been deleted.

The model instance is still in memory and its attributes readable, but the row is gone, so relations will no longer resolve and nothing saved on it will persist. Only the report acted on is deleted; other reports filed against the same content remain. Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$report` | `\FluentCommunityPro\App\Models\Moderation` | The deleted report, still populated in memory. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:245` | `$report` (mixed) |

### Example

```php
add_action('fluent_community/report/after_delete', function ($report) {
}, 10, 1);
```

**Related:** [`fluent_community/report/before_delete`](#fluent-community-report-before-delete)

<a id="fluent-community-report-before-delete"></a>

## `fluent_community/report/before_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires immediately before a moderation report row is deleted.

The last point at which the report and its relations can be read. Deleting a report does not touch the content it was filed against — an unpublished post stays unpublished — so this is purely about the moderation record. Pro-only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$report` | `\FluentCommunityPro\App\Models\Moderation` | The report about to be deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ModerationController.php:242` | `$report` (mixed) |

### Example

```php
add_action('fluent_community/report/before_delete', function ($report) {
}, 10, 1);
```

**Related:** [`fluent_community/report/after_delete`](#fluent-community-report-after-delete)

