<DocStatusBanner />

# Notifications

The Notifications API allows users to receive and manage notifications about community activity.

## Notification Object

A notification represents an alert about activity relevant to the user.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the notification |
| `user_id` | integer | Recipient user ID |
| `type` | string | Notification type |
| `title` | string | Notification title |
| `message` | string | Notification message |
| `action_url` | string | URL to related content |
| `is_read` | boolean | Whether notification has been read |
| `actor_id` | integer | User who triggered the notification |
| `object_id` | integer | Related object ID (feed, comment, etc.) |
| `object_type` | string | Related object type |
| `created_at` | datetime | Creation timestamp |
| `read_at` | datetime | Read timestamp (null if unread) |

### Notification Types

- `new_comment` - New comment on user's feed
- `new_reply` - Reply to user's comment
- `new_reaction` - Reaction on user's content
- `new_follower` - New follower [PRO]
- `mention` - User mentioned in content
- `space_invite` - Invited to a space
- `space_join` - User joined a space
- `course_enrollment` - Enrolled in a course
- `lesson_complete` - Lesson completed

## List All Notifications

Retrieve notifications for the current user.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/notifications
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |
| `is_read` | boolean | - | Filter by read status |
| `type` | string | - | Filter by notification type |
| `orderby` | string | created_at | Sort field |
| `order` | string | desc | Sort order (asc, desc) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/notifications?per_page=20" \
  -u "username:password"
```

### Example Response

```json
{
  "notifications": {
    "current_page": 1,
    "data": [
      {
        "id": 501,
        "user_id": 1,
        "type": "new_comment",
        "title": "New comment on your post",
        "message": "Jane Smith commented on your post",
        "action_url": "/feeds/123#comment-45",
        "is_read": false,
        "object_id": 45,
        "object_type": "comment",
        "created_at": "2025-10-27T11:30:00",
        "read_at": null,
        "xprofile": {
          "user_id": 1,
          "total_points": 6425,
          "is_verified": 1,
          "status": "active",
          "display_name": "User Name",
          "username": "username",
          "avatar": "avatar_url",
          "created_at": "2024-03-05 16:37:02",
          "short_description": "User description",
          "meta": {
            "website": "website_url",
            "cover_photo": "cover_photo_url",
            "social_links": {
              "twitter": "@handle",
              "youtube": "@handle",
              "linkedin": "handle",
              "fb": "handle",
              "instagram": "handle"
            },
            "badge_slug": ["badge1", "badge2"]
          },
          "badge": null
        }
      }
    ],
    "first_page_url": "https://community.test/wp-json/fluent-community/v2/notifications/?page=1",
    "from": 1,
    "last_page": 3,
    "last_page_url": "https://community.test/wp-json/fluent-community/v2/notifications/?page=3",
    "links": [
      {
        "url": null,
        "label": "pagination.previous",
        "active": false
      },
      {
        "url": "https://community.test/wp-json/fluent-community/v2/notifications/?page=1",
        "label": "1",
        "active": true
      },
      {
        "url": "https://community.test/wp-json/fluent-community/v2/notifications/?page=2",
        "label": "2",
        "active": false
      },
      {
        "url": null,
        "label": "pagination.next",
        "active": false
      }
    ],
    "next_page_url": "https://community.test/wp-json/fluent-community/v2/notifications/?page=2",
    "path": "https://community.test/wp-json/fluent-community/v2/notifications",
    "per_page": 20,
    "prev_page_url": null,
    "to": 20,
    "total": 45
  }
}
```

## Get Unread Notifications

Retrieve only unread notifications.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/notifications?is_read=false
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/notifications?is_read=false" \
  -u "username:password"
```

## Get Unread Notification Count

Get only unread notifications with the count.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/notifications/unread
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/notifications/unread" \
  -u "username:password"
```

### Example Response

```json
{
  "notifications": [
    {
      "id": 501,
      "user_id": 1,
      "type": "new_comment",
      "message": "John Doe commented on your post",
      "is_read": false,
      "created_at": "2025-10-27T14:30:00"
    }
  ],
  "unread_count": 12
}
```

## Mark Notification as Read

Mark a specific notification as read.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/notifications/{id}/read
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Notification ID |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/notifications/501/read" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Notification marked as read",
  "data": {
    "id": 501,
    "is_read": true,
    "read_at": "2025-10-27T12:00:00"
  }
}
```

## Mark All as Read

Mark all notifications as read for the current user.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/notifications/mark-all-read
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/notifications/mark-all-read" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "All notifications marked as read",
  "data": {
    "marked_count": 12
  }
}
```

## Delete Notification

Remove a notification permanently.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/notifications/{id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/notifications/501" \
  -X DELETE \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Notification deleted successfully"
}
```

## Delete All Notifications

Remove all notifications for the current user.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/notifications/delete-all
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/notifications/delete-all" \
  -X DELETE \
  -u "username:password"
```

## Best Practices

### 1. Real-time Updates

Poll for new notifications regularly:

```javascript
// Check for new notifications every 30 seconds
setInterval(async () => {
  const response = await fetch('/wp-json/fluent-community/v2/notifications/unread');
  const data = await response.json();

  if (data.unread_count > 0) {
    updateNotificationBadge(data.unread_count);
  }
}, 30000);
```

### 2. Notification Badge

Display unread count in UI:

```bash
# Get unread notifications and count
curl ".../notifications/unread"

# Display badge with count
# Badge: 12
```

### 3. Auto-mark as Read

Mark notifications as read when viewed:

```javascript
// When user clicks notification
async function handleNotificationClick(notificationId) {
  // Mark as read
  await fetch(`/wp-json/fluent-community/v2/notifications/${notificationId}/read`, {
    method: 'POST'
  });
  
  // Navigate to content
  window.location.href = notification.action_url;
}
```

### 4. Notification Grouping

Group similar notifications:

```bash
# Get notifications by type
curl ".../notifications?type=new_comment"

# Display grouped: "3 new comments on your posts"
```

## Common Use Cases

### Notification Center

Build a notification dropdown:

```bash
# Get recent unread notifications
curl ".../notifications?is_read=false&per_page=10"

# Display in dropdown
# Show "Mark all as read" button
```

### Activity Feed

Show all user activity:

```bash
# Get all notifications
curl ".../notifications?per_page=50"

# Display chronologically
```

### Email Digests

Send notification digests via email:

```bash
# Get unread notifications
curl ".../notifications?is_read=false"

# Group by type
# Send daily/weekly digest email
```

### Push Notifications

Implement push notifications:

```javascript
// Check for new notifications
const response = await fetch('/wp-json/fluent-community/v2/notifications?is_read=false');
const notifications = await response.json();

// Send push notification
if (notifications.data.length > 0) {
  new Notification('New Activity', {
    body: notifications.data[0].message,
    icon: notifications.data[0].actor.avatar
  });
}
```

### Notification Preferences

Respect user preferences:

```bash
# Get user's notification preferences
curl ".../profile/notification-preferences"

# Only send notifications user wants
# Filter by preference settings
```

## Error Handling

### Notification Not Found (404)

```json
{
  "code": "notification_not_found",
  "message": "Notification not found",
  "data": {
    "status": 404
  }
}
```

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to access this notification.",
  "data": {
    "status": 403
  }
}
```

### Already Read (200)

```json
{
  "message": "Notification already marked as read",
  "data": {
    "id": 501,
    "is_read": true,
    "read_at": "2025-10-26T10:00:00"
  }
}
```

## Related Endpoints

- [Profiles](./profiles.md) - Manage notification preferences
- [Feeds](./feeds.md) - Content that triggers notifications
- [Comments](./comments.md) - Comment notifications
- [Followers](./followers.md) - Follower notifications [PRO]
