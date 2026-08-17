---
title: Spaces Actions
description: Spaces action hooks for FluentCommunity.
---

# Spaces Actions

8 unique action hooks currently map to this category, across 16 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/space`](#fluent-community-space) | Core | 3 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:420` |
| [`fluent_community/space/before_delete`](#fluent-community-space-before-delete) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:567` |
| [`fluent_community/space/created`](#fluent-community-space-created) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:142` |
| [`fluent_community/space/deleted`](#fluent-community-space-deleted) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:584` |
| [`fluent_community/space/join_requested`](#fluent-community-space-join-requested) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:518` |
| [`fluent_community/space/joined`](#fluent-community-space-joined) | Core <span class="edition-note">(also fired by Pro)</span> | 6 | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:245` |
| [`fluent_community/space/update_meta_settings_{metaProvider}`](#fluent-community-space-update-meta-settings-metaProvider) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:372` |
| [`fluent_community/space/updated`](#fluent-community-space-updated) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:366` |

<a id="fluent-community-space"></a>

## `fluent_community/space`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:420` | `&$space` (Space) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:242` | `&$space` (Space) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:267` | `&$space` (Space) |

### Example

```php
add_action('fluent_community/space', function (&$space) {
}, 10, 1);
```

<a id="fluent-community-space-before-delete"></a>

## `fluent_community/space/before_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:567` | `$space` (Space) |

### Example

```php
add_action('fluent_community/space/before_delete', function ($space) {
}, 10, 1);
```

<a id="fluent-community-space-created"></a>

## `fluent_community/space/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:142` | `$space` (Space)<br>`$data` (mixed) |

### Example

```php
add_action('fluent_community/space/created', function ($space, $data) {
}, 10, 2);
```

<a id="fluent-community-space-deleted"></a>

## `fluent_community/space/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:584` | `$spaceId` (int) |

### Example

```php
add_action('fluent_community/space/deleted', function ($spaceId) {
}, 10, 1);
```

<a id="fluent-community-space-join-requested"></a>

## `fluent_community/space/join_requested`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:518` | `$space` (Space)<br>`$user->ID` (int)<br>`'self'` (string) |

### Example

```php
add_action('fluent_community/space/join_requested', function ($space, $id, $param3) {
}, 10, 3);
```

<a id="fluent-community-space-joined"></a>

## `fluent_community/space/joined`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 6

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:245` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:520` | `$space` (Space)<br>`$user->ID` (int)<br>`'self'` (string) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:651` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:669` | `$space` (Space)<br>`$userId` (int)<br>`'by_admin'` (string) |
| Core | `fluent-community/app/Services/Helper.php:1757` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1781` | `$space` (Space)<br>`$userId` (int)<br>`$by` (mixed)<br>`$created` (mixed) |

### Example

```php
add_action('fluent_community/space/joined', function ($space, $userId, $by, $created) {
}, 10, 4);
```

<a id="fluent-community-space-update-meta-settings-metaProvider"></a>

## `fluent_community/space/update_meta_settings_{metaProvider}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:372` | `$metaData` (mixed)<br>`$space` (Space) |

### Example

```php
add_action('fluent_community/space/update_meta_settings_{metaProvider}', function ($metaData, $space) {
}, 10, 2);
```

<a id="fluent-community-space-updated"></a>

## `fluent_community/space/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:366` | `$space` (Space)<br>`$data` (mixed) |
| Core | `fluent-community/app/Models/BaseSpace.php:370` | `$this` (mixed)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/space/updated', function ($space, $data) {
}, 10, 2);
```

