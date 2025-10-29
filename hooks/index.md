# Hooks Overview

Fluent Community provides a comprehensive system of **actions** and **filters** that allow developers to extend and customize the plugin's functionality without modifying core files.

## What are Hooks?

WordPress hooks are a way for one piece of code to interact with another. They make up the foundation for how plugins and themes interact with WordPress Core.

### Actions

**Actions** allow you to execute custom code at specific points during execution. They don't return anything back to the calling hook.

```php
// Example: Send notification when a feed is created
add_action('fluent_community/feed/created', function($feed) {
    // Your custom code here
    error_log('New feed created: ' . $feed->id);
}, 10, 1);
```

### Filters

**Filters** allow you to modify data before it's used or displayed. They must return a value.

```php
// Example: Modify feed data before creation
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    // Add custom metadata
    $data['meta']['custom_field'] = 'custom_value';
    return $data;
}, 10, 2);
```

## Hook Statistics

- **Total Hooks:** 362
- **Actions:** 182 ([View All Actions](/hooks/actions/))
- **Filters:** 180 ([View All Filters](/hooks/filters/))
- **Modules:** 15+ organized categories

## Quick Navigation

- 📋 **[All Actions](/hooks/actions/)** - Browse all 182 action hooks
- 🔧 **[All Filters](/hooks/filters/)** - Browse all 180 filter hooks
- 📖 **[Quick Reference](/hooks/quick-reference)** - Alphabetical listing of all hooks
- 💡 **[Examples](/hooks/examples)** - Real-world use cases and integration examples

## Hook Categories

### Core Features

| Module | Actions | Filters | Total | Documentation |
|--------|---------|---------|-------|---------------|
| **Feeds & Posts** | 18 | 15 | 33 | [Actions](/hooks/actions/feeds) • [Filters](/hooks/filters/feeds) |
| **Comments** | 11 | 5 | 16 | [Actions](/hooks/actions/comments) • [Filters](/hooks/filters/comments) |
| **Spaces** | 14 | 10 | 24 | [Actions](/hooks/actions/spaces) • [Filters](/hooks/filters/spaces) |
| **Users & Members** | 12 | 15 | 27 | [Actions](/hooks/actions/users) • [Filters](/hooks/filters/users) |

### Engagement Features

| Module | Actions | Filters | Total | Documentation |
|--------|---------|---------|-------|---------------|
| **Media** | 4 | 12 | 16 | [Actions](/hooks/actions/media) • [Filters](/hooks/filters/media) |
| **Reactions** | 2 | 3 | 5 | [Actions](/hooks/actions/reactions) • [Filters](/hooks/filters/reactions) |
| **Notifications** | 8 | 5 | 13 | [Actions](/hooks/actions/notifications) • [Filters](/hooks/filters/notifications) |

### Authentication & Access

| Module | Actions | Filters | Total | Documentation |
|--------|---------|---------|-------|---------------|
| **Authentication** | 8 | 18 | 26 | [Actions](/hooks/actions/authentication) • [Filters](/hooks/filters/authentication) |

### Learning Management

| Module | Actions | Filters | Total | Documentation |
|--------|---------|---------|-------|---------------|
| **Courses** | 18 | 12 | 30 | [Actions](/hooks/actions/courses) • [Filters](/hooks/filters/courses) |

### Pro Features

| Module | Actions | Filters | Total | Documentation |
|--------|---------|---------|-------|---------------|
| **Moderation** 🔒 | 6 | 4 | 10 | [Actions](/hooks/actions/moderation) • [Filters](/hooks/filters/moderation) |
| **Followers** 🔒 | 4 | 3 | 7 | [Actions](/hooks/actions/followers) • [Filters](/hooks/filters/followers) |

### UI & Customization

| Module | Actions | Filters | Total | Documentation |
|--------|---------|---------|-------|---------------|
| **Portal & UI** | 20 | 25 | 45 | [Actions](/hooks/actions/portal) • [Filters](/hooks/filters/portal) |
| **Activities** | 3 | 5 | 8 | [Actions](/hooks/actions/activities) • [Filters](/hooks/filters/activities) |

### Administration

| Module | Actions | Filters | Total | Documentation |
|--------|---------|---------|-------|---------------|
| **Managers** | 5 | 4 | 9 | [Actions](/hooks/actions/managers) • [Filters](/hooks/filters/managers) |

## Quick Start

### 1. Choose Your Hook

Browse the [Quick Reference](/hooks/quick-reference) to find the hook you need, or explore by category:

- **[All Actions](/hooks/actions/)** - Execute code at specific points
- **[All Filters](/hooks/filters/)** - Modify data before use

### 2. Add Your Code

Add your custom code to your theme's `functions.php` or a custom plugin:

```php
// In your theme's functions.php or custom plugin

// Action example
add_action('fluent_community/feed/created', 'my_custom_feed_handler', 10, 1);

function my_custom_feed_handler($feed) {
    // Your code here
}

// Filter example
add_filter('fluent_community/feed/new_feed_data', 'my_custom_feed_modifier', 10, 2);

function my_custom_feed_modifier($data, $requestData) {
    // Modify data
    return $data;
}
```

### 3. Test Your Implementation

Always test your hooks in a development environment first!

## Common Use Cases

### Integration with Third-Party Services

```php
// Send feed data to external API
add_action('fluent_community/feed/created', function($feed) {
    wp_remote_post('https://api.example.com/webhook', [
        'body' => json_encode([
            'feed_id' => $feed->id,
            'title' => $feed->title,
            'author' => $feed->user_id
        ])
    ]);
}, 10, 1);
```

### Custom Validation

```php
// Prevent posts with certain words
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $bannedWords = ['spam', 'scam'];
    
    foreach ($bannedWords as $word) {
        if (stripos($data['message'], $word) !== false) {
            return new WP_Error('invalid_content', 'Content contains banned words');
        }
    }
    
    return $data;
}, 10, 2);
```

### Award Points System

```php
// Award points when user creates a post
add_action('fluent_community/feed/created', function($feed) {
    $points = get_user_meta($feed->user_id, 'community_points', true) ?: 0;
    update_user_meta($feed->user_id, 'community_points', $points + 10);
}, 10, 1);
```

### Custom Notifications

```php
// Send custom email when user joins a space
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    $user = get_user_by('id', $userId);
    
    wp_mail(
        $user->user_email,
        'Welcome to ' . $space->title,
        'You have successfully joined ' . $space->title
    );
}, 10, 3);
```

## Best Practices

### 1. Use Appropriate Priority

The third parameter in `add_action()` and `add_filter()` is the priority (default: 10). Lower numbers run earlier.

```php
// Run before other hooks
add_action('fluent_community/feed/created', 'my_function', 5, 1);

// Run after other hooks
add_action('fluent_community/feed/created', 'my_function', 20, 1);
```

### 2. Specify Number of Parameters

Always specify the correct number of parameters (4th argument):

```php
// Hook has 3 parameters
add_action('fluent_community/space/joined', 'my_function', 10, 3);

function my_function($space, $userId, $source) {
    // All 3 parameters available
}
```

### 3. Return Values for Filters

**Always return a value** from filter callbacks:

```php
// ✅ Correct
add_filter('fluent_community/feed/new_feed_data', function($data) {
    $data['custom'] = 'value';
    return $data; // Always return!
}, 10, 1);

// ❌ Wrong - Missing return
add_filter('fluent_community/feed/new_feed_data', function($data) {
    $data['custom'] = 'value';
    // Missing return statement!
}, 10, 1);
```

### 4. Error Handling

Use `WP_Error` for validation in filters:

```php
add_filter('fluent_community/feed/new_feed_data', function($data) {
    if (empty($data['title'])) {
        return new WP_Error('missing_title', 'Title is required');
    }
    return $data;
}, 10, 1);
```

### 5. Check Conditions

Always verify data exists before using it:

```php
add_action('fluent_community/feed/created', function($feed) {
    if (!$feed || !isset($feed->id)) {
        return;
    }
    
    // Safe to use $feed->id
}, 10, 1);
```

## Resources

- **[Quick Reference](/hooks/quick-reference)** - All hooks at a glance
- **[Examples & Use Cases](/hooks/examples)** - Real-world implementations
- **[All Actions](/hooks/actions/)** - Complete actions reference
- **[All Filters](/hooks/filters/)** - Complete filters reference

## Need Help?

- 📖 Check the [Examples](/hooks/examples) page for common scenarios
- 🔍 Use the search to find specific hooks
- 💬 Join our [community forum](https://fluentcommunity.co/community/)
- 📧 Contact [support](https://fluentcommunity.co/support/)

## Version Information

- **Free Version:** Includes all core hooks
- **Pro Version:** Includes additional hooks for premium features (marked with 🔒)

---

::: tip Dynamic Hooks
Some hooks include `{placeholder}` in their names. These are dynamic hooks that change based on context. For example:
- `fluent_community/feed/new_feed_data_type_{type}` becomes `fluent_community/feed/new_feed_data_type_article` for article posts
- `fluent_community/comment_added_{feed_type}` becomes `fluent_community/comment_added_feed` for feed comments
:::

::: warning Important
Always test hooks in a development environment before deploying to production. Some hooks can significantly impact your community's functionality.
:::

