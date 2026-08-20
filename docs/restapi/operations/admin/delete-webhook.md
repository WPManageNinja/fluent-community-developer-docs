---
title: Delete Webhook
description: "Deletes an inbound webhook so its URL stops accepting calls."
outline: false
aside: false
---

Deletes an inbound webhook so its URL stops accepting calls.

## Endpoint

- **Method:** `DELETE`
- **Path:** `/admin/webhooks/{id}`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@deleteWebhook`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:52`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.
- Destructive and immediate; any external system still posting to the URL will start failing.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="deleteWebhook" specUrl="/openapi/public/admin/delete-webhook.json" />
