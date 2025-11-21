---
prev:
  text: 'Notifications Filters'
  link: '/hooks/filters/notifications'
next:
  text: 'Reactions Filters'
  link: '/hooks/filters/reactions'
---

<DocStatusBanner />


# Portal & UI Filters

## Portal Configuration

### fluent_community/portal_slug ​

Filters the portal base URL slug.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$slug` | string | Portal slug (default: 'community') |

**Return:** `string` - Modified portal slug

**Example Usage:**

```php
// Change portal URL to /forum
add_filter('fluent_community/portal_slug', function($slug) {
    return 'forum';
});

// Use root URL (no slug)
add_filter('fluent_community/portal_slug', function($slug) {
    return '';
});

// Dynamic slug based on user role
add_filter('fluent_community/portal_slug', function($slug) {
    if (current_user_can('manage_options')) {
        return 'admin-community';
    }
    return 'community';
});
```

**Common Use Cases:**
- Change portal URL structure
- Use root URL for portal
- Role-based portal URLs
- Multi-language slugs

**Related Filters:**
- `fluent_community/base_url`
- `fluent_community/portal_route_type`

---

### fluent_community/base_url ​

Filters the portal base URL (full URL including domain).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$baseUrl` | string | Full portal base URL |

**Return:** `string` - Modified base URL

**Example Usage:**

```php
// Use custom domain for portal
add_filter('fluent_community/base_url', function($baseUrl) {
    return 'https://community.example.com';
});

// Use subdirectory
add_filter('fluent_community/base_url', function($baseUrl) {
    return home_url('/members');
});
```

**Common Use Cases:**
- Custom domain for community
- Subdomain setup
- CDN integration

---

### fluent_community/can_access_portal ​

Filters whether the current user can access the portal.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$canAccess` | bool | Whether user can access portal |

**Return:** `bool` - Modified access permission

**Example Usage:**

```php
// Restrict access to specific user roles
add_filter('fluent_community/can_access_portal', function($canAccess) {
    $user = wp_get_current_user();

    // Only allow members and admins
    $allowed_roles = ['subscriber', 'administrator', 'editor'];
    $user_roles = $user->roles;

    return !empty(array_intersect($allowed_roles, $user_roles));
});

// Require email verification
add_filter('fluent_community/can_access_portal', function($canAccess) {
    if (!is_user_logged_in()) {
        return false;
    }

    $user = wp_get_current_user();
    $is_verified = get_user_meta($user->ID, 'email_verified', true);

    return $is_verified === '1';
});

// IP-based access control
add_filter('fluent_community/can_access_portal', function($canAccess) {
    $allowed_ips = ['192.168.1.1', '10.0.0.1'];
    $user_ip = $_SERVER['REMOTE_ADDR'];

    if (!in_array($user_ip, $allowed_ips)) {
        return false;
    }

    return $canAccess;
});
```

**Common Use Cases:**
- Role-based access control
- Email verification requirement
- IP whitelisting
- Membership validation
- Custom access rules

**Related Filters:**
- `fluent_community/user/permissions`

---

### fluent_community/portal_vars ​

Filters all portal configuration variables passed to the frontend.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$portalVars` | array | Portal configuration array |

**Return:** `array` - Modified portal variables

**Example Usage:**

```php
// Add custom configuration
add_filter('fluent_community/portal_vars', function($portalVars) {
    $portalVars['custom_config'] = [
        'enable_dark_mode' => true,
        'show_online_users' => true,
        'max_upload_size' => 10485760 // 10MB
    ];

    return $portalVars;
});

// Modify existing settings
add_filter('fluent_community/portal_vars', function($portalVars) {
    // Change default language
    $portalVars['locale'] = 'es_ES';

    // Add custom branding
    $portalVars['branding'] = [
        'logo' => 'https://example.com/logo.png',
        'name' => 'My Community'
    ];

    return $portalVars;
});
```

**Common Use Cases:**
- Add custom configuration
- Modify default settings
- Pass data to frontend
- Feature flags

---

### fluent_community/general_portal_vars ​

Filters general portal variables (subset of portal_vars).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$vars` | array | General portal variables |

**Return:** `array` - Modified variables

---

### fluent_community/header_vars ​

Filters header-specific variables.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$headerVars` | array | Header configuration variables |

**Return:** `array` - Modified header variables

**Example Usage:**

```php
// Customize header
add_filter('fluent_community/header_vars', function($headerVars) {
    $headerVars['show_search'] = true;
    $headerVars['show_notifications'] = true;
    $headerVars['custom_logo'] = 'https://example.com/logo.png';

    return $headerVars;
});
```

---

### fluent_community/portal_notices ​

Filters portal-wide notices displayed to users.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$notices` | array | Array of notice objects |

**Return:** `array` - Modified notices array

**Example Usage:**

```php
// Add custom notice
add_filter('fluent_community/portal_notices', function($notices) {
    $notices[] = [
        'type'    => 'info', // 'info', 'warning', 'error', 'success'
        'message' => 'Welcome to our community! Please read the guidelines.',
        'dismissible' => true
    ];

    return $notices;
});

// Conditional notices
add_filter('fluent_community/portal_notices', function($notices) {
    $user = wp_get_current_user();

    // Show notice to new users
    $registered = strtotime($user->user_registered);
    $days_since = (time() - $registered) / DAY_IN_SECONDS;

    if ($days_since < 7) {
        $notices[] = [
            'type'    => 'success',
            'message' => 'You joined ' . ceil($days_since) . ' days ago. Welcome!',
            'dismissible' => true
        ];
    }

    return $notices;
});
```

**Common Use Cases:**
- Announcements
- Maintenance notices
- Welcome messages
- Conditional alerts

---

## Navigation & Menu Filters

### fluent_community/main_menu_items ​

Filters the main navigation menu items.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$items` | array | Array of menu item objects |
| `$scope` | string | Menu scope context |

**Return:** `array` - Modified menu items

**Example Usage:**

```php
// Add custom menu item
add_filter('fluent_community/main_menu_items', function($items, $scope) {
    $items[] = [
        'id'    => 'custom-page',
        'label' => 'Resources',
        'url'   => '/resources',
        'icon'  => 'el-icon-document',
        'order' => 50
    ];

    return $items;
}, 10, 2);

// Remove menu item
add_filter('fluent_community/main_menu_items', function($items, $scope) {
    return array_filter($items, function($item) {
        return $item['id'] !== 'members'; // Remove members page
    });
}, 10, 2);

// Reorder menu items
add_filter('fluent_community/main_menu_items', function($items, $scope) {
    usort($items, function($a, $b) {
        return ($a['order'] ?? 0) - ($b['order'] ?? 0);
    });

    return $items;
}, 10, 2);
```

**Common Use Cases:**
- Add custom pages
- Remove default items
- Reorder navigation
- Conditional menu items

**Related Filters:**
- `fluent_community/menu_groups`
- `fluent_community/mobile_menu`

---

### fluent_community/menu_groups ​

Filters all menu groups (main menu, sidebar, etc.).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$menuGroups` | array | Array of menu group configurations |

**Return:** `array` - Modified menu groups

**Example Usage:**

```php
// Add custom menu group
add_filter('fluent_community/menu_groups', function($menuGroups) {
    $menuGroups['custom_group'] = [
        'label' => 'Custom Section',
        'items' => [
            [
                'id'    => 'custom-1',
                'label' => 'Custom Page 1',
                'url'   => '/custom-1',
                'icon'  => 'el-icon-star'
            ]
        ]
    ];

    return $menuGroups;
});
```

**Common Use Cases:**
- Add menu sections
- Organize navigation
- Custom menu structures

**Related Filters:**
- `fluent_community/menu_groups_for_user`

---

### fluent_community/menu_groups_for_user ​

Filters menu groups for a specific user (role-based menus).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$menuGroups` | array | Menu groups array |
| `$user` | User | User object |

**Return:** `array` - Modified menu groups

**Example Usage:**

```php
// Role-based menu items
add_filter('fluent_community/menu_groups_for_user', function($menuGroups, $user) {
    if (in_array('administrator', $user->roles)) {
        $menuGroups['admin_tools'] = [
            'label' => 'Admin Tools',
            'items' => [
                [
                    'id'    => 'analytics',
                    'label' => 'Analytics',
                    'url'   => '/admin/analytics',
                    'icon'  => 'el-icon-data-analysis'
                ]
            ]
        ];
    }

    return $menuGroups;
}, 10, 2);
```

**Common Use Cases:**
- Role-based navigation
- User-specific menus
- Permission-based items

---

### fluent_community/mobile_menu ​

Filters mobile menu configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$mobileMenu` | array | Mobile menu items |

**Return:** `array` - Modified mobile menu

**Example Usage:**

```php
// Customize mobile menu
add_filter('fluent_community/mobile_menu', function($mobileMenu) {
    // Add mobile-specific item
    $mobileMenu[] = [
        'id'    => 'mobile-app',
        'label' => 'Download App',
        'url'   => '/download-app',
        'icon'  => 'el-icon-mobile'
    ];

    return $mobileMenu;
});
```

**Common Use Cases:**
- Mobile-specific navigation
- Simplified mobile menus
- App download links

---

## Routing & URL Filters

### fluent_community/app_route_paths ​

Filters application route paths.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$routes` | array | Array of route definitions |

**Return:** `array` - Modified routes

**Example Usage:**

```php
// Add custom route
add_filter('fluent_community/app_route_paths', function($routes) {
    $routes['custom-page'] = [
        'path'      => '/custom-page',
        'component' => 'CustomPageComponent',
        'meta'      => [
            'title' => 'Custom Page'
        ]
    ];

    return $routes;
});
```

**Common Use Cases:**
- Add custom pages
- Override default routes
- Custom URL structures

---

### fluent_community/portal_route_type ​

Filters the portal routing type.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$routeType` | string | Route type ('hash' or 'history') |

**Return:** `string` - Modified route type

**Example Usage:**

```php
// Use hash routing
add_filter('fluent_community/portal_route_type', function($routeType) {
    return 'hash'; // URLs like: /community/#/feeds
});

// Use history routing (default)
add_filter('fluent_community/portal_route_type', function($routeType) {
    return 'history'; // URLs like: /community/feeds
});
```

**Common Use Cases:**
- Change routing mode
- SEO optimization
- Server compatibility

---

### fluent_community/default_redirect_url ​

Filters the default redirect URL after login or portal access.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$url` | string | Default redirect URL |

**Return:** `string` - Modified redirect URL

**Example Usage:**

```php
// Redirect to specific page
add_filter('fluent_community/default_redirect_url', function($url) {
    return home_url('/community/feeds');
});

// Role-based redirect
add_filter('fluent_community/default_redirect_url', function($url) {
    $user = wp_get_current_user();

    if (in_array('administrator', $user->roles)) {
        return home_url('/community/admin');
    }

    return home_url('/community/feeds');
});
```

**Common Use Cases:**
- Custom landing pages
- Role-based redirects
- Onboarding flows

---

## Theme & Appearance Filters

### fluent_community/is_supported_theme ​

Filters whether the current theme is supported.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$isSupported` | bool | Whether theme is supported |

**Return:** `bool` - Modified support status

**Example Usage:**

```php
// Mark custom theme as supported
add_filter('fluent_community/is_supported_theme', function($isSupported) {
    $current_theme = wp_get_theme()->get('Name');

    if ($current_theme === 'My Custom Theme') {
        return true;
    }

    return $isSupported;
});
```

**Common Use Cases:**
- Custom theme compatibility
- Theme detection
- Fallback handling

---

### fluent_community/has_color_scheme ​

Filters whether color scheme customization is enabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$hasColorScheme` | bool | Whether color scheme is enabled |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Enable color scheme
add_filter('fluent_community/has_color_scheme', function($hasColorScheme) {
    return true;
});

// Disable for specific users
add_filter('fluent_community/has_color_scheme', function($hasColorScheme) {
    if (!current_user_can('manage_options')) {
        return false;
    }
    return $hasColorScheme;
});
```

**Common Use Cases:**
- Enable/disable theming
- Role-based customization
- Branding control

---

### fluent_community/color_schmea_config ​

Filters the color scheme configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$config` | array | Color scheme configuration |

**Return:** `array` - Modified color config

**Example Usage:**

```php
// Custom color scheme
add_filter('fluent_community/color_schmea_config', function($config) {
    $config['primary_color'] = '#007bff';
    $config['secondary_color'] = '#6c757d';
    $config['accent_color'] = '#28a745';

    return $config;
});

// Brand colors
add_filter('fluent_community/color_schmea_config', function($config) {
    $config['colors'] = [
        'brand-primary'   => '#1a73e8',
        'brand-secondary' => '#34a853',
        'brand-accent'    => '#fbbc04',
        'brand-danger'    => '#ea4335'
    ];

    return $config;
});
```

**Common Use Cases:**
- Brand colors
- Custom themes
- Dark mode support

---

### fluent_community/is_rtl ​

Filters whether RTL (right-to-left) mode is enabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$isRtl` | bool | Whether RTL is enabled |

**Return:** `bool` - Modified RTL setting

**Example Usage:**

```php
// Force RTL
add_filter('fluent_community/is_rtl', function($isRtl) {
    return true;
});

// Auto-detect from WordPress
add_filter('fluent_community/is_rtl', function($isRtl) {
    return is_rtl();
});
```

**Common Use Cases:**
- RTL language support
- Arabic/Hebrew sites
- Multi-language sites

---

## Content & Features

### fluent_community/has_global_post ​

Filters whether global posts (posts not tied to a space) are enabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$hasGlobalPost` | bool | Whether global posts are enabled |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Enable global posts
add_filter('fluent_community/has_global_post', function($hasGlobalPost) {
    return true;
});

// Disable for non-admins
add_filter('fluent_community/has_global_post', function($hasGlobalPost) {
    if (!current_user_can('manage_options')) {
        return false;
    }
    return $hasGlobalPost;
});
```

**Common Use Cases:**
- Enable/disable global feed
- Role-based posting
- Community structure control

---

### fluent_community/has_video_embeder ​

Filters whether video embedding is enabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$hasVideoEmbeder` | bool | Whether video embedding is enabled |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Enable video embedding
add_filter('fluent_community/has_video_embeder', function($hasVideoEmbeder) {
    return true;
});

// Premium users only
add_filter('fluent_community/has_video_embeder', function($hasVideoEmbeder) {
    $user = wp_get_current_user();
    return in_array('premium_member', $user->roles);
});
```

**Common Use Cases:**
- Enable/disable video embeds
- Premium features
- Content type control

---

## Editor & Block Filters

### fluent_community/allowed_block_types ​

Filters allowed block types in the block editor.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$blockTypes` | array | Array of allowed block type names |

**Return:** `array` - Modified block types array

**Example Usage:**

```php
// Limit to specific blocks
add_filter('fluent_community/allowed_block_types', function($blockTypes) {
    return [
        'core/paragraph',
        'core/heading',
        'core/list',
        'core/image',
        'core/quote'
    ];
});

// Add custom blocks
add_filter('fluent_community/allowed_block_types', function($blockTypes) {
    $blockTypes[] = 'custom/my-block';
    $blockTypes[] = 'custom/another-block';

    return $blockTypes;
});

// Remove specific blocks
add_filter('fluent_community/allowed_block_types', function($blockTypes) {
    return array_filter($blockTypes, function($type) {
        return $type !== 'core/embed'; // Remove embeds
    });
});
```

**Common Use Cases:**
- Restrict block types
- Add custom blocks
- Content control
- Security restrictions

---

### fluent_community/block_editor_settings ​

Filters block editor settings and configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Block editor settings |

**Return:** `array` - Modified settings

**Example Usage:**

```php
// Customize editor settings
add_filter('fluent_community/block_editor_settings', function($settings) {
    $settings['colors'] = [
        ['name' => 'Primary', 'color' => '#007bff'],
        ['name' => 'Secondary', 'color' => '#6c757d']
    ];

    $settings['fontSizes'] = [
        ['name' => 'Small', 'size' => 14],
        ['name' => 'Normal', 'size' => 16],
        ['name' => 'Large', 'size' => 20]
    ];

    return $settings;
});
```

**Common Use Cases:**
- Custom color palettes
- Font size options
- Editor customization

---

## Template & Rendering Filters

### fluent_community/template_slug ​

Filters the template slug used for rendering.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$templateSlug` | string | Template slug name |

**Return:** `string` - Modified template slug

**Example Usage:**

```php
// Use custom template
add_filter('fluent_community/template_slug', function($templateSlug) {
    return 'custom-community-template';
});

// Conditional templates
add_filter('fluent_community/template_slug', function($templateSlug) {
    if (is_user_logged_in()) {
        return 'logged-in-template';
    }
    return 'guest-template';
});
```

**Common Use Cases:**
- Custom templates
- Conditional rendering
- Theme integration

---

### fluent_community/portal_page_headless ​

Filters whether the portal page is rendered in headless mode.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$isHeadless` | bool | Whether headless mode is enabled |

**Return:** `bool` - Modified headless setting

**Example Usage:**

```php
// Enable headless mode
add_filter('fluent_community/portal_page_headless', function($isHeadless) {
    return true;
});

// Conditional headless
add_filter('fluent_community/portal_page_headless', function($isHeadless) {
    // Headless for API requests
    return isset($_GET['api_mode']);
});
```

**Common Use Cases:**
- API-only mode
- Custom frontends
- Decoupled architecture

---

### fluent_community/portal_data_vars ​

Filters portal data variables passed to templates.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$dataVars` | array | Portal data variables |

**Return:** `array` - Modified data variables

**Example Usage:**

```php
// Add custom data
add_filter('fluent_community/portal_data_vars', function($dataVars) {
    $dataVars['custom_data'] = [
        'site_name'   => get_bloginfo('name'),
        'site_logo'   => get_theme_mod('custom_logo'),
        'footer_text' => get_option('footer_text')
    ];

    return $dataVars;
});
```

**Common Use Cases:**
- Pass custom data
- Template variables
- Dynamic content

---

## Best Practices

### 1. Always Return Correct Type

```php
// ✅ Correct
add_filter('fluent_community/can_access_portal', function($canAccess) {
    return true; // Returns boolean
});

// ❌ Wrong
add_filter('fluent_community/can_access_portal', function($canAccess) {
    return 'yes'; // Returns string!
});
```

### 2. Preserve Existing Data

```php
// ✅ Correct - Add to existing menu items
add_filter('fluent_community/main_menu_items', function($items, $scope) {
    $items[] = ['id' => 'custom', 'label' => 'Custom'];
    return $items;
}, 10, 2);

// ❌ Wrong - Replaces all menu items
add_filter('fluent_community/main_menu_items', function($items, $scope) {
    return [['id' => 'custom', 'label' => 'Custom']];
}, 10, 2);
```

### 3. Check User Permissions

```php
// ✅ Correct - Check permissions
add_filter('fluent_community/main_menu_items', function($items, $scope) {
    if (current_user_can('manage_options')) {
        $items[] = ['id' => 'admin', 'label' => 'Admin'];
    }
    return $items;
}, 10, 2);
```

### 4. Use Proper Priority

```php
// Run early to set base configuration
add_filter('fluent_community/portal_vars', function($vars) {
    // Base config
    return $vars;
}, 5);

// Run later to override
add_filter('fluent_community/portal_vars', function($vars) {
    // Override config
    return $vars;
}, 20);
```

---

## Related Documentation

- [Portal Actions](/hooks/actions/portal)
- [Menu Customization Guide](/guides/menu-customization)
- [Theme Compatibility](/guides/theme-compatibility)
- [Code Snippets](/guides/code-snippets)

