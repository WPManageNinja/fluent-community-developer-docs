# Reactions

The Reactions API allows users to express emotions and engagement with feeds and comments through reaction types like likes, loves, and more.

## Reaction Object

A reaction represents a user's emotional response to content.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the reaction |
| `user_id` | integer | ID of the user who reacted |
| `object_id` | integer | ID of the feed or comment |
| `parent_id` | integer | Parent object ID (if applicable) |
| `object_type` | string | Type of object (feed, comment) |
| `type` | string | Reaction type (like, love, laugh, wow, sad, angry) |
| `ip_address` | string | IP address of the user |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |

### Reaction Types

| Type | Description | Icon |
|------|-------------|------|
| `like` | Like/thumbs up | 👍 |
| `love` | Love/heart | ❤️ |
| `laugh` | Laugh/funny | 😂 |
| `wow` | Wow/surprised | 😮 |
| `sad` | Sad/disappointed | 😢 |
| `angry` | Angry/frustrated | 😠 |

### Object Types

- `feed` - Reaction to a feed post
- `comment` - Reaction to a comment

## React to a Feed

Add or toggle a reaction on a feed post.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/{feed_id}/react
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feed_id` | integer | Yes | Feed ID to react to |
| `type` | string | Yes | Reaction type (like, love, laugh, wow, sad, angry) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/react" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "like"
  }'
```

### Example Response

```json
{
  "message": "Reaction added successfully",
  "data": {
    "reaction": {
      "id": 456,
      "user_id": 1,
      "object_id": 123,
      "object_type": "feed",
      "type": "like",
      "created_at": "2025-10-27T12:00:00"
    },
    "action": "added"
  }
}
```

**Note:** If the user has already reacted with the same type, the reaction will be removed (toggle behavior).

## React to a Comment

Add or toggle a reaction on a comment.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/{feed_id}/comments/{comment_id}/reactions
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feed_id` | integer | Yes | Feed ID containing the comment |
| `comment_id` | integer | Yes | Comment ID to react to |
| `type` | string | Yes | Reaction type |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/comments/45/reactions" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "love"
  }'
```

### Example Response

```json
{
  "message": "Reaction added successfully",
  "data": {
    "reaction": {
      "id": 457,
      "user_id": 1,
      "object_id": 45,
      "object_type": "comment",
      "type": "love",
      "created_at": "2025-10-27T12:05:00"
    },
    "action": "added"
  }
}
```

## Get Reactions for a Feed

Retrieve all reactions for a specific feed.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds/{feed_id}/reactions
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `feed_id` | integer | - | Feed ID |
| `type` | string | - | Filter by reaction type |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/reactions?type=like" \
  -u "username:password"
```

### Example Response

```json
{
  "reactions": [
    {
      "id": 456,
      "user_id": "1",
      "object_id": "123",
      "object_type": "feed",
      "type": "like",
      "created_at": "2025-10-27 12:00:00",
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

## Get Reactions for a Comment

Retrieve all reactions for a specific comment.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/comments/{comment_id}/reactions
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/comments/45/reactions" \
  -u "username:password"
```

## Remove a Reaction

Remove a user's reaction from content.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/reactions/{reaction_id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/reactions/456" \
  -X DELETE \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Reaction removed successfully"
}
```

**Note:** Users can also toggle reactions by posting the same reaction type again.

## Best Practices

### 1. Toggle Behavior

Reactions use toggle behavior - clicking the same reaction removes it:

```bash
# First click - adds reaction
curl -X POST ".../feeds/123/react" -d '{"type": "like"}'

# Second click - removes reaction
curl -X POST ".../feeds/123/react" -d '{"type": "like"}'
```

### 2. Changing Reactions

Users can change their reaction by selecting a different type:

```bash
# User reacts with "like"
curl -X POST ".../feeds/123/react" -d '{"type": "like"}'

# User changes to "love" - automatically removes "like"
curl -X POST ".../feeds/123/react" -d '{"type": "love"}'
```

### 3. Reaction Counts

Always display reaction counts to encourage engagement:

```bash
# Get feed with reaction counts
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/by-id"

# Response includes reactions_count
{
  "data": {
    "id": 123,
    "reactions_count": 45,
    "reactions_summary": {
      "like": 30,
      "love": 10,
      "laugh": 5
    }
  }
}
```

### 4. Real-time Updates

Consider polling for reaction updates on active posts:

```javascript
// Poll every 30 seconds for popular posts
setInterval(() => {
  fetch('/wp-json/fluent-community/v2/feeds/123/reactions')
    .then(response => response.json())
    .then(data => updateReactionCounts(data));
}, 30000);
```

## Common Use Cases

### Display Reaction Summary

Show a summary of all reactions on a feed:

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/reactions" \
  -u "username:password"
```

Use the response to display:
- Total reaction count
- Breakdown by reaction type
- Top reactors

### Most Reacted Content

Find the most popular content:

```bash
# Get feeds sorted by reaction count
curl "https://your-site.com/wp-json/fluent-community/v2/feeds?orderby=reactions_count&order=desc" \
  -u "username:password"
```

## Error Handling

### Content Not Found (404)

```json
{
  "code": "content_not_found",
  "message": "Feed or comment not found",
  "data": {
    "status": 404
  }
}
```

### Invalid Reaction Type (400)

```json
{
  "code": "invalid_reaction_type",
  "message": "Invalid reaction type. Allowed: like, love, laugh, wow, sad, angry",
  "data": {
    "status": 400
  }
}
```

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to react to this content.",
  "data": {
    "status": 403
  }
}
```

### Already Reacted (200)

When toggling off a reaction:

```json
{
  "message": "Reaction removed successfully",
  "data": {
    "action": "removed"
  }
}
```

## Related Endpoints

- [Feeds](./feeds.md) - React to feed posts
- [Comments](./comments.md) - React to comments
- [Profiles](./profiles.md) - View user reaction history

