---
prev:
  text: 'Media Filters'
  link: '/hooks/filters/media'
next:
  text: 'Settings Filters'
  link: '/hooks/filters/settings'
---

# Permissions Filters

## Core Permission Filters

### fluent_community/user/permissions ​

Filters global user permissions for community actions.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$permissions` | array | Array of permission flags |
| `$roles` | array | User roles array |
| `$user` | User | User object |

**Return:** `array` - Modified permissions array

**Example Usage:**

```php
// Grant additional permissions to specific roles
add_filter('fluent_community/user/permissions', function($permissions, $roles, $user) {
    // Premium members get extra permissions
    if (in_array('premium_member', $roles)) {
        $permissions['can_create_polls'] = true;
        $permissions['can_pin_posts'] = true;
        $permissions['can_upload_videos'] = true;
        $permissions['can_create_events'] = true;
    }
    
    // Moderators get moderation permissions
    if (in_array('moderator', $roles)) {
        $permissions['can_moderate_posts'] = true;
        $permissions['can_delete_comments'] = true;
        $permissions['can_ban_users'] = true;
    }
    
    return $permissions;
}, 10, 3);

// Restrict permissions for new users
add_filter('fluent_community/user/permissions', function($permissions, $roles, $user) {
    $registered = strtotime($user->user_registered);
    $days_since = (time() - $registered) / DAY_IN_SECONDS;
    
    // Users registered less than 7 days ago have limited permissions
    if ($days_since < 7) {
        $permissions['can_create_space'] = false;
        $permissions['can_upload_video'] = false;
        $permissions['can_send_direct_message'] = false;
        $permissions['max_posts_per_day'] = 5;
    }
    
    return $permissions;
}, 10, 3);

// Reputation-based permissions
add_filter('fluent_community/user/permissions', function($permissions, $roles, $user) {
    $reputation = get_user_meta($user->ID, 'reputation_score', true);
    
    if ($reputation >= 1000) {
        $permissions['can_edit_others_posts'] = true;
        $permissions['can_close_threads'] = true;
    }
    
    if ($reputation >= 500) {
        $permissions['can_create_polls'] = true;
    }
    
    return $permissions;
}, 10, 3);

// Time-based permissions
add_filter('fluent_community/user/permissions', function($permissions, $roles, $user) {
    $hour = (int) current_time('H');
    
    // Restrict posting during maintenance hours (2 AM - 4 AM)
    if ($hour >= 2 && $hour < 4) {
        if (!in_array('administrator', $roles)) {
            $permissions['can_create_post'] = false;
            $permissions['can_create_comment'] = false;
        }
    }
    
    return $permissions;
}, 10, 3);
```

**Common Use Cases:**
- Role-based permissions
- Time-based restrictions
- Reputation systems
- New user limitations
- Premium features
- Custom capability checks

**Related Filters:**
- `fluent_community/user/space/permissions`

---

### fluent_community/user/space/permissions ​

Filters user permissions within a specific space.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$permissions` | array | Array of space-specific permissions |
| `$space` | Space | Space object |
| `$role` | string | User's role in the space |
| `$user` | User | User object |

**Return:** `array` - Modified permissions array

**Example Usage:**

```php
// Space-specific permissions
add_filter('fluent_community/user/space/permissions', function($permissions, $space, $role, $user) {
    // Space admins get full permissions
    if ($role === 'admin') {
        $permissions['can_manage_members'] = true;
        $permissions['can_edit_space'] = true;
        $permissions['can_delete_posts'] = true;
        $permissions['can_pin_posts'] = true;
    }
    
    // Moderators get limited permissions
    if ($role === 'moderator') {
        $permissions['can_delete_posts'] = true;
        $permissions['can_pin_posts'] = true;
        $permissions['can_moderate_comments'] = true;
    }
    
    // Regular members
    if ($role === 'member') {
        $permissions['can_create_post'] = true;
        $permissions['can_comment'] = true;
        $permissions['can_react'] = true;
    }
    
    return $permissions;
}, 10, 4);

// Private space restrictions
add_filter('fluent_community/user/space/permissions', function($permissions, $space, $role, $user) {
    // In private spaces, only members can view content
    if ($space->privacy === 'private' && $role === 'guest') {
        $permissions['can_view_posts'] = false;
        $permissions['can_view_members'] = false;
    }
    
    return $permissions;
}, 10, 4);

// Custom space types
add_filter('fluent_community/user/space/permissions', function($permissions, $space, $role, $user) {
    $space_type = $space->meta['space_type'] ?? 'general';
    
    // Read-only announcement spaces
    if ($space_type === 'announcements') {
        $permissions['can_create_post'] = in_array($role, ['admin', 'moderator']);
        $permissions['can_comment'] = true; // Everyone can comment
    }
    
    // Q&A spaces
    if ($space_type === 'qa') {
        $permissions['can_mark_answer'] = ($role === 'admin' || $user->ID === $space->user_id);
    }
    
    return $permissions;
}, 10, 4);
```

**Common Use Cases:**
- Role-based space permissions
- Private space access
- Custom space types
- Moderation permissions
- Content management

**Related Filters:**
- `fluent_community/user/permissions`
- `fluent_community/space/join_status_for_private`

---

## Content Visibility Filters

### fluent_community/can_view_comments_{type} ​

Filters whether comments can be viewed for a specific content type (dynamic filter).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$canView` | bool | Whether comments can be viewed |
| `$feed` | Feed | Feed/post object |

**Return:** `bool` - Modified visibility permission

**Example Usage:**

```php
// Hide comments on announcements
add_filter('fluent_community/can_view_comments_announcement', function($canView, $feed) {
    return false; // No comments on announcements
}, 10, 2);

// Require login to view comments
add_filter('fluent_community/can_view_comments_feed', function($canView, $feed) {
    return is_user_logged_in();
}, 10, 2);

// Author can always see comments
add_filter('fluent_community/can_view_comments_article', function($canView, $feed) {
    $current_user = wp_get_current_user();
    
    if ($current_user->ID === $feed->user_id) {
        return true; // Author can always see
    }
    
    return $canView;
}, 10, 2);

// Hide comments on locked posts
add_filter('fluent_community/can_view_comments_feed', function($canView, $feed) {
    if (!empty($feed->meta['locked'])) {
        return false;
    }
    
    return $canView;
}, 10, 2);
```

**Common Use Cases:**
- Content type restrictions
- Authentication requirements
- Author privileges
- Locked/archived content

---

### fluent_community/can_view_members_page ​

Filters whether the current user can view the members directory.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$canView` | bool | Whether user can view members page |
| `$pageStatus` | string | Page status/context |

**Return:** `bool` - Modified permission

**Example Usage:**

```php
// Require login
add_filter('fluent_community/can_view_members_page', function($canView, $pageStatus) {
    return is_user_logged_in();
}, 10, 2);

// Role-based access
add_filter('fluent_community/can_view_members_page', function($canView, $pageStatus) {
    $user = wp_get_current_user();
    $allowed_roles = ['subscriber', 'administrator', 'editor'];
    
    return !empty(array_intersect($allowed_roles, $user->roles));
}, 10, 2);

// Premium feature
add_filter('fluent_community/can_view_members_page', function($canView, $pageStatus) {
    $user = wp_get_current_user();
    return in_array('premium_member', $user->roles);
}, 10, 2);
```

**Common Use Cases:**
- Authentication requirements
- Role-based access
- Premium features
- Privacy controls

---

### fluent_community/can_view_leaderboard_members ​

Filters whether the current user can view the leaderboard.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$canView` | bool | Whether user can view leaderboard |
| `$pageStatus` | string | Page status/context |

**Return:** `bool` - Modified permission

**Example Usage:**

```php
// Public leaderboard
add_filter('fluent_community/can_view_leaderboard_members', function($canView, $pageStatus) {
    return true; // Everyone can view
}, 10, 2);

// Members only
add_filter('fluent_community/can_view_leaderboard_members', function($canView, $pageStatus) {
    return is_user_logged_in();
}, 10, 2);

// Hide during specific times
add_filter('fluent_community/can_view_leaderboard_members', function($canView, $pageStatus) {
    $hour = (int) current_time('H');
    
    // Hide leaderboard during maintenance (2 AM - 4 AM)
    if ($hour >= 2 && $hour < 4) {
        return false;
    }
    
    return $canView;
}, 10, 2);
```

**Common Use Cases:**
- Public vs private leaderboards
- Authentication requirements
- Gamification features
- Scheduled visibility

---

### fluent_community/can_access_portal ​

Filters whether the current user can access the community portal.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$canAccess` | bool | Whether user can access portal |

**Return:** `bool` - Modified access permission

**Example Usage:**

```php
// Require specific role
add_filter('fluent_community/can_access_portal', function($canAccess) {
    $user = wp_get_current_user();
    $allowed_roles = ['subscriber', 'administrator', 'editor'];
    
    return !empty(array_intersect($allowed_roles, $user->roles));
});

// Require email verification
add_filter('fluent_community/can_access_portal', function($canAccess) {
    if (!is_user_logged_in()) {
        return false;
    }
    
    $user = wp_get_current_user();
    return get_user_meta($user->ID, 'email_verified', true) === '1';
});

// IP whitelist
add_filter('fluent_community/can_access_portal', function($canAccess) {
    $allowed_ips = ['192.168.1.1', '10.0.0.1'];
    $user_ip = $_SERVER['REMOTE_ADDR'];
    
    if (!in_array($user_ip, $allowed_ips)) {
        return false;
    }
    
    return $canAccess;
});

// Maintenance mode
add_filter('fluent_community/can_access_portal', function($canAccess) {
    $maintenance_mode = get_option('community_maintenance_mode');
    
    if ($maintenance_mode && !current_user_can('manage_options')) {
        return false;
    }
    
    return $canAccess;
});
```

**Common Use Cases:**
- Role-based access
- Email verification
- IP restrictions
- Maintenance mode
- Custom access rules

---

### fluent_community/course/can_view_lesson ​

Filters whether a user can view a specific course lesson (Pro feature).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$canView` | bool | Whether user can view lesson |
| `$lesson` | Lesson | Lesson object |
| `$course` | Course | Course object |
| `$user` | User | User object |

**Return:** `bool` - Modified permission

**Example Usage:**

```php
// Require course enrollment
add_filter('fluent_community/course/can_view_lesson', function($canView, $lesson, $course, $user) {
    return is_user_enrolled_in_course($user->ID, $course->id);
}, 10, 4);

// Sequential lesson access
add_filter('fluent_community/course/can_view_lesson', function($canView, $lesson, $course, $user) {
    $lesson_order = $lesson->meta['order'] ?? 0;
    
    // Check if previous lessons are completed
    if ($lesson_order > 1) {
        $previous_completed = are_previous_lessons_completed($user->ID, $course->id, $lesson_order);
        return $previous_completed;
    }
    
    return $canView;
}, 10, 4);

// Premium lessons
add_filter('fluent_community/course/can_view_lesson', function($canView, $lesson, $course, $user) {
    $is_premium = $lesson->meta['is_premium'] ?? false;
    
    if ($is_premium) {
        return in_array('premium_member', $user->roles);
    }
    
    return $canView;
}, 10, 4);
```

**Common Use Cases:**
- Course enrollment checks
- Sequential access
- Premium content
- Progress tracking

---

## Best Practices

### 1. Always Check User Context

```php
add_filter('fluent_community/user/permissions', function($permissions, $roles, $user) {
    // Always verify user object exists
    if (!$user || !$user->ID) {
        return $permissions;
    }
    
    // Your permission logic here
    
    return $permissions;
}, 10, 3);
```

### 2. Use Proper Priority

```php
// Base permissions (run early)
add_filter('fluent_community/user/permissions', function($permissions, $roles, $user) {
    // Set base permissions
    return $permissions;
}, 5, 3);

// Override permissions (run later)
add_filter('fluent_community/user/permissions', function($permissions, $roles, $user) {
    // Override specific permissions
    return $permissions;
}, 20, 3);
```

### 3. Cache Permission Checks

```php
add_filter('fluent_community/user/permissions', function($permissions, $roles, $user) {
    $cache_key = 'user_permissions_' . $user->ID;
    $cached = wp_cache_get($cache_key);
    
    if ($cached !== false) {
        return $cached;
    }
    
    // Calculate permissions
    // ...
    
    wp_cache_set($cache_key, $permissions, '', 3600);
    
    return $permissions;
}, 10, 3);
```

---

### fluent_community/super_admin_capability ​

Filters the capability required for super admin access.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$capability` | string | Required capability |

**Return:** `string` - Modified capability

**Example Usage:**

```php
// Use custom capability
add_filter('fluent_community/super_admin_capability', function($capability) {
    return 'manage_community';
});

// Use WordPress default
add_filter('fluent_community/super_admin_capability', function($capability) {
    return 'manage_options';
});

// Network admin only (multisite)
add_filter('fluent_community/super_admin_capability', function($capability) {
    return 'manage_network';
});
```

**Common Use Cases:**
- Custom capabilities
- Role management
- Multisite configurations

---

## Related Documentation

- [Permission Actions](/hooks/actions/permissions)
- [User Filters](/hooks/filters/users)
- [Space Filters](/hooks/filters/spaces)
- [Code Snippets](/guides/code-snippets)

