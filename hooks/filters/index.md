# All Filters

Filters allow you to modify data before it's used or displayed in Fluent Community. Unlike actions, filters **must return a value**.

## Quick Navigation

- 📋 **[All Actions](/hooks/actions/)** - Browse all 182 action hooks
- 📖 **[Quick Reference](/hooks/quick-reference)** - Alphabetical listing of all hooks
- 💡 **[Examples](/hooks/examples)** - Real-world use cases
- 🏠 **[Hooks Overview](/hooks/)** - Return to hooks home

---

## What are Filters?

Filters are hooks that let you intercept and modify data as it passes through the plugin. They're perfect for:

- Modifying content before saving
- Customizing API responses
- Adding or removing fields
- Validating data
- Transforming output

## How to Use Filters

```php
add_filter('hook_name', 'your_callback_function', $priority, $accepted_args);

function your_callback_function($value, $arg2) {
    // Modify $value
    return $value; // ALWAYS return!
}
```

### Important: Always Return a Value

```php
// ✅ Correct
add_filter('fluent_community/feed/new_feed_data', function($data) {
    $data['custom_field'] = 'value';
    return $data; // Must return!
}, 10, 1);

// ❌ Wrong - Missing return
add_filter('fluent_community/feed/new_feed_data', function($data) {
    $data['custom_field'] = 'value';
    // Missing return - will break the system!
}, 10, 1);
```

## Filters by Module

### Core Features (47 filters)

| Module | Count | Description |
|--------|-------|-------------|
| [Feeds & Posts](/hooks/filters/feeds) | 15 | Modify feed data, responses, settings |
| [Comments](/hooks/filters/comments) | 5 | Modify comment data and responses |
| [Spaces](/hooks/filters/spaces) | 10 | Modify space data, permissions, settings |
| [Users & Members](/hooks/filters/users) | 15 | Modify user data, permissions, profiles |
| [Activities](/hooks/filters/activities) | 5 | Modify activity feed content |

### Engagement Features (20 filters)

| Module | Count | Description |
|--------|-------|-------------|
| [Media](/hooks/filters/media) | 12 | Modify upload settings, file handling |
| [Reactions](/hooks/filters/reactions) | 3 | Modify reaction behavior |
| [Notifications](/hooks/filters/notifications) | 5 | Customize notification content |

### Authentication & Access (18 filters)

| Module | Count | Description |
|--------|-------|-------------|
| [Authentication](/hooks/filters/authentication) | 18 | Modify auth settings, redirects, fields |

### Learning Management (12 filters)

| Module | Count | Description |
|--------|-------|-------------|
| [Courses](/hooks/filters/courses) | 12 | Modify course data, access, settings |

### UI & Customization (25 filters)

| Module | Count | Description |
|--------|-------|-------------|
| [Portal & UI](/hooks/filters/portal) | 25 | Customize portal, menus, UI elements |

### Pro Features (7 filters)

| Module | Count | Description |
|--------|-------|-------------|
| [Moderation](/hooks/filters/moderation) 🔒 | 4 | Modify moderation settings and rules |
| [Followers](/hooks/filters/followers) 🔒 | 3 | Modify follower behavior |

### Administration (4 filters)

| Module | Count | Description |
|--------|-------|-------------|
| [Managers](/hooks/filters/managers) | 4 | Modify manager permissions and roles |

### Miscellaneous (30+ filters)

| Module | Count | Description |
|--------|-------|-------------|
| [Miscellaneous](/hooks/filters/miscellaneous) | 30+ | Various utility filters |

## Most Popular Filters

### Feed Data Modification

```php
// Modify feed data before creation
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    // Add custom metadata
    $data['meta']['custom_field'] = 'value';
    
    // Validate data
    if (empty($data['title'])) {
        return new WP_Error('missing_title', 'Title is required');
    }
    
    return $data;
}, 10, 2);

// Modify feed API response
add_filter('fluent_community/feed_api_response', function($feed) {
    // Add custom fields to response
    $feed['custom_data'] = get_custom_feed_data($feed['id']);
    
    return $feed;
}, 10, 1);
```

### User Permissions

```php
// Modify user permissions
add_filter('fluent_community/user/permissions', function($permissions, $user) {
    // Add custom permission
    $permissions['can_feature_posts'] = user_can($user->ID, 'edit_others_posts');
    
    return $permissions;
}, 10, 2);

// Modify space permissions
add_filter('fluent_community/user/space/permissions', function($permissions, $space, $user) {
    // Custom space permission logic
    if ($user->ID === $space->created_by) {
        $permissions['can_delete_any_post'] = true;
    }
    
    return $permissions;
}, 10, 3);
```

### Authentication

```php
// Modify login redirect URL
add_filter('fluent_community/auth/after_login_redirect_url', function($url, $user) {
    // Redirect to custom page based on user role
    if (in_array('premium_member', $user->roles)) {
        return home_url('/premium-dashboard');
    }
    
    return $url;
}, 10, 2);

// Customize registration fields
add_filter('fluent_community/auth/signup_fields', function($fields) {
    // Add custom field
    $fields['company'] = [
        'label' => 'Company Name',
        'type' => 'text',
        'required' => false
    ];
    
    return $fields;
}, 10, 1);
```

### Content Validation

```php
// Validate comment data
add_filter('fluent_community/comment/comment_data', function($data, $requestData) {
    // Minimum length check
    if (strlen($data['message']) < 10) {
        return new WP_Error('comment_too_short', 'Comment must be at least 10 characters');
    }
    
    // Spam check
    if (contains_spam($data['message'])) {
        return new WP_Error('spam_detected', 'Comment flagged as spam');
    }
    
    return $data;
}, 10, 2);
```

## Return Types

### Returning Modified Data

```php
add_filter('fluent_community/feed/new_feed_data', function($data) {
    $data['modified'] = true;
    return $data; // Return modified array
}, 10, 1);
```

### Returning WP_Error for Validation

```php
add_filter('fluent_community/feed/new_feed_data', function($data) {
    if (!is_valid($data)) {
        return new WP_Error('invalid_data', 'Data validation failed', ['status' => 400]);
    }
    return $data;
}, 10, 1);
```

### Returning Boolean

```php
add_filter('fluent_community/can_access_portal', function($canAccess, $user) {
    // Custom access logic
    return user_has_active_subscription($user->ID);
}, 10, 2);
```

### Returning Arrays

```php
add_filter('fluent_community/main_menu_items', function($items) {
    // Add custom menu item
    $items[] = [
        'label' => 'Custom Page',
        'url' => '/custom',
        'icon' => 'star'
    ];
    
    return $items;
}, 10, 1);
```

## Dynamic Filters

Some filters include placeholders that change based on context:

### Feed Type Filters

```php
// Fires for specific feed types
add_filter('fluent_community/feed/new_feed_data_type_{type}', function($data) {
    // {type} = 'article', 'video', 'event', etc.
    return $data;
}, 10, 1);

// Example: Only for articles
add_filter('fluent_community/feed/new_feed_data_type_article', function($data) {
    // Require title for articles
    if (empty($data['title'])) {
        return new WP_Error('missing_title', 'Articles must have a title');
    }
    return $data;
}, 10, 1);
```

### Media Context Filters

```php
// Fires for specific upload contexts
add_filter('fluent_community/media_upload_max_width_{context}', function($maxWidth) {
    // {context} = 'avatar', 'cover', 'post', etc.
    return $maxWidth;
}, 10, 1);
```

### Storage Driver Filters

```php
// Fires for specific storage drivers
add_filter('fluent_community/media_public_url_{driver}', function($url, $media) {
    // {driver} = 'local', 's3', 'cloudinary', etc.
    return $url;
}, 10, 2);
```

## Common Patterns

### Adding Custom Fields

```php
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    // Add custom metadata
    if (!isset($data['meta'])) {
        $data['meta'] = [];
    }
    
    $data['meta']['source'] = 'web';
    $data['meta']['ip_address'] = $_SERVER['REMOTE_ADDR'];
    
    return $data;
}, 10, 2);
```

### Conditional Modification

```php
add_filter('fluent_community/feed_api_response', function($feed) {
    $current_user = wp_get_current_user();
    
    // Only add sensitive data for admins
    if (in_array('administrator', $current_user->roles)) {
        $feed['admin_data'] = get_admin_feed_data($feed['id']);
    }
    
    return $feed;
}, 10, 1);
```

### Data Transformation

```php
add_filter('fluent_community/feeds_api_response', function($feeds) {
    // Transform each feed
    return array_map(function($feed) {
        // Add computed fields
        $feed['read_time'] = calculate_read_time($feed['message']);
        $feed['excerpt'] = wp_trim_words($feed['message'], 30);
        
        return $feed;
    }, $feeds);
}, 10, 1);
```

### Validation

```php
add_filter('fluent_community/space/create_data', function($data) {
    // Validate slug
    if (!preg_match('/^[a-z0-9-]+$/', $data['slug'])) {
        return new WP_Error('invalid_slug', 'Slug can only contain lowercase letters, numbers, and hyphens');
    }
    
    // Check for duplicate
    if (space_slug_exists($data['slug'])) {
        return new WP_Error('duplicate_slug', 'This slug is already in use');
    }
    
    return $data;
}, 10, 1);
```

## Best Practices

### 1. Always Return a Value

```php
// ✅ Correct
add_filter('fluent_community/feed/new_feed_data', function($data) {
    $data['modified'] = true;
    return $data; // Always return!
}, 10, 1);

// ❌ Wrong
add_filter('fluent_community/feed/new_feed_data', function($data) {
    $data['modified'] = true;
    // Missing return!
}, 10, 1);
```

### 2. Preserve Data Type

```php
// ✅ Correct - Returns same type
add_filter('fluent_community/max_post_length', function($maxLength) {
    return 5000; // Returns integer
}, 10, 1);

// ❌ Wrong - Changes type
add_filter('fluent_community/max_post_length', function($maxLength) {
    return '5000'; // Returns string instead of integer!
}, 10, 1);
```

### 3. Use WP_Error for Validation

```php
add_filter('fluent_community/feed/new_feed_data', function($data) {
    if (!is_valid($data)) {
        return new WP_Error('validation_failed', 'Invalid data', ['status' => 400]);
    }
    return $data;
}, 10, 1);
```

### 4. Check Data Exists

```php
add_filter('fluent_community/feed_api_response', function($feed) {
    if (!$feed || !isset($feed['id'])) {
        return $feed; // Return unchanged if invalid
    }
    
    // Safe to modify
    $feed['custom'] = 'value';
    return $feed;
}, 10, 1);
```

### 5. Don't Modify Original Objects

```php
// ✅ Correct - Modify array/primitive
add_filter('fluent_community/feed_api_response', function($feed) {
    $feed['custom'] = 'value';
    return $feed;
}, 10, 1);

// ⚠️ Be careful with objects
add_filter('fluent_community/some_object_filter', function($object) {
    // Modifying object properties directly affects the original
    $object->property = 'value'; // This changes the original!
    return $object;
}, 10, 1);
```

## Quick Links

- [All Actions](/hooks/actions/) - Execute code at specific points
- [Quick Reference](/hooks/quick-reference) - All hooks at a glance
- [Examples](/hooks/examples) - Real-world use cases

## Browse by Module

Choose a module to see detailed documentation for each filter:

- **[Feeds & Posts](/hooks/filters/feeds)** - Feed data and responses
- **[Comments](/hooks/filters/comments)** - Comment data and validation
- **[Spaces](/hooks/filters/spaces)** - Space data and permissions
- **[Users & Members](/hooks/filters/users)** - User data and permissions
- **[Media](/hooks/filters/media)** - Upload settings and file handling
- **[Reactions](/hooks/filters/reactions)** - Reaction behavior
- **[Notifications](/hooks/filters/notifications)** - Notification content
- **[Authentication](/hooks/filters/authentication)** - Auth settings and redirects
- **[Courses](/hooks/filters/courses)** - Course data and access
- **[Portal & UI](/hooks/filters/portal)** - UI customization
- **[Activities](/hooks/filters/activities)** - Activity feed content
- **[Managers](/hooks/filters/managers)** - Manager permissions
- **[Moderation](/hooks/filters/moderation)** 🔒 - Moderation settings (Pro)
- **[Followers](/hooks/filters/followers)** 🔒 - Follower behavior (Pro)
- **[Miscellaneous](/hooks/filters/miscellaneous)** - Other filters

---

::: tip Remember
Filters MUST return a value. Forgetting to return will break functionality!
:::

::: warning WP_Error
When returning `WP_Error` for validation, the plugin will stop processing and return the error to the user.
:::

