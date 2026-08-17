---
title: Miscellaneous Filters
description: Miscellaneous filter hooks for FluentCommunity.
---

# Miscellaneous Filters

3 unique filter hooks currently map to this category, across 4 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/custom_order_by`](#fluent-community-custom-order-by) | Core | 1 | `fluent-community/app/Models/Feed.php:377` |
| [`fluent_community/max_execution_time`](#fluent-community-max-execution-time) | Core | 1 | `fluent-community/app/Functions/Utility.php:596` |
| [`fluent_community/max_per_page`](#fluent-community-max-per-page) | Core | 2 | `fluent-community/app/Http/Controllers/ActivityController.php:23` |

<a id="fluent-community-custom-order-by"></a>

## `fluent_community/custom_order_by`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/Feed.php:377` | `$query` (mixed)<br>`$type` (mixed) |

### Example

```php
add_filter('fluent_community/custom_order_by', function ($query, $type) {
    return $query;
}, 10, 2);
```

<a id="fluent-community-max-execution-time"></a>

## `fluent_community/max_execution_time`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:596` | `$maxRunTime` (mixed) |

### Example

```php
add_filter('fluent_community/max_execution_time', function ($maxRunTime) {
    return $maxRunTime;
}, 10, 1);
```

<a id="fluent-community-max-per-page"></a>

## `fluent_community/max_per_page`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:23` | `100` (int) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:52` | `100` (int) |

### Example

```php
add_filter('fluent_community/max_per_page', function ($param1) {
    return $param1;
}, 10, 1);
```

