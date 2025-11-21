<DocStatusBanner />

# Community Managers [PRO]

::: tip PRO FEATURE
The Community Managers API is available in Fluent Community Pro. It allows administrators to designate and manage community managers with elevated permissions.
:::

The Community Managers API allows administrators to add, update, and remove community managers who have special permissions to moderate and manage the community.

## Manager Object

A manager represents a user with elevated community management permissions.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the manager record |
| `user_id` | integer | WordPress user ID |
| `role` | string | Manager role (manager, moderator, admin) |
| `permissions` | array | List of granted permissions |
| `spaces` | array | Assigned spaces (if space-specific) |
| `status` | string | Manager status (active, inactive) |
| `assigned_by` | integer | User ID who assigned this role |
| `created_at` | datetime | Assignment timestamp |
| `updated_at` | datetime | Last update timestamp |

### Manager Roles

- `admin` - Full administrative access
- `manager` - Community management access
- `moderator` - Content moderation access

### Permissions

**Content Permissions:**
- `manage_feeds` - Create, edit, delete any feed
- `manage_comments` - Edit, delete any comment
- `pin_feeds` - Pin/unpin feeds
- `feature_content` - Feature content

**Space Permissions:**
- `manage_spaces` - Create, edit, delete spaces
- `manage_space_members` - Add, remove space members
- `moderate_spaces` - Moderate space content

**User Permissions:**
- `manage_members` - Edit member profiles
- `ban_members` - Ban/unban members
- `view_reports` - View moderation reports
- `resolve_reports` - Resolve moderation reports

**Settings Permissions:**
- `manage_settings` - Edit community settings
- `view_analytics` - Access analytics
- `manage_webhooks` - Configure webhooks

### Status Values

- `active` - Manager role is active
- `inactive` - Manager role is suspended

## Get All Managers

Retrieve all community managers.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/managers
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role` | string | No | Filter by role (admin, manager, moderator) |
| `status` | string | No | Filter by status (active, inactive) |
| `search` | string | No | Search by name or email |
| `per_page` | integer | No | Number of managers per page (default: 20) |
| `page` | integer | No | Page number for pagination |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/admin/managers?role=manager" \
  -u "username:password"
```

### Example Response

```json
{
  "managers": [
    {
      "id": 1,
      "user_id": 45,
      "role": "manager",
      "permissions": [
        "manage_feeds",
        "manage_comments",
        "pin_feeds",
        "manage_space_members",
        "view_reports"
      ],
      "spaces": null,
      "status": "active",
      "assigned_by": 1,
      "created_at": "2024-01-01 10:00:00",
      "updated_at": "2024-01-15 14:30:00",
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
      }
    },
    {
      "id": 2,
      "user_id": 67,
      "role": "moderator",
      "permissions": [
        "manage_comments",
        "view_reports",
        "resolve_reports"
      ],
      "spaces": [12, 15, 18],
      "status": "active",
      "assigned_by": 1,
      "created_at": "2024-01-05 11:00:00",
      "updated_at": "2024-01-10 09:20:00",
      "xprofile": {
        "user_id": 67,
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
  "pagination": {
    "total": 5,
    "per_page": 20,
    "current_page": 1,
    "total_pages": 1
  }
}
```

## Add or Update Manager

Add a new manager or update an existing manager's permissions.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/managers
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `user_id` | integer | Yes | WordPress user ID |
| `role` | string | Yes | Manager role (admin, manager, moderator) |
| `permissions` | array | No | List of permissions (defaults based on role) |
| `spaces` | array | No | Assigned spaces (for space-specific managers) |
| `status` | string | No | Manager status (default: active) |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/admin/managers" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": 89,
    "role": "manager",
    "permissions": [
      "manage_feeds",
      "manage_comments",
      "pin_feeds",
      "manage_space_members",
      "view_reports",
      "resolve_reports"
    ],
    "status": "active"
  }'
```

### Example Response

```json
{
  "id": 3,
  "user_id": 89,
  "role": "manager",
  "permissions": [
    "manage_feeds",
    "manage_comments",
    "pin_feeds",
    "manage_space_members",
    "view_reports",
    "resolve_reports"
  ],
  "spaces": null,
  "status": "active",
  "assigned_by": 1,
  "created_at": "2024-01-15 10:30:00",
  "message": "Manager added successfully."
}
```

## Update Manager

Update an existing manager's role or permissions.

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/admin/managers/{user_id}
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `role` | string | No | Manager role |
| `permissions` | array | No | List of permissions |
| `spaces` | array | No | Assigned spaces |
| `status` | string | No | Manager status |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v2/admin/managers/89" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "permissions": [
      "manage_feeds",
      "manage_comments",
      "pin_feeds",
      "manage_spaces",
      "manage_space_members",
      "view_reports",
      "resolve_reports",
      "view_analytics"
    ]
  }'
```

### Example Response

```json
{
  "id": 3,
  "user_id": 89,
  "permissions": [
    "manage_feeds",
    "manage_comments",
    "pin_feeds",
    "manage_spaces",
    "manage_space_members",
    "view_reports",
    "resolve_reports",
    "view_analytics"
  ],
  "updated_at": "2024-01-15 11:00:00",
  "message": "Manager updated successfully."
}
```

## Remove Manager

Remove a user's manager role.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/admin/managers/{user_id}
```

**Permissions:** Administrator only

### Example Request

```bash
curl -X DELETE "https://example.com/wp-json/fluent-community/v2/admin/managers/89" \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Manager removed successfully."
}
```

---

## Best Practices

### 1. Use Role-Based Permissions
Assign permissions based on roles:

```javascript
const rolePermissions = {
  admin: [
    'manage_feeds', 'manage_comments', 'pin_feeds',
    'manage_spaces', 'manage_space_members',
    'manage_members', 'ban_members',
    'view_reports', 'resolve_reports',
    'manage_settings', 'view_analytics', 'manage_webhooks'
  ],
  manager: [
    'manage_feeds', 'manage_comments', 'pin_feeds',
    'manage_space_members',
    'view_reports', 'resolve_reports',
    'view_analytics'
  ],
  moderator: [
    'manage_comments',
    'view_reports', 'resolve_reports'
  ]
};
```

### 2. Assign Space-Specific Moderators
Limit moderators to specific spaces:

```javascript
await fetch('/wp-json/fluent-community/v2/admin/managers', {
  method: 'POST',
  body: JSON.stringify({
    user_id: 67,
    role: 'moderator',
    spaces: [12, 15, 18], // Only these spaces
    permissions: ['manage_comments', 'view_reports', 'resolve_reports']
  })
});
```

### 3. Audit Manager Actions
Track what managers do:

```javascript
async function getManagerActivity(userId) {
  // Get activities performed by manager
  const response = await fetch(
    `/wp-json/fluent-community/v2/activities?user_id=${userId}&action_type=moderation`
  );
  return await response.json();
}
```

### 4. Regular Permission Reviews
Periodically review manager permissions:

```javascript
async function reviewManagerPermissions() {
  const response = await fetch('/wp-json/fluent-community/v2/admin/managers');
  const data = await response.json();
  
  data.managers.forEach(manager => {
    console.log(`${manager.user.display_name}: ${manager.permissions.length} permissions`);
  });
}
```

### 5. Notify on Manager Changes
Send notifications when manager roles change:

```javascript
async function addManagerWithNotification(userId, role, permissions) {
  const response = await fetch('/wp-json/fluent-community/v2/admin/managers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({ user_id: userId, role, permissions })
  });
  
  if (response.ok) {
    // Send notification to user
    await sendNotification(userId, {
      type: 'manager_assigned',
      message: `You have been assigned as a ${role}`
    });
  }
  
  return await response.json();
}
```

---

## Common Use Cases

### 1. Manager Dashboard

Create a manager management interface:

```javascript
async function getManagerDashboard() {
  const response = await fetch('/wp-json/fluent-community/v2/admin/managers');
  const data = await response.json();
  
  return {
    total: data.pagination.total,
    byRole: {
      admins: data.managers.filter(m => m.role === 'admin').length,
      managers: data.managers.filter(m => m.role === 'manager').length,
      moderators: data.managers.filter(m => m.role === 'moderator').length
    },
    active: data.managers.filter(m => m.status === 'active').length,
    inactive: data.managers.filter(m => m.status === 'inactive').length
  };
}
```

### 2. Assign Community Manager

Add a new community manager:

```javascript
async function assignCommunityManager(userId) {
  const response = await fetch('/wp-json/fluent-community/v2/admin/managers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({
      user_id: userId,
      role: 'manager',
      permissions: [
        'manage_feeds',
        'manage_comments',
        'pin_feeds',
        'manage_space_members',
        'view_reports',
        'resolve_reports',
        'view_analytics'
      ],
      status: 'active'
    })
  });
  
  return await response.json();
}
```

### 3. Assign Space Moderator

Add a moderator for specific spaces:

```javascript
async function assignSpaceModerator(userId, spaceIds) {
  const response = await fetch('/wp-json/fluent-community/v2/admin/managers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({
      user_id: userId,
      role: 'moderator',
      spaces: spaceIds,
      permissions: [
        'manage_comments',
        'view_reports',
        'resolve_reports'
      ],
      status: 'active'
    })
  });
  
  return await response.json();
}
```

### 4. Bulk Manager Assignment

Assign multiple managers at once:

```javascript
async function bulkAssignManagers(managers) {
  const promises = managers.map(manager =>
    fetch('/wp-json/fluent-community/v2/admin/managers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      },
      body: JSON.stringify(manager)
    })
  );
  
  const results = await Promise.all(promises);
  return Promise.all(results.map(r => r.json()));
}

// Usage
const newManagers = [
  { user_id: 45, role: 'manager', permissions: [...] },
  { user_id: 67, role: 'moderator', spaces: [12, 15] },
  { user_id: 89, role: 'moderator', spaces: [18, 20] }
];

await bulkAssignManagers(newManagers);
```

---

## Error Handling

### Common Errors

**403 Forbidden**
```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you don't have permission to manage community managers.",
  "data": {
    "status": 403
  }
}
```

**404 Not Found**
```json
{
  "code": "user_not_found",
  "message": "User not found.",
  "data": {
    "status": 404
  }
}
```

**400 Bad Request**
```json
{
  "code": "invalid_role",
  "message": "Invalid manager role. Must be one of: admin, manager, moderator.",
  "data": {
    "status": 400
  }
}
```

---

## Related Endpoints

- [Members](/rest-api/members) - Manage community members
- [Moderation](/rest-api/moderation) - Content moderation
- [Settings](/rest-api/settings) - Community settings
- [Analytics](/rest-api/analytics) - Community analytics
