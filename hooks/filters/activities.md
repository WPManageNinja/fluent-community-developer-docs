---
prev:
  text: 'Reactions Filters'
  link: '/hooks/filters/reactions'
next:
  text: 'Integrations Filters'
  link: '/hooks/filters/integrations'
---

<DocStatusBanner />


# Activity & Tracking Filters

## Activity Content Filters

### fluent_community/activity/after_contents ​

Filters activity content after it's been processed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$contents` | array | Activity contents array |
| `$filters` | array | Applied filters |

**Return:** `array` - Modified contents

**Example Usage:**

```php
// Add custom activity types
add_filter('fluent_community/activity/after_contents', function($contents, $filters) {
    // Add custom metadata to each activity
    foreach ($contents as &$activity) {
        $activity['time_ago'] = human_time_diff(strtotime($activity['created_at']));
        $activity['is_new'] = is_activity_new($activity['id']);
    }

    return $contents;
}, 10, 2);

// Filter activities by user preference
add_filter('fluent_community/activity/after_contents', function($contents, $filters) {
    $user_id = get_current_user_id();
    $hidden_types = get_user_meta($user_id, 'hidden_activity_types', true) ?: [];

    if (!empty($hidden_types)) {
        $contents = array_filter($contents, function($activity) use ($hidden_types) {
            return !in_array($activity['type'], $hidden_types);
        });
        $contents = array_values($contents); // Re-index
    }

    return $contents;
}, 10, 2);

// Add engagement metrics
add_filter('fluent_community/activity/after_contents', function($contents, $filters) {
    foreach ($contents as &$activity) {
        $activity['engagement'] = [
            'views'     => get_activity_views($activity['id']),
            'clicks'    => get_activity_clicks($activity['id']),
            'reactions' => get_activity_reactions($activity['id'])
        ];
    }

    return $contents;
}, 10, 2);

// Add user context
add_filter('fluent_community/activity/after_contents', function($contents, $filters) {
    $current_user_id = get_current_user_id();

    foreach ($contents as &$activity) {
        $activity['user_context'] = [
            'is_following'  => is_user_following($current_user_id, $activity['user_id']),
            'is_bookmarked' => is_activity_bookmarked($current_user_id, $activity['id']),
            'has_read'      => has_user_read_activity($current_user_id, $activity['id'])
        ];
    }

    return $contents;
}, 10, 2);
```

**Common Use Cases:**
- Add metadata
- Filter by preferences
- Engagement metrics
- User context
- Custom activity types

---

### fluent_community/activity/after_contents_space ​

Filters activity content for a specific space.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$contents` | array | Activity contents array |
| `$spaceId` | int | Space ID |
| `$filters` | array | Applied filters |

**Return:** `array` - Modified contents

**Example Usage:**

```php
// Add space-specific metadata
add_filter('fluent_community/activity/after_contents_space', function($contents, $spaceId, $filters) {
    $space = get_space($spaceId);

    foreach ($contents as &$activity) {
        $activity['space_context'] = [
            'space_name'  => $space->title,
            'space_role'  => get_user_space_role(get_current_user_id(), $spaceId),
            'is_pinned'   => is_activity_pinned_in_space($activity['id'], $spaceId)
        ];
    }

    return $contents;
}, 10, 3);

// Filter by space permissions
add_filter('fluent_community/activity/after_contents_space', function($contents, $spaceId, $filters) {
    $user_id = get_current_user_id();
    $user_role = get_user_space_role($user_id, $spaceId);

    // Hide admin-only activities from regular members
    if ($user_role !== 'admin') {
        $contents = array_filter($contents, function($activity) {
            return !($activity['meta']['admin_only'] ?? false);
        });
        $contents = array_values($contents);
    }

    return $contents;
}, 10, 3);

// Add space statistics
add_filter('fluent_community/activity/after_contents_space', function($contents, $spaceId, $filters) {
    foreach ($contents as &$activity) {
        $activity['space_stats'] = [
            'total_members'   => count_space_members($spaceId),
            'active_members'  => count_active_space_members($spaceId),
            'total_posts'     => count_space_posts($spaceId)
        ];
    }

    return $contents;
}, 10, 3);

// Highlight featured content
add_filter('fluent_community/activity/after_contents_space', function($contents, $spaceId, $filters) {
    $featured_ids = get_featured_activity_ids($spaceId);

    foreach ($contents as &$activity) {
        $activity['is_featured'] = in_array($activity['id'], $featured_ids);
    }

    return $contents;
}, 10, 3);
```

**Common Use Cases:**
- Space-specific metadata
- Permission filtering
- Space statistics
- Featured content
- Role-based display

---

### fluent_community/activity/after_contents_user ​

Filters activity content for a specific user profile.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$contents` | array | Activity contents array |
| `$userId` | int | User ID |
| `$filters` | array | Applied filters |

**Return:** `array` - Modified contents

**Example Usage:**

```php
// Add user profile context
add_filter('fluent_community/activity/after_contents_user', function($contents, $userId, $filters) {
    $user = get_user_by('ID', $userId);

    foreach ($contents as &$activity) {
        $activity['author_context'] = [
            'reputation'    => get_user_reputation($userId),
            'member_since'  => $user->user_registered,
            'total_posts'   => count_user_posts($userId),
            'total_comments' => count_user_comments($userId)
        ];
    }

    return $contents;
}, 10, 3);

// Filter by privacy settings
add_filter('fluent_community/activity/after_contents_user', function($contents, $userId, $filters) {
    $current_user_id = get_current_user_id();
    $privacy_settings = get_user_privacy_settings($userId);

    // If viewing someone else's profile
    if ($current_user_id !== $userId) {
        // Hide private activities
        if ($privacy_settings['hide_activity'] ?? false) {
            $contents = array_filter($contents, function($activity) {
                return !($activity['is_private'] ?? false);
            });
            $contents = array_values($contents);
        }
    }

    return $contents;
}, 10, 3);

// Add achievement highlights
add_filter('fluent_community/activity/after_contents_user', function($contents, $userId, $filters) {
    $achievements = get_user_achievements($userId);

    foreach ($contents as &$activity) {
        // Check if this activity earned an achievement
        $activity_achievements = array_filter($achievements, function($achievement) use ($activity) {
            return $achievement['activity_id'] === $activity['id'];
        });

        if (!empty($activity_achievements)) {
            $activity['achievements'] = $activity_achievements;
        }
    }

    return $contents;
}, 10, 3);

// Add interaction history
add_filter('fluent_community/activity/after_contents_user', function($contents, $userId, $filters) {
    $current_user_id = get_current_user_id();

    if ($current_user_id && $current_user_id !== $userId) {
        foreach ($contents as &$activity) {
            $activity['interaction_history'] = [
                'has_reacted'   => has_user_reacted($current_user_id, $activity['id']),
                'has_commented' => has_user_commented($current_user_id, $activity['id']),
                'has_shared'    => has_user_shared($current_user_id, $activity['id'])
            ];
        }
    }

    return $contents;
}, 10, 3);

// Group activities by date
add_filter('fluent_community/activity/after_contents_user', function($contents, $userId, $filters) {
    $grouped = [];

    foreach ($contents as $activity) {
        $date = date('Y-m-d', strtotime($activity['created_at']));

        if (!isset($grouped[$date])) {
            $grouped[$date] = [
                'date'       => $date,
                'date_label' => format_activity_date($date),
                'activities' => []
            ];
        }

        $grouped[$date]['activities'][] = $activity;
    }

    // Return flat array with date markers
    $result = [];
    foreach ($grouped as $group) {
        $result[] = [
            'type' => 'date_marker',
            'date' => $group['date_label']
        ];
        $result = array_merge($result, $group['activities']);
    }

    return $result;
}, 10, 3);
```

**Common Use Cases:**
- User profile context
- Privacy filtering
- Achievement tracking
- Interaction history
- Activity grouping

---

## Best Practices

### 1. Performance Optimization

```php
add_filter('fluent_community/activity/after_contents', function($contents, $filters) {
    // Batch load user data instead of individual queries
    $user_ids = array_unique(array_column($contents, 'user_id'));
    $users_data = get_users_data_batch($user_ids);

    foreach ($contents as &$activity) {
        $activity['user_data'] = $users_data[$activity['user_id']] ?? null;
    }

    return $contents;
}, 10, 2);
```

### 2. Respect Privacy Settings

```php
add_filter('fluent_community/activity/after_contents_user', function($contents, $userId, $filters) {
    $current_user_id = get_current_user_id();

    // Only filter if viewing someone else's profile
    if ($current_user_id !== $userId) {
        $privacy = get_user_privacy_settings($userId);

        if ($privacy['hide_activity']) {
            return []; // Return empty if activity is hidden
        }
    }

    return $contents;
}, 10, 3);
```

### 3. Cache Expensive Calculations

```php
add_filter('fluent_community/activity/after_contents_space', function($contents, $spaceId, $filters) {
    $cache_key = 'space_stats_' . $spaceId;
    $stats = wp_cache_get($cache_key);

    if (false === $stats) {
        $stats = calculate_space_statistics($spaceId);
        wp_cache_set($cache_key, $stats, '', 600); // Cache for 10 minutes
    }

    foreach ($contents as &$activity) {
        $activity['space_stats'] = $stats;
    }

    return $contents;
}, 10, 3);
```

### 4. Maintain Array Structure

```php
add_filter('fluent_community/activity/after_contents', function($contents, $filters) {
    // Always re-index after filtering
    $contents = array_filter($contents, function($activity) {
        return $activity['status'] === 'published';
    });

    // Re-index to maintain sequential keys
    return array_values($contents);
}, 10, 2);
```

---

## Common Patterns

### Activity Filtering by Type

```php
add_filter('fluent_community/activity/after_contents', function($contents, $filters) {
    // Allow users to filter activity types
    $allowed_types = get_user_meta(get_current_user_id(), 'activity_filter', true);

    if (!empty($allowed_types)) {
        $contents = array_filter($contents, function($activity) use ($allowed_types) {
            return in_array($activity['type'], $allowed_types);
        });
        $contents = array_values($contents);
    }

    return $contents;
}, 10, 2);
```

### Real-time Activity Indicators

```php
add_filter('fluent_community/activity/after_contents', function($contents, $filters) {
    foreach ($contents as &$activity) {
        $created_time = strtotime($activity['created_at']);
        $minutes_ago = (time() - $created_time) / 60;

        $activity['is_live'] = $minutes_ago < 5; // Activity within 5 minutes
        $activity['is_recent'] = $minutes_ago < 60; // Activity within 1 hour
    }

    return $contents;
}, 10, 2);
```

### Activity Analytics

```php
add_filter('fluent_community/activity/after_contents_space', function($contents, $spaceId, $filters) {
    foreach ($contents as &$activity) {
        $activity['analytics'] = [
            'engagement_rate' => calculate_engagement_rate($activity['id']),
            'reach'           => calculate_activity_reach($activity['id']),
            'virality_score'  => calculate_virality_score($activity['id'])
        ];
    }

    return $contents;
}, 10, 3);
```

---

## Related Documentation

- [Feeds Filters](/hooks/filters/feeds)
- [Spaces Filters](/hooks/filters/spaces)
- [Users Filters](/hooks/filters/users)
- [API Responses Filters](/hooks/filters/api-responses)
- [Code Snippets](/guides/code-snippets)

