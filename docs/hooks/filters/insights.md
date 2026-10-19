---
title: Insights Filters
description: Insights filter hooks for FluentCommunity.
---

# Insights Filters

9 unique filter hooks currently map to this category, across 9 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/insights/attention_items`](#fluent-community-insights-attention-items) | Core | 1 | `fluent-community/app/Services/Insights/Cards/Overview/AttentionCard.php:103` |
| [`fluent_community/insights/card_payload`](#fluent-community-insights-card-payload) | Core | 1 | `fluent-community/app/Services/Insights/Cards/AbstractCard.php:111` |
| [`fluent_community/insights/cards`](#fluent-community-insights-cards) | Core | 1 | `fluent-community/app/Services/Insights/CardRegistry.php:86` |
| [`fluent_community/insights/contributor_weights`](#fluent-community-insights-contributor-weights) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/Insights/Metrics/MemberMetrics.php:205` |
| [`fluent_community/insights/excluded_user_ids`](#fluent-community-insights-excluded-user-ids) | Core | 1 | `fluent-community/app/Services/Insights/Scope.php:62` |
| [`fluent_community/insights/level`](#fluent-community-insights-level) | Core | 1 | `fluent-community/app/Functions/Utility.php:1333` |
| [`fluent_community/insights/pages`](#fluent-community-insights-pages) | Core | 1 | `fluent-community/app/Services/Insights/CardRegistry.php:43` |
| [`fluent_community/insights/retention_days`](#fluent-community-insights-retention-days) | Core | 1 | `fluent-community/app/Services/Insights/Tracking/ActivityTracker.php:170` |
| [`fluent_community/insights/track_visit`](#fluent-community-insights-track-visit) | Core | 1 | `fluent-community/app/Services/Insights/Tracking/ActivityTracker.php:62` |

<a id="fluent-community-insights-attention-items"></a>

## `fluent_community/insights/attention_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the rows of the Overview page's "Needs attention" card.

Core contributes the queues it owns (such as members awaiting approval) and Pro appends open moderation reports. Each row carries `key`, `label`, `action`, `severity` (`crit`, `warn` or `info`), `hint`, `count`, `link` and a `preview` array. The result is re-indexed with `array_values()`, so string keys are only useful for replacing or unsetting an existing row inside the filter.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$items` | `array` | Rows, each `[key, label, action, severity, hint, count, link, preview[]]`. |
| 2 | `$scope` | `\FluentCommunity\App\Services\Insights\Scope` | The resolved space/course scope; row links should respect it. |

**Return:** `array` — the rows to show; keys are discarded.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Insights/Cards/Overview/AttentionCard.php:103` | `$items` (mixed)<br>`$scope` (mixed) |

### Example

```php
add_filter('fluent_community/insights/attention_items', function ($items, $scope) {
    return $items;
}, 10, 2);
```

**Related:** [`fluent_community/insights/cards`](#fluent-community-insights-cards)

<a id="fluent-community-insights-card-payload"></a>

## `fluent_community/insights/card_payload`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Last-mile filter on a single card's response, after it has been computed and cached.

Runs on every card payload, including one served from cache — `meta.cached` is already set by the time it fires, so it can tell a fresh computation from a replay. It receives the card object, the resolved `Range` and the `Scope` alongside the payload, which is enough to recompute or annotate a value without re-querying from scratch. Changes made here are not cached: they are reapplied on each request.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$payload` | `array` | The card's response, including its `meta` block. |
| 2 | `$card` | `\FluentCommunity\App\Services\Insights\Contracts\Card` | The card that produced it. |
| 3 | `$range` | `\FluentCommunity\App\Services\Insights\Range` | The resolved date range. |
| 4 | `$scope` | `\FluentCommunity\App\Services\Insights\Scope` | The resolved space/course scope. |

**Return:** `array` — the payload sent to the client.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Insights/Cards/AbstractCard.php:111` | `$payload` (mixed)<br>`$this` (mixed)<br>`$range` (mixed)<br>`$scope` (mixed) |

### Example

```php
add_filter('fluent_community/insights/card_payload', function ($payload, $card, $range, $scope) {
    return $payload;
}, 10, 4);
```

**Related:** [`fluent_community/insights/cards`](#fluent-community-insights-cards)

<a id="fluent-community-insights-cards"></a>

## `fluent_community/insights/cards`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Registers or removes Insights cards — the extension point Pro itself uses.

Receives the core cards (Overview, plus the Course module's own) and, on a `basic` install, the locked stubs standing in for the Pro cards. Each entry is a `Card` object, not an array: it declares its own key, page, what it supports (compare, export, a space or course scope, sorting) and how to build its payload. Cards are then indexed by key, so returning a card whose key already exists replaces it. A card assigned to a page that does not exist is not rendered anywhere.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$cards` | `\FluentCommunity\App\Services\Insights\Contracts\Card[]` | The registered card objects. |

**Return:** `Card[]` — the cards to register; later keys win over earlier ones.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Insights/CardRegistry.php:86` | `$cards` (mixed) |

### Example

```php
add_filter('fluent_community/insights/cards', function ($cards) {
    return $cards;
}, 10, 1);
```

**Related:** [`fluent_community/insights/pages`](#fluent-community-insights-pages) · [`fluent_community/insights/card_payload`](#fluent-community-insights-card-payload)

<a id="fluent-community-insights-contributor-weights"></a>

## `fluent_community/insights/contributor_weights`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the per-action weights behind the top-contributors score.

Defaults to posts 3, comments 2, reactions 1 — a post counts for three reactions. The returned array is merged over those defaults and every value is cast to float, so a partial array only changes the keys it names and an unknown key is ignored. Weights decide the ranking only; the underlying counts are unaffected.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$weights` | `array` | `posts`, `comments` and `reactions` weights. Defaults to 3, 2 and 1. |

**Return:** `array` — merged over the defaults and cast to float.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Insights/Metrics/MemberMetrics.php:205` | `['posts' => 3, 'comments' => 2, 'reactions' => 1]` (array) |

### Example

```php
add_filter('fluent_community/insights/contributor_weights', function ($weights) {
    return $weights;
}, 10, 1);
```

**Related:** [`fluent_community/insights/cards`](#fluent-community-insights-cards)

<a id="fluent-community-insights-excluded-user-ids"></a>

## `fluent_community/insights/excluded_user_ids`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the members left out of every Insights metric.

Seeded from the leaderboard's exclusion list (`fcom_leaderboard_excluded_user_ids`), so an install that already hides staff from the leaderboard hides them from reporting too. The IDs are normalised to integers. Unlike `fluent_community/insights/track_visit`, this is applied at read time and across all metrics, so changing it reshapes past ranges as well.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$userIds` | `int[]` | Member IDs to exclude. Defaults to the leaderboard exclusion option. |

**Return:** `int[]` — the IDs to exclude; values are cast to integers.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Insights/Scope.php:62` | `is_array($leaderboardExcluded) ? $leaderboardExcluded : []` (array) |

### Example

```php
add_filter('fluent_community/insights/excluded_user_ids', function ($userIds) {
    return $userIds;
}, 10, 1);
```

**Related:** [`fluent_community/insights/track_visit`](#fluent-community-insights-track-visit)

<a id="fluent-community-insights-level"></a>

## `fluent_community/insights/level`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters how much of Insights an install gets: `basic` (free) or `full` (Pro).

Core returns `basic`, which registers the Overview page and, when the course module is on, Courses. Pro returns `full`, which unlocks Engagement, Members, Spaces, Content and Moderation. Anything other than the exact string `full` is treated as `basic`, so a boolean or a typo silently downgrades the install. At `basic` the Pro pages are still listed, filled with locked card stubs so the UI can show what an upgrade adds.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$level` | `string` | `basic` or `full`. Defaults to `basic`. |

**Return:** `string` — compared strictly against `full`; every other value means `basic`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1333` | `'basic'` (string) |

### Example

```php
add_filter('fluent_community/insights/level', function ($level) {
    return $level;
}, 10, 1);
```

**Related:** [`fluent_community/insights/pages`](#fluent-community-insights-pages) · [`fluent_community/insights/cards`](#fluent-community-insights-cards)

<a id="fluent-community-insights-pages"></a>

## `fluent_community/insights/pages`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the Insights pages, before their cards are resolved.

Keyed by page slug, each entry carrying `title`, `tier` (`free` or `pro`), `order` and an optional `available` flag — Courses and Moderation set `available` from their feature toggles, so a disabled feature drops its page without removing the registration. A key that is not `^[a-z0-9_-]+$`, or an entry with no title, is discarded. Add a page here and register its cards on `fluent_community/insights/cards` with a matching page key, otherwise the page renders empty.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$pages` | `array` | Page slug => `[title, tier, order, available]`. |

**Return:** `array` — the page map; invalid keys and untitled entries are dropped.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Insights/CardRegistry.php:43` | `$pages` (mixed) |

### Example

```php
add_filter('fluent_community/insights/pages', function ($pages) {
    return $pages;
}, 10, 1);
```

**Related:** [`fluent_community/insights/cards`](#fluent-community-insights-cards) · [`fluent_community/insights/level`](#fluent-community-insights-level)

<a id="fluent-community-insights-retention-days"></a>

## `fluent_community/insights/retention_days`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters how long daily activity rows are kept before being pruned.

Defaults to 761 days (about 25 months) so a year-over-year comparison of the last 12 months still has both sides of the data. The value is cast to int; anything below 1 disables pruning entirely and keeps every row. Lowering it deletes history that cannot be rebuilt, since the daily table is the only record of visits.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$days` | `int` | Days of history to keep. Defaults to 761. |

**Return:** `int` — days to keep; a value below 1 means keep everything.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Insights/Tracking/ActivityTracker.php:170` | `761` (int) |

### Example

```php
add_filter('fluent_community/insights/retention_days', function ($days) {
    return $days;
}, 10, 1);
```

**Related:** [`fluent_community/insights/track_visit`](#fluent-community-insights-track-visit)

<a id="fluent-community-insights-track-visit"></a>

## `fluent_community/insights/track_visit`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Return false to stop a member's visit being recorded.

Guards the only Insights metric that cannot be backfilled: visits are not stored anywhere else in FluentCommunity, so a visit suppressed here is invisible to every past-range report forever after. Intended for privacy-strict sites or for excluding staff accounts. It gates the write only — it does not hide already-recorded visits, which `fluent_community/insights/excluded_user_ids` does.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$track` | `bool` | Whether to record the visit. Defaults to true. |
| 2 | `$userId` | `int` | The member whose visit is being recorded. |

**Return:** `bool` — false skips the increment.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Insights/Tracking/ActivityTracker.php:62` | `true` (bool)<br>`(int)$userId` (int) |

### Example

```php
add_filter('fluent_community/insights/track_visit', function ($track, $userId) {
    return $track;
}, 10, 2);
```

**Related:** [`fluent_community/insights/retention_days`](#fluent-community-insights-retention-days) · [`fluent_community/insights/excluded_user_ids`](#fluent-community-insights-excluded-user-ids)

