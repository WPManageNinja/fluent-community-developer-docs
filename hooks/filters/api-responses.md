---
prev:
  text: 'Courses Filters'
  link: '/hooks/filters/courses'
next:
  text: 'Notifications Filters'
  link: '/hooks/filters/notifications'
---

<DocStatusBanner />


# API Responses Filters

## Feed Responses

### fluent_community/feed_api_response ​

Filters a single feed item API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Feed response data |
| `$feed` | Feed | Feed object |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add custom fields to feed response
add_filter('fluent_community/feed_api_response', function($response, $feed) {
    // Add view count
    $response['view_count'] = get_feed_view_count($feed->id);
    
    // Add bookmark status
    $response['is_bookmarked'] = is_feed_bookmarked($feed->id, get_current_user_id());
    
    // Add reading time
    $response['reading_time'] = calculate_reading_time($feed->message);
    
    return $response;
}, 10, 2);

// Add author reputation
add_filter('fluent_community/feed_api_response', function($response, $feed) {
    $response['author']['reputation'] = get_user_reputation($feed->user_id);
    $response['author']['badge_count'] = count_user_badges($feed->user_id);
    
    return $response;
}, 10, 2);

// Hide sensitive data for guests
add_filter('fluent_community/feed_api_response', function($response, $feed) {
    if (!is_user_logged_in()) {
        unset($response['author']['email']);
        unset($response['meta']['internal_notes']);
    }
    
    return $response;
}, 10, 2);
```

**Common Use Cases:**
- Add computed fields
- Author metadata
- Hide sensitive data
- Custom statistics

---

### fluent_community/feeds_api_response ​

Filters the feeds list API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Feeds list response data |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add pagination metadata
add_filter('fluent_community/feeds_api_response', function($response) {
    $response['meta']['total_pages'] = ceil($response['total'] / $response['per_page']);
    $response['meta']['has_more'] = $response['current_page'] < $response['meta']['total_pages'];
    
    return $response;
});

// Add feed statistics
add_filter('fluent_community/feeds_api_response', function($response) {
    $response['stats'] = [
        'total_feeds'    => $response['total'],
        'total_comments' => get_total_comments_count(),
        'total_reactions' => get_total_reactions_count()
    ];
    
    return $response;
});

// Filter feeds by user preference
add_filter('fluent_community/feeds_api_response', function($response) {
    $user_id = get_current_user_id();
    $hidden_users = get_user_meta($user_id, 'hidden_users', true) ?: [];
    
    if (!empty($hidden_users)) {
        $response['feeds'] = array_filter($response['feeds'], function($feed) use ($hidden_users) {
            return !in_array($feed['user_id'], $hidden_users);
        });
        $response['feeds'] = array_values($response['feeds']); // Re-index
    }
    
    return $response;
});
```

**Common Use Cases:**
- Pagination metadata
- Statistics
- Content filtering
- Custom sorting

---

## Comment Responses

### fluent_community/comments_query_response ​

Filters comments query API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Comments response data |
| `$feedId` | int | Feed ID |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add comment metadata
add_filter('fluent_community/comments_query_response', function($response, $feedId) {
    foreach ($response['comments'] as &$comment) {
        // Add edit status
        $comment['can_edit'] = can_user_edit_comment($comment['id']);
        
        // Add reply count
        $comment['reply_count'] = count_comment_replies($comment['id']);
        
        // Add author reputation
        $comment['author']['reputation'] = get_user_reputation($comment['user_id']);
    }
    
    return $response;
}, 10, 2);

// Add comment statistics
add_filter('fluent_community/comments_query_response', function($response, $feedId) {
    $response['stats'] = [
        'total_comments' => $response['total'],
        'unique_commenters' => count_unique_commenters($feedId),
        'average_length' => calculate_average_comment_length($feedId)
    ];
    
    return $response;
}, 10, 2);

// Hide deleted comments for guests
add_filter('fluent_community/comments_query_response', function($response, $feedId) {
    if (!is_user_logged_in()) {
        $response['comments'] = array_filter($response['comments'], function($comment) {
            return $comment['status'] !== 'deleted';
        });
        $response['comments'] = array_values($response['comments']);
    }
    
    return $response;
}, 10, 2);
```

**Common Use Cases:**
- Comment metadata
- Statistics
- Permission checks
- Content filtering

---

## Member Responses

### fluent_community/members_api_response ​

Filters members list API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Members response data |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add member statistics
add_filter('fluent_community/members_api_response', function($response) {
    foreach ($response['members'] as &$member) {
        $member['stats'] = [
            'post_count'    => count_user_posts($member['user_id']),
            'comment_count' => count_user_comments($member['user_id']),
            'reputation'    => get_user_reputation($member['user_id'])
        ];
    }
    
    return $response;
});

// Add online status
add_filter('fluent_community/members_api_response', function($response) {
    foreach ($response['members'] as &$member) {
        $last_seen = get_user_last_seen($member['user_id']);
        $member['is_online'] = (time() - $last_seen) < 300; // 5 minutes
        $member['last_seen'] = $last_seen;
    }
    
    return $response;
});

// Hide email for privacy
add_filter('fluent_community/members_api_response', function($response) {
    $current_user_id = get_current_user_id();
    
    foreach ($response['members'] as &$member) {
        // Only show email to admins or the user themselves
        if ($member['user_id'] !== $current_user_id && !current_user_can('manage_options')) {
            unset($member['email']);
        }
    }
    
    return $response;
});
```

**Common Use Cases:**
- Member statistics
- Online status
- Privacy controls
- Custom fields

---

### fluent_community/space_members_api_response ​

Filters space members API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Space members response data |
| `$space` | Space | Space object |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add member roles in space
add_filter('fluent_community/space_members_api_response', function($response, $space) {
    foreach ($response['members'] as &$member) {
        $member['space_role'] = get_user_space_role($member['user_id'], $space->id);
        $member['joined_at'] = get_user_space_join_date($member['user_id'], $space->id);
    }
    
    return $response;
}, 10, 2);

// Add member activity in space
add_filter('fluent_community/space_members_api_response', function($response, $space) {
    foreach ($response['members'] as &$member) {
        $member['space_activity'] = [
            'posts'    => count_user_posts_in_space($member['user_id'], $space->id),
            'comments' => count_user_comments_in_space($member['user_id'], $space->id),
            'last_active' => get_user_last_active_in_space($member['user_id'], $space->id)
        ];
    }
    
    return $response;
}, 10, 2);
```

**Common Use Cases:**
- Space roles
- Member activity
- Join dates
- Space-specific data

---

## Leaderboard & Reactions

### fluent_community/leaderboard_api_response ​

Filters leaderboard API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Leaderboard response data |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add rank changes
add_filter('fluent_community/leaderboard_api_response', function($response) {
    foreach ($response['leaderboard'] as &$entry) {
        $previous_rank = get_user_previous_rank($entry['user_id']);
        $entry['rank_change'] = $previous_rank - $entry['rank'];
        $entry['rank_trend'] = $entry['rank_change'] > 0 ? 'up' : ($entry['rank_change'] < 0 ? 'down' : 'same');
    }
    
    return $response;
});

// Add achievement badges
add_filter('fluent_community/leaderboard_api_response', function($response) {
    foreach ($response['leaderboard'] as &$entry) {
        $entry['badges'] = get_user_badges($entry['user_id']);
        $entry['achievements'] = get_user_achievements($entry['user_id']);
    }
    
    return $response;
});

// Add time period context
add_filter('fluent_community/leaderboard_api_response', function($response) {
    $response['meta']['period'] = 'monthly';
    $response['meta']['period_start'] = date('Y-m-01');
    $response['meta']['period_end'] = date('Y-m-t');
    
    return $response;
});
```

**Common Use Cases:**
- Rank tracking
- Badges & achievements
- Time periods
- Gamification

---

### fluent_community/reactions_api_response ​

Filters reactions API response.

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
        'most_popular'    => get_most_popular_reaction($feedId)
    ];
    
    return $response;
}, 10, 2);

// Add user's reaction
add_filter('fluent_community/reactions_api_response', function($response, $feedId) {
    $user_id = get_current_user_id();
    
    if ($user_id) {
        $user_reaction = get_user_reaction($user_id, $feedId);
        $response['user_reaction'] = $user_reaction;
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
                'count' => 0,
                'users' => []
            ];
        }
        $grouped[$type]['count'] += $reaction['count'];
        $grouped[$type]['users'][] = $reaction['user'];
    }
    
    $response['reactions_grouped'] = array_values($grouped);
    
    return $response;
}, 10, 2);
```

**Common Use Cases:**
- Reaction statistics
- User reactions
- Grouping
- Analytics

---

### fluent_community/storage_settings_response ​

Filters storage settings API response.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$response` | array | Storage settings response |

**Return:** `array` - Modified response

**Example Usage:**

```php
// Add storage usage details
add_filter('fluent_community/storage_settings_response', function($response) {
    $response['usage'] = [
        'total_used'  => get_total_storage_used(),
        'total_limit' => get_storage_limit(),
        'percentage'  => calculate_storage_percentage(),
        'by_type'     => [
            'images' => get_storage_by_type('image'),
            'videos' => get_storage_by_type('video'),
            'documents' => get_storage_by_type('document')
        ]
    ];
    
    return $response;
});

// Add storage recommendations
add_filter('fluent_community/storage_settings_response', function($response) {
    $usage_percentage = calculate_storage_percentage();
    
    if ($usage_percentage > 80) {
        $response['recommendations'] = [
            'Clean up old media files',
            'Enable image compression',
            'Consider upgrading storage plan'
        ];
    }
    
    return $response;
});
```

**Common Use Cases:**
- Storage metrics
- Usage tracking
- Recommendations
- Limits

---

## Best Practices

### 1. Always Check User Permissions

```php
add_filter('fluent_community/members_api_response', function($response) {
    $can_view_email = current_user_can('manage_options');
    
    foreach ($response['members'] as &$member) {
        if (!$can_view_email) {
            unset($member['email']);
        }
    }
    
    return $response;
});
```

### 2. Avoid Heavy Computations

```php
// Bad - runs query for each member
add_filter('fluent_community/members_api_response', function($response) {
    foreach ($response['members'] as &$member) {
        $member['post_count'] = count_user_posts($member['user_id']); // N+1 query
    }
    return $response;
});

// Good - batch query
add_filter('fluent_community/members_api_response', function($response) {
    $user_ids = array_column($response['members'], 'user_id');
    $post_counts = get_post_counts_for_users($user_ids); // Single query
    
    foreach ($response['members'] as &$member) {
        $member['post_count'] = $post_counts[$member['user_id']] ?? 0;
    }
    return $response;
});
```

### 3. Maintain Response Structure

```php
add_filter('fluent_community/feed_api_response', function($response, $feed) {
    // Add new fields, don't remove existing ones
    $response['custom_field'] = 'value';
    
    // Don't do this:
    // unset($response['created_at']); // Breaks frontend expectations
    
    return $response;
}, 10, 2);
```

---

## Related Documentation

- [Feeds Filters](/hooks/filters/feeds)
- [Comments Filters](/hooks/filters/comments)
- [Users Filters](/hooks/filters/users)
- [Code Snippets](/guides/code-snippets)

