---
title: Miscellaneous Actions
description: Miscellaneous action hooks for FluentCommunity.
---

# Miscellaneous Actions

28 unique action hooks currently map to this category, across 35 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/after_header_logo`](#fluent_communityafter_header_logo) | Core | 1 | `fluent-community/app/Views/portal/header.php:48` |
| [`fluent_community/after_registration_form`](#fluent_communityafter_registration_form) | Core | 1 | `fluent-community/app/Views/auth/user_invitation.php:52` |
| [`fluent_community/after_sidebar_wrap`](#fluent_communityafter_sidebar_wrap) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:142` |
| [`fluent_community/before_header_logo`](#fluent_communitybefore_header_logo) | Core | 1 | `fluent-community/app/Views/portal/header.php:37` |
| [`fluent_community/before_js_loaded`](#fluent_communitybefore_js_loaded) | Core + <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:81` |
| [`fluent_community/before_registration_form`](#fluent_communitybefore_registration_form) | Core | 1 | `fluent-community/app/Views/auth/user_invitation.php:16` |
| [`fluent_community/block_editor_footer`](#fluent_communityblock_editor_footer) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:400` |
| [`fluent_community/block_editor_head`](#fluent_communityblock_editor_head) | Core | 1 | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:393` |
| [`fluent_community/content_flagged`](#fluent_communitycontent_flagged) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:204` |
| [`fluent_community/enqueue_global_assets`](#fluent_communityenqueue_global_assets) | Core | 4 | `fluent-community/Modules/Auth/AuthModdule.php:184` |
| [`fluent_community/headless/before_js_loaded`](#fluent_communityheadlessbefore_js_loaded) | Core | 1 | `fluent-community/app/Views/headless_page.php:95` |
| [`fluent_community/headless/content`](#fluent_communityheadlesscontent) | Core | 2 | `fluent-community/app/Views/headless_page.php:79` |
| [`fluent_community/headless/footer`](#fluent_communityheadlessfooter) | Core | 1 | `fluent-community/app/Views/headless_page.php:103` |
| [`fluent_community/headless/head`](#fluent_communityheadlesshead) | Core | 1 | `fluent-community/app/Views/headless_page.php:51` |
| [`fluent_community/headless/head_early`](#fluent_communityheadlesshead_early) | Core | 1 | `fluent-community/app/Views/headless_page.php:46` |
| [`fluent_community/install_fluent_player_plugin`](#fluent_communityinstall_fluent_player_plugin) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:300` |
| [`fluent_community/install_messaging_plugin`](#fluent_communityinstall_messaging_plugin) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:293` |
| [`fluent_community/managed/after_remove`](#fluent_communitymanagedafter_remove) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:120` |
| [`fluent_community/manager/added`](#fluent_communitymanageradded) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:96` |
| [`fluent_community/manager/before_remove`](#fluent_communitymanagerbefore_remove) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:116` |
| [`fluent_community/manager/updated`](#fluent_communitymanagerupdated) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:79` |
| [`fluent_community/paywall_added`](#fluent_communitypaywall_added) | Core | 1 | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:93` |
| [`fluent_community/paywall_removed`](#fluent_communitypaywall_removed) | Core | 1 | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:128` |
| [`fluent_community/reactivate_account`](#fluent_communityreactivate_account) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:228` |
| [`fluent_community/rendering_path_ssr_{pathParts}`](#fluent_communityrendering_path_ssr_pathParts) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:787` |
| [`fluent_community/sidebar_link/after_delete`](#fluent_communitysidebar_linkafter_delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:745` |
| [`fluent_community/sidebar_link/before_delete`](#fluent_communitysidebar_linkbefore_delete) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:741` |
| [`fluent_community/track_activity`](#fluent_communitytrack_activity) | Core | 3 | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:80` |

<a id="fluent_communityafter_header_logo"></a>

## `fluent_community/after_header_logo`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** After Header Logo hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:48` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/after_header_logo', function ($auth) {
}, 10, 1);
```

<a id="fluent_communityafter_registration_form"></a>

## `fluent_community/after_registration_form`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** After Registration Form hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/user_invitation.php:52` | No parameters |

### Example

```php
add_action('fluent_community/after_registration_form', function () {
}, 10, 0);
```

<a id="fluent_communityafter_sidebar_wrap"></a>

## `fluent_community/after_sidebar_wrap`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** After Sidebar Wrap hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:142` | `$context` (mixed) |

### Example

```php
add_action('fluent_community/after_sidebar_wrap', function ($context) {
}, 10, 1);
```

<a id="fluent_communitybefore_header_logo"></a>

## `fluent_community/before_header_logo`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Before Header Logo hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:37` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/before_header_logo', function ($auth) {
}, 10, 1);
```

<a id="fluent_communitybefore_js_loaded"></a>

## `fluent_community/before_js_loaded`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Before Js Loaded hook emitted from the current call site.

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

<a id="fluent_communitybefore_registration_form"></a>

## `fluent_community/before_registration_form`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Before Registration Form hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/auth/user_invitation.php:16` | No parameters |

### Example

```php
add_action('fluent_community/before_registration_form', function () {
}, 10, 0);
```

<a id="fluent_communityblock_editor_footer"></a>

## `fluent_community/block_editor_footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Block Editor Footer hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:400` | No parameters |

### Example

```php
add_action('fluent_community/block_editor_footer', function () {
}, 10, 0);
```

<a id="fluent_communityblock_editor_head"></a>

## `fluent_community/block_editor_head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Block Editor Head hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/FluentBlockEditorHandler.php:393` | No parameters |

### Example

```php
add_action('fluent_community/block_editor_head', function () {
}, 10, 0);
```

<a id="fluent_communitycontent_flagged"></a>

## `fluent_community/content_flagged`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Content Flagged hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ModerationHandler.php:204` | `$report` (mixed)<br>`$content` (mixed) |

### Example

```php
add_action('fluent_community/content_flagged', function ($report, $content) {
}, 10, 2);
```

<a id="fluent_communityenqueue_global_assets"></a>

## `fluent_community/enqueue_global_assets`

- **Type:** action
- **Edition:** Core
- **Call sites:** 4
- **When it fires:** Enqueue Global Assets hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Auth/AuthModdule.php:184` | `true` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:129` | `$useBuildInTheme` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:195` | `true` (mixed) |
| Core | `fluent-community/Modules/Theming/TemplateLoader.php:200` | `true` (mixed) |

### Example

```php
add_action('fluent_community/enqueue_global_assets', function ($param1) {
}, 10, 1);
```

<a id="fluent_communityheadlessbefore_js_loaded"></a>

## `fluent_community/headless/before_js_loaded`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Headless/Before Js Loaded hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:95` | `$scope` (mixed) |

### Example

```php
add_action('fluent_community/headless/before_js_loaded', function ($scope) {
}, 10, 1);
```

<a id="fluent_communityheadlesscontent"></a>

## `fluent_community/headless/content`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Headless/Content hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:79` | `$scope` (mixed) |
| Core | `fluent-community/app/Views/headless_page.php:85` | `$scope` (mixed) |

### Example

```php
add_action('fluent_community/headless/content', function ($scope) {
}, 10, 1);
```

<a id="fluent_communityheadlessfooter"></a>

## `fluent_community/headless/footer`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Headless/Footer hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:103` | `$scope` (mixed) |

### Example

```php
add_action('fluent_community/headless/footer', function ($scope) {
}, 10, 1);
```

<a id="fluent_communityheadlesshead"></a>

## `fluent_community/headless/head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Headless/Head hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:51` | `$scope` (mixed) |

### Example

```php
add_action('fluent_community/headless/head', function ($scope) {
}, 10, 1);
```

<a id="fluent_communityheadlesshead_early"></a>

## `fluent_community/headless/head_early`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Headless/Head Early hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/headless_page.php:46` | `$scope` (mixed) |

### Example

```php
add_action('fluent_community/headless/head_early', function ($scope) {
}, 10, 1);
```

<a id="fluent_communityinstall_fluent_player_plugin"></a>

## `fluent_community/install_fluent_player_plugin`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Install Fluent Player Plugin hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:300` | No parameters |

### Example

```php
add_action('fluent_community/install_fluent_player_plugin', function () {
}, 10, 0);
```

<a id="fluent_communityinstall_messaging_plugin"></a>

## `fluent_community/install_messaging_plugin`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Install Messaging Plugin hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:293` | No parameters |

### Example

```php
add_action('fluent_community/install_messaging_plugin', function () {
}, 10, 0);
```

<a id="fluent_communitymanagedafter_remove"></a>

## `fluent_community/managed/after_remove`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Managed/After Remove hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:120` | `$user` (mixed) |

### Example

```php
add_action('fluent_community/managed/after_remove', function ($user) {
}, 10, 1);
```

<a id="fluent_communitymanageradded"></a>

## `fluent_community/manager/added`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Manager/Added hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:96` | `$user` (mixed)<br>`$roles` (mixed) |

### Example

```php
add_action('fluent_community/manager/added', function ($user, $roles) {
}, 10, 2);
```

<a id="fluent_communitymanagerbefore_remove"></a>

## `fluent_community/manager/before_remove`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Manager/Before Remove hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:116` | `$user` (mixed) |

### Example

```php
add_action('fluent_community/manager/before_remove', function ($user) {
}, 10, 1);
```

<a id="fluent_communitymanagerupdated"></a>

## `fluent_community/manager/updated`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Manager/Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:79` | `$user` (mixed)<br>`$roles` (mixed) |

### Example

```php
add_action('fluent_community/manager/updated', function ($user, $roles) {
}, 10, 2);
```

<a id="fluent_communitypaywall_added"></a>

## `fluent_community/paywall_added`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Paywall Added hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:93` | `$space` (Space|mixed)<br>`$productId` (mixed) |

### Example

```php
add_action('fluent_community/paywall_added', function ($space, $productId) {
}, 10, 2);
```

<a id="fluent_communitypaywall_removed"></a>

## `fluent_community/paywall_removed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Paywall Removed hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Integrations/FluentCart/Http/Controllers/PaywallController.php:128` | `$space` (Space|mixed)<br>`$productId` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_action('fluent_community/paywall_removed', function ($space, $productId, $all) {
}, 10, 3);
```

<a id="fluent_communityreactivate_account"></a>

## `fluent_community/reactivate_account`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Reactivate Account hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:228` | `$xprofile` (mixed) |

### Example

```php
add_action('fluent_community/reactivate_account', function ($xprofile) {
}, 10, 1);
```

<a id="fluent_communityrendering_path_ssr_pathParts"></a>

## `fluent_community/rendering_path_ssr_{pathParts}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Rendering Path Ssr {PathParts} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:787` | `$pathParts` (mixed) |

### Example

```php
add_action('fluent_community/rendering_path_ssr_{pathParts}', function ($pathParts) {
}, 10, 1);
```

<a id="fluent_communitysidebar_linkafter_delete"></a>

## `fluent_community/sidebar_link/after_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Sidebar Link/After Delete hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:745` | `$link` (mixed) |

### Example

```php
add_action('fluent_community/sidebar_link/after_delete', function ($link) {
}, 10, 1);
```

<a id="fluent_communitysidebar_linkbefore_delete"></a>

## `fluent_community/sidebar_link/before_delete`

- **Type:** action
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Sidebar Link/Before Delete hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:741` | `$link` (mixed) |

### Example

```php
add_action('fluent_community/sidebar_link/before_delete', function ($link) {
}, 10, 1);
```

<a id="fluent_communitytrack_activity"></a>

## `fluent_community/track_activity`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Track Activity hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:80` | No parameters |
| Core | `fluent-community/app/Hooks/Handlers/ActivityMonitorHandler.php:102` | No parameters |
| Core | `fluent-community/app/Http/Controllers/FeedsController.php:1195` | No parameters |

### Example

```php
add_action('fluent_community/track_activity', function () {
}, 10, 0);
```

