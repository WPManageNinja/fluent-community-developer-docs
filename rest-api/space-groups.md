# Space Groups API

Space Groups allow you to organize spaces into logical categories or sections within your community. This helps members navigate and discover spaces more easily.

---

## Space Group Object

```json
{
  "id": 1,
  "title": "Product Teams",
  "slug": "product-teams",
  "description": "Spaces for product development teams",
  "serial": 1,
  "settings": {
    "is_collapsible": true,
    "default_collapsed": false
  },
  "spaces_count": 5,
  "created_at": "2024-01-15 10:30:00",
  "updated_at": "2024-01-20 14:45:00"
}
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | integer | Unique identifier for the space group |
| `title` | string | Display name of the space group |
| `slug` | string | URL-friendly identifier |
| `description` | string | Optional description of the group |
| `serial` | integer | Display order (lower numbers appear first) |
| `settings` | object | Group configuration settings |
| `spaces_count` | integer | Number of spaces in this group |
| `created_at` | datetime | When the group was created |
| `updated_at` | datetime | When the group was last modified |

---

## Get All Space Groups

Retrieve all space groups with their associated spaces.

### HTTP Request

```
GET /wp-json/fluent-community/v1/spaces/space_groups
```

### Query Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `with_spaces` | boolean | `true` | Include spaces in each group |
| `include_empty` | boolean | `false` | Include groups with no spaces |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v1/spaces/space_groups?with_spaces=true" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "space_groups": [
    {
      "id": 1,
      "title": "Product Teams",
      "slug": "product-teams",
      "description": "Spaces for product development",
      "serial": 1,
      "settings": {
        "is_collapsible": true,
        "default_collapsed": false
      },
      "spaces": [
        {
          "id": 10,
          "title": "Engineering",
          "slug": "engineering",
          "serial": 1
        },
        {
          "id": 11,
          "title": "Design",
          "slug": "design",
          "serial": 2
        }
      ]
    },
    {
      "id": 2,
      "title": "Community",
      "slug": "community",
      "description": "General community spaces",
      "serial": 2,
      "settings": {
        "is_collapsible": true,
        "default_collapsed": false
      },
      "spaces": [
        {
          "id": 1,
          "title": "General Discussion",
          "slug": "general",
          "serial": 1
        }
      ]
    }
  ]
}
```

---

## Create Space Group

Create a new space group to organize your spaces.

### HTTP Request

```
POST /wp-json/fluent-community/v1/spaces/space_groups
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | Yes | Name of the space group |
| `slug` | string | No | URL-friendly identifier (auto-generated if not provided) |
| `description` | string | No | Description of the group |
| `settings` | object | No | Group configuration |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v1/spaces/space_groups" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Marketing Teams",
    "description": "Spaces for marketing departments",
    "settings": {
      "is_collapsible": true,
      "default_collapsed": false
    }
  }'
```

### Example Response

```json
{
  "message": "Space group created successfully",
  "space_group": {
    "id": 3,
    "title": "Marketing Teams",
    "slug": "marketing-teams",
    "description": "Spaces for marketing departments",
    "serial": 3,
    "settings": {
      "is_collapsible": true,
      "default_collapsed": false
    },
    "spaces_count": 0,
    "created_at": "2024-01-25 09:15:00",
    "updated_at": "2024-01-25 09:15:00"
  }
}
```

---

## Update Space Group

Update an existing space group's details.

### HTTP Request

```
PUT /wp-json/fluent-community/v1/spaces/space_groups/{id}
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | The ID of the space group |

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `title` | string | No | Updated name |
| `description` | string | No | Updated description |
| `settings` | object | No | Updated settings |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v1/spaces/space_groups/3" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Marketing & Sales",
    "description": "Combined marketing and sales teams"
  }'
```

### Example Response

```json
{
  "message": "Space group updated successfully",
  "space_group": {
    "id": 3,
    "title": "Marketing & Sales",
    "slug": "marketing-teams",
    "description": "Combined marketing and sales teams",
    "serial": 3,
    "settings": {
      "is_collapsible": true,
      "default_collapsed": false
    },
    "spaces_count": 2,
    "updated_at": "2024-01-25 10:30:00"
  }
}
```

---

## Delete Space Group

Delete a space group. Spaces in the group will be moved to "Uncategorized".

### HTTP Request

```
DELETE /wp-json/fluent-community/v1/spaces/space_groups/{id}
```

### URL Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | The ID of the space group to delete |

### Example Request

```bash
curl -X DELETE "https://example.com/wp-json/fluent-community/v1/spaces/space_groups/3" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD"
```

### Example Response

```json
{
  "message": "Space group deleted successfully"
}
```

---

## Reorder Space Groups

Update the display order of space groups.

### HTTP Request

```
PATCH /wp-json/fluent-community/v1/spaces/space_groups/re-index
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `group_ids` | array | Yes | Array of group IDs in desired order |

### Example Request

```bash
curl -X PATCH "https://example.com/wp-json/fluent-community/v1/spaces/space_groups/re-index" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "group_ids": [2, 1, 3]
  }'
```

### Example Response

```json
{
  "message": "Space groups reordered successfully"
}
```

---

## Reorder Spaces Within Groups

Update the display order of spaces within their groups.

### HTTP Request

```
PATCH /wp-json/fluent-community/v1/spaces/space_groups/re-index-spaces
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `space_ids` | array | Yes | Array of space IDs in desired order |
| `group_id` | integer | No | Limit reordering to specific group |

### Example Request

```bash
curl -X PATCH "https://example.com/wp-json/fluent-community/v1/spaces/space_groups/re-index-spaces" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "space_ids": [11, 10, 12],
    "group_id": 1
  }'
```

### Example Response

```json
{
  "message": "Spaces reordered successfully"
}
```

---

## Move Space to Different Group

Move a space from one group to another.

### HTTP Request

```
PATCH /wp-json/fluent-community/v1/spaces/space_groups/move-space
```

### Request Body

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `space_id` | integer | Yes | ID of the space to move |
| `group_id` | integer | Yes | ID of the destination group (0 for uncategorized) |
| `serial` | integer | No | Position in the new group |

### Example Request

```bash
curl -X PATCH "https://example.com/wp-json/fluent-community/v1/spaces/space_groups/move-space" \
  -H "Authorization: Basic API_USERNAME:API_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "space_id": 10,
    "group_id": 2,
    "serial": 1
  }'
```

### Example Response

```json
{
  "message": "Space moved successfully",
  "space": {
    "id": 10,
    "title": "Engineering",
    "group_id": 2,
    "serial": 1
  }
}
```

---

## Best Practices

### Organization Strategy
- **Use Logical Categories**: Group spaces by department, topic, or purpose
- **Keep Groups Focused**: Aim for 3-7 spaces per group for optimal navigation
- **Clear Naming**: Use descriptive group names that clearly indicate content

### Display Order
- **Prioritize Important Groups**: Place most active groups at the top
- **Consistent Ordering**: Maintain logical order (e.g., alphabetical or by importance)
- **Regular Review**: Periodically review and adjust group organization

### Settings Configuration
```json
{
  "is_collapsible": true,      // Allow users to collapse the group
  "default_collapsed": false   // Start expanded by default
}
```

---

## Common Use Cases

### 1. Organize by Department
```bash
# Create department groups
curl -X POST ".../space_groups" \
  -d '{"title": "Engineering", "description": "Technical teams"}'
curl -X POST ".../space_groups" \
  -d '{"title": "Marketing", "description": "Marketing teams"}'
curl -X POST ".../space_groups" \
  -d '{"title": "Sales", "description": "Sales teams"}'
```

### 2. Reorganize Space Structure
```bash
# Move space to different group
curl -X PATCH ".../space_groups/move-space" \
  -d '{"space_id": 15, "group_id": 2}'

# Reorder groups
curl -X PATCH ".../space_groups/re-index" \
  -d '{"group_ids": [3, 1, 2]}'
```

### 3. Clean Up Empty Groups
```bash
# Get groups with space counts
curl -X GET ".../space_groups?with_spaces=true"

# Delete empty groups
curl -X DELETE ".../space_groups/5"
```

---

## Error Handling

### Common Errors

**404 Not Found**
```json
{
  "code": "not_found",
  "message": "Space group not found"
}
```

**400 Bad Request**
```json
{
  "code": "invalid_data",
  "message": "Title is required"
}
```

**403 Forbidden**
```json
{
  "code": "permission_denied",
  "message": "You do not have permission to manage space groups"
}
```

---

## Related Endpoints

- [Spaces API](/rest-api/spaces) - Manage individual spaces
- [Settings API](/rest-api/settings) - Configure community settings
- [Members API](/rest-api/members) - Manage community members

