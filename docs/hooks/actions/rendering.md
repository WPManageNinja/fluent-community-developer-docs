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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:187` | `true` (bool) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:130` | `$useBuildInTheme` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:188` | `true` (bool) |
| Core | `fluent-community/Modules/Theming/TemplateLoader.php:189` | `true` (bool) |

### Example

```php
add_action('fluent_community/enqueue_global_assets', function ($useBuildInTheme) {
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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/boot/app.php:41` | `$app` (mixed) |

### Example

```php
add_action('fluent_community/on_wp_init', function ($app) {
}, 10, 1);
```

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

<a id="fluent-community-portal-head"></a>

## `fluent_community/portal_head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:74` | No parameters |

### Example

```php
add_action('fluent_community/portal_head', function () {
}, 10, 0);
```

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
add_action('fluent_community/portal_header', function ($contenx) {
}, 10, 1);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/boot/app.php:38` | `$app` (mixed) |

### Example

```php
add_action('fluent_community/portal_loaded', function ($app) {
}, 10, 1);
```

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
add_action('fluent_community/portal_sidebar', function ($contenx) {
}, 10, 1);
```

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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:817` | `$link` (mixed) |

### Example

```php
add_action('fluent_community/sidebar_link/after_delete', function ($link) {
}, 10, 1);
```

<a id="fluent-community-sidebar-link-before-delete"></a>

## `fluent_community/sidebar_link/before_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:813` | `$link` (mixed) |

### Example

```php
add_action('fluent_community/sidebar_link/before_delete', function ($link) {
}, 10, 1);
```

<a id="fluent-community-template-footer"></a>

## `fluent_community/template_footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3

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

<a id="fluent-community-template-header"></a>

## `fluent_community/template_header`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

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

<a id="fluent-community-theme-body-atts"></a>

## `fluent_community/theme_body_atts`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:21` | `$fluentCommunityThemeName` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:21` | `$fluentCommunityThemeName` (mixed) |

### Example

```php
add_action('fluent_community/theme_body_atts', function ($fluentCommunityThemeName) {
}, 10, 1);
```

<a id="fluent-community-theme-content"></a>

## `fluent_community/theme_content`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:38` | `$fluentCommunityThemeName` (mixed)<br>`'full'` (string) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:37` | `$fluentCommunityThemeName` (mixed)<br>`'default'` (string) |

### Example

```php
add_action('fluent_community/theme_content', function ($fluentCommunityThemeName, $param2) {
}, 10, 2);
```

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

