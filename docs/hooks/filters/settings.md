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
- **When it fires:** Filters the URL segment the community portal is served from.

Runs after the stored setting and the `FLUENT_COMMUNITY_PORTAL_SLUG` constant have both been applied, so a callback overrides even the constant. An empty string puts the portal at the site root, which is how Pro's shortcode renderer temporarily relocates it. The slug feeds both rewrite rules and every generated portal URL, so changing it at runtime without flushing rewrites will produce links that do not resolve.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$slug` | `string` | The portal slug, `portal` by default. |

**Return:** `string` — the slug, without leading or trailing slashes. An empty string serves the portal from the site root.

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
- **When it fires:** Filters the PWA splash screen background color for one color mode.

An admin-set background color in the PWA settings wins over the per-mode portal body color; the manifest carries a single static value, so an explicit choice applies to every mode. Falls back to #ffffff (light) / #2B2E33 (dark).

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$color` | `string` | Hex color for this mode. |
| 2 | `$mode` | `string` | Either "light" or "dark". |

**Return:** A hex color string.

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

**Related:** [`fluent_community/pwa/theme_color`](#fluent-community-pwa-theme-color)

<a id="fluent-community-pwa-description"></a>

## `fluent_community/pwa/description`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the description field of the PWA web app manifest.

Defaults to the site tagline from get_bloginfo('description'). The result is cast to string.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$description` | `string` | Manifest description, the site tagline by default. |

**Return:** The manifest description string.

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

**Related:** [`fluent_community/pwa/orientation`](#fluent-community-pwa-orientation) · [`fluent_community/pwa/theme_color`](#fluent-community-pwa-theme-color)

<a id="fluent-community-pwa-install-button-icon"></a>

## `fluent_community/pwa/install_button_icon`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the inline SVG glyph on the portal install entry.

The shipped default is returned untouched; anything a callback returns is treated as untrusted and passed through CustomSanitizer::sanitizeSvg(). That sanitizer's allowlist drops stroke-linecap, stroke-linejoin and aria-hidden, so a replacement glyph should not rely on them. Use stroke="currentColor" so the icon follows the portal color mode.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$icon` | `string` | Inline SVG markup for the install glyph. |

**Return:** Inline SVG markup. It will be sanitized unless it is byte-identical to the default.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:198` | `$default` (mixed) |

### Example

```php
add_filter('fluent_community/pwa/install_button_icon', function ($icon) {
    return $icon;
}, 10, 1);
```

**Related:** [`fluent_community/pwa/install_button_text`](#fluent-community-pwa-install-button-text)

<a id="fluent-community-pwa-install-button-text"></a>

## `fluent_community/pwa/install_button_text`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the label on the portal "Install App" entry.

Applies to the in-portal install entry only, not to the manifest. The result is cast to string.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$buttonText` | `string` | Button label, "Install App" by default. |

**Return:** The button label string.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:175` | `__('Install App', 'fluent-community-pro')` (mixed) |

### Example

```php
add_filter('fluent_community/pwa/install_button_text', function ($buttonText) {
    return $buttonText;
}, 10, 1);
```

**Related:** [`fluent_community/pwa/install_button_icon`](#fluent-community-pwa-install-button-icon)

<a id="fluent-community-pwa-orientation"></a>

## `fluent_community/pwa/orientation`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the screen orientation lock declared in the PWA manifest.

Defaults to "any" deliberately — course lessons and video play landscape, so a portrait lock would trap those screens. The return value is validated against the manifest spec list (any, natural, portrait, landscape, portrait-primary, portrait-secondary, landscape-primary, landscape-secondary) and anything else silently falls back to "any".

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$orientation` | `string` | Orientation lock, "any" by default. |

**Return:** One of the eight allowed manifest orientation values; any other string is ignored.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/Pwa/PwaHelper.php:134` | `'any'` (string) |

### Example

```php
add_filter('fluent_community/pwa/orientation', function ($orientation) {
    return $orientation;
}, 10, 1);
```

**Related:** [`fluent_community/pwa/description`](#fluent-community-pwa-description)

<a id="fluent-community-pwa-theme-color"></a>

## `fluent_community/pwa/theme_color`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters the PWA theme (title bar / browser chrome) color for one color mode.

Runs once per mode. The default follows the portal top-bar background for the active color schema rather than the brand button color, so the installed app window blends into the portal header. Falls back to #ffffff (light) / #2B2E33 (dark) when no schema color resolves.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$color` | `string` | Hex color for this mode. |
| 2 | `$mode` | `string` | Either "light" or "dark". |

**Return:** A hex color string.

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

**Related:** [`fluent_community/pwa/background_color`](#fluent-community-pwa-background-color)

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
add_filter('fluent_community/storage_settings_response', function ($param1, $all) {
    return $param1;
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

