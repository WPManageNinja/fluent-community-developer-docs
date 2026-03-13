---
title: Incoming Webhooks
description: Public webhook entrypoints for provisioning users, spaces, and courses in FluentCommunity Pro.
---

# Incoming Webhooks <span class="pro-badge">PRO</span>

Incoming webhooks are managed through the Pro admin API, but the execution URL is **not** a REST endpoint. Each webhook is stored as a meta record and exposes a portal action URL like:

```text
https://your-site.test/portal/?fcom_action=incoming_webhook&webhook={webhook_key}
```

The URL comes from `FluentCommunityPro\App\Modules\Webhooks\WebhookModel::getWebhookUrlAttribute()`.

## Management Endpoints

- [List Webhooks](/restapi/operations/admin/list-webhooks)
- [Save Webhook](/restapi/operations/admin/save-webhook)
- [Delete Webhook](/restapi/operations/admin/delete-webhook)

Those admin routes let you configure:

- `title`
- `space_ids`
- `remove_space_ids`
- `course_ids`
- `remove_course_ids`
- `send_wp_welcome_email`

## Runtime Request Format

`WebhookModule::handleIncomingWebhook()` reads `$_POST`, so send form data rather than JSON.

| Field | Required | Notes |
| --- | --- | --- |
| `email` | Yes | Must be a valid email address. |
| `first_name` | No | Used only when creating a new user. |
| `last_name` | No | Used only when creating a new user. |
| `user_login` | No | Sanitized and used if the username is still available. |
| `user_password` | No | If omitted, FluentCommunity generates a password. |

## What Happens When the Webhook Runs

1. The webhook record is resolved from the `webhook` query arg.
2. The target user is looked up by email.
3. If the user does not exist, WordPress creates one with the site default role.
4. FluentCommunity syncs the user's profile record.
5. Configured spaces are added or removed with the `by_admin` origin.
6. If the course module is enabled, configured courses are enrolled or removed too.
7. `running_count` is incremented on the webhook record.

## Example cURL Request

```bash
curl --request POST \
  --url 'https://your-site.test/portal/?fcom_action=incoming_webhook&webhook=abc123' \
  --form 'email=user@example.com' \
  --form 'first_name=Jane' \
  --form 'last_name=Doe' \
  --form 'user_login=janedoe'
```

## Success Response

```json
{
  "status": "success",
  "message": "webhook has been successfully executied",
  "execution_timestamp": 1710000000,
  "user_id": 42
}
```

## Error Responses

- `404` when the webhook key is unknown.
- `423` when `email` is missing or invalid.
- `423` when user creation fails or the user cannot be resolved.

Treat the webhook URL as a secret. Anyone who knows the URL can trigger the provisioning flow.
