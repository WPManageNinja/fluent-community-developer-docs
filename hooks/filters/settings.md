---
prev:
  text: 'Permissions Filters'
  link: '/hooks/filters/permissions'
next:
  text: 'Courses Filters'
  link: '/hooks/filters/courses'
---

# Settings & Configuration Filters

## General Configuration

### fluent_community/feed_general_config ​

Filters the general feed configuration settings.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$config` | array | Feed configuration array |

**Return:** `array` - Modified configuration

**Example Usage:**

```php
// Customize feed settings
add_filter('fluent_community/feed_general_config', function($config) {
    $config['posts_per_page'] = 20; // Show 20 posts per page
    $config['enable_reactions'] = true;
    $config['enable_comments'] = true;
    $config['enable_sharing'] = true;
    $config['auto_load_more'] = true;
    
    return $config;
});

// Disable features
add_filter('fluent_community/feed_general_config', function($config) {
    $config['enable_polls'] = false;
    $config['enable_surveys'] = false;
    $config['enable_media_upload'] = false;
    
    return $config;
});

// Role-based configuration
add_filter('fluent_community/feed_general_config', function($config) {
    $user = wp_get_current_user();
    
    if (in_array('premium_member', $user->roles)) {
        $config['posts_per_page'] = 50;
        $config['enable_video_upload'] = true;
    } else {
        $config['posts_per_page'] = 10;
        $config['enable_video_upload'] = false;
    }
    
    return $config;
});
```

**Common Use Cases:**
- Customize feed behavior
- Enable/disable features
- Role-based settings
- Performance tuning

---

### fluent_community/color_schmea_config ​

Filters the color scheme configuration for the community portal.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$colorConfig` | array | Color scheme configuration |

**Return:** `array` - Modified color configuration

**Example Usage:**

```php
// Custom color scheme
add_filter('fluent_community/color_schmea_config', function($colorConfig) {
    $colorConfig['primary_color'] = '#3B82F6';
    $colorConfig['secondary_color'] = '#10B981';
    $colorConfig['accent_color'] = '#F59E0B';
    $colorConfig['background_color'] = '#F9FAFB';
    $colorConfig['text_color'] = '#1F2937';
    
    return $colorConfig;
});

// Dark mode colors
add_filter('fluent_community/color_schmea_config', function($colorConfig) {
    if (isset($_COOKIE['theme']) && $_COOKIE['theme'] === 'dark') {
        $colorConfig['background_color'] = '#1F2937';
        $colorConfig['text_color'] = '#F9FAFB';
        $colorConfig['card_background'] = '#374151';
    }
    
    return $colorConfig;
});

// Brand colors
add_filter('fluent_community/color_schmea_config', function($colorConfig) {
    $colorConfig['primary_color'] = get_option('brand_primary_color', '#3B82F6');
    $colorConfig['secondary_color'] = get_option('brand_secondary_color', '#10B981');
    
    return $colorConfig;
});
```

**Common Use Cases:**
- Custom branding
- Dark mode support
- Theme customization
- Brand consistency

---

### fluent_community/sidebar_menu_groups_config ​

Filters the sidebar menu groups configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$menuGroups` | array | Sidebar menu groups configuration |

**Return:** `array` - Modified menu groups

**Example Usage:**

```php
// Add custom menu group
add_filter('fluent_community/sidebar_menu_groups_config', function($menuGroups) {
    $menuGroups['resources'] = [
        'label' => 'Resources',
        'icon'  => 'el-icon-folder',
        'items' => [
            [
                'label' => 'Documentation',
                'url'   => '/resources/docs',
                'icon'  => 'el-icon-document'
            ],
            [
                'label' => 'Tutorials',
                'url'   => '/resources/tutorials',
                'icon'  => 'el-icon-video-play'
            ]
        ]
    ];
    
    return $menuGroups;
});

// Reorder menu groups
add_filter('fluent_community/sidebar_menu_groups_config', function($menuGroups) {
    $ordered = [];
    
    // Custom order
    $order = ['main', 'spaces', 'resources', 'settings'];
    
    foreach ($order as $key) {
        if (isset($menuGroups[$key])) {
            $ordered[$key] = $menuGroups[$key];
        }
    }
    
    return $ordered;
});

// Remove menu groups
add_filter('fluent_community/sidebar_menu_groups_config', function($menuGroups) {
    unset($menuGroups['leaderboard']);
    
    return $menuGroups;
});
```

**Common Use Cases:**
- Add custom menus
- Reorder menu groups
- Remove unwanted menus
- Custom navigation

---

## Editor Configuration

### fluent_community/block_editor_settings ​

Filters the block editor settings and configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Editor settings array |

**Return:** `array` - Modified editor settings

**Example Usage:**

```php
// Customize editor toolbar
add_filter('fluent_community/block_editor_settings', function($settings) {
    $settings['toolbar'] = [
        'bold',
        'italic',
        'underline',
        'link',
        'image',
        'code',
        'quote'
    ];
    
    return $settings;
});

// Enable/disable features
add_filter('fluent_community/block_editor_settings', function($settings) {
    $settings['enable_markdown'] = true;
    $settings['enable_mentions'] = true;
    $settings['enable_hashtags'] = true;
    $settings['enable_emoji'] = true;
    $settings['enable_code_blocks'] = true;
    
    return $settings;
});

// Role-based editor features
add_filter('fluent_community/block_editor_settings', function($settings) {
    $user = wp_get_current_user();
    
    if (!in_array('premium_member', $user->roles)) {
        // Limit features for free users
        $settings['enable_video_embed'] = false;
        $settings['max_images'] = 3;
    }
    
    return $settings;
});

// Custom placeholder text
add_filter('fluent_community/block_editor_settings', function($settings) {
    $settings['placeholder'] = 'Share your thoughts with the community...';
    
    return $settings;
});
```

**Common Use Cases:**
- Customize toolbar
- Enable/disable features
- Role-based editor
- Custom placeholders

---

### fluent_community/rendering_feed_model ​

Filters the feed model before rendering.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed | Feed object |
| `$config` | array | Rendering configuration |

**Return:** `Feed` - Modified feed object

**Example Usage:**

```php
// Add custom data to feed
add_filter('fluent_community/rendering_feed_model', function($feed, $config) {
    // Add view count
    $feed->view_count = get_feed_view_count($feed->id);
    
    // Add reading time
    $feed->reading_time = calculate_reading_time($feed->message);
    
    // Add author reputation
    $feed->author_reputation = get_user_reputation($feed->user_id);
    
    return $feed;
}, 10, 2);

// Modify content before display
add_filter('fluent_community/rendering_feed_model', function($feed, $config) {
    // Add disclaimer to old posts
    $created = strtotime($feed->created_at);
    $days_old = (time() - $created) / DAY_IN_SECONDS;
    
    if ($days_old > 365) {
        $feed->message .= "\n\n*Note: This post is over a year old.*";
    }
    
    return $feed;
}, 10, 2);

// Filter sensitive content
add_filter('fluent_community/rendering_feed_model', function($feed, $config) {
    if (!is_user_logged_in()) {
        // Hide email addresses from guests
        $feed->message = preg_replace('/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/', '[email protected]', $feed->message);
    }
    
    return $feed;
}, 10, 2);
```

**Common Use Cases:**
- Add computed fields
- Modify content
- Add metadata
- Content filtering

---

## Authentication Settings

### fluent_community/auth/settings ​

Filters authentication settings.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$authSettings` | array | Authentication settings array |

**Return:** `array` - Modified auth settings

**Example Usage:**

```php
// Customize auth settings
add_filter('fluent_community/auth/settings', function($authSettings) {
    $authSettings['require_email_verification'] = true;
    $authSettings['allow_social_login'] = true;
    $authSettings['enable_two_factor'] = true;
    $authSettings['password_min_length'] = 12;
    $authSettings['session_timeout'] = 3600; // 1 hour
    
    return $authSettings;
});

// Strict security settings
add_filter('fluent_community/auth/settings', function($authSettings) {
    $authSettings['require_strong_password'] = true;
    $authSettings['enable_captcha'] = true;
    $authSettings['max_login_attempts'] = 3;
    $authSettings['lockout_duration'] = 1800; // 30 minutes
    
    return $authSettings;
});
```

**Common Use Cases:**
- Security configuration
- Login requirements
- Session management
- Password policies

---

### fluent_community/get_auth_settings ​

Filters authentication settings when retrieved.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Auth settings array |

**Return:** `array` - Modified settings

**Example Usage:**

```php
// Add custom auth providers
add_filter('fluent_community/get_auth_settings', function($settings) {
    $settings['providers']['github'] = [
        'enabled'      => true,
        'client_id'    => get_option('github_client_id'),
        'client_secret' => get_option('github_client_secret'),
        'label'        => 'Sign in with GitHub'
    ];
    
    return $settings;
});
```

**Common Use Cases:**
- Add auth providers
- Customize settings
- Dynamic configuration

---

## Portal Settings

### fluent_community/portal_settings_menu_items ​

Filters the portal settings menu items.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$menuItems` | array | Settings menu items array |

**Return:** `array` - Modified menu items

**Example Usage:**

```php
// Add custom settings page
add_filter('fluent_community/portal_settings_menu_items', function($menuItems) {
    $menuItems['custom_settings'] = [
        'label'      => 'Custom Settings',
        'icon'       => 'el-icon-setting',
        'route'      => '/settings/custom',
        'permission' => 'manage_options',
        'order'      => 100
    ];
    
    return $menuItems;
});

// Remove settings pages
add_filter('fluent_community/portal_settings_menu_items', function($menuItems) {
    unset($menuItems['advanced']);
    
    return $menuItems;
});

// Reorder settings menu
add_filter('fluent_community/portal_settings_menu_items', function($menuItems) {
    usort($menuItems, function($a, $b) {
        return ($a['order'] ?? 0) - ($b['order'] ?? 0);
    });
    
    return $menuItems;
});
```

**Common Use Cases:**
- Add custom settings
- Remove settings pages
- Reorder menu items
- Permission-based menus

---

### fluent_community/settings_menu ​

Filters the main settings menu.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settingsMenu` | array | Settings menu array |
| `$user` | User | Current user object |

**Return:** `array` - Modified settings menu

**Example Usage:**

```php
// Add custom menu items
add_filter('fluent_community/settings_menu', function($settingsMenu, $user) {
    $settingsMenu[] = [
        'id'    => 'integrations',
        'label' => 'Integrations',
        'url'   => '/settings/integrations',
        'icon'  => 'el-icon-connection'
    ];
    
    return $settingsMenu;
}, 10, 2);

// Role-based menu
add_filter('fluent_community/settings_menu', function($settingsMenu, $user) {
    if (!in_array('administrator', $user->roles)) {
        // Remove admin-only items
        $settingsMenu = array_filter($settingsMenu, function($item) {
            return !in_array($item['id'], ['advanced', 'system']);
        });
    }
    
    return $settingsMenu;
}, 10, 2);
```

**Common Use Cases:**
- Add menu items
- Role-based menus
- Custom settings pages

---

## Welcome & Lockscreen Settings

### fluent_community/get_welcome_banner_settings ​

Filters welcome banner settings when retrieved.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Welcome banner settings |

**Return:** `array` - Modified settings

**Example Usage:**

```php
// Customize welcome banner
add_filter('fluent_community/get_welcome_banner_settings', function($settings) {
    $settings['enabled'] = true;
    $settings['title'] = 'Welcome to Our Community!';
    $settings['message'] = 'Join thousands of members sharing knowledge.';
    $settings['background_image'] = 'https://example.com/banner.jpg';
    $settings['show_signup_button'] = true;
    
    return $settings;
});

// Dynamic welcome message
add_filter('fluent_community/get_welcome_banner_settings', function($settings) {
    $hour = (int) current_time('H');
    
    if ($hour < 12) {
        $settings['title'] = 'Good Morning!';
    } elseif ($hour < 18) {
        $settings['title'] = 'Good Afternoon!';
    } else {
        $settings['title'] = 'Good Evening!';
    }
    
    return $settings;
});
```

**Common Use Cases:**
- Customize welcome banner
- Dynamic messages
- Branding

---

### fluent_community/update_welcome_banner_settings ​

Filters welcome banner settings before saving.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Settings to be saved |

**Return:** `array` - Modified settings

**Example Usage:**

```php
// Validate settings
add_filter('fluent_community/update_welcome_banner_settings', function($settings) {
    // Sanitize HTML
    if (isset($settings['message'])) {
        $settings['message'] = wp_kses_post($settings['message']);
    }
    
    // Validate URL
    if (isset($settings['background_image'])) {
        $settings['background_image'] = esc_url_raw($settings['background_image']);
    }
    
    return $settings;
});
```

**Common Use Cases:**
- Validate settings
- Sanitize input
- Add defaults

---

### fluent_community/get_lockscreen_settings ​

Filters lockscreen settings for a space.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$lockscreen` | array | Lockscreen settings |
| `$space` | Space\|null | Space object or null |

**Return:** `array` - Modified lockscreen settings

**Example Usage:**

```php
// Customize lockscreen
add_filter('fluent_community/get_lockscreen_settings', function($lockscreen, $space) {
    $lockscreen['enabled'] = true;
    $lockscreen['title'] = 'This space is private';
    $lockscreen['message'] = 'Request access to join this community.';
    $lockscreen['show_request_button'] = true;
    
    return $lockscreen;
}, 10, 2);

// Space-specific lockscreen
add_filter('fluent_community/get_lockscreen_settings', function($lockscreen, $space) {
    if ($space && $space->privacy === 'private') {
        $lockscreen['message'] = "Join {$space->title} to see exclusive content.";
    }
    
    return $lockscreen;
}, 10, 2);
```

**Common Use Cases:**
- Customize lockscreen
- Space-specific messages
- Access control UI

---

### fluent_community/lockscreen_fields ​

Filters lockscreen form fields.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Lockscreen field settings |
| `$space` | Space\|null | Space object or null |

**Return:** `array` - Modified field settings

**Example Usage:**

```php
// Add custom fields
add_filter('fluent_community/lockscreen_fields', function($settings, $space) {
    $settings['fields']['company'] = [
        'type'        => 'text',
        'label'       => 'Company Name',
        'required'    => true,
        'placeholder' => 'Enter your company name'
    ];
    
    $settings['fields']['reason'] = [
        'type'        => 'textarea',
        'label'       => 'Why do you want to join?',
        'required'    => true,
        'placeholder' => 'Tell us about yourself...'
    ];
    
    return $settings;
}, 10, 2);
```

**Common Use Cases:**
- Custom join fields
- Collect user information
- Access requests

---

## Storage & Survey Settings

### fluent_community/storage_settings_response ​

Filters storage settings API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Storage settings response |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add storage info
add_filter('fluent_community/storage_settings_response', function($response) {
    $response['total_storage'] = get_total_storage_used();
    $response['storage_limit'] = get_storage_limit();
    $response['storage_percentage'] = calculate_storage_percentage();
    
    return $response;
});
```

**Common Use Cases:**
- Add storage metrics
- Custom storage info

---

### fluent_community/feed/updated_survey_config ​

Filters survey configuration after update.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$surveyConfig` | array | Survey configuration |
| `$feed` | Feed | Feed object |
| `$userId` | int | User ID |

**Return:** `array` - Modified survey config

**Example Usage:**

```php
// Validate survey config
add_filter('fluent_community/feed/updated_survey_config', function($surveyConfig, $feed, $userId) {
    // Ensure minimum options
    if (count($surveyConfig['options']) < 2) {
        throw new \Exception('Survey must have at least 2 options');
    }
    
    // Set defaults
    $surveyConfig['allow_multiple'] = $surveyConfig['allow_multiple'] ?? false;
    $surveyConfig['show_results'] = $surveyConfig['show_results'] ?? 'after_vote';
    
    return $surveyConfig;
}, 10, 3);
```

**Common Use Cases:**
- Validate survey data
- Set defaults
- Custom survey logic

---

### fluent_community/asset_listed_slugs ​

Filters the list of slugs where community assets should be loaded.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$slugs` | array | Array of page slugs |

**Return:** `array` - Modified slugs

**Example Usage:**

```php
// Add custom pages
add_filter('fluent_community/asset_listed_slugs', function($slugs) {
    $slugs[] = 'my-custom-page';
    $slugs[] = 'another-page';

    return $slugs;
});

// Remove specific pages
add_filter('fluent_community/asset_listed_slugs', function($slugs) {
    return array_diff($slugs, ['unwanted-page']);
});
```

**Common Use Cases:**
- Custom page integration
- Asset optimization
- Performance tuning

---

### fluent_community/custom_order_by ​

Filters custom ordering options for queries.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$orderBy` | string | Order by clause |
| `$orderType` | string | Order type |

**Return:** `string` - Modified order by clause

**Example Usage:**

```php
// Custom ordering
add_filter('fluent_community/custom_order_by', function($orderBy, $orderType) {
    if ($orderType === 'trending') {
        return 'engagement_score DESC, created_at DESC';
    }

    return $orderBy;
}, 10, 2);

// Add custom sorting logic
add_filter('fluent_community/custom_order_by', function($orderBy, $orderType) {
    if ($orderType === 'quality') {
        return '(reactions_count * 2 + comments_count) DESC';
    }

    return $orderBy;
}, 10, 2);
```

**Common Use Cases:**
- Custom sorting
- Trending algorithms
- Quality scores

---

### fluent_community/lockscreen_formatted_field ​

Filters formatted lockscreen field data.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$formatted` | array | Formatted field data |
| `$field` | array | Raw field data |

**Return:** `array` - Modified formatted data

**Example Usage:**

```php
// Custom field formatting
add_filter('fluent_community/lockscreen_formatted_field', function($formatted, $field) {
    if ($field['type'] === 'custom_text') {
        $formatted['label'] = strtoupper($field['label']);
        $formatted['placeholder'] = $field['placeholder'] ?? '';
    }

    return $formatted;
}, 10, 2);

// Add validation rules
add_filter('fluent_community/lockscreen_formatted_field', function($formatted, $field) {
    if ($field['required']) {
        $formatted['validation'] = 'required';
    }

    return $formatted;
}, 10, 2);
```

**Common Use Cases:**
- Field customization
- Validation rules
- Custom field types

---

### fluent_community/skip_no_conflict ​

Filters whether to skip no-conflict mode.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$skip` | bool | Whether to skip no-conflict |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Always use no-conflict mode
add_filter('fluent_community/skip_no_conflict', function($skip) {
    return false;
});

// Skip in development
add_filter('fluent_community/skip_no_conflict', function($skip) {
    return defined('WP_DEBUG') && WP_DEBUG;
});
```

**Common Use Cases:**
- Development mode
- Compatibility settings
- Performance optimization

---

### fluent_community/suggested_colors ​

Filters suggested color palette for customization.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$colors` | array | Array of color suggestions |

**Return:** `array` - Modified colors

**Example Usage:**

```php
// Add brand colors
add_filter('fluent_community/suggested_colors', function($colors) {
    $colors['brand'] = [
        'primary'   => '#3B82F6',
        'secondary' => '#10B981',
        'accent'    => '#F59E0B',
        'dark'      => '#1F2937',
        'light'     => '#F3F4F6'
    ];

    return $colors;
});

// Custom color schemes
add_filter('fluent_community/suggested_colors', function($colors) {
    $colors['ocean'] = [
        'primary'   => '#0EA5E9',
        'secondary' => '#06B6D4',
        'accent'    => '#14B8A6'
    ];

    $colors['sunset'] = [
        'primary'   => '#F97316',
        'secondary' => '#EF4444',
        'accent'    => '#EC4899'
    ];

    return $colors;
});
```

**Common Use Cases:**
- Brand colors
- Theme presets
- Color customization

---

### fluent_community/update_lockscreen_settings ​

Filters lockscreen settings before update.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Lockscreen settings |

**Return:** `array` - Modified settings

**Example Usage:**

```php
// Validate settings
add_filter('fluent_community/update_lockscreen_settings', function($settings) {
    // Ensure required fields
    if (empty($settings['title'])) {
        $settings['title'] = 'Welcome';
    }

    // Sanitize HTML
    if (isset($settings['message'])) {
        $settings['message'] = wp_kses_post($settings['message']);
    }

    return $settings;
});

// Add defaults
add_filter('fluent_community/update_lockscreen_settings', function($settings) {
    $defaults = [
        'enabled'     => false,
        'title'       => 'Welcome',
        'message'     => '',
        'button_text' => 'Get Started'
    ];

    return wp_parse_args($settings, $defaults);
});
```

**Common Use Cases:**
- Settings validation
- Default values
- Data sanitization

---

### fluent_community/welcome_banner_for_guests ​

Filters welcome banner settings for guest users.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$banner` | array | Banner configuration |

**Return:** `array` - Modified banner

**Example Usage:**

```php
// Custom guest banner
add_filter('fluent_community/welcome_banner_for_guests', function($banner) {
    $banner['title'] = 'Join Our Community';
    $banner['message'] = 'Sign up to connect with thousands of members';
    $banner['cta_text'] = 'Sign Up Free';
    $banner['cta_url'] = home_url('/register');

    return $banner;
});

// Disable for guests
add_filter('fluent_community/welcome_banner_for_guests', function($banner) {
    $banner['enabled'] = false;

    return $banner;
});
```

**Common Use Cases:**
- Guest onboarding
- Call-to-action
- Marketing messages

---

### fluent_community/welcome_banner_for_logged_in ​

Filters welcome banner settings for logged-in users.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$banner` | array | Banner configuration |
| `$user` | User | Current user object |

**Return:** `array` - Modified banner

**Example Usage:**

```php
// Personalized banner
add_filter('fluent_community/welcome_banner_for_logged_in', function($banner, $user) {
    $banner['title'] = sprintf('Welcome back, %s!', $user->display_name);
    $banner['message'] = 'Check out what\'s new in the community';

    return $banner;
}, 10, 2);

// Hide for returning users
add_filter('fluent_community/welcome_banner_for_logged_in', function($banner, $user) {
    $login_count = get_user_meta($user->ID, 'login_count', true);

    if ($login_count > 5) {
        $banner['enabled'] = false;
    }

    return $banner;
}, 10, 2);

// Role-specific banners
add_filter('fluent_community/welcome_banner_for_logged_in', function($banner, $user) {
    if (in_array('premium_member', $user->roles)) {
        $banner['message'] = 'Welcome to your premium community experience!';
        $banner['style'] = 'premium';
    }

    return $banner;
}, 10, 2);
```

**Common Use Cases:**
- Personalization
- User onboarding
- Role-based messages
- Engagement prompts

---

## Related Documentation

- [Settings Actions](/hooks/actions/settings)
- [Portal Filters](/hooks/filters/portal)
- [Code Snippets](/guides/code-snippets)

