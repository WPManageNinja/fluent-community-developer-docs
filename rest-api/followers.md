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
POST /wp-json/fluent-community/v2/profile/{username}/follow
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Username to follow |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/jane_smith/follow" \
  -X POST \
  -u "username:password"
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
POST /wp-json/fluent-community/v2/profile/{username}/unfollow
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/jane_smith/unfollow" \
  -X POST \
  -u "username:password"
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
GET /wp-json/fluent-community/v2/profile/{username}/followers
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |
| `status` | string | active | Filter by status |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/jane_smith/followers?per_page=20" \
  -u "username:password"
```

### Example Response

```json
{
  "followers": {
    "current_page": 1,
    "data": [
      {
        "id": 123,
        "follower_id": 1,
        "following_id": 2,
        "status": "active",
        "created_at": "2025-10-27 12:00:00",
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
    ],
    "first_page_url": "https://your-site.com/wp-json/fluent-community/v2/profile/jane_smith/followers/?page=1",
    "from": 1,
    "last_page": 3,
    "last_page_url": "https://your-site.com/wp-json/fluent-community/v2/profile/jane_smith/followers/?page=3",
    "next_page_url": "https://your-site.com/wp-json/fluent-community/v2/profile/jane_smith/followers/?page=2",
    "path": "https://your-site.com/wp-json/fluent-community/v2/profile/jane_smith/followers",
    "per_page": 20,
    "prev_page_url": null,
    "to": 20,
    "total": 56
  }
}
```

## Get User's Following

Retrieve a list of users that a specific user is following.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/profile/{username}/followings
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/followings?per_page=20" \
  -u "username:password"
```

### Example Response

```json
{
  "followings": {
    "current_page": 1,
    "data": [
      {
        "id": 124,
        "follower_id": 1,
        "following_id": 3,
        "status": "active",
        "created_at": "2025-10-25 10:00:00",
        "xprofile": {
          "user_id": 3,
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
    ],
    "first_page_url": "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/followings/?page=1",
    "from": 1,
    "last_page": 3,
    "last_page_url": "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/followings/?page=3",
    "next_page_url": "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/followings/?page=2",
    "path": "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/followings",
    "per_page": 20,
    "prev_page_url": null,
    "to": 20,
    "total": 42
  }
}
```

## Check Follow Status

Check if the current user is following another user.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/profile/{username}/follow-status
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/jane_smith/follow-status" \
  -u "username:password"
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
GET /wp-json/fluent-community/v2/profile/follow-requests
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/follow-requests" \
  -u "username:password"
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
POST /wp-json/fluent-community/v2/profile/follow-requests/{request_id}/approve
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/follow-requests/125/approve" \
  -X POST \
  -u "username:password"
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
POST /wp-json/fluent-community/v2/profile/follow-requests/{request_id}/reject
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/follow-requests/125/reject" \
  -X POST \
  -u "username:password"
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
    await fetch(`/wp-json/fluent-community/v2/profile/${username}/unfollow`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer TOKEN' }
    });
  } else {
    await fetch(`/wp-json/fluent-community/v2/profile/${username}/follow`, {
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
curl ".../profile/me/followings"

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
curl ".../profile/me/followings"

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

