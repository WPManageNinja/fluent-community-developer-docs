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
- **When it fires:** Fires when an administrator asks to install the FluentPlayer plugin from the add-ons screen.

Guarded by an explicit Pro check before it fires — a free install gets an error telling it to upgrade, so unlike the messaging hook this one is genuinely unreachable without Pro. Pro answers it with a direct background install from the vendor's S3 bucket. No arguments.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:317` | No parameters |

### Example

```php
add_action('fluent_community/install_fluent_player_plugin', function () {
}, 10, 0);
```

**Related:** [`fluent_community/install_messaging_plugin`](#fluent-community-install-messaging-plugin) · [`fluent_community/fluentplayer_defaults_settings`](/hooks/filters/integrations#fluent-community-fluentplayer-defaults-settings)

<a id="fluent-community-install-messaging-plugin"></a>

## `fluent_community/install_messaging_plugin`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when an administrator asks to install the Fluent Messages plugin from the add-ons screen.

Fluent Messages is not hosted on wordpress.org, so there is no default installer — Pro answers this hook with a direct background install from the vendor's S3 bucket. On a free site nothing is listening and the endpoint reports success without having installed anything. The action carries no arguments and no result: it runs synchronously inside the request and the response is fixed either way.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:310` | No parameters |

### Example

```php
add_action('fluent_community/install_messaging_plugin', function () {
}, 10, 0);
```

**Related:** [`fluent_community/install_fluent_player_plugin`](#fluent-community-install-fluent-player-plugin)

<a id="fluent-community-paywall-added"></a>

## `fluent_community/paywall_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a FluentCart product is attached to a space or course as a paywall.

The product ID is already stored in the space's `settings.cart_product_ids` by the time it runs. Core answers by finding or creating the product's FluentCommunity integration feed so that a paid order grants access — which is why the paywall works at all. It requires FluentCart; without it the whole route group is absent.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The space or course being paywalled. |
| 2 | `$productId` | `int` | The FluentCart product ID. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:93` | `$space` (Space)<br>`$productId` (int) |

### Example

```php
add_action('fluent_community/paywall_added', function ($space, $productId) {
}, 10, 2);
```

**Related:** [`fluent_community/paywall_removed`](#fluent-community-paywall-removed) · [`fluent_community/product_integration_feed_created`](#fluent-community-product-integration-feed-created)

<a id="fluent-community-paywall-removed"></a>

## `fluent_community/paywall_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires after a FluentCart product is detached from a space or course.

The third argument is the raw request payload, and core reads one key from it: unless `revoke_access` is exactly `yes`, the core handler returns immediately and the product's integration feed keeps granting access to the space even though the paywall is gone. Detaching and revoking are separate decisions, in other words.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The space or course the paywall was removed from. |
| 2 | `$productId` | `int` | The FluentCart product ID. |
| 3 | `$requestData` | `array` | The full request payload; `revoke_access` decides whether the integration feed is updated. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:128` | `$space` (Space)<br>`$productId` (int)<br>`$request->all()` (array) |

### Example

```php
add_action('fluent_community/paywall_removed', function ($space, $productId, $requestData) {
}, 10, 3);
```

**Related:** [`fluent_community/paywall_added`](#fluent-community-paywall-added) · [`fluent_community/product_integration_feed_updated`](#fluent-community-product-integration-feed-updated)

<a id="fluent-community-product-integration-feed-created"></a>

## `fluent_community/product_integration_feed_created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires when a new FluentCommunity integration feed is created on a FluentCart product.

Only reached when the product had no enabled FluentCommunity integration listening for `order_paid_done`; if one already existed, the space is appended to it and `fluent_community/product_integration_feed_updated` fires instead. Note the first argument can be `null` when the record could not be created, and that the arguments are IDs, not models — and that the second is the product ID here, where the update hook passes the space ID.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$integrationId` | `int` | ID of the created `ProductMeta` integration row, or `null` if creation failed. |
| 2 | `$productId` | `int` | The FluentCart product the integration belongs to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:84` | `$communityIntegration->id ?? null` (int)<br>`$productId` (int) |

### Example

```php
add_action('fluent_community/product_integration_feed_created', function ($integrationId, $productId) {
}, 10, 2);
```

**Related:** [`fluent_community/product_integration_feed_updated`](#fluent-community-product-integration-feed-updated) · [`fluent_community/paywall_added`](#fluent-community-paywall-added)

<a id="fluent-community-product-integration-feed-updated"></a>

## `fluent_community/product_integration_feed_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Fires when a space or course is added to or removed from a product's integration feed.

Both directions use this one hook, and nothing in the arguments says which happened — check the integration's `space_ids` or `course_ids` if you need to know. Courses are tracked under `course_ids` and community spaces under `space_ids`, chosen by the space type. The second argument is the space ID, unlike the create hook which passes the product ID.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$integrationId` | `int` | ID of the `ProductMeta` integration row that was updated. |
| 2 | `$spaceId` | `int` | The space or course that was added or removed. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:57` | `$integration->id` (int)<br>`$space->id` (int) |
| Core | `fluent-community/Modules/Integrations/FluentCart/Paywalls.php:120` | `$integration->id` (int)<br>`$space->id` (int) |

### Example

```php
add_action('fluent_community/product_integration_feed_updated', function ($integrationId, $spaceId) {
}, 10, 2);
```

**Related:** [`fluent_community/product_integration_feed_created`](#fluent-community-product-integration-feed-created) · [`fluent_community/paywall_removed`](#fluent-community-paywall-removed)

