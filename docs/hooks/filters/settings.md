---
title: Settings Filters
description: Settings filter hooks for FluentCommunity.
---

# Settings Filters

22 unique filter hooks currently map to this category, across 22 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/{scope}_color`](#fluent-community-scope-color) | Core | 1 | `fluent-community/app/Functions/Utility.php:1142` |
| [`fluent_community/color_config_api_response`](#fluent-community-color-config-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:418` |
| [`fluent_community/color_schmea_config`](#fluent-community-color-schmea-config) | Core | 1 | `fluent-community/app/Functions/Utility.php:1086` |
| [`fluent_community/crm_tagging_config_api_response`](#fluent-community-crm-tagging-config-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:530` |
| [`fluent_community/customization_settings`](#fluent-community-customization-settings) | Core | 1 | `fluent-community/app/Functions/Utility.php:230` |
| [`fluent_community/customization_settings_api_response`](#fluent-community-customization-settings-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:333` |
| [`fluent_community/email_settings_api_response`](#fluent-community-email-settings-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:161` |
| [`fluent_community/features_api_response`](#fluent-community-features-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:30` |
| [`fluent_community/features/analytics`](#fluent-community-features-analytics) | Core | 1 | `fluent-community/app/Functions/Utility.php:1226` |
| [`fluent_community/general_settings_api_response`](#fluent-community-general-settings-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:38` |
| [`fluent_community/has_color_scheme`](#fluent-community-has-color-scheme) | Core | 1 | `fluent-community/app/Services/Helper.php:151` |
| [`fluent_community/onboarding_settings_api_response`](#fluent-community-onboarding-settings-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:409` |
| [`fluent_community/portal_slug`](#fluent-community-portal-slug) | Core | 1 | `fluent-community/app/Services/Helper.php:101` |
| [`fluent_community/privacy_settings_api_response`](#fluent-community-privacy-settings-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:395` |
| [`fluent_community/pwa/background_color`](#fluent-community-pwa-background-color) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:252` |
| [`fluent_community/pwa/description`](#fluent-community-pwa-description) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:118` |
| [`fluent_community/pwa/install_button_icon`](#fluent-community-pwa-install-button-icon) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:198` |
| [`fluent_community/pwa/install_button_text`](#fluent-community-pwa-install-button-text) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:175` |
| [`fluent_community/pwa/orientation`](#fluent-community-pwa-orientation) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:134` |
| [`fluent_community/pwa/theme_color`](#fluent-community-pwa-theme-color) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:226` |
| [`fluent_community/storage_settings_response`](#fluent-community-storage-settings-response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:214` |
| [`fluent_community/suggested_colors`](#fluent-community-suggested-colors) | Core | 1 | `fluent-community/app/Functions/Utility.php:1196` |

<a id="fluent-community-scope-color"></a>

## `fluent_community/{scope}_color`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1142` | `$color` (mixed) |

### Example

```php
add_filter('fluent_community/{scope}_color', function ($color) {
    return $color;
}, 10, 1);
```

<a id="fluent-community-color-config-api-response"></a>

## `fluent_community/color_config_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:418` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/color_config_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-color-schmea-config"></a>

## `fluent_community/color_schmea_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1086` | `array (5 keys: light_schema, dark_schema, light_config, …)` (array)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/color_schmea_config', function ($param1, $context) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-crm-tagging-config-api-response"></a>

## `fluent_community/crm_tagging_config_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:530` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/crm_tagging_config_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-customization-settings"></a>

## `fluent_community/customization_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:230` | `$settings` (mixed) |

### Example

```php
add_filter('fluent_community/customization_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

<a id="fluent-community-customization-settings-api-response"></a>

## `fluent_community/customization_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:333` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/customization_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-email-settings-api-response"></a>

## `fluent_community/email_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:161` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/email_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-features-api-response"></a>

## `fluent_community/features_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:30` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/features_api_response', function ($data, $request) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-features-analytics"></a>

## `fluent_community/features/analytics`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1226` | `$defaultSettings` (mixed) |

### Example

```php
add_filter('fluent_community/features/analytics', function ($defaultSettings) {
    return $defaultSettings;
}, 10, 1);
```

<a id="fluent-community-general-settings-api-response"></a>

## `fluent_community/general_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:38` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/general_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-has-color-scheme"></a>

## `fluent_community/has_color_scheme`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:151` | `$status` (mixed) |

### Example

```php
add_filter('fluent_community/has_color_scheme', function ($status) {
    return $status;
}, 10, 1);
```

<a id="fluent-community-onboarding-settings-api-response"></a>

## `fluent_community/onboarding_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:409` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/onboarding_settings_api_response', function ($data, $request) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-portal-slug"></a>

## `fluent_community/portal_slug`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:101` | `$slug` (mixed) |

### Example

```php
add_filter('fluent_community/portal_slug', function ($slug) {
    return $slug;
}, 10, 1);
```

<a id="fluent-community-privacy-settings-api-response"></a>

## `fluent_community/privacy_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:395` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/privacy_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-pwa-background-color"></a>

## `fluent_community/pwa/background_color`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:252` | `$color` (mixed)<br>`$mode` (mixed) |

### Example

```php
add_filter('fluent_community/pwa/background_color', function ($color, $mode) {
    return $color;
}, 10, 2);
```

<a id="fluent-community-pwa-description"></a>

## `fluent_community/pwa/description`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:118` | `$description` (mixed) |

### Example

```php
add_filter('fluent_community/pwa/description', function ($description) {
    return $description;
}, 10, 1);
```

<a id="fluent-community-pwa-install-button-icon"></a>

## `fluent_community/pwa/install_button_icon`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:198` | `$default` (mixed) |

### Example

```php
add_filter('fluent_community/pwa/install_button_icon', function ($default) {
    return $default;
}, 10, 1);
```

<a id="fluent-community-pwa-install-button-text"></a>

## `fluent_community/pwa/install_button_text`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:175` | `__('Install App', 'fluent-community-pro')` (mixed) |

### Example

```php
add_filter('fluent_community/pwa/install_button_text', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-pwa-orientation"></a>

## `fluent_community/pwa/orientation`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:134` | `'any'` (string) |

### Example

```php
add_filter('fluent_community/pwa/orientation', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-pwa-theme-color"></a>

## `fluent_community/pwa/theme_color`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:226` | `$color` (mixed)<br>`$mode` (mixed) |

### Example

```php
add_filter('fluent_community/pwa/theme_color', function ($color, $mode) {
    return $color;
}, 10, 2);
```

<a id="fluent-community-storage-settings-response"></a>

## `fluent_community/storage_settings_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:214` | `[ 'config' => $config ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/storage_settings_response', function ($config, $all) {
    return $config;
}, 10, 2);
```

<a id="fluent-community-suggested-colors"></a>

## `fluent_community/suggested_colors`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1196` | `$colors` (mixed) |

### Example

```php
add_filter('fluent_community/suggested_colors', function ($colors) {
    return $colors;
}, 10, 1);
```

