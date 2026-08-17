---
title: Settings Actions
description: Settings action hooks for FluentCommunity.
---

# Settings Actions

1 unique action hook currently map to this category, across 1 call site.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/recache_color_schema`](#fluent-community-recache-color-schema) | Core | 1 | `fluent-community/app/Functions/Utility.php:1109` |

<a id="fluent-community-recache-color-schema"></a>

## `fluent_community/recache_color_schema`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1109` | No parameters |

### Example

```php
add_action('fluent_community/recache_color_schema', function () {
}, 10, 0);
```

