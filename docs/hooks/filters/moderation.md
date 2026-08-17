---
title: Moderation Filters
description: Moderation filter hooks for FluentCommunity.
---

# Moderation Filters

1 unique filter hook currently map to this category, across 1 call site.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/report_reasons`](#fluent-community-report-reasons) | Core | 1 | `fluent-community/app/Services/Helper.php:2197` |

<a id="fluent-community-report-reasons"></a>

## `fluent_community/report_reasons`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the reasons a member can pick when reporting a post or comment.

Defaults to harassment, spam, offensive, incorrect space, against community rules, and other. Keys are stored verbatim in the moderation record's `reason` column, so renaming a key orphans the label on reports already filed under the old one. Labels are translated through the `fluent-community` text domain; translate additions yourself.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$reasons` | `array` | Reason keys mapped to translated labels. |

**Return:** `array` — an associative map of stored key to display label.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2197` | `array (6 keys: harassment, spam, offensive, …)` (array) |

### Example

```php
add_filter('fluent_community/report_reasons', function ($reasons) {
    return $reasons;
}, 10, 1);
```

**Related:** [`fluent_community/content_moderation/created`](/hooks/actions/moderation#fluent-community-content-moderation-created)

