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
| `context[user_id]` | integer | Yes | Filter by specific user ID |
| `page` | integer | No | Page number for pagination |
| `per_page` | integer | No | Number of activities per page (default: 20) |


### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/activities" \
  -X GET \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    context[user_id]: 1,
    page: 1,
    per_page: 5
  }'
```

### Example Response

```json
{
    "activities": {
        "data": [
            {
                "id": 781,
                "message": "<span class=\"fcom_user_name\">John Doe<\/span> added a comment on <span class=\"fcom_feed_excerpt\">Please give your vote l<\/span>",
                "xprofile": {
                    "user_id": 1,
                    "total_points": 61,
                    "is_verified": 1,
                    "status": "active",
                    "display_name": "John Doe",
                    "username": "admin",
                    "avatar": "",
                    "created_at": "2024-01-31 09:12:21",
                    "short_description": "Lorem Ipsum is not simply random text..",
                    "meta": {
                        "cover_photo": "",
                        "website": ""
                    },
                    "last_activity": "2025-12-17 12:09:24",
                    "badge": null
                },
                "updated_at": "2025-12-15 08:30:33",
                "route": {
                    "name": "space_feed",
                    "params": {
                        "space": "give-feedback123",
                        "feed_slug": "please-give-your-vote"
                    },
                    "query": {
                        "comment_id": "554"
                    }
                }
            },
            {
                "id": 780,
                "message": "<span class=\"fcom_user_name\">John Doe<\/span> published a new status <span class=\"fcom_feed_excerpt\">topf<\/span>",
                "xprofile": {
                    "user_id": 1,
                    "total_points": 61,
                    "is_verified": 1,
                    "status": "active",
                    "display_name": "John Doe",
                    "username": "admin",
                    "avatar": "",
                    "created_at": "2024-01-31 09:12:21",
                    "short_description": "Lorem Ipsum is not simply random text.",
                    "meta": {
                        "cover_photo": "",
                        "website": ""
                    },
                    "last_activity": "2025-12-17 12:09:24",
                    "badge": null
                },
                "updated_at": "2025-12-14 20:39:29",
                "route": {
                    "name": "space_feed",
                    "params": {
                        "space": "give-feedback123",
                        "feed_slug": "topf-1765723169"
                    }
                }
            },
        ],
        "total": 376,
        "per_page": 5,
        "current_page": 1
    },
    "after_contents": "",
    "before_contents": ""
}
```

## Get Single Space Activities

Retrieve all activities within a specific space.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/activities
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `context[type]` | string | Yes | Filter by specific activities type |
| `context[space_id]` | integer | Yes | ID of the space |
| `page` | integer | No | Page number for pagination |
| `per_page` | integer | No | Number of activities per page |


### Example Request

```bash
curl "https://your-site.com.com/wp-json/fluent-community/v2/activities" \
  -X GET \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    context[user_id]: 1,
    page: 1,
    per_page: 5
  }'
```

### Example Response

```json
{
    "activities": {
        "data": [
            {
                "id": 781,
                "message": "<span class=\"fcom_user_name\">Test User<\/span> added a comment on <span class=\"fcom_feed_excerpt\">Please give your vote l<\/span>",
                "xprofile": {
                    "user_id": 1,
                    "total_points": 61,
                    "is_verified": 1,
                    "status": "active",
                    "display_name": "Test User",
                    "username": "test_user",
                    "avatar": "",
                    "created_at": "2024-01-31 09:12:21",
                    "short_description": "Lorem Ipsum is not simply random text..",
                    "meta": {
                        "cover_photo": "",
                        "website": ""
                    },
                    "last_activity": "2025-12-17 12:09:24",
                    "badge": null
                },
                "updated_at": "2025-12-15 08:30:33",
                "route": {
                    "name": "space_feed",
                    "params": {
                        "space": "give-feedback123",
                        "feed_slug": "please-give-your-vote"
                    },
                    "query": {
                        "comment_id": "554"
                    }
                }
            },
            {
                "id": 780,
                "message": "<span class=\"fcom_user_name\">John Doe<\/span> published a new status <span class=\"fcom_feed_excerpt\">topf<\/span>",
                "xprofile": {
                    "user_id": 1,
                    "total_points": 61,
                    "is_verified": 1,
                    "status": "active",
                    "display_name": "John Doe",
                    "username": "admin",
                    "avatar": "",
                    "created_at": "2024-01-31 09:12:21",
                    "short_description": "Lorem Ipsum is not simply random text.",
                    "meta": {
                        "cover_photo": "",
                        "website": ""
                    },
                    "last_activity": "2025-12-17 12:09:24",
                    "badge": null
                },
                "updated_at": "2025-12-14 20:39:29",
                "route": {
                    "name": "space_feed",
                    "params": {
                        "space": "give-feedback123",
                        "feed_slug": "topf-1765723169"
                    }
                }
            },
        ],
        "total": 376,
        "per_page": 5,
        "current_page": 1
    },
    "after_contents": "",
    "before_contents": ""
}
```

## Get All Spaces Activities

Retrieve all activities of all available spaces.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/activities
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number for pagination |
| `per_page` | integer | No | Number of activities per page |


### Example Request

```bash
curl "https://your-site.com.com/wp-json/fluent-community/v2/activities" \
  -X GET \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    context[user_id]: 1,
    page: 1,
    per_page: 5
  }'
```

### Example Response

```json
{
    "activities": {
        "data": [
            {
                "id": 781,
                "message": "<span class=\"fcom_user_name\">Richard Johnson<\/span> added a comment on <span class=\"fcom_feed_excerpt\">Please give your note<\/span>",
                "xprofile": {
                    "user_id": 12,
                    "total_points": 61,
                    "is_verified": 1,
                    "status": "active",
                    "display_name": "Richard Johnson",
                    "username": "richard_johnson",
                    "avatar": "",
                    "created_at": "2024-01-31 09:12:21",
                    "short_description": "Lorem Ipsum is not simply random text..",
                    "meta": {
                        "cover_photo": "",
                        "website": ""
                    },
                    "last_activity": "2025-12-17 12:09:24",
                    "badge": null
                },
                "updated_at": "2025-12-15 08:30:33",
                "route": {
                    "name": "space_feed",
                    "params": {
                        "space": "test-server",
                        "feed_slug": "test-server22"
                    },
                    "query": {
                        "comment_id": "552"
                    }
                }
            },
            {
                "id": 780,
                "message": "<span class=\"fcom_user_name\">John Doe<\/span> published a new status <span class=\"fcom_feed_excerpt\">topf<\/span>",
                "xprofile": {
                    "user_id": 21,
                    "total_points": 61,
                    "is_verified": 1,
                    "status": "active",
                    "display_name": "John Doe",
                    "username": "admin",
                    "avatar": "",
                    "created_at": "2024-01-31 09:12:21",
                    "short_description": "Lorem Ipsum is not simply random text.",
                    "meta": {
                        "cover_photo": "",
                        "website": ""
                    },
                    "last_activity": "2025-12-17 12:09:24",
                    "badge": null
                },
                "updated_at": "2025-12-14 20:39:29",
                "route": {
                    "name": "space_feed",
                    "params": {
                        "space": "give-feedback123",
                        "feed_slug": "topf-1765723169"
                    }
                }
            },
        ],
        "total": 376,
        "per_page": 5,
        "current_page": 1
    },
    "after_contents": "",
    "before_contents": ""
}
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
