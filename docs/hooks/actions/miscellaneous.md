---
title: Miscellaneous Actions
description: Miscellaneous action hooks for FluentCommunity.
---

# Miscellaneous Actions

3 unique action hooks currently map to this category, across 3 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/migration/after_delete_current_data`](#fluent-community-migration-after-delete-current-data) | Core | 1 | `fluent-community/Modules/Migrations/Helpers/BPMigratorHelper.php:669` |
| [`fluent_community/migration/before_delete_current_data`](#fluent-community-migration-before-delete-current-data) | Core | 1 | `fluent-community/Modules/Migrations/Helpers/BPMigratorHelper.php:641` |
| [`fluent_community/update_verification_failed`](#fluent-community-update-verification-failed) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Services/PluginManager/UpdateVerifier.php:443` |

<a id="fluent-community-migration-after-delete-current-data"></a>

## `fluent_community/migration/after_delete_current_data`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Migrations/Helpers/BPMigratorHelper.php:669` | `$auditContext` (mixed) |

### Example

```php
add_action('fluent_community/migration/after_delete_current_data', function ($auditContext) {
}, 10, 1);
```

<a id="fluent-community-migration-before-delete-current-data"></a>

## `fluent_community/migration/before_delete_current_data`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Migrations/Helpers/BPMigratorHelper.php:641` | `$auditContext` (mixed) |

### Example

```php
add_action('fluent_community/migration/before_delete_current_data', function ($auditContext) {
}, 10, 1);
```

<a id="fluent-community-update-verification-failed"></a>

## `fluent_community/update_verification_failed`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/PluginManager/UpdateVerifier.php:443` | `$this->slug` (mixed)<br>`$code` (mixed)<br>`$message` (mixed) |

### Example

```php
add_action('fluent_community/update_verification_failed', function ($slug, $code, $message) {
}, 10, 3);
```

