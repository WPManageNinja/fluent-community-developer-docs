<DocStatusBanner />

# Media

The Media API allows you to upload and manage images, videos, and other files in your community.

## Media Object

A media object represents an uploaded file.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the media |
| `user_id` | integer | Uploader user ID |
| `file_name` | string | Original file name |
| `file_path` | string | Server file path |
| `file_url` | string | Public file URL |
| `file_type` | string | MIME type |
| `file_size` | integer | File size in bytes |
| `width` | integer | Image width (for images) |
| `height` | integer | Image height (for images) |
| `thumbnail_url` | string | Thumbnail URL (for images/videos) |
| `object_source` | string | Source context (feed, comment, profile, space) |
| `object_id` | integer | Related object ID |
| `status` | string | Media status (active, deleted) |
| `created_at` | datetime | Upload timestamp |

### Supported File Types

**Images:**
- `image/jpeg` - JPEG images
- `image/png` - PNG images
- `image/gif` - GIF images
- `image/webp` - WebP images

**Videos:**
- `video/mp4` - MP4 videos
- `video/webm` - WebM videos

**Documents:**
- `application/pdf` - PDF documents
- `application/zip` - ZIP archives

## Upload Media

Upload a file to the community.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/media-upload
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | file | Yes | File to upload |
| `object_source` | string | No | Source context (feed, comment, profile, space) |
| `object_id` | integer | No | Related object ID |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/media-upload" \
  -X POST \
  -u "username:password" \
  -F "file=@/path/to/image.jpg" \
  -F "object_source=feed"
```

### Example Response

```json
{
  "message": "File uploaded successfully",
  "data": {
    "id": 789,
    "file_name": "image.jpg",
    "file_url": "https://example.com/uploads/2025/10/image.jpg",
    "file_type": "image/jpeg",
    "file_size": 245678,
    "width": 1920,
    "height": 1080,
    "thumbnail_url": "https://example.com/uploads/2025/10/image-thumb.jpg",
    "created_at": "2025-10-27T12:00:00"
  }
}
```

## Get Media Details

Retrieve details for a specific media file.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/media/{id}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Media ID |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/media/789" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "id": 789,
    "user_id": 1,
    "file_name": "image.jpg",
    "file_url": "https://example.com/uploads/2025/10/image.jpg",
    "file_type": "image/jpeg",
    "file_size": 245678,
    "width": 1920,
    "height": 1080,
    "thumbnail_url": "https://example.com/uploads/2025/10/image-thumb.jpg",
    "object_source": "feed",
    "object_id": 123,
    "created_at": "2025-10-27T12:00:00",
    "uploader": {
      "id": 1,
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg"
    }
  }
}
```

## List User's Media

Retrieve media files uploaded by a specific user.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/profile/{username}/media
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |
| `file_type` | string | - | Filter by MIME type |
| `object_source` | string | - | Filter by source |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/media?per_page=20" \
  -u "username:password"
```

### Example Response

```json
{
  "data": [
    {
      "id": 789,
      "file_name": "image.jpg",
      "file_url": "https://example.com/uploads/2025/10/image.jpg",
      "file_type": "image/jpeg",
      "thumbnail_url": "https://example.com/uploads/2025/10/image-thumb.jpg",
      "created_at": "2025-10-27T12:00:00"
    }
  ],
  "meta": {
    "total": 45,
    "per_page": 20,
    "current_page": 1
  }
}
```

## Delete Media

Remove a media file permanently.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/media/{id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/media/789" \
  -X DELETE \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Media deleted successfully"
}
```

## Get oEmbed Data

Retrieve oEmbed data for a URL (YouTube, Vimeo, etc.).

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds/oembed
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | URL to fetch oEmbed data for |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/oembed?url=https://youtube.com/watch?v=abc123" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "type": "video",
    "provider_name": "YouTube",
    "provider_url": "https://youtube.com",
    "title": "Video Title",
    "author_name": "Channel Name",
    "thumbnail_url": "https://i.ytimg.com/vi/abc123/maxresdefault.jpg",
    "html": "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/abc123\"></iframe>",
    "width": 560,
    "height": 315
  }
}
```

## Best Practices

### 1. File Validation

Validate files before upload:

```javascript
function validateFile(file) {
  // Check file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('File too large');
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  return true;
}
```

### 2. Progress Tracking

Show upload progress:

```javascript
const formData = new FormData();
formData.append('file', file);

const xhr = new XMLHttpRequest();
xhr.upload.addEventListener('progress', (e) => {
  const percent = (e.loaded / e.total) * 100;
  updateProgressBar(percent);
});

xhr.open('POST', '/wp-json/fluent-community/v2/feeds/media-upload');
xhr.send(formData);
```

### 3. Image Optimization

Optimize images before upload:

```javascript
async function optimizeImage(file) {
  // Resize large images
  if (file.size > 2 * 1024 * 1024) {
    return await resizeImage(file, 1920, 1080);
  }
  return file;
}
```

### 4. Thumbnail Usage

Use thumbnails for better performance:

```bash
# Use thumbnail for lists
<img src="thumbnail_url" />

# Use full image for detail view
<img src="file_url" />
```

## Common Use Cases

### Image Upload in Feed

Upload image when creating a feed:

```bash
# 1. Upload image
curl -X POST ".../feeds/media-upload" \
  -F "file=@image.jpg" \
  -F "object_source=feed"

# 2. Create feed with image URL
curl -X POST ".../feeds" -d '{
  "message": "Check out this image!",
  "media": [
    {
      "type": "image",
      "url": "https://example.com/uploads/image.jpg"
    }
  ]
}'
```

### Profile Avatar Upload

Update user avatar:

```bash
# 1. Upload avatar
curl -X POST ".../feeds/media-upload" \
  -F "file=@avatar.jpg" \
  -F "object_source=profile"

# 2. Update profile
curl -X PUT ".../profile/me" -d '{
  "avatar": "https://example.com/uploads/avatar.jpg"
}'
```

### Media Gallery

Display user's media gallery:

```bash
# Get user's images
curl ".../profile/john_doe/media?file_type=image"

# Display in grid layout
```

### Video Embeds

Embed videos from URLs:

```bash
# Get oEmbed data
curl ".../feeds/oembed?url=https://youtube.com/watch?v=abc123"

# Display embedded video
```

## Error Handling

### File Too Large (400)

```json
{
  "code": "file_too_large",
  "message": "File size exceeds maximum allowed size",
  "data": {
    "status": 400,
    "max_size": "10MB",
    "file_size": "15MB"
  }
}
```

### Invalid File Type (400)

```json
{
  "code": "invalid_file_type",
  "message": "File type not allowed",
  "data": {
    "status": 400,
    "allowed_types": ["image/jpeg", "image/png", "image/gif"]
  }
}
```

### Upload Failed (500)

```json
{
  "code": "upload_failed",
  "message": "Failed to upload file",
  "data": {
    "status": 500
  }
}
```

### Media Not Found (404)

```json
{
  "code": "media_not_found",
  "message": "Media not found",
  "data": {
    "status": 404
  }
}
```

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to delete this media.",
  "data": {
    "status": 403
  }
}
```

## Related Endpoints

- [Feeds](./feeds.md) - Attach media to feeds
- [Comments](./comments.md) - Attach media to comments
- [Profiles](./profiles.md) - Update profile images
- [Spaces](./spaces.md) - Update space images
