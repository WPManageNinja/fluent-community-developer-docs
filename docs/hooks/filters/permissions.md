---
title: Permissions Filters
description: Permissions filter hooks for FluentCommunity.
---

# Permissions Filters

1 unique filter hook currently map to this category, across 1 call site.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/super_admin_capability`](#fluent_communitysuper_admin_capability) | Core | 1 | `fluent-community/app/Services/Helper.php:133` |

<a id="fluent_communitysuper_admin_capability"></a>

## `fluent_community/super_admin_capability`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Super Admin Capability hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:133` | `'manage_options'` (mixed) |

### Example

```php
add_filter('fluent_community/super_admin_capability', function ($param1) {
    return $param1;
}, 10, 1);
```

