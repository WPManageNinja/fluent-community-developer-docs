# Spaces

The Spaces API allows you to manage community spaces (groups/channels) where users can organize discussions and content.

## Space Object

A space represents a group or channel in your community.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the space |
| `created_by` | integer | User ID of the space creator |
| `parent_id` | integer | Parent space ID (for nested spaces) |
| `title` | string | Space name |
| `slug` | string | URL-friendly slug |
| `logo` | string | Space logo URL |
| `cover_photo` | string | Cover photo URL |
| `description` | string | Space description |
| `type` | string | Space type (discussion, announcement, etc.) |
| `privacy` | string | Privacy setting (public, private) |
| `status` | string | Publication status (published, draft) |
| `serial` | integer | Display order |
| `settings` | object | Space settings (JSON) |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |
| `members_count` | integer | Number of members (when included) |
| `posts_count` | integer | Number of posts (when included) |

### Privacy Values

- `public` - Anyone can view and join
- `private` - Invitation or approval required

### Status Values

- `published` - Active and visible
- `draft` - Not yet published
- `archived` - Archived space

## List All Spaces

Retrieve a list of community spaces.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/spaces
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page |
| `type` | string | - | Filter by space type |
| `privacy` | string | - | Filter by privacy (public, private) |
| `status` | string | published | Filter by status |
| `parent_id` | integer | - | Filter by parent space |
| `search` | string | - | Search in title and description |
| `orderby` | string | serial | Sort field (serial, title, created_at) |
| `order` | string | asc | Sort order (asc, desc) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces?privacy=public" \
  -u "username:password"
```

### Example Response

```json
{
  "spaces": [
    {
      "id": 5,
      "created_by": "1",
      "parent_id": null,
      "title": "General Discussion",
      "slug": "general-discussion",
      "logo": "https://example.com/logo.jpg",
      "cover_photo": "https://example.com/cover.jpg",
      "description": "A place for general discussions",
      "type": "community",
      "privacy": "public",
      "status": "published",
      "serial": "1",
      "settings": {
        "restricted_post_only": "no",
        "emoji": "",
        "shape_svg": "",
        "custom_lock_screen": "no",
        "can_request_join": "yes",
        "layout_style": "timeline",
        "show_sidebar": "yes",
        "og_image": "",
        "links": [],
        "topic_required": "no",
        "hide_members_count": "no",
        "members_page_status": "public"
      },
      "created_at": "2025-01-01 00:00:00",
      "updated_at": "2025-01-01 00:00:00",
      "members_count": 150,
      "posts_count": 342,
      "is_member": true,
      "role": "member"
    }
  ]
}
```

## Get a Specific Space

Retrieve details for a single space by slug or ID.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/spaces/{spaceSlug}/by-slug
GET /wp-json/fluent-community/v2/spaces/{spaceId}/by-id
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spaceSlug` | string | Yes | Space slug (for by-slug endpoint) |
| `spaceId` | integer | Yes | Space ID (for by-id endpoint) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/general-discussion/by-slug" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "id": 5,
    "created_by": 1,
    "title": "General Discussion",
    "slug": "general-discussion",
    "logo": "https://example.com/logo.jpg",
    "cover_photo": "https://example.com/cover.jpg",
    "description": "A place for general discussions",
    "type": "discussion",
    "privacy": "public",
    "status": "published",
    "settings": {
      "allow_posts": true,
      "require_approval": false,
      "post_permissions": ["member", "moderator", "admin"]
    },
    "members_count": 150,
    "posts_count": 342,
    "is_member": true,
    "role": "member",
    "creator": {
      "id": 1,
      "username": "admin",
      "display_name": "Admin User"
    }
  }
}
```

## Create a Space

Create a new community space.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/spaces
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Space name |
| `slug` | string | No | URL slug (auto-generated if omitted) |
| `description` | string | No | Space description |
| `logo` | string | No | Logo URL |
| `cover_photo` | string | No | Cover photo URL |
| `type` | string | No | Space type |
| `privacy` | string | No | Privacy setting (public, private) |
| `status` | string | No | Status (published, draft) |
| `parent_id` | integer | No | Parent space ID |
| `settings` | object | No | Space settings |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Talk",
    "description": "Discuss technology and innovation",
    "privacy": "public",
    "status": "published",
    "settings": {
      "allow_posts": true,
      "require_approval": false
    }
  }'
```

### Example Response

```json
{
  "message": "Space created successfully",
  "data": {
    "id": 15,
    "title": "Tech Talk",
    "slug": "tech-talk",
    "privacy": "public",
    "status": "published",
    "created_at": "2025-10-27T12:00:00"
  }
}
```

## Update a Space

Modify an existing space.

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/spaces/{spaceSlug}/by-slug
PUT /wp-json/fluent-community/v2/spaces/{spaceId}/by-id
```

### Parameters

All create parameters are available for updates (all optional).

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/by-slug" \
  -X PUT \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Tech Talk & Innovation",
    "description": "Updated description"
  }'
```

### Example Response

```json
{
  "message": "Space updated successfully",
  "data": {
    "id": 15,
    "title": "Tech Talk & Innovation",
    "updated_at": "2025-10-27T13:00:00"
  }
}
```

## Delete a Space

Remove a space permanently.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/spaces/{spaceSlug}
DELETE /wp-json/fluent-community/v2/spaces/{spaceId}/by-id
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk" \
  -X DELETE \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Space deleted successfully"
}
```

**Warning:** Deleting a space will also delete all associated feeds and content.

## Join a Space

Join a public space or request to join a private space.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/spaces/{spaceSlug}/join
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/join" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Successfully joined the space",
  "data": {
    "space_id": 15,
    "user_id": 1,
    "role": "member",
    "joined_at": "2025-10-27T12:00:00"
  }
}
```

For private spaces:

```json
{
  "message": "Join request sent. Awaiting approval.",
  "data": {
    "status": "pending"
  }
}
```

## Leave a Space

Leave a space you're a member of.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/spaces/{spaceSlug}/leave
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/tech-talk/leave" \
  -X POST \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Successfully left the space"
}
```

## Discover Spaces

Find public spaces to join.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/spaces/discover
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `search` | string | - | Search query |
| `page` | integer | 1 | Page number |
| `per_page` | integer | 20 | Items per page |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces/discover?search=tech" \
  -u "username:password"
```

## Best Practices

### 1. Space Organization

Use parent spaces to create hierarchies:

```bash
# Create a parent space
curl -X POST ".../spaces" -d '{
  "title": "Technology",
  "privacy": "public"
}'

# Create child spaces
curl -X POST ".../spaces" -d '{
  "title": "Web Development",
  "parent_id": 10,
  "privacy": "public"
}'
```

### 2. Privacy Settings

Choose appropriate privacy levels:
- Use `public` for open communities
- Use `private` for exclusive groups or paid memberships

### 3. Space Settings

Configure space behavior through settings:

```json
{
  "settings": {
    "allow_posts": true,
    "require_approval": false,
    "post_permissions": ["member", "moderator", "admin"],
    "allow_comments": true,
    "allow_reactions": true
  }
}
```

### 4. Space Moderation

Assign moderators for active spaces:

```bash
# Add a moderator (see Space Members API)
curl -X POST ".../spaces/tech-talk/members" -d '{
  "user_id": 5,
  "role": "moderator"
}'
```

## Common Use Cases

### Create a Welcome Space

Set up a default space for new members:

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces" \
  -X POST \
  -u "username:password" \
  -d '{
    "title": "Welcome & Introductions",
    "description": "Introduce yourself to the community",
    "privacy": "public",
    "settings": {
      "allow_posts": true,
      "require_approval": false
    }
  }'
```

### Topic-Based Spaces

Organize by topics or interests:

```bash
# Create multiple topic spaces
for topic in "Marketing" "Sales" "Support"; do
  curl -X POST ".../spaces" -d "{
    \"title\": \"$topic\",
    \"privacy\": \"public\"
  }"
done
```

### Private Member Spaces

Create exclusive spaces for premium members:

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/spaces" \
  -X POST \
  -u "username:password" \
  -d '{
    "title": "VIP Members Only",
    "privacy": "private",
    "settings": {
      "require_approval": true
    }
  }'
```

## Error Handling

### Space Not Found (404)

```json
{
  "code": "space_not_found",
  "message": "Space not found",
  "data": {
    "status": 404
  }
}
```

### Duplicate Slug (400)

```json
{
  "code": "duplicate_slug",
  "message": "A space with this slug already exists",
  "data": {
    "status": 400
  }
}
```

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to manage this space.",
  "data": {
    "status": 403
  }
}
```

### Already a Member (400)

```json
{
  "code": "already_member",
  "message": "You are already a member of this space",
  "data": {
    "status": 400
  }
}
```

## Update Space Lockscreen Settings [PRO]

::: tip PRO FEATURE
This feature is only available in Fluent Community Pro.
:::

Update lockscreen settings for a space to restrict access based on conditions.

### HTTP Request

```
PUT /wp-json/fluent-community/v2/spaces/{spaceSlug}/lockscreens
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `spaceSlug` | string | The slug of the space |

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `enabled` | boolean | Yes | Enable/disable lockscreen |
| `type` | string | No | Lockscreen type: `membership`, `payment`, `custom` |
| `conditions` | object | No | Lockscreen conditions |
| `message` | string | No | Message to display on lockscreen |
| `button_text` | string | No | Call-to-action button text |
| `button_url` | string | No | Button URL |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v2/spaces/premium-space/lockscreens" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "type": "membership",
    "conditions": {
      "required_membership": "premium",
      "required_role": "subscriber"
    },
    "message": "This space is only available to premium members",
    "button_text": "Upgrade to Premium",
    "button_url": "https://example.com/upgrade"
  }'
```

### Example Response

```json
{
  "message": "Lockscreen settings updated successfully",
  "lockscreen": {
    "enabled": true,
    "type": "membership",
    "conditions": {
      "required_membership": "premium",
      "required_role": "subscriber"
    },
    "message": "This space is only available to premium members",
    "button_text": "Upgrade to Premium",
    "button_url": "https://example.com/upgrade"
  }
}
```

**Permissions:** Space administrator or community administrator

---

## Related Endpoints

- [Space Members](./space-members.md) - Manage space membership
- [Space Groups](./space-groups.md) - Organize spaces into groups
- [Feeds](./feeds.md) - Post content in spaces
- [Profiles](./profiles.md) - View user's spaces
- [Courses](./courses.md) - Course lockscreen settings

