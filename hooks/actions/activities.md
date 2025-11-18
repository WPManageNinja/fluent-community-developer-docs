---
prev:
  text: 'Portal'
  link: '/hooks/actions/portal'
next:
  text: 'Followers'
  link: '/hooks/actions/followers'
---

# Activities Actions

Actions related to activity tracking in Fluent Community.

## Overview

Activity actions allow you to track and log user activities throughout the community. This includes page views, interactions, and custom events.

**Total Actions:** 1

---

## Activity Tracking

### fluent_community/track_activity

Fires when an activity is tracked in the system.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$activity` | Activity Object | The activity being tracked |

**Activity Object Properties:**
- `id` (int) - Activity ID
- `user_id` (int) - User who performed the activity
- `activity_type` (string) - Type: 'page_view', 'feed_view', 'comment', 'reaction', etc.
- `object_id` (int|null) - Related object ID (feed, space, course, etc.)
- `object_type` (string|null) - Related object type
- `meta` (array) - Additional activity metadata
- `ip_address` (string) - User's IP address
- `user_agent` (string) - User's browser/device info
- `created_at` (string) - Activity timestamp

**Example Usage:**

```php
// Log all activities
add_action('fluent_community/track_activity', function($activity) {
    error_log(sprintf(
        'Activity: User %d performed %s on %s %d',
        $activity->user_id,
        $activity->activity_type,
        $activity->object_type ?? 'N/A',
        $activity->object_id ?? 0
    ));
}, 10, 1);

// Track user engagement score
add_action('fluent_community/track_activity', function($activity) {
    $engagement_score = get_user_meta($activity->user_id, 'engagement_score', true) ?: 0;
    
    // Different activities have different weights
    $activity_weights = [
        'page_view' => 1,
        'feed_view' => 2,
        'comment' => 5,
        'reaction' => 3,
        'feed_created' => 10,
        'space_joined' => 8
    ];
    
    $weight = $activity_weights[$activity->activity_type] ?? 1;
    $engagement_score += $weight;
    
    update_user_meta($activity->user_id, 'engagement_score', $engagement_score);
}, 10, 1);

// Track popular content
add_action('fluent_community/track_activity', function($activity) {
    if (in_array($activity->activity_type, ['feed_view', 'page_view']) && $activity->object_id) {
        $view_count = get_post_meta($activity->object_id, 'view_count', true) ?: 0;
        update_post_meta($activity->object_id, 'view_count', $view_count + 1);
    }
}, 10, 1);

// Detect suspicious activity patterns
add_action('fluent_community/track_activity', function($activity) {
    // Check for rapid-fire activities (potential bot)
    $recent_activities = \FluentCommunity\App\Models\Activity::where('user_id', $activity->user_id)
        ->where('created_at', '>', date('Y-m-d H:i:s', strtotime('-1 minute')))
        ->count();
    
    if ($recent_activities > 20) {
        error_log('Suspicious activity detected for user ' . $activity->user_id);
    }
}, 10, 1);
```

---

## Best Practices

### 1. Implement Activity Sampling

```php
add_action('fluent_community/track_activity', function($activity) {
    // Only process 10% of page_view activities to reduce load
    if ($activity->activity_type === 'page_view' && rand(1, 10) !== 1) {
        return;
    }
    
    // Your heavy processing here
}, 10, 1);
```

### 2. Use Caching for Frequent Queries

```php
add_action('fluent_community/track_activity', function($activity) {
    $cache_key = 'user_activity_count_' . $activity->user_id;
    $count = wp_cache_get($cache_key);
    
    if ($count === false) {
        $count = \FluentCommunity\App\Models\Activity::where('user_id', $activity->user_id)->count();
        wp_cache_set($cache_key, $count, '', 3600);
    }
}, 10, 1);
```

### 3. Respect Privacy Settings

```php
add_action('fluent_community/track_activity', function($activity) {
    $user_privacy = get_user_meta($activity->user_id, 'privacy_settings', true);
    
    if (isset($user_privacy['disable_activity_tracking']) && $user_privacy['disable_activity_tracking']) {
        return;
    }
}, 5, 1);
```

---

## Common Use Cases

### User Activity Timeline

```php
add_action('fluent_community/track_activity', function($activity) {
    $timeline = get_user_meta($activity->user_id, 'activity_timeline', true) ?: [];
    
    $timeline[] = [
        'type' => $activity->activity_type,
        'object_id' => $activity->object_id,
        'timestamp' => $activity->created_at
    ];
    
    // Keep last 100 activities
    $timeline = array_slice($timeline, -100);
    
    update_user_meta($activity->user_id, 'activity_timeline', $timeline);
}, 10, 1);
```

### Activity-Based Recommendations

```php
add_action('fluent_community/track_activity', function($activity) {
    if ($activity->activity_type === 'feed_view' && $activity->object_id) {
        $feed = \FluentCommunity\App\Models\Feed::find($activity->object_id);
        
        if ($feed && $feed->space_id) {
            $user_interests = get_user_meta($activity->user_id, 'content_interests', true) ?: [];
            
            if (!isset($user_interests[$feed->space_id])) {
                $user_interests[$feed->space_id] = 0;
            }
            
            $user_interests[$feed->space_id]++;
            
            update_user_meta($activity->user_id, 'content_interests', $user_interests);
        }
    }
}, 10, 1);
```

### Gamification - Award Badges

```php
add_action('fluent_community/track_activity', function($activity) {
    $activity_count = \FluentCommunity\App\Models\Activity::where('user_id', $activity->user_id)
        ->where('activity_type', $activity->activity_type)
        ->count();
    
    $milestones = [10 => 'bronze', 50 => 'silver', 100 => 'gold'];
    
    foreach ($milestones as $count => $badge) {
        if ($activity_count === $count) {
            do_action('fluent_community/notify_user', $activity->user_id, [
                'type' => 'badge_earned',
                'badge' => $badge . '_' . $activity->activity_type
            ]);
        }
    }
}, 10, 1);
```

---

## See Also

- [User Actions](/hooks/actions/users) - User-related activities
- [Feed Actions](/hooks/actions/feeds) - Feed interaction activities
- [Space Actions](/hooks/actions/spaces) - Space participation activities

