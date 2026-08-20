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
- **When it fires:** Dynamic filter for a single resolved colour from the active colour scheme.

Two scopes are used in the shipped code: `theme`, which resolves the primary button colour and becomes the `<meta name="theme-color">` value, and `theme_button_text`, the primary button text colour. Any other scope passed to `Utility::getThemeColor()` is treated as a direct key into the light skin's body selectors. The value is memoised in a static per scope, so the filter runs at most once per scope per request and later callbacks may not be reached. Only the light scheme is consulted — there is no dark variant of this hook.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$color` | `string` | The resolved colour, or the scope's default if the skin does not define it. |

**Return:** `string` — a CSS colour value. It is escaped as an attribute where it is printed.

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

**Related:** [`fluent_community/color_schmea_config`](#fluent-community-color-schmea-config) · [`fluent_community/suggested_colors`](#fluent-community-suggested-colors)

<a id="fluent-community-color-config-api-response"></a>

## `fluent_community/color_config_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the payload the colour customiser loads its state from.

`config` is `fluent_community/color_schmea_config` resolved with the `edit` context, and `schemas` is the full set of built-in light and dark skins with every selector and property, which is what the customiser renders its controls from. Adding a skin here makes it selectable but does not make it generate CSS — that comes from `Utility::getColorSchemas()`, which this payload merely exposes.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `config` and `schemas`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:418` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/color_config_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/color_schmea_config`](#fluent-community-color-schmea-config) · [`fluent_community/suggested_colors`](#fluent-community-suggested-colors)

<a id="fluent-community-color-schmea-config"></a>

## `fluent_community/color_schmea_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the stored colour scheme selection and per-selector overrides.

The hook name contains a typo — "schmea" — that has to be reproduced exactly. Core supplies only the empty default: it is Pro that merges the saved `portal_color_config` option over it, so on a free install the portal always renders the default light and dark skins. A `cached_css` key, if present, short-circuits CSS generation entirely, and a `version` that no longer matches the plugin version triggers `fluent_community/recache_color_schema`. `$context` is `view` on every render path and `edit` only for the customiser endpoint.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$config` | `array` | `light_schema`, `dark_schema`, `light_config`, `dark_config`, `version`, and optionally `cached_css`. |
| 2 | `$context` | `string` | `view` when rendering, `edit` when the customiser is loading the config. |

**Return:** `array` — the colour configuration. Returning a `cached_css` string bypasses generation.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1086` | `array (5 keys: light_schema, dark_schema, light_config, …)` (array)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/color_schmea_config', function ($config, $context) {
    return $config;
}, 10, 2);
```

**Related:** [`fluent_community/recache_color_schema`](/hooks/actions/settings#fluent-community-recache-color-schema) · [`fluent_community/color_config_api_response`](#fluent-community-color-config-api-response)

<a id="fluent-community-crm-tagging-config-api-response"></a>

## `fluent_community/crm_tagging_config_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the FluentCRM tagging configuration screen payload.

`crm_tags` is an empty array when FluentCRM is not installed, and `has_fluentcrm` tells the form which case it is in. `settings.tagging_maps` and `settings.linked_maps` are cast to empty objects when they have no entries, so that they serialise as `{}` rather than `[]` and the Vue form can assign into them — preserve that if you rebuild them.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `settings`, `spaceGroups`, `crm_tags`, `has_fluentcrm`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:530` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/crm_tagging_config_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-customization-settings"></a>

## `fluent_community/customization_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the portal customisation settings — layout, header, sidebar and post-composer preferences.

Applied after the stored values are merged over the defaults, but before the free-edition lockdown: on a site without Pro, `show_powered_by`, `affiliate_id`, `rich_post_layout`, `member_list_layout` and `enable_sidebar_toggle` are overwritten immediately afterwards, so filtering those five has no effect there. The result is held in a static for the rest of the request, meaning the filter runs once and a callback registered late may never be reached.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | Customisation values such as `dark_mode`, `default_theme_mode`, `fixed_page_header`, `fixed_sidebar`, `default_feed_layout`, `max_media_per_post`, `post_title_pref`. |

**Return:** `array` — the settings map; individual keys are read with `Arr::get()`, so a missing key reads as null.

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

**Related:** [`fluent_community/customization_settings_api_response`](#fluent-community-customization-settings-api-response) · [`fluent_community/has_color_scheme`](#fluent-community-has-color-scheme)

<a id="fluent-community-customization-settings-api-response"></a>

## `fluent_community/customization_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the customisation settings as returned to the admin settings screen.

A read-only view of what `fluent_community/customization_settings` produced, including the free-edition overrides — so what the administrator sees here is what the portal will actually use. Filtering it changes the settings form, not the behaviour; the save endpoint validates its own field list either way.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `settings` key. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:333` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/customization_settings_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/customization_settings`](#fluent-community-customization-settings)

<a id="fluent-community-email-settings-api-response"></a>

## `fluent_community/email_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the email notification settings screen payload.

When no email logo has been set, the general site logo is added as `global_logo` so the form can preview a fallback — the two are distinct keys and only `logo` is saved. Note that changing the digest day or time through the save endpoint unschedules every pending digest run, so a callback that rewrites those values has a side effect on Action Scheduler.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `email_settings` key. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:161` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/email_settings_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/verified_email_senders`](/hooks/filters/notifications#fluent-community-verified-email-senders)

<a id="fluent-community-features-api-response"></a>

## `fluent_community/features_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the feature-flag screen payload.

The Giphy API key is replaced with the placeholder `FCOM_ENCRYPTED_DATA_KEY` before the filter runs, so the real key never reaches the client — do not put it back. `addOns` describes the modules that can be switched on, several of which need Pro. Turning a flag off here only changes the form; the modules themselves read `Utility::getFeaturesConfig()` at bootstrap.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `features` (flag map, with the Giphy key masked) and `addOns`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:30` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/features_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/features/analytics`](#fluent-community-features-analytics)

<a id="fluent-community-features-analytics"></a>

## `fluent_community/features/analytics`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the community analytics feature is available.

The default is `['status' => 'no']` and Pro flips `status` to `yes`, so analytics is effectively a Pro feature that free installs can unlock by returning `yes`. Only the `status` key is read, and it is compared with a strict `=== 'yes'` — a boolean `true` leaves the feature switched off. The result surfaces to the front end as `features.has_analytics`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | Analytics configuration; only `status` is consumed. |

**Return:** `array` — must be an array with a `status` key; the comparison is strictly against the string `yes`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1226` | `$defaultSettings` (mixed) |

### Example

```php
add_filter('fluent_community/features/analytics', function ($settings) {
    return $settings;
}, 10, 1);
```

**Related:** [`fluent_community/features_api_response`](#fluent-community-features-api-response)

<a id="fluent-community-general-settings-api-response"></a>

## `fluent_community/general_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the general settings screen payload.

The settings are re-read from the database rather than from cache. `user_roles` is every WordPress role except `administrator`, which is removed deliberately because administrators always have access and are not selectable as a restricted role. `users_can_register` reflects the WordPress option rather than the plugin's own registration setting.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `settings`, `user_roles`, `users_can_register`, `user_registration_enable_url`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:38` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/general_settings_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/auth/registration_enabled`](/hooks/filters/auth#fluent-community-auth-registration-enabled)

<a id="fluent-community-has-color-scheme"></a>

## `fluent_community/has_color_scheme`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the light/dark colour scheme is active for the current render.

The base value is the `dark_mode` customisation setting. It controls three things at once: the pre-paint theme script in `<head>`, the dark-mode toggle in the header, and the `has_color_scheme` flag handed to the sidebar and the front-end scripts. Core turns it off with `__return_false` for the whole auth page, so the login screen never renders a toggle.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$hasColorScheme` | `bool` | Whether the colour scheme is enabled, from the `dark_mode` customisation setting. |

**Return:** `bool` — evaluated for truthiness.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:151` | `$status` (mixed) |

### Example

```php
add_filter('fluent_community/has_color_scheme', function ($hasColorScheme) {
    return $hasColorScheme;
}, 10, 1);
```

**Related:** [`fluent_community/default_theme_mode`](/hooks/filters/rendering#fluent-community-default-theme-mode) · [`fluent_community/color_schmea_config`](#fluent-community-color-schmea-config)

<a id="fluent-community-onboarding-settings-api-response"></a>

## `fluent_community/onboarding_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the payload of the first-run onboarding wizard.

Built from the general settings plus a detection pass for the other Fluent plugins (`has_fluentcrm`, `has_fluentsmtp`, `has_fluentcart`) and matching `install_*` defaults of `yes`, so the wizard offers to install them. It also embeds the current administrator's name and email address for the newsletter opt-in, both of which default to being sent — filter them out if that is not wanted.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `settings` key holding the wizard state. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:409` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/onboarding_settings_api_response', function ($data, $requestData) {
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
- **When it fires:** Filters the privacy settings screen payload.

Carries the visibility settings that the `fluent_community/can_view_*` filters read at runtime — profile page visibility, members page status, leaderboard member visibility and the self-deactivation switch. Changing values here changes the form, not the checks; filter the individual capability hooks to change behaviour.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | A single `settings` key. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:395` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/privacy_settings_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/can_view_members_page`](/hooks/filters/permissions#fluent-community-can-view-members-page) · [`fluent_community/can_view_user_profile`](/hooks/filters/permissions#fluent-community-can-view-user-profile)

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
- **When it fires:** Filters the media storage settings screen payload.

On a free install `config` is hard-coded to `['driver' => 'local']` without consulting anything, and the matching save endpoint refuses outright — so adding driver options here produces a form that cannot be saved. With Pro active the config comes from the cloud storage module and Pro appends its `s3_locations` map through this same filter. Saving is also blocked when the `FLUENT_COMMUNITY_CLOUD_STORAGE` constant is defined.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$response` | `array` | `config`, plus `s3_locations` when Pro is active. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:214` | `[ 'config' => $config ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/storage_settings_response', function ($response, $requestData) {
    return $response;
}, 10, 2);
```

<a id="fluent-community-suggested-colors"></a>

## `fluent_community/suggested_colors`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the swatches offered in the portal colour customiser.

The defaults come from the active theme's `editor-color-palette` support, with CSS variables resolved to their hex fallback and anything unparseable dropped; a hard-coded eleven-colour list is used when the theme declares no palette. The list is convenience only — the customiser still accepts arbitrary colours, so removing entries restricts nothing. It reaches the front end as `portal_vars.suggestedColors`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$colors` | `array` | A flat list of colour strings, normally six-digit hex. |

**Return:** `array` — a flat, non-associative list.

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

**Related:** [`fluent_community/color_config_api_response`](#fluent-community-color-config-api-response)

