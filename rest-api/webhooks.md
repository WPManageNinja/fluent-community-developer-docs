# Webhooks [PRO]

::: tip PRO FEATURE
The Webhooks API is available in Fluent Community Pro. It allows you to receive real-time notifications about community events via HTTP callbacks.
:::

The Webhooks API allows you to configure HTTP endpoints that receive notifications when specific events occur in your community, enabling integrations with third-party services.

## Webhook Object

A webhook represents a configured HTTP endpoint that receives event notifications.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the webhook |
| `name` | string | Webhook name/description |
| `url` | string | Target URL for webhook notifications |
| `events` | array | List of subscribed event types |
| `status` | string | Webhook status (active, inactive) |
| `secret` | string | Secret key for signature verification |
| `headers` | object | Custom HTTP headers to send |
| `retry_count` | integer | Number of retry attempts on failure |
| `last_triggered_at` | datetime | Last successful trigger timestamp |
| `last_error` | string | Last error message (if any) |
| `created_at` | datetime | Creation timestamp |
| `updated_at` | datetime | Last update timestamp |

### Webhook Events

**Feed Events:**
- `feed.created` - New feed post created
- `feed.updated` - Feed post updated
- `feed.deleted` - Feed post deleted
- `feed.pinned` - Feed post pinned
- `feed.unpinned` - Feed post unpinned

**Comment Events:**
- `comment.created` - New comment added
- `comment.updated` - Comment updated
- `comment.deleted` - Comment deleted

**Reaction Events:**
- `reaction.added` - Reaction added to content
- `reaction.removed` - Reaction removed from content

**Space Events:**
- `space.created` - New space created
- `space.updated` - Space updated
- `space.deleted` - Space deleted
- `space.member_joined` - User joined space
- `space.member_left` - User left space

**User Events:**
- `user.registered` - New user registered
- `user.profile_updated` - User profile updated
- `user.followed` - User followed another user (PRO)
- `user.unfollowed` - User unfollowed another user (PRO)

**Course Events:**
- `course.enrolled` - User enrolled in course
- `course.unenrolled` - User unenrolled from course
- `lesson.completed` - User completed lesson

**Moderation Events:**
- `report.created` - New moderation report submitted
- `report.resolved` - Moderation report resolved

### Status Values

- `active` - Webhook is enabled and receiving events
- `inactive` - Webhook is disabled

## Get All Webhooks

Retrieve all configured webhooks.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/admin/webhooks
```

**Permissions:** Administrator only

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/admin/webhooks" \
  -u "username:password"
```

### Example Response

```json
{
  "webhooks": [
    {
      "id": 1,
      "name": "Slack Notifications",
      "url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
      "events": ["feed.created", "comment.created"],
      "status": "active",
      "secret": "whsec_abc123...",
      "headers": {
        "Content-Type": "application/json"
      },
      "retry_count": 3,
      "last_triggered_at": "2024-01-15 10:30:00",
      "last_error": null,
      "created_at": "2024-01-01 09:00:00",
      "updated_at": "2024-01-15 10:30:00"
    }
  ]
}
```

## Create Webhook

Create a new webhook.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/webhooks
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | Yes | Webhook name/description |
| `url` | string | Yes | Target URL (must be HTTPS) |
| `events` | array | Yes | List of event types to subscribe to |
| `status` | string | No | Webhook status (default: active) |
| `secret` | string | No | Secret key for signature verification |
| `headers` | object | No | Custom HTTP headers |
| `retry_count` | integer | No | Retry attempts on failure (default: 3) |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/admin/webhooks" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Slack Notifications",
    "url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
    "events": ["feed.created", "comment.created", "space.member_joined"],
    "status": "active",
    "retry_count": 3
  }'
```

### Example Response

```json
{
  "id": 2,
  "name": "Slack Notifications",
  "url": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
  "events": ["feed.created", "comment.created", "space.member_joined"],
  "status": "active",
  "secret": "whsec_xyz789...",
  "retry_count": 3,
  "created_at": "2024-01-15 11:00:00",
  "message": "Webhook created successfully."
}
```

## Update Webhook

Update an existing webhook.

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/admin/webhooks/{webhook_id}
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | No | Webhook name/description |
| `url` | string | No | Target URL |
| `events` | array | No | List of event types |
| `status` | string | No | Webhook status |
| `headers` | object | No | Custom HTTP headers |
| `retry_count` | integer | No | Retry attempts on failure |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v2/admin/webhooks/2" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "events": ["feed.created", "comment.created", "space.created"],
    "status": "active"
  }'
```

### Example Response

```json
{
  "id": 2,
  "name": "Slack Notifications",
  "events": ["feed.created", "comment.created", "space.created"],
  "status": "active",
  "updated_at": "2024-01-15 11:30:00",
  "message": "Webhook updated successfully."
}
```

## Delete Webhook

Delete a webhook.

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/admin/webhooks/{webhook_id}
```

**Permissions:** Administrator only

### Example Request

```bash
curl -X DELETE "https://example.com/wp-json/fluent-community/v2/admin/webhooks/2" \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Webhook deleted successfully."
}
```

## Test Webhook

Send a test payload to verify webhook configuration.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/admin/webhooks/{webhook_id}/test
```

**Permissions:** Administrator only

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/admin/webhooks/1/test" \
  -u "username:password"
```

### Example Response

```json
{
  "success": true,
  "status_code": 200,
  "response_time": 245,
  "message": "Webhook test successful."
}
```

---

## Webhook Payload Structure

All webhook events send a JSON payload with the following structure:

```json
{
  "event": "feed.created",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "id": 123,
    "user_id": 45,
    "title": "Welcome to our community!",
    "message": "We're excited to have you here...",
    "space_id": 12,
    "created_at": "2024-01-15 10:30:00"
  },
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
}
```

### Signature Verification

Webhooks include an `X-Fluent-Signature` header for verification:

```
X-Fluent-Signature: sha256=abc123...
```

Verify the signature using your webhook secret:

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}
```

---

## Best Practices

### 1. Use HTTPS URLs
Always use secure HTTPS endpoints:

```javascript
// Good
{ url: "https://api.example.com/webhooks" }

// Bad
{ url: "http://api.example.com/webhooks" }
```

### 2. Verify Signatures
Always verify webhook signatures:

```javascript
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-fluent-signature'];
  const isValid = verifyWebhookSignature(
    JSON.stringify(req.body),
    signature,
    process.env.WEBHOOK_SECRET
  );
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook...
});
```

### 3. Handle Retries Gracefully
Respond quickly and process asynchronously:

```javascript
app.post('/webhook', async (req, res) => {
  // Respond immediately
  res.status(200).send('OK');
  
  // Process asynchronously
  processWebhookAsync(req.body);
});
```

### 4. Subscribe to Specific Events
Only subscribe to events you need:

```javascript
// Good: Specific events
{ events: ["feed.created", "comment.created"] }

// Bad: All events
{ events: ["*"] }
```

### 5. Monitor Webhook Health
Track webhook failures and response times:

```javascript
async function checkWebhookHealth() {
  const response = await fetch('/wp-json/fluent-community/v2/admin/webhooks');
  const data = await response.json();
  
  data.webhooks.forEach(webhook => {
    if (webhook.last_error) {
      console.warn(`Webhook ${webhook.name} has errors: ${webhook.last_error}`);
    }
  });
}
```

---

## Common Use Cases

### 1. Slack Integration

Send notifications to Slack:

```javascript
async function createSlackWebhook() {
  const response = await fetch('/wp-json/fluent-community/v2/admin/webhooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({
      name: 'Slack Notifications',
      url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
      events: ['feed.created', 'comment.created', 'space.member_joined'],
      status: 'active'
    })
  });
  
  return await response.json();
}
```

### 2. Discord Integration

Send notifications to Discord:

```javascript
async function createDiscordWebhook() {
  const response = await fetch('/wp-json/fluent-community/v2/admin/webhooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({
      name: 'Discord Notifications',
      url: 'https://discord.com/api/webhooks/YOUR/WEBHOOK/URL',
      events: ['feed.created', 'report.created'],
      status: 'active'
    })
  });
  
  return await response.json();
}
```

### 3. Custom Analytics

Track events in your analytics platform:

```javascript
async function createAnalyticsWebhook() {
  const response = await fetch('/wp-json/fluent-community/v2/admin/webhooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({
      name: 'Analytics Tracker',
      url: 'https://analytics.example.com/events',
      events: ['feed.created', 'comment.created', 'user.registered', 'course.enrolled'],
      headers: {
        'X-API-Key': 'your-api-key'
      },
      status: 'active'
    })
  });
  
  return await response.json();
}
```

### 4. Email Notifications

Trigger email notifications via webhook:

```javascript
async function createEmailWebhook() {
  const response = await fetch('/wp-json/fluent-community/v2/admin/webhooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({
      name: 'Email Notifications',
      url: 'https://api.sendgrid.com/v3/mail/send',
      events: ['report.created', 'space.member_joined'],
      headers: {
        'Authorization': 'Bearer YOUR_SENDGRID_API_KEY'
      },
      status: 'active'
    })
  });
  
  return await response.json();
}
```

---

## Error Handling

### Common Errors

**403 Forbidden**
```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you don't have permission to manage webhooks.",
  "data": {
    "status": 403
  }
}
```

**400 Bad Request**
```json
{
  "code": "invalid_url",
  "message": "Webhook URL must use HTTPS protocol.",
  "data": {
    "status": 400
  }
}
```

**404 Not Found**
```json
{
  "code": "not_found",
  "message": "Webhook not found.",
  "data": {
    "status": 404
  }
}
```

---

## Related Endpoints

- [Settings](/rest-api/settings) - Community settings
- [Notifications](/rest-api/notifications) - User notifications
- [Activities](/rest-api/activities) - Activity tracking

