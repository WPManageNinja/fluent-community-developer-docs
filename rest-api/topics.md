# Topics [PRO]

::: tip PRO FEATURE
The Topics API is available in Fluent Community Pro. It allows you to organize content with tags and categories for better content discovery.
:::

The Topics API allows administrators to create and manage topics (tags/categories) that can be assigned to feeds for better content organization and discovery.

## Topic Object

A topic represents a tag or category that can be assigned to feeds.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the topic |
| `title` | string | Topic name |
| `slug` | string | URL-friendly slug |
| `description` | string | Topic description |
| `color` | string | Display color (hex code) |
| `icon` | string | Icon class or URL |
| `parent_id` | integer | Parent topic ID (for hierarchical topics) |
| `posts_count` | integer | Number of posts with this topic |
| `status` | string | Topic status (active, inactive) |
| `serial` | integer | Display order |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |

### Status Values

- `active` - Topic is visible and can be used
- `inactive` - Topic is hidden from users

## Get All Topics

Retrieve all topics in the community.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/admin/topics
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status (active, inactive) |
| `parent_id` | integer | No | Filter by parent topic |
| `search` | string | No | Search topics by name |
| `per_page` | integer | No | Number of topics per page (default: 50) |
| `page` | integer | No | Page number for pagination |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v1/admin/topics?status=active" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "topics": [
    {
      "id": 1,
      "title": "Announcements",
      "slug": "announcements",
      "description": "Official announcements and updates",
      "color": "#FF5733",
      "icon": "megaphone",
      "parent_id": null,
      "posts_count": 45,
      "status": "active",
      "serial": 1,
      "created_at": "2024-01-01 10:00:00",
      "updated_at": "2024-01-15 14:30:00"
    },
    {
      "id": 2,
      "title": "Questions",
      "slug": "questions",
      "description": "Ask questions and get help",
      "color": "#3498DB",
      "icon": "question-circle",
      "parent_id": null,
      "posts_count": 123,
      "status": "active",
      "serial": 2,
      "created_at": "2024-01-01 10:05:00",
      "updated_at": "2024-01-15 16:20:00"
    }
  ],
  "pagination": {
    "total": 12,
    "per_page": 50,
    "current_page": 1,
    "total_pages": 1
  }
}
```

## Create Topic

Create a new topic.

**HTTP Request**

```
POST /wp-json/fluent-community/v1/admin/topics
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Topic name |
| `slug` | string | No | URL-friendly slug (auto-generated if not provided) |
| `description` | string | No | Topic description |
| `color` | string | No | Display color (hex code) |
| `icon` | string | No | Icon class or URL |
| `parent_id` | integer | No | Parent topic ID |
| `status` | string | No | Topic status (default: active) |
| `serial` | integer | No | Display order |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v1/admin/topics" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Feature Requests",
    "description": "Suggest new features for the community",
    "color": "#9B59B6",
    "icon": "lightbulb",
    "status": "active"
  }'
```

### Example Response

```json
{
  "id": 13,
  "title": "Feature Requests",
  "slug": "feature-requests",
  "description": "Suggest new features for the community",
  "color": "#9B59B6",
  "icon": "lightbulb",
  "parent_id": null,
  "posts_count": 0,
  "status": "active",
  "serial": 13,
  "created_at": "2024-01-15 10:30:00",
  "updated_at": "2024-01-15 10:30:00",
  "message": "Topic created successfully."
}
```

## Update Topic

Update an existing topic.

**HTTP Request**

```
PUT /wp-json/fluent-community/v1/admin/topics/{topic_id}
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | No | Topic name |
| `slug` | string | No | URL-friendly slug |
| `description` | string | No | Topic description |
| `color` | string | No | Display color (hex code) |
| `icon` | string | No | Icon class or URL |
| `parent_id` | integer | No | Parent topic ID |
| `status` | string | No | Topic status |
| `serial` | integer | No | Display order |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v1/admin/topics/13" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Feature Ideas",
    "description": "Share your ideas for new features",
    "color": "#8E44AD"
  }'
```

### Example Response

```json
{
  "id": 13,
  "title": "Feature Ideas",
  "slug": "feature-requests",
  "description": "Share your ideas for new features",
  "color": "#8E44AD",
  "icon": "lightbulb",
  "status": "active",
  "updated_at": "2024-01-15 11:00:00",
  "message": "Topic updated successfully."
}
```

## Delete Topic

Delete a topic.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v1/admin/topics/{topic_id}
```

**Permissions:** Administrator only

### Example Request

```bash
curl -X DELETE "https://example.com/wp-json/fluent-community/v1/admin/topics/13" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Topic deleted successfully."
}
```

::: warning
Deleting a topic will remove it from all associated feeds. This action cannot be undone.
:::

## Get Topic Configuration

Retrieve topic configuration settings.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/admin/topics/config
```

**Permissions:** Administrator only

### Example Response

```json
{
  "enabled": true,
  "required_for_posts": false,
  "allow_multiple": true,
  "max_topics_per_post": 5,
  "user_can_create": false,
  "display_on_feed": true,
  "display_style": "badge"
}
```

## Update Topic Configuration

Update topic configuration settings.

**HTTP Request**

```
POST /wp-json/fluent-community/v1/admin/topics/config
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `enabled` | boolean | No | Enable/disable topics feature |
| `required_for_posts` | boolean | No | Require topics when creating posts |
| `allow_multiple` | boolean | No | Allow multiple topics per post |
| `max_topics_per_post` | integer | No | Maximum topics per post |
| `user_can_create` | boolean | No | Allow users to create topics |
| `display_on_feed` | boolean | No | Display topics on feed items |
| `display_style` | string | No | Display style (badge, tag, label) |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v1/admin/topics/config" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "required_for_posts": false,
    "allow_multiple": true,
    "max_topics_per_post": 3
  }'
```

### Example Response

```json
{
  "enabled": true,
  "required_for_posts": false,
  "allow_multiple": true,
  "max_topics_per_post": 3,
  "message": "Topic configuration updated successfully."
}
```

---

## Assigning Topics to Feeds

Topics can be assigned to feeds when creating or updating posts.

### Create Feed with Topics

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v1/feeds" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Feature Announcement",
    "message": "We are excited to announce...",
    "space_id": 12,
    "topics": [1, 2, 5]
  }'
```

### Update Feed Topics

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v1/feeds/123" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "topics": [1, 3, 7]
  }'
```

### Filter Feeds by Topic

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v1/feeds?topics=1,2" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

---

## Best Practices

### 1. Use Descriptive Names
Choose clear, descriptive names for topics:

```javascript
// Good
{ title: "Product Updates", description: "Latest product features and improvements" }

// Bad
{ title: "Updates", description: "" }
```

### 2. Organize with Hierarchy
Use parent topics for better organization:

```javascript
// Parent topic
{ id: 1, title: "Support", parent_id: null }

// Child topics
{ id: 10, title: "Technical Support", parent_id: 1 }
{ id: 11, title: "Billing Support", parent_id: 1 }
```

### 3. Use Colors Consistently
Assign colors that match topic categories:

```javascript
const topicColors = {
  announcements: '#FF5733',
  questions: '#3498DB',
  discussions: '#2ECC71',
  feedback: '#9B59B6'
};
```

### 4. Limit Topics per Post
Don't overwhelm users with too many topics:

```javascript
// Configure reasonable limits
{
  allow_multiple: true,
  max_topics_per_post: 3
}
```

### 5. Monitor Topic Usage
Track which topics are most popular:

```javascript
async function getTopicStats() {
  const response = await fetch('/wp-json/fluent-community/v1/admin/topics');
  const data = await response.json();
  
  return data.topics
    .sort((a, b) => b.posts_count - a.posts_count)
    .slice(0, 10);
}
```

---

## Common Use Cases

### 1. Topic Management Dashboard

Create a topic management interface:

```javascript
async function getTopicsDashboard() {
  const [topics, config] = await Promise.all([
    fetch('/wp-json/fluent-community/v1/admin/topics'),
    fetch('/wp-json/fluent-community/v1/admin/topics/config')
  ]);
  
  return {
    topics: await topics.json(),
    config: await config.json()
  };
}
```

### 2. Topic Filter Widget

Create a topic filter for feeds:

```javascript
async function getTopicsForFilter() {
  const response = await fetch('/wp-json/fluent-community/v1/admin/topics?status=active');
  const data = await response.json();
  
  return data.topics.map(topic => ({
    id: topic.id,
    label: topic.title,
    color: topic.color,
    count: topic.posts_count
  }));
}
```

### 3. Trending Topics

Display trending topics based on recent activity:

```javascript
async function getTrendingTopics(days = 7) {
  const response = await fetch('/wp-json/fluent-community/v1/admin/topics');
  const data = await response.json();
  
  // Sort by recent activity (simplified)
  return data.topics
    .filter(t => t.posts_count > 0)
    .sort((a, b) => b.posts_count - a.posts_count)
    .slice(0, 5);
}
```

### 4. Bulk Topic Assignment

Assign topics to multiple posts:

```javascript
async function bulkAssignTopics(feedIds, topicIds) {
  const promises = feedIds.map(feedId =>
    fetch(`/wp-json/fluent-community/v1/feeds/${feedId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      },
      body: JSON.stringify({ topics: topicIds })
    })
  );
  
  await Promise.all(promises);
  console.log(`Topics assigned to ${feedIds.length} posts`);
}
```

---

## Error Handling

### Common Errors

**403 Forbidden**
```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you don't have permission to manage topics.",
  "data": {
    "status": 403
  }
}
```

**404 Not Found**
```json
{
  "code": "not_found",
  "message": "Topic not found.",
  "data": {
    "status": 404
  }
}
```

**400 Bad Request**
```json
{
  "code": "duplicate_slug",
  "message": "A topic with this slug already exists.",
  "data": {
    "status": 400
  }
}
```

---

## Related Endpoints

- [Feeds](/rest-api/feeds) - Create and manage feed posts
- [Spaces](/rest-api/spaces) - Manage community spaces
- [Settings](/rest-api/settings) - Community settings

