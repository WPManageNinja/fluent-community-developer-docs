---
title: "Admin Filters"
description: "Admin filter hooks for FluentCommunity."
---

# Admin Filters

1 unique filter hook currently map to this category, across 1 call site.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/show_wp_admin_link`](#fluent-community-show-wp-admin-link) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:167` |

<a id="fluent-community-show-wp-admin-link"></a>

## `fluent_community/show_wp_admin_link`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Hides the WordPress admin link in the portal sidebar.

Defaults to true and is tested for truthiness. It is read late, while the sidebar renders, and only for a site administrator on a site running Pro — on the free plugin the upgrade link takes that place and this filter never applies. Returning false hides the link only: it does not restrict access to the admin area, and the link WordPress itself adds in the other direction is separate.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$show` | `bool` | Whether to show the link. True by default. |

**Return:** `bool` — tested for truthiness.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:167` | `true` (bool) |

### Example

```php
add_filter('fluent_community/show_wp_admin_link', function ($show) {
    return $show;
}, 10, 1);
```

