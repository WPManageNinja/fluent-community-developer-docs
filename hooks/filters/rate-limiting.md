---
prev:
  text: 'Activities Filters'
  link: '/hooks/filters/activities'
next:
  text: 'Integrations Filters'
  link: '/hooks/filters/integrations'
---

# Rate Limiting Filters ​

Filters for customizing rate limiting and spam prevention in Fluent Community.

## Overview ​

Rate limiting filters control how frequently users can perform actions like posting and commenting. These filters are essential for preventing spam, managing server load, and maintaining community quality.

**Total Filters:** 2

---

## Comment Rate Limiting

### fluent_community/rate_limit/comments_per_minute ​

Filters the maximum number of comments a user can post per minute.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$limit` | int | Comments per minute limit |
| `$user` | User | User object |

**Return:** `int` - Modified limit

**Example Usage:**

```php
// Set default comment rate limit
add_filter('fluent_community/rate_limit/comments_per_minute', function($limit, $user) {
    return 5; // 5 comments per minute
}, 10, 2);

// Role-based rate limits
add_filter('fluent_community/rate_limit/comments_per_minute', function($limit, $user) {
    if (in_array('administrator', $user->roles)) {
        return 999; // No practical limit for admins
    }
    
    if (in_array('premium_member', $user->roles)) {
        return 10; // Premium members get higher limit
    }
    
    return 3; // Regular members: 3 comments per minute
}, 10, 2);

// Reputation-based limits
add_filter('fluent_community/rate_limit/comments_per_minute', function($limit, $user) {
    $reputation = get_user_reputation($user->ID);
    
    if ($reputation >= 1000) {
        return 15; // High reputation users
    } elseif ($reputation >= 500) {
        return 10; // Medium reputation users
    } elseif ($reputation >= 100) {
        return 5; // Low reputation users
    }
    
    return 2; // New users
}, 10, 2);

// Time-based limits
add_filter('fluent_community/rate_limit/comments_per_minute', function($limit, $user) {
    $hour = (int) current_time('H');
    
    // Stricter limits during peak hours (9 AM - 5 PM)
    if ($hour >= 9 && $hour <= 17) {
        return 3;
    }
    
    // More relaxed during off-peak hours
    return 8;
}, 10, 2);

// Account age-based limits
add_filter('fluent_community/rate_limit/comments_per_minute', function($limit, $user) {
    $account_age_days = (time() - strtotime($user->user_registered)) / DAY_IN_SECONDS;
    
    if ($account_age_days < 1) {
        return 1; // Very strict for brand new accounts
    } elseif ($account_age_days < 7) {
        return 3; // Strict for accounts less than a week old
    } elseif ($account_age_days < 30) {
        return 5; // Moderate for accounts less than a month old
    }
    
    return 10; // Normal limit for established accounts
}, 10, 2);
```

**Common Use Cases:**
- Spam prevention
- Role-based limits
- Reputation-based access
- Time-based restrictions
- New user protection

---

## Post Rate Limiting

### fluent_community/rate_limit/posts_per_5_minutes ​

Filters the maximum number of posts a user can create per 5 minutes.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$limit` | int | Posts per 5 minutes limit |
| `$user` | User | User object |

**Return:** `int` - Modified limit

**Example Usage:**

```php
// Set default post rate limit
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    return 3; // 3 posts per 5 minutes
}, 10, 2);

// Role-based rate limits
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    if (in_array('administrator', $user->roles)) {
        return 999; // No practical limit for admins
    }
    
    if (in_array('moderator', $user->roles)) {
        return 20; // Moderators get higher limit
    }
    
    if (in_array('premium_member', $user->roles)) {
        return 10; // Premium members
    }
    
    return 3; // Regular members
}, 10, 2);

// Reputation-based limits
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    $reputation = get_user_reputation($user->ID);
    
    if ($reputation >= 2000) {
        return 15;
    } elseif ($reputation >= 1000) {
        return 10;
    } elseif ($reputation >= 500) {
        return 7;
    } elseif ($reputation >= 100) {
        return 5;
    }
    
    return 2; // New or low reputation users
}, 10, 2);

// Verified user benefits
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    $is_verified = get_user_meta($user->ID, 'is_verified', true);
    
    if ($is_verified) {
        return $limit * 2; // Double the limit for verified users
    }
    
    return $limit;
}, 10, 2);

// Progressive limits based on behavior
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    $spam_score = get_user_spam_score($user->ID);
    
    if ($spam_score > 0.8) {
        return 1; // Very strict for suspected spammers
    } elseif ($spam_score > 0.5) {
        return 2; // Moderate restriction
    }
    
    // Check quality score
    $quality_score = get_user_content_quality_score($user->ID);
    
    if ($quality_score > 0.8) {
        return 10; // Reward high-quality contributors
    }
    
    return 3; // Default
}, 10, 2);

// Space-specific limits
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    // Get current space context
    $space_id = get_current_space_id();
    
    if ($space_id) {
        $space_settings = get_space_settings($space_id);
        
        if (isset($space_settings['post_rate_limit'])) {
            return $space_settings['post_rate_limit'];
        }
    }
    
    return $limit;
}, 10, 2);
```

**Common Use Cases:**
- Spam prevention
- Role-based limits
- Reputation systems
- Quality control
- Space-specific rules

---

## Best Practices

### 1. Gradual Restrictions

```php
// Don't immediately block - gradually increase restrictions
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    $violations = get_user_rate_limit_violations($user->ID);
    
    if ($violations > 5) {
        return 1; // Severe restriction
    } elseif ($violations > 2) {
        return 2; // Moderate restriction
    }
    
    return 5; // Normal limit
}, 10, 2);
```

### 2. Clear User Communication

```php
add_filter('fluent_community/rate_limit/comments_per_minute', function($limit, $user) {
    // Store the limit for frontend display
    add_filter('fluent_community/rate_limit_message', function() use ($limit) {
        return sprintf('You can post up to %d comments per minute.', $limit);
    });
    
    return $limit;
}, 10, 2);
```

### 3. Whitelist Trusted Users

```php
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    $trusted_users = get_option('trusted_user_ids', []);
    
    if (in_array($user->ID, $trusted_users)) {
        return 999; // Effectively no limit
    }
    
    return $limit;
}, 10, 2);
```

### 4. Monitor and Adjust

```php
add_filter('fluent_community/rate_limit/comments_per_minute', function($limit, $user) {
    // Log rate limit hits for analysis
    if (is_user_at_rate_limit($user->ID)) {
        log_rate_limit_hit($user->ID, 'comments', $limit);
    }
    
    return $limit;
}, 10, 2);
```

---

## Common Patterns

### Dynamic Limits Based on Server Load

```php
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    $server_load = sys_getloadavg()[0];
    
    // Reduce limits during high server load
    if ($server_load > 4.0) {
        return max(1, floor($limit / 2));
    } elseif ($server_load > 2.0) {
        return max(2, floor($limit * 0.75));
    }
    
    return $limit;
}, 10, 2);
```

### Temporary Limit Increases

```php
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    // Check for temporary boost
    $boost = get_user_meta($user->ID, 'rate_limit_boost', true);
    
    if ($boost && $boost['expires'] > time()) {
        return $limit * $boost['multiplier'];
    }
    
    return $limit;
}, 10, 2);
```

### Event-Based Adjustments

```php
add_filter('fluent_community/rate_limit/comments_per_minute', function($limit, $user) {
    // Check if there's a live event happening
    $active_event = get_active_community_event();
    
    if ($active_event) {
        // Increase limits during live events
        return $limit * 2;
    }
    
    return $limit;
}, 10, 2);
```

### Combine Multiple Factors

```php
add_filter('fluent_community/rate_limit/posts_per_5_minutes', function($limit, $user) {
    $base_limit = 3;
    
    // Factor 1: Reputation
    $reputation = get_user_reputation($user->ID);
    $reputation_multiplier = min(3, 1 + ($reputation / 1000));
    
    // Factor 2: Account age
    $account_age_days = (time() - strtotime($user->user_registered)) / DAY_IN_SECONDS;
    $age_multiplier = min(2, 1 + ($account_age_days / 365));
    
    // Factor 3: Quality score
    $quality_score = get_user_content_quality_score($user->ID);
    $quality_multiplier = 0.5 + ($quality_score * 1.5);
    
    // Calculate final limit
    $calculated_limit = $base_limit * $reputation_multiplier * $age_multiplier * $quality_multiplier;
    
    return max(1, min(20, round($calculated_limit)));
}, 10, 2);
```

---

## Related Documentation

- [Authentication Filters](/hooks/filters/authentication)
- [Permissions Filters](/hooks/filters/permissions)
- [Settings Filters](/hooks/filters/settings)
- [Code Snippets](/guides/code-snippets)

