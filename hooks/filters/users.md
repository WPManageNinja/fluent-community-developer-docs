---
prev:
  text: 'Authentication Filters'
  link: '/hooks/filters/authentication'
next:
  text: 'Media Filters'
  link: '/hooks/filters/media'
---

# Users & Profiles Filters ​

Filters for customizing user profiles, avatars, member lists, and user-related data in Fluent Community.

## Overview ​

User filters control profile display, avatar handling, member directory access, user permissions, and profile data management. These filters are essential for customizing the user experience.

**Total Filters:** 10

---

## Avatar & Display Filters

### fluent_community/default_avatar ​

Filters the default avatar URL when user has no custom avatar.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$avatarUrl` | string | Default avatar URL |
| `$userId` | int | User ID (optional) |

**Return:** `string` - Modified avatar URL

**Example Usage:**

```php
// Use custom default avatar
add_filter('fluent_community/default_avatar', function($avatarUrl, $userId) {
    return 'https://example.com/images/default-avatar.png';
}, 10, 2);

// Role-based default avatars
add_filter('fluent_community/default_avatar', function($avatarUrl, $userId) {
    $user = get_user_by('id', $userId);
    
    if (in_array('administrator', $user->roles)) {
        return 'https://example.com/images/admin-avatar.png';
    }
    
    if (in_array('premium_member', $user->roles)) {
        return 'https://example.com/images/premium-avatar.png';
    }
    
    return 'https://example.com/images/member-avatar.png';
}, 10, 2);

// Use Gravatar as fallback
add_filter('fluent_community/default_avatar', function($avatarUrl, $userId) {
    $user = get_user_by('id', $userId);
    
    if ($user && $user->user_email) {
        $hash = md5(strtolower(trim($user->user_email)));
        return "https://www.gravatar.com/avatar/{$hash}?d=mp&s=200";
    }
    
    return $avatarUrl;
}, 10, 2);

// Use UI Avatars service
add_filter('fluent_community/default_avatar', function($avatarUrl, $userId) {
    $user = get_user_by('id', $userId);
    
    if ($user) {
        $name = urlencode($user->display_name);
        return "https://ui-avatars.com/api/?name={$name}&size=200&background=random";
    }
    
    return $avatarUrl;
}, 10, 2);
```

**Common Use Cases:**
- Custom default avatars
- Role-based avatars
- Gravatar integration
- Generated avatars
- Brand consistency

---

## Profile Data Filters

### fluent_community/update_profile_data ​

Filters user profile data before it's saved.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$profileData` | array | Profile data to be saved |
| `$user` | User | User object being updated |

**Return:** `array` - Modified profile data

**Example Usage:**

```php
// Sanitize profile data
add_filter('fluent_community/update_profile_data', function($profileData, $user) {
    // Sanitize bio
    if (isset($profileData['bio'])) {
        $profileData['bio'] = wp_kses_post($profileData['bio']);
    }
    
    // Validate website URL
    if (isset($profileData['website'])) {
        $profileData['website'] = esc_url_raw($profileData['website']);
    }
    
    return $profileData;
}, 10, 2);

// Add custom validation
add_filter('fluent_community/update_profile_data', function($profileData, $user) {
    // Require minimum bio length
    if (isset($profileData['bio']) && strlen($profileData['bio']) < 50) {
        throw new \Exception('Bio must be at least 50 characters long');
    }
    
    return $profileData;
}, 10, 2);

// Auto-generate username from name
add_filter('fluent_community/update_profile_data', function($profileData, $user) {
    if (empty($profileData['username']) && !empty($profileData['display_name'])) {
        $username = sanitize_user($profileData['display_name'], true);
        $username = str_replace(' ', '_', strtolower($username));
        
        // Ensure unique username
        $base_username = $username;
        $counter = 1;
        while (username_exists($username)) {
            $username = $base_username . $counter;
            $counter++;
        }
        
        $profileData['username'] = $username;
    }
    
    return $profileData;
}, 10, 2);

// Track profile updates
add_filter('fluent_community/update_profile_data', function($profileData, $user) {
    $profileData['last_profile_update'] = current_time('mysql');
    $profileData['profile_update_count'] = (int) get_user_meta($user->ID, 'profile_update_count', true) + 1;
    
    return $profileData;
}, 10, 2);
```

**Common Use Cases:**
- Data validation
- Sanitization
- Auto-generate fields
- Track changes
- Custom business logic

---

### fluent_community/profile_view_data ​

Filters profile data when viewing a user profile.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$profileData` | array | Profile data to display |
| `$user` | User | User object being viewed |

**Return:** `array` - Modified profile data

**Example Usage:**

```php
// Add computed fields
add_filter('fluent_community/profile_view_data', function($profileData, $user) {
    // Add member since duration
    $registered = strtotime($user->user_registered);
    $days = floor((time() - $registered) / DAY_IN_SECONDS);
    $profileData['member_since_days'] = $days;
    
    // Add activity stats
    $profileData['total_posts'] = count_user_posts($user->ID);
    $profileData['total_comments'] = get_comments([
        'user_id' => $user->ID,
        'count'   => true
    ]);
    
    return $profileData;
}, 10, 2);

// Hide sensitive data from non-admins
add_filter('fluent_community/profile_view_data', function($profileData, $user) {
    $current_user = wp_get_current_user();
    
    // Only show email to admins or profile owner
    if ($current_user->ID !== $user->ID && !current_user_can('manage_options')) {
        unset($profileData['email']);
        unset($profileData['phone']);
    }
    
    return $profileData;
}, 10, 2);

// Add custom badges
add_filter('fluent_community/profile_view_data', function($profileData, $user) {
    $badges = [];
    
    // Add role badges
    if (in_array('administrator', $user->roles)) {
        $badges[] = 'admin';
    }
    
    // Add achievement badges
    $post_count = count_user_posts($user->ID);
    if ($post_count >= 100) {
        $badges[] = 'prolific_writer';
    }
    
    $profileData['badges'] = $badges;
    
    return $profileData;
}, 10, 2);
```

**Common Use Cases:**
- Add computed fields
- Privacy controls
- Add badges/achievements
- Custom profile sections
- Activity statistics

---

### fluent_community/max_profile_description_length ​

Filters the maximum character length for profile descriptions.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$maxLength` | int | Maximum length (default: 500) |

**Return:** `int` - Modified maximum length

**Example Usage:**

```php
// Increase limit for premium users
add_filter('fluent_community/max_profile_description_length', function($maxLength) {
    $user = wp_get_current_user();
    
    if (in_array('premium_member', $user->roles)) {
        return 2000; // 2000 chars for premium
    }
    
    return $maxLength; // 500 for regular users
});

// Set global limit
add_filter('fluent_community/max_profile_description_length', function($maxLength) {
    return 1000; // 1000 characters for everyone
});
```

**Common Use Cases:**
- Role-based limits
- Premium features
- Content policy enforcement

---

### fluent_community/xprofile/badge ​

Filters user profile badge data.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$badge` | array\|null | Badge data or null |
| `$user` | User | User object |

**Return:** `array|null` - Modified badge data

**Example Usage:**

```php
// Add custom badges
add_filter('fluent_community/xprofile/badge', function($badge, $user) {
    // Check for custom achievements
    $post_count = count_user_posts($user->ID);
    
    if ($post_count >= 100) {
        return [
            'name'  => 'Top Contributor',
            'icon'  => '🏆',
            'color' => '#FFD700'
        ];
    }
    
    if (in_array('premium_member', $user->roles)) {
        return [
            'name'  => 'Premium Member',
            'icon'  => '⭐',
            'color' => '#4CAF50'
        ];
    }
    
    return $badge;
}, 10, 2);
```

**Common Use Cases:**
- Achievement badges
- Role badges
- Custom recognition
- Gamification

---

## Member Directory Filters

### fluent_community/members_api_response ​

Filters the members list API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | API response data |
| `$members` | Collection | Collection of member objects |
| `$request` | array | Request parameters |

**Return:** `array` - Modified API response

**Example Usage:**

```php
// Add statistics to response
add_filter('fluent_community/members_api_response', function($response, $members, $request) {
    $response['stats'] = [
        'total_members'    => $members->count(),
        'active_today'     => count_active_members_today(),
        'new_this_week'    => count_new_members_this_week()
    ];
    
    return $response;
}, 10, 3);

// Add custom member data
add_filter('fluent_community/members_api_response', function($response, $members, $request) {
    foreach ($response['members'] as &$member) {
        // Add online status
        $member['is_online'] = is_user_online($member['id']);
        
        // Add activity score
        $member['activity_score'] = calculate_activity_score($member['id']);
    }
    
    return $response;
}, 10, 3);

// Filter members by custom criteria
add_filter('fluent_community/members_api_response', function($response, $members, $request) {
    // Remove suspended users from public list
    $response['members'] = array_filter($response['members'], function($member) {
        return get_user_meta($member['id'], 'account_status', true) !== 'suspended';
    });
    
    return $response;
}, 10, 3);
```

**Common Use Cases:**
- Add member statistics
- Add online status
- Filter member lists
- Add custom member data
- Privacy controls

---

### fluent_community/can_view_members_page ​

Filters whether the current user can view the members directory page.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$canView` | bool | Whether user can view members page |
| `$pageStatus` | string | Page status/context |

**Return:** `bool` - Modified permission

**Example Usage:**

```php
// Require login to view members
add_filter('fluent_community/can_view_members_page', function($canView, $pageStatus) {
    return is_user_logged_in();
}, 10, 2);

// Role-based access
add_filter('fluent_community/can_view_members_page', function($canView, $pageStatus) {
    $user = wp_get_current_user();
    
    // Only allow members and admins
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
- Require authentication
- Role-based access
- Premium features
- Privacy controls

---

### fluent_community/can_view_leaderboard_members ​

Filters whether the current user can view the leaderboard/top members.

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
```

**Common Use Cases:**
- Public vs private leaderboards
- Gamification features
- Access control

---

## Validation & Security Filters

### fluent_community/reserved_usernames ​

Filters the list of reserved usernames that cannot be registered.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$reserved` | array | Array of reserved username strings |

**Return:** `array` - Modified reserved usernames list

**Example Usage:**

```php
// Add custom reserved usernames
add_filter('fluent_community/reserved_usernames', function($reserved) {
    $custom_reserved = [
        'admin',
        'administrator',
        'moderator',
        'support',
        'help',
        'info',
        'contact',
        'webmaster',
        'postmaster',
        'root',
        'system'
    ];
    
    return array_merge($reserved, $custom_reserved);
});

// Add brand-related usernames
add_filter('fluent_community/reserved_usernames', function($reserved) {
    $reserved[] = 'mycompany';
    $reserved[] = 'mycompany-official';
    $reserved[] = 'mycompany-support';
    
    return $reserved;
});

// Dynamic reserved usernames
add_filter('fluent_community/reserved_usernames', function($reserved) {
    // Reserve all admin user display names
    $admins = get_users(['role' => 'administrator']);
    
    foreach ($admins as $admin) {
        $reserved[] = strtolower($admin->display_name);
        $reserved[] = strtolower($admin->user_login);
    }
    
    return array_unique($reserved);
});
```

**Common Use Cases:**
- Protect admin usernames
- Brand protection
- Prevent impersonation
- System usernames
- Custom restrictions

---

### fluent_community/social_link_providers ​

Filters available social media link providers for user profiles.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$providers` | array | Array of social provider configurations |

**Return:** `array` - Modified providers array

**Example Usage:**

```php
// Add custom social providers
add_filter('fluent_community/social_link_providers', function($providers) {
    $providers['tiktok'] = [
        'label'       => 'TikTok',
        'icon'        => 'fab fa-tiktok',
        'placeholder' => '@username',
        'url_format'  => 'https://tiktok.com/@%s'
    ];
    
    $providers['discord'] = [
        'label'       => 'Discord',
        'icon'        => 'fab fa-discord',
        'placeholder' => 'username#1234',
        'url_format'  => 'https://discord.com/users/%s'
    ];
    
    return $providers;
});

// Remove providers
add_filter('fluent_community/social_link_providers', function($providers) {
    // Remove Facebook
    unset($providers['facebook']);
    
    return $providers;
});

// Customize existing providers
add_filter('fluent_community/social_link_providers', function($providers) {
    // Change Twitter to X
    if (isset($providers['twitter'])) {
        $providers['twitter']['label'] = 'X (Twitter)';
        $providers['twitter']['url_format'] = 'https://x.com/%s';
    }
    
    return $providers;
});
```

**Common Use Cases:**
- Add new social platforms
- Remove unused platforms
- Customize platform labels
- Custom URL formats
- Brand-specific platforms

---

## User Permissions

### fluent_community/user/permissions ​

Filters user permissions for community actions.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$permissions` | array | Array of permission flags |
| `$user` | User | User object |

**Return:** `array` - Modified permissions

**Example Usage:**

```php
// Grant additional permissions
add_filter('fluent_community/user/permissions', function($permissions, $user) {
    // Premium members can create polls
    if (in_array('premium_member', $user->roles)) {
        $permissions['can_create_polls'] = true;
        $permissions['can_pin_posts'] = true;
    }
    
    return $permissions;
}, 10, 2);

// Restrict permissions for new users
add_filter('fluent_community/user/permissions', function($permissions, $user) {
    $registered = strtotime($user->user_registered);
    $days_since = (time() - $registered) / DAY_IN_SECONDS;
    
    // New users (< 7 days) have limited permissions
    if ($days_since < 7) {
        $permissions['can_create_space'] = false;
        $permissions['can_upload_video'] = false;
    }
    
    return $permissions;
}, 10, 2);
```

**Common Use Cases:**
- Role-based permissions
- Time-based restrictions
- Premium features
- Custom permission logic

---

## Related Documentation

- [User Actions](/hooks/actions/users)
- [Authentication Filters](/hooks/filters/authentication)
- [Code Snippets](/guides/code-snippets)

