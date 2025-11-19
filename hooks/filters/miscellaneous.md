---
prev:
  text: 'Integrations Filters'
  link: '/hooks/filters/integrations'
next:
  text: 'Quick Reference'
  link: '/hooks/quick-reference'
---

# Miscellaneous Filters ​

Various utility filters for customizing Fluent Community functionality.

## Overview ​

This section contains filters that don't fit into other specific categories but provide important customization options for HTML sanitization, date formatting, features, execution limits, and more.

**Total Filters:** 15

---

## HTML & Content Sanitization

### fluent_community/allowed_html_tags ​

Filters the allowed HTML tags for user-generated content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$allowedTags` | array | Array of allowed HTML tags and attributes |

**Return:** `array` - Modified allowed tags

**Example Usage:**

```php
// Add custom HTML tags
add_filter('fluent_community/allowed_html_tags', function($allowedTags) {
    // Allow iframe for video embeds
    $allowedTags['iframe'] = [
        'src'             => true,
        'width'           => true,
        'height'          => true,
        'frameborder'     => true,
        'allowfullscreen' => true
    ];
    
    // Allow custom data attributes
    $allowedTags['div']['data-*'] = true;
    
    return $allowedTags;
});

// Restrict HTML for specific user roles
add_filter('fluent_community/allowed_html_tags', function($allowedTags) {
    $user = wp_get_current_user();
    
    // Only allow basic formatting for new users
    if (!in_array('administrator', $user->roles) && !in_array('editor', $user->roles)) {
        $allowedTags = [
            'p'      => [],
            'br'     => [],
            'strong' => [],
            'em'     => [],
            'a'      => ['href' => true, 'title' => true]
        ];
    }
    
    return $allowedTags;
});

// Allow specific embed providers
add_filter('fluent_community/allowed_html_tags', function($allowedTags) {
    $allowedTags['iframe']['src'] = [
        'youtube.com',
        'vimeo.com',
        'dailymotion.com'
    ];
    
    return $allowedTags;
});
```

**Common Use Cases:**
- Video embeds
- Custom HTML elements
- Role-based restrictions
- Security hardening

---

## Date & Time Formatting

### fluent_community/date_time_i18n ​

Filters date and time internationalization settings.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$dateTime` | string | Formatted date/time string |
| `$timestamp` | int | Unix timestamp |
| `$format` | string | Date format |

**Return:** `string` - Modified date/time string

**Example Usage:**

```php
// Custom date format
add_filter('fluent_community/date_time_i18n', function($dateTime, $timestamp, $format) {
    // Use relative time for recent dates
    $diff = time() - $timestamp;
    
    if ($diff < 60) {
        return 'Just now';
    } elseif ($diff < 3600) {
        return floor($diff / 60) . ' minutes ago';
    } elseif ($diff < 86400) {
        return floor($diff / 3600) . ' hours ago';
    }
    
    return $dateTime;
}, 10, 3);

// Localized date formats
add_filter('fluent_community/date_time_i18n', function($dateTime, $timestamp, $format) {
    $locale = get_user_locale();
    
    $formats = [
        'en_US' => 'F j, Y g:i a',
        'en_GB' => 'j F Y H:i',
        'de_DE' => 'j. F Y H:i',
        'fr_FR' => 'j F Y H:i'
    ];
    
    $custom_format = $formats[$locale] ?? $format;
    
    return date_i18n($custom_format, $timestamp);
}, 10, 3);

// Add timezone information
add_filter('fluent_community/date_time_i18n', function($dateTime, $timestamp, $format) {
    $timezone = wp_timezone_string();
    
    return $dateTime . ' (' . $timezone . ')';
}, 10, 3);
```

**Common Use Cases:**
- Relative time display
- Localization
- Timezone handling
- Custom formats

---

## Feature Flags

### fluent_community/features/analytics ​

Filters whether analytics features are enabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$enabled` | bool | Whether analytics is enabled |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Enable analytics for premium users only
add_filter('fluent_community/features/analytics', function($enabled) {
    $user = wp_get_current_user();
    
    return in_array('premium_member', $user->roles);
});

// Disable analytics in development
add_filter('fluent_community/features/analytics', function($enabled) {
    return !defined('WP_DEBUG') || !WP_DEBUG;
});

// Enable based on site option
add_filter('fluent_community/features/analytics', function($enabled) {
    return get_option('enable_community_analytics', false);
});
```

**Common Use Cases:**
- Role-based features
- Environment-specific settings
- Premium features

---

## Performance & Limits

### fluent_community/max_execution_time ​

Filters the maximum execution time for long-running operations.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$time` | int | Maximum execution time in seconds |
| `$operation` | string | Operation type |

**Return:** `int` - Modified time limit

**Example Usage:**

```php
// Set operation-specific limits
add_filter('fluent_community/max_execution_time', function($time, $operation) {
    $limits = [
        'export'    => 300,  // 5 minutes
        'import'    => 600,  // 10 minutes
        'migration' => 1800, // 30 minutes
        'backup'    => 900   // 15 minutes
    ];
    
    return $limits[$operation] ?? $time;
}, 10, 2);

// Adjust based on server capacity
add_filter('fluent_community/max_execution_time', function($time, $operation) {
    $max_allowed = ini_get('max_execution_time');
    
    // Don't exceed server limit
    return min($time, $max_allowed - 10);
}, 10, 2);
```

**Common Use Cases:**
- Operation-specific limits
- Server capacity management
- Long-running tasks

---

## Question Types

### fluent_community/question_types ​

Filters available question types for Q&A features.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$types` | array | Available question types |

**Return:** `array` - Modified types

**Example Usage:**

```php
// Add custom question types
add_filter('fluent_community/question_types', function($types) {
    $types['poll'] = [
        'label'       => 'Poll',
        'icon'        => 'chart-bar',
        'description' => 'Create a poll with multiple options'
    ];
    
    $types['survey'] = [
        'label'       => 'Survey',
        'icon'        => 'clipboard-list',
        'description' => 'Create a detailed survey'
    ];
    
    return $types;
});

// Remove question types
add_filter('fluent_community/question_types', function($types) {
    unset($types['discussion']);
    
    return $types;
});

// Customize existing types
add_filter('fluent_community/question_types', function($types) {
    if (isset($types['question'])) {
        $types['question']['label'] = 'Ask Question';
        $types['question']['description'] = 'Ask the community a question';
    }
    
    return $types;
});
```

**Common Use Cases:**
- Custom question types
- Feature restrictions
- Type customization

---

## Report Reasons

### fluent_community/report_reasons ​

Filters available reasons for reporting content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$reasons` | array | Available report reasons |

**Return:** `array` - Modified reasons

**Example Usage:**

```php
// Add custom report reasons
add_filter('fluent_community/report_reasons', function($reasons) {
    $reasons['copyright'] = 'Copyright Violation';
    $reasons['misinformation'] = 'Misinformation';
    $reasons['off_topic'] = 'Off Topic';
    
    return $reasons;
});

// Localize report reasons
add_filter('fluent_community/report_reasons', function($reasons) {
    $locale = get_user_locale();
    
    if ($locale === 'es_ES') {
        $reasons = [
            'spam'        => 'Spam',
            'harassment'  => 'Acoso',
            'hate_speech' => 'Discurso de odio',
            'violence'    => 'Violencia',
            'other'       => 'Otro'
        ];
    }
    
    return $reasons;
});

// Remove reasons
add_filter('fluent_community/report_reasons', function($reasons) {
    unset($reasons['other']);
    
    return $reasons;
});
```

**Common Use Cases:**
- Custom report categories
- Localization
- Community-specific reasons

---

## Smart Codes

### fluent_community/smartcode_fallback ​

Filters fallback values for smart codes.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$fallback` | string | Fallback value |
| `$code` | string | Smart code |
| `$data` | array | Context data |

**Return:** `string` - Modified fallback

**Example Usage:**

```php
// Custom fallback values
add_filter('fluent_community/smartcode_fallback', function($fallback, $code, $data) {
    $fallbacks = [
        'user.name'   => 'Community Member',
        'space.title' => 'General Discussion',
        'site.name'   => get_bloginfo('name')
    ];
    
    return $fallbacks[$code] ?? $fallback;
}, 10, 3);

// Dynamic fallbacks
add_filter('fluent_community/smartcode_fallback', function($fallback, $code, $data) {
    if ($code === 'user.name' && isset($data['user_id'])) {
        $user = get_user_by('ID', $data['user_id']);
        return $user ? $user->display_name : 'Guest';
    }
    
    return $fallback;
}, 10, 3);
```

**Common Use Cases:**
- Default values
- Dynamic fallbacks
- Localization

---

## Storage Settings

### fluent_community/storage_driver_settings ​

Filters storage driver configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Storage driver settings |
| `$driver` | string | Driver name |

**Return:** `array` - Modified settings

**Example Usage:**

```php
// Configure S3 storage
add_filter('fluent_community/storage_driver_settings', function($settings, $driver) {
    if ($driver === 's3') {
        $settings['bucket'] = 'my-community-uploads';
        $settings['region'] = 'us-east-1';
        $settings['path_prefix'] = 'community/';
    }
    
    return $settings;
}, 10, 2);

// Configure local storage
add_filter('fluent_community/storage_driver_settings', function($settings, $driver) {
    if ($driver === 'local') {
        $settings['path'] = WP_CONTENT_DIR . '/community-uploads';
        $settings['url'] = content_url('community-uploads');
    }
    
    return $settings;
}, 10, 2);
```

**Common Use Cases:**
- Cloud storage configuration
- Custom storage paths
- CDN integration

---

## Survey Settings

### fluent_community/survey_settings ​

Filters survey feature settings.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$settings` | array | Survey settings |

**Return:** `array` - Modified settings

**Example Usage:**

```php
// Configure survey defaults
add_filter('fluent_community/survey_settings', function($settings) {
    $settings['max_questions'] = 20;
    $settings['allow_anonymous'] = true;
    $settings['show_results'] = 'after_submission';
    $settings['allow_multiple_responses'] = false;
    
    return $settings;
});

// Role-based survey permissions
add_filter('fluent_community/survey_settings', function($settings) {
    $user = wp_get_current_user();
    
    if (in_array('premium_member', $user->roles)) {
        $settings['max_questions'] = 50;
        $settings['advanced_analytics'] = true;
    }
    
    return $settings;
});
```

**Common Use Cases:**
- Survey configuration
- Permission management
- Feature limits

---

## Webhook Settings

### fluent_community/webhook_event_data ​

Filters webhook event data before sending.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Event data |
| `$event` | string | Event name |

**Return:** `array` - Modified data

**Example Usage:**

```php
// Add custom webhook data
add_filter('fluent_community/webhook_event_data', function($data, $event) {
    $data['site_url'] = home_url();
    $data['timestamp'] = time();
    $data['environment'] = wp_get_environment_type();
    
    return $data;
}, 10, 2);

// Filter sensitive data
add_filter('fluent_community/webhook_event_data', function($data, $event) {
    // Remove sensitive fields
    unset($data['user']['email']);
    unset($data['user']['ip_address']);
    
    return $data;
}, 10, 2);

// Event-specific data
add_filter('fluent_community/webhook_event_data', function($data, $event) {
    if ($event === 'user_registered') {
        $data['registration_source'] = $_SERVER['HTTP_REFERER'] ?? 'direct';
    }
    
    return $data;
}, 10, 2);
```

**Common Use Cases:**
- Custom webhook data
- Data filtering
- Event tracking

---

## Smart Code Groups

### fluent_community/smartcode_group_callback_{group} ​

Filters smart code group callback for custom smart code groups.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$value` | mixed | Smart code value |
| `$code` | string | Smart code |
| `$data` | array | Context data |

**Return:** `mixed` - Modified value

**Example Usage:**

```php
// Custom smart code group
add_filter('fluent_community/smartcode_group_callback_custom', function($value, $code, $data) {
    if ($code === 'custom.company_name') {
        return get_user_meta($data['user_id'], 'company_name', true);
    }

    if ($code === 'custom.department') {
        return get_user_meta($data['user_id'], 'department', true);
    }

    return $value;
}, 10, 3);

// Dynamic content smart codes
add_filter('fluent_community/smartcode_group_callback_dynamic', function($value, $code, $data) {
    if ($code === 'dynamic.current_date') {
        return date('F j, Y');
    }

    if ($code === 'dynamic.member_count') {
        return get_total_member_count();
    }

    return $value;
}, 10, 3);
```

**Common Use Cases:**
- Custom smart codes
- Dynamic content
- User metadata

---

## Support & Attachments

### fluent_community/support_attachment_types ​

Filters allowed attachment types for support tickets.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$types` | array | Allowed file types |

**Return:** `array` - Modified types

**Example Usage:**

```php
// Add custom attachment types
add_filter('fluent_community/support_attachment_types', function($types) {
    $types[] = 'pdf';
    $types[] = 'doc';
    $types[] = 'docx';
    $types[] = 'zip';

    return $types;
});

// Restrict to images only
add_filter('fluent_community/support_attachment_types', function($types) {
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'];
});

// Role-based attachment types
add_filter('fluent_community/support_attachment_types', function($types) {
    $user = wp_get_current_user();

    if (in_array('premium_member', $user->roles)) {
        // Premium members can upload more types
        $types = array_merge($types, ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'zip']);
    }

    return array_unique($types);
});
```

**Common Use Cases:**
- File type restrictions
- Role-based permissions
- Security controls

---

### fluent_community/terms_policy_url ​

Filters the terms and policy URL.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$url` | string | Terms and policy URL |

**Return:** `string` - Modified URL

**Example Usage:**

```php
// Set custom terms URL
add_filter('fluent_community/terms_policy_url', function($url) {
    return home_url('/community-terms');
});

// Localized terms pages
add_filter('fluent_community/terms_policy_url', function($url) {
    $locale = get_user_locale();

    $urls = [
        'en_US' => home_url('/terms'),
        'es_ES' => home_url('/terminos'),
        'fr_FR' => home_url('/conditions'),
        'de_DE' => home_url('/bedingungen')
    ];

    return $urls[$locale] ?? $url;
});

// External terms page
add_filter('fluent_community/terms_policy_url', function($url) {
    return 'https://legal.mycompany.com/community-terms';
});
```

**Common Use Cases:**
- Custom terms pages
- Localization
- External legal pages

---

## Editor Settings

### fluent_community/use_editor_block ​

Filters whether to use block editor for content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$useBlock` | bool | Whether to use block editor |
| `$context` | string | Editor context |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Enable block editor globally
add_filter('fluent_community/use_editor_block', function($useBlock, $context) {
    return true;
}, 10, 2);

// Context-specific editor
add_filter('fluent_community/use_editor_block', function($useBlock, $context) {
    // Use block editor for posts, classic for comments
    if ($context === 'post') {
        return true;
    }

    if ($context === 'comment') {
        return false;
    }

    return $useBlock;
}, 10, 2);

// Role-based editor
add_filter('fluent_community/use_editor_block', function($useBlock, $context) {
    $user = wp_get_current_user();

    // Only admins and editors get block editor
    return in_array('administrator', $user->roles) || in_array('editor', $user->roles);
}, 10, 2);
```

**Common Use Cases:**
- Editor type selection
- Context-specific editors
- Role-based features

---

### fluent_community/will_render_default_sidebar_items ​

Filters whether to render default sidebar items.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$willRender` | bool | Whether to render default items |
| `$context` | string | Sidebar context |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Disable default sidebar items
add_filter('fluent_community/will_render_default_sidebar_items', function($willRender, $context) {
    return false; // Use custom sidebar only
}, 10, 2);

// Context-specific sidebar
add_filter('fluent_community/will_render_default_sidebar_items', function($willRender, $context) {
    // Hide default items on profile pages
    if ($context === 'profile') {
        return false;
    }

    return $willRender;
}, 10, 2);

// Role-based sidebar
add_filter('fluent_community/will_render_default_sidebar_items', function($willRender, $context) {
    $user = wp_get_current_user();

    // Premium members see custom sidebar
    if (in_array('premium_member', $user->roles)) {
        return false;
    }

    return $willRender;
}, 10, 2);
```

**Common Use Cases:**
- Custom sidebar layouts
- Context-specific sidebars
- Role-based UI

---

## Best Practices

### 1. Security First

```php
add_filter('fluent_community/allowed_html_tags', function($allowedTags) {
    // Always sanitize and validate
    // Be restrictive by default
    return $allowedTags;
});
```

### 2. Performance Considerations

```php
add_filter('fluent_community/max_execution_time', function($time, $operation) {
    // Don't set unreasonably high limits
    return min($time, 600); // Max 10 minutes
}, 10, 2);
```

### 3. Provide Fallbacks

```php
add_filter('fluent_community/smartcode_fallback', function($fallback, $code, $data) {
    // Always provide meaningful fallbacks
    return !empty($fallback) ? $fallback : 'N/A';
}, 10, 3);
```

---

## Related Documentation

- [Settings Filters](/hooks/filters/settings)
- [Media Filters](/hooks/filters/media)
- [Permissions Filters](/hooks/filters/permissions)
- [Code Snippets](/guides/code-snippets)

