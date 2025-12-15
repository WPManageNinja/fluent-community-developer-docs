<DocStatusBanner />

# Profiles

The Profiles API allows users to manage their profile information, settings, and preferences.

## Profile Object

A profile represents a user's public and private information in the community.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | User ID |
| `username` | string | Unique username |
| `display_name` | string | Display name |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `email` | string | Email address |
| `avatar` | string | Avatar image URL |
| `cover_photo` | string | Cover photo URL |
| `bio` | string | User biography |
| `location` | string | Location |
| `website` | string | Website URL |
| `social_links` | object | Social media links |
| `status` | string | Account status (active, suspended) |
| `role` | string | User role (member, moderator, admin) |
| `badges` | array | Earned badges |
| `stats` | object | User statistics |
| `created_at` | datetime | Registration timestamp |
| `last_seen` | datetime | Last activity timestamp |

### Status Values

- `active` - Active account
- `suspended` - Temporarily suspended
- `banned` - Permanently banned

## Get User Profile

Retrieve a user's profile information.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/profile/{username}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `username` | string | Yes | Username to retrieve |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe" \
  -u "username:password"
```

### Example Response

```json
{
  "profile": {
    "user_id": 1,
    "username": "john_doe",
    "display_name": "John Doe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "[email protected]",
    "avatar": "https://example.com/avatar.jpg",
    "cover_photo": "https://example.com/cover.jpg",
    "short_description": "Community enthusiast and tech lover",
    "short_description_rendered": "<p>Community enthusiast and tech lover</p>",
    "website": "https://johndoe.com",
    "social_links": {
      "twitter": "https://twitter.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe"
    },
    "status": "active",
    "is_verified": 0,
    "badge_slugs": [],
    "total_points": 0,
    "compilation_score": 40,
    "followers_count": 56,
    "followings_count": 42,
    "created_at": "2025-01-15T10:00:00",
    "last_activity": "2025-10-27T11:30:00",
    "can_change_username": true,
    "can_change_email": true,
    "canViewUserSpaces": true,
    "profile_navs": [
      {
        "slug": "user_profile",
        "title": "About",
        "url": "https://example.com/portal/u/john_doe/",
        "route": {
          "name": "user_profile"
        }
      }
    ],
    "profile_nav_actions": []
  }
}
```

## Update Profile

Update the current user's profile information.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/profile/{username}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `display_name` | string | No | Display name |
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `bio` | string | No | Biography |
| `location` | string | No | Location |
| `website` | string | No | Website URL |
| `social_links` | object | No | Social media links |
| `avatar` | string | No | Avatar URL |
| `cover_photo` | string | No | Cover photo URL |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "display_name": "John Doe",
    "bio": "Updated bio here",
    "location": "New York, NY",
    "website": "https://johndoe.com",
    "social_links": {
      "twitter": "https://twitter.com/johndoe",
      "linkedin": "https://linkedin.com/in/johndoe"
    }
  }'
```

### Example Response

```json
{
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "display_name": "John Doe",
    "bio": "Updated bio here",
    "updated_at": "2025-10-27T12:00:00"
  }
}
```

## Get User's Feeds

Retrieve feeds created by a specific user.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/feeds?user_id={user_id}
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `user_id` | string | - | User ID |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page |
| `order_by_type` | string | published | Sort type (new_activity, latest, oldest, likes, popular, alphabetical, unanswered) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/feeds?user_id_=1&per_page=10" \
  -u "username:password"
```

### Example Response

```json
{
  "feeds": {
    "current_page": 1,
    "data": [
      {
        "id": 123,
        "user_id": 1,
        "title": "My First Post",
        "slug": "my-first-post",
        "message": "Hello community!",
        "message_rendered": "<p>Hello community!</p>",
        "type": "feed",
        "status": "published",
        "comments_count": 5,
        "reactions_count": 12,
        "created_at": "2025-10-27T10:00:00",
        "xprofile": {
          "user_id": 1,
          "display_name": "John Doe",
          "username": "john_doe",
          "avatar": "https://example.com/avatar.jpg"
        }
      }
    ],
    "total": 45,
    "per_page": 10
  }
}
```

## Get User's Comments

Retrieve comments made by a specific user.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/profile/{username}/comments
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/comments" \
  -u "username:password"
```

## Get User's Spaces

Retrieve spaces a user is a member of.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/profile/{username}/spaces
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/spaces" \
  -u "username:password"
```

## Get Notification Preferences

Retrieve the current user's notification settings.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/profile/{username}/notification-preferences
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/john_doe/notification-preferences" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "email_notifications": {
      "new_comment": true,
      "new_reaction": false,
      "new_follower": true,
      "mention": true,
      "space_invite": true
    },
    "push_notifications": {
      "new_comment": true,
      "new_reaction": true,
      "mention": true
    },
    "digest_frequency": "daily"
  }
}
```

## Update Notification Preferences

Update the current user's notification settings.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/profile/{username}/notification-preferences
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email_notifications` | object | No | Email notification settings |
| `push_notifications` | object | No | Push notification settings |
| `digest_frequency` | string | No | Digest frequency (daily, weekly, never) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/profile/{username}/notification-preferences" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "email_notifications": {
      "new_comment": true,
      "new_reaction": false,
      "mention": true
    },
    "digest_frequency": "weekly"
  }'
```

## Best Practices

### 1. Profile Completeness

Encourage users to complete their profiles:

```bash
# Check profile completeness
curl ".../profile/me"

# Update missing fields
curl -X PUT ".../profile/me" -d '{
  "bio": "Add a bio",
  "location": "Add location",
  "avatar": "Upload avatar"
}'
```

### 2. Privacy Settings

Respect user privacy preferences:

```bash
# Public profiles - anyone can view
curl ".../profile/john_doe"

# Private profiles - only authenticated users
curl ".../profile/jane_smith" \
  -H "Authorization: Bearer TOKEN"
```

### 3. Social Links

Validate social media URLs:

```javascript
const socialLinks = {
  twitter: 'https://twitter.com/username',
  linkedin: 'https://linkedin.com/in/username',
  github: 'https://github.com/username'
};

// Update profile
await fetch('/wp-json/fluent-community/v2/profile/me', {
  method: 'PUT',
  body: JSON.stringify({ social_links: socialLinks })
});
```

### 4. Avatar Management

Handle avatar uploads properly:

```bash
# Upload avatar first
curl -X POST ".../feeds/media-upload" \
  -F "file=@avatar.jpg" \
  -F "object_source=profile"

# Update profile with avatar URL
curl -X PUT ".../profile/me" -d '{
  "avatar": "https://example.com/avatar.jpg"
}'
```

## Common Use Cases

### User Profile Page

Display a complete user profile:

```bash
# Get profile data
curl ".../profile/john_doe"

# Get user's recent activity
curl ".../profile/john_doe/feeds?per_page=5"
curl ".../profile/john_doe/comments?per_page=5"
```

### Profile Settings Page

Create a settings interface:

```bash
# Get current settings
curl ".../profile/me"
curl ".../profile/notification-preferences"

# Update settings
curl -X PUT ".../profile/me" -d '{...}'
curl -X PUT ".../profile/notification-preferences" -d '{...}'
```

### User Directory

Build a member directory:

```bash
# Get all members (see Members API)
curl ".../members?per_page=50"

# Link to individual profiles
# /profile/{username}
```

### Activity Feed

Show user activity:

```bash
# Get user's feeds
curl ".../profile/john_doe/feeds?orderby=created_at&order=desc"

# Get user's comments
curl ".../profile/john_doe/comments?orderby=created_at&order=desc"
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

### Invalid Username (400)

```json
{
  "code": "invalid_username",
  "message": "Invalid username format",
  "data": {
    "status": 400
  }
}
```

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to update this profile.",
  "data": {
    "status": 403
  }
}
```

### Invalid URL (400)

```json
{
  "code": "invalid_url",
  "message": "Invalid website or social media URL",
  "data": {
    "status": 400,
    "field": "website"
  }
}
```

## Related Endpoints

- [Members](./members.md) - List and search members
- [Followers](./followers.md) - Follow/unfollow users [PRO]
- [Feeds](./feeds.md) - View user's feeds
- [Spaces](./spaces.md) - View user's spaces
