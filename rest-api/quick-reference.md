# Quick Reference

A quick reference guide for the Fluent Community REST API with real endpoints.

## Base URL

```
https://your-site.com/wp-json/fluent-community/v1/
```

## Authentication

```bash
# Application Password
curl --user "username:app_password" https://your-site.com/wp-json/fluent-community/v1/feeds

# JWT Token
curl -H "Authorization: Bearer YOUR_TOKEN" https://your-site.com/wp-json/fluent-community/v1/feeds
```

---

## Posts & Feeds

```bash
# List feeds
GET /feeds

# Get feed by ID
GET /feeds/{feed_id}/by-id

# Get feed by slug
GET /feeds/{feed_slug}/by-slug

# Create feed
POST /feeds
{
  "title": "Post Title",
  "message": "Post content",
  "space_id": 5,
  "content_type": "text"
}

# Update feed
POST /feeds/{feed_id}
{
  "title": "Updated Title",
  "message": "Updated content"
}

# Delete feed
DELETE /feeds/{feed_id}

# React to feed
POST /feeds/{feed_id}/react
{
  "type": "like"
}

# Get bookmarks
GET /feeds/bookmarks

# Upload media
POST /feeds/media-upload
# (multipart form data with file)
```

---

## Comments

```bash
# List comments for a feed
GET /feeds/{feed_id}/comments

# Get single comment
GET /comments/{id}

# Create comment
POST /feeds/{feed_id}/comments
{
  "message": "Great post!",
  "content_type": "text"
}

# Create reply
POST /feeds/{feed_id}/comments
{
  "message": "Thanks!",
  "parent_id": 45
}

# Update comment
POST /feeds/{feed_id}/comments/{comment_id}
{
  "message": "Updated comment"
}

# Delete comment
DELETE /feeds/{feed_id}/comments/{comment_id}

# React to comment
POST /feeds/{feed_id}/comments/{comment_id}/reactions
{
  "type": "like"
}
```

---

## Spaces

```bash
# List spaces
GET /spaces

# Get space by slug
GET /spaces/{spaceSlug}/by-slug

# Create space
POST /spaces
{
  "title": "Tech Talk",
  "description": "Discuss technology",
  "privacy": "public"
}

# Update space
PUT /spaces/{spaceSlug}/by-slug
{
  "title": "Updated Title"
}

# Delete space
DELETE /spaces/{spaceSlug}

# Join space
POST /spaces/{spaceSlug}/join

# Leave space
POST /spaces/{spaceSlug}/leave

# Get space members
GET /spaces/{spaceSlug}/members

# Add member
POST /spaces/{spaceSlug}/members
{
  "user_id": 123,
  "role": "member"
}

# Remove member
POST /spaces/{spaceSlug}/members/remove
{
  "user_id": 123
}
```

---

## Users & Profiles

```bash
# Get user profile
GET /profile/{username}

# Update profile
PUT /profile/me
{
  "bio": "Updated bio",
  "location": "New York"
}

# Get user's feeds
GET /profile/{username}/feeds

# Get user's comments
GET /profile/{username}/comments

# Get user's spaces
GET /profile/{username}/spaces

# Follow user [PRO]
POST /profile/{username}/follow

# Unfollow user [PRO]
POST /profile/{username}/unfollow

# List members
GET /members

# Search members
GET /members/search?q=john

# Get notification preferences
GET /profile/notification-preferences

# Update notification preferences
PUT /profile/notification-preferences
{
  "email_notifications": {
    "new_comment": true
  }
}
```

---

## Notifications

```bash
# List notifications
GET /notifications?status=unread

# Get single notification
GET /notifications/{id}

# Mark as read
POST /notifications/mark-read
{
  "notification_ids": [123, 124]
}

# Mark all as read
POST /notifications/mark-all-read

# Delete notification
DELETE /notifications/{id}

# Clear all notifications
DELETE /notifications/clear-all

# Get unread count
GET /notifications/unread-count
```

---

## Media

```bash
# Upload media
POST /feeds/media-upload
# (multipart form data)

# Get media details
GET /media/{id}

# Delete media
DELETE /media/{id}

# Get user's media
GET /media/user/{user_id}

# Delete media preview
DELETE /feeds/{feed_id}/media-preview?media_id=78
```

---

## Courses

```bash
# List courses
GET /courses

# Get single course
GET /courses/{id}

# Create course
POST /courses
{
  "title": "Web Development 101",
  "description": "Learn web dev basics",
  "difficulty": "beginner"
}

# Update course
PUT /courses/{id}

# Delete course
DELETE /courses/{id}

# Get course lessons
GET /courses/{id}/lessons

# Create lesson
POST /courses/{id}/lessons
{
  "title": "Lesson 1",
  "content": "Lesson content"
}

# Enroll in course
POST /courses/{id}/enroll

# Unenroll from course
POST /courses/{id}/unenroll

# Get course progress
GET /courses/{id}/progress

# Mark lesson complete
POST /courses/{id}/lessons/{lesson_id}/complete

# Get my courses
GET /courses/my-courses
```

---

## Settings & Admin

```bash
# Get feature settings
GET /settings/features

# Update feature settings
PUT /settings/features
{
  "enable_reactions": true,
  "enable_followers": true
}

# Get customization settings
GET /settings/customization

# Update customization
PUT /settings/customization
{
  "primary_color": "#3B82F6"
}

# Get general settings
GET /settings/general

# Update general settings
PUT /settings/general
{
  "posts_per_page": 20
}

# Get app variables
GET /options/app-vars

# Get dashboard stats
GET /admin/dashboard-stats

# Get recent activities
GET /admin/recent-activities

# Clear cache
POST /admin/clear-cache
{
  "cache_type": "all"
}
```

---

## Common Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | integer | Page number (default: 1) |
| `per_page` | integer | Items per page (default: 20, max: 100) |
| `orderby` | string | Sort field (created_at, updated_at, etc.) |
| `order` | string | Sort order (asc, desc) |
| `search` | string | Search query |
| `status` | string | Filter by status |

---

## Response Format

### Success Response

```json
{
  "data": {
    "id": 123,
    "title": "Example"
  },
  "message": "Success message"
}
```

### List Response

```json
{
  "data": [...],
  "meta": {
    "total": 150,
    "per_page": 20,
    "current_page": 1,
    "total_pages": 8
  }
}
```

### Error Response

```json
{
  "code": "error_code",
  "message": "Error message",
  "data": {
    "status": 400
  }
}
```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content (successful deletion) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (authentication required) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

- **Default**: 100 requests per minute per user
- **Authenticated**: 1000 requests per minute
- **Admin**: Unlimited

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1635724800
```

---

## Pagination

```bash
# First page
GET /feeds?page=1&per_page=20

# Next page
GET /feeds?page=2&per_page=20
```

Response includes pagination metadata:
```json
{
  "meta": {
    "total": 150,
    "per_page": 20,
    "current_page": 2,
    "total_pages": 8
  }
}
```

---

## Filtering & Sorting

```bash
# Filter by space
GET /feeds?space_id=5

# Filter by status
GET /feeds?status=published

# Sort by date
GET /feeds?orderby=created_at&order=desc

# Search
GET /feeds?search=javascript

# Multiple filters
GET /feeds?space_id=5&status=published&orderby=reactions_count&order=desc
```

---

## Pro Features

Features marked with **[PRO]** require Fluent Community Pro:

- Followers system
- Advanced analytics
- Scheduled posts
- Webhooks
- Badges & leaderboard
- Moderation tools
- Custom storage drivers (S3)
- Advanced course features

---

## Need Help?

- [Full API Documentation](./index.md)
- [Authentication Guide](./authentication.md)
- [Error Handling](./errors.md)
- [Code Examples](./examples.md)

