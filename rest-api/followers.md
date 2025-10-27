# Followers [PRO]

The Followers API allows users to follow other members and build connections within the community. This is a Pro feature.

::: tip PRO FEATURE
This feature requires Fluent Community Pro.
:::

## Follower Object

A follower relationship represents a connection between two users.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique relationship ID |
| `follower_id` | integer | ID of the user who is following |
| `following_id` | integer | ID of the user being followed |
| `status` | string | Relationship status (active, pending) |
| `created_at` | datetime | Follow timestamp |
| `follower` | object | Follower user object (when included) |
| `following` | object | Following user object (when included) |

### Status Values

- `active` - Active follow relationship
- `pending` - Awaiting approval (for private profiles)

## Follow a User

Follow another user in the community.

**HTTP Request**

```
POST /wp-json/fluent-community/v1/profile/{username}/follow
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Username to follow |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/profile/jane_smith/follow" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Successfully followed user",
  "data": {
    "id": 123,
    "follower_id": 1,
    "following_id": 2,
    "status": "active",
    "created_at": "2025-10-27T12:00:00"
  }
}
```

For private profiles:

```json
{
  "message": "Follow request sent. Awaiting approval.",
  "data": {
    "status": "pending"
  }
}
```

## Unfollow a User

Stop following a user.

**HTTP Request**

```
POST /wp-json/fluent-community/v1/profile/{username}/unfollow
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/profile/jane_smith/unfollow" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Successfully unfollowed user"
}
```

## Get User's Followers

Retrieve a list of users following a specific user.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/profile/{username}/followers
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |
| `status` | string | active | Filter by status |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/profile/jane_smith/followers?per_page=20" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": [
    {
      "id": 123,
      "follower_id": 1,
      "following_id": 2,
      "status": "active",
      "created_at": "2025-10-27T12:00:00",
      "follower": {
        "id": 1,
        "username": "john_doe",
        "display_name": "John Doe",
        "avatar": "https://example.com/avatar.jpg",
        "bio": "Community enthusiast"
      }
    }
  ],
  "meta": {
    "total": 56,
    "per_page": 20,
    "current_page": 1
  }
}
```

## Get User's Following

Retrieve a list of users that a specific user is following.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/profile/{username}/following
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/profile/john_doe/following?per_page=20" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": [
    {
      "id": 124,
      "follower_id": 1,
      "following_id": 3,
      "status": "active",
      "created_at": "2025-10-25T10:00:00",
      "following": {
        "id": 3,
        "username": "jane_smith",
        "display_name": "Jane Smith",
        "avatar": "https://example.com/avatar2.jpg",
        "bio": "Tech enthusiast"
      }
    }
  ],
  "meta": {
    "total": 42,
    "per_page": 20,
    "current_page": 1
  }
}
```

## Check Follow Status

Check if the current user is following another user.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/profile/{username}/follow-status
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/profile/jane_smith/follow-status" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": {
    "is_following": true,
    "status": "active",
    "followed_at": "2025-10-27T12:00:00"
  }
}
```

## Get Pending Follow Requests

Retrieve pending follow requests for the current user.

**HTTP Request**

```
GET /wp-json/fluent-community/v1/profile/follow-requests
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/profile/follow-requests" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "data": [
    {
      "id": 125,
      "follower_id": 5,
      "status": "pending",
      "created_at": "2025-10-27T11:00:00",
      "follower": {
        "id": 5,
        "username": "new_user",
        "display_name": "New User",
        "avatar": "https://example.com/avatar3.jpg"
      }
    }
  ]
}
```

## Approve Follow Request

Approve a pending follow request.

**HTTP Request**

```
POST /wp-json/fluent-community/v1/profile/follow-requests/{request_id}/approve
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/profile/follow-requests/125/approve" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Follow request approved",
  "data": {
    "id": 125,
    "status": "active"
  }
}
```

## Reject Follow Request

Reject a pending follow request.

**HTTP Request**

```
POST /wp-json/fluent-community/v1/profile/follow-requests/{request_id}/reject
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v1/profile/follow-requests/125/reject" \
  -X POST \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Follow request rejected"
}
```

## Best Practices

### 1. Follow/Unfollow Toggle

Implement a toggle button in your UI:

```javascript
async function toggleFollow(username) {
  const status = await checkFollowStatus(username);
  
  if (status.is_following) {
    await fetch(`/wp-json/fluent-community/v1/profile/${username}/unfollow`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer TOKEN' }
    });
  } else {
    await fetch(`/wp-json/fluent-community/v1/profile/${username}/follow`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer TOKEN' }
    });
  }
}
```

### 2. Follow Suggestions

Suggest users to follow based on interests:

```bash
# Get members from same spaces
curl ".../members?space_id=5&per_page=10"

# Exclude already following
curl ".../profile/me/following"

# Show suggestions
```

### 3. Follower Notifications

Notify users of new followers:

```bash
# Check for new followers
curl ".../profile/me/followers?orderby=created_at&order=desc&per_page=5"

# Send notification if new followers found
```

### 4. Privacy Settings

Respect user privacy preferences:

```bash
# Public profile - auto-approve follows
# Private profile - require approval

# Check pending requests
curl ".../profile/follow-requests"
```

## Common Use Cases

### Social Feed

Show content from followed users:

```bash
# Get following list
curl ".../profile/me/following"

# Get feeds from followed users
curl ".../feeds?user_id[]=2&user_id[]=3&user_id[]=5"
```

### Follower Count Display

Show follower/following counts on profiles:

```bash
# Get profile with stats
curl ".../profile/jane_smith"

# Response includes:
{
  "stats": {
    "followers_count": 56,
    "following_count": 42
  }
}
```

### Follow Recommendations

Recommend users to follow:

```bash
# Get popular users
curl ".../members/top-contributors?period=month"

# Get users in same spaces
curl ".../members?space_id=5"

# Show as recommendations
```

### Mutual Followers

Find mutual connections:

```bash
# Get user's followers
curl ".../profile/jane_smith/followers"

# Get current user's following
curl ".../profile/me/following"

# Find intersection
```

## Error Handling

### User Not Found (404)

```json
{
  "code": "user_not_found",
  "message": "User not found",
  "data": {
    "status": 404
  }
}
```

### Already Following (400)

```json
{
  "code": "already_following",
  "message": "You are already following this user",
  "data": {
    "status": 400
  }
}
```

### Cannot Follow Self (400)

```json
{
  "code": "cannot_follow_self",
  "message": "You cannot follow yourself",
  "data": {
    "status": 400
  }
}
```

### Not Following (400)

```json
{
  "code": "not_following",
  "message": "You are not following this user",
  "data": {
    "status": 400
  }
}
```

### Pro Feature Required (403)

```json
{
  "code": "pro_feature_required",
  "message": "This feature requires Fluent Community Pro",
  "data": {
    "status": 403
  }
}
```

## Related Endpoints

- [Profiles](./profiles.md) - View user profiles
- [Members](./members.md) - Discover members to follow
- [Notifications](./notifications.md) - Get notified of new followers
- [Feeds](./feeds.md) - View content from followed users

