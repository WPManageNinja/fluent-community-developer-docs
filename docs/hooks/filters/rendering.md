---
title: Rendering Filters
description: Rendering filter hooks for FluentCommunity.
---

# Rendering Filters

35 unique filter hooks currently map to this category, across 37 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/allowed_block_types`](#fluent-community-allowed-block-types) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:650` |
| [`fluent_community/allowed_html_tags`](#fluent-community-allowed-html-tags) | Core | 1 | `fluent-community/app/Services/CustomSanitizer.php:385` |
| [`fluent_community/app_route_paths`](#fluent-community-app-route-paths) | Core | 1 | `fluent-community/app/Services/Helper.php:577` |
| [`fluent_community/app_vars_api_response`](#fluent-community-app-vars-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/OptionController.php:25` |
| [`fluent_community/asset_listed_slugs`](#fluent-community-asset-listed-slugs) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:532` |
| [`fluent_community/base_url`](#fluent-community-base-url) | Core | 1 | `fluent-community/app/Services/Helper.php:293` |
| [`fluent_community/block_editor_settings`](#fluent-community-block-editor-settings) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:736` |
| [`fluent_community/date_time_i18n`](#fluent-community-date-time-i18n) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:551` |
| [`fluent_community/default_theme_mode`](#fluent-community-default-theme-mode) | Core | 1 | `fluent-community/app/Services/Helper.php:166` |
| [`fluent_community/editor_i18n_strings`](#fluent-community-editor-i18n-strings) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:358` |
| [`fluent_community/error_page_custom_css`](#fluent-community-error-page-custom-css) | Core | 1 | `fluent-community/app/Views/error_page.php:21` |
| [`fluent_community/general_portal_vars`](#fluent-community-general-portal-vars) | Core | 2 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:773` |
| [`fluent_community/header_vars`](#fluent-community-header-vars) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1222` |
| [`fluent_community/image_size_names_choose`](#fluent-community-image-size-names-choose) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:363` |
| [`fluent_community/is_rtl`](#fluent-community-is-rtl) | Core | 1 | `fluent-community/app/Services/Helper.php:28` |
| [`fluent_community/is_supported_theme`](#fluent-community-is-supported-theme) | Core | 2 | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:36` |
| [`fluent_community/portal_data_vars`](#fluent-community-portal-data-vars) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1028` |
| [`fluent_community/portal_notices`](#fluent-community-portal-notices) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:472` |
| [`fluent_community/portal_page_headless`](#fluent-community-portal-page-headless) | Core | 1 | `fluent-community/app/Services/Helper.php:140` |
| [`fluent_community/portal_route_type`](#fluent-community-portal-route-type) | Core | 1 | `fluent-community/app/Services/Helper.php:130` |
| [`fluent_community/portal_settings_menu_items`](#fluent-community-portal-settings-menu-items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalSettingsHandler.php:68` |
| [`fluent_community/portal_supported_query_params`](#fluent-community-portal-supported-query-params) | Core | 1 | `fluent-community/app/Services/Helper.php:2148` |
| [`fluent_community/portal_vars`](#fluent-community-portal-vars) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:471` |
| [`fluent_community/pro_upgrade_base_url`](#fluent-community-pro-upgrade-base-url) | Core | 1 | `fluent-community/app/Functions/Utility.php:416` |
| [`fluent_community/render_default_touch_icon`](#fluent-community-render-default-touch-icon) | Core | 1 | `fluent-community/app/Views/portal_page.php:29` |
| [`fluent_community/rendering_feed_model`](#fluent-community-rendering-feed-model) | Core | 1 | `fluent-community/app/Services/FeedsHelper.php:1053` |
| [`fluent_community/seo/ld_comment_limit`](#fluent-community-seo-ld-comment-limit) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:471` |
| [`fluent_community/sidebar_menu_groups_config`](#fluent-community-sidebar-menu-groups-config) | Core | 1 | `fluent-community/app/Functions/Utility.php:1244` |
| [`fluent_community/sidebar_menu_html_api_response`](#fluent-community-sidebar-menu-html-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/OptionController.php:76` |
| [`fluent_community/skip_no_conflict`](#fluent-community-skip-no-conflict) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:521` |
| [`fluent_community/space_header_links`](#fluent-community-space-header-links) | Core | 1 | `fluent-community/app/Models/BaseSpace.php:659` |
| [`fluent_community/template_slug`](#fluent-community-template-slug) | Core | 1 | `fluent-community/Modules/Theming/TemplateLoader.php:75` |
| [`fluent_community/use_editor_block`](#fluent-community-use-editor-block) | Core | 1 | `fluent-community/Modules/FeaturesHandler.php:160` |
| [`fluent_community/will_render_default_sidebar_items`](#fluent-community-will-render-default-sidebar-items) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:35` |
| [`fluent_communuty/add_sitemap_provider`](#fluent-communuty-add-sitemap-provider) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:21` |

<a id="fluent-community-allowed-block-types"></a>

## `fluent_community/allowed_block_types`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:650` | `array (32 items)` (array) |

### Example

```php
add_filter('fluent_community/allowed_block_types', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-allowed-html-tags"></a>

## `fluent_community/allowed_html_tags`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/CustomSanitizer.php:385` | `$tags` (mixed) |

### Example

```php
add_filter('fluent_community/allowed_html_tags', function ($tags) {
    return $tags;
}, 10, 1);
```

<a id="fluent-community-app-route-paths"></a>

## `fluent_community/app_route_paths`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:577` | `array (15 items)` (array) |

### Example

```php
add_filter('fluent_community/app_route_paths', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-app-vars-api-response"></a>

## `fluent_community/app_vars_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:25` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/app_vars_api_response', function ($data, $request) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-asset-listed-slugs"></a>

## `fluent_community/asset_listed_slugs`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:532` | `[ '\/gutenberg\/', ]` (array) |

### Example

```php
add_filter('fluent_community/asset_listed_slugs', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-base-url"></a>

## `fluent_community/base_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:293` | `home_url(self::getPortalSlug())` (mixed) |

### Example

```php
add_filter('fluent_community/base_url', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-block-editor-settings"></a>

## `fluent_community/block_editor_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:736` | `$editor_settings` (mixed) |

### Example

```php
add_filter('fluent_community/block_editor_settings', function ($editor_settings) {
    return $editor_settings;
}, 10, 1);
```

<a id="fluent-community-date-time-i18n"></a>

## `fluent_community/date_time_i18n`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the date, time and UI localisation strings handed to the portal front end.

Surfaces as `portal_vars.dateTime18n` and mixes two consumers. The `weekdays`, `months`, `weekdaysShort`, `monthsShort` and `weekdaysMin` entries are underscore-joined lists that `src/app.js` splits on `_` to build the Day.js locale — keep both the separator and the element order or dates will be mislabelled. The `relativeTime` and `relativeTimeMobile` maps are Day.js relative-time formats, and the `pagination`, `table`, `image`, `upload`, `select` and `datepicker` blocks are the Element Plus locale. All values are already translated through the `fluent-community` text domain.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$strings` | `array` | The localisation payload, keyed as described above. |

**Return:** `array` — the payload, with the existing keys preserved. Missing keys are not backfilled.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:551` | `array (6 keys: /* translators: weekday. Please keep the serial and format */ 'weekdays', /* translators: Months Please keep the serial and format*/ 'months', /* translators: weekday short Please keep the serial and format*/ 'weekdaysShort', …)` (array) |

### Example

```php
add_filter('fluent_community/date_time_i18n', function ($strings) {
    return $strings;
}, 10, 1);
```

**Related:** [`fluent_community/portal_vars`](#fluent-community-portal-vars)

<a id="fluent-community-default-theme-mode"></a>

## `fluent_community/default_theme_mode`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:166` | `$mode` (mixed) |

### Example

```php
add_filter('fluent_community/default_theme_mode', function ($mode) {
    return $mode;
}, 10, 1);
```

<a id="fluent-community-editor-i18n-strings"></a>

## `fluent_community/editor_i18n_strings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:358` | `$strings` (mixed) |

### Example

```php
add_filter('fluent_community/editor_i18n_strings', function ($strings) {
    return $strings;
}, 10, 1);
```

<a id="fluent-community-error-page-custom-css"></a>

## `fluent_community/error_page_custom_css`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/error_page.php:21` | `''` (string) |

### Example

```php
add_filter('fluent_community/error_page_custom_css', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-general-portal-vars"></a>

## `fluent_community/general_portal_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:773` | `array (10 keys: scope, theme, default_color, …)` (array) |
| Core | `fluent-community/app/Services/Helper.php:177` | `['color_switch_cookie_name' => '']` (array) |

### Example

```php
add_filter('fluent_community/general_portal_vars', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-header-vars"></a>

## `fluent_community/header_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1222` | `array (10 keys: portal_url, logo, white_logo, …)` (array) |

### Example

```php
add_filter('fluent_community/header_vars', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-image-size-names-choose"></a>

## `fluent_community/image_size_names_choose`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:363` | `array( 'thumbnail' => __('Thumbnail', 'fluent-community'), 'medium' => __('Me…` (mixed) |

### Example

```php
add_filter('fluent_community/image_size_names_choose', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-is-rtl"></a>

## `fluent_community/is_rtl`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:28` | `is_rtl()` (mixed) |

### Example

```php
add_filter('fluent_community/is_rtl', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-is-supported-theme"></a>

## `fluent_community/is_supported_theme`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:36` | `false` (bool)<br>`$fluentCommunityThemeName` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:36` | `false` (bool)<br>`$fluentCommunityThemeName` (mixed) |

### Example

```php
add_filter('fluent_community/is_supported_theme', function ($param1, $fluentCommunityThemeName) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-portal-data-vars"></a>

## `fluent_community/portal_data_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1028` | `$dataVars` (mixed) |

### Example

```php
add_filter('fluent_community/portal_data_vars', function ($dataVars) {
    return $dataVars;
}, 10, 1);
```

<a id="fluent-community-portal-notices"></a>

## `fluent_community/portal_notices`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the list of notice blocks shown above the main community feed.

Part of the `portal_vars` payload and empty by default. The Vue app renders each entry with `v-html` at the top of the all-feeds route only — not on space, course or profile pages — so entries must be complete, trusted HTML fragments and any user-supplied content in them must be escaped before it reaches the filter.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$notices` | `array` | HTML fragments to render, one per notice. Empty by default. |

**Return:** `array` — a flat list of HTML strings.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:472` | `[]` (array) |

### Example

```php
add_filter('fluent_community/portal_notices', function ($notices) {
    return $notices;
}, 10, 1);
```

**Related:** [`fluent_community/portal_vars`](#fluent-community-portal-vars)

<a id="fluent-community-portal-page-headless"></a>

## `fluent_community/portal_page_headless`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:140` | `false` (bool) |

### Example

```php
add_filter('fluent_community/portal_page_headless', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-portal-route-type"></a>

## `fluent_community/portal_route_type`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:130` | `'WebHistory'` (string) |

### Example

```php
add_filter('fluent_community/portal_route_type', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-portal-settings-menu-items"></a>

## `fluent_community/portal_settings_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalSettingsHandler.php:68` | `$this->getPortalSettingsMenuItems()` (mixed) |

### Example

```php
add_filter('fluent_community/portal_settings_menu_items', function ($getPortalSettingsMenuItems) {
    return $getPortalSettingsMenuItems;
}, 10, 1);
```

<a id="fluent-community-portal-supported-query-params"></a>

## `fluent_community/portal_supported_query_params`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2148` | `[ 'customizer_panel', 'create_space' ]` (array) |

### Example

```php
add_filter('fluent_community/portal_supported_query_params', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-portal-vars"></a>

## `fluent_community/portal_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the complete configuration payload handed to the portal Vue application.

The main extension point for the front end: everything the SPA knows about the current user, enabled features, permissions, URLs and translated strings passes through here, and both core modules and Pro use it to bolt on their own keys. Several narrower filters are applied while this array is being built, so they run before any callback attached here and can be overridden from it. Two keys are added after the filter — `welcome_banner`, and `auth_url`/`allow_signup` for logged-out visitors — so they cannot be filtered here. The result is printed into the page, so do not add secrets.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$portalVars` | `array` | The portal configuration payload, including `auth`, `permissions`, `features`, `urls`, `i18n` and `rest`. |

**Return:** `array` — the payload. Merge into it rather than replacing it; removing keys the SPA expects will break the portal.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:471` | `array (53 keys: portal_notices, i18n, auth, …)` (array) |

### Example

```php
add_filter('fluent_community/portal_vars', function ($portalVars) {
    return $portalVars;
}, 10, 1);
```

**Related:** [`fluent_community/portal_notices`](#fluent-community-portal-notices) · [`fluent_community/date_time_i18n`](#fluent-community-date-time-i18n) · [`fluent_community/max_media_per_post`](#fluent-community-max-media-per-post)

<a id="fluent-community-pro-upgrade-base-url"></a>

## `fluent_community/pro_upgrade_base_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:416` | `'https://fluentcommunity.co/pricing/'` (string) |

### Example

```php
add_filter('fluent_community/pro_upgrade_base_url', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-render-default-touch-icon"></a>

## `fluent_community/render_default_touch_icon`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:29` | `true` (bool) |

### Example

```php
add_filter('fluent_community/render_default_touch_icon', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-rendering-feed-model"></a>

## `fluent_community/rendering_feed_model`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/FeedsHelper.php:1053` | `$feed` (Feed)<br>`$config` (mixed) |

### Example

```php
add_filter('fluent_community/rendering_feed_model', function ($feed, $config) {
    return $feed;
}, 10, 2);
```

<a id="fluent-community-seo-ld-comment-limit"></a>

## `fluent_community/seo/ld_comment_limit`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters how many comments are embedded in a post's JSON-LD structured data.

Defaults to 100 and is cast to int. It caps the comments serialized into the schema.org graph for SEO only — it has no effect on the comments the portal or the REST API return. Replies are nested under their parent within whatever the limit returns, so a low limit can orphan replies whose parent fell outside it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$limit` | `int` | Maximum comments to embed, 100 by default. |

**Return:** The comment limit as an integer.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:471` | `100` (int) |

### Example

```php
add_filter('fluent_community/seo/ld_comment_limit', function ($limit) {
    return $limit;
}, 10, 1);
```

<a id="fluent-community-sidebar-menu-groups-config"></a>

## `fluent_community/sidebar_menu_groups_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1244` | `array (8 keys: primaryItems, spaceGroups, settingsItems, …)` (array)<br>`$userModel` (mixed) |

### Example

```php
add_filter('fluent_community/sidebar_menu_groups_config', function ($param1, $userModel) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-sidebar-menu-html-api-response"></a>

## `fluent_community/sidebar_menu_html_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:76` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/sidebar_menu_html_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-skip-no-conflict"></a>

## `fluent_community/skip_no_conflict`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:521` | `false` (bool)<br>`'styles'` (string) |

### Example

```php
add_filter('fluent_community/skip_no_conflict', function ($param1, $param2) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-space-header-links"></a>

## `fluent_community/space_header_links`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/BaseSpace.php:659` | `$headerLinks` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/space_header_links', function ($headerLinks, $param2) {
    return $headerLinks;
}, 10, 2);
```

<a id="fluent-community-template-slug"></a>

## `fluent_community/template_slug`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-use-editor-block"></a>

## `fluent_community/use_editor_block`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/FeaturesHandler.php:160` | `true` (bool) |

### Example

```php
add_filter('fluent_community/use_editor_block', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-will-render-default-sidebar-items"></a>

## `fluent_community/will_render_default_sidebar_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:35` | `true` (bool) |

### Example

```php
add_filter('fluent_community/will_render_default_sidebar_items', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-communuty-add-sitemap-provider"></a>

## `fluent_communuty/add_sitemap_provider`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Filters whether FluentCommunity registers its WordPress sitemap provider.

Returning false on this filter stops wp_register_sitemap_provider() from running, which removes the community entries from the core WordPress sitemap — useful when a dedicated SEO plugin is already emitting them. It runs on `init`, so a callback has to be attached before that. Note the hook prefix is misspelled `fluent_communuty` in the source; the name is part of the public surface and is documented as written.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$shouldRegister` | `bool` | True by default. |

**Return:** Boolean — false to skip registering the sitemap provider.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/SeoSiteMap/SeoSiteMapHandler.php:21` | `true` (bool) |

### Example

```php
add_filter('fluent_communuty/add_sitemap_provider', function ($shouldRegister) {
    return $shouldRegister;
}, 10, 1);
```

