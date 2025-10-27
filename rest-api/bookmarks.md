# Bookmarks

The Bookmarks API allows users to save feeds for later reading and organize their favorite content.

## Bookmark Object

A bookmark represents a saved feed for a user.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the bookmark |
| `user_id` | integer | ID of the user who bookmarked |
| `feed_id` | integer | ID of the bookmarked feed |
| `created_at` | datetime | Bookmark creation timestamp |
| `feed` | object | Full feed object (when included) |

## List All Bookmarks

Retrieve all bookmarked feeds for the current user.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/feeds/bookmarks
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |
| `orderby` | string | created_at | Sort field |
| `order` | string | desc | Sort order (asc, desc) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/bookmarks?per_page=10" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": [
    {
      "id": 789,
      "user_id": 1,
      "feed_id": 123,
      "created_at": "2025-10-27T10:00:00",
      "feed": {
        "id": 123,
        "title": "Important Article",
        "slug": "important-article",
        "message": "This is a must-read article...",
        "message_rendered": "<p>This is a must-read article...</p>",
        "space_id": 5,
        "status": "published",
        "comments_count": 12,
        "reactions_count": 45,
        "created_at": "2025-10-25T14:30:00",
        "author": {
          "id": 2,
          "username": "jane_smith",
          "display_name": "Jane Smith",
          "avatar": "https://example.com/avatar.jpg"
        }
      }
    }
  ],
  "meta": {
    "total": 25,
    "per_page": 10,
    "current_page": 1,
    "total_pages": 3
  }
}
```

## Add a Bookmark

Save a feed to the current user's bookmarks.

**HTTP Request**

```
POST /wp-json/fluent-community/v1/feeds/{feed_id}/bookmark
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feed_id` | integer | Yes | Feed ID to bookmark |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/123/bookmark" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Feed bookmarked successfully",
  "data": {
    "bookmark": {
      "id": 789,
      "user_id": 1,
      "feed_id": 123,
      "created_at": "2025-10-27T12:00:00"
    },
    "action": "added"
  }
}
```

## Remove a Bookmark

Remove a feed from the current user's bookmarks.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v1/feeds/{feed_id}/bookmark
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feed_id` | integer | Yes | Feed ID to unbookmark |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/123/bookmark" \
  -X DELETE \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Bookmark removed successfully",
  "data": {
    "action": "removed"
  }
}
```

## Check Bookmark Status

Check if a feed is bookmarked by the current user.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/feeds/{feed_id}/bookmark-status
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/123/bookmark-status" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": {
    "is_bookmarked": true,
    "bookmark_id": 789,
    "bookmarked_at": "2025-10-27T12:00:00"
  }
}
```

## Best Practices

### 1. Toggle Behavior

Implement bookmark toggle in your UI:

```javascript
async function toggleBookmark(feedId) {
  const status = await checkBookmarkStatus(feedId);
  
  if (status.is_bookmarked) {
    // Remove bookmark
    await fetch(`/wp-json/fluent-community/v1/feeds/${feedId}/bookmark`, {
      method: 'DELETE',
      headers: { 'Authorization': 'Bearer TOKEN' }
    });
  } else {
    // Add bookmark
    await fetch(`/wp-json/fluent-community/v1/feeds/${feedId}/bookmark`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer TOKEN' }
    });
  }
}
```

### 2. Bookmark Collections

Organize bookmarks by space or topic:

```bash
# Get bookmarks from a specific space
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/bookmarks" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  | jq '.data[] | select(.feed.space_id == 5)'
```

### 3. Reading List

Create a "Read Later" feature:

```bash
# Get unread bookmarks (feeds created before bookmark)
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/bookmarks?orderby=created_at&order=asc" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### 4. Bookmark Limits

Consider implementing bookmark limits for performance:

```javascript
const MAX_BOOKMARKS = 100;

async function addBookmark(feedId) {
  const bookmarks = await getBookmarks();
  
  if (bookmarks.meta.total >= MAX_BOOKMARKS) {
    alert('You have reached the maximum number of bookmarks. Please remove some before adding new ones.');
    return;
  }
  
  // Add bookmark
  await fetch(`/wp-json/fluent-community/v1/feeds/${feedId}/bookmark`, {
    method: 'POST'
  });
}
```

## Common Use Cases

### Reading List Feature

Create a personalized reading list:

```bash
# Get all bookmarks
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/bookmarks" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"

# Display as "Read Later" list in your app
```

### Favorite Content

Allow users to mark favorite posts:

```bash
# Bookmark important content
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/123/bookmark" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Content Curation

Curate content for later sharing:

```bash
# Get bookmarks to share in a newsletter
curl "https://your-site.com/wp-json/fluent-community/v1/feeds/bookmarks?per_page=5&orderby=reactions_count" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Offline Reading

Sync bookmarks for offline access:

```javascript
// Fetch all bookmarks and cache locally
async function syncBookmarksForOffline() {
  const response = await fetch(
    'https://your-site.com/wp-json/fluent-community/v1/feeds/bookmarks?per_page=100',
    {
      headers: { 'Authorization': 'Bearer TOKEN' }
    }
  );
  
  const bookmarks = await response.json();
  
  // Store in local storage or IndexedDB
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks.data));
}
```

### Bookmark Analytics

Track which content users find most valuable:

```bash
# Get most bookmarked feeds
curl "https://your-site.com/wp-json/fluent-community/v1/feeds?orderby=bookmarks_count&order=desc" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Error Handling

### Feed Not Found (404)

```json
{
  "code": "feed_not_found",
  "message": "Feed not found",
  "data": {
    "status": 404
  }
}
```

### Already Bookmarked (400)

```json
{
  "code": "already_bookmarked",
  "message": "This feed is already bookmarked",
  "data": {
    "status": 400,
    "bookmark_id": 789
  }
}
```

### Bookmark Not Found (404)

When trying to remove a non-existent bookmark:

```json
{
  "code": "bookmark_not_found",
  "message": "Bookmark not found",
  "data": {
    "status": 404
  }
}
```

### Unauthorized (401)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you must be logged in to bookmark content.",
  "data": {
    "status": 401
  }
}
```

## Related Endpoints

- [Feeds](./feeds.md) - View and manage feeds
- [Profiles](./profiles.md) - User bookmark collections
- [Spaces](./spaces.md) - Bookmark feeds from specific spaces

