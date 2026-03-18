---
title: Spaces Filters
description: Spaces filter hooks for FluentCommunity.
---

# Spaces Filters

39 unique filter hooks currently map to this category, across 49 call sites.

## Hook Inventory

| Hook | Edition | Call Sites | First Source |
| --- | --- | --- | --- |
| [`fluent_community/activity/after_contents_space`](#fluent_communityactivityafter_contents_space) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:94` |
| [`fluent_community/activity/before_contents_space`](#fluent_communityactivitybefore_contents_space) | Core | 1 | `fluent-community/app/Http/Controllers/ActivityController.php:95` |
| [`fluent_community/all_space_courses_api_response`](#fluent_communityall_space_courses_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/AdminController.php:551` |
| [`fluent_community/all_spaces_api_response`](#fluent_communityall_spaces_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:225` |
| [`fluent_community/can_access_portal`](#fluent_communitycan_access_portal) | Core | 7 | `fluent-community/app/Services/Helper.php:430` |
| [`fluent_community/general_portal_vars`](#fluent_communitygeneral_portal_vars) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:751` |
| [`fluent_community/get_lockscreen_settings`](#fluent_communityget_lockscreen_settings) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:918` |
| [`fluent_community/lockscreen_fields`](#fluent_communitylockscreen_fields) | Core | 1 | `fluent-community/app/Services/LockscreenService.php:80` |
| [`fluent_community/lockscreen_formatted_field`](#fluent_communitylockscreen_formatted_field) | Core | 1 | `fluent-community/app/Services/LockscreenService.php:112` |
| [`fluent_community/main_menu_items`](#fluent_communitymain_menu_items) | Core | 2 | `fluent-community/app/Functions/Utility.php:1167` |
| [`fluent_community/menu_groups`](#fluent_communitymenu_groups) | Core | 1 | `fluent-community/app/Services/Helper.php:1216` |
| [`fluent_community/menu_groups_for_user`](#fluent_communitymenu_groups_for_user) | Core | 1 | `fluent-community/app/Services/Helper.php:839` |
| [`fluent_community/menu_items_api_response`](#fluent_communitymenu_items_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/OptionController.php:31` |
| [`fluent_community/menu_settings_api_response`](#fluent_communitymenu_settings_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SettingController.php:94` |
| [`fluent_community/mobile_menu`](#fluent_communitymobile_menu) | Core | 1 | `fluent-community/app/Services/Helper.php:1496` |
| [`fluent_community/portal_data_vars`](#fluent_communityportal_data_vars) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:982` |
| [`fluent_community/portal_page_headless`](#fluent_communityportal_page_headless) | Core | 1 | `fluent-community/app/Services/Helper.php:117` |
| [`fluent_community/portal_route_type`](#fluent_communityportal_route_type) | Core | 1 | `fluent-community/app/Services/Helper.php:107` |
| [`fluent_community/portal_settings_menu_items`](#fluent_communityportal_settings_menu_items) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalSettingsHandler.php:68` |
| [`fluent_community/portal_slug`](#fluent_communityportal_slug) | Core | 1 | `fluent-community/app/Services/Helper.php:78` |
| [`fluent_community/portal_supported_query_params`](#fluent_communityportal_supported_query_params) | Core | 1 | `fluent-community/app/Services/Helper.php:2004` |
| [`fluent_community/portal_vars`](#fluent_communityportal_vars) | Core | 1 | `fluent-community/app/Hooks/Handlers/PortalHandler.php:465` |
| [`fluent_community/profile_spaces_api_response`](#fluent_communityprofile_spaces_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/ProfileController.php:471` |
| [`fluent_community/settings_menu`](#fluent_communitysettings_menu) | Core | 1 | `fluent-community/app/Functions/Utility.php:1162` |
| [`fluent_community/sidebar_menu_groups_config`](#fluent_communitysidebar_menu_groups_config) | Core | 1 | `fluent-community/app/Functions/Utility.php:1169` |
| [`fluent_community/sidebar_menu_html_api_response`](#fluent_communitysidebar_menu_html_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/OptionController.php:74` |
| [`fluent_community/space_api_response`](#fluent_communityspace_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:252` |
| [`fluent_community/space_document_title_label`](#fluent_communityspace_document_title_label) | <span class="pro-badge">PRO</span> | 1 | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:56` |
| [`fluent_community/space_groups_api_response`](#fluent_communityspace_groups_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:776` |
| [`fluent_community/space_header_links`](#fluent_communityspace_header_links) | Core | 1 | `fluent-community/app/Models/BaseSpace.php:589` |
| [`fluent_community/space_members_api_response`](#fluent_communityspace_members_api_response) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:380` |
| [`fluent_community/space_non_members_api_response`](#fluent_communityspace_non_members_api_response) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:700` |
| [`fluent_community/space/create_data`](#fluent_communityspacecreate_data) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:73` |
| [`fluent_community/space/join_status_for_private`](#fluent_communityspacejoin_status_for_private) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:436` |
| [`fluent_community/space/meta_fields`](#fluent_communityspacemeta_fields) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:928` |
| [`fluent_community/space/update_data`](#fluent_communityspaceupdate_data) | Core | 1 | `fluent-community/app/Http/Controllers/SpaceController.php:302` |
| [`fluent_community/spaces_api_response`](#fluent_communityspaces_api_response) | Core | 2 | `fluent-community/app/Http/Controllers/SpaceController.php:34` |
| [`fluent_community/update_lockscreen_settings`](#fluent_communityupdate_lockscreen_settings) | <span class="pro-badge">PRO</span> | 2 | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:402` |
| [`fluent_community/user/space/permissions`](#fluent_communityuserspacepermissions) | Core | 1 | `fluent-community/app/Models/User.php:600` |

<a id="fluent_communityactivityafter_contents_space"></a>

## `fluent_community/activity/after_contents_space`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Activity/After Contents Space hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:94` | `''` (mixed)<br>`$spaceId` (Space|mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/after_contents_space', function ($param1, $spaceId, $context) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityactivitybefore_contents_space"></a>

## `fluent_community/activity/before_contents_space`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Activity/Before Contents Space hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ActivityController.php:95` | `''` (mixed)<br>`$spaceId` (Space|mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/activity/before_contents_space', function ($param1, $spaceId, $context) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityall_space_courses_api_response"></a>

## `fluent_community/all_space_courses_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** All Space Courses API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/AdminController.php:551` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_space_courses_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityall_spaces_api_response"></a>

## `fluent_community/all_spaces_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** All Spaces API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:225` | `[ 'spaces' => $spaces ]` (array)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/all_spaces_api_response', function ($spaces, $all) {
    return $spaces;
}, 10, 2);
```

<a id="fluent_communitycan_access_portal"></a>

## `fluent_community/can_access_portal`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 7
- **When it fires:** Can Access Portal hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:430` | `true` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:438` | `false` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:442` | `true` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:446` | `true` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:454` | `false` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:460` | `false` (mixed) |
| Core | `fluent-community/app/Services/Helper.php:467` | `$result` (mixed) |

### Example

```php
add_filter('fluent_community/can_access_portal', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communitygeneral_portal_vars"></a>

## `fluent_community/general_portal_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** General Portal Vars hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:751` | `[ 'scope' => $scope, 'theme' => get_option('template'), 'default_color' => 'light', 'color_switch_cookie_name' => '', 'has_color_scheme' => Helper::hasColorScheme(), ]` (array) |

### Example

```php
add_filter('fluent_community/general_portal_vars', function ($scope) {
    return $scope;
}, 10, 1);
```

<a id="fluent_communityget_lockscreen_settings"></a>

## `fluent_community/get_lockscreen_settings`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Get Lockscreen Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:918` | `$lockscreen` (mixed)<br>`$space` (Space|mixed) |

### Example

```php
add_filter('fluent_community/get_lockscreen_settings', function ($lockscreen, $space) {
    return $lockscreen;
}, 10, 2);
```

<a id="fluent_communitylockscreen_fields"></a>

## `fluent_community/lockscreen_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lockscreen Fields hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/LockscreenService.php:80` | `$settings` (mixed)<br>`$space` (Space|mixed) |

### Example

```php
add_filter('fluent_community/lockscreen_fields', function ($settings, $space) {
    return $settings;
}, 10, 2);
```

<a id="fluent_communitylockscreen_formatted_field"></a>

## `fluent_community/lockscreen_formatted_field`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Lockscreen Formatted Field hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/LockscreenService.php:112` | `$formattedField` (mixed)<br>`$value` (mixed)<br>`$space` (Space|mixed) |

### Example

```php
add_filter('fluent_community/lockscreen_formatted_field', function ($formattedField, $value, $space) {
    return $formattedField;
}, 10, 3);
```

<a id="fluent_communitymain_menu_items"></a>

## `fluent_community/main_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Main Menu Items hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1167` | `$primaryMenuItems` (mixed)<br>`$scope` (mixed) |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:1129` | `$items` (mixed)<br>`$scope` (mixed) |

### Example

```php
add_filter('fluent_community/main_menu_items', function ($primaryMenuItems, $scope) {
    return $primaryMenuItems;
}, 10, 2);
```

<a id="fluent_communitymenu_groups"></a>

## `fluent_community/menu_groups`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Menu Groups hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1216` | `$menuGroups` (mixed) |

### Example

```php
add_filter('fluent_community/menu_groups', function ($menuGroups) {
    return $menuGroups;
}, 10, 1);
```

<a id="fluent_communitymenu_groups_for_user"></a>

## `fluent_community/menu_groups_for_user`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Menu Groups For User hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:839` | `$formattedGroups` (mixed)<br>`$user` (mixed) |

### Example

```php
add_filter('fluent_community/menu_groups_for_user', function ($formattedGroups, $user) {
    return $formattedGroups;
}, 10, 2);
```

<a id="fluent_communitymenu_items_api_response"></a>

## `fluent_community/menu_items_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Menu Items API Response hook emitted from the current call site.

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

<a id="fluent_communitymenu_settings_api_response"></a>

## `fluent_community/menu_settings_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Menu Settings API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SettingController.php:94` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/menu_settings_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitymobile_menu"></a>

## `fluent_community/mobile_menu`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Mobile Menu hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:1496` | `$mobileMenuItems` (mixed)<br>`$xprofile` (mixed)<br>`$context` (mixed) |

### Example

```php
add_filter('fluent_community/mobile_menu', function ($mobileMenuItems, $xprofile, $context) {
    return $mobileMenuItems;
}, 10, 3);
```

<a id="fluent_communityportal_data_vars"></a>

## `fluent_community/portal_data_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Data Vars hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:982` | `$dataVars` (mixed) |

### Example

```php
add_filter('fluent_community/portal_data_vars', function ($dataVars) {
    return $dataVars;
}, 10, 1);
```

<a id="fluent_communityportal_page_headless"></a>

## `fluent_community/portal_page_headless`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Page Headless hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:117` | `false` (mixed) |

### Example

```php
add_filter('fluent_community/portal_page_headless', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityportal_route_type"></a>

## `fluent_community/portal_route_type`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Route Type hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:107` | `'WebHistory'` (mixed) |

### Example

```php
add_filter('fluent_community/portal_route_type', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityportal_settings_menu_items"></a>

## `fluent_community/portal_settings_menu_items`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Settings Menu Items hook emitted from the current call site.

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

<a id="fluent_communityportal_slug"></a>

## `fluent_community/portal_slug`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Slug hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:78` | `$slug` (mixed) |

### Example

```php
add_filter('fluent_community/portal_slug', function ($slug) {
    return $slug;
}, 10, 1);
```

<a id="fluent_communityportal_supported_query_params"></a>

## `fluent_community/portal_supported_query_params`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Supported Query Params hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Services/Helper.php:2004` | `[ 'customizer_panel' ]` (array) |

### Example

```php
add_filter('fluent_community/portal_supported_query_params', function ($param1) {
    return $param1;
}, 10, 1);
```

<a id="fluent_communityportal_vars"></a>

## `fluent_community/portal_vars`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Portal Vars hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Hooks/Handlers/PortalHandler.php:465` | `[ 'portal_notices' => apply_filters('fluent_community/portal_notices', []), 'i18n' => TransStrings::getStrings(), 'auth' => $authData, 'ajaxurl' => admin_url('admin-ajax.php'), 'ajax_nonce' => wp_create_nonce('fluent_community_ajax_nonce'), 'slug' => 'fluent-community', 'rest' => $this->getRestInfo(), 'user_id' => $userModel ? $userModel->ID : null, 'assets_url' => FLUENT_COMMUNITY_PLUGIN_URL . 'assets/', 'permissions' => $userModel ? $userModel->getPermissions() : ['read' => true], 'logo' => Arr::get($settings, 'logo'), 'site_title' => Arr::get($settings, 'site_title'), 'access_level' => Arr::get($settings, 'access.acess_level'), 'user_membership_slugs' => $spaceSlugs, 'block_editor_assets' => [ 'scripts' => [ 'react' => Vite::getStaticSrcUrl('libs/isolated-editor/react.production.min.js'), 'react-dom' => Vite::getStaticSrcUrl( 'libs/isolated-editor/react-dom.production.min.js' ), 'isolated-block-editor' => Vite::getStaticSrcUrl('libs/isolated-editor/isolated-block-editor.min.js') ], 'styles' => [ $isRtl ? Vite::getStaticSrcUrl('libs/isolated-editor/core.rtl.css') : Vite::getStaticSrcUrl('libs/isolated-editor/core.css'), $isRtl ? Vite::getStaticSrcUrl('libs/isolated-editor/isolated-block-editor.rtl.css') : Vite::getStaticSrcUrl('libs/isolated-editor/isolated-block-editor.css'), includes_url('css/dist/block-editor/content.min.css?ver=' . $wp_version), ] ], 'features' => [ 'disable_global_posts' => Arr::get($settings, 'disable_global_posts', '') == 'yes', 'has_survey_poll' => true, 'is_onboarding_enabled' => Arr::get($onboardSettings, 'is_onboarding_enabled', 'no') == 'yes', 'can_switch_layout' => Utility::getCustomizationSetting('disable_feed_layout') !== 'yes', 'mention_mail' => Utility::hasEmailAnnouncementEnabled(), 'max_media_per_post' => apply_filters('fluent_community/max_media_per_post', Utility::getCustomizationSetting('max_media_per_post')), 'has_post_title' => Utility::postTitlePref(), 'has_course' => Helper::isFeatureEnabled('course_module'), 'followers_module' => Helper::isFeatureEnabled('followers_module'), 'skicky_sidebar' => Utility::isCustomizationEnabled('fixed_sidebar'), 'post_layout' => Utility::getCustomizationSetting('rich_post_layout'), 'member_list_layout' => Utility::getCustomizationSetting('member_list_layout'), 'default_feed_layout' => Utility::getCustomizationSetting('default_feed_layout'), 'disable_feed_sort_by' => Utility::getCustomizationSetting('disable_feed_sort_by'), 'default_feed_sort_by' => Utility::getCustomizationSetting('default_feed_sort_by'), 'video_embeder' => apply_filters('fluent_community/has_video_embeder', true), 'has_inline_image_upload' => apply_filters('fluent_community/has_inline_image_upload', 'yes'), 'has_topics' => !!Utility::getTopics(), 'show_post_modal' => Utility::isCustomizationEnabled('show_post_modal'), 'has_analytics' => Utility::hasAnalyticsEnabled(), 'can_deactivate_account' => Utility::getPrivacySetting('can_deactive_account') === 'yes', ], 'route_classes' => array_filter([ 'fcom_sticky_header' => Utility::isCustomizationEnabled('fixed_page_header'), 'fcom_sticky_sidebar' => Utility::isCustomizationEnabled('fixed_sidebar'), 'fcom_has_icon_on_header_menu' => Utility::isCustomizationEnabled('icon_on_header_menu') ]), 'urls' => [ 'site_url' => home_url(), 'portal_base' => Helper::baseUrl('/'), 'global_search' => Helper::baseUrl(), ], 'last_feed_id' => FeedsHelper::getLastFeedId(), 'unread_notification_count' => $userModel ? $userModel->getUnreadNotificationCount() : 0, 'unread_feed_ids' => $userModel ? $userModel->getUnreadNotificationFeedIds() : [], 'date_offset' => time() - current_time('timestamp'), 'date_formatter' => Helper::getDateFormatter(true), 'time_formatter' => Helper::getTimeFormatter(true), 'date_time_formatter' => Helper::getDateFormatter(true) . ' ' . Helper::getTimeFormatter(true), 'portal_slug' => Helper::getPortalSlug(true), 'socialLinkProviders' => ProfileHelper::socialLinkProviders(true), 'space_groups' => $spaceGroups, 'mobileMenuItems' => Helper::getMobileMenuItems(), 'feed_links' => Helper::getEnabledFeedLinks(), 'post_order_by_options' => Helper::getPostOrderOptions('feed'), 'comment_order_by_options' => Helper::getCommentOrderOptions('comment'), 'user_post_order_by_options' => Helper::getPostOrderOptions('user'), 'routing_system' => Helper::getPortalRouteType(), 'portal_url' => Helper::baseUrl('/'), 'upgrade_url' => 'https://fluentcommunity.co/discount-deal/?utm_source=wp&utm_medium=upgrade&utm_campaign=upgrade', 'dateTime18n' => apply_filters('fluent_community/date_time_i18n', [ /* translators: weekday. Please keep the serial and format */ 'weekdays' => __('Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday', 'fluent-community'), /* translators: Months Please keep the serial and format*/ 'months' => __('January_February_March_April_May_June_July_August_September_October_November_December', 'fluent-community'), /* translators: weekday short Please keep the serial and format*/ 'weekdaysShort' => __('Sun_Mon_Tue_Wed_Thu_Fri_Sat', 'fluent-community'), /* translators: Months short Please keep the serial and format*/ 'monthsShort' => __('Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec', 'fluent-community'), /* translators: weekday min Please keep the serial and format*/ 'weekdaysMin' => __('Su_Mo_Tu_We_Th_Fr_Sa', 'fluent-community'), 'relativeTime' => [ /* translators: Relative Date Formats. Please do not alter %s*/ 'future' => __('in %s', 'fluent-community'), /* translators: Relative Date Formats. Please do not alter %s*/ 'past' => __('%s ago', 'fluent-community'), /* translators: Relative Date Formats.*/ 's' => __('a few seconds', 'fluent-community'), /* translators: Relative Date Formats.*/ 'm' => __('a minute', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'mm' => __('%d minutes', 'fluent-community'), /* translators: Relative Date Formats*/ 'h' => __('an hour', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'hh' => __('%d hours', 'fluent-community'), /* translators: Relative Date Formats*/ 'd' => __('a day', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'dd' => __('%d days', 'fluent-community'), /* translators: Relative Date Formats*/ 'M' => __('a month', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'MM' => __('%d months', 'fluent-community'), /* translators: Relative Date Formats*/ 'y' => __('a year', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'yy' => __('%d years', 'fluent-community') ], 'relativeTimeMobile' => [ /* translators: Relative Date Formats. Please do not alter %s*/ 'future' => __('in %s', 'fluent-community'), /* translators: Relative Date Formats. Please do not alter %s*/ 'past' => __('%s ago', 'fluent-community'), /* translators: Relative Date Formats.*/ 's' => __('few sec', 'fluent-community'), /* translators: Relative Date Formats.*/ 'm' => __('1min', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'mm' => __('%dmin', 'fluent-community'), /* translators: Relative Date Formats*/ 'h' => __('1h', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'hh' => __('%dh', 'fluent-community'), /* translators: Relative Date Formats*/ 'd' => __('1d', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'dd' => __('%dd', 'fluent-community'), /* translators: Relative Date Formats*/ 'M' => __('1mo', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'MM' => __('%dmo', 'fluent-community'), /* translators: Relative Date Formats*/ 'y' => __('1y', 'fluent-community'), /* translators: Relative Date Formats. Don't alter %d*/ 'yy' => __('%dy', 'fluent-community') ] ]), 'topicsConfig' => Helper::getTopicsConfig(), 'moderationConfig' => Helper::getModerationConfig(), 'is_absolute_url' => $isAbsoluteUrl, 'portal_paths' => $isAbsoluteUrl ? Helper::portalRoutePaths() : [], 'suggestedColors' => Utility::getSuggestedColors(), 'view_leaderboard_members' => Utility::canViewLeaderboardMembers(), 'report_reasons' => Helper::getReportReasons(), 'el_i18n' => [ 'pagination' => [ /* translators: %s is replaced by the page number */ 'currentPage' => \sprintf(__('page %s', 'fluent-community'), '{pager}'), 'deprecationWarning' => 'Deprecated usages detected', 'goto' => __('Go to', 'fluent-community'), 'next' => __('Go to next page', 'fluent-community'), /* translators: %s is replaced by the number of pages */ 'nextPages' => \sprintf(__('Next %s pages', 'fluent-community'), ' {pager}'), 'page' => __('Page', 'fluent-community'), 'pageClassifier' => '', 'pagesize' => __('/page', 'fluent-community'), 'prev' => __('Go to previous page', 'fluent-community'), /* translators: %s is replaced by the number of pages */ 'prevPages' => \sprintf(__('Previous %s pages', 'fluent-community'), '{pager}'), /* translators: %s is replaced by the total number of items */ 'total' => \sprintf(__('Total %s', 'fluent-community'), '{total}'), ], 'table' => [ 'clearFilter' => __('All', 'fluent-community'), 'confirmFilter' => __('Confirm', 'fluent-community'), 'emptyText' => __('No Data', 'fluent-community'), 'resetFilter' => __('Reset', 'fluent-community'), 'sumText' => __('Sum', 'fluent-community'), ], 'image' => [ 'error' => __('Failed to Load', 'fluent-community'), ], 'upload' => [ 'continue' => __('Continue', 'fluent-community'), 'delete' => __('Delete', 'fluent-community'), 'deleteTip' => __('press delete to remove', 'fluent-community'), 'preview' => __('Preview', 'fluent-community'), ], 'select' => [ 'loading' => __('Loading', 'fluent-community'), 'noData' => __('No data', 'fluent-community'), 'noMatch' => __('No matching data', 'fluent-community'), 'placeholder' => __('Select', 'fluent-community'), ], 'datepicker' => [ 'now' => __('Now', 'fluent-community'), 'today' => __('Today', 'fluent-community'), 'cancel' => __('Cancel', 'fluent-community'), 'clear' => __('Clear', 'fluent-community'), 'confirm' => __('OK', 'fluent-community'), 'dateTablePrompt' => __('Use the arrow keys and enter to select the day of the month', 'fluent-community'), 'monthTablePrompt' => __('Use the arrow keys and enter to select the month', 'fluent-community'), 'yearTablePrompt' => __('Use the arrow keys and enter to select the year', 'fluent-community'), 'selectedDate' => __('Selected date', 'fluent-community'), 'selectDate' => __('Select date', 'fluent-community'), 'selectTime' => __('Select time', 'fluent-community'), 'startDate' => __('Start Date', 'fluent-community'), 'startTime' => __('Start Time', 'fluent-community'), 'endDate' => __('End Date', 'fluent-community'), 'endTime' => __('End Time', 'fluent-community'), 'prevYear' => __('Previous Year', 'fluent-community'), 'nextYear' => __('Next Year', 'fluent-community'), 'prevMonth' => __('Previous Month', 'fluent-community'), 'nextMonth' => __('Next Month', 'fluent-community'), 'year' => __('year', 'fluent-community'), 'month1' => __('January', 'fluent-community'), 'month2' => __('February', 'fluent-community'), 'month3' => __('March', 'fluent-community'), 'month4' => __('April', 'fluent-community'), 'month5' => __('May', 'fluent-community'), 'month6' => __('June', 'fluent-community'), 'month7' => __('July', 'fluent-community'), 'month8' => __('August', 'fluent-community'), 'month9' => __('September', 'fluent-community'), 'month10' => __('October', 'fluent-community'), 'month11' => __('November', 'fluent-community'), 'month12' => __('December', 'fluent-community'), 'week' => __('week', 'fluent-community'), 'weeks' => [ 'sun' => __('Sun', 'fluent-community'), 'mon' => __('Mon', 'fluent-community'), 'tue' => __('Tue', 'fluent-community'), 'wed' => __('Wed', 'fluent-community'), 'thu' => __('Thu', 'fluent-community'), 'fri' => __('Fri', 'fluent-community'), 'sat' => __('Sat', 'fluent-community'), ], 'weeksFull' => [ 'sun' => __('Sunday', 'fluent-community'), 'mon' => __('Monday', 'fluent-community'), 'tue' => __('Tuesday', 'fluent-community'), 'wed' => __('Wednesday', 'fluent-community'), 'thu' => __('Thursday', 'fluent-community'), 'fri' => __('Friday', 'fluent-community'), 'sat' => __('Saturday', 'fluent-community'), ], 'months' => [ 'jan' => __('Jan', 'fluent-community'), 'feb' => __('Feb', 'fluent-community'), 'mar' => __('Mar', 'fluent-community'), 'apr' => __('Apr', 'fluent-community'), 'may' => __('May', 'fluent-community'), 'jun' => __('Jun', 'fluent-community'), 'jul' => __('Jul', 'fluent-community'), 'aug' => __('Aug', 'fluent-community'), 'sep' => __('Sep', 'fluent-community'), 'oct' => __('Oct', 'fluent-community'), 'nov' => __('Nov', 'fluent-community'), 'dec' => __('Dec', 'fluent-community'), ], ] ], 'course_sections_collapsed' => apply_filters('fluent_community/course_section_collapse_default', 'no'), 'course_lesson_fullscreen' => apply_filters('fluent_community/course_lesson_fullscreen_default', 'no'), 'default_profile_tab' => apply_filters('fluent_community/default_profile_tab_route', ''), 'wp_lesson_editor_frame' => $editorFrameUrl, 'lazy_styles' => [ 'wp-block-library-css' => includes_url('css/dist/block-library/style.min.css?version=' . $wp_version), 'fcom-block-content-styling-css' => FLUENT_COMMUNITY_PLUGIN_URL . 'Modules/Gutenberg/editor/content_styling.css?version=' . FLUENT_COMMUNITY_PLUGIN_VERSION ], 'debug_mode' => 1 ]` (array) |

### Example

```php
add_filter('fluent_community/portal_vars', function ($getRestInfo) {
    return $getRestInfo;
}, 10, 1);
```

<a id="fluent_communityprofile_spaces_api_response"></a>

## `fluent_community/profile_spaces_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Profile Spaces API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/ProfileController.php:471` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/profile_spaces_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communitysettings_menu"></a>

## `fluent_community/settings_menu`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Settings Menu hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1162` | `[]` (array)<br>`$userModel` (mixed) |

### Example

```php
add_filter('fluent_community/settings_menu', function ($param1, $userModel) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communitysidebar_menu_groups_config"></a>

## `fluent_community/sidebar_menu_groups_config`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Sidebar Menu Groups Config hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Functions/Utility.php:1169` | `[ 'primaryItems' => $primaryMenuItems, 'spaceGroups' => $spaceGroups, 'settingsItems' => $settingsMenu, 'topInlineLinks' => $topInlines, 'bottomLinkGroups' => $bottomLinkGroups, 'is_admin' => Helper::isSiteAdmin(null, $userModel), 'has_color_scheme' => Helper::hasColorScheme(), 'context' => $scope, ]` (array)<br>`$userModel` (mixed) |

### Example

```php
add_filter('fluent_community/sidebar_menu_groups_config', function ($primaryMenuItems, $userModel) {
    return $primaryMenuItems;
}, 10, 2);
```

<a id="fluent_communitysidebar_menu_html_api_response"></a>

## `fluent_community/sidebar_menu_html_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Sidebar Menu HTML API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/OptionController.php:74` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/sidebar_menu_html_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityspace_api_response"></a>

## `fluent_community/space_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:252` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityspace_document_title_label"></a>

## `fluent_community/space_document_title_label`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 1
- **When it fires:** Space Document Title Label hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Modules/DocumentLibrary/DocumentModule.php:56` | `__('Documents', 'fluent-community-pro')` (mixed)<br>`$space` (Space|mixed) |

### Example

```php
add_filter('fluent_community/space_document_title_label', function ($param1, $space) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communityspace_groups_api_response"></a>

## `fluent_community/space_groups_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space Groups API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:776` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_groups_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityspace_header_links"></a>

## `fluent_community/space_header_links`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space Header Links hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/BaseSpace.php:589` | `$headerLinks` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/space_header_links', function ($headerLinks, $param2) {
    return $headerLinks;
}, 10, 2);
```

<a id="fluent_communityspace_members_api_response"></a>

## `fluent_community/space_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Space Members API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:380` | `[ 'members' => $pendingRequests, 'pending_count' => $pendingCount ]` (array)<br>`$pendingRequests` (array)<br>`$request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:399` | `[ 'members' => $spaceMembers, 'pending_count' => $pendingCount ]` (array)<br>`$spaceMembers` (Space|mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_members_api_response', function ($pendingRequests, $pendingRequests_2, $all) {
    return $pendingRequests;
}, 10, 3);
```

<a id="fluent_communityspace_non_members_api_response"></a>

## `fluent_community/space_non_members_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space Non Members API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:700` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/space_non_members_api_response', function ($data, $all) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityspacecreate_data"></a>

## `fluent_community/space/create_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Create Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:73` | `[ 'title' => sanitize_text_field($data['title']), 'slug' => $data['slug'], 'privacy' => $data['privacy'], 'description' => sanitize_textarea_field(Arr::get($data, 'description', '')), 'settings' => $settings, 'parent_id' => $spaceGroup ? $spaceGroup->id : null, 'serial' => $serial ?: 1 ]` (array) |

### Example

```php
add_filter('fluent_community/space/create_data', function ($id) {
    return $id;
}, 10, 1);
```

<a id="fluent_communityspacejoin_status_for_private"></a>

## `fluent_community/space/join_status_for_private`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Join Status For Private hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:436` | `'pending'` (mixed)<br>`$space` (Space|mixed)<br>`$user` (mixed) |

### Example

```php
add_filter('fluent_community/space/join_status_for_private', function ($param1, $space, $user) {
    return $param1;
}, 10, 3);
```

<a id="fluent_communityspacemeta_fields"></a>

## `fluent_community/space/meta_fields`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Meta Fields hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:928` | `[]` (array)<br>`$space` (Space|mixed) |

### Example

```php
add_filter('fluent_community/space/meta_fields', function ($param1, $space) {
    return $param1;
}, 10, 2);
```

<a id="fluent_communityspaceupdate_data"></a>

## `fluent_community/space/update_data`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** Space/Update Data hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:302` | `$data` (mixed)<br>`$space` (Space|mixed) |

### Example

```php
add_filter('fluent_community/space/update_data', function ($data, $space) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityspaces_api_response"></a>

## `fluent_community/spaces_api_response`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 2
- **When it fires:** Spaces API Response hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:34` | `$data` (mixed)<br>`$this->request->all()` (array) |
| Core | `fluent-community/app/Http/Controllers/SpaceController.php:200` | `$data` (mixed)<br>`$request->all()` (array) |

### Example

```php
add_filter('fluent_community/spaces_api_response', function ($data, $request) {
    return $data;
}, 10, 2);
```

<a id="fluent_communityupdate_lockscreen_settings"></a>

## `fluent_community/update_lockscreen_settings`

- **Type:** filter
- **Edition:** <span class="pro-badge">PRO</span>
- **Call sites:** 2
- **When it fires:** Update Lockscreen Settings hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:402` | `$formattedFields` (mixed)<br>`$course` (mixed) |
| <span class="pro-badge">PRO</span> | `fluent-community-pro/app/Http/Controllers/ProAdminController.php:420` | `$formattedFields` (mixed)<br>`$space` (Space|mixed) |

### Example

```php
add_filter('fluent_community/update_lockscreen_settings', function ($formattedFields, $course) {
    return $formattedFields;
}, 10, 2);
```

<a id="fluent_communityuserspacepermissions"></a>

## `fluent_community/user/space/permissions`

- **Type:** filter
- **Edition:** Core
- **Call sites:** 1
- **When it fires:** User/Space/Permissions hook emitted from the current call site.

### Call Sites

| Edition | Source | Parameters |
| --- | --- | --- |
| Core | `fluent-community/app/Models/User.php:600` | `$permissions` (mixed)<br>`$space` (Space|mixed)<br>`$role` (mixed)<br>`$this` (mixed) |

### Example

```php
add_filter('fluent_community/user/space/permissions', function ($permissions, $space, $role, $param4) {
    return $permissions;
}, 10, 4);
```

