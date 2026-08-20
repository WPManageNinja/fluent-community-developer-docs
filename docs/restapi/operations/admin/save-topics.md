---
title: Save Topics
description: "Creates a topic or updates an existing one, and reconciles which spaces the topic is available in."
outline: false
aside: false
---

Creates a topic or updates an existing one, and reconciles which spaces the topic is available in.

Passing `id` updates in place; otherwise a new term is created and the slug — derived from `slug` or the title — must be unique. `space_ids` is treated as the complete set: relations not in the list are deleted and missing ones are created, and ids that do not resolve to a space are skipped. The topic cache is cleared afterwards.

## Endpoint

- **Method:** `POST`
- **Path:** `/admin/topics`
- **Edition:** <span class="pro-badge">PRO</span>
- **Controller:** `ProAdminController@saveTopics`
- **Route source:** `fluent-community-pro/app/Http/Routes/api.php:43`
- **Controller source:** `fluent-community-pro/app/Http/Controllers/ProAdminController.php`

- Requires a community admin, a course admin, or the admin role in the space named by `space_id`.
- Requires FluentCommunity Pro.

::: tip Live sample
The request and response below were recorded against a running FluentCommunity install and then anonymised — member names, emails, avatars and post content are fictional, and long collections are trimmed to a few entries.
:::

<OAOperation operationId="saveTopics" specUrl="/openapi/public/admin/save-topics.json" />
