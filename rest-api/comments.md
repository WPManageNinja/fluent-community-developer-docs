# Comments

The Comments API allows users to add comments and replies to feeds, creating threaded discussions in your community.

## Comment Object

A comment represents a user's response to a feed or another comment.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the comment |
| `user_id` | integer | ID of the user who created the comment |
| `post_id` | integer | ID of the feed this comment belongs to |
| `parent_id` | integer | Parent comment ID (for nested replies) |
| `message` | string | Raw comment content |
| `message_rendered` | string | Rendered HTML content |
| `type` | string | Comment type |
| `content_type` | string | Content format (text, markdown, html) |
| `status` | string | Comment status (published, pending, spam) |
| `reactions_count` | integer | Number of reactions |
| `is_sticky` | boolean | Whether comment is pinned |
| `meta` | object | Additional metadata (JSON) |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |

### Status Values

- `published` - Live and visible
- `pending` - Awaiting moderation
- `spam` - Marked as spam

### Content Types

- `text` - Plain text content
- `markdown` - Markdown formatted content
- `html` - HTML formatted content
- `document` - Document library content
- `survey` - Poll or survey content
- `video` - Video content
- `audio` - Audio content

## List Comments for a Feed

Retrieve all comments for a specific feed.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds/{feed_id}/comments
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `feed_id` | integer | - | Feed ID |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 50 | Items per page (max: 100) |
| `parent_id` | integer | - | Filter by parent comment (0 for top-level) |
| `orderby` | string | created_at | Sort field |
| `order` | string | asc | Sort order (asc, desc) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/comments?per_page=20" \
  -u "username:password"
```

### Example Response

```json
{
  "comments": [
    {
      "id": 1001,
      "user_id": "1",
      "post_id": "1001",
      "parent_id": null,
      "message": "asdfasdf",
      "message_rendered": "<p>asdfasdf</p>",
      "type": "comment",
      "content_type": "text",
      "status": "published",
      "reactions_count": "0",
      "is_sticky": "0",
      "meta": [],
      "created_at": "2025-02-04 13:24:30",
      "updated_at": "2025-02-04 13:24:30",
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
    },
    {
      "id": 1002,
      "user_id": "1",
      "post_id": "1001",
      "parent_id": null,
      "message": "asdfasdfasdf",
      "message_rendered": "<p>asdfasdfasdf</p>",
      "type": "comment",
      "content_type": "text",
      "status": "published",
      "reactions_count": "0",
      "is_sticky": "0",
      "meta": [],
      "created_at": "2025-02-04 13:24:33",
      "updated_at": "2025-02-04 13:24:33",
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
  ]
}
```

## Get a Specific Comment

Retrieve details for a single comment.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/comments/{id}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Comment ID |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/comments/45" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "id": 45,
    "user_id": 2,
    "post_id": 123,
    "parent_id": null,
    "message": "Great post! Thanks for sharing.",
    "message_rendered": "<p>Great post! Thanks for sharing.</p>",
    "content_type": "text",
    "status": "published",
    "reactions_count": 5,
    "created_at": "2025-10-27T11:00:00",
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
}
```

## Create a Comment

Add a new comment to a feed.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/{feed_id}/comments
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feed_id` | integer | Yes | Feed ID to comment on |
| `message` | string | Yes | Comment content |
| `content_type` | string | No | Content format (text, markdown, html) |
| `parent_id` | integer | No | Parent comment ID (for replies) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/comments" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "This is a great discussion!",
    "content_type": "text"
  }'
```

### Example Response

```json
{
  "message": "Comment created successfully",
  "data": {
    "id": 47,
    "post_id": 123,
    "message": "This is a great discussion!",
    "status": "published",
    "created_at": "2025-10-27T12:00:00"
  }
}
```

## Create a Reply

Reply to an existing comment.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/{feed_id}/comments
```

### Parameters

Include `parent_id` to create a nested reply.

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/comments" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I agree with your point!",
    "parent_id": 45
  }'
```

### Example Response

```json
{
  "message": "Reply created successfully",
  "data": {
    "id": 48,
    "post_id": 123,
    "parent_id": 45,
    "message": "I agree with your point!",
    "created_at": "2025-10-27T12:05:00"
  }
}
```

## Update a Comment

Modify an existing comment.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/{feed_id}/comments/{comment_id}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `message` | string | Yes | Updated comment content |
| `content_type` | string | No | Content format |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/comments/47" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "This is an updated comment!"
  }'
```

### Example Response

```json
{
  "message": "Comment updated successfully",
  "data": {
    "id": 47,
    "message": "This is an updated comment!",
    "updated_at": "2025-10-27T13:00:00"
  }
}
```

## Delete a Comment

Remove a comment permanently.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/feeds/{feed_id}/comments/{comment_id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/comments/47" \
  -X DELETE \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Comment deleted successfully"
}
```

**Note:** Deleting a parent comment will also delete all its replies.

## Best Practices

### 1. Threaded Discussions

Use `parent_id` to create nested conversations:

```bash
# Top-level comment
curl -X POST ".../feeds/123/comments" -d '{
  "message": "What do you think about this?"
}'

# Reply to comment
curl -X POST ".../feeds/123/comments" -d '{
  "message": "I think it is great!",
  "parent_id": 45
}'
```

### 2. Content Formatting

Choose appropriate content types:

```bash
# Plain text
curl -X POST ".../feeds/123/comments" -d '{
  "message": "Simple comment",
  "content_type": "text"
}'

# Markdown for formatting
curl -X POST ".../feeds/123/comments" -d '{
  "message": "**Bold** and *italic* text",
  "content_type": "markdown"
}'
```

### 3. Pagination

Load comments in batches for better performance:

```bash
# First page
curl ".../feeds/123/comments?per_page=20&page=1"

# Load more
curl ".../feeds/123/comments?per_page=20&page=2"
```

### 4. Real-time Updates

Poll for new comments on active discussions:

```javascript
// Check for new comments every 30 seconds
setInterval(() => {
  fetch('/wp-json/fluent-community/v2/feeds/123/comments?orderby=created_at&order=desc&per_page=5')
    .then(response => response.json())
    .then(data => updateComments(data));
}, 30000);
```

## Common Use Cases

### Discussion Threads

Create engaging threaded discussions:

```bash
# User posts a question
curl -X POST ".../feeds/123/comments" -d '{
  "message": "How do I get started with the API?"
}'

# Others reply
curl -X POST ".../feeds/123/comments" -d '{
  "message": "Check out the authentication guide first!",
  "parent_id": 45
}'
```

### Comment Moderation

Moderate comments before publishing:

```bash
# Get pending comments
curl ".../feeds/123/comments?status=pending"

# Approve comment
curl -X POST ".../feeds/123/comments/47" -d '{
  "status": "published"
}'
```

### User Mentions

Mention users in comments:

```bash
curl -X POST ".../feeds/123/comments" -d '{
  "message": "@john_doe what do you think about this?",
  "content_type": "text"
}'
```

### Comment Analytics

Track engagement through comments:

```bash
# Get most commented feeds
curl ".../feeds?orderby=comments_count&order=desc"

# Get user's comment history
curl ".../profile/john_doe/comments"
```

## Error Handling

### Comment Not Found (404)

```json
{
  "code": "comment_not_found",
  "message": "Comment not found",
  "data": {
    "status": 404
  }
}
```

### Invalid Content (400)

```json
{
  "code": "invalid_content",
  "message": "Comment message is required",
  "data": {
    "status": 400
  }
}
```

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to comment on this feed.",
  "data": {
    "status": 403
  }
}
```

### Parent Comment Not Found (404)

```json
{
  "code": "parent_not_found",
  "message": "Parent comment not found",
  "data": {
    "status": 404
  }
}
```

### Feed Locked (403)

```json
{
  "code": "feed_locked",
  "message": "Comments are disabled for this feed",
  "data": {
    "status": 403
  }
}
```

## Related Endpoints

- [Feeds](./feeds.md) - View feeds to comment on
- [Reactions](./reactions.md) - React to comments
- [Profiles](./profiles.md) - View user's comment history
- [Notifications](./notifications.md) - Get notified of new comments

