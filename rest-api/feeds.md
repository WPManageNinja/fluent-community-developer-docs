<DocStatusBanner />

# Feeds

The Feeds API allows you to manage posts and content in your community. Feeds are the primary content type where users share updates, discussions, and media.

## Feed Object

A feed represents a post or content item in your community.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the feed |
| `user_id` | integer | ID of the user who created the feed |
| `parent_id` | integer | Parent feed ID (for nested content) |
| `title` | string | Feed title |
| `slug` | string | URL-friendly slug |
| `message` | string | Raw feed content |
| `message_rendered` | string | Rendered HTML content |
| `type` | string | Feed type (feed, announcement, etc.) |
| `content_type` | string | Content format (text, markdown, html) |
| `space_id` | integer | Associated space ID |
| `privacy` | string | Privacy setting (public, private) |
| `status` | string | Publication status (published, draft, scheduled) |
| `featured_image` | string | Featured image URL |
| `meta` | object | Additional metadata (JSON) |
| `is_sticky` | boolean | Whether feed is pinned |
| `comments_count` | integer | Number of comments |
| `reactions_count` | integer | Number of reactions |
| `priority` | integer | Display priority |
| `expired_at` | datetime | Expiration timestamp |
| `scheduled_at` | datetime | Scheduled publication time |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |

### Status Values

- `published` - Live and visible
- `draft` - Not yet published
- `scheduled` - Scheduled for future publication
- `pending` - Awaiting moderation
- `spam` - Marked as spam

### Feed Types

- `feed` - Standard community post (default)
- `announcement` - Important announcement
- `course_lesson` - Course lesson content
- `question` - Question/Q&A post

### Content Types

- `text` - Plain text content
- `markdown` - Markdown formatted content
- `html` - HTML formatted content
- `document` - Document library content
- `survey` - Poll or survey content
- `video` - Video content
- `audio` - Audio content

## List All Feeds

Retrieve a paginated list of feeds.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 10 | Items per page (max: 100) |
| `space` | string | - | Filter by space slug |
| `user_id` | integer | - | Filter by author ID |
| `search` | string | - | Search in title and content |
| `topic_slug` | string | - | Filter by topic slug |
| `order_by_type` | string | - | Sort type (recent, popular, etc.) |
| `disable_sticky` | string | - | Set to 'yes' to exclude sticky posts |

### Example Request

```bash
curl "https://community.test/wp-json/fluent-community/v2/feeds?space=general&per_page=10" \
  -u "username:password"
```

### Example Response

```json
{
  "feeds": {
    "data": [
      {
        "id": 1007,
        "slug": "kmkm-1753433461",
        "title": "kmkm",
        "message_rendered": "<p>kmkm</p>",
        "type": "text",
        "content_type": "text",
        "space_id": "478",
        "user_id": "1",
        "privacy": "public",
        "status": "published",
        "priority": 0,
        "featured_image": null,
        "is_sticky": 0,
        "scheduled_at": null,
        "comments_count": 0,
        "reactions_count": 0,
        "created_at": "2025-07-25 08:51:01",
        "permalink": "https://community.test/portal/space/...",
        "meta": {},
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
        },
        "space": {
          "id": 478,
          "title": "Nolan-Koch PLC",
          "slug": "sapiente-perspiciatis-tempore-consequatur-debitis",
          "type": "community"
        },
        "comments": [],
        "reactions": [],
        "terms": []
      }
    ],
    "current_page": 1,
    "per_page": 1,
    "from": 1,
    "to": 1,
    "has_more": true,
    "total": 2
  },
  "sticky": null,
  "execution_time": 0.014298
}
```

## Get a Specific Feed

Retrieve details for a single feed by ID or slug.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds/{feed_id}/by-id
GET /wp-json/fluent-community/v2/feeds/{feed_slug}/by-slug
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `feed_id` | integer | Yes | Feed ID (for by-id endpoint) |
| `feed_slug` | string | Yes | Feed slug (for by-slug endpoint) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/123/by-id" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "id": 123,
    "user_id": 1,
    "title": "Welcome to the Community",
    "slug": "welcome-to-the-community",
    "message": "We're excited to have you here!",
    "message_rendered": "<p>We're excited to have you here!</p>",
    "type": "feed",
    "content_type": "text",
    "space_id": 5,
    "privacy": "public",
    "status": "published",
    "featured_image": "https://example.com/image.jpg",
    "meta": {
      "custom_field": "value"
    },
    "comments_count": 12,
    "reactions_count": 45,
    "is_sticky": false,
    "created_at": "2025-10-27T10:00:00",
    "updated_at": "2025-10-27T11:30:00",
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

## Create a Feed

Create a new feed post.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | No | Feed title |
| `message` | string | Yes | Feed content |
| `type` | string | No | Post type (text, survey, document) |
| `space` | string | Yes | Space to post in (using space_slug) |
| `scheduled_at` | datetime | No | Schedule publication time |
| `meta` | object | No | Additional metadata |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Post",
    "message": "Hello everyone! This is my first post.",
    "type": "text",
    "space": "general_feedback",
  }'
```

### Example Response

```json
{
  "message": "Your post has been published",
  "data": {
    "id": 124,
    "title": "My First Post",
    "message": "Hello everyone! This is my first post.",
    "message_rendered": "<p>Hello everyone! This is my first post.</p>",
    "slug": "my-first-post",
    "content_type": "text",   
    "status": "published",
    "privacy": "public",
    "space_id": "1",
    "user_id": "1",
    "created_at": "2025-10-27T12:00:00"
  }
}
```

## Update a Feed

Modify an existing feed.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/{feed_id}
```

### Parameters

All create parameters are available for updates (all optional).

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/124" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Updated Post",
    "message": "Updated content here."
  }'
```

### Example Response

```json
{
  "message": "Feed updated successfully",
  "data": {
    "id": 124,
    "title": "My Updated Post",
    "updated_at": "2025-10-27T13:00:00"
  }
}
```

## Delete a Feed

Remove a feed permanently.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/feeds/{feed_id}
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds/124" \
  -X DELETE \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Feed deleted successfully"
}
```

## Best Practices

### 1. Content Formatting

Choose the appropriate content type for your needs:
- Use `text` for simple posts
- Use `markdown` for formatted content with links and lists
- Use `html` only when you need full control

### 2. Space Organization

Always assign feeds to appropriate spaces for better organization:

```bash
# Post to a specific space
curl "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  -X POST \
  -u "username:password" \
  -d '{
    "message": "Space-specific content",
    "space_id": 5
  }'
```

### 3. Scheduled Publishing

Use scheduled posts for time-sensitive content:

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  -X POST \
  -u "username:password" \
  -d '{
    "message": "This will be published later",
    "status": "scheduled",
    "scheduled_at": "2025-10-28T09:00:00"
  }'
```

### 4. Draft Management

Save drafts before publishing:

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  -X POST \
  -u "username:password" \
  -d '{
    "message": "Work in progress",
    "status": "draft"
  }'
```

## Common Use Cases

### Announcements

Create important announcements with sticky posts:

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  -X POST \
  -u "username:password" \
  -d '{
    "title": "Important Announcement",
    "message": "System maintenance scheduled for tomorrow.",
    "type": "announcement",
    "is_sticky": true,
    "space_id": 1
  }'
```

### Discussion Threads

Start a discussion in a specific space:

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds" \
  -X POST \
  -u "username:password" \
  -d '{
    "title": "What are your thoughts on...?",
    "message": "I would love to hear your opinions about...",
    "space_id": 3
  }'
```

### Content Migration

Bulk import content from another system:

```bash
# Import multiple feeds
for post in "${posts[@]}"; do
  curl "https://your-site.com/wp-json/fluent-community/v2/feeds" \
    -X POST \
    -u "username:password" \
    -d "$post"
done
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

### Invalid Content (400)

```json
{
  "code": "invalid_content",
  "message": "Feed message is required",
  "data": {
    "status": 400
  }
}
```

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to create feeds in this space.",
  "data": {
    "status": 403
  }
}
```

---

## Survey & Voting

Create polls and surveys within feed posts to gather community feedback.

### Survey Object

A survey is embedded within a feed post with voting options.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `question` | string | Survey question |
| `options` | array | List of voting options |
| `allow_multiple` | boolean | Allow multiple selections |
| `show_results` | string | When to show results (always, after_vote, never) |
| `end_date` | datetime | Survey end date (optional) |

### Cast Survey Vote

Vote on a survey/poll in a feed post.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/{feed_id}/apps/survey-vote
```

**Permissions:** Authenticated users

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `option_slug` | string | Yes | Slug of the selected option |

**Example Request:**

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/feeds/123/apps/survey-vote" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "option_slug": "option-1"
  }'
```

**Example Response:**

```json
{
  "success": true,
  "message": "Vote recorded successfully.",
  "results": {
    "total_votes": 45,
    "options": [
      {
        "slug": "option-1",
        "label": "Yes",
        "votes": 30,
        "percentage": 66.7
      },
      {
        "slug": "option-2",
        "label": "No",
        "votes": 15,
        "percentage": 33.3
      }
    ]
  }
}
```

### Get Survey Voters

Retrieve list of users who voted for a specific option.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds/{feed_id}/apps/survey-voters/{option_slug}
```

**Permissions:** Authenticated users

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `per_page` | integer | No | Number of voters per page (default: 20) |
| `page` | integer | No | Page number for pagination |

**Example Request:**

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/feeds/123/apps/survey-voters/option-1?per_page=20" \
  -u "username:password"
```

**Example Response:**

```json
{
  "voters": [
    {
      "id": 45,
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "voted_at": "2024-01-15 10:30:00"
    },
    {
      "id": 67,
      "display_name": "Jane Smith",
      "avatar": "https://example.com/avatar2.jpg",
      "voted_at": "2024-01-15 11:15:00"
    }
  ],
  "pagination": {
    "total": 30,
    "per_page": 20,
    "current_page": 1,
    "total_pages": 2
  }
}
```

### Create Feed with Survey

Create a feed post with an embedded survey.

**Example Request:**

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/feeds" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "What feature should we build next?",
    "message": "Help us prioritize our roadmap!",
    "space_id": 12,
    "type": "feed",
    "meta": {
      "survey": {
        "question": "What feature should we build next?",
        "options": [
          {"slug": "dark-mode", "label": "Dark Mode"},
          {"slug": "mobile-app", "label": "Mobile App"},
          {"slug": "integrations", "label": "More Integrations"},
          {"slug": "analytics", "label": "Advanced Analytics"}
        ],
        "allow_multiple": false,
        "show_results": "after_vote",
        "end_date": "2024-02-01 23:59:59"
      }
    }
  }'
```

---

## Additional Features

### Get Activity Ticker

Retrieve recent activity ticker for the community.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds/ticker
```

**Permissions:** Authenticated users

**Example Response:**

```json
{
  "activities": [
    {
      "type": "feed_created",
      "user": "John Doe",
      "action": "posted in",
      "target": "General Discussion",
      "timestamp": "2 minutes ago"
    },
    {
      "type": "comment_added",
      "user": "Jane Smith",
      "action": "commented on",
      "target": "Welcome Post",
      "timestamp": "5 minutes ago"
    }
  ]
}
```

### Preview Markdown

Convert markdown to HTML for preview.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/markdown-preview
```

**Permissions:** Authenticated users

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `content` | string | Yes | Markdown content to preview |

**Example Request:**

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/feeds/markdown-preview" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "# Hello World

This is **bold** and this is *italic*."
  }'
```

**Example Response:**

```json
{
  "html": "<h1>Hello World</h1>
<p>This is <strong>bold</strong> and this is <em>italic</em>.</p>"
}
```

### Get Feed Links

Retrieve links associated with feeds.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds/links
```

**Permissions:** Administrator only

### Update Feed Links

Update links configuration for feeds.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds/links
```

**Permissions:** Administrator only

---

## Related Endpoints

- [Comments](./comments.md) - Add comments to feeds
- [Reactions](./reactions.md) - React to feeds
- [Bookmarks](./bookmarks.md) - Bookmark feeds
- [Spaces](./spaces.md) - Manage spaces where feeds are posted
- [Media](./media.md) - Upload media for feeds
- [Scheduled Posts](/rest-api/scheduled-posts) - Schedule posts for future publication
