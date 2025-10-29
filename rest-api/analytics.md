# Analytics [PRO]

::: tip PRO FEATURE
The Analytics API is available in Fluent Community Pro. It provides comprehensive insights into community engagement, member activity, and space performance.
:::

The Analytics API allows administrators to access detailed analytics and reports about community activity, member engagement, and space performance.

## Overview Analytics

Get high-level overview metrics for your entire community.

### Get Overview Widget

Retrieve summary statistics for the community dashboard.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/overview/widget
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | No | Start date (YYYY-MM-DD format) |
| `date_to` | string | No | End date (YYYY-MM-DD format) |
| `compare` | boolean | No | Compare with previous period |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/analytics/overview/widget?date_from=2024-01-01&date_to=2024-01-31" \
  -u "username:password"
```

### Example Response

```json
{
  "total_members": 1250,
  "new_members": 45,
  "total_posts": 3420,
  "new_posts": 156,
  "total_comments": 8930,
  "new_comments": 423,
  "total_reactions": 15670,
  "new_reactions": 892,
  "active_spaces": 28,
  "engagement_rate": 68.5,
  "comparison": {
    "members_change": 12.5,
    "posts_change": 8.3,
    "comments_change": 15.2,
    "reactions_change": 22.1
  }
}
```

### Get Activity Report

Retrieve detailed activity metrics over time.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/overview/activity
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | Yes | Start date (YYYY-MM-DD) |
| `date_to` | string | Yes | End date (YYYY-MM-DD) |
| `interval` | string | No | Data interval (day, week, month) |

### Example Response

```json
{
  "data": [
    {
      "date": "2024-01-01",
      "posts": 12,
      "comments": 45,
      "reactions": 89,
      "new_members": 3,
      "active_users": 67
    },
    {
      "date": "2024-01-02",
      "posts": 15,
      "comments": 52,
      "reactions": 103,
      "new_members": 5,
      "active_users": 72
    }
  ]
}
```

### Get Popular Day/Time Report

Analyze when your community is most active.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/overview/popular-day-time
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | No | Start date (YYYY-MM-DD) |
| `date_to` | string | No | End date (YYYY-MM-DD) |

### Example Response

```json
{
  "by_day": {
    "Monday": 245,
    "Tuesday": 312,
    "Wednesday": 298,
    "Thursday": 276,
    "Friday": 189,
    "Saturday": 156,
    "Sunday": 134
  },
  "by_hour": {
    "00": 12,
    "01": 8,
    "09": 145,
    "10": 178,
    "14": 156,
    "15": 189,
    "20": 98
  },
  "peak_day": "Tuesday",
  "peak_hour": "10:00"
}
```

---

## Members Analytics

Get detailed insights about member activity and engagement.

### Get Members Widget

Retrieve member statistics summary.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/members/widget
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | No | Start date (YYYY-MM-DD) |
| `date_to` | string | No | End date (YYYY-MM-DD) |

### Example Response

```json
{
  "total_members": 1250,
  "active_members": 856,
  "new_members": 45,
  "inactive_members": 394,
  "average_posts_per_member": 2.7,
  "average_comments_per_member": 7.1,
  "top_contributor": {
    "id": 123,
    "name": "John Doe",
    "posts": 89,
    "comments": 234
  }
}
```

### Get Member Activity

Retrieve detailed member activity metrics.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/members/activity
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | Yes | Start date (YYYY-MM-DD) |
| `date_to` | string | Yes | End date (YYYY-MM-DD) |
| `interval` | string | No | Data interval (day, week, month) |

### Example Response

```json
{
  "data": [
    {
      "date": "2024-01-01",
      "new_members": 3,
      "active_members": 67,
      "returning_members": 45
    },
    {
      "date": "2024-01-02",
      "new_members": 5,
      "active_members": 72,
      "returning_members": 52
    }
  ]
}
```

### Get Top Members

Retrieve the most active community members.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/members/top-members
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | No | Start date (YYYY-MM-DD) |
| `date_to` | string | No | End date (YYYY-MM-DD) |
| `limit` | integer | No | Number of members to return (default: 10) |
| `metric` | string | No | Sort by metric (posts, comments, reactions, engagement) |

### Example Response

```json
{
  "members": [
    {
      "id": 123,
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "posts_count": 89,
      "comments_count": 234,
      "reactions_count": 567,
      "engagement_score": 890
    },
    {
      "id": 456,
      "display_name": "Jane Smith",
      "avatar": "https://example.com/avatar2.jpg",
      "posts_count": 76,
      "comments_count": 198,
      "reactions_count": 445,
      "engagement_score": 719
    }
  ]
}
```

### Get Top Post Starters

Retrieve members who create the most posts.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/members/top-post-starters
```

### Example Response

```json
{
  "members": [
    {
      "id": 123,
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "posts_count": 89,
      "average_reactions": 12.5,
      "average_comments": 8.3
    }
  ]
}
```

### Get Top Commenters

Retrieve members who comment the most.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/members/top-commenters
```

### Example Response

```json
{
  "members": [
    {
      "id": 456,
      "display_name": "Jane Smith",
      "avatar": "https://example.com/avatar2.jpg",
      "comments_count": 234,
      "average_reactions": 5.7
    }
  ]
}
```

---

## Spaces Analytics

Get insights about space activity and performance.

### Get Spaces Widget

Retrieve space statistics summary.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/spaces/widget
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | No | Start date (YYYY-MM-DD) |
| `date_to` | string | No | End date (YYYY-MM-DD) |

### Example Response

```json
{
  "total_spaces": 28,
  "active_spaces": 22,
  "total_posts": 3420,
  "total_members": 1250,
  "average_posts_per_space": 122.1,
  "average_members_per_space": 44.6,
  "most_active_space": {
    "id": 12,
    "title": "General Discussion",
    "posts_count": 456,
    "members_count": 234
  }
}
```

### Get Space Activity

Retrieve detailed space activity metrics.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/spaces/activity
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `space_id` | integer | No | Filter by specific space |
| `date_from` | string | Yes | Start date (YYYY-MM-DD) |
| `date_to` | string | Yes | End date (YYYY-MM-DD) |
| `interval` | string | No | Data interval (day, week, month) |

### Example Response

```json
{
  "data": [
    {
      "date": "2024-01-01",
      "posts": 12,
      "comments": 45,
      "reactions": 89,
      "new_members": 3
    }
  ]
}
```

### Get Popular Spaces

Retrieve the most active spaces.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/spaces/popular
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `date_from` | string | No | Start date (YYYY-MM-DD) |
| `date_to` | string | No | End date (YYYY-MM-DD) |
| `limit` | integer | No | Number of spaces to return (default: 10) |
| `metric` | string | No | Sort by metric (posts, members, engagement) |

### Example Response

```json
{
  "spaces": [
    {
      "id": 12,
      "title": "General Discussion",
      "slug": "general-discussion",
      "posts_count": 456,
      "comments_count": 1234,
      "members_count": 234,
      "engagement_score": 1924
    }
  ]
}
```

### Search Spaces

Search spaces for analytics filtering.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/analytics/spaces/search
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `search` | string | Yes | Search query |
| `limit` | integer | No | Number of results (default: 10) |

---

## Best Practices

### 1. Cache Analytics Data
Analytics queries can be expensive. Cache results:

```javascript
const cacheKey = `analytics_overview_${dateFrom}_${dateTo}`;
const cached = localStorage.getItem(cacheKey);
if (cached && Date.now() - cached.timestamp < 3600000) { // 1 hour
  return cached.data;
}
```

### 2. Use Appropriate Date Ranges
Don't query unnecessarily large date ranges:

```javascript
// Good: Last 30 days
const analytics = await fetch('/wp-json/fluent-community/v2/analytics/overview/widget?date_from=2024-01-01&date_to=2024-01-31');

// Bad: Multiple years
// const analytics = await fetch('...?date_from=2020-01-01&date_to=2024-12-31');
```

### 3. Aggregate Data Client-Side
Fetch raw data and aggregate on the client when possible:

```javascript
const activity = await fetch('/wp-json/fluent-community/v2/analytics/overview/activity');
const totalPosts = activity.data.reduce((sum, day) => sum + day.posts, 0);
```

### 4. Use Comparison Data
Enable comparison to show trends:

```javascript
const analytics = await fetch('/wp-json/fluent-community/v2/analytics/overview/widget?compare=true');
console.log(`Posts increased by ${analytics.comparison.posts_change}%`);
```

---

## Common Use Cases

### 1. Admin Dashboard

Create a comprehensive admin dashboard:

```javascript
async function getAdminDashboard() {
  const [overview, activity, topMembers, topSpaces] = await Promise.all([
    fetch('/wp-json/fluent-community/v2/analytics/overview/widget'),
    fetch('/wp-json/fluent-community/v2/analytics/overview/activity?date_from=2024-01-01&date_to=2024-01-31&interval=day'),
    fetch('/wp-json/fluent-community/v2/analytics/members/top-members?limit=5'),
    fetch('/wp-json/fluent-community/v2/analytics/spaces/popular?limit=5')
  ]);
  
  return {
    overview: await overview.json(),
    activity: await activity.json(),
    topMembers: await topMembers.json(),
    topSpaces: await topSpaces.json()
  };
}
```

### 2. Engagement Report

Generate monthly engagement reports:

```javascript
async function generateMonthlyReport(year, month) {
  const dateFrom = `${year}-${month.toString().padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const dateTo = `${year}-${month.toString().padStart(2, '0')}-${lastDay}`;
  
  const response = await fetch(
    `/wp-json/fluent-community/v2/analytics/overview/activity?date_from=${dateFrom}&date_to=${dateTo}&interval=day`
  );
  
  const data = await response.json();
  
  return {
    totalPosts: data.data.reduce((sum, day) => sum + day.posts, 0),
    totalComments: data.data.reduce((sum, day) => sum + day.comments, 0),
    totalReactions: data.data.reduce((sum, day) => sum + day.reactions, 0),
    averageDaily: {
      posts: data.data.reduce((sum, day) => sum + day.posts, 0) / data.data.length,
      comments: data.data.reduce((sum, day) => sum + day.comments, 0) / data.data.length
    }
  };
}
```

---

## Related Endpoints

- [Activities](/rest-api/activities) - User activity tracking
- [Members](/rest-api/members) - Member management
- [Spaces](/rest-api/spaces) - Space management
- [Feeds](/rest-api/feeds) - Feed posts

