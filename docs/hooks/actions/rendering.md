---
title: Rendering Actions
description: Rendering action hooks for FluentCommunity.
---

# Rendering Actions

44 unique action hooks currently map to this category, across 71 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/after_header_logo`](#fluent-community-after-header-logo) | Core | 1 | `fluent-community/app/Views/portal/header.php:45` |
| [`fluent_community/after_header_menu`](#fluent-community-after-header-menu) | Core | 1 | `fluent-community/app/Views/portal/header.php:55` |
| [`fluent_community/after_header_right_menu_items`](#fluent-community-after-header-right-menu-items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:371` |
| [`fluent_community/after_portal_sidebar`](#fluent-community-after-portal-sidebar) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:157` |
| [`fluent_community/after_registration_form`](#fluent-community-after-registration-form) | Core | 1 | `fluent-community/app/Views/auth/user_invitation.php:59` |
| [`fluent_community/after_sidebar_wrap`](#fluent-community-after-sidebar-wrap) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:155` |
| [`fluent_community/before_auth_form_header`](#fluent-community-before-auth-form-header) | Core | 3 | `fluent-community/app/Views/auth/login_form.php:10` |
| [`fluent_community/before_header_logo`](#fluent-community-before-header-logo) | Core | 1 | `fluent-community/app/Views/portal/header.php:34` |
| [`fluent_community/before_header_menu_items`](#fluent-community-before-header-menu-items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:315` |
| [`fluent_community/before_header_right_menu_items`](#fluent-community-before-header-right-menu-items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:250` |
| [`fluent_community/before_js_loaded`](#fluent-community-before-js-loaded) | Core <span class="edition-note">(also fired by Pro)</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:81` |
| [`fluent_community/before_portal_dom`](#fluent-community-before-portal-dom) | Core | 4 | `fluent-community/app/Views/portal_page.php:78` |
| [`fluent_community/before_portal_rendered`](#fluent-community-before-portal-rendered) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:899` |
| [`fluent_community/before_registration_form`](#fluent-community-before-registration-form) | Core | 1 | `fluent-community/app/Views/auth/user_invitation.php:23` |
| [`fluent_community/before_sidebar_wrap`](#fluent-community-before-sidebar-wrap) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:31` |
| [`fluent_community/block_editor_footer`](#fluent-community-block-editor-footer) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:424` |
| [`fluent_community/block_editor_head`](#fluent-community-block-editor-head) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:417` |
| [`fluent_community/enqueue_global_assets`](#fluent-community-enqueue-global-assets) | Core | 4 | `fluent-community/Modules/Auth/AuthModdule.php:187` |
| [`fluent_community/headless/before_js_loaded`](#fluent-community-headless-before-js-loaded) | Core | 1 | `fluent-community/app/Views/headless_page.php:110` |
| [`fluent_community/headless/content`](#fluent-community-headless-content) | Core | 2 | `fluent-community/app/Views/headless_page.php:94` |
| [`fluent_community/headless/footer`](#fluent-community-headless-footer) | Core | 1 | `fluent-community/app/Views/headless_page.php:118` |
| [`fluent_community/headless/head`](#fluent-community-headless-head) | Core | 1 | `fluent-community/app/Views/headless_page.php:66` |
| [`fluent_community/headless/head_early`](#fluent-community-headless-head-early) | Core | 1 | `fluent-community/app/Views/headless_page.php:61` |
| [`fluent_community/on_wp_init`](#fluent-community-on-wp-init) | Core | 1 | `fluent-community/boot/app.php:41` |
| [`fluent_community/portal_action_{action}`](#fluent-community-portal-action-action) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:810` |
| [`fluent_community/portal_footer`](#fluent-community-portal-footer) | Core <span class="edition-note">(also fired by Pro)</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:82` |
| [`fluent_community/portal_head`](#fluent-community-portal-head) | Core | 1 | `fluent-community/app/Views/portal_page.php:74` |
| [`fluent_community/portal_head_meta`](#fluent-community-portal-head-meta) | Core | 1 | `fluent-community/app/Views/portal_page.php:44` |
| [`fluent_community/portal_header`](#fluent-community-portal-header) | Core <span class="edition-note">(also fired by Pro)</span> | 6 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:64` |
| [`fluent_community/portal_html`](#fluent-community-portal-html) | Core | 1 | `fluent-community/app/Views/portal_page.php:80` |
| [`fluent_community/portal_loaded`](#fluent-community-portal-loaded) | Core | 1 | `fluent-community/boot/app.php:38` |
| [`fluent_community/portal_render_for_user`](#fluent-community-portal-render-for-user) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:880` |
| [`fluent_community/portal_sidebar`](#fluent-community-portal-sidebar) | Core <span class="edition-note">(also fired by Pro)</span> | 7 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:71` |
| [`fluent_community/portal/not_logged_in`](#fluent-community-portal-not-logged-in) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:836` |
| [`fluent_community/portal/viewed`](#fluent-community-portal-viewed) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:842` |
| [`fluent_community/rendering_headless_portal`](#fluent-community-rendering-headless-portal) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:891` |
| [`fluent_community/rendering_path_ssr_{pathParts}`](#fluent-community-rendering-path-ssr-pathParts) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:814` |
| [`fluent_community/sidebar_link/after_delete`](#fluent-community-sidebar-link-after-delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:817` |
| [`fluent_community/sidebar_link/before_delete`](#fluent-community-sidebar-link-before-delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:813` |
| [`fluent_community/template_footer`](#fluent-community-template-footer) | Core | 3 | `fluent-community/Modules/Gutenberg/EditorBlock.php:180` |
| [`fluent_community/template_header`](#fluent-community-template-header) | Core | 2 | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:18` |
| [`fluent_community/theme_body_atts`](#fluent-community-theme-body-atts) | Core | 2 | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:21` |
| [`fluent_community/theme_content`](#fluent-community-theme-content) | Core | 2 | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:38` |
| [`fluent_community/top_menu_right_items`](#fluent-community-top-menu-right-items) | Core | 1 | `fluent-community/app/Views/portal/header.php:58` |

<a id="fluent-community-after-header-logo"></a>

## `fluent_community/after_header_logo`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:45` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/after_header_logo', function ($auth) {
}, 10, 1);
```

<a id="fluent-community-after-header-menu"></a>

## `fluent_community/after_header_menu`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:55` | `$context` (mixed) |

### Example

```php
add_action('fluent_community/after_header_menu', function ($context) {
}, 10, 1);
```

<a id="fluent-community-after-header-right-menu-items"></a>

## `fluent_community/after_header_right_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:371` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/after_header_right_menu_items', function ($auth) {
}, 10, 1);
```

<a id="fluent-community-after-portal-sidebar"></a>

## `fluent_community/after_portal_sidebar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:157` | `$fluentCommunityContext` (mixed) |

### Example

```php
add_action('fluent_community/after_portal_sidebar', function ($fluentCommunityContext) {
}, 10, 1);
```

<a id="fluent-community-after-registration-form"></a>

## `fluent_community/after_registration_form`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/user_invitation.php:59` | No parameters |

### Example

```php
add_action('fluent_community/after_registration_form', function () {
}, 10, 0);
```

<a id="fluent-community-after-sidebar-wrap"></a>

## `fluent_community/after_sidebar_wrap`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:155` | `$fluentCommunityContext` (mixed) |

### Example

```php
add_action('fluent_community/after_sidebar_wrap', function ($fluentCommunityContext) {
}, 10, 1);
```

<a id="fluent-community-before-auth-form-header"></a>

## `fluent_community/before_auth_form_header`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/login_form.php:10` | `'login'` (string) |
| Core | `fluent-community/app/Views/auth/user_invitation.php:11` | `'signup'` (string) |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:726` | `'login'` (string) |

### Example

```php
add_action('fluent_community/before_auth_form_header', function ($param1) {
}, 10, 1);
```

<a id="fluent-community-before-header-logo"></a>

## `fluent_community/before_header_logo`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:34` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/before_header_logo', function ($auth) {
}, 10, 1);
```

<a id="fluent-community-before-header-menu-items"></a>

## `fluent_community/before_header_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:315` | `$auth` (mixed)<br>`$context` (mixed) |

### Example

```php
add_action('fluent_community/before_header_menu_items', function ($auth, $context) {
}, 10, 2);
```

<a id="fluent-community-before-header-right-menu-items"></a>

## `fluent_community/before_header_right_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:250` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/before_header_right_menu_items', function ($auth) {
}, 10, 1);
```

<a id="fluent-community-before-js-loaded"></a>

## `fluent_community/before_js_loaded`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:81` | No parameters |
| Core | `fluent-community/app/Views/portal_page.php:83` | No parameters |

### Example

```php
add_action('fluent_community/before_js_loaded', function () {
}, 10, 0);
```

<a id="fluent-community-before-portal-dom"></a>

## `fluent_community/before_portal_dom`

- **Type:** action
- **Edition:** Core
- **Call sites:** 4
- **When it fires:** Prints inside the portal wrapper, immediately before the app markup.

The one rendering hook shared by every portal surface: the standalone portal page, both WordPress frame templates, and the Gutenberg community block. Because it runs before the layout paints, it is the right place for pre-paint scripts — core uses it for the sidebar-collapse anti-flicker snippet.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:78` | No parameters |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:153` | No parameters |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:24` | No parameters |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:24` | No parameters |

### Example

```php
add_action('fluent_community/before_portal_dom', function () {
}, 10, 0);
```

**Related:** [`fluent_community/portal_header`](#fluent-community-portal-header)

<a id="fluent-community-before-portal-rendered"></a>

## `fluent_community/before_portal_rendered`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:899` | `$data` (mixed) |

### Example

```php
add_action('fluent_community/before_portal_rendered', function ($data) {
}, 10, 1);
```

<a id="fluent-community-before-registration-form"></a>

## `fluent_community/before_registration_form`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/user_invitation.php:23` | No parameters |

### Example

```php
add_action('fluent_community/before_registration_form', function () {
}, 10, 0);
```

<a id="fluent-community-before-sidebar-wrap"></a>

## `fluent_community/before_sidebar_wrap`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:31` | `$fluentCommunityContext` (mixed) |

### Example

```php
add_action('fluent_community/before_sidebar_wrap', function ($fluentCommunityContext) {
}, 10, 1);
```

<a id="fluent-community-block-editor-footer"></a>

## `fluent_community/block_editor_footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:424` | No parameters |

### Example

```php
add_action('fluent_community/block_editor_footer', function () {
}, 10, 0);
```

<a id="fluent-community-block-editor-head"></a>

## `fluent_community/block_editor_head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:417` | No parameters |

### Example

```php
add_action('fluent_community/block_editor_head', function () {
}, 10, 0);
```

<a id="fluent-community-enqueue-global-assets"></a>

## `fluent_community/enqueue_global_assets`

- **Type:** action
- **Edition:** Core
- **Call sites:** 4
- **When it fires:** Fires while the portal's shared stylesheet and script bundle are being enqueued.

Core's own callback does the enqueueing, so this is the hook to attach dependent assets to rather than a notification that assets are already registered — register at a later priority if you need to depend on `fluent_community_global` or `portal_general`. `$useDefaultTheme` is false only for the Gutenberg block when the author opted out of the built-in theme, in which case `theme-default.css` is skipped.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$useDefaultTheme` | `bool` | Whether the bundled default theme stylesheet is being loaded alongside the global one. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:187` | `true` (bool) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:130` | `$useBuildInTheme` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:188` | `true` (bool) |
| Core | `fluent-community/Modules/Theming/TemplateLoader.php:189` | `true` (bool) |

### Example

```php
add_action('fluent_community/enqueue_global_assets', function ($useDefaultTheme) {
}, 10, 1);
```

<a id="fluent-community-headless-before-js-loaded"></a>

## `fluent_community/headless/before_js_loaded`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:110` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/before_js_loaded', function ($fluentCommunityScope) {
}, 10, 1);
```

<a id="fluent-community-headless-content"></a>

## `fluent_community/headless/content`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:94` | `$fluentCommunityScope` (mixed) |
| Core | `fluent-community/app/Views/headless_page.php:100` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/content', function ($fluentCommunityScope) {
}, 10, 1);
```

<a id="fluent-community-headless-footer"></a>

## `fluent_community/headless/footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:118` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/footer', function ($fluentCommunityScope) {
}, 10, 1);
```

<a id="fluent-community-headless-head"></a>

## `fluent_community/headless/head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:66` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/head', function ($fluentCommunityScope) {
}, 10, 1);
```

<a id="fluent-community-headless-head-early"></a>

## `fluent_community/headless/head_early`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:61` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/head_early', function ($fluentCommunityScope) {
}, 10, 1);
```

<a id="fluent-community-on-wp-init"></a>

## `fluent_community/on_wp_init`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires on WordPress `init`, after the FluentCommunity application has been bootstrapped.

Registered from inside the `fluent_community/portal_loaded` callback, so it always runs after every core and Pro module has had a chance to register. Use it for anything that must wait for `init` — rewrite rules, registered types, or code that needs the current user.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$app` | `\FluentCommunity\Framework\Foundation\Application` | The plugin application container. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/boot/app.php:41` | `$app` (mixed) |

### Example

```php
add_action('fluent_community/on_wp_init', function ($app) {
}, 10, 1);
```

**Related:** [`fluent_community/portal_loaded`](#fluent-community-portal-loaded)

<a id="fluent-community-portal-action-action"></a>

## `fluent_community/portal_action_{action}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:810` | `$_GET` (mixed) |

### Example

```php
add_action('fluent_community/portal_action_{action}', function ($_get) {
}, 10, 1);
```

<a id="fluent-community-portal-footer"></a>

## `fluent_community/portal_footer`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 2
- **When it fires:** Prints near the end of `<body>` on the standalone portal page, after the SPA scripts.

Fires from `app/Views/portal_page.php` and from the Pro portal shortcode, and runs before `wp_footer()` on non-headless renders. Core hangs custom JS snippets and customiser output off it. The theme-framed portal uses `fluent_community/template_footer` instead.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:82` | No parameters |
| Core | `fluent-community/app/Views/portal_page.php:84` | No parameters |

### Example

```php
add_action('fluent_community/portal_footer', function () {
}, 10, 0);
```

**Related:** [`fluent_community/portal_head`](#fluent-community-portal-head) · [`fluent_community/template_footer`](#fluent-community-template-footer)

<a id="fluent-community-portal-head"></a>

## `fluent_community/portal_head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints inside the `<head>` of the standalone portal page, after the plugin's colour variables.

This is the SPA-only head hook: it fires from `app/Views/portal_page.php`, the template used when the portal renders itself rather than through a WordPress theme. For the theme-framed portal use `fluent_community/template_header` — Pro registers its custom CSS on both. Echo directly; there is no return value.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:74` | No parameters |

### Example

```php
add_action('fluent_community/portal_head', function () {
}, 10, 0);
```

**Related:** [`fluent_community/template_header`](#fluent-community-template-header) · [`fluent_community/portal_footer`](#fluent-community-portal-footer)

<a id="fluent-community-portal-head-meta"></a>

## `fluent_community/portal_head_meta`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:44` | `$landing_route` (mixed) |

### Example

```php
add_action('fluent_community/portal_head_meta', function ($landing_route) {
}, 10, 1);
```

<a id="fluent-community-portal-header"></a>

## `fluent_community/portal_header`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 6
- **When it fires:** Renders the portal header bar for a given render context.

As with the sidebar, core attaches the default header renderer, so callbacks add to it. `$context` is `headless`, `wp`, or `block_editor`; unlike the sidebar there is no `ajax` context. To add items inside the default header rather than around it, use the finer-grained `fluent_community/before_header_menu_items` and `fluent_community/after_header_right_menu_items` hooks.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$context` | `string` | Render context: `headless`, `wp`, or `block_editor`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:64` | `'headless'` (string) |
| Core | `fluent-community/app/Views/portal/portal.php:3` | `'headless'` (string) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:157` | `$contenx` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:197` | `'headless'` (string) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:27` | `'wp'` (string) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:27` | `'wp'` (string) |

### Example

```php
add_action('fluent_community/portal_header', function ($context) {
}, 10, 1);
```

**Related:** [`fluent_community/portal_sidebar`](#fluent-community-portal-sidebar)

<a id="fluent-community-portal-html"></a>

## `fluent_community/portal_html`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:80` | No parameters |

### Example

```php
add_action('fluent_community/portal_html', function () {
}, 10, 0);
```

<a id="fluent-community-portal-loaded"></a>

## `fluent_community/portal_loaded`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires on `plugins_loaded` once the FluentCommunity application container exists.

The earliest safe extension point: the container, helper functions and Action Scheduler are available, but WordPress `init` has not run, so do not register post types, taxonomies or translations here. Core loads its own `Modules/` from this hook and Pro bootstraps itself from it, which is why Pro modules are always available by the time `fluent_community/on_wp_init` runs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$app` | `\FluentCommunity\Framework\Foundation\Application` | The plugin application container. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/boot/app.php:38` | `$app` (mixed) |

### Example

```php
add_action('fluent_community/portal_loaded', function ($app) {
}, 10, 1);
```

**Related:** [`fluent_community/on_wp_init`](#fluent-community-on-wp-init)

<a id="fluent-community-portal-render-for-user"></a>

## `fluent_community/portal_render_for_user`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:880` | `$xprofile` (XProfile) |

### Example

```php
add_action('fluent_community/portal_render_for_user', function ($xprofile) {
}, 10, 1);
```

<a id="fluent-community-portal-sidebar"></a>

## `fluent_community/portal_sidebar`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 7
- **When it fires:** Renders the portal's left sidebar navigation for a given render context.

Core attaches the sidebar renderer itself, so adding a callback appends to the sidebar rather than replacing it. The `$context` argument distinguishes where the sidebar is being drawn: `headless` for the SPA, `wp` for the theme frame templates, `block_editor` for the Gutenberg block in edit mode, and `ajax` when `OptionController::getSidebarMenuHtml()` buffers the markup for a client-side refresh.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$context` | `string` | Render context: `headless`, `wp`, `block_editor`, or `ajax`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:71` | `'headless'` (string) |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:37` | `'ajax'` (string) |
| Core | `fluent-community/app/Views/portal/portal.php:9` | `'headless'` (string) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:164` | `$contenx` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:205` | `'headless'` (string) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:33` | `'wp'` (string) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:33` | `'wp'` (string) |

### Example

```php
add_action('fluent_community/portal_sidebar', function ($context) {
}, 10, 1);
```

**Related:** [`fluent_community/portal_header`](#fluent-community-portal-header)

<a id="fluent-community-portal-not-logged-in"></a>

## `fluent_community/portal/not_logged_in`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:836` | `$authUrl` (mixed) |

### Example

```php
add_action('fluent_community/portal/not_logged_in', function ($authUrl) {
}, 10, 1);
```

<a id="fluent-community-portal-viewed"></a>

## `fluent_community/portal/viewed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:842` | No parameters |

### Example

```php
add_action('fluent_community/portal/viewed', function () {
}, 10, 0);
```

<a id="fluent-community-rendering-headless-portal"></a>

## `fluent_community/rendering_headless_portal`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:891` | `$data` (mixed) |

### Example

```php
add_action('fluent_community/rendering_headless_portal', function ($data) {
}, 10, 1);
```

<a id="fluent-community-rendering-path-ssr-pathParts"></a>

## `fluent_community/rendering_path_ssr_{pathParts}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:814` | `$pathParts` (mixed) |

### Example

```php
add_action('fluent_community/rendering_path_ssr_{pathParts}', function ($pathParts) {
}, 10, 1);
```

<a id="fluent-community-sidebar-link-after-delete"></a>

## `fluent_community/sidebar_link/after_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires after a custom portal sidebar link has been deleted.

The in-memory model is still passed, but the row is gone by this point.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$link` | `\FluentCommunity\App\Models\SidebarLink` | The deleted link. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:817` | `$link` (mixed) |

### Example

```php
add_action('fluent_community/sidebar_link/after_delete', function ($link) {
}, 10, 1);
```

**Related:** [`fluent_community/sidebar_link/before_delete`](#fluent-community-sidebar-link-before-delete)

<a id="fluent-community-sidebar-link-before-delete"></a>

## `fluent_community/sidebar_link/before_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Fires just before a custom portal sidebar link is deleted.

The record is still readable here. There is no matching hook on save — only delete is instrumented.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$link` | `\FluentCommunity\App\Models\SidebarLink` | The link about to be deleted. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:813` | `$link` (mixed) |

### Example

```php
add_action('fluent_community/sidebar_link/before_delete', function ($link) {
}, 10, 1);
```

**Related:** [`fluent_community/sidebar_link/after_delete`](#fluent-community-sidebar-link-after-delete)

<a id="fluent-community-template-footer"></a>

## `fluent_community/template_footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Prints at the end of `<body>` in the WordPress theme frame templates, after `wp_footer()`.

Core renders the mobile bottom menu here. The Gutenberg community block also fires it, but indirectly — it defers the call into `wp_footer` at priority 99, so relative ordering against other footer output differs between the block and the frame templates.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:180` | No parameters |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:49` | No parameters |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:47` | No parameters |

### Example

```php
add_action('fluent_community/template_footer', function () {
}, 10, 0);
```

**Related:** [`fluent_community/template_header`](#fluent-community-template-header) · [`fluent_community/portal_footer`](#fluent-community-portal-footer)

<a id="fluent-community-template-header"></a>

## `fluent_community/template_header`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Prints inside `<head>` of the WordPress theme frame templates, after `wp_head()`.

Applies to the `fluent-community-frame.php` and `fluent-community-frame-full.php` page templates — the theme-integrated portal, not the standalone SPA page. Pro registers PWA meta tags and custom CSS on this and on `fluent_community/portal_head` together, which is the usual pattern for head output that must appear on every portal variant.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:18` | No parameters |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:18` | No parameters |

### Example

```php
add_action('fluent_community/template_header', function () {
}, 10, 0);
```

**Related:** [`fluent_community/portal_head`](#fluent-community-portal-head) · [`fluent_community/template_footer`](#fluent-community-template-footer)

<a id="fluent-community-theme-body-atts"></a>

## `fluent_community/theme_body_atts`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Prints extra attributes into the `<body>` tag of the theme frame templates.

Output is echoed raw into the opening tag directly after `body_class()`, so emit `key="value"` pairs and escape them yourself; returning a value does nothing. Core uses it for Blocksy support, keyed off the theme name passed in.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$themeName` | `string` | The active theme's directory slug, from `get_option('template')`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:21` | `$fluentCommunityThemeName` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:21` | `$fluentCommunityThemeName` (mixed) |

### Example

```php
add_action('fluent_community/theme_body_atts', function ($themeName) {
}, 10, 1);
```

**Related:** [`fluent_community/theme_content`](#fluent-community-theme-content)

<a id="fluent-community-theme-content"></a>

## `fluent_community/theme_content`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Renders the WordPress page content area inside the community frame layout.

Core attaches `TemplateLoader::renderWpContent()` at priority 10, so callbacks added later append to the theme content. To take the region over entirely, remove the default first — the FluentCart checkout integration does exactly that with `remove_all_actions('fluent_community/theme_content', 10)`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$themeName` | `string` | The active theme's directory slug. |
| 2 | `$layout` | `string` | `default` for the standard frame, `full` for the full-width frame template. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:38` | `$fluentCommunityThemeName` (mixed)<br>`'full'` (string) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:37` | `$fluentCommunityThemeName` (mixed)<br>`'default'` (string) |

### Example

```php
add_action('fluent_community/theme_content', function ($themeName, $layout) {
}, 10, 2);
```

**Related:** [`fluent_community/theme_body_atts`](#fluent-community-theme-body-atts)

<a id="fluent-community-top-menu-right-items"></a>

## `fluent_community/top_menu_right_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:58` | `$context` (mixed) |

### Example

```php
add_action('fluent_community/top_menu_right_items', function ($context) {
}, 10, 1);
```

