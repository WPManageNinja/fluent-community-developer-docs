---
prev:
  text: 'Authentication'
  link: '/hooks/actions/authentication'
next:
  text: 'Reactions'
  link: '/hooks/actions/reactions'
---

<DocStatusBanner />

# Media Actions

## Media Deletion

### fluent_community/feed/media_deleted

Fires when media files are deleted from a feed post.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$feed` | Feed Object | The feed object from which media was deleted |
| `$mediaIds` | array | Array of deleted media IDs |

**Example Usage:**

```php
// Log media deletion from feeds
add_action('fluent_community/feed/media_deleted', function($feed, $mediaIds) {
    error_log(sprintf(
        'Media deleted from feed %d: %s',
        $feed->id,
        implode(', ', $mediaIds)
    ));
}, 10, 2);

// Clean up related data and thumbnails
add_action('fluent_community/feed/media_deleted', function($feed, $mediaIds) {
    foreach ($mediaIds as $mediaId) {
        // Delete thumbnails
        delete_post_meta($mediaId, 'thumbnail_url');

        // Clear cache
        wp_cache_delete('media_' . $mediaId);

        // Remove from CDN
        do_action('fluent_community/delete_remote_media_cdn', $mediaId);
    }
}, 10, 2);

// Update feed media count
add_action('fluent_community/feed/media_deleted', function($feed, $mediaIds) {
    $remaining_media = get_post_meta($feed->id, 'media_count', true) ?: 0;
    $remaining_media = max(0, $remaining_media - count($mediaIds));
    update_post_meta($feed->id, 'media_count', $remaining_media);
}, 10, 2);
```

---

### fluent_community/comment/media_deleted

Fires when media files are deleted from a comment.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$comment` | Comment Object | The comment object from which media was deleted |
| `$mediaIds` | array | Array of deleted media IDs |

**Example Usage:**

```php
// Log comment media deletion
add_action('fluent_community/comment/media_deleted', function($comment, $mediaIds) {
    error_log(sprintf(
        'Media deleted from comment %d: %d files',
        $comment->id,
        count($mediaIds)
    ));
}, 10, 2);

// Clean up external storage
add_action('fluent_community/comment/media_deleted', function($comment, $mediaIds) {
    foreach ($mediaIds as $mediaId) {
        // Delete from CDN or external storage
        $media = get_post($mediaId);
        if ($media && $media->guid) {
            // Trigger remote deletion
            do_action('fluent_community/delete_remote_media_s3', $mediaId, $media->guid);
        }
    }
}, 10, 2);

// Update comment media statistics
add_action('fluent_community/comment/media_deleted', function($comment, $mediaIds) {
    $total_deleted = get_option('total_comment_media_deleted', 0);
    update_option('total_comment_media_deleted', $total_deleted + count($mediaIds));
}, 10, 2);
```

---

### fluent_community/maybe_delete_draft_medias

Fires when checking for and potentially deleting draft/orphaned media files that were uploaded but never attached to content.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$draftMedias` | array | Array of draft media objects to be deleted |

**Example Usage:**

```php
// Log draft media cleanup
add_action('fluent_community/maybe_delete_draft_medias', function($draftMedias) {
    if (!empty($draftMedias)) {
        error_log(sprintf(
            'Cleaning up %d draft media files',
            count($draftMedias)
        ));
    }
}, 10, 1);

// Backup before deletion
add_action('fluent_community/maybe_delete_draft_medias', function($draftMedias) {
    foreach ($draftMedias as $media) {
        // Store backup info
        $backup_data = [
            'media_id' => $media->id,
            'url' => $media->url,
            'deleted_at' => current_time('mysql')
        ];

        update_option('media_backup_' . $media->id, $backup_data, false);
    }
}, 10, 1);

// Send cleanup report to admin
add_action('fluent_community/maybe_delete_draft_medias', function($draftMedias) {
    if (count($draftMedias) > 10) {
        $admin_email = get_option('admin_email');
        wp_mail(
            $admin_email,
            'Draft Media Cleanup Report',
            sprintf('%d draft media files were cleaned up.', count($draftMedias))
        );
    }
}, 10, 1);

// Track storage savings
add_action('fluent_community/maybe_delete_draft_medias', function($draftMedias) {
    $total_size = 0;
    foreach ($draftMedias as $media) {
        if (isset($media->file_size)) {
            $total_size += $media->file_size;
        }
    }

    $saved_mb = round($total_size / 1024 / 1024, 2);
    error_log("Draft cleanup saved {$saved_mb}MB of storage");
}, 10, 1);
```

---

### fluent_community/remove_medias_by_url

Fires when media files are removed by their URLs (used for profile photos, cover photos, space images, etc.).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$mediaUrls` | array | Array of media URLs to be removed |
| `$context` | array | Context information about the removal |

**Context Array:**

| Key | Type | Description |
|-----|------|-------------|
| `type` | string | Type of media (e.g., 'profile_photo', 'cover_photo', 'space_image') |
| `user_id` | int | User ID (if applicable) |
| `space_id` | int | Space ID (if applicable) |

**Example Usage:**

```php
// Log media removal by URL
add_action('fluent_community/remove_medias_by_url', function($mediaUrls, $context) {
    error_log(sprintf(
        'Removing %d media files by URL. Type: %s',
        count($mediaUrls),
        $context['type'] ?? 'unknown'
    ));
}, 10, 2);

// Delete from CDN when removing by URL
add_action('fluent_community/remove_medias_by_url', function($mediaUrls, $context) {
    foreach ($mediaUrls as $url) {
        // Extract file path from URL
        $file_path = str_replace(wp_upload_dir()['baseurl'], wp_upload_dir()['basedir'], $url);

        // Delete from CDN
        if (function_exists('delete_from_cdn')) {
            delete_from_cdn($url);
        }

        // Delete local file
        if (file_exists($file_path)) {
            @unlink($file_path);
        }
    }
}, 10, 2);

// Track profile photo changes
add_action('fluent_community/remove_medias_by_url', function($mediaUrls, $context) {
    if (isset($context['type']) && $context['type'] === 'profile_photo') {
        $user_id = $context['user_id'] ?? 0;
        if ($user_id) {
            $change_count = get_user_meta($user_id, 'profile_photo_changes', true) ?: 0;
            update_user_meta($user_id, 'profile_photo_changes', $change_count + 1);
        }
    }
}, 10, 2);

// Clean up image variations
add_action('fluent_community/remove_medias_by_url', function($mediaUrls, $context) {
    foreach ($mediaUrls as $url) {
        // Remove thumbnails and variations
        $variations = ['-150x150', '-300x300', '-thumbnail', '-medium', '-large'];

        foreach ($variations as $variation) {
            $variation_url = str_replace('.jpg', $variation . '.jpg', $url);
            $variation_url = str_replace('.png', $variation . '.png', $variation_url);

            $file_path = str_replace(
                wp_upload_dir()['baseurl'],
                wp_upload_dir()['basedir'],
                $variation_url
            );

            if (file_exists($file_path)) {
                @unlink($file_path);
            }
        }
    }
}, 10, 2);
```

---

### fluent_community/lesson/additional_media_updated

Fires when additional media (attachments, resources) are updated for a course lesson.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$requestData` | array | Request data containing media information |
| `$lesson` | Lesson Object | The lesson being updated |
| `$updateData` | array | Data that was updated |

**Example Usage:**

```php
// Log lesson media updates
add_action('fluent_community/lesson/additional_media_updated', function($requestData, $lesson, $updateData) {
    error_log(sprintf(
        'Lesson %d media updated. Course: %d',
        $lesson->id,
        $lesson->course_id
    ));
}, 10, 3);

// Notify course instructors
add_action('fluent_community/lesson/additional_media_updated', function($requestData, $lesson, $updateData) {
    $course = $lesson->course;
    $instructors = $course->getInstructors();

    foreach ($instructors as $instructor) {
        // Send notification
        do_action('fluent_community/create_notification', [
            'user_id' => $instructor->ID,
            'type' => 'lesson_media_updated',
            'title' => 'Lesson media updated',
            'description' => sprintf('Media updated for lesson: %s', $lesson->title)
        ]);
    }
}, 10, 3);

// Track lesson resource changes
add_action('fluent_community/lesson/additional_media_updated', function($requestData, $lesson, $updateData) {
    $change_log = get_post_meta($lesson->id, 'media_change_log', true) ?: [];

    $change_log[] = [
        'timestamp' => current_time('mysql'),
        'user_id' => get_current_user_id(),
        'changes' => $updateData
    ];

    update_post_meta($lesson->id, 'media_change_log', $change_log);
}, 10, 3);
```

---

### fluent_community/document/local_file_access

Fires when a local document file is accessed by a user.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$file` | array | File information array |
| `$user` | User Object | The user accessing the file |

**File Array Structure:**
```php
[
    'id' => 123,              // Media ID
    'file_path' => '/path/to/file.pdf',
    'file_name' => 'document.pdf',
    'file_type' => 'application/pdf',
    'file_size' => 1024000,   // Size in bytes
    'user_id' => 456,         // Uploader user ID
    'created_at' => '2024-01-01 12:00:00'
]
```

**Source Files:**
- `app/Http/Controllers/MediaController.php`

**Example Usage:**

```php
// Log document access
add_action('fluent_community/document/local_file_access', function($file, $user) {
    error_log(sprintf(
        'User %d (%s) accessed document: %s (ID: %d)',
        $user->ID,
        $user->user_email,
        $file['file_name'],
        $file['id']
    ));
}, 10, 2);

// Track download analytics
add_action('fluent_community/document/local_file_access', function($file, $user) {
    // Increment download counter
    $download_count = get_post_meta($file['id'], 'download_count', true) ?: 0;
    update_post_meta($file['id'], 'download_count', $download_count + 1);

    // Log access time
    $access_log = get_post_meta($file['id'], 'access_log', true) ?: [];
    $access_log[] = [
        'user_id' => $user->ID,
        'timestamp' => current_time('mysql'),
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    update_post_meta($file['id'], 'access_log', $access_log);
}, 10, 2);

// Restrict access based on user role
add_action('fluent_community/document/local_file_access', function($file, $user) {
    // Check if file is marked as restricted
    $is_restricted = get_post_meta($file['id'], 'is_restricted', true);

    if ($is_restricted && !user_can($user->ID, 'manage_options')) {
        // Log unauthorized access attempt
        error_log(sprintf(
            'Unauthorized access attempt by user %d to restricted file %d',
            $user->ID,
            $file['id']
        ));

        // You could also prevent access here if needed
        // wp_die('Access denied');
    }
}, 10, 2);

// Send notification to file owner
add_action('fluent_community/document/local_file_access', function($file, $user) {
    // Don't notify if owner is accessing their own file
    if ($file['user_id'] === $user->ID) {
        return;
    }

    // Check if owner wants notifications
    $notify_on_access = get_user_meta($file['user_id'], 'notify_on_file_access', true);

    if ($notify_on_access) {
        $owner = get_user_by('id', $file['user_id']);
        wp_mail(
            $owner->user_email,
            'Your document was accessed',
            sprintf(
                '%s accessed your document "%s"',
                $user->display_name,
                $file['file_name']
            )
        );
    }
}, 10, 2);

// Sync with external analytics
add_action('fluent_community/document/local_file_access', function($file, $user) {
    wp_remote_post('https://analytics.example.com/events', [
        'body' => json_encode([
            'event' => 'document_accessed',
            'file_id' => $file['id'],
            'file_name' => $file['file_name'],
            'file_type' => $file['file_type'],
            'user_id' => $user->ID,
            'timestamp' => current_time('mysql')
        ])
    ]);
}, 10, 2);
```

**Common Use Cases:**
- Track document download statistics
- Log file access for compliance/auditing
- Restrict access to sensitive documents
- Notify file owners when documents are accessed
- Sync access data with external analytics
- Monitor popular documents
- Implement access control policies

---

## Dynamic Media Hooks

### fluent_community/delete_remote_media_`{provider}`

Fires when deleting media from a specific remote storage provider (e.g., S3, CloudFlare, DigitalOcean Spaces).

**Dynamic Hook Pattern:**
- `fluent_community/delete_remote_media_s3`
- `fluent_community/delete_remote_media_cloudflare`
- `fluent_community/delete_remote_media_digitalocean`
- `fluent_community/delete_remote_media_{custom_provider}`

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$mediaId` | int | Media ID being deleted |
| `$mediaUrl` | string | URL of the media file |
| `$mediaData` | array | Additional media metadata |

**Example Usage:**

```php
// Handle S3 deletion
add_action('fluent_community/delete_remote_media_s3', function($mediaId, $mediaUrl, $mediaData) {
    // Use AWS SDK to delete from S3
    if (class_exists('Aws\S3\S3Client')) {
        $s3 = new Aws\S3\S3Client([
            'version' => 'latest',
            'region'  => 'us-east-1'
        ]);

        $bucket = 'my-community-bucket';
        $key = basename($mediaUrl);

        try {
            $s3->deleteObject([
                'Bucket' => $bucket,
                'Key'    => $key
            ]);

            error_log("Deleted from S3: {$key}");
        } catch (Exception $e) {
            error_log("S3 deletion failed: " . $e->getMessage());
        }
    }
}, 10, 3);

// Handle CloudFlare R2 deletion
add_action('fluent_community/delete_remote_media_cloudflare', function($mediaId, $mediaUrl, $mediaData) {
    // CloudFlare R2 deletion logic
    $api_token = get_option('cloudflare_r2_token');
    $account_id = get_option('cloudflare_account_id');

    // Make API call to delete file
    wp_remote_request("https://api.cloudflare.com/client/v4/accounts/{$account_id}/r2/buckets/media/objects/" . basename($mediaUrl), [
        'method' => 'DELETE',
        'headers' => [
            'Authorization' => 'Bearer ' . $api_token
        ]
    ]);
}, 10, 3);

// Handle DigitalOcean Spaces deletion
add_action('fluent_community/delete_remote_media_digitalocean', function($mediaId, $mediaUrl, $mediaData) {
    // DigitalOcean Spaces uses S3-compatible API
    if (class_exists('Aws\S3\S3Client')) {
        $s3 = new Aws\S3\S3Client([
            'version' => 'latest',
            'region'  => 'nyc3',
            'endpoint' => 'https://nyc3.digitaloceanspaces.com',
            'credentials' => [
                'key'    => get_option('do_spaces_key'),
                'secret' => get_option('do_spaces_secret')
            ]
        ]);

        $s3->deleteObject([
            'Bucket' => 'my-space',
            'Key'    => basename($mediaUrl)
        ]);
    }
}, 10, 3);
```

---

## Best Practices

### 1. Clean Up External Storage

```php
add_action('fluent_community/feed/media_deleted', function($feed, $mediaIds) {
    foreach ($mediaIds as $mediaId) {
        $media = get_post($mediaId);

        if ($media && $media->guid) {
            // Determine storage provider
            $provider = get_post_meta($mediaId, 'storage_provider', true) ?: 's3';

            // Trigger provider-specific deletion
            do_action("fluent_community/delete_remote_media_{$provider}", $mediaId, $media->guid, [
                'feed_id' => $feed->id
            ]);
        }
    }
}, 10, 2);
```

### 2. Implement Soft Delete

```php
add_action('fluent_community/feed/media_deleted', function($feed, $mediaIds) {
    // Instead of permanent deletion, mark as deleted
    foreach ($mediaIds as $mediaId) {
        update_post_meta($mediaId, '_deleted', true);
        update_post_meta($mediaId, '_deleted_at', current_time('mysql'));
        update_post_meta($mediaId, '_deleted_from_feed', $feed->id);
    }

    // Schedule permanent deletion after 30 days
    wp_schedule_single_event(
        strtotime('+30 days'),
        'fluent_community_permanent_delete_media',
        [$mediaIds]
    );
}, 10, 2);
```

### 3. Track Storage Usage

```php
add_action('fluent_community/remove_medias_by_url', function($mediaUrls, $context) {
    $total_size = 0;

    foreach ($mediaUrls as $url) {
        $file_path = str_replace(
            wp_upload_dir()['baseurl'],
            wp_upload_dir()['basedir'],
            $url
        );

        if (file_exists($file_path)) {
            $total_size += filesize($file_path);
        }
    }

    // Update storage statistics
    $current_usage = get_option('community_storage_usage', 0);
    update_option('community_storage_usage', max(0, $current_usage - $total_size));
}, 10, 2);
```

### 4. Backup Before Deletion

```php
add_action('fluent_community/maybe_delete_draft_medias', function($draftMedias) {
    $backup_dir = wp_upload_dir()['basedir'] . '/fluent-community-backups/';

    if (!file_exists($backup_dir)) {
        wp_mkdir_p($backup_dir);
    }

    foreach ($draftMedias as $media) {
        if (isset($media->file_path) && file_exists($media->file_path)) {
            $backup_file = $backup_dir . basename($media->file_path);
            copy($media->file_path, $backup_file);
        }
    }
}, 5, 1); // Priority 5 to run before deletion
```

---

## Common Use Cases

### Automatic CDN Sync

```php
// Sync deletions with CDN
add_action('fluent_community/feed/media_deleted', function($feed, $mediaIds) {
    foreach ($mediaIds as $mediaId) {
        $media = get_post($mediaId);

        if ($media) {
            // Purge from CDN cache
            if (function_exists('purge_cdn_cache')) {
                purge_cdn_cache($media->guid);
            }

            // Delete from remote storage
            $provider = get_post_meta($mediaId, 'storage_provider', true);
            if ($provider) {
                do_action("fluent_community/delete_remote_media_{$provider}",
                    $mediaId,
                    $media->guid,
                    ['feed_id' => $feed->id]
                );
            }
        }
    }
}, 10, 2);
```

### Media Usage Analytics

```php
// Track media deletion patterns
add_action('fluent_community/feed/media_deleted', function($feed, $mediaIds) {
    $stats = get_option('media_deletion_stats', [
        'total_deleted' => 0,
        'by_type' => [],
        'by_month' => []
    ]);

    $stats['total_deleted'] += count($mediaIds);

    $month = date('Y-m');
    $stats['by_month'][$month] = ($stats['by_month'][$month] ?? 0) + count($mediaIds);

    foreach ($mediaIds as $mediaId) {
        $mime_type = get_post_mime_type($mediaId);
        $stats['by_type'][$mime_type] = ($stats['by_type'][$mime_type] ?? 0) + 1;
    }

    update_option('media_deletion_stats', $stats);
}, 10, 2);
```

### Cleanup Orphaned Files

```php
// Clean up orphaned thumbnails and variations
add_action('fluent_community/remove_medias_by_url', function($mediaUrls, $context) {
    foreach ($mediaUrls as $url) {
        $file_path = str_replace(
            wp_upload_dir()['baseurl'],
            wp_upload_dir()['basedir'],
            $url
        );

        if (file_exists($file_path)) {
            // Get file info
            $path_info = pathinfo($file_path);
            $dir = $path_info['dirname'];
            $filename = $path_info['filename'];
            $ext = $path_info['extension'];

            // Find and delete all variations
            $pattern = $dir . '/' . $filename . '-*.' . $ext;
            $variations = glob($pattern);

            foreach ($variations as $variation_file) {
                @unlink($variation_file);
            }

            // Delete original
            @unlink($file_path);
        }
    }
}, 10, 2);
```

### Lesson Resource Versioning

```php
// Keep version history of lesson media
add_action('fluent_community/lesson/additional_media_updated', function($requestData, $lesson, $updateData) {
    $versions = get_post_meta($lesson->id, 'media_versions', true) ?: [];

    $versions[] = [
        'version' => count($versions) + 1,
        'updated_at' => current_time('mysql'),
        'updated_by' => get_current_user_id(),
        'media_data' => $updateData,
        'request_data' => $requestData
    ];

    // Keep last 10 versions
    $versions = array_slice($versions, -10);

    update_post_meta($lesson->id, 'media_versions', $versions);
}, 10, 3);
```

### Draft Media Cleanup Scheduling

```php
// Schedule regular draft media cleanup
add_action('init', function() {
    if (!wp_next_scheduled('fluent_community_cleanup_drafts')) {
        wp_schedule_event(time(), 'daily', 'fluent_community_cleanup_drafts');
    }
});

add_action('fluent_community_cleanup_drafts', function() {
    // Get draft media older than 7 days
    $draft_medias = \FluentCommunity\App\Models\Media::where('status', 'draft')
        ->where('created_at', '<', date('Y-m-d H:i:s', strtotime('-7 days')))
        ->get();

    if ($draft_medias->isNotEmpty()) {
        do_action('fluent_community/maybe_delete_draft_medias', $draft_medias->toArray());
    }
});
```

---

## See Also

- [Feed Actions](/hooks/actions/feeds) - Feed creation and media management
- [Comment Actions](/hooks/actions/comments) - Comment media handling
- [Course Actions](/hooks/actions/courses) - Lesson media and resources
- [User Actions](/hooks/actions/users) - Profile and cover photo management

