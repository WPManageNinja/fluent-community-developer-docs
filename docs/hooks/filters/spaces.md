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

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:245` | `[ 'spaces' => $spaces ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_spaces_api_response', function ($param1, $all) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-get-lockscreen-settings"></a>

## `fluent_community/get_lockscreen_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-lockscreen-fields"></a>

## `fluent_community/lockscreen_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/LockscreenService.php:80` | `$settings` (mixed)<br>`$space` (Space) |

### Example

```php
add_filter('fluent_community/lockscreen_fields', function ($settings, $space) {
    return $settings;
}, 10, 2);
```

<a id="fluent-community-lockscreen-formatted-field"></a>

## `fluent_community/lockscreen_formatted_field`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-main-menu-items"></a>

## `fluent_community/main_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1242` | `$primaryMenuItems` (mixed)<br>`$scope` (mixed) |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1188` | `$items` (mixed)<br>`$scope` (mixed) |

### Example

```php
add_filter('fluent_community/main_menu_items', function ($primaryMenuItems, $scope) {
    return $primaryMenuItems;
}, 10, 2);
```

<a id="fluent-community-menu-groups"></a>

## `fluent_community/menu_groups`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-menu-items-api-response"></a>

## `fluent_community/menu_items_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:31` | `$data` (mixed)<br>`$this->request->all()` (array) |

### Example

```php
add_filter('fluent_community/menu_items_api_response', function ($data, $request) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-menu-settings-api-response"></a>

## `fluent_community/menu_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:109` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/menu_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-mobile-menu"></a>

## `fluent_community/mobile_menu`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

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

<a id="fluent-community-settings-menu"></a>

## `fluent_community/settings_menu`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1237` | `[]` (array)<br>`$userModel` (mixed) |

### Example

```php
add_filter('fluent_community/settings_menu', function ($param1, $userModel) {
    return $param1;
}, 10, 2);
```

<a id="fluent-community-space-api-response"></a>

## `fluent_community/space_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:273` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-space-groups-api-response"></a>

## `fluent_community/space_groups_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:844` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_groups_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent-community-space-create-data"></a>

## `fluent_community/space/create_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:79` | `array (7 keys: title, slug, privacy, …)` (array) |

### Example

```php
add_filter('fluent_community/space/create_data', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent-community-space-join-status-for-private"></a>

## `fluent_community/space/join_status_for_private`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:498` | `'pending'` (string)<br>`$space` (Space)<br>`$user` (User) |

### Example

```php
add_filter('fluent_community/space/join_status_for_private', function ($param1, $space, $user) {
    return $param1;
}, 10, 3);
```

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

<a id="fluent-community-spaces-api-response"></a>

## `fluent_community/spaces_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:34` | `$data` (mixed)<br>`$this->request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:208` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/spaces_api_response', function ($data, $request) {
    return $data;
}, 10, 2);
```

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

