# Migrations API

The Migrations API allows administrators to migrate data from other community platforms into Fluent Community.

::: warning ADMIN ONLY
All migration endpoints require administrator privileges.
:::

---

## Migration Object

```json
{
  "id": "buddypress",
  "name": "BuddyPress",
  "description": "Migrate from BuddyPress to Fluent Community",
  "status": "available",
  "supported_items": [
    "groups",
    "members",
    "activities",
    "messages"
  ],
  "estimated_items": {
    "groups": 25,
    "members": 150,
    "activities": 1200
  }
}
```

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `id` | string | Migration source identifier |
| `name` | string | Human-readable name of the source platform |
| `description` | string | Description of the migration |
| `status` | string | Migration availability: `available`, `in_progress`, `completed` |
| `supported_items` | array | List of items that can be migrated |
| `estimated_items` | object | Count of items available for migration |

---

## Get Available Migrations

Retrieve list of available migration sources.

### HTTP Request

```
GET /wp-json/fluent-community/v2/migrations
```

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/migrations" \
  -u "username:password"
```

### Example Response

```json
{
  "migrations": [
    {
      "id": "buddypress",
      "name": "BuddyPress",
      "description": "Migrate from BuddyPress to Fluent Community",
      "status": "available",
      "is_installed": true,
      "supported_items": [
        "groups",
        "members",
        "activities"
      ],
      "estimated_items": {
        "groups": 25,
        "members": 150,
        "activities": 1200
      }
    }
  ]
}
```

---

## BuddyPress Migration

### Get BuddyPress Migration Config

Retrieve configuration options for BuddyPress migration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/migrations/buddypress/config
```

**Example Request**

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/migrations/buddypress/config" \
  -u "username:password"
```

**Example Response**

```json
{
  "config": {
    "available_items": {
      "groups": {
        "label": "Groups",
        "count": 25,
        "description": "Migrate BuddyPress groups to Fluent Community spaces"
      },
      "members": {
        "label": "Members",
        "count": 150,
        "description": "Migrate member profiles and metadata"
      },
      "activities": {
        "label": "Activities",
        "count": 1200,
        "description": "Migrate activity stream posts and comments"
      }
    },
    "options": {
      "migrate_avatars": true,
      "migrate_cover_images": true,
      "preserve_dates": true,
      "skip_existing": true
    },
    "warnings": [
      "This migration cannot be undone",
      "Large migrations may take several minutes",
      "Backup your database before proceeding"
    ]
  }
}
```

**Permissions:** Administrator only

---

### Start BuddyPress Migration

Initiate the migration process from BuddyPress.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/migrations/buddypress/start
```

**Request Body**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `items` | array | Yes | Items to migrate: `groups`, `members`, `activities` |
| `options` | object | No | Migration options |
| `options.migrate_avatars` | boolean | No | Migrate user avatars (default: true) |
| `options.migrate_cover_images` | boolean | No | Migrate cover images (default: true) |
| `options.preserve_dates` | boolean | No | Keep original dates (default: true) |
| `options.skip_existing` | boolean | No | Skip already migrated items (default: true) |

**Example Request**

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/migrations/buddypress/start" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "items": ["groups", "members", "activities"],
    "options": {
      "migrate_avatars": true,
      "migrate_cover_images": true,
      "preserve_dates": true,
      "skip_existing": true
    }
  }'
```

**Example Response**

```json
{
  "message": "Migration started successfully",
  "migration": {
    "id": "bp_migration_1234567890",
    "status": "in_progress",
    "started_at": "2024-01-25 10:00:00",
    "items_to_migrate": {
      "groups": 25,
      "members": 150,
      "activities": 1200
    },
    "progress": {
      "groups": 0,
      "members": 0,
      "activities": 0
    }
  }
}
```

**Permissions:** Administrator only

---

### Get BuddyPress Migration Status

Poll the migration status to track progress.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/migrations/buddypress/status
```

**Example Request**

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/migrations/buddypress/status" \
  -u "username:password"
```

**Example Response (In Progress)**

```json
{
  "status": "in_progress",
  "migration": {
    "id": "bp_migration_1234567890",
    "started_at": "2024-01-25 10:00:00",
    "progress": {
      "groups": {
        "total": 25,
        "completed": 15,
        "percentage": 60
      },
      "members": {
        "total": 150,
        "completed": 150,
        "percentage": 100
      },
      "activities": {
        "total": 1200,
        "completed": 450,
        "percentage": 37.5
      }
    },
    "current_step": "Migrating activities...",
    "estimated_time_remaining": "5 minutes"
  }
}
```

**Example Response (Completed)**

```json
{
  "status": "completed",
  "migration": {
    "id": "bp_migration_1234567890",
    "started_at": "2024-01-25 10:00:00",
    "completed_at": "2024-01-25 10:15:00",
    "duration": "15 minutes",
    "results": {
      "groups": {
        "total": 25,
        "migrated": 25,
        "skipped": 0,
        "failed": 0
      },
      "members": {
        "total": 150,
        "migrated": 150,
        "skipped": 0,
        "failed": 0
      },
      "activities": {
        "total": 1200,
        "migrated": 1195,
        "skipped": 3,
        "failed": 2
      }
    },
    "errors": [
      {
        "item": "activity",
        "id": 567,
        "error": "Invalid content format"
      }
    ]
  }
}
```

**Permissions:** Administrator only

---

## Best Practices

### Pre-Migration Checklist
1. **Backup Database** - Always backup before migration
2. **Test Environment** - Test migration on staging first
3. **Check Disk Space** - Ensure sufficient storage for media
4. **Review Mappings** - Understand how items will be mapped
5. **Plan Downtime** - Large migrations may require maintenance mode

### During Migration
- **Monitor Progress** - Poll status endpoint regularly
- **Don't Interrupt** - Let migration complete fully
- **Check Logs** - Review error logs for issues
- **Server Resources** - Ensure adequate PHP memory and execution time

### Post-Migration
- **Verify Data** - Check migrated content thoroughly
- **Update Permalinks** - Flush rewrite rules if needed
- **Test Features** - Verify all functionality works
- **User Communication** - Inform users of any changes

---

## Common Use Cases

### 1. Check Available Migrations
```bash
# Get list of available migration sources
curl -X GET ".../migrations"
```

### 2. Migrate BuddyPress Groups Only
```bash
# Migrate only groups
curl -X POST ".../migrations/buddypress/start" \
  -d '{
    "items": ["groups"],
    "options": {
      "migrate_avatars": true,
      "preserve_dates": true
    }
  }'
```

### 3. Poll Migration Progress
```bash
# Check status every 10 seconds
while true; do
  curl -X GET ".../migrations/buddypress/status"
  sleep 10
done
```

---

## Error Handling

### Common Errors

**400 Bad Request**
```json
{
  "code": "invalid_items",
  "message": "Invalid migration items specified"
}
```

**409 Conflict**
```json
{
  "code": "migration_in_progress",
  "message": "Another migration is already in progress"
}
```

**500 Internal Server Error**
```json
{
  "code": "migration_failed",
  "message": "Migration failed: Database connection error",
  "details": {
    "step": "groups",
    "completed": 15,
    "total": 25
  }
}
```

---

## Related Endpoints

- [Spaces API](/rest-api/spaces) - Manage migrated spaces
- [Members API](/rest-api/members) - Manage migrated members
- [Feeds API](/rest-api/feeds) - Manage migrated activities
- [Settings API](/rest-api/settings) - Configure community settings

---

## Additional Notes

### BuddyPress Mapping

| BuddyPress | Fluent Community |
|------------|------------------|
| Groups | Spaces |
| Group Members | Space Members |
| Activities | Feeds (Posts) |
| Activity Comments | Comments |
| Member Profiles | User Profiles |
| Group Forums | Space Discussions |

### Limitations

- **Private Messages** - Not currently supported
- **Custom Post Types** - May require manual migration
- **Third-party Extensions** - Not automatically migrated
- **Custom Fields** - Mapped to meta fields where possible

### Performance Tips

- Migrate in batches for large datasets
- Increase PHP memory limit for large migrations
- Use WP-CLI for very large migrations
- Schedule migrations during low-traffic periods

