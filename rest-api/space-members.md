<DocStatusBanner />

# Space Members

The Space Members API allows you to manage membership in community spaces, including adding members, removing members, and updating roles.

## Space Member Object

A space member represents a user's membership in a space.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique membership ID |
| `space_id` | integer | Space ID |
| `user_id` | integer | User ID |
| `role` | string | Member role (member, moderator, admin) |
| `status` | string | Membership status (active, pending, banned) |
| `joined_at` | datetime | Join timestamp |
| `updated_at` | datetime | Last update timestamp |
| `user` | object | User object (when included) |

### Role Values

- `member` - Regular member
- `moderator` - Can moderate content
- `admin` - Full space management permissions

### Status Values

- `active` - Active member
- `pending` - Awaiting approval
- `banned` - Banned from space

## List Space Members

Retrieve all members of a space.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/spaces/{spaceSlug}/members
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `spaceSlug` | string | - | Space slug |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page (max: 100) |
| `role` | string | - | Filter by role |
| `status` | string | active | Filter by status |
| `search` | string | - | Search members by name |
| `orderby` | string | joined_at | Sort field |
| `order` | string | desc | Sort order (asc, desc) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/members?per_page=10" \
  -u "username:password"
```

### Example Response

```json
{
  "data": [
    {
      "id": 123,
      "space_id": 15,
      "user_id": 1,
      "role": "admin",
      "status": "active",
      "joined_at": "2025-01-15 10:00:00",
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
    },
    {
      "id": 124,
      "space_id": 15,
      "user_id": 2,
      "role": "member",
      "status": "active",
      "joined_at": "2025-02-01 14:30:00",
      "xprofile": {
        "user_id": 2,
        "total_points": 3210,
        "is_verified": 0,
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
  "meta": {
    "total": 150,
    "per_page": 10,
    "current_page": 1,
    "total_pages": 15
  }
}
```

## Add Member to Space

Add a user to a space with a specific role.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/spaces/{spaceSlug}/members
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | integer | Yes | User ID to add |
| `role` | string | No | Member role (default: member) |
| `status` | string | No | Membership status (default: active) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/members" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 5,
    "role": "member"
  }'
```

### Example Response

```json
{
  "message": "Member added successfully",
  "data": {
    "id": 125,
    "space_id": 15,
    "user_id": 5,
    "role": "member",
    "status": "active",
    "joined_at": "2025-10-27T12:00:00"
  }
}
```

## Update Member Role

Change a member's role in a space.

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/spaces/{spaceSlug}/members/{user_id}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role` | string | Yes | New role (member, moderator, admin) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/members/5" \
  -X PUT \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "moderator"
  }'
```

### Example Response

```json
{
  "message": "Member role updated successfully",
  "data": {
    "user_id": 5,
    "role": "moderator",
    "updated_at": "2025-10-27T13:00:00"
  }
}
```

## Remove Member from Space

Remove a user from a space.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/spaces/{spaceSlug}/members/remove
DELETE /wp-json/fluent-community/v2/spaces/{spaceSlug}/members/{user_id}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | integer | Yes | User ID to remove |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/members/remove" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 5
  }'
```

### Example Response

```json
{
  "message": "Member removed successfully"
}
```

## Ban Member from Space

Ban a user from a space.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/spaces/{spaceSlug}/members/{user_id}/ban
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/members/5/ban" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Member banned successfully",
  "data": {
    "user_id": 5,
    "status": "banned"
  }
}
```

## Unban Member

Restore a banned member's access.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/spaces/{spaceSlug}/members/{user_id}/unban
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/members/5/unban" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Member unbanned successfully",
  "data": {
    "user_id": 5,
    "status": "active"
  }
}
```

## Search Users to Add

Search for users to add to a space.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/spaces/users/search
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search query |
| `space_id` | integer | No | Exclude existing members of this space |
| `per_page` | integer | No | Results limit (default: 10) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/users/search?q=john&space_id=15" \
  -u "username:password"
```

### Example Response

```json
{
  "data": [
    {
      "id": 10,
      "username": "john_williams",
      "display_name": "John Williams",
      "email": "[email protected]",
      "avatar": "https://example.com/avatar.jpg"
    }
  ]
}
```

## Best Practices

### 1. Role Management

Assign appropriate roles based on responsibilities:

```bash
# Add a moderator
curl -X POST ".../spaces/tech-talk/members" -d '{
  "user_id": 5,
  "role": "moderator"
}'

# Promote to admin
curl -X PUT ".../spaces/tech-talk/members/5" -d '{
  "role": "admin"
}'
```

### 2. Bulk Member Addition

Add multiple members efficiently:

```bash
# Add multiple users
for user_id in 10 11 12 13 14; do
  curl -X POST ".../spaces/tech-talk/members" \
    -d "{\"user_id\": $user_id, \"role\": \"member\"}"
done
```

### 3. Member Approval Workflow

For private spaces, manage pending members:

```bash
# Get pending members
curl ".../spaces/tech-talk/members?status=pending"

# Approve member
curl -X PUT ".../spaces/tech-talk/members/5" -d '{
  "status": "active"
}'
```

### 4. Moderation

Use banning for problematic members:

```bash
# Ban a member
curl -X POST ".../spaces/tech-talk/members/5/ban"

# Later, unban if needed
curl -X POST ".../spaces/tech-talk/members/5/unban"
```

## Common Use Cases

### Invite Users to Space

Invite specific users to join:

```bash
# Search for user
curl ".../spaces/users/search?q=jane"

# Add user to space
curl -X POST ".../spaces/tech-talk/members" -d '{
  "user_id": 2,
  "role": "member"
}'
```

### Assign Moderators

Promote active members to moderators:

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/members/5" \
  -X PUT \
  -u "username:password" \
  -d '{
    "role": "moderator"
  }'
```

### Member Directory

Create a member directory for a space:

```bash
# Get all active members
curl ".../spaces/tech-talk/members?status=active&per_page=100"
```

### Cleanup Inactive Members

Remove members who haven't been active:

```bash
# Get members sorted by last activity
curl ".../spaces/tech-talk/members?orderby=last_activity&order=asc"

# Remove inactive members
curl -X POST ".../spaces/tech-talk/members/remove" -d '{
  "user_id": 10
}'
```

## Error Handling

### Member Not Found (404)

```json
{
  "code": "member_not_found",
  "message": "Member not found in this space",
  "data": {
    "status": 404
  }
}
```

### Already a Member (400)

```json
{
  "code": "already_member",
  "message": "User is already a member of this space",
  "data": {
    "status": 400
  }
}
```

### Insufficient Permissions (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to manage members in this space.",
  "data": {
    "status": 403
  }
}
```

### Cannot Remove Self (400)

```json
{
  "code": "cannot_remove_self",
  "message": "You cannot remove yourself from the space. Use the leave endpoint instead.",
  "data": {
    "status": 400
  }
}
```

## Related Endpoints

- [Spaces](./spaces.md) - Manage spaces
- [Profiles](./profiles.md) - View user profiles
- [Members](./members.md) - List all community members
