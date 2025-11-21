<DocStatusBanner />

# Moderation [PRO]

::: tip PRO FEATURE
The Moderation API is available in Fluent Community Pro. It provides tools for content moderation, user reports, and community safety management.
:::

The Moderation API allows moderators and administrators to manage user reports, moderate content, and configure moderation settings.

## Report Object

A report represents a user-submitted flag for inappropriate content or behavior.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | integer | Unique identifier for the report |
| `reporter_id` | integer | ID of the user who submitted the report |
| `reported_user_id` | integer | ID of the reported user |
| `object_id` | integer | ID of the reported content (feed, comment, etc.) |
| `object_type` | string | Type of reported content (feed, comment, user) |
| `reason` | string | Report reason category |
| `description` | string | Detailed description from reporter |
| `status` | string | Report status (pending, reviewed, resolved, dismissed) |
| `moderator_id` | integer | ID of moderator who handled the report |
| `moderator_note` | string | Internal note from moderator |
| `action_taken` | string | Action taken (none, warning, content_removed, user_banned) |
| `created_at` | datetime | Report submission timestamp |
| `updated_at` | datetime | Last update timestamp |

### Report Reasons

- `spam` - Spam or promotional content
- `harassment` - Harassment or bullying
- `hate_speech` - Hate speech or discrimination
- `inappropriate` - Inappropriate or offensive content
- `misinformation` - False or misleading information
- `violence` - Violence or threats
- `other` - Other reason (requires description)

### Report Status

- `pending` - Awaiting moderator review
- `reviewed` - Under review by moderator
- `resolved` - Issue resolved, action taken
- `dismissed` - Report dismissed as invalid

### Actions Taken

- `none` - No action required
- `warning` - Warning sent to user
- `content_removed` - Content deleted
- `content_edited` - Content edited/sanitized
- `user_suspended` - User temporarily suspended
- `user_banned` - User permanently banned

## Create Report

Submit a report for inappropriate content or behavior.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/moderation/report
```

**Permissions:** Authenticated users

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `object_id` | integer | Yes | ID of content being reported |
| `object_type` | string | Yes | Type of content (feed, comment, user) |
| `reason` | string | Yes | Report reason category |
| `description` | string | No | Detailed description |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/moderation/report" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "object_id": 123,
    "object_type": "feed",
    "reason": "spam",
    "description": "This post contains promotional links and spam content."
  }'
```

### Example Response

```json
{
  "id": 45,
  "reporter_id": 67,
  "reported_user_id": 89,
  "object_id": 123,
  "object_type": "feed",
  "reason": "spam",
  "description": "This post contains promotional links and spam content.",
  "status": "pending",
  "created_at": "2024-01-15 10:30:00",
  "message": "Report submitted successfully. Our moderators will review it shortly."
}
```

## Get Reports

Retrieve all moderation reports (moderators/admins only).

**HTTP Request**

```
GET /wp-json/fluent-community/v2/moderation/reports
```

**Permissions:** Moderator or Administrator

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | No | Filter by status (pending, reviewed, resolved, dismissed) |
| `reason` | string | No | Filter by reason |
| `object_type` | string | No | Filter by content type |
| `per_page` | integer | No | Number of reports per page (default: 20) |
| `page` | integer | No | Page number for pagination |

### Example Request

```bash
curl -X GET "https://example.com/wp-json/fluent-community/v2/moderation/reports?status=pending&per_page=20" \
  -u "username:password"
```

### Example Response

```json
{
  "reports": [
    {
      "id": 45,
      "reporter_id": 67,
      "reported_user_id": 89,
      "object_id": 123,
      "object_type": "feed",
      "reason": "spam",
      "description": "This post contains promotional links and spam content.",
      "status": "pending",
      "created_at": "2024-01-15 10:30:00",
      "reporter": {
        "id": 67,
        "display_name": "John Doe",
        "avatar": "https://example.com/avatar.jpg"
      },
      "reported_user": {
        "id": 89,
        "display_name": "Spammer User",
        "avatar": "https://example.com/avatar2.jpg"
      },
      "content": {
        "id": 123,
        "title": "Check out this amazing product!",
        "excerpt": "Buy now at..."
      }
    }
  ],
  "pagination": {
    "total": 12,
    "per_page": 20,
    "current_page": 1,
    "total_pages": 1
  }
}
```

## Update Report

Update a report's status and take action (moderators/admins only).

**HTTP Request**

```
PUT /wp-json/fluent-community/v2/moderation/reports/{report_id}
```

**Permissions:** Moderator or Administrator

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `status` | string | Yes | New status (reviewed, resolved, dismissed) |
| `action_taken` | string | No | Action taken |
| `moderator_note` | string | No | Internal note |

### Example Request

```bash
curl -X PUT "https://example.com/wp-json/fluent-community/v2/moderation/reports/45" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "action_taken": "content_removed",
    "moderator_note": "Spam content removed and user warned."
  }'
```

### Example Response

```json
{
  "id": 45,
  "status": "resolved",
  "action_taken": "content_removed",
  "moderator_id": 12,
  "moderator_note": "Spam content removed and user warned.",
  "updated_at": "2024-01-15 11:00:00",
  "message": "Report updated successfully."
}
```

## Delete Report

Delete a report (admins only).

**HTTP Request**

```
DELETE /wp-json/fluent-community/v2/moderation/reports/{report_id}
```

**Permissions:** Administrator only

### Example Request

```bash
curl -X DELETE "https://example.com/wp-json/fluent-community/v2/moderation/reports/45" \
  -u "username:password"
```

### Example Response

```json
{
  "message": "Report deleted successfully."
}
```

## Get Moderation Config

Retrieve moderation configuration settings.

**HTTP Request**

```
GET /wp-json/fluent-community/v2/settings/moderation-config
```

**Permissions:** Administrator only

### Example Response

```json
{
  "auto_moderation": {
    "enabled": true,
    "spam_detection": true,
    "profanity_filter": true,
    "link_moderation": false
  },
  "report_thresholds": {
    "auto_hide_threshold": 3,
    "auto_ban_threshold": 5
  },
  "moderator_notifications": {
    "email_on_report": true,
    "slack_webhook": "https://hooks.slack.com/..."
  },
  "blocked_words": ["spam", "scam"],
  "blocked_domains": ["spam-site.com"],
  "trusted_users": [12, 34, 56]
}
```

## Save Moderation Config

Update moderation configuration settings.

**HTTP Request**

```
POST /wp-json/fluent-community/v2/moderation/config
```

**Permissions:** Administrator only

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `auto_moderation` | object | No | Auto-moderation settings |
| `report_thresholds` | object | No | Report threshold settings |
| `moderator_notifications` | object | No | Notification settings |
| `blocked_words` | array | No | List of blocked words |
| `blocked_domains` | array | No | List of blocked domains |
| `trusted_users` | array | No | List of trusted user IDs |

### Example Request

```bash
curl -X POST "https://example.com/wp-json/fluent-community/v2/moderation/config" \
  -u "username:password" \
  -H "Content-Type: application/json" \
  -d '{
    "auto_moderation": {
      "enabled": true,
      "spam_detection": true,
      "profanity_filter": true
    },
    "report_thresholds": {
      "auto_hide_threshold": 3,
      "auto_ban_threshold": 5
    }
  }'
```

### Example Response

```json
{
  "message": "Moderation configuration saved successfully.",
  "config": {
    "auto_moderation": {
      "enabled": true,
      "spam_detection": true,
      "profanity_filter": true
    },
    "report_thresholds": {
      "auto_hide_threshold": 3,
      "auto_ban_threshold": 5
    }
  }
}
```

---

## Best Practices

### 1. Respond to Reports Promptly
Review and respond to reports within 24 hours:

```javascript
// Check for pending reports daily
async function checkPendingReports() {
  const response = await fetch('/wp-json/fluent-community/v2/moderation/reports?status=pending');
  const data = await response.json();
  
  if (data.reports.length > 0) {
    console.log(`${data.reports.length} reports pending review`);
  }
}
```

### 2. Document Moderator Actions
Always add notes when taking action:

```javascript
await fetch(`/wp-json/fluent-community/v2/moderation/reports/${reportId}`, {
  method: 'PUT',
  body: JSON.stringify({
    status: 'resolved',
    action_taken: 'content_removed',
    moderator_note: 'Spam content removed. User warned via email.'
  })
});
```

### 3. Use Auto-Moderation Wisely
Enable auto-moderation for obvious spam:

```javascript
const config = {
  auto_moderation: {
    enabled: true,
    spam_detection: true,
    profanity_filter: true
  },
  report_thresholds: {
    auto_hide_threshold: 3 // Hide content after 3 reports
  }
};
```

### 4. Maintain Transparency
Keep users informed about moderation actions:

```javascript
// Send notification to reported user
if (actionTaken === 'content_removed') {
  await sendNotification(reportedUserId, {
    type: 'moderation_action',
    message: 'Your content was removed for violating community guidelines.'
  });
}
```

### 5. Track Moderation Metrics
Monitor moderation effectiveness:

```javascript
async function getModerationMetrics(dateFrom, dateTo) {
  const response = await fetch(
    `/wp-json/fluent-community/v2/moderation/reports?date_from=${dateFrom}&date_to=${dateTo}`
  );
  const data = await response.json();
  
  return {
    totalReports: data.pagination.total,
    resolved: data.reports.filter(r => r.status === 'resolved').length,
    dismissed: data.reports.filter(r => r.status === 'dismissed').length,
    averageResponseTime: calculateAverageResponseTime(data.reports)
  };
}
```

---

## Common Use Cases

### 1. Moderation Dashboard

Create a moderator dashboard:

```javascript
async function getModerationDashboard() {
  const [pending, recent, config] = await Promise.all([
    fetch('/wp-json/fluent-community/v2/moderation/reports?status=pending'),
    fetch('/wp-json/fluent-community/v2/moderation/reports?per_page=10'),
    fetch('/wp-json/fluent-community/v2/settings/moderation-config')
  ]);
  
  return {
    pendingReports: await pending.json(),
    recentReports: await recent.json(),
    config: await config.json()
  };
}
```

### 2. Report Content

Allow users to report inappropriate content:

```javascript
async function reportContent(objectId, objectType, reason, description) {
  const response = await fetch('/wp-json/fluent-community/v2/moderation/report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
    },
    body: JSON.stringify({
      object_id: objectId,
      object_type: objectType,
      reason: reason,
      description: description
    })
  });
  
  if (response.ok) {
    alert('Report submitted. Thank you for helping keep our community safe.');
  }
}
```

### 3. Bulk Moderation

Process multiple reports at once:

```javascript
async function bulkModerateReports(reportIds, action) {
  const promises = reportIds.map(id =>
    fetch(`/wp-json/fluent-community/v2/moderation/reports/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('API_USERNAME:API_PASSWORD')
      },
      body: JSON.stringify({
        status: 'resolved',
        action_taken: action
      })
    })
  );
  
  await Promise.all(promises);
  console.log(`${reportIds.length} reports processed`);
}
```

---

## Error Handling

### Common Errors

**403 Forbidden**
```json
{
  "code": "rest_forbidden",
  "message": "Sorry, you don't have permission to access moderation features.",
  "data": {
    "status": 403
  }
}
```

**404 Not Found**
```json
{
  "code": "not_found",
  "message": "Report not found.",
  "data": {
    "status": 404
  }
}
```

**400 Bad Request**
```json
{
  "code": "invalid_reason",
  "message": "Invalid report reason. Must be one of: spam, harassment, hate_speech, inappropriate, misinformation, violence, other.",
  "data": {
    "status": 400
  }
}
```

---

## Related Endpoints

- [Feeds](/rest-api/feeds) - Manage feed posts
- [Comments](/rest-api/comments) - Manage comments
- [Members](/rest-api/members) - Manage members
- [Settings](/rest-api/settings) - Community settings
