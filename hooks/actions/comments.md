---
prev:
  text: 'Feeds & Posts'
  link: '/hooks/actions/feeds'
next:
  text: 'Spaces'
  link: '/hooks/actions/spaces'
---

<DocStatusBanner />

# Comments Actions

## Comment Lifecycle

### fluent_community/before_comment_create

Fires before a comment is created, allowing you to perform validation or preparation.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$data` | array | Comment data to be inserted |
| `$feed` | Feed Object | The parent feed object |

**Data Array Structure:**
```php
[
    'user_id' => 123,
    'post_id' => 456,
    'message' => 'Comment text',
    'parent_id' => null, // or parent comment ID
    'type' => 'comment',
    'status' => 'published'
]
```

**Example Usage:**

```php
// Validate comment before creation
add_action('fluent_community/before_comment_create', function($data, $feed) {
    // Check if user is allowed to comment
    if (!user_can_comment($data['user_id'], $feed)) {
        wp_send_json_error(['message' => 'You cannot comment on this post'], 403);
    }
    
    // Check for spam
    if (is_spam_content($data['message'])) {
        wp_send_json_error(['message' => 'Comment flagged as spam'], 403);
    }
}, 10, 2);

// Log comment attempts
add_action('fluent_community/before_comment_create', function($data, $feed) {
    error_log(sprintf(
        'User %d attempting to comment on feed %d',
        $data['user_id'],
        $feed->id
    ));
}, 10, 2);
```

**Common Use Cases:**
- Validate user permissions
- Check for spam or inappropriate content
- Enforce rate limiting
- Log comment attempts
- Prepare data before insertion

---

### fluent_community/comment_added

Fires immediately after a comment is successfully created and saved.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comment` | Comment Object | The newly created comment |
| `$feed` | Feed Object | The parent feed object |

**Comment Object Properties:**
- `id` (int) - Comment ID
- `user_id` (int) - Commenter user ID
- `post_id` (int) - Parent feed ID
- `parent_id` (int|null) - Parent comment ID for replies
- `message` (string) - Comment content
- `message_rendered` (string) - Rendered HTML content
- `type` (string) - Comment type
- `status` (string) - 'published', 'pending', 'spam'
- `meta` (array) - Additional metadata
- `created_at` (string) - Creation timestamp
- `updated_at` (string) - Last update timestamp

**Example Usage:**

```php
// Notify post author of new comment
add_action('fluent_community/comment_added', function($comment, $feed) {
    // Don't notify if author comments on own post
    if ($comment->user_id === $feed->user_id) {
        return;
    }
    
    $author = get_user_by('id', $feed->user_id);
    $commenter = get_user_by('id', $comment->user_id);
    
    wp_mail(
        $author->user_email,
        'New comment on your post',
        sprintf(
            '%s commented on your post: %s',
            $commenter->display_name,
            wp_trim_words($comment->message, 20)
        )
    );
}, 10, 2);

// Award points for commenting
add_action('fluent_community/comment_added', function($comment, $feed) {
    $points = get_user_meta($comment->user_id, 'community_points', true) ?: 0;
    update_user_meta($comment->user_id, 'community_points', $points + 5);
}, 10, 2);

// Update comment count
add_action('fluent_community/comment_added', function($comment, $feed) {
    $count = get_user_meta($comment->user_id, 'total_comments', true) ?: 0;
    update_user_meta($comment->user_id, 'total_comments', $count + 1);
}, 10, 2);

// Sync to external system
add_action('fluent_community/comment_added', function($comment, $feed) {
    wp_remote_post('https://api.example.com/comments', [
        'body' => json_encode([
            'comment_id' => $comment->id,
            'user_id' => $comment->user_id,
            'post_id' => $feed->id,
            'content' => $comment->message
        ])
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Send notifications to post author
- Award gamification points
- Update user statistics
- Sync with external systems
- Trigger automated workflows
- Log activity for analytics

---

### fluent_community/comment_updated

Fires after a comment is updated.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comment` | Comment Object | The updated comment |
| `$feed` | Feed Object | The parent feed object |
| `$oldComment` | Comment Object | The comment before update |

**Example Usage:**

```php
// Log comment edits
add_action('fluent_community/comment_updated', function($comment, $feed, $oldComment) {
    if ($comment->message !== $oldComment->message) {
        error_log(sprintf(
            'Comment %d edited by user %d',
            $comment->id,
            get_current_user_id()
        ));
    }
}, 10, 3);

// Track edit history
add_action('fluent_community/comment_updated', function($comment, $feed, $oldComment) {
    global $wpdb;
    
    $wpdb->insert($wpdb->prefix . 'comment_edit_history', [
        'comment_id' => $comment->id,
        'old_message' => $oldComment->message,
        'new_message' => $comment->message,
        'edited_by' => get_current_user_id(),
        'edited_at' => current_time('mysql')
    ]);
}, 10, 3);

// Notify if comment was marked as spam
add_action('fluent_community/comment_updated', function($comment, $feed, $oldComment) {
    if ($comment->status === 'spam' && $oldComment->status !== 'spam') {
        // Notify moderators
        notify_moderators_of_spam($comment);
    }
}, 10, 3);
```

**Common Use Cases:**
- Track edit history
- Log status changes
- Notify moderators of spam
- Update search indexes
- Sync changes to external systems

---

### fluent_community/before_comment_delete

Fires before a comment is deleted from the database.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comment` | Comment Object | The comment about to be deleted |
| `$feed` | Feed Object | The parent feed object |

**Example Usage:**

```php
// Backup comment before deletion
add_action('fluent_community/before_comment_delete', function($comment, $feed) {
    global $wpdb;
    
    $wpdb->insert($wpdb->prefix . 'deleted_comments_backup', [
        'comment_id' => $comment->id,
        'user_id' => $comment->user_id,
        'post_id' => $feed->id,
        'content' => json_encode($comment->toArray()),
        'deleted_at' => current_time('mysql'),
        'deleted_by' => get_current_user_id()
    ]);
}, 10, 2);

// Check if deletion is allowed
add_action('fluent_community/before_comment_delete', function($comment, $feed) {
    // Prevent deletion of comments older than 30 days
    $created = strtotime($comment->created_at);
    $days_old = (time() - $created) / DAY_IN_SECONDS;
    
    if ($days_old > 30) {
        wp_send_json_error([
            'message' => 'Cannot delete comments older than 30 days'
        ], 403);
    }
}, 10, 2);
```

**Common Use Cases:**
- Backup comments before deletion
- Validate deletion permissions
- Clean up related data
- Log deletion attempts
- Notify relevant users

---

### fluent_community/comment_deleted

Fires after a comment has been deleted.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comment` | Comment Object | The deleted comment (no longer in database) |
| `$feed` | Feed Object | The parent feed object |

**Example Usage:**

```php
// Update user statistics
add_action('fluent_community/comment_deleted', function($comment, $feed) {
    $count = get_user_meta($comment->user_id, 'total_comments', true) ?: 0;
    update_user_meta($comment->user_id, 'total_comments', max(0, $count - 1));
}, 10, 2);

// Clean up related data
add_action('fluent_community/comment_deleted', function($comment, $feed) {
    // Delete comment reactions
    delete_comment_reactions($comment->id);
    
    // Delete comment metadata
    delete_metadata('comment', $comment->id, '', '', true);
}, 10, 2);

// Notify external system
add_action('fluent_community/comment_deleted', function($comment, $feed) {
    wp_remote_post('https://api.example.com/comments/' . $comment->id . '/delete', [
        'method' => 'DELETE'
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Update user statistics
- Clean up related data (reactions, metadata)
- Sync deletion to external systems
- Update feed comment counts
- Log deletion for audit trail

---

## Dynamic Actions

### fluent_community/comment_added_

**Dynamic Action** - Fires when a comment is added, with the feed type appended to the hook name.

**Hook Pattern:** `fluent_community/comment_added_{type}`

**Dynamic Values:**
- `fluent_community/comment_added_post` - Comment on regular feed post
- `fluent_community/comment_added_article` - Comment on article
- `fluent_community/comment_added_video` - Comment on video
- `fluent_community/comment_added_course` - Comment on course
- `fluent_community/comment_added_event` - Comment on event
- `fluent_community/comment_added_poll` - Comment on poll

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comment` | Comment Object | The new comment |
| `$feed` | Feed Object | The parent feed |

**Source Files:**
- `app/Http/Controllers/CommentsController.php:152`

**Example Usage:**

```php
// Handle article comments differently
add_action('fluent_community/comment_added_article', function($comment, $feed) {
    // Add to article discussion index
    update_post_meta($feed->id, 'has_active_discussion', true);

    // Notify article subscribers
    $subscribers = get_article_subscribers($feed->id);
    foreach ($subscribers as $subscriber) {
        send_notification($subscriber, [
            'type' => 'article_comment',
            'comment_id' => $comment->id,
            'feed_id' => $feed->id
        ]);
    }
}, 10, 2);

// Track video engagement
add_action('fluent_community/comment_added_video', function($comment, $feed) {
    // Log video engagement
    log_video_engagement($feed->id, 'comment', $comment->user_id);

    // Update video discussion metrics
    $comment_count = get_post_meta($feed->id, 'video_comments_count', true) ?: 0;
    update_post_meta($feed->id, 'video_comments_count', $comment_count + 1);
}, 10, 2);

// Course discussion notifications
add_action('fluent_community/comment_added_course', function($comment, $feed) {
    // Notify course instructor
    $course = get_course_from_feed($feed);
    $instructor = get_user_by('id', $course->created_by);

    wp_mail(
        $instructor->user_email,
        'New comment on your course',
        sprintf(
            '%s commented on your course: %s',
            get_user_by('id', $comment->user_id)->display_name,
            wp_trim_words($comment->message, 20)
        )
    );
}, 10, 2);
```

**Common Use Cases:**
- Type-specific notifications
- Different handling for different content types
- Track engagement by content type
- Apply type-specific rules
- Custom analytics per type

---

### fluent_community/comment_updated_

**Dynamic Action** - Fires when a comment is updated, with the feed type appended to the hook name.

**Hook Pattern:** `fluent_community/comment_updated_{type}`

**Dynamic Values:**
- `fluent_community/comment_updated_post` - Comment on regular post updated
- `fluent_community/comment_updated_article` - Comment on article updated
- `fluent_community/comment_updated_video` - Comment on video updated
- `fluent_community/comment_updated_course` - Comment on course updated

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comment` | Comment Object | Updated comment |
| `$feed` | Feed Object | Parent feed |

**Source Files:**
- `app/Http/Controllers/CommentsController.php`

**Example Usage:**

```php
// Track article comment edits
add_action('fluent_community/comment_updated_article', function($comment, $feed) {
    // Log edit history
    $edit_history = get_comment_meta($comment->id, 'edit_history', true) ?: [];
    $edit_history[] = [
        'edited_at' => current_time('mysql'),
        'edited_by' => get_current_user_id()
    ];
    update_comment_meta($comment->id, 'edit_history', $edit_history);
}, 10, 2);

// Notify on video comment updates
add_action('fluent_community/comment_updated_video', function($comment, $feed) {
    // Notify video owner if comment was edited
    $video_owner = get_user_by('id', $feed->user_id);
    send_notification($video_owner->ID, [
        'type' => 'comment_edited',
        'comment_id' => $comment->id
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Track edit history by type
- Type-specific update notifications
- Validate updates based on content type
- Log changes for audit trail

---

### fluent_community/comment_deleted_

**Dynamic Action** - Fires when a comment is deleted, with the feed type appended to the hook name.

**Hook Pattern:** `fluent_community/comment_deleted_{type}`

**Dynamic Values:**
- `fluent_community/comment_deleted_post` - Comment on regular post deleted
- `fluent_community/comment_deleted_article` - Comment on article deleted
- `fluent_community/comment_deleted_video` - Comment on video deleted
- `fluent_community/comment_deleted_course` - Comment on course deleted

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$commentId` | integer | Deleted comment ID |
| `$feed` | Feed Object | Parent feed |

**Source Files:**
- `app/Http/Controllers/CommentsController.php`

**Example Usage:**

```php
// Clean up article comment metadata
add_action('fluent_community/comment_deleted_article', function($commentId, $feed) {
    // Remove from article discussion index
    $discussion_comments = get_post_meta($feed->id, 'discussion_comment_ids', true) ?: [];
    $discussion_comments = array_diff($discussion_comments, [$commentId]);
    update_post_meta($feed->id, 'discussion_comment_ids', $discussion_comments);
}, 10, 2);

// Track video comment deletions
add_action('fluent_community/comment_deleted_video', function($commentId, $feed) {
    // Update video engagement metrics
    $comment_count = get_post_meta($feed->id, 'video_comments_count', true) ?: 0;
    update_post_meta($feed->id, 'video_comments_count', max(0, $comment_count - 1));
}, 10, 2);
```

**Common Use Cases:**
- Clean up type-specific metadata
- Update content-specific counters
- Log deletions by type
- Trigger type-specific cleanup

---

### fluent_community/comment/new_comment_

**Dynamic Action** - Fires when a comment is created, with the comment status appended to the hook name.

**Hook Pattern:** `fluent_community/comment/new_comment_{status}`

**Dynamic Values:**
- `fluent_community/comment/new_comment_published` - Published comment
- `fluent_community/comment/new_comment_pending` - Pending moderation
- `fluent_community/comment/new_comment_spam` - Marked as spam
- `fluent_community/comment/new_comment_draft` - Draft comment

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comment` | Comment Object | The new comment |
| `$feed` | Feed Object | The parent feed |

**Source Files:**
- `app/Http/Controllers/CommentsController.php:145`

**Example Usage:**

```php
// Handle pending comments
add_action('fluent_community/comment/new_comment_pending', function($comment, $feed) {
    // Notify moderators
    $moderators = get_users(['role' => 'moderator']);

    foreach ($moderators as $moderator) {
        wp_mail(
            $moderator->user_email,
            'Comment Pending Moderation',
            sprintf(
                'A comment is waiting for moderation.\nComment ID: %d\nAuthor: %s\nContent: %s',
                $comment->id,
                get_user_by('id', $comment->user_id)->display_name,
                wp_trim_words($comment->message, 20)
            )
        );
    }
}, 10, 2);

// Log spam comments
add_action('fluent_community/comment/new_comment_spam', function($comment, $feed) {
    error_log(sprintf(
        'Spam comment detected: ID %d, User %d, Feed %d',
        $comment->id,
        $comment->user_id,
        $feed->id
    ));

    // Update user spam score
    $spam_count = get_user_meta($comment->user_id, 'spam_comments', true) ?: 0;
    update_user_meta($comment->user_id, 'spam_comments', $spam_count + 1);

    // Auto-ban if spam threshold reached
    if ($spam_count >= 5) {
        ban_user($comment->user_id);
    }
}, 10, 2);

// Track published comments
add_action('fluent_community/comment/new_comment_published', function($comment, $feed) {
    // Update user engagement score
    $engagement = get_user_meta($comment->user_id, 'engagement_score', true) ?: 0;
    update_user_meta($comment->user_id, 'engagement_score', $engagement + 5);
}, 10, 2);
```

**Common Use Cases:**
- Status-specific moderation workflows
- Spam detection and handling
- Auto-moderation rules
- Status-based notifications

---

## Media Actions

### fluent_community/comment/media_deleted

Fires when media is deleted from a comment.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$media` | Media Object | The deleted media |
| `$comment` | Comment Object | The parent comment |

**Example Usage:**

```php
add_action('fluent_community/comment/media_deleted', function($media, $comment) {
    // Clean up CDN cache
    purge_cdn_cache($media->url);
    
    // Log media deletion
    error_log(sprintf(
        'Media %d deleted from comment %d',
        $media->id,
        $comment->id
    ));
}, 10, 2);
```

---

## Rate Limiting

### fluent_community/check_rate_limit/create_comment

Fires to check rate limits before creating a comment.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$userId` | int | User ID attempting to comment |
| `$feedId` | int | Feed ID being commented on |

**Example Usage:**

```php
add_action('fluent_community/check_rate_limit/create_comment', function($userId, $feedId) {
    // Check how many comments user made in last hour
    global $wpdb;
    
    $recent_comments = $wpdb->get_var($wpdb->prepare(
        "SELECT COUNT(*) FROM {$wpdb->prefix}fcom_comments 
        WHERE user_id = %d 
        AND created_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)",
        $userId
    ));
    
    if ($recent_comments > 20) {
        wp_send_json_error([
            'message' => 'You are commenting too frequently. Please wait.'
        ], 429);
    }
}, 10, 2);

// Prevent spam on specific posts
add_action('fluent_community/check_rate_limit/create_comment', function($userId, $feedId) {
    // Check if user already commented on this post recently
    global $wpdb;
    
    $recent_comment = $wpdb->get_var($wpdb->prepare(
        "SELECT id FROM {$wpdb->prefix}fcom_comments 
        WHERE user_id = %d 
        AND post_id = %d
        AND created_at > DATE_SUB(NOW(), INTERVAL 5 MINUTE)",
        $userId,
        $feedId
    ));
    
    if ($recent_comment) {
        wp_send_json_error([
            'message' => 'Please wait before commenting again on this post.'
        ], 429);
    }
}, 10, 2);
```

**Common Use Cases:**
- Prevent comment spam
- Enforce time-based limits
- Implement custom rate limiting rules
- Protect against abuse
- Apply user-specific limits

---

## Best Practices

### 1. Always Check Data Exists

```php
add_action('fluent_community/comment_added', function($comment, $feed) {
    if (!$comment || !$feed || !isset($comment->id)) {
        return;
    }
    
    // Safe to proceed
}, 10, 2);
```

### 2. Handle Nested Comments

```php
add_action('fluent_community/comment_added', function($comment, $feed) {
    if ($comment->parent_id) {
        // This is a reply to another comment
        $parent_comment = get_comment($comment->parent_id);
        
        // Notify parent comment author
        notify_comment_reply($parent_comment, $comment);
    }
}, 10, 2);
```

### 3. Avoid Infinite Loops

```php
// ❌ Wrong - Can cause infinite loop
add_action('fluent_community/comment_added', function($comment, $feed) {
    // This will trigger the same hook again!
    create_comment($feed->id, 'Auto-reply');
}, 10, 2);

// ✅ Correct - Remove hook before action
add_action('fluent_community/comment_added', function($comment, $feed) {
    remove_action('fluent_community/comment_added', __FUNCTION__);
    
    // Now safe to create comment
    create_comment($feed->id, 'Auto-reply');
    
    // Re-add hook for future comments
    add_action('fluent_community/comment_added', __FUNCTION__, 10, 2);
}, 10, 2);
```

### 4. Use Appropriate Hooks

```php
// Use before_comment_create for validation
add_action('fluent_community/before_comment_create', function($data, $feed) {
    // Validate and potentially stop creation
    if (!is_valid($data)) {
        wp_send_json_error(['message' => 'Invalid data'], 400);
    }
}, 10, 2);

// Use comment_added for post-creation actions
add_action('fluent_community/comment_added', function($comment, $feed) {
    // Perform actions after successful creation
    send_notifications($comment);
}, 10, 2);
```

---

## See Also

- [Comment Filters](/hooks/filters/comments) - Modify comment data
- [Feed Actions](/hooks/actions/feeds) - Feed-related actions
- [Reaction Actions](/hooks/actions/reactions) - Reaction hooks
- [Examples](/hooks/examples) - Real-world examples

