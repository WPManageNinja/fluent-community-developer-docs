# Spaces Actions

Actions related to space creation, management, and membership in Fluent Community.

## Overview

Spaces are community areas where members can gather around specific topics or interests. These actions allow you to hook into space lifecycle events and member management.

**Total Actions:** 10

---

## Space Lifecycle

### fluent_community/space/created

Fires immediately after a new space is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | The newly created space |

**Space Object Properties:**
- `id` (int) - Space ID
- `parent_id` (int|null) - Parent space ID if sub-space
- `title` (string) - Space title
- `slug` (string) - URL slug
- `description` (string) - Space description
- `privacy` (string) - 'public', 'private', 'secret'
- `type` (string) - Space type
- `status` (string) - 'active', 'archived'
- `settings` (array) - Space settings
- `created_by` (int) - Creator user ID
- `created_at` (string) - Creation timestamp

**Example Usage:**

```php
// Send welcome email to space creator
add_action('fluent_community/space/created', function($space) {
    $creator = get_user_by('id', $space->created_by);
    
    wp_mail(
        $creator->user_email,
        'Space Created Successfully',
        sprintf(
            'Your space "%s" has been created successfully. View it here: %s',
            $space->title,
            get_space_url($space)
        )
    );
}, 10, 1);

// Auto-join creator to the space
add_action('fluent_community/space/created', function($space) {
    // Add creator as admin
    add_space_member($space->id, $space->created_by, 'admin');
}, 10, 1);

// Log space creation
add_action('fluent_community/space/created', function($space) {
    error_log(sprintf(
        'New space created: ID=%d, Title=%s, Privacy=%s',
        $space->id,
        $space->title,
        $space->privacy
    ));
}, 10, 1);

// Sync to external system
add_action('fluent_community/space/created', function($space) {
    wp_remote_post('https://api.example.com/spaces', [
        'body' => json_encode([
            'space_id' => $space->id,
            'title' => $space->title,
            'privacy' => $space->privacy,
            'creator_id' => $space->created_by
        ])
    ]);
}, 10, 1);
```

**Common Use Cases:**
- Send notifications to admins
- Auto-join creator as admin
- Create default space content
- Sync with external systems
- Log space creation
- Initialize space settings

---

### fluent_community/space/updated

Fires after a space is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | The updated space |
| `$oldSpace` | Space Object | Space before update |

**Example Usage:**

```php
// Notify members of important changes
add_action('fluent_community/space/updated', function($space, $oldSpace) {
    // Check if privacy changed
    if ($space->privacy !== $oldSpace->privacy) {
        $members = get_space_members($space->id);
        
        foreach ($members as $member) {
            notify_user($member->user_id, [
                'type' => 'space_privacy_changed',
                'space_id' => $space->id,
                'old_privacy' => $oldSpace->privacy,
                'new_privacy' => $space->privacy
            ]);
        }
    }
}, 10, 2);

// Log significant changes
add_action('fluent_community/space/updated', function($space, $oldSpace) {
    $changes = [];
    
    if ($space->title !== $oldSpace->title) {
        $changes[] = sprintf('Title: %s → %s', $oldSpace->title, $space->title);
    }
    
    if ($space->privacy !== $oldSpace->privacy) {
        $changes[] = sprintf('Privacy: %s → %s', $oldSpace->privacy, $space->privacy);
    }
    
    if (!empty($changes)) {
        error_log(sprintf(
            'Space %d updated: %s',
            $space->id,
            implode(', ', $changes)
        ));
    }
}, 10, 2);
```

---

### fluent_community/space/before_delete

Fires before a space is deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | Space about to be deleted |

**Example Usage:**

```php
// Backup space data
add_action('fluent_community/space/before_delete', function($space) {
    global $wpdb;
    
    $wpdb->insert($wpdb->prefix . 'deleted_spaces_backup', [
        'space_id' => $space->id,
        'data' => json_encode($space->toArray()),
        'deleted_at' => current_time('mysql'),
        'deleted_by' => get_current_user_id()
    ]);
}, 10, 1);

// Notify all members
add_action('fluent_community/space/before_delete', function($space) {
    $members = get_space_members($space->id);
    
    foreach ($members as $member) {
        wp_mail(
            get_user_by('id', $member->user_id)->user_email,
            'Space Deleted',
            sprintf('The space "%s" has been deleted.', $space->title)
        );
    }
}, 10, 1);
```

---

### fluent_community/space/deleted

Fires after a space has been deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | The deleted space |

**Example Usage:**

```php
// Clean up related data
add_action('fluent_community/space/deleted', function($space) {
    // Delete space metadata
    delete_metadata('space', $space->id, '', '', true);
    
    // Clean up external references
    wp_remote_post('https://api.example.com/spaces/' . $space->id . '/delete', [
        'method' => 'DELETE'
    ]);
}, 10, 1);
```

---

## Member Management

### fluent_community/space/joined

Fires when a user joins a space.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | The space being joined |
| `$userId` | int | User ID of the member |
| `$source` | string | Join source: 'request', 'invitation', 'auto' |

**Example Usage:**

```php
// Send welcome message
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    $user = get_user_by('id', $userId);
    
    wp_mail(
        $user->user_email,
        'Welcome to ' . $space->title,
        sprintf(
            'Hi %s,\n\nWelcome to %s! We\'re excited to have you here.',
            $user->display_name,
            $space->title
        )
    );
}, 10, 3);

// Award points for joining
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    $points = get_user_meta($userId, 'community_points', true) ?: 0;
    update_user_meta($userId, 'community_points', $points + 15);
}, 10, 3);

// Notify space admins
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    $admins = get_space_admins($space->id);
    $user = get_user_by('id', $userId);
    
    foreach ($admins as $admin) {
        notify_user($admin->user_id, [
            'type' => 'new_space_member',
            'space_id' => $space->id,
            'user_id' => $userId,
            'message' => sprintf('%s joined %s', $user->display_name, $space->title)
        ]);
    }
}, 10, 3);

// Track join source
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    update_user_meta($userId, 'space_' . $space->id . '_join_source', $source);
    update_user_meta($userId, 'space_' . $space->id . '_joined_at', current_time('mysql'));
}, 10, 3);
```

**Common Use Cases:**
- Send welcome emails
- Award gamification points
- Notify space admins
- Track join sources
- Auto-assign roles
- Initialize member settings

---

### fluent_community/space/join_requested

Fires when a user requests to join a private space.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | The space |
| `$userId` | int | User requesting to join |

**Example Usage:**

```php
// Notify space admins of join request
add_action('fluent_community/space/join_requested', function($space, $userId) {
    $admins = get_space_admins($space->id);
    $user = get_user_by('id', $userId);
    
    foreach ($admins as $admin) {
        wp_mail(
            get_user_by('id', $admin->user_id)->user_email,
            'New Join Request',
            sprintf(
                '%s has requested to join %s. Review the request here: %s',
                $user->display_name,
                $space->title,
                admin_url('admin.php?page=space-requests&space=' . $space->id)
            )
        );
    }
}, 10, 2);
```

---

### fluent_community/space/user_left

Fires when a user leaves a space.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | The space |
| `$userId` | int | User who left |

**Example Usage:**

```php
// Log member departure
add_action('fluent_community/space/user_left', function($space, $userId) {
    error_log(sprintf(
        'User %d left space %d (%s)',
        $userId,
        $space->id,
        $space->title
    ));
}, 10, 2);

// Update statistics
add_action('fluent_community/space/user_left', function($space, $userId) {
    $join_count = get_user_meta($userId, 'spaces_joined_count', true) ?: 0;
    update_user_meta($userId, 'spaces_joined_count', max(0, $join_count - 1));
}, 10, 2);
```

---

### fluent_community/space/member/role_updated

Fires when a space member's role is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | The space |
| `$userId` | int | Member user ID |
| `$newRole` | string | New role: 'admin', 'moderator', 'member' |
| `$oldRole` | string | Previous role |

**Example Usage:**

```php
// Notify user of role change
add_action('fluent_community/space/member/role_updated', function($space, $userId, $newRole, $oldRole) {
    $user = get_user_by('id', $userId);
    
    wp_mail(
        $user->user_email,
        'Your role has been updated',
        sprintf(
            'Your role in %s has been changed from %s to %s.',
            $space->title,
            $oldRole,
            $newRole
        )
    );
}, 10, 4);

// Log role changes
add_action('fluent_community/space/member/role_updated', function($space, $userId, $newRole, $oldRole) {
    error_log(sprintf(
        'Space %d: User %d role changed from %s to %s',
        $space->id,
        $userId,
        $oldRole,
        $newRole
    ));
}, 10, 4);
```

---

## Dynamic Actions

### fluent_community/space/update_meta_settings_{provider}

Fires when space meta settings are updated for a specific provider.

**Dynamic Values:**
- `update_meta_settings_zoom` - Zoom integration settings
- `update_meta_settings_discord` - Discord integration settings
- `update_meta_settings_slack` - Slack integration settings

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$space` | Space Object | The space |
| `$settings` | array | Provider-specific settings |

**Example Usage:**

```php
// Handle Zoom integration
add_action('fluent_community/space/update_meta_settings_zoom', function($space, $settings) {
    // Validate Zoom credentials
    if (!empty($settings['api_key'])) {
        $valid = validate_zoom_credentials($settings['api_key']);
        
        if (!$valid) {
            wp_send_json_error(['message' => 'Invalid Zoom credentials'], 400);
        }
    }
}, 10, 2);

// Handle Discord webhook
add_action('fluent_community/space/update_meta_settings_discord', function($space, $settings) {
    if (!empty($settings['webhook_url'])) {
        // Test webhook
        wp_remote_post($settings['webhook_url'], [
            'body' => json_encode([
                'content' => sprintf('Discord integration enabled for %s', $space->title)
            ])
        ]);
    }
}, 10, 2);
```

---

## Media Management

### fluent_community/remove_medias_by_url

Fires when media is removed by URL (typically space-related media).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$urls` | array | Array of media URLs to remove |
| `$context` | string | Context: 'space', 'profile', etc. |

**Example Usage:**

```php
add_action('fluent_community/remove_medias_by_url', function($urls, $context) {
    foreach ($urls as $url) {
        // Clean up CDN cache
        purge_cdn_cache($url);
        
        // Log removal
        error_log(sprintf('Media removed: %s (context: %s)', $url, $context));
    }
}, 10, 2);
```

---

## Best Practices

### 1. Check Space Privacy

```php
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    // Handle differently based on privacy
    if ($space->privacy === 'private') {
        // Send special welcome for private spaces
        send_private_space_welcome($userId, $space);
    }
}, 10, 3);
```

### 2. Handle Join Sources

```php
add_action('fluent_community/space/joined', function($space, $userId, $source) {
    switch ($source) {
        case 'invitation':
            // User was invited
            award_points($userId, 20);
            break;
        case 'request':
            // User requested to join
            award_points($userId, 15);
            break;
        case 'auto':
            // Auto-joined (e.g., by admin)
            award_points($userId, 10);
            break;
    }
}, 10, 3);
```

### 3. Validate Before Deletion

```php
add_action('fluent_community/space/before_delete', function($space) {
    // Prevent deletion of spaces with active courses
    $active_courses = count_space_courses($space->id);
    
    if ($active_courses > 0) {
        wp_send_json_error([
            'message' => 'Cannot delete space with active courses'
        ], 400);
    }
}, 10, 1);
```

---

## See Also

- [Space Filters](/hooks/filters/spaces) - Modify space data
- [Feed Actions](/hooks/actions/feeds) - Feed-related actions
- [User Actions](/hooks/actions/users) - User management
- [Examples](/hooks/examples) - Real-world examples

