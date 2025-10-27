# Members

The Members API allows you to list, search, and discover community members.

## Member Object

A member represents a user in the community with basic profile information.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | User ID |
| `username` | string | Unique username |
| `display_name` | string | Display name |
| `avatar` | string | Avatar image URL |
| `bio` | string | Short biography |
| `location` | string | Location |
| `role` | string | User role (member, moderator, admin) |
| `status` | string | Account status (active, suspended) |
| `badges` | array | Earned badges |
| `stats` | object | User statistics |
| `created_at` | datetime | Registration timestamp |
| `last_seen` | datetime | Last activity timestamp |

## List All Members

Retrieve a paginated list of community members.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/members
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |
| `role` | string | - | Filter by role |
| `status` | string | active | Filter by status |
| `orderby` | string | created_at | Sort field (created_at, display_name, last_seen) |
| `order` | string | desc | Sort order (asc, desc) |
| `space_id` | integer | - | Filter by space membership |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/members?per_page=20&orderby=last_seen" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "username": "john_doe",
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Community enthusiast",
      "location": "San Francisco, CA",
      "role": "member",
      "status": "active",
      "badges": [
        {
          "id": 1,
          "name": "Early Adopter",
          "icon": "🌟"
        }
      ],
      "stats": {
        "posts_count": 45,
        "comments_count": 128,
        "reactions_received": 234
      },
      "created_at": "2025-01-15T10:00:00",
      "last_seen": "2025-10-27T11:30:00"
    }
  ],
  "meta": {
    "total": 1250,
    "per_page": 20,
    "current_page": 1,
    "total_pages": 63
  }
}
```

## Search Members

Search for members by name, username, or email.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/members/search
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `per_page` | integer | No | Results limit (default: 10, max: 50) |
| `exclude` | array | No | User IDs to exclude |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/members/search?q=john" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "username": "john_doe",
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "bio": "Community enthusiast",
      "role": "member"
    },
    {
      "id": 15,
      "username": "johnny_smith",
      "display_name": "Johnny Smith",
      "avatar": "https://example.com/avatar2.jpg",
      "bio": "Tech lover",
      "role": "member"
    }
  ]
}
```

## Get Active Members

Retrieve currently active members.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/members/active
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 10 | Items per page |
| `minutes` | integer | 15 | Active within last X minutes |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/members/active?per_page=10" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "username": "john_doe",
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "last_seen": "2025-10-27T11:55:00",
      "is_online": true
    }
  ],
  "meta": {
    "total_online": 12
  }
}
```

## Get New Members

Retrieve recently joined members.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/members/new
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 10 | Items per page |
| `days` | integer | 7 | Joined within last X days |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/members/new?per_page=5" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

## Get Top Contributors

Retrieve members with the most activity.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/members/top-contributors
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `per_page` | integer | 10 | Items per page |
| `period` | string | month | Time period (week, month, year, all) |
| `metric` | string | posts | Sort by metric (posts, comments, reactions) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/members/top-contributors?period=month&metric=posts" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": [
    {
      "id": 1,
      "username": "john_doe",
      "display_name": "John Doe",
      "avatar": "https://example.com/avatar.jpg",
      "stats": {
        "posts_count": 45,
        "comments_count": 128,
        "reactions_received": 234
      },
      "rank": 1
    }
  ]
}
```

## Best Practices

### 1. Pagination

Always use pagination for large member lists:

```bash
# First page
curl ".../members?page=1&per_page=20"

# Next page
curl ".../members?page=2&per_page=20"
```

### 2. Search Optimization

Use specific search queries for better results:

```bash
# Search by username
curl ".../members/search?q=john_doe"

# Search by display name
curl ".../members/search?q=John%20Doe"
```

### 3. Filtering

Combine filters for targeted results:

```bash
# Active moderators
curl ".../members?role=moderator&status=active"

# Members in a specific space
curl ".../members?space_id=5"
```

### 4. Caching

Cache member lists for better performance:

```javascript
// Cache for 5 minutes
const cacheKey = 'members_list';
const cached = localStorage.getItem(cacheKey);

if (cached && Date.now() - cached.timestamp < 300000) {
  return cached.data;
}

// Fetch fresh data
const members = await fetchMembers();
localStorage.setItem(cacheKey, {
  data: members,
  timestamp: Date.now()
});
```

## Common Use Cases

### Member Directory

Create a searchable member directory:

```bash
# Get all members
curl ".../members?per_page=50&orderby=display_name&order=asc"

# Add search functionality
curl ".../members/search?q=john"
```

### Welcome New Members

Display recently joined members:

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/members/new?per_page=5&days=7" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Online Members Widget

Show who's currently online:

```bash
# Get active members
curl ".../members/active?per_page=10&minutes=15"

# Update every minute
setInterval(() => {
  fetchActiveMembers();
}, 60000);
```

### Leaderboard

Create a contributor leaderboard:

```bash
# Top contributors this month
curl ".../members/top-contributors?period=month&per_page=10"

# Display rankings
```

### Member Suggestions

Suggest members to follow or connect with:

```bash
# Get members with similar interests
curl ".../members?space_id=5&per_page=10"

# Exclude already following
curl ".../members/search?q=tech&exclude[]=1&exclude[]=2"
```

### Space Member Invites

Find members to invite to a space:

```bash
# Search for members not in space
curl ".../members/search?q=john"

# Check if member is in space
curl ".../spaces/tech-talk/members"

# Invite member
curl -X POST ".../spaces/tech-talk/members" -d '{
  "user_id": 10
}'
```

## Error Handling

### No Results Found (200)

```json
{
  "data": [],
  "meta": {
    "total": 0
  }
}
```

### Invalid Search Query (400)

```json
{
  "code": "invalid_search",
  "message": "Search query must be at least 2 characters",
  "data": {
    "status": 400
  }
}
```

### Invalid Filter (400)

```json
{
  "code": "invalid_filter",
  "message": "Invalid role filter",
  "data": {
    "status": 400,
    "allowed_values": ["member", "moderator", "admin"]
  }
}
```

## Related Endpoints

- [Profiles](./profiles.md) - View detailed user profiles
- [Followers](./followers.md) - Follow/unfollow members [PRO]
- [Space Members](./space-members.md) - Manage space membership
- [Spaces](./spaces.md) - Filter members by space

