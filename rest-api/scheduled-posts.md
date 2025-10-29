# Scheduled Posts [PRO]

::: tip PRO FEATURE
The Scheduled Posts API is available in Fluent Community Pro. It allows you to schedule feed posts for future publication.
:::

The Scheduled Posts API allows you to create, manage, and publish posts scheduled for future dates and times.

## Scheduled Post Object

A scheduled post is a feed post with a future publication date.

### Properties

All properties from the [Feed Object](/rest-api/feeds#feed-object) plus:

| Property | Type | Description |
|----------|------|-------------|
| `scheduled_at` | datetime | Scheduled publication timestamp |
| `timezone` | string | Timezone for scheduled time |
| `auto_publish` | boolean | Whether to auto-publish at scheduled time |
| `notification_sent` | boolean | Whether notification was sent to followers |

### Status Values

- `scheduled` - Post is scheduled for future publication
- `published` - Post has been published
- `cancelled` - Scheduled post was cancelled

## Get Scheduled Posts

Retrieve all scheduled posts.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/scheduled-posts
```

**Permissions:** Post author or Administrator

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | integer | No | Filter by author (admins only) |
| `space_id` | integer | No | Filter by space |
| `per_page` | integer | No | Number of posts per page (default: 20) |
| `page` | integer | No | Page number for pagination |
| `date_from` | string | No | Filter from date (YYYY-MM-DD) |
| `date_to` | string | No | Filter to date (YYYY-MM-DD) |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/scheduled-posts?per_page=20" \
  -u "username:password"
```

### Example Response

```json
{
  "posts": [
    {
      "id": 123,
      "user_id": 45,
      "title": "Weekly Newsletter - January 20",
      "message": "Here's what's happening this week...",
      "space_id": 12,
      "status": "scheduled",
      "scheduled_at": "2024-01-20 09:00:00",
      "timezone": "America/New_York",
      "auto_publish": true,
      "created_at": "2024-01-15 10:30:00",
      "xprofile": {
        "user_id": 45,
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
        "id": 12,
        "title": "Announcements",
        "slug": "announcements"
      }
    }
  ],
  "pagination": {
    "total": 8,
    "per_page": 20,
    "current_page": 1,
    "total_pages": 1
  }
}
```

## Create Scheduled Post

Create a new scheduled post.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/feeds
```

**Permissions:** Authenticated users

### Parameters

All parameters from [Create Feed](/rest-api/feeds#create-feed) plus:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | Yes | Must be "scheduled" |
| `scheduled_at` | string | Yes | Publication date/time (YYYY-MM-DD HH:MM:SS) |
| `timezone` | string | No | Timezone (default: site timezone) |
| `auto_publish` | boolean | No | Auto-publish at scheduled time (default: true) |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/feeds" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Weekly Newsletter - January 20",
    "message": "Here is what is happening this week in our community...",
    "space_id": 12,
    "status": "scheduled",
    "scheduled_at": "2024-01-20 09:00:00",
    "timezone": "America/New_York",
    "auto_publish": true
  }'
```

### Example Response

```json
{
  "id": 124,
  "user_id": 45,
  "title": "Weekly Newsletter - January 20",
  "message": "Here's what's happening this week...",
  "space_id": 12,
  "status": "scheduled",
  "scheduled_at": "2024-01-20 09:00:00",
  "timezone": "America/New_York",
  "auto_publish": true,
  "created_at": "2024-01-15 11:00:00",
  "message": "Post scheduled successfully for January 20, 2024 at 9:00 AM EST."
}
```

## Reschedule Post

Change the scheduled publication time for a post.

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/scheduled-posts/{feed_id}
```

**Permissions:** Post author or Administrator

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `scheduled_at` | string | Yes | New publication date/time (YYYY-MM-DD HH:MM:SS) |
| `timezone` | string | No | Timezone |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v2/scheduled-posts/124" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "scheduled_at": "2024-01-21 10:00:00",
    "timezone": "America/New_York"
  }'
```

### Example Response

```json
{
  "id": 124,
  "scheduled_at": "2024-01-21 10:00:00",
  "timezone": "America/New_York",
  "updated_at": "2024-01-15 11:30:00",
  "message": "Post rescheduled successfully for January 21, 2024 at 10:00 AM EST."
}
```

## Publish Scheduled Post

Immediately publish a scheduled post.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/scheduled-posts/publish/{feed_id}
```

**Permissions:** Post author or Administrator

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/scheduled-posts/publish/124" \
  -u "username:password"
```

### Example Response

```json
{
  "id": 124,
  "status": "published",
  "published_at": "2024-01-15 11:45:00",
  "message": "Post published successfully."
}
```

## Cancel Scheduled Post

Cancel a scheduled post (converts to draft).

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/feeds/{feed_id}
```

**Permissions:** Post author or Administrator

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | Yes | Set to "draft" to cancel |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v2/feeds/124" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "draft"
  }'
```

### Example Response

```json
{
  "id": 124,
  "status": "draft",
  "updated_at": "2024-01-15 12:00:00",
  "message": "Scheduled post cancelled and saved as draft."
}
```

---

## Best Practices

### 1. Use Appropriate Timezones
Always specify timezone for scheduled posts:

```javascript
const post = {
  title: "Weekly Update",
  message: "Here's what's new...",
  status: "scheduled",
  scheduled_at: "2024-01-20 09:00:00",
  timezone: "America/New_York" // Explicit timezone
};
```

### 2. Schedule During Peak Hours
Schedule posts when your community is most active:

```javascript
// Schedule for Tuesday at 10 AM (peak engagement time)
const scheduledTime = new Date('2024-01-23T10:00:00');
const post = {
  title: "Important Announcement",
  message: "...",
  status: "scheduled",
  scheduled_at: scheduledTime.toISOString()
};
```

### 3. Batch Schedule Content
Schedule multiple posts at once for content calendar:

```javascript
async function scheduleWeeklyPosts(posts) {
  const promises = posts.map(post =>
    fetch('/wp-json/fluent-community/v2/feeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      },
      body: JSON.stringify({
        ...post,
        status: 'scheduled'
      })
    })
  );
  
  await Promise.all(promises);
}
```

### 4. Monitor Scheduled Posts
Regularly check scheduled posts:

```javascript
async function getUpcomingPosts() {
  const response = await fetch('/wp-json/fluent-community/v2/scheduled-posts');
  const data = await response.json();
  
  // Posts scheduled for next 7 days
  const upcoming = data.posts.filter(post => {
    const scheduledDate = new Date(post.scheduled_at);
    const weekFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return scheduledDate <= weekFromNow;
  });
  
  return upcoming;
}
```

### 5. Handle Scheduling Errors
Validate scheduled times before submission:

```javascript
function validateScheduledTime(scheduledAt) {
  const scheduledDate = new Date(scheduledAt);
  const now = new Date();
  
  if (scheduledDate <= now) {
    throw new Error('Scheduled time must be in the future');
  }
  
  // Don't schedule more than 1 year ahead
  const oneYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);
  if (scheduledDate > oneYearFromNow) {
    throw new Error('Cannot schedule more than 1 year in advance');
  }
  
  return true;
}
```

---

## Common Use Cases

### 1. Content Calendar

Create a content calendar with scheduled posts:

```javascript
async function createContentCalendar(posts) {
  const scheduled = [];
  
  for (const post of posts) {
    const response = await fetch('/wp-json/fluent-community/v2/feeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      },
      body: JSON.stringify({
        title: post.title,
        message: post.message,
        space_id: post.space_id,
        status: 'scheduled',
        scheduled_at: post.scheduled_at,
        timezone: 'America/New_York'
      })
    });
    
    scheduled.push(await response.json());
  }
  
  return scheduled;
}

// Usage
const calendar = [
  {
    title: "Monday Motivation",
    message: "Start your week strong!",
    space_id: 12,
    scheduled_at: "2024-01-22 08:00:00"
  },
  {
    title: "Wednesday Wisdom",
    message: "Midweek insights...",
    space_id: 12,
    scheduled_at: "2024-01-24 12:00:00"
  },
  {
    title: "Friday Wrap-up",
    message: "Week in review...",
    space_id: 12,
    scheduled_at: "2024-01-26 16:00:00"
  }
];

await createContentCalendar(calendar);
```

### 2. Recurring Posts

Schedule recurring weekly posts:

```javascript
async function scheduleRecurringPost(template, weeks = 4) {
  const posts = [];
  const startDate = new Date();
  
  for (let i = 0; i < weeks; i++) {
    const scheduledDate = new Date(startDate);
    scheduledDate.setDate(scheduledDate.getDate() + (i * 7));
    
    const response = await fetch('/wp-json/fluent-community/v2/feeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      },
      body: JSON.stringify({
        title: `${template.title} - Week ${i + 1}`,
        message: template.message,
        space_id: template.space_id,
        status: 'scheduled',
        scheduled_at: scheduledDate.toISOString().slice(0, 19).replace('T', ' ')
      })
    });
    
    posts.push(await response.json());
  }
  
  return posts;
}
```

### 3. Scheduled Announcements

Schedule important announcements in advance:

```javascript
async function scheduleAnnouncement(announcement) {
  const response = await fetch('/wp-json/fluent-community/v2/feeds', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({
      title: announcement.title,
      message: announcement.message,
      space_id: announcement.space_id,
      type: 'announcement',
      status: 'scheduled',
      scheduled_at: announcement.scheduled_at,
      is_sticky: true // Pin announcement when published
    })
  });
  
  return await response.json();
}
```

### 4. Scheduled Post Dashboard

Create a dashboard to manage scheduled posts:

```javascript
async function getScheduledPostsDashboard() {
  const response = await fetch('/wp-json/fluent-community/v2/scheduled-posts');
  const data = await response.json();
  
  const now = new Date();
  
  return {
    total: data.pagination.total,
    upcoming: data.posts.filter(p => new Date(p.scheduled_at) > now),
    today: data.posts.filter(p => {
      const scheduled = new Date(p.scheduled_at);
      return scheduled.toDateString() === now.toDateString();
    }),
    thisWeek: data.posts.filter(p => {
      const scheduled = new Date(p.scheduled_at);
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return scheduled <= weekFromNow;
    })
  };
}
```

---

## Error Handling

### Common Errors

**400 Bad Request**
```json
{
  "code": "invalid_scheduled_time",
  "message": "Scheduled time must be in the future.",
  "data": {
    "status": 400
  }
}
```

**403 Forbidden**
```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you don't have permission to schedule posts.",
  "data": {
    "status": 403
  }
}
```

**404 Not Found**
```json
{
  "code": "not_found",
  "message": "Scheduled post not found.",
  "data": {
    "status": 404
  }
}
```

---

## Related Endpoints

- [Feeds](/rest-api/feeds) - Create and manage feed posts
- [Spaces](/rest-api/spaces) - Manage community spaces
- [Notifications](/rest-api/notifications) - User notifications

