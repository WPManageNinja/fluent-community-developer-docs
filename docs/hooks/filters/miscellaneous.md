---
title: "Miscellaneous Filters"
description: "Miscellaneous filter hooks for FluentCommunity."
---

# Miscellaneous Filters

14 unique filter hooks currently map to this category, across 15 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community_pro/module_entries`](#fluent-community-pro-module-entries) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/ModuleAssetsHandler.php:164` |
| [`fluent_community/add_sitemap_provider`](#fluent-community-add-sitemap-provider) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:22` |
| [`fluent_community/custom_order_by`](#fluent-community-custom-order-by) | Core | 1 | `fluent-community/app/Models/Feed.php:403` |
| [`fluent_community/license_grace_period_days`](#fluent-community-license-grace-period-days) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/LicenseController.php:113` |
| [`fluent_community/lock_timeout`](#fluent-community-lock-timeout) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/NamedLock.php:33` |
| [`fluent_community/max_execution_time`](#fluent-community-max-execution-time) | Core | 1 | `fluent-community/app/Functions/Utility.php:701` |
| [`fluent_community/max_per_page`](#fluent-community-max-per-page) | Core | 1 | `fluent-community/app/Services/Helper.php:299` |
| [`fluent_community/module_import_map`](#fluent-community-module-import-map) | Core | 1 | `fluent-community/app/Vite.php:167` |
| [`fluent_community/module_scripts`](#fluent-community-module-scripts) | Core | 1 | `fluent-community/app/Vite.php:200` |
| [`fluent_community/search/api_response`](#fluent-community-search-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SearchController.php:33` |
| [`fluent_community/search/providers`](#fluent-community-search-providers) | Core | 1 | `fluent-community/app/Services/Search/SearchService.php:25` |
| [`fluent_community/seo/pre_render`](#fluent-community-seo-pre-render) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/SeoSiteMap/AbstractPortalPreRenderer.php:74` |
| [`fluent_community/trusted_proxies`](#fluent-community-trusted-proxies) | Core | 1 | `fluent-community/app/Services/Helper.php:2239` |
| [`fluent_community/undeliverable_crm_contact_statuses`](#fluent-community-undeliverable-crm-contact-statuses) | Core | 2 | `fluent-community/app/Services/Helper.php:2771` |

<a id="fluent-community-pro-module-entries"></a>

## `fluent_community_pro/module_entries`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModuleAssetsHandler.php:164` | `[]` (array) |

### Example

```php
add_filter('fluent_community_pro/module_entries', function ($param1) {
    return $param1;
}, 10, 1);
```

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
| Core | `fluent-community/app/Models/Feed.php:403` | `$query` (mixed)<br>`$type` (mixed) |

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/LicenseController.php:113` | `15` (int) |

### Example

```php
add_filter('fluent_community/license_grace_period_days', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-lock-timeout"></a>

## `fluent_community/lock_timeout`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Seconds to wait for a lock another request holds.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$timeout` | `int` | — |
| 2 | `$name` | `string` | — |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/NamedLock.php:33` | `self::TIMEOUT` (mixed)<br>`$name` (mixed) |

### Example

```php
add_filter('fluent_community/lock_timeout', function ($timeout, $name) {
    return $timeout;
}, 10, 2);
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
| Core | `fluent-community/app/Functions/Utility.php:701` | `$maxRunTime` (mixed) |

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
- **Call sites:** 1
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
| Core | `fluent-community/app/Services/Helper.php:299` | `100` (int) |

### Example

```php
add_filter('fluent_community/max_per_page', function ($maxPerPage) {
    return $maxPerPage;
}, 10, 1);
```

<a id="fluent-community-module-import-map"></a>

## `fluent_community/module_import_map`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Bare module specifiers add-ons may import on FluentCommunity pages.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$imports` | `array` | Map of bare specifier => absolute URL. |
| 2 | `$runtime` | `string` | 'portal' or 'admin'. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Vite.php:167` | `$imports` (mixed)<br>`$runtime` (mixed) |

### Example

```php
add_filter('fluent_community/module_import_map', function ($imports, $runtime) {
    return $imports;
}, 10, 2);
```

<a id="fluent-community-module-scripts"></a>

## `fluent_community/module_scripts`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Module scripts of add-ons built on the shared runtime. the page appends ?ver= to every script.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$scripts` | `array` | Map of handle => ['url' => string]. No query string in the URL: |
| 2 | `$runtime` | `string` | 'portal' or 'admin'. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Vite.php:200` | `[]` (array)<br>`$runtime` (mixed) |

### Example

```php
add_filter('fluent_community/module_scripts', function ($scripts, $runtime) {
    return $scripts;
}, 10, 2);
```

<a id="fluent-community-search-api-response"></a>

## `fluent_community/search/api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the whole global search response, after every requested provider has run.

The filtered value is returned to the client as it stands, with no reshaping or validation. `results` is an object rather than an array, so that an empty result set serialises as `{}` — a filter that treats it as an array will fail. It also fires for a query too short to search, where the results are empty and no provider ran. Extra keys are safe but the portal ignores them, and the portal issues several requests per search session, so this is not once per user search.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | `results` (object keyed by type), `terms` and `execution_time` in seconds. |
| 2 | `$query` | `\FluentCommunity\App\Services\Search\SearchQuery` | The parsed query, with its trimmed text and extracted terms. |
| 3 | `$types` | `string[]` | The result types the request asked for. |

**Return:** `array` — returned to the client unchanged.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SearchController.php:33` | `array (3 keys: results, terms, execution_time)` (array)<br>`$query` (mixed)<br>`$types` (mixed) |

### Example

```php
add_filter('fluent_community/search/api_response', function ($response, $query, $types) {
    return $response;
}, 10, 3);
```

**Related:** [`fluent_community/search/providers`](#fluent-community-search-providers)

<a id="fluent-community-search-providers"></a>

## `fluent_community/search/providers`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Registers the result types global search can answer, each with the callable that answers it.

Keyed by the type name the client asks for, with a callable receiving the parsed query, the user or null, and the request arguments (`limit`, `page`, `space` and `sort`). Core registers posts, comments, people and spaces, and the course module adds courses through this same filter. Entries that are not callable are dropped silently, and returning anything that is not an array disables search altogether, core types included. Type names are key-sanitised before they are matched, so an uppercase key can never be reached. A provider runs only when the request asks for its type, and it must apply the caller's own visibility rules, because guests reach search on a community whose access level is public.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$providers` | `array` | Type name => callable(SearchQuery $query, User|null $user, array $args). |

**Return:** `array` — non-callable entries are dropped; a non-array disables search.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Search/SearchService.php:25` | `array (4 keys: posts, comments, people, …)` (array) |

### Example

```php
add_filter('fluent_community/search/providers', function ($providers) {
    return $providers;
}, 10, 1);
```

**Related:** [`fluent_community/search/api_response`](#fluent-community-search-api-response)

<a id="fluent-community-seo-pre-render"></a>

## `fluent_community/seo/pre_render`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/SeoSiteMap/AbstractPortalPreRenderer.php:74` | `true` (bool)<br>`$this->routeName()` (mixed) |

### Example

```php
add_filter('fluent_community/seo/pre_render', function ($param1, $routeName) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-trusted-proxies"></a>

## `fluent_community/trusted_proxies`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2239` | `[ '127.0.0.1' ]` (array) |

### Example

```php
add_filter('fluent_community/trusted_proxies', function ($param1) {
    return $param1;
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
| Core | `fluent-community/app/Services/Helper.php:2771` | `[ 'bounced', 'complained', 'spammed' ]` (array) |
| Core | `fluent-community/app/Services/Helper.php:2795` | `[ 'bounced', 'complained', 'spammed' ]` (array) |

### Example

```php
add_filter('fluent_community/undeliverable_crm_contact_statuses', function ($statuses) {
    return $statuses;
}, 10, 1);
```

