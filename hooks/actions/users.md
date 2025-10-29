# Users & Members Actions

Actions related to user registration, profile management, roles, and member operations in Fluent Community.

## Overview

These actions allow you to hook into user lifecycle events, profile updates, and member management operations.

**Total Actions:** 12

---

## User Lifecycle

### fluent_community/user_registered

Fires immediately after a new user is registered in the community.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | WordPress user object |
| `$profile` | XProfile Object | Fluent Community profile object |

**XProfile Object Properties:**
- `id` (int) - Profile ID
- `user_id` (int) - WordPress user ID
- `display_name` (string) - Display name
- `username` (string) - Username
- `avatar` (string|null) - Avatar URL
- `cover_photo` (string|null) - Cover photo URL
- `bio` (string) - User bio
- `meta` (array) - Additional metadata
- `status` (string) - 'active', 'inactive', 'blocked'
- `created_at` (string) - Registration timestamp

**Example Usage:**

```php
// Send welcome email
add_action('fluent_community/user_registered', function($user, $profile) {
    wp_mail(
        $user->user_email,
        'Welcome to Our Community!',
        sprintf(
            'Hi %s,\n\nWelcome to our community! Your profile is ready at: %s',
            $profile->display_name,
            get_author_posts_url($user->ID)
        )
    );
}, 10, 2);

// Award welcome points
add_action('fluent_community/user_registered', function($user, $profile) {
    update_user_meta($user->ID, 'community_points', 100);
    update_user_meta($user->ID, 'welcome_bonus_awarded', true);
}, 10, 2);

// Auto-join default spaces
add_action('fluent_community/user_registered', function($user, $profile) {
    $default_spaces = [123, 456, 789]; // Space IDs
    
    foreach ($default_spaces as $space_id) {
        do_action('fluent_community/space/add_member', $space_id, $user->ID);
    }
}, 10, 2);

// Sync to CRM
add_action('fluent_community/user_registered', function($user, $profile) {
    wp_remote_post('https://crm.example.com/api/contacts', [
        'headers' => ['Authorization' => 'Bearer API_KEY'],
        'body' => json_encode([
            'email' => $user->user_email,
            'name' => $profile->display_name,
            'username' => $profile->username,
            'registered_at' => $profile->created_at,
            'source' => 'community'
        ])
    ]);
}, 10, 2);

// Create user directory
add_action('fluent_community/user_registered', function($user, $profile) {
    $upload_dir = wp_upload_dir();
    $user_dir = $upload_dir['basedir'] . '/community/users/' . $user->ID;
    
    if (!file_exists($user_dir)) {
        wp_mkdir_p($user_dir);
    }
}, 10, 2);
```

**Common Use Cases:**
- Send welcome emails
- Award welcome bonuses
- Auto-join default spaces
- Sync with external systems
- Initialize user settings
- Create user resources

---

### fluent_community/profile_updated

Fires after a user profile is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | WordPress user object |
| `$profile` | XProfile Object | Updated profile object |
| `$oldProfile` | XProfile Object | Profile before update |

**Example Usage:**

```php
// Log profile changes
add_action('fluent_community/profile_updated', function($user, $profile, $oldProfile) {
    $changes = [];
    
    if ($profile->display_name !== $oldProfile->display_name) {
        $changes[] = sprintf('Name: %s → %s', $oldProfile->display_name, $profile->display_name);
    }
    
    if ($profile->bio !== $oldProfile->bio) {
        $changes[] = 'Bio updated';
    }
    
    if (!empty($changes)) {
        error_log(sprintf(
            'User %d profile updated: %s',
            $user->ID,
            implode(', ', $changes)
        ));
    }
}, 10, 3);

// Sync profile to WordPress
add_action('fluent_community/profile_updated', function($user, $profile, $oldProfile) {
    // Update WordPress display name
    if ($profile->display_name !== $oldProfile->display_name) {
        wp_update_user([
            'ID' => $user->ID,
            'display_name' => $profile->display_name
        ]);
    }
}, 10, 3);

// Notify followers of profile update
add_action('fluent_community/profile_updated', function($user, $profile, $oldProfile) {
    // Check if avatar or cover changed
    if ($profile->avatar !== $oldProfile->avatar || $profile->cover_photo !== $oldProfile->cover_photo) {
        $followers = get_user_followers($user->ID);
        
        foreach ($followers as $follower_id) {
            do_action('fluent_community/send_notification', $follower_id, [
                'type' => 'profile_updated',
                'user_id' => $user->ID,
                'message' => sprintf('%s updated their profile', $profile->display_name)
            ]);
        }
    }
}, 10, 3);

// Update search index
add_action('fluent_community/profile_updated', function($user, $profile, $oldProfile) {
    // Reindex user in search
    do_action('fluent_community/reindex_user', $user->ID);
}, 10, 3);
```

---

### fluent_community/profile_deactivated

Fires when a user profile is deactivated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | WordPress user object |
| `$profile` | XProfile Object | Deactivated profile |

**Example Usage:**

```php
// Log deactivation
add_action('fluent_community/profile_deactivated', function($user, $profile) {
    error_log(sprintf(
        'User %d (%s) deactivated their profile',
        $user->ID,
        $profile->display_name
    ));
}, 10, 2);

// Remove from active spaces
add_action('fluent_community/profile_deactivated', function($user, $profile) {
    $user_spaces = get_user_spaces($user->ID);
    
    foreach ($user_spaces as $space) {
        do_action('fluent_community/space/remove_member', $space->id, $user->ID);
    }
}, 10, 2);

// Send confirmation email
add_action('fluent_community/profile_deactivated', function($user, $profile) {
    wp_mail(
        $user->user_email,
        'Profile Deactivated',
        'Your community profile has been deactivated. You can reactivate it anytime by logging in.'
    );
}, 10, 2);
```

---

### fluent_community/user_deleted

Fires when a user is deleted from the community.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userId` | int | Deleted user ID |
| `$profile` | XProfile Object | Deleted profile object |

**Example Usage:**

```php
// Clean up user data
add_action('fluent_community/user_deleted', function($userId, $profile) {
    // Delete user uploads
    $upload_dir = wp_upload_dir();
    $user_dir = $upload_dir['basedir'] . '/community/users/' . $userId;
    
    if (file_exists($user_dir)) {
        delete_directory_recursive($user_dir);
    }
    
    // Delete user metadata
    delete_user_meta($userId, 'community_points');
    delete_user_meta($userId, 'community_badges');
}, 10, 2);

// Notify external system
add_action('fluent_community/user_deleted', function($userId, $profile) {
    wp_remote_post('https://api.example.com/users/' . $userId . '/delete', [
        'method' => 'DELETE'
    ]);
}, 10, 2);
```

---

## User Blocking

### fluent_community/user_blocked

Fires when a user is blocked.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$blockedUserId` | int | ID of user being blocked |
| `$blockedByUserId` | int | ID of user who blocked |

**Example Usage:**

```php
add_action('fluent_community/user_blocked', function($blockedUserId, $blockedByUserId) {
    error_log(sprintf(
        'User %d blocked user %d',
        $blockedByUserId,
        $blockedUserId
    ));
}, 10, 2);
```

---

### fluent_community/blocked_user

Alternative hook for user blocking (fires after block is saved).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$blockedUserId` | int | Blocked user ID |
| `$blockerUserId` | int | Blocker user ID |

---

### fluent_community/before_unblocking_user

Fires before a user is unblocked.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$blockedUserId` | int | User to be unblocked |
| `$blockerUserId` | int | User who will unblock |

---

### fluent_community/user_unblocked

Fires after a user is unblocked.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$unblockedUserId` | int | Unblocked user ID |
| `$unblockerUserId` | int | User who unblocked |

---

## Role Management

### fluent_community/user_role_updated

Fires when a user's community role is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | User object |
| `$newRole` | string | New role |
| `$oldRole` | string | Previous role |

**Example Usage:**

```php
add_action('fluent_community/user_role_updated', function($user, $newRole, $oldRole) {
    // Notify user of role change
    wp_mail(
        $user->user_email,
        'Your Role Has Been Updated',
        sprintf(
            'Your community role has been changed from %s to %s.',
            $oldRole,
            $newRole
        )
    );
    
    // Log role change
    error_log(sprintf(
        'User %d role changed: %s → %s',
        $user->ID,
        $oldRole,
        $newRole
    ));
}, 10, 3);
```

---

## Extended Profile

### fluent_community/xprofile/updated

Fires when extended profile fields are updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userId` | int | User ID |
| `$fields` | array | Updated fields |

**Example Usage:**

```php
add_action('fluent_community/xprofile/updated', function($userId, $fields) {
    // Sync custom fields to WordPress
    foreach ($fields as $key => $value) {
        update_user_meta($userId, 'xprofile_' . $key, $value);
    }
}, 10, 2);
```

---

## Integration Hooks

### fluent_community/after_sync_bp_users

Fires after syncing users from BuddyPress.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$syncedCount` | int | Number of users synced |

**Example Usage:**

```php
add_action('fluent_community/after_sync_bp_users', function($syncedCount) {
    error_log(sprintf('Synced %d users from BuddyPress', $syncedCount));
}, 10, 1);
```

---

### fluent_community/members_query_ref

Fires during members query, allowing query modification.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$query` | Query Builder | Query builder instance (by reference) |
| `$args` | array | Query arguments |

**Example Usage:**

```php
add_action('fluent_community/members_query_ref', function(&$query, $args) {
    // Only show verified members
    $query->where('verified', 1);
}, 10, 2);
```

---

## Best Practices

### 1. Check User Exists

```php
add_action('fluent_community/profile_updated', function($user, $profile, $oldProfile) {
    if (!$user || !$profile) {
        return;
    }
    
    // Safe to proceed
}, 10, 3);
```

### 2. Handle Async Operations

```php
add_action('fluent_community/user_registered', function($user, $profile) {
    // Use WordPress cron for heavy operations
    wp_schedule_single_event(time() + 60, 'process_new_user', [$user->ID]);
}, 10, 2);
```

### 3. Validate Before Actions

```php
add_action('fluent_community/before_unblocking_user', function($blockedUserId, $blockerUserId) {
    // Check if unblock is allowed
    if (!can_user_unblock($blockerUserId, $blockedUserId)) {
        wp_send_json_error(['message' => 'Cannot unblock this user'], 403);
    }
}, 10, 2);
```

---

## See Also

- [User Filters](/hooks/filters/users) - Modify user data and permissions
- [Authentication Actions](/hooks/actions/authentication) - Login and registration
- [Space Actions](/hooks/actions/spaces) - Space membership
- [Examples](/hooks/examples) - Real-world examples

