<DocStatusBanner />

# Activities

The Activities API allows you to retrieve user activity history, including posts created, comments added, reactions, space joins, and other community interactions.

## Activity Object

An activity represents a user action in the community.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the activity |
| `user_id` | integer | ID of the user who performed the activity |
| `action_type` | string | Type of activity performed |
| `object_id` | integer | ID of the related object (feed, comment, space, etc.) |
| `object_type` | string | Type of object (feed, comment, space, etc.) |
| `space_id` | integer | Associated space ID (if applicable) |
| `meta` | object | Additional activity metadata |
| `created_at` | datetime | Activity timestamp |

### Activity Types

- `post_created` - User created a new feed post
- `comment_added` - User added a comment
- `reaction_added` - User reacted to content
- `space_joined` - User joined a space
- `space_created` - User created a space
- `course_enrolled` - User enrolled in a course
- `lesson_completed` - User completed a lesson
- `profile_updated` - User updated their profile
- `follow_user` - User followed another user (PRO)
- `bookmark_added` - User bookmarked content

## Get User Activities

Retrieve activity history for a user.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/activities
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | integer | No | Filter by specific user ID (defaults to current user) |
| `action_type` | string | No | Filter by activity type |
| `space_id` | integer | No | Filter by space |
| `per_page` | integer | No | Number of activities per page (default: 20) |
| `page` | integer | No | Page number for pagination |
| `date_from` | string | No | Start date (YYYY-MM-DD format) |
| `date_to` | string | No | End date (YYYY-MM-DD format) |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/activities?per_page=20&page=1" \
  -u "username:password"
```

### Example Response

```json
{
  "activities": {
    "data": [
      {
        "id": 100007,
        "message": "<span class=\"fcom_user_name\">User Name</span> published a new status <span class=\"fcom_feed_excerpt\">Post Title</span>",
        "updated_at": "2025-07-25 08:51:01",
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
        "route": {
          "name": "space_feed",
          "params": {
            "space": "general-discussion",
            "feed_slug": "post-title-slug"
          }
        }
      },
      {
        "id": 100003,
        "message": "<span class=\"fcom_user_name\">User Name</span> added a comment on <span class=\"fcom_feed_excerpt\">Post Title</span>",
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
        },
        "route": {
          "name": "space_feed",
          "params": {
            "space": "general-discussion",
            "feed_slug": "post-title-slug"
          },
          "query": {
            "comment_id": "1002"
          }
        }
      }
    ],
    "total": 156,
    "per_page": 20,
    "current_page": 1
  },
  "after_contents": "",
  "pinned_posts": []
}
```

## Get Activities by Type

Filter activities by specific action type.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/activities?action_type={type}
```

### Example Request

```bash
# Get all post creation activities
curl -X GET "https://example.com/wp-json/fluent-community/v2/activities?action_type=post_created" \
  -u "username:password"
```

## Get Activities by Date Range

Filter activities within a specific date range.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/activities?date_from={start}&date_to={end}
```

### Example Request

```bash
# Get activities from last 7 days
curl -X GET "https://example.com/wp-json/fluent-community/v2/activities?date_from=2024-01-08&date_to=2024-01-15" \
  -u "username:password"
```

## Get Space Activities

Retrieve all activities within a specific space.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/activities?space_id={space_id}
```

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/activities?space_id=12" \
  -u "username:password"
```

---

## Best Practices

### 1. Use Pagination
Always paginate activity feeds to avoid performance issues:

```javascript
// Load activities in batches
const activities = await fetch('/wp-json/fluent-community/v2/activities?per_page=20&page=1');
```

### 2. Filter by Type
Filter activities by type for specific use cases:

```javascript
// Show only post creation activities
const posts = await fetch('/wp-json/fluent-community/v2/activities?action_type=post_created');
```

### 3. Cache Activity Data
Cache activity feeds to reduce API calls:

```javascript
// Cache for 5 minutes
const cacheKey = `activities_${userId}`;
const cached = localStorage.getItem(cacheKey);
if (cached && Date.now() - cached.timestamp < 300000) {
  return cached.data;
}
```

### 4. Use Date Filters
Use date ranges for historical analysis:

```javascript
// Get last month's activities
const lastMonth = await fetch('/wp-json/fluent-community/v2/activities?date_from=2024-01-01&date_to=2024-01-31');
```

### 5. Combine Filters
Combine multiple filters for specific queries:

```javascript
// Get user's posts in a specific space
const activities = await fetch('/wp-json/fluent-community/v2/activities?user_id=45&action_type=post_created&space_id=12');
```

---

## Common Use Cases

### 1. User Activity Timeline

Display a user's recent activity on their profile:

```javascript
async function getUserTimeline(userId) {
  const response = await fetch(
    `/wp-json/fluent-community/v2/activities?user_id=${userId}&per_page=10`,
    {
      headers: {
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      }
    }
  );
  
  const data = await response.json();
  return data.activities;
}

// Display timeline
const timeline = await getUserTimeline(45);
timeline.forEach(activity => {
  console.log(`${activity.action_type} at ${activity.created_at}`);
});
```

### 2. Activity Feed Widget

Create a real-time activity feed for the community:

```javascript
async function getRecentActivity() {
  const response = await fetch(
    '/wp-json/fluent-community/v2/activities?per_page=20',
    {
      headers: {
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      }
    }
  );
  
  const data = await response.json();
  
  // Group by activity type
  const grouped = data.activities.reduce((acc, activity) => {
    acc[activity.action_type] = acc[activity.action_type] || [];
    acc[activity.action_type].push(activity);
    return acc;
  }, {});
  
  return grouped;
}
```

### 3. Space Activity Monitor

Monitor activity within a specific space:

```javascript
async function getSpaceActivity(spaceId, days = 7) {
  const dateTo = new Date().toISOString().split('T')[0];
  const dateFrom = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    .toISOString().split('T')[0];
  
  const response = await fetch(
    `/wp-json/fluent-community/v2/activities?space_id=${spaceId}&date_from=${dateFrom}&date_to=${dateTo}`,
    {
      headers: {
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      }
    }
  );
  
  const data = await response.json();
  
  // Calculate activity metrics
  const metrics = {
    total: data.activities.length,
    posts: data.activities.filter(a => a.action_type === 'post_created').length,
    comments: data.activities.filter(a => a.action_type === 'comment_added').length,
    reactions: data.activities.filter(a => a.action_type === 'reaction_added').length
  };
  
  return metrics;
}
```

### 4. User Engagement Report

Generate engagement reports based on activity data:

```javascript
async function getUserEngagement(userId, dateFrom, dateTo) {
  const response = await fetch(
    `/wp-json/fluent-community/v2/activities?user_id=${userId}&date_from=${dateFrom}&date_to=${dateTo}`,
    {
      headers: {
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      }
    }
  );
  
  const data = await response.json();
  
  return {
    totalActivities: data.pagination.total,
    postsCreated: data.activities.filter(a => a.action_type === 'post_created').length,
    commentsAdded: data.activities.filter(a => a.action_type === 'comment_added').length,
    spacesJoined: data.activities.filter(a => a.action_type === 'space_joined').length,
    coursesEnrolled: data.activities.filter(a => a.action_type === 'course_enrolled').length
  };
}
```

---

## Error Handling

### Common Errors

**401 Unauthorized**
```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to access activities.",
  "data": {
    "status": 401
  }
}
```

**404 Not Found**
```json
{
  "code": "not_found",
  "message": "User not found.",
  "data": {
    "status": 404
  }
}
```

**400 Bad Request**
```json
{
  "code": "invalid_parameter",
  "message": "Invalid date format. Use YYYY-MM-DD.",
  "data": {
    "status": 400
  }
}
```

---

## Related Endpoints

- [Feeds](/rest-api/feeds) - Create and manage feed posts
- [Comments](/rest-api/comments) - Add comments to feeds
- [Spaces](/rest-api/spaces) - Join and manage spaces
- [Profiles](/rest-api/profiles) - View user profiles
- [Notifications](/rest-api/notifications) - Get user notifications
