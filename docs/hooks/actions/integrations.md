---
title: Integrations Actions
description: Integrations action hooks for FluentCommunity.
---

# Integrations Actions

6 unique action hooks currently map to this category, across 7 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/install_fluent_player_plugin`](#fluent-community-install-fluent-player-plugin) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:317` |
| [`fluent_community/install_messaging_plugin`](#fluent-community-install-messaging-plugin) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:310` |
| [`fluent_community/paywall_added`](#fluent-community-paywall-added) | Core | 1 | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:93` |
| [`fluent_community/paywall_removed`](#fluent-community-paywall-removed) | Core | 1 | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:128` |
| [`fluent_community/product_integration_feed_created`](#fluent-community-product-integration-feed-created) | Core | 1 | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:84` |
| [`fluent_community/product_integration_feed_updated`](#fluent-community-product-integration-feed-updated) | Core | 2 | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:57` |

<a id="fluent-community-install-fluent-player-plugin"></a>

## `fluent_community/install_fluent_player_plugin`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:317` | No parameters |

### Example

```php
add_action('fluent_community/install_fluent_player_plugin', function () {
}, 10, 0);
```

<a id="fluent-community-install-messaging-plugin"></a>

## `fluent_community/install_messaging_plugin`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:310` | No parameters |

### Example

```php
add_action('fluent_community/install_messaging_plugin', function () {
}, 10, 0);
```

<a id="fluent-community-paywall-added"></a>

## `fluent_community/paywall_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:93` | `$space` (Space)<br>`$productId` (int) |

### Example

```php
add_action('fluent_community/paywall_added', function ($space, $productId) {
}, 10, 2);
```

<a id="fluent-community-paywall-removed"></a>

## `fluent_community/paywall_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:128` | `$space` (Space)<br>`$productId` (int)<br>`$request->all()` (array) |

### Example

```php
add_action('fluent_community/paywall_removed', function ($space, $productId, $all) {
}, 10, 3);
```

<a id="fluent-community-product-integration-feed-created"></a>

## `fluent_community/product_integration_feed_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:84` | `$communityIntegration->id ?? null` (int)<br>`$productId` (int) |

### Example

```php
add_action('fluent_community/product_integration_feed_created', function ($id, $productId) {
}, 10, 2);
```

<a id="fluent-community-product-integration-feed-updated"></a>

## `fluent_community/product_integration_feed_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:57` | `$integration->id` (int)<br>`$space->id` (int) |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:120` | `$integration->id` (int)<br>`$space->id` (int) |

### Example

```php
add_action('fluent_community/product_integration_feed_updated', function ($id, $id_2) {
}, 10, 2);
```

