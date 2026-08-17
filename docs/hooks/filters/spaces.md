---
title: Spaces Filters
description: Spaces filter hooks for FluentCommunity.
---

# Spaces Filters

18 unique filter hooks currently map to this category, across 21 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/all_spaces_api_response`](#fluent-community-all-spaces-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:245` |
| [`fluent_community/get_lockscreen_settings`](#fluent-community-get-lockscreen-settings) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:996` |
| [`fluent_community/lockscreen_fields`](#fluent-community-lockscreen-fields) | Core | 1 | `fluent-community/app/Services/LockscreenService.php:80` |
| [`fluent_community/lockscreen_formatted_field`](#fluent-community-lockscreen-formatted-field) | Core | 1 | `fluent-community/app/Services/LockscreenService.php:112` |
| [`fluent_community/main_menu_items`](#fluent-community-main-menu-items) | Core | 2 | `fluent-community/app/Functions/Utility.php:1242` |
| [`fluent_community/menu_groups`](#fluent-community-menu-groups) | Core | 1 | `fluent-community/app/Services/Helper.php:1341` |
| [`fluent_community/menu_items_api_response`](#fluent-community-menu-items-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/OptionController.php:31` |
| [`fluent_community/menu_settings_api_response`](#fluent-community-menu-settings-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:109` |
| [`fluent_community/mobile_menu`](#fluent-community-mobile-menu) | Core | 1 | `fluent-community/app/Services/Helper.php:1636` |
| [`fluent_community/settings_menu`](#fluent-community-settings-menu) | Core | 1 | `fluent-community/app/Functions/Utility.php:1237` |
| [`fluent_community/space_api_response`](#fluent-community-space-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:273` |
| [`fluent_community/space_groups_api_response`](#fluent-community-space-groups-api-response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:844` |
| [`fluent_community/space/create_data`](#fluent-community-space-create-data) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:79` |
| [`fluent_community/space/join_status_for_private`](#fluent-community-space-join-status-for-private) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:498` |
| [`fluent_community/space/meta_fields`](#fluent-community-space-meta-fields) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:1006` |
| [`fluent_community/space/update_data`](#fluent-community-space-update-data) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:345` |
| [`fluent_community/spaces_api_response`](#fluent-community-spaces-api-response) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:34` |
| [`fluent_community/update_lockscreen_settings`](#fluent-community-update-lockscreen-settings) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:422` |

<a id="fluent-community-all-spaces-api-response"></a>

## `fluent_community/all_spaces_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the paginated all-spaces directory response.

A different endpoint from `fluent_community/spaces_api_response`: this one lists spaces the viewer could join, not just their own. Non-moderators see only public and private spaces plus any secret space they already belong to. Member counts are zeroed for spaces that hide them from non-members, and each space has been through `formatSpaceData()` and `fluent_community/space`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a paginated `spaces` block. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:245` | `[ 'spaces' => $spaces ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_spaces_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/spaces_api_response`](#fluent-community-spaces-api-response) · [`fluent_community/space`](#fluent-community-space)

<a id="fluent-community-get-lockscreen-settings"></a>

## `fluent_community/get_lockscreen_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the lock-screen configuration served for one space.

This is the settings-editing view, reached through the space lock-screen endpoint; the reader-facing lock screen is assembled by `LockscreenService::getLockscreenConfig()` and is only produced for spaces whose privacy is `private`. Secret spaces the viewer cannot see return a 404 before the filter runs.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$lockscreen` | `array` | The stored lock-screen field definitions. |
| 2 | `$space` | `\FluentCommunity\App\Models\Space` | The space whose lock screen was requested. |

**Return:** The lock-screen settings array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:996` | `$lockscreen` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/get_lockscreen_settings', function ($lockscreen, $space) {
    return $lockscreen;
}, 10, 2);
```

**Related:** [`fluent_community/lockscreen_fields`](#fluent-community-lockscreen-fields)

<a id="fluent-community-lockscreen-fields"></a>

## `fluent_community/lockscreen_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the field definitions that make up a space's lock screen.

Each entry has a `name`, a `type` such as `block` or `image`, and the presentation keys for that type. Core's own callback runs at priority 10 and removes fields whose owning plugin is inactive, matching on `name` — `paywall` without FluentCart and `welcome_banner` without Pro — so register additions at a later priority if you want them to survive. In view-only mode `block` content has already been passed through `the_content` and the smart-code parser.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$fields` | `array` | The lock-screen field definitions. |
| 2 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The space the lock screen belongs to. |

**Return:** `array` — a list of field definitions. Return a re-indexed list; the core callback uses `array_values()`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/LockscreenService.php:80` | `$settings` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/lockscreen_fields', function ($fields, $space) {
    return $fields;
}, 10, 2);
```

**Related:** [`fluent_community/lockscreen_formatted_field`](#fluent-community-lockscreen-formatted-field) · [`fluent_community/get_lockscreen_settings`](#fluent-community-get-lockscreen-settings)

<a id="fluent-community-lockscreen-formatted-field"></a>

## `fluent_community/lockscreen_formatted_field`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters one lock-screen field after it has been sanitised for storage.

Runs once per submitted field on save. The core sanitiser only keeps a fixed set of keys — the text and colour fields, `button_link` as a URL, `hidden`, `content` for block fields and `background_image` — so any custom key you added on the read side is dropped before this filter and must be re-attached here. The second argument is the raw submitted field, which is where you will find it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$formattedField` | `array` | The sanitised field, ready to store. |
| 2 | `$value` | `array` | The raw submitted field, including keys the sanitiser dropped. |
| 3 | `$space` | `\FluentCommunity\App\Models\BaseSpace` | The space being saved. |

**Return:** The field array to store.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/LockscreenService.php:112` | `$formattedField` (mixed)<br>`$value` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/lockscreen_formatted_field', function ($formattedField, $value, $space) {
    return $formattedField;
}, 10, 3);
```

**Related:** [`fluent_community/lockscreen_fields`](#fluent-community-lockscreen-fields)

<a id="fluent-community-main-menu-items"></a>

## `fluent_community/main_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the primary navigation items above the space list in the portal sidebar.

Applied at two call sites that both start from the stored `mainMenuItems` group: the sidebar data builder and the server-side header renderer. Items are keyed by slug — `all_feeds`, `spaces` and so on — and the core Course module removes its own entry through this filter when the course feature is off. The mobile bottom bar reads `all_feeds` and `spaces` out of the unfiltered group, so removing an item here does not remove it from mobile; use `fluent_community/mobile_menu` for that.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$items` | `array` | Menu items keyed by slug, each with `title`, `shape_svg` and route data. |
| 2 | `$scope` | `string` | Where the menu is being built; `sidebar` from the sidebar builder. |

**Return:** `array` — the item map, keyed by slug.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1242` | `$primaryMenuItems` (mixed)<br>`$scope` (mixed) |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1188` | `$items` (mixed)<br>`$scope` (mixed) |

### Example

```php
add_filter('fluent_community/main_menu_items', function ($items, $scope) {
    return $items;
}, 10, 2);
```

**Related:** [`fluent_community/mobile_menu`](#fluent-community-mobile-menu) · [`fluent_community/menu_groups`](#fluent-community-menu-groups) · [`fluent_community/sidebar_menu_groups_config`](#fluent-community-sidebar-menu-groups-config)

<a id="fluent-community-menu-groups"></a>

## `fluent_community/menu_groups`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the assembled menu group structure used to render the sidebar.

Applied only when the menu is built with the `view` context, so the admin menu-settings screen — which uses the editing context — never sees it. By this point links have already been filtered for accessibility against the current user. The array holds four keys: `mainMenuItems`, `profileDropdownItems`, `beforeCommunityMenuItems` and `afterCommunityLinkGroups`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$menuGroups` | `array` | The four menu groups: `mainMenuItems`, `profileDropdownItems`, `beforeCommunityMenuItems`, `afterCommunityLinkGroups`. |

**Return:** `array` — the group map. Removing a key will break the sidebar builder, which reads all four.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1341` | `$menuGroups` (mixed) |

### Example

```php
add_filter('fluent_community/menu_groups', function ($menuGroups) {
    return $menuGroups;
}, 10, 1);
```

**Related:** [`fluent_community/main_menu_items`](#fluent-community-main-menu-items) · [`fluent_community/menu_settings_api_response`](#fluent-community-menu-settings-api-response)

<a id="fluent-community-menu-items-api-response"></a>

## `fluent_community/menu_items_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the sidebar navigation payload the portal fetches to refresh its menu.

The payload is the output of `Utility::getPortalSidebarData('sidebar')` unwrapped — `primaryItems`, `spaceGroups`, `settingsItems`, `topInlineLinks`, `bottomLinkGroups`, `is_admin`, `has_color_scheme` and `context` — not a payload with a `menu` key. The same structure is filtered one step earlier by `fluent_community/sidebar_menu_groups_config`, which is also used by the server-rendered sidebar; changes made here affect the REST refresh only.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The sidebar data structure. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The sidebar data array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:31` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/menu_items_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/sidebar_menu_groups_config`](#fluent-community-sidebar-menu-groups-config) · [`fluent_community/main_menu_items`](#fluent-community-main-menu-items)

<a id="fluent-community-menu-settings-api-response"></a>

## `fluent_community/menu_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the menu configuration returned to the admin menu-settings screen.

The editing counterpart of `fluent_community/menu_items_api_response`: it returns the stored configuration including disabled and privacy-restricted entries, because the screen must be able to re-enable them. Groups under `afterCommunityLinkGroups` have been normalised to `title`, `slug` and a re-indexed `items` list, and groups without a title are dropped.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `menuSettings` structure. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:109` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/menu_settings_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/menu_groups`](#fluent-community-menu-groups)

<a id="fluent-community-mobile-menu"></a>

## `fluent_community/mobile_menu`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the items in the portal's mobile bottom navigation bar.

Built independently of the sidebar: it looks up only `all_feeds` and `spaces` from the stored main menu, falling back to bundled SVGs when a custom icon is not set, then appends either a profile link or, for guests, a login link. Items are a flat, ordered list with `route`, `title` and `icon_svg`, and custom icons have already been through the SVG sanitiser — sanitise any markup you add yourself.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$mobileMenuItems` | `array` | Ordered items, each with `route` or `permalink`, `title` and `icon_svg`. |
| 2 | `$xprofile` | `\FluentCommunity\App\Models\XProfile` | The viewing member, or `null` for a guest. |
| 3 | `$context` | `string` | Render context; `headless` by default. |

**Return:** `array` — the ordered item list.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1636` | `$mobileMenuItems` (mixed)<br>`$xprofile` (XProfile)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/mobile_menu', function ($mobileMenuItems, $xprofile, $context) {
    return $mobileMenuItems;
}, 10, 3);
```

**Related:** [`fluent_community/main_menu_items`](#fluent-community-main-menu-items)

<a id="fluent-community-settings-menu"></a>

## `fluent_community/settings_menu`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Collects the entries shown in the sidebar's settings section.

Starts as an empty array and nothing in core adds to it, so the section is absent unless something hooks in. It is resolved once per sidebar build and reaches the portal as `settingsItems` inside `fluent_community/sidebar_menu_groups_config`. The user model is `null` for a logged-out visitor.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settingsMenu` | `array` | The settings entries. Empty by default. |
| 2 | `$userModel` | `\FluentCommunity\App\Models\User` | The current user, or `null` for a guest. |

**Return:** `array` — the settings entries.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1237` | `[]` (array)<br>`$userModel` (mixed) |

### Example

```php
add_filter('fluent_community/settings_menu', function ($settingsMenu, $userModel) {
    return $settingsMenu;
}, 10, 2);
```

**Related:** [`fluent_community/sidebar_menu_groups_config`](#fluent-community-sidebar-menu-groups-config) · [`fluent_community/main_menu_items`](#fluent-community-main-menu-items)

<a id="fluent-community-space-api-response"></a>

## `fluent_community/space_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the single-space response.

The space has been through `formatSpaceData()` and `fluent_community/space` before the filter runs, so it already carries `permissions`, `membership`, `topics`, `header_links` and — for anyone who is not a space admin — `lockscreen_config` and a link list narrowed to what the viewer may see. A secret space the viewer has no membership of returns a 404 indistinguishable from a missing space, so the filter never sees it.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `space` key. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:273` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/space`](#fluent-community-space) · [`fluent_community/spaces_api_response`](#fluent-community-spaces-api-response)

<a id="fluent-community-space-groups-api-response"></a>

## `fluent_community/space_groups_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the grouped space tree used by the admin space management screen.

Returns `groups`, each with its `spaces`, plus `orphaned_spaces` for community and course spaces that have no parent group. Community spaces in both lists have been through `formatSpaceData()`, while courses only get their topics attached. The `options_only` request variant returns a bare `groups` list of IDs and titles and is not filtered.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload: `groups` and `orphaned_spaces`. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:844` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_groups_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/all_spaces_api_response`](#fluent-community-all-spaces-api-response)

<a id="fluent-community-space-create-data"></a>

## `fluent_community/space/create_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the attributes a new space is about to be created from.

Applied before `Space::create()`, so anything you add must be a real column or a cast attribute. The incoming `settings` have already been sanitised and validated against the chosen privacy, and `serial` has been computed as the next position within the parent group. Note that this filter takes a single argument — the request payload is not passed, so read it from the request if you need it. Cover photo, logo and topics are attached after creation and are not part of this array.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$spaceData` | `array` | The attributes to create the space with: `title`, `slug`, `privacy`, `description`, `settings`, `parent_id`, `serial`. |

**Return:** `array` — the attribute map.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:79` | `array (7 keys: title, slug, privacy, …)` (array) |

### Example

```php
add_filter('fluent_community/space/create_data', function ($spaceData) {
    return $spaceData;
}, 10, 1);
```

**Related:** [`fluent_community/space/created`](#fluent-community-space-created) · [`fluent_community/space/update_data`](#fluent-community-space-update-data)

<a id="fluent-community-space-join-status-for-private"></a>

## `fluent_community/space/join_status_for_private`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the membership status a self-service join produces for a non-public space.

Defaults to `pending`, which is what makes private spaces require approval. Return `active` to admit the member immediately — that is how paywall and automation integrations let a purchase grant instant access. The result is whitelisted: anything other than `pending` or `active` is coerced back to `pending`. The filter is skipped for community admins and moderators, who always join as active, and secret spaces are refused before it is reached. The status chosen here decides whether `fluent_community/space/join_requested` or `fluent_community/space/joined` fires.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$status` | `string` | `pending` by default. |
| 2 | `$space` | `\FluentCommunity\App\Models\Space` | The space being joined. |
| 3 | `$user` | `\FluentCommunity\App\Models\User` | The joining member. |

**Return:** `string` — `pending` or `active`. Any other value is coerced to `pending`.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:498` | `'pending'` (string)<br>`$space` (Space)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/space/join_status_for_private', function ($status, $space, $user) {
    return $status;
}, 10, 3);
```

**Related:** [`fluent_community/space/join_requested`](#fluent-community-space-join-requested) · [`fluent_community/space/joined`](#fluent-community-space-joined)

<a id="fluent-community-space-meta-fields"></a>

## `fluent_community/space/meta_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Collects extra settings sections to render on a space's settings screen.

Starts as an empty array; each contributor adds one entry keyed by a provider slug, containing `section_title`, a `settings` array of current values and a `fields` array of form field definitions. Saving posts the values back through `fluent_community/space/update_meta_settings_{provider}`, so the two must use the same key. Rather than filtering directly, prefer `FluentExtendApi::addMetaBox()`, which wires both sides up for you and works for spaces and courses at once. If nothing is added, the screen shows no additional settings at all.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$metaFields` | `array` | Settings sections keyed by provider slug. Empty by default. |
| 2 | `$space` | `\FluentCommunity\App\Models\Space` | The space whose settings are being rendered. |

**Return:** `array` — the sections map. Returning an empty array suppresses the meta settings response entirely.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:1006` | `[]` (array)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/space/meta_fields', function ($metaFields, $space) {
    return $metaFields;
}, 10, 2);
```

**Related:** [`fluent_community/course/meta_fields`](#fluent-community-course-meta-fields)

<a id="fluent-community-space-update-data"></a>

## `fluent_community/space/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Filters the payload a space is about to be updated with.

Applied just before `BaseSpace::updateCustomData()`, after cover photo and logo URLs have been resolved to claimed media. The array is a request payload rather than a column map — it may carry `topic_ids` and image URLs alongside real columns — and the same array is passed on to `fluent_community/space/updated`. An empty `parent_id` is normalised to an empty string after this filter, so setting it to `null` here has no effect.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | The update payload, including non-column keys such as `topic_ids`, `cover_photo` and `logo`. |
| 2 | `$space` | `\FluentCommunity\App\Models\Space` | The space as currently stored. |

**Return:** `array` — the update payload.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:345` | `$data` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/space/update_data', function ($data, $space) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/space/updated`](#fluent-community-space-updated) · [`fluent_community/space/create_data`](#fluent-community-space-create-data)

<a id="fluent-community-spaces-api-response"></a>

## `fluent_community/spaces_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Filters the listing of spaces the current member belongs to.

Two call sites with different payloads: the bare membership list returns just `spaces`, while the richer listing adds `execution_time` and per-space member counts, zeroed where a space hides them from non-members. Neither is the public directory — that is `fluent_community/all_spaces_api_response`.

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$data` | `array` | Response payload with a `spaces` collection, and `execution_time` on the richer listing. |
| 2 | `$requestData` | `array` | The full request parameters. |

**Return:** The response payload array.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:34` | `$data` (mixed)<br>`$this->request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:208` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/spaces_api_response', function ($data, $requestData) {
    return $data;
}, 10, 2);
```

**Related:** [`fluent_community/all_spaces_api_response`](#fluent-community-all-spaces-api-response) · [`fluent_community/space_api_response`](#fluent-community-space-api-response)

<a id="fluent-community-update-lockscreen-settings"></a>

## `fluent_community/update_lockscreen_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Filters lockscreen (paywall) settings just before they are saved to a space or course.

Shared by both endpoints — PUT /spaces/{spaceSlug}/lockscreens and PUT /admin/courses/{course_id}/lockscreens — so the second argument is a Space on one path and a Course on the other. Branch on the model type if the two need different handling. Runs after LockscreenService::formatLockscreenFields().

### Parameters

| # | Name | Type | Description |
| --- | --- | --- | --- |
| 1 | `$settings` | `array` | The formatted lockscreen fields. |
| 2 | `$target` | `\FluentCommunity\App\Models\BaseSpace` | The Space or Course the lockscreen belongs to. |

**Return:** The lockscreen settings array to persist.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:422` | `$formattedFields` (mixed)<br>`$course` (Course) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:447` | `$formattedFields` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/update_lockscreen_settings', function ($settings, $target) {
    return $settings;
}, 10, 2);
```

