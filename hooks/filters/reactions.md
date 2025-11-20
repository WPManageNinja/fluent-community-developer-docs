---
prev:
  text: 'Notifications Filters'
  link: '/hooks/filters/notifications'
next:
  text: 'Activities Filters'
  link: '/hooks/filters/activities'
---

# Reactions & Engagement Filters

## Self-Reaction Controls

### fluent_community/disable_self_post_react ​

Filters whether users can react to their own posts.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$disabled` | bool | Whether self-reactions are disabled |
| `$feed` | Feed | Feed object |
| `$user` | User | Current user object |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Disable self-reactions on posts
add_filter('fluent_community/disable_self_post_react', function($disabled, $feed, $user) {
    return true; // Users cannot react to their own posts
}, 10, 3);

// Allow self-reactions for admins only
add_filter('fluent_community/disable_self_post_react', function($disabled, $feed, $user) {
    if (in_array('administrator', $user->roles)) {
        return false; // Admins can react to their own posts
    }

    return true; // Others cannot
}, 10, 3);

// Allow self-reactions in specific spaces
add_filter('fluent_community/disable_self_post_react', function($disabled, $feed, $user) {
    $allowed_spaces = [1, 5, 10]; // Space IDs where self-reactions are allowed

    if (in_array($feed->space_id, $allowed_spaces)) {
        return false;
    }

    return true;
}, 10, 3);

// Time-based restriction
add_filter('fluent_community/disable_self_post_react', function($disabled, $feed, $user) {
    $post_age = time() - strtotime($feed->created_at);
    $one_hour = 3600;

    // Allow self-reactions after 1 hour
    if ($post_age > $one_hour) {
        return false;
    }

    return true;
}, 10, 3);
```

**Common Use Cases:**
- Prevent self-promotion
- Role-based permissions
- Space-specific rules
- Time-based restrictions
- Engagement quality

---

### fluent_community/disable_self_comment_react ​

Filters whether users can react to their own comments.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$disabled` | bool | Whether self-reactions are disabled |
| `$comment` | Comment | Comment object |
| `$user` | User | Current user object |

**Return:** `bool` - Modified setting

**Example Usage:**

```php
// Disable self-reactions on comments
add_filter('fluent_community/disable_self_comment_react', function($disabled, $comment, $user) {
    return true; // Users cannot react to their own comments
}, 10, 3);

// Allow self-reactions for moderators
add_filter('fluent_community/disable_self_comment_react', function($disabled, $comment, $user) {
    $moderator_roles = ['administrator', 'moderator', 'editor'];

    foreach ($moderator_roles as $role) {
        if (in_array($role, $user->roles)) {
            return false; // Moderators can react to their own comments
        }
    }

    return true;
}, 10, 3);

// Different rules for different comment types
add_filter('fluent_community/disable_self_comment_react', function($disabled, $comment, $user) {
    // Allow self-reactions on replies but not on top-level comments
    if ($comment->parent_id > 0) {
        return false; // Replies can be self-reacted
    }

    return true; // Top-level comments cannot
}, 10, 3);

// Reputation-based permission
add_filter('fluent_community/disable_self_comment_react', function($disabled, $comment, $user) {
    $user_reputation = get_user_reputation($user->ID);

    // Users with 1000+ reputation can self-react
    if ($user_reputation >= 1000) {
        return false;
    }

    return true;
}, 10, 3);
```

**Common Use Cases:**
- Prevent self-promotion
- Role-based permissions
- Comment type rules
- Reputation-based access
- Quality control

---

## Reaction API Response

### fluent_community/reactions_api_response ​

Filters reactions API response data.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Reactions response data |
| `$feedId` | int | Feed ID |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add reaction statistics
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $response['stats'] = [
        'total_reactions' => array_sum(array_column($response['reactions'], 'count')),
        'unique_users'    => count_unique_reactors($feedId),
        'most_popular'    => get_most_popular_reaction($feedId),
        'reaction_rate'   => calculate_reaction_rate($feedId)
    ];

    return $response;
}, 10, 2);

// Add user's reaction status
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $user_id = get_current_user_id();

    if ($user_id) {
        $user_reaction = get_user_reaction($user_id, $feedId);
        $response['user_reaction'] = $user_reaction;
        $response['user_can_react'] = can_user_react_to_feed($user_id, $feedId);
    }

    return $response;
}, 10, 2);

// Group reactions by type
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $grouped = [];

    foreach ($response['reactions'] as $reaction) {
        $type = $reaction['type'];

        if (!isset($grouped[$type])) {
            $grouped[$type] = [
                'type'  => $type,
                'emoji' => get_reaction_emoji($type),
                'count' => 0,
                'users' => []
            ];
        }

        $grouped[$type]['count']++;
        $grouped[$type]['users'][] = [
            'id'   => $reaction['user_id'],
            'name' => $reaction['user_name']
        ];
    }

    // Sort by count
    usort($grouped, function($a, $b) {
        return $b['count'] - $a['count'];
    });

    $response['reactions_grouped'] = $grouped;

    return $response;
}, 10, 2);

// Add reaction trends
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $response['trends'] = [
        'last_hour'   => count_reactions_in_period($feedId, 'hour'),
        'last_day'    => count_reactions_in_period($feedId, 'day'),
        'last_week'   => count_reactions_in_period($feedId, 'week'),
        'trending'    => is_post_trending($feedId)
    ];

    return $response;
}, 10, 2);

// Add reaction leaderboard
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $response['top_reactors'] = get_top_reactors($feedId, 5);

    return $response;
}, 10, 2);

// Hide reactions from blocked users
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $current_user_id = get_current_user_id();
    $blocked_users = get_user_blocked_list($current_user_id);

    if (!empty($blocked_users)) {
        $response['reactions'] = array_filter($response['reactions'], function($reaction) use ($blocked_users) {
            return !in_array($reaction['user_id'], $blocked_users);
        });

        $response['reactions'] = array_values($response['reactions']); // Re-index
    }

    return $response;
}, 10, 2);

// Add reaction permissions
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $user_id = get_current_user_id();

    $response['permissions'] = [
        'can_react'        => can_user_react($user_id, $feedId),
        'can_remove'       => can_user_remove_reaction($user_id, $feedId),
        'can_view_details' => can_user_view_reaction_details($user_id, $feedId),
        'available_types'  => get_available_reaction_types($user_id)
    ];

    return $response;
}, 10, 2);
```

**Common Use Cases:**
- Reaction statistics
- User reaction status
- Grouping reactions
- Trend analysis
- Leaderboards
- Privacy controls
- Permission checks

---

## Best Practices

### 1. Consistent Self-Reaction Policy

```php
// Apply same rules to posts and comments
$disable_self_reactions = function($disabled, $object, $user) {
    // Consistent policy across posts and comments
    return true; // or your custom logic
};

add_filter('fluent_community/disable_self_post_react', $disable_self_reactions, 10, 3);
add_filter('fluent_community/disable_self_comment_react', $disable_self_reactions, 10, 3);
```

### 2. Performance Optimization

```php
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    // Cache expensive calculations
    $cache_key = 'reaction_stats_' . $feedId;
    $stats = wp_cache_get($cache_key);

    if (false === $stats) {
        $stats = calculate_reaction_statistics($feedId);
        wp_cache_set($cache_key, $stats, '', 300); // Cache for 5 minutes
    }

    $response['stats'] = $stats;

    return $response;
}, 10, 2);
```

### 3. Clear User Feedback

```php
add_filter('fluent_community/disable_self_post_react', function($disabled, $feed, $user) {
    // Store reason for frontend display
    if ($disabled) {
        add_filter('fluent_community/reaction_disabled_message', function() {
            return 'You cannot react to your own posts.';
        });
    }

    return $disabled;
}, 10, 3);
```

### 4. Respect Privacy Settings

```php
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $current_user_id = get_current_user_id();

    foreach ($response['reactions'] as &$reaction) {
        $reactor_privacy = get_user_privacy_settings($reaction['user_id']);

        // Hide identity if user has privacy enabled
        if ($reactor_privacy['hide_reactions'] && $reaction['user_id'] !== $current_user_id) {
            $reaction['user_name'] = 'Anonymous';
            $reaction['user_avatar'] = get_default_avatar();
        }
    }

    return $response;
}, 10, 2);
```

---

## Common Patterns

### Gamification with Reactions

```php
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    // Add points/badges based on reactions received
    $feed = get_feed($feedId);
    $author_id = $feed->user_id;

    $response['author_rewards'] = [
        'points_earned'   => calculate_reaction_points($feedId),
        'badges_unlocked' => get_reaction_badges($author_id),
        'next_milestone'  => get_next_reaction_milestone($author_id)
    ];

    return $response;
}, 10, 2);
```

### Reaction Limits

```php
add_filter('fluent_community/disable_self_post_react', function($disabled, $feed, $user) {
    // Limit reactions per user per day
    $daily_limit = 100;
    $user_reactions_today = count_user_reactions_today($user->ID);

    if ($user_reactions_today >= $daily_limit) {
        return true; // Disable all reactions if limit reached
    }

    return $disabled;
}, 10, 3);
```

### Reaction Analytics

```php
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $response['analytics'] = [
        'reaction_velocity' => calculate_reaction_velocity($feedId),
        'peak_time'         => get_peak_reaction_time($feedId),
        'conversion_rate'   => calculate_view_to_reaction_rate($feedId),
        'sentiment_score'   => calculate_sentiment_from_reactions($feedId)
    ];

    return $response;
}, 10, 2);
```

---

## Related Documentation

- [Feeds Filters](/hooks/filters/feeds)
- [Comments Filters](/hooks/filters/comments)
- [API Responses Filters](/hooks/filters/api-responses)
- [Permissions Filters](/hooks/filters/permissions)
- [Code Snippets](/guides/code-snippets)

