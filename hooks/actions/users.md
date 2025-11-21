---
prev:
  text: 'Spaces'
  link: '/hooks/actions/spaces'
next:
  text: 'Authentication'
  link: '/hooks/actions/authentication'
---

<DocStatusBanner />

# Users & Members Actions

## Profile Management

### fluent_community/profile_deactivated

Fires when a user profile is deactivated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | WordPress user object |
| `$profile` | XProfile Object | Community profile object |

**Example Usage:**

```php
// Log profile deactivation
add_action('fluent_community/profile_deactivated', function($user, $profile) {
    error_log(sprintf(
        'Profile deactivated: User ID=%d, Email=%s',
        $user->ID,
        $user->user_email
    ));
}, 10, 2);

// Send confirmation email
add_action('fluent_community/profile_deactivated', function($user, $profile) {
    wp_mail(
        $user->user_email,
        'Profile Deactivated',
        'Your community profile has been deactivated. You can reactivate it anytime by logging in.'
    );
}, 10, 2);

// Clean up user sessions
add_action('fluent_community/profile_deactivated', function($user, $profile) {
    // Clear user cache
    wp_cache_delete('user_permissions_' . $user->ID);
    wp_cache_delete('user_spaces_' . $user->ID);
    
    // Remove from active lists
    delete_transient('active_users_list');
}, 10, 2);
```

---

### fluent_community/reactivate_account

Fires when a user account is reactivated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$user` | WP_User | WordPress user object |
| `$profile` | XProfile Object | Community profile object |

**Example Usage:**

```php
// Welcome back message
add_action('fluent_community/reactivate_account', function($user, $profile) {
    wp_mail(
        $user->user_email,
        'Welcome Back!',
        sprintf(
            'Hi %s,\n\nYour account has been reactivated. Welcome back to the community!',
            $profile->display_name
        )
    );
}, 10, 2);

// Log reactivation
add_action('fluent_community/reactivate_account', function($user, $profile) {
    update_user_meta($user->ID, 'last_reactivation', current_time('mysql'));
    
    $reactivation_count = get_user_meta($user->ID, 'reactivation_count', true) ?: 0;
    update_user_meta($user->ID, 'reactivation_count', $reactivation_count + 1);
}, 10, 2);
```

---

### fluent_community/profile_feed/created

Fires when a feed is created on a user's profile.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | Feed object |

**Example Usage:**

```php
// Notify profile owner
add_action('fluent_community/profile_feed/created', function($feed) {
    if ($feed->user_id != $feed->profile_user_id) {
        // Someone posted on another user's profile
        $owner = get_user_by('id', $feed->profile_user_id);
        $poster = get_user_by('id', $feed->user_id);
        
        wp_mail(
            $owner->user_email,
            'New Post on Your Profile',
            sprintf('%s posted on your profile', $poster->display_name)
        );
    }
}, 10, 1);
```

---

## Points & Gamification

### fluent_community/user_points_updated

Fires when a user's points are updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userId` | int | User ID |
| `$newPoints` | int | New points total |
| `$oldPoints` | int | Previous points total |
| `$reason` | string | Reason for point change |

**Example Usage:**

```php
// Track point changes
add_action('fluent_community/user_points_updated', function($userId, $newPoints, $oldPoints, $reason) {
    $change = $newPoints - $oldPoints;
    
    error_log(sprintf(
        'User %d points changed: %+d (Reason: %s)',
        $userId,
        $change,
        $reason
    ));
    
    // Store in history
    $history = get_user_meta($userId, 'points_history', true) ?: [];
    $history[] = [
        'change' => $change,
        'new_total' => $newPoints,
        'reason' => $reason,
        'timestamp' => current_time('mysql')
    ];
    update_user_meta($userId, 'points_history', $history);
}, 10, 4);

// Award badges based on points
add_action('fluent_community/user_points_updated', function($userId, $newPoints, $oldPoints, $reason) {
    $badges = [
        1000 => 'bronze',
        5000 => 'silver',
        10000 => 'gold',
        50000 => 'platinum'
    ];
    
    foreach ($badges as $threshold => $badge) {
        if ($newPoints >= $threshold && $oldPoints < $threshold) {
            update_user_meta($userId, 'badge_' . $badge, true);
            
            // Notify user
            $user = get_user_by('id', $userId);
            wp_mail(
                $user->user_email,
                'New Badge Earned!',
                sprintf('Congratulations! You\'ve earned the %s badge!', ucfirst($badge))
            );
        }
    }
}, 10, 4);

// Notify on milestone
add_action('fluent_community/user_points_updated', function($userId, $newPoints, $oldPoints, $reason) {
    $milestones = [100, 500, 1000, 5000, 10000];
    
    foreach ($milestones as $milestone) {
        if ($newPoints >= $milestone && $oldPoints < $milestone) {
            $user = get_user_by('id', $userId);
            wp_mail(
                $user->user_email,
                'Milestone Reached!',
                sprintf('You\'ve reached %d points!', $milestone)
            );
        }
    }
}, 10, 4);
```

---

### fluent_community/user_level_upgraded

Fires when a user's level is upgraded.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userId` | int | User ID |
| `$newLevel` | int | New level |
| `$oldLevel` | int | Previous level |

**Example Usage:**

```php
// Congratulate user on level up
add_action('fluent_community/user_level_upgraded', function($userId, $newLevel, $oldLevel) {
    $user = get_user_by('id', $userId);
    
    wp_mail(
        $user->user_email,
        'Level Up!',
        sprintf(
            'Congratulations! You\'ve reached level %d!',
            $newLevel
        )
    );
}, 10, 3);

// Unlock features based on level
add_action('fluent_community/user_level_upgraded', function($userId, $newLevel, $oldLevel) {
    $level_perks = [
        5 => ['can_create_spaces' => true],
        10 => ['can_upload_videos' => true],
        20 => ['can_moderate' => true]
    ];
    
    if (isset($level_perks[$newLevel])) {
        foreach ($level_perks[$newLevel] as $perk => $value) {
            update_user_meta($userId, $perk, $value);
        }
    }
}, 10, 3);

// Award bonus points
add_action('fluent_community/user_level_upgraded', function($userId, $newLevel, $oldLevel) {
    $bonus = $newLevel * 100; // 100 points per level
    
    $current_points = get_user_meta($userId, 'community_points', true) ?: 0;
    update_user_meta($userId, 'community_points', $current_points + $bonus);
}, 10, 3);
```

---

## User Blocking (PRO)

### fluent_community/blocked_user

Fires when a user blocks another user.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$blockedUserId` | int | ID of user being blocked |
| `$blockerUserId` | int | ID of user who blocked |

**Example Usage:**

```php
// Log blocking action
add_action('fluent_community/blocked_user', function($blockedUserId, $blockerUserId) {
    error_log(sprintf(
        'User %d blocked user %d',
        $blockerUserId,
        $blockedUserId
    ));
    
    // Track blocking stats
    $blocked_count = get_user_meta($blockerUserId, 'users_blocked_count', true) ?: 0;
    update_user_meta($blockerUserId, 'users_blocked_count', $blocked_count + 1);
}, 10, 2);

// Remove from followers
add_action('fluent_community/blocked_user', function($blockedUserId, $blockerUserId) {
    // Unfollow each other
    do_action('fluent_community/unfollow_user', $blockerUserId, $blockedUserId);
    do_action('fluent_community/unfollow_user', $blockedUserId, $blockerUserId);
}, 10, 2);
```

---

### fluent_community/before_unblocking_user

Fires before a user is unblocked.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$blockedUserId` | int | ID of user being unblocked |
| `$blockerUserId` | int | ID of user who is unblocking |

**Example Usage:**

```php
// Validate unblock action
add_action('fluent_community/before_unblocking_user', function($blockedUserId, $blockerUserId) {
    // Check if unblock is allowed
    $block_time = get_user_meta($blockerUserId, 'blocked_' . $blockedUserId . '_at', true);
    
    if ($block_time && (time() - strtotime($block_time)) < DAY_IN_SECONDS) {
        wp_send_json_error([
            'message' => 'You must wait 24 hours before unblocking this user.'
        ], 403);
    }
}, 10, 2);

// Log unblock action
add_action('fluent_community/before_unblocking_user', function($blockedUserId, $blockerUserId) {
    error_log(sprintf(
        'User %d is unblocking user %d',
        $blockerUserId,
        $blockedUserId
    ));
}, 10, 2);
```

---

## User Following (PRO)

### fluent_community/followed_user

Fires when a user follows another user.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$followedUserId` | int | ID of user being followed |
| `$followerUserId` | int | ID of user who followed |

**Example Usage:**

```php
// Notify followed user
add_action('fluent_community/followed_user', function($followedUserId, $followerUserId) {
    $followed = get_user_by('id', $followedUserId);
    $follower = get_user_by('id', $followerUserId);
    
    wp_mail(
        $followed->user_email,
        'New Follower',
        sprintf('%s is now following you!', $follower->display_name)
    );
}, 10, 2);

// Track follower count
add_action('fluent_community/followed_user', function($followedUserId, $followerUserId) {
    $count = get_user_meta($followedUserId, 'follower_count', true) ?: 0;
    update_user_meta($followedUserId, 'follower_count', $count + 1);
}, 10, 2);

// Award points for getting followers
add_action('fluent_community/followed_user', function($followedUserId, $followerUserId) {
    $points = get_user_meta($followedUserId, 'community_points', true) ?: 0;
    update_user_meta($followedUserId, 'community_points', $points + 10);
}, 10, 2);
```

---

### fluent_community/before_unfollowing_user

Fires before a user unfollows another user.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$followedUserId` | int | ID of user being unfollowed |
| `$followerUserId` | int | ID of user who is unfollowing |

**Example Usage:**

```php
// Log unfollow action
add_action('fluent_community/before_unfollowing_user', function($followedUserId, $followerUserId) {
    error_log(sprintf(
        'User %d is unfollowing user %d',
        $followerUserId,
        $followedUserId
    ));
}, 10, 2);

// Update follower count
add_action('fluent_community/before_unfollowing_user', function($followedUserId, $followerUserId) {
    $count = get_user_meta($followedUserId, 'follower_count', true) ?: 0;
    update_user_meta($followedUserId, 'follower_count', max(0, $count - 1));
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
    
    // Send admin notification
    wp_mail(
        get_option('admin_email'),
        'BuddyPress Sync Complete',
        sprintf('%d users have been synced from BuddyPress', $syncedCount)
    );
}, 10, 1);
```

---

### fluent_community/update_profile_link_providers

Fires when updating profile link providers.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$providers` | array | Array of link providers |

**Example Usage:**

```php
add_action('fluent_community/update_profile_link_providers', function($providers) {
    error_log('Profile link providers updated: ' . implode(', ', array_keys($providers)));
}, 10, 1);
```

---

## Best Practices

### 1. Check User Exists

```php
add_action('fluent_community/profile_deactivated', function($user, $profile) {
    if (!$user || !$profile) {
        return;
    }
    
    // Safe to proceed
}, 10, 2);
```

### 2. Handle Async Operations

```php
add_action('fluent_community/user_points_updated', function($userId, $newPoints, $oldPoints, $reason) {
    // Use WordPress cron for heavy operations
    wp_schedule_single_event(time() + 60, 'process_point_change', [$userId, $newPoints]);
}, 10, 4);
```

### 3. Validate Point Changes

```php
add_action('fluent_community/user_points_updated', function($userId, $newPoints, $oldPoints, $reason) {
    // Prevent negative points
    if ($newPoints < 0) {
        update_user_meta($userId, 'community_points', 0);
    }
}, 10, 4);
```

---

## Notes

**For user registration events**, use WordPress core hooks:
- `user_register` - Fires after user registration
- `profile_update` - Fires after profile update

**Example:**

```php
// Track community user registration
add_action('user_register', function($user_id) {
    // Check if registering for community
    if (isset($_POST['fluent_community_registration'])) {
        update_user_meta($user_id, 'registered_via_community', true);
        update_user_meta($user_id, 'community_registration_date', current_time('mysql'));
    }
}, 10, 1);
```

---

## Query Modification Hooks

### fluent_community/members_query_ref

Fires when building the members query, allowing modification by reference.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$query` | Query Object (by reference) | The query builder instance |
| `$filters` | array | Applied filters |

**Example Usage:**

```php
add_action('fluent_community/members_query_ref', function(&$query, $filters) {
    // Modify members query
    if (isset($filters['premium_only'])) {
        $query->whereHas('meta', function($q) {
            $q->where('meta_key', 'is_premium')->where('meta_value', '1');
        });
    }
}, 10, 2);
```

---

## See Also

- [User Filters](/hooks/filters/users) - Modify user data
- [Authentication Actions](/hooks/actions/authentication) - Login/registration
- [Space Actions](/hooks/actions/spaces) - Space membership
- [Examples](/hooks/examples) - Real-world examples

