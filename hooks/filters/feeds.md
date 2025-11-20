---
prev:
  text: 'Filter Hooks Overview'
  link: '/hooks/filters'
next:
  text: 'Comments'
  link: '/hooks/filters/comments'
---

# Feeds & Posts Filters

## Feed Creation & Updates

### fluent_community/feed/new_feed_data

Modify feed data before a new feed is created.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Feed data to be inserted |
| `$requestData` | array | Original request data from user |

**Input Data Structure:**
```php
[
    'user_id' => 123,
    'space_id' => 456, // or null
    'type' => 'feed', // 'feed', 'article', 'video', etc.
    'status' => 'published',
    'title' => 'Post title',
    'message' => 'Post content',
    'slug' => 'post-slug',
    'privacy' => 'public',
    'meta' => []
]
```

**Return Value:** Modified array or `WP_Error` for validation errors

**Example Usage:**

```php
// Add custom metadata
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $data['meta']['source'] = 'web';
    $data['meta']['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
    $data['meta']['ip_address'] = $_SERVER['REMOTE_ADDR'];
    
    return $data;
}, 10, 2);

// Validate required fields
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    // Require title for articles
    if ($data['type'] === 'article' && empty($data['title'])) {
        return new WP_Error(
            'missing_title',
            'Articles must have a title',
            ['status' => 400]
        );
    }
    
    return $data;
}, 10, 2);

// Enforce minimum content length
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $message = strip_tags($data['message']);
    
    if (strlen($message) < 50) {
        return new WP_Error(
            'content_too_short',
            'Post must be at least 50 characters long',
            ['status' => 400]
        );
    }
    
    return $data;
}, 10, 2);

// Auto-tag posts
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    // Extract hashtags from message
    preg_match_all('/#(\w+)/', $data['message'], $matches);
    
    if (!empty($matches[1])) {
        $data['meta']['hashtags'] = $matches[1];
    }
    
    return $data;
}, 10, 2);

// Moderate new user posts
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    $user = get_user_by('id', $data['user_id']);
    $registered = strtotime($user->user_registered);
    $days_since_registration = (time() - $registered) / DAY_IN_SECONDS;
    
    // Hold posts from users registered less than 7 days ago
    if ($days_since_registration < 7) {
        $data['status'] = 'pending';
    }
    
    return $data;
}, 10, 2);
```

**Common Use Cases:**
- Add custom metadata
- Validate content
- Enforce content policies
- Auto-moderate content
- Extract and store hashtags
- Set default values

---

### fluent_community/feed/update_feed_data

Modify feed data before an existing feed is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Update data |
| `$existingFeed` | Feed Object | Current feed object |
| `$requestData` | array | Original request data |

**Return Value:** Modified array or `WP_Error`

**Example Usage:**

```php
// Prevent changing feed type
add_filter('fluent_community/feed/update_feed_data', function($data, $existingFeed, $requestData) {
    if (isset($data['type']) && $data['type'] !== $existingFeed->type) {
        return new WP_Error(
            'cannot_change_type',
            'Cannot change feed type after creation',
            ['status' => 400]
        );
    }
    
    return $data;
}, 10, 3);

// Track edit count
add_filter('fluent_community/feed/update_feed_data', function($data, $existingFeed, $requestData) {
    $edit_count = $existingFeed->meta['edit_count'] ?? 0;
    
    if (!isset($data['meta'])) {
        $data['meta'] = $existingFeed->meta;
    }
    
    $data['meta']['edit_count'] = $edit_count + 1;
    $data['meta']['last_edited_at'] = current_time('mysql');
    
    return $data;
}, 10, 3);
```

---

### fluent_community/feed/update_data

Alternative filter for feed updates (legacy).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Update data |
| `$feed` | Feed Object | Existing feed |

**Return Value:** Modified array

---

## Dynamic Type Filters

### fluent_community/feed/new_feed_data_type_{type}

Modify feed data for specific feed types during creation.

**Dynamic Values:**
- `new_feed_data_type_feed` - Regular posts
- `new_feed_data_type_article` - Article posts
- `new_feed_data_type_video` - Video posts
- `new_feed_data_type_audio` - Audio posts
- `new_feed_data_type_event` - Event posts

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Feed data |
| `$requestData` | array | Request data |

**Example Usage:**

```php
// Article-specific validation
add_filter('fluent_community/feed/new_feed_data_type_article', function($data, $requestData) {
    // Require featured image for articles
    if (empty($data['meta']['featured_image'])) {
        return new WP_Error(
            'missing_featured_image',
            'Articles must have a featured image',
            ['status' => 400]
        );
    }
    
    // Require minimum word count
    $word_count = str_word_count(strip_tags($data['message']));
    if ($word_count < 300) {
        return new WP_Error(
            'article_too_short',
            'Articles must be at least 300 words',
            ['status' => 400]
        );
    }
    
    return $data;
}, 10, 2);

// Video-specific processing
add_filter('fluent_community/feed/new_feed_data_type_video', function($data, $requestData) {
    // Extract video URL
    if (!empty($data['meta']['video_url'])) {
        // Generate thumbnail
        $data['meta']['video_thumbnail'] = generate_video_thumbnail($data['meta']['video_url']);
        
        // Extract video duration
        $data['meta']['video_duration'] = get_video_duration($data['meta']['video_url']);
    }
    
    return $data;
}, 10, 2);

// Event-specific validation
add_filter('fluent_community/feed/new_feed_data_type_event', function($data, $requestData) {
    // Require event date
    if (empty($data['meta']['event_date'])) {
        return new WP_Error(
            'missing_event_date',
            'Events must have a date',
            ['status' => 400]
        );
    }
    
    // Validate date is in future
    if (strtotime($data['meta']['event_date']) < time()) {
        return new WP_Error(
            'past_event_date',
            'Event date must be in the future',
            ['status' => 400]
        );
    }
    
    return $data;
}, 10, 2);
```

---

### fluent_community/feed/update_feed_data_type_{type}

Modify feed data for specific types during updates.

**Dynamic Values:** Same as above

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Update data |
| `$existingFeed` | Feed Object | Current feed |
| `$requestData` | array | Request data |

---

## API Response Filters

### fluent_community/feed_api_response

Modify a single feed's API response before sending to client.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | array | Feed data array |

**Feed Response Structure:**
```php
[
    'id' => 123,
    'user_id' => 456,
    'type' => 'feed',
    'title' => 'Post title',
    'message' => 'Content',
    'message_rendered' => '<p>Content</p>',
    'created_at' => '2025-01-01 12:00:00',
    'user' => [...], // User object
    'space' => [...], // Space object if applicable
    'reactions' => [...],
    'comments_count' => 5
]
```

**Return Value:** Modified feed array

**Example Usage:**

```php
// Add custom computed fields
add_filter('fluent_community/feed_api_response', function($feed) {
    // Add read time
    $word_count = str_word_count(strip_tags($feed['message']));
    $feed['read_time_minutes'] = ceil($word_count / 200);
    
    // Add excerpt
    $feed['excerpt'] = wp_trim_words($feed['message'], 30);
    
    // Add custom metadata
    $feed['is_featured'] = get_post_meta($feed['id'], 'is_featured', true);
    
    return $feed;
}, 10, 1);

// Hide sensitive data from non-admins
add_filter('fluent_community/feed_api_response', function($feed) {
    $current_user = wp_get_current_user();
    
    if (!in_array('administrator', $current_user->roles)) {
        // Remove IP address from meta
        unset($feed['meta']['ip_address']);
        unset($feed['meta']['user_agent']);
    }
    
    return $feed;
}, 10, 1);

// Add engagement metrics
add_filter('fluent_community/feed_api_response', function($feed) {
    $feed['engagement_score'] = calculate_engagement_score($feed);
    $feed['trending'] = is_trending_post($feed['id']);
    
    return $feed;
}, 10, 1);
```

---

### fluent_community/feeds_api_response

Modify multiple feeds' API response (feed list).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feeds` | array | Array of feed arrays |

**Return Value:** Modified feeds array

**Example Usage:**

```php
// Add custom data to all feeds
add_filter('fluent_community/feeds_api_response', function($feeds) {
    return array_map(function($feed) {
        $feed['custom_field'] = get_custom_data($feed['id']);
        return $feed;
    }, $feeds);
}, 10, 1);

// Filter out certain feeds
add_filter('fluent_community/feeds_api_response', function($feeds) {
    // Remove feeds from blocked users
    $blocked_users = get_current_user_blocked_list();
    
    return array_filter($feeds, function($feed) use ($blocked_users) {
        return !in_array($feed['user_id'], $blocked_users);
    });
}, 10, 1);
```

---

## Configuration Filters

### fluent_community/feed_general_config

Modify general feed configuration.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$config` | array | Feed configuration array |

**Return Value:** Modified config array

**Example Usage:**

```php
add_filter('fluent_community/feed_general_config', function($config) {
    $config['allow_anonymous_posts'] = false;
    $config['require_approval'] = true;
    
    return $config;
}, 10, 1);
```

---

### fluent_community/max_post_length

Set maximum post length in characters.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$maxLength` | int | Maximum length (default: 10000) |

**Return Value:** Integer

**Example Usage:**

```php
// Increase max length for premium users
add_filter('fluent_community/max_post_length', function($maxLength) {
    $current_user = wp_get_current_user();
    
    if (in_array('premium_member', $current_user->roles)) {
        return 50000; // 50k characters for premium
    }
    
    return $maxLength; // 10k for regular users
}, 10, 1);

// Set different limits by feed type
add_filter('fluent_community/max_post_length', function($maxLength) {
    $feed_type = $_REQUEST['type'] ?? 'feed';
    
    $limits = [
        'feed' => 5000,
        'article' => 50000,
        'video' => 2000,
        'event' => 10000
    ];
    
    return $limits[$feed_type] ?? $maxLength;
}, 10, 1);
```

---

### fluent_community/max_media_per_post

Set maximum number of media files per post.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$maxMedia` | int | Maximum media count (default: 10) |

**Return Value:** Integer

**Example Usage:**

```php
// Limit media for regular users
add_filter('fluent_community/max_media_per_post', function($maxMedia) {
    $current_user = wp_get_current_user();
    
    if (in_array('premium_member', $current_user->roles)) {
        return 20; // Premium users can upload 20 files
    }
    
    return 5; // Regular users limited to 5
}, 10, 1);
```

---

### fluent_community/has_global_post

Determine if global posts are enabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$hasGlobal` | bool | Whether global posts are enabled |

**Return Value:** Boolean

**Example Usage:**

```php
add_filter('fluent_community/has_global_post', function($hasGlobal) {
    // Disable global posts for certain user roles
    $current_user = wp_get_current_user();
    
    if (in_array('restricted_user', $current_user->roles)) {
        return false;
    }
    
    return $hasGlobal;
}, 10, 1);
```

---

### fluent_community/has_post_title

Determine if post titles are enabled.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$hasTitle` | bool | Whether titles are enabled |

**Return Value:** Boolean

---

## Survey & Poll Filters

### fluent_community/feed/updated_survey_config

Modify survey/poll configuration after update.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$config` | array | Survey configuration |
| `$feed` | Feed Object | The survey feed |

**Return Value:** Modified config array

**Example Usage:**

```php
add_filter('fluent_community/feed/updated_survey_config', function($config, $feed) {
    // Add custom survey settings
    $config['allow_multiple_votes'] = false;
    $config['show_results_after_vote'] = true;
    
    return $config;
}, 10, 2);
```

---

## SEO & Metadata

### fluent_community/feed_ticker

Modify feed ticker/preview text.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$ticker` | string | Ticker text |
| `$feed` | Feed Object | The feed |

**Return Value:** Modified string

---

### fluent_community/feed_view_json_ld

Modify JSON-LD structured data for feed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$jsonLd` | array | JSON-LD data |
| `$feed` | Feed Object | The feed |

**Return Value:** Modified JSON-LD array

**Example Usage:**

```php
add_filter('fluent_community/feed_view_json_ld', function($jsonLd, $feed) {
    // Add custom schema.org properties
    $jsonLd['author'] = [
        '@type' => 'Person',
        'name' => $feed->user->display_name,
        'url' => get_author_posts_url($feed->user_id)
    ];
    
    return $jsonLd;
}, 10, 2);
```

---

## Best Practices

### 1. Always Return Correct Type

```php
// ✅ Correct
add_filter('fluent_community/max_post_length', function($maxLength) {
    return 5000; // Returns integer
}, 10, 1);

// ❌ Wrong
add_filter('fluent_community/max_post_length', function($maxLength) {
    return '5000'; // Returns string!
}, 10, 1);
```

### 2. Use WP_Error for Validation

```php
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    if (!is_valid($data)) {
        return new WP_Error('invalid_data', 'Validation failed', ['status' => 400]);
    }
    return $data;
}, 10, 2);
```

### 3. Preserve Existing Data

```php
add_filter('fluent_community/feed/new_feed_data', function($data, $requestData) {
    // Preserve existing meta
    if (!isset($data['meta'])) {
        $data['meta'] = [];
    }
    
    // Add to meta, don't replace
    $data['meta']['custom'] = 'value';
    
    return $data;
}, 10, 2);
```

---

### fluent_community/post_order_options ​

Filters available post ordering options.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$options` | array | Available ordering options |

**Return:** `array` - Modified options

**Example Usage:**

```php
// Add custom ordering options
add_filter('fluent_community/post_order_options', function($options) {
    $options['most_viewed'] = [
        'label' => 'Most Viewed',
        'order_by' => 'views_count',
        'order' => 'DESC'
    ];

    $options['trending'] = [
        'label' => 'Trending',
        'order_by' => 'engagement_score',
        'order' => 'DESC'
    ];

    return $options;
});

// Remove ordering options
add_filter('fluent_community/post_order_options', function($options) {
    unset($options['oldest']);

    return $options;
});

// Customize labels
add_filter('fluent_community/post_order_options', function($options) {
    $options['latest']['label'] = 'Newest First';
    $options['popular']['label'] = 'Most Popular';

    return $options;
});
```

**Common Use Cases:**
- Custom sorting options
- Remove unwanted options
- Localize labels

---

## See Also

- [Feed Actions](/hooks/actions/feeds) - Feed lifecycle hooks
- [Comment Filters](/hooks/filters/comments) - Comment data filters
- [Examples](/hooks/examples) - Real-world examples

