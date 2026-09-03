---
title: Miscellaneous Filters
description: Miscellaneous filter hooks for FluentCommunity.
---

# Miscellaneous Filters

6 unique filter hooks currently map to this category, across 8 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/add_sitemap_provider`](#fluent-community-add-sitemap-provider) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:22` |
| [`fluent_community/custom_order_by`](#fluent-community-custom-order-by) | Core | 1 | `fluent-community/app/Models/Feed.php:377` |
| [`fluent_community/license_grace_period_days`](#fluent-community-license-grace-period-days) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/LicenseController.php:111` |
| [`fluent_community/max_execution_time`](#fluent-community-max-execution-time) | Core | 1 | `fluent-community/app/Functions/Utility.php:637` |
| [`fluent_community/max_per_page`](#fluent-community-max-per-page) | Core | 2 | `fluent-community/app/Http/Controllers/ActivityController.php:23` |
| [`fluent_community/undeliverable_crm_contact_statuses`](#fluent-community-undeliverable-crm-contact-statuses) | Core | 2 | `fluent-community/app/Services/Helper.php:2510` |

<a id="fluent-community-add-sitemap-provider"></a>

## `fluent_community/add_sitemap_provider`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:22` | `$enableSitemap` (mixed) |

### Example

```php
add_filter('fluent_community/add_sitemap_provider', function ($enableSitemap) {
    return $enableSitemap;
}, 10, 1);
```

<a id="fluent-community-custom-order-by"></a>

## `fluent_community/custom_order_by`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Applies a custom sort to the post query for an order key the built-in sorts do not handle.

Reachable only for keys you have added through `fluent_community/post_order_options`: the scope rejects anything outside that list before the filter, and each of the seven shipped keys is handled by an earlier branch and returns early. A callback receives the query builder and must return a builder — return nothing and the caller ends up with `null` where a query is expected. Apply ordering only; adding `where` clauses here silently changes which posts a viewer sees.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$query` | `mixed` | The post query builder, with no ordering applied yet. |
| 2 | `$type` | `string` | The requested sort key. |

**Return:** The query builder. Returning anything else breaks the caller, which continues to chain on it.

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

**Related:** [`fluent_community/post_order_options`](/hooks/filters/feeds#fluent-community-post-order-options)

<a id="fluent-community-license-grace-period-days"></a>

## `fluent_community/license_grace_period_days`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/LicenseController.php:111` | `15` (int) |

### Example

```php
add_filter('fluent_community/license_grace_period_days', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-max-execution-time"></a>

## `fluent_community/max_execution_time`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the number of seconds a batched background job may run before re-scheduling itself.

The default is derived from PHP's `max_execution_time`: unlimited or unreadable becomes 60, the value is capped at 58, and three seconds of headroom are subtracted — so a typical site sees 27 or 55. Email digests, post and comment notifications and the moderation mailers all compare their elapsed time against it and queue a fresh Action Scheduler task when they exceed it. Returning a value larger than the real PHP limit risks jobs being killed mid-batch, which loses the resume point.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxRunTime` | `int` | Seconds of budget for a batch, already capped and reduced by three. |

**Return:** `int` — seconds. It is not re-clamped, so the cap and the headroom are yours to respect.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:637` | `$maxRunTime` (mixed) |

### Example

```php
add_filter('fluent_community/max_execution_time', function ($maxRunTime) {
    return $maxRunTime;
}, 10, 1);
```

**Related:** [`fluent_community_send_daily_digest`](/hooks/actions/notifications#fluent-community-send-daily-digest)

<a id="fluent-community-max-per-page"></a>

## `fluent_community/max_per_page`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the ceiling on how many items a paginated portal endpoint will return.

Defaults to 100 and is applied identically in the feeds and activities endpoints, where the requested `per_page` is clamped with `min($maxPerPage, max(1, $perPage))`. The result is cast with `(int)` and an effective `0` falls back to 100, so the limit cannot be removed by returning nothing — return a large number instead. It bounds only these two endpoints; other list endpoints use the framework's own pagination defaults.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$maxPerPage` | `int` | The per-page ceiling, 100 by default. |

**Return:** `int` — cast to an integer; a falsy result reverts to 100.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:23` | `100` (int) |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:54` | `100` (int) |

### Example

```php
add_filter('fluent_community/max_per_page', function ($maxPerPage) {
    return $maxPerPage;
}, 10, 1);
```

<a id="fluent-community-undeliverable-crm-contact-statuses"></a>

## `fluent_community/undeliverable_crm_contact_statuses`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** FluentCRM contact statuses that FluentCommunity treats as undeliverable. Emails to contacts with these statuses are skipped for notification emails.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$statuses` | `array` | Contact statuses to skip. Default: bounced, complained, spammed. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2510` | `['bounced', 'complained', 'spammed']` (array) |
| Core | `fluent-community/app/Services/Helper.php:2534` | `['bounced', 'complained', 'spammed']` (array) |

### Example

```php
add_filter('fluent_community/undeliverable_crm_contact_statuses', function ($statuses) {
    return $statuses;
}, 10, 1);
```

