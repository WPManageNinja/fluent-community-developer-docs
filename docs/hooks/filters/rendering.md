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
- **When it fires:** Filters which block types may be inserted in the lesson editor.

An explicit allowlist rather than a denylist, so a block that is not named is unavailable even if it is registered — third-party blocks have to be added here to appear in the lesson inserter. Removing a type hides it from the inserter but does not strip it from lessons that already contain it. The list is one key of the object `fluent_community/block_editor_settings` filters, so that hook can override this one.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$blockTypes` | `array` | Flat list of block names such as `core/paragraph`, `core/image`, `core/embed`. |

**Return:** `array` — a flat list of block names.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:650` | `array (32 items)` (array) |

### Example

```php
add_filter('fluent_community/allowed_block_types', function ($blockTypes) {
    return $blockTypes;
}, 10, 1);
```

**Related:** [`fluent_community/block_editor_settings`](#fluent-community-block-editor-settings)

<a id="fluent-community-allowed-html-tags"></a>

## `fluent_community/allowed_html_tags`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the `wp_kses` tag allowlist used for embed and rich media HTML.

The base list is `wp_kses_allowed_html('post')` plus a deliberately narrow `iframe` entry. Two omissions are intentional and documented at the call site: no `<style>` element, because kses never filters the text inside one, and no `srcdoc` attribute on iframes, because a sandbox-less `srcdoc` iframe is same-origin with the portal. Re-adding either hands script or CSS injection to anyone who can author embed markup.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$tags` | `array` | The kses allowlist: tag names mapped to allowed attribute maps. |

**Return:** `array` — a kses allowlist. It is passed straight to `wp_kses()`, so the nested shape must be preserved.

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
- **When it fires:** Filters the first URL segments that are recognised as portal routes.

Only consulted when the portal is mounted at the site root — with a portal slug in place the rewrite rules do the matching and this list is not reached. A segment missing from it will 404 through the theme instead of loading the SPA, so anything added through `fluent_community/rendering_path_ssr_{pathParts}` normally has to be registered here too; the FluentCart checkout does exactly that. The list is also published to the front end as `portal_vars.portal_paths` on root-mounted installs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$paths` | `array` | Flat list of first-segment slugs such as `members`, `courses`, `u`, `post`, `admin`. |

**Return:** `array` — a flat, non-associative list of segments. Removing a default segment makes that portal section unreachable.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:577` | `array (15 items)` (array) |

### Example

```php
add_filter('fluent_community/app_route_paths', function ($paths) {
    return $paths;
}, 10, 1);
```

**Related:** [`fluent_community/rendering_path_ssr_{pathParts}`](/hooks/actions/rendering#fluent-community-rendering-path-ssr-pathParts) · [`fluent_community/portal_supported_query_params`](#fluent-community-portal-supported-query-params)

<a id="fluent-community-app-vars-api-response"></a>

## `fluent_community/app_vars_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response of the endpoint the SPA uses to refresh its bootstrap data without a page reload.

The `appVars` key is a fresh `PortalHandler::appVars()` run — the same payload as `fluent_community/portal_vars`, minus `rest`, which is stripped so the nonce is not re-issued over AJAX. Anything you add through `fluent_community/portal_vars` is already present here; use this filter only for keys that should exist on the refresh path but not in the initial page render.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `appVars` and `menu_links_groups`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:25` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/app_vars_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/portal_vars`](#fluent-community-portal-vars) · [`fluent_community/sidebar_menu_html_api_response`](#fluent-community-sidebar-menu-html-api-response)

<a id="fluent-community-asset-listed-slugs"></a>

## `fluent_community/asset_listed_slugs`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the URL fragments that exempt a stylesheet from the lesson editor's no-conflict mode.

Stylesheets are the only assets this affects. The list is joined into a regular expression and matched against every enqueued stylesheet URL under the plugins and themes directories; anything that does not match is dequeued so third-party CSS cannot break the editor. `\/fluent-community\/` is appended after the filter and cannot be removed. Note the script side is governed by a differently prefixed hook, `fluent_com_editor/asset_listed_slugs` — filtering this one does nothing for JavaScript.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$approvedSlugs` | `array` | Regular-expression fragments matched against stylesheet URLs, for example `\/gutenberg\/`. |

**Return:** `array` — fragments that are deduplicated and joined with `|` into one pattern, so each entry must be regex-safe.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:532` | `[ '\/gutenberg\/', ]` (array) |

### Example

```php
add_filter('fluent_community/asset_listed_slugs', function ($approvedSlugs) {
    return $approvedSlugs;
}, 10, 1);
```

**Related:** [`fluent_community/skip_no_conflict`](#fluent-community-skip-no-conflict)

<a id="fluent-community-base-url"></a>

## `fluent_community/base_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the absolute base URL every portal link is built from.

The default is `home_url()` joined with the portal slug, and the result is passed through `rtrim()` before the path is appended, so a trailing slash is harmless. `Helper::baseUrl()` is called on nearly every request path, so keep the callback cheap and side-effect free. When the routing type is `hash` the path is appended after a `#` instead. Changing the host here does not change the rewrite rules, so an off-site value produces links that no longer resolve.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$baseUrl` | `string` | The portal base URL, `home_url()` plus the portal slug by default. |

**Return:** `string` — an absolute URL. Trailing slashes are trimmed.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:293` | `home_url(self::getPortalSlug())` (mixed) |

### Example

```php
add_filter('fluent_community/base_url', function ($baseUrl) {
    return $baseUrl;
}, 10, 1);
```

**Related:** [`fluent_community/portal_slug`](/hooks/filters/settings#fluent-community-portal-slug) · [`fluent_community/portal_route_type`](#fluent-community-portal-route-type)

<a id="fluent-community-block-editor-settings"></a>

## `fluent_community/block_editor_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the complete settings object handed to the isolated block editor used for lessons.

Applied last, after the editor styles, resolved assets, default styles and image sizes have been merged in, so a callback sees the final object. The keys mirror the ones core Gutenberg expects — colour and font-size palettes, `allowedBlockTypes`, the placeholder strings, the various `disableCustom*` switches — and are consumed by `@wordpress/block-editor` in an iframe rather than by the WordPress editor, so standard `block_editor_settings_all` callbacks do not apply here.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$editorSettings` | `array` | The editor settings object, including `styles`, `imageSizes`, `allowedBlockTypes` and the palettes. |

**Return:** `array` — the settings object, JSON-encoded into the editor page.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:736` | `$editor_settings` (mixed) |

### Example

```php
add_filter('fluent_community/block_editor_settings', function ($editorSettings) {
    return $editorSettings;
}, 10, 1);
```

**Related:** [`fluent_community/allowed_block_types`](#fluent-community-allowed-block-types) · [`fluent_community/editor_i18n_strings`](#fluent-community-editor-i18n-strings)

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
- **When it fires:** Filters the theme mode a visitor sees before making a choice of their own.

The stored setting is validated against `light`, `dark` and `system` before the filter runs, but the returned value is not re-validated — return something else and it is passed to the front end as-is, where the pre-paint script falls through to light. Precedence at runtime is host-theme cookie, then the viewer's own stored pick, then this value, so it only affects first-time visitors.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$mode` | `string` | `light`, `dark` or `system`. `light` by default. |

**Return:** `string` — one of `light`, `dark`, `system`. Unrecognised values behave as `light`.

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

**Related:** [`fluent_community/has_color_scheme`](/hooks/filters/settings#fluent-community-has-color-scheme) · [`fluent_community/general_portal_vars`](#fluent-community-general-portal-vars)

<a id="fluent-community-editor-i18n-strings"></a>

## `fluent_community/editor_i18n_strings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the translated strings handed to the lesson editor's JavaScript.

An English-keyed map: each key is the source string and each value its translation through the `fluent-community` text domain. The editor looks strings up by the English key, so renaming a key breaks the lookup and the untranslated fallback is used — change values, not keys.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$strings` | `array` | Source string mapped to translated string. |

**Return:** `array` — the string map, with the original keys intact.

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

**Related:** [`fluent_community/block_editor_settings`](#fluent-community-block-editor-settings)

<a id="fluent-community-error-page-custom-css"></a>

## `fluent_community/error_page_custom_css`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters CSS injected into the standalone error page.

The error page is the minimal document shown for a pending join request, a deactivated account or a denied role, and it loads none of the portal stylesheets — this filter is the only styling hook it has. The default is an empty string and the return value is passed through `wp_strip_all_tags()` before being printed inside a `<style>` block, so markup in it is dropped rather than escaped.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$css` | `string` | CSS to inline. Empty by default. |

**Return:** `string` — CSS text. An empty or falsy value omits the `<style>` block entirely.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/error_page.php:21` | `''` (string) |

### Example

```php
add_filter('fluent_community/error_page_custom_css', function ($css) {
    return $css;
}, 10, 1);
```

<a id="fluent-community-general-portal-vars"></a>

## `fluent_community/general_portal_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the small configuration object shared by every non-SPA portal script.

Localised as `fcom_portal_general` for the `portal_general.js` bundle, which handles the sidebar toggle, group collapsing and the dark-mode switch. It is applied at two very different call sites: `PortalHandler::getGlobalScriptVars()` builds the full array, while `Helper::renderColorSchemePrePaintScript()` applies it to a one-key array just to read `color_switch_cookie_name` — so a callback must not assume the other keys are present. Core uses it to adopt the Blocksy and Kadence dark-mode cookies, which is how the portal follows the host theme's theme switch.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$vars` | `array` | Configuration keys such as `scope`, `theme`, `has_color_scheme`, `default_theme_mode`, `color_switch_cookie_name`. Only `color_switch_cookie_name` is guaranteed. |

**Return:** `array` — the configuration object.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:773` | `array (10 keys: scope, theme, default_color, …)` (array) |
| Core | `fluent-community/app/Services/Helper.php:177` | `['color_switch_cookie_name' => '']` (array) |

### Example

```php
add_filter('fluent_community/general_portal_vars', function ($vars) {
    return $vars;
}, 10, 1);
```

**Related:** [`fluent_community/default_theme_mode`](#fluent-community-default-theme-mode) · [`fluent_community/has_color_scheme`](/hooks/filters/settings#fluent-community-has-color-scheme)

<a id="fluent-community-header-vars"></a>

## `fluent_community/header_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the data the portal header template is rendered with.

Applied in `PortalHandler::getPortalHeader()` just before the `portal.header` view runs, so it is the way to swap the logo, its link target or the main menu without touching the template. Emptying `menuItems` suppresses the whole centre `<nav>`, which is what core does on admin routes. `auth` is the viewer's `XProfile` or `null`; the profile is only resolved when the viewer passes the portal access check.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$vars` | `array` | Header data: `portal_url`, `logo`, `white_logo`, `logo_permalink`, `site_title`, `profile_url`, `auth`, `auth_url`, `menuItems`, `context`. |

**Return:** `array` — the header data. The template reads `logo`, `site_title` and `menuItems` directly, so keep them defined.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1222` | `array (10 keys: portal_url, logo, white_logo, …)` (array) |

### Example

```php
add_filter('fluent_community/header_vars', function ($vars) {
    return $vars;
}, 10, 1);
```

**Related:** [`fluent_community/main_menu_items`](/hooks/filters/spaces#fluent-community-main-menu-items) · [`fluent_community/after_header_menu`](/hooks/actions/rendering#fluent-community-after-header-menu)

<a id="fluent-community-image-size-names-choose"></a>

## `fluent_community/image_size_names_choose`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the image sizes offered in the lesson editor's image block.

A FluentCommunity-scoped analogue of WordPress's own `image_size_names_choose`, and independent of it — sizes added to the core filter do not appear here. The map is reshaped into the `imageSizes` list the block editor expects, so keys must be registered image size slugs; a slug with no registered size yields an option that resolves to the full-size image.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$sizeNames` | `array` | Image size slug mapped to display label: `thumbnail`, `medium`, `large`, `full`. |

**Return:** `array` — an associative map of size slug to label.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:363` | `array( 'thumbnail' => __('Thumbnail', 'fluent-community'), 'medium' => __('Me…` (mixed) |

### Example

```php
add_filter('fluent_community/image_size_names_choose', function ($sizeNames) {
    return $sizeNames;
}, 10, 1);
```

**Related:** [`fluent_community/block_editor_settings`](#fluent-community-block-editor-settings)

<a id="fluent-community-is-rtl"></a>

## `fluent_community/is_rtl`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether FluentCommunity renders in right-to-left mode.

Defaults to WordPress `is_rtl()`. It decides which build of every stylesheet is requested — the RTL builds are separate files, not a runtime flip — and adds a `direction: rtl` rule to the standalone portal page. Because it is read while assets are being resolved, filter it early; changing it after the head has rendered has no effect.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$isRtl` | `bool` | Whether to use the RTL assets. WordPress `is_rtl()` by default. |

**Return:** `bool` — evaluated for truthiness.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:28` | `is_rtl()` (mixed) |

### Example

```php
add_filter('fluent_community/is_rtl', function ($isRtl) {
    return $isRtl;
}, 10, 1);
```

<a id="fluent-community-is-supported-theme"></a>

## `fluent_community/is_supported_theme`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters whether the active theme lays its own content out well enough inside the community frame.

Only the boolean matters: `true` puts the `fcom_supported_wp_content` class on the content column, `false` uses `fcom_wp_content fcom_fallback_wp_content`, which adds the plugin's own padding and width handling. It defaults to `false` for every theme, including the ones `fluent_community/theme_content` has a dedicated renderer for, so declaring your theme supported is opt-in. Fires in both frame templates.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$isSupported` | `bool` | Whether the theme handles the frame content area itself. `false` by default. |
| 2 | `$themeName` | `string` | The active theme's directory slug, from `get_option('template')`. |

**Return:** `bool` — evaluated for truthiness; only the class name changes.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:36` | `false` (bool)<br>`$fluentCommunityThemeName` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:36` | `false` (bool)<br>`$fluentCommunityThemeName` (mixed) |

### Example

```php
add_filter('fluent_community/is_supported_theme', function ($isSupported, $themeName) {
    return $isSupported;
}, 10, 2);
```

**Related:** [`fluent_community/theme_content`](/hooks/actions/rendering#fluent-community-theme-content) · [`fluent_community/template_slug`](#fluent-community-template-slug)

<a id="fluent-community-portal-data-vars"></a>

## `fluent_community/portal_data_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the render payload for a portal page: title, meta, asset lists and inline JavaScript variables.

This is the server-side sibling of `fluent_community/portal_vars`, which it already contains under `js_vars.fluentComAdmin`. It is the supported way to add a stylesheet or module script to the portal, since headless rendering ignores `wp_enqueue_style()`; add entries to the `css_files` and `js_files` maps, each keyed by handle with a `url` (and `deps` for scripts). Core swaps the whole bundle for the admin application here when `route_group` is `admin`, and the lesson video gate injects its tracker at priority 11 — register later than that if you need to see the final list.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$dataVars` | `array` | The render payload: `title`, `og_title`, `description`, `featured_image`, `css_files`, `js_files`, `header_js_files`, `js_vars`, `route_group`, `current_route`, `theme_color`. |

**Return:** `array` — the payload. `portal_page.php` reads several keys unconditionally, so merge rather than replace.

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

**Related:** [`fluent_community/portal_vars`](#fluent-community-portal-vars) · [`fluent_community/before_portal_rendered`](/hooks/actions/rendering#fluent-community-before-portal-rendered)

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
- **When it fires:** Filters whether the portal page renders without the WordPress theme head and footer.

Returns `false` from core, but `Modules\FeaturesHandler` immediately adds `__return_true`, so headless is the effective default on every install. When it is true, `portal_page.php` skips `wp_head()` and `wp_footer()`, emits its own meta tags, and the assets are printed by hand from `fluent_community/rendering_headless_portal`. Return `false` to fall back to classic rendering, where WordPress enqueueing applies and theme and plugin head output reaches the portal. The name is unrelated to `app/Views/headless_page.php`, which is the auth page template.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$isHeadless` | `bool` | Whether to skip the WordPress head and footer. `false` in core, forced to `true` by `FeaturesHandler`. |

**Return:** `bool` — the value is used in a truthy test. Returning `false` switches the portal to classic rendering.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:140` | `false` (bool) |

### Example

```php
add_filter('fluent_community/portal_page_headless', function ($isHeadless) {
    return $isHeadless;
}, 10, 1);
```

**Related:** [`fluent_community/rendering_headless_portal`](/hooks/actions/rendering#fluent-community-rendering-headless-portal) · [`fluent_community/portal_head_meta`](/hooks/actions/rendering#fluent-community-portal-head-meta)

<a id="fluent-community-portal-route-type"></a>

## `fluent_community/portal_route_type`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether portal routes are path-based or hash-based.

Defaults to `WebHistory`, the HTML5 history mode; the only other value the code understands is `hash`, which makes `Helper::baseUrl()` build `#/path` URLs and switches the Vue router to hash mode. It reaches the SPA as `portal_vars.routing_system`. Nothing in the shipped code returns `hash` — Pro's shortcode renderer used to, but its `register()` method returns before that filter is added, so the shortcode path is dead code.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$type` | `string` | `WebHistory` by default; `hash` for hash routing. |

**Return:** `string` — `WebHistory` or `hash`. Any other value is treated as `WebHistory` by `Helper::baseUrl()` but passed to the router unchanged.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:130` | `'WebHistory'` (string) |

### Example

```php
add_filter('fluent_community/portal_route_type', function ($type) {
    return $type;
}, 10, 1);
```

**Related:** [`fluent_community/base_url`](#fluent-community-base-url) · [`fluent_community/app_route_paths`](#fluent-community-app-route-paths)

<a id="fluent-community-portal-settings-menu-items"></a>

## `fluent_community/portal_settings_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the sections listed in the portal's admin settings navigation.

The default list is empty for anyone who is not a site administrator, so a callback that appends unconditionally will expose its entry to moderators and course admins as well — check `Helper::isSiteAdmin()` yourself. Entries are keyed by slug and carry `label`, `route` and an `icon_svg` string that is rendered as raw markup. The result travels to the admin SPA as `portalSettingsMenus`; the route must also exist in the Vue router or the entry will lead nowhere. Core's migration module adds its importer this way.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$menuItems` | `array` | Settings sections keyed by slug, each with `label`, `route` and `icon_svg`. Empty for non-administrators. |

**Return:** `array` — the sections map, order preserved.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalSettingsHandler.php:68` | `$this->getPortalSettingsMenuItems()` (mixed) |

### Example

```php
add_filter('fluent_community/portal_settings_menu_items', function ($menuItems) {
    return $menuItems;
}, 10, 1);
```

**Related:** [`fluent_community/portal_data_vars`](#fluent-community-portal-data-vars)

<a id="fluent-community-portal-supported-query-params"></a>

## `fluent_community/portal_supported_query_params`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters which query parameters make a root-level request count as a portal request.

Applies to one narrow case: a portal mounted at the site root, with an empty request path and a query string. Without a match the request falls through to the normal WordPress home page, which is what stops the portal swallowing every query-string URL on the site. Parameters beginning with `fcom_` are always accepted regardless of this list; the defaults add `customizer_panel` and `create_space`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$supportedParams` | `array` | Query parameter names that identify a portal request. Cast to an array before use. |

**Return:** `array` — a flat list of parameter names, compared with a strict `in_array()`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2148` | `[ 'customizer_panel', 'create_space' ]` (array) |

### Example

```php
add_filter('fluent_community/portal_supported_query_params', function ($supportedParams) {
    return $supportedParams;
}, 10, 1);
```

**Related:** [`fluent_community/app_route_paths`](#fluent-community-app-route-paths)

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

**Related:** [`fluent_community/portal_notices`](#fluent-community-portal-notices) · [`fluent_community/date_time_i18n`](#fluent-community-date-time-i18n) · [`fluent_community/max_media_per_post`](/hooks/filters/feeds#fluent-community-max-media-per-post)

<a id="fluent-community-pro-upgrade-base-url"></a>

## `fluent_community/pro_upgrade_base_url`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the destination of every "Upgrade to Pro" link in the portal.

Only the base URL passes through the filter; the UTM parameters are appended afterwards with `add_query_arg()`, so a query string of your own survives but the plugin's `utm_*` values are always added on top. Useful for pointing the links at a reseller or an internal page. Blank parameters are dropped before the URL is built.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$baseUrl` | `string` | The upgrade page URL, `https://fluentcommunity.co/pricing/` by default. |

**Return:** `string` — an absolute URL. UTM parameters are appended to whatever you return.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:416` | `'https://fluentcommunity.co/pricing/'` (string) |

### Example

```php
add_filter('fluent_community/pro_upgrade_base_url', function ($baseUrl) {
    return $baseUrl;
}, 10, 1);
```

<a id="fluent-community-render-default-touch-icon"></a>

## `fluent_community/render_default_touch_icon`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the portal emits an `apple-touch-icon` link pointing at the WordPress site icon.

Nested inside two conditions: it is only reached in headless rendering (where `wp_head()` is skipped) and only when the site has a site icon set. Pro's PWA module returns `false` so its own manifest icons win — that is the usual reason to filter it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$render` | `bool` | Whether to print the touch icon link. `true` by default. |

**Return:** `bool` — evaluated for truthiness.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:29` | `true` (bool) |

### Example

```php
add_filter('fluent_community/render_default_touch_icon', function ($render) {
    return $render;
}, 10, 1);
```

**Related:** [`fluent_community/portal_head_meta`](/hooks/actions/rendering#fluent-community-portal-head-meta)

<a id="fluent-community-rendering-feed-model"></a>

## `fluent_community/rendering_feed_model`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters a post model after it has been prepared for output but before it is serialised.

The final step of `FeedsHelper` post formatting, applied after the rendered HTML, reaction state, survey vote state and document download URLs have all been attached. It fires for every post in every list as well as for single posts, so it is a hot path. `$config` describes what the caller asked for, including the viewer's interaction map — read it rather than re-querying.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$feed` | `\FluentCommunity\App\Models\Feed` | The prepared post model. |
| 2 | `$config` | `array` | Formatting context, including `interactions` for the current viewer. |

**Return:** `\FluentCommunity\App\Models\Feed` — the model. Return the model itself, not an array; callers use it as an object.

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
- **When it fires:** Filters the complete data set the portal sidebar is rendered from.

Applied by `Utility::getPortalSidebarData()`, which feeds both the server-rendered sidebar and the `menu_links_groups` payload in the app-vars endpoint, so a change here shows up in both. Several narrower filters have already run by this point — `fluent_community/main_menu_items` and `fluent_community/settings_menu` among them — and can be overridden from here. The second argument is the resolved user model and is `null` for guests.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$config` | `array` | Sidebar data: `primaryItems`, `spaceGroups`, `settingsItems`, `topInlineLinks`, `bottomLinkGroups`, `is_admin`, `has_color_scheme`, `context`. |
| 2 | `$userModel` | `\FluentCommunity\App\Models\User` | The current user, or `null` for a guest. |

**Return:** `array` — the sidebar data. The template reads every key, so merge rather than replace.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1244` | `array (8 keys: primaryItems, spaceGroups, settingsItems, …)` (array)<br>`$userModel` (mixed) |

### Example

```php
add_filter('fluent_community/sidebar_menu_groups_config', function ($config, $userModel) {
    return $config;
}, 10, 2);
```

**Related:** [`fluent_community/will_render_default_sidebar_items`](#fluent-community-will-render-default-sidebar-items) · [`fluent_community/main_menu_items`](/hooks/filters/spaces#fluent-community-main-menu-items)

<a id="fluent-community-sidebar-menu-html-api-response"></a>

## `fluent_community/sidebar_menu_html_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the response of the endpoint that re-renders the sidebar HTML for the SPA.

The `sidebar_html` string is produced by firing `fluent_community/portal_sidebar` with the `ajax` context into an output buffer, which is why the sidebar wrapper hooks are skipped on that path. `auth_spaces` is the viewer's spaces keyed by slug, each already carrying `permissions`, `membership`, rendered description and topics; it is an empty object for guests.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | `sidebar_html` and `auth_spaces`. |
| 2 | `$requestData` | `array` | The full request payload. |

**Return:** `array` — the response body. The SPA replaces the sidebar with `sidebar_html` verbatim.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:76` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/sidebar_menu_html_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/portal_sidebar`](/hooks/actions/rendering#fluent-community-portal-sidebar) · [`fluent_community/app_vars_api_response`](#fluent-community-app-vars-api-response)

<a id="fluent-community-skip-no-conflict"></a>

## `fluent_community/skip_no_conflict`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the lesson editor's stylesheet no-conflict pass is skipped.

Return `true` and no stylesheet is dequeued on the editor page, which is the escape hatch when a theme or plugin's CSS is genuinely needed inside the editor. The second argument is always the literal string `styles`; there is no matching call for scripts, which are filtered unconditionally through `script_loader_src` and cannot be exempted this way.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$isSkip` | `bool` | Whether to skip the dequeue pass. `false` by default. |
| 2 | `$context` | `string` | Always `styles` at the only call site. |

**Return:** `bool` — evaluated for truthiness.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:521` | `false` (bool)<br>`'styles'` (string) |

### Example

```php
add_filter('fluent_community/skip_no_conflict', function ($isSkip, $context) {
    return $isSkip;
}, 10, 2);
```

**Related:** [`fluent_community/asset_listed_slugs`](#fluent-community-asset-listed-slugs)

<a id="fluent-community-space-header-links"></a>

## `fluent_community/space_header_links`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the tabs shown across the top of a space.

Built in `BaseSpace::formatSpaceData()`, so it runs once per space in every payload that formats spaces — the app-vars bootstrap included — rather than only on the space page. The defaults are Posts, and Members when the viewer may see them; Pro appends the media gallery at priority 0 and the document library at priority 1, both ahead of the default filter order. Each entry is a `title` plus a `route` array naming a Vue route, so a tab pointing at an unregistered route silently fails to navigate.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$headerLinks` | `array` | Ordered list of tabs, each with `title` and a `route` array. |
| 2 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The space being formatted; permissions are already resolved on it. |

**Return:** `array` — the tab list, rendered in order.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/BaseSpace.php:659` | `$headerLinks` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/space_header_links', function ($headerLinks, $space) {
    return $headerLinks;
}, 10, 2);
```

<a id="fluent-community-template-slug"></a>

## `fluent_community/template_slug`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the page template slug used to decide whether a WordPress page renders the community frame.

Applied in `TemplateLoader::maybeIncludeTemplate()` to the value from `get_page_template_slug()`, and matched against `fluent-community-frame.php` and `fluent-community-frame-full.php`. Returning one of those two names forces any page onto the frame; anything else falls through to the theme. It is skipped entirely on block themes, which take a separate branch keyed on `wp-custom-template-community-template`, and it only runs when a global `$post` is set.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$templateSlug` | `string` | The page's assigned template slug, often empty. |

**Return:** `string` — a template file name. Only the two frame templates have any effect.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/TemplateLoader.php:75` | `$template_slug` (mixed) |

### Example

```php
add_filter('fluent_community/template_slug', function ($templateSlug) {
    return $templateSlug;
}, 10, 1);
```

**Related:** [`fluent_community/is_supported_theme`](#fluent-community-is-supported-theme) · [`fluent_community/theme_content`](/hooks/actions/rendering#fluent-community-theme-content)

<a id="fluent-community-use-editor-block"></a>

## `fluent_community/use_editor_block`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the Gutenberg community block module is registered.

Read once during module bootstrap, so it must be filtered from a plugin or a must-use file rather than from a theme. Returning `false` skips `Modules\Gutenberg\EditorBlock` entirely: the community block disappears from the block inserter and the block-based portal embed stops working. It does not affect the lesson block editor, which is wired up separately.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$useEditorBlock` | `bool` | Whether to register the Gutenberg block module. `true` by default. |

**Return:** `bool` — evaluated for truthiness at bootstrap time.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/FeaturesHandler.php:160` | `true` (bool) |

### Example

```php
add_filter('fluent_community/use_editor_block', function ($useEditorBlock) {
    return $useEditorBlock;
}, 10, 1);
```

**Related:** [`fluent_community/block_editor_settings`](#fluent-community-block-editor-settings)

<a id="fluent-community-will-render-default-sidebar-items"></a>

## `fluent_community/will_render_default_sidebar_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters whether the sidebar's built-in navigation is rendered at all.

Return `false` and `#fcom_sidebar_wrap` is emitted empty — the home links, space groups, custom link groups and the "# Manage" block are all skipped, while the wrapper and the surrounding hooks still fire, leaving you a clean container to fill from `fluent_community/before_sidebar_wrap` or `fluent_community/after_sidebar_wrap`. Core switches it off on the portal settings routes.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$willRender` | `bool` | Whether to draw the default sidebar contents. `true` by default. |

**Return:** `bool` — evaluated for truthiness by the template.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:35` | `true` (bool) |

### Example

```php
add_filter('fluent_community/will_render_default_sidebar_items', function ($willRender) {
    return $willRender;
}, 10, 1);
```

**Related:** [`fluent_community/sidebar_menu_groups_config`](#fluent-community-sidebar-menu-groups-config) · [`fluent_community/before_sidebar_wrap`](/hooks/actions/rendering#fluent-community-before-sidebar-wrap)

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

