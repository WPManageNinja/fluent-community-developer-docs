# All Actions

Actions allow you to execute custom code at specific points during Fluent Community's execution. Unlike filters, actions don't return values—they simply allow you to "do something" when an event occurs.

## Quick Navigation

- 🔧 **[All Filters](/hooks/filters/)** - Browse all 180 filter hooks
- 📖 **[Quick Reference](/hooks/quick-reference)** - Alphabetical listing of all hooks
- 💡 **[Examples](/hooks/examples)** - Real-world use cases
- 🏠 **[Hooks Overview](/hooks/)** - Return to hooks home

---

## What are Actions?

Actions are hooks that let you insert custom functionality at specific points in the plugin's execution flow. They're perfect for:

- Sending notifications
- Logging activities
- Integrating with third-party services
- Triggering custom workflows
- Updating external databases

## How to Use Actions

```php
add_action('hook_name', 'your_callback_function', $priority, $accepted_args);

function your_callback_function($arg1, $arg2) {
    // Your custom code here
}
```

### Parameters

- **hook_name** - The name of the action hook
- **your_callback_function** - Your function to execute
- **$priority** - Optional. Order of execution (default: 10, lower = earlier)
- **$accepted_args** - Optional. Number of parameters your function accepts

## Actions by Module

### Core Features (82 actions)

| Module | Count | Description |
|--------|-------|-------------|
| [Feeds & Posts](/hooks/actions/feeds) | 18 | Feed creation, updates, deletion, scheduling |
| [Comments](/hooks/actions/comments) | 11 | Comment lifecycle and management |
| [Spaces](/hooks/actions/spaces) | 14 | Space and space group management |
| [Users & Members](/hooks/actions/users) | 12 | User registration, profiles, roles |
| [Courses](/hooks/actions/courses) | 18 | Course and lesson management |
| [Activities](/hooks/actions/activities) | 3 | Activity feed events |
| [Managers](/hooks/actions/managers) | 5 | Community manager operations |

### Engagement Features (14 actions)

| Module | Count | Description |
|--------|-------|-------------|
| [Media](/hooks/actions/media) | 4 | File uploads and media management |
| [Reactions](/hooks/actions/reactions) | 2 | Likes and reactions |
| [Notifications](/hooks/actions/notifications) | 8 | Notification system events |

### Authentication & Access (8 actions)

| Module | Count | Description |
|--------|-------|-------------|
| [Authentication](/hooks/actions/authentication) | 8 | Login, registration, invitations |

### UI & Customization (20 actions)

| Module | Count | Description |
|--------|-------|-------------|
| [Portal & UI](/hooks/actions/portal) | 20 | Portal rendering and customization |

### Pro Features (10 actions)

| Module | Count | Description |
|--------|-------|-------------|
| [Moderation](/hooks/actions/moderation) 🔒 | 6 | Content moderation and user banning |
| [Followers](/hooks/actions/followers) 🔒 | 4 | Follow/unfollow system |

### Miscellaneous (30+ actions)

| Module | Count | Description |
|--------|-------|-------------|
| [Miscellaneous](/hooks/actions/miscellaneous) | 30+ | Various utility and integration hooks |

## Most Popular Actions

### Feed Management

```php
// When a feed is created
add_action('fluent_community/feed/created', function($feed) {
    // $feed = Feed object with all properties
}, 10, 1);

// When a feed is updated
add_action('fluent_community/feed/updated', function($feed, $oldFeed) {
    // $feed = Updated feed object
    // $oldFeed = Previous feed state
}, 10, 2);

// When a feed is deleted
add_action('fluent_community/feed/deleted', function($feed) {
    // $feed = Deleted feed object
}, 10, 1);
```

### User Management

```php
// When a user registers
add_action('fluent_community/user_registered', function($user, $profile) {
    // $user = WP_User object
    // $profile = XProfile object
}, 10, 2);

// When a profile is updated
add_action('fluent_community/profile_updated', function($user, $profile, $oldProfile) {
    // $user = WP_User object
    // $profile = Updated XProfile object
    // $oldProfile = Previous profile state
}, 10, 3);
```

### Space Management

```php
// When a space is created
add_action('fluent_community/space/created', function($space) {
    // $space = Space object
}, 10, 1);

// When a user joins a space
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    // $space = Space object
    // $userId = User ID (int)
    // $source = 'request'|'invitation'|'auto'
}, 10, 3);
```

### Comment Management

```php
// When a comment is added
add_action('fluent_community/comment_added', function($comment, $feed) {
    // $comment = Comment object
    // $feed = Parent feed object
}, 10, 2);

// When a comment is updated
add_action('fluent_community/comment_updated', function($comment, $feed, $oldComment) {
    // $comment = Updated comment object
    // $feed = Parent feed object
    // $oldComment = Previous comment state
}, 10, 3);
```

### Course Management

```php
// When a course is completed
add_action('fluent_community/course/completed', function($course, $userId) {
    // $course = Course object
    // $userId = User ID (int)
}, 10, 2);

// When a user enrolls in a course
add_action('fluent_community/course/enrolled', function($course, $userId, $source) {
    // $course = Course object
    // $userId = User ID (int)
    // $source = Enrollment source
}, 10, 3);
```

## Dynamic Actions

Some actions include placeholders that change based on context:

### Feed Type Actions

```php
// Fires for specific feed types
add_action('fluent_community/feed/new_feed_{status}', function($feed) {
    // {status} = 'published', 'draft', 'pending', etc.
}, 10, 1);

add_action('fluent_community/feed/just_created_type_{type}', function($feed) {
    // {type} = 'feed', 'article', 'video', etc.
}, 10, 1);
```

### Comment Type Actions

```php
// Fires for specific feed types
add_action('fluent_community/comment_added_{feed_type}', function($comment, $feed) {
    // {feed_type} = 'feed', 'article', 'course', etc.
}, 10, 2);
```

### Course Meta Settings

```php
// Fires for specific providers
add_action('fluent_community/course/update_meta_settings_{provider}', function($course, $settings) {
    // {provider} = 'zoom', 'youtube', etc.
}, 10, 2);
```

## Common Patterns

### Logging Activities

```php
add_action('fluent_community/feed/created', function($feed) {
    error_log(sprintf(
        'Feed created: ID=%d, User=%d, Type=%s',
        $feed->id,
        $feed->user_id,
        $feed->type
    ));
}, 10, 1);
```

### Sending Notifications

```php
add_action('fluent_community/space/joined', function($space, $userId) {
    $user = get_user_by('id', $userId);
    
    // Send welcome email
    wp_mail(
        $user->user_email,
        'Welcome to ' . $space->title,
        'You have successfully joined the space!'
    );
}, 10, 2);
```

### Integrating with External Services

```php
add_action('fluent_community/user_registered', function($user, $profile) {
    // Send to external CRM
    wp_remote_post('https://api.example.com/users', [
        'body' => json_encode([
            'email' => $user->user_email,
            'name' => $profile->display_name
        ])
    ]);
}, 10, 2);
```

### Updating Metadata

```php
add_action('fluent_community/feed/created', function($feed) {
    // Update user's post count
    $count = get_user_meta($feed->user_id, 'post_count', true) ?: 0;
    update_user_meta($feed->user_id, 'post_count', $count + 1);
}, 10, 1);
```

## Best Practices

### 1. Check Data Exists

```php
add_action('fluent_community/feed/created', function($feed) {
    if (!$feed || !isset($feed->id)) {
        return; // Safety check
    }
    
    // Safe to use $feed
}, 10, 1);
```

### 2. Use Appropriate Priority

```php
// Run early (before other hooks)
add_action('fluent_community/feed/created', 'my_function', 5, 1);

// Run late (after other hooks)
add_action('fluent_community/feed/created', 'my_function', 20, 1);
```

### 3. Specify Correct Argument Count

```php
// Hook provides 3 arguments
add_action('fluent_community/space/joined', 'my_function', 10, 3);

function my_function($space, $userId, $source) {
    // All 3 parameters available
}
```

### 4. Handle Errors Gracefully

```php
add_action('fluent_community/feed/created', function($feed) {
    try {
        // Your code that might fail
        risky_operation($feed);
    } catch (Exception $e) {
        error_log('Error in feed hook: ' . $e->getMessage());
    }
}, 10, 1);
```

### 5. Don't Return Values

```php
// ❌ Wrong - Actions don't return values
add_action('fluent_community/feed/created', function($feed) {
    return false; // This does nothing!
}, 10, 1);

// ✅ Correct - Just execute code
add_action('fluent_community/feed/created', function($feed) {
    do_something($feed);
    // No return needed
}, 10, 1);
```

## Quick Links

- [All Filters](/hooks/filters/) - Modify data before use
- [Quick Reference](/hooks/quick-reference) - All hooks at a glance
- [Examples](/hooks/examples) - Real-world use cases

## Browse by Module

Choose a module to see detailed documentation for each action:

- **[Feeds & Posts](/hooks/actions/feeds)** - Feed lifecycle and management
- **[Comments](/hooks/actions/comments)** - Comment system hooks
- **[Spaces](/hooks/actions/spaces)** - Space and group management
- **[Users & Members](/hooks/actions/users)** - User and profile hooks
- **[Media](/hooks/actions/media)** - File upload and media hooks
- **[Reactions](/hooks/actions/reactions)** - Like and reaction hooks
- **[Notifications](/hooks/actions/notifications)** - Notification system
- **[Authentication](/hooks/actions/authentication)** - Login and registration
- **[Courses](/hooks/actions/courses)** - Learning management
- **[Portal & UI](/hooks/actions/portal)** - UI customization
- **[Activities](/hooks/actions/activities)** - Activity feed
- **[Managers](/hooks/actions/managers)** - Community managers
- **[Moderation](/hooks/actions/moderation)** 🔒 - Content moderation (Pro)
- **[Followers](/hooks/actions/followers)** 🔒 - Follow system (Pro)
- **[Miscellaneous](/hooks/actions/miscellaneous)** - Other hooks

---

::: tip Need Help?
Can't find the hook you need? Check the [Quick Reference](/hooks/quick-reference) for a complete alphabetical list.
:::

