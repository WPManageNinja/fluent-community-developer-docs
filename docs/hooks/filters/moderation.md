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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2197` | `array (6 keys: harassment, spam, offensive, …)` (array) |

### Example

```php
add_filter('fluent_community/report_reasons', function ($param1) {
    return $param1;
}, 10, 1);
```

