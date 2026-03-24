---
title: Spaces Actions
description: Spaces action hooks for FluentCommunity.
---

# Spaces Actions

30 unique action hooks currently map to this category, across 57 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/after_header_menu`](#fluent_communityafter_header_menu) | Core | 1 | `fluent-community/app/Views/portal/header.php:58` |
| [`fluent_community/after_header_right_menu_items`](#fluent_communityafter_header_right_menu_items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:366` |
| [`fluent_community/after_portal_sidebar`](#fluent_communityafter_portal_sidebar) | Core | 1 | `fluent-community/app/Views/portal/main_sidebar.php:144` |
| [`fluent_community/before_header_menu_items`](#fluent_communitybefore_header_menu_items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:310` |
| [`fluent_community/before_header_right_menu_items`](#fluent_communitybefore_header_right_menu_items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:246` |
| [`fluent_community/before_portal_dom`](#fluent_communitybefore_portal_dom) | Core | 4 | `fluent-community/app/Views/portal_page.php:78` |
| [`fluent_community/before_portal_rendered`](#fluent_communitybefore_portal_rendered) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:857` |
| [`fluent_community/course/topic_completed`](#fluent_communitycoursetopic_completed) | Core | 1 | `fluent-community/Modules/Course/Services/CourseHelper.php:210` |
| [`fluent_community/portal_action_{action}`](#fluent_communityportal_action_action) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:783` |
| [`fluent_community/portal_footer`](#fluent_communityportal_footer) | Core + <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:82` |
| [`fluent_community/portal_head`](#fluent_communityportal_head) | Core | 1 | `fluent-community/app/Views/portal_page.php:74` |
| [`fluent_community/portal_head_meta`](#fluent_communityportal_head_meta) | Core | 1 | `fluent-community/app/Views/portal_page.php:34` |
| [`fluent_community/portal_header`](#fluent_communityportal_header) | Core + <span class="pro-badge">PRO</span> | 6 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:64` |
| [`fluent_community/portal_html`](#fluent_communityportal_html) | Core | 1 | `fluent-community/app/Views/portal_page.php:80` |
| [`fluent_community/portal_render_for_user`](#fluent_communityportal_render_for_user) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:843` |
| [`fluent_community/portal_sidebar`](#fluent_communityportal_sidebar) | Core + <span class="pro-badge">PRO</span> | 7 | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:71` |
| [`fluent_community/portal/not_logged_in`](#fluent_communityportalnot_logged_in) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:804` |
| [`fluent_community/portal/viewed`](#fluent_communityportalviewed) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:809` |
| [`fluent_community/rendering_headless_portal`](#fluent_communityrendering_headless_portal) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:854` |
| [`fluent_community/space`](#fluent_communityspace) | Core | 3 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:413` |
| [`fluent_community/space/before_delete`](#fluent_communityspacebefore_delete) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:505` |
| [`fluent_community/space/created`](#fluent_communityspacecreated) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:136` |
| [`fluent_community/space/deleted`](#fluent_communityspacedeleted) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:522` |
| [`fluent_community/space/join_requested`](#fluent_communityspacejoin_requested) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:456` |
| [`fluent_community/space/joined`](#fluent_communityspacejoined) | Core + <span class="pro-badge">PRO</span> | 6 | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:245` |
| [`fluent_community/space/member/role_updated`](#fluent_communityspacememberrole_updated) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:573` |
| [`fluent_community/space/update_meta_settings_{metaProvider}`](#fluent_communityspaceupdate_meta_settings_metaProvider) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:329` |
| [`fluent_community/space/updated`](#fluent_communityspaceupdated) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:323` |
| [`fluent_community/space/user_left`](#fluent_communityspaceuser_left) | Core + <span class="pro-badge">PRO</span> | 4 | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:365` |
| [`fluent_community/top_menu_right_items`](#fluent_communitytop_menu_right_items) | Core | 1 | `fluent-community/app/Views/portal/header.php:61` |

<a id="fluent_communityafter_header_menu"></a>

## `fluent_community/after_header_menu`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** After Header Menu hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:58` | `$context` (mixed) |

### Example

```php
add_action('fluent_community/after_header_menu', function ($context) {
}, 10, 1);
```

<a id="fluent_communityafter_header_right_menu_items"></a>

## `fluent_community/after_header_right_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** After Header Right Menu Items hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:366` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/after_header_right_menu_items', function ($auth) {
}, 10, 1);
```

<a id="fluent_communityafter_portal_sidebar"></a>

## `fluent_community/after_portal_sidebar`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** After Portal Sidebar hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/main_sidebar.php:144` | `$context` (mixed) |

### Example

```php
add_action('fluent_community/after_portal_sidebar', function ($context) {
}, 10, 1);
```

<a id="fluent_communitybefore_header_menu_items"></a>

## `fluent_community/before_header_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Before Header Menu Items hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:310` | `$auth` (mixed)<br>`$context` (mixed) |

### Example

```php
add_action('fluent_community/before_header_menu_items', function ($auth, $context) {
}, 10, 2);
```

<a id="fluent_communitybefore_header_right_menu_items"></a>

## `fluent_community/before_header_right_menu_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Before Header Right Menu Items hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:246` | `$auth` (mixed) |

### Example

```php
add_action('fluent_community/before_header_right_menu_items', function ($auth) {
}, 10, 1);
```

<a id="fluent_communitybefore_portal_dom"></a>

## `fluent_community/before_portal_dom`

- **Type:** action
- **Edition:** Core
- **Call sites:** 4
- **When it fires:** Before Portal Dom hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:78` | No parameters |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:165` | No parameters |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:24` | No parameters |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:24` | No parameters |

### Example

```php
add_action('fluent_community/before_portal_dom', function () {
}, 10, 0);
```

<a id="fluent_communitybefore_portal_rendered"></a>

## `fluent_community/before_portal_rendered`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Before Portal Rendered hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:857` | `$data` (mixed) |

### Example

```php
add_action('fluent_community/before_portal_rendered', function ($data) {
}, 10, 1);
```

<a id="fluent_communitycoursetopic_completed"></a>

## `fluent_community/course/topic_completed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Course/Topic Completed hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/Modules/Course/Services/CourseHelper.php:210` | `$topic` (mixed)<br>`$userId` (mixed)<br>`$lesson` (mixed) |

### Example

```php
add_action('fluent_community/course/topic_completed', function ($topic, $userId, $lesson) {
}, 10, 3);
```

<a id="fluent_communityportal_action_action"></a>

## `fluent_community/portal_action_{action}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Action {Action} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:783` | `$_GET` (mixed) |

### Example

```php
add_action('fluent_community/portal_action_{action}', function ($_get) {
}, 10, 1);
```

<a id="fluent_communityportal_footer"></a>

## `fluent_community/portal_footer`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Portal Footer hook emitted from the current call site.

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

<a id="fluent_communityportal_head"></a>

## `fluent_community/portal_head`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Head hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:74` | No parameters |

### Example

```php
add_action('fluent_community/portal_head', function () {
}, 10, 0);
```

<a id="fluent_communityportal_head_meta"></a>

## `fluent_community/portal_head_meta`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Head Meta hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:34` | `$landing_route` (mixed) |

### Example

```php
add_action('fluent_community/portal_head_meta', function ($landing_route) {
}, 10, 1);
```

<a id="fluent_communityportal_header"></a>

## `fluent_community/portal_header`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 6
- **When it fires:** Portal Header hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:64` | `'headless'` (mixed) |
| Core | `fluent-community/app/Views/portal/portal.php:3` | `'headless'` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:169` | `$contenx` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:204` | `'headless'` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:27` | `'wp'` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:27` | `'wp'` (mixed) |

### Example

```php
add_action('fluent_community/portal_header', function ($param1) {
}, 10, 1);
```

<a id="fluent_communityportal_html"></a>

## `fluent_community/portal_html`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal HTML hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal_page.php:80` | No parameters |

### Example

```php
add_action('fluent_community/portal_html', function () {
}, 10, 0);
```

<a id="fluent_communityportal_render_for_user"></a>

## `fluent_community/portal_render_for_user`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Render For User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:843` | `$xprofile` (mixed) |

### Example

```php
add_action('fluent_community/portal_render_for_user', function ($xprofile) {
}, 10, 1);
```

<a id="fluent_communityportal_sidebar"></a>

## `fluent_community/portal_sidebar`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 7
- **When it fires:** Portal Sidebar hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Hooks/Handlers/ShortCodeHandler.php:71` | `'headless'` (mixed) |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:37` | `'ajax'` (mixed) |
| Core | `fluent-community/app/Views/portal/portal.php:9` | `'headless'` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:176` | `$contenx` (mixed) |
| Core | `fluent-community/Modules/Gutenberg/EditorBlock.php:212` | `'headless'` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame-full.php:33` | `'wp'` (mixed) |
| Core | `fluent-community/Modules/Theming/templates/fluent-community-frame.php:33` | `'wp'` (mixed) |

### Example

```php
add_action('fluent_community/portal_sidebar', function ($param1) {
}, 10, 1);
```

<a id="fluent_communityportalnot_logged_in"></a>

## `fluent_community/portal/not_logged_in`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal/Not Logged In hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:804` | `$authUrl` (mixed) |

### Example

```php
add_action('fluent_community/portal/not_logged_in', function ($authUrl) {
}, 10, 1);
```

<a id="fluent_communityportalviewed"></a>

## `fluent_community/portal/viewed`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal/Viewed hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:809` | No parameters |

### Example

```php
add_action('fluent_community/portal/viewed', function () {
}, 10, 0);
```

<a id="fluent_communityrendering_headless_portal"></a>

## `fluent_community/rendering_headless_portal`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Rendering Headless Portal hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:854` | `$data` (mixed) |

### Example

```php
add_action('fluent_community/rendering_headless_portal', function ($data) {
}, 10, 1);
```

<a id="fluent_communityspace"></a>

## `fluent_community/space`

- **Type:** action
- **Edition:** Core
- **Call sites:** 3
- **When it fires:** Space hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:413` | `[&$space]` (array) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:222` | `[&$space]` (array) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:246` | `[&$space]` (array) |

### Example

```php
add_action('fluent_community/space', function ($space) {
}, 10, 1);
```

<a id="fluent_communityspacebefore_delete"></a>

## `fluent_community/space/before_delete`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Before Delete hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:505` | `$space` (Space|mixed) |

### Example

```php
add_action('fluent_community/space/before_delete', function ($space) {
}, 10, 1);
```

<a id="fluent_communityspacecreated"></a>

## `fluent_community/space/created`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Created hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:136` | `$space` (Space|mixed)<br>`$data` (mixed) |

### Example

```php
add_action('fluent_community/space/created', function ($space, $data) {
}, 10, 2);
```

<a id="fluent_communityspacedeleted"></a>

## `fluent_community/space/deleted`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Deleted hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:522` | `$spaceId` (Space|mixed) |

### Example

```php
add_action('fluent_community/space/deleted', function ($spaceId) {
}, 10, 1);
```

<a id="fluent_communityspacejoin_requested"></a>

## `fluent_community/space/join_requested`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Join Requested hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:456` | `$space` (Space|mixed)<br>`$user->ID` (mixed)<br>`'self'` (mixed) |

### Example

```php
add_action('fluent_community/space/join_requested', function ($space, $id, $param3) {
}, 10, 3);
```

<a id="fluent_communityspacejoined"></a>

## `fluent_community/space/joined`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 6
- **When it fires:** Space/Joined hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:245` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`'by_admin'` (mixed) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:458` | `$space` (Space|mixed)<br>`$user->ID` (mixed)<br>`'self'` (mixed) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:587` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`'by_admin'` (mixed) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:605` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`'by_admin'` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1615` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`$by` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1639` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`$by` (mixed)<br>`$created` (mixed) |

### Example

```php
add_action('fluent_community/space/joined', function ($space, $userId, $param3) {
}, 10, 3);
```

<a id="fluent_communityspacememberrole_updated"></a>

## `fluent_community/space/member/role_updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Space/Member/Role Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:573` | `$space` (Space|mixed)<br>`$pivot` (mixed) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:590` | `$space` (Space|mixed)<br>`$pivot` (mixed) |

### Example

```php
add_action('fluent_community/space/member/role_updated', function ($space, $pivot) {
}, 10, 2);
```

<a id="fluent_communityspaceupdate_meta_settings_metaProvider"></a>

## `fluent_community/space/update_meta_settings_{metaProvider}`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Update Meta Settings {MetaProvider} hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:329` | `$metaData` (mixed)<br>`$space` (Space|mixed) |

### Example

```php
add_action('fluent_community/space/update_meta_settings_{metaProvider}', function ($metaData, $space) {
}, 10, 2);
```

<a id="fluent_communityspaceupdated"></a>

## `fluent_community/space/updated`

- **Type:** action
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Space/Updated hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:323` | `$space` (Space|mixed)<br>`$data` (mixed) |
| Core | `fluent-community/app/Models/BaseSpace.php:312` | `$this` (mixed)<br>`$dirty` (mixed) |

### Example

```php
add_action('fluent_community/space/updated', function ($space, $data) {
}, 10, 2);
```

<a id="fluent_communityspaceuser_left"></a>

## `fluent_community/space/user_left`

- **Type:** action
- **Edition:** Core + <span class="pro-badge">PRO</span>
- **Call sites:** 4
- **When it fires:** Space/User Left hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/ContactAdvancedFilter.php:365` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`'by_admin'` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Services/Integrations/FluentCRM/RemoveFromSpaceAction.php:87` | `$space` (Space|mixed)<br>`$user->ID` (mixed)<br>`'automation'` (mixed) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:642` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`'by_admin'` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:1689` | `$space` (Space|mixed)<br>`$userId` (mixed)<br>`$by` (mixed) |

### Example

```php
add_action('fluent_community/space/user_left', function ($space, $userId, $param3) {
}, 10, 3);
```

<a id="fluent_communitytop_menu_right_items"></a>

## `fluent_community/top_menu_right_items`

- **Type:** action
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Top Menu Right Items hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Views/portal/header.php:61` | `$context` (mixed) |

### Example

```php
add_action('fluent_community/top_menu_right_items', function ($context) {
}, 10, 1);
```

