---
prev:
  text: 'Media'
  link: '/hooks/actions/media'
next:
  text: 'Notifications'
  link: '/hooks/actions/notifications'
---

# Reactions Actions

## Reaction Events

### fluent_community/feed/react_added

Fires when a reaction is added to a feed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$reaction` | Reaction Object | The reaction object |
| `$feed` | Feed Object | The feed that was reacted to |

**Reaction Object Properties:**
- `id` (int) - Reaction ID
- `user_id` (int) - User who reacted
- `object_id` (int) - Feed/content ID
- `object_type` (string) - Type: 'feed', 'comment', etc.
- `type` (string) - Reaction type: 'like', 'love', 'haha', 'wow', 'sad', 'angry'
- `created_at` (string) - Timestamp

**Example Usage:**

```php
// Track popular content
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    $reaction_count = get_post_meta($feed->id, 'total_reactions', true) ?: 0;
    update_post_meta($feed->id, 'total_reactions', $reaction_count + 1);
    
    // Award points to feed author
    if ($reaction_count > 0 && $reaction_count % 10 === 0) {
        $points = get_user_meta($feed->user_id, 'community_points', true) ?: 0;
        update_user_meta($feed->user_id, 'community_points', $points + 5);
    }
}, 10, 2);

// Notify author of first reaction
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    $reaction_count = \FluentCommunity\App\Models\Reaction::where('object_id', $feed->id)
        ->where('object_type', 'feed')
        ->count();
    
    if ($reaction_count === 1) {
        // First reaction - notify author
        do_action('fluent_community/notify_user', $feed->user_id, [
            'type' => 'first_reaction',
            'feed_id' => $feed->id,
            'reactor_id' => $reaction->user_id
        ]);
    }
}, 10, 2);

// Track reaction types
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    $reaction_stats = get_post_meta($feed->id, 'reaction_stats', true) ?: [];
    
    if (!isset($reaction_stats[$reaction->type])) {
        $reaction_stats[$reaction->type] = 0;
    }
    
    $reaction_stats[$reaction->type]++;
    update_post_meta($feed->id, 'reaction_stats', $reaction_stats);
    
    error_log(sprintf(
        'Reaction added: %s on feed %d by user %d',
        $reaction->type,
        $feed->id,
        $reaction->user_id
    ));
}, 10, 2);

// Trigger milestone notifications
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    $milestones = [10, 50, 100, 500, 1000];
    $reaction_count = \FluentCommunity\App\Models\Reaction::where('object_id', $feed->id)
        ->where('object_type', 'feed')
        ->count();
    
    if (in_array($reaction_count, $milestones)) {
        $author = get_user_by('id', $feed->user_id);
        wp_mail(
            $author->user_email,
            'Milestone Reached!',
            sprintf('Your post has reached %d reactions!', $reaction_count)
        );
    }
}, 10, 2);
```

---

### fluent_community/section/reactions_count_updated

Fires when the reaction count is updated for a section (feed, comment, etc.).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$section` | Object | The section object (feed, comment, etc.) |
| `$reactionCount` | int | Updated reaction count |

**Example Usage:**

```php
// Update trending score
add_action('fluent_community/section/reactions_count_updated', function($section, $reactionCount) {
    $trending_score = calculate_trending_score($section, $reactionCount);
    update_post_meta($section->id, 'trending_score', $trending_score);
}, 10, 2);

// Cache popular content
add_action('fluent_community/section/reactions_count_updated', function($section, $reactionCount) {
    if ($reactionCount >= 50) {
        $popular_feeds = get_option('popular_feeds', []);
        
        if (!in_array($section->id, $popular_feeds)) {
            $popular_feeds[] = $section->id;
            update_option('popular_feeds', $popular_feeds);
        }
    }
}, 10, 2);

// Log reaction milestones
add_action('fluent_community/section/reactions_count_updated', function($section, $reactionCount) {
    $milestones = [10, 25, 50, 100, 250, 500, 1000];
    
    if (in_array($reactionCount, $milestones)) {
        error_log(sprintf(
            'Milestone: Section %d (%s) reached %d reactions',
            $section->id,
            get_class($section),
            $reactionCount
        ));
    }
}, 10, 2);
```

---

## Best Practices

### 1. Check Object Type

```php
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    // Ensure we're handling the correct object type
    if ($reaction->object_type !== 'feed') {
        return;
    }
    
    // Your code here
}, 10, 2);
```

### 2. Prevent Duplicate Processing

```php
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    $processed = get_transient('reaction_processed_' . $reaction->id);
    
    if ($processed) {
        return; // Already processed
    }
    
    // Your code here
    
    set_transient('reaction_processed_' . $reaction->id, true, HOUR_IN_SECONDS);
}, 10, 2);
```

### 3. Handle Reaction Removal

Note: There's no dedicated action for reaction removal. To track removals, you may need to use filters or check reaction counts.

```php
add_action('fluent_community/section/reactions_count_updated', function($section, $reactionCount) {
    $previous_count = get_post_meta($section->id, 'previous_reaction_count', true) ?: 0;
    
    if ($reactionCount < $previous_count) {
        // Reaction was removed
        error_log(sprintf('Reaction removed from section %d', $section->id));
    }
    
    update_post_meta($section->id, 'previous_reaction_count', $reactionCount);
}, 10, 2);
```

### 4. Optimize Database Queries

```php
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    // Use caching to avoid repeated queries
    $cache_key = 'feed_reactions_' . $feed->id;
    $cached_count = wp_cache_get($cache_key);
    
    if ($cached_count === false) {
        $cached_count = \FluentCommunity\App\Models\Reaction::where('object_id', $feed->id)
            ->where('object_type', 'feed')
            ->count();
        
        wp_cache_set($cache_key, $cached_count, '', 300); // Cache for 5 minutes
    }
    
    // Use cached count
}, 10, 2);
```

---

## Common Use Cases

### Award Points for Reactions

```php
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    // Award points to feed author
    $points = get_user_meta($feed->user_id, 'community_points', true) ?: 0;
    update_user_meta($feed->user_id, 'community_points', $points + 1);
    
    // Award points to reactor
    $reactor_points = get_user_meta($reaction->user_id, 'community_points', true) ?: 0;
    update_user_meta($reaction->user_id, 'community_points', $reactor_points + 0.5);
}, 10, 2);
```

### Track Engagement Metrics

```php
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    $engagement_data = [
        'feed_id' => $feed->id,
        'user_id' => $reaction->user_id,
        'reaction_type' => $reaction->type,
        'timestamp' => current_time('mysql')
    ];
    
    // Log to analytics
    do_action('fluent_community/log_analytics', 'reaction_added', $engagement_data);
}, 10, 2);
```

### Create Leaderboard

```php
add_action('fluent_community/section/reactions_count_updated', function($section, $reactionCount) {
    if ($reactionCount >= 10) {
        $leaderboard = get_option('reaction_leaderboard', []);
        
        $leaderboard[$section->id] = [
            'count' => $reactionCount,
            'user_id' => $section->user_id,
            'updated_at' => current_time('mysql')
        ];
        
        // Sort by count
        uasort($leaderboard, function($a, $b) {
            return $b['count'] - $a['count'];
        });
        
        // Keep top 100
        $leaderboard = array_slice($leaderboard, 0, 100, true);
        
        update_option('reaction_leaderboard', $leaderboard);
    }
}, 10, 2);
```

---

## See Also

- [Feed Actions](/hooks/actions/feeds) - Feed-related actions
- [Comment Actions](/hooks/actions/comments) - Comment-related actions
- [User Actions](/hooks/actions/users) - User point system

