---
title: "Miscellaneous Filters"
description: "Miscellaneous filter hooks for FluentCommunity."
---

# Miscellaneous Filters

21 unique filter hooks currently map to this category, across 23 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community_pro/module_entries`](#fluent-community-pro-module-entries) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/ModuleAssetsHandler.php:164` |
| [`fluent_community/action_query_key`](#fluent-community-action-query-key) | Core | 1 | `fluent-community/app/Services/Helper.php:400` |
| [`fluent_community/add_sitemap_provider`](#fluent-community-add-sitemap-provider) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:22` |
| [`fluent_community/can_use_custom_js`](#fluent-community-can-use-custom-js) | Core <span class="edition-note">(also fired by Pro)</span> | 2 | `fluent-community-pro/app/Services/ProHelper.php:162` |
| [`fluent_community/cloud_storage_strict`](#fluent-community-cloud-storage-strict) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/CloudStorage/StorageHelper.php:66` |
| [`fluent_community/cloudflare_ip_ranges`](#fluent-community-cloudflare-ip-ranges) | Core | 1 | `fluent-community/app/Services/Helper.php:2726` |
| [`fluent_community/custom_order_by`](#fluent-community-custom-order-by) | Core | 1 | `fluent-community/app/Models/Feed.php:403` |
| [`fluent_community/getting_started_steps`](#fluent-community-getting-started-steps) | Core | 1 | `fluent-community/app/Services/GettingStartedService.php:107` |
| [`fluent_community/license_grace_period_days`](#fluent-community-license-grace-period-days) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/LicenseController.php:113` |
| [`fluent_community/lock_timeout`](#fluent-community-lock-timeout) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/NamedLock.php:33` |
| [`fluent_community/max_execution_time`](#fluent-community-max-execution-time) | Core | 1 | `fluent-community/app/Functions/Utility.php:795` |
| [`fluent_community/max_per_page`](#fluent-community-max-per-page) | Core | 1 | `fluent-community/app/Services/Helper.php:311` |
| [`fluent_community/module_import_map`](#fluent-community-module-import-map) | Core | 1 | `fluent-community/app/Vite.php:167` |
| [`fluent_community/module_scripts`](#fluent-community-module-scripts) | Core | 1 | `fluent-community/app/Vite.php:200` |
| [`fluent_community/powered_by_text`](#fluent-community-powered-by-text) | Core | 1 | `fluent-community/app/Functions/Utility.php:521` |
| [`fluent_community/powered_by_url`](#fluent-community-powered-by-url) | Core | 1 | `fluent-community/app/Functions/Utility.php:548` |
| [`fluent_community/search/api_response`](#fluent-community-search-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SearchController.php:33` |
| [`fluent_community/search/providers`](#fluent-community-search-providers) | Core | 1 | `fluent-community/app/Services/Search/SearchService.php:25` |
| [`fluent_community/seo/pre_render`](#fluent-community-seo-pre-render) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/SeoSiteMap/AbstractPortalPreRenderer.php:74` |
| [`fluent_community/trusted_proxies`](#fluent-community-trusted-proxies) | Core | 1 | `fluent-community/app/Services/Helper.php:2671` |
| [`fluent_community/undeliverable_crm_contact_statuses`](#fluent-community-undeliverable-crm-contact-statuses) | Core | 2 | `fluent-community/app/Services/Helper.php:3231` |

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

<a id="fluent-community-action-query-key"></a>

## `fluent_community/action_query_key`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Renames the query argument the portal uses for its own actions.

The default is `fcom_action`. The returned key is validated rather than cast: it must be 3-32 characters of lowercase letters, digits and underscores, and must not collide with a WordPress query variable or one of the portal's own argument names. An invalid key is discarded in silence and the default is used. The `FLUENT_COMMUNITY_ACTION_KEY` constant wins outright — when it is defined and valid the filter is never applied. Renaming the key does not retire the old one: `fcom_action` keeps working alongside it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$key` | `string` | The query key. `fcom_action` by default. |

**Return:** `string` — ignored unless it passes validation.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:400` | `self::LEGACY_ACTION_KEY` (mixed) |

### Example

```php
add_filter('fluent_community/action_query_key', function ($key) {
    return $key;
}, 10, 1);
```

**Related:** [`fluent_community/portal_action_auth`](/hooks/actions/rendering#fluent-community-portal-action-auth)

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

<a id="fluent-community-can-use-custom-js"></a>

## `fluent_community/can_use_custom_js`

- **Type:** filter
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 2
- **When it fires:** Decides who may save, see and run the community's custom JavaScript.

The second argument says which of the three is being asked about: `save`, `ui` or `output`. Output defaults to true, while saving and seeing default to the caller holding `unfiltered_html`. The result is cast to bool. The three are independent, so a filter that returns one value for every context is answering a question it was not asked — and `save` is the dangerous one, because the stored script is printed into the portal footer unescaped for every visitor. The free plugin never applies this filter; only Pro's snippet settings and footer output do.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$allowed` | `bool` | Whether it is allowed. |
| 2 | `$context` | `string` | `save`, `ui` or `output`. |

**Return:** `bool` — cast from whatever is returned.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/ProHelper.php:162` | `$default` (mixed)<br>`$context` (mixed) |
| Core | `fluent-community/app/Functions/Utility.php:508` | `$default` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/can_use_custom_js', function ($allowed, $context) {
    return $allowed;
}, 10, 2);
```

<a id="fluent-community-cloud-storage-strict"></a>

## `fluent_community/cloud_storage_strict`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Decides whether an upload fails outright when cloud storage cannot take it.

Defaults to whatever the `FLUENT_COMMUNITY_CLOUD_STORAGE_STRICT` constant says, and the result is cast to bool. In strict mode a push that fails deletes the local file and returns an error instead of quietly keeping the file on the server. It is consulted twice: once per upload, and once at bootstrap while the plugins load. The bootstrap reading is the one to watch — with the cloud storage feature switched off and strict mode on, every upload is refused, and a filter registered on `init` is too late to change that branch.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$strict` | `bool` | Whether a failed push fails the upload. False by default. |

**Return:** `bool` — cast from whatever is returned.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/CloudStorage/StorageHelper.php:66` | `$strict` (mixed) |

### Example

```php
add_filter('fluent_community/cloud_storage_strict', function ($strict) {
    return $strict;
}, 10, 1);
```

**Related:** [`fluent_community/cloud_storage_upload_failed`](/hooks/actions/media#fluent-community-cloud-storage-upload-failed)

<a id="fluent-community-cloudflare-ip-ranges"></a>

## `fluent_community/cloudflare_ip_ranges`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Sets which address ranges are trusted to send Cloudflare's visitor-IP header.

This decides whether a client-supplied header is believed over the real connecting address, and the answer feeds rate limiting and audit records — so widening the list lets a visitor choose the IP the community sees. The filter receives the full published Cloudflare list, which means a careless append is really a replace; return the list you want in full. Entries must be CIDR blocks or exact addresses, and anything else never matches. Returning an empty array turns Cloudflare detection off and leaves the separate trusted-proxy path in charge.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$ranges` | `string[]` | CIDR blocks and addresses, IPv4 and IPv6. |

**Return:** `string[]` — cast to an array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2726` | `array (22 items)` (array) |

### Example

```php
add_filter('fluent_community/cloudflare_ip_ranges', function ($ranges) {
    return $ranges;
}, 10, 1);
```

**Related:** [`fluent_community/trusted_proxies`](#fluent-community-trusted-proxies)

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

<a id="fluent-community-getting-started-steps"></a>

## `fluent_community/getting_started_steps`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Adds, removes or reorders the steps on the admin getting-started checklist.

Everything returned is re-sanitised rather than escaped later, so markup in a title or description is stripped. A step with no key, no title or a duplicate key is dropped, unknown fields are dropped, and an action is kept only when it is a URL, a portal route or an event name in the expected shape — otherwise the step renders without a button. Returning something that is not an array empties the checklist. Core's own steps are detected from site data on every read and never stored, so a step hard-coded as done here stays done for good. Progress counts the required steps only, so an optional step never holds completion back.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$steps` | `array` | The checklist steps in order. |
| 2 | `$userId` | `int` | The administrator viewing the checklist. |

**Return:** `array` — re-sanitised; a non-array empties the list.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/GettingStartedService.php:107` | `$steps` (mixed)<br>`$userId` (int) |

### Example

```php
add_filter('fluent_community/getting_started_steps', function ($steps, $userId) {
    return $steps;
}, 10, 2);
```

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
| Core | `fluent-community/app/Functions/Utility.php:795` | `$maxRunTime` (mixed) |

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
| Core | `fluent-community/app/Services/Helper.php:311` | `100` (int) |

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

<a id="fluent-community-powered-by-text"></a>

## `fluent_community/powered_by_text`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Changes the "Powered by FluentCommunity" wording in the portal sidebar and in emails.

The second argument says which of the two is being rendered. The email default is deliberately left untranslated while the portal default is translated. Every call site escapes the result as plain text, so markup and a second link cannot be injected through it. In the portal it only applies to members: a site administrator sees a different block, so test the filter while logged out of an admin account. In an email run it fires once per email composed.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$text` | `string` | The wording. |
| 2 | `$context` | `string` | `portal` or `email`. |

**Return:** `string` — cast, then escaped as plain text.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:521` | `$default` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/powered_by_text', function ($text, $context) {
    return $text;
}, 10, 2);
```

**Related:** [`fluent_community/powered_by_url`](#fluent-community-powered-by-url)

<a id="fluent-community-powered-by-url"></a>

## `fluent_community/powered_by_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Changes where the "Powered by FluentCommunity" link points.

The URL arrives with its campaign arguments already applied, and those arguments are passed alongside it. Unlike the text filter there is no context argument, so the campaign source is the only way to tell the portal footer from an email footer. The site's own affiliate reference is already built into the URL, so replacing the URL outright drops that attribution. The result is escaped as a URL at every call site, and it does not touch the product links elsewhere in the plugin.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$url` | `string` | The link, with campaign arguments applied. |
| 2 | `$params` | `array` | The campaign arguments used. |

**Return:** `string` — cast, then escaped as a URL.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:548` | `add_query_arg($params, $url)` (mixed)<br>`$params` (mixed) |

### Example

```php
add_filter('fluent_community/powered_by_url', function ($url, $params) {
    return $url;
}, 10, 2);
```

**Related:** [`fluent_community/powered_by_text`](#fluent-community-powered-by-text)

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
| Core | `fluent-community/app/Services/Helper.php:2671` | `[ '127.0.0.1' ]` (array) |

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
| Core | `fluent-community/app/Services/Helper.php:3231` | `[ 'bounced', 'complained', 'spammed' ]` (array) |
| Core | `fluent-community/app/Services/Helper.php:3255` | `[ 'bounced', 'complained', 'spammed' ]` (array) |

### Example

```php
add_filter('fluent_community/undeliverable_crm_contact_statuses', function ($statuses) {
    return $statuses;
}, 10, 1);
```

