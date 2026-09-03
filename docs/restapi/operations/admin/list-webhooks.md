---
title: List Webhooks
description: "Returns the paginated list of inbound webhooks, and on the first page also the spaces and courses available as enrolment targets."
outline: false
aside: false
---

Returns the paginated list of inbound webhooks, and on the first page also the spaces and courses available as enrolment targets.

The `courses` key is only present when the `course_module` feature is enabled. Pass `search` to filter by webhook title.

## Endpoint

- **Method:** `GET`
- **Path:** `/admin/webhooks`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@getWebhooks`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:53`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires the FluentCommunity community-admin permission (or a WordPress super admin).
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="listWebhooks" specUrl="/openapi/public/admin/list-webhooks.json" />
