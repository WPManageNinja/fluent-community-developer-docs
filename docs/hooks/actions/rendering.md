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
| [`fluent_community/after_portal_sidebar`](#fluent-community-after-portal-sidebar) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:159` |
| [`fluent_community/after_registration_form`](#fluent-community-after-registration-form) | Core | 1 | `fluent-community/app/Views/auth/user_invitation.php:59` |
| [`fluent_community/after_sidebar_wrap`](#fluent-community-after-sidebar-wrap) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:157` |
| [`fluent_community/before_auth_form_header`](#fluent-community-before-auth-form-header) | Core | 3 | `fluent-community/app/Views/auth/login_form.php:10` |
| [`fluent_community/before_header_logo`](#fluent-community-before-header-logo) | Core | 1 | `fluent-community/app/Views/portal/header.php:34` |
| [`fluent_community/before_header_menu_items`](#fluent-community-before-header-menu-items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:315` |
| [`fluent_community/before_header_right_menu_items`](#fluent-community-before-header-right-menu-items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:250` |
| [`fluent_community/before_js_loaded`](#fluent-community-before-js-loaded) | Core <span class="edition-note">(also fired by Pro)</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:81` |
| [`fluent_community/before_portal_dom`](#fluent-community-before-portal-dom) | Core | 4 | `fluent-community/app/Views/portal_page.php:78` |
| [`fluent_community/before_portal_rendered`](#fluent-community-before-portal-rendered) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:899` |
| [`fluent_community/before_registration_form`](#fluent-community-before-registration-form) | Core | 1 | `fluent-community/app/Views/auth/user_invitation.php:23` |
| [`fluent_community/before_sidebar_wrap`](#fluent-community-before-sidebar-wrap) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:31` |
| [`fluent_community/block_editor_footer`](#fluent-community-block-editor-footer) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:426` |
| [`fluent_community/block_editor_head`](#fluent-community-block-editor-head) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:419` |
| [`fluent_community/enqueue_global_assets`](#fluent-community-enqueue-global-assets) | Core | 4 | `fluent-community/Modules/Auth/AuthModdule.php:222` |
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
| [`fluent_community/sidebar_link/after_delete`](#fluent-community-sidebar-link-after-delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:863` |
| [`fluent_community/sidebar_link/before_delete`](#fluent-community-sidebar-link-before-delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:859` |
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
- **When it fires:** Prints inside the header's left group, immediately after the logo link.

The closing counterpart of `fluent_community/before_header_logo`, in the same `.top_menu_left` container and with the same argument. Nothing in core or Pro listens, so it is a clean slot for a badge or a secondary brand mark.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$auth` | `\FluentCommunity\App\Models\XProfile` | The current member's profile, or `null` for a guest. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:45` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/after_header_logo', function ($auth) {
}, 10, 1);
```

**Related:** [`fluent_community/before_header_logo`](#fluent-community-before-header-logo)

<a id="fluent-community-after-header-menu"></a>

## `fluent_community/after_header_menu`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints in the centre group of the header, after the main navigation list.

Unlike the logo hooks this one receives the render context rather than the profile. Core prints the "Portal Settings" heading here on admin routes, replacing the main menu that the same code path empties through `fluent_community/header_vars`. The surrounding `<nav>` is only emitted when there are menu items, so on an empty menu your output is the sole content of the centre group.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$context` | `string` | Render context: `headless`, `wp`, or `block_editor`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:55` | `$context` (mixed) |

### Example

```php
add_action('fluent_community/after_header_menu', function ($context) {
}, 10, 1);
```

**Related:** [`fluent_community/header_vars`](/hooks/filters/rendering#fluent-community-header-vars) · [`fluent_community/main_menu_items`](/hooks/filters/spaces#fluent-community-main-menu-items)

<a id="fluent-community-after-header-right-menu-items"></a>

## `fluent_community/after_header_right_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints as the last item of the header's right-hand menu list, after the account menu or login button.

Emit `<li>` elements. Beyond rendering, core treats this hook as an ordering probe: the sidebar footer checks `did_action()` on it to decide whether the header has already been drawn, and lays the sidebar out differently when it has not. Firing it manually will therefore change how the sidebar renders.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$auth` | `\FluentCommunity\App\Models\XProfile` | The current member's profile, or `null` for a guest. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:371` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/after_header_right_menu_items', function ($auth) {
}, 10, 1);
```

**Related:** [`fluent_community/before_header_right_menu_items`](#fluent-community-before-header-right-menu-items) · [`fluent_community/after_portal_sidebar`](#fluent-community-after-portal-sidebar)

<a id="fluent-community-after-portal-sidebar"></a>

## `fluent_community/after_portal_sidebar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints at the very bottom of the sidebar column, after the SPA mount point.

Core attaches the sidebar footer here — the upgrade or wp-admin shortcut, the settings cog and the "Powered by" line — but only when the header has already rendered, which it detects with `did_action('fluent_community/after_header_right_menu_items')`. On a page where the header is suppressed, the core callback instead defers an admin cog into `fluent_community/before_header_menu_items` and prints nothing here. Also skipped for the `ajax` context.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$context` | `string` | Render context: `headless`, `wp`, or `block_editor`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:159` | `$fluentCommunityContext` (mixed) |

### Example

```php
add_action('fluent_community/after_portal_sidebar', function ($context) {
}, 10, 1);
```

**Related:** [`fluent_community/after_sidebar_wrap`](#fluent-community-after-sidebar-wrap) · [`fluent_community/after_header_right_menu_items`](#fluent-community-after-header-right-menu-items)

<a id="fluent-community-after-registration-form"></a>

## `fluent_community/after_registration_form`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints at the bottom of the signup card, below the "Already have an account?" link.

Fires from `app/Views/auth/user_invitation.php`, the template used for both plain signup and invitation-accepting signup, so it does not run on the login or password-reset forms. It takes no arguments and nothing in core or Pro listens.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/user_invitation.php:59` | No parameters |

### Example

```php
add_action('fluent_community/after_registration_form', function () {
}, 10, 0);
```

**Related:** [`fluent_community/before_registration_form`](#fluent-community-before-registration-form)

<a id="fluent-community-after-sidebar-wrap"></a>

## `fluent_community/after_sidebar_wrap`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints immediately after the `#fcom_sidebar_wrap` element closes, before the mobile menu mount point.

The counterpart of `fluent_community/before_sidebar_wrap` and subject to the same `ajax` exclusion. Three things render in sequence at the foot of the sidebar: this hook, the empty `#fcom_menu_sidebar` div the SPA mounts into, and then `fluent_community/after_portal_sidebar`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$context` | `string` | Render context: `headless`, `wp`, or `block_editor`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:157` | `$fluentCommunityContext` (mixed) |

### Example

```php
add_action('fluent_community/after_sidebar_wrap', function ($context) {
}, 10, 1);
```

**Related:** [`fluent_community/before_sidebar_wrap`](#fluent-community-before-sidebar-wrap) · [`fluent_community/after_portal_sidebar`](#fluent-community-after-portal-sidebar)

<a id="fluent-community-before-auth-form-header"></a>

## `fluent_community/before_auth_form_header`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Prints above the heading of an auth form, with the form type as its argument.

Three call sites, and their positions differ: on the signup template it fires as the first child of `#fcom_user_onboard_wrap`, above the header block; on the native login template likewise; on the FluentAuth login markup it fires inside `.fcom_onboard_header`, directly above the title. Core uses it to print the "X has invited you…" banner, registering a callback on the fly when an invitation is present, which means it can be attached after the page has already begun rendering.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$formType` | `string` | `login` or `signup`. Note the invitation-accept and password-reset screens do not fire this hook. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/login_form.php:10` | `'login'` (string) |
| Core | `fluent-community/app/Views/auth/user_invitation.php:11` | `'signup'` (string) |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:768` | `'login'` (string) |

### Example

```php
add_action('fluent_community/before_auth_form_header', function ($formType) {
}, 10, 1);
```

**Related:** [`fluent_community/before_registration_form`](#fluent-community-before-registration-form)

<a id="fluent-community-before-header-logo"></a>

## `fluent_community/before_header_logo`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints inside the header's left group, between the mobile menu button and the logo.

Fires from `app/Views/portal/header.php`, so it applies to every surface that renders the standard header: the standalone portal, the two theme frame templates and the Gutenberg block. An empty `#fcom_before_logo` div sits just before it as a client-side mount point. Output is echoed raw into the markup — escape it yourself.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$auth` | `\FluentCommunity\App\Models\XProfile` | The current member's profile, or `null` for a guest. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:34` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/before_header_logo', function ($auth) {
}, 10, 1);
```

**Related:** [`fluent_community/after_header_logo`](#fluent-community-after-header-logo)

<a id="fluent-community-before-header-menu-items"></a>

## `fluent_community/before_header_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints in the header's right-hand menu list, between the notification bell and the account menu.

The name suggests the main navigation, but this fires inside `ul.fcom_user_context_menu_items` on the right of the header — for the main menu use `fluent_community/after_header_menu`. It is the only header hook that receives the render context as a second argument. Core hangs the admin settings cog here on pages where the sidebar footer is not drawn.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$auth` | `\FluentCommunity\App\Models\XProfile` | The current member's profile, or `null` for a guest. |
| 2 | `$context` | `string` | Render context: `headless`, `wp`, or `block_editor`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:315` | `$auth` (mixed)<br>`$context` (mixed) |

### Example

```php
add_action('fluent_community/before_header_menu_items', function ($auth, $context) {
}, 10, 2);
```

**Related:** [`fluent_community/before_header_right_menu_items`](#fluent-community-before-header-right-menu-items) · [`fluent_community/after_header_menu`](#fluent-community-after-header-menu)

<a id="fluent-community-before-header-right-menu-items"></a>

## `fluent_community/before_header_right_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints as the first item of the header's right-hand `ul.fcom_user_context_menu_items`.

You are inside a `<ul>`, so emit complete `<li>` elements. It runs before the dark-mode toggle, the search placeholder and the notification bell. Core uses it for the "Customize Colors" entry shown to site administrators on admin routes.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$auth` | `\FluentCommunity\App\Models\XProfile` | The current member's profile, or `null` for a guest. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:250` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/before_header_right_menu_items', function ($auth) {
}, 10, 1);
```

**Related:** [`fluent_community/after_header_right_menu_items`](#fluent-community-after-header-right-menu-items) · [`fluent_community/before_header_menu_items`](#fluent-community-before-header-menu-items)

<a id="fluent-community-before-js-loaded"></a>

## `fluent_community/before_js_loaded`

- **Type:** action
- **Edition:** Core <span class="edition-note">(also fired by Pro)</span>
- **Call sites:** 2
- **When it fires:** Prints at the end of `<body>` on the standalone portal page, after the app wrapper and before the scripts.

The last hook that runs before the SPA bundle is emitted, which makes it the place for JavaScript the app must find already defined — core prints the `fluentComAdmin` and `fcom_portal_general` variable blocks here in headless mode, and Pro's emoji module preloads its data. It fires immediately before `fluent_community/portal_footer`; use that one instead for anything that should run after the bundle.

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

**Related:** [`fluent_community/portal_footer`](#fluent-community-portal-footer) · [`fluent_community/headless/before_js_loaded`](#fluent-community-headless-before-js-loaded)

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
- **When it fires:** Fires in `PortalHandler::renderFullApp()` immediately before the portal page template is rendered.

The last point before any markup is emitted: assets have been enqueued, dynamic meta data resolved and the collapsed-sidebar body class decided. `$data` is passed by value, so mutating it changes nothing — filter `fluent_community/portal_data_vars` if you need to alter the payload. Use it to register late output callbacks, which is what the colour customiser does.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The full render payload: `title`, `css_files`, `js_files`, `js_vars`, `isHeadless`, `route_group`, `landing_route`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:899` | `$data` (mixed) |

### Example

```php
add_action('fluent_community/before_portal_rendered', function ($data) {
}, 10, 1);
```

**Related:** [`fluent_community/portal_data_vars`](/hooks/filters/rendering#fluent-community-portal-data-vars) · [`fluent_community/rendering_headless_portal`](#fluent-community-rendering-headless-portal)

<a id="fluent-community-before-registration-form"></a>

## `fluent_community/before_registration_form`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints inside the signup card, above the registration form itself.

Core renders the FluentAuth social login buttons here when FluentAuth is active. Note the mismatch at the call site: the core callback is declared with a `$frameData` parameter but `do_action()` is called with no arguments, so that parameter is always null — declare your own callback with none.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/user_invitation.php:23` | No parameters |

### Example

```php
add_action('fluent_community/before_registration_form', function () {
}, 10, 0);
```

**Related:** [`fluent_community/after_registration_form`](#fluent-community-after-registration-form) · [`fluent_community/before_auth_form_header`](#fluent-community-before-auth-form-header)

<a id="fluent-community-before-sidebar-wrap"></a>

## `fluent_community/before_sidebar_wrap`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints immediately before the `#fcom_sidebar_wrap` element in the portal sidebar.

Skipped entirely when the sidebar is being rendered for the AJAX refresh endpoint (`$context` of `ajax`), so anything printed here will be missing after a client-side sidebar reload. Pro's PWA module uses it as the `top` slot for install prompts. Echo directly.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$context` | `string` | Render context: `headless`, `wp`, or `block_editor`. Never `ajax` — that context skips the hook. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:31` | `$fluentCommunityContext` (mixed) |

### Example

```php
add_action('fluent_community/before_sidebar_wrap', function ($context) {
}, 10, 1);
```

**Related:** [`fluent_community/after_sidebar_wrap`](#fluent-community-after-sidebar-wrap) · [`fluent_community/portal_sidebar`](#fluent-community-portal-sidebar)

<a id="fluent-community-block-editor-footer"></a>

## `fluent_community/block_editor_footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints after the editor mount point and before `</body>` in the lesson block editor document.

Core attaches the entire WordPress footer sequence here — footer scripts, script modules, media templates and global styles — because `wp_footer()` is never called on this document. Register at a later priority if your output depends on those having run.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:426` | No parameters |

### Example

```php
add_action('fluent_community/block_editor_footer', function () {
}, 10, 0);
```

**Related:** [`fluent_community/block_editor_head`](#fluent-community-block-editor-head)

<a id="fluent-community-block-editor-head"></a>

## `fluent_community/block_editor_head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints as the last thing inside `<head>` of the standalone lesson block editor document.

The lesson editor renders its own complete HTML document in an iframe rather than going through a theme, so `wp_head()` never runs on it; the WordPress head routines are dispatched from a private `fluent_block_editor/head` action just before this hook. Core uses it to link the editor stylesheets and inline the colour-scheme variables. The page only exists when the request carries `fluent_community_block_editor`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:419` | No parameters |

### Example

```php
add_action('fluent_community/block_editor_head', function () {
}, 10, 0);
```

**Related:** [`fluent_community/block_editor_footer`](#fluent-community-block-editor-footer) · [`fluent_community/block_editor_settings`](/hooks/filters/rendering#fluent-community-block-editor-settings)

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
| Core | `fluent-community/Modules/Auth/AuthModdule.php:222` | `true` (bool) |
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
- **When it fires:** Prints on the auth page after the inline JavaScript variables and before the module script tags.

The auth page ships no JavaScript variables of its own, so in practice the preceding `<script>` block is empty, and this is the last hook before the deferred module scripts. Nothing in core or Pro listens.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$scope` | `string` | The page scope; `user_registration` at the only live call site. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:110` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/before_js_loaded', function ($scope) {
}, 10, 1);
```

**Related:** [`fluent_community/headless/footer`](#fluent-community-headless-footer)

<a id="fluent-community-headless-content"></a>

## `fluent_community/headless/content`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Renders the body of the auth page, inside the `.fluent_com` wrapper.

The whole login, signup, password-reset and invitation-acceptance UI is drawn from a single callback registered by `AuthModdule::viewAuthPage()`, which branches on the requested form. On the `signup` layout the wrapper sits in the right-hand column beside the branding panel; otherwise it is a plain full-width block. Adding your own callback appends below the form rather than replacing it — to replace it, return a non-empty string from `fluent_community/auth/pre_content` and print your own markup.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$scope` | `string` | The page scope; `user_registration` at the only live call site. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:94` | `$fluentCommunityScope` (mixed) |
| Core | `fluent-community/app/Views/headless_page.php:100` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/content', function ($scope) {
}, 10, 1);
```

**Related:** [`fluent_community/auth/pre_content`](/hooks/filters/auth#fluent-community-auth-pre-content) · [`fluent_community/headless/footer`](#fluent-community-headless-footer)

<a id="fluent-community-headless-footer"></a>

## `fluent_community/headless/footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints as the last thing before `</body>` on the auth page, after `wp_footer()`.

Because the auth page sets `load_wp`, `wp_footer()` has already run when this fires — anything enqueued the normal way is on the page by now. Nothing in core or Pro listens.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$scope` | `string` | The page scope; `user_registration` at the only live call site. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:118` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/footer', function ($scope) {
}, 10, 1);
```

**Related:** [`fluent_community/headless/head`](#fluent-community-headless-head)

<a id="fluent-community-headless-head"></a>

## `fluent_community/headless/head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints as the last thing inside `<head>` of the auth page template, after the stylesheet links.

Same scope caveat as `fluent_community/headless/head_early`: this is the auth page, not the portal. Use it for overrides that must beat the plugin stylesheets, and `head_early` for anything they should be able to override. `wp_head()` has already run on this template because the auth page sets `load_wp`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$scope` | `string` | The page scope; `user_registration` at the only live call site. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:66` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/head', function ($scope) {
}, 10, 1);
```

**Related:** [`fluent_community/headless/head_early`](#fluent-community-headless-head-early) · [`fluent_community/headless/content`](#fluent-community-headless-content)

<a id="fluent-community-headless-head-early"></a>

## `fluent_community/headless/head_early`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Prints inside `<head>` of `headless_page.php`, before the stylesheets are linked.

This template is not the portal. Despite the name, `app/Views/headless_page.php` is rendered from exactly one place — `AuthModdule::viewAuthPage()` — so every `fluent_community/headless/*` hook fires only on the FluentCommunity login, signup, reset-password and accept-invitation screens, and `$scope` is always `user_registration`. Core uses this hook for the canonical link and the auth banner colour variables. The portal's own head hook is `fluent_community/portal_head`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$scope` | `string` | The page scope; `user_registration` at the only live call site. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:61` | `$fluentCommunityScope` (mixed) |

### Example

```php
add_action('fluent_community/headless/head_early', function ($scope) {
}, 10, 1);
```

**Related:** [`fluent_community/headless/head`](#fluent-community-headless-head) · [`fluent_community/portal_head`](#fluent-community-portal-head)

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
- **When it fires:** Dynamic action fired for the value of the `fcom_action` query parameter on any portal URL.

This is the plugin's front-controller extension point: `?fcom_action=my_thing` on a portal URL fires `fluent_community/portal_action_my_thing`. It runs at the very top of `renderFullApp()` — before the logged-out redirect, before the profile-status checks and before the role gate — so a handler receives completely unauthenticated requests and must do its own capability and nonce checks. Core registers `auth`, `signed_url` and `reactivate_account`; Pro adds `download_document` and `incoming_webhook`. The action name comes straight from the request and is sanitised with `sanitize_text_field()`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$requestData` | `array` | The raw `$_GET` superglobal, unsanitised. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:810` | `$_GET` (mixed) |

### Example

```php
add_action('fluent_community/portal_action_{action}', function ($requestData) {
}, 10, 1);
```

**Related:** [`fluent_community/rendering_path_ssr_{pathParts}`](#fluent-community-rendering-path-ssr-pathParts)

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
- **When it fires:** Prints inside `<head>` of the standalone portal page, among the SEO and Open Graph tags.

Fires only on the branch that skips `wp_head()` — that is, when `fluent_community/portal_page_headless` is left at its default `true`. Switch to classic rendering and this hook never runs, so anything essential should also be attached to `fluent_community/portal_head`, which fires on both branches. It sits after the `og:` and `twitter:` tags and before the canonical link and the JSON-LD block, so it is the right place for robots directives. Pro's sitemap module emits the `noindex` tag here.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$landingRoute` | `string` | The resolved route group for the request, for example `feed_view`, `course_view`, `user_profile`, or empty. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:44` | `$landing_route` (mixed) |

### Example

```php
add_action('fluent_community/portal_head_meta', function ($landingRoute) {
}, 10, 1);
```

**Related:** [`fluent_community/portal_head`](#fluent-community-portal-head) · [`fluent_community/render_default_touch_icon`](/hooks/filters/rendering#fluent-community-render-default-touch-icon)

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
| Core | `fluent-community/app/Views/portal/portal.php:4` | `'headless'` (string) |
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
- **When it fires:** Renders the portal application markup inside the `.fluent_com` wrapper of the standalone portal page.

Core attaches the `portal.portal` view at the default priority, which draws the header, the sidebar column and the `#fluent_com_portal` mount point the Vue app takes over. Adding a callback appends to that markup; to replace the app shell entirely, remove the core action first. It fires from `app/Views/portal_page.php` only — the WordPress frame templates and the Gutenberg block build the same structure inline and do not fire it.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:80` | No parameters |

### Example

```php
add_action('fluent_community/portal_html', function () {
}, 10, 0);
```

**Related:** [`fluent_community/before_portal_dom`](#fluent-community-before-portal-dom) · [`fluent_community/portal_header`](#fluent-community-portal-header)

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
- **When it fires:** Fires on a full portal render for a signed-in member with an active profile.

Reached only after the status and role gates pass, and only when an `XProfile` exists — guests and blocked, pending or deactivated members never reach it. Core uses it to re-register the daily and hourly Action Scheduler jobs for site administrators, so it doubles as the plugin's "someone is here, keep cron alive" signal. Runs on every page load, so keep the work cheap.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$xprofile` | `\FluentCommunity\App\Models\XProfile` | The viewing member's profile. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:880` | `$xprofile` (XProfile) |

### Example

```php
add_action('fluent_community/portal_render_for_user', function ($xprofile) {
}, 10, 1);
```

**Related:** [`fluent_community/portal/viewed`](#fluent-community-portal-viewed)

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
| Core | `fluent-community/app/Views/portal/portal.php:10` | `'headless'` (string) |
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
- **When it fires:** Fires when a logged-out visitor hits a portal URL on a community that is not publicly accessible.

The redirect happens on the next line and is followed by `exit()`, so a callback cannot cancel it or change the destination — this is a notification hook, useful for logging or for setting a cookie before the visitor leaves. `$authUrl` is either the administrator-configured external auth URL or the internal auth page with a `redirect_to` back to the requested path.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$authUrl` | `string` | The URL the visitor is about to be sent to. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:836` | `$authUrl` (mixed) |

### Example

```php
add_action('fluent_community/portal/not_logged_in', function ($authUrl) {
}, 10, 1);
```

**Related:** [`fluent_community/portal/viewed`](#fluent-community-portal-viewed) · [`fluent_community/auth/login_url`](/hooks/filters/auth#fluent-community-auth-login-url)

<a id="fluent-community-portal-viewed"></a>

## `fluent_community/portal/viewed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires once per portal page load, after access checks pass and before the app data is assembled.

Takes no arguments and does not tell you who is viewing — resolve the current user yourself. It runs after the logged-out redirect, so a guest only reaches it on a publicly accessible portal, and after the pending, deactivated and role checks, which end the request on their own error page. REST API traffic from the SPA does not fire it; this is the full-page render only.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:842` | No parameters |

### Example

```php
add_action('fluent_community/portal/viewed', function () {
}, 10, 0);
```

**Related:** [`fluent_community/portal/not_logged_in`](#fluent-community-portal-not-logged-in) · [`fluent_community/portal_render_for_user`](#fluent-community-portal-render-for-user)

<a id="fluent-community-rendering-headless-portal"></a>

## `fluent_community/rendering_headless_portal`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Fires while a portal page is being prepared in headless mode, in place of the classic asset enqueue.

Headless mode is the shipped default (`Modules\FeaturesHandler` returns `true` from `fluent_community/portal_page_headless`), and in it WordPress asset enqueueing is skipped entirely: core answers this hook by registering callbacks on `fluent_community/portal_head`, `fluent_community/before_js_loaded` and `fluent_community/portal_footer` that print the stylesheet and module script tags by hand. If you replace the core callback, you must print those assets yourself. When the filter is switched off, `PortalHandler::loadClassicPortalAssets()` runs instead and this hook never fires. Despite the name it has nothing to do with `app/Views/headless_page.php`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The render payload, including `css_files`, `js_files`, `header_js_files` and `js_vars`. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:891` | `$data` (mixed) |

### Example

```php
add_action('fluent_community/rendering_headless_portal', function ($data) {
}, 10, 1);
```

**Related:** [`fluent_community/portal_page_headless`](/hooks/filters/rendering#fluent-community-portal-page-headless) · [`fluent_community/portal_head`](#fluent-community-portal-head)

<a id="fluent-community-rendering-path-ssr-pathParts"></a>

## `fluent_community/rendering_path_ssr_{pathParts}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Dynamic action fired for the first segment of the requested portal path, before the SPA renders.

The placeholder is `$pathParts[0]` — the segment straight after the portal slug — so `/portal/checkout/x` fires `fluent_community/rendering_path_ssr_checkout`. It is the hook for server-rendering a route instead of handing it to the Vue app; the FluentCart checkout and Pro's sitemap generator both use it and end the request themselves. Like `fluent_community/portal_action_{action}` it fires before every access check, and the segment must also be registered through `fluent_community/app_route_paths` or the URL will not route to the portal at all on a root-mounted install.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$pathParts` | `array` | The requested path exploded on `/`, including the first segment. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:814` | `$pathParts` (mixed) |

### Example

```php
add_action('fluent_community/rendering_path_ssr_{pathParts}', function ($pathParts) {
}, 10, 1);
```

**Related:** [`fluent_community/app_route_paths`](/hooks/filters/rendering#fluent-community-app-route-paths) · [`fluent_community/portal_action_{action}`](#fluent-community-portal-action-action)

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:863` | `$link` (mixed) |

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
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:859` | `$link` (mixed) |

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
- **When it fires:** Renders the right-hand group of the portal header — search, notifications, and the account menu.

Core attaches `PortalHandler::renderTopMenuRightItems()` at the default priority, so a callback added here appends beside the default block rather than replacing it; remove the core action to take the region over. For additions inside the default list use the finer-grained `fluent_community/before_header_right_menu_items` and `fluent_community/after_header_right_menu_items` instead.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$context` | `string` | Render context: `headless`, `wp`, or `block_editor`. The `headless` context suppresses the server-rendered notification bell, since the SPA draws its own. |

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:58` | `$context` (mixed) |

### Example

```php
add_action('fluent_community/top_menu_right_items', function ($context) {
}, 10, 1);
```

**Related:** [`fluent_community/before_header_right_menu_items`](#fluent-community-before-header-right-menu-items) · [`fluent_community/after_header_right_menu_items`](#fluent-community-after-header-right-menu-items)

