---
prev:
  text: 'Action Hooks Overview'
  link: '/hooks/actions'
next:
  text: 'Comments'
  link: '/hooks/actions/comments'
---

# Feeds & Posts Actions

## Feed Lifecycle

### fluent_community/feed/created

Fires immediately after a new feed is created and saved to the database.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The newly created feed with all properties and relationships loaded |

**Feed Object Properties:**
- `id` (int) - Feed ID
- `user_id` (int) - Author user ID
- `space_id` (int|null) - Space ID if posted in a space
- `type` (string) - Feed type: 'feed', 'article', 'video', etc.
- `status` (string) - 'published', 'draft', 'pending', 'scheduled'
- `title` (string|null) - Feed title (for articles)
- `message` (string) - Feed content/message
- `message_rendered` (string) - Rendered HTML content
- `slug` (string|null) - URL slug
- `meta` (array) - Additional metadata
- `privacy` (string) - 'public', 'private', 'members_only'
- `created_at` (string) - Creation timestamp
- `updated_at` (string) - Last update timestamp

**Source Files:**
- `app/Http/Controllers/FeedsController.php:472`
- `app/Services/FeedsHelper.php:486`

**Example Usage:**

```php
// Send notification to admins when a feed is created
add_action('fluent_community/feed/created', function($feed) {
    $author = get_user_by('id', $feed->user_id);
    
    // Notify admins
    $admins = get_users(['role' => 'administrator']);
    foreach ($admins as $admin) {
        wp_mail(
            $admin->user_email,
            'New Post Created',
            sprintf(
                '%s created a new post: %s',
                $author->display_name,
                wp_trim_words($feed->message, 20)
            )
        );
    }
}, 10, 1);

// Award points for creating a post
add_action('fluent_community/feed/created', function($feed) {
    $points = get_user_meta($feed->user_id, 'community_points', true) ?: 0;
    update_user_meta($feed->user_id, 'community_points', $points + 10);
}, 10, 1);

// Log to external analytics
add_action('fluent_community/feed/created', function($feed) {
    wp_remote_post('https://analytics.example.com/events', [
        'body' => json_encode([
            'event' => 'post_created',
            'user_id' => $feed->user_id,
            'post_type' => $feed->type,
            'space_id' => $feed->space_id
        ])
    ]);
}, 10, 1);
```

**Common Use Cases:**
- Send notifications to followers or space members
- Award gamification points
- Sync with external systems (CRM, analytics)
- Trigger automated workflows
- Log activity for reporting

---

### fluent_community/feed/updated

Fires after a feed is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The updated feed object with new values |
| `$dirty` | array | Array of changed fields with old values |

**Dirty Array Format:**
```php
[
    'message' => 'old message content',
    'title' => 'old title',
    'status' => 'draft'
]
```

**Source Files:**
- `app/Http/Controllers/FeedsController.php:640`
- `app/Http/Controllers/FeedsController.php:697`

**Example Usage:**

```php
// Log what changed in the feed
add_action('fluent_community/feed/updated', function($feed, $dirty) {
    if (isset($dirty['status'])) {
        error_log(sprintf(
            'Feed %d status changed from %s to %s',
            $feed->id,
            $dirty['status'],
            $feed->status
        ));
    }
}, 10, 2);

// Notify followers when post is significantly updated
add_action('fluent_community/feed/updated', function($feed, $dirty) {
    // Only notify if message changed
    if (isset($dirty['message'])) {
        // Get followers and notify them
        $followers = get_user_followers($feed->user_id);
        foreach ($followers as $follower_id) {
            // Send notification
            do_action('fluent_community/send_notification', $follower_id, [
                'type' => 'post_updated',
                'feed_id' => $feed->id
            ]);
        }
    }
}, 10, 2);

// Track edit history
add_action('fluent_community/feed/updated', function($feed, $dirty) {
    global $wpdb;
    
    $wpdb->insert($wpdb->prefix . 'feed_edit_history', [
        'feed_id' => $feed->id,
        'user_id' => get_current_user_id(),
        'changes' => json_encode($dirty),
        'created_at' => current_time('mysql')
    ]);
}, 10, 2);
```

---

### fluent_community/feed/before_deleted

Fires before a feed is deleted from the database.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The feed about to be deleted |

**Source Files:**
- `app/Http/Controllers/FeedsController.php:799`

**Example Usage:**

```php
// Backup feed before deletion
add_action('fluent_community/feed/before_deleted', function($feed) {
    global $wpdb;
    
    $wpdb->insert($wpdb->prefix . 'deleted_feeds_backup', [
        'feed_id' => $feed->id,
        'user_id' => $feed->user_id,
        'content' => json_encode($feed->toArray()),
        'deleted_at' => current_time('mysql'),
        'deleted_by' => get_current_user_id()
    ]);
}, 10, 1);

// Notify author before deletion
add_action('fluent_community/feed/before_deleted', function($feed) {
    $author = get_user_by('id', $feed->user_id);
    
    wp_mail(
        $author->user_email,
        'Your post is being deleted',
        sprintf('Your post "%s" is being deleted.', $feed->title ?: 'Untitled')
    );
}, 10, 1);
```

---

### fluent_community/feed/deleted

Fires after a feed has been deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The deleted feed object (no longer in database) |

**Source Files:**
- `app/Http/Controllers/FeedsController.php:802`

**Example Usage:**

```php
// Clean up related data
add_action('fluent_community/feed/deleted', function($feed) {
    // Delete custom metadata
    delete_metadata('feed', $feed->id, '', '', true);
    
    // Clean up external references
    wp_remote_post('https://api.example.com/feeds/' . $feed->id . '/delete', [
        'method' => 'DELETE'
    ]);
}, 10, 1);

// Update user statistics
add_action('fluent_community/feed/deleted', function($feed) {
    $count = get_user_meta($feed->user_id, 'post_count', true) ?: 0;
    update_user_meta($feed->user_id, 'post_count', max(0, $count - 1));
}, 10, 1);
```

---

### fluent_community/feed/scheduled

Fires when a feed is scheduled for future publication.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The scheduled feed object |

**Source Files:**
- `app/Http/Controllers/FeedsController.php:454`

**Example Usage:**

```php
// Log scheduled posts
add_action('fluent_community/feed/scheduled', function($feed) {
    error_log(sprintf(
        'Feed %d scheduled for %s',
        $feed->id,
        $feed->scheduled_at
    ));
}, 10, 1);

// Notify author
add_action('fluent_community/feed/scheduled', function($feed) {
    $author = get_user_by('id', $feed->user_id);
    
    wp_mail(
        $author->user_email,
        'Post Scheduled',
        sprintf(
            'Your post has been scheduled for publication on %s',
            date('F j, Y g:i a', strtotime($feed->scheduled_at))
        )
    );
}, 10, 1);
```

---

### fluent_community/feed/rescheduled

Fires when a scheduled feed's publication time is changed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The rescheduled feed object |

**Example Usage:**

```php
add_action('fluent_community/feed/rescheduled', function($feed) {
    // Log the reschedule
    error_log(sprintf(
        'Feed %d rescheduled to %s',
        $feed->id,
        $feed->scheduled_at
    ));
}, 10, 1);
```

---

### fluent_community/feed/react_added

Fires when a reaction is added to a feed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$reaction` | Reaction Object | The reaction that was added |
| `$feed` | Feed Object | The feed that received the reaction |

**Reaction Object Properties:**
- `id` (int) - Reaction ID
- `user_id` (int) - User who reacted
- `object_id` (int) - Feed ID
- `object_type` (string) - Object type ('feed')
- `type` (string) - Reaction type ('like', 'love', 'celebrate', etc.)
- `created_at` (string) - Reaction timestamp

**Source Files:**
- `app/Http/Controllers/FeedsController.php`

**Example Usage:**

```php
// Award points for receiving reactions
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    // Award points to feed author
    $points = get_user_meta($feed->user_id, 'community_points', true) ?: 0;
    update_user_meta($feed->user_id, 'community_points', $points + 5);

    // Log the reaction
    error_log(sprintf(
        'User %d reacted with %s to feed %d',
        $reaction->user_id,
        $reaction->type,
        $feed->id
    ));
}, 10, 2);

// Send notification to feed author
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    // Don't notify if user reacted to their own post
    if ($reaction->user_id === $feed->user_id) {
        return;
    }

    $reactor = get_user_by('id', $reaction->user_id);
    $author = get_user_by('id', $feed->user_id);

    wp_mail(
        $author->user_email,
        'Someone reacted to your post',
        sprintf(
            '%s reacted with %s to your post: %s',
            $reactor->display_name,
            $reaction->type,
            wp_trim_words($feed->message, 20)
        )
    );
}, 10, 2);

// Track reaction analytics
add_action('fluent_community/feed/react_added', function($reaction, $feed) {
    // Send to analytics service
    wp_remote_post('https://analytics.example.com/events', [
        'body' => json_encode([
            'event' => 'feed_reaction',
            'reaction_type' => $reaction->type,
            'feed_id' => $feed->id,
            'feed_type' => $feed->type,
            'user_id' => $reaction->user_id
        ])
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Award gamification points to feed author
- Send notifications to feed author
- Track engagement analytics
- Trigger automated workflows based on reaction types
- Update user reputation scores
- Create activity logs

---

## Dynamic Actions

### fluent_community/feed/new_feed_

**Dynamic Action** - Fires when a feed is created, with the feed type appended to the hook name.

**Hook Pattern:** `fluent_community/feed/new_feed_{type}`

**Dynamic Values:**
- `fluent_community/feed/new_feed_post` - Regular feed post
- `fluent_community/feed/new_feed_article` - Article post
- `fluent_community/feed/new_feed_video` - Video post
- `fluent_community/feed/new_feed_audio` - Audio post
- `fluent_community/feed/new_feed_event` - Event post
- `fluent_community/feed/new_feed_poll` - Poll post

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The newly created feed |
| `$data` | array | Feed creation data |

**Source Files:**
- `app/Http/Controllers/FeedsController.php`

**Example Usage:**

```php
// Handle article posts specifically
add_action('fluent_community/feed/new_feed_article', function($feed, $data) {
    // Add to article index
    update_option('latest_articles', array_merge(
        get_option('latest_articles', []),
        [$feed->id]
    ));

    // Send to article RSS feed
    update_article_rss_feed($feed);
}, 10, 2);

// Handle video posts
add_action('fluent_community/feed/new_feed_video', function($feed, $data) {
    // Process video thumbnail
    generate_video_thumbnail($feed);

    // Add to video gallery
    add_to_video_gallery($feed);
}, 10, 2);

// Handle poll posts
add_action('fluent_community/feed/new_feed_poll', function($feed, $data) {
    // Initialize poll tracking
    init_poll_tracking($feed->id);
}, 10, 2);
```

**Common Use Cases:**
- Type-specific content processing
- Custom notifications per content type
- Analytics tracking by type
- Type-specific integrations

---

### fluent_community/feed/just_created_type_

**Dynamic Action** - Fires immediately after a feed of a specific type is created (before other processing).

**Hook Pattern:** `fluent_community/feed/just_created_type_{type}`

**Dynamic Values:**
- `fluent_community/feed/just_created_type_post` - Regular feed post
- `fluent_community/feed/just_created_type_article` - Article post
- `fluent_community/feed/just_created_type_video` - Video post
- `fluent_community/feed/just_created_type_audio` - Audio post
- `fluent_community/feed/just_created_type_event` - Event post

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The newly created feed |
| `$data` | array | Original request data |

**Source Files:**
- `app/Http/Controllers/FeedsController.php`

**Example Usage:**

```php
// Early processing for articles
add_action('fluent_community/feed/just_created_type_article', function($feed, $data) {
    // Extract and save article metadata early
    if (isset($data['reading_time'])) {
        update_post_meta($feed->id, 'reading_time', $data['reading_time']);
    }
}, 10, 2);

// Early video processing
add_action('fluent_community/feed/just_created_type_video', function($feed, $data) {
    // Queue video processing job
    queue_video_processing_job($feed->id);
}, 10, 2);
```

**Common Use Cases:**
- Early content processing
- Queue background jobs
- Set initial metadata
- Trigger immediate workflows

---

### fluent_community/feed/updating_content_type_old_

**Dynamic Action** - Fires when a feed's content type is being changed, with the old type appended.

**Hook Pattern:** `fluent_community/feed/updating_content_type_old_{old_type}`

**Dynamic Values:**
- `fluent_community/feed/updating_content_type_old_post`
- `fluent_community/feed/updating_content_type_old_article`
- `fluent_community/feed/updating_content_type_old_video`
- `fluent_community/feed/updating_content_type_old_audio`

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The feed before update |
| `$data` | array | Update request data |

**Source Files:**
- `app/Http/Controllers/FeedsController.php`

**Example Usage:**

```php
// Clean up when converting from video
add_action('fluent_community/feed/updating_content_type_old_video', function($feed, $data) {
    // Get new type from data
    $newType = $data['type'] ?? null;

    if ($newType && $newType !== 'video') {
        // Remove video-specific metadata
        delete_post_meta($feed->id, 'video_url');
        delete_post_meta($feed->id, 'video_thumbnail');
        delete_post_meta($feed->id, 'video_duration');

        // Cancel any pending video processing
        cancel_video_processing($feed->id);
    }
}, 10, 2);

// Clean up when converting from article
add_action('fluent_community/feed/updating_content_type_old_article', function($feed, $data) {
    $newType = $data['type'] ?? null;

    if ($newType && $newType !== 'article') {
        // Remove article-specific metadata
        delete_post_meta($feed->id, 'reading_time');
        delete_post_meta($feed->id, 'article_category');
    }
}, 10, 2);
```

**Common Use Cases:**
- Clean up type-specific metadata
- Cancel type-specific background jobs
- Update indexes when type changes
- Log content type conversions

---

## Space-Specific Actions

### fluent_community/space_feed/created

Fires when a feed is created within a space.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The feed created in the space |

**Example Usage:**

```php
add_action('fluent_community/space_feed/created', function($feed) {
    // Notify space members
    $space_members = get_space_members($feed->space_id);
    
    foreach ($space_members as $member) {
        // Send notification
    }
}, 10, 1);
```

---

### fluent_community/space_feed/updated

Fires when a space feed is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The updated space feed |

---

### fluent_community/profile_feed/created

Fires when a feed is created on a user's profile.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The profile feed |

---

## Media & Interaction Actions

### fluent_community/feed/media_deleted

Fires when media is deleted from a feed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$media` | Media Object | The deleted media object |
| `$feed` | Feed Object | The parent feed |

**Example Usage:**

```php
add_action('fluent_community/feed/media_deleted', function($media, $feed) {
    // Clean up CDN cache
    purge_cdn_cache($media->url);
}, 10, 2);
```

---

### fluent_community/feed/cast_survey_vote

Fires when a user votes in a survey/poll feed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$vote` | array | Vote data including option_id and user_id |
| `$feed` | Feed Object | The survey feed |

**Example Usage:**

```php
add_action('fluent_community/feed/cast_survey_vote', function($vote, $feed) {
    // Award points for participation
    $points = get_user_meta($vote['user_id'], 'community_points', true) ?: 0;
    update_user_meta($vote['user_id'], 'community_points', $points + 2);
}, 10, 2);
```

---

## Mentions & Notifications

### fluent_community/feed_mentioned

Fires when users are mentioned in a feed.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The feed containing mentions |
| `$mentionedUsers` | array | Array of mentioned user IDs |

**Source Files:**
- `app/Http/Controllers/FeedsController.php:430`
- `app/Services/FeedsHelper.php:474`

**Example Usage:**

```php
add_action('fluent_community/feed_mentioned', function($feed, $mentionedUsers) {
    foreach ($mentionedUsers as $userId) {
        // Send custom notification
        wp_mail(
            get_user_by('id', $userId)->user_email,
            'You were mentioned',
            sprintf('You were mentioned in a post by %s', get_user_by('id', $feed->user_id)->display_name)
        );
    }
}, 10, 2);
```

---

### fluent_community/feed_mentioned_user_ids

Fires with the list of mentioned user IDs.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userIds` | array | Array of mentioned user IDs |
| `$feed` | Feed Object | The feed object |

**Source Files:**
- `app/Services/FeedsHelper.php`

**Example Usage:**

```php
// Send custom notifications to mentioned users
add_action('fluent_community/feed_mentioned_user_ids', function($userIds, $feed) {
    foreach ($userIds as $userId) {
        $user = get_user_by('id', $userId);

        // Send custom email notification
        wp_mail(
            $user->user_email,
            'You were mentioned in a post',
            sprintf(
                'You were mentioned in a post by %s',
                get_user_by('id', $feed->user_id)->display_name
            )
        );
    }
}, 10, 2);

// Award points to mentioned users
add_action('fluent_community/feed_mentioned_user_ids', function($userIds, $feed) {
    foreach ($userIds as $userId) {
        $points = get_user_meta($userId, 'community_points', true) ?: 0;
        update_user_meta($userId, 'community_points', $points + 2);
    }
}, 10, 2);
```

**Common Use Cases:**
- Send custom mention notifications
- Award points to mentioned users
- Track mention analytics
- Trigger workflows for mentioned users

---

### fluent_community/profile_feed/created

Fires when a feed is created on a user's profile.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The newly created profile feed |

**Source Files:**
- `app/Http/Controllers/FeedsController.php:498`

**Example Usage:**

```php
// Notify profile owner about new post on their profile
add_action('fluent_community/profile_feed/created', function($feed) {
    // Get profile owner from feed metadata or space
    $profile_owner_id = get_profile_owner_from_feed($feed);

    // Don't notify if user posted on their own profile
    if ($profile_owner_id === $feed->user_id) {
        return;
    }

    $profile_owner = get_user_by('id', $profile_owner_id);
    $author = get_user_by('id', $feed->user_id);

    wp_mail(
        $profile_owner->user_email,
        'New post on your profile',
        sprintf(
            '%s posted on your profile: %s',
            $author->display_name,
            wp_trim_words($feed->message, 20)
        )
    );
}, 10, 1);

// Log profile feed creation
add_action('fluent_community/profile_feed/created', function($feed) {
    error_log(sprintf(
        'Profile feed created: Feed ID %d by User %d',
        $feed->id,
        $feed->user_id
    ));
}, 10, 1);

// Track profile engagement
add_action('fluent_community/profile_feed/created', function($feed) {
    $profile_owner_id = get_profile_owner_from_feed($feed);

    $engagement_count = get_user_meta($profile_owner_id, 'profile_posts_count', true) ?: 0;
    update_user_meta($profile_owner_id, 'profile_posts_count', $engagement_count + 1);
}, 10, 1);
```

**Common Use Cases:**
- Notify profile owner of new posts
- Track profile engagement metrics
- Moderate profile posts
- Award points for profile interactions

---

```php
add_action('fluent_community/feeds_query', function(&$feedsQuery, $requestParams, $queryArgs) {
    // Only show feeds from verified users
    $feedsQuery->whereHas('user', function($q) {
        $q->where('verified', 1);
    });
}, 10, 3);
```

---

## Rate Limiting

### fluent_community/check_rate_limit/create_post

Fires to check rate limits before creating a post.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userId` | int | User ID attempting to create post |

**Example Usage:**

```php
add_action('fluent_community/check_rate_limit/create_post', function($userId) {
    // Custom rate limiting logic
    $recent_posts = count_user_posts_last_hour($userId);
    
    if ($recent_posts > 10) {
        wp_send_json_error([
            'message' => 'You are posting too frequently. Please wait.'
        ], 429);
    }
}, 10, 1);
```

---

## Scheduling Actions

### fluent_community/feed/scheduling_everyone_tag

Fires when scheduling a feed with @everyone tag.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The scheduled feed |

---

## Dynamic Feed Hooks

The following dynamic hooks fire based on feed context:

### fluent_community/feed/new_feed_`{type}`

Fires when a new feed of a specific type is created. Replace `{type}` with the feed type (e.g., `post`, `video`, `poll`).

**Example:**
```php
add_action('fluent_community/feed/new_feed_video', function($feed) {
    // Handle video feed specifically
    error_log('New video feed: ' . $feed->id);
}, 10, 1);
```

---

### fluent_community/feed/just_created_type_`{type}`

Fires immediately after a feed of a specific type is created.

---

### fluent_community/feed/updating_content_type_old_`{oldType}`

Fires when updating a feed's content type from an old type.

---

## See Also

- [Feed Filters](/hooks/filters/feeds) - Modify feed data
- [Comment Actions](/hooks/actions/comments) - Comment-related actions
- [Space Actions](/hooks/actions/spaces) - Space-related actions
- [Examples](/hooks/examples) - Real-world examples

