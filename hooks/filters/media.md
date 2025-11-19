---
prev:
  text: 'Users Filters'
  link: '/hooks/filters/users'
next:
  text: 'Permissions Filters'
  link: '/hooks/filters/permissions'
---

# Media & Uploads Filters ​

Filters for customizing media uploads, file handling, storage, and image processing in Fluent Community.

## Overview ​

Media filters control file uploads, image processing, storage locations, file size limits, and media URL generation. These filters are essential for customizing media handling and integrating with cloud storage.

**Total Filters:** 12

---

## Upload Configuration Filters

### fluent_community/media_upload_max_file_size ​

Filters the maximum file size for media uploads.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$maxSize` | int | Maximum file size (default: 100) |

**Return:** `int` - Modified maximum file size

**Example Usage:**

```php
// Increase upload limit
add_filter('fluent_community/media_upload_max_file_size', function($maxSize) {
    return 500; // 500 MB
});

// Role-based limits
add_filter('fluent_community/media_upload_max_file_size', function($maxSize) {
    $user = wp_get_current_user();

    if (in_array('premium_member', $user->roles)) {
        return 1000; // 1 GB for premium
    }

    if (in_array('administrator', $user->roles)) {
        return 5000; // 5 GB for admins
    }

    return 100; // 100 MB for regular users
});

// Dynamic based on available storage
add_filter('fluent_community/media_upload_max_file_size', function($maxSize) {
    $available_space = get_available_storage_space();

    // Limit to 10% of available space
    $max_allowed = floor($available_space * 0.1);

    return min($maxSize, $max_allowed);
});
```

**Common Use Cases:**
- Increase upload limits
- Role-based limits
- Premium features
- Storage management

**Related Filters:**
- `fluent_community/media_upload_max_file_unit`

---

### fluent_community/media_upload_max_file_unit ​

Filters the unit for maximum file size (MB, GB, etc.).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$unit` | string | File size unit (default: 'MB') |

**Return:** `string` - Modified unit

**Example Usage:**

```php
// Use GB instead of MB
add_filter('fluent_community/media_upload_max_file_unit', function($unit) {
    return 'GB';
});

// Use KB for restricted users
add_filter('fluent_community/media_upload_max_file_unit', function($unit) {
    $user = wp_get_current_user();

    if (in_array('restricted_user', $user->roles)) {
        return 'KB';
    }

    return 'MB';
});
```

**Common Use Cases:**
- Change size units
- Role-based units
- Display preferences

---

### fluent_community/max_media_per_post ​

Filters the maximum number of media files allowed per post.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$maxMedia` | int | Maximum media count (default: 10) |

**Return:** `int` - Modified maximum count

**Example Usage:**

```php
// Increase media limit
add_filter('fluent_community/max_media_per_post', function($maxMedia) {
    return 20; // Allow 20 files per post
});

// Role-based limits
add_filter('fluent_community/max_media_per_post', function($maxMedia) {
    $user = wp_get_current_user();

    if (in_array('premium_member', $user->roles)) {
        return 50; // 50 files for premium
    }

    return 10; // 10 files for regular users
});

// Content type based limits
add_filter('fluent_community/max_media_per_post', function($maxMedia) {
    $post_type = $_REQUEST['content_type'] ?? 'feed';

    $limits = [
        'feed'    => 10,
        'article' => 20,
        'gallery' => 100
    ];

    return $limits[$post_type] ?? $maxMedia;
});
```

**Common Use Cases:**
- Increase media limits
- Role-based limits
- Content type restrictions
- Gallery features

---

### fluent_community/media_upload_max_width_{context} ​

Filters the maximum width for uploaded images (dynamic filter based on context).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$maxWidth` | int | Maximum image width in pixels |
| `$file` | array | File data array |

**Return:** `int` - Modified maximum width

**Example Usage:**

```php
// Set max width for feed images
add_filter('fluent_community/media_upload_max_width_feed', function($maxWidth, $file) {
    return 1920; // Max 1920px width
}, 10, 2);

// Set max width for avatars
add_filter('fluent_community/media_upload_max_width_avatar', function($maxWidth, $file) {
    return 500; // Max 500px for avatars
}, 10, 2);

// Set max width for cover photos
add_filter('fluent_community/media_upload_max_width_cover', function($maxWidth, $file) {
    return 2560; // Max 2560px for covers
}, 10, 2);

// Dynamic based on file type
add_filter('fluent_community/media_upload_max_width_feed', function($maxWidth, $file) {
    $mime_type = $file['type'] ?? '';

    if (strpos($mime_type, 'image/png') !== false) {
        return 2048; // PNG can be larger
    }

    return 1920; // JPEG default
}, 10, 2);
```

**Common Use Cases:**
- Image size optimization
- Context-specific limits
- Bandwidth management
- Storage optimization

---

## Image Processing Filters

### fluent_community/media_upload_resize ​

Filters whether uploaded images should be resized.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$willResize` | bool | Whether to resize image |
| `$file` | array | File data array |

**Return:** `bool` - Modified resize setting

**Example Usage:**

```php
// Always resize images
add_filter('fluent_community/media_upload_resize', function($willResize, $file) {
    return true;
}, 10, 2);

// Resize only large images
add_filter('fluent_community/media_upload_resize', function($willResize, $file) {
    $image_size = getimagesize($file['tmp_name']);

    if ($image_size && $image_size[0] > 1920) {
        return true; // Resize if width > 1920px
    }

    return false;
}, 10, 2);

// Don't resize for premium users
add_filter('fluent_community/media_upload_resize', function($willResize, $file) {
    $user = wp_get_current_user();

    if (in_array('premium_member', $user->roles)) {
        return false; // Keep original size
    }

    return $willResize;
}, 10, 2);

// Resize based on file type
add_filter('fluent_community/media_upload_resize', function($willResize, $file) {
    $mime_type = $file['type'] ?? '';

    // Don't resize GIFs (preserve animation)
    if ($mime_type === 'image/gif') {
        return false;
    }

    return $willResize;
}, 10, 2);
```

**Common Use Cases:**
- Optimize storage
- Bandwidth management
- Preserve original quality
- File type handling

---

### fluent_community/convert_image_to_webp ​

Filters whether images should be converted to WebP format.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$convertToWebp` | bool | Whether to convert to WebP |
| `$file` | array | File data array |

**Return:** `bool` - Modified conversion setting

**Example Usage:**

```php
// Enable WebP conversion
add_filter('fluent_community/convert_image_to_webp', function($convertToWebp, $file) {
    return true;
}, 10, 2);

// Convert only JPEG and PNG
add_filter('fluent_community/convert_image_to_webp', function($convertToWebp, $file) {
    $mime_type = $file['type'] ?? '';

    $convertible = ['image/jpeg', 'image/png'];

    return in_array($mime_type, $convertible);
}, 10, 2);

// Don't convert if browser doesn't support WebP
add_filter('fluent_community/convert_image_to_webp', function($convertToWebp, $file) {
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';

    if (strpos($accept, 'image/webp') === false) {
        return false;
    }

    return $convertToWebp;
}, 10, 2);
```

**Common Use Cases:**
- Optimize file sizes
- Modern image formats
- Browser compatibility
- Performance optimization

---

## Media Data Filters

### fluent_community/media_upload_data ​

Filters media data before it's saved to the database.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$mediaData` | array | Media data to be saved |
| `$file` | array | Uploaded file data |

**Return:** `array` - Modified media data

**Example Usage:**

```php
// Add custom metadata
add_filter('fluent_community/media_upload_data', function($mediaData, $file) {
    $mediaData['meta']['uploaded_by_ip'] = $_SERVER['REMOTE_ADDR'];
    $mediaData['meta']['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
    $mediaData['meta']['upload_timestamp'] = time();

    return $mediaData;
}, 10, 2);

// Add image dimensions
add_filter('fluent_community/media_upload_data', function($mediaData, $file) {
    if (strpos($file['type'], 'image/') === 0) {
        $image_size = getimagesize($file['tmp_name']);

        if ($image_size) {
            $mediaData['meta']['width'] = $image_size[0];
            $mediaData['meta']['height'] = $image_size[1];
            $mediaData['meta']['aspect_ratio'] = $image_size[0] / $image_size[1];
        }
    }

    return $mediaData;
}, 10, 2);

// Add file hash for duplicate detection
add_filter('fluent_community/media_upload_data', function($mediaData, $file) {
    $mediaData['meta']['file_hash'] = md5_file($file['tmp_name']);

    return $mediaData;
}, 10, 2);

// Categorize media by type
add_filter('fluent_community/media_upload_data', function($mediaData, $file) {
    $mime_type = $file['type'] ?? '';

    if (strpos($mime_type, 'image/') === 0) {
        $mediaData['category'] = 'image';
    } elseif (strpos($mime_type, 'video/') === 0) {
        $mediaData['category'] = 'video';
    } elseif (strpos($mime_type, 'audio/') === 0) {
        $mediaData['category'] = 'audio';
    } else {
        $mediaData['category'] = 'document';
    }

    return $mediaData;
}, 10, 2);
```

**Common Use Cases:**
- Add metadata
- Track uploads
- Duplicate detection
- File categorization
- Custom processing

---

### fluent_community/generated_upload_file_name ​

Filters the generated filename for uploaded media.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$filename` | string | Generated filename |
| `$file` | array | File data array |

**Return:** `string` - Modified filename

**Example Usage:**

```php
// Add timestamp to filename
add_filter('fluent_community/generated_upload_file_name', function($filename, $file) {
    $info = pathinfo($filename);
    $timestamp = time();

    return $info['filename'] . '_' . $timestamp . '.' . $info['extension'];
}, 10, 2);

// Add user ID to filename
add_filter('fluent_community/generated_upload_file_name', function($filename, $file) {
    $user_id = get_current_user_id();
    $info = pathinfo($filename);

    return "user_{$user_id}_{$info['filename']}.{$info['extension']}";
}, 10, 2);

// Sanitize and normalize filename
add_filter('fluent_community/generated_upload_file_name', function($filename, $file) {
    $info = pathinfo($filename);

    // Remove special characters
    $clean_name = preg_replace('/[^a-zA-Z0-9_-]/', '_', $info['filename']);

    // Convert to lowercase
    $clean_name = strtolower($clean_name);

    return $clean_name . '.' . $info['extension'];
}, 10, 2);

// Add hash for uniqueness
add_filter('fluent_community/generated_upload_file_name', function($filename, $file) {
    $info = pathinfo($filename);
    $hash = substr(md5(uniqid()), 0, 8);

    return $info['filename'] . '_' . $hash . '.' . $info['extension'];
}, 10, 2);
```

**Common Use Cases:**
- Unique filenames
- Organize by user
- Sanitize filenames
- Prevent conflicts
- SEO-friendly names

---

### fluent_community/upload_folder_name ​

Filters the upload folder name/path.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$folderName` | string | Upload folder name |

**Return:** `string` - Modified folder name

**Example Usage:**

```php
// Organize by year/month
add_filter('fluent_community/upload_folder_name', function($folderName) {
    return date('Y/m');
});

// Organize by user
add_filter('fluent_community/upload_folder_name', function($folderName) {
    $user_id = get_current_user_id();
    return "users/{$user_id}";
});

// Organize by content type
add_filter('fluent_community/upload_folder_name', function($folderName) {
    $content_type = $_REQUEST['content_type'] ?? 'general';
    return $content_type;
});

// Organize by space
add_filter('fluent_community/upload_folder_name', function($folderName) {
    $space_id = $_REQUEST['space_id'] ?? 'global';
    return "spaces/{$space_id}";
});
```

**Common Use Cases:**
- Organize uploads
- Date-based folders
- User-based folders
- Content categorization

---

## Storage & URL Filters

### fluent_community/media_public_url_{driver} ​

Filters the public URL for media files (dynamic filter based on storage driver).

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$url` | string | Media public URL |
| `$media` | Media | Media object |

**Return:** `string` - Modified URL

**Example Usage:**

```php
// Custom CDN for local storage
add_filter('fluent_community/media_public_url_local', function($url, $media) {
    $cdn_url = 'https://cdn.example.com';
    $upload_dir = wp_upload_dir();

    return str_replace($upload_dir['baseurl'], $cdn_url, $url);
}, 10, 2);

// Custom domain for S3
add_filter('fluent_community/media_public_url_s3', function($url, $media) {
    // Use custom domain instead of S3 URL
    return str_replace(
        's3.amazonaws.com/bucket-name',
        'media.example.com',
        $url
    );
}, 10, 2);

// Add query parameters
add_filter('fluent_community/media_public_url_local', function($url, $media) {
    // Add cache busting
    $version = $media->updated_at ? strtotime($media->updated_at) : time();
    return add_query_arg('v', $version, $url);
}, 10, 2);
```

**Common Use Cases:**
- CDN integration
- Custom domains
- Cache busting
- URL transformation

---

### fluent_community/media_signed_public_url_{driver} ​

Filters the signed/temporary public URL for media files.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$url` | string | Signed media URL |
| `$media` | Media | Media object |
| `$time` | int | Expiration time in seconds |

**Return:** `string` - Modified signed URL

**Example Usage:**

```php
// Custom signed URL for S3
add_filter('fluent_community/media_signed_public_url_s3', function($url, $media, $time) {
    // Use CloudFront signed URLs instead
    return generate_cloudfront_signed_url($media->media_url, $time);
}, 10, 3);

// Add custom parameters to signed URL
add_filter('fluent_community/media_signed_public_url_local', function($url, $media, $time) {
    $params = [
        'user_id' => get_current_user_id(),
        'expires' => time() + $time,
        'token'   => generate_access_token($media->id)
    ];

    return add_query_arg($params, $url);
}, 10, 3);
```

**Common Use Cases:**
- Private media access
- Temporary URLs
- Custom signing
- Access control

---

## Bulk Operations

### fluent_community/handle_remove_bulk_media ​

Filters whether bulk media removal should be handled by custom logic.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `$handled` | bool | Whether custom handler will process removal |
| `$media` | array | Array of media objects to remove |

**Return:** `bool` - Whether custom handler processed the removal

**Example Usage:**

```php
// Custom bulk delete handler
add_filter('fluent_community/handle_remove_bulk_media', function($handled, $media) {
    // Move to trash instead of deleting
    foreach ($media as $item) {
        update_media_meta($item->id, 'status', 'trashed');
        update_media_meta($item->id, 'trashed_at', current_time('mysql'));
    }

    return true; // Indicate we handled it
}, 10, 2);

// Archive before deleting
add_filter('fluent_community/handle_remove_bulk_media', function($handled, $media) {
    // Archive to backup storage
    foreach ($media as $item) {
        archive_media_to_backup($item);
    }

    // Let default handler continue
    return false;
}, 10, 2);

// Log bulk deletions
add_filter('fluent_community/handle_remove_bulk_media', function($handled, $media) {
    $user_id = get_current_user_id();
    $media_ids = array_map(function($item) {
        return $item->id;
    }, $media);

    error_log(sprintf(
        'User %d deleted %d media files: %s',
        $user_id,
        count($media_ids),
        implode(', ', $media_ids)
    ));

    return false; // Let default handler continue
}, 10, 2);
```

**Common Use Cases:**
- Soft delete/trash
- Archive before delete
- Custom deletion logic
- Audit logging

---

## Best Practices

### 1. Validate File Types

```php
add_filter('fluent_community/media_upload_data', function($mediaData, $file) {
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];

    if (!in_array($file['type'], $allowed_types)) {
        throw new \Exception('File type not allowed');
    }

    return $mediaData;
}, 10, 2);
```

### 2. Optimize Storage

```php
// Always resize large images
add_filter('fluent_community/media_upload_resize', function($willResize, $file) {
    $image_size = getimagesize($file['tmp_name']);
    return $image_size && $image_size[0] > 1920;
}, 10, 2);

// Convert to WebP for better compression
add_filter('fluent_community/convert_image_to_webp', function($convert, $file) {
    return strpos($file['type'], 'image/') === 0;
}, 10, 2);
```

### 3. Security Considerations

```php
// Sanitize filenames
add_filter('fluent_community/generated_upload_file_name', function($filename, $file) {
    return sanitize_file_name($filename);
}, 10, 2);

// Add metadata for tracking
add_filter('fluent_community/media_upload_data', function($mediaData, $file) {
    $mediaData['meta']['uploaded_by'] = get_current_user_id();
    $mediaData['meta']['uploaded_at'] = current_time('mysql');
    $mediaData['meta']['ip_address'] = $_SERVER['REMOTE_ADDR'];

    return $mediaData;
}, 10, 2);
```

---

## Related Documentation

- [Media Actions](/hooks/actions/media)
- [Cloud Storage Configuration](/guides/cloud-storage)
- [Code Snippets](/guides/code-snippets)

