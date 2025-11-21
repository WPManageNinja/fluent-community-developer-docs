<DocStatusBanner />

# Fluent Community REST API

Welcome to the Fluent Community REST API documentation. Our API allows you to programmatically interact with your Fluent Community site, manage content, users, spaces, and more.

## Getting Started

The Fluent Community API uses WordPress Application Passwords for authentication and follows RESTful principles. All endpoints return JSON responses.

**Base URL:**
```
https://your-site.com/wp-json/fluent-community/v2/
```

## Authentication

All API requests require authentication using WordPress Application Passwords:

1. Go to **WordPress Dashboard → Users → Your Profile**
2. Scroll to **Application Passwords** section
3. Create a new application password
4. Use the credentials in the format: `username:application_password`

**Example Request:**

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  --user "username:xxxx xxxx xxxx xxxx xxxx xxxx"
```

**JavaScript Example:**

```javascript
const username = 'your_username';
const appPassword = 'xxxx xxxx xxxx xxxx xxxx xxxx';
const credentials = btoa(`${username}:${appPassword}`);

fetch('https://your-site.com/wp-json/fluent-community/v2/feeds', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
})
  .then(response => response.json())
  .then(data => console.log(data));
```

::: tip
For same-site requests (e.g., from WordPress admin), you can use WordPress Cookie Authentication with the `X-WP-Nonce` header.
:::

## Quick Example

**List Feeds:**
```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  --user "username:app_password"
```

**Create a Post:**
```bash
curl -X POST "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  --user "username:app_password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First API Post",
    "message": "This post was created via the REST API!",
    "space_id": 1
  }'
```

## API Resources

### Core Resources

- [**Feeds**](./feeds.md) - Create, read, update, and delete community posts
- [**Comments**](./comments.md) - Manage comments and replies
- [**Spaces**](./spaces.md) - Community spaces and groups
- [**Space Groups**](./space-groups.md) - Organize spaces into groups
- [**Space Members**](./space-members.md) - Manage space membership
- [**Profiles**](./profiles.md) - User profiles and information
- [**Members**](./members.md) - Community member management
- [**Activities**](./activities.md) - Activity stream and logs

### Engagement

- [**Reactions**](./reactions.md) - Reactions and likes on content
- [**Bookmarks**](./bookmarks.md) - Saved posts and bookmarks
- [**Notifications**](./notifications.md) - User notifications

### Learning & Courses

- [**Courses**](./courses.md) - Course management
- [**Lessons**](./lessons.md) - Course lessons
- [**Course Progress**](./course-progress.md) - Track student progress
- [**Quizzes**](./quizzes.md) - Course quizzes and assessments

### Media & Settings

- [**Media**](./media.md) - Upload and manage media files
- [**Giphy**](./giphy.md) - Giphy integration
- [**Settings**](./settings.md) - Community settings and configuration
- [**Migrations**](./migrations.md) - Migrate from other platforms

### Pro Features

- [**Followers**](./followers.md) - User following system
- [**Analytics**](./analytics.md) - Community analytics and insights
- [**Moderation**](./moderation.md) - Content moderation tools
- [**Topics**](./topics.md) - Topic management
- [**Webhooks**](./webhooks.md) - Webhook integrations
- [**Scheduled Posts**](./scheduled-posts.md) - Schedule posts for later
- [**Community Managers**](./managers.md) - Manager roles and permissions
- [**Leaderboard**](./leaderboard.md) - Gamification and points

## Common Concepts

### Pagination

Most list endpoints support pagination:

```bash
GET /feeds?page=2&per_page=20
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |

### Filtering & Sorting

Filter and sort results using query parameters:

```bash
# Filter by space
GET /feeds?space_id=5

# Sort by date
GET /feeds?orderby=created_at&order=desc

# Search
GET /feeds?search=javascript

# Combine filters
GET /feeds?space_id=5&status=published&orderby=created_at&order=desc
```

### Response Format

**Success Response:**
```json
{
  "data": {
    "id": 123,
    "title": "Example Post"
  },
  "message": "Success"
}
```

**List Response:**
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

**Error Response:**
```json
{
  "code": "error_code",
  "message": "Human-readable error message",
  "data": {
    "status": 400
  }
}
```

### HTTP Status Codes

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

## Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Default**: 100 requests per minute per user
- **Authenticated**: 1000 requests per minute
- **Admin**: Unlimited

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1635724800
```

## Need Help?

- [Error Handling](./errors.md) - Complete error reference
- [Code Examples](./examples.md) - Examples in multiple languages

## Interactive Playground

Every API endpoint page includes an interactive playground where you can test requests directly from your browser.
