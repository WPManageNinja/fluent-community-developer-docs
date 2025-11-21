<DocStatusBanner />

# Settings

The Settings API allows administrators to manage community configuration and preferences.

## Settings Object

Settings represent various configuration options for the community.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `key` | string | Setting key identifier |
| `value` | mixed | Setting value (string, boolean, object, array) |
| `type` | string | Value type (string, boolean, number, object, array) |
| `label` | string | Human-readable label |
| `description` | string | Setting description |
| `group` | string | Settings group |

### Setting Groups

- `general` - General community settings
- `registration` - User registration settings
- `content` - Content moderation settings
- `notifications` - Notification settings
- `email` - Email settings
- `appearance` - UI/UX settings
- `integrations` - Third-party integrations

## Get All Settings

Retrieve all community settings (admin only).

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings
```

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `group` | string | - | Filter by settings group |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/settings" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "general": {
      "site_name": "My Community",
      "site_description": "A place for awesome people",
      "timezone": "America/New_York",
      "date_format": "Y-m-d",
      "time_format": "H:i"
    },
    "registration": {
      "allow_registration": true,
      "require_email_verification": true,
      "default_role": "member",
      "approval_required": false
    },
    "content": {
      "allow_comments": true,
      "allow_reactions": true,
      "moderate_posts": false,
      "moderate_comments": false,
      "spam_protection": true
    },
    "notifications": {
      "enable_email_notifications": true,
      "enable_push_notifications": false,
      "digest_frequency": "daily"
    }
  }
}
```

## Get Specific Setting

Retrieve a specific setting value.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/{key}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Setting key |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/settings/site_name" \
  -u "username:password"
```

### Example Response

```json
{
  "data": {
    "key": "site_name",
    "value": "My Community",
    "type": "string"
  }
}
```

## Update Settings

Update one or more settings (admin only).

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/settings
```

### Parameters

Send an object with setting keys and values to update.

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/settings" \
  -X PUT \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "site_name": "Updated Community Name",
    "allow_registration": true,
    "require_email_verification": true
  }'
```

### Example Response

```json
{
  "message": "Settings updated successfully",
  "data": {
    "updated_count": 3,
    "updated_keys": ["site_name", "allow_registration", "require_email_verification"]
  }
}
```

## Get Public Settings

Retrieve public settings (no authentication required).

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/public
```

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/settings/public"
```

### Example Response

```json
{
  "data": {
    "site_name": "My Community",
    "site_description": "A place for awesome people",
    "allow_registration": true,
    "logo_url": "https://example.com/logo.png",
    "primary_color": "#3B82F6",
    "features": {
      "spaces": true,
      "courses": true,
      "reactions": true,
      "bookmarks": true
    }
  }
}
```

## Reset Settings

Reset settings to default values (admin only).

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/reset
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `keys` | array | No | Specific keys to reset (all if omitted) |

### Example Request

```bash
curl "https://your-site.com/wp-json/fluent-community/v2/settings/reset" \
  -X POST \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "keys": ["site_name", "timezone"]
  }'
```

### Example Response

```json
{
  "message": "Settings reset successfully",
  "data": {
    "reset_count": 2
  }
}
```

## Best Practices

### 1. Settings Caching

Cache settings to reduce API calls:

```javascript
// Cache settings for 1 hour
const CACHE_KEY = 'community_settings';
const CACHE_DURATION = 3600000; // 1 hour

async function getSettings() {
  const cached = localStorage.getItem(CACHE_KEY);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  
  const response = await fetch('/wp-json/fluent-community/v2/settings/public');
  const settings = await response.json();
  
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: settings.data,
    timestamp: Date.now()
  }));
  
  return settings.data;
}
```

### 2. Batch Updates

Update multiple settings at once:

```bash
# Update multiple settings in one request
curl -X PUT ".../settings" -d '{
  "site_name": "New Name",
  "timezone": "UTC",
  "allow_registration": true,
  "require_email_verification": true
}'
```

### 3. Validation

Validate settings before updating:

```javascript
function validateSettings(settings) {
  // Validate email format
  if (settings.admin_email && !isValidEmail(settings.admin_email)) {
    throw new Error('Invalid email format');
  }
  
  // Validate timezone
  if (settings.timezone && !isValidTimezone(settings.timezone)) {
    throw new Error('Invalid timezone');
  }
  
  return true;
}
```

### 4. Public vs Private

Only expose necessary settings publicly:

```bash
# Public settings - no auth required
curl ".../settings/public"

# All settings - admin only
curl ".../settings" \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Common Use Cases

### Site Configuration

Configure basic site settings:

```bash
curl -X PUT ".../settings" -d '{
  "site_name": "Tech Community",
  "site_description": "A community for tech enthusiasts",
  "timezone": "America/New_York",
  "logo_url": "https://example.com/logo.png"
}'
```

### Registration Settings

Manage user registration:

```bash
curl -X PUT ".../settings" -d '{
  "allow_registration": true,
  "require_email_verification": true,
  "approval_required": false,
  "default_role": "member"
}'
```

### Content Moderation

Configure content moderation:

```bash
curl -X PUT ".../settings" -d '{
  "moderate_posts": true,
  "moderate_comments": true,
  "spam_protection": true,
  "auto_approve_trusted_users": true
}'
```

### Email Configuration

Set up email notifications:

```bash
curl -X PUT ".../settings" -d '{
  "enable_email_notifications": true,
  "admin_email": "[email protected]",
  "from_name": "Tech Community",
  "from_email": "[email protected]",
  "digest_frequency": "daily"
}'
```

### Feature Toggles

Enable/disable features:

```bash
curl -X PUT ".../settings" -d '{
  "features": {
    "spaces": true,
    "courses": true,
    "reactions": true,
    "bookmarks": true,
    "followers": true
  }
}'
```

### Theme Customization

Customize appearance:

```bash
curl -X PUT ".../settings" -d '{
  "primary_color": "#3B82F6",
  "secondary_color": "#10B981",
  "logo_url": "https://example.com/logo.png",
  "favicon_url": "https://example.com/favicon.ico",
  "custom_css": ".header { background: #000; }"
}'
```

## Error Handling

### Unauthorized (403)

```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you are not allowed to manage settings.",
  "data": {
    "status": 403
  }
}
```

### Invalid Setting Key (400)

```json
{
  "code": "invalid_setting_key",
  "message": "Invalid setting key",
  "data": {
    "status": 400,
    "key": "invalid_key"
  }
}
```

### Invalid Value (400)

```json
{
  "code": "invalid_value",
  "message": "Invalid value for setting",
  "data": {
    "status": 400,
    "key": "timezone",
    "error": "Invalid timezone format"
  }
}
```

### Setting Not Found (404)

```json
{
  "code": "setting_not_found",
  "message": "Setting not found",
  "data": {
    "status": 404,
    "key": "unknown_setting"
  }
}
```

---

## Admin Settings

### Get General Settings

Retrieve general community settings (admin only).

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/general
```

**Permissions:** Administrator only

### Save General Settings

Update general community settings.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/general
```

**Permissions:** Administrator only

### Get Email Settings

Retrieve email configuration settings.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/email-settings
```

**Permissions:** Administrator only

### Save Email Settings

Update email configuration settings.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/email-settings
```

**Permissions:** Administrator only

### Get Storage Settings

Retrieve media storage configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/storage-settings
```

**Permissions:** Administrator only

### Update Storage Settings

Update media storage configuration (local, S3, etc.).

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/storage-settings
```

**Permissions:** Administrator only

### Get Welcome Banner Settings

Retrieve welcome banner configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/welcome-banner
```

**Permissions:** Administrator only

### Update Welcome Banner

Update welcome banner settings.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/welcome-banner
```

**Permissions:** Administrator only

### Get Auth Settings

Retrieve authentication settings.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/auth-settings
```

**Permissions:** Administrator only

### Get Onboarding Settings

Retrieve onboarding configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/on-boardings
```

**Permissions:** Administrator only

### Save Onboarding Settings

Update onboarding configuration.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/on-boardings
```

**Permissions:** Administrator only

### Change Portal Slug

Update the community portal URL slug.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/on-boardings/change-slug
```

**Permissions:** Administrator only

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `slug` | string | Yes | New portal slug |

### Get Profile Link Providers

Retrieve social profile link providers configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/profile-link-providers
```

**Permissions:** Administrator only

### Update Profile Link Providers

Update social profile link providers.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/profile-link-providers
```

**Permissions:** Administrator only

---

## Feature Settings

### Get Enabled Features

Retrieve list of enabled features.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/features
```

**Permissions:** Administrator only

**Example Response:**

```json
{
  "features": {
    "spaces": true,
    "courses": true,
    "reactions": true,
    "bookmarks": true,
    "followers": true,
    "topics": true,
    "analytics": true,
    "moderation": true
  }
}
```

### Set Features

Enable or disable community features.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/features
```

**Permissions:** Administrator only

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `features` | object | Yes | Object with feature keys and boolean values |

**Example Request:**

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/settings/features" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "features": {
      "spaces": true,
      "courses": true,
      "reactions": true,
      "bookmarks": true,
      "followers": false
    }
  }'
```

---

## Menu Settings

### Get Menu Settings

Retrieve navigation menu configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/menu-settings
```

**Permissions:** Administrator only

### Save Menu Settings

Update navigation menu configuration.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/menu-settings
```

**Permissions:** Administrator only

---

## Customization Settings

### Get Customization Settings

Retrieve UI customization settings.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/customization-settings
```

**Permissions:** Administrator only

### Update Customization Settings

Update UI customization settings.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/customization-settings
```

**Permissions:** Administrator only

### Get Color Config

Retrieve color scheme configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/color-config
```

**Permissions:** Administrator only

### Save Color Config [PRO]

Update color scheme configuration.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/color-config
```

**Permissions:** Administrator only (PRO feature)

---

## Privacy Settings

### Get Privacy Settings

Retrieve privacy configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/privacy-settings
```

**Permissions:** Administrator only

### Update Privacy Settings

Update privacy configuration.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/privacy-settings
```

**Permissions:** Administrator only

---

## Pro Settings

::: tip PRO FEATURES
The following settings are available in Fluent Community Pro.
:::

### Get CRM Tagging Config [PRO]

Retrieve CRM tagging configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/crm-tagging-config
```

**Permissions:** Administrator only

### Save CRM Tagging Config [PRO]

Update CRM tagging configuration.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/crm-tagging-config
```

**Permissions:** Administrator only

### Get Code Snippets Settings [PRO]

Retrieve custom code snippets configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/snippets-settings
```

**Permissions:** Administrator only

### Update Code Snippets [PRO]

Update custom code snippets.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/snippets-settings
```

**Permissions:** Administrator only

### Get Messaging Settings [PRO]

Retrieve messaging/chat configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/messaging-setting
```

**Permissions:** Administrator only

### Update Messaging Settings [PRO]

Update messaging/chat configuration.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/messaging-setting
```

**Permissions:** Administrator only

### Get Followers Settings [PRO]

Retrieve followers feature configuration.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/followers/config
```

**Permissions:** Administrator only

### Save Followers Settings [PRO]

Update followers feature configuration.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/settings/followers/config
```

**Permissions:** Administrator only

---

## Sidebar Links Management [PRO]

::: tip PRO FEATURE
This feature is only available in Fluent Community Pro.
:::

Manage custom sidebar links that appear in the community navigation.

### Save Sidebar Link [PRO]

Create or update a custom sidebar link.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/links
```

**Request Body**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | No | Link ID (for updates) |
| `title` | string | Yes | Link display text |
| `url` | string | Yes | Link URL |
| `icon` | string | No | Icon class or emoji |
| `target` | string | No | `_self` or `_blank` |
| `serial` | integer | No | Display order |
| `visibility` | string | No | `all`, `members`, `guests` |

**Example Request**

```bash
curl -X POST "https://your-site.com/wp-json/fluent-community/v2/admin/links" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Help Center",
    "url": "https://example.com/help",
    "icon": "❓",
    "target": "_blank",
    "visibility": "all",
    "serial": 1
  }'
```

**Example Response**

```json
{
  "message": "Sidebar link saved successfully",
  "link": {
    "id": 5,
    "title": "Help Center",
    "url": "https://example.com/help",
    "icon": "❓",
    "target": "_blank",
    "visibility": "all",
    "serial": 1,
    "created_at": "2024-01-25 10:00:00",
    "updated_at": "2024-01-25 10:00:00"
  }
}
```

**Permissions:** Administrator only

### Delete Sidebar Link [PRO]

Remove a custom sidebar link.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/admin/links/{id}
```

**URL Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | integer | The ID of the link to delete |

**Example Request**

```bash
curl -X DELETE "https://your-site.com/wp-json/fluent-community/v2/admin/links/5" \
  -u "username:password"
```

**Example Response**

```json
{
  "message": "Sidebar link deleted successfully"
}
```

**Permissions:** Administrator only

---

## License Management [PRO]

::: tip PRO FEATURE
This feature is only available in Fluent Community Pro.
:::

Manage your Fluent Community Pro license.

### Get License Status [PRO]

Retrieve current license information.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/license
```

**Example Request**

```bash
curl -X GET "https://your-site.com/wp-json/fluent-community/v2/admin/license" \
  -u "username:password"
```

**Example Response**

```json
{
  "license": {
    "key": "XXXX-XXXX-XXXX-XXXX",
    "status": "active",
    "expires_at": "2025-01-25",
    "plan": "Professional",
    "sites_allowed": 5,
    "sites_used": 1,
    "features": [
      "analytics",
      "moderation",
      "topics",
      "webhooks",
      "scheduled_posts",
      "followers",
      "quiz",
      "leaderboard",
      "giphy"
    ]
  },
  "site": {
    "url": "https://example.com",
    "activated_at": "2024-01-25 10:00:00"
  }
}
```

**Permissions:** Administrator only

### Activate License [PRO]

Activate your Pro license on this site.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/license
```

**Request Body**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `license_key` | string | Yes | Your license key |

**Example Request**

```bash
curl -X POST "https://your-site.com/wp-json/fluent-community/v2/admin/license" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "license_key": "XXXX-XXXX-XXXX-XXXX"
  }'
```

**Example Response**

```json
{
  "message": "License activated successfully",
  "license": {
    "key": "XXXX-XXXX-XXXX-XXXX",
    "status": "active",
    "expires_at": "2025-01-25",
    "plan": "Professional",
    "features": [
      "analytics",
      "moderation",
      "topics",
      "webhooks",
      "scheduled_posts",
      "followers",
      "quiz",
      "leaderboard",
      "giphy"
    ]
  }
}
```

**Permissions:** Administrator only

### Deactivate License [PRO]

Deactivate the license from this site.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/admin/license
```

**Example Request**

```bash
curl -X DELETE "https://your-site.com/wp-json/fluent-community/v2/admin/license" \
  -u "username:password"
```

**Example Response**

```json
{
  "message": "License deactivated successfully"
}
```

**Permissions:** Administrator only

---

## Related Endpoints

- [Profiles](./profiles.md) - User notification preferences
- [Spaces](./spaces.md) - Space-specific settings
- [Courses](./courses.md) - Course settings
- [Managers](/rest-api/managers) - Community managers
- [Topics](/rest-api/topics) - Topic management
- [Webhooks](/rest-api/webhooks) - Webhook configuration
