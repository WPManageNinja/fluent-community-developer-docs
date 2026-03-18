---
title: Settings Filters
description: Settings filter hooks for FluentCommunity.
---

# Settings Filters

18 unique filter hooks currently map to this category, across 19 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/block_editor_settings`](#fluent_communityblock_editor_settings) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:692` |
| [`fluent_community/color_config_api_response`](#fluent_communitycolor_config_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:516` |
| [`fluent_community/color_schmea_config`](#fluent_communitycolor_schmea_config) | Core | 1 | `fluent-community/app/Functions/Utility.php:1036` |
| [`fluent_community/crm_tagging_config_api_response`](#fluent_communitycrm_tagging_config_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:628` |
| [`fluent_community/customization_settings`](#fluent_communitycustomization_settings) | Core | 1 | `fluent-community/app/Functions/Utility.php:224` |
| [`fluent_community/customization_settings_api_response`](#fluent_communitycustomization_settings_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:437` |
| [`fluent_community/email_settings_api_response`](#fluent_communityemail_settings_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:160` |
| [`fluent_community/fluentplayer_defaults_settings`](#fluent_communityfluentplayer_defaults_settings) | Core | 1 | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:293` |
| [`fluent_community/general_settings_api_response`](#fluent_communitygeneral_settings_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:38` |
| [`fluent_community/get_welcome_banner_settings`](#fluent_communityget_welcome_banner_settings) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:332` |
| [`fluent_community/has_color_scheme`](#fluent_communityhas_color_scheme) | Core | 1 | `fluent-community/app/Services/Helper.php:128` |
| [`fluent_community/is_supported_theme`](#fluent_communityis_supported_theme) | Core | 2 | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:36` |
| [`fluent_community/onboarding_settings_api_response`](#fluent_communityonboarding_settings_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:418` |
| [`fluent_community/privacy_settings_api_response`](#fluent_communityprivacy_settings_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:493` |
| [`fluent_community/storage_settings_response`](#fluent_communitystorage_settings_response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:213` |
| [`fluent_community/suggested_colors`](#fluent_communitysuggested_colors) | Core | 1 | `fluent-community/app/Functions/Utility.php:1124` |
| [`fluent_community/template_slug`](#fluent_communitytemplate_slug) | Core | 1 | `fluent-community/Modules/Theming/TemplateLoader.php:75` |
| [`fluent_community/update_welcome_banner_settings`](#fluent_communityupdate_welcome_banner_settings) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:366` |

<a id="fluent_communityblock_editor_settings"></a>

## `fluent_community/block_editor_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Block Editor Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:692` | `$editor_settings` (mixed) |

### Example

```php
add_filter('fluent_community/block_editor_settings', function ($editor_settings) {
    return $editor_settings;
}, 10, 1);
```

<a id="fluent_communitycolor_config_api_response"></a>

## `fluent_community/color_config_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Color Config API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:516` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/color_config_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitycolor_schmea_config"></a>

## `fluent_community/color_schmea_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Color Schmea Config hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1036` | `[ 'light_schema' => 'default', 'dark_schema' => 'default', 'light_config' => [ 'body' => [], 'fcom_top_menu' => [], 'spaces' => [] ], 'dark_config' => [ 'body' => [], 'fcom_top_menu' => [], 'spaces' => [] ], 'version' => FLUENT_COMMUNITY_PLUGIN_VERSION ]` (array)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/color_schmea_config', function ($param1, $context) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitycrm_tagging_config_api_response"></a>

## `fluent_community/crm_tagging_config_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** CRM Tagging Config API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:628` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/crm_tagging_config_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitycustomization_settings"></a>

## `fluent_community/customization_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Customization Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:224` | `$settings` (mixed) |

### Example

```php
add_filter('fluent_community/customization_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

<a id="fluent_communitycustomization_settings_api_response"></a>

## `fluent_community/customization_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Customization Settings API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:437` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/customization_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityemail_settings_api_response"></a>

## `fluent_community/email_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Email Settings API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:160` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/email_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityfluentplayer_defaults_settings"></a>

## `fluent_community/fluentplayer_defaults_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fluentplayer Defaults Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentPlayer/Http/Controllers/MediaController.php:293` | `$settings` (mixed) |

### Example

```php
add_filter('fluent_community/fluentplayer_defaults_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

<a id="fluent_communitygeneral_settings_api_response"></a>

## `fluent_community/general_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** General Settings API Response hook emitted from the current call site.

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

<a id="fluent_communityget_welcome_banner_settings"></a>

## `fluent_community/get_welcome_banner_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Get Welcome Banner Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:332` | `Helper::getWelcomeBannerSettings()` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/get_welcome_banner_settings', function ($param1, $all) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communityhas_color_scheme"></a>

## `fluent_community/has_color_scheme`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Has Color Scheme hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:128` | `$status` (mixed) |

### Example

```php
add_filter('fluent_community/has_color_scheme', function ($status) {
    return $status;
}, 10, 1);
```

<a id="fluent_communityis_supported_theme"></a>

## `fluent_community/is_supported_theme`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Is Supported Theme hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:36` | `false` (mixed)<br>`$fluentCommunityThemeName` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:36` | `false` (mixed)<br>`$fluentCommunityThemeName` (mixed) |

### Example

```php
add_filter('fluent_community/is_supported_theme', function ($param1, $fluentCommunityThemeName) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communityonboarding_settings_api_response"></a>

## `fluent_community/onboarding_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Onboarding Settings API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:418` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/onboarding_settings_api_response', function ($data, $request) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityprivacy_settings_api_response"></a>

## `fluent_community/privacy_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Privacy Settings API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:493` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/privacy_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitystorage_settings_response"></a>

## `fluent_community/storage_settings_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Storage Settings Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:213` | `[ 'config' => $config ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/storage_settings_response', function ($config, $all) {
    return $config;
}, 10, 2);
```

<a id="fluent_communitysuggested_colors"></a>

## `fluent_community/suggested_colors`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Suggested Colors hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1124` | `$colors` (mixed) |

### Example

```php
add_filter('fluent_community/suggested_colors', function ($colors) {
    return $colors;
}, 10, 1);
```

<a id="fluent_communitytemplate_slug"></a>

## `fluent_community/template_slug`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Template Slug hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/TemplateLoader.php:75` | `$template_slug` (mixed) |

### Example

```php
add_filter('fluent_community/template_slug', function ($template_slug) {
    return $template_slug;
}, 10, 1);
```

<a id="fluent_communityupdate_welcome_banner_settings"></a>

## `fluent_community/update_welcome_banner_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Update Welcome Banner Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:366` | `$settings` (mixed) |

### Example

```php
add_filter('fluent_community/update_welcome_banner_settings', function ($settings) {
    return $settings;
}, 10, 1);
```

