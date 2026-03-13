---
title: Reactions Actions
description: Reactions action hooks for FluentCommunity.
---

# Reactions Actions

1 unique action hook currently map to this category, across 1 call site.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/section/reactions_count_updated`](#fluent_communitysectionreactions_count_updated) | Core | 1 | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:754` |

<a id="fluent_communitysectionreactions_count_updated"></a>

## `fluent_community/section/reactions_count_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Section/Reactions Count Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Http/Controllers/CourseAdminController.php:754` | `$course` (mixed)<br>`$topic` (mixed) |

### Example

```php
add_action('fluent_community/section/reactions_count_updated', function ($course, $topic) {
}, 10, 2);
```

