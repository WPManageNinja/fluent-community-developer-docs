---
title: Save Webhook
description: "Creates or updates an inbound webhook that adds or removes the resolved user from a set of spaces and courses when it is called."
outline: false
aside: false
---

Creates or updates an inbound webhook that adds or removes the resolved user from a set of spaces and courses when it is called.

Pass `id` to update an existing hook; the stored `running_count` is carried over rather than reset. Submitted `course_ids`, `space_ids`, `remove_course_ids` and `remove_space_ids` are filtered against real records, and course ids are discarded entirely when the `course_module` feature is off.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/webhooks`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@saveWebhook`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:54`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveWebhook" specUrl="/openapi/public/admin/save-webhook.json" />
