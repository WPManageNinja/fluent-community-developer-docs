---
prev:
  text: 'Courses'
  link: '/hooks/actions/courses'
next:
  text: 'Activities'
  link: '/hooks/actions/activities'
---

# Portal & UI Actions

Actions related to portal rendering, templates, headers, sidebars, and UI customization in Fluent Community.

## Overview

Portal actions allow you to customize the community portal's appearance, inject custom content, and control the rendering process. These hooks fire during various stages of portal rendering.

**Total Actions:** 34

---

## Portal Lifecycle

### fluent_community/portal_loaded

Fires when the portal is fully loaded and initialized.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$portal` | Portal Object | The portal instance |

**Example Usage:**

```php
add_action('fluent_community/portal_loaded', function($portal) {
    // Initialize custom features
    error_log('Portal loaded: ' . $portal->id);
}, 10, 1);
```

---

### fluent_community/before_portal_dom

Fires before the portal DOM is rendered.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$portal` | Portal Object | The portal instance |

**Example Usage:**

```php
add_action('fluent_community/before_portal_dom', function($portal) {
    // Enqueue custom scripts/styles
    wp_enqueue_script('custom-portal-js', 'path/to/script.js');
}, 10, 1);
```

---

### fluent_community/before_portal_rendered

Fires before the portal is rendered.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$portal` | Portal Object | The portal instance |

**Example Usage:**

```php
add_action('fluent_community/before_portal_rendered', function($portal) {
    // Set up portal context
    do_action('setup_portal_context', $portal);
}, 10, 1);
```

---

### fluent_community/portal_render_for_user

Fires when rendering the portal for a specific user.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | The user viewing the portal |
| `$portal` | Portal Object | The portal instance |

**Example Usage:**

```php
add_action('fluent_community/portal_render_for_user', function($user, $portal) {
    // Customize portal based on user role
    if (in_array('premium_member', $user->roles)) {
        add_filter('fluent_community/portal_features', function($features) {
            $features[] = 'premium_content';
            return $features;
        });
    }
}, 10, 2);
```

---

### fluent_community/portal/viewed

Fires when a user views the portal.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$portal` | Portal Object | The portal being viewed |
| `$userId` | int | User ID viewing the portal |

**Example Usage:**

```php
add_action('fluent_community/portal/viewed', function($portal, $userId) {
    // Track portal views
    $view_count = get_post_meta($portal->id, 'view_count', true) ?: 0;
    update_post_meta($portal->id, 'view_count', $view_count + 1);
}, 10, 2);
```

---

### fluent_community/portal/not_logged_in

Fires when a non-logged-in user accesses the portal.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$portal` | Portal Object | The portal instance |

**Example Usage:**

```php
add_action('fluent_community/portal/not_logged_in', function($portal) {
    // Show custom login prompt
    echo '<div class="custom-login-prompt">Please log in to access the community.</div>';
}, 10, 1);
```

---

### fluent_community/portal_action_

Dynamic action that fires for custom portal actions.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Action data |

**Example Usage:**

```php
// Hook into specific portal action
add_action('fluent_community/portal_action_custom_export', function($data) {
    // Handle custom export action
    export_portal_data($data);
}, 10, 1);
```

---

## Portal HTML Structure

### fluent_community/portal_html

Fires within the portal HTML tag.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/portal_html', function() {
    echo ' data-theme="custom" data-version="2.0"';
});
```

---

### fluent_community/portal_head

Fires in the portal head section.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/portal_head', function() {
    echo '<link rel="stylesheet" href="custom-styles.css">';
    echo '<script>window.customConfig = {};</script>';
});
```

---

### fluent_community/portal_head_meta

Fires for portal head meta tags.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/portal_head_meta', function() {
    echo '<meta name="custom-meta" content="value">';
});
```

---

### fluent_community/portal_header

Fires in the portal header section.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/portal_header', function() {
    echo '<div class="custom-announcement">Welcome to our community!</div>';
});
```

---

### fluent_community/portal_footer

Fires in the portal footer section.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/portal_footer', function() {
    echo '<div class="custom-footer">© 2025 My Community</div>';
});
```

---

## Header Customization

### fluent_community/before_header_logo

Fires before the header logo.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/before_header_logo', function() {
    echo '<div class="header-prefix">Community</div>';
});
```

---

### fluent_community/after_header_logo

Fires after the header logo.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/after_header_logo', function() {
    echo '<span class="beta-badge">BETA</span>';
});
```

---

### fluent_community/before_header_menu_items

Fires before header menu items.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/before_header_menu_items', function() {
    echo '<li><a href="/custom-page">Custom Link</a></li>';
});
```

---

### fluent_community/after_header_menu

Fires after the header menu.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/after_header_menu', function() {
    echo '<div class="header-search"><input type="search" placeholder="Search..."></div>';
});
```

---

### fluent_community/before_header_right_menu_items

Fires before right header menu items.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/before_header_right_menu_items', function() {
    echo '<li><a href="/notifications"><span class="notification-icon">🔔</span></a></li>';
});
```

---

### fluent_community/after_header_right_menu_items

Fires after right header menu items.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/after_header_right_menu_items', function() {
    echo '<li><button class="theme-toggle">🌙</button></li>';
});
```

---

### fluent_community/top_menu_right_items

Fires for top menu right items.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/top_menu_right_items', function() {
    echo '<div class="user-points">' . get_user_points() . ' pts</div>';
});
```

---

## Sidebar Customization

### fluent_community/portal_sidebar

Fires in the portal sidebar.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/portal_sidebar', function() {
    echo '<div class="custom-sidebar-widget">Custom Content</div>';
});
```

---

### fluent_community/after_portal_sidebar

Fires after the portal sidebar.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/after_portal_sidebar', function() {
    echo '<div class="sidebar-footer">Sidebar Footer</div>';
});
```

---

### fluent_community/after_sidebar_wrap

Fires after the sidebar wrapper.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/after_sidebar_wrap', function() {
    echo '<div class="sidebar-overlay"></div>';
});
```

---

### fluent_community/sidebar_link/before_delete

Fires before a sidebar link is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$link` | Link Object | Sidebar link to be deleted |

**Example Usage:**

```php
add_action('fluent_community/sidebar_link/before_delete', function($link) {
    // Backup link data
    update_option('sidebar_link_backup_' . $link->id, $link->toArray());
}, 10, 1);
```

---

### fluent_community/sidebar_link/after_delete

Fires after a sidebar link is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$linkId` | int | Deleted link ID |
| `$linkData` | array | Deleted link data |

**Example Usage:**

```php
add_action('fluent_community/sidebar_link/after_delete', function($linkId, $linkData) {
    error_log('Sidebar link deleted: ' . $linkId);
}, 10, 2);
```

---

## Template Hooks

### fluent_community/template_header

Fires in the template header.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/template_header', function() {
    echo '<div class="template-announcement">Special Offer!</div>';
});
```

---

### fluent_community/template_footer

Fires in the template footer.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/template_footer', function() {
    echo '<script>console.log("Template loaded");</script>';
});
```

---

### fluent_community/theme_body_atts

Fires for theme body attributes.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/theme_body_atts', function() {
    echo ' data-layout="wide" data-sidebar="left"';
});
```

---

### fluent_community/theme_content

Fires for theme content area.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/theme_content', function() {
    echo '<div class="theme-overlay">Custom overlay content</div>';
});
```

---

## Headless Mode

### fluent_community/rendering_headless_portal

Fires when rendering the portal in headless mode.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$portal` | Portal Object | The portal instance |

**Example Usage:**

```php
add_action('fluent_community/rendering_headless_portal', function($portal) {
    // Configure headless mode
    header('X-Headless-Mode: true');
}, 10, 1);
```

---

### fluent_community/headless/head_early

Fires early in headless head section.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/headless/head_early', function() {
    echo '<meta name="api-version" content="2.0">';
});
```

---

### fluent_community/headless/head

Fires in headless head section.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/headless/head', function() {
    echo '<link rel="preconnect" href="https://api.example.com">';
});
```

---

### fluent_community/headless/before_js_loaded

Fires before JavaScript is loaded in headless mode.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/headless/before_js_loaded', function() {
    echo '<script>window.headlessConfig = {};</script>';
});
```

---

### fluent_community/headless/content

Fires in headless content area.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/headless/content', function() {
    echo '<div id="headless-root"></div>';
});
```

---

### fluent_community/headless/footer

Fires in headless footer.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/headless/footer', function() {
    echo '<script src="headless-app.js"></script>';
});
```

---

## Block Editor

### fluent_community/block_editor_head

Fires in block editor head section.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/block_editor_head', function() {
    echo '<link rel="stylesheet" href="block-editor-styles.css">';
});
```

---

### fluent_community/block_editor_footer

Fires in block editor footer.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/block_editor_footer', function() {
    echo '<script src="block-editor-extensions.js"></script>';
});
```

---

## Asset Loading

### fluent_community/before_js_loaded

Fires before JavaScript assets are loaded.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/before_js_loaded', function() {
    echo '<script>window.preloadConfig = {};</script>';
});
```

---

### fluent_community/enqueue_global_assets

Fires when enqueueing global assets.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/enqueue_global_assets', function() {
    wp_enqueue_style('custom-global-css', 'path/to/global.css');
    wp_enqueue_script('custom-global-js', 'path/to/global.js');
});
```

---

## System & Core Hooks

### fluent_community/on_wp_init

Fires when Fluent Community initializes on WordPress init.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/on_wp_init', function() {
    // Initialize custom features
    do_action('my_custom_community_init');
});
```

---

### fluent_community/recache_color_schema

Fires when the color schema cache is being refreshed.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community/recache_color_schema', function() {
    // Clear custom color caches
    delete_transient('custom_color_scheme');
});
```

---

### fluent_community_send_daily_digest

Fires when sending daily digest emails.

**Parameters:** None

**Example Usage:**

```php
add_action('fluent_community_send_daily_digest', function() {
    // Add custom content to daily digest
    error_log('Daily digest sent');
});
```

---

## Dynamic System Hooks

### fluent_community/rendering_path_ssr_{$path}

Fires when rendering a specific path in server-side rendering mode.

**Example:**
```php
add_action('fluent_community/rendering_path_ssr_profile', function() {
    // Custom handling for profile SSR
});
```

---

### fluent_community/course/update_meta_settings_{$key}

Fires when updating specific course meta settings.

---

### fluent_community/space/update_meta_settings_{$key}

Fires when updating specific space meta settings.

---

## See Also

- [Authentication Actions](/hooks/actions/authentication) - Login/registration forms
- [Space Actions](/hooks/actions/spaces) - Space-specific UI
- [Feed Actions](/hooks/actions/feeds) - Feed rendering

